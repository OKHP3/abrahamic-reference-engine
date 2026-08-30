---
name: Chromium browser tests in Replit
description: Replit Nix environments need explicit Chromium runtime libraries for local Playwright checks.
---

Playwright browser checks should use Chromium with a narrow viewport project rather than a WebKit device preset when the environment only provisions Chromium.

**Why:** The Playwright package and browser download do not automatically provide all shared libraries in the Replit Nix runtime; missing GLib/GBM libraries prevent the browser from starting before tests run.

**How to apply:** Keep the required Nix libraries in `.replit` and install Chromium in CI with Playwright's browser installer before running the deterministic browser suite.