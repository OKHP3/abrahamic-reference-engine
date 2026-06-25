/**
 * wikipediaClient.ts
 * Abrahamic Reference Engine -- Observances Tab
 *
 * Fetches neutral, encyclopedic descriptions of religious holidays
 * from the Wikipedia REST API Summary endpoint.
 *
 * Free. No API key. No rate limit for reasonable usage.
 * Content licensed under CC BY-SA 3.0.
 *
 * Attribution (display in every event detail panel):
 *   "Description via Wikipedia (CC BY-SA 3.0)"
 *   with link to the returned wikiUrl.
 *
 * Fetch is lazy: called only when a user clicks an event, not on tab load.
 * Results cached in sessionStorage to prevent repeat calls.
 *
 * Zero external dependencies. MIT license.
 * OverKill Hill P3 / FoundRy -- okhp3.github.io/abrahamic-reference-engine
 */

import { WIKIPEDIA_ARTICLE_MAP, normalizeHolidayTitle } from './observanceHelpers';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WikiResult {
  /** 1-4 sentence encyclopedic summary from Wikipedia */
  extract: string;
  /** Full Wikipedia article URL for attribution link */
  wikiUrl: string;
  /** Wikipedia article title (for display) */
  articleTitle: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CACHE_PREFIX = 'are_wiki_';
const WIKI_API_BASE = 'https://en.wikipedia.org/api/rest_v1/page/summary';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch a neutral encyclopedic description for a religious holiday.
 * Returns null if the holiday name is not in WIKIPEDIA_ARTICLE_MAP,
 * the Wikipedia API returns an error, or the network request fails.
 *
 * Results are cached in sessionStorage for the duration of the session.
 */
export async function getHolidayDescription(rawName: string): Promise<WikiResult | null> {
  const normalized = normalizeHolidayTitle(rawName);

  const articleTitle =
    WIKIPEDIA_ARTICLE_MAP[normalized] ??
    WIKIPEDIA_ARTICLE_MAP[rawName];

  if (!articleTitle) return null;

  const cacheKey = `${CACHE_PREFIX}${articleTitle}`;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached) as WikiResult;
  } catch {
    // sessionStorage unavailable -- continue to fetch
  }

  try {
    const res = await fetch(`${WIKI_API_BASE}/${articleTitle}`, {
      headers: { Accept: 'application/json; charset=utf-8' },
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.extract) return null;

    const result: WikiResult = {
      extract: data.extract,
      wikiUrl:
        data.content_urls?.desktop?.page ??
        `https://en.wikipedia.org/wiki/${articleTitle}`,
      articleTitle: data.title ?? normalized,
    };

    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
    } catch {
      // sessionStorage full or unavailable
    }

    return result;
  } catch {
    return null;
  }
}
