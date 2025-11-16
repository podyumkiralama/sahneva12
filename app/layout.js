// app/layout.js
import "../styles/globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import SkipLinks from "@/components/SkipLinks";

const SITE_URL = "https://www.sahneva.com";
const ORGANIZATION_ID = `${SITE_URL}/#org`;
const ORGANIZATION_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Yenidoğan Mahallesi",
  addressLocality: "Kağıthane",
  addressRegion: "İstanbul",
  postalCode: "34406",
  addressCountry: "TR",
};

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
  "@id": ORGANIZATION_ID,
  name: "Sahneva",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri kiralama hizmetleri",
  address: ORGANIZATION_ADDRESS,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-545-304-8671",
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage: ["Turkish"],
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
  image: `${SITE_URL}/img/logo.png`,
  url: SITE_URL,
  telephone: "+90-545-304-8671",
  address: ORGANIZATION_ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.081,
    longitude: 28.9702,
  },
  priceRange: "$$",
  openingHours: "Mo-Su 09:00-23:00",
  parentOrganization: { "@id": ORGANIZATION_ID },
};

/* ===================== META: VIEWPORT ===================== */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d28d9",
};

/* ===================== META: DEFAULT ===================== */
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
      en: "https://www.sahneva.com/en",
      ar: "https://www.sahneva.com/ar",
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: "Sahne, Podyum, LED Ekran & Ses-Işık Kiralama | Sahneva",
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
  twitter: {
    card: "summary_large_image",
    title: "Sahne, Podyum, LED Ekran & Ses-Işık Kiralama | Sahneva",
    description:
      "Sahne, podyum, LED ekran, ses-ışık ve kurulum hizmetleri. Türkiye geneli.",
    images: ["/img/og.jpg"],
    creator: "@sahneva",
  },
  verification: {
    google: "H9p1RO-W1U3JDTjp0mM32blFkYABaTHNFnxVKKFfo08",
  },
  category: "event services",
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

/* ===================== CRITICAL CSS ===================== */
const criticalCSS = `
.pt-16{padding-top:4rem}
@media (min-width:768px){.md\\:pt-20{padding-top:5rem}}
.full-bleed{position:relative;margin:0 calc(50% - 50vw);width:100vw;min-height:60vh;overflow-x:clip}
@media (min-width:768px){.full-bleed{min-height:70vh}}
.object-cover{object-fit:cover}
.container{max-width:1280px;margin:0 auto;padding:0 1rem}
`;

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || null;
const isProd = process.env.NODE_ENV === "production";

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      xmlLang="tr"
      dir="ltr"
      className={inter.className}
      suppressHydrationWarning
    >
      <head>
        {/* Critical CSS – sadece en gerekli yardımcı sınıflar */}
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{ __html: criticalCSS }}
        />

        {/* DNS Prefetch + Preconnect (yalnızca gerekli domainler) */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* JSON-LD – bloklayıcı olmayan inline scriptler */}
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Script
          id="ld-local"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>

      <body className="min-h-screen bg-white text-neutral-900 antialiased scroll-smooth flex flex-col">
        {/* SKIP LINKS – erişebilirlik */}
        <SkipLinks />

        {children}

        {/* ANALYTICS – sadece prod + ID varsa yükle, gereksiz JS yok */}
        {isProd && GA_MEASUREMENT_ID && (
          <>
            <Script
              id="gtag-lib"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: location.href,
                  transport_type: 'beacon'
                });
              `}
            </Script>
          </>
        )}

        {/* PERFORMANCE OBSERVER – hafif, sadece prod'da çalışsın */}
        {isProd && (
          <Script id="performance-observer" strategy="afterInteractive">
            {`
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  list.getEntries().forEach((entry) => {
                    if (entry.hadRecentInput) return;
                    // CLS / FID loglamak istersen buraya ekleyebilirsin
                  });
                });
                observer.observe({ entryTypes: ['layout-shift', 'first-input'] });
              }
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
