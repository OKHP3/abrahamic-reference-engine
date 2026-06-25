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

---

## Current State (as of 2026-06-25)

- SPA complete -- all three modes working
- TraditionBrowser: browse Judaism, Christianity (5 denominations), Islam with verse cards and Pew explainer
- VerseLookup: fetch live verse from Sefaria / bible-api.com / Quran.com by reference
- CrossTraditionCompare: 20 pre-seeded themes, side-by-side three-panel layout
- Agent skills package complete: okhp3-verse-lookup, okhp3-tradition-reference, okhp3-cross-tradition-compare
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
Vite + React 18 + TypeScript + Tailwind CSS v3
React Router v6 (BrowserRouter + basename)
Static SPA -- no backend, no server-side rendering
All data fetched from public free APIs or served from static pre-seeded files
```

### Routing

| Path | Component |
|------|-----------|
| `/browse` | TraditionBrowser (default) |
| `/browse/:traditionSlug` | TraditionBrowser (tradition detail) |
| `/lookup` | VerseLookup |
| `/compare` | CrossTraditionCompare |
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
| `tailwind.config.ts` | Tailwind -- custom ARE color tokens |
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
- GPT origin artifact bundle not yet imported into repo -- tracked as a follow-up

---

## User Preferences

- No em dashes -- use -- (double hyphen) always
- US English throughout
- No emojis in code or docs
- Standalone punchy lines -- do not consolidate into paragraphs
- ROY principle: verbosity must earn its space
- AutoCAD version is R10 (locked, not negotiable)
