import test from 'node:test'
import assert from 'node:assert/strict'
import { stableVersion, compareVersions, versionStatus, inventoryPackages, parseActions, latestPython, npmRelease, fetchRelease, markdown } from './audit-technologies.js'

test('stable versions use numeric ordering and reject prereleases', () => {
  assert.equal(compareVersions('8.10.0', '8.9.0'), 1)
  assert.equal(compareVersions('v7.0.2', '7.0.2'), 0)
  for (const version of ['7.1.0-rc.1', '3.15.0rc2', 'latest', undefined]) assert.equal(stableVersion(version), null)
  assert.equal(versionStatus('7.0.2', '8.0.0'), 'major update')
  assert.equal(versionStatus('7.0.2', '7.0.3'), 'patch update')
  assert.match(versionStatus('8.0.0', '7.0.2'), /never downgrade/)
  assert.equal(versionStatus('7.0.2', null), 'unknown')
})

test('inventory preserves nested duplicates and optional platform packages', () => {
  const rows = inventoryPackages({ dependencies: { react: '^19.0.0' } }, { packages: {
    '': {}, 'node_modules/react': { version: '19.0.0' },
    'node_modules/example/node_modules/react': { version: '18.0.0' },
    'node_modules/@vendor/win32': { version: '1.0.0', optional: true },
  } })
  assert.equal(rows.length, 3)
  assert.equal(rows.filter(x => x.direct).length, 1)
  assert.equal(rows.find(x => x.optional).name, '@vendor/win32')
  assert.equal(rows.find(x => x.locked === '18.0.0').direct, false)
})

test('a missing direct lock entry cannot produce a complete inventory', () => {
  assert.throws(() => inventoryPackages({ dependencies: { react: '^19.0.0' } }, { packages: {} }), /Direct dependency missing from lockfile: react/)
})

test('action inventory deduplicates consumers but preserves different refs', () => {
  const rows = parseActions({ 'a.yml': '- uses: actions/checkout@v7\n- uses: ./local', 'b.yaml': '  uses: "actions/checkout@v7"\n- uses: actions/checkout@v6' })
  assert.equal(rows.length, 2)
  assert.deepEqual(rows[0].files, ['a.yml', 'b.yaml'])
})

test('Python detection ignores future release candidates and sorts final releases', () => {
  assert.equal(latestPython('<a>Python 3.15.0rc2</a><a>Python 3.14.7</a><a>Python 3.9.25</a>'), '3.14.7')
  assert.throws(() => latestPython('<a>Python 3.15.0rc2</a>'), /could not be parsed/)
})

test('unavailable or malformed npm metadata stays unknown', async () => {
  assert.equal((await npmRelease('example', async () => { throw Error('offline') })).latest, null)
  assert.match((await npmRelease('example', async () => ({ version: '1.0.0-beta.1' }))).error, /metadata is missing/)
})

test('highest final npm release is selected even when the latest tag is older or prerelease', async () => {
  const result = await npmRelease('@example/package', async () => ({ 'dist-tags': { latest: '7.9.0' }, versions: {
    '7.9.0': {}, '8.0.1': {}, '8.0.6': { engines: { node: '>=24' } }, '9.0.0-rc.1': {},
  } }))
  assert.equal(result.latest, '8.0.6')
  assert.equal(result.latestTag, '7.9.0')
  assert.equal(result.engines.node, '>=24')
  const beta = await npmRelease('example', async () => ({ 'dist-tags': { latest: '1.0.0-beta.2' }, versions: { '0.1.0': {}, '1.0.0-beta.2': {} } }))
  assert.equal(beta.latest, '0.1.0')
  assert.match(versionStatus('1.0.0-beta.2', beta.latest), /review parent dependency/)
  const onlyBeta = await npmRelease('example', async () => ({ versions: { '1.0.0-beta.2': {} } }))
  assert.equal(onlyBeta.noStableRelease, true)
  assert.equal(onlyBeta.error, undefined)
})

test('GitHub credentials stay scoped to GitHub, with redirects disabled', async () => {
  const calls = []
  const fetchImpl = async (url, options) => { calls.push({ url, options }); return { ok: true, json: async () => ({}) } }
  await fetchRelease('https://api.github.com/repos/actions/checkout/releases/latest', { fetchImpl, token: 'test-token' })
  await fetchRelease('https://registry.npmjs.org/react/latest', { fetchImpl, token: 'test-token' })
  assert.equal(calls[0].options.headers.Authorization, 'Bearer test-token')
  assert.equal(calls[1].options.headers.Authorization, undefined)
  assert.equal(calls[0].options.redirect, 'error')
})

test('rate limiting preserves Retry-After and does not retry the request', async () => {
  let calls = 0
  const fetchImpl = async () => {
    calls++
    return { ok: false, status: 429, headers: new Headers({ 'Retry-After': '120' }) }
  }
  await assert.rejects(fetchRelease('https://registry.npmjs.org/react/latest', { fetchImpl }), /HTTP 429; Retry-After: 120/)
  assert.equal(calls, 1)
})

test('report never turns lookup errors or absent installations into current versions', () => {
  const result = markdown({ checkedAt: 'test', sourceHead: 'abc', lockfileSha256: 'hash', packages: [{ name: 'react', direct: true, requested: '^19', locked: '19.0.0', latest: null, installed: null, status: 'unknown', source: 'https://registry.npmjs.org/react/latest' }], runtimes: [], actions: [], supportPackages: [], replit: { modules: [], packages: [], channel: 'test' }, errors: ['react: HTTP 503'] })
  assert.match(result, /not installed/)
  assert.match(result, /unknown/)
  assert.match(result, /HTTP 503/)
})
