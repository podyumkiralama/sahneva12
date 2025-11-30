// app/layout.jsx
import "../styles/globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import SkipLinks from "@/components/SkipLinks";
import UtilityBar from "@/components/UtilityBar.client";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import CriticalAssets from "@/components/CriticalAssets";

// ================== FONT ==================
const inter = Inter({
  subsets: ["latin", "latin-ext", "arabic"],
  preload: true,
  display: "swap",
  adjustFontFallback: false,
});

// ================== SITE URL ==================
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : "https://www.sahneva.com";

// ================== JSON-LD VERİLERİ ==================
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Sahneva",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri kiralama hizmetleri",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-545-304-8671",
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage: ["tr"],
  },
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbiz`,
  name: "Sahneva",
  image: `${SITE_URL}/img/logo.png`,
  url: SITE_URL,
  telephone: "+90-545-304-8671",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kağıthane",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.081,
    longitude: 28.9702,
  },
  priceRange: "₺₺",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "23:00",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Sahneva",
  inLanguage: "tr-TR",
  publisher: {
    "@id": `${SITE_URL}/#org`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/arama?q={search_term}`,
    "query-input": "required name=search_term",
  },
};

// ================== VIEWPORT ==================
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d28d9",
};

// ================== METADATA ==================
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sahne, Podyum, LED Ekran & Ses-Işık Kiralama | Sahneva",
    template: "%s | Sahneva",
  },
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat. Hemen teklif alın!",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "tr-TR": SITE_URL,
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: "Sahneva – Etkinlik Prodüksiyon & Organizasyon",
    description:
      "Sahne, podyum, LED ekran, ses-ışık ve kurulum hizmetleri. Türkiye geneli.",
    url: SITE_URL,
    siteName: "Sahneva",
    images: [
      {
        url: "/img/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sahneva Etkinlik Prodüksiyon",
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

// ================== CRITICAL CSS ==================
const criticalCSS = `
.pt-16{padding-top:4rem}
@media (min-width:768px){.md\\:pt-20{padding-top:5rem}}
.full-bleed{position:relative;margin:0 calc(50% - 50vw);width:100vw;min-height:60vh;overflow-x:clip}
@media (min-width:768px){.full-bleed{min-height:70vh}}
.object-cover{object-fit:cover}
.container{max-width:1280px;margin:0 auto;padding:0 1rem}
`;

// ================== GA4 AYARLARI ==================
const DEFAULT_GA_MEASUREMENT_ID = "G-J5YK10YLLC";
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;
const isProd = process.env.NODE_ENV === "production";
const gaEnabled = isProd && Boolean(GA_MEASUREMENT_ID);

// ================== ROOT LAYOUT ==================
export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      dir="ltr"
      className={inter.className}
      suppressHydrationWarning
    >
      <head>
        <CriticalAssets />
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{ __html: criticalCSS }}
        />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased scroll-smooth flex flex-col">
        <DocumentDirection lang={locale} dir={direction} />
        {/* Erişilebilirlik: "Skip to Content" linki */}
        <SkipLinks />

        <UtilityBar />
        <header
          id="_main_header"
          aria-label="Sahneva site başlığı"
          role="banner"
          className="w-full relative z-50"
        >
          <StickyVideoRailclient />
        </header>

        {/* ANA İÇERİK LANDMARK (WCAG için <main>) */}
        <main
          id="_main_content"
          role="main"
          aria-label="Sahneva ana içerik bölgesi"
          tabIndex={-1}
          className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
        >
          <div className="overflow-x-hidden">{children}</div>
        </main>

        {/* GLOBAL JSON-LD SCHEMA */}
        <script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          id="ld-local"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {/* Google Analytics 4 */}
        {gaEnabled && (
          <>
            <Script
              id="ga4-lib"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
