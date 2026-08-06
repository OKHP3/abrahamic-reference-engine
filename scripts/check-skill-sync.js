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

// Collect skill names that exist in the mirrors directory (skip non-directory entries)
const mirrorEntries = readdirSync(MIRRORS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let failures = 0;
let checked = 0;

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

  if (!comparePackages(skillName, join(MIRRORS_DIR, skillName), join(CANONICAL_DIR, skillName))) failures++;
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
