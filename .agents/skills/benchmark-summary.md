# ARE Skills Benchmark Summary

**Date:** 2026-06-26
**Skills evaluated:** 5 (all okhp3-* skills, version 1.1.0)
**Eval 1 method:** Live delegation subagent executor + main-agent grader (10 subagent runs)
**Evals 2-3 method:** Analytical review against skill content by expert review
**Executor model:** delegation-subagent (Replit agent framework)
**Grader:** main-agent (expert review against evals.json expectations)

---

## Eval 1 -- LIVE Run Results

| Skill | with_skill | without_skill | Delta | Artifact |
|-------|-----------|--------------|-------|----------|
| okhp3-celestial-data | 4/4 (1.00) | 2/4 (0.50) | +0.50 | eval-1/grading.json |
| okhp3-cross-tradition-compare | 4/4 (1.00) | 3/4 (0.75) | +0.25 | eval-1/grading.json |
| okhp3-tradition-observance-calendar | 3/4 (0.75) | 0/4 (0.00) | +0.75 | eval-1/grading.json |
| okhp3-tradition-reference | 4/4 (1.00) | 2/4 (0.50) | +0.50 | eval-1/grading.json |
| okhp3-verse-lookup | 4/4 (1.00) | 2/4 (0.50) | +0.50 | eval-1/grading.json |
| **AVERAGE** | **0.95** | **0.45** | **+0.50** | -- |

---

## All-Eval Summary (Evals 1-3, mixed live + analytical)

| Skill | with_skill mean | without_skill mean | Delta |
|-------|-----------------|-------------------|-------|
| okhp3-celestial-data | 1.00 | 0.25 | +0.75 |
| okhp3-cross-tradition-compare | 1.00 | 0.25 | +0.75 |
| okhp3-tradition-observance-calendar | 0.92 | 0.25 | +0.67 |
| okhp3-tradition-reference | 1.00 | 0.33 | +0.67 |
| okhp3-verse-lookup | 1.00 | 0.25 | +0.75 |
| **AVERAGE** | **0.98** | **0.27** | **+0.71** |

---

## Key Findings from Live Runs

### Finding 1 -- cross-tradition-compare without_skill scored 0.75 (expected 0.17)

The LLM has good general interfaith sensitivity and produced a neutral bridging note without the style guide.
The real differentiator is the PRE-SEEDED passage data (Psalm 103:12, Matthew 6:14-15, Az-Zumar 39:53).
Without the skill, agents pick valid but different passages -- causing inconsistency with compareThemes.ts.
Implication: the 'neutral bridging note' expectation does not discriminate well. Tighten in next eval cycle.

### Finding 2 -- tradition-observance-calendar with_skill scored 0.75, not 1.0 (Promise.allSettled gap)

The with-skill executor read the skill but still used Promise.all instead of Promise.allSettled.
Real runtime failure mode: if any single AlAdhan month request fails, Promise.all discards all 11 other successful months.
Action taken: added WARNING box to the skill body for Promise.allSettled requirement.

### Finding 3 -- translation ID 20 is genuine LLM training knowledge

The without-skill agent correctly identified Sahih International = translation ID 20 without the matrix.
The translation matrix's highest value is for less-common translations (Yusuf Ali, Pickthall, etc.) and for enforcing primary/fallback ordering.

### Finding 4 -- attribution is a consistent LLM blind spot

verse-lookup without-skill produced correct normalization logic but omitted CC BY-SA 2.0 attribution entirely.
This is a legal compliance gap. Attribution expectations should be included in all ARE skill evals going forward.

### Finding 5 -- tradition-observance-calendar without_skill recommended a PAID API

Without the skill, the LLM recommended Calendarific API (requires API key + paid plan for commercial use) for Christian holidays.
The free Computus algorithm is non-obvious -- a general agent will default to a paid service.
This is the highest-consequence failure in the live eval set.

---

## Highest-delta analytical evals (evals 2-3)

**0.0 without skill (total failures):**
- celestial-data eval 2 -- Mercury retrograde status (MERCURY_RETROGRADE array is 100% skill-specific data)
- cross-tradition-compare eval 2 -- Proportional representation rule (ARE-internal governance rule)
- cross-tradition-compare eval 3 -- Three-panel UI colors/layout (ARE Tailwind tokens)
- verse-lookup eval 3 -- D&C routing (isLdsBibleRef, scriptures.nephi.org, LdsApiUnavailableError all skill-exclusive)

These four analytical evals represent the highest-value content in the skill set -- data or rules a general agent cannot derive from public knowledge.

---

## Workspace Artifacts

Each skill has a workspace directory with the full eval-1 run artifacts:

```
.agents/skills/okhp3-<name>-workspace/
  iteration-1/
    eval-1/
      with_skill/
        outputs/response.md      -- live executor subagent response
        outputs/metrics.json     -- tool call counts
        grading.json             -- per-expectation pass/fail with evidence
      without_skill/
        outputs/response.md      -- live executor subagent response
        outputs/metrics.json     -- tool call counts
        grading.json             -- per-expectation pass/fail with evidence
```

---

## v1.1.0 Improvements Summary

| Skill | Change |
|-------|--------|
| All five | OverKill Hill P3 brand attribution (YAML metadata, header line, About footer) |
| All five | Triggering description strengthened with additional "Also activate when" phrases |
| All five | evals/evals.json with 3 test cases each |
| All five | benchmarks/benchmark.json with live eval-1 runs |
| All five | version bumped to 1.1.0 |
| okhp3-celestial-data | Validation scripts section, validate-mercury-dates.cjs |
| okhp3-cross-tradition-compare | Quick start section, theme-entry-template.md in assets/ |
| okhp3-verse-lookup | Routing decision tree (ASCII art) |
| okhp3-tradition-observance-calendar | Validation script reference, validate-easter.js, Promise.allSettled WARNING |

---

## Recommended Next Steps

1. Run live trigger evals once claude CLI is available -- confirm description changes improve trigger recall
2. Confirm Orthodox Easter 2029 date against Ecumenical Patriarchate official calendar (algorithm gives April 8)
3. Verify 2029-2031 Mercury retrograde dates against NASA JPL Horizons
