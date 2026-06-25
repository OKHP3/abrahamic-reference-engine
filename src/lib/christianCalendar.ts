/**
 * christianCalendar.ts
 * Abrahamic Reference Engine -- Observances Tab
 *
 * Client-side computation of Western and Orthodox Easter dates
 * using the ecclesiastical Computus algorithm. All Christian holidays
 * are derived from these anchors -- no external API, no cost, no dependency.
 *
 * Validated reference dates:
 *   Western Easter  2026 -> April 5    | 2027 -> March 28
 *   Orthodox Easter 2026 -> April 12   | 2027 -> May 2
 *   Ash Wednesday   2026 -> February 18
 *   Good Friday     2026 -> April 3
 *   Pentecost       2026 -> May 24
 *   Orthodox Christmas (all years)  -> January 7
 *   Theophany      (all years)      -> January 19
 *
 * Zero dependencies. Zero cost. MIT license.
 * OverKill Hill P3 / FoundRy -- okhp3.github.io/abrahamic-reference-engine
 */

import {
  type ObservanceEvent,
  type Denomination,
  TRADITION_EMOJI,
  WIKIPEDIA_ARTICLE_MAP,
  buildEventId,
  normalizeHolidayTitle,
} from './observanceHelpers';

// ---------------------------------------------------------------------------
// Easter computation
// ---------------------------------------------------------------------------

/**
 * Compute Western (Gregorian) Easter for a given year.
 * Uses the Anonymous Gregorian algorithm (Oudin/Jones).
 */
export function computeWesternEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/**
 * Compute Eastern Orthodox Easter for a given year.
 * Uses Julian calendar Computus then adds 13 days to convert
 * to the Gregorian calendar (valid for 20th and 21st century).
 */
