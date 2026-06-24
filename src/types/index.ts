export type TraditionId =
  | 'christianity-evangelical'
  | 'christianity-catholic'
  | 'christianity-mainline'
  | 'christianity-lds'
  | 'christianity-orthodox'
  | 'judaism'
  | 'islam'

export type TraditionFamily = 'christianity' | 'judaism' | 'islam'

export interface PewCitation {
  source: string
  year: number
  url: string
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
}

export interface TraditionGroup {
  family: TraditionFamily
  label: string
  totalPewPercent: number
  denominations: Denomination[]
}

export type Mode = 'browse' | 'lookup' | 'compare'
