// components/layouts/TurkishLayout.jsx (veya app/layout.jsx)
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UtilityBar from "../../components/UtilityBar.client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

/* ================== SABİTLER ================== */
const ORIGIN = "https://www.sahneva.com";
const CONTACT = {
  phone: "+905453048671",
  email: "info@sahneva.com",
  address: "İstanbul, Türkiye" // Tam adres varsa buraya eklenmeli
};

/* ================== ROOT SCHEMA (Ana Kök) ================== */
// Bu şema tüm sayfalarda 'provider' veya 'author' olarak referans verilecek
function RootJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/#org`, // DİKKAT: Diğer sayfalardaki ID ile aynı olmalı
        "name": "Sahneva",
        "url": ORIGIN,
        "logo": {
          "@type": "ImageObject",
          "url": `${ORIGIN}/img/logo.png`,
          "width": 112,
          "height": 112
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": CONTACT.phone,
          "contactType": "customer service",
          "areaServed": "TR",
          "availableLanguage": "Turkish"
        },
        "sameAs": [
          "https://www.instagram.com/sahneva",
          "https://www.facebook.com/sahneva",
          "https://www.linkedin.com/company/sahneva"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        "url": ORIGIN,
        "name": "Sahneva",
        "publisher": { "@id": `${ORIGIN}/#org` },
        "inLanguage": "tr-TR"
      }
    ]
  };

  return (
    <Script
      id="root-json-ld"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function TurkishLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900">
      {/* ERİŞİLEBİLİRLİK: Skip Link 
        Klavye kullanıcılarının menüyü atlayıp içeriğe geçmesini sağlar.
      */}
      <a
        href="#_main_content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-6 focus:py-3 focus:bg-white focus:text-blue-700 focus:font-bold focus:shadow-xl focus:rounded-xl focus:ring-4 focus:ring-blue-300 transition-all"
      >
        Ana içeriğe atla
      </a>

      {/* GLOBAL SCHEMA */}
      <RootJsonLd />

      <header
        id="_main_header"
        className="w-full relative z-40" // Z-index eklendi (Menü içerik altında kalmasın)
        role="banner"
      >
        <UtilityBar />
        <Navbar />
      </header>

      {/* ÖNEMLİ DEĞİŞİKLİK: 'pt-6' kaldırıldı.
        Neden? Blog ve Podyum sayfalarında 'Hero' (tam ekran görsel) kullanıyorsun.
        Buradaki padding o görsellerin üzerinde beyaz boşluk bırakır.
        Padding ihtiyacı olan sayfalar kendi içlerinde 'py-6' veya 'container' kullanmalı.
      */}
      <main
        id="_main_content"
        tabIndex={-1}
        className="flex-1 focus:outline-none scroll-mt-24" // focus-ring yerine outline-none (tarayıcı varsayılanını bozmuyoruz ama stilliyoruz), scroll-mt header payı için
        role="main"
      >
        {children}
      </main>

      <Footer />
      
      {/* Analytics */}
      <SpeedInsights />
    </div>
  );
}
