# Agent Guidelines: Abrahamic Reference Engine

This file is the operating constitution for any AI agent working in this repo.
Read it before touching any file. It applies equally to Replit Agent, Copilot,
Claude, and any other AI assistant.

Cross-reference `replit.md` for site-specific architecture, script inventory,
and current state.

- Work in small steps. Ask before large refactors.
- Keep changes localized. Avoid touching unrelated files.
- If you need config or secrets, stop and ask. Never invent credentials.
- Summarize what you changed and why at the end of every session.

> **AGENTS.md sync circuit** -- When this file is silent or ambiguous on any
> governance matter, defer to the primary authority:
> https://github.com/OKHP3/OverKill-Hill/blob/main/AGENTS.md
>
> Web application repos:
> - **BPMN for Mermaid:** https://github.com/OKHP3/mermaid-diagram-bpmn/blob/main/AGENTS.md
> - **Mermaid Theme Builder:** https://github.com/OKHP3/mermaid-theme-builder/blob/main/AGENTS.md
> - **Abrahamic Reference Engine:** https://github.com/OKHP3/abrahamic-reference-engine/blob/main/AGENTS.md

---

## Project Identity and Purpose

**Confirmed:** This repository contains the Abrahamic Reference Engine, a
neutral, citation-first reference tool for finding, comparing, and contextualizing
scripture across Judaism, Christianity, and Islam. It serves a static web app and
the reusable Markdown skills that support the same reference workflows.

**Inferred mission:** Make religious references easier to locate and compare for
students, writers, educators, secular readers, believers, and AI builders while
keeping attribution, scope, and differences visible.

**Inferred vision:** Become a dependable reference layer for cross-tradition
scripture literacy without becoming a devotional, apologetics, ranking, or
doctrinal-authority system.

The source tree supports these conclusions. A longer-term roadmap, ownership
model, and production guarantees are not established by repository evidence.

---

## Section 0: Language Standard

All content, code comments, commit messages, and documentation in this repo
use **US English** (en-US). This is non-negotiable and applies to every agent.

- Use "color" not "colour", "center" not "centre", etc.
- No em dashes (--) in any generated content. Use -- (double hyphen) instead.
- No emojis in code, docs, or commit messages unless the user explicitly requests them.

---

## Section 1: Naming Conventions

- **Directories:** kebab-case (`src/components/`, `src/api/`)
- **React components:** PascalCase (`TraditionBrowser.tsx`, `VerseCard.tsx`)
- **Utilities / hooks / data:** camelCase (`fetchVerse.ts`, `traditions.ts`)
- **Skill support files:** live inside the skill directory (e.g. `.agents/skills/okhp3-verse-lookup/api/`)
- No spaces, no underscores in new file names

---

## Section 2: Permitted Root-Level Items

The following are the only items allowed at the repo root:

```
.agents/           skills, memory, and skill-scoped support files
.github/           Actions workflows
public/            static assets (favicon, etc.)
scripts/           repository-level validation scripts
src/               application source

.gitattributes
.gitignore
.replitignore
.replit
AGENTS.md
LICENSE
README.md
replit.md
index.html
package.json
package-lock.json
postcss.config.js
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
```

Anything not on this list is detritus and must be removed or relocated before committing.

**No `docs/` directory.** Reference documents (OpenAPI specs, translation matrix) live inside the skill package that uses them: `.agents/skills/okhp3-verse-lookup/`.
The root `scripts/` directory is an intentional exception for repository-level
validation. Do not add scratch scripts there.

---

## Section 3: Detritus Rule

- No scratch files, transcripts, or one-off scripts at root
- No loose `.py`, `.json` (except package files), or stray `.md` at root
- No `docs/` directory
- `scripts/` may contain only intentional, documented validation tooling
- Agent-generated screenshots go in `attached_assets/` (gitignored)
- `dist/` is gitignored -- never commit build output
- The historical origin archive under `public/origin/` is intentional static
  content. Do not recreate unrelated legacy artifacts at the root.

---

## Section 4: Brand

- **Suite:** OverKill Hill P3 / FoundRy
- **Brand color:** Forge (Rust-orange) -- consistent with sibling repos
- **ARE custom palette:**
  - Gold: `#c9a84c`
  - Parchment: `#e8e0d0`
  - Background base: `#0f0f0f`
  - Background elevated: `#1a1a1a`
