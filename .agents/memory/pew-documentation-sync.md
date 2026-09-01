---
name: Pew documentation sync
description: Durable rule for keeping public demographic documentation aligned with the checked-in Pew source snapshot.
---

Public demographic documentation must be validated against the checked-in source snapshot, including table values, source-category labels, explanatory component figures, and cited table context.

**Why:** Runtime data can remain correct while a README or other public explanation drifts and publishes a conflicting figure or category.

**How to apply:** Keep source-backed values and dates in the snapshot, and make deterministic offline contract tests parse and compare each public representation with clear tradition, category, and value errors.