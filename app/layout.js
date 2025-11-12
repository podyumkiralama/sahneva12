// app/layout.js
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

// UtilityBar import - ihtiyaca göre seçim yapın
import UtilityBar from "../components/UtilityBar.client";
// import UtilityBar from "../components/UtilityBar";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
  keywords: "sahne kiralama, podyum kiralama, led ekran kiralama, ses ışık sistemi, etkinlik prodüksiyon, organizasyon",
  manifest: "/site.webmanifest",
  alternates: { canonical: "https://www.sahneva.com" },
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
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
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

export default function RootLayout({ children }) {
  return (
    <html lang="tr" dir="ltr" className={inter.className} suppressHydrationWarning>
      <head>
        {/* Kritik CSS - skip link için gerekli stiller */}
        <style id="critical-css">{`
          .pt-16{padding-top:4rem}
          @media (min-width:768px){.md\\:pt-20{padding-top:5rem}}
          .full-bleed{position:relative;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);inline-size:100svw;width:100vw;min-height:60vh;overflow-x:clip}
          @media (min-width:768px){.full-bleed{min-height:70vh}}
          .object-cover{object-fit:cover}
          .container{max-width:1280px;margin-inline:auto;padding-inline:1rem}
          
          /* Skip link için kritik stiller */
          .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #6d28d9;
            color: white;
            padding: 12px 16px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            transition: top 0.3s ease;
          }
          .skip-link:focus {
            top: 6px;
            outline: 2px solid white;
            outline-offset: 2px;
          }
        `}</style>
        
        {/* Favicon ve app icon linkleri */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>

      <body className="min-h-screen bg-white text-neutral-900 antialiased scroll-smooth">
        {/* Google Analytics */}
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
                  anonymize_ip: true,
                  page_title: document.title,
                  page_location: window.location.href
                });
              `}
            </Script>
          </>
        )}

        {/* TEK Skip Link - Layout'ta */}
        <a href="#main-content" className="skip-link">
          Ana içeriğe atla
        </a>

        <UtilityBar />
        <Navbar />

        {/* Ana içerik - UNIQUE ID */}
        <main
          id="main-content"
          role="main"
          tabIndex={-1}
          className="pt-16 md:pt-20 mb-24 lg:mb-0 focus:outline-none"
        >
          {children}
        </main>

        <Footer />
        <SpeedInsights />

        {/* JSON-LD Structured Data */}
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sahneva",
              url: "https://www.sahneva.com",
              logo: "https://www.sahneva.com/img/logo.png",
              description: "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama hizmetleri",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+90-545-304-8671",
                  contactType: "customer service",
                  areaServed: "TR",
                  availableLanguage: ["Turkish"],
                },
              ],
              sameAs: [
                "https://www.instagram.com/sahnevaorganizasyon",
                "https://www.youtube.com/@sahneva",
                "https://g.page/r/CZhkMzkNOdgnEBI",
              ],
            }),
          }}
        />

        <Script
          id="ld-local"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Sahneva",
              image: "https://www.sahneva.com/img/logo.png",
              url: "https://www.sahneva.com",
              telephone: "+90-545-304-8671",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Hamidiye, Anadolu Cd. 61 a",
                addressLocality: "Kağıthane",
                addressRegion: "İstanbul",
                postalCode: "34400",
                addressCountry: "TR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 41.0810,
                longitude: 28.9702
              },
              sameAs: [
                "https://www.instagram.com/sahnevaorganizasyon",
                "https://www.youtube.com/@sahneva",
                "https://g.page/r/CZhkMzkNOdgnEBI",
              ],
              priceRange: "$$",
              openingHours: "Mo-Su 09:00-23:00",
              areaServed: "Türkiye",
            }),
          }}
        />

        <Script
          id="ld-faq"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Podyum kurulumu ne kadar sürer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Podyum kurulumu, ölçülere ve zemin koşullarına göre genellikle 1–3 saat sürer. Büyük ölçekli kurulumlarda bu süre artabilir.",
                  },
                },
                {
                  "@type": "Question",
                  name: "LED ekranlar dış mekanda kullanılabilir mi?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, IP65 korumalı LED ekranlarımız açık havada güvenle kullanılabilir. Yağmur ve toza karşı tam koruma sağlar.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Ses ve ışık sistemlerinde teknik ekip sağlıyor musunuz?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, kurulum ve etkinlik boyunca teknik ekip desteği veriyoruz. Profesyonel ses ve ışık operatörleri ekibimiz bulunmaktadır.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Çadır kiralamada kurulum ve söküm dahil mi?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, kurulum ve söküm dahildir; zemin kaplama, aydınlatma ve diğer aksesuarlar opsiyonel olarak eklenebilir.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Website Schema */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sahneva",
              url: "https://www.sahneva.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.sahneva.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
