export type TraditionId =
  | 'christianity-evangelical'
  | 'christianity-catholic'
  | 'christianity-mainline'
  | 'christianity-lds'
  | 'christianity-orthodox'
  | 'judaism'
  | 'islam'

export type TraditionFamily = 'christianity' | 'judaism' | 'islam'

export type TranslationLicense = 'public-domain' | 'open-source' | 'licensed'

export type HadithCollection =
  | 'bukhari'
  | 'muslim'
  | 'abudawud'
  | 'tirmidhi'
  | 'nasai'
  | 'ibnmajah'

export interface PewCitation {
  source: string
  year: number
  url: string
  percentage?: number
}

export interface Tradition {
  family: TraditionFamily
  label: string
  pewPercent: number
  description: string
}

export interface Denomination {
  id: TraditionId
  name: string
  shortName: string
  family: TraditionFamily
  pewPercent: number
  pewCitation: PewCitation
  description: string
  keyTexts: string[]
  canonScope: string
  slug: string
  availableTranslations: string[]
  defaultTranslationId: string
  apiProvider: string
}

export interface TraditionGroup {
  family: TraditionFamily
  label: string
  totalPewPercent: number
  denominations: Denomination[]
}

export type Mode = 'browse' | 'lookup' | 'compare'

export interface Translation {
  id: string
  name: string
  shortName: string
  family: TraditionFamily
  denominationIds: TraditionId[]
  license: TranslationLicense
  attribution: string
  apiProvider: string
  apiTranslationId?: string
  notes?: string
}

export interface Verse {
  reference: string
  text: string
  translationId: string
  translationName: string
  tradition: TraditionFamily
  sourceUrl: string
}

export interface Passage {
  reference: string
  displayReference: string
  tradition: TraditionFamily
  primaryText: string
  translationId: string
  translationName: string
  sourceUrl: string
  attribution: string
}

export interface Hadith {
  collection: HadithCollection
  number: number
  text: string
  bookName?: string
  attribution: string
  sourceUrl: string
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResult<T> {
  status: ApiStatus
  data: T | null
  error: string | null
}
