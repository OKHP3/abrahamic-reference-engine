---
name: okhp3-verse-lookup
description: Retrieves a specific scripture reference by book, chapter, and verse from Sefaria (Jewish texts), bible-api.com (Christian canon), or Quran.com (Islamic texts). Handles translation selection, canonical addressing, and provider fallback.
license: MIT
metadata:
  author: Jamie Hill (OverKill Hill P³)
  version: "—"
  category: scripture-retrieval
  origin: okhp3/skillz
  homepage: https://overkillhill.com
  author-github: https://github.com/OKHP3
  in_scope: "Precise chapter/verse retrieval across Judaism, Christianity, and Islam; translation selection; provider fallback routing."
  out_of_scope: "Full-text search, commentary, devotional guidance, or denomination-specific variant selection."
---

# okhp3-verse-lookup

**OverKill Hill P³** · [overkillhill.com](https://overkillhill.com) · [github.com/OKHP3](https://github.com/OKHP3)

Fetch a specific scripture reference by book, chapter, and verse across any of the three Abrahamic traditions.

## Trigger

Use this skill when a request asks for a specific scripture passage — "Genesis 1:1", "Surah 2:255", "Matthew 5:3–12" — or when a verse address needs to be resolved to text through an external provider.

## Provider routing

| Tradition | Primary provider | Fallback |
|-----------|-----------------|---------|
| Jewish texts | Sefaria API (`https://www.sefaria.org/api/texts/{ref}`) | None |
| Christian canon | bible-api.com (`https://bible-api.com/{ref}`) | AlQuran.cloud (for cross-checks) |
| Islamic texts | Quran.com API | AlQuran.cloud (`https://api.alquran.cloud/v1/ayah/{surah}:{ayah}`) |

## Address formats

- **Hebrew Bible / OT**: Standard book abbreviation + chapter:verse — `Gen 1:1`, `Psalm 23:1`
- **New Testament / Deuterocanon**: Same format — `Matt 5:3`, `1 Macc 2:1`
- **Quran**: Surah number:Ayah number — `2:255`, `Surah Al-Baqarah 255`
- **Ranges**: `Gen 1:1-3`, `Matt 5:3-12`

## Translation selection

Pass an explicit translation identifier when the caller requests one. When unspecified, use the provider default. Available translations per tradition are documented in `okhp3-tradition-reference`.

## Output contract

Return the resolved text, the canonical address used, the provider that served it, and the translation name. If a provider is unavailable, attempt the fallback and note which provider responded. If no provider responds, return the address, the failure reason, and the fallback attempted.

## Scope

**In scope:** Precise chapter/verse retrieval across Judaism, Christianity, and Islam; translation selection; provider fallback routing.

**Out of scope:** Full-text search, commentary, devotional guidance, or denomination-specific variant selection.

## About

Built by [Jamie Hill](https://overkillhill.com) · [OverKill Hill P³](https://overkillhill.com)
Published at [github.com/OKHP3](https://github.com/OKHP3)
Part of the [OKHP3/skillz](https://github.com/OKHP3/skillz) Agent Skill library.
MIT License — free to use, fork, and adapt. A nod to the source is appreciated.
