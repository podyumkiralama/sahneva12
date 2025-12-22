# Font Audit

## What was removed
- No manual font loading tags or `@font-face` rules were present; confirmed fonts are now sourced exclusively via `next/font`.

## What replaced it
- `next/font/google` now exposes the Inter family with the `--font-inter` CSS variable for Tailwind and global styles.
- The root layout applies the Inter font class and variable on the `<html>` element to unify font usage across locales.

## Files changed
- `app/fonts.js`
- `app/layout.js`

## Loading behavior
- Inter is delivered through `next/font`, which generates the `@font-face` rules you may see in DevTools with scoped unicode ranges.
- The font is set to `display: swap` and `preload: true`, so initial text paints with system fallbacks while the Inter files begin downloading during navigation instead of after full CSS parsing.
- If you notice ~450ms attributed to font downloads in a waterfall chart, that time is for the network request only; it should not delay first paint because fallback fonts are allowed to render immediately.

## Performance notes
- The font files are split into unicode-range shards (visible as multiple `@font-face` blocks), so only the ranges actually used on a page are fetched.
- Because `preload` is enabled, the browser starts the first font fetch earlier in the navigation. Keep `display: swap` to avoid blocking text paint while the font downloads.
- A ~450ms download on a slow connection is expected for the first visit. Subsequent navigations should reuse the cached font, keeping layout stable because the fallback and Inter metrics are very close.
