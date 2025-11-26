// app/layout.jsx
import "../styles/globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import SkipLinks from "@/components/SkipLinks";

// Font yapılandırması
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  // Preload true varsayılandır, LCP için önemlidir.
  preload: true,
});

/* ========================= JSON-LD DATA ========================= */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.sahneva.com/#org",
  name: "Sahneva",
  url: "https://www.sahneva.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.sahneva.com/img/logo.png",
    width: 192,
    height: 60
  },
  description: "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri kiralama hizmetleri",
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "23:00",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.sahneva.com/#website",
  url: "https://www.sahneva.com",
  name: "Sahneva",
  inLanguage: "tr-TR",
  publisher: { "@id": "https://www.sahneva.com/#org" },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.sahneva.com/arama?q={search_term}",
    "query-input": "required name=search_term",
  },
};

/* ===================== META CONFIG ===================== */
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
  description: "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat.",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.sahneva.com",
    languages: {
      "tr-TR": "https://www.sahneva.com",
      "x-default": "https://www.sahneva.com",
    },
  },
  openGraph: {
    title: "Sahneva – Etkinlik Prodüksiyon & Organizasyon",
    description: "Sahne, podyum, LED ekran, ses-ışık ve kurulum hizmetleri. Türkiye geneli.",
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
    description: "Sahne, podyum, LED ekran, ses-ışık ve kurulum hizmetleri.",
    images: ["/img/og.jpg"],
    creator: "@sahneva",
  },
  verification: {
    google: "H9p1RO-W1U3JDTjp0mM32blFkYABaTHNFnxVKKFfo08",
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

const DEFAULT_GA_MEASUREMENT_ID = "G-J5YK10YLLC";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;
const isProd = process.env.NODE_ENV === "production";

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      dir="ltr"
      className={`${inter.variable} font-sans`}
      suppressHydrationWarning // Bu sadece html tagindeki attribute mismatch'i gizler
    >
      <head>
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, localBusinessJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      
      {/* DÜZELTME: 'min-h-screen' ve 'flex' yapısı korundu.
         font-sans class'ı Tailwind ile inter fontunu body'ye uygular.
      */}
      <body className="min-h-screen bg-white text-neutral-900 antialiased font-sans flex flex-col">
        
        {/* SkipLinks erişilebilirlik içindir, DOM'un en tepesinde olmalı */}
        <SkipLinks />

        {/* Ana içerik kapsayıcısı - Footer sticky olacaksa buraya flex-1 eklemek iyidir */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* GA4 Script Optimasyonu: lazyOnload kullanıldı */}
        {isProd && GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload" 
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: location.href,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
