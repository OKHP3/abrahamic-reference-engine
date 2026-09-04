---
name: GitHub Pages production smoke harness
description: Why the local production browser check needs base-path-aware static serving.
---

The Vite preview server serves the build directory at `/`, so it cannot by itself simulate GitHub Pages hosting a repository site under `/abrahamic-reference-engine/`. A production smoke harness must map that prefix to `dist/` and serve `dist/404.html` for direct SPA routes.

**Why:** Without this mapping, the built HTML requests its prefixed JavaScript and CSS assets from paths that Vite preview reports as 404, masking the actual Pages behavior.

**How to apply:** Use the base-path-aware harness for browser checks of direct routes and hard reloads; keep the deployment workflow's `dist/index.html` to `dist/404.html` copy step as the hosted fallback contract.