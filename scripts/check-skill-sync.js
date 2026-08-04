#!/usr/bin/env node
/**
 * check-skill-sync.js
 *
 * Verifies that every SKILL.md in skills/<name>/ (publication mirrors) matches
 * its canonical counterpart in .agents/skills/<name>/. Exits non-zero if any
 * pair differs so CI catches drift early.
 *
 * Usage: node scripts/check-skill-sync.js
 *        npm run test:skill-sync
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const MIRRORS_DIR = 'skills';
const CANONICAL_DIR = '.agents/skills';

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
      `MISSING  ${canonicalPath}  (mirror exists at ${mirrorPath} but no canonical copy)`
    );
    failures++;
    continue;
  }

  const mirrorContent = readFileSync(mirrorPath, 'utf8');
  const canonicalContent = readFileSync(canonicalPath, 'utf8');

  if (mirrorContent !== canonicalContent) {
    console.error(`DRIFT    ${skillName}`);
    console.error(`         mirror:    ${mirrorPath}`);
    console.error(`         canonical: ${canonicalPath}`);
    console.error(
      `         Files differ -- copy the updated version to the other location and commit both.`
    );
    failures++;
  } else {
    console.log(`OK       ${skillName}`);
  }
  checked++;
}

console.log(`\n${checked} skill(s) checked, ${failures} failure(s).`);

if (failures > 0) {
  console.error(
    '\nFix: keep skills/<name>/SKILL.md and .agents/skills/<name>/SKILL.md identical.\n' +
      'When updating a skill, copy the change to the other location in the same commit.'
  );
  process.exit(1);
}
