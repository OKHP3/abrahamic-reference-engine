import type { TraditionFamily } from '../types'
import type { CompareTheme } from './compareThemes'
import { COMPARE_THEMES, FEATURED_THEME_IDS } from './compareThemes'

const SCRIPTURE_THEME_MAP: Record<TraditionFamily, Record<string, string[]>> = {
  judaism: {
    genesis:       ['creation', 'covenant', 'sanctity-of-life'],
    exodus:        ['covenant', 'justice'],
    leviticus:     ['the-golden-rule', 'justice'],
    numbers:       ['peace'],
    deuteronomy:   ['prayer', 'monotheism', 'love-of-god'],
    psalms:        ['mercy', 'forgiveness', 'trust-in-god', 'divine-light', 'gratitude', 'repentance'],
    proverbs:      ['wisdom', 'charity', 'knowledge-and-learning'],
    isaiah:        ['attributes-of-god', 'peace'],
    jeremiah:      ['covenant', 'repentance'],
    ezekiel:       ['repentance', 'justice'],
    hosea:         ['repentance', 'love-of-god'],
    amos:          ['justice'],
    micah:         ['humility', 'justice'],
    job:           ['trust-in-god', 'humility'],
    ecclesiastes:  ['wisdom'],
    ruth:          ['the-golden-rule'],
    'song of songs': ['love-of-god'],
    lamentations:  ['repentance'],
    zechariah:     ['peace'],
    malachi:       ['repentance', 'covenant'],
  },
  christianity: {
    matthew:          ['the-golden-rule', 'prayer', 'mercy', 'justice', 'forgiveness', 'charity', 'sanctity-of-life', 'love-of-god'],
    mark:             ['the-golden-rule', 'repentance'],
    luke:             ['repentance', 'charity', 'the-golden-rule'],
    john:             ['creation', 'divine-light', 'love-of-god'],
    acts:             ['repentance', 'covenant'],
    romans:           ['trust-in-god', 'attributes-of-god', 'forgiveness'],
    '1 corinthians':  ['monotheism', 'charity', 'wisdom'],
    '2 corinthians':  ['mercy', 'forgiveness'],
    galatians:        ['the-golden-rule', 'covenant'],
    ephesians:        ['peace', 'forgiveness'],
    philippians:      ['peace', 'humility', 'gratitude'],
    colossians:       ['knowledge-and-learning', 'wisdom'],
    '1 thessalonians': ['gratitude', 'prayer'],
    '2 thessalonians': ['trust-in-god'],
    '1 timothy':      ['wisdom', 'humility'],
    '2 timothy':      ['knowledge-and-learning'],
    hebrews:          ['covenant', 'trust-in-god'],
    james:            ['wisdom', 'charity', 'humility'],
    '1 peter':        ['humility', 'peace'],
    '2 peter':        ['repentance'],
    '1 john':         ['love-of-god', 'the-golden-rule', 'mercy'],
    revelation:       ['divine-light', 'covenant'],
  },
  islam: {
    '1':   ['prayer'],
    '2':   ['charity', 'covenant', 'wisdom', 'love-of-god'],
    '3':   ['monotheism', 'covenant'],
    '4':   ['the-golden-rule', 'justice'],
    '5':   ['peace', 'sanctity-of-life'],
    '6':   ['monotheism'],
    '7':   ['repentance', 'covenant'],
    '9':   ['repentance'],
    '14':  ['gratitude'],
    '17':  ['prayer', 'knowledge-and-learning'],
    '20':  ['repentance'],
    '21':  ['creation', 'mercy'],
    '24':  ['divine-light'],
    '25':  ['humility'],
    '31':  ['wisdom', 'gratitude'],
    '36':  ['creation', 'sanctity-of-life'],
    '39':  ['forgiveness', 'attributes-of-god'],
    '49':  ['the-golden-rule', 'peace'],
    '57':  ['charity'],
    '59':  ['attributes-of-god', 'monotheism'],
    '65':  ['trust-in-god'],
    '67':  ['creation', 'attributes-of-god'],
    '75':  ['repentance', 'sanctity-of-life'],
    '96':  ['knowledge-and-learning'],
    '112': ['monotheism', 'attributes-of-god'],
    '113': ['prayer'],
    '114': ['prayer'],
  },
}

function extractBookKey(tradition: TraditionFamily, ref: string): string {
  const normalized = ref.toLowerCase().trim()
  if (tradition === 'islam') {
    const match = normalized.match(/(\d+)\s*:/)
    return match ? match[1] : normalized.split(':')[0].trim()
  }
  return normalized.replace(/\s+\d.*$/, '').trim()
}

export function getThemesForPassage(tradition: TraditionFamily, ref: string): string[] {
  if (!ref.trim()) return []
  const key = extractBookKey(tradition, ref)
  return (SCRIPTURE_THEME_MAP[tradition][key] ?? []).slice(0, 3)
}

export function getContextualThemes(
  tradition: TraditionFamily,
  ref: string
): CompareTheme[] {
  const ids = getThemesForPassage(tradition, ref)
  const pool = ids.length > 0 ? ids : FEATURED_THEME_IDS.slice(0, 3)
  return pool
    .map(id => COMPARE_THEMES.find(t => t.id === id))
    .filter((t): t is CompareTheme => t !== undefined)
}

export function isContextualMatch(tradition: TraditionFamily, ref: string): boolean {
  return getThemesForPassage(tradition, ref).length > 0
}
