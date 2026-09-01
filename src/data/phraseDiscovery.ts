import type { TraditionFamily } from '../types'
import { COMPARE_THEMES } from './compareThemes'
import { TRANSLATION_BY_ID } from './translations'

/**
 * The phrase search contract is intentionally narrower than paraphrase search.
 * Keep the corpus and matching method inspectable before making public claims
 * about what a phrase result means.
 */
export const PHRASE_DISCOVERY_POLICY = {
  corpus:
    'The checked-in static quotations in COMPARE_THEMES without editorial ellipsis truncation, limited to the three in-scope traditions and their declared source translations.',
  matching:
    'Case-insensitive literal contiguous phrase matching after Unicode NFKC normalization and whitespace collapsing, with letter/number boundaries.',
  excludes:
    'No paraphrase, fuzzy matching, stemming, semantic ranking, generated interpretation, or provider-wide/full-canon search.',
} as const

export type PhraseDiscoveryState = 'no-match' | 'one-match' | 'multiple-candidates'

export interface PhraseDiscoveryCandidate {
  tradition: TraditionFamily
  reference: string
  displayReference: string
  quotedText: string
  translationId: string
  translationName: string
  sourceUrl: string
}

export interface PhraseDiscoveryResult {
  query: string
  state: PhraseDiscoveryState
  ambiguity: 'none' | 'ambiguous'
  candidates: PhraseDiscoveryCandidate[]
}

interface PhraseSourceRecord {
  tradition: TraditionFamily
  reference: string
  displayReference: string
  quotedText: string
  translationId: 'sefaria-en' | 'kjv' | 'quran-20'
}

const SOURCE_TRANSLATION_BY_FAMILY: Record<TraditionFamily, PhraseSourceRecord['translationId']> = {
  judaism: 'sefaria-en',
  christianity: 'kjv',
  islam: 'quran-20',
}

function buildSourceUrl(record: PhraseSourceRecord): string {
  const encodedReference = encodeURIComponent(record.reference)
  if (record.tradition === 'judaism') {
    return `https://www.sefaria.org/${encodedReference}?lang=bi`
  }
  if (record.tradition === 'christianity') {
    const apiTranslationId = TRANSLATION_BY_ID[record.translationId]?.apiTranslationId ?? 'kjv'
    return `https://bible-api.com/${encodedReference}?translation=${apiTranslationId}`
  }
  return `https://quran.com/${record.reference}`
}

/**
 * Publicly inspectable source corpus. Theme descriptions and bridging notes
 * are deliberately not included because they are editorial, not quotations.
 */
export const PHRASE_SOURCE_CORPUS: readonly PhraseSourceRecord[] = COMPARE_THEMES.flatMap(theme =>
  (Object.keys(SOURCE_TRANSLATION_BY_FAMILY) as TraditionFamily[]).map(tradition => {
    const passage = theme.passages[tradition]
    return {
      tradition,
      reference: passage.lookup,
      displayReference: passage.displayRef,
      quotedText: passage.staticText,
      translationId: SOURCE_TRANSLATION_BY_FAMILY[tradition],
    }
  })
).filter(record => !record.quotedText.includes('...'))

function normalizePhrase(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/\s+/g, ' ').trim()
}

function isLetterOrNumber(value: string | undefined): boolean {
  return value ? /[\p{L}\p{N}]/u.test(value) : false
}

function containsLiteralPhrase(sourceText: string, query: string): boolean {
  let start = normalizePhrase(sourceText).indexOf(query)
  while (start >= 0) {
    const source = normalizePhrase(sourceText)
    const end = start + query.length
    if (!isLetterOrNumber(source[start - 1]) && !isLetterOrNumber(source[end])) {
      return true
    }
    start = source.indexOf(query, start + 1)
  }
  return false
}

export function discoverPhrase(query: string): PhraseDiscoveryResult {
  const normalizedQuery = normalizePhrase(query)
  if (!normalizedQuery) {
    return {
      query: query.trim(),
      state: 'no-match',
      ambiguity: 'none',
      candidates: [],
    }
  }

  const seen = new Set<string>()
  const candidates: PhraseDiscoveryCandidate[] = []

  for (const record of PHRASE_SOURCE_CORPUS) {
    if (!containsLiteralPhrase(record.quotedText, normalizedQuery)) continue
    const key = `${record.tradition}:${record.reference}:${record.translationId}`
    if (seen.has(key)) continue
    seen.add(key)

    const translation = TRANSLATION_BY_ID[record.translationId]
    candidates.push({
      tradition: record.tradition,
      reference: record.reference,
      displayReference: record.displayReference,
      quotedText: record.quotedText,
      translationId: record.translationId,
      translationName: translation?.name ?? record.translationId,
      sourceUrl: buildSourceUrl(record),
    })
  }

  const state: PhraseDiscoveryState =
    candidates.length === 0
      ? 'no-match'
      : candidates.length === 1
      ? 'one-match'
      : 'multiple-candidates'

  return {
    query: query.trim(),
    state,
    ambiguity: state === 'multiple-candidates' ? 'ambiguous' : 'none',
    candidates,
  }
}