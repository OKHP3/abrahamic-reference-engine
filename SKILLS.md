# ARE Agent Skills Package

**Abrahamic Reference Engine -- Extractable Logic Layer**

Part of [abrahamic-reference-engine](https://github.com/OKHP3/abrahamic-reference-engine)

---

## Dual mission

ARE has two modes of value:

1. **SPA** -- A single-page web application (Vite + React + TypeScript + Tailwind) for browsing, verse lookup, and cross-tradition comparison. Free to use, hosted on GitHub Pages.

2. **Agent skills** -- A package of three standalone Markdown skill files that give any AI agent the same reference logic: how to fetch scriptures, how to find cross-tradition parallels, and how to navigate the tradition/denomination taxonomy. Usable offline, in any agentic platform, with no API keys required.

Distributed via https://github.com/OKHP3/skillz under the `okhp3-*` namespace.

---

## Scope criteria

All three skills are bounded by the same methodological rule:

> A tradition is in scope if and only if it meets **both** of the following criteria:
> 1. **Abrahamic lineage** -- traceable scriptural descent from the Abrahamic family
> 2. **1% or greater US population** -- per Pew Research Center Religious Landscape Study

**In scope (3 traditions):**

| Tradition | US Share | Pew source |
|-----------|----------|------------|
| Christianity | ~63% | [Pew 2023](https://www.pewresearch.org/religion/religious-landscape-study/) |
| Judaism | ~2% | [Pew 2023](https://www.pewresearch.org/religion/religious-landscape-study/) |
| Islam | ~1% | [Pew 2023](https://www.pewresearch.org/religion/religious-landscape-study/) |

**Explicitly out of scope:** Hinduism (not Abrahamic), Buddhism (not Abrahamic), Sikhism (not Abrahamic), Baha'i (Abrahamic but <1% US), Druze (Abrahamic but <1% US).

Exclusion is a methodological boundary, not a judgment of worth.

---

## The three skills

### 1. `okhp3-verse-lookup`

**Path:** `.agents/skills/okhp3-verse-lookup/SKILL.md`

Instructs an agent how to fetch a scripture passage from any of the three in-scope traditions using free, anonymous public APIs.

**Covers:**
- Sefaria API for Judaism (endpoint, reference format, response normalization, attribution)
- bible-api.com for Christianity (endpoint, translation IDs, free vs. licensed translation table, denomination-specific canon notes)
- Quran.com API v4 for Islam (endpoint, translation IDs, fallback to AlQuran.cloud)
- Unified `fetchPassage` interface pattern
- Error handling and fallback logic
- Complete translation ID matrix

**Use when:** An agent needs to retrieve a specific scripture reference by book/chapter/verse or surah:ayah.

---

### 2. `okhp3-cross-tradition-compare`

**Path:** `.agents/skills/okhp3-cross-tradition-compare/SKILL.md`

Instructs an agent how to find and display parallel passages across Judaism, Christianity, and Islam on a shared theme.

**Covers:**
- 20 pre-seeded themes with passage references for all three traditions (The Golden Rule, Creation, Prayer, Mercy, Justice, Forgiveness, Charity, Monotheism, Covenant, Faith, Wisdom, Divine Light, Peace, Gratitude, Repentance, Sanctity of Life, Knowledge, Love of God, Nature of God, Humility)
- Neutral bridging note style guide (what to do and what not to do)
- Proportional representation rule for generating new comparisons
- Display pattern for three-panel side-by-side layouts
- Pre-seeded static text for each passage (instant render without API calls)

**Use when:** An agent needs to surface thematic parallels across two or more Abrahamic traditions without ranking or privileging any tradition.

---

### 3. `okhp3-tradition-reference`

**Path:** `.agents/skills/okhp3-tradition-reference/SKILL.md`

Compact structured reference for each of the three in-scope traditions.

**Covers:**
- Judaism: Tanakh structure (Torah/Nevi'im/Ketuvim), key themes, interpretive traditions, key passages, Sefaria API details
- Christianity: 5 denominations (Evangelical Protestant ~25%, Catholic ~20%, Mainline Protestant ~16%, LDS/Restorationist ~2%, Orthodox Christian ~1%), canon per denomination, available free translations, representative passages, bible-api.com details
- Islam: Quran structure (114 surahs, 6,236 ayat), Hadith collections, key themes, interpretive traditions, key passages, Quran.com/AlQuran.cloud details
- US Pew population share for every tradition and denomination with citation URL
- Complete out-of-scope table with reasons

**Use when:** An agent needs metadata before generating content, making API calls, or answering questions about what traditions/denominations are covered and why.

---

## Installation by platform

All skills are plain Markdown files. Installation means making the file readable to your agent at generation time.

### Claude Code / claude.md

Add the skill content inline or reference it:

```bash
# Option A: paste content into claude.md
cat .agents/skills/okhp3-verse-lookup/SKILL.md >> claude.md

# Option B: symlink for version-controlled projects
ln -s .agents/skills/okhp3-verse-lookup/SKILL.md .claude/skills/okhp3-verse-lookup.md
```

### GitHub Copilot (.github/copilot-instructions.md)

```bash
cat .agents/skills/okhp3-tradition-reference/SKILL.md >> .github/copilot-instructions.md
```

### Cursor (.cursorrules or .cursor/rules/*.mdc)

```bash
cp .agents/skills/okhp3-cross-tradition-compare/SKILL.md .cursor/rules/okhp3-cross-tradition-compare.mdc
```

### Windsurf / Cascade (.windsurfrules)

```bash
cat .agents/skills/okhp3-verse-lookup/SKILL.md >> .windsurfrules
```

### Any agent with system prompt injection

The SKILL.md files are self-contained -- paste the full content into any system prompt or context window. No preprocessing needed.

---

## Design principles

- **Self-contained** -- each skill works without the SPA codebase
- **Static-first** -- pre-seeded data enables instant display without API calls; live fetch is an optional enhancement
- **Neutral** -- no tradition is ranked, privileged, or declared the original/source of another
- **Scope-explicit** -- every skill states the Pew-based scope criteria and links to the source
- **Free** -- all APIs referenced are anonymous, no API key required

---

## License

MIT. See `LICENSE` at repo root.

Author: OKHP3 -- OverKill Hill P3
Repo: https://github.com/OKHP3/abrahamic-reference-engine
Pew citation: https://www.pewresearch.org/religion/religious-landscape-study/
