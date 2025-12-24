# OG_NOTE.md — TR Open Graph + Schema Image Notes

## Default OG configuration (TR)
- **Location:** `app/(tr)/layout.js`
- **Defaults:**
  - `openGraph.title`: `HOME_PAGE_TITLE` (includes “Sahneva Organizasyon”)
  - `openGraph.description`: `content.meta.description`
  - `openGraph.url`: canonical `/`
  - `openGraph.siteName`: `Sahneva Organizasyon`
  - `openGraph.type`: `website`
  - `openGraph.images`: `https://www.sahneva.com/img/og/sahneva-og.webp` (1200×630)
  - `twitter.card`: `summary_large_image` + same image

## Pages updated / fixed
- **OG image URL fixes (absolute + existing):**
  - `/hakkimizda`, `/iletisim`, `/hizmetler`, `/projeler`, `/projeler/kapali-alan-led-sahne-kurulumu`
  - `/sahne-kiralama`, `/led-ekran-kiralama`, `/podyum-kiralama`, `/ses-isik-sistemleri`, `/truss-kiralama`, `/cadir-kiralama`, `/masa-sandalye-kiralama`, `/kurumsal-organizasyon`
  - `/blog`, `/blog/kurumsal-etkinlik-yonetimi`, `/blog/led-ekran-teknoloji-trendleri-2026`
  - `/gizlilik-politikasi`

- **OG title fixes (brand required):**
  - All TR pages with custom `openGraph.title` now include “Sahneva Organizasyon”.

- **Schema image additions:**
  - `Hakkımızda`, `İletişim`, `Hizmetler`, `Gizlilik Politikası` WebPage/ContactPage/Service schemas now include `image`.
  - `Projeler` now includes a WebPage schema with `image`.
  - `Kapalı Alan LED & Sahne Kurulumu` adds an Article schema with `image`.

## Consistency choices
- **Single OG image** (`/img/og/sahneva-og.webp`) used across TR pages to avoid missing assets and enforce 1200×630 size.
- **Service/Article schema images** remain content-relevant (service/product or blog hero images) and are absolute URLs.

## Intentional exceptions
- No new OG assets created; only existing brand OG image is used.
- Pages without per-page twitter metadata fall back to layout defaults.
