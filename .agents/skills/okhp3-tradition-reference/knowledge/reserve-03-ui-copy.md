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

### Heading

Why these three traditions?

### Body

The Abrahamic Reference Engine covers Judaism, Christianity, and Islam -- the three Abrahamic traditions with 1% or greater US population per the Pew Research Center Religious Landscape Study.

Both criteria must be met for inclusion: Abrahamic lineage, and 1% or greater US population. Exclusion is a methodological boundary, not a judgment of worth.

### Demographics table caption

US Religious Demographics -- Pew Research Center, 2023

### Pew citation text

Source: Pew Research Center Religious Landscape Study
URL: https://www.pewresearch.org/religion/religious-landscape-study/

### Out-of-scope note

Other traditions -- including Hinduism, Buddhism, Baha'i, and Sikhism -- are not in scope for this tool. Exclusion reflects data-driven methodological criteria, not relative worth or cultural significance.

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

## Cross-tradition compare copy

### Panel heading

[Tradition name]

### Bridging note label

Connection

### No theme selected

Select a theme above to compare parallel passages from Judaism, Christianity, and Islam.

### Theme count

[N] themes available

---

## Navigation labels

- Browse Traditions
- Look Up a Verse
- Compare Traditions

---

## Loading states

- Loading passage...
- Fetching from [Provider]...
- Comparing traditions...

---

*Source: reconstructed from GPT origin bundle (2026-06-14/15). ARE governance: AGENTS.md.*
