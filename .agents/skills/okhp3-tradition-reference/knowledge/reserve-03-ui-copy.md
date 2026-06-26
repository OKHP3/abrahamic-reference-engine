---
title: Reserve 03 -- UI Copy Reference
type: reserve
status: active-reference
---

# Reserve 03 -- UI Copy Reference

Reference copy for recurring text patterns in the Abrahamic Reference Engine UI. Static strings are taken verbatim from the live SPA source (verified 2026-06-26). Dynamic strings are marked with [dynamic] and the template is given. Section headers cite the source component for future verification.

---

## App identity

**Full name:** Abrahamic Reference Engine
**Short name:** ARE
**Suite:** OverKill Hill P3 / FoundRy
**Tagline (if needed):** A scripture reference engine for the three major Abrahamic traditions.

---

## Scope explainer (ScopeExplainer component)

Source: `src/components/ScopeExplainer.tsx` + `src/data/traditions.ts` (`PEW_SCOPE_NOTE`)

### Heading (live -- h2, uppercase tracking-widest)

Why These Three Traditions?

### Body intro (live)

This application includes only traditions that meet **both** of the following criteria:

### Qualifying criteria list (live -- from PEW_SCOPE_NOTE.qualifyingCriteria)

1. Traceable Abrahamic lineage (descended from the faith of Abraham)
2. 1% or more of the US population (Pew Research Center Religious Landscape Study)

### Out-of-scope note heading (live)

Traditions reviewed but excluded from scope:

### Excluded traditions (live -- from PEW_SCOPE_NOTE.excluded)

| Name | Reason |
|------|--------|
| Hinduism | Not Abrahamic |
| Buddhism | Not Abrahamic |
| Baha'i | Abrahamic, but below 1% US threshold |
| Sikhism | Not Abrahamic |
| Druze | Abrahamic, but below 1% US threshold |

### Note (live -- italic, from PEW_SCOPE_NOTE.note)

Exclusions are methodological, not judgments of worth. Every tradition listed here is presented with equal respect.

### Citation link (live -- from PEW_2023 in traditions.ts)

