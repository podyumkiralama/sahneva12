# Critical CSS integration status

## Task 1: Quick CSS blocking note
- Lighthouse / DevTools measurements are not available in this environment, so render-blocking CSS could not be confirmed here.
- Suggested local target: bring First Contentful Paint (FCP) under ~1.5s and Largest Contentful Paint (LCP) under ~2.5s on a mid-tier device/network once the critical CSS pipeline runs.

## Task 2: Static HTML Beasties pass
- Added a `scripts/criticalcss.js` post-build step that looks for prerendered HTML (defaulting to `.next/server/app`, falling back to `.next` or `out`).
- The script attempts to inline critical CSS with **Beasties**. If you really need to remove any remaining blocking stylesheet/preload links from `<head>`, set `CRITICAL_CSS_STRIP_HEAD=true` when running the script; otherwise, links are kept to avoid layout flashes.
- Layout/global CSS dosyalarıyla çakışma yaşamamak için `CRITICAL_CSS_STRIP_HEAD` değişkenini kapalı bırakmak güvenli: Beasties `pruneSource: false` ile kaynak CSS'i korur ve link'ler yüklenmeye devam eder, bu yüzden layout stilleri devrede kalır.
- If Beasties is unavailable in the environment, it falls back to the existing `critters` dependency so builds keep working; install Beasties in CI for the intended flow.

## Usage
- Run `npm run build` (or `npm run criticalcss` directly) after generating static HTML. Adjust the `CRITICAL_CSS_HTML_ROOT` env var if your HTML lives outside the default locations.
- Inspect the resulting HTML to verify critical styles are inlined and `<head>` no longer contains render-blocking stylesheet links.
