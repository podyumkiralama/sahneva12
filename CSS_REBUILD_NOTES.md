# CSS inventory and route map

## Current CSS sources and injection points
- **Tailwind entry:** `styles/globals.css` imports `@tailwind base/components/utilities` and defines custom base rules (root tokens, html/body defaults, heading scales, media element reset) plus utilities like `.focus-ring` and the `.grid-overlay` effect used across hero and gallery sections.
- **Critical inline block:** Removed; above-the-fold styling now comes from the primary Tailwind stylesheet.
- **Import surface:** `app/layout.js` is the single CSS entry point importing `../styles/globals.css`; no other `.css` imports exist under `app`, `components`, or `lib`.
- **Stylesheet delivery:** Global CSS is loaded once via the `app/layout.js` import; manifest-driven deferral, inline critical CSS, and the `NonCriticalStylesheet` helper have been removed.
- **Supporting tooling:** `tailwind.config.js` (forms/typography/line-clamp plugins, font family extension) and `postcss.config.cjs` (tailwindcss + autoprefixer) drive CSS output. Fonts come from `app/fonts.js` (Inter, `display: "swap"`, `preload: false`).

## Route inventory (App Router)
- **Shared layout:** `app/layout.js` wraps every route with `<Navbar />`, `<Footer />`, and `<SkipLinks />` while applying global classes on `<body>`.
- **Turkish grouped routes (`app/(tr)`):**
  - Home `/` → `app/(tr)/(site)/page.js` with `HeroSection`, dynamic `HeroBelow`, and deferred sections for services, projects, corporate intro, tech capabilities, why-choose-us, FAQ.
  - Static marketing pages `/hakkimizda`, `/hizmetler`, `/iletisim` (schema + rich text, no extra components beyond layout/SEO helpers).
  - Service detail pages `/podyum-kiralama`, `/truss-kiralama`, `/cadir-kiralama`, `/masa-sandalye-kiralama`, `/ses-isik-sistemleri`, `/led-ekran-kiralama`, `/sahne-kiralama`, `/kurumsal-organizasyon` (content + breadcrumb JSON-LD components).
  - Legal pages `/kvkk`, `/gizlilik-politikasi` with typography-centric content.
  - Blog index `/blog` plus posts under `/blog/kurumsal-etkinlik-yonetimi` and `/blog/led-ekran-teknoloji-trendleri-2026`.
  - Projects index `/projeler` plus gallery `/projeler/kapali-alan-led-sahne-kurulumu` using `CaseGallery`.
  - FAQ `/sss`.
- **English routes (`app/en`)**
  - Home `/en` mirrors Turkish home: uses `CorporateEvents` and deferred sections (`ServicesTabsDeferred`, `ProjectsGalleryDeferred`, `FaqDeferred`).
  - Services `/en/services` and `/en/projects` use localized copy without extra components; `/en/about` and `/en/contact` are static content pages.
  - Detail services `/en/stage-rental`, `/en/sound-light-rental`, `/en/led-screen-rental`, `/en/tent-rental`, `/en/table-chair-rental` with breadcrumb JSON-LD.
  - `/en/faq` for English FAQ list.
- **Arabic routes (`app/ar`)**
  - Home `/ar` mirrors English/Turkish home but localized copy using `CorporateEvents` and deferred services/projects/FAQ sections.
  - `/ar/services`, `/ar/projects`, `/ar/contact` provide localized lists/forms without custom components.
- **System/other routes:** `app/404.js`, `app/robots.js`, `app/sitemap.js`, `app/llms.txt/route.js`, and API handler `app/api/quote/route.js` have no CSS imports.

## Observations to guide rebuild
- Styling flows through Tailwind utilities plus a small set of shared utilities in `styles/globals.css`; no third-party CSS frameworks are used.
- CSS now loads with the standard Next.js stylesheet request—no inline critical block or deferred loading remains.
- Tailwind content globs target actual source roots (`app`, `components`, `lib`) to keep the generated CSS lean.
