# Performance Audit

## Issue 1: Below-the-fold shells lacked `content-visibility` and intrinsic sizing
- **Impact:** Deferred homepage sections still participated fully in layout/paint while waiting to intersect, risking extra main-thread work and causing layout shifts before content hydrated.
- **Fix:** Added a reusable `visibilityStyle` helper that applies `content-visibility: auto` and `contain-intrinsic-size` with per-section heights to both wrappers and placeholders, reducing work until sections come into view.
- **Files changed:** `components/DeferredSections.client.jsx`
