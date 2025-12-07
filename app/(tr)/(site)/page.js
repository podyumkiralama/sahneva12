// app/(tr)/(site)/page.js
import React from "react";

// —————————————————————————————————————————
// BİLEŞENLER (COMPONENTS)
// —————————————————————————————————————————

// Statik / Server Bileşenler
import HeroSection from "@/components/HeroSection";
import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";
import WhyChooseUs from "@/components/WhyChooseUs";
import TechCapabilities from "@/components/TechCapabilities";

// Client / Lazy Load Bileşenler
import {
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

// —————————————————————————————————————————
// YAPILANDIRMA
// —————————————————————————————————————————

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

// Ekranın alt kısımları için performans optimizasyonu
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "1px 800px",
});

// ISR süresi
export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (Schema.org) - SEO VERİLERİ
// —————————————————————————————————————————

function StructuredData() {
  const HOME_URL = SITE_URL;
  const ORGANIZATION_ID = `${SITE_URL}/#org`;
  const WEBSITE_ID = `${SITE_URL}/#website`;
  const WEBPAGE_ID = `${SITE_URL}/#webpage`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: HOME_URL,
        name: "Sahne Sistemleri, LED Ekran, Ses-Işık Kiralama | Türkiye Geneli | Sahneva",
        description:
          "Sahneva ile profesyonel sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama çözümlerini keşfedin. İstanbul merkezli, Türkiye geneli hızlı kurulum.",
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// —————————————————————————————————————————
// ANA SAYFA (HOME PAGE)
// —————————————————————————————————————————

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <StructuredData />

      {/* 1. HERO BÖLÜMÜ */}
      <HeroSection />

      {/* 2. TEKLİF AL (Anchor Hedefi) */}
      <div id="teklif-al" className="scroll-mt-24" />

      {/* 3. HİZMETLER */}
      <ServicesTabsDeferred idleTimeout={2800} rootMargin="200px" />

      {/* 4. PROJELER GALERİSİ */}
      <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="250px" />

      {/* 5. KURUMSAL GİRİŞ (CorporateIntro - full width, kendi section’ı var) */}
      <div style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
        <CorporateIntro />
      </div>

      {/* 6. KURUMSAL ETKİNLİKLER (CorporateEvents için koyu şerit) */}
      <section
        aria-labelledby="kurumsal-events-title"
        className="bg-slate-950 py-16 md:py-20 border-t border-slate-900"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="max-w-7xl mx-auto px-4">
          <CorporateEvents />
        </div>
      </section>

      {/* 7. NEDEN BİZ? */}
      <WhyChooseUs />

      {/* 8. TEKNİK KAPASİTE */}
      <TechCapabilities />

      {/* 9. SSS (FAQ) */}
      <FaqDeferred idleTimeout={3600} rootMargin="300px" />
    </div>
  );
}
