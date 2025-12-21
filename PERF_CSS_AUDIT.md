# Render-blocking CSS audit checklist

## Goals
- Use standard Next.js stylesheet loading without preload/defer scripts while keeping layout stable across locales and routes.
- Preserve LCP/CLS by relying on Tailwind base styles plus the updated global utilities.

## What changed
- Removed inline `styles/critical.css` injection and manifest-driven CSS deferral (`NonCriticalStylesheet`, `lib/cssManifest.js`, `NEXT_PUBLIC_DEFER_MAIN_CSS`).
- Consolidated base styling into `styles/globals.css` (focus ring, typography defaults, grid overlay) and converted rail controls to Tailwind utility classes.
- Tailwind content globs narrowed to active source roots for deterministic builds.

## How to verify
1) **Build & serve production**
   - `npm run build && npm run start`
   - Confirm only the standard `_next/static/css/*.css` link tags appear in `<head>` with no inline critical block.
2) **Route smoke test**
   - Homepage (`/`, `/en`, `/ar`), services (all locale variants), projects, blog, contact, and 404 pages: ensure layout/spacing match baseline.
3) **Performance sanity**
   - Lighthouse/Chrome Performance: render-blocking warnings for CSS should be clear; LCP should be driven by the main stylesheet with CLS at 0.

## Rollback / toggle
- No runtime flag is required; restoring the previous deferral would require bringing back `styles/critical.css`, `lib/cssManifest.js`, and `components/NonCriticalStylesheet.jsx` plus the layout wiring.
