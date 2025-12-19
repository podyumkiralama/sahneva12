# Performance Audit

## Issue 1: Below-the-fold shells lacked `content-visibility` and intrinsic sizing
- **Impact:** Deferred homepage sections still participated fully in layout/paint while waiting to intersect, risking extra main-thread work and causing layout shifts before content hydrated.
- **Fix:** Added a reusable `visibilityStyle` helper that applies `content-visibility: auto` and `contain-intrinsic-size` with per-section heights to both wrappers and placeholders, reducing work until sections come into view.
- **Files changed:** `components/DeferredSections.client.jsx`

## Issue 2: Redundant client script for document direction
- **Impact:** `DocumentDirection.client.jsx` re-set `lang`/`dir` on the client even though `app/layout.js` already emits those attributes. This added hydration-only JS before the hero could paint.
- **Fix:** Removed the client-side direction script so `lang`/`dir` rely on server-rendered attributes only.
- **Files changed:** `app/layout.js`

## Issue 3: Analytics bootstrapped during initial paint
- **Impact:** `AnalyticsConsentWrapper` initialized consent mode and attempted to load GA immediately on mount, introducing main-thread work during the LCP window.
- **Fix:** Gate analytics initialization behind first interaction or idle with generous timeouts so it no longer competes with the hero paint.
- **Files changed:** `components/AnalyticsConsentWrapper.client.jsx`
