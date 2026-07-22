# ARE Skills Benchmark Summary

**Suite:** OverKill Hill P3 / FoundRy
**Date:** 2026-06-26 baseline
**Skills evaluated:** 6 (historical v1.1.0 baseline, plus okhp3-skill-foundry v1.0.0)
**Not benchmarked:** okhp3-skill-cataloger (now has deterministic conformance checks; add live trigger and execution evals before claiming a benchmark score)
**Method:** ALL 36 runs (3 evals x 2 configs x 6 benchmarked skills) via live delegation subagent executor + main-agent grader.
**No analytical stubs remain.**

This file records historical evidence for the prior skill versions. The
2026-07-21 v1.2.0/v1.5.0 edits in the skill directories require a fresh live
rerun before their benchmark scores are treated as current.

---

## Grand Summary (All 3 Evals, All 5 Skills, Fully Live)

| Skill | with_skill | without_skill | Delta |
|-------|-----------|--------------|-------|
| okhp3-celestial-data | 1.00 | 0.25 | +0.75 |
| okhp3-cross-tradition-compare | 1.00 | 0.33 | +0.67 |
| okhp3-tradition-observance-calendar | 0.92 | 0.25 | +0.67 |
| okhp3-tradition-reference | 1.00 | 0.33 | +0.67 |
| okhp3-verse-lookup | 0.92 | 0.33 | +0.58 |
| okhp3-skill-foundry | 1.00 | 0.42 | +0.58 |
| **GRAND AVERAGE (6 benchmarked skills)** | **0.97** | **0.32** | **+0.65** |

---

## Per-Skill Per-Eval Results

### okhp3-celestial-data

| Eval | Prompt | with_skill | without_skill |
|------|--------|-----------|--------------|
| 1 | Moon phase TypeScript widget | 4/4 | 2/4 |
| 2 | Mercury retrograde (wellness tracker) | 4/4 | 0/4 |
| 3 | Astrological season (meditation app) | 4/4 | 1/4 |
| **mean** | | **1.00** | **0.25** |

### okhp3-cross-tradition-compare

| Eval | Prompt | with_skill | without_skill |
|------|--------|-----------|--------------|
| 1 | Forgiveness theme (interfaith education site) | 4/4 | 3/4 |
| 2 | Proportional representation rule | 4/4 | 0/4 |
| 3 | Three-panel UI -- colors and layout | 4/4 | 1/4 |
| **mean** | | **1.00** | **0.33** |

### okhp3-tradition-observance-calendar

| Eval | Prompt | with_skill | without_skill |
|------|--------|-----------|--------------|
| 1 | Multi-tradition holiday calendar 2026 | 3/4 | 0/4 |
| 2 | Western and Orthodox Easter 2027 | 4/4 | 2/4 |
| 3 | Wikipedia holiday description + attribution | 4/4 | 1/4 |
| **mean** | | **0.92** | **0.25** |

### okhp3-tradition-reference

| Eval | Prompt | with_skill | without_skill |
|------|--------|-----------|--------------|
| 1 | Quran.com API + Sahih International ID | 4/4 | 2/4 |
| 2 | LDS Standard Works and routing | 4/4 | 1/4 |
| 3 | Orthodox canon and API gap | 4/4 | 1/4 |
| **mean** | | **1.00** | **0.33** |

### okhp3-verse-lookup

| Eval | Prompt | with_skill | without_skill |
|------|--------|-----------|--------------|
| 1 | Sefaria fetch -- Psalms 23:1 | 4/4 | 2/4 |
| 2 | bible-api.com WEB -- John 3:16 | 3/4 | 1/4 |
| 3 | LDS D&C routing -- D&C 76:22 | 4/4 | 1/4 |
| **mean** | | **0.92** | **0.33** |

---

## Key Findings

### Finding 1 -- cross-tradition-compare without_skill eval 1 scored 0.75 (not 0.0)

LLM has good general interfaith sensitivity -- neutral bridging note produced without the style guide.
Real differentiator is the PRE-SEEDED passage IDs (Psalm 103:12, Matthew 6:14-15, Az-Zumar 39:53).
Without the skill, agents pick valid but different passages -- inconsistency with compareThemes.ts.

