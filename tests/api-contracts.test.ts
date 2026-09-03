import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { afterEach, test } from 'node:test'
import {
  discoverPhrase,
  fetchPassage,
  isLikelyValidRef,
  LOOKUP_CAPABILITIES,
  PHRASE_DISCOVERY_POLICY,
} from '../src/api/index.ts'
import { fetchAyah } from '../src/api/quran.ts'
import { DENOMINATIONS, PEW_SCOPE_NOTE, TRADITION_GROUPS } from '../src/data/traditions.ts'
import { PEW_RLS_SOURCE_SNAPSHOT } from '../src/data/pew-religious-composition.snapshot.ts'

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

test('keeps displayed Pew values, categories, and table context aligned with the source snapshot', () => {
  const snapshot = PEW_RLS_SOURCE_SNAPSHOT
  const citations = [
    ...DENOMINATIONS.map(denomination => denomination.pewCitation),
    ...TRADITION_GROUPS.map(group => group.pewCitation),
    PEW_SCOPE_NOTE.citation,
  ]

  for (const citation of citations) {
    assert.equal(citation.source, snapshot.source, `source drift for ${citation.sourceCategory}`)
    assert.equal(citation.year, snapshot.year, `year drift for ${citation.sourceCategory}`)
    assert.equal(citation.url, snapshot.url, `URL drift for ${citation.sourceCategory}`)
    assert.equal(citation.reportTitle, snapshot.reportTitle, `report drift for ${citation.sourceCategory}`)
    assert.equal(citation.table, snapshot.table, `table drift for ${citation.sourceCategory}`)
    assert.equal(citation.denominator, snapshot.denominator, `denominator drift for ${citation.sourceCategory}`)
    assert.equal(citation.fieldworkDate, snapshot.fieldworkDate, `fieldwork drift for ${citation.sourceCategory}`)
    assert.equal(citation.publicationDate, snapshot.publicationDate, `publication drift for ${citation.sourceCategory}`)
    assert.equal(citation.retrievedDate, snapshot.retrievedDate, `retrieved-date drift for ${citation.sourceCategory}`)
  }

  for (const [id, expected] of Object.entries(snapshot.denominations)) {
    const denomination = DENOMINATIONS.find(candidate => candidate.id === id)
    assert.ok(denomination, `snapshot denomination ${id} is missing from traditions.ts`)
    assert.equal(denomination.pewPercent, expected.displayValue, `value drift for ${id}`)
    assert.equal(denomination.pewCitation.sourceCategory, expected.sourceCategory, `category drift for ${id}`)
  }

  for (const [family, expected] of Object.entries(snapshot.groups)) {
    const group = TRADITION_GROUPS.find(candidate => candidate.family === family)
    assert.ok(group, `snapshot group ${family} is missing from traditions.ts`)
    assert.equal(group.totalPewPercent, expected.displayValue, `value drift for ${family}`)
    assert.equal(group.pewCitation.sourceCategory, expected.sourceCategory, `category drift for ${family}`)
  }

  assert.deepEqual(
    new Set(DENOMINATIONS.map(denomination => denomination.id)),
    new Set(Object.keys(snapshot.denominations)),
    'denomination set drift between traditions.ts and the source snapshot'
  )
  assert.deepEqual(
    new Set(TRADITION_GROUPS.map(group => group.family)),
    new Set(Object.keys(snapshot.groups)),
    'tradition-group set drift between traditions.ts and the source snapshot'
  )
})