- **Tradition colors (Tailwind):**
  - Judaism: `blue-400 / blue-800 / blue-950`
  - Christianity: `violet-400 / violet-800 / violet-950`
  - Islam: `emerald-400 / emerald-800 / emerald-950`
- Canonical stylesheet reference: https://github.com/OKHP3/OverKill-Hill/main/assets/css/theme.css

---

## Section 5: Tech Stack

- **Runtime:** Vite 8 + React 19 + TypeScript 7 + Tailwind CSS 4
- **Hosting:** GitHub Pages (static SPA) at `https://okhp3.github.io/abrahamic-reference-engine/`
- **Routing:** React Router 7 with `BrowserRouter` and a basename derived from `import.meta.env.BASE_URL`
- **Build base path:** `vite.config.ts` uses `/` for development and `/abrahamic-reference-engine/` for production builds
- **APIs (all free, anonymous, no key required):**
  - Sefaria API -- Judaism (Tanakh)
  - bible-api.com -- Christianity (multiple translations)
  - Quran.com API v4 -- Islam (primary)
  - AlQuran.cloud -- Islam (fallback)
  - fawazahmed0/hadith-api -- Hadith (supplementary)

---

## Section 6: Agent Skills

ARE ships four project-specific `okhp3-*` skills distributed via https://github.com/OKHP3/skillz.
Read the SKILL.md before using any skill. They are self-contained and work without the SPA.

| Skill | Path | Purpose |
|-------|------|---------|
| `okhp3-verse-lookup` | `.agents/skills/okhp3-verse-lookup/SKILL.md` | Fetch scripture for all three traditions |
| `okhp3-tradition-reference` | `.agents/skills/okhp3-tradition-reference/SKILL.md` | Metadata: canon, translations, Pew share, API provider |
| `okhp3-cross-tradition-compare` | `.agents/skills/okhp3-cross-tradition-compare/SKILL.md` | 20 pre-seeded cross-tradition themes |
| `okhp3-tradition-observance-calendar` | `.agents/skills/okhp3-tradition-observance-calendar/SKILL.md` | Observance data, Computus, and iCalendar output |

The repository also contains reusable tooling skills: `okhp3-celestial-data`,
`okhp3-skill-cataloger`, and `okhp3-skill-foundry`. The generated inventory is
`.agents/skills/README.md`.

---

## Section 7: File / Folder Inventory

```
src/
  api/          Scripture, Hadith, and LDS passage fetch functions
  components/   Shared UI, navigation, settings, verse, Hadith, and observance components
  context/      Theme and user-settings providers
  data/         Static tradition, knowledge, comparison, theme, and translation data
  hooks/        Client-side usage analytics hook
  lib/          Calendar clients, observance helpers, celestial math, and iCalendar generation
  pages/        TraditionBrowser, VerseLookup, CrossTraditionCompare, ObservancesCalendar, OriginArchive
  App.tsx       Root component with BrowserRouter and route definitions
  main.tsx      Entry point and provider composition
  index.css     Tailwind 4 import plus custom color tokens
  settings.ts   Persisted user-settings schema and defaults
  types/        TypeScript type definitions

.github/
  workflows/
    ci.yml              Build check on pull requests and pushes to main
    deploy-pages.yml    Build + deploy to GitHub Pages on push to main

.agents/
  skills/
    okhp3-verse-lookup/
      SKILL.md
      translation-matrix.md    Full translation ID / version reference table
      api/                     OpenAPI specs for Sefaria, bible-api.com, Quran.com, AlQuran, Hadith
    okhp3-tradition-reference/
      SKILL.md
      knowledge/                   Tradition primers, glossary, compare method, API gap register, UI copy, translation metadata (15 files)
    okhp3-cross-tradition-compare/
    okhp3-celestial-data/
    okhp3-skill-cataloger/
    okhp3-skill-foundry/
    okhp3-tradition-observance-calendar/
  memory/
    MEMORY.md
```

---

## Section 7a: Commands and Validation

Run `npm install` or `npm ci` after a fresh checkout when `node_modules/` is
absent. The command inventory is:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite dev server on port 5000 |
| `npm run build` | Type-check and create the production bundle in `dist/` |
| `npm run preview` | Serve the production bundle locally on port 5000 |
| `npm run lint` | Intended ESLint check; currently unavailable because ESLint is not declared or configured |
| `npm run test:api` | Live provider checks in `scripts/test-api-live.js`; use when changing API adapters |

