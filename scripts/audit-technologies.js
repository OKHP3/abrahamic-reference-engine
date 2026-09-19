// Read-only release audit. Uses Node built-ins and never installs or upgrades packages.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, appendFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const readJson = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const throttledHosts = new Map()

export function stableVersion(value) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)$/.exec(value ?? '')
  return match ? match.slice(1).map(Number) : null
}

export function compareVersions(left, right) {
  const a = stableVersion(left)
  const b = stableVersion(right)
  if (!a || !b) return null
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return Math.sign(a[i] - b[i])
  return 0
}

export function versionStatus(current, latest) {
  if (/^\d+\.\d+\.\d+-/.test(current ?? '') && stableVersion(latest)) return 'prerelease in use; review parent dependency before changing'
  const order = compareVersions(current, latest)
  if (order === null) return 'unknown'
  if (order === 0) return 'current'
  if (order > 0) return 'ahead-of-latest-tag; review, never downgrade automatically'
  const a = stableVersion(current)
  const b = stableVersion(latest)
  return b[0] > a[0] ? 'major update' : b[1] > a[1] ? 'minor update' : 'patch update'
}

export function inventoryPackages(manifest, lock) {
  const direct = { ...manifest.dependencies, ...manifest.devDependencies, ...manifest.optionalDependencies }
  for (const name of Object.keys(direct)) {
    if (!lock.packages?.[`node_modules/${name}`]?.version) throw new Error(`Direct dependency missing from lockfile: ${name}`)
  }
  return Object.entries(lock.packages).filter(([path]) => path.includes('node_modules/'))
    .map(([path, item]) => {
      const name = item.name ?? path.split('node_modules/').at(-1)
      return {
        name, path, locked: item.version ?? null,
        direct: path === `node_modules/${name}` && Object.hasOwn(direct, name),
        requested: path === `node_modules/${name}` ? direct[name] ?? null : null,
        optional: Boolean(item.optional), dev: Boolean(item.dev),
      }
    }).sort((a, b) => a.name.localeCompare(b.name) || a.path.localeCompare(b.path))
}

export function parseActions(workflows) {
  const actions = new Map()
  for (const [path, source] of Object.entries(workflows)) {
    for (const match of source.matchAll(/^\s*(?:-\s*)?uses:\s*["']?([\w.-]+\/[\w./-]+)@([^\s"'#]+)["']?/gm)) {
      const [, name, ref] = match
      const key = `${name}@${ref}`
      const row = actions.get(key) ?? { name, ref, files: [] }
      row.files.push(path)
      actions.set(key, row)
    }
  }
  return [...actions.values()]
}

export function latestPython(html) {
  // Exact final-release labels only; directory names also contain prereleases.
  const versions = [...html.matchAll(/>Python (\d+\.\d+\.\d+)<\/a>/g)].map(x => x[1])
  if (!versions.length) throw new Error('Python final-release list could not be parsed')
  return versions.sort((a, b) => compareVersions(b, a))[0]
}

export async function fetchRelease(url, { fetchImpl = fetch, token = process.env.GITHUB_TOKEN, format = 'json' } = {}) {
  const host = new URL(url).hostname
  if (fetchImpl === fetch && throttledHosts.has(host)) throw new Error(throttledHosts.get(host))
  const headers = { 'User-Agent': 'ARE-technology-audit', Accept: format === 'json' ? 'application/json' : 'text/html' }
  if (host === 'registry.npmjs.org') headers.Accept = 'application/vnd.npm.install-v1+json'
  // A GitHub token must never be forwarded to npm, Python, Node, or a redirect.
  if (new URL(url).hostname === 'api.github.com' && token) headers.Authorization = `Bearer ${token}`
  let error
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetchImpl(url, { headers, redirect: 'error', signal: AbortSignal.timeout(15000) })
      if (!response.ok) {
        const delay = response.headers?.get('retry-after')
        const message = `HTTP ${response.status}${delay ? `; Retry-After: ${delay}` : ''}`
        if (response.status === 429 || response.status === 403) {
          // Stop this host for the run; do not multiply requests during throttling.
          if (fetchImpl === fetch) throttledHosts.set(host, message)
          throw Object.assign(new Error(message), { stop: true })
        }
        throw new Error(message)
      }
      return format === 'json' ? await response.json() : await response.text()
    } catch (failure) {
      error = failure
      if (failure.stop) break
      if (attempt < 2) await new Promise(done => setTimeout(done, 250 * 2 ** attempt))
    }
  }
  throw error
}

async function mapLimit(items, worker, limit = 1) {
  let index = 0
  const results = new Array(items.length)
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const position = index++
      results[position] = await worker(items[position])
      // Keep the full inventory below two registry requests per second.
      if (index < items.length) await new Promise(done => setTimeout(done, 600))
    }
  }))
  return results
}