Source: Pew Research Center, Religious Landscape Study, 2023 (rendered as link: https://www.pewresearch.org/religion/religious-landscape-study/)

---

## Navigation labels (ModeNav component)

Source: `src/components/ModeNav.tsx` -- MODES array

| Label | Route | Description (aria-label) |
|-------|-------|--------------------------|
| Browse | /browse | Explore traditions |
| Lookup | /lookup | Find a passage |
| Compare | /compare | Side-by-side themes |
| Observances | /observances | Religious holiday calendar |

These are single-word tab labels. Do not use verbose forms in the tab bar; those appear only in page h1 headings.

---

## TraditionBrowser page copy

Source: `src/pages/TraditionBrowser.tsx`

### Page heading (live -- h1)

Browse Traditions

### Page description (live)

Three Abrahamic traditions with meaningful presence in the United States. Each is presented with equal respect -- the proportions below reflect Pew Research data, not a ranking of worth.

### Denomination detail back-link (live -- Link to="/browse")

Return to Browse

---

## VerseLookup page copy

Source: `src/pages/VerseLookup.tsx`

### Page heading (live -- h1)

Verse Lookup

### Page description (live)

Retrieve a specific passage from any of the three in-scope Abrahamic traditions.

### Submit button (live -- conditional on loading state)

- Default: `Look up passage`
- Loading: `Fetching...`

### Loading spinner label (live)

Fetching passage from API...

### LDS fallback error section heading (live -- h3, uppercase tracking-widest)

LDS Standard Works

### LDS fallback error body (live -- verbatim)

The Book of Mormon, Doctrine & Covenants, and Pearl of Great Price are served via a community-maintained API (scriptures.nephi.org) with no uptime guarantee. It appears to be unreachable right now.

### LDS fallback link (live)

Look up on ChurchOfJesusChrist.org →
(href: https://www.churchofjesuschrist.org/study/scriptures)

### Orthodox canon gap section heading (live -- h3, uppercase tracking-widest)

Orthodox Canon -- Coverage Gap

### Orthodox canon gap body (live -- partially dynamic)

[dynamic: canonGapBook.name] -- rendered as a serif heading
[dynamic: canonGapBook.description] -- the book-specific explanation (see ORTHODOX_GAP_BOOKS in VerseLookup.tsx)
This text is part of the Orthodox canon but is not yet available through the connected API (bible-api.com WEB). Coverage may be added in a future update.

### Orthodox canon gap link (live -- dynamic)

Read [canonGapBook.name] on BibleGateway →
(href: canonGapBook.searchUrl -- links to BibleGateway NRSV/NRSVA)

### LDS Standard Works denomination helper text (live -- displayed in LDS denomination selection)

LDS Standard Works (Book of Mormon, D&C, Pearl of Great Price) via scriptures.nephi.org.

### LDS reference format hint (live -- below reference input when LDS selected)

Bible: book chapter:verse (e.g. james 1:5) -- Standard Works: e.g. 2 Ne. 2:25, D&C 76:22, Moses 1:39

---

## CrossTraditionCompare page copy

Source: `src/pages/CrossTraditionCompare.tsx`

### Page heading (live -- h1)

Cross-Tradition Compare

### Page description (live)

The signature feature. Select a theme and see parallel passages from Judaism, Christianity, and Islam side by side -- with neutral bridging notes that invite discovery rather than declare a winner.

### Theme list section heading (live -- h2, uppercase tracking-widest, dynamic count)

Themes ({N})

Where N = COMPARE_THEMES.length (currently 20). Rendered as e.g. "Themes (20)".

### Theme count note (live -- right-aligned span)

All {N} themes have entries for all three traditions

### Pre-seeded fallback note (live -- shown when live fetch fails)

Showing pre-seeded text (live fetch failed):

### Bridging note section heading (live -- h3, uppercase tracking-widest)

What Connects These?

### Bridging note disclaimer (live -- italic, below the bridging note text)

This note draws out the structural or thematic parallel. It does not rank traditions, endorse any interpretation, or suggest one text is derived from another.

### Footer back-link (live)

&larr; Verse Lookup  (links to /lookup)

### Footer forward-link (live)

Browse traditions &rarr;  (links to /browse)

### Note: default selection

The current UI always loads the first COMPARE_THEME as the default. There is no user-visible "no theme selected" empty state.

---

## ObservancesCalendar page copy

Source: `src/components/ObservanceControls.tsx`

### Page heading (live -- h1, semibold, text-gold)

Observances

### Page subtitle (live)

Religious holidays for Judaism, Christianity, and Islam

### Year stepper (live -- prev/next button pair with centered year display)

The year control is a prev/next stepper, not a select element.
- Previous year button: aria-label "Previous year"; renders ‹ (&#8249;)
- Year display: centered span with the current year as a number
- Next year button: aria-label "Next year"; renders › (&#8250;)

### Download button label (live -- hidden on small screens)

Download .ics

### Download button title (live -- tooltip, dynamic)

Download all {N} events as .ics

### Tradition filter buttons (live -- toggle buttons, alphabetical order)

Christianity / Islam / Judaism

### Christianity denomination sub-filter label (live -- uppercase tracking-widest)

Denomination

### Christianity denomination sub-filter options (live)

All / Catholic / Protestant / LDS / Orthodox

---

## Attribution patterns

### Sefaria (live)

[passage text]
-- [Book] [Chapter]:[Verse] -- Sefaria English, sefaria.org (CC BY-SA 2.0)

### Bible (public domain, live)

[passage text]
-- [Book] [Chapter]:[Verse] -- [Translation Name]. Public domain.

### Bible (licensed, not displayed, live)

[licensed translation name] is not available in this free build.

### Quran.com (live)

[passage text]
-- Al-[Surah name] [Surah]:[Ayah] -- [Translation name], served via Quran.com

### Hadith (fawazahmed0, live)

[hadith text]
-- [Collection name], Book [N], Hadith [N] -- fawazahmed0/hadith-api (CC BY-4.0)

### Pre-seeded text (compare panels, live)

Shown with label: "Showing pre-seeded text (live fetch failed):"
Attribution appended to passage: "[Translation name] -- pre-seeded"

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

---

## TraditionBadge display labels (live)

| Family key | Display label |
|-----------|---------------|
| judaism | Judaism |
| christianity | Christianity |
| islam | Islam |

---

## Tone guidelines

These rules apply to all copy written for or about the ARE interface:

1. **Neutral register:** describe, do not advocate. Never use language that implies one tradition is superior, earlier, more complete, or a fulfillment of another.
2. **Scholarly-librarian voice:** warm curiosity, not charismatic enthusiasm. Not dry either -- engaged, respectful, accessible.
3. **No em dashes:** use -- (double hyphen) in all copy. This matches the project-wide convention.
4. **No emojis:** in any ARE copy, UI, or documentation.
5. **US English throughout:** not British spelling.
6. **Active voice preferred:** "Select a theme" not "A theme should be selected."
7. **Brevity (ROY principle):** every word must earn its space. Error messages should be short and actionable.
8. **Attribution always:** any scripture passage displayed must carry a translation name and provider.
9. **Pew citation is non-negotiable:** any demographic claim about US religious population must cite Pew Research Center Religious Landscape Study.

---

*ARE governance: AGENTS.md. Cross-reference: `src/components/ModeNav.tsx`, `src/components/ScopeExplainer.tsx`, `src/data/traditions.ts` (PEW_SCOPE_NOTE), `src/pages/VerseLookup.tsx`, `src/pages/CrossTraditionCompare.tsx`, `src/pages/TraditionBrowser.tsx`, `src/components/ObservanceControls.tsx`.*
