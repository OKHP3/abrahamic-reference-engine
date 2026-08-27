import type { Passage } from '../types'

const BASE_URL = 'https://www.sefaria.org/api/texts'

export type SefariaLang = 'en' | 'he' | 'he-en'

export interface SefariaTextResponse {
  ref: string
  heRef: string
  text: string | string[]
  he: string | string[]
  book: string
  categories: string[]
  type: string
  sections?: number[]
  toSections?: number[]
  license?: string
  licenseVetted?: boolean
  sources?: string[]
  error?: string
}

function cleanSefariaText(value: string): string {
  return value
    .replace(/<i[^>]*class=["'][^"']*footnote[^"']*["'][^>]*>[\s\S]*?<\/i>/gi, '')
    .replace(/<sup[^>]*class=["'][^"']*footnote-marker[^"']*["'][^>]*>[\s\S]*?<\/sup>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function selectRequestedSegments(
  value: string | string[],
  response: SefariaTextResponse
): string | string[] {
  if (!Array.isArray(value)) return value ?? ''

  const sections = response.sections ?? []
  const toSections = response.toSections ?? sections
  const startChapter = Number(sections[0])
  const endChapter = Number(toSections[0])
  const startVerse = Number(sections[1])
  const endVerse = Number(toSections[1])

  // Sefaria may return the full chapter array for a verse reference. Slice
  // same-chapter requests so a single citation never becomes a whole chapter.
  if (
    sections.length >= 2 &&
    toSections.length >= 2 &&
    startChapter === endChapter &&
    Number.isInteger(startVerse) &&
    Number.isInteger(endVerse) &&
    startVerse > 0 &&
    endVerse >= startVerse
  ) {
    return value.slice(startVerse - 1, endVerse)
  }

  return value
}

function collapseTextArray(
  value: string | string[],
  response: SefariaTextResponse
): string {
  const selected = selectRequestedSegments(value, response)
  if (Array.isArray(selected)) {
    return selected
      .map(v => (typeof v === 'string' ? cleanSefariaText(v) : ''))
      .filter(Boolean)
      .join(' ')
      .trim()
  }
  return cleanSefariaText(selected)
}

export async function fetchSefariaText(
  ref: string,
  lang: SefariaLang = 'en'
): Promise<Passage> {
  const encoded = encodeURIComponent(ref)
  const url = `${BASE_URL}/${encoded}?lang=${lang}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Sefaria API error ${res.status}: ${res.statusText}`)
  }

  const json: SefariaTextResponse = await res.json()

  if (json.error) {
    throw new Error(`Sefaria reference error: ${json.error}`)
  }

  const englishText = collapseTextArray(json.text, json)
  if (!englishText) {
    throw new Error(`Sefaria returned empty text for ref: ${ref}`)
  }

  const sourceUrl = `https://www.sefaria.org/${encodeURIComponent(ref)}?lang=bi`

  return {
    reference: json.ref,
    displayReference: json.ref,
    tradition: 'judaism',
    primaryText: englishText,
    translationId: 'sefaria-en',
    translationName: 'Sefaria English',
    sourceUrl,
    attribution: 'Sefaria.org -- CC BY-SA 2.0',
  }
}

export async function fetchSefariaBilingual(
  ref: string
): Promise<{ english: string; hebrew: string; passage: Passage }> {
  const encoded = encodeURIComponent(ref)
  const url = `${BASE_URL}/${encoded}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Sefaria API error ${res.status}: ${res.statusText}`)
  }

  const json: SefariaTextResponse = await res.json()

  if (json.error) {
    throw new Error(`Sefaria reference error: ${json.error}`)
  }

  const english = collapseTextArray(json.text, json)
  const hebrew = collapseTextArray(json.he, json)
  if (!english || !hebrew) {
    throw new Error(`Sefaria returned incomplete bilingual text for ref: ${ref}`)
  }
  const sourceUrl = `https://www.sefaria.org/${encodeURIComponent(ref)}?lang=bi`

  return {
    english,
    hebrew,
    passage: {
      reference: json.ref,
      displayReference: json.ref,
      tradition: 'judaism',
      primaryText: english,
      secondaryText: hebrew,
      secondaryLabel: 'Hebrew original',
      secondaryDirection: 'rtl',
      translationId: 'sefaria-he-en',
      translationName: 'Sefaria Hebrew + English',
      sourceUrl,
      attribution: 'Sefaria.org -- CC BY-SA 2.0',
    },
  }
}

export function formatSefariaRef(book: string, chapter: number, verse: number): string {
  return `${book} ${chapter}:${verse}`
}