test('keeps the README scope table and Pew explanation aligned with the source snapshot', () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8')
  const scopeSection = readme.match(/## Scope\n([\s\S]*?)(?=\n---\n\n## Design principles)/)?.[1]
  assert.ok(scopeSection, 'README scope section is missing or has moved')

  const tableRows = [...scopeSection.matchAll(
    /^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*(Yes|No)\s*\|\s*([^|]+?)\s*\|$/gm
  )].map(([, label, value, inScope, notes]) => ({
    label: label.trim(),
    value: value.trim(),
    inScope: inScope.trim(),
    notes: notes.trim(),
  }))
  const expectedRows = Object.values(PEW_RLS_SOURCE_SNAPSHOT.scopeRows)

  assert.equal(
    tableRows.length,
    expectedRows.length,
    `README scope tradition count drift: found ${tableRows.length}, expected ${expectedRows.length}`
  )
  for (const expected of expectedRows) {
    const row = tableRows.find(candidate => candidate.label === expected.label)
    assert.ok(row, `README scope tradition is missing: ${expected.label}`)
    const expectedValue =
      typeof expected.displayValue === 'number'
        ? `${expected.displayValue}%`
        : expected.displayValue
    assert.equal(row.value, expectedValue, `README scope value drift for ${expected.label}`)
    assert.match(
      row.notes,
      expected.sourceCategory === 'Not separately reported'
        ? /not a separately reported category/i
        : new RegExp(
            `direct Pew category \\("${escapeRegExp(expected.sourceCategory)}"\\)`,
            'i'
          ),
      `README scope category context drift for ${expected.label} (${expected.sourceCategory})`
    )
    assert.equal(
      row.inScope,
      TRADITION_GROUPS.some(group => group.label === expected.label) ? 'Yes' : 'No',
      `README scope status drift for ${expected.label}`
    )
  }

  for (const row of tableRows) {
    assert.ok(
      expectedRows.some(expected => expected.label === row.label),
      `README scope tradition is not in the source snapshot: ${row.label}`
    )
  }

  const christianTotal = PEW_RLS_SOURCE_SNAPSHOT.groups.christianity.displayValue
  assert.match(
    scopeSection,
    new RegExp(
      `The ${christianTotal}% Christian total is Pew[’']s direct top-level category`
    ),
    `README Christian total drift for Christianity (${christianTotal}%)`
  )

  const componentExplanation = scopeSection.match(
    /Pew[’']s constituent categories are ([\s\S]*?); whole-percent display/
  )?.[1]
  assert.ok(componentExplanation, 'README Christian component explanation is missing')
  const actualComponents = [...componentExplanation.matchAll(
    /(?:^|, and |, |and )([^,]+?)\s+\((<1|\d+)%\)/g
  )].map(([, sourceCategory, displayValue]) => ({
    sourceCategory: sourceCategory.trim(),
    displayValue,
  }))
  const expectedComponents = Object.values(PEW_RLS_SOURCE_SNAPSHOT.christianComponents)

  assert.equal(
    actualComponents.length,
    expectedComponents.length,
    `README Christian component count drift: found ${actualComponents.length}, expected ${expectedComponents.length}`
  )
  for (const expected of expectedComponents) {
    const component = actualComponents.find(
      candidate => candidate.sourceCategory === expected.sourceCategory
    )
    assert.ok(
      component,
      `README Christian component category drift: missing ${expected.sourceCategory}`
    )
    assert.equal(
      component.displayValue,
      String(expected.displayValue),
      `README Christian component value drift for ${expected.sourceCategory}`
    )
  }

  const sourceContext = scopeSection.match(/^Source:.*$/m)?.[0]
  assert.ok(sourceContext, 'README Pew source context is missing')
  for (const [context, expected] of [
    ['source', PEW_RLS_SOURCE_SNAPSHOT.source],
    ['report', PEW_RLS_SOURCE_SNAPSHOT.reportTitle],
    ['table', PEW_RLS_SOURCE_SNAPSHOT.table],
    ['denominator', PEW_RLS_SOURCE_SNAPSHOT.denominator],
    ['fieldwork', `Fieldwork ran ${PEW_RLS_SOURCE_SNAPSHOT.fieldworkDate}`],
    ['publication', `published ${PEW_RLS_SOURCE_SNAPSHOT.publicationDate}`],
  ]) {
    assert.match(
      sourceContext,
      new RegExp(escapeRegExp(expected)),
      `README Pew ${context} context drift: expected "${expected}"`
    )
  }
})

test('keeps collaborator-facing demographic summaries aligned with the source snapshot', () => {
  const snapshot = PEW_RLS_SOURCE_SNAPSHOT
  const governanceDocs = [
    {
      name: 'AGENTS.md',
      content: readFileSync(new URL('../AGENTS.md', import.meta.url), 'utf8'),
      expectedGroups: true,
      expectedScopeRows: true,
    },
    {
      name: 'replit.md',
      content: readFileSync(new URL('../replit.md', import.meta.url), 'utf8'),
      expectedGroups: true,
      expectedScopeRows: false,
    },
  ]

  for (const document of governanceDocs) {
    assert.match(
      document.content,
      new RegExp(escapeRegExp(snapshot.url)),
      `${document.name} is missing the current Pew source URL`
    )
    assert.match(
      document.content,
      new RegExp(escapeRegExp(snapshot.reportTitle)),
      `${document.name} is missing the current Pew report title`
    )
    assert.match(
      document.content,
      new RegExp(escapeRegExp(snapshot.denominator)),
      `${document.name} is missing the Pew denominator`
    )
    assert.doesNotMatch(
      document.content,
      /~(?:63|25|20|16|26|0\.1)%/,
      `${document.name} contains an obsolete approximate demographic figure`
    )
    assert.doesNotMatch(
      document.content,
      /pewresearch\.org\/religion\/religious-landscape-study\//,
      `${document.name} contains the obsolete Pew source URL`
    )

    if (document.expectedGroups) {
      for (const expected of Object.values(snapshot.groups)) {
        assert.match(
          document.content,
          new RegExp(`${expected.displayValue}%`),
          `${document.name} is missing the verified ${expected.sourceCategory} value`
        )
      }
    }

    if (document.expectedScopeRows) {
      for (const expected of Object.values(snapshot.scopeRows)) {
        const expectedValue =
          typeof expected.displayValue === 'number'
            ? `${expected.displayValue}%`
            : expected.displayValue
        assert.match(
          document.content,
          new RegExp(escapeRegExp(expected.label)),
          `${document.name} is missing the ${expected.label} scope row`
        )
        assert.match(
          document.content,
          new RegExp(escapeRegExp(expectedValue)),
          `${document.name} is missing the ${expected.label} value`
        )
      }
    }
  }
})

test('keeps paraphrase discovery and context-depth modes outside the prototype boundary', () => {
  assert.deepEqual(LOOKUP_CAPABILITIES, {
    exactReferenceLookup: true,
    phraseDiscovery: true,
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
  assert.match(readme, /accepts exact references and also\s+offers a bounded phrase search/)
  assert.match(readme, /does\s+not offer fuzzy or paraphrase search/)
  assert.match(readme, /none\/brief\/\s*scholarly context-depth modes/)
})

test('phrase discovery is deterministic, literal, and explicit about ambiguity', () => {
  assert.match(PHRASE_DISCOVERY_POLICY.corpus, /checked-in static quotations/)
  assert.match(PHRASE_DISCOVERY_POLICY.corpus, /without editorial ellipsis truncation/)
  assert.match(PHRASE_DISCOVERY_POLICY.matching, /literal contiguous phrase/)
  assert.match(PHRASE_DISCOVERY_POLICY.excludes, /No paraphrase/)

  const noMatch = discoverPhrase('a phrase that is not in the source corpus')
  assert.equal(noMatch.state, 'no-match')
  assert.equal(noMatch.ambiguity, 'none')
  assert.deepEqual(noMatch.candidates, [])

  const oneMatch = discoverPhrase('In the beginning God created')
  assert.equal(oneMatch.state, 'one-match')
  assert.equal(oneMatch.ambiguity, 'none')
  assert.equal(oneMatch.candidates.length, 1)
  assert.equal(oneMatch.candidates[0].reference, 'Genesis 1:1')
  assert.match(oneMatch.candidates[0].sourceUrl, /^https:\/\/www\.sefaria\.org\//)
  assert.match(oneMatch.candidates[0].quotedText, /In the beginning God created/)

  const multipleCandidates = discoverPhrase('mercy')
  assert.equal(multipleCandidates.state, 'multiple-candidates')
  assert.equal(multipleCandidates.ambiguity, 'ambiguous')
  assert.ok(multipleCandidates.candidates.length > 1)
  for (const candidate of multipleCandidates.candidates) {
    assert.ok(candidate.reference.length > 0)
    assert.ok(candidate.sourceUrl.startsWith('https://'))
    assert.ok(candidate.quotedText.length > 0)
    assert.equal('bridgingNote' in candidate, false)
  }
})

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

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