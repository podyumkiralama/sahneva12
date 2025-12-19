# Font Audit

## What was removed
- No manual font loading tags or `@font-face` rules were present; confirmed fonts are now sourced exclusively via `next/font`.

## What replaced it
- `next/font/google` now exposes the Inter family with the `--font-inter` CSS variable for Tailwind and global styles.
- The root layout applies the Inter font class and variable on the `<html>` element to unify font usage across locales.

## Files changed
- `app/fonts.js`
- `app/layout.js`
