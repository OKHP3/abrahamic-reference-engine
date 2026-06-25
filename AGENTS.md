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
tailwind.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
```

Anything not on this list is detritus and must be removed or relocated before committing.

**No `docs/` directory.** Reference documents (OpenAPI specs, translation matrix) live inside the skill package that uses them: `.agents/skills/okhp3-verse-lookup/`.
**No `scripts/` directory.** Post-merge setup is `npm install`. Document it in `replit.md`, not a shell script.

---

## Section 3: Detritus Rule

- No scratch files, transcripts, or one-off scripts at root
- No loose `.py`, `.json` (except package files), or stray `.md` at root
- No `docs/` or `scripts/` directories -- these have been intentionally removed
- Agent-generated screenshots go in `attached_assets/` (gitignored)
- `dist/` is gitignored -- never commit build output
- Legacy ChatGPT Custom GPT artifacts have been deleted -- do not recreate them

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

- **Runtime:** Vite + React 18 + TypeScript + Tailwind CSS v3
- **Hosting:** GitHub Pages (static SPA) at `https://okhp3.github.io/abrahamic-reference-engine/`
- **Routing:** React Router v6 with `basename="/abrahamic-reference-engine"` (required for Pages subpath)
- **Build base path:** `vite.config.ts` has `base: '/abrahamic-reference-engine/'`
- **APIs (all free, anonymous, no key required):**
  - Sefaria API -- Judaism (Tanakh)
  - bible-api.com -- Christianity (multiple translations)
  - Quran.com API v4 -- Islam (primary)
  - AlQuran.cloud -- Islam (fallback)
  - fawazahmed0/hadith-api -- Hadith (supplementary)

---

## Section 6: Agent Skills

ARE ships three `okhp3-*` skills distributed via https://github.com/OKHP3/skillz.
Read the SKILL.md before using any skill. They are self-contained and work without the SPA.

| Skill | Path | Purpose |
|-------|------|---------|
| `okhp3-verse-lookup` | `.agents/skills/okhp3-verse-lookup/SKILL.md` | Fetch scripture for all three traditions |
| `okhp3-tradition-reference` | `.agents/skills/okhp3-tradition-reference/SKILL.md` | Metadata: canon, translations, Pew share, API provider |
| `okhp3-cross-tradition-compare` | `.agents/skills/okhp3-cross-tradition-compare/SKILL.md` | 20 pre-seeded cross-tradition themes |

---

## Section 7: File / Folder Inventory

```
src/
  api/          Sefaria, bible-api.com, Quran.com, Hadith fetch functions
  components/   Shared UI: TraditionBadge, VerseCard, LoadingSpinner, ErrorMessage, ScopeExplainer, Layout
  data/         Static data: traditions.ts, knowledge.ts, compareThemes.ts, translations.ts
  pages/        TraditionBrowser, VerseLookup, CrossTraditionCompare
  App.tsx       Root component with React Router (BrowserRouter + basename)
  main.tsx      Entry point
  index.css     Tailwind directives + custom color tokens
  types/        TypeScript type definitions

.github/
  workflows/
    deploy-pages.yml    GitHub Actions: build + deploy to GitHub Pages on push to main

.agents/
  skills/
    okhp3-verse-lookup/
      SKILL.md
      translation-matrix.md    Full translation ID / version reference table
      api/                     OpenAPI specs for Sefaria, bible-api.com, Quran.com, AlQuran, Hadith
    okhp3-tradition-reference/
    okhp3-cross-tradition-compare/
    okhp3-notion-capture-router/
    okhp3-skill-cataloger/
    (plus platform skills: find-skills, skill-creator, etc.)
  memory/
    MEMORY.md
```

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
- **Local (Windows):** `C:\Users\jamie\OKH-Local\Projects\abrahamic-reference-engine`
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
