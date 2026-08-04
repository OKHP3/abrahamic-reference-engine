---
name: okhp3-cross-tradition-compare
description: Finds parallel passages across two or three Abrahamic traditions on a shared theological theme and aligns them side-by-side for academic comparison without imposing interpretation.
license: MIT
metadata:
  author: Jamie Hill (OverKill Hill P³)
  version: "—"
  category: comparative-theology
  origin: okhp3/skillz
  homepage: https://overkillhill.com
  author-github: https://github.com/OKHP3
  in_scope: "Thematic parallel identification; side-by-side text alignment across Judaism, Christianity, and Islam."
  out_of_scope: "Theological interpretation, devotional guidance, sectarian commentary, or non-Abrahamic traditions."
---

# okhp3-cross-tradition-compare

**OverKill Hill P³** · [overkillhill.com](https://overkillhill.com) · [github.com/OKHP3](https://github.com/OKHP3)

Find parallel passages across two or three Abrahamic traditions on a shared theological theme and present them side-by-side without imposing interpretation.

## Trigger

Use this skill when a request asks to compare how two or more Abrahamic traditions address a shared theme — creation, covenant, prayer, afterlife, law, redemption — or when parallel verses from different canons are requested together.

## Supported themes (examples)

- Creation narratives (Genesis 1, Quran 2:117, various)
- Covenant and promise
- Prayer and worship
- Afterlife and resurrection
- Law, commandment, and obligation
- Prophetic tradition and lineage

This list is illustrative, not exhaustive. Apply the skill to any theme resolvable to specific scripture references across traditions.

## Workflow

1. Identify the theme and the requested tradition pair or triple (Judaism, Christianity, Islam).
2. Select the most directly parallel passages — typically 1–3 per tradition per theme.
3. Retrieve text via `okhp3-verse-lookup` for each reference.
4. Align the passages in a side-by-side table or structured block.
5. Note the canonical source, book, and verse for each passage.
6. Do not add interpretive commentary unless the caller explicitly requests a neutral scholarly gloss.

## Output contract

Return a side-by-side alignment of passages with their canonical addresses and tradition labels. If a passage cannot be retrieved, note the address and failure reason. Do not synthesize meaning or imply theological equivalence beyond what the texts themselves state.

## Scope

**In scope:** Thematic parallel identification; side-by-side text alignment across Judaism, Christianity, and Islam.

**Out of scope:** Theological interpretation, devotional guidance, sectarian commentary, or non-Abrahamic traditions.

## About

Built by [Jamie Hill](https://overkillhill.com) · [OverKill Hill P³](https://overkillhill.com)
Published at [github.com/OKHP3](https://github.com/OKHP3)
Part of the [OKHP3/skillz](https://github.com/OKHP3/skillz) Agent Skill library.
MIT License — free to use, fork, and adapt. A nod to the source is appreciated.
