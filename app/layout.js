import "../styles/globals.css";
import { Inter } from "next/font/google";
// 2026 Standardı: Native benzeri sayfa geçişleri için Provider
import { ViewTransitions } from 'next-view-transitions';

import SkipLinks from "@/components/SkipLinks";
import CriticalAssets from "@/components/CriticalAssets";
import DeferredAnalytics from "@/components/DeferredAnalytics.client";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// Performans: Font yüklemesi sırasında düzen kaymasını (CLS) önler
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

/* ================== JSON-LD: ORGANIZATION ================== */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Sahneva Organizasyon",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/img/logo.png`,
    width: 112,
    height: 112
  },
  description: "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri sunan profesyonel etkinlik prodüksiyon markası.",
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-545-304-8671",
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage:,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressRegion: "TR34",
    addressCountry: "TR",
  },
};

/* ================== METADATA & VIEWPORT ================== */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sahne, Podyum & LED Ekran Kiralama | Sahneva",
    template: "%s | Sahneva",
  },
  description: "Türkiye genelinde profesyonel sahne, LED ekran ve ses-ışık sistemleri kiralama. Hızlı kurulum, teknik ekip ve %100 müşteri memnuniyeti.",
  applicationName: "Sahneva",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sahneva - Profesyonel Etkinlik Prodüksiyonu",
    description: "Kurumsal etkinlikler, konserler ve festivaller için teknik çözüm ortağınız.",
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

// WCAG 2.2 AAA: Kullanıcının zoom yapmasını engellememek (maximumScale: 5)
export const viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, 
};

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="tr" dir="ltr" className={`${inter.variable} antialiased scroll-smooth`} suppressHydrationWarning>
        <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
          
          {/* A11Y: Klavye kullanıcıları için içeriğe hızlı atlama */}
          <SkipLinks />

          {/* Kritik CSS ve preload kaynakları */}
          <CriticalAssets />

          {/* JSON-LD Enjeksiyonu */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />

        <main id="main-content" className="flex-grow">
          {children}
        </main>

          {/* Analytics: Performansı etkilememesi için gecikmeli yükleme */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <DeferredAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
              <AnalyticsTracker gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
            </>
          )}
        </body>
      </html>
    </ViewTransitions>
  );
}
