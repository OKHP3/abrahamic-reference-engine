# ARE mitigation backlog

This backlog is derived from the 2026-08-27 equilibrium baseline. Items are
ordered by dependency and consequence, not by visual polish.

## Completed in the baseline pass

- Correct Sefaria bilingual lookup routing and render original Hebrew alongside
  English.
- Replace the Orthodox “Full coverage” label with explicit partial-coverage
  wording.
- Add reproducible machine-readable and human-readable baseline review records.
- Repair the declared lint command with a compatible ESLint/Babel configuration.
- Preserve causes when both Quran providers fail.
- Prevent stale lookup and Hadith responses from replacing newer user choices.

## Next task group -- deterministic evidence

### M1. Add API contract fixtures and unit tests -- complete

- **Depends on:** baseline review
- **Purpose:** make provider normalization, translation routing, fallback
  provenance, and malformed responses testable without network access.
- **Evidence:** `tests/api-contracts.test.ts`, `npm run test:unit`, and CI
  integration.
- **Acceptance:** `npm run test:unit` passes from a clean install; tests cover
  Sefaria English/bilingual routing, Bible translation mapping, Quran fallback,
  static Orthodox gaps, and invalid provider shapes.

### M2. Add route and interaction smoke coverage

- **Depends on:** M1
- **Purpose:** verify browse, lookup, compare, observances, settings, deep links,
  loading, empty, error, retry, copy-link, and stale-response states.
- **Progress:** runtime request-generation guards protect passage, Hadith,
  comparison panels, and calendar year loads; deterministic browser assertions
  cover the primary routes and interaction states in `tests/browser/app.spec.ts`.
- **Acceptance:** a browser test matrix runs locally and in CI at desktop and
  narrow mobile widths without live providers.

### M3. Add accessibility and responsive gates

- **Depends on:** M2
- **Purpose:** turn the current directional accessibility posture into release
  evidence.
- **Acceptance:** automated accessibility checks plus keyboard, 200% zoom,
  dark/light theme, and RTL checks cover the primary routes.

## Product truth and coverage

### M4. Reconcile demographic and scope provenance

- **Depends on:** baseline review
- **Purpose:** replace the generic Pew landing-page attribution with exact
  report/table, denominator, date, extraction, and compatibility notes.
- **Acceptance:** every displayed percentage has traceable source metadata and
  the inclusion rule is reproducible.

### M5. Decide bounded discovery and context modes -- complete (2026-08-27)

- **Depends on:** M1
- **Purpose:** either implement source-grounded paraphrase/ambiguity candidates
  and none/brief/scholarly context controls, or explicitly retire those origin
  promises from product copy.
- **Decision:** Retire these promises for the current static prototype. Lookup
  accepts exact references only. It does not generate paraphrase candidates,
  fuzzy matches, ambiguity suggestions, or context-depth modes. The separate
  comparison route remains a fixed, pre-seeded theme dataset. Its bridging text
  is labeled as ARE editorial commentary and is not presented as source text.
- **Evidence:** `docs/reviews/are-paraphrase-context-boundary-2026-08-27.md`,
  `src/api/index.ts`, `src/pages/VerseLookup.tsx`, `src/pages/CrossTraditionCompare.tsx`,
  `README.md`, and `tests/api-contracts.test.ts`.
- **Acceptance:** deterministic tests assert the capability boundary and public
  copy; a source reference remains distinct from a paraphrase query, and
  comparison commentary remains labeled separately from quoted text.

### M6. Normalize canon and edition coverage

- **Depends on:** M4
- **Purpose:** align denomination cards, lookup routing, translation metadata,
  static gaps, and community-provider disclosures.
- **Acceptance:** representative books and unsupported paths are labeled
  consistently at the point of use.

## Deployment and maintenance

### M7. Verify GitHub Pages portability -- artifact check complete

- **Depends on:** M2
- **Purpose:** prove direct routes, refreshes, assets, favicon, manifest, and
  share links under the production subpath.
- **Evidence:** `scripts/check-pages-artifact.js` validates the built base path
  and manifest assets in CI.
- **Acceptance:** a production smoke run is recorded for all public routes and
  known fallback behavior is documented.

### M8. Separate live health from release regression

- **Depends on:** M1
- **Purpose:** keep public-provider smoke tests useful without making transient
  outages indistinguishable from code regressions.
- **Acceptance:** deterministic tests gate code changes; live checks are
  time-bounded, classified, and observable.

### M9. Final equilibrium release gate

- **Depends on:** M3, M5, M6, M7, M8
- **Purpose:** re-freeze the candidate and decide `approve`,
  `approve-with-limits`, `defer-for-evidence`, or `reject`.
- **Acceptance:** the claim ledger, independent reviews, disruptor tests,
  negotiator decision, public copy, and review-expiry triggers all describe the
  same release.