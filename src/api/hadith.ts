import type { Hadith, HadithCollection } from '../types'

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions'

const COLLECTION_DISPLAY_NAMES: Record<HadithCollection, string> = {
  bukhari: 'Sahih al-Bukhari',
  muslim: 'Sahih Muslim',
  abudawud: 'Sunan Abu Dawud',
  tirmidhi: "Jami' at-Tirmidhi",
  nasai: "Sunan an-Nasa'i",
  ibnmajah: 'Sunan Ibn Majah',
}

interface FawazHadithEntry {
  hadithnumber: number
  text: string
}

interface FawazHadithResponse {
  metadata?: {
    name: string
    section?: Record<string, string>
  }
  hadiths: FawazHadithEntry[]
}

export async function fetchHadith(
  collection: HadithCollection,
  number: number
): Promise<Hadith> {
  const editionKey = `eng-${collection}`
  const url = `${CDN_BASE}/${editionKey}/${number}.json`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(
      `Hadith API error ${res.status} for ${collection}:${number} -- ${res.statusText}`
    )
  }

  const json: FawazHadithResponse = await res.json()
  const entry = json.hadiths?.[0]

  if (!entry?.text) {
    throw new Error(
      `No hadith text returned for ${collection} #${number}`
    )
  }

  const displayName = COLLECTION_DISPLAY_NAMES[collection]
  const sourceUrl = `https://sunnah.com/${collection}:${number}`

  return {
    collection,
    number,
    text: entry.text.trim(),
    attribution: `${displayName} #${number} -- via github.com/fawazahmed0/hadith-api (CC BY-4.0)`,
    sourceUrl,
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
