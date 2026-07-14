# Abrahamic Reference Engine

**A neutral, citation-first scripture reference engine for exploring Judaism, Christianity, and Islam without preaching, ranking, or doctrinal combat.**

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Live demo: **https://okhp3.github.io/abrahamic-reference-engine/**

---

## Why this exists

Religious texts are everywhere in culture, politics, family life, literature, history, ethics, education, and public conversation. But most scripture tools are built for insiders: devotional apps, denominational study tools, apologetics platforms, or debate machines.

**Abrahamic Reference Engine** is different.

It is a neutral research and literacy tool for people who want to find, compare, and understand scripture references across the Abrahamic traditions without being pushed toward a belief system.

It is for:

- students trying to understand a passage;
- writers checking religious references;
- educators preparing comparative material;
- secular readers trying to understand religious language;
- believers comparing translation and tradition context;
- AI builders who need reusable, source-aware reference logic.

The goal is not to decide which tradition is right.

The goal is to make the text easier to find, cite, compare, and understand.

---

## What it does

Abrahamic Reference Engine provides four primary workflows:

### 1. Browse traditions

Explore major Abrahamic traditions and denominations with scope notes, canon boundaries, key texts, and neutral summaries.

Current focus:

- Christianity
- Judaism
- Islam

Christianity includes multiple denominational lenses because Catholics, Protestants, Orthodox Christians, Evangelicals/Baptists, and Restorationist movements often share overlapping texts but differ in canon, translation defaults, and interpretive context.

### 2. Look up passages

Retrieve scripture passages from source-aware APIs and structured data layers.

The project is designed around a simple rule:

> Quote from sources, not model memory.

Supported data pathways:

- Sefaria for Jewish texts and Tanakh references;
- bible-api.com for Christian scripture (multiple translations);
- Quran.com and AlQuran.cloud for Qur'an references;
- structured local metadata for translations, traditions, themes, and comparison logic.

### 3. Compare themes across traditions

Compare how Judaism, Christianity, and Islam address shared themes such as justice, mercy, creation, covenant, prayer, charity, forgiveness, and judgment.

Comparisons are designed to preserve difference.

This project does **not** flatten traditions into one vague soup of "basically the same thing." Similarities matter. Differences matter. The tiny nuance gremlins are the whole point.

### 4. Review observances

The Observances calendar combines Jewish and Islamic provider data with
calculated Christian dates. Users can filter events and download individual or
full-year iCalendar (`.ics`) files.

The `/origin` route is a hidden historical archive of the project's source
materials. It is not part of the primary research workflow.

---

## What this is not

This project is not:

- a devotional assistant;
- a preacher;
- an apologetics engine;
- a debate platform;
- a tradition-ranking tool;
- a replacement for clergy, scholars, or religious communities;
- a claim that all traditions mean the same thing.

It is a reference engine.

It helps users locate text, compare themes, and understand context while keeping attribution and neutrality visible.

---

## Project architecture

The repo has two related tracks:

### Web application

A React + TypeScript single-page application for browsing traditions, looking up passages, comparing cross-tradition themes, and reviewing observances.

### Agent skills

Reusable Markdown skill packages that allow AI agents to use the same reference logic. Distributed via [OKHP3/skillz](https://github.com/OKHP3/skillz):

- `okhp3-verse-lookup` -- fetch scripture for all three traditions
- `okhp3-tradition-reference` -- metadata for traditions and denominations
- `okhp3-cross-tradition-compare` -- 20 pre-seeded cross-tradition themes
- `okhp3-tradition-observance-calendar` -- observance dates and iCalendar output

---

## Scope

The current scope is intentionally narrow.

| Tradition | US Share (Pew) | In scope | Notes |
|-----------|----------------|----------|-------|
| Christianity | ~63% | Yes | Includes several denominational lenses |
| Judaism | ~2% | Yes | Tanakh / Jewish textual reference support |
| Islam | ~1% | Yes | Qur'an-focused reference support |
| Hinduism | ~1% | No | Important, but not Abrahamic |
| Buddhism | ~1% | No | Important, but not Abrahamic |
| Baha'i | ~0.1% | No | Abrahamic-adjacent, below current threshold |

Source: [Pew Research Center, Religious Landscape Study](https://www.pewresearch.org/religion/religious-landscape-study/)

A tradition must currently meet both criteria:

1. It belongs to the Abrahamic family of traditions.
2. It represents approximately 1% or more of the United States population per Pew.

This scope may evolve, but expansion should remain explicit rather than accidental.

---

## Design principles

### Neutrality first

The engine should present traditions respectfully without declaring winners, losers, superior doctrines, or "correct" beliefs.

### Attribution always

Whenever possible, passages include translation, source, provider, and licensing context.

### Context without preaching

The project may explain how a passage is commonly understood, but it does not exhort users to believe or practice.

### Difference is data

When traditions disagree, the system names the difference plainly and respectfully.

### Free and open where possible

The project favors free, open, public, and API-accessible sources, while respecting licensing and attribution requirements.

---

## Tech stack

- Vite 8
- React 19
- React Router 7
- TypeScript 7
- Tailwind CSS 4
- GitHub Pages
- Markdown-based agent skills
- API adapters for Sefaria, bible-api.com, Quran.com, AlQuran.cloud, Hadith

---

## Local development

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5000`.

```bash
npm run build    # production build -> dist/
npm run preview  # preview the production build locally
```

---

## Project structure

```
src/
  api/          Sefaria, bible-api.com, Quran.com, Hadith fetch functions
  components/   Shared UI components
  context/      Theme and user-settings providers
  data/         Static data (traditions, compare themes, translations)
  lib/          Calendar clients, observance helpers, and iCalendar generation
  pages/        Browse, lookup, compare, observances, and origin archive routes
scripts/
  test-api-live.js  Live provider smoke tests
.agents/skills/
  okhp3-verse-lookup/
  okhp3-tradition-reference/
  okhp3-cross-tradition-compare/
  okhp3-tradition-observance-calendar/
```

Reference documents and OpenAPI specs live inside the relevant skill package.
The historical origin materials served by the hidden archive live under
`public/origin/`.

---

## Contributing / agents

See [AGENTS.md](AGENTS.md) for the operating constitution -- conventions, scope rules, and agent guidelines.

---

## Sponsor

[ko-fi.com/overkillhillp3](https://ko-fi.com/overkillhillp3)

---

## License

MIT -- see [LICENSE](LICENSE).
