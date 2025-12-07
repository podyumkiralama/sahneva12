// app/(tr)/(site)/page.js
import React from "react";

// —————————————————————————————————————————
// BİLEŞENLER
// —————————————————————————————————————————

// 1) Statik / Server bileşenler
import HeroSection from "@/components/HeroSection";
import CorporateIntro from "@/components/CorporateIntro";
import CorporateEvents from "@/components/CorporateEvents";
import WhyChooseUs from "@/components/WhyChooseUs";
import TechCapabilities from "@/components/TechCapabilities";

// 2) Lazy-load / client bileşenler
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

// “Aşağı fold” için içerik görünürlüğü
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "1px 800px",
});

// ISR
export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (Schema.org)
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
    <>
      <StructuredData />

      {/* Ana zemin: koyu grid tasarımına uygun */}
      <main className="bg-[#020617] text-white">
        {/* 1. HERO */}
        <HeroSection />

        {/* 2. Teklif formu anchor’ı (görünmez, sadece scroll hedefi) */}
        <div id="teklif-al" className="scroll-mt-24" aria-hidden="true" />

        {/* 3. Hizmetler sekmeleri */}
        <section
          aria-label="Sahneva teknik kiralama hizmetleri"
          className="py-16 md:py-20"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ServicesTabsDeferred idleTimeout={2800} rootMargin="200px" />
          </div>
        </section>

        {/* 4. Projeler galerisi */}
        <section
          aria-label="Sahneva profesyonel proje referans galerisi"
          className="py-16 md:py-20"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="250px" />
          </div>
        </section>

        {/* 5. Kurumsal intro + kurumsal event kartı
            -> Burada sadece TEK bir section arka plan/padding veriyoruz,
               içteki CorporateIntro / CorporateEvents sadece kart gibi çalışıyor. */}
        <section
          aria-labelledby="corporate-intro-heading"
          className="py-16 md:py-20"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] items-stretch">
              {/* Bu iki component kendi içinde rounded-3xl, grid, glow vs. içeriyor;
                  ekstra arka plan rengi/padding vermiyoruz. */}
              <CorporateIntro />
              <CorporateEvents />
            </div>
          </div>
        </section>

        {/* 6. Neden Biz? */}
        <section
          aria-label="Sahneva ile çalışmanın avantajları"
          className="py-16 md:py-20"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseUs />
          </div>
        </section>

        {/* 7. Teknik kapasite */}
        <section
          aria-label="Teknik kapasite ve altyapı"
          className="py-16 md:py-20"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TechCapabilities />
          </div>
        </section>

        {/* 8. SSS */}
        <section
          aria-label="Sıkça sorulan sorular"
          className="py-16 md:py-20"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FaqDeferred idleTimeout={3600} rootMargin="300px" />
          </div>
        </section>
      </main>
    </>
  );
}