The GitHub Actions workflows run `npm ci` and `npm run build`. The repository
currently has no unit-test suite. Live API checks require network access and
are provider-dependent.

---

## Section 7b: Current Status and Architecture Boundaries

Confirmed from the source tree and route definitions:

- This is one Git repository containing a static SPA and a reusable skills package. No nested independent application was found.
- The primary user workflows are browsing five Christian denominations across three tradition families, looking up passages, comparing 20 themes, and reviewing a year-selectable observance calendar with `.ics` downloads.
- The hidden `/origin` route exposes a historical project archive from `public/origin/`; it is not a primary research workflow.
- The browser calls public, anonymous providers directly. There is no backend, database, server-side rendering, or authentication layer.
- `src/api/` owns passage and Hadith retrieval. `src/lib/` owns calendar integrations, local calendar math, Wikipedia descriptions, and `.ics` generation. Static content belongs in `src/data/` or the relevant skill package.
- GitHub Pages deployment copies `dist/index.html` to `dist/404.html` for SPA fallback routing.

Known gaps and risks:

- `npm run lint` is declared but has no installed or configured ESLint dependency.
- Provider availability, translation coverage, and calendar results can change independently of the repository. Record confirmed provider gaps in `.agents/skills/okhp3-tradition-reference/knowledge/reserve-02-api-gap-register.md`.

---

## Section 8: Scope Constraints (Non-Negotiable)

These rules are the methodological foundation of ARE. They apply to every agent, every feature, every piece of generated content.

- **No tradition is ranked above another.** Every tradition is presented as equally valid and worthy of respect.
- **Strict scope: Abrahamic lineage + 1% US population.** Both criteria must be met. Either alone is insufficient.
- **Three traditions in scope:** Judaism (~2% US), Christianity (~63% US), Islam (~1% US).
- **Explicitly excluded:** Hinduism (not Abrahamic), Buddhism (not Abrahamic), Wicca (not Abrahamic), Baha'i (Abrahamic but <1% US), Druze (Abrahamic but <1% US), Sikhism (not Abrahamic). Exclusion is a methodological boundary, not a judgment of worth.
- **Proportional representation.** Content depth and volume reflect US Pew share. Christianity gets more entries by count because it is ~63% US. Every entry has identical visual dignity.
- **Pew citation visible in UI.** The scope decisions are data-driven. The UI must surface the Pew URL: https://www.pewresearch.org/religion/religious-landscape-study/
- **English-only, US English.** Primary audience is English-speaking American citizens -- including secular and unaffiliated users seeking cultural literacy.
- **No API costs.** All external APIs must be free and anonymous.
- **MIT license throughout.**
- **Never hallucinate verses.** Never invent scripture references. Source-first: API retrieval or static pre-seeded text only.
- **This is a reference tool, not a source of spiritual or moral authority.** Never ranks beliefs, proselytizes, or declares a doctrine correct.
- **Phase 2 is deferred, not excluded.** Hinduism and Buddhism are out of scope for Phase 1 but worth revisiting if scope expands beyond Abrahamic lineage.

### US Religious Demographics (Pew Research Center, Religious Landscape Study)

Source: https://www.pewresearch.org/religion/religious-landscape-study/

| Tradition | US Share | In scope | Notes |
|---|---|---|---|
| Christianity (total) | ~63% | YES | Subdivided by US denomination |
| -- Evangelical Protestant | ~25% | YES | |
| -- Catholic | ~20% | YES | |
| -- Mainline Protestant | ~16% | YES | |
| -- LDS / Restorationist | ~2% | YES | |
| -- Orthodox Christian | ~1% | YES | |
| Judaism | ~2% | YES | |
| Islam | ~1% | YES | |
| Hinduism | ~1% | NO | Not Abrahamic |
| Buddhism | ~1% | NO | Not Abrahamic |
| Baha'i | ~0.1% | NO | Abrahamic but below 1% threshold |
| Unaffiliated / Secular | ~26% | Context only | Not a scriptural tradition |

---

## Section 8b: API Gap Register Maintenance

The API gap register lives at `.agents/skills/okhp3-tradition-reference/knowledge/reserve-02-api-gap-register.md`.

