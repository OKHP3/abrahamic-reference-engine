# ADR-0001: Static SPA with No Backend

## Status

Accepted

## Context

The Abrahamic Reference Engine needs to serve scripture lookups, cross-tradition comparisons, and a religious observances calendar. The question is whether to run a backend server (Node/Python/etc.) or ship a fully static client-side application.

Options considered:
- **Static SPA (client fetches APIs directly)** -- no server to maintain; deploys to GitHub Pages for free; zero runtime cost
- **Node.js backend proxy** -- could cache API responses, hide any future auth tokens, add server-side rate limiting
- **Serverless functions (e.g. Cloudflare Workers)** -- middle ground, but introduces a deployment dependency

## Decision

The application is a fully static Vite + React SPA. All data is fetched directly from public free APIs (Sefaria, bible-api.com, Quran.com, AlQuran.cloud, Hebcal, Aladhan) at runtime from the browser. There is no backend, no server, no database, and no runtime infrastructure.

## Rationale

1. **All target APIs are public and require no auth** -- no credentials to protect, so a proxy adds no security value
2. **Zero operating cost** -- GitHub Pages hosts the built `dist/` folder for free; no server bills
3. **Zero maintenance surface** -- no servers to patch, no databases to back up, no uptime to monitor
4. **Aligns with the academic/reference mission** -- a read-only reference tool has no write operations
5. **Simpler deployment** -- one CI job builds and deploys; no environment parity problems

## Consequences

- **Positive:** free hosting, simple deployment, no backend incidents
- **Positive:** fully cacheable, CDN-friendly, fast initial load
- **Negative:** cannot hide API keys if a future provider requires auth (would need a serverless proxy added at that point)
- **Negative:** no server-side caching -- each user's browser fetches APIs independently
- **Constraint:** any future feature requiring write operations (user accounts, saved collections) would require revisiting this decision
