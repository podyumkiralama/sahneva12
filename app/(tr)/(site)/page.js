// app/(tr)/(site)/page.js

import HeroSection from "@/components/HeroSection";
import HeroBelow from "@/components/HeroBelow";

import ServicesTabs from "@/components/ServicesTabs";
import ProjectsGallery from "@/components/ProjectsGallery";
import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";
import TechCapabilities from "@/components/TechCapabilities";
import WhyChooseUs from "@/components/WhyChooseUs";
import Faq from "@/components/Faq";

import { HOME_PAGE_TITLE, getOgImageUrl } from "@/lib/seo/seoConfig";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BASE_SITE_URL, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/seo/schemaIds";

/* -------------------
   Below-the-fold: content-visibility (perf)
------------------- */
const BELOW_THE_FOLD_VISIBILITY_STYLE = {
  contentVisibility: "auto",
  containIntrinsicSize: "1px 1200px",
};

const HOME_URL = `${BASE_SITE_URL}/`;
const WEBPAGE_ID = `${HOME_URL}#webpage`;
const SERVICE_ID = `${HOME_URL}#primary-service`;
const CATALOG_ID = `${HOME_URL}#catalog`;
const FAQ_ID = `${HOME_URL}#sss`;
const HERO_IMAGE_ID = `${HOME_URL}#hero-image`;
const OG_IMAGE_ID = `${HOME_URL}#og-image`;
const VIDEO_ID = `${HOME_URL}#intro-video`;
const PRICING_DISCLAIMER =
  "Fiyatlar; şehir, gün, metraj, kurulum ve ekipmana göre değişebilir. Net teklif için iletişime geçin.";

const ogUrl =
  getOgImageUrl?.({ path: "/img/og/sahneva-og.webp", absolute: true }) ??
  `${BASE_SITE_URL}/img/og/sahneva-og.webp`;

