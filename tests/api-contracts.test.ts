import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { afterEach, test } from 'node:test'
import {
  fetchPassage,
  isLikelyValidRef,
  LOOKUP_CAPABILITIES,
} from '../src/api/index.ts'
import { fetchAyah } from '../src/api/quran.ts'
import { DENOMINATIONS, PEW_SCOPE_NOTE, TRADITION_GROUPS } from '../src/data/traditions.ts'

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

test('requires complete provenance for every displayed population percentage', () => {
  const requiredFields = [
    'source', 'reportTitle', 'table', 'sourceCategory', 'denominator',
    'fieldworkDate', 'publicationDate', 'retrievedDate', 'extractionNote',
    'compatibilityNote', 'status', 'url',
  ] as const

  for (const citation of [
    ...DENOMINATIONS.map(denomination => denomination.pewCitation),
    ...TRADITION_GROUPS.map(group => group.pewCitation),
    PEW_SCOPE_NOTE.citation,
  ]) {
    for (const field of requiredFields) {
      assert.equal(typeof citation[field], 'string', `${field} missing for ${citation.sourceCategory}`)
      assert.notEqual(citation[field], '', `${field} empty for ${citation.sourceCategory}`)
    }
    assert.match(citation.status, /^(confirmed|inferred|rounded)$/)
  }

  assert.equal(PEW_SCOPE_NOTE.threshold.minimumPercent, 1)
  assert.match(PEW_SCOPE_NOTE.threshold.rule, /separately reported top-level category/)
  assert.equal(TRADITION_GROUPS.find(group => group.family === 'christianity')?.totalPewPercent, 62)
  for (const group of TRADITION_GROUPS) {
    assert.ok(group.pewRollupNote.length > 0, `rollup note missing for ${group.family}`)
  }
  assert.match(
    TRADITION_GROUPS.find(group => group.family === 'christianity')?.pewRollupNote ?? '',
    /not be added/
  )
})

test('keeps paraphrase discovery and context-depth modes outside the prototype boundary', () => {
  assert.deepEqual(LOOKUP_CAPABILITIES, {
    exactReferenceLookup: true,
    paraphraseSearch: false,
    contextModes: false,
    seededThemeComparisons: true,
  })
  assert.equal(isLikelyValidRef('christianity', 'John 3:16'), true)
  assert.equal(isLikelyValidRef('islam', '2:255'), true)
  assert.equal(isLikelyValidRef('christianity', 'What does the text say about mercy?'), false)
  assert.equal(isLikelyValidRef('islam', 'mercy and forgiveness'), false)

  const lookupPage = readFileSync(new URL('../src/pages/VerseLookup.tsx', import.meta.url), 'utf8')
  const comparePage = readFileSync(new URL('../src/pages/CrossTraditionCompare.tsx', import.meta.url), 'utf8')
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8')

  assert.match(lookupPage, /Exact references only\./)
  assert.match(lookupPage, /Paraphrase and fuzzy discovery are not available\./)
  assert.match(lookupPage, /no none, brief, or scholarly context modes/)
  assert.match(lookupPage, /Fixed, pre-seeded themes/)
  assert.match(lookupPage, /not paraphrase matches or generated commentary/)
  assert.match(comparePage, /quoted from the labeled translation and linked source/)
  assert.match(comparePage, /ARE editorial commentary, not source text/)
  assert.match(readme, /accepts exact references only/)
  assert.match(readme, /does\s+not offer fuzzy or paraphrase search/)
  assert.match(readme, /none\/brief\/\s*scholarly context-depth modes/)
})

function mockFetch(
  response: unknown,
  status = 200,
  onRequest?: (url: string) => void
): void {
  globalThis.fetch = (async (input: string | URL) => {
    const url = String(input)
    onRequest?.(url)
    return new Response(JSON.stringify(response), {
      status,
      headers: { 'content-type': 'application/json' },
    })
  }) as typeof fetch
}

test('routes Sefaria bilingual selection and preserves both languages', async () => {
  let requestedUrl = ''
  mockFetch(
    {
      ref: 'Genesis 1:1',
      heRef: 'בראשית א:א',
      text: ['In the beginning God created the heaven and the earth.'],
      he: ['בְּרֵאשִׁית בָּרָא אֱלֹהִים'],
      book: 'Genesis',
      categories: ['Tanakh'],
      type: 'Tanakh',
    },
    200,
    url => {
      requestedUrl = url
    }
  )

  const passage = await fetchPassage({
    tradition: 'judaism',
    reference: 'Genesis 1:1',
    translationId: 'sefaria-he-en',
  })

  assert.equal(
    requestedUrl,
    'https://www.sefaria.org/api/texts/Genesis%201%3A1'
  )
  assert.equal(passage.translationId, 'sefaria-he-en')
  assert.equal(passage.primaryText, 'In the beginning God created the heaven and the earth.')
  assert.equal(passage.secondaryText, 'בְּרֵאשִׁית בָּרָא אֱלֹהִים')
  assert.equal(passage.secondaryDirection, 'rtl')
  assert.equal(passage.secondaryLabel, 'Hebrew original')
})

