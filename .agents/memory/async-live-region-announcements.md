---
name: Async live-region announcements
description: Guidance for announcing concurrent loading, success, and error states without losing important intermediate updates.
---

When several asynchronous requests update one screen, keep the aggregate loading announcement stable until the group resolves; individual success updates must not replace it while another request is still in flight.

**Why:** Concurrent responses can settle in a different order than requests were started, causing a screen reader to hear a later success message instead of the still-relevant loading state.

**How to apply:** Use a group-level announcement for batch operations and reserve per-item success or error announcements for independently initiated retries or refreshes.