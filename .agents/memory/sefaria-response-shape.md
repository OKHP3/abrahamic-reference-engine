---
name: Sefaria response shape
description: Durable normalization constraints for Sefaria passage responses.
---

Sefaria may return a full chapter array for a request that names one verse, and
the returned strings can contain HTML footnote markup. A consumer must select
the requested segment using the response section metadata and remove footnote
markup before presenting the quotation.

**Why:** Flattening the array without selection made a single-verse lookup
display an entire chapter and editorial alternatives as if they were one
citation.

**How to apply:** Treat `text` and `he` arrays as structured chapter/range
segments, not as an already-normalized quotation. Preserve the requested
reference and remove HTML annotations before rendering or comparing text.