**Every agent must update reserve-02 whenever:**
- A new provider issue is discovered (translation returns empty, API endpoint changes, coverage disappears)
- A gap is resolved by a code fix or provider change -- change `**Status:** open` to `**Status:** resolved -- <date> -- <one-line summary>`
- A gap is partially mitigated -- change status to `**Status:** mitigated -- <date> -- <one-line summary>`
- A tracked fix task is completed -- update the gap entry and remove it from "Relationship to project tasks"

**After updating any gap entry, sync the summary table at the bottom of the file.** The table must reflect the current status of every entry above it. A summary table that is out of sync with the entries is a governance violation.

**Do not add a gap without:**
- A tradition/denomination
- A clear reason (licensed, API structural limit, provider gap, etc.)
- A documented fallback or UI behavior
- A `**Status:** open` line

---

## Section 9: App-Level Governance

- **Dev server:** port 5000, host 0.0.0.0
- **Hosting target:** GitHub Pages at `https://okhp3.github.io/abrahamic-reference-engine/`
- **No em dashes** in any generated content -- use -- (double hyphen)
- **Cross-tradition compare is the signature feature** -- it embodies the mission
- **The "Why these three?" / Pew explainer is mandatory in the UI** -- always present
- **Tone:** solemn, scholarly, neutral -- librarian/archivist register, not charismatic or devotional
- **ROY principle:** understanding produced / explanation invested -- verbosity must earn its space
- **Pew URL:** https://www.pewresearch.org/religion/religious-landscape-study/

---

## Project Origin

This project originated from a 2026-06-14/15 conversation in which Patrick proposed a GPT for biblical reference understanding. The concept expanded from a narrow Bible lookup into a technically disciplined scripture-reference engine covering all Abrahamic traditions.

Key origin decisions:
- Placed under OverKill Hill P3 / FoundRy, not Glee-fully -- the solemn/sacred context is incompatible with the Glee-fully voice
- Tone set early: solemn, scholarly, neutral -- a librarian, not a preacher
- Scope set by US religious demographics (Pew) + Abrahamic lineage -- both criteria must be met
- Secular/unaffiliated users identified as a primary audience from the start

Source threads: ChatGPT shared threads from 2026-06-14/15.
- https://chatgpt.com/share/6a3caabd-a68c-83ea-88e6-643be78bd23a
- https://chatgpt.com/share/6a3caada-e48c-83ea-8c6d-9dbc54e11222

**Limitation:** Both threads render client-side only. Programmatic extraction requires a headless browser. Thread summaries are captured in the Notion anchor (895d08a0-f20f-4f8d-bb8d-c9dd55dee405).

---

## Related Repos

- [foundry-unt00-un-nocked-truth](https://github.com/OKHP3/foundry-unt00-un-nocked-truth)
- [foundry-psr00-pathscrib-r](https://github.com/OKHP3/foundry-psr00-pathscrib-r)
- [foundry-hmt01-homestead-r](https://github.com/OKHP3/foundry-hmt01-homestead-r)
- [mermaid-theme-builder](https://github.com/OKHP3/mermaid-theme-builder) -- governance reference
- [mermaid-diagram-bpmn](https://github.com/OKHP3/mermaid-diagram-bpmn) -- governance reference

---

## Project Identity

- **Suite:** FoundRy
- **Type:** SPA + Agent Skills Package
- **GitHub:** https://github.com/OKHP3/abrahamic-reference-engine
- **Notion Anchor:** https://app.notion.com/p/895d08a0f20f4f8dbb8dc9dd55dee405
- **Local (Windows):** `C:\Users\jamie\OKH-Local\04_GitHub_Mirrors\abrahamic-reference-engine`
- **Local (Mac):** `/Volumes/OKH-Local/04_GitHub_Mirrors/abrahamic-reference-engine`
- **Status:** Active / In Development

---

## Notion Extraction Report (2026-06-25)

Three Notion pages were read via the Notion API:

| Page | Blocks | Outcome |
|------|--------|---------|
| Main project page (03572df2) | 0 | Empty page -- no content to extract |
| ARE Notion Anchor (895d08a0) | 105 | Rich content extracted -- see Project Origin and Section 9 tone additions |
| Notion-GitHub Routing Hub (e2949892) | 27 | Structural routing index; table cells not exposed by block API at top level |

Net-new content merged: audience framing, authority boundary, tone constraint, Phase 2 deferred note, Project Origin section, NIV added to translation-matrix.md.

---

*Generated: 2026-06-11 | Restructured to governance format: 2026-06-25 | Source: Notion API extraction + Session context*

## Imported Claude Cowork project instructions
