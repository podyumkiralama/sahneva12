# LCP Audit

## LCP Element
- **Element:** `<section>` hero background image rendered by `HeroBackgroundImage` (`components/HeroSection.js`). The `next/image` instance fills the viewport and is marked `priority`, making it the first large paint target.
- **Selector/Origin:** `section[aria-labelledby="hero-title"] > div.absolute > Image[src="/img/hero-bg.webp"]` created inside `HeroSection` on the homepage route `app/(tr)/(site)/page.js`.

## Breakdown (local dev observations)
- **TTFB:** Dominated by server render of `app/layout.js` + `app/(tr)/layout.js`; fast in local dev (<200ms) but still sets the baseline for LCP.
- **Load delay:** Hero image requested immediately because of `priority` and `fetchPriority="high"` in `HeroSection`.
- **Render delay:** Main-thread work from always-on client components (`Navbar`, `AnalyticsConsentWrapper`) and deferred-but-mounted utilities adds hydration before first paint.

## Top blockers (ranked)
1. **Eager analytics bootstrap** — `components/AnalyticsConsentWrapper.client.jsx` initializes consent + GA on every page render, adding main-thread work before user interaction.
2. **Redundant direction client script** — `components/i18n/DocumentDirection.client.jsx` reassigns `lang/dir` at runtime even though `app/layout.js` already sets them server-side, causing an extra hydration-only script.
3. **Hero paint pressure** — The full-bleed hero image and overlay render immediately; although needed for branding, any extra JS/CSS delay will push its paint.

## Fixes applied
- **Deferred analytics initialization** to first interaction/idle to remove main-thread tasks before LCP. (See `components/AnalyticsConsentWrapper.client.jsx`).
- **Removed redundant direction client script** to reduce hydration JS and allow the hero to paint with fewer blocking tasks. (See `app/layout.js`).

## Validation / Next steps
- Re-run Lighthouse Performance (mobile + desktop) to verify LCP drops from ~3.2s toward the <2.0s target and confirm no new CLS/hydration issues.
- Profile the homepage with Chrome Performance to ensure no long tasks remain before the hero paint; consider lazy-mounting `Navbar` mega-menu logic if further reductions are needed.
