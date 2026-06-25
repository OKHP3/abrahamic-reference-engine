---
title: Reserve 02 -- API Gap Register
type: reserve
status: active-reference
---

# Reserve 02 -- API Gap Register

A register of known API coverage gaps in the Abrahamic Reference Engine. Agents and contributors should consult this document before promising a translation or text is available via the free build.

Each gap entry describes what is missing, why, and what the current fallback or surface behavior should be.

---

## Gap 1 -- NABRE (New American Bible Revised Edition)

**Tradition/Denomination:** Catholic Christianity
**Missing:** Official US Catholic liturgical translation
**Why missing:** NABRE is licensed; requires an API.Bible key -- not available in the free anonymous build
**Current fallback:** `web` (World English Bible) -- includes deuterocanonicals but is not the liturgical standard
**UI behavior:** Translation picker shows NABRE with a "licensed -- not in free build" note
**Future path:** API.Bible integration with a user-provided key (deferred)

---

## Gap 2 -- NRSV (New Revised Standard Version)

**Tradition/Denomination:** Mainline Protestant, Catholic (academic), Orthodox
**Missing:** Standard translation in mainline and academic Protestant settings; inclusive language
**Why missing:** NRSV is licensed (National Council of Churches); requires API.Bible key
**Current fallback:** `kjv`, `web`, or `asv`
**UI behavior:** Translation picker shows NRSV with a "licensed -- not in free build" note
**Future path:** API.Bible integration with a user-provided key (deferred)

---

## Gap 3 -- ESV (English Standard Version)

**Tradition/Denomination:** Evangelical Protestant
**Missing:** The most popular modern evangelical translation
**Why missing:** ESV is licensed (Crossway); requires ESV API key from api.esv.org
**Current fallback:** `kjv`, `web`, `asv`
**UI behavior:** Translation picker shows ESV with a "licensed -- not in free build" note
**Future path:** ESV API integration with a user-provided key (deferred)

---

## Gap 4 -- NIV (New International Version)

**Tradition/Denomination:** Evangelical Protestant, Non-denominational
**Missing:** Widely used dynamic-equivalence translation (1978/2011)
**Why missing:** NIV is licensed (Biblica); requires API.Bible key
**Current fallback:** `kjv`, `web`, `bbe`
**UI behavior:** Translation picker shows NIV with a "licensed -- not in free build" note
**Future path:** API.Bible integration with a user-provided key (deferred)

---

## Gap 5 -- Orthodox OT (3 Maccabees, Psalm 151, 4 Maccabees)

**Tradition/Denomination:** Orthodox Christian
**Missing:** Full Orthodox OT beyond the seven Catholic deuterocanonicals
**Why missing:** No free public unauthenticated API covers 3 Maccabees, Psalm 151, or 4 Maccabees
**Current fallback:** `web` covers the 7 Catholic deuterocanonicals but not the Orthodox-specific additions
**UI behavior:** Surface a note when Orthodox-specific texts are requested: "This text is part of the Orthodox OT canon but is not available via a free public API. The World English Bible (web) includes the Catholic deuterocanonicals but not all Orthodox additions."
**Future path:** No clear free API path identified; may require a static text dataset

---

## Gap 6 -- LDS Standard Works (non-Bible volumes)

**Tradition/Denomination:** LDS / Restorationist
**Missing:** Book of Mormon, Doctrine and Covenants, Pearl of Great Price
**Why missing:** No guaranteed free public API; scriptures.nephi.org is a community API with no uptime SLA
**Current fallback:** scriptures.nephi.org with a graceful failure message; official LDS site link
**UI behavior:** On failure: "The LDS Standard Works (Book of Mormon, D&C, Pearl of Great Price) are not available via a guaranteed free API at this time. Visit https://www.churchofjesuschrist.org/study/scriptures to look up this passage."
**Future path:** Static dataset of key passages as a pre-seeded fallback (partially done in compareThemes.ts)

---

## Gap 7 -- Hadith search / index

**Tradition/Denomination:** Islam
**Missing:** Searchable hadith lookup by topic or keyword
**Why missing:** fawazahmed0/hadith-api supports volume/book/hadith number lookup but not keyword search
**Current fallback:** No hadith search in current build; individual hadiths accessible by known reference
**Future path:** Build a static topic-indexed subset of common hadiths (deferred)

---

*Source: reconstructed from GPT origin bundle (2026-06-14/15). ARE governance: AGENTS.md.*
