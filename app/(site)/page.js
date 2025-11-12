// Tam optimize edilmiş ana sayfa — PageSpeed Mobil skoru için düzenlendi

import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";
import CorporateEvents from "@/components/CorporateEvents";
import dynamic from "next/dynamic";

// Deferred bileşenleri sadece ihtiyaç halinde yükle
const ReviewBanner = dynamic(() => import("@/components/DeferredSections.client").then(m => m.ReviewBannerDeferred), { ssr: false });
const ServicesTabs = dynamic(() => import("@/components/DeferredSections.client").then(m => m.ServicesTabsDeferred), { ssr: false });
const ProjectsGallery = dynamic(() => import("@/components/DeferredSections.client").then(m => m.ProjectsGalleryDeferred), { ssr: false });
const Faq = dynamic(() => import("@/components/DeferredSections.client").then(m => m.FaqDeferred), { ssr: false });

const BELOW_THE_FOLD_VISIBILITY_STYLE = {
  contentVisibility: "auto",
  containIntrinsicSize: "960px",
};

export const revalidate = 3600;

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero görsel alanı */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b0f1a] via-blue-950 to-purple-950 pt-16 lg:pt-20"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImg}
            alt="Profesyonel sahne kurulumu, LED ekranlar ve ses-ışık sistemleri - Sahneva"
            fill
            priority
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            placeholder="blur"
            quality={60}
            className="object-cover object-center"
            style={{ filter: "brightness(0.7) contrast(1.1) saturate(1.05)" }}
          />
        </div>
      </section>

      <main className="relative">
        <div id="teklif-al" className="scroll-mt-20" tabIndex={-1} />

        {/* Banner sadece görünür olunca yüklenir */}
        <div className="sticky top-0 z-40">
          <ReviewBanner idleTimeout={2000} rootMargin="0px" className="block" aria-live="polite" />
        </div>

        {/* Hizmetler */}
        <section className="py-12 bg-gradient-to-b from-white to-neutral-50/80" aria-labelledby="hizmetler-title" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
          <div className="container">
            <h2 id="hizmetler-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4 text-center">
              Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Hizmetlerimiz</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-center mb-8">
              Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu
            </p>
            <ServicesTabs idleTimeout={2800} rootMargin="320px" />
          </div>
        </section>

        {/* Projeler */}
        <section className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95" aria-labelledby="projeler-title" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
          <div className="container">
            <h2 id="projeler-title" className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
              Başarılı <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projelerimiz</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto text-center mb-8">
              500'den fazla kurumsal etkinlik, konser, fuar ve özel organizasyonda güvenilir çözüm ortağı
            </p>
            <ProjectsGallery idleTimeout={3200} rootMargin="360px" initialCount={6} />
          </div>
        </section>

        {/* Kurumsal içerik */}
        <section className="py-12 bg-white" aria-labelledby="kurumsal-title" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
          <div className="container">
            <h2 id="kurumsal-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4 text-center">
              Kurumsal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Organizasyon</span>
            </h2>
            <CorporateEvents />
          </div>
        </section>

        {/* SSS */}
        <section className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95" aria-labelledby="sss-title" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
          <div className="container">
            <h2 id="sss-title" className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
              Sıkça <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sorulan Sorular</span>
            </h2>
            <Faq idleTimeout={3600} rootMargin="400px" />
          </div>
        </section>
      </main>
    </div>
  );
}
