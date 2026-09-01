---
name: Phrase discovery boundary
description: Evidence and provenance rules for bounded scripture phrase search.
---

Phrase discovery is limited to inspectable, checked-in source quotations with
editorial ellipsis truncations excluded. Matching is literal and contiguous
after Unicode normalization, case folding, whitespace collapsing, and
letter/number-boundary checks; it must not become paraphrase or semantic search.

**Why:** An inferred religious interpretation can look sourced when a reader
cannot inspect the corpus, matching rule, quotation, and exact reference.

**How to apply:** Keep no-match, one-match, and multiple-candidate states
explicit. Return each quotation separately from its reference, translation, and
source link, and never include editorial theme explanations in a candidate.