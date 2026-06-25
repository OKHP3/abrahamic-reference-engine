---
name: Post-merge setup
description: Location and config of the ARE post-merge script
---

Script path: `.local/post-merge.sh` (gitignored, not in committed tree)
Configured via: `setPostMergeConfig({ scriptPath: ".local/post-merge.sh", timeoutMs: 60000 })`
Content: `npm install` with `set -e`

**Why:** The platform requires a post-merge script registered in `.replit`. We keep it at `.local/` so it does not appear in the committed repo structure -- consistent with the "no scripts/ directory" rule in AGENTS.md.

**How to apply:** If post-merge setup fails on a future merge, check `.local/post-merge.sh` exists and re-run `setPostMergeConfig` + `runPostMergeSetup()` from the post_merge_setup skill.
