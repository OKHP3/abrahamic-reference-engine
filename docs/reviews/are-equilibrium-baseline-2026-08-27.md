# ARE Equilibrium Baseline Review

**Review date:** 2026-08-27  
**Artifact:** `are-baseline-artifact-2026-08-27.md`  
**Frozen commit:** `3d12e40f97d934c01cba3ca529a642af0e82e680`  
**Review type:** analytical baseline, not a release certification

## 1. What was reviewed?

The current Abrahamic Reference Engine SPA and its public-facing documentation
were compared with the original product vision preserved under `public/origin/`.
The review covered the browse, exact verse lookup, cross-tradition comparison,
observance calendar, settings, deployment, and Agent Skills surfaces.

The original purpose is narrower and more demanding than “a verse browser”: it
is a neutral, citation-first reference and literacy engine that should make
religious text easier to find, cite, compare, and understand without preaching,
ranking, or doctrinal combat.

## 2. Decision requested

Determine whether the product is ready for public release within its stated
scope, and identify the smallest evidence-backed remediation sequence for
remaining weaknesses.

## 3. Independent reviews

All three initial reviews were analytical repository reviews performed in
separate contexts on the same frozen commit and source set:

| Role | Decision | Confidence | Evidence status |
|---|---|---:|---|
| Evidence reviewer | `defer-for-evidence` | medium-high | analytical |
| Outcome reviewer | `approve-with-limits` | medium | analytical |
| Safety and portability reviewer | `defer-for-evidence` | medium | analytical |

The reviewers share the same repository and model-family limitation. Their
convergence is therefore useful but correlated evidence, not independent proof.

## 4. Claim and evidence ledger

| ID | Claim under review | Type | Status | Evidence | Consequence if false | Smallest decisive next test |
|---|---|---|---|---|---|---|
| CLM-01 | The product is a neutral reference tool rather than a devotional, apologetics, or ranking system. | design choice | supported with limits | `README.md`; `src/pages/*`; `src/data/compareThemes.ts` | Users may mistake editorial bridges for doctrine or advocacy. | Adversarial review of every static explanatory and comparison note. |
| CLM-02 | The four core workflows are implemented and usable. | design/outcome | provisional | `src/App.tsx`; route pages; live preview | A broken state or deep link blocks the stated audience. | Automated route and interaction matrix across loading, empty, error, and success states. |
| CLM-03 | Population-share and scope claims are reproducible from the cited Pew source. | fact | blocked | `src/data/traditions.ts`; `README.md`; generic Pew link | Inclusion/exclusion rationale may be materially misleading. | Add exact report/table, denominator, date, extraction note, and provenance. |
| CLM-04 | Christian denominational lenses accurately communicate their actual text coverage. | fact/design | disputed | `src/data/traditions.ts`; `src/data/orthodoxGapTexts.ts`; `replit.md` | Users may infer a complete Orthodox or LDS edition where only partial/community data exists. | Coverage fixture for representative books and point-of-use labels. |
| CLM-05 | The Sefaria bilingual option returns Hebrew plus English when selected. | behavior | blocked | `src/data/translations.ts`; `src/api/index.ts`; `src/api/sefaria.ts` | Translation selection is misleading and language-learning use fails. | Contract test selecting the bilingual ID and asserting bilingual output. |
| CLM-06 | Returned text has visible source, translation/edition, license, and fallback provenance. | design/behavior | provisional | `src/components/VerseCard.tsx`; `src/data/translations.ts`; API adapters | Users cannot distinguish quoted source text from ARE editorial content or fallback text. | Provider fixture matrix and provenance assertions for every adapter. |
| CLM-07 | The original paraphrase and ambiguity workflow exists. | outcome | blocked | `public/origin/gpt_religion_project/ui_copy.md`; `src/pages/VerseLookup.tsx` | Readers who do not know a reference cannot find relevant passages. | Decide and test a bounded candidate workflow, or narrow public claims to exact lookup. |
| CLM-08 | The original commentary-level and no-commentary settings are represented in the app. | outcome | blocked | `public/origin/gpt_religion_project/ui_copy.md`; `src/context/SettingsContext.tsx` | Users cannot control context depth as originally promised. | Settings acceptance test for none/brief/scholarly behavior. |
| CLM-09 | Public-provider failures and stale responses cannot present misleading current results. | safety/behavior | provisional | `src/api/*`; route pages; `src/components/ErrorMessage.tsx` | A stale or substituted passage can be attributed to the wrong request or edition. | Deterministic timeout, malformed-response, cancellation, and rapid-change tests. |
| CLM-10 | GitHub Pages deployment is portable across the configured subpath and direct routes. | portability | blocked | `vite.config.ts`; `index.html`; `.github/workflows/deploy-pages.yml`; `public/404.html` | Refreshes, assets, favicon, or manifest may fail on production deep links. | Production-path smoke test for every route, refresh, asset, favicon, and manifest. |
| CLM-11 | Accessibility and responsive quality are release-supported. | outcome/safety | blocked | `src/index.css`; route components; no automated suite | Keyboard, screen-reader, zoom, RTL, or contrast failures can exclude readers. | Automated axe plus keyboard, 200% zoom, dark/light, and RTL matrix. |
| CLM-12 | CI provides repeatable evidence for the public product claims. | operations | blocked | `.github/workflows/ci.yml`; `package.json`; `replit.md` | Regressions can deploy while CI remains green; lint currently cannot run. | Repair lint/test scripts and require deterministic route/provider-contract checks. |

