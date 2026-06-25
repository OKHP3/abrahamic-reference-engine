# abrahamic-reference-engine

**A neutral, free reference tool for exploring shared scripture across Judaism, Christianity, and Islam.**

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Live: **https://okhp3.github.io/abrahamic-reference-engine/**

---

## What it is

The Abrahamic Reference Engine (ARE) is a dual-mission open-source project:

1. **SPA** -- A single-page web application for browsing traditions, looking up scripture, and comparing passages across traditions side-by-side. Free to use, hosted on GitHub Pages.
2. **Agent skills** -- Three standalone Markdown skill files (`okhp3-verse-lookup`, `okhp3-tradition-reference`, `okhp3-cross-tradition-compare`) that give any AI agent the same reference logic. Distributed via [OKHP3/skillz](https://github.com/OKHP3/skillz).

This is a reference tool -- not a devotional assistant, not a ranking, not a debate platform. A bridge for empathy and religious literacy.

---

## Scope

| Tradition | US Share (Pew) | In scope |
|-----------|---------------|----------|
| Christianity | ~63% | YES -- 5 denominations |
| Judaism | ~2% | YES |
| Islam | ~1% | YES |
| Hinduism | ~1% | NO -- not Abrahamic |
| Buddhism | ~1% | NO -- not Abrahamic |
| Baha'i | ~0.1% | NO -- Abrahamic but below 1% threshold |

Source: [Pew Research Center, Religious Landscape Study](https://www.pewresearch.org/religion/religious-landscape-study/)

A tradition must meet **both** criteria to be included: (1) Abrahamic lineage, and (2) 1% or greater US population per Pew.

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
  data/         Static data (traditions, compare themes, translations)
  pages/        TraditionBrowser, VerseLookup, CrossTraditionCompare
docs/
  api/          OpenAPI specs for all five external APIs
  translation-matrix.md
.agents/skills/
  okhp3-verse-lookup/
  okhp3-tradition-reference/
  okhp3-cross-tradition-compare/
```

---

## Contributing / agents

See [AGENTS.md](AGENTS.md) for the operating constitution -- conventions, scope rules, and agent guidelines.

---

## Sponsor

[ko-fi.com/overkillhillp3](https://ko-fi.com/overkillhillp3)

---

## License

MIT -- see [LICENSE](LICENSE).
