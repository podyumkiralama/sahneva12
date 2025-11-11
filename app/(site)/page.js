// app/(site)/page.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";

// Statik bileşenler
import CorporateEvents from "@/components/CorporateEvents";
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

// ISR
export const revalidate = 3600;

/**
 * NOT:
 * - Bu dosyada "export const metadata = { ... }" YOK.
 *   Başlık/OG/robots tamamen app/layout.js'tan gelir (tek kaynak).
 */

// Katmanlı içerik bölümlerini ilk boyamadan hariç tutarak FCP/LCP'yi iyileştirir
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "960px",
});

// —————————————————————————————————————————
// JSON-LD (Schema.org) — SADELEŞTİRİLMİŞ
// Organization & WebSite layout'ta. Burada OfferCatalog, Service, ImageObject, FAQPage var.
// —————————————————————————————————————————
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OfferCatalog",
        "@id": "https://www.sahneva.com/#catalog",
        name: "Etkinlik Ekipmanları",
        url: "https://www.sahneva.com/",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Podyum Kiralama",
              description: "Podyum sahne kiralama",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: 250,
              priceCurrency: "TRY",
              unitText: "m²",
            },
            availability: "https://schema.org/InStock",
            areaServed: "TR",
          },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sahne Kiralama" }, areaServed: "TR" },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "LED Ekran Kiralama" }, areaServed: "TR" },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ses-Işık Sistemleri" }, areaServed: "TR" },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Çadır Kiralama" }, areaServed: "TR" },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Truss Sistemleri" }, areaServed: "TR" },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Organizasyon Yönetimi" }, areaServed: "TR" },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.sahneva.com/#service",
        name: "Etkinlik Ekipmanları Kiralama",
        description:
          "Türkiye genelinde sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama; kurulum ve teknik operasyon.",
        url: "https://www.sahneva.com/",
        areaServed: { "@type": "Country", name: "TR" },
        provider: { "@id": "https://www.sahneva.com/#org" }, // layout'taki Organization'a referans
        serviceType: [
          "Sahne Kiralama",
          "Podyum Kiralama",
          "LED Ekran Kiralama",
          "Ses Sistemi Kiralama",
          "Işık Sistemi Kiralama",
          "Etkinlik Prodüksiyon",
        ],
      },
      {
        "@type": "ImageObject",
        "@id": "https://www.sahneva.com/#og",
        contentUrl: "https://www.sahneva.com/og/sahneva-home.jpg",
        width: 1200,
        height: 630,
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.sahneva.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Sahne kiralama süresi ne kadar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Kurulum süresi genellikle 2–6 saat arasında değişir.",
            },
          },
        ],
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
// SAYFA
// —————————————————————————————————————————
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <StructuredData />

      {/* HERO SECTION */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b0f1a] via-blue-950 to-purple-950 pt-16 lg:pt-20"
        aria-labelledby="hero-title"
      >
        {/* Arka plan görseli */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImg}
            alt="Profesyonel sahne kurulumu, LED ekranlar ve ses-ışık sistemleri - Sahneva"
            fill
            priority
            fetchPriority="high"   // LCP öncelik sinyali
            sizes="100vw"
            placeholder="blur"
            quality={70}
            className="object-cover object-center"
            style={{
              filter: "brightness(0.7) contrast(1.1) saturate(1.05)",
            }}
          />
        </div>

        {/* Overlay katmanları */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/70 to-purple-900/75"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse motion-reduce:animate-none"
          style={{ animationDuration: "8s" }}
          aria-hidden="true"
        />

        {/* İçerik */}
        <div className="relative z-10 container py-12 md:py-16">
          <div className="max-w-6xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
              <span
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span className="text-white/90 text-sm font-medium">
                Türkiye Geneli Profesyonel Hizmet
              </span>
            </div>

            {/* Başlık */}
            <h1
              id="hero-title"
              className="text-white text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight"
              aria-label="Profesyonel Sahne Sistemleri"
            >
              <span className="block">Profesyonel</span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-[length:300%_100%] animate-[gradient_8s_ease_infinite] motion-reduce:animate-none"
                aria-hidden="true"
              >
                Sahne Sistemleri
              </span>
            </h1>

            {/* Anahtar kelimeler */}
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed font-medium max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text font-bold" aria-hidden="true">
                Sahne Kiralama
              </span>
              ,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text font-bold" aria-hidden="true">
                LED Ekran
              </span>
              ,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text font-bold" aria-hidden="true">
                Ses-Işık Sistemleri
              </span>
              <span className="sr-only">Sahne Kiralama, LED Ekran, Ses-Işık Sistemleri</span>
            </p>

            <p className="text-white/80 text-base md:text-lg mb-8 max-w-3xl mx-auto">
              500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı kurulum ile yanınızdayız
            </p>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-12">
              <a
                href="tel:+905453048671"
                className="w-full sm:w-auto min-w[180px] text-center group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span aria-hidden="true">📞</span> Hemen Ara
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </a>

              <a
                href="https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-w[180px] text-center group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span aria-hidden="true">💬</span> WhatsApp Teklif
                </span>
                <span className="sr-only">(yeni sekmede açılır)</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </a>
            </div>

            {/* ÖNE ÇIKANLAR, vb... (mevcut içeriğin aynısı) */}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className="animate-bounce motion-reduce:animate-none">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Ana içerik (değiştirmedim) */}
      <div id="main" className="relative">
        <div id="teklif-al" className="sr-only" aria-hidden="true" />
        <div aria-hidden="true" className="h-12 lg:h-16" />
        <div className="sticky top-0 z-40">
          <ReviewBannerDeferred idleTimeout={2000} rootMargin="0px" className="block" aria-live="polite" />
        </div>

        {/* Hizmetler */}
        <section
          className="relative py-12 bg-gradient-to-b from-white to-neutral-50/80"
          aria-labelledby="hizmetler-title"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div
            className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"
            aria-hidden="true"
          />
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <h2 id="hizmetler-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                Profesyonel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Hizmetlerimiz</span>
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu
              </p>
            </div>
            <ServicesTabsDeferred idleTimeout={2800} rootMargin="320px" />
          </div>
        </section>

        {/* Projeler */}
        <section
          className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95"
          aria-labelledby="projeler-title"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2 id="projeler-title" className="text-3xl md:text-4xl font-black text-white mb-4">
                Başarılı{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projelerimiz</span>
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                500'den fazla kurumsal etkinlik, konser, fuar ve özel organizasyonda güvenilir çözüm ortağı
              </p>
            </div>
            <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="360px" />
          </div>
        </section>

        {/* Kurumsal Organizasyon */}
        <section className="py-12 bg-white" aria-labelledby="kurumsal-title" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
          <div className="container">
            <div className="text-center mb-12">
              <h2 id="kurumsal-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                Kurumsal{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Organizasyon Çözümlerimiz
                </span>
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Lansman, konferans, bayi toplantısı ve kurumsal etkinlikleriniz için sahne, podyum, LED ekran, ses–ışık ve teknik operasyonu tek çatı altında sunuyoruz.
              </p>
            </div>
            <CorporateEvents />
          </div>
        </section>

        {/* Neden Sahneva? (mevcut içerik) */}
        {/* ... */}

        {/* SSS */}
        <section
          className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95"
          aria-labelledby="sss-title"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2 id="sss-title" className="text-3xl md:text-4xl font-black text-white mb-4">
                Sıkça{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sorulan Sorular</span>
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Sahne, LED ekran, ses-ışık sistemleri ve kurulum süreçleri hakkında merak ettikleriniz
              </p>
            </div>
            <FaqDeferred idleTimeout={3600} rootMargin="400px" />
          </div>
        </section>
      </div>
    </div>
  );
}
