/**
 * aladhanClient.ts
 * Abrahamic Reference Engine -- Observances Tab
 *
 * Fetches Islamic holiday data from the AlAdhan REST API.
 * Free. No API key. GPL-3.0 licensed API.
 * Results cached in sessionStorage for the duration of the browser session.
 *
 * Attribution: "Islamic calendar data via AlAdhan.com"
 * https://aladhan.com/islamic-calendar-api
 *
 * Moon sighting notice (always display alongside Islamic events):
 * "Islamic dates are calculated using the Umm al-Qura method.
 *  Actual observance may vary by one day based on local moon sighting."
 *
 * Zero external dependencies. MIT license.
 * OverKill Hill P3 / FoundRy -- okhp3.github.io/abrahamic-reference-engine
 */

import {
  type ObservanceEvent,
  TRADITION_EMOJI,
  WIKIPEDIA_ARTICLE_MAP,
  ALADHAN_ALLOWED,
  ALADHAN_DISPLAY_NAMES,
  ALADHAN_MULTIDAY,
  buildEventId,
} from './observanceHelpers';

// ---------------------------------------------------------------------------
// AlAdhan API types
// ---------------------------------------------------------------------------

interface AladhanGregorian {
  date: string;
  year: string;
  month: { number: number; en: string };
  day: string;
}

interface AladhanHijri {
  date: string;
  year: string;
  month: { number: number; en: string; ar: string };
  day: string;
  holidays: string[];
}

interface AladhanDay {
  gregorian: AladhanGregorian;
  hijri: AladhanHijri;
}

interface AladhanResponse {
  code: number;
  status: string;
  data: AladhanDay[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CACHE_PREFIX = 'are_aladhan_';
const BASE_URL = 'https://api.aladhan.com/v1/gToHCalendar';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function parseAladhanDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function buildHijriString(hijri: AladhanHijri): string {
  return `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
}

async function fetchMonth(month: number, year: number): Promise<AladhanDay[]> {
  const url = `${BASE_URL}/${month}/${year}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data: AladhanResponse = await res.json();
  return data.data || [];
}

function collectHolidayDays(allDays: AladhanDay[]): Array<{
  day: AladhanDay;
  displayName: string;
}> {
  const results: Array<{ day: AladhanDay; displayName: string }> = [];

  for (const day of allDays) {
    const holidays = day.hijri.holidays || [];
    for (const holiday of holidays) {
      if (!ALADHAN_ALLOWED.has(holiday)) continue;
      const displayName = ALADHAN_DISPLAY_NAMES[holiday] ?? holiday;
      results.push({ day, displayName });
      break;
    }
  }

  return results;
}

function groupMultiDayHolidays(
  entries: Array<{ day: AladhanDay; displayName: string }>
): Array<{ displayName: string; days: AladhanDay[] }> {
  const groups: Array<{ displayName: string; days: AladhanDay[] }> = [];
  const visited = new Set<number>();

  for (let i = 0; i < entries.length; i++) {
    if (visited.has(i)) continue;
    const { displayName, day } = entries[i];
    const group: AladhanDay[] = [day];
    visited.add(i);

    if (ALADHAN_MULTIDAY.has(displayName)) {
      for (let j = i + 1; j < entries.length; j++) {
        if (visited.has(j)) continue;
        if (entries[j].displayName !== displayName) continue;
        const prevDate = parseAladhanDate(group[group.length - 1].gregorian.date);
        const nextDate = parseAladhanDate(entries[j].day.gregorian.date);
        const diffDays =
          (nextDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          group.push(entries[j].day);
          visited.add(j);
        }
      }
    }
    groups.push({ displayName, days: group });
  }

  return groups;
}

function groupToEvent(group: {
  displayName: string;
  days: AladhanDay[];
}): ObservanceEvent {
  const { displayName, days } = group;
  const startDate = parseAladhanDate(days[0].gregorian.date);
  const endDate = parseAladhanDate(days[days.length - 1].gregorian.date);
  const isMultiDay = days.length > 1;
  const hijriDate = buildHijriString(days[0].hijri);

  return {
    id: buildEventId('islam', displayName, startDate),
    title: `${TRADITION_EMOJI.islam} ${displayName}`,
    rawName: displayName,
    emoji: TRADITION_EMOJI.islam,
    tradition: 'islam',
    denomination: 'all',
    startDate,
    endDate,
    isMultiDay,
    hijriDate,
    wikiArticle: WIKIPEDIA_ARTICLE_MAP[displayName],
    source: 'aladhan',
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch Islamic holidays for the given Gregorian year from the AlAdhan API.
 * Issues 12 parallel requests (one per month) and aggregates the results.
 * Results are cached in sessionStorage -- the API is only called once per
 * year per browser session.
 */
export async function fetchIslamicHolidays(year: number): Promise<ObservanceEvent[]> {
  const cacheKey = `${CACHE_PREFIX}${year}`;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed: ObservanceEvent[] = JSON.parse(cached);
      return parsed.map(e => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
      }));
    }
  } catch {
    // sessionStorage unavailable -- continue to fetch
  }

  const monthFetches = Array.from({ length: 12 }, (_, i) =>
    fetchMonth(i + 1, year)
  );
  const results = await Promise.allSettled(monthFetches);

  const allDays: AladhanDay[] = results.flatMap(result =>
    result.status === 'fulfilled' ? result.value : []
  );

  if (allDays.length === 0) {
    throw new Error('AlAdhan API: all 12 monthly requests failed');
  }

  allDays.sort((a, b) => {
    const da = parseAladhanDate(a.gregorian.date);
    const db = parseAladhanDate(b.gregorian.date);
    return da.getTime() - db.getTime();
  });

  const holidayDays = collectHolidayDays(allDays);
  const groups = groupMultiDayHolidays(holidayDays);
  const events = groups.map(groupToEvent);

  events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(events));
  } catch {
    // sessionStorage full or unavailable
  }

  return events;
}
