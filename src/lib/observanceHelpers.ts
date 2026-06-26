/**
 * observanceHelpers.ts
 * Abrahamic Reference Engine -- Observances Tab
 *
 * Shared types, emoji registry, color map, and reference data
 * consumed by christianCalendar, hebcalClient, aladhanClient,
 * wikipediaClient, and icsGenerator.
 *
 * Zero dependencies. Zero cost. MIT license.
 * OverKill Hill P³™ / FoundRy -- okhp3.github.io/abrahamic-reference-engine
 */

// ---------------------------------------------------------------------------
// Core type
// ---------------------------------------------------------------------------

export type Tradition = 'judaism' | 'christianity' | 'islam';

export type Denomination =
  | 'all'
  | 'catholic'
  | 'orthodox'
  | 'protestant'
  | 'lds'
  | 'evangelical'
  | 'restorationist';

export type ObservanceSource = 'hebcal' | 'aladhan' | 'algorithm';

export interface ObservanceEvent {
  /** Unique identifier: "{tradition}-{slug}-{year}-{dateISO}" */
  id: string;
  /** Display title with emoji prefix: "✡️ Rosh Hashanah" */
  title: string;
  /** Holiday name without emoji: "Rosh Hashanah" */
  rawName: string;
  /** UTF-8 emoji for this tradition */
  emoji: string;
  tradition: Tradition;
  denomination: Denomination;
  startDate: Date;
  /** Equals startDate for single-day events */
  endDate: Date;
  isMultiDay: boolean;
  /** Hebrew script name -- Jewish holidays only */
  hebrewName?: string;
  /** Hijri date string -- Islamic holidays only, e.g. "1 Muharram 1448 AH" */
  hijriDate?: string;
  /** Hebcal permalink or source URL */
  sourceUrl?: string;
  /** Wikipedia article title for description lookup */
  wikiArticle?: string;
  source: ObservanceSource;
}

// ---------------------------------------------------------------------------
// Emoji registry
// ---------------------------------------------------------------------------

/** Canonical UTF-8 emoji per tradition/denomination */
export const TRADITION_EMOJI: Record<string, string> = {
  judaism: '✡️',
  christianity_western: '✝️',
  christianity_orthodox: '☦️',
  islam: '☪️',
} as const;

/** Resolve emoji for an ObservanceEvent */
export function resolveEmoji(tradition: Tradition, denomination: Denomination): string {
  if (tradition === 'judaism') return TRADITION_EMOJI.judaism;
  if (tradition === 'islam') return TRADITION_EMOJI.islam;
  if (tradition === 'christianity') {
    return denomination === 'orthodox'
      ? TRADITION_EMOJI.christianity_orthodox
      : TRADITION_EMOJI.christianity_western;
  }
  return '📅';
}

// ---------------------------------------------------------------------------
// Calendar color map (Tailwind-compatible hex values)
// ---------------------------------------------------------------------------

export const TRADITION_COLORS: Record<Tradition, string> = {
  judaism: '#2563EB',
  christianity: '#7C3AED',
  islam: '#059669',
};

/** Slightly lighter shade for Orthodox events within Christianity */
export const ORTHODOX_COLOR = '#A78BFA';

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/** Strip Hebcal year suffix from titles like "Rosh Hashana 5787" -> "Rosh Hashana" */
export function normalizeHolidayTitle(title: string): string {
  return title.replace(/\s+\d{4}$/, '').trim();
}

/** Build a stable unique event ID */
export function buildEventId(
  tradition: Tradition,
  rawName: string,
  startDate: Date
): string {
  const slug = rawName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const dateISO = startDate.toISOString().split('T')[0];
  return `${tradition}-${slug}-${dateISO}`;
}

// ---------------------------------------------------------------------------
// Wikipedia article map
// Maps holiday display names -> Wikipedia article titles for REST API lookup
// ---------------------------------------------------------------------------

