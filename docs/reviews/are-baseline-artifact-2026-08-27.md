# ARE Baseline Artifact

## Frozen subject

- Product: Abrahamic Reference Engine
- Repository: `OKHP3/abrahamic-reference-engine`
- Commit: `3d12e40f97d934c01cba3ca529a642af0e82e680`
- Branch: `main`
- Review date: 2026-08-27
- Review status: analytical baseline

## Decision question

Is the product ready for public release within its explicitly stated scope as a
neutral, citation-first scripture reference and comparative-literacy SPA?

## Acceptance criteria

1. Public claims match observable implementation and traceable sources.
2. The four core workflows serve their stated audiences: browse, lookup,
   compare, and observances.
3. Attribution, licensing, canon and denomination limits, and provider failure
   boundaries are clear at the point of use.
4. Neutrality, safety, privacy, and portability boundaries are credible.
5. Quality evidence is repeatable enough to support the product's public claims.

## Source set

- `README.md`
- `replit.md`
- `AGENTS.md`
- `public/origin/are00_thread_summary.md`
- `public/origin/gpt_religion_project/README.md`
- `public/origin/gpt_religion_project/ui_copy.md`
- `public/origin/gpt_religion_project/test_queries.md`
- `public/origin/gpt_religion_project/translation_metadata_and_licenses.md`
- `src/`
- `.github/workflows/`
- `.agents/skills/okhp3-equilibrium-review/`

## Known constraints

- Static Vite/React SPA; no backend or database.
- Public provider availability and response shape are external dependencies.
- Free/open sources are preferred; protected licensed translations are not
  currently configured.
- The current product scope is Judaism, Christianity, and Islam.
- The review is not a substitute for specialist theological, legal,
  accessibility-certification, or security review.

## Evidence status

This baseline combines repository inspection and independent analytical
reviewers. No external holdout, deployment smoke test, automated accessibility
run, or full live-provider release test was executed as part of the review.
