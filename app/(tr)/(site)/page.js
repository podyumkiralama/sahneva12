// app/(tr)/(site)/page.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Statik bileşenler
import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

// Animasyon bileşenleri
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

// Hero görseli
import heroImg from "@/public/img/hero-bg.webp";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————

const HERO_FEATURES = [
  {
    icon: "⭐",
    iconLabel: "Yıldız ikonu",
    title: "4.9/5 Puan",
    description: "500+ Mutlu Müşteri",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    icon: "⚡",
    iconLabel: "Şimşek ikonu",
    title: "Aynı Gün",
    description: "Hızlı Kurulum",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    icon: "👑",
    iconLabel: "Taç ikonu",
    title: "Premium",
    description: "Kalite Garantisi",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
];

const HERO_KEYWORDS = [
  {
    icon: "⚡",
    iconLabel: "Şimşek ikonu",
    text: "Aynı gün kurulum, 24/7 teknik destek",
  },
  {
    icon: "💰",
    iconLabel: "Para torbası ikonu",
    text: "%30'a kadar daha uygun fiyat garantisi",
  },
  {
    icon: "🏆",
    iconLabel: "Kupa ikonu",
    text: "500+ başarılı proje, referanslı hizmet",
  },
];

const HERO_STATS = [
  { label: "Tamamlanan Proje", value: "500+", id: "stat-projects" },
  { label: "Kurulum Süresi", value: "2–6 saat", id: "stat-time" },
  { label: "Memnuniyet", value: "%98", id: "stat-satisfaction" },
  { label: "Hizmet Ağı", value: "81 il", id: "stat-coverage" },
];

const CTA_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Sahneva web sitesinden yazıyorum. Sahne ve etkinlik çözümleri için hızlı teklif almak istiyorum."
);

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
    iconLabel: "Telefon ikonu",
    ariaLabel: "Sahneva'yı telefonla arayın: 0545 304 86 71",
    gradient: "from-blue-600 to-indigo-700",
    hoverGradient: "from-blue-700 to-indigo-800",
  },
  {
    href: `https://wa.me/905453048671?text=${CTA_WHATSAPP_MESSAGE}`,
    label: "WhatsApp'tan Teklif Al",
    icon: "💬",
    iconLabel: "Mesaj balonu ikonu",
    target: "_blank",
    rel: "nofollow noopener noreferrer",
    ariaLabel: "WhatsApp üzerinden hızlı teklif alın (yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
    hoverGradient: "from-green-700 to-emerald-800",
  },
];

const SECTION_THEMES = {
  light: {
    title: "text-neutral-900",
    description: "text-neutral-700",
    bg: "bg-white",
  },
  dark: {
    title: "text-white",
    description: "text-slate-200",
    bg: "bg-gradient-to-br from-neutral-900 to-blue-900/95",
  },
};

const WHY_SAHNEVA_FEATURES = [
  {
    icon: "⭐",
    iconLabel: "Yıldız ikonu",
    title: "Yüksek Müşteri Memnuniyeti",
    desc: "Her organizasyonda %98'in üzerinde müşteri memnuniyeti. Referanslar ve Google yorumları bizim güvencemiz.",
    stat: "%98 Memnuniyet",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: "⚡",
    iconLabel: "Şimşek ikonu",
    title: "Hızlı Kurulum ve Teslimat",
    desc: "Aynı gün profesyonel sahne, LED ekran ve ses-ışık kurulumları.",
    stat: "2–6 Saat",
    gradient: "from-cyan-400 to-blue-400",
  },
  {
    icon: "🖥️",
    iconLabel: "Bilgisayar ekranı ikonu",
    title: "Premium LED Ekran Teknolojisi",
    desc: "P2–P6 pixel pitch ile yüksek çözünürlüklü indoor/outdoor LED ekran.",
    stat: "P2–P6",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: "👷",
    iconLabel: "İnşaat işçisi ikonu",
    title: "Uzman Teknik Ekip",
    desc: "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanlarından kadro.",
    stat: "15+ Uzman",
    gradient: "from-emerald-400 to-green-400",
  },
  {
    icon: "💰",
    iconLabel: "Para torbası ikonu",
    title: "Rekabetçi Fiyat Garantisi",
    desc: "Kaliteli hizmeti uygun fiyatla, bütçenize uygun çözümler.",
    stat: "%30 Tasarruf",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    icon: "🏙️",
    iconLabel: "Şehir manzarası ikonu",
    title: "Türkiye Geneli Hizmet",
    desc: "İstanbul, Ankara, İzmir başta 81 ilde profesyonel hizmet.",
    stat: "81 İl",
    gradient: "from-indigo-400 to-blue-400",
  },
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

// Performans optimizasyonu için stil
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "1px 800px",
});

