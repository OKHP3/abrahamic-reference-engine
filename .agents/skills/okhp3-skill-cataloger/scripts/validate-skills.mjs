#!/usr/bin/env node
/**
 * Dependency-free Agent Skills conformance checker for ARE.
 *
 * Checks the portable parts of the Agent Skills specification without
 * requiring Python, npm packages, or network access. Warnings are reported
 * for maintainability concerns; errors fail the process.
 */

import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const skillsRoot = path.resolve(process.argv[2] ?? '.agents/skills')
const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const versionPattern = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/
const errors = []
const warnings = []

function readFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!match) return { text, fields: null }

  const fields = {}
  let blockKey = null
  let blockValue = []
  for (const line of match[1].split(/\r?\n/)) {
    if (blockKey && (/^\s{2}/.test(line) || line.trim() === '')) {
      blockValue.push(line.trim())
      continue
    }
    if (blockKey) {
      fields[blockKey] = blockValue.join(' ').trim()
      blockKey = null
      blockValue = []
    }
    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/)
    if (!field) continue
    const [, key, value] = field
    if (value === '>' || value === '|') {
      blockKey = key
    } else if (value) {
      fields[key] = value.replace(/^['"]|['"]$/g, '')
    } else {
      fields[key] = ''
    }
  }
  if (blockKey) fields[blockKey] = blockValue.join(' ').trim()
  const metadataMatch = match[1].match(/(?:^|\r?\n)metadata:\s*\r?\n([\s\S]*?)(?=\r?\n[^ \t]|$)/)
  if (metadataMatch) {
    const version = metadataMatch[1].match(/(?:^|\r?\n)\s+version:\s*["']?([^"'\r\n]+)["']?\s*$/m)
    if (version) fields.version = version[1].trim()
  }
  return { text, fields }
}

function checkSkill(skillDir) {
  const name = path.basename(skillDir)
  const skillFile = path.join(skillDir, 'SKILL.md')
  if (!fs.existsSync(skillFile)) return

  const { text, fields } = readFrontmatter(skillFile)
  if (!fields) {
    errors.push(`${name}: SKILL.md is missing YAML frontmatter`)
    return
  }
  if (!fields.name) errors.push(`${name}: frontmatter is missing name`)
  if (!fields.description) errors.push(`${name}: frontmatter is missing description`)
  if (fields.name && fields.name !== name) {
    errors.push(`${name}: name '${fields.name}' does not match the directory`)
  }
  if (fields.name && (fields.name.length > 64 || !namePattern.test(fields.name))) {
    errors.push(`${name}: name must be lowercase kebab-case and at most 64 characters`)
  }
  if (fields.description && fields.description.length > 1024) {
    errors.push(`${name}: description exceeds 1024 characters`)
  }
  if (fields.compatibility && fields.compatibility.length > 500) {
    errors.push(`${name}: compatibility exceeds 500 characters`)
  }
  if (!fields.license) warnings.push(`${name}: no license field`)
  if (!fields.version) warnings.push(`${name}: metadata.version is missing`)
  if (fields.version && !versionPattern.test(fields.version)) {
    warnings.push(`${name}: metadata.version '${fields.version}' is not semver-like`)
  }

  const body = text.replace(/^---[\s\S]*?---\r?\n/, '')
  const lines = body.split(/\r?\n/).length
  if (lines > 500) warnings.push(`${name}: SKILL.md body is ${lines} lines; move depth into references/`)
  if (/\b(?:C:\\|[A-Za-z]:\\|\/Users\/|\/home\/)/.test(body)) {
    warnings.push(`${name}: body contains an absolute local path`)
  }

  const references = [...body.matchAll(/(?:`|\()((?:scripts|references|assets)\/[^`\)\s]+)(?:`|\))/g)]
  for (const [, relativePath] of references) {
    if (relativePath.includes('/foo.')) continue
    const candidate = path.join(skillDir, relativePath)
    if (!fs.existsSync(candidate)) errors.push(`${name}: referenced file is missing: ${relativePath}`)
  }
}

if (!fs.existsSync(skillsRoot)) {
  console.error(`Skills directory not found: ${path.relative(repoRoot, skillsRoot)}`)
  process.exit(1)
}

const skillDirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
  .map(entry => path.join(skillsRoot, entry.name))

for (const skillDir of skillDirs) checkSkill(skillDir)

for (const warning of warnings) console.warn(`WARN ${warning}`)
for (const error of errors) console.error(`ERROR ${error}`)
console.log(`Checked ${skillDirs.length} skill directories: ${errors.length} error(s), ${warnings.length} warning(s).`)
process.exit(errors.length ? 1 : 0)
