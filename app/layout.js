// app/layout.jsx
import "../styles/globals.css";
import { Inter } from "next/font/google";

import SkipLinks from "@/components/SkipLinks";
import CriticalAssets from "@/components/CriticalAssets";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";
import DeferredAnalytics from "@/components/DeferredAnalytics.client";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import HeadLinkLoader from "@/components/HeadLinkLoader.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import UtilityBar from "@/components/UtilityBar.client";
import Navbar from "@/components/Navbar";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import Footer from "@/components/Footer";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import {
  HOME_PAGE_TITLE,
  SITE_URL,
  buildAlternateLanguages,
  buildCanonical,
  getOgImageUrl,
} from "@/lib/seo/seoConfig";

const inter = Inter({
  subsets: ["latin", "latin-ext", "arabic"],
  preload: true,
  display: "swap",
  adjustFontFallback: false,
});

const DEFAULT_LOCALE = LOCALE_CONTENT.tr;
const DEFAULT_LANG = "tr";
const DEFAULT_DIR = DEFAULT_LOCALE.direction;

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
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-545-304-8671",
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage: ["Turkish", "English", "Arabic"],
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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gaEnabled = Boolean(GA_MEASUREMENT_ID);

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  const alternateLanguages = buildAlternateLanguages();
  const canonicalHref = buildCanonical("/");

  return (
    <html
      lang={DEFAULT_LANG}
      dir={DEFAULT_DIR}
      className={inter.className}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>

        <title>{HOME_PAGE_TITLE}</title>
        <meta
          name="description"
          content="Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat. Hemen teklif alın!"
        ></meta>
        <meta name="application-name" content="Sahneva Organizasyon"></meta>
        <meta name="theme-color" content="#6d28d9"></meta>

        <link rel="canonical" href={canonicalHref}></link>
        <link
          rel="alternate"
          hrefLang="tr-TR"
          href={canonicalHref}
        ></link>
        <link
          rel="alternate"
          hrefLang="en"
          href={alternateLanguages.en}
        ></link>
        <link
          rel="alternate"
          hrefLang="ar"
          href={alternateLanguages.ar}
        ></link>
        <link
          rel="alternate"
          hrefLang="x-default"
          href={canonicalHref}
        ></link>

        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png"></link>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png"></link>
        <link
          rel="icon"
          href="/android-chrome-192x192.png"
          sizes="192x192"
          type="image/png"
        ></link>
        <link
          rel="icon"
          href="/android-chrome-512x512.png"
          sizes="512x512"
          type="image/png"
        ></link>
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
          type="image/png"
        ></link>
        <link rel="manifest" href="/manifest.json"></link>

        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content={SITE_URL}></meta>
        <meta
          property="og:title"
          content="Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon"
        ></meta>
        <meta
          property="og:description"
          content="Kurumsal etkinlikler, konserler, festivaller ve lansmanlar için sahne, podyum, LED ekran, ses-ışık ve çadır kiralama çözümleri."
        ></meta>
        <meta property="og:site_name" content="Sahneva Organizasyon"></meta>
        <meta property="og:image" content={getOgImageUrl()}></meta>
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="630"></meta>
        <meta
          property="og:image:alt"
          content="Sahneva profesyonel açık hava sahne, LED ekran ve ışık kurulumu"
        ></meta>

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta
          name="twitter:title"
          content="Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon"
        ></meta>
        <meta
          name="twitter:description"
          content="Profesyonel etkinlik prodüksiyon çözümleri. Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama."
        ></meta>
        <meta name="twitter:image" content={getOgImageUrl()}></meta>

        {/* Kritik preload/prefetch varlıkları */}
        <CriticalAssets />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased flex flex-col">
        {/* SkipLinks: erişilebilirlik için üstte */}
        <SkipLinks />
        <DocumentDirection lang={DEFAULT_LANG} dir={DEFAULT_DIR} />
        <NewTabAccessibility />

        <HeadLinkLoader />

        {/* Kritik olmayan cilalı stiller: render-blocking olmadan yüklenir */}
        <NonCriticalStylesheet />

        {/* JSON-LD: Organization & Website (body içinde olması sorun değil) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        ></script>

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
          role="main"
          aria-label="Sahneva ana içerik"
          tabIndex={-1}
          className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
        >
          <div className="overflow-x-hidden">{children}</div>
        </main>

        <footer
          id="_main_footer"
          role="contentinfo"
          aria-label="Sahneva site altbilgi"
          className="w-full"
        >
          <Footer />
        </footer>

        <DeferredSpeedInsights />

        {gaEnabled && (
          <>
            <DeferredAnalytics gaId={GA_MEASUREMENT_ID} />
            <AnalyticsTracker gaId={GA_MEASUREMENT_ID} />
          </>
        )}
      </body>
    </html>
  );
}
