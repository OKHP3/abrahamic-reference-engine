# ARE Paraphrase and Context Boundary Decision

**Decision date:** 2026-08-27  
**Scope:** Public static prototype  
**Related backlog item:** M5 in `are-mitigation-backlog.md`

## Decision

Retire the original promises of fuzzy/paraphrase discovery and selectable
`none`, `brief`, or `scholarly` context modes from the current public product.

The prototype supports exact-reference passage lookup only. It does not infer a
reference from a user's wording, produce a list of possible passages, or
generate context commentary. A failed lookup must remain a failed lookup rather
than becoming an unsupported guess.

The Cross-Tradition Compare route is a separate, fixed dataset of pre-seeded
themes. Links from lookup to that route are deterministic theme links based on
the local reference map, not paraphrase candidates or semantic search results.
Quoted passage text is identified by its translation and source link. The
bridging note is explicitly labeled as ARE editorial commentary and is not
source text.

## Rationale

The application is a static SPA with source adapters and curated comparison
data, but no retrieval index, paraphrase model, ambiguity-ranking evidence, or
commentary corpus with a documented authority and citation method. Publicly
claiming those features would invite users to treat an inferred religious
interpretation as a sourced result.

Retiring the claims keeps the public surface aligned with observable behavior
while preserving a possible future feature boundary. Any later implementation
must be a new product decision, not an implied extension of exact lookup.

## Acceptance boundary

- `LOOKUP_CAPABILITIES.exactReferenceLookup` is true.
- `LOOKUP_CAPABILITIES.paraphraseSearch` is false.
- `LOOKUP_CAPABILITIES.contextModes` is false.
- `LOOKUP_CAPABILITIES.seededThemeComparisons` is true.
- Lookup copy states exact-reference-only behavior and names the unavailable
  discovery and context modes.
- Theme-parallel copy states that links are fixed/pre-seeded and not
  paraphrase matches or generated commentary.
- Compare copy distinguishes quoted source text from ARE editorial commentary.
- Deterministic acceptance tests fail if these boundary statements or
  capability flags drift.

## Bounded phrase-discovery reconsideration

On 2026-09-01, the deferred discovery question was revisited with a narrower
contract. The public prototype now offers phrase discovery only over the
checked-in `staticText` quotations in `COMPARE_THEMES`. The corpus is
inspectable in the repository, excludes entries with editorial ellipsis
truncation, and is limited to the three in-scope traditions and their declared
source translations; it is not a claim of full-canon or provider-wide coverage.

Matching is deterministic: Unicode NFKC normalization, case folding,
whitespace collapsing, literal contiguous phrase matching, and
letter/number-boundary checks. There is no paraphrase, fuzzy matching,
stemming, semantic ranking, or generated interpretation. Every result retains
the quotation separately from the exact reference, translation, and source
link.

The result contract exposes `no-match`, `one-match`, and
`multiple-candidates` states, plus an explicit ambiguity value. A no-match is
not converted into a guess; multiple candidates are not ranked or summarized.
The UI asks the reader to choose an exact reference before live lookup.
Deterministic API-contract tests cover all three result states and assert that
source quotations do not carry editorial bridging notes.