// app/(tr)/(site)/page.js
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

// Hero arka plan görseli
import heroImg from "@/public/img/hero-bg.webp";

// ================= SABİT VERİLER =================

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

const HERO_FEATURES = [
  {
    icon: "⭐",
    title: "4.9/5 Puan",
    description: "500+ Mutlu Müşteri",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    icon: "⚡",
    title: "Aynı Gün",
    description: "Hızlı Kurulum",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    icon: "👑",
    title: "Premium",
    description: "Kalite Garantisi",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
];

const HERO_KEYWORDS = [
  { icon: "✅", text: "Sahne, podyum ve LED ekran tek ekipten" },
  { icon: "🚚", text: "81 ilde hızlı kurulum ve teknik destek" },
  { icon: "📊", text: "Planlama, çizim ve bütçe optimizasyonu" },
];

const HERO_STATS = [
  { label: "Tamamlanan Proje", value: "500+" },
  { label: "Kurulum Süresi", value: "2–6 saat" },
  { label: "Memnuniyet", value: "%98" },
  { label: "Hizmet Ağı", value: "81 il" },
];

const STATS_DATA = [
  { value: "81", label: "İl Hizmeti" },
  { value: "500+", label: "Tamamlanan Proje" },
  { value: "24/7", label: "Teknik Destek" },
  { value: "%100", label: "Zamanında Teslim" },
];

const CTA_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Sahneva web sitesinden yazıyorum. Sahne ve etkinlik çözümleri için hızlı teklif almak istiyorum."
);

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
    srHint: "Hemen Ara",
    gradient: "from-blue-600 to-indigo-700",
    hoverGradient: "from-blue-700 to-indigo-800",
    iconColor: "text-blue-100",
  },
  {
    href: `https://wa.me/905453048671?text=${CTA_WHATSAPP_MESSAGE}`,
    label: "WhatsApp'tan Teklif Al",
    icon: "💬",
    target: "_blank",
    rel: "nofollow noopener",
    srHint: "(yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
    hoverGradient: "from-green-700 to-emerald-800",
    iconColor: "text-green-100",
    ariaLabel: "WhatsApp üzerinden hızlı teklif alın",
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
    title: "Yüksek Müşteri Memnuniyeti",
    desc: "Her organizasyonda %98'in üzerinde müşteri memnuniyeti. Referanslar ve Google yorumları bizim güvencemiz.",
    stat: "%98 Memnuniyet",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: "⚡",
    title: "Hızlı Kurulum ve Teslimat",
    desc: "Aynı gün profesyonel sahne, LED ekran ve ses-ışık kurulumları.",
    stat: "2–6 Saat",
    gradient: "from-cyan-400 to-blue-400",
  },
  {
    icon: "🖥️",
    title: "Premium LED Ekran Teknolojisi",
    desc: "P2–P6 pixel pitch ile yüksek çözünürlüklü indoor/outdoor LED ekran.",
    stat: "P2–P6",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: "👷",
    title: "Uzman Teknik Ekip",
    desc: "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanlarından kadro.",
    stat: "15+ Uzman",
    gradient: "from-emerald-400 to-green-400",
  },
  {
    icon: "💰",
    title: "Rekabetçi Fiyat Garantisi",
    desc: "Kaliteli hizmeti uygun fiyatla, bütçenize uygun çözümler.",
    stat: "%30 Tasarruf",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    icon: "🏙️",
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

const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
  containIntrinsicSize: "1px 800px",
});

export const revalidate = 3600;

// ================= ARKA PLAN GÖRSEL BİLEŞENİ =================

function HeroBackgroundImage({ alt = HERO_IMAGE_ALT }) {
  return (
    <Image
      src={heroImg}
      alt={alt}
      fill
      sizes="100vw"
      priority
      placeholder="blur"
      quality={85}
      className="absolute inset-0 w-full h-full object-cover object-center"
      style={{
        filter: "brightness(0.9) contrast(1.05) saturate(1.05)",
      }}
    />
  );
}

// ================= JSON-LD =================

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
        thumbnailUrl: [
          "https://img.youtube.com/vi/173gBurWSRQ/hqdefault.jpg",
        ],
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

// ================= PARÇALI BİLEŞENLER =================

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
        <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
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

