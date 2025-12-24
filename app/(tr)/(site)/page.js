// app/(tr)/(site)/page.js

import HeroSection from "@/components/HeroSection";
import HeroBelow from "@/components/HeroBelow";

import {
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  CorporateEventsDeferred,
  CorporateIntroDeferred,
  TechCapabilitiesDeferred,
  WhyChooseUsDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

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
    /* ---------------- WebPage ---------------- */
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

    /* ---------------- Images ---------------- */
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

    /* ---------------- OfferCatalog ---------------- */
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
            // Çadır için hizmet görselin varsa burayı güncelleyebilirsin:
            // image: `${BASE_SITE_URL}/img/hizmet-cadir.webp`,
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
            // image: `${BASE_SITE_URL}/img/hizmet-ses-isik.webp`, // varsa ekle
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

    /* ---------------- Primary Service ---------------- */
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

    /* ---------------- VideoObject ---------------- */
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

    /* ---------------- FAQPage ---------------- */
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

// SEO lists used in TechCapabilities
const SEO_TECH_FEATURES = [
  {
    title: "LED Ekran Kurulum & Teknik Operasyon",
    desc: "Indoor/Outdoor LED panel kurulumları, canlı yayın/stream ve içerik yönetimi.",
  },
  {
    title: "Ses & Işık Sistemleri",
    desc: "Profesyonel ses sistemleri, ışık tasarımı ve teknik ekip desteği.",
  },
  {
    title: "Sahne, Podyum & Truss",
    desc: "Modüler sahne/podyum, truss sistemleri ve güvenli kurulum çözümleri.",
  },
];

const SEO_INFRA_FEATURES = [
  { title: "Keşif & Planlama", desc: "Mekân keşfi, teknik ihtiyaç analizi ve proje planı." },
  { title: "Kurulum & Operasyon", desc: "Zamanında kurulum, sahada teknik ekip ve operasyon yönetimi." },
  { title: "Söküm & Teslim", desc: "Etkinlik sonrası güvenli söküm ve raporlama." },
];

/* --------------------
   JSON-LD (Schema.org) - Home rich snippets
   Not: Organization/WebSite/LocalBusiness layout.jsx'te zaten var.
-------------------- */
function StructuredData() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: homeJsonLdSafe,
      }}
    />
  );
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-black">
      {/* Home Rich Snippets */}
      <StructuredData />
      <BreadcrumbJsonLd items={BREADCRUMB_ITEMS} />

      {/* 1) HERO (statik kalsın: LCP için en iyisi) */}
      <HeroSection />

      {/* 2) HERO ALTI */}
      <HeroBelow />

      {/* anchor */}
      <div id="teklif-al" className="sr-only" />

      {/* 3) HİZMETLER TABS */}
      <section aria-labelledby="hizmetler-title" className="bg-black">
        <h2 id="hizmetler-title" className="reader-only">
          Hizmetler
        </h2>
        <p className="reader-only">
          Türkiye geneli sahne kiralama, podyum kiralama, LED ekran, ses-ışık sistemleri,
          truss, çadır ve masa-sandalye kiralama çözümleri sunuyoruz.
        </p>
        <p className="reader-only">
          Etkinliğinize uygun paketleri hizmetler sayfasında karşılaştırabilirsiniz.
        </p>
        <a className="reader-only" href="/hizmetler">
          Tüm hizmetleri inceleyin
        </a>
        <ServicesTabsDeferred rootMargin="0px 0px" />
      </section>

      {/* 4) PROJELER */}
      <section aria-labelledby="projeler-title">
        <h2 id="projeler-title" className="reader-only">
          Projelerimiz
        </h2>
        <p className="reader-only">
          500'den fazla kurumsal etkinlik, konser ve fuar projesinde sahne ve teknik çözüm
          ortağı olduk.
        </p>
        <p className="reader-only">
          Seçili referans çalışmaları projeler sayfasında görebilirsiniz.
        </p>
        <a className="reader-only" href="/projeler">
          Projeleri inceleyin
        </a>
      </section>
      <ProjectsGalleryDeferred rootMargin="0px 0px" />

      {/* 5) TECH CAPABILITIES (below-the-fold) */}
      <section aria-labelledby="teknik-kabiliyetler-title">
        <h2 id="teknik-kabiliyetler-title" className="reader-only">
          Teknik Kabiliyetler
        </h2>
        <p className="reader-only">
          LED ekran, ses-ışık, sahne ve podyum kurulumlarında teknik planlama, kurulum ve
          operasyonu uçtan uca yönetiyoruz.
        </p>
        <p className="reader-only">
          Ekipman ve operasyon detaylarını teknik altyapı sayfalarımızda inceleyin.
        </p>
        <a className="reader-only" href="/ses-isik-sistemleri">
          Ses ve ışık sistemleri hakkında bilgi alın
        </a>
      </section>
      <div className="bg-slate-900 py-10">
        <div style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
          <TechCapabilitiesDeferred
            techFeatures={SEO_TECH_FEATURES}
            infraFeatures={SEO_INFRA_FEATURES}
          />
        </div>
      </div>

      {/* 6) KURUMSAL ORGANİZASYON */}
      <section aria-labelledby="kurumsal-etkinlikler-title">
        <h2 id="kurumsal-etkinlikler-title" className="reader-only">
          Kurumsal Etkinlik Çözümleri
        </h2>
        <p className="reader-only">
          Lansman, konferans ve şirket organizasyonlarında sahne tasarımı, teknik ekip ve
          kurulum süreçlerini tek elden yönetiyoruz.
        </p>
        <p className="reader-only">
          Kurumsal organizasyon hizmetlerimizi ayrıntılı olarak inceleyebilirsiniz.
        </p>
        <a className="reader-only" href="/kurumsal-organizasyon">
          Kurumsal organizasyon çözümlerini keşfedin
        </a>
      </section>
      <div className="bg-slate-50 py-0 m-0 w-full">
        <CorporateEventsDeferred />
      </div>

      {/* 7) KURUMSAL INTRO (below-the-fold) */}
      <section aria-labelledby="kurumsal-intro-title">
        <h2 id="kurumsal-intro-title" className="reader-only">
          Kurumsal Profil
        </h2>
        <p className="reader-only">
          Sahneva'nın deneyimi, ekip yapısı ve kurumsal etkinliklerdeki yaklaşımı hakkında
          özet bir bakış sunuyoruz.
        </p>
        <p className="reader-only">
          Hakkımızda sayfasında ekip ve süreçlerimizi detaylıca okuyabilirsiniz.
        </p>
        <a className="reader-only" href="/hakkimizda">
          Sahneva hakkında daha fazla bilgi
        </a>
      </section>
      <div className="bg-black py-0 m-0 w-full">
        <div style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
          <CorporateIntroDeferred />
        </div>
      </div>

      {/* 8) WHY CHOOSE US */}
      <section aria-labelledby="neden-sahneva-title">
        <h2 id="neden-sahneva-title" className="reader-only">
          Neden Sahneva
        </h2>
        <p className="reader-only">
          Uzman teknik ekip, geniş envanter ve güvenli kurulum süreçlerimizle etkinliğinizi
          sorunsuz şekilde hayata geçiriyoruz.
        </p>
        <p className="reader-only">
          Yaklaşımımızı ve deneyimimizi Hakkımızda sayfasında bulabilirsiniz.
        </p>
        <a className="reader-only" href="/hakkimizda">
          Neden Sahneva’yı tercih etmelisiniz?
        </a>
      </section>
      <div className="w-full p-0 m-0">
        <WhyChooseUsDeferred />
      </div>

      {/* 10) SSS */}
      <section id="sss" aria-labelledby="sss-title">
        <h2 id="sss-title" className="reader-only">
          Sık Sorulan Sorular
        </h2>
        <p className="reader-only">
          Kurulum süresi, fiyatlandırma, teknik ekip desteği ve keşif süreciyle ilgili
          soruların yanıtlarını burada bulabilirsiniz.
        </p>
        <p className="reader-only">
          Daha fazla soru için detaylı SSS sayfasını inceleyin.
        </p>
        <a className="reader-only" href="/sss">
          Tüm SSS&apos;yi görüntüleyin
        </a>
      </section>
      <div className="w-full bg-transparent p-0 m-0">
        <FaqDeferred />
      </div>
    </div>
  );
}
