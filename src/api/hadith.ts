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
): Promise<Passage> {
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
  text: string
): Hadith {
  return {
    collection,
    number,
    text,
    attribution: `${COLLECTION_DISPLAY_NAMES[collection]} #${number} -- via github.com/fawazahmed0/hadith-api (CC BY-4.0)`,
    sourceUrl: `https://sunnah.com/${collection}:${number}`,
  }
}

export async function fetchHadithBatch(
  collection: HadithCollection,
  numbers: number[]
): Promise<Hadith[]> {
  const editionKey = `eng-${collection}`
  const results = await Promise.allSettled(
    numbers.map(async (n) => {
      const url = `${CDN_BASE}/${editionKey}/${n}.json`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`${res.status}`)
      const json: FawazHadithResponse = await res.json()
      const entry = json.hadiths?.[0]
      if (!entry?.text) throw new Error('No text')
      return buildHadithMeta(collection, n, entry.text.trim())
    })
  )
  return results
    .filter((r): r is PromiseFulfilledResult<Hadith> => r.status === 'fulfilled')
    .map(r => r.value)
}
