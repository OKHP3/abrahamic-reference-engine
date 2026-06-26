import type { Passage, Hadith, HadithCollection } from '../types'

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions'

export const COLLECTION_DISPLAY_NAMES: Record<HadithCollection, string> = {
  bukhari: 'Sahih al-Bukhari',
  muslim: 'Sahih Muslim',
  abudawud: 'Sunan Abu Dawud',
  tirmidhi: "Jami' at-Tirmidhi",
  nasai: "Sunan an-Nasa'i",
  ibnmajah: 'Sunan Ibn Majah',
}

interface FawazHadithEntry {
  hadithnumber: number
  arabicnumber?: number
  text: string
  reference?: {
    book?: number
    hadith?: number
  }
}

interface FawazCollectionResponse {
  metadata?: {
    name: string
    section?: Record<string, string>
  }
  hadiths: FawazHadithEntry[]
}

// In-memory cache: keyed by collection name.
// The per-hadith jsDelivr URL format (/{number}.json) returns HTTP 404 as of 2026-06-25.
// The collection-level .min.json is fetched once per collection and cached for the session.
const collectionCache = new Map<HadithCollection, FawazCollectionResponse>()

async function fetchCollection(collection: HadithCollection): Promise<FawazCollectionResponse> {
  const cached = collectionCache.get(collection)
  if (cached) return cached

  const editionKey = `eng-${collection}`
  const url = `${CDN_BASE}/${editionKey}.min.json`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(
      `Hadith collection fetch error ${res.status} for ${collection} -- ${res.statusText}`
    )
  }
  const json: FawazCollectionResponse = await res.json()
  collectionCache.set(collection, json)
  return json
}

export async function fetchHadith(
  collection: HadithCollection,
  number: number
): Promise<Passage> {
  const col = await fetchCollection(collection)
  const entry = col.hadiths.find(h => h.hadithnumber === number)

  if (!entry?.text) {
    throw new Error(
      `No hadith text found for ${collection} #${number}`
    )
  }

  const displayName = COLLECTION_DISPLAY_NAMES[collection]
  const reference = `${displayName} #${number}`
  const sourceUrl = `https://sunnah.com/${collection}:${number}`

  return {
    reference,
    displayReference: reference,
    tradition: 'islam',
    primaryText: entry.text.trim(),
    translationId: 'hadith-en',
    translationName: `${displayName} (English)`,
    sourceUrl,
    attribution: `${displayName} #${number} -- via github.com/fawazahmed0/hadith-api (CC BY-4.0)`,
  }
}

export function getCollectionDisplayName(collection: HadithCollection): string {
  return COLLECTION_DISPLAY_NAMES[collection]
}

export const HADITH_COLLECTION_SIZES: Record<HadithCollection, number> = {
  bukhari: 7563,
  muslim: 5362,
  abudawud: 5274,
  tirmidhi: 3956,
  nasai: 5761,
  ibnmajah: 4341,
}

export function buildHadithMeta(
  collection: HadithCollection,
  number: number,
  text: string,
  bookName?: string
): Hadith {
  return {
    collection,
    number,
    text,
    bookName,
    attribution: `${COLLECTION_DISPLAY_NAMES[collection]} #${number} -- via github.com/fawazahmed0/hadith-api (CC BY-4.0)`,
    sourceUrl: `https://sunnah.com/${collection}:${number}`,
  }
}

export async function fetchHadithBatch(
  collection: HadithCollection,
  numbers: number[]
): Promise<Hadith[]> {
  const col = await fetchCollection(collection)
  const byNumber = new Map(col.hadiths.map(h => [h.hadithnumber, h]))

  return numbers.flatMap(n => {
    const entry = byNumber.get(n)
    if (!entry?.text) return []
    const bookNo = entry.reference?.book
    const bookName =
      bookNo != null
        ? col.metadata?.section?.[String(bookNo)] ?? undefined
        : undefined
    return [buildHadithMeta(collection, n, entry.text.trim(), bookName)]
  })
}
