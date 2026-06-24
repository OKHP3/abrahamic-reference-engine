import type { Passage } from '../types'

const BASE_URL = 'https://bible-api.com'

export type BibleApiTranslation =
  | 'kjv'
  | 'web'
  | 'asv'
  | 'bbe'
  | 'darby'
  | 'akjv'
  | 'ylt'

export interface BibleApiVerse {
  book_id: string
  book_name: string
  chapter: number
  verse: number
  text: string
}

export interface BibleApiResponse {
  reference: string
  verses: BibleApiVerse[]
  text: string
  translation_id: string
  translation_name: string
  translation_note: string
  error?: string
}

const TRANSLATION_NAMES: Record<BibleApiTranslation, string> = {
  kjv: 'King James Version',
  web: 'World English Bible',
  asv: 'American Standard Version',
  bbe: 'Bible in Basic English',
  darby: 'Darby Translation',
  akjv: 'American King James Version',
  ylt: "Young's Literal Translation",
}

export async function fetchBiblePassage(
  reference: string,
  translation: BibleApiTranslation = 'kjv'
): Promise<Passage> {
  const encoded = encodeURIComponent(reference)
  const url = `${BASE_URL}/${encoded}?translation=${translation}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`bible-api.com error ${res.status}: ${res.statusText}`)
  }

  const json: BibleApiResponse = await res.json()

  if (json.error) {
    throw new Error(`bible-api.com reference error: ${json.error}`)
  }

  if (!json.text) {
    throw new Error(`bible-api.com returned empty text for reference: ${reference}`)
  }

  const cleanText = json.text.replace(/\n/g, ' ').trim()
  const translationName = json.translation_name || TRANSLATION_NAMES[translation] || translation.toUpperCase()
  const sourceUrl = `https://bible-api.com/${encoded}?translation=${translation}`

  return {
    reference: json.reference,
    displayReference: json.reference,
    tradition: 'christianity',
    primaryText: cleanText,
    translationId: translation,
    translationName,
    sourceUrl,
    attribution: `${translationName} -- served via bible-api.com. ${json.translation_note || ''}`.trim(),
  }
}

export function normalizeBibleRef(book: string, chapter: number, verse: number): string {
  return `${book} ${chapter}:${verse}`
}

export function normalizeBibleRange(
  book: string,
  chapter: number,
  verseStart: number,
  verseEnd: number
): string {
  return `${book} ${chapter}:${verseStart}-${verseEnd}`
}