const HOME_JSON_LD = {
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
      primaryImageOfPage: { "@id": HERO_IMAGE_ID },
    },

    {
      "@type": "ImageObject",
      "@id": HERO_IMAGE_ID,
      contentUrl: `${BASE_SITE_URL}/img/hero-bg.webp`,
      width: 1600,
      height: 900,
    },
    {
      "@type": "ImageObject",
      "@id": OG_IMAGE_ID,
      contentUrl: ogUrl,
      width: 1200,
      height: 630,
    },

    {
      "@type": "OfferCatalog",
      "@id": CATALOG_ID,
      name: "Etkinlik Ekipmanları Kiralama Kataloğu",
      url: HOME_URL,
      itemListElement: [
        {
          "@type": "Offer",
          url: `${BASE_SITE_URL}/podyum-kiralama`,
          itemOffered: {
            "@type": "Service",
            name: "Podyum Kiralama",
            url: `${BASE_SITE_URL}/podyum-kiralama`,
            image: `${BASE_SITE_URL}/img/hizmet-podyum.webp`,
            description: `Modüler podyum sahne kiralama hizmeti. ${PRICING_DISCLAIMER}`,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: 250,
            priceCurrency: "TRY",
            unitText: "m²",
            unitCode: "MTK",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MTK",
            },
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Türkiye" },
          seller: { "@id": ORGANIZATION_ID },
        },
        {
          "@type": "Offer",
          url: `${BASE_SITE_URL}/led-ekran-kiralama`,
          itemOffered: {
            "@type": "Service",
            name: "LED Ekran Kiralama",
            url: `${BASE_SITE_URL}/led-ekran-kiralama`,
            image: `${BASE_SITE_URL}/img/hizmet-led.webp`,
            description: `İç/dış mekan LED ekran kiralama. ${PRICING_DISCLAIMER}`,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: 1700,
            priceCurrency: "TRY",
            unitText: "DAY",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitText: "DAY",
            },
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Türkiye" },
          seller: { "@id": ORGANIZATION_ID },
        },
        {
          "@type": "Offer",
          url: `${BASE_SITE_URL}/cadir-kiralama`,
          itemOffered: {
            "@type": "Service",
            name: "Çadır Kiralama",
            url: `${BASE_SITE_URL}/cadir-kiralama`,
            description: `Etkinlik ve organizasyonlar için çadır kiralama. ${PRICING_DISCLAIMER}`,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "TRY",
            minPrice: 6000,
            maxPrice: 800000,
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Türkiye" },
          seller: { "@id": ORGANIZATION_ID },
        },
        {
          "@type": "Offer",
          url: `${BASE_SITE_URL}/masa-sandalye-kiralama`,
          itemOffered: {
            "@type": "Service",
            name: "Sandalye Kiralama",
            url: `${BASE_SITE_URL}/masa-sandalye-kiralama`,
            description: `Etkinlikler için sandalye kiralama. ${PRICING_DISCLAIMER}`,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: 200,
            priceCurrency: "TRY",
            unitText: "adet",
            unitCode: "C62",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "C62",
            },
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Türkiye" },
          seller: { "@id": ORGANIZATION_ID },
        },
        {
          "@type": "Offer",
          url: `${BASE_SITE_URL}/masa-sandalye-kiralama`,
          itemOffered: {
            "@type": "Service",
            name: "Masa Kiralama",
            url: `${BASE_SITE_URL}/masa-sandalye-kiralama`,
            description: `Etkinlikler için masa kiralama. ${PRICING_DISCLAIMER}`,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "TRY",
            minPrice: 1000,
            maxPrice: 2000,
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Türkiye" },
          seller: { "@id": ORGANIZATION_ID },
        },
        {
          "@type": "Offer",
          url: `${BASE_SITE_URL}/sahne-kiralama`,
          itemOffered: {
            "@type": "Service",
            name: "Sahne Kiralama",
            url: `${BASE_SITE_URL}/sahne-kiralama`,
            image: `${BASE_SITE_URL}/img/hizmet-sahne.webp`,
            description: `Konser ve etkinlikler için sahne kiralama. ${PRICING_DISCLAIMER}`,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "TRY",
            minPrice: 10000,
            maxPrice: 200000,
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Türkiye" },
          seller: { "@id": ORGANIZATION_ID },
        },
        {
          "@type": "Offer",
          url: `${BASE_SITE_URL}/ses-isik-sistemleri`,
          itemOffered: {
            "@type": "Service",
            name: "Ses-Işık Sistemleri",
            url: `${BASE_SITE_URL}/ses-isik-sistemleri`,
            description: `Ses ve ışık sistemleri kiralama hizmeti. ${PRICING_DISCLAIMER}`,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "TRY",
            minPrice: 10000,
            maxPrice: 300000,
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Türkiye" },
          seller: { "@id": ORGANIZATION_ID },
        },
        {
          "@type": "Offer",
          url: `${BASE_SITE_URL}/hizmetler`,
          itemOffered: {
            "@type": "Service",
            name: "İstanbul İçi Nakliye",
            url: `${BASE_SITE_URL}/hizmetler`,
            description: `İstanbul içi nakliye hizmeti. ${PRICING_DISCLAIMER}`,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: 7000,
            priceCurrency: "TRY",
          },
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
      "@type": "VideoObject",
      "@id": VIDEO_ID,
      name: "Sahneva – Sahne, Podyum ve LED Ekran Kiralama Tanıtım Videosu",
      description:
        "Sahneva’nın sahne, podyum, LED ekran, ses ve ışık sistemleriyle gerçekleştirdiği profesyonel etkinlik kurulumlarından kısa bir tanıtım videosu.",
      thumbnailUrl: ["https://img.youtube.com/vi/173gBurWSRQ/hqdefault.jpg"],
      uploadDate: "2025-11-17T10:30:00+03:00",
      duration: "PT1M30S",
      inLanguage: "tr-TR",
      isFamilyFriendly: true,
      publisher: { "@id": ORGANIZATION_ID },
      contentUrl: "https://www.youtube.com/watch?v=173gBurWSRQ",
      embedUrl: "https://www.youtube.com/embed/173gBurWSRQ",
      isPartOf: { "@id": WEBPAGE_ID },
      about: { "@id": SERVICE_ID },
    },

    {
      "@type": "FAQPage",
      "@id": FAQ_ID,
      url: `${HOME_URL}#sss`,
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

const homeJsonLdSafe = JSON.stringify(HOME_JSON_LD).replace(/</g, "\\u003c");
const BREADCRUMB_ITEMS = [{ name: "Ana Sayfa", url: `${HOME_URL}` }];

const SEO_TECH_FEATURES = [
  { title: "LED Ekran Kurulum & Teknik Operasyon", desc: "Indoor/Outdoor LED panel kurulumları, canlı yayın/stream ve içerik yönetimi." },
  { title: "Ses & Işık Sistemleri", desc: "Profesyonel ses sistemleri, ışık tasarımı ve teknik ekip desteği." },
  { title: "Sahne, Podyum & Truss", desc: "Modüler sahne/podyum, truss sistemleri ve güvenli kurulum çözümleri." },
];

const SEO_INFRA_FEATURES = [
  { title: "Keşif & Planlama", desc: "Mekân keşfi, teknik ihtiyaç analizi ve proje planı." },
  { title: "Kurulum & Operasyon", desc: "Zamanında kurulum, sahada teknik ekip ve operasyon yönetimi." },
  { title: "Söküm & Teslim", desc: "Etkinlik sonrası güvenli söküm ve raporlama." },
];

function StructuredData() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: homeJsonLdSafe }}
    />
  );
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-black">
      <StructuredData />
      <BreadcrumbJsonLd items={BREADCRUMB_ITEMS} />

      <HeroSection />
      <HeroBelow />

      <div id="teklif-al" className="sr-only" />

      {/* Hizmetler */}
      <section aria-labelledby="hizmetler-title" className="bg-black">
        <h2 id="hizmetler-title" className="sr-only">Hizmetler</h2>
        <p className="sr-only">
          Türkiye geneli sahne kiralama, podyum kiralama, LED ekran kiralama, ses-ışık sistemleri,
          truss kiralama, çadır kiralama ve masa-sandalye kiralama çözümleri.
        </p>
        <a className="sr-only" href="/hizmetler">Tüm hizmetleri inceleyin</a>
        <ServicesTabs />
      </section>

      {/* Projeler */}
      <section aria-labelledby="projeler-title" className="bg-black">
        <h2 id="projeler-title" className="sr-only">Projelerimiz</h2>
        <p className="sr-only">
          500'den fazla kurumsal etkinlik, konser, fuar ve organizasyonda profesyonel çözüm ortağı olduk.
        </p>
        <a className="sr-only" href="/projeler">Projeleri inceleyin</a>
        <ProjectsGallery />
      </section>

      {/* Teknik */}
      <div className="bg-slate-900 py-10" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
        <TechCapabilities techFeatures={SEO_TECH_FEATURES} infraFeatures={SEO_INFRA_FEATURES} />
      </div>

      {/* Kurumsal */}
      <div className="bg-slate-50 py-0 m-0 w-full">
        <CorporateEvents />
      </div>

      <div className="bg-black py-0 m-0 w-full" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
        <CorporateIntro />
      </div>

      {/* Why Choose Us */}
      <div className="w-full p-0 m-0">
        <WhyChooseUs />
      </div>

      {/* FAQ */}
      <div className="w-full bg-transparent p-0 m-0">
        <Faq />
      </div>
    </div>
  );
}