test('routes Sefaria English selection without silently adding bilingual text', async () => {
  let requestedUrl = ''
  mockFetch(
    {
      ref: 'Genesis 1:1',
      heRef: 'בראשית א:א',
      text: ['English text'],
      he: ['עברית'],
      book: 'Genesis',
      categories: ['Tanakh'],
      type: 'Tanakh',
    },
    200,
    url => {
      requestedUrl = url
    }
  )

  const passage = await fetchPassage({
    tradition: 'judaism',
    reference: 'Genesis 1:1',
    translationId: 'sefaria-en',
  })

  assert.match(requestedUrl, /[?&]lang=en$/)
  assert.equal(passage.primaryText, 'English text')
  assert.equal(passage.secondaryText, undefined)
})

test('slices Sefaria chapter responses to the requested verse and removes footnotes', async () => {
  mockFetch({
    ref: 'Genesis 1:1',
    heRef: 'בראשית א:א',
    sections: [1, 1],
    toSections: [1, 1],
    text: [
      'When God began to create<sup class="footnote-marker">a</sup><i class="footnote"><b>When God began to create </b>In contrast to others.</i> heaven and earth—',
      'the earth being unformed and void.',
      'God said, “Let there be light.”',
    ],
    he: ['בְּרֵאשִׁית בָּרָא אֱלֹהִים', 'וְהָאָרֶץ הָיְתָה', 'וַיֹּאמֶר אֱלֹהִים'],
    book: 'Genesis',
    categories: ['Tanakh'],
    type: 'Tanakh',
  })

  const passage = await fetchPassage({
    tradition: 'judaism',
    reference: 'Genesis 1:1',
    translationId: 'sefaria-en',
  })

  assert.equal(passage.primaryText, 'When God began to create heaven and earth—')
  assert.doesNotMatch(passage.primaryText, /In contrast|unformed|light/)
})

test('maps the internal Douay translation ID to bible-api.com', async () => {
  let requestedUrl = ''
  mockFetch(
    {
      reference: 'John 1:1',
      verses: [{ book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Text' }],
      text: 'Text',
      translation_id: 'dra',
      translation_name: 'Douay-Rheims',
      translation_note: '',
    },
    200,
    url => {
      requestedUrl = url
    }
  )

  const passage = await fetchPassage({
    tradition: 'christianity',
    reference: 'John 1:1',
    translationId: 'douay',
  })

  assert.match(requestedUrl, /[?&]translation=dra$/)
  assert.equal(passage.translationId, 'dra')
})

test('routes Quran translations with an AlQuran.cloud provider directly', async () => {
  let requestedUrl = ''
  mockFetch(
    {
      code: 200,
      status: 'OK',
      data: {
        number: 255,
        text: 'Allah text',
        numberInSurah: 255,
        surah: {
          number: 2,
          name: 'سُورَةُ البَقَرَةِ',
          englishName: 'Al-Baqarah',
          englishNameTranslation: 'The Cow',
        },
        edition: {
          identifier: 'en.arberry',
          name: 'The Koran Interpreted',
          englishName: 'Arberry',
        },
      },
    },
    200,
    url => {
      requestedUrl = url
    }
  )

  const passage = await fetchPassage({
    tradition: 'islam',
    reference: '2:255',
    translationId: 'quran-23',
  })

  assert.equal(requestedUrl, 'https://api.alquran.cloud/v1/ayah/2:255/en.arberry')
  assert.equal(passage.translationId, 'quran-23')
  assert.equal(passage.primaryText, 'Allah text')
})

test('preserves the fallback error as the cause when both Quran APIs fail', async () => {
  let callCount = 0
  globalThis.fetch = (async () => {
    callCount += 1
    return new Response('unavailable', { status: 503, statusText: 'Unavailable' })
  }) as typeof fetch

  await assert.rejects(
    fetchAyah('2:255', '20'),
    error => {
      assert.equal(callCount, 2)
      assert.match(String(error), /Both Quran APIs failed/)
      assert.ok((error as Error & { cause?: unknown }).cause)
      return true
    }
  )
})