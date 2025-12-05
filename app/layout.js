// app/layout.jsx
import "../styles/globals.css";
import { Inter } from "next/font/google";

import SkipLinks from "@/components/SkipLinks";
import CriticalAssets from "@/components/CriticalAssets";
import DeferredAnalytics from "@/components/DeferredAnalytics.client";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  // Performans: Font yüklenirken layout shift'i önlemek için size-adjust
  adjustFontFallback: true, 
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

/* ================== SCHEMA.ORG: RICH SNIPPETS ================== */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Sahneva Organizasyon",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/img/logo.png`,
    width: 192,
    height: 192,
    caption: "Sahneva Logo"
  },
  description: "Türkiye genelinde profesyonel sahne, LED ekran ve teknik prodüksiyon hizmetleri.",
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
    "https://www.linkedin.com/company/sahneva"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-545-304-8671",
    contactType: "customer support",
    areaServed: "TR",
    // BCP-47 dil kodları: schema.org uyumu ve arama motorları için
    availableLanguage: ["tr", "en", "ar"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressRegion: "TR34",
    addressCountry: "TR"
  },
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sahne, Podyum & LED Ekran Kiralama | Sahneva",
    template: "%s | Sahneva",
  },
  description: "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri kiralama. Hızlı kurulum, 2 saatte teklif garantisi ve %100 müşteri memnuniyeti.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sahneva - Profesyonel Etkinlik Prodüksiyonu",
    description: "Kurumsal ve açık hava etkinlikleriniz için A'dan Z'ye teknik çözüm.",
    siteName: "Sahneva",
    locale: "tr_TR",
    images: [
      {
        url: `${SITE_URL}/og/dene.jpg`,
        width: 1200,
        height: 630,
        alt: "Sahneva profesyonel sahne ve LED ekran kurulumu",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // WCAG 1.4.4: Zoom engellenmemeli
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" dir="ltr" className={`${inter.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">

        {/* A11Y: Klavye kullanıcıları için içerik atlama */}
        <SkipLinks />

        {/* Performans: Kritik kaynaklar (fontlar, css) */}
        <CriticalAssets />

        {/* JSON-LD Verileri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <main id="main-content" className="flex-grow">
          {children}
        </main>

        {/* Analytics: Main thread'i bloklamamak için deferred yükleme */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <DeferredAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
            <AnalyticsTracker gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          </>
        )}
      </body>
    </html>
  );
}
