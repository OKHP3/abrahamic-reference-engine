/**
 * hebcalClient.ts
 * Abrahamic Reference Engine -- Observances Tab
 *
 * Fetches Jewish holiday data from the Hebcal REST API.
 * Free. No API key. CC BY 4.0 license.
 * Results cached in sessionStorage for the duration of the browser session.
 *
 * Attribution: "Calendar data via Hebcal.com (CC BY 4.0)"
 * https://www.hebcal.com/home/developer-apis
 *
 * Zero external dependencies. MIT license.
 * OverKill Hill P³™ / FoundRy -- okhp3.github.io/abrahamic-reference-engine
 */

import {
  type ObservanceEvent,
  TRADITION_EMOJI,
  WIKIPEDIA_ARTICLE_MAP,
  normalizeHolidayTitle,
  buildEventId,
} from './observanceHelpers';

// ---------------------------------------------------------------------------
// Hebcal API types
// ---------------------------------------------------------------------------

interface HebcalItem {
  title: string;
  date: string;
  hdate?: string;
  category: string;
  subcat?: string;
  hebrew?: string;
  link?: string;
  memo?: string;
}

interface HebcalResponse {
  title: string;
  items: HebcalItem[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CACHE_PREFIX = 'are_hebcal_';

function buildHebcalUrl(year: number): string {
  const params = new URLSearchParams({
    v: '1',
    cfg: 'json',
    year: String(year),
    maj: 'on',
    min: 'off',
    nx: 'off',
    mf: 'off',
    ss: 'on',
    mod: 'on',
    i: 'off',
    lg: 's',
    m: '50',
  });
  return `https://www.hebcal.com/hebcal?${params.toString()}`;
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

function parseHebcalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function groupMultiDayItems(items: HebcalItem[]): HebcalItem[][] {
  const groups: HebcalItem[][] = [];
  const visited = new Set<number>();

  for (let i = 0; i < items.length; i++) {
    if (visited.has(i)) continue;
    const baseName = normalizeHolidayTitle(items[i].title);
    const group: HebcalItem[] = [items[i]];
    visited.add(i);

    for (let j = i + 1; j < items.length; j++) {
      if (visited.has(j)) continue;
      const candidateName = normalizeHolidayTitle(items[j].title);
      if (candidateName !== baseName) continue;

      const prevDate = parseHebcalDate(group[group.length - 1].date);
      const candidateDate = parseHebcalDate(items[j].date);
      const diffDays =
        (candidateDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        group.push(items[j]);
        visited.add(j);
      }
    }
    groups.push(group);
  }
  return groups;
}

function groupToEvent(group: HebcalItem[]): ObservanceEvent {
  const first = group[0];
  const last = group[group.length - 1];
  const rawName = normalizeHolidayTitle(first.title);
  const startDate = parseHebcalDate(first.date);
  const endDate = parseHebcalDate(last.date);
  const isMultiDay = group.length > 1;

  return {
    id: buildEventId('judaism', rawName, startDate),
    title: `${TRADITION_EMOJI.judaism} ${rawName}`,
    rawName,
    emoji: TRADITION_EMOJI.judaism,
    tradition: 'judaism',
    denomination: 'all',
    startDate,
    endDate,
    isMultiDay,
    hebrewName: first.hebrew,
    sourceUrl: first.link,
    wikiArticle: WIKIPEDIA_ARTICLE_MAP[rawName],
    source: 'hebcal',
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch Jewish holidays for the given Gregorian year from the Hebcal API.
 * Results are cached in sessionStorage -- the API is only called once per
 * year per browser session.
 */
export async function fetchJewishHolidays(year: number): Promise<ObservanceEvent[]> {
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
    // sessionStorage unavailable or parse error -- continue to fetch
  }

  const res = await fetch(buildHebcalUrl(year));
  if (!res.ok) {
    throw new Error(`Hebcal API error: HTTP ${res.status}`);
  }

  const data: HebcalResponse = await res.json();

  const holidayItems = (data.items || []).filter(
    item => item.category === 'holiday'
  );

  const groups = groupMultiDayItems(holidayItems);
  const events = groups.map(groupToEvent);

  events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(events));
  } catch {
    // sessionStorage full or unavailable
  }

  return events;
}
