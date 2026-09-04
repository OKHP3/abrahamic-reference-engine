#!/usr/bin/env node
/**
 * check-skill-sync.js
 *
 * Verifies that every publication package in skills/<name>/ matches its
 * canonical counterpart in .agents/skills/<name>/, including resources,
 * evaluations, and package evidence. Exits non-zero if any pair differs so
 * CI catches drift early.
 *
 * Usage: node scripts/check-skill-sync.js
 *        npm run test:skill-sync
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const MIRRORS_DIR = 'skills';
const CANONICAL_DIR = '.agents/skills';
const PEW_SNAPSHOT_PATH = 'src/data/pew-religious-composition.snapshot.ts';

function packageFiles(root) {
  const files = [];
  function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile()) files.push(relative(root, fullPath));
    }
  }
  walk(root);
  return files.sort();
}

function comparePackages(skillName, mirrorPath, canonicalPath) {
  const mirrorFiles = packageFiles(mirrorPath);
  const canonicalFiles = packageFiles(canonicalPath);
  const allFiles = [...new Set([...mirrorFiles, ...canonicalFiles])].sort();
  const differences = [];

  for (const file of allFiles) {
    const mirrorFile = join(mirrorPath, file);
    const canonicalFile = join(canonicalPath, file);
    if (!existsSync(mirrorFile)) {
      differences.push(`missing mirror file ${file}`);
      continue;
    }
    if (!existsSync(canonicalFile)) {
      differences.push(`missing canonical file ${file}`);
      continue;
    }
    if (!statSync(mirrorFile).isFile() || !statSync(canonicalFile).isFile()) {
      differences.push(`non-file package entry ${file}`);
      continue;
    }
    if (!readFileSync(mirrorFile).equals(readFileSync(canonicalFile))) {
      differences.push(`content drift ${file}`);
    }
  }

  if (differences.length) {
    console.error(`DRIFT    ${skillName}`);
    for (const difference of differences) console.error(`         ${difference}`);
    return false;
  }
  console.log(`OK       ${skillName}`);
  return true;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function snapshotString(source, property) {
  const match = source.match(new RegExp(`\\b${escapeRegExp(property)}:\\s*['"]([^'"]+)['"]`));
  if (!match) throw new Error(`Could not read ${property} from ${PEW_SNAPSHOT_PATH}`);
  return match[1];
}

function snapshotSection(source, sectionName) {
  const match = source.match(
    new RegExp(`\\b${escapeRegExp(sectionName)}:\\s*\\{([\\s\\S]*?)\\n  \\},`)
  );
  if (!match) throw new Error(`Could not read ${sectionName} from ${PEW_SNAPSHOT_PATH}`);
  return match[1];
}

function snapshotRecord(section, recordName) {
  const match = section.match(
    new RegExp(`(?:\\b${escapeRegExp(recordName)}|'${escapeRegExp(recordName)}'):\\s*\\{([\\s\\S]*?)\\n    \\},`)
  );
  if (!match) throw new Error(`Could not read snapshot record ${recordName}`);
  return match[1];
}

function snapshotRecordValue(record, property) {
  const match = record.match(
    new RegExp(`\\b${escapeRegExp(property)}:\\s*(?:['"]([^'"]+)['"]|(\\d+))`)
  );
  if (!match) throw new Error(`Could not read snapshot record ${property}`);
  return match[1] ?? Number(match[2]);
}

function readPewSnapshot() {
  const source = readFileSync(PEW_SNAPSHOT_PATH, 'utf8');
  const groups = snapshotSection(source, 'groups');
  const scopeRows = snapshotSection(source, 'scopeRows');

  const bahai = snapshotRecord(scopeRows, 'bahai');
  return {
    source: snapshotString(source, 'source'),
    url: snapshotString(source, 'url'),
    reportTitle: snapshotString(source, 'reportTitle'),
    table: snapshotString(source, 'table'),
    denominator: snapshotString(source, 'denominator'),
    publicationDate: snapshotString(source, 'publicationDate'),
    groups: new Map(
      ['christianity', 'judaism', 'islam'].map((recordName) => {
        const record = snapshotRecord(groups, recordName);
        return [
          recordName,
          {
            sourceCategory: snapshotRecordValue(record, 'sourceCategory'),
            value: snapshotRecordValue(record, 'displayValue'),
          },
        ];
      })
    ),
    bahaiLabel: snapshotRecordValue(bahai, 'label'),
    bahaiValue: snapshotRecordValue(bahai, 'displayValue'),
  };
}

function packageTextFiles(root) {
  return packageFiles(root)
    .filter((file) => !file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg'))
    .map((file) => ({
      file,
      text: readFileSync(join(root, file), 'utf8'),
    }));
}

function lineHasExpectedShare(line, label, expectedValue) {
  const escapedLabel = escapeRegExp(label);
  const expected = `${escapeRegExp(String(expectedValue))}%`;
  return [
    new RegExp(`\\|\\s*${escapedLabel}\\s*\\|\\s*${expected}`, 'i'),
    new RegExp(`\\b${escapedLabel}\\b\\s*\\(\\s*${expected}`, 'i'),
    new RegExp(
      `\\b${escapedLabel}\\b[^\\n.]{0,100}(?:share|total|population|of\\s+(?:the\\s+)?U\\.S\\.\\s+adults)[^\\n.]{0,40}${expected}`,
      'i'
    ),
    new RegExp(`${expected}[^\\n.]{0,50}\\b${escapedLabel}\\b`, 'i'),
  ].some((pattern) => pattern.test(line));
}

function lineHasTopLevelClaim(line, label) {
  const escapedLabel = escapeRegExp(label);
  return [
    new RegExp(`\\|\\s*${escapedLabel}\\s*\\|\\s*~?\\d+(?:\\.\\d+)?%`, 'i'),
    new RegExp(`\\b${escapedLabel}\\b\\s*\\(\\s*~?\\d+(?:\\.\\d+)?%`, 'i'),
    new RegExp(
      `\\b${escapedLabel}\\b[^\\n.]{0,100}(?:share|total|population|of\\s+(?:the\\s+)?U\\.S\\.\\s+adults)[^\\n.]{0,40}~?\\d+(?:\\.\\d+)?%`,
      'i'
    ),
    new RegExp(`~?\\d+(?:\\.\\d+)?%[^\\n.]{0,50}\\b${escapedLabel}\\b`, 'i'),
  ].some((pattern) => pattern.test(line));
}

function checkPewDocumentation(skillName, mirrorPath, snapshot) {
  const files = packageTextFiles(mirrorPath);
  const allText = files.map(({ text }) => text).join('\n');
  const hasPewGuidance = /Pew Research Center|Pew citation|population share|Religious composition/i.test(
    allText
  );

  if (!hasPewGuidance) return true;

  const failures = [];
  const requiredContext = [
    ['source', snapshot.source],
    ['URL', snapshot.url],
    ['report title', snapshot.reportTitle],
    ['table context', 'Religious composition'],
    ['denominator', snapshot.denominator],
    ['publication date', `published ${snapshot.publicationDate}`],
  ];

  for (const [name, expected] of requiredContext) {
    if (!allText.toLowerCase().includes(expected.toLowerCase())) {
      failures.push(`missing Pew ${name}: ${expected}`);
    }
  }

  for (const [label, expected] of snapshot.groups) {
    const expectedValue = `${expected.value}%`;
    const matchingLines = [];
    const claimLines = [];
    const labels = [label, expected.sourceCategory];

    for (const { file, text } of files) {
      for (const [index, line] of text.split(/\r?\n/).entries()) {
        if (labels.some((candidate) => lineHasExpectedShare(line, candidate, expected.value))) {
          matchingLines.push({ file, index, line });
        }
        if (labels.some((candidate) => lineHasTopLevelClaim(line, candidate))) {
          claimLines.push({ file, index, line });
        }
      }
    }

    if (matchingLines.length === 0) {
      failures.push(`missing current ${label} share (${expectedValue})`);
    }

    for (const { file, index, line } of claimLines) {
      // A threshold rule may mention 1% without claiming that the tradition's
      // population share is 1%. It is not a source-value claim to validate.
      if (/\b(?:threshold|at least|or greater)\b/i.test(line) && !/of\s+(?:the\s+)?U\.S\.\s+adults/i.test(line)) {
        continue;
      }

      const values = [...line.matchAll(/(~?\d+(?:\.\d+)?)%/g)].map((match) => match[1]);
      if (!values.includes(String(expected.value))) {
        failures.push(
          `${file}:${index + 1} ${label} share is ${values.join(', ') || 'missing'}; expected ${expectedValue}`
        );
      }
    }
  }

  for (const { file, text } of files) {
    for (const [index, line] of text.split(/\r?\n/).entries()) {
      if (
        new RegExp(`${escapeRegExp(snapshot.bahaiLabel)}[^\\n%]*%|%[^\\n]*${escapeRegExp(snapshot.bahaiLabel)}`, 'i').test(
          line
        )
      ) {
        failures.push(
          `${file}:${index + 1} ${snapshot.bahaiLabel} has an unsupported percentage; expected ${snapshot.bahaiValue}`
        );
      }
    }
  }

  if (failures.length) {
    console.error(`PEW DRIFT ${skillName}`);
    for (const failure of failures) console.error(`         ${failure}`);
    return false;
  }

  console.log(`PEW OK   ${skillName}`);
  return true;
}

// Collect skill names that exist in the mirrors directory (skip non-directory entries)
const mirrorEntries = readdirSync(MIRRORS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let failures = 0;
let checked = 0;
const pewSnapshot = readPewSnapshot();

for (const skillName of mirrorEntries) {
  const mirrorPath = join(MIRRORS_DIR, skillName, 'SKILL.md');
  const canonicalPath = join(CANONICAL_DIR, skillName, 'SKILL.md');

  // Skip mirror directories that have no SKILL.md (e.g. promotion-manifests)
  if (!existsSync(mirrorPath)) {
    continue;
  }

  if (!existsSync(canonicalPath)) {
    console.error(
      `MISSING  ${canonicalPath}  (mirror exists at ${mirrorPath} but no canonical package)`
    );
    failures++;
    continue;
  }

  const packagePath = join(MIRRORS_DIR, skillName);
  if (!comparePackages(skillName, packagePath, join(CANONICAL_DIR, skillName))) failures++;
  if (!checkPewDocumentation(skillName, packagePath, pewSnapshot)) failures++;
  checked++;
}

// Reverse pass: canonicals that have a promotion manifest but no mirror.
// We intentionally scope this to manifested skills only — .agents/skills/ also
// contains non-publication skills (platform-provided, upstream-only, etc.) that
// are not expected to have a skills/ mirror.
const MANIFESTS_DIR = join(MIRRORS_DIR, 'promotion-manifests');

if (!existsSync(MANIFESTS_DIR)) {
  console.error(
    `ERROR    ${MANIFESTS_DIR}  does not exist — cannot run reverse pass.\n` +
      '         Create the directory and add at least one promotion manifest (.json) before running this check.'
  );
  process.exit(1);
}

const manifestedSkills = readdirSync(MANIFESTS_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''));

if (manifestedSkills.length === 0) {
  console.error(
    `WARNING  ${MANIFESTS_DIR}  exists but contains no .json files — reverse pass skipped.\n` +
      '         Add at least one promotion manifest so the reverse pass can verify mirror coverage.'
  );
  process.exit(1);
}

for (const skillName of manifestedSkills) {
  const canonicalPath = join(CANONICAL_DIR, skillName, 'SKILL.md');
  const mirrorPath = join(MIRRORS_DIR, skillName, 'SKILL.md');

  if (!existsSync(canonicalPath)) continue; // canonical absent — not our problem here
  if (existsSync(mirrorPath)) continue;     // already covered (and passing) in forward pass

  console.error(
    `MISSING  ${mirrorPath}  (canonical exists at ${canonicalPath} but no mirror — manifest requires one)`
  );
  failures++;
}

console.log(`\n${checked} skill(s) checked, ${failures} failure(s).`);

if (failures > 0) {
  console.error(
    '\nFix: keep skills/<name>/ and .agents/skills/<name>/ identical.\n' +
    'When updating a mirrored skill, copy the complete package to the other location in the same commit.'
  );
  process.exit(1);
}
