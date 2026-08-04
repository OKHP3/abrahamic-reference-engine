# ADR-0002: BrowserRouter with Basename for GitHub Pages Subpath

## Status

Accepted

## Context

GitHub Pages serves the app from a subpath: `https://okhp3.github.io/abrahamic-reference-engine/`. React Router must be configured to handle this subpath correctly in production while serving from root (`/`) in development.

Options considered:
- **HashRouter** -- routes become `/#/browse`, `/#/lookup`, etc.; works on any static host without server config
- **BrowserRouter with basename** -- clean URLs (`/browse`, `/lookup`); requires the server to serve `index.html` for any subpath
- **Static routing with no SPA router** -- not viable for a multi-view app

## Decision

Use `BrowserRouter` with `basename={import.meta.env.BASE_URL.replace(/\/$/, '')}`. The Vite `base` is set to `/abrahamic-reference-engine/` in production and `/` in development. The GitHub Actions workflow copies `dist/index.html` to `dist/404.html` so GitHub Pages serves the SPA shell for any deep-link URL.

## Rationale

1. **Clean URLs are materially better for SEO and sharing** -- `okhp3.github.io/abrahamic-reference-engine/browse` is shareable and readable; hash URLs are not indexed consistently
2. **The 404.html trick is a standard and well-understood GitHub Pages SPA pattern** -- no custom server config needed
3. **`import.meta.env.BASE_URL` is the Vite-idiomatic way to consume the base** -- the same value that controls asset URLs also controls the router, so they stay in sync automatically

## Consequences

- **Positive:** canonical, shareable, indexable URLs for each tab and tradition detail page
- **Positive:** router and asset base stay in sync through a single Vite config value
- **Negative:** a future migration to a different host requires re-evaluating the 404.html pattern
- **Constraint:** the production `base` in `vite.config.ts` must exactly match the GitHub Pages repository subpath; any rename requires updating both
