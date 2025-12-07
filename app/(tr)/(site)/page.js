// app/(tr)/(site)/page.js
import React from "react";

// —————————————————————————————————————————
// BİLEŞENLER
// —————————————————————————————————————————

// Statik / Server bileşenler
import HeroSection from "@/components/HeroSection";
import CorporateIntro from "@/components/CorporateIntro";
import CorporateEvents from "@/components/CorporateEvents";
import WhyChooseUs from "@/components/WhyChooseUs";
import TechCapabilities from "@/components/TechCapabilities";

// Lazy-load / client bileşenler
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

const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "1px 800px",
});

export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD
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

      {/* Navbar fixed olduğu için tüm içerik biraz aşağıdan başlasın */}
      <main className="bg-[#020617] text-white pt-16 lg:pt-20">
        {/* 1. HERO */}
        <HeroSection />

        {/* 2. Teklif formu anchor’ı */}
        {/* scroll-mt-24 sabit (fixed) navigasyon çubuğu ile üst üste binmesini engeller */}
        <div id="teklif-al" className="scroll-mt-24" aria-hidden="true" />

        {/* 3. Hizmetler sekmeleri */}
        <section
          aria-label="Sahneva teknik kiralama hizmetleri"
          // py-12 md:py-16 kaldırıldı, boşluk yok
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          {/* container mx-auto px-4 sm:px-6 lg:px-8 kaldırıldı, tam genişlik */}
          <div className="w-full"> 
            <ServicesTabsDeferred idleTimeout={2800} rootMargin="200px" />
          </div>
        </section>

        {/* 4. Projeler galerisi */}
        <section
          aria-label="Sahneva profesyonel proje referans galerisi"
          // py-12 md:py-16 kaldırıldı, boşluk yok
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          {/* container mx-auto px-4 sm:px-6 lg:px-8 kaldırıldı, tam genişlik */}
          <div className="w-full">
            <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="250px" />
          </div>
        </section>

        {/* 5. Kurumsal intro (TEK kart, yanına başka şey yok) */}
        <section
          aria-labelledby="corporate-intro-heading"
          // py-12 md:py-16 kaldırıldı, boşluk yok
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          {/* container mx-auto px-4 sm:px-6 lg:px-8 kaldırıldı, tam genişlik */}
          <div className="w-full">
            <CorporateIntro />
          </div>
        </section>

        {/* 6. Kurumsal event / video kartı (ayrı tam genişlik blok) */}
        <section
          aria-label="Kurumsal etkinlik prodüksiyon çözümleri"
          // py-12 md:py-16 kaldırıldı, boşluk yok
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          {/* container mx-auto px-4 sm:px-6 lg:px-8 kaldırıldı, tam genişlik */}
          <div className="w-full">
            <CorporateEvents />
          </div>
        </section>

        {/* 7. Neden Biz? */}
        <section
          aria-label="Sahneva ile çalışmanın avantajları"
          // py-12 md:py-16 kaldırıldı, boşluk yok
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          {/* container mx-auto px-4 sm:px-6 lg:px-8 kaldırıldı, tam genişlik */}
          <div className="w-full">
            <WhyChooseUs />
          </div>
        </section>

        {/* 8. Teknik kapasite */}
        <section
          aria-label="Teknik kapasite ve altyapı"
          // py-12 md:py-16 kaldırıldı, boşluk yok
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          {/* container mx-auto px-4 sm:px-6 lg:px-8 kaldırıldı, tam genişlik */}
          <div className="w-full">
            <TechCapabilities />
          </div>
        </section>

        {/* 9. SSS */}
        <section
          aria-label="Sıkça sorulan sorular"
          // py-12 md:py-16 kaldırıldı, boşluk yok
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          {/* container mx-auto px-4 sm:px-6 lg:px-8 kaldırıldı, tam genişlik */}
          <div className="w-full">
            <FaqDeferred idleTimeout={3600} rootMargin="300px" />
          </div>
        </section>
      </main>
    </>
  );
}