function KeywordPills() {
  return (
    <ul className="mt-6 grid gap-3 text-left max-w-2xl mx-auto list-none p-0 m-0">
      {HERO_KEYWORDS.map(({ icon, text }) => (
        <li
          key={text}
          className="flex items-start gap-3 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white/90"
        >
          <span className="text-lg" aria-hidden="true">
            {icon}
          </span>
          <span className="text-base font-semibold leading-relaxed">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CTAButton({
  href,
  label,
  icon,
  gradient = "from-blue-600 to-indigo-700",
  hoverGradient = "from-blue-700 to-indigo-800",
  srHint,
  ariaLabel,
  iconColor = "text-white",
  ...rest
}) {
  const accessibleLabel = ariaLabel
    ? `${label} — ${ariaLabel}`
    : srHint
      ? `${label} ${srHint}`
      : label;

  return (
    <a
      href={href}
      className={`
        group relative inline-flex items-center justify-center 
        min-w-[200px] min-h-[52px] 
        text-center text-white font-bold text-base md:text-lg 
        px-6 py-3 rounded-xl 
        bg-gradient-to-r ${gradient}
        hover:bg-gradient-to-r ${hoverGradient}
        shadow-lg hover:shadow-xl 
        transition-all duration-300 
        border border-white/20 
        focus:outline-none focus:ring-3 focus:ring-white/30
        overflow-hidden
      `}
      aria-label={accessibleLabel}
      {...rest}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <span className="relative z-10 flex items-center justify-center gap-3">
        <span className={`text-xl ${iconColor}`} aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
      </span>
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
      {CTA_BUTTONS.map((cta) => (
        <CTAButton key={cta.href} {...cta} />
      ))}
    </div>
  );
}

function HeroFeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {HERO_FEATURES.map((item, index) => (
        <ScrollReveal
          key={item.title}
          delay={String(index * 0.2)}
          direction="up"
          asChild
        >
          <div
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
              <span className={`text-2xl ${item.color}`} aria-hidden="true">
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
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function ConsultationCard() {
  return (
    <ScrollReveal delay="0.5" direction="up">
      <div className="relative bg-gradient-to-r from-blue-800/90 via-purple-800/90 to-blue-800/90 rounded-3xl p-8 md:p-10 border border-white/20 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-32 translate-x-32" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              🎯
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">
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
              className="inline-flex items-center justify-center min-h-[52px] px-8 bg-white text-blue-900 hover:bg-gray-50 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-3 focus:ring-white/50"
              aria-label="Hemen Teklif Al — Ücretsiz danışmanlık ve teklif almak için aşağı kaydır"
            >
              Hemen Teklif Al
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ===================== HERO (YENİ STRIPE TARZI) =====================

function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#020617]"
      aria-labelledby="hero-title"
    >
      {/* ARKA PLAN GÖRSELİ */}
      <div className="absolute inset-0 z-0">
        <HeroBackgroundImage />

        {/* GRID DESENİ */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:26px_26px] opacity-30"></div>

        {/* SPOTLIGHT EFEKTİ */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-purple-500/25 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/15 blur-[110px] rounded-full mix-blend-screen"></div>

        {/* FOTOĞRAFI OKUNURLU TUTAN ÖN GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/40 to-[#020617]/75" />
      </div>

      {/* HERO İÇERİK */}
      <div className="relative z-10 container px-4 py-24 flex flex-col items-center text-center max-w-5xl">
        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-lg mb-6">
          <span
            className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"
            aria-hidden="true"
          ></span>
          <span className="text-xs text-emerald-100 font-medium tracking-wide">
            Sahneva Organizasyon • Türkiye Geneli Profesyonel Hizmet
          </span>
        </div>

        {/* BAŞLIK */}
        <h1
          id="hero-title"
          className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.1] text-white"
        >
          Profesyonel&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Sahne & Prodüksiyon
          </span>
          <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300">
            Çözüm Ortağınız
          </span>
        </h1>

        {/* ALT AÇIKLAMA */}
        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
          Etkinliğiniz için sahne, podyum, LED ekran ve ses–ışık sistemlerini
          tek ekipten planlıyor, Türkiye&apos;nin her yerine kusursuz kurulum
          sağlıyoruz.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/905453048671"
            className="group relative inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-semibold text-slate-900 hover:bg-slate-200 hover:scale-105 transition-all shadow-lg"
          >
            <span className="mr-2">Hemen Teklif Al</span>
            <span
              className="text-lg group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            >
              ➜
            </span>
          </a>

          <a
            href="#projeler-title"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-medium text-slate-200 backdrop-blur-xl hover:bg-white/10 hover:text-white transition-all"
          >
            Projelerimizi İncele
          </a>
        </div>

        {/* İSTATİSTİKLER */}
        <div className="mt-14 p-[2px] rounded-3xl bg-white/10">
          <div className="bg-[#020617]/70 backdrop-blur-xl border border-white/10 rounded-[22px] px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_DATA.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 tracking-wider">
                  {stat.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== ANA SAYFA =====================

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <StructuredData />

      {/* HERO – senin tasarımın */}
      <HeroSection />

      {/* ÖZELLİKLER ve DANIŞMANLIK */}
      <section
        className="py-12 md:py-16 bg-gradient-to-b from-slate-950 to-slate-900"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container px-4 space-y-12">
          <HeroFeatureGrid />
          <ConsultationCard />
        </div>
      </section>

      {/* TEKLİF AL HEDEFİ */}
      <div id="teklif-al" className="scroll-mt-24" />

      {/* GOOGLE YORUMLARI */}
      <section style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {WHY_SAHNEVA_FEATURES.map((feature, index) => (
                <ScrollReveal
                  key={index}
                  delay={String((index % 3) * 0.2)}
                  direction="up"
                  asChild
                >
                  <div className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className="relative z-10 mb-6">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white shadow-lg`}
                      >
                        {feature.icon}
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

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
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
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-2xl border border-blue-100 hover:border-blue-200 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
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
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 decoration-2 transition-colors"
                    >
                      sahne kiralama
                    </Link>
                    ,{" "}
                    <Link
                      href="/podyum-kiralama"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 decoration-2 transition-colors"
                    >
                      podyum kurulumu
                    </Link>
                    ,{" "}
                    <Link
                      href="/led-ekran-kiralama"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 decoration-2 transition-colors"
                    >
                      LED ekran kiralama
                    </Link>{" "}
                    ve{" "}
                    <Link
                      href="/ses-isik-sistemleri"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 decoration-2 transition-colors"
                    >
                      ses ışık sistemi kurulumu
                    </Link>{" "}
                    hizmetlerinde komple çözümler sunuyoruz.
                  </p>

                  <ul className="space-y-3 mt-6">
                    {SEO_TECH_FEATURES.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            {/* Sağ blok */}
            <ScrollReveal direction="right" delay="0.4">
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-2xl border border-purple-100 hover:border-purple-200 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
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

                  <ul className="space-y-3 mt-6">
                    {SEO_INFRA_FEATURES.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 bg-purple-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
