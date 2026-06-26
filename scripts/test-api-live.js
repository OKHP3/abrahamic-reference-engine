#!/usr/bin/env node
// Live API test runner for Abrahamic Reference Engine
// Tests all providers defined in .agents/skills/okhp3-verse-lookup/tests/test-queries.md
// Exit 0 = all primary providers pass; non-zero = one or more primary failures

const PASS = '\x1b[32mPASS\x1b[0m'
const FAIL = '\x1b[31mFAIL\x1b[0m'
const WARN = '\x1b[33mWARN\x1b[0m'

let primaryFailures = 0
let nonBlockingFailures = 0
const results = []

async function run(id, label, blocking, fn) {
  try {
    await fn()
    results.push({ id, label, status: 'pass' })
    console.log(`  ${PASS}  ${id}  ${label}`)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (blocking) {
      primaryFailures++
      results.push({ id, label, status: 'fail', msg })
      console.log(`  ${FAIL}  ${id}  ${label}`)
      console.log(`         ${msg}`)
    } else {
      nonBlockingFailures++
      results.push({ id, label, status: 'warn', msg })
      console.log(`  ${WARN}  ${id}  ${label} (non-blocking)`)
      console.log(`         ${msg}`)
    }
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

// Fetch JSON; throws on network error or non-2xx status
async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} -- ${url}`)
  return res.json()
}

// Fetch returning { status, ok, json } without throwing on 4xx/5xx
async function fetchRaw(url) {
  const res = await fetch(url)
  let json = null
  try { json = await res.json() } catch (_) { /* non-JSON body */ }
  return { status: res.status, ok: res.ok, json }
}

// Normalize Unicode diacritics used in Quran.com translations (e.g. "All\u0101h" -> "allah")
function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
}

// ---------------------------------------------------------------------------
// Section 1 -- Sefaria API (Judaism)
// ---------------------------------------------------------------------------
console.log('\nSection 1 -- Sefaria (Judaism)')

await run('T-SE-01', 'Genesis 1:1 (single verse)', true, async () => {
  const json = await getJson('https://www.sefaria.org/api/texts/Genesis%201:1?lang=en')
  assert(!json.error, `Sefaria error: ${json.error}`)
  assert(json.ref === 'Genesis 1:1', `Expected ref "Genesis 1:1", got "${json.ref}"`)
  assert(json.book === 'Genesis', `Expected book "Genesis", got "${json.book}"`)
  const text = Array.isArray(json.text) ? json.text.join(' ') : (json.text || '')
  assert(text.length > 0, 'Empty text')
  const lc = normalize(text)
  assert(
    lc.includes('beginning') && (lc.includes('god') || lc.includes('lord')) && lc.includes('heaven') && lc.includes('earth'),
    `Text missing expected words: "${text.slice(0, 120)}"`
  )
})

await run('T-SE-02', 'Deuteronomy 6:4 (Shema)', true, async () => {
  const json = await getJson('https://www.sefaria.org/api/texts/Deuteronomy%206:4?lang=en')
  assert(!json.error, `Sefaria error: ${json.error}`)
  const text = Array.isArray(json.text) ? json.text.join(' ') : (json.text || '')
  const lc = normalize(text)
  assert(lc.includes('lord') || lc.includes('one') || lc.includes('hear'), `Text missing expected words: "${text.slice(0, 120)}"`)
})

await run('T-SE-03', 'Psalms 23:1-6 (verse range)', true, async () => {
  const json = await getJson('https://www.sefaria.org/api/texts/Psalms%2023:1-6?lang=en')
  assert(!json.error, `Sefaria error: ${json.error}`)
  const raw = json.text
  if (Array.isArray(raw)) {
    assert(raw.length >= 6, `Expected 6 verses, got ${raw.length}`)
    assert(raw.join(' ').length > 10, 'Empty verse array')
  } else {
    assert(raw && raw.length > 10, 'Empty text string')
  }
})

await run('T-SE-04', 'Micah 6:8 (minor prophet)', true, async () => {
  const json = await getJson('https://www.sefaria.org/api/texts/Micah%206:8?lang=en')
  assert(!json.error, `Sefaria error: ${json.error}`)
  const text = Array.isArray(json.text) ? json.text.join(' ') : (json.text || '')
  const lc = normalize(text)
  assert(
    lc.includes('justice') || lc.includes('mercy') || lc.includes('humbly') || lc.includes('kindness'),
    `Text missing expected words: "${text.slice(0, 120)}"`
  )
})

await run('T-SE-05', 'Genesis 999:999 (error handling)', true, async () => {
  const json = await getJson('https://www.sefaria.org/api/texts/Genesis%20999:999?lang=en')
  assert(json.error && json.error.length > 0, `Expected json.error but got: ${JSON.stringify(json).slice(0, 120)}`)
})

// ---------------------------------------------------------------------------
// Section 2 -- bible-api.com (Christianity)
// ---------------------------------------------------------------------------
console.log('\nSection 2 -- bible-api.com (Christianity)')

await run('T-BI-01', 'John 3:16 (KJV)', true, async () => {
  const json = await getJson('https://bible-api.com/john%203:16?translation=kjv')
  assert(!json.error, `Error: ${json.error}`)
  assert(json.translation_id === 'kjv', `Expected translation_id "kjv", got "${json.translation_id}"`)
  const lc = normalize(json.text || '')
  assert(lc.includes('god') && lc.includes('loved') && lc.includes('world'), `Missing expected text: "${json.text?.slice(0, 120)}"`)
})

await run('T-BI-02', 'Matthew 5:3-12 (Beatitudes)', true, async () => {
  const json = await getJson('https://bible-api.com/matthew%205:3-12?translation=kjv')
  assert(!json.error, `Error: ${json.error}`)
  const lc = normalize(json.text || '')
  assert(lc.includes('blessed'), `Missing "blessed": "${json.text?.slice(0, 120)}"`)
  assert(lc.includes('poor in spirit'), `Missing "poor in spirit": "${json.text?.slice(0, 120)}"`)
  assert(Array.isArray(json.verses) && json.verses.length === 10, `Expected 10 verses, got ${json.verses?.length}`)
})

// Non-blocking: Tobit is in WEB (deuterocanonical) but not in KJV/dra -- tested here as a deuterocanonical smoke test
await run('T-BI-03', 'Tobit 1:1 (WEB deuterocanonical)', false, async () => {
  const json = await getJson('https://bible-api.com/tobit%201:1?translation=web')
  assert(!json.error, `Error: ${json.error}`)
  assert(json.text && json.text.length > 0, 'Empty text')
})

await run('T-BI-04', 'John 1:1 (Douay-Rheims, dra)', true, async () => {
  const json = await getJson('https://bible-api.com/john%201:1?translation=dra')
  assert(!json.error, `Error: ${json.error}`)
  assert(json.translation_id === 'dra', `Expected translation_id "dra", got "${json.translation_id}"`)
  const lc = normalize(json.text || '')
  assert(lc.includes('word') && lc.includes('god') && lc.includes('beginning'), `Missing expected words: "${json.text?.slice(0, 120)}"`)
})

await run('T-BI-05', 'James 1:5 (KJV, LDS reference)', true, async () => {
  const json = await getJson('https://bible-api.com/james%201:5?translation=kjv')
  assert(!json.error, `Error: ${json.error}`)
  const lc = normalize(json.text || '')
  assert(lc.includes('wisdom') && (lc.includes('ask') || lc.includes('god')), `Missing expected words: "${json.text?.slice(0, 120)}"`)
})

// Error handling: bible-api.com returns HTTP 404 HTML for invalid references (not JSON)
// A non-2xx status is accepted as confirmation that the API rejects bad input
await run('T-BI-06', 'Invalid reference -- error handling', true, async () => {
  const { ok, status } = await fetchRaw('https://bible-api.com/fake%20book%20999:999?translation=kjv')
  assert(!ok, `Expected non-2xx status for invalid ref but got HTTP ${status}`)
})

// ---------------------------------------------------------------------------
// Section 3 -- Quran.com API v4 (Islam primary)
// ---------------------------------------------------------------------------
console.log('\nSection 3 -- Quran.com v4 (Islam primary)')

await run('T-QU-01', 'Al-Fatiha 1:1 (Sahih International, id=20)', true, async () => {
  const json = await getJson('https://api.quran.com/api/v4/verses/by_key/1:1?language=en&translations=20&words=false')
  assert(json.verse, 'json.verse is missing')
  assert(json.verse.verse_key === '1:1', `Expected verse_key "1:1", got "${json.verse.verse_key}"`)
  const text = json.verse.translations?.[0]?.text || ''
  assert(text.length > 0, 'Empty translation text')
  const lc = normalize(text)
  assert(lc.includes('allah') || lc.includes('god'), `Missing "Allah"/"God": "${text.slice(0, 120)}"`)
  assert(lc.includes('merciful') || lc.includes('mercy'), `Missing "merciful"/"mercy": "${text.slice(0, 120)}"`)
})

await run('T-QU-02', 'Ayat al-Kursi 2:255 (Throne Verse)', true, async () => {
  const json = await getJson('https://api.quran.com/api/v4/verses/by_key/2:255?language=en&translations=20&words=false')
  assert(json.verse, 'json.verse is missing')
  const text = json.verse.translations?.[0]?.text || ''
  assert(text.length > 0, 'Empty translation text')
  const lc = normalize(text)
  assert(lc.includes('allah') || lc.includes('god'), `Missing "Allah"/"God": "${text.slice(0, 120)}"`)
  assert(lc.includes('throne') || lc.includes('kursi'), `Missing "throne"/"kursi": "${text.slice(0, 120)}"`)
})

// Pickthall (Quran.com resource ID 19 -- formerly listed as 21, migrated on Quran.com v4)
await run('T-QU-03', 'Al-Ikhlas 112:1 (Pickthall, resource_id=19)', true, async () => {
  const json = await getJson('https://api.quran.com/api/v4/verses/by_key/112:1?language=en&translations=19&words=false')
  assert(json.verse, 'json.verse is missing')
  const translation = json.verse.translations?.[0]
  assert(translation, 'No translation in response for Pickthall (resource_id=19)')
  assert(translation.resource_id === 19, `Expected resource_id 19, got ${translation.resource_id}`)
  const lc = normalize(translation.text || '')
  assert(lc.includes('allah') || lc.includes('god'), `Missing "Allah"/"God": "${translation.text?.slice(0, 120)}"`)
})

await run('T-QU-04', 'Al-Alaq 96:1 (first revelation)', true, async () => {
  const json = await getJson('https://api.quran.com/api/v4/verses/by_key/96:1?language=en&translations=20&words=false')
  assert(json.verse, 'json.verse is missing')
  const text = json.verse.translations?.[0]?.text || ''
  const lc = normalize(text)
  assert(lc.includes('read') || lc.includes('recite') || lc.includes('proclaim'), `Missing "Read"/"Recite": "${text.slice(0, 120)}"`)
})

// ---------------------------------------------------------------------------
// Section 4 -- AlQuran.cloud (Islam fallback, non-blocking)
// ---------------------------------------------------------------------------
console.log('\nSection 4 -- AlQuran.cloud (Islam fallback, non-blocking)')

await run('T-AQ-01', 'Al-Fatiha 1:1 (en.sahih)', false, async () => {
  const json = await getJson('https://api.alquran.cloud/v1/ayah/1:1/en.sahih')
  assert(json.code === 200, `Expected code 200, got ${json.code}`)
  assert(json.data, 'json.data is missing')
  const lc = normalize(json.data.text || '')
  assert(lc.includes('allah') || lc.includes('god'), `Missing "Allah"/"God": "${json.data.text?.slice(0, 120)}"`)
  assert(lc.includes('merciful') || lc.includes('mercy'), `Missing "merciful"/"mercy": "${json.data.text?.slice(0, 120)}"`)
})

await run('T-AQ-02', '2:255 Arberry (en.arberry)', false, async () => {
  const json = await getJson('https://api.alquran.cloud/v1/ayah/2:255/en.arberry')
  assert(json.code === 200, `Expected code 200, got ${json.code}`)
  const lc = normalize(json.data?.text || '')
  assert(lc.includes('throne') || lc.includes('kursi'), `Missing "throne"/"kursi": "${json.data?.text?.slice(0, 120)}"`)
})

// ---------------------------------------------------------------------------
// Section 5 -- Hadith API (non-blocking)
// Note: per-hadith URL format (/{number}.json) returns 404 on jsDelivr as of 2026-06-25.
// The collection-level endpoint (eng-bukhari.min.json) is used instead.
// ---------------------------------------------------------------------------
console.log('\nSection 5 -- Hadith API (non-blocking)')

await run('T-HA-01', 'Bukhari collection (eng-bukhari.min.json)', false, async () => {
  const json = await getJson('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari.min.json')
  assert(json.metadata, 'metadata field missing')
  assert(Array.isArray(json.hadiths) && json.hadiths.length > 0, 'hadiths array is empty or missing')
  assert(json.hadiths[0].text && json.hadiths[0].text.length > 0, 'hadiths[0].text is empty')
})

// ---------------------------------------------------------------------------
// Section 6 -- Cross-tradition smoke test (Golden Rule, blocking)
// ---------------------------------------------------------------------------
console.log('\nSection 6 -- Cross-tradition smoke test (Golden Rule)')

await run('T-CT-01', 'Leviticus 19:18 (Judaism, Sefaria)', true, async () => {
  const json = await getJson('https://www.sefaria.org/api/texts/Leviticus%2019:18?lang=en')
  assert(!json.error, `Sefaria error: ${json.error}`)
  const text = Array.isArray(json.text) ? json.text.join(' ') : (json.text || '')
  assert(text.length > 0, 'Empty text')
})

await run('T-CT-02', 'Matthew 7:12 (Christianity, KJV)', true, async () => {
  const json = await getJson('https://bible-api.com/matthew%207:12?translation=kjv')
  assert(!json.error, `Error: ${json.error}`)
  const lc = normalize(json.text || '')
  assert(lc.includes('do') && (lc.includes('men') || lc.includes('others')), `Missing expected words: "${json.text?.slice(0, 120)}"`)
})

await run('T-CT-03', 'An-Nisa 4:36 (Islam, Quran.com)', true, async () => {
  const json = await getJson('https://api.quran.com/api/v4/verses/by_key/4:36?language=en&translations=20&words=false')
  assert(json.verse, 'json.verse is missing')
  const text = json.verse.translations?.[0]?.text || ''
  assert(text.length > 0, 'Empty translation text')
})

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log('\n' + '='.repeat(60))
const total = results.length
const passed = results.filter(r => r.status === 'pass').length
const failed = results.filter(r => r.status === 'fail').length
const warned = results.filter(r => r.status === 'warn').length

console.log(`Results: ${passed} passed, ${failed} failed (blocking), ${warned} warned (non-blocking) of ${total} total`)

if (failed > 0) {
  console.log('\nBlocking failures:')
  results.filter(r => r.status === 'fail').forEach(r => {
    console.log(`  ${r.id}  ${r.label}`)
    console.log(`    ${r.msg}`)
  })
}

if (warned > 0) {
  console.log('\nNon-blocking warnings (AlQuran.cloud, Hadith CDN):')
  results.filter(r => r.status === 'warn').forEach(r => {
    console.log(`  ${r.id}  ${r.label}`)
    console.log(`    ${r.msg}`)
  })
}

if (primaryFailures > 0) {
  console.log('\n\x1b[31mFAILED -- one or more primary API providers are broken.\x1b[0m')
  process.exit(1)
} else {
  console.log('\n\x1b[32mPASSED -- all primary providers are healthy.\x1b[0m')
  if (nonBlockingFailures > 0) {
    console.log('\x1b[33mNon-blocking warnings recorded -- check AlQuran.cloud / Hadith CDN / Pickthall.\x1b[0m')
  }
  process.exit(0)
}
