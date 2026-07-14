# Abrahamic Reference Engine -- Replit Architecture

This file documents the site-specific architecture, current state, and key file inventory.
For governance rules, scope constraints, and agent guidelines, see [AGENTS.md](AGENTS.md).

---

## Project

- **Name:** abrahamic-reference-engine
- **Suite:** OverKill Hill P3 / FoundRy
- **GitHub:** https://github.com/OKHP3/abrahamic-reference-engine
- **Live URL:** https://okhp3.github.io/abrahamic-reference-engine/

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:5000 |
| `npm run build` | Production build -- outputs to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm install` | Run after task-agent merges or pulling fresh |
| `npm run test:api` | Run live API tests against all providers -- exit 0 = healthy |

### Live API tests

`npm run test:api` runs `scripts/test-api-live.js` against the real APIs with no mocking.

- Exit 0 = all primary providers (Sefaria, bible-api.com, Quran.com) are healthy
- Exit 1 = one or more primary providers failed -- output includes the failing test IDs and error details
- Non-blocking warnings are printed for AlQuran.cloud and Hadith CDN checks -- these represent known provider gaps and do not affect exit code

Run this before releasing any change that touches `src/api/`.

---

## Current State (repository audit: 2026-07-13)

- SPA complete -- four primary modes are implemented
- TraditionBrowser: browse Judaism, Christianity (5 denominations), Islam with verse cards and Pew explainer
- VerseLookup: fetch live verse from Sefaria / bible-api.com / Quran.com by reference
- CrossTraditionCompare: 20 pre-seeded themes, side-by-side three-panel layout
- ObservancesCalendar: year-selectable holiday calendar for all three traditions; .ics download per event or full year
- OriginArchive: hidden historical archive route backed by static content in `public/origin/`
- Agent skills package complete: okhp3-verse-lookup, okhp3-tradition-reference, okhp3-cross-tradition-compare, okhp3-tradition-observance-calendar
- GitHub Pages deploy workflow in place (.github/workflows/deploy-pages.yml)
- Vite base path: `/` in dev, `/abrahamic-reference-engine/` in production build (conditional on `command`)
- React Router basename driven by `import.meta.env.BASE_URL` -- empty in dev, `/abrahamic-reference-engine` in prod
- Dark / light mode toggle: CSS custom property system, persists to localStorage, respects system preference
- Full favicon package: SVG, ICO, PNG (16/32/180/192/512), WebP (192/512), site.webmanifest
- Social preview image: 1280x640 PNG + WebP (ancient stone tablets / scrolls, no identifiable script)
- SEO: full OG tags, Twitter Card, schema.org JSON-LD, canonical URL, robots meta in index.html

---

## Architecture

```
Vite + React 19 + TypeScript + Tailwind CSS v4
React Router v7 (BrowserRouter + basename)
Static SPA -- no backend, no server-side rendering
All data fetched from public free APIs or served from static pre-seeded files
```

## Technology Inventory and Update Policy

Audit date: 2026-07-13. Package versions below are the exact versions installed
from `package-lock.json` unless marked as a runtime or action tag. Latest stable
values were checked against the official project release pages or the npm
registry on the audit date.

Reference sources: [Node.js releases](https://nodejs.org/en/about/previous-releases),
[Python 3.14.6](https://www.python.org/downloads/release/python-3146/),
[React versions](https://react.dev/versions),
[Vite releases](https://vite.dev/releases),
[TypeScript on npm](https://www.npmjs.com/package/typescript),
[React Router DOM on npm](https://www.npmjs.com/package/react-router-dom),
[Tailwind CSS on npm](https://www.npmjs.com/package/tailwindcss),
[PostCSS on npm](https://www.npmjs.com/package/postcss), and
[GitHub Actions setup-node](https://github.com/actions/setup-node).

### Languages, runtimes, and formats

| Technology | In use | Latest stable or current target | Notes |
|---|---|---|---|
| TypeScript | 7.0.2 | 7.0.2 | Current. |
| JavaScript | Node ESM; `scripts/test-api-live.js`; Replit `nodejs-24` | Node.js 26.3.1 Current; Node.js 24.17.0 LTS | CI and Pages use `lts/*` so the supported LTS line advances automatically. |
| npm | 11.6.2 locally; lockfile version 3 | 11.18.0 | npm is supplied with Node but is also independently versioned. |
| Python | 3.14 declared by `.replit`; skill support scripts only | 3.14.6 | Python is not part of the built SPA. |
| HTML | HTML5 in `index.html` and the SPA fallback | Living standard | No project-pinned version. |
| CSS | CSS custom properties plus Tailwind utility classes | Living standard | Processed by PostCSS and Tailwind CSS. |
| YAML | GitHub Actions workflows | Schema-defined by GitHub Actions | Used for CI/CD configuration. |
| JSON | package metadata, manifests, API fixtures, and OpenAPI files | Schema-defined per file | Includes `package.json`, `package-lock.json`, and `site.webmanifest`. |
| Markdown | README, governance, skills, and reference content | CommonMark/GitHub Flavored Markdown | Documentation and skill content only. |

### Application and build dependencies

| Technology | In use | Latest stable | Upgrade posture |
|---|---:|---:|---|
| React | 19.2.7 | 19.2.7 | Current. |
| React DOM | 19.2.7 | 19.2.7 | Current. |
| React Router DOM | 7.18.1 | 7.18.1 | Current. |
| Vite | 8.1.4 | 8.1.4 | Current. |
| `@vitejs/plugin-react` | 6.0.3 | 6.0.3 | Current. |
| Tailwind CSS | 4.3.2 | 4.3.2 | Current. CSS-first theme configuration is in `src/index.css`. |
| PostCSS | 8.5.19 | 8.5.19 | Current. |
| `@tailwindcss/postcss` | 4.3.2 | 4.3.2 | Required Tailwind 4 PostCSS integration. |
| `@types/react` | 19.2.17 | 19.2.17 | Current. |
| `@types/react-dom` | 19.2.3 | 19.2.3 | Current. |
| GitHub Actions | checkout v7; setup-node v6; configure-pages v6; upload-pages-artifact v5; deploy-pages v5 | Same major tags are current in the workflow | Dependabot tracks action updates separately. |

### Platform and service interfaces

These integrations are real technologies used by the application, but their
providers do not expose a single npm-style version that can be upgraded by
Dependabot.

| Interface | Version or branch in use | Update method |
|---|---|---|
| Sefaria Texts API | Unversioned `/api/texts` endpoint | Live API smoke tests and manual provider review. |
| bible-api.com | Unversioned endpoint | Live API smoke tests and manual provider review. |
| Quran.com API | v4 | Live API smoke tests and manual provider review. |
| AlQuran.cloud | v1 | Live API smoke tests and manual provider review. |
| fawazahmed0/hadith-api | Git branch/tag `@1` through jsDelivr | Live API smoke tests and manual provider review. |
| scriptures.nephi.org | Unversioned endpoint | Manual provider review. |
| Hebcal API | Unversioned developer API | Calendar smoke testing and manual provider review. |
| Aladhan API | v1 | Calendar smoke testing and manual provider review. |
| Wikipedia REST API | v1 page-summary endpoint | Manual provider review. |
| GitHub Pages | Static hosting platform | Deployment workflow and GitHub platform updates. |

### Update automation

- `.github/dependabot.yml` checks npm dependencies and GitHub Actions weekly.
- Minor and patch updates are grouped into reviewable pull requests.
- Major updates are raised separately so future migrations receive explicit
  review.
- `.github/workflows/ci.yml` builds every pull request and push to `main`.
- The Pages workflow uses `node-version: "lts/*"` with `check-latest: true`,
  keeping hosted builds on the newest Node LTS line.
- Provider APIs remain outside Dependabot's scope and are covered by the
  existing `npm run test:api` smoke-test script when API code changes.

### Audit findings

- The previous dependency audit recorded `npm run build` passing with the lockfile. A fresh checkout without `node_modules/` cannot run it until dependencies are installed.
- `npm run lint` is declared but cannot run because ESLint is not installed or
  configured. It is not included in CI until that script is repaired.
- The repository contains a Python origin generator in the static historical
  archive and a root live-test script. The Python file is not part of the SPA
  runtime; the root script is intentional validation tooling.

### Routing

| Path | Component |
|------|-----------|
| `/browse` | TraditionBrowser (default) |
| `/browse/:traditionSlug` | TraditionBrowser (tradition detail) |
| `/lookup` | VerseLookup |
| `/compare` | CrossTraditionCompare |
| `/observances` | ObservancesCalendar |
| `/origin` | OriginArchive (historical archive) |
| `/*` | Redirects to `/browse` |

### APIs

| Provider | Tradition | Base URL | Auth |
|----------|-----------|----------|------|
| Sefaria | Judaism | https://www.sefaria.org/api | None |
| bible-api.com | Christianity | https://bible-api.com | None |
| Quran.com v4 | Islam | https://api.quran.com/api/v4 | None |
| AlQuran.cloud | Islam (fallback) | https://api.alquran.cloud/v1 | None |
| fawazahmed0/hadith-api | Hadith | https://cdn.jsdelivr.net/npm/hadith-api | None |

---

## Key Files

| File | Role |
|------|------|
| `src/App.tsx` | Root -- BrowserRouter with basename, all routes |
| `src/main.tsx` | Entry point |
| `src/index.css` | Tailwind directives + custom color tokens (gold, parchment, bg-base, bg-elevated) |
| `src/data/traditions.ts` | Static tradition + denomination data |
| `src/data/compareThemes.ts` | 20 pre-seeded cross-tradition themes |
| `src/data/translations.ts` | Translation ID map for bible-api.com and Quran.com |
| `src/api/` | Fetch functions: sefaria.ts, bible.ts, quran.ts, hadith.ts |
| `src/pages/TraditionBrowser.tsx` | Browse traditions and denominations |
| `src/pages/VerseLookup.tsx` | Live verse fetch by reference |
| `src/pages/CrossTraditionCompare.tsx` | Side-by-side cross-tradition theme comparison |
| `src/components/ScopeExplainer.tsx` | "Why these three?" / Pew citation widget |
| `.agents/skills/okhp3-verse-lookup/translation-matrix.md` | Full translation code reference table |
| `.agents/skills/okhp3-verse-lookup/api/` | OpenAPI specs for all five APIs |
| `vite.config.ts` | Vite config -- conditional base path, host, port |
| `.github/workflows/deploy-pages.yml` | GitHub Actions -- build + deploy to Pages |

---

## Custom Color Tokens

| Token | Value | Use |
|-------|-------|-----|
| `gold` | `#c9a84c` | Accents, headings |
| `parchment` | `#e8e0d0` | Light text on dark |
| `bg-base` | `#0f0f0f` | Page background |
| `bg-elevated` | `#1a1a1a` | Card/panel background |
| `blue-*` | Tailwind blue | Judaism |
| `violet-*` | Tailwind violet | Christianity |
| `emerald-*` | Tailwind emerald | Islam |

---

## Known Issues / Work in Progress

- GitHub Pages: deploy workflow exists but Pages must be enabled in GitHub repo settings (Settings > Pages > Source: GitHub Actions) after pushing to main
- GitHub push of `.github/workflows/` requires a token with `workflow` scope -- add the file via GitHub web UI if token lacks that scope
- LDS/Restorationist and Orthodox Christian denomination support is partial -- canon scope notes tracked as a follow-up
- `npm run lint` is declared in `package.json`, but ESLint is not currently declared or configured, so the command cannot run until that tooling is intentionally added.
- `node_modules/` is not committed; run `npm ci` or `npm install` before local build validation.

---

## Documentation Conventions

- No em dashes -- use -- (double hyphen) always
- US English throughout
- No emojis in code or docs
- ROY principle: verbosity must earn its space