export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (Schema.org) – TAM SÜRÜM
// —————————————————————————————————————————
function StructuredData() {
  const HOME_URL = SITE_URL;
  const ORGANIZATION_ID = `${SITE_URL}/#org`;
  const WEBSITE_ID = `${SITE_URL}/#website`;
  const WEBPAGE_ID = `${HOME_URL}#webpage`;
  const SERVICE_ID = `${HOME_URL}#primary-service`;
  const CATALOG_ID = `${HOME_URL}#catalog`;
  const FAQ_ID = `${HOME_URL}#faq`;
  const IMAGE_ID = `${HOME_URL}#og`;

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
        contentUrl: `${SITE_URL}/og/sahneva-home.jpg`,
        width: 1200,
        height: 630,
      },
      {
        "@type": "VideoObject",
        "@id": `${HOME_URL}#intro-video`,
        name: "Sahneva – Sahne, Podyum ve LED Ekran Kiralama Tanıtım Videosu",
        description:
          "Sahneva'nın sahne, podyum, LED ekran ve ses-ışık sistemleriyle gerçekleştirdiği kurulum ve etkinliklerden kısa bir özet.",
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
        url: HOME_URL,
        mainEntity: [
          {
            "@type": "Question",
            name: "Sahne ve podyum kiralama fiyatları nasıl hesaplanıyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sahne ve podyum kiralama fiyatları; kullanılacak alanın m² büyüklüğüne, yüksekliğe, kurulacağı zemine, etkinlik süresine ve şehre göre hesaplanır. Standart paketlerimiz dışında, etkinliğinize özel keşif yaparak net fiyatlandırma sunuyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "LED ekran kiralama fiyatına neler dahil?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LED ekran kiralama fiyatına; LED paneller, taşıyıcı konstrüksiyon, görüntü işlemci, gerekli kablolama, kurulum-söküm ve teknik operasyon desteği dahildir. Gerektiğinde jeneratör ve yayın ekipmanları opsiyonel olarak eklenebilir.",
            },
          },
          {
            "@type": "Question",
            name: "İstanbul dışındaki şehirlere de hizmet veriyor musunuz?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Evet. İstanbul merkezli olmamıza rağmen Türkiye genelinde 81 ile hizmet veriyoruz. Lojistik, konaklama ve yol maliyetleri etkinlik şehrine göre tekliflendirilir.",
            },
          },
          {
            "@type": "Question",
            name: "Kurulum ne kadar sürüyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Kurulum süresi sahne/LED ekran ve ses-ışık altyapısının büyüklüğüne göre değişmekle birlikte çoğu kurulumumuz 2–6 saat arasında tamamlanır. Büyük konser ve miting sahnelerinde bu süre 1 güne kadar uzayabilir.",
            },
          },
          {
            "@type": "Question",
            name: "Tek günlük veya kısa süreli etkinlikler için kiralama yapabilir miyim?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Evet, tek günlük, birkaç saatlik veya çok günlü etkinlikler için esnek kiralama seçenekleri sunuyoruz. Minimum kiralama süresi ve fiyatlandırma, kurulum yapılacak ekipmana göre değişir.",
            },
          },
          {
            "@type": "Question",
            name: "Teklif süreci nasıl işliyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Web sitemiz, telefon veya WhatsApp üzerinden bize ulaştıktan sonra etkinlik detaylarınızı alıyor, gerekirse keşif yapıyor ve maksimum 2 saat içinde size net, kalem kalem açıklanmış bir teklif iletiyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Ses-ışık sistemi için keşif yapıyor musunuz?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Büyük ölçekli etkinlikler, açık alan konserleri ve kurumsal lansmanlarda alanın akustiğini ve seyirci kapasitesini doğru hesaplamak için ücretsiz veya düşük maliyetli keşif hizmeti sunuyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Teknik ekip etkinlik boyunca sahada kalıyor mu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Evet. LED ekran operatörü, ses mühendisi, ışıkçı ve sahne teknisyenlerinden oluşan ekibimiz, etkinlik boyunca sahada kalarak tüm teknik süreci yönetir ve olası problemlere anında müdahale eder.",
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
// YARDIMCI BİLEŞENLER
// —————————————————————————————————————————

function SectionHeader({
  id,
  title,
  highlight,
  description,
  afterText = "",
  align = "center",
  theme = "light",
  className = "",
}) {
  const themeClasses = SECTION_THEMES[theme];
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`${alignment} mb-10 md:mb-14 ${className}`}>
      <div className="inline-flex items-center gap-2 mb-3">
        <div
          className="w-3 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
          {theme === "dark" ? "Sahneva Çözümleri" : "Profesyonel Hizmet"}
        </span>
      </div>
      <h2
        id={id}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold ${themeClasses.title} mb-4 leading-tight`}
      >
        {title}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">
          {highlight}
        </span>
        {afterText}
      </h2>
      {description && (
        <p
          className={`text-base md:text-lg ${themeClasses.description} max-w-3xl mx-auto leading-relaxed ${
            align === "left" ? "md:mx-0" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function HeroFeatureGrid() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      role="list"
      aria-label="Sahneva'nın temel özellikleri"
    >
      {HERO_FEATURES.map((item, index) => (
        <ScrollReveal
          key={item.title}
          delay={String(index * 0.2)}
          direction="up"
          asChild
        >
          <div
            role="listitem"
            className={`
              group relative 
              ${item.bgColor} 
              rounded-2xl p-6 
              border ${item.borderColor}
              backdrop-blur-sm
              hover:scale-[1.02] 
              transition-all duration-300
              hover:shadow-2xl
            `}
          >
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
              <span
                className={`text-2xl ${item.color}`}
                role="img"
                aria-label={item.iconLabel}
              >
                {item.icon}
              </span>
            </div>
            <div className="mt-2">
              <div className={`text-3xl font-bold ${item.color} mb-2`}>
                {item.title}
              </div>
              <div className="text-slate-200 text-sm">
                {item.description}
              </div>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function ConsultationCard() {
  return (
    <ScrollReveal delay="0.5" direction="up">
      <div
        className="relative bg-gradient-to-r from-blue-800/90 via-purple-800/90 to-blue-800/90 rounded-3xl p-8 md:p-10 border border-white/20 max-w-6xl mx-auto overflow-hidden"
        role="region"
        aria-labelledby="consultation-heading"
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-32 translate-x-32"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 md:gap-8">
          <div className="flex-shrink-0" aria-hidden="true">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              🎯
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2
              id="consultation-heading"
              className="text-white text-2xl md:text-3xl font-bold mb-3"
            >
              Ücretsiz Profesyonel Danışmanlık
            </h2>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed">
              Etkinliğiniz için{" "}
              <strong className="text-yellow-300">
                en uygun sahne çözümleri
              </strong>
              , LED ekran seçenekleri ve ses-ışık sistemlerini ücretsiz teknik
              danışmanlık ile planlayalım.{" "}
              <strong className="text-white bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                2 saat içinde detaylı teklif
              </strong>{" "}
              sunuyoruz.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#teklif-al"
              className="inline-flex items-center justify-center min-h-[52px] px-8 bg-white text-blue-900 hover:bg-gray-50 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-900"
              aria-label="Ücretsiz danışmanlık ve teklif almak için teklif formuna git"
            >
              Hemen Teklif Al
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// —————————————————————————————————————————
// ♿ ERİŞİLEBİLİR HERO BÖLÜMÜ
// —————————————————————————————————————————
function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* ♿ ARKAPLAN RESİM - Dekoratif olduğu için alt="" */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        {/* Koyu overlay – biraz açtık (72) */}
        <div className="absolute inset-0 bg-slate-950/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/30 to-transparent" />
      </div>

      {/* ♿ GRID + SPOT IŞIKLAR - Dekoratif */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_45%,#020617_100%)]" />
      </div>

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/18 blur-[130px] rounded-full mix-blend-screen pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-blue-600/10 blur-[110px] rounded-full mix-blend-screen pointer-events-none"
        aria-hidden="true"
      />

      {/* ♿ İÇERİK */}
      <div className="relative z-10 container px-4 py-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
          {/* ♿ BADGE */}
          <ScrollReveal direction="down" delay="0.1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-transform hover:scale-105">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-emerald-100/90 tracking-wide">
                {/* ♿ Mobilde kısaltma */}
                <span className="hidden sm:inline">
                  Sahneva Organizasyon •{" "}
                </span>
                Türkiye Geneli Profesyonel Hizmet
              </span>
            </div>
          </ScrollReveal>

          {/* ♿ ANA BAŞLIK */}
          <ScrollReveal delay="0.2">
            <h1
              id="hero-title"
              className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl"
            >
              Profesyonel{" "}
              <br className="hidden md:block" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
                Sahne <span aria-hidden="true">&amp;</span> LED Ekran
              </span>
              <span className="block mt-2 text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 font-extrabold pb-2">
                Kiralama Partneri
              </span>
            </h1>
          </ScrollReveal>

          {/* ♿ ALT AÇIKLAMA */}
          <ScrollReveal delay="0.3">
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Sahne, LED ekran ve ses-ışık sistemlerini{" "}
              <span className="text-white font-semibold">
                24 saat içinde kuruyoruz
              </span>
              . Türkiye geneli profesyonel hizmet.
            </p>
          </ScrollReveal>

          {/* ♿ KEYWORD PILLS */}
          <ScrollReveal delay="0.35">
            <ul
              className="mt-4 grid gap-2 text-left max-w-2xl mx-auto list-none p-0 m-0"
              role="list"
              aria-label="Sahneva'nın temel avantajları"
            >
              {HERO_KEYWORDS.map(({ icon, iconLabel, text }) => (
                <li
                  key={text}
                  role="listitem"
                  className="flex items-start gap-3 rounded-2xl bg-black/20 border border-white/10 px-4 py-2 text-white/90 backdrop-blur-sm"
                >
                  <span
                    className="text-lg"
                    role="img"
                    aria-label={iconLabel}
                  >
                    {icon}
                  </span>
                  <span className="text-sm md:text-base font-medium leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* ♿ CTA BUTONLARI */}
          <ScrollReveal delay="0.4">
            <div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6"
              role="group"
              aria-label="Ana eylem düğmeleri"
            >
              <a
                href="#teklif-al"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-slate-950 transition-all hover:bg-slate-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg shadow-white/20"
                aria-label="Teklif formuna git ve ücretsiz teklif alın"
              >
                <span className="mr-2">Hemen Teklif Al</span>
                <span
                  className="inline-block translate-y-[1px] text-sm"
                  aria-hidden="true"
                >
                  ➜
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
              </a>

              <a
                href="#projeler-title"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-slate-900/40 px-8 font-medium text-slate-200 backdrop-blur-md transition-all hover:bg-slate-900/60 hover:text-white hover:border-white/40 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Başarılı projelerimizi görüntüle"
              >
                Projelerimizi İncele
              </a>
            </div>
          </ScrollReveal>

          {/* ♿ İSTATİSTİK BARI */}
          <ScrollReveal delay="0.6" direction="up">
            <div className="mt-12 p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
              <div
                className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-[20px] px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
                role="group"
                aria-label="Sahneva istatistikleri"
              >
                {HERO_STATS.map((stat) => (
                  <div
                    key={stat.id}
                    id={stat.id}
                    className="flex flex-col items-center justify-center text-center"
                    role="group"
                    aria-labelledby={`${stat.id}-value ${stat.id}-label`}
                  >
                    <span
                      id={`${stat.id}-value`}
                      className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg"
                    >
                      {stat.value}
                    </span>
                    <span
                      id={`${stat.id}-label`}
                      className="text-xs uppercase tracking-wider text-slate-400 font-semibold"
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-6 text-xs text-slate-400/80 flex items-center justify-center gap-2 drop-shadow">
              <span
                className="inline-block text-yellow-500"
                aria-hidden="true"
              >
                ★
              </span>
              <span>
                500+ Mutlu Müşteri Referansı ile Türkiye Geneli Hizmet
              </span>
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// —————————————————————————————————————————
// ANA SAYFA
// —————————————————————————————————————————
export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-slate-50">
      <StructuredData />

      {/* HERO */}
      <HeroSection />

      {/* ÖZELLİKLER ve DANIŞMANLIK */}
      <section
        className="py-12 md:py-16 bg-gradient-to-b from-slate-950 to-slate-900"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        aria-labelledby="features-section"
      >
        <div className="container px-4 space-y-12">
          <h2 id="features-section" className="sr-only">
            Sahneva'nın Özellikleri ve Danışmanlık Hizmetleri
          </h2>
          <HeroFeatureGrid />
          <ConsultationCard />
        </div>
      </section>

      {/* TEKLİF AL HEDEFİ */}
      <div id="teklif-al" className="scroll-mt-24" />

      {/* GOOGLE YORUMLARI */}
      <section
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
        aria-labelledby="reviews-section"
      >
        <h2 id="reviews-section" className="sr-only">
          Müşteri Yorumları
        </h2>
        <ReviewBannerDeferred idleTimeout={2000} rootMargin="100px" />
      </section>

      {/* HİZMETLER */}
      <section
        className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50"
        aria-labelledby="hizmetler-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container px-4">
          <ScrollReveal>
            <SectionHeader
              id="hizmetler-title"
              title="Profesyonel Ses-Işık Sistemleri ve "
              highlight="Hizmetlerimiz"
              description="Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu sağlıyoruz. Farklı şehirlerdeki ekibimizle ekran kiralama, sahne kiralama, podyum kiralama ve ses-ışık entegrasyonunu tek elden planlıyoruz."
            />
          </ScrollReveal>

          <div className="mt-12 -mx-2 sm:-mx-4 lg:-mx-6 xl:-mx-10 px-2 sm:px-4 lg:px-6 xl:px-10">
            <ServicesTabsDeferred idleTimeout={2800} rootMargin="200px" />
          </div>
        </div>
      </section>

      {/* PROJELER */}
      <section
        className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-900/95 to-slate-900"
        aria-labelledby="projeler-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container px-4">
          <ScrollReveal>
            <SectionHeader
              id="projeler-title"
              title="Başarılı "
              highlight="Projelerimiz"
              description="500'den fazla kurumsal etkinlik, konser, fuar ve özel organizasyonda güvenilir çözüm ortağı"
              theme="dark"
            />
          </ScrollReveal>

          <div className="mt-12">
            <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="250px" />
          </div>
        </div>
      </section>

      {/* KURUMSAL ORGANİZASYON */}
      <section
        className="py-16 md:py-20 bg-white"
        aria-labelledby="kurumsal-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container px-4">
          <ScrollReveal>
            <SectionHeader
              id="kurumsal-title"
              title="Kurumsal "
              highlight="Sahne, Podyum ve LED Ekran Kiralama Çözümlerimiz"
              description="Lansman, konferans, bayi toplantısı ve kurumsal etkinlikleriniz için sahne, podyum, LED ekran, ses–ışık ve teknik operasyonu tek çatı altında sunuyoruz."
              align="left"
            />
          </ScrollReveal>

          <div className="mt-12 space-y-16">
            <CorporateIntro />
            <CorporateEvents />
          </div>
        </div>
      </section>

      {/* NEDEN SAHNEVA */}
      <section
        className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
        aria-labelledby="neden-tercih-heading"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container px-4">
          <ScrollReveal>
            <SectionHeader
              id="neden-tercih-heading"
              title="Neden "
              highlight="Sahneva"
              afterText="'yı Tercih Etmelisiniz?"
              description="10 yılı aşkın deneyimimiz, uzman ekibimiz ve kaliteli ekipmanlarımızla fark yaratıyoruz"
            />
          </ScrollReveal>

          <ScrollRevealGroup>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              role="list"
              aria-label="Sahneva'yı tercih etme nedenleri"
            >
              {WHY_SAHNEVA_FEATURES.map((feature, index) => (
                <ScrollReveal
                  key={index}
                  delay={String((index % 3) * 0.2)}
                  direction="up"
                  asChild
                >
                  <article
                    role="listitem"
                    className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      aria-hidden="true"
                    />

                    <div className="relative z-10 mb-6">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white shadow-lg`}
                        aria-hidden="true"
                      >
                        <span role="img" aria-label={feature.iconLabel}>
                          {feature.icon}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
                          {feature.stat}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </ScrollRevealGroup>
        </div>
      </section>

      {/* SEO METİNLERİ */}
      <section
        className="py-16 md:py-20 bg-white"
        aria-labelledby="seo-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container px-4">
          <ScrollReveal>
            <SectionHeader
              id="seo-title"
              title="Türkiye'nin "
              highlight="1 Numaralı"
              afterText=" Etkinlik Teknoloji Partneri"
              align="center"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Sol blok */}
            <ScrollReveal direction="left" delay="0.2">
              <article className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-2xl border border-blue-100 hover:border-blue-200 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg"
                    aria-hidden="true"
                  >
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Uçtan Uca Teknik Hizmet ve Profesyonel Çözümler
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-700">Sahneva</strong> olarak
                    Türkiye genelinde{" "}
                    <Link
                      href="/sahne-kiralama"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 decoration-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                      sahne kiralama
                    </Link>
                    ,{" "}
                    <Link
                      href="/podyum-kiralama"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 decoration-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                      podyum kurulumu
                    </Link>
                    ,{" "}
                    <Link
                      href="/led-ekran-kiralama"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 decoration-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                      LED ekran kiralama
                    </Link>{" "}
                    ve{" "}
                    <Link
                      href="/ses-isik-sistemleri"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 decoration-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                      ses ışık sistemi kurulumu
                    </Link>{" "}
                    hizmetlerinde komple çözümler sunuyoruz.
                  </p>

                  <ul className="space-y-3 mt-6" role="list">
                    {SEO_TECH_FEATURES.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>

            {/* Sağ blok */}
            <ScrollReveal direction="right" delay="0.4">
              <article className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-2xl border border-purple-100 hover:border-purple-200 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg"
                    aria-hidden="true"
                  >
                    🎤
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Büyük Ölçekli Etkinlikler İçin Güçlü Altyapı
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Konser, miting, festival, fuar ve açık hava etkinlikleri
                    için yüksek kapasiteli ekipman altyapımızla hizmet
                    veriyoruz. 50.000+ kişilik organizasyonlarda aktif rol
                    alıyoruz.
                  </p>

                  <ul className="space-y-3 mt-6" role="list">
                    {SEO_INFRA_FEATURES.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 mt-2 bg-purple-500 rounded-full flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section
        className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-900/95 to-slate-900"
        aria-labelledby="sss-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container px-4">
          <ScrollReveal>
            <SectionHeader
              id="sss-title"
              title="Sıkça "
              highlight="Sorulan Sorular"
              description="Sahne, LED ekran, ses-ışık sistemleri ve kurulum süreçleri hakkında merak ettikleriniz"
              theme="dark"
            />
          </ScrollReveal>

          <div className="mt-12">
            <FaqDeferred idleTimeout={3600} rootMargin="300px" />
          </div>
        </div>
      </section>
    </div>
  );
}
