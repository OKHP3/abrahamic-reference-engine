---
title: Reserve 03 -- UI Copy Reference
type: reserve
status: active-reference
---

# Reserve 03 -- UI Copy Reference

Reference copy for recurring text patterns in the Abrahamic Reference Engine UI. Use these verbatim or adapt minimally. All copy must conform to the ARE tone (solemn, scholarly, neutral -- librarian/archivist register, not charismatic or devotional) and to the language standard (US English, no em dashes, no emojis).

**Verification source:** strings in this file are taken verbatim from the live SPA source as of 2026-06-26. Before shipping any copy change, verify against the components cited in each section.

---

## App identity

**Full name:** Abrahamic Reference Engine
**Short name:** ARE
**Suite:** OverKill Hill P3 / FoundRy
**Tagline (if needed):** A scripture reference engine for the three major Abrahamic traditions.

---

## Scope explainer (ScopeExplainer component)

Source: `src/components/ScopeExplainer.tsx`, driven by `PEW_SCOPE_NOTE` in `src/data/traditions.ts`.

### Heading (live)

Why These Three Traditions?

### Body note (live)

This application includes only traditions that meet **both** of the following criteria:

1. Abrahamic lineage -- traceable descent from the Abrahamic scriptural family
2. 1% or greater US population per the Pew Research Center Religious Landscape Study

### Out-of-scope note (live)

Traditions reviewed but excluded from scope: [list rendered from PEW_SCOPE_NOTE.excluded]

### Pew citation (live)

Source: Pew Research Center Religious Landscape Study, [year]
URL: https://www.pewresearch.org/religion/religious-landscape-study/

---

## Navigation labels (ModeNav component)

Source: `src/components/ModeNav.tsx` -- MODES array.

| Label | Route | Description (aria-label) |
|-------|-------|--------------------------|
| Browse | /browse | Explore traditions |
| Lookup | /lookup | Find a passage |
| Compare | /compare | Side-by-side themes |
| Observances | /observances | Religious holiday calendar |

These are single-word tab bar labels. Do not use verbose forms ("Browse Traditions", "Look Up a Verse") in the tab bar -- those are page headings only.

---

## TraditionBrowser page copy

Source: `src/pages/TraditionBrowser.tsx`

### Page heading (live)

Browse Traditions

### Page description (live)

Three Abrahamic traditions with meaningful presence in the United States. Each is presented with equal respect -- the proportions below reflect Pew Research data, not a ranking of worth.

### Denomination detail back-link (live)

Return to Browse

(Rendered as a `<Link to="/browse">` inside the denomination detail view.)

---

## VerseLookup page copy

Source: `src/pages/VerseLookup.tsx`

### Page heading (live)

Verse Lookup

### Page description (live)

Retrieve a specific passage from any of the three in-scope Abrahamic traditions.

### Submit button (live)

Look up passage

### Loading state (live)

Fetching...

### Loading spinner label (live)

Fetching passage from API...

### LDS non-Bible fallback (live)

LDS Standard Works (Book of Mormon, D&C, Pearl of Great Price) are available via a community-maintained API (scriptures.nephi.org) with no uptime guarantee.
[Link] Look up on ChurchOfJesusChrist.org

### Orthodox OT gap (live -- displayed for 3 Maccabees, Psalm 151, 4 Maccabees)

[Book name] -- [Book description]. [Link to BibleGateway]

---

## CrossTraditionCompare page copy

Source: `src/pages/CrossTraditionCompare.tsx`

### Page heading (live)

Cross-Tradition Compare

### Page description (live)

The signature feature. Select a theme and see parallel passages from Judaism, Christianity, and Islam side by side -- with neutral bridging notes that invite discovery rather than declare a winner.

### Theme list label (live)

Themes ({N})

Where N = the current count of COMPARE_THEMES (currently 20). Format: "Themes (20)".

### Theme count note (live)

All {N} themes have entries for all three traditions

### Bridging note section heading (live)

What Connects These?

### Bridging note disclaimer (live, beneath the bridging note text)

This note draws out the structural or thematic parallel. It does not rank traditions, endorse any interpretation, or suggest one text is derived from another.

### Footer back-link (live)

&larr; Verse Lookup  (links to /lookup)

### Footer forward-link (live)

Browse traditions &rarr;  (links to /browse)

### Note: no-theme-selected state

The current UI always shows the first theme by default. There is no empty/no-selection state rendered to the user in the current implementation.

---

## ObservancesCalendar page copy

Source: `src/pages/ObservancesCalendar.tsx`, `src/components/ObservanceControls.tsx`

### Page heading (live -- in ObservanceControls)

Observances

### Year selector label (live)

Year: [YYYY]  (rendered as a `<select>` in the controls bar)

### Loading state (live)

Loading {tradition} holidays...

---

## Error states

### API unavailable -- generic

Unable to retrieve this passage. The external API may be temporarily unavailable. Please try again in a moment.

### Reference not found

No passage found for this reference. Check that the reference format is correct and try again.

### Licensed translation note

This translation requires an API key and is not available in this free build. Passages are shown using [fallback translation name] instead.

### Orthodox OT gap note

This text is part of the Orthodox OT canon but is not available via a free public API. The World English Bible (WEB) includes the Catholic deuterocanonicals but does not cover all Orthodox additions (3 Maccabees, Psalm 151, 4 Maccabees).

### Douay-Rheims gap note

The Douay-Rheims translation is not reliably available via the free API. Showing the World English Bible instead.

### Pickthall gap note

The Pickthall translation is not available from the primary provider for this verse. Attempting fallback provider.

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

### Pre-seeded text fallback (compare panels)

Showing pre-seeded text (live fetch failed):

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

## TraditionBadge display labels (live)

Source: `src/components/TraditionBadge.tsx` or `src/data/traditions.ts`

| Family key | Display label |
|-----------|---------------|
| judaism | Judaism |
| christianity | Christianity |
| islam | Islam |

---

## Loading spinner label patterns

Source: across components

- `Fetching {tradition} passage...` (compare panels, per tradition)
- `Fetching passage from API...` (VerseLookup main spinner)
- `Loading {tradition} holidays...` (ObservancesCalendar)

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

*ARE governance: AGENTS.md. Cross-reference: src/components/ModeNav.tsx, src/components/ScopeExplainer.tsx, src/pages/VerseLookup.tsx, src/pages/CrossTraditionCompare.tsx, src/pages/TraditionBrowser.tsx, src/components/ObservanceControls.tsx.*
