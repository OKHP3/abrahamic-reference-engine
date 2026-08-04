# ADR-0003: Tailwind CSS v4 with CSS-First Theme Configuration

## Status

Accepted

## Context

The app needs a design system that can express a distinctive scholarly aesthetic (dark backgrounds, gold accents, parchment text, custom type scale) without large amounts of bespoke CSS. Tailwind CSS v3 was the previous standard; Tailwind CSS v4 was released with a CSS-first configuration model.

Options considered:
- **Tailwind CSS v3** -- mature, widely documented; JS-based `tailwind.config.js`
- **Tailwind CSS v4** -- CSS-first theme via `@theme` directive; no separate config file; ships as a PostCSS plugin
- **Plain CSS modules** -- more verbose; harder to maintain a consistent token system
- **styled-components / emotion** -- runtime CSS-in-JS; unnecessary overhead for a static SPA

## Decision

Use Tailwind CSS v4 (`tailwindcss@^4.3.2`) with `@tailwindcss/postcss`. All theme tokens (colors, font families, type scale) are declared in `src/index.css` via `@theme inline { ... }` and CSS custom properties in `:root`. No `tailwind.config.js` exists.

## Rationale

1. **CSS-first configuration is more transparent** -- design tokens live in one CSS file alongside their usage; no context-switch to a JS config
2. **Custom property system enables dark/light mode without JS** -- `--color-*` tokens are overridden by the `.light` class on `<html>`, which the inline theme-detection script sets before React mounts
3. **Smaller dependency surface** -- no separate config file, no plugin registration for common features
4. **All tokens are already in use** -- the palette (`gold`, `parchment`, `bg-base`, `bg-elevated`) has shipped and is consistent across 14+ components

## Consequences

- **Positive:** single source of truth for design tokens in CSS
- **Positive:** PostCSS-native; no runtime overhead
- **Negative:** v4 documentation is less mature than v3 at the time of adoption
- **Constraint:** `@import "tailwindcss"` in `src/index.css` must be the CSS entry point; the PostCSS plugin (`@tailwindcss/postcss`) must be registered
- **Note:** an early lockfile mismatch installed v3 when v4 was declared; resolved by running `npm install tailwindcss@^4.3.2 @tailwindcss/postcss@^4.3.2`
