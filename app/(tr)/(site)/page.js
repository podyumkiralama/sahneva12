// app/(tr)/(site)/page.js
import Link from "next/link";

// Statik bileşenler
import HeroSection from "@/components/HeroSection";
import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";
import TechCapabilities from "@/components/TechCapabilities";
import WhyChooseUs from "@/components/WhyChooseUs";
import SeoArticles from "@/components/SeoArticles";
import {
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { HERO_FEATURES_TR } from "@/lib/heroFeatures";
import {
  HOME_PAGE_TITLE,
  SITE_URL,
  getOgImageUrl,
} from "@/lib/seo/seoConfig";

// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————

const SECTION_THEMES = {
  light: {
    title: "text-neutral-900",
    description: "text-neutral-700",
  },
  dark: {
    title: "text-white",
    description: "text-slate-100",
  },
};

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

const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
});

export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (Schema.org)
// —————————————————————————————————————————

function StructuredData() {
  const HOME_URL = SITE_URL;
  const ORGANIZATION_ID = `${SITE_URL}/#org`;
  const WEBSITE_ID = `${SITE_URL}/#website`;
  const WEBPAGE_ID = `${HOME_URL}#webpage`;
  const SERVICE_ID = `${HOME_URL}#primary-service`;
  const CATALOG_ID = `${HOME_URL}#catalog`;
  const FAQ_ID = `${HOME_URL}#sss`;
  const IMAGE_ID = `${HOME_URL}#og`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: HOME_URL,
        name: HOME_PAGE_TITLE,
        description:
          "Sahneva ile profesyonel sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama çözümlerini keşfedin. İstanbul merkezli, Türkiye geneli hızlı kurulum.",
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        primaryImageOfPage: { "@id": IMAGE_ID },
      },
      {
        "@type": "OfferCatalog",
        "@id": CATALOG_ID,
        name: "Etkinlik Ekipmanları Kiralama Kataloğu",
        url: HOME_URL,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Podyum Kiralama",
              description: "Modüler podyum sahne kiralama hizmeti",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "250.00",
              priceCurrency: "TRY",
              unitText: "m²",
              unitCode: "MTK",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "LED Ekran Kiralama",
              description: "İç/dış mekan LED ekran kiralama",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "1700.00",
              priceCurrency: "TRY",
              unitText: "günlük",
              unitCode: "DAY",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Çadır Kiralama" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sandalye Kiralama" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Masa Kiralama" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sahne Kiralama" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Ses-Işık Sistemleri" },
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
        description:
          "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama hizmeti. Kurulum, teknik operasyon ve söküm dahil.",
        url: HOME_URL,
        areaServed: { "@type": "Country", name: "Türkiye" },
        provider: { "@id": ORGANIZATION_ID },
        hasOfferCatalog: { "@id": CATALOG_ID },
        serviceType: "Event Production",
      },
      {
        "@type": "ImageObject",
        "@id": IMAGE_ID,
        contentUrl: getOgImageUrl(),
        width: 1200,
        height: 630,
      },
      {
        "@type": "VideoObject",
        "@id": `${HOME_URL}#intro-video`,
        name: "Sahneva – Sahne, Podyum ve LED Ekran Kiralama Tanıtım Videosu",
        description:
          "Sahneva’nın sahne, podyum, LED ekran ve ses-ışık sistemleriyle gerçekleştirdiği kurulum ve etkinliklerden kısa bir özet.",
        thumbnailUrl: ["https://img.youtube.com/vi/173gBurWSRQ/hqdefault.jpg"],
        uploadDate: "2024-01-01",
        duration: "PT1M30S",
        publisher: { "@id": ORGANIZATION_ID },
        contentUrl: "https://www.youtube.com/watch?v=173gBurWSRQ",
        embedUrl: "https://www.youtube.com/embed/173gBurWSRQ",
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        url: FAQ_ID,
        mainEntity: [
          {
            "@type": "Question",
            name: "Sahne, podyum ve LED ekran kiralama hizmetini hangi şehirlerde veriyorsunuz?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sahneva olarak İstanbul merkezli çalışıyor ve Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama hizmeti sunuyoruz. Şehir dışı projelerde nakliye ve konaklama planlamasını ekibimizle birlikte organize ediyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Kiralama sürecinde keşif ve fiyat teklifi nasıl ilerliyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Talebiniz geldikten sonra etkinlik alanı, katılımcı sayısı ve ihtiyaç duyduğunuz ekipmanları birlikte netleştiriyoruz. Gerekirse ücretsiz keşif yapıyor, ardından sahne, podyum, LED ekran ve ses-ışık sistemleri için detaylı ve kalem kalem ayrılmış teklif paylaşıyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Kurulum ve söküm hizmete dahil mi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Evet. Tüm sahne, podyum, LED ekran ve ses-ışık kiralamalarında profesyonel ekip tarafından kurulum, etkinlik süresince teknik takip ve etkinlik bitiminde söküm hizmeti standart olarak dahildir.",
            },
          },
          {
            "@type": "Question",
            name: "Sahne ve LED ekran kiralama fiyatları neye göre değişiyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Fiyatlar; sahne veya podyum ölçüsü, LED ekran metrekaresi ve piksel aralığı, ses-ışık sistemi kapasitesi, etkinlik günü sayısı ve şehir içi/dışı olmasına göre değişir. Bütçenize uygun birkaç farklı paket seçeneği sunuyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Etkinlikten ne kadar önce rezervasyon yapmalıyım?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Özellikle yüksek sezonda (bahar-yaz dönemi) sahne, podyum ve LED ekran stoklarının dolmaması için en az 2–3 hafta öncesinden rezervasyon yapmanızı öneriyoruz. Acil projeler için ise aynı hafta içinde hızlı kurulum yapabildiğimiz durumlar da oluyor.",
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
// PARÇALI BİLEŞENLER
// —————————————————————————————————————————

function SectionHeader({
  id,
  title,
  highlight,
  description,
  afterText = "",
  align = "center",
  theme = "light",
}) {
  const themeClasses = SECTION_THEMES[theme];
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <header className={`${alignment} mb-12`}>
      <h2
        id={id}
        className={`text-3xl md:text-4xl font-black ${themeClasses.title} mb-4`}
      >
        {title}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {highlight}
        </span>
        {afterText}
      </h2>
      {description ? (
        <p
          className={`text-lg ${themeClasses.description} max-w-3xl mx-auto ${
            alignment === "left" ? "md:mx-0" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

function HeroFeatureGrid() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0 m-0">
      {HERO_FEATURES_TR.map((item, index) => (
        <li key={item.title} className="m-0 p-0">
          <ScrollReveal asChild delay={String(index * 0.5)} direction="scale">
            <div className="group bg-slate-900/80 rounded-xl p-4 border border-white/10">
              <div className={`text-2xl mb-2 ${item.color}`} aria-hidden="true">
                {item.icon}
              </div>
              <div className="text-white font-bold text-base mb-1">
                {item.title}
              </div>
              <div className="text-gray-200 text-xs">{item.description}</div>
            </div>
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}

function ConsultationCard() {
  return (
    <div className="bg-gradient-to-r from-blue-700/90 to-purple-700/90 rounded-2xl p-6 md:p-8 border border-white/20">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div
            className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl"
            aria-hidden="true"
          >
            🎯
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
            Ücretsiz Profesyonel Danışmanlık
          </h2>
          <p className="text-slate-100 text-base leading-relaxed">
            Etkinliğiniz için <strong>en uygun sahne çözümleri</strong>, LED
            ekran seçenekleri ve ses-ışık sistemlerini ücretsiz teknik
            danışmanlık ile planlayalım.{" "}
            <strong className="text-yellow-200">
              2 saat içinde detaylı teklif
            </strong>{" "}
            sunuyoruz.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="#teklif-al"
            className="bg-white text-blue-800 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg transition-colors text-sm focus-ring min-h-[44px] flex items-center justify-center"
            aria-label="Ücretsiz danışmanlık ve teklif almak için aşağı kaydır"
          >
            Hemen Teklif Al
          </a>
        </div>
      </div>
    </div>
  );
}

// —————————————————————————————————————————
// ANA SAYFA
// —————————————————————————————————————————

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-black">
      <StructuredData />

      {/* 1) HERO */}
      <HeroSection />

      {/* 2) HERO ALTI: HeroFeatureGrid + Danışmanlık Kartı */}
      <section
        className="py-10 bg-gradient-to-b from-slate-950 to-slate-900"
        aria-labelledby="hero-supporting-features"
        role="region"
      >
        <h2 id="hero-supporting-features" className="sr-only">
          Hızlı öne çıkan özellikler ve ücretsiz danışmanlık bağlantısı
        </h2>
        <div className="space-y-8 px-4 sm:px-6 lg:px-8">
          <HeroFeatureGrid />
          <ScrollReveal delay="1">
            <ConsultationCard />
          </ScrollReveal>
        </div>
      </section>

      {/* anchor */}
      <div id="teklif-al" className="sr-only" />

{/* 3) HİZMETLER TABS */}
<section
  aria-labelledby="hizmetler-title"
  className="relative bg-slate-950 overflow-hidden"
>
  <h2 id="hizmetler-title" className="sr-only">
    Hizmetlerimiz
  </h2>

  {/* Tam genişlik: ekstra container ve -mx/px kaldırıldı */}
  <ServicesTabsDeferred idleTimeout={2800} rootMargin="320px" />
</section>


      {/* 4) PROJELER (ProjectsGallery kendi section'ını çiziyor) */}
      <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="360px" />

{/* 5) TECH CAPABILITIES */}
<section
  aria-labelledby="tech-capabilities-title"
  className="bg-slate-900 py-16"
  style={BELOW_THE_FOLD_VISIBILITY_STYLE}
>
  {/* Tam genişlik — container tamamen kaldırıldı */}
  <TechCapabilities
    techFeatures={SEO_TECH_FEATURES}
    infraFeatures={SEO_INFRA_FEATURES}
  />
</section>



      {/* 6) KURUMSAL ORGANİZASYON (full-width, containersız) */}
      <section className="bg-slate-50 py-0 m-0 w-full">
        <CorporateEvents />
      </section>

      {/* 7) CORPORATE INTRO */}
      <CorporateIntro />

      {/* 8) WHY CHOOSE US */}
      <section aria-labelledby="neden-biz-title" className="w-full p-0 m-0">
        <WhyChooseUs />
      </section>

      {/* 9) SEO MAKALELERİ */}
      <section aria-labelledby="seo-articles-title" className="w-full p-0 m-0">
        <SeoArticles />
      </section>

      {/* 10) SSS */}
      <section className="w-full bg-transparent p-0 m-0">
        <FaqDeferred />
      </section>
    </div>
  );
}