export async function npmRelease(name, request = fetchRelease) {
  const source = `https://registry.npmjs.org/${encodeURIComponent(name)}`
  try {
    const data = await request(source)
    if (!data.versions || typeof data.versions !== 'object') throw new Error('Published version metadata is missing')
    // Tags can point to a prerelease or an older major. Compare final versions.
    const latest = Object.keys(data.versions).filter(stableVersion).sort((a, b) => compareVersions(b, a))[0] ?? null
    const release = data.versions[latest] ?? {}
    return { latest, latestTag: data['dist-tags']?.latest ?? null, noStableRelease: latest === null, engines: release.engines ?? {}, deprecated: release.deprecated ?? null, source }
  } catch (error) {
    return { latest: null, source, error: error.message }
  }
}

const cell = value => String(value ?? 'unknown').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ')
const table = (headers, rows) => [
  `| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`,
  ...rows.map(row => `| ${row.map(cell).join(' | ')} |`), '',
].join('\n')

export function markdown(report) {
  return [
    '# ARE technology version audit', '',
    `Retrieved: ${report.checkedAt}. Source HEAD: \`${report.sourceHead}\`.`,
    `Lockfile SHA-256: \`${report.lockfileSha256}\`.`, '',
    'Locked versions describe the source checkout, not proof of a deployed or installed version.',
    'Latest means the highest published final npm version or final upstream release; prereleases are excluded.',
    'The npm latest tag is retained separately because tags may point to an older major or a prerelease.',
    'A newer release is a candidate, not proof of compatibility. Transitive packages follow their parent requirements.', '',
    `Coverage: ${report.packages.length} lockfile entries; ${new Set(report.packages.map(x => x.name)).size} distinct npm packages; ${report.packages.filter(x => x.direct).length} direct dependencies; ${report.errors.length} lookup errors.`, '',
    '## Direct dependencies', '',
    table(['Package', 'Requested', 'Locked', 'Installed here', 'Latest stable', 'Latest tag', 'Result', 'Source'],
      report.packages.filter(x => x.direct).map(x => [x.name, x.requested, x.locked, x.installed ?? 'not installed', x.latest, x.latestTag, x.status, x.source])),
    '## Runtimes and environment', '',
    table(['Technology', 'In this audit process / configured', 'Latest stable', 'Policy / result', 'Source'], report.runtimes.map(x => [x.name, x.current, x.latest, x.status, x.source])),
    `Replit declarations: ${report.replit.modules.join(', ')}; Nix channel: ${report.replit.channel}. These are declarations, not runtime measurements.`, '',
    `Replit system packages (individual versions are not pinned): ${report.replit.packages.join(', ')}.`, '',
    '## GitHub Actions', '',
    table(['Action', 'Configured ref', 'Latest stable', 'Result', 'Source'], report.actions.map(x => [x.name, x.ref, x.latest, x.status, x.source])),
    'Major action tags float within that major. Exact historical execution versions require the corresponding workflow logs.', '',
    '## Supporting package manifests', '',
    table(['Path', 'Name', 'Version', 'External dependencies'], report.supportPackages.map(x => [x.path, x.name, x.version, x.dependencies.join(', ') || 'none'])),
    '## Complete npm lock inventory', '',
    table(['Package', 'Lock path', 'Locked', 'Latest stable', 'Latest tag', 'Result', 'Source'], report.packages.map(x => [x.name, x.path, x.locked, x.latest, x.latestTag, x.status, x.source])),
    '## Lookup failures', '',
    report.errors.length ? report.errors.map(x => `- ${cell(x)}`).join('\n') : 'None.', '',
    'See docs/reviews/technology-inventory.md in the repository for languages, service interfaces, formats, host observations, and the update/release plan.', '',
  ].join('\n')
}

