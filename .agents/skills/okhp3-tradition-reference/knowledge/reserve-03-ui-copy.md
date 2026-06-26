---
title: Reserve 03 -- UI Copy Reference
type: reserve
status: active-reference
---

# Reserve 03 -- UI Copy Reference

Reference copy for recurring text patterns in the Abrahamic Reference Engine UI. Use these verbatim or adapt minimally. All copy must conform to the ARE tone (solemn, scholarly, neutral -- librarian/archivist register, not charismatic or devotional) and to the language standard (US English, no em dashes, no emojis).

---

## App identity

**Full name:** Abrahamic Reference Engine
**Short name:** ARE
**Suite:** OverKill Hill P3 / FoundRy
**Tagline (if needed):** A scripture reference engine for the three major Abrahamic traditions.

---

## Scope explainer (ScopeExplainer component)

The ScopeExplainer component reads from the `PEW_SCOPE_NOTE` object in `src/data/traditions.ts`. The source-of-truth copy is in that data file. The UI renders the heading and criteria from it dynamically.

### Heading

Why These Three Traditions?

### Criteria list (from PEW_SCOPE_NOTE.qualifyingCriteria)

1. Abrahamic lineage -- traceable descent from the Abrahamic scriptural family
2. 1% or greater US population per the Pew Research Center Religious Landscape Study

### Out-of-scope note

Traditions reviewed but excluded from scope: [rendered as a list from PEW_SCOPE_NOTE.excluded with name and reason]

Exclusion is a methodological boundary, not a judgment of worth.

### Pew citation text

Source: Pew Research Center Religious Landscape Study, 2023
URL: https://www.pewresearch.org/religion/religious-landscape-study/

---

## Navigation labels (ModeNav component)

These are the exact labels used in the live application (src/components/ModeNav.tsx):

| Label | Route | aria-label (description) |
|-------|-------|--------------------------|
| Browse | /browse | Explore traditions |
| Lookup | /lookup | Find a passage |
| Compare | /compare | Side-by-side themes |
| Observances | /observances | Religious holiday calendar |

Note: the nav uses single-word labels in the tab bar. Longer descriptive forms ("Browse Traditions", "Look Up a Verse", etc.) appear only in in-page headings and back-navigation links, not in the tab bar itself.

### Back-navigation link text

-- Browse Traditions (appears in TraditionBrowser denomination detail view)

---

## Error states

### API unavailable -- generic

Unable to retrieve this passage. The external API may be temporarily unavailable. Please try again in a moment.

### Reference not found

No passage found for this reference. Check that the reference format is correct and try again.

### LDS non-Bible fallback

The LDS Standard Works (Book of Mormon, Doctrine and Covenants, Pearl of Great Price) are not available via a guaranteed free API at this time. Visit the official LDS scriptures website to look up this passage: https://www.churchofjesuschrist.org/study/scriptures

### Licensed translation note

This translation requires an API key and is not available in this free build. Passages are shown using [fallback translation name] instead.

### Orthodox OT gap note

This text is part of the Orthodox OT canon but is not available via a free public API. The World English Bible (WEB) includes the Catholic deuterocanonicals but does not cover all Orthodox additions (3 Maccabees, Psalm 151, 4 Maccabees).

### Douay-Rheims gap note

The Douay-Rheims translation is not reliably available via the free API. Showing the World English Bible instead.

### Pickthall gap note

The Pickthall translation is not available from the primary provider for this verse. Attempting fallback provider.

### Tradition not found

Tradition not found. [link: Browse Traditions]

---

## Attribution patterns

### Sefaria

[passage text]
-- [Book] [Chapter]:[Verse] -- Sefaria English, sefaria.org (CC BY-SA 2.0)

### Bible (public domain)

[passage text]
-- [Book] [Chapter]:[Verse] -- [Translation Name]. Public domain.

### Bible (licensed, not displayed)

[licensed translation name] is not available in this free build.

### Quran.com

