// app/(tr)/(site)/page.js
import React from "react";

// —————————————————————————————————————————
// BİLEŞENLER
// —————————————————————————————————————————

// Statik / Server komponentler
import HeroSection from "@/components/HeroSection";
import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";
import WhyChooseUs from "@/components/WhyChooseUs";
import TechCapabilities from "@/components/TechCapabilities";

// Client / Lazy load komponentler
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

// “Below the fold” içerik görünürlüğü (CLS için)
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "1px 800px",
});

export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (WebPage)
// —————————————————————————————————————————

function StructuredData() {
  const HOME_URL = SITE_URL;
  const WEBSITE_ID = `${SITE_URL}/#website`;
  const WEBPAGE_ID = `${SITE_URL}/#webpage`;
  const ORGANIZATION_ID = `${SITE_URL}/#org`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: HOME_URL,
        name:
          "Sahne Sistemleri, LED Ekran, Ses-Işık Kiralama | Türkiye Geneli | Sahneva",
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
// ANA SAYFA
// —————————————————————————————————————————

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-slate-50">
      <StructuredData />

      {/* 1. HERO */}
      <HeroSection />

      {/* Teklif formu hedefi */}
      <div id="teklif-al" className="scroll-mt-24" />

      {/* 2. HİZMETLER (ServicesTabs kendi section/bg’sine sahip) */}
      <section
        aria-label="Sahneva teknik kiralama hizmetleri"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <ServicesTabsDeferred idleTimeout={2800} rootMargin="200px" />
      </section>

      {/* 3. PROJELER GALERİSİ */}
      <section
        aria-label="Tamamlanan projeler ve referanslar"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="250px" />
      </section>

      {/* 4. KURUMSAL BLOK (CorporateIntro + CorporateEvents aynı katmanda) */}
      <section
        aria-labelledby="corporate-intro-heading"
        className="relative py-12 md:py-16"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container mx-auto px-4 space-y-12 md:space-y-16">
          <CorporateIntro />
          <CorporateEvents />
        </div>
      </section>

      {/* 5. NEDEN BİZ? */}
      <section
        aria-label="Sahneva neden tercih edilmeli"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <WhyChooseUs />
      </section>

      {/* 6. TEKNİK KAPASİTE */}
      <section
        aria-label="Teknik kapasite ve altyapı"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <TechCapabilities />
      </section>

      {/* 7. SSS */}
      <section
        aria-label="Sıkça sorulan sorular"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <FaqDeferred idleTimeout={3600} rootMargin="300px" />
      </section>
    </div>
  );
}
