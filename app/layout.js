// app/layout.jsx
import "../styles/globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";

import SkipLinks from "@/components/SkipLinks";
import CriticalAssets from "@/components/CriticalAssets";

const inter = Inter({
  subsets: ["latin", "latin-ext", "arabic"],
  preload: true,
  display: "swap",
  adjustFontFallback: false,
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Sahneva",
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Sahneva",
  description:
    "Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri için profesyonel etkinlik prodüksiyon çözümleri.",
  inLanguage: "tr-TR",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon",
    template: "%s | Sahneva",
  },
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık ve çadır kiralama. Profesyonel teknik ekip, hızlı kurulum ve uygun fiyatlarla etkinlik prodüksiyon çözümleri.",
  applicationName: "Sahneva",
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
    type: "website",
    url: SITE_URL,
    title:
      "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon",
    description:
      "Kurumsal etkinlikler, konserler, festivaller ve lansmanlar için sahne, podyum, LED ekran, ses-ışık ve çadır kiralama çözümleri.",
    siteName: "Sahneva",
    images: [
      {
        url: `${SITE_URL}/img/og/hero-og.webp`,
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
    images: [`${SITE_URL}/img/og/hero-og.webp`],
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gaEnabled = Boolean(GA_MEASUREMENT_ID);

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

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {/* GA bağlantıları */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>

      <body className="min-h-screen bg-white text-neutral-900 antialiased scroll-smooth flex flex-col">
        <SkipLinks />
        {children}

        {gaEnabled && (
          <>
            <Script
              id="ga4-lib"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
