// app/(site)/page.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";
import CorporateEvents from "@/components/CorporateEvents";

// Dinamik bileşenleri client wrapper’dan alın
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————
const HERO_FEATURES = [
  {
    icon: "⭐",
    title: "4.9/5 Puan",
    description: "500+ Mutlu Müşteri",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: "⚡",
    title: "Aynı Gün",
    description: "Hızlı Kurulum",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: "👑",
    title: "Premium",
    description: "Kalite Garantisi",
    color: "from-purple-400 to-pink-400",
  },
];

const WHY_SAHNEVA_FEATURES = [
  {
    icon: "⭐",
    title: "Yüksek Müşteri Memnuniyeti",
    desc: "Her organizasyonda %98'in üzerinde müşteri memnuniyeti. Referanslar ve Google yorumları bizim güvencemiz.",
    stat: "%98 Memnuniyet",
  },
  {
    icon: "⚡",
    title: "Hızlı Kurulum ve Teslimat",
    desc: "Aynı gün profesyonel sahne, LED ekran ve ses-ışık kurulumları.",
    stat: "2–6 Saat",
  },
  {
    icon: "🖥️",
    title: "Premium LED Ekran Teknolojisi",
    desc: "P2–P6 pixel pitch ile yüksek çözünürlüklü indoor/outdoor LED ekran.",
    stat: "P2–P6",
  },
  {
    icon: "👷",
    title: "Uzman Teknik Ekip",
    desc: "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanlarından kadro.",
    stat: "15+ Uzman",
  },
  {
    icon: "💰",
    title: "Rekabetçi Fiyat Garantisi",
    desc: "Kaliteli hizmeti uygun fiyatla, bütçenize uygun çözümler.",
    stat: "%30 Tasarruf",
  },
  {
    icon: "🏙️",
    title: "Türkiye Geneli Hizmet",
    desc: "İstanbul, Ankara, İzmir başta 81 ilde profesyonel hizmet.",
    stat: "81 İl",
  },
];

// Katmanlı içerik bölümlerini ilk boyamadan hariç tutarak FCP/LCP'yi iyileştirir
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "960px",
});

// ISR
export const revalidate = 3600;

// JSON-LD (Schema.org) – Sadece sayfaya özgü tipler
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.sahneva.com/#webpage",
        url: "https://www.sahneva.com/",
        name: "Sahne Sistemleri, LED Ekran, Ses-Işık | Türkiye Geneli | Sahneva",
        inLanguage: "tr-TR",
        isPartOf: { "@id": "https://www.sahneva.com/#website" },
        about: { "@id": "https://www.sahneva.com/#org" },
      },
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
              description: "Podyum Sahne kiralama",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: 250,
              priceCurrency: "TRY",
              unitText: "m²",
            },
            availability: "https://schema.org/InStock",
              areaServed: "TR",
            seller: { "@id": "https://www.sahneva.com/#org" },
          },
          // ... diğer teklifler
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
        provider: { "@id": "https://www.sahneva.com/#org" },
      },
      {
        "@type": "ImageObject",
        "@id": "https://www.sahneva.com/#og",
        contentUrl: "https://www.sahneva.com/og/sahneva-home.jpg",
        width: 1200,
        height: 630,
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
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            placeholder="blur"
            quality={60}
            className="object-cover object-center"
            style={{ filter: "brightness(0.7) contrast(1.1) saturate(1.05)" }}
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
          {/* ... hero içerikleri (başlık, CTA butonları, öne çıkan özellikler) ... */}
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="animate-bounce motion-reduce:animate-none">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Ana içerik */}
      <div className="relative">
        {/* #teklif-al hedefi */}
        <div id="teklif-al" className="scroll-mt-20" tabIndex={-1} />

        <div aria-hidden="true" className="h-12 lg:h-16" />

        {/* ReviewBanner */}
        <div className="sticky top-0 z-40">
          <ReviewBannerDeferred
            idleTimeout={2000}
            rootMargin="0px"
            className="block"
            aria-live="polite"
          />
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
              <h2
                id="hizmetler-title"
                className="text-3xl md:text-4xl font-black text-neutral-900 mb-4"
              >
                Profesyonel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Hizmetlerimiz
                </span>
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu
              </p>
            </div>
            {/* Deferred ServicesTabs bileşeni */}
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
              <h2
                id="projeler-title"
                className="text-3xl md:text-4xl font-black text-white mb-4"
              >
                Başarılı{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Projelerimiz
                </span>
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                500'den fazla kurumsal etkinlik, konser, fuar ve özel organizasyonda güvenilir çözüm ortağı
              </p>
            </div>
            {/* Deferred ProjectsGallery: ilk 6 görsel için initialCount prop’u ekleyebilirsiniz */}
            <ProjectsGalleryDeferred
              idleTimeout={3200}
              rootMargin="360px"
              initialCount={6} // Eğer ProjectsGallery bileşeni bu prop'u destekliyorsa
            />
          </div>
        </section>

        {/* Kurumsal Organizasyon */}
        <section
          className="py-12 bg-white"
          aria-labelledby="kurumsal-title"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2
                id="kurumsal-title"
                className="text-3xl md:text-4xl font-black text-neutral-900 mb-4"
              >
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

        {/* Neden Sahneva? */}
        <section
          className="py-12 bg-gradient-to-br from-blue-50/80 to-purple-50/60"
          aria-labelledby="neden-tercih-heading"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2
                id="neden-tercih-heading"
                className="text-3xl md:text-4xl font-black text-neutral-900 mb-6"
              >
                Neden{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Sahneva
                </span>
                'yı Tercih Etmelisiniz?
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                10 yılı aşkın deneyimimiz, uzman ekibimiz ve kaliteli ekipmanlarımızla fark yaratıyoruz
              </p>
            </div>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
              {WHY_SAHNEVA_FEATURES.map(({ icon, title, desc, stat }, i) => (
                <li key={i} className="m-0 p-0">
                  <article
                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-neutral-100 hover:border-blue-200/70 hover:scale-105"
                    aria-labelledby={`why-card-${i}-title`}
                  >
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {stat}
                    </div>
                    <div
                      className="text-3xl mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <h3
                      id={`why-card-${i}-title`}
                      className="font-black text-lg mb-3 text-neutral-900 group-hover:text-blue-600 transition-colors"
                    >
                      {title}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed text-sm">
                      {desc}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SSS */}
        <section
          className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95"
          aria-labelledby="sss-title"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2
                id="sss-title"
                className="text-3xl md:text-4xl font-black text-white mb-4"
              >
                Sıkça{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Sorulan Sorular
                </span>
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Sahne, LED ekran, ses-ışık sistemleri ve kurulum süreçleri hakkında merak ettikleriniz
              </p>
            </div>
            {/* Deferred FAQ bileşeni */}
            <FaqDeferred idleTimeout={3600} rootMargin="400px" />
          </div>
        </section>
      </div>
    </div>
  );
}
