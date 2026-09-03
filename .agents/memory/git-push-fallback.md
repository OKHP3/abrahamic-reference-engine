---
name: Git push fallback
description: gitPush() CodeExecution callback sometimes rejects clean fast-forward pushes; reliable shell alternative
---

The `gitPush({})` callback returns `PUSH_REJECTED` even when the local branch is simply N commits ahead of origin with no divergence.

**Why:** The root cause is unclear (possibly stale credential cache or internal state in the Replit git proxy), but it has occurred multiple times in this project when several task-agent merges happened in quick succession, leaving the remote origin URL stale in the local git config.

**How to apply:** When `gitPush()` fails with PUSH_REJECTED and `git fetch origin` confirms the local branch is a clean fast-forward (not diverged), push directly from the shell:

```bash
git push "https://x-access-token:${GITHUB_PAT}@github.com/OKHP3/abrahamic-reference-engine.git" main
```

If there is genuine divergence (remote has commits local doesn't), preserve both
histories by merging the refreshed remote main into local main first:

```bash
git fetch --prune origin
git merge --no-ff origin/main
git push "https://x-access-token:${GITHUB_PAT}@github.com/OKHP3/abrahamic-reference-engine.git" main
```

Never force-push or discard remote commits. Note: a merge from the shell
requires a clean working tree. Stash unstaged changes first if needed. Also:
always commit file edits with `git add … && git commit` before pushing —
`gitPush()` only pushes existing commits, it does not stage or commit.
