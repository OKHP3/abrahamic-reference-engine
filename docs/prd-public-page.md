# PRD: overkillhill.com/projects/abrahamic-reference-engine/

**Target:** OverKill Hill website (https://replit.com/t/overkill-hill/repls/OverKill-Hill)
**Route:** `/projects/abrahamic-reference-engine/`
**Status:** Page exists but shows the Under Construction placeholder. Replace with fully populated project page.
**Reference pages (match layout, component patterns, and copy tone exactly):**
- https://overkillhill.com/projects/mermaid-theme-builder/
- https://overkillhill.com/projects/bpmn-for-mermaid/

---

## Instructions for the agent

Look at the existing project page components for mermaid-theme-builder and bpmn-for-mermaid. Use the same component structure, layout, sidebar, and section patterns. The content below is the ARE-specific data layer -- plug it in wherever those pages plug in their equivalent data.

Do not invent layout. Match the existing pattern precisely.

---

## Section 1: Header / Hero

**Breadcrumb:**
```
overkillhill.com / projects / abrahamic-reference-engine
```

**Status tags (match pill style from mermaid-theme-builder):**
```
FOUNDRY PROJECT   OPEN SOURCE   V1.0 ACTIVE   AGENT SKILLS AVAILABLE
```

**Title:**
```
Abrahamic Reference Engine
```

**Tagline (orange italic, match mermaid-theme-builder "Visual governance..." style):**
```
Find it. Quote it. Compare it. No sermon required.
```

**Description paragraph (2-3 sentences, punchy, match the density of mermaid-theme-builder's description):**
```
A neutral, citation-first scripture reference engine for Judaism, Christianity, and Islam.
Browse traditions, look up passages from source-aware APIs, and compare shared themes side-by-side.
Browser-only. No login. No preaching. No ranking.
```

**CTA buttons (match button style from reference pages):**
- Primary (orange, filled): `Launch the Engine` -- links to `https://okhp3.github.io/abrahamic-reference-engine/`
- Secondary (ghost/outline): `Explore Agent Skills` -- links to `https://github.com/OKHP3/skillz`
- Tertiary (text link): `View on GitHub` -- links to `https://github.com/OKHP3/abrahamic-reference-engine`

---

## Section 2: THE PROBLEM

**Section label:** `THE PROBLEM`

**Section heading:**
```
The Reference Gap
```

**4 problem cards (2x2 grid, match mermaid-theme-builder card layout with icon + bold title + description):**

**Card 1:**
- Title: `Most scripture tools are built for insiders`
- Body: Devotional apps, denominational study tools, and apologetics platforms assume you already belong. If you're secular, unaffiliated, or just trying to understand a reference -- there's almost nothing built for you.

**Card 2:**
- Title: `Cross-tradition comparison requires a scholar`
- Body: Figuring out how Judaism, Christianity, and Islam treat the same theme (mercy, justice, covenant, creation) means switching between six different apps, three translation frameworks, and a denominational minefield.

**Card 3:**
- Title: `AI models hallucinate scripture`
- Body: Ask a language model for a verse and it will confidently invent one. There is no neutral, API-backed, source-first reference layer designed specifically for agents and AI builders to use safely.

**Card 4:**
- Title: `Translation choice is invisible`
- Body: KJV, NABRE, NIV, NRSV, Yusuf Ali, Sahih International -- each carries different denominational assumptions. Most tools pick one silently. This one names the choice and lets you see the difference.

---

## Section 3: Live Demo (iframe embed)

**Pattern:** Match the BPMN for Mermaid live playground section.

**Label row:**
```
LIVE DEMO   --   OKHP3.GITHUB.IO
```

**Reload + Full Screen controls** (match bpmn-for-mermaid)

**iframe src:** `https://okhp3.github.io/abrahamic-reference-engine/`

**Full screen button text:** `Open Engine Full Screen`

---

## Section 4: How It Works (three modes)

**Section label:** `WHAT IT DOES`

**Section heading:**
```
Three modes. One engine.
```

Use a feature card layout (3 columns or vertical list, whichever matches the reference site's existing feature components).

**Mode 1: Browse**
- Label/tag: `BROWSE TRADITIONS`
- Heading: Browse traditions and denominations
- Body: Explore Judaism, Christianity (five denominational lenses), and Islam with scope notes, canon boundaries, key texts, and neutral summaries. Every tradition gets identical visual dignity -- no ranking.

**Mode 2: Lookup**
- Label/tag: `VERSE LOOKUP`
- Heading: Look up passages from real sources
- Body: Retrieve scripture by reference. Sefaria for Jewish texts. bible-api.com for Christian scripture across translations. Quran.com with AlQuran.cloud fallback for Qur'an. Quote from sources, not model memory.

**Mode 3: Compare**
- Label/tag: `CROSS-TRADITION COMPARE`
- Heading: Compare shared themes across traditions
- Body: Twenty pre-seeded themes -- justice, mercy, creation, covenant, prayer, forgiveness, and more -- shown side-by-side across all three traditions. Similarities matter. Differences matter. The nuance gremlins are the whole point.

---

## Section 5: Agent Skills

**Section label:** `AGENT SKILLS`

**Section heading:**
```
Built for humans. Packaged for agents.
```

**Body paragraph:**
```
ARE ships three reusable Markdown skill files so any AI agent can use the same reference logic.
No API key. No backend dependency. Compatible with Claude Code, GitHub Copilot, Cursor, Windsurf, and any platform that supports skill injection.
Distributed via OKHP3/skillz.
```

**Three skill cards (match whatever card component the reference site uses):**

**Skill 1:**
- Name: `okhp3-verse-lookup`
- Description: Fetch scripture from Sefaria, bible-api.com, or Quran.com by tradition and reference. Includes endpoint patterns, translation ID map, fallback logic, and normalization rules.

**Skill 2:**
- Name: `okhp3-tradition-reference`
- Description: Compact structured metadata for all three traditions and five Christian denominations. Canon scope, key texts, US Pew share, API provider, out-of-scope table.

**Skill 3:**
- Name: `okhp3-cross-tradition-compare`
- Description: Twenty pre-seeded cross-tradition themes with passage references for all three traditions, a neutral bridging note style guide, and the proportional representation rule.

**CTA:** `Browse All Skills on GitHub` -- links to `https://github.com/OKHP3/skillz`

---

## Section 6: Scope Methodology

**Section label:** `SCOPE`

**Section heading:**
```
Why these three traditions?
```

**Body:**
```
The scope is set by two criteria that must both be met.
A tradition must have Abrahamic lineage AND represent approximately 1% or more of the US population per Pew Research Center.
```

**Scope table:**

| Tradition | US Share | In scope | Notes |
|-----------|----------|----------|-------|
| Christianity | ~63% | Yes | Five denominational lenses |
| Judaism | ~2% | Yes | Tanakh / Jewish textual reference |
| Islam | ~1% | Yes | Qur'an-focused reference |
| Hinduism | ~1% | No | Important -- not Abrahamic |
| Buddhism | ~1% | No | Important -- not Abrahamic |
| Baha'i | ~0.1% | No | Abrahamic -- below threshold |

**Source link:** Pew Research Center, Religious Landscape Study -- `https://www.pewresearch.org/religion/religious-landscape-study/`

**Note below table (small text):** Exclusion is a methodological boundary, not a judgment of worth.

---

## Section 7: Design Principles

**Section label:** `PRINCIPLES`

**Section heading:**
```
The rules the engine runs on.
```

**Five principles (use whatever principle/feature card pattern the site has):**

1. **Neutrality first** -- No winners, no losers, no superior doctrines. Every tradition is presented with identical visual dignity and identical structural respect.

2. **Attribution always** -- Every passage includes translation, source, provider, and licensing context. The engine cites its sources the same way a library does.

3. **Context without preaching** -- The project may explain how a passage is commonly understood. It does not tell you what to believe or how to live.

4. **Difference is data** -- When traditions disagree, the engine names the difference plainly and respectfully. Similarity does not mean sameness.

5. **Free and open where possible** -- All APIs are free and anonymous. No account required, no data collected, no paywall. MIT license throughout.

---

## Section 8: PROJECT INFO Sidebar

Match the right-rail sidebar from mermaid-theme-builder exactly. Fields:

| Field | Value |
|-------|-------|
| Status | Active / v1.0 |
| Build Phase | v1.0 SPA + Skills Package |
| GitHub | OKHP3/abrahamic-reference-engine |
| Live URL | okhp3.github.io/abrahamic-reference-engine |
| License | MIT |
| Type | Community Tool |
| Cost | Free / Open Source |
| Maintained by | OverKill Hill P3 (linked) |
| Suite | FoundRy |
| Agent Skills | 3 skills via OKHP3/skillz |

---

## Section 9: What This Is Not

**Section label:** `WHAT THIS IS NOT`

**Section heading:**
```
A reference engine. Not a religion.
```

**Body (use a tight list or two-column layout if the site supports it):**

This project is not:
- a devotional assistant
- a preacher or a moral authority
- an apologetics engine or debate platform
- a tradition-ranking tool
- a replacement for clergy, scholars, or religious communities
- a claim that all traditions mean the same thing

It is a reference engine. It helps you find text, compare themes, and understand context. What you do with that is up to you.

---

## Copy and tone notes for the agent

- Match the mermaid-theme-builder copy voice exactly: punchy, lowercase section labels, short declarative sentences.
- Do not add emojis.
- Do not use em dashes -- use double hyphen (--) instead.
- The tagline ("Find it. Quote it. Compare it. No sermon required.") is locked. Do not rewrite it.
- The four problem titles are locked. Do not soften, reframe, or expand them.
- Keep all tradition-specific language neutral. Never imply one tradition is more correct, original, or complete.
- The Pew citation is mandatory and must appear in the scope section.
- US English throughout.
