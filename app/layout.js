// app/layout.js
import "../styles/globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import SkipLinks from "@/components/SkipLinks";

const inter = Inter({
  subsets: ["latin", "latin-ext", "arabic"],
  preload: true,
  display: "swap",
  adjustFontFallback: false,
});

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
    availableLanguage: ["Turkish"],
  },
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
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
  priceRange: "$$",
  openingHours: "Mo-Su 09:00-23:00",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.sahneva.com/#website",
  name: "Sahneva",
  url: "https://www.sahneva.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.sahneva.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
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
    title: "Sahneva – Etkinlik Prodüksiyon & Organizasyon",
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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

const criticalCSS = `
.pt-16{padding-top:4rem}.md\\:pt-20{padding-top:5rem}@media (min-width:768px){.md\\:pt-20{padding-top:5rem}}
.full-bleed{position:relative;margin:0 calc(50% - 50vw);width:100vw;min-height:60vh;overflow-x:clip}
@media (min-width:768px){.full-bleed{min-height:70vh}}.object-cover{object-fit:cover}
.container{max-width:1280px;margin:0 auto;padding:0 1rem}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="tr" dir="ltr" className={inter.className} suppressHydrationWarning>
      <head>
        <style id="critical-css" dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
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
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased scroll-smooth flex flex-col">
        <SkipLinks />
        {GA_MEASUREMENT_ID && (
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
        {children}

        <Script id="performance-observer" strategy="afterInteractive">
          {`
            if ('PerformanceObserver' in window) {
              const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                  if (entry.hadRecentInput) return;

                  if (entry.name === 'first-input') {
                    const fid = entry.processingStart - entry.startTime;
                    if (fid > 100) {
                      console.warn('FID warning:', fid, 'ms');
                    }
                  }

                  if (entry.entryType === 'layout-shift') {
                    if (entry.value > 0.1) {
                      console.warn('CLS warning:', entry.value);
                    }
                  }
                });
              });

              observer.observe({
                entryTypes: ['layout-shift', 'first-input']
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
