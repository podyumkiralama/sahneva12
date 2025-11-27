// app/(site)/page.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";
import CorporateEvents from "@/components/CorporateEvents";
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";
import { ScrollReveal } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// 1. SABİT VERİLER & AYARLAR
// —————————————————————————————————————————
export const metadata = {
  title: "Sahne, LED Ekran, Ses-Işık Kiralama | Türkiye Geneli | Sahneva",
  description:
    "Sahneva ile sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama çözümlerini keşfedin. İstanbul merkezli, Türkiye geneli hizmet.",
  alternates: {
    canonical: "https://www.sahneva.com/",
    languages: {
      "tr-TR": "https://www.sahneva.com/",
      en: "https://www.sahneva.com/en",
      ar: "https://www.sahneva.com/ar",
      "x-default": "https://www.sahneva.com/",
    },
  },
  openGraph: {
    title: "Sahneva | Sahne, LED Ekran, Ses-Işık Kiralama",
    description:
      "Profesyonel sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama. İstanbul merkezli, Türkiye geneli hızlı kurulum ve destek.",
    url: "https://www.sahneva.com/",
    images: [
      {
        url: "https://www.sahneva.com/og/sahneva-home.jpg",
        width: 1200,
        height: 630,
        alt: "Sahneva sahne ve LED ekran kurulumu",
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600; // ISR

const HERO_FEATURES = [
  { icon: "⭐", title: "4.9/5 Puan", description: "500+ Mutlu Müşteri", color: "from-yellow-400 to-orange-400" },
  { icon: "⚡", title: "Aynı Gün", description: "Hızlı Kurulum", color: "from-blue-400 to-cyan-400" },
  { icon: "👑", title: "Premium", description: "Kalite Garantisi", color: "from-purple-400 to-pink-400" },
];

const WHY_SAHNEVA_FEATURES = [
  { icon: "⭐", title: "Yüksek Müşteri Memnuniyeti", desc: "Her organizasyonda %98'in üzerinde müşteri memnuniyeti.", stat: "%98 Memnuniyet" },
  { icon: "⚡", title: "Hızlı Kurulum ve Teslimat", desc: "Aynı gün profesyonel sahne, LED ekran ve ses-ışık kurulumları.", stat: "2–6 Saat" },
  { icon: "🖥️", title: "Premium LED Ekran Teknolojisi", desc: "P2–P6 pixel pitch ile yüksek çözünürlüklü indoor/outdoor LED ekran.", stat: "P2–P6" },
  { icon: "👷", title: "Uzman Teknik Ekip", desc: "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanlarından kadro.", stat: "15+ Uzman" },
  { icon: "💰", title: "Rekabetçi Fiyat Garantisi", desc: "Kaliteli hizmeti uygun fiyatla, bütçenize uygun çözümler.", stat: "%30 Tasarruf" },
  { icon: "🏙️", title: "Türkiye Geneli Hizmet", desc: "İstanbul, Ankara, İzmir başta 81 ilde profesyonel hizmet.", stat: "81 İl" },
];

const SEO_TECH_FEATURES = [
  "IP65 dış mekân LED paneller, 4500+ nit parlaklık",
  "Profesyonel line-array ses sistemleri, dijital mikserler",
  "Modüler podyum ve sahne platformları, truss sistemleri",
  "DMX kontrollü ışık sistemleri ve ambiyans aydınlatma",
];

const SEO_INFRA_FEATURES = [
  "100m²+ LED ekran kurulumu (P3.9 outdoor)",
  "Line-array ses sistemleri (JBL, RCF, dB)",
  "Truss kule sistemleri ve roof sahne çözümleri",
  "Jeneratör, UPS ve yedekli enerji altyapısı",
];

// —————————————————————————————————————————
// 2. SCHEMA (JSON-LD) BİLEŞENİ
// —————————————————————————————————————————
function StructuredData() {
  const HOME_URL = "https://www.sahneva.com/";
  const ORGANIZATION_ID = "https://www.sahneva.com/#org";
  const WEBSITE_ID = "https://www.sahneva.com/#website";
  const WEBPAGE_ID = "https://www.sahneva.com/#webpage";
  const SERVICE_ID = "https://www.sahneva.com/#primary-service";
  const CATALOG_ID = "https://www.sahneva.com/#catalog";
  const FAQ_ID = "https://www.sahneva.com/#faq";
  const IMAGE_ID = "https://www.sahneva.com/#og";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Sahneva",
        url: HOME_URL,
        logo: {
          "@type": "ImageObject",
          url: "https://www.sahneva.com/img/logo.png",
          width: 200,
          height: 60
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+90-545-304-8671",
          contactType: "customer service",
          areaServed: "TR",
          availableLanguage: "Turkish"
        },
        sameAs: [
          "https://www.instagram.com/sahneva",
          "https://www.facebook.com/sahneva"
        ]
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: HOME_URL,
        name: "Sahneva",
        inLanguage: "tr-TR",
        publisher: { "@id": ORGANIZATION_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: `${HOME_URL}arama?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: HOME_URL,
        name: "Sahne Sistemleri, LED Ekran, Ses-Işık | Türkiye Geneli | Sahneva",
        description: "Sahneva ile sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama çözümlerini keşfedin. İstanbul merkezli, Türkiye geneli hizmet.",
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        primaryImageOfPage: { "@id": IMAGE_ID },
      },
      {
        "@type": "OfferCatalog",
        "@id": CATALOG_ID,
        name: "Etkinlik Ekipmanları",
        url: HOME_URL,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Podyum Kiralama", description: "Podyum sahne kiralama hizmeti" },
            priceSpecification: { "@type": "UnitPriceSpecification", price: "250.00", priceCurrency: "TRY", unitText: "m²", unitCode: "MTK" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "LED Ekran Kiralama", description: "İç/dış mekan LED ekran kiralama" },
            priceSpecification: { "@type": "UnitPriceSpecification", price: "1700.00", priceCurrency: "TRY", unitText: "günlük", unitCode: "DAY" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sahne Kiralama", description: "Konser ve etkinlik sahnesi kiralama" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Ses-Işık Sistemleri", description: "Profesyonel ses ve ışık ekipmanı" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
        ],
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: "Etkinlik Ekipmanları Kiralama",
        description: "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama hizmeti.",
        url: HOME_URL,
        areaServed: { "@type": "Country", name: "Türkiye" },
        provider: { "@id": ORGANIZATION_ID },
        hasOfferCatalog: { "@id": CATALOG_ID },
      },
      {
        "@type": "ImageObject",
        "@id": IMAGE_ID,
        contentUrl: "https://www.sahneva.com/og/sahneva-home.jpg",
        width: 1200,
        height: 630,
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        url: HOME_URL,
        mainEntity: [
          { "@type": "Question", name: "Sahne ve podyum kiralama fiyatları nasıl hesaplanıyor?", acceptedAnswer: { "@type": "Answer", text: "Sahne ve podyum kiralama fiyatları; kullanılacak alanın m² büyüklüğüne, yüksekliğe ve süreye göre değişir." } },
          { "@type": "Question", name: "LED ekran kiralama fiyatına neler dahil?", acceptedAnswer: { "@type": "Answer", text: "LED ekran kiralama fiyatına; paneller, işlemci, kurulum ve operatör desteği dahildir." } },
          { "@type": "Question", name: "İstanbul dışındaki şehirlere de hizmet veriyor musunuz?", acceptedAnswer: { "@type": "Answer", text: "Evet. İstanbul merkezli olmamıza rağmen Türkiye genelinde 81 ile hizmet veriyoruz." } },
          { "@type": "Question", name: "Kurulum ne kadar sürüyor?", acceptedAnswer: { "@type": "Answer", text: "Kurulum süresi işin büyüklüğüne göre 2–6 saat arasında değişir." } },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// —————————————————————————————————————————
// 3. SAYFA BİLEŞENİ (FRAGMENT YAPISI)
// —————————————————————————————————————————
export default function HomePage() {
  return (
    <>
      <StructuredData />
      
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b0f1a] via-blue-950 to-purple-950 pt-16 lg:pt-20">
        <div className="absolute inset-0">
          <Image
            alt="Sahneva sahne kurulumu"
            src={heroImg}
            fill
            sizes="100vw"
            priority
            quality={70}
            className="object-cover object-center"
            style={{ filter: "brightness(0.7) contrast(1.1) saturate(1.05)" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/70 to-purple-900/75" />

        <div className="relative z-10 container py-12 md:py-16 text-center">
           <ScrollReveal>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Türkiye Geneli Profesyonel Hizmet</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="1">
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black mb-6">
                Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300">Sahne Sistemleri</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay="2">
              <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto font-medium">
                Sahne Kiralama, LED Ekran, Ses-Işık Sistemleri
              </p>
            </ScrollReveal>

            <ScrollReveal delay="3">
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <a href="tel:+905453048671" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105">📞 Hemen Ara</a>
                <a
                  href="https://wa.me/905453048671"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
                >
                  💬 WhatsApp Teklif
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {HERO_FEATURES.map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-white font-bold">{item.title}</div>
                    <div className="text-white/70 text-xs">{item.description}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
        </div>
      </section>

      {/* İÇERİK BÖLÜMÜ */}
      <div className="overflow-x-hidden relative">
        <div className="sticky top-0 z-40">
          <ReviewBannerDeferred idleTimeout={2000} className="block" />
        </div>

        <section className="py-12 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">Profesyonel <span className="text-blue-600">Hizmetlerimiz</span></h2>
              <p className="text-lg text-neutral-600">Türkiye geneli sahne, podyum ve LED ekran kiralama çözümleri</p>
            </div>
            <ServicesTabsDeferred idleTimeout={2800} />
          </div>
        </section>

        <section className="py-12 bg-slate-900">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Başarılı <span className="text-blue-400">Projelerimiz</span></h2>
              <ProjectsGalleryDeferred idleTimeout={3200} />
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">Kurumsal <span className="text-purple-600">Çözümler</span></h2>
            </div>
            <CorporateEvents />
          </div>
        </section>

        <section className="py-12 bg-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">Neden <span className="text-blue-600">Sahneva?</span></h2>
            </div>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               {WHY_SAHNEVA_FEATURES.map((item, i) => (
                 <li key={i} className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all">
                   <div className="text-3xl mb-3">{item.icon}</div>
                   <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                   <p className="text-sm text-gray-600">{item.desc}</p>
                 </li>
               ))}
            </ul>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container">
             <div className="grid gap-8 lg:grid-cols-2">
                <div className="bg-blue-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-4">🚀 Uçtan Uca Teknik Hizmet</h3>
                  <ul className="space-y-2">
                    {SEO_TECH_FEATURES.map((t, i) => <li key={i} className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>{t}</li>)}
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-4">🎤 Güçlü Altyapı</h3>
                  <ul className="space-y-2">
                    {SEO_INFRA_FEATURES.map((t, i) => <li key={i} className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span>{t}</li>)}
                  </ul>
                </div>
             </div>
          </div>
        </section>

        <section className="py-12 bg-slate-900">
          <div className="container">
             <h2 className="text-3xl font-black text-white text-center mb-8">Sıkça Sorulan Sorular</h2>
             <FaqDeferred idleTimeout={3600} />
          </div>
        </section>
      </div>
    </>
  );
}
