# Render-blocking CSS audit checklist

## Goals
- Homepage CSS deferral keeps LCP at or better than baseline (~0.35–0.40s) and CLS at 0.
- Navbar, HeroSection, and HeroBelow remain visually stable without FOUC when main stylesheet is deferred.

## What changed
- Inline a minimal critical CSS block (navbar/header positioning, hero shell, base colors and typography) in `app/layout.js` via `styles/critical.css`.
- Preload + swap main `_next/static/css/*.css` assets in production using `NonCriticalStylesheet` and manifest-based discovery.
- Added `content-visibility: auto` and `contain-intrinsic-size: 1px 900px` to the ServicesTabs wrapper to reduce below-the-fold cost without layout jumps.
- Added `NEXT_PUBLIC_DEFER_MAIN_CSS` flag to opt out quickly if any issues appear.

## How to verify
1) **Build & serve production**
   - `npm run build && npm run start`
   - Ensure `.next` manifests are present (or provide `public/css-manifest.json` if using a custom build step).
2) **Check render-blocking requests**
   - Open DevTools > Performance insights > Diagnostics
   - Confirm `_next/static/css/*.css` is no longer flagged as render-blocking (should show as preloaded or lower impact).
3) **Measure LCP/CLS**
   - Run Lighthouse or Performance panel on homepage (`/` and `/tr` route):
     - Expected: LCP near baseline (~0.35–0.40s), CLS = 0.000.
4) **FOUC guard**
   - Throttle to Slow 3G + 4x CPU in DevTools.
   - Reload and confirm Navbar, Hero, and HeroBelow remain styled from the inline critical CSS until the main stylesheet swaps in.
5) **Coverage sanity**
   - Performance > Coverage: main CSS coverage should improve for above-the-fold load; inline block should cover only essentials.
6) **ServicesTabs lazy section**
   - Scroll to ServicesTabs and ensure layout does not jump; `content-visibility` placeholder height (~900px) should keep CLS at 0.

## Rollback / toggle
- Set `NEXT_PUBLIC_DEFER_MAIN_CSS=false` (or run in non-production) to disable deferral and use standard stylesheet loading.
- Remove `styles/critical.css` injection from `app/layout.js` to revert to default Next.js behavior if needed.
