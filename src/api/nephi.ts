import type { Passage } from '../types'

const BASE_URL = 'https://scriptures.nephi.org'

export const LDS_UNAVAILABLE_MSG =
  'The LDS Standard Works (Book of Mormon, D&C, Pearl of Great Price) are not ' +
  'available via a guaranteed free API at this time. ' +
  'Visit churchofjesuschrist.org/study/scriptures to look up this passage.'

export class LdsApiUnavailableError extends Error {
  readonly isLdsFallback = true
  constructor() {
    super(LDS_UNAVAILABLE_MSG)
    this.name = 'LdsApiUnavailableError'
  }
}

// Lowercase Bible book name prefixes used to determine whether an LDS-mode
// reference routes to bible-api.com (Bible KJV) or scriptures.nephi.org
// (Book of Mormon, D&C, Pearl of Great Price).
// Source: 66-book Protestant canon -- the KJV used by the LDS church.
const BIBLE_BOOK_PREFIXES: string[] = [
  'genesis', 'gen', 'exodus', 'exod', 'leviticus', 'lev', 'numbers', 'num',
  'deuteronomy', 'deut', 'joshua', 'josh', 'judges', 'judg', 'ruth',
  '1 samuel', '2 samuel', '1 kings', '2 kings',
  '1 chronicles', '2 chronicles', 'ezra', 'nehemiah', 'neh', 'esther', 'est',
  'job', 'psalm', 'psalms', 'proverbs', 'prov', 'ecclesiastes', 'eccl',
  'song', 'isaiah', 'isa', 'jeremiah', 'jer', 'lamentations', 'lam',
  'ezekiel', 'ezek', 'daniel', 'dan', 'hosea', 'joel', 'amos',
  'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah',
  'haggai', 'zechariah', 'zech', 'malachi', 'mal',
  'matthew', 'matt', 'mark', 'luke', 'john', 'acts', 'romans', 'rom',
  '1 corinthians', '2 corinthians', 'galatians', 'gal', 'ephesians', 'eph',
  'philippians', 'phil', 'colossians', 'col',
  '1 thessalonians', '2 thessalonians', '1 timothy', '2 timothy',
  'titus', 'philemon', 'phlm', 'hebrews', 'heb', 'james', 'jas',
  '1 peter', '2 peter', '1 john', '2 john', '3 john', 'jude',
  'revelation', 'rev',
]

export function isLdsBibleRef(reference: string): boolean {
  const lower = reference.toLowerCase().trim()
  for (const prefix of BIBLE_BOOK_PREFIXES) {
    if (
      lower.startsWith(prefix + ' ') ||
      lower.startsWith(prefix + ':') ||
      lower === prefix
    ) {
      return true
    }
  }
  return false
}

interface NephiVerseResponse {
  scripture_phrase?: string
  text?: string
  verse?: string
  reference?: string
  [key: string]: unknown
}

// Fetch a passage from the LDS Standard Works via scriptures.nephi.org.
// Reference formats (per okhp3-verse-lookup SKILL.md):
//   Book of Mormon: "1 Ne. 3:7", "Alma 32:21", "Moro. 10:4-5"
//   D&C:           "D&C 76:22", "D&C 1:37"
//   Pearl of Price: "Moses 1:39", "Abraham 3:22", "A of F 1:13"
//
// This is a community API with no uptime guarantee.
// Any failure (network, 4xx, 5xx, bad JSON) throws LdsApiUnavailableError
// so the caller can surface the skill-defined fallback message.
export async function fetchNephiPassage(reference: string): Promise<Passage> {
  try {
    const encoded = encodeURIComponent(reference.trim())
    const res = await fetch(`${BASE_URL}/verses/${encoded}`, {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new LdsApiUnavailableError()
    const json: NephiVerseResponse = await res.json()
    const raw = json.scripture_phrase ?? json.text ?? json.verse ?? ''
    const text =
      typeof raw === 'string'
        ? raw.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').trim()
        : ''
    if (!text) throw new LdsApiUnavailableError()
    const displayRef =
      typeof json.reference === 'string' && json.reference ? json.reference : reference
    return {
      reference,
      displayReference: displayRef,
      tradition: 'christianity',
      primaryText: text,
      translationId: 'lds-scriptures',
      translationName: 'LDS Standard Works',
      sourceUrl: 'https://www.churchofjesuschrist.org/study/scriptures',
      attribution: 'LDS Standard Works -- served via scriptures.nephi.org (community)',
    }
  } catch (err) {
    if (err instanceof LdsApiUnavailableError) throw err
    throw new LdsApiUnavailableError()
  }
}
