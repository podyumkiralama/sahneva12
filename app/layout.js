import "../styles/globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import SkipLinks from "@/components/SkipLinks";
import UtilityBar from "@/components/UtilityBar.client";
import StickyVideoRail from "@/components/StickyVideoRail";

const inter = Inter({
  subsets: ["latin", "latin-ext", "arabic"],
  preload: true,
  display: "swap",
  adjustFontFallback: false,
});

/* ========================= JSON-LD: ORGANIZATION ========================= */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.sahneva.com/#org",
  name: "Sahneva",
  url: "https://www.sahneva.com",
  logo: "https://www.sahneva.com/img/logo.png",
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

/* ========================= JSON-LD: LOCAL BUSINESS ========================= */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.sahneva.com/#localbiz",
  name: "Sahneva",
  image: "https://www.sahneva.com/img/logo.png",
  url: "https://www.sahneva.com",
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

/* ========================= JSON-LD: WEBSITE ========================= */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.sahneva.com/#website",
  url: "https://www.sahneva.com",
  name: "Sahneva",
  inLanguage: "tr-TR",
  publisher: {
    "@id": "https://www.sahneva.com/#org",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.sahneva.com/arama?q={search_term}",
    "query-input": "required name=search_term",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d28d9",
};

export const metadata = {
  metadataBase: new URL("https://www.sahneva.com"),
  title: {
    default: "Sahne, Podyum, LED Ekran & Ses-Işık Kiralama | Sahneva",
    template: "%s | Sahneva",
  },
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat. Hemen teklif alın!",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.sahneva.com",
    languages: {
      "tr-TR": "https://www.sahneva.com",
      en: "https://www.sahneva.com/en",
      ar: "https://www.sahneva.com/ar",
      "x-default": "https://www.sahneva.com",
    },
  },
  openGraph: {
    title: "Sahneva – Etkinlik Prodüksiyon & Organizasyon",
    description:
      "Sahne, podyum, LED ekran, ses-ışık ve kurulum hizmetleri. Türkiye geneli.",
    url: "https://www.sahneva.com",
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

const criticalCSS = `
.pt-16{padding-top:4rem}
@media (min-width:768px){.md\\:pt-20{padding-top:5rem}}
.full-bleed{position:relative;margin:0 calc(50% - 50vw);width:100vw;min-height:60vh;overflow-x:clip}
@media (min-width:768px){.full-bleed{min-height:70vh}}
.object-cover{object-fit:cover}
.container{max-width:1280px;margin:0 auto;padding:0 1rem}
`;

const DEFAULT_GA_MEASUREMENT_ID = "G-J5YK10YLLC";
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;
const isProd = process.env.NODE_ENV === "production";
const gaEnabled = isProd && Boolean(GA_MEASUREMENT_ID);

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      dir="ltr"
      className={inter.className}
      suppressHydrationWarning
    >
      <head>
        {/* Critical CSS */}
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{ __html: criticalCSS }}
        />
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased scroll-smooth flex flex-col">
        <SkipLinks />
        <StickyVideoRail />
        <UtilityBar />

        {children}

        {/* GLOBAL SCHEMA (JSON-LD) */}
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

        {/* GA4 */}
        {gaEnabled && (
          <>
            <Script
              id="ga4-lib"
              data-ga-id={GA_MEASUREMENT_ID}
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              src="/ga-init.js"
              strategy="afterInteractive"
              data-ga-id={GA_MEASUREMENT_ID}
            />
          </>
        )}
      </body>
    </html>
  );
}
