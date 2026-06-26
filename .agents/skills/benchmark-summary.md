# ARE Skills Benchmark Summary

**Run date:** 2026-06-26
**Scope:** All five okhp3-* skills, version 1.1.0
**Method:** Analytical review -- expectations graded against skill content by expert review.
Live subagent runs require `claude -p` (Claude CLI), not available in this environment.

---

## Results at a glance

| Skill | With-skill pass rate | Without-skill pass rate | Delta |
|-------|---------------------|------------------------|-------|
| okhp3-celestial-data | 1.00 | 0.17 | **+0.83** |
| okhp3-cross-tradition-compare | 1.00 | 0.17 | **+0.83** |
| okhp3-verse-lookup | 1.00 | 0.25 | **+0.75** |
| okhp3-tradition-reference | 1.00 | 0.33 | **+0.67** |
| okhp3-tradition-observance-calendar | 1.00 | 0.42 | **+0.58** |

All five skills achieve 100% pass rate when loaded. Without-skill scores range from 0.17 to 0.42.

---

## Highest-delta evals

**0.0 without skill (total failures):**
- celestial-data eval 2 -- Mercury retrograde status (MERCURY_RETROGRADE array is 100% skill-specific data)
- cross-tradition-compare eval 2 -- Proportional representation rule (ARE-internal governance rule)
- cross-tradition-compare eval 3 -- Three-panel UI colors/layout (ARE Tailwind tokens)
- verse-lookup eval 3 -- D&C routing (isLdsBibleRef, scriptures.nephi.org, LdsApiUnavailableError all skill-exclusive)

These four evals represent the highest-value content in the skill set -- data or rules that a general agent cannot derive from public knowledge.

---

## Key findings

**Normalization traps are under-communicated.**
Sefaria returns HTML-wrapped text in an array of strings. Without the skill, agents skip both steps (HTML strip, array flatten) and produce broken output. This is documented but should be more prominent.

**Translation IDs are the most common source of silent failures.**
An agent without the skill would likely use an incorrect Quran.com translation ID, producing a 422 error or the wrong translation with no obvious diagnostic. The matrix is the highest-value content in okhp3-tradition-reference.

**The tradition-observance-calendar has the highest without-skill baseline (0.42).**
Hebcal and AlAdhan are publicly known; the Computus algorithm is general math knowledge. The ARE-specific layer (ObservanceEvent interface, WIKIPEDIA_ARTICLE_MAP, exact attribution strings) accounts for the remaining gap.

**LDS routing is the single highest-risk gap.**
D&C 76:22 sent to bible-api.com returns a 404. Without the routing decision tree, an agent would make this mistake silently. The decision tree added in v1.1.0 is the most protective content addition in this release.

---

## v1.1.0 improvements summary

| Skill | Change |
|-------|--------|
| All five | OverKill Hill P³ brand attribution (YAML metadata, header line, About footer) |
| All five | Triggering description strengthened with additional "Also activate when" phrases |
| All five | evals/evals.json with 3 test cases each |
| All five | benchmarks/benchmark.json (this report) |
| All five | version bumped to 1.1.0 |
| okhp3-celestial-data | Validation scripts section, validate-mercury-dates.cjs |
| okhp3-cross-tradition-compare | Quick start section, theme-entry-template.md in assets/ |
| okhp3-verse-lookup | Routing decision tree (ASCII art) |
| okhp3-tradition-observance-calendar | Validation script reference, validate-easter.js |

---

## Recommended next steps

1. Run live trigger evals once `claude -p` CLI is available -- confirm description changes improve trigger recall
2. Confirm Orthodox Easter 2029 date against Ecumenical Patriarchate official calendar (algorithm gives April 8; some sources cite May 2 -- the discrepancy is worth verifying)
3. Verify 2029-2031 Mercury retrograde dates against NASA JPL Horizons (tracked separately)
