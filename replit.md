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
| `npm run lint` | Run ESLint syntactic checks over the TypeScript/JSX source |
| `npm run test:unit` | Run deterministic API contract tests without network access |
| `npm run test:e2e` | Run deterministic desktop/mobile browser checks without live providers |
| `npm run test:pages` | Verify production base-path assets and manifest paths |
| `npm run test:api` | Run live API tests against all providers -- exit 0 = healthy |
| `npm run test:skill-sync` | Verify skills/ mirrors match .agents/skills/ canonical copies -- exit 0 = in sync |

### Live API tests

`npm run test:api` runs `scripts/test-api-live.js` against the real APIs with no mocking.

- Exit 0 = all primary providers (Sefaria, bible-api.com, Quran.com) are healthy
- Exit 1 = one or more primary providers failed -- output includes the failing test IDs and error details
- Non-blocking warnings are printed for AlQuran.cloud and Hadith CDN checks -- these represent known provider gaps and do not affect exit code

Run this before releasing any change that touches `src/api/`.

---

## Current State (repository audit: 2026-07-13)

- SPA complete -- four primary modes are implemented
- TraditionBrowser: browse Judaism, Christianity (5 denominations), Islam with verse cards and Pew explainer (2023-24 U.S. Religious Landscape Study: Christianity 62%, Judaism 2%, Islam 1% of U.S. adults; source: https://www.pewresearch.org/religious-landscape-study/region/united-states/; snapshot: `src/data/pew-religious-composition.snapshot.ts`)
- VerseLookup: fetch live verse from Sefaria / bible-api.com / Quran.com by reference
- CrossTraditionCompare: 20 pre-seeded themes, side-by-side three-panel layout
- ObservancesCalendar: year-selectable holiday calendar for all three traditions; .ics download per event or full year
- SkillsGallery: in-app catalog of the five ARE operational skills, accessible at /skills via sidebar "Skill library" link; the repository catalog indexes 23 local skill packages
- OriginArchive: hidden historical archive route backed by static content in `public/origin/` (easter egg -- no nav link in ModeNav)
- Agent skills package complete: okhp3-verse-lookup, okhp3-tradition-reference, okhp3-cross-tradition-compare, okhp3-tradition-observance-calendar, okhp3-celestial-data
- SkillsGallery page at /skills: in-app catalog of the five ARE operational skills with descriptions, IN/OUT scope, category badges, GitHub links. The catalog also includes local governance, design, evaluation, and deployment skills used by agents but not exposed as app features.
- Google Analytics 4 integrated: gtag snippet in index.html, usePageTracking hook fires page_view per route change
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

The current inventory and release plan live in
[docs/reviews/technology-inventory.md](docs/reviews/technology-inventory.md).
The dated generated report includes every direct and transitive npm lock entry,
runtime declarations, host observations, supporting skill manifests, and action
versions, with official release sources and explicit unknowns.

- `npm run audit:technologies -- --output .local/state/technology-audit` refreshes
  the version comparison. Add `--offline` for source inventory only.
- `npm run test:technologies` tests version selection and failure handling.
- Dependabot proposes npm and Actions updates daily on weekdays. Existing CI
  validates updates before the owner reviews and merges them.
- The Technology audit workflow produces a daily release comparison in its run
  summary after the workflow is merged to the default branch.
- Node builds track current LTS. Replit modules, local runtimes, service APIs,
  and language/format standards have explicit review steps in the plan.

### Routing

| Path | Component |
|------|-----------|
| `/browse` | TraditionBrowser (default) |
| `/browse/:traditionSlug` | TraditionBrowser (tradition detail) |
| `/lookup` | VerseLookup |
| `/compare` | CrossTraditionCompare |
| `/observances` | ObservancesCalendar |
| `/skills` | SkillsGallery (agent skills catalog) |
| `/origin` | OriginArchive (historical archive, easter egg) |
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
| `src/data/pew-religious-composition.snapshot.ts` | Checked-in Pew source snapshot for public demographic figures and provenance |
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
- The current release still lacks deterministic route, accessibility, and
  provider-contract test coverage.
- Deterministic API contract coverage and runtime stale-response guards are now
  present; browser route, accessibility, and race-state tests remain open.
- GitHub Pages direct-route, favicon, manifest, and subpath behavior still requires a production smoke test.
- The local Pages artifact check covers generated subpath asset and manifest
  paths; a hosted production smoke test is still required for direct routes.
- Paraphrase discovery and commentary-level controls remain origin requirements that are not implemented in the current exact-reference SPA.
- `node_modules/` is not committed; run `npm ci` or `npm install` before local build validation.

---

## Skill Directory Sync Rule

Agent skills live in two parallel directories:

| Directory | Role |
|-----------|------|
| `.agents/skills/<name>/` | Complete canonical package -- what agents load at runtime |
| `skills/<name>/` | Complete publication mirror -- what gets promoted to OKHP3/skillz |

**Both packages must be identical for mirrored skills.** When you update a mirrored skill, copy the complete package to the other location in the same commit. Run `npm run test:skill-sync` before pushing; CI compares every mirrored package file and exits non-zero if any pair differs.

Skills that are local-only (e.g. `.agents/skills/frontend-design/`) have no mirror in `skills/` and are not checked.

---

## Documentation Conventions

- No em dashes -- use -- (double hyphen) always
- US English throughout
- No emojis in code or docs
- ROY principle: verbosity must earn its space
