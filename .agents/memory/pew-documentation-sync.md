---
name: Pew documentation sync
description: Durable rule for keeping public demographic documentation aligned with the checked-in Pew source snapshot.
---

Public demographic documentation must be validated against the checked-in source snapshot, including table values, source-category labels, explanatory component figures, and cited table context. The validation must run in the publication path before artifact upload.

**Why:** Runtime data can remain correct while a README or other public explanation drifts and publishes a conflicting figure or category. Concurrent CI can report a failure after publication has already started, so it is not a release gate.

**How to apply:** Keep source-backed values and dates in the snapshot, make deterministic offline contract tests parse and compare each public representation with clear tradition, category, and value errors, and run those tests before publishing artifacts.

Use explicit category/value associations when scanning prose: direct-category quotes,
source-category phrases, and stable component-note markers are safer than broad
matches on any line containing a percentage.

**Why:** Contextual thresholds and nearby mentions of a broader category can look
like demographic claims while referring to a different concept.

**How to apply:** Validate package-specific claim locations and include the
publication package path, file, and claim in every drift message.