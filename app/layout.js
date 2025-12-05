import "../styles/globals.css";
import { Inter } from "next/font/google";
// 2026 Standardı: View Transitions API entegrasyonu
import { ViewTransitions } from 'next-view-transitions';

import SkipLinks from "@/components/SkipLinks";
import CriticalAssets from "@/components/CriticalAssets";
import DeferredAnalytics from "@/components/DeferredAnalytics.client";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// Font Optimizasyonu: 'swap' ve 'preload' LCP (Largest Contentful Paint) için kritiktir.
const inter = Inter({
  subsets: ["latin", "latin-ext"], // 'arabic' subset'i font dosyasını şişirmemek için gerekliyse ekleyin
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")?? "https://www.sahneva.com";

// JSON-LD Verileri (Değişmedi - İçerik doğru)
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
  const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Sahneva",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri.",
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-545-304-8671",
    contactType: "customer service",
    areaServed: "TR",
    // Burayı DOLDURMAN gerekiyor:
    availableLanguage: ["tr", "en"], // veya ["Turkish", "English"]
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressRegion: "TR34",
    addressCountry: "TR",
  },
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sahne, Podyum & LED Ekran Kiralama | Sahneva",
    template: "%s | Sahneva",
  },
  description: "Türkiye genelinde profesyonel sahne, LED ekran ve ses-ışık sistemleri kiralama. 2 saatte hızlı teklif, uzman teknik ekip.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sahneva - Profesyonel Etkinlik Prodüksiyonu",
    images:,
  },
  // 2026 Standardı: Viewport ve tema ayarları artık metadata objesinde
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5, // Erişilebilirlik: Kullanıcının zoom yapmasını engelleme (WCAG 1.4.4)
  },
};

export default function RootLayout({ children }) {
  return (
    // 'ViewTransitions' API ile sayfalar arası native-like geçişler
    <ViewTransitions>
      <html lang="tr" dir="ltr" className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <body className="min-h-screen bg-white text-neutral-900 scroll-smooth flex flex-col selection:bg-blue-100 selection:text-blue-900">
          
          {/* A11y: Klavye kullanıcıları için ana içeriğe atlama bağlantısı */}
          <SkipLinks />

          {/* Kritik CSS ve preload kaynakları */}
          <CriticalAssets />

          {/* JSON-LD Enjeksiyonu */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />

          {children}

          {/* Analytics: Performansı etkilememesi için deferred/lazy yükleme */}
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
