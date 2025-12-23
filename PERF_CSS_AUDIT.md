# Render-blocking CSS audit checklist

This project now uses default Next.js/Tailwind CSS loading (no custom CSS deferral).

- Main CSS is loaded normally (no `NonCriticalStylesheet` / critical CSS inlining).
- If CLS/FOUC is observed, investigate fonts/images/layout shifts rather than CSS deferral.