[passage text]
-- Al-[Surah name] [Surah]:[Ayah] -- [Translation name], served via Quran.com

### Hadith (fawazahmed0)

[hadith text]
-- [Collection name], Book [N], Hadith [N] -- fawazahmed0/hadith-api (CC BY-4.0)

---

## Tradition labels

Use these consistently in UI; do not abbreviate or shorten:
- Judaism
- Christianity -- Evangelical Protestant
- Christianity -- Catholic
- Christianity -- Mainline Protestant
- Christianity -- LDS / Restorationist
- Christianity -- Orthodox Christian
- Islam

In page headings and denomination cards, the tradition prefix "Christianity --" is dropped when the context is already clearly within the Christianity section. In navigation tabs and global cross-tradition views, the full label is used.

---

## VerseLookup page copy

### Page heading

Look Up a Passage

### Tradition selector label

Tradition

### Tradition options

- Christianity
- Islam
- Judaism

(Order in the live UI: Christianity, Islam, Judaism -- alphabetical but with Christianity first due to denomination sub-selection complexity)

### Reference field label

Reference

### Reference field placeholder (by tradition)

- Judaism: e.g. Genesis 1:1
- Christianity: e.g. john 3:16
- Islam (Quran): e.g. 2:255

### Submit button

Look up passage

### Loading state

Fetching...

---

## CrossTraditionCompare page copy

### Page heading

Cross-Tradition Compare

### Sub-heading / theme list label

Cross-Tradition Themes

### Panel heading

[Tradition name] (e.g., Judaism / Christianity / Islam)

### Bridging note label

Connection

### No theme selected

Select a theme above to compare parallel passages from Judaism, Christianity, and Islam.

### Theme count

[N] themes available

---

## ObservancesCalendar page copy

### Page heading

Observances Calendar

### Year selector label

Year: [YYYY]

### Tradition filter label

Traditions

### Tradition filter options

- Judaism
- Christianity
- Islam

(All three selected by default)

### Download button label

Download .ics

### Full-year download label

Download all [YYYY] observances (.ics)

### Loading state

Loading [tradition] holidays...

### No events for selection

No observances found for the selected traditions and year.

### Event card: ICS download link

Add to calendar

### Event detail: tradition badge

[Judaism / Christianity / Islam] color-coded badge

---

## TraditionBrowser page copy

### Main heading

Browse Traditions

### Denomination section heading (within Christianity)

Denominations

### Pew data section heading

US Population (Pew 2023)

### Interpretive traditions section heading

Interpretive Traditions

### Key passages section heading (within denomination view)

Key Passages

### Scope explainer heading (inline)

Why These Three Traditions?

---

## Loading states

- Loading passage...
- Fetching from [Provider]...
- Comparing traditions...
- Loading [tradition] holidays...
- Fetching [Tradition] passage...

---

## Tone guidelines

These rules apply to all copy written for or about the ARE interface:

1. **Neutral register:** describe, do not advocate. Never use language that implies one tradition is superior, earlier, more complete, or a fulfillment of another.
2. **Scholarly-librarian voice:** warm curiosity, not charismatic enthusiasm. Not dry either -- the goal is engaged, respectful, accessible.
3. **No em dashes:** use -- (double hyphen) in all copy. This matches the project-wide convention.
4. **No emojis:** in any ARE copy, UI, or documentation.
5. **US English throughout:** not British spelling (favour -> favor; colour -> color; programme -> program).
6. **Active voice preferred:** "Select a theme" not "A theme should be selected."
7. **Brevity:** every word must earn its space (ROY principle). Error messages should be short and actionable. Explainers should be as brief as possible while remaining accurate.
8. **Attribution always:** any scripture passage displayed must carry a translation name and provider.
9. **Pew citation is non-negotiable:** any demographic claim about US religious population must cite Pew Research Center Religious Landscape Study.

---

*ARE governance: AGENTS.md. Cross-reference: src/components/ModeNav.tsx, src/components/ScopeExplainer.tsx, src/data/traditions.ts.*
