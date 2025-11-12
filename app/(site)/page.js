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

// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————
const HERO_FEATURES = [
  { icon: "⭐", title: "4.9/5 Puan", description: "500+ Mutlu Müşteri", color: "from-yellow-400 to-orange-400" },
  { icon: "⚡", title: "Aynı Gün", description: "Hızlı Kurulum", color: "from-blue-400 to-cyan-400" },
  { icon: "👑", title: "Premium", description: "Kalite Garantisi", color: "from-purple-400 to-pink-400" },
];

const WHY_SAHNEVA_FEATURES = [
  { icon: "⭐", title: "Yüksek Müşteri Memnuniyeti", desc: "Her organizasyonda %98'in üzerinde müşteri memnuniyeti. Referanslar ve Google yorumları bizim güvencemiz.", stat: "%98 Memnuniyet" },
  { icon: "⚡", title: "Hızlı Kurulum ve Teslimat", desc: "Aynı gün profesyonel sahne, LED ekran ve ses-ışık kurulumları.", stat: "2–6 Saat" },
  { icon: "🖥️", title: "Premium LED Ekran Teknolojisi", desc: "P2–P6 pixel pitch ile yüksek çözünürlüklü indoor/outdoor LED ekran.", stat: "P2–P6" },
  { icon: "👷", title: "Uzman Teknik Ekip", desc: "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanlarından kadro.", stat: "15+ Uzman" },
  { icon: "💰", title: "Rekabetçi Fiyat Garantisi", desc: "Kaliteli hizmeti uygun fiyatla, bütçenize uygun çözümler.", stat: "%30 Tasarruf" },
  { icon: "🏙️", title: "Türkiye Geneli Hizmet", desc: "İstanbul, Ankara, İzmir başta 81 ilde profesyonel hizmet.", stat: "81 İl" },
];

// Katmanlı içerik bölümlerini ilk boyamadan hariç tutarak FCP/LCP'yi iyileştirir
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "960px",
});

