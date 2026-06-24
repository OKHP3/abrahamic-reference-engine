import type { Passage } from '../types'

const QURAN_COM_BASE = 'https://api.quran.com/api/v4'
const ALQURAN_BASE = 'https://api.alquran.cloud/v1'

export interface QuranComVerse {
  id: number
  verse_number: number
  verse_key: string
  text_uthmani: string
  translations: Array<{
    id: number
    text: string
    resource_name: string
  }>
}

export interface QuranComResponse {
  verse: QuranComVerse
}

export interface AlQuranResponse {
  code: number
  status: string
  data: {
    number: number
    text: string
    numberInSurah: number
    surah: {
      number: number
      name: string
      englishName: string
      englishNameTranslation: string
    }
    edition: {
      identifier: string
      name: string
      englishName: string
    }
  }
}

export function parseAyahKey(key: string): { surah: number; ayah: number } | null {
  const parts = key.split(':')
  if (parts.length !== 2) return null
  const surah = parseInt(parts[0], 10)
  const ayah = parseInt(parts[1], 10)
  if (isNaN(surah) || isNaN(ayah)) return null
  return { surah, ayah }
}

async function fetchFromQuranCom(
  key: string,
  translationId = '20'
): Promise<Passage> {
  const url = `${QURAN_COM_BASE}/verses/by_key/${key}?language=en&translations=${translationId}&words=false`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Quran.com API error ${res.status}: ${res.statusText}`)
  }

  const json: QuranComResponse = await res.json()
  const verse = json.verse
  const translation = verse.translations?.[0]

  if (!translation) {
    throw new Error(`Quran.com returned no translation for ayah: ${key}`)
  }

  const cleanText = translation.text.replace(/<[^>]+>/g, '').trim()
  const sourceUrl = `https://quran.com/${key}`

  return {
    reference: verse.verse_key,
    displayReference: `Quran ${verse.verse_key}`,
    tradition: 'islam',
    primaryText: cleanText,
    translationId: `quran-${translationId}`,
    translationName: translation.resource_name,
    sourceUrl,
    attribution: `${translation.resource_name} -- served via Quran.com`,
  }
}

async function fetchFromAlQuranCloud(
  key: string,
  edition = 'en.asad'
): Promise<Passage> {
  const url = `${ALQURAN_BASE}/ayah/${key}/${edition}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`AlQuran.cloud API error ${res.status}: ${res.statusText}`)
  }

  const json: AlQuranResponse = await res.json()
  if (json.code !== 200) {
    throw new Error(`AlQuran.cloud error: ${json.status}`)
  }

  const data = json.data
  const parsed = parseAyahKey(key)
  const surahNum = parsed?.surah ?? 0
  const sourceUrl = `https://quran.com/${surahNum}/${data.numberInSurah}`

  return {
    reference: key,
    displayReference: `Quran ${key}`,
    tradition: 'islam',
    primaryText: data.text.trim(),
    translationId: 'quran-arberry',
    translationName: data.edition.englishName,
    sourceUrl,
    attribution: `${data.edition.englishName} -- served via AlQuran.cloud`,
  }
}

export async function fetchAyah(
  key: string,
  translationId = '20'
): Promise<Passage> {
  try {
    return await fetchFromQuranCom(key, translationId)
  } catch (primaryError) {
    console.warn('Quran.com primary failed, trying AlQuran.cloud fallback:', primaryError)
    try {
      return await fetchFromAlQuranCloud(key, 'en.asad')
    } catch (fallbackError) {
      throw new Error(
        `Both Quran APIs failed.\nPrimary: ${(primaryError as Error).message}\nFallback: ${(fallbackError as Error).message}`
      )
    }
  }
}

export function formatAyahKey(surah: number, ayah: number): string {
  return `${surah}:${ayah}`
}