## 5. Convergence and divergence

The reviewers converge that:

- The application is substantially implemented and useful within an exact,
  three-tradition reference scope.
- The core neutrality and privacy posture is directionally sound.
- The app does not yet provide evidence for several original promises.
- The lack of automated tests is a maturity blocker rather than a cosmetic gap.
- Partial/fallback coverage and external-provider dependence need stronger
  point-of-use labeling.

There is no material disagreement about whether the core SPA exists. The
material disagreement is only about whether the current evidence justifies
unrestricted public claims. It does not.

## 6. Conditional disruptor

The initial reviews materially agree on the major weaknesses, so a narrow
falsification pass is warranted. These counterexamples should be tested before
any release decision:

1. Select the Sefaria bilingual option and verify the response actually contains
   the requested bilingual fields.
2. Load a direct production route under `/abrahamic-reference-engine/` with a
   fresh browser and verify CSS, scripts, favicon, manifest, and route state.
3. Start a lookup, change the reference immediately, and verify an earlier
   response cannot overwrite the newer request.
4. Open the Orthodox lens for a book outside the three bundled static gaps and
   verify the UI does not imply Orthodox-edition coverage.
5. Navigate lookup and observances by keyboard at 200% zoom in both themes and
   verify all content and state changes remain perceivable.
6. Run the declared lint command from a clean install and verify it is
   configured, not merely listed.

These are falsifiable tests, not claims that the counterexamples have already
been executed.

## 7. Negotiator decision

**Decision: `approve-with-limits` for the existing narrow prototype scope;
`defer-for-evidence` for unrestricted release against the original vision.**

The current product may be used as a limited public prototype when it clearly
states that it provides exact-reference lookup, seeded comparisons, partial
denomination coverage, and public-provider-dependent data. It should not claim
full canon/translation coverage, fuzzy discovery, commentary controls,
accessibility support, or release-grade reliability until the corresponding
evidence exists.

The strongest surviving objection is not missing polish. It is that several
user-visible choices can communicate a stronger source or coverage guarantee
than the implementation actually provides.

## 8. Mitigation order

1. Correct misleading source and coverage labels, especially Orthodox
   “full coverage” and Sefaria bilingual routing.
2. Freeze and test provider/provenance contracts, error states, and deep-link
   behavior.
3. Decide whether bounded paraphrase discovery and context-level controls are
   product commitments or should be removed from the public promise.
4. Add deterministic unit/route/accessibility coverage and repair lint.
5. Reconcile the Abrahamic-only scope with the origin's Phase-2 ideas without
   accidental expansion.
6. Re-run this review against a new frozen release candidate.

## 9. Review limitations and expiry

This record is analytical. No external holdout, automated accessibility run,
full live-provider release suite, or production direct-route matrix was
executed in this baseline. The record expires when source metadata, provider
contracts, deployment configuration, product scope, or any core route changes;
it must also be revisited before a release that changes the public claims.

## 10. Post-baseline mitigation note

On 2026-08-31, the blocked demographic-provenance claim (CLM-03) was
remediated in the working tree. User-visible percentages now point to the
2023-24 U.S. Religious Landscape Study interactive database’s U.S. adults /
Religious composition table and expose the source category, denominator,
fieldwork and publication dates, extraction method, compatibility limits, and
evidence status. The inclusion rule now requires a separately reported
top-level Abrahamic category at 1% or more of U.S. adults; an unreported group
is not silently treated as below the threshold. The Christianity total is
identified as Pew’s direct 62% category rather than a sum of the five lenses
shown in the app. Deterministic tests fail when required provenance fields are
missing.

On 2026-09-01, the cited table’s category labels and whole-percent display
values were frozen in a checked-in source snapshot. The deterministic contract
suite now compares every displayed denomination and tradition-group value and
category against that snapshot, and checks that all displayed citations retain
the snapshot’s report, table, denominator, source URL, and provenance dates.
Intentional source changes should update
`src/data/pew-religious-composition.snapshot.ts` and the source-backed notes
together.