// ISR
export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (Schema.org) – Sadece sayfaya özgü tipler
// —————————————————————————————————————————
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
            itemOffered: { "@type": "Service", name: "Podyum Kiralama", description: "Podyum Sahne kiralama" },
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
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sahne Kiralama" }, areaServed: "TR", seller: { "@id": "https://www.sahneva.com/#org" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "LED Ekran Kiralama" }, areaServed: "TR", seller: { "@id": "https://www.sahneva.com/#org" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ses-Işık Sistemleri" }, areaServed: "TR", seller: { "@id": "https://www.sahneva.com/#org" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Çadır Kiralama" }, areaServed: "TR", seller: { "@id": "https://www.sahneva.com/#org" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Truss Sistemleri" }, areaServed: "TR", seller: { "@id": "https://www.sahneva.com/#org" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Organizasyon Yönetimi" }, areaServed: "TR", seller: { "@id": "https://www.sahneva.com/#org" } },
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
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 1280px"
            placeholder="blur"
            quality={55}
            className="object-cover object-center"
            style={{ filter: "brightness(0.7) contrast(1.08) saturate(1.05)" }}
          />
        </div>

        {/* Overlay katmanları */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/70 to-purple-900/75"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden sm:block bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse motion-reduce:animate-none"
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
                className="w-full sm:w-auto min-w-[180px] text-center group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
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
                className="w-full sm:w-auto min-w-[180px] text-center group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span aria-hidden="true">💬</span> WhatsApp Teklif
                </span>
                <span className="sr-only">(yeni sekmede açılır)</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </a>
            </div>

            {/* ÖNE ÇIKANLAR */}
            <h2 className="sr-only">Öne çıkan özellikler</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 list-none p-0 m-0">
              {HERO_FEATURES.map((item, index) => (
                <li key={index} className="m-0 p-0">
                  <div className="group bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:bg-white/15">
                    <div className={`text-2xl mb-2 bg-gradient-to-r ${item.color} text-transparent bg-clip-text`} aria-hidden="true">
                      {item.icon}
                    </div>
                    <div className="text-white font-bold text-base mb-1">{item.title}</div>
                    <div className="text-white/70 text-xs">{item.description}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Danışmanlık kutusu */}
            <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl" aria-hidden="true">🎯</div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-white text-xl md:text-2xl font-bold mb-2">Ücretsiz Profesyonel Danışmanlık</h2>
                  <p className="text-white/90 text-base leading-relaxed">
                    Etkinliğiniz için <strong>en uygun sahne çözümleri</strong>, LED ekran seçenekleri ve ses-ışık sistemlerini ücretsiz teknik danışmanlık ile planlayalım.{" "}
                    <strong className="text-yellow-300">2 saat içinde detaylı teklif</strong> sunuyoruz.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#teklif-al"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60"
                  >
                    Hemen Teklif Al
                  </a>
                </div>
              </div>
            </div>
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

      {/* Ana içerik */}
      <div className="relative">
        {/* #teklif-al hedefi */}
        <div id="teklif-al" className="scroll-mt-20" tabIndex={-1} />

        <div aria-hidden="true" className="h-12 lg:h-16" />
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
        <section
          className="py-12 bg-white"
          aria-labelledby="kurumsal-title"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2 id="kurumsal-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                Kurumsal{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Organizasyon Çözümlerimiz</span>
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
              <h2 id="neden-tercih-heading" className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">
                Neden{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sahneva</span>
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
                    <div className="text-3xl mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text" aria-hidden="true">
                      {icon}
                    </div>
                    <h3 id={`why-card-${i}-title`} className="font-black text-lg mb-3 text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed text-sm">{desc}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SEO metinleri */}
        <section
          className="py-12 bg-white"
          aria-labelledby="seo-title"
          style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        >
          <div className="container">
            <h2 id="seo-title" className="text-3xl md:text-4xl font-black text-center mb-12 text-neutral-900">
              Türkiye'nin{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">1 Numaralı</span>{" "}
              Etkinlik Teknoloji Partneri
            </h2>

            <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
              {/* Sol blok */}
              <article className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <h3 className="font-black text-xl mb-4 text-neutral-900 flex items-center gap-3">
                  <span className="bg-blue-500 text-white p-2 rounded-lg" aria-hidden="true">🚀</span>
                  Uçtan Uca Teknik Hizmet ve Profesyonel Çözümler
                </h3>
                <div className="prose max-w-none text-neutral-700">
                  <p className="text-base leading-relaxed">
                    <strong>Sahneva</strong> olarak Türkiye genelinde{" "}
                    <a href="/sahne-kiralama" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors">sahne kiralama</a>,{" "}
                    <a href="/podyum-kiralama" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors">podyum kurulumu</a>,{" "}
                    <a href="/led-ekran-kiralama" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors">LED ekran kiralama</a> ve{" "}
                    <a href="/ses-isik-sistemleri" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors">ses ışık sistemi kurulumu</a>{" "}
                    hizmetlerinde komple çözümler sunuyoruz.
                  </p>
                  <ul className="mt-4 space-y-2 text-neutral-700">
                    {[
                      "IP65 dış mekân LED paneller, 4500+ nit parlaklık",
                      "Profesyonel line-array ses sistemleri, dijital mikserler",
                      "Modüler podyum ve sahne platformları, truss sistemleri",
                      "DMX kontrollü ışık sistemleri ve ambiyans aydınlatma",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* Sağ blok */}
              <article className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <h3 className="font-black text-xl mb-4 text-neutral-900 flex items-center gap-3">
                  <span className="bg-purple-500 text-white p-2 rounded-lg" aria-hidden="true">🎤</span>
                  Büyük Ölçekli Etkinlikler İçin Güçlü Altyapı
                </h3>
                <div className="prose max-w-none text-neutral-700">
                  <p className="text-base leading-relaxed">
                    Konser, miting, festival, fuar ve açık hava etkinlikleri için yüksek kapasiteli ekipman altyapımızla hizmet veriyoruz. 50.000+ kişilik organizasyonlarda aktif rol alıyoruz.
                  </p>
                  <ul className="mt-4 space-y-2 text-neutral-700">
                    {[
                      "100m²+ LED ekran kurulumu (P3.9 outdoor)",
                      "Line-array ses sistemleri (JBL, RCF, dB)",
                      "Truss kule sistemleri ve roof sahne çözümleri",
                      "Jeneratör, UPS ve yedekli enerji altyapısı",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
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
