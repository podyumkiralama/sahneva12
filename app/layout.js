// app/layout.jsx
import "../styles/globals.css";
import { Inter } from "next/font/google";

import SkipLinks from "@/components/SkipLinks";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import UtilityBar from "@/components/UtilityBar.client";
import Navbar from "@/components/Navbar";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import Footer from "@/components/Footer";
import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";

import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import {
  HOME_PAGE_TITLE,
  SITE_URL,
  buildAlternateLanguages,
  buildCanonical,
  getOgImageUrl,
} from "@/lib/seo/seoConfig";

// ✅ next/font: variable + CLS minimize
const inter = Inter({
  subsets: ["latin", "latin-ext", "arabic"],
  preload: true,
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-inter",
});

const DEFAULT_LOCALE = LOCALE_CONTENT.tr;
const DEFAULT_LANG = "tr";
const DEFAULT_DIR = DEFAULT_LOCALE.direction;

/* ================== VIEWPORT ================== */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d28d9",
};

/* ================== METADATA ================== */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_PAGE_TITLE,
    template: "%s | Sahneva Organizasyon",
  },
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat. Hemen teklif alın!",
  applicationName: "Sahneva Organizasyon",
  alternates: {
    canonical: buildCanonical("/"),
    languages: {
      tr: buildCanonical("/"),
      ...buildAlternateLanguages(),
      "x-default": buildCanonical("/"),
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title:
      "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon",
    description:
      "Kurumsal etkinlikler, konserler, festivaller ve lansmanlar için sahne, podyum, LED ekran, ses-ışık ve çadır kiralama çözümleri.",
    siteName: "Sahneva Organizasyon",
    images: [
      {
        url: getOgImageUrl(),
        width: 1200,
        height: 630,
        alt: "Sahneva profesyonel açık hava sahne, LED ekran ve ışık kurulumu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon",
    description:
      "Profesyonel etkinlik prodüksiyon çözümleri. Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama.",
    images: [getOgImageUrl()],
  },
};

/* ================== JSON-LD: ORGANIZATION ================== */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Sahneva Organizasyon",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri sunan profesyonel etkinlik prodüksiyon markası.",
  // İstersen gerçek vergi / MERSİS numaranla güncelle veya bu satırı silebilirsin
  vatID: "TR1234567890",
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-545-304-8671",
    contactType: "customer service",
    areaServed: ["TR"],
    availableLanguage: ["tr", "en", "ar"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressRegion: "TR34",
    addressCountry: "TR",
  },
};

/* ================== JSON-LD: WEBSITE ================== */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Sahneva Organizasyon",
  description:
    "Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri için profesyonel etkinlik prodüksiyon çözümleri.",
  inLanguage: "tr-TR",
};

/* ================== JSON-LD: LOCALBUSINESS (YEREL SEO) ================== */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#local`,
  name: "Sahneva Organizasyon",
  url: SITE_URL,
  telephone: "+90-545-304-8671",
  image: `${SITE_URL}/img/logo.png`,
  priceRange: "₺₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Anadolu Caddesi No:61A, Hamidiye Mahallesi",
    addressLocality: "Kağıthane",
    addressRegion: "İstanbul",
    postalCode: "34400",
    addressCountry: "TR",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Türkiye",
  },
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
  ],
};

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  return (
    <html
      lang={DEFAULT_LANG}
      dir={DEFAULT_DIR}
      className={`${inter.className} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>{/* Ek head hack'i yok; her şeyi Metadata API yönetiyor */}</head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased flex flex-col font-sans">
        {/* Erişilebilirlik & i18n */}
        <SkipLinks />
        <DocumentDirection lang={DEFAULT_LANG} dir={DEFAULT_DIR} />
        <NewTabAccessibility />

        {/* Non-critical CSS (scrollbar, animasyon, nc-* class'ları) */}
        <NonCriticalStylesheet />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />

        <header
          id="_main_header"
          role="banner"
          aria-label="Sahneva site başlığı ve ana gezinme"
          className="w-full relative z-50"
        >
          <UtilityBar />
          <Navbar />
          <StickyVideoRailclient />
        </header>

        <main
          id="_main_content"
          aria-label="Sahneva ana içerik"
          tabIndex={-1}
          className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
        >
          <div className="overflow-x-hidden">{children}</div>
        </main>

        <Footer ariaLabel="Sahneva site altbilgi" descriptionId="_main_footer" />

        {/* Core Web Vitals izleme */}
        <DeferredSpeedInsights />

        {/* GA4 + Consent Mode V2 */}
        <AnalyticsConsentWrapper />
      </body>
    </html>
  );
}