export async function audit({ offline = false } = {}) {
  const manifest = readJson('package.json')
  const lockText = readFileSync(resolve(root, 'package-lock.json'), 'utf8')
  const packages = inventoryPackages(manifest, JSON.parse(lockText))
  const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean)
  const workflowFiles = readdirSync(resolve(root, '.github/workflows')).filter(x => /\.ya?ml$/.test(x))
  const workflows = Object.fromEntries(workflowFiles.map(x => [`.github/workflows/${x}`, readFileSync(resolve(root, '.github/workflows', x), 'utf8')]))
  const replit = readFileSync(resolve(root, '.replit'), 'utf8')
  const list = key => JSON.parse(replit.match(new RegExp(`^${key} = (\\[[^\\n]*\\])`, 'm'))?.[1] ?? '[]')
  const report = {
    checkedAt: new Date().toISOString(), mode: offline ? 'offline' : 'online',
    sourceHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
    lockfileSha256: createHash('sha256').update(lockText).digest('hex'),
    packages, actions: parseActions(workflows), runtimes: [],
    replit: { modules: list('modules'), channel: replit.match(/^channel = "([^"]+)"/m)?.[1] ?? 'unknown', packages: list('packages') },
    supportPackages: tracked.filter(x => x.endsWith('/package.json')).map(path => {
      const p = readJson(path)
      return { path, name: p.name, version: p.version, dependencies: Object.keys({ ...p.dependencies, ...p.devDependencies, ...p.optionalDependencies }) }
    }), errors: [],
  }
  // Capture the application contract first if a provider stops partway through.
  const names = [...new Set([...packages.filter(x => x.direct).map(x => x.name), 'npm', ...packages.map(x => x.name)])]
  const releases = new Map(offline ? [] : await mapLimit(names, async name => [name, await npmRelease(name)]))
  for (const row of packages) {
    try { row.installed = readJson(`${row.path}/package.json`).version } catch { row.installed = null }
    Object.assign(row, releases.get(row.name) ?? { latest: null, source: `https://registry.npmjs.org/${encodeURIComponent(row.name)}` })
    row.status = offline ? 'not checked (offline)' : row.error ? 'unknown' : row.noStableRelease ? 'no final stable release published; review parent dependency' : versionStatus(row.locked, row.latest)
  }
  for (const [name, release] of releases) if (release.error) report.errors.push(`${name}: ${release.error}`)
  const npmCurrent = process.env.npm_config_user_agent?.match(/npm\/([^ ]+)/)?.[1] ?? 'unknown (run through npm for host version)'
  const npm = releases.get('npm') ?? { latest: null, source: 'https://registry.npmjs.org/npm/latest' }
  report.runtimes.push({ name: 'npm', current: npmCurrent, ...npm, status: offline ? 'not checked (offline)' : versionStatus(npmCurrent, npm.latest) })
  const runtimeRequests = [
    ['Node.js', 'https://nodejs.org/dist/index.json', async source => {
      const rows = (await fetchRelease(source)).filter(x => stableVersion(x.version)).sort((a, b) => compareVersions(b.version, a.version))
      const lts = rows.find(x => x.lts)
      if (!lts || !rows[0]) throw new Error('Node stable/LTS releases missing')
      return [
        { name: 'Node.js (latest stable)', current: process.version, latest: rows[0].version, status: versionStatus(process.version, rows[0].version), source },
        { name: 'Node.js (LTS production target)', current: process.version, latest: lts.version, status: versionStatus(process.version, lts.version), source },
      ]
    }],
    ['Python', 'https://www.python.org/downloads/', async source => [{ name: 'Python', current: report.replit.modules.find(x => x.startsWith('python-')) ?? 'not declared', latest: latestPython(await fetchRelease(source, { format: 'text' })), status: 'declared series only; inspect host installation and patch separately', source }]],
  ]
  for (const [name, source, request] of runtimeRequests) {
    try {
      if (offline) report.runtimes.push({ name, current: name === 'Node.js' ? process.version : report.replit.modules.find(x => x.startsWith('python-')), latest: null, status: 'not checked (offline)', source })
      else report.runtimes.push(...await request(source))
    } catch (error) {
      report.errors.push(`${name}: ${error.message}`)
      report.runtimes.push({ name, latest: null, status: 'unknown', source })
    }
  }
  for (const action of report.actions) {
    const repo = action.name.split('/').slice(0, 2).join('/')
    action.source = `https://api.github.com/repos/${repo}/releases/latest`
    action.latest = null
    action.status = 'not checked (offline)'
    if (offline) continue
    try {
      const release = await fetchRelease(action.source)
      if (release.draft || release.prerelease || !stableVersion(release.tag_name)) throw new Error('No final stable release returned')
      action.latest = release.tag_name
      const major = /^v(\d+)$/.exec(action.ref)
      action.status = major
        ? Number(major[1]) === stableVersion(action.latest)[0] ? 'current major; floating patch' : Number(major[1]) < stableVersion(action.latest)[0] ? 'major update' : 'ahead of latest release; review'
        : versionStatus(action.ref, action.latest)
    } catch (error) {
      action.status = 'unknown'
      report.errors.push(`${action.name}: ${error.message}`)
    }
  }
  return report
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  const value = flag => {
    const index = args.indexOf(flag)
    if (index < 0) return null
    if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${flag} requires a path`)
    return args[index + 1]
  }
  const report = await audit({ offline: args.includes('--offline') })
  const output = value('--output')
  if (output) {
    const directory = resolve(output)
    mkdirSync(directory, { recursive: true })
    writeFileSync(resolve(directory, 'technology-versions.json'), `${JSON.stringify(report, null, 2)}\n`)
    writeFileSync(resolve(directory, 'technology-versions.md'), markdown(report))
  }
  const summary = value('--summary')
  if (summary) {
    mkdirSync(dirname(resolve(summary)), { recursive: true })
    appendFileSync(summary, markdown(report))
  }
  console.log(JSON.stringify({ mode: report.mode, packages: report.packages.length, direct: report.packages.filter(x => x.direct).length, updates: report.packages.filter(x => x.status.endsWith(' update')).length, errors: report.errors, output }, null, 2))
  if (report.errors.length) process.exitCode = 1
}
