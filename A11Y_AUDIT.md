# Accessibility Audit

## Issue 1: Skip links could not reach the footer target
- **Impact:** Keyboard and screen reader users activating the “footer” skip link landed on a node without an ID or focus target, preventing the shortcut from working and hurting reading order for Chrome Read Aloud.
- **Fix:** Added a default `_main_footer` ID, focusable container, and localized description text to the footer so skip links have a valid, descriptive destination.
- **Files changed:** `components/Footer.js`, `app/layout.js`
