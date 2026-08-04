---
name: okhp3-tradition-reference
description: Returns authoritative metadata about any supported tradition — canon scope and book count, available translations, US demographic share from Pew Research Center, and the API provider routing table used by the engine.
license: MIT
metadata:
  author: Jamie Hill (OverKill Hill P³)
  version: "—"
  category: reference-data
  origin: okhp3/skillz
  homepage: https://overkillhill.com
  author-github: https://github.com/OKHP3
  in_scope: "Canon scope, translation matrix, Pew demographic data, API endpoint routing for all supported denominations."
  out_of_scope: "Devotional content, clergy contact information, community directories, or non-Abrahamic traditions."
---

# okhp3-tradition-reference

**OverKill Hill P³** · [overkillhill.com](https://overkillhill.com) · [github.com/OKHP3](https://github.com/OKHP3)

Return authoritative metadata about any tradition supported by the Abrahamic Reference Engine.

## Trigger

Use this skill when a request asks about a tradition's canon, available translations, US demographic share, or API routing — or when another skill needs to validate that a book or denomination is in scope before making a fetch.

## Supported traditions

| Tradition | Major denominations |
|-----------|-------------------|
| Judaism | Orthodox, Conservative, Reform, Reconstructionist |
| Christianity | Catholic, Protestant (many), Eastern Orthodox, Oriental Orthodox |
| Islam | Sunni, Shia, Sufi (observance data) |

## Metadata fields

**Canon scope** — which books are included, deuterocanonical or apocryphal status, total book count by denomination.

**Translation matrix** — available translation identifiers per tradition and the provider that serves each one.

**Pew demographic data** — US religious population share sourced from the most recent Pew Research Center survey available in training data. Mark the survey year and note that figures shift between surveys.

**API provider routing** — the endpoint, base URL, and any rate-limit notes for each tradition's primary and fallback providers (see also `okhp3-verse-lookup`).

## Output contract

Return the requested metadata field(s) for the named tradition or denomination. Cite the source for demographic figures. Flag any data that is inferred or estimated rather than sourced.

## Scope

**In scope:** Canon scope, translation matrix, Pew demographic data, API endpoint routing for all supported denominations.

**Out of scope:** Devotional content, clergy contact information, community directories, or non-Abrahamic traditions.

## About

Built by [Jamie Hill](https://overkillhill.com) · [OverKill Hill P³](https://overkillhill.com)
Published at [github.com/OKHP3](https://github.com/OKHP3)
Part of the [OKHP3/skillz](https://github.com/OKHP3/skillz) Agent Skill library.
MIT License — free to use, fork, and adapt. A nod to the source is appreciated.
