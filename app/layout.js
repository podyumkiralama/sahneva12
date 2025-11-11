// app/layout.js
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { inter } from "../lib/fonts";

// 1) UtilityBar import: .client sürümün VARSA bu satırı kullan
import UtilityBar from "../components/UtilityBar.client";
// 1a) .client sürümün YOKSA alttakini aç, yukarıdakini sil/yorumla:
// import UtilityBar from "../components/UtilityBar";

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
  manifest: "/site.webmanifest",
  alternates: { canonical: "https://www.sahneva.com" },
  openGraph: {
    title: "Sahneva – Etkinlik Prodüksiyon & Organizasyon",
    description:
      "Sahne, podyum, LED ekran, ses-ışık ve kurulum hizmetleri. Türkiye geneli.",
    url: "https://www.sahneva.com",
    siteName: "Sahneva",
    images: ["/img/og.jpg"],
    type: "website",
  },
  robots: { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
    title: "Sahneva – Etkinlik Prodüksiyon & Organizasyon",
    description:
      "Sahne, podyum, LED ekran, ses-ışık ve kurulum hizmetleri. Türkiye geneli.",
    images: ["/img/og.jpg"],
    creator: "@sahneva",
  },
  verification: { google: "H9p1RO-W1U3JDTjp0mM32blFkYABaTHNFnxVKKFfo08" },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

export default function RootLayout({ children }) {
  return (
    <html lang="tr" dir="ltr" className={`${inter.className} ${inter.variable}`}>
      <head>
        {/* İstersen sonra globals.css'e taşıyabiliriz */}
        <style id="critical-css">{`
          .pt-16{padding-top:4rem}
          @media (min-width:768px){.md\\:pt-20{padding-top:5rem}}
          .full-bleed{position:relative;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);inline-size:100svw;width:100vw;min-height:60vh;overflow-x:clip}
          @media (min-width:768px){.full-bleed{min-height:70vh}}
          .object-cover{object-fit:cover}
          .container{max-width:1280px;margin-inline:auto;padding-inline:1rem}
        `}</style>
      </head>

      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {/* GA sadece ID varsa yüklenir */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              id="gtag-lib"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        {/* Tek skip link */}
        <a
          href="#main-content"
          aria-label="Ana içeriğe hızlı geçiş"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[9999] focus:top-3 focus:left-3 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-3 focus:rounded-lg focus:font-semibold focus:shadow-lg transition"
        >
          Ana içeriğe atla
        </a>

        <UtilityBar />
        <Navbar />

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

        {/* JSON-LD: Organization */}
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
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+90 545 304 8671",
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

        {/* JSON-LD: LocalBusiness */}
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
              telephone: "+90 545 304 8671",
              address: {
                "@type": "PostalAddress",
                addressLocality: "İstanbul",
                addressCountry: "TR",
              },
              sameAs: [
                "https://www.instagram.com/sahnevaorganizasyon",
                "https://www.youtube.com/@sahneva",
                "https://g.page/r/CZhkMzkNOdgnEBI",
              ],
              priceRange: "$$",
              openingHours: "Mo-Fr 09:00-19:00",
            }),
          }}
        />

        {/* JSON-LD: FAQ */}
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
                    text: "Podyum kurulumu, ölçülere ve zemin koşullarına göre genellikle 1–3 saat sürer.",
                  },
                },
                {
                  "@type": "Question",
                  name: "LED ekranlar dış mekanda kullanılabilir mi?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, IP65 korumalı LED ekranlarımız açık havada güvenle kullanılabilir.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Ses ve ışık sistemlerinde teknik ekip sağlıyor musunuz?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, kurulum ve etkinlik boyunca teknik ekip desteği veriyoruz.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Çadır kiralamada kurulum ve söküm dahil mi?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, kurulum ve söküm dahildir; zemin kaplama ve aksesuarlar opsiyoneldir.",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
