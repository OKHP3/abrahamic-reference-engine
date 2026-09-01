---
name: Responsive accessibility checks
description: Durable lessons for validating responsive keyboard access and motion preferences in browser tests.
---

Responsive drawers hidden with CSS transforms remain keyboard-reachable unless their descendants are made inert at the mobile breakpoint. Browser tests should explicitly emulate reduced motion and apply a real 200% zoom condition rather than relying only on project defaults.

**Why:** A visual off-canvas state is not a keyboard off-canvas state, and the local Playwright runtime did not consistently propagate the reduced-motion project option on its own.

**How to apply:** When adding or reviewing responsive navigation, verify closed-drawer tab order, focus return after closing, visible focus styling on every control type, explicit `emulateMedia({ reducedMotion: 'reduce' })`, and zoomed traversal.