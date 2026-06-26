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

import type { Passage } from '../types'
import { fetchSefariaText } from './sefaria'
import { fetchAyah } from './quran'
import { fetchBiblePassage } from './bible'
import type { BibleApiTranslation } from './bible'

export interface FetchPassageOptions {
  tradition: 'judaism' | 'christianity' | 'islam'
  reference: string
  translationId?: string
}

export async function fetchPassage(opts: FetchPassageOptions): Promise<Passage> {
  const { tradition, reference, translationId } = opts

  switch (tradition) {
    case 'judaism': {
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
      const quranTranslId = translationId?.replace('quran-', '') ?? '20'
      return fetchAyah(reference, quranTranslId)
    }

    default: {
      const _exhaustive: never = tradition
      throw new Error(`Unknown tradition: ${_exhaustive}`)
    }
  }
}
