export type JudaismTranslationId = 'sefaria-en' | 'sefaria-he-en'

export type ChristianityTranslationId =
  | 'kjv'
  | 'web'
  | 'asv'
  | 'bbe'
  | 'darby'
  | 'akjv'
  | 'ylt'
  | 'douay'

export type IslamTranslationId =
  | 'quran-20'
  | 'quran-21'
  | 'quran-22'
  | 'quran-23'
  | 'quran-24'

export type DenominationId =
  | 'christianity-evangelical'
  | 'christianity-catholic'
  | 'christianity-mainline'
  | 'christianity-lds'
  | 'christianity-orthodox'
  | 'judaism'
  | 'islam'

export interface ARESettings {
  theme: 'dark' | 'light' | 'system'
  defaultTranslations: {
    judaism: JudaismTranslationId
    christianity: ChristianityTranslationId
    islam: IslamTranslationId
  }
  denomination: DenominationId | null
  showPewExplainer: boolean
  compareLanguage: 'en'
}

export const DEFAULT_SETTINGS: ARESettings = {
  theme: 'system',
  defaultTranslations: {
    judaism: 'sefaria-en',
    christianity: 'kjv',
    islam: 'quran-20',
  },
  denomination: null,
  showPewExplainer: true,
  compareLanguage: 'en',
}

export function loadSettings(): ARESettings {
  try {
    const raw = localStorage.getItem('are-settings')
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: ARESettings): void {
  try {
    localStorage.setItem('are-settings', JSON.stringify(settings))
  } catch {
    // ignore -- localStorage not available
  }
}

export interface DenominationMapping {
  defaultChristianityTranslation: ChristianityTranslationId | null
  translationNote: string | null
}

export const DENOMINATION_TRANSLATION_MAP: Record<DenominationId, DenominationMapping> = {
  'christianity-evangelical': {
    defaultChristianityTranslation: 'kjv',
    translationNote: null,
  },
  'christianity-catholic': {
    defaultChristianityTranslation: 'web',
    translationNote: 'WEB includes deuterocanonical books. NABRE is not available in the free build.',
  },
  'christianity-mainline': {
    defaultChristianityTranslation: 'kjv',
    translationNote: 'NRSV is not available in the free build. Defaulting to KJV.',
  },
  'christianity-lds': {
    defaultChristianityTranslation: 'kjv',
    translationNote: null,
  },
  'christianity-orthodox': {
    defaultChristianityTranslation: 'web',
    translationNote: 'WEB covers most deuterocanonical books available via the free API.',
  },
  'judaism': {
    defaultChristianityTranslation: null,
    translationNote: null,
  },
  'islam': {
    defaultChristianityTranslation: null,
    translationNote: null,
  },
}

export const DENOMINATION_LABELS: Record<DenominationId, string> = {
  'christianity-evangelical': 'Evangelical / Baptist',
  'christianity-catholic': 'Roman Catholic',
  'christianity-mainline': 'Mainline Protestant',
  'christianity-lds': 'Latter-day Saint (LDS)',
  'christianity-orthodox': 'Eastern Orthodox',
  'judaism': 'Jewish',
  'islam': 'Muslim',
}

export function getChristianDenominationSlug(
  id: DenominationId | null,
): 'catholic' | 'protestant' | 'lds' | 'orthodox' | null {
  if (!id) return null
  switch (id) {
    case 'christianity-catholic': return 'catholic'
    case 'christianity-lds': return 'lds'
    case 'christianity-orthodox': return 'orthodox'
    case 'christianity-evangelical':
    case 'christianity-mainline': return 'protestant'
    default: return null
  }
}
