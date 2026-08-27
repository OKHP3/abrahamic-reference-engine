export { fetchSefariaText, fetchSefariaBilingual, formatSefariaRef } from './sefaria'
export type { SefariaLang, SefariaTextResponse } from './sefaria'

export { fetchAyah, parseAyahKey, formatAyahKey } from './quran'
export type { QuranComVerse, QuranComResponse } from './quran'

export { fetchBiblePassage, normalizeBibleRef, normalizeBibleRange } from './bible'
export type { BibleApiTranslation, BibleApiResponse } from './bible'

export {
  fetchHadith,
  getCollectionDisplayName,
  HADITH_COLLECTION_SIZES,
  buildHadithMeta,
  COLLECTION_DISPLAY_NAMES,
} from './hadith'

export {
  fetchNephiPassage,
  isLdsBibleRef,
  LdsApiUnavailableError,
  LDS_UNAVAILABLE_MSG,
} from './nephi'

/**
 * Public product boundary for passage discovery and context.
 *
 * Keep these capabilities explicit so UI copy and acceptance tests cannot
 * imply that the exact-reference prototype supports generated discovery or
 * commentary controls.
 */
export const LOOKUP_CAPABILITIES = {
  exactReferenceLookup: true,
  paraphraseSearch: false,
  contextModes: false,
  seededThemeComparisons: true,
} as const

import type { Passage, TraditionFamily } from '../types'
import { fetchSefariaBilingual, fetchSefariaText } from './sefaria'
import { fetchAyah } from './quran'
import { fetchBiblePassage } from './bible'
import type { BibleApiTranslation } from './bible'
import { TRANSLATION_BY_ID } from '../data/translations'

export interface FetchPassageOptions {
  tradition: 'judaism' | 'christianity' | 'islam'
  /** An exact source reference, not a paraphrase or free-text query. */
  reference: string
  translationId?: string
}

/**
 * Guard the UI boundary against free-text discovery requests.
 *
 * Provider adapters still own canonical reference validation and response
 * normalization. This check only decides whether a value looks like a
 * reference-shaped input before a lookup begins.
 */
export function isLikelyValidRef(tradition: TraditionFamily, ref: string): boolean {
  const trimmed = ref.trim()
  if (!trimmed) return false
  if (tradition === 'islam') return /^\d+:\d+$/.test(trimmed)
  return /^[1-9]?\s?[a-zA-Z].*\s\d/.test(trimmed)
}

export async function fetchPassage(opts: FetchPassageOptions): Promise<Passage> {
  const { tradition, reference, translationId } = opts

  switch (tradition) {
    case 'judaism': {
      if (translationId === 'sefaria-he-en') {
        const { passage } = await fetchSefariaBilingual(reference)
        return passage
      }
      return fetchSefariaText(reference, 'en')
    }

    case 'christianity': {
      // Map internal ARE translation IDs to bible-api.com API codes.
      // The internal id ('douay') may differ from the API param ('dra').
      const CHRISTIAN_API_CODES: Partial<Record<string, BibleApiTranslation>> = {
        douay: 'dra',
      }
      const xlation = (CHRISTIAN_API_CODES[translationId ?? ''] ?? translationId ?? 'kjv') as BibleApiTranslation
      return fetchBiblePassage(reference, xlation)
    }

    case 'islam': {
      // Look up apiTranslationId and apiProvider from translation data.
      // Some translations (Arberry, Shakir) are served by AlQuran.cloud rather than Quran.com.
      // Pass provider so fetchAyah routes directly to the correct API without
      // attempting Quran.com first (which would return wrong or missing text).
      const translationRecord = translationId ? TRANSLATION_BY_ID[translationId] : undefined
      const quranTranslId = translationRecord?.apiTranslationId ?? translationId?.replace('quran-', '') ?? '20'
      const provider = (translationRecord?.apiProvider === 'alquran.cloud' ? 'alquran.cloud' : 'quran.com') as 'quran.com' | 'alquran.cloud'
      return fetchAyah(reference, quranTranslId, provider, translationId ?? `quran-${quranTranslId}`)
    }

    default: {
      const _exhaustive: never = tradition
      throw new Error(`Unknown tradition: ${_exhaustive}`)
    }
  }
}
