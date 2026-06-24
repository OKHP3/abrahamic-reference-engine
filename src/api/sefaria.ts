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
  license?: string
  licenseVetted?: boolean
  sources?: string[]
  error?: string
}

function collapseTextArray(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value
      .map(v => (typeof v === 'string' ? v : ''))
      .filter(Boolean)
      .join(' ')
      .replace(/<[^>]+>/g, '')
      .trim()
  }
  return (value ?? '').replace(/<[^>]+>/g, '').trim()
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

  const englishText = collapseTextArray(json.text)
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

  const english = collapseTextArray(json.text)
  const hebrew = collapseTextArray(json.he)
  const sourceUrl = `https://www.sefaria.org/${encodeURIComponent(ref)}?lang=bi`

  return {
    english,
    hebrew,
    passage: {
      reference: json.ref,
      displayReference: json.ref,
      tradition: 'judaism',
      primaryText: english,
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
