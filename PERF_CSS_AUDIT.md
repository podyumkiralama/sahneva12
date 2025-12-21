# Render-blocking CSS audit checklist

## Inventory and entry points
- `styles/globals.css`: Tailwind base/components/utilities plus shared tokens (font vars, brand colors, base html/body defaults, focus ring, media element resets).
- `styles/critical.css`: inline above-the-fold shell (~1.0 KB raw) that covers body typography/background, header offset, main padding (mobile+lg), and the hero skeleton wrapper (`.hero-inline-safe`).
- `styles/grid-overlay.css`: shared grid overlay utility imported only by sections/components that render the decorative grid background (Hero adjacents, tabs, gallery, footer, etc.).
- `styles/rail-controls.css`: styles for sticky video rail controls, imported where the rail is rendered.
- Next-generated CSS (`/_next/static/css/*.css`) continues to load via the defer/prefetch pipeline in `app/layout.js`; toggle with `NEXT_PUBLIC_DEFER_MAIN_CSS=false` if needed.

## What changed
- Trimmed `globals.css` to only global foundations; moved `grid-overlay` and `rail-control` rules into scoped CSS files and imported them where used.
- Rebuilt `critical.css` to a minimal palette-aligned shell (body color/typography, header/main spacing, hero height/overlay) to prevent FOUC/CLS while deferral is enabled; kept size under 2 KB (raw: ~1,059 bytes).
- Added a Playwright-powered coverage helper (`scripts/css-coverage.js`) and npm alias (`npm run css:coverage`) to report used/unused bytes per stylesheet across `/`, `/sss`, and `/sahne-kiralama` (configurable via `BASE_URL` and `COVERAGE_ROUTES`).

## How to verify
1) **Build & serve production**
   - `npm run build && npm run start`
   - Confirm the inline critical block renders the header/hero shell without CLS before the deferred CSS swaps in.
2) **CSS deferral checks**
   - With `NEXT_PUBLIC_DEFER_MAIN_CSS` unset/true in production, ensure `_next/static/css/*.css` is preloaded then swapped; nav/hero should stay styled from `critical.css`.
   - Flip `NEXT_PUBLIC_DEFER_MAIN_CSS=false` to disable deferral quickly if regressions appear.
3) **Coverage (data-driven cleanup)**
   - Install Playwright locally (`npm install -D playwright`) if not already available.
   - Start the app (`BASE_URL` defaults to `http://localhost:3000`), then run `npm run css:coverage`.
   - The script prints unused bytes per stylesheet by route; use it to prune stale rules and validate Tailwind content globs.
4) **Lighthouse/visual sanity**
   - Run Lighthouse (mobile+desktop) on `/`, `/sss`, and a service page; target 100s with CLS 0 and LCP at/below baseline.
   - Compare above-the-fold screenshots before/after; hero/nav should remain identical.

## Rollback / toggles
- Disable deferral: set `NEXT_PUBLIC_DEFER_MAIN_CSS=false` or remove the deferred loading block in `app/layout.js`.
- Critical inline: remove `styles/critical.css` injection in `app/layout.js` to revert to default Next.js CSS delivery.

## Risks / notes
- Playwright is not vendored; install it before running `npm run css:coverage` in environments without registry restrictions.
- Keep `styles/critical.css` small (<5–8 KB minified) to avoid pushing render-blocking costs back up.