export const WIKIPEDIA_ARTICLE_MAP: Record<string, string> = {
  // Jewish holidays
  'Rosh Hashanah': 'Rosh_Hashanah',
  'Rosh Hashana': 'Rosh_Hashanah',
  'Yom Kippur': 'Yom_Kippur',
  'Sukkot': 'Sukkot',
  'Shemini Atzeret': 'Shemini_Atzeret',
  'Simchat Torah': 'Simchat_Torah',
  'Hanukkah': 'Hanukkah',
  'Tu BiShvat': 'Tu_BiShvat',
  'Purim': 'Purim',
  'Passover': 'Passover',
  'Pesach': 'Passover',
  'Yom HaShoah': 'Yom_HaShoah',
  'Yom HaAtzmaut': "Yom_Ha%27atzmaut",
  'Lag BaOmer': 'Lag_BaOmer',
  'Shavuot': 'Shavuot',
  "Tisha B'Av": "Tisha_B'Av",
  'Yom Yerushalayim': 'Yom_Yerushalayim',
  // Christian holidays -- Western
  'Epiphany': 'Epiphany_(holiday)',
  'Candlemas': 'Candlemas',
  'Ash Wednesday': 'Ash_Wednesday',
  'Palm Sunday': 'Palm_Sunday',
  'Maundy Thursday': 'Maundy_Thursday',
  'Good Friday': 'Good_Friday',
  'Holy Saturday': 'Holy_Saturday',
  'Easter Sunday': 'Easter',
  'Easter Monday': 'Easter_Monday',
  'Ascension Thursday': 'Feast_of_the_Ascension',
  'Pentecost': 'Pentecost',
  'Trinity Sunday': 'Trinity_Sunday',
  'Corpus Christi': 'Corpus_Christi_(feast)',
  'All Saints Day': "All_Saints%27_Day",
  'Immaculate Conception': 'Immaculate_Conception',
  'Christmas Eve': 'Christmas_Eve',
  'Christmas': 'Christmas',
  'Reformation Sunday': 'Reformation_Day',
  'Advent (First Sunday)': 'Advent',
  // Christian holidays -- Orthodox
  'Orthodox Christmas': 'Christmas#Eastern_Christianity',
  'Theophany': 'Theophany',
  'Orthodox Easter': 'Easter#Eastern_Christianity',
  'Orthodox Palm Sunday': 'Palm_Sunday',
  'Orthodox Good Friday': 'Good_Friday',
  'Orthodox Pentecost': 'Pentecost',
  // Islamic holidays
  'Islamic New Year (Muharram 1)': 'Islamic_New_Year',
  'Ashura': 'Ashura',
  "Mawlid al-Nabi (Prophet's Birthday)": 'Mawlid',
  "Isra and Mi'raj (Night Journey)": "Isra%27_and_Mi%27raj",
  'First Day of Ramadan': 'Ramadan',
  'Laylat al-Qadr (Night of Power)': 'Laylat_al-Qadr',
  'Eid al-Fitr': 'Eid_al-Fitr',
  'Day of Arafah': 'Day_of_Arafah',
  'Eid al-Adha': 'Eid_al-Adha',
};

// ---------------------------------------------------------------------------
// AlAdhan filter and normalization
// ---------------------------------------------------------------------------

/**
 * Only holidays in this set are surfaced from AlAdhan.
 * Excludes Sufi-specific and Shia-specific observances
 * not broadly recognized across US Muslim communities.
 */
export const ALADHAN_ALLOWED = new Set<string>([
  'Arafat (Haj) Day',
  'Eid-ul-Adha',
  'Islamic New Year',
  'Ashura',
  'Mawlid al-Nabi',
  "Al Isra' Wal Mi'raj",
  'Start of Ramadan',
  'Laylat al Qadr',
  'Eid ul Fitr',
]);

/** Map AlAdhan internal strings to user-facing display names */
export const ALADHAN_DISPLAY_NAMES: Record<string, string> = {
  'Arafat (Haj) Day': 'Day of Arafah',
  'Eid-ul-Adha': 'Eid al-Adha',
  'Islamic New Year': 'Islamic New Year (Muharram 1)',
  'Ashura': 'Ashura',
  'Mawlid al-Nabi': "Mawlid al-Nabi (Prophet's Birthday)",
  "Al Isra' Wal Mi'raj": "Isra and Mi'raj (Night Journey)",
  'Start of Ramadan': 'First Day of Ramadan',
  'Laylat al Qadr': 'Laylat al-Qadr (Night of Power)',
  'Eid ul Fitr': 'Eid al-Fitr',
};

/** Holidays that may span multiple consecutive days -- group into one event */
export const ALADHAN_MULTIDAY = new Set<string>([
  'Eid al-Adha',
  'Eid al-Fitr',
]);