export function computeOrthodoxEaster(year: number): Date {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  const julianDate = new Date(year, month - 1, day);
  julianDate.setDate(julianDate.getDate() + 13);
  return julianDate;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function offsetDate(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function fixedDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

function computeAdventSunday(year: number): Date {
  const christmas = fixedDate(year, 12, 25);
  const dayOfWeek = christmas.getDay();
  const lastAdventSunday = new Date(christmas);
  lastAdventSunday.setDate(christmas.getDate() - dayOfWeek);
  const firstAdventSunday = new Date(lastAdventSunday);
  firstAdventSunday.setDate(lastAdventSunday.getDate() - 21);
  return firstAdventSunday;
}

function computeReformationSunday(year: number): Date {
  const oct31 = fixedDate(year, 10, 31);
  const dayOfWeek = oct31.getDay();
  const result = new Date(oct31);
  result.setDate(oct31.getDate() - dayOfWeek);
  return result;
}

// ---------------------------------------------------------------------------
// Holiday definitions
// ---------------------------------------------------------------------------

interface ChristianHolidayDef {
  rawName: string;
  denomination: Denomination;
  startDate: Date;
  endDate?: Date;
  emoji: string;
}

function buildWesternHolidays(year: number, easter: Date): ChristianHolidayDef[] {
  const W = easter;
  const fix = (m: number, d: number) => fixedDate(year, m, d);
  const off = (days: number) => offsetDate(W, days);

  return [
    { rawName: 'Epiphany',              denomination: 'all',        emoji: '✝️', startDate: fix(1, 6) },
    { rawName: 'Christmas Eve',         denomination: 'all',        emoji: '✝️', startDate: fix(12, 24) },
    { rawName: 'Christmas',             denomination: 'all',        emoji: '✝️', startDate: fix(12, 25) },
    { rawName: 'Candlemas',             denomination: 'catholic',   emoji: '✝️', startDate: fix(2, 2) },
    { rawName: 'All Saints Day',        denomination: 'catholic',   emoji: '✝️', startDate: fix(11, 1) },
    { rawName: 'Immaculate Conception', denomination: 'catholic',   emoji: '✝️', startDate: fix(12, 8) },
    { rawName: 'Advent (First Sunday)', denomination: 'all',        emoji: '✝️', startDate: computeAdventSunday(year) },
    { rawName: 'Ash Wednesday',         denomination: 'all',        emoji: '✝️', startDate: off(-46) },
    { rawName: 'Palm Sunday',           denomination: 'all',        emoji: '✝️', startDate: off(-7) },
    { rawName: 'Maundy Thursday',       denomination: 'all',        emoji: '✝️', startDate: off(-3) },
    { rawName: 'Good Friday',           denomination: 'all',        emoji: '✝️', startDate: off(-2) },
    { rawName: 'Holy Saturday',         denomination: 'all',        emoji: '✝️', startDate: off(-1) },
    { rawName: 'Easter Sunday',         denomination: 'all',        emoji: '✝️', startDate: W },
    { rawName: 'Easter Monday',         denomination: 'catholic',   emoji: '✝️', startDate: off(1) },
    { rawName: 'Ascension Thursday',    denomination: 'all',        emoji: '✝️', startDate: off(39) },
    { rawName: 'Pentecost',             denomination: 'all',        emoji: '✝️', startDate: off(49) },
    { rawName: 'Trinity Sunday',        denomination: 'protestant', emoji: '✝️', startDate: off(56) },
    { rawName: 'Corpus Christi',        denomination: 'catholic',   emoji: '✝️', startDate: off(60) },
    { rawName: 'Reformation Sunday',    denomination: 'protestant', emoji: '✝️', startDate: computeReformationSunday(year) },
  ];
}

function buildOrthodoxHolidays(year: number, orthodoxEaster: Date): ChristianHolidayDef[] {
  const O = orthodoxEaster;
  const off = (days: number) => offsetDate(O, days);

  return [
    { rawName: 'Orthodox Christmas',   denomination: 'orthodox', emoji: '☦️', startDate: new Date(year, 0, 7) },
    { rawName: 'Theophany',            denomination: 'orthodox', emoji: '☦️', startDate: new Date(year, 0, 19) },
    { rawName: 'Orthodox Palm Sunday', denomination: 'orthodox', emoji: '☦️', startDate: off(-7) },
    { rawName: 'Orthodox Good Friday', denomination: 'orthodox', emoji: '☦️', startDate: off(-2) },
    { rawName: 'Orthodox Easter',      denomination: 'orthodox', emoji: '☦️', startDate: O },
    { rawName: 'Orthodox Pentecost',   denomination: 'orthodox', emoji: '☦️', startDate: off(49) },
  ];
}

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

/**
 * Generate the full list of in-scope Christian observances for a given year.
 * Returns both Western and Orthodox variants.
 * All computation is synchronous and deterministic -- no external calls.
 */
export function generateChristianHolidays(year: number): ObservanceEvent[] {
  const westernEaster = computeWesternEaster(year);
  const orthodoxEaster = computeOrthodoxEaster(year);

  const allDefs: ChristianHolidayDef[] = [
    ...buildWesternHolidays(year, westernEaster),
    ...buildOrthodoxHolidays(year, orthodoxEaster),
  ];

  return allDefs.map((def): ObservanceEvent => {
    const endDate = def.endDate ?? def.startDate;
    const id = buildEventId('christianity', def.rawName, def.startDate);
    return {
      id,
      title: `${def.emoji} ${def.rawName}`,
      rawName: def.rawName,
      emoji: def.emoji,
      tradition: 'christianity',
      denomination: def.denomination,
      startDate: def.startDate,
      endDate,
      isMultiDay: endDate.getTime() !== def.startDate.getTime(),
      wikiArticle: WIKIPEDIA_ARTICLE_MAP[def.rawName],
      source: 'algorithm',
    };
  });
}

// Suppress unused import warnings -- normalizeHolidayTitle is re-exported
// for consumers that import from this module.
export { normalizeHolidayTitle, TRADITION_EMOJI };