### Finding 2 -- tradition-observance-calendar with_skill eval 1 scored 0.75 (Promise.allSettled gap)

Executor read the skill but still used Promise.all instead of Promise.allSettled.
Runtime failure mode: a single AlAdhan month failure discards all 11 other successful months.
Action taken: WARNING box added to skill body. Fix is live.

### Finding 3 -- translation ID 20 is genuine LLM training knowledge

Without-skill correctly identified Sahih International = ID 20.
Translation matrix's real value is for less-common IDs (Yusuf Ali, Pickthall) and enforcing primary/fallback ordering.

### Finding 4 -- attribution is a consistent LLM blind spot

verse-lookup without-skill (eval 1) omitted CC BY-SA 2.0 attribution entirely.
tradition-observance-calendar without-skill (eval 3) used "From Wikipedia, the free encyclopedia" not the exact ARE string "Description via Wikipedia (CC BY-SA 3.0)".
Legal compliance gap across both skills.

### Finding 5 -- tradition-observance-calendar without_skill recommended a PAID API

Calendarific API (API key + paid commercial plan) recommended for Christian holidays.
Free Computus algorithm is non-obvious. Highest-consequence failure in all 15 without-skill evals.

### Finding 6 -- without_skill INVERTED the proportional representation rule

cross-tradition-compare eval 2 without_skill: said "Equitable Source Distribution -- equal across all traditions."
ARE rule is PROPORTIONAL (Christianity gets more, reflecting ~63% Pew US share).
Directionally wrong -- a developer following the without-skill response would produce the wrong content distribution.

### Finding 7 -- without_skill gave WRONG Mercury retrograde dates

celestial-data eval 2 without_skill: said next retrograde starts June 29, 2026.
ARE ephemeris data: next period is Jul 17 - Aug 11, 2026.
Wrong dates in a wellness tracker are safety-critical UX. This is the strongest argument for the celestial-data skill.

### Finding 8 -- verse-lookup without_skill eval 2 CRITICAL factual error

Said WEB "typically lacks the Deuterocanon/Apocrypha."
WEB on bible-api.com INCLUDES deuterocanonicals.
A developer following this would select a different translation for Catholic users and miss available content.

---

## Skill-Driven Fix Applied

One code fix applied during evals:
- **okhp3-tradition-observance-calendar**: Promise.allSettled WARNING box added to SKILL.md after eval-1 executor used Promise.all. Fix is live in v1.1.0.

---

## v1.1.0 Changes (Applied Before Evals)

| Skill | Change |
|-------|--------|
| All five | OverKill Hill P3 brand attribution (YAML metadata, header line, About footer) |
| All five | Triggering description strengthened with additional "Also activate when" phrases |
| All five | evals/evals.json with 3 test cases each |
| All five | benchmarks/benchmark.json with all 3 live evals |
| All five | version bumped 1.0.0 -- 1.1.0 |
| okhp3-celestial-data | Validation scripts section, validate-mercury-dates.cjs |
| okhp3-cross-tradition-compare | Quick start section, theme-entry-template.md in assets/ |
| okhp3-verse-lookup | Routing decision tree (ASCII art) |
| okhp3-tradition-observance-calendar | Validation script reference, validate-easter.js, Promise.allSettled WARNING |

---

## Artifact Locations

```
.agents/skills/<skill>/benchmarks/benchmark.json      -- per-skill results (all 3 evals live)
.agents/skills/<skill>-workspace/i1/         -- executor workspaces
  eval-<N>/skill/out/response.md             -- executor response
  eval-<N>/skill/out/metrics.json            -- tool call counts
  eval-<N>/skill/grading.json                    -- per-expectation pass/fail + evidence
  eval-<N>/no-skill/out/response.md          -- executor response
  eval-<N>/no-skill/out/metrics.json         -- tool call counts
  eval-<N>/no-skill/grading.json                 -- per-expectation pass/fail + evidence
.agents/skills/benchmark-summary.md                   -- this file
```

---

## Recommended Next Steps

1. Run live trigger evals once claude CLI is available -- confirm description changes improve trigger recall (#62)
2. Confirm Orthodox Easter 2029 date against Ecumenical Patriarchate official calendar (#63)
3. Verify 2029-2031 Mercury retrograde dates against NASA JPL Horizons
