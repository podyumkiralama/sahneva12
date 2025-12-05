// app/(tr)/(site)/page.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";
import Link from "next/link";

// Statik bileşenler
import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";

// Performans için gecikmeli yüklenen bileşenler
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

// Animasyon bileşenleri
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————
const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

// Code 1'in görsel zenginliği + Code 2'nin temiz yapısı
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
  { text: "Sahne Kiralama", gradient: "from-blue-400 to-blue-600" },
  { text: "LED Ekran", gradient: "from-purple-400 to-purple-600" },
  { text: "Ses-Işık Sistemleri", gradient: "from-cyan-400 to-cyan-600" },
  { text: "Podyum Kurulumu", gradient: "from-emerald-400 to-emerald-600" },
];

const CTA_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Sahneva web sitesinden yazıyorum. Sahne ve etkinlik çözümleri için hızlı teklif almak istiyorum."
);

// Code 1'in güçlü CTA tasarımı + Code 2'nin UTM ve A11y detayları
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
    href: `https://wa.me/905453048671?text=${CTA_WHATSAPP_MESSAGE}&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp`,
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

// Below-the-fold render maliyeti için (Code 2'den)
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
});

export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (Schema.org) - Code 2'nin zengin versiyonu
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
          "Sahneva’nın sahne, podyum, LED ekran ve ses-ışık sistemleriyle gerçekleştirdiği kurulum ve etkinliklerden kısa bir özet.",
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
  const isLight = theme === "light";
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`${alignment} mb-10 md:mb-14`}>
      {/* Badge – Code 1 stili */}
      <div className="inline-flex items-center gap-2 mb-3">
        <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
        <span
          className={`text-sm font-semibold uppercase tracking-wider ${
            isLight ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Profesyonel Hizmet
        </span>
      </div>
      <h2
        id={id}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
          isLight ? "text-neutral-900" : "text-white"
        } mb-4 leading-tight`}
      >
        {title}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">
          {highlight}
        </span>
        {afterText}
      </h2>
      {description && (
        <p
          className={`text-base md:text-lg ${
            isLight ? "text-neutral-700" : "text-slate-200"
          } max-w-3xl mx-auto leading-relaxed ${
            align === "left" ? "md:mx-0" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function CTAButton({
  href,
  label,
  icon,
  gradient,
  hoverGradient,
  srHint,
  ariaLabel,
  iconColor,
  ...rest
}) {
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
        shadow-lg hover:shadow-xl hover:scale-105
        transition-all duration-300 
        border border-white/20 
        focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black
        overflow-hidden
      `}
      aria-label={ariaLabel || (srHint ? `${label} ${srHint}` : label)}
      {...rest}
    >
      {/* parlayan overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <span className="relative z-10 flex items-center justify-center gap-3">
        <span
          className={`text-xl ${iconColor || "text-white"}`}
          aria-hidden="true"
        >
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
      {CTA_BUTTONS.map(({ srHint, gradient, hoverGradient, ariaLabel, ...cta }) => (
        <CTAButton
          key={cta.href}
          gradient={gradient}
          hoverGradient={hoverGradient}
          srHint={srHint}
          ariaLabel={ariaLabel}
          {...cta}
        />
      ))}
    </div>
  );
}

// Hero Görseli: Code 1 görsel kalitesi + biraz optimize quality
function HeroBackgroundImage({ alt = HERO_IMAGE_ALT }) {
  return (
    <Image
      src={heroImg}
      alt={alt}
      fill
      sizes="100vw"
      priority={true} // LCP için kritik
      fetchPriority="high"
      loading="eager"
      placeholder="blur"
      quality={75} // 85'ten hafif aşağı, performans/kalite dengeli
      className="absolute inset-0 w-full h-full object-cover object-center"
      style={{
        filter: "brightness(0.65) contrast(1.1) saturate(1.1)",
      }}
    />
  );
}

// —————————————————————————————————————————
// ANA SAYFA
// —————————————————————————————————————————

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <StructuredData />

      {/* HERO SECTION – Code 1 görünüm + Code 2 mantık */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black"
        aria-labelledby="hero-title"
      >
        {/* Arkaplan */}
        <div className="absolute inset-0" aria-hidden="true">
          <HeroBackgroundImage />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse opacity-30" />
        </div>

        {/* İçerik */}
        <div className="relative z-10 container px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <ScrollReveal direction="down" delay="0.2">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-5 py-3 border border-white/10 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm md:text-base font-semibold text-white">
                  Türkiye Geneli Profesyonel Hizmet • 500+ Başarılı Proje
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="0.4">
              <h1
                id="hero-title"
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
              >
                Profesyonel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Sahne
                </span>
                ,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Podyum
                </span>{" "}
                ve{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  LED Ekran
                </span>{" "}
                Kiralama
              </h1>
            </ScrollReveal>

            <ScrollReveal delay="0.6">
              <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8 max-w-4xl mx-auto">
                {HERO_KEYWORDS.map(({ text, gradient }) => (
                  <span
                    key={text}
                    className={`text-sm font-semibold px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-full border border-white/20 shadow-lg`}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay="0.8">
              <div className="max-w-4xl mx-auto space-y-4 mb-8">
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
                  500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli
                  hızlı kurulum ile etkinliğinizde yanınızdayız. Kurumsal
                  etkinlikler, bayi toplantıları, konserler, festivaller ve açık
                  hava organizasyonları için sahne kiralama, podyum kiralama,
                  LED ekran kiralama, ses-ışık sistemleri ve yayın altyapısını
                  tek merkezden sunuyoruz.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="1">
              <CTAGroup />
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER & DANIŞMANLIK */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container px-4 space-y-12">
          {/* Feature Grid – Code 1 görünümü + düzgün <ul>/<li> */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {HERO_FEATURES.map((item, index) => (
              <li key={item.title}>
                <ScrollReveal
                  delay={String(index * 0.2)}
                  direction="up"
                  asChild
                >
                  <div
                    className={`
                    group relative ${item.bgColor} rounded-2xl p-6 border ${item.borderColor}
                    backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl h-full
                  `}
                  >
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                      <span
                        className={`text-2xl ${item.color}`}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div
                        className={`text-3xl font-bold ${item.color} mb-2`}
                      >
                        {item.title}
                      </div>
                      <div className="text-slate-200 text-sm">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>

          {/* Danışmanlık Kartı – Code 1 */}
          <ScrollReveal delay="0.5" direction="up">
            <div className="relative bg-gradient-to-r from-blue-800/90 via-purple-800/90 to-blue-800/90 rounded-3xl p-8 md:p-10 border border-white/20 max-w-6xl mx-auto overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-32 translate-x-32" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 text-center lg:text-left">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
                    Ücretsiz Profesyonel Danışmanlık
                  </h3>
                  <p className="text-slate-200 text-base md:text-lg">
                    Etkinliğiniz için en uygun sahne çözümlerini{" "}
                    <span className="text-yellow-300 font-bold">
                      2 saat içinde
                    </span>{" "}
                    tekliflendirelim.
                  </p>
                </div>
                <div className="flex-shrink-0 lg:ml-auto">
                  <a
                    href="#teklif-al"
                    className="inline-flex items-center justify-center min-h-[52px] px-8 bg-white text-blue-900 hover:bg-gray-50 font-bold text-lg rounded-xl transition-all shadow-lg"
                  >
                    Hemen Teklif Al
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div id="teklif-al" className="scroll-mt-24" />

      {/* Google review banner – deferred */}
      <ReviewBannerDeferred idleTimeout={2000} rootMargin="100px" />

      {/* HİZMETLER */}
      <section
        className="relative py-16 md:py-20 bg-gradient-to-b from-white to-blue-50"
        aria-labelledby="hizmetler-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at-center,transparent_20%,white)] opacity-60"
          aria-hidden="true"
        />
        <div className="relative z-10 container px-4">
          <ScrollReveal>
            <SectionHeader
              id="hizmetler-title"
              title="Profesyonel Ses-Işık Sistemleri ve "
              highlight="Hizmetlerimiz"
              description="Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu sağlıyoruz."
            />
          </ScrollReveal>

          <div className="mt-12">
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
              description="500'den fazla kurumsal etkinlik, konser ve fuar."
              theme="dark"
            />
          </ScrollReveal>
          <div className="mt-12">
            <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="250px" />
          </div>
        </div>
      </section>

      {/* KURUMSAL */}
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
              highlight="Sahne & LED Çözümleri"
              description="Lansman, konferans ve bayi toplantıları için profesyonel operasyon."
              align="left"
            />
          </ScrollReveal>
          <div className="mt-12 space-y-16">
            <CorporateIntro />
            <CorporateEvents />
          </div>
        </div>
      </section>

      {/* NEDEN BİZ */}
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
              afterText="?"
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
                  <div className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    <div className="relative z-10 mb-4">
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal direction="left" delay="0.2">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Uçtan Uca Teknik Hizmet
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Sahneva</strong> olarak Türkiye genelinde{" "}
                  <Link
                    href="/sahne-kiralama"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    sahne kiralama
                  </Link>
                  ,{" "}
                  <Link
                    href="/led-ekran-kiralama"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    LED ekran kiralama
                  </Link>{" "}
                  ve{" "}
                  <Link
                    href="/ses-isik-sistemleri"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    ses ışık sistemi
                  </Link>{" "}
                  hizmetlerinde komple çözümler sunuyoruz.
                </p>
                <ul className="space-y-3">
                  {SEO_TECH_FEATURES.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay="0.4">
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-xl border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Güçlü Altyapı & Kapasite
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Konser, miting ve festivaller için yüksek kapasiteli ekipman
                  parkurumuz mevcuttur. 50.000+ kişilik organizasyonlarda aktif
                  rol alıyoruz.
                </p>
                <ul className="space-y-3">
                  {SEO_INFRA_FEATURES.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 mt-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
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