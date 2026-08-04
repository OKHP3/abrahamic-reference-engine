# ADR-0004: Public Free APIs with No Authentication Required

## Status

Accepted

## Context

The app must fetch scripture texts, religious observances, and Hadith data at runtime. Several API options exist: licensed commercial APIs (with keys and cost), self-hosted data (requires a backend), and public free APIs.

APIs evaluated per tradition:

| Tradition | Primary API | Fallback |
|---|---|---|
| Judaism | Sefaria Texts API (unversioned, public) | None |
| Christianity | bible-api.com (public, 39+ translations) | None |
| Islam -- Quran | Quran.com API v4 (public) | AlQuran.cloud v1 |
| Islam -- Hadith | fawazahmed0/hadith-api via jsDelivr CDN | None |
| Jewish holidays | Hebcal developer API (public) | None |
| Islamic holidays | Aladhan API v1 (public) | None |
| Celestial data | Computed client-side (no API) | None |

## Decision

Use only public, free, no-auth APIs for all data. No API keys are stored in the repo or build. The client calls APIs directly from the browser. AlQuran.cloud is registered as a fallback for Quran.com.

## Rationale

1. **No secrets to manage** -- a static SPA with no backend has nowhere safe to store API keys anyway; using only public APIs eliminates the problem entirely
2. **No operating cost** -- all APIs are free; total hosting cost is $0
3. **Alignment with the reference mission** -- the tool is academic and free to use; its data sources should be too
4. **All required data is available for free** -- Sefaria, bible-api.com, and Quran.com together cover the full intended canon scope without auth

## Consequences

- **Positive:** zero cost, no credential management, no rate limit billing
- **Positive:** no auth tokens to rotate, expire, or accidentally expose
- **Negative:** the app depends on third-party API availability; provider outages affect the user experience
- **Negative:** some licensed translations (ESV, NIV, NASB) are unavailable because their providers require an API key; the app labels these clearly as "key req."
- **Constraint:** any future expansion to licensed translations would require a serverless proxy (reverting to ADR-0001) to protect the API key
- **Monitoring:** `npm run test:api` runs live smoke tests against all primary providers; run before any change touching `src/api/`
