// app/(tr)/(site)/page.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";
import Link from "next/link";
// A11Y için prose içindeki Link'ler

// Statik bileşenler
import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";
// Animasyon bileşenleri (Hafif ve görünürlük alanına odaklı)
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";
// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————
const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";
const HERO_FEATURES = [
  {
    icon: "⭐",
    title: "4.9/5 Puan",
    description: "500+ Mutlu Müşteri",
    color: "text-yellow-400",
  },
  {
    icon: "⚡",
    title: "Aynı Gün",
    description: "Hızlı Kurulum",
    color: "text-cyan-400",
  },
  {
    icon: "👑",
    title: "Premium",
    description: "Kalite Garantisi",
    color: "text-purple-400",
  },
];
const HERO_KEYWORDS = [
  { text: "Sahne Kiralama", gradient: "text-blue-300" },
  { text: "LED Ekran", gradient: "text-purple-300" },
  { text: "Ses-Işık Sistemleri", gradient: "text-cyan-300" },
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
  },
  {
    href: `https://wa.me/905453048671?text=${CTA_WHATSAPP_MESSAGE}&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp`,
    label: "WhatsApp'tan Teklif Alın",
    icon: "💬",
    target: "_blank",
    rel: "nofollow noopener",
    srHint: "(yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
    ariaLabel: "WhatsApp üzerinden hızlı teklif alın",
  },
];
const CTA_BASE_CLASS =
  "w-full sm:w-auto min-w-[180px] min-h-[44px] text-center group relative text-white font-bold text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105 border border-white/20 focus-ring";
const CTA_OVERLAY_CLASS =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200";

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

const HERO_IMAGE_STYLE = Object.freeze({
  filter: "brightness(0.6) contrast(1.1) saturate(1.05)",
});

const HERO_OVERLAY_ANIMATION_STYLE = Object.freeze({
  animationDuration: "8s",
});

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
// PERFORMANS: Off-screen içeriği hızlıca atlamak için
const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
});
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
export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (Schema.org) - SAYFAYA ÖZEL ŞEMALAR
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
        "@type": "VideoObject", // 👈 VideoObject eklendi
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
  const themeClasses = SECTION_THEMES[theme];
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`${alignment} mb-12`}>
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
    </div>
  );
}

function KeywordPills() {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6 max-w-4xl mx-auto">
      {HERO_KEYWORDS.map(({ text, gradient }) => (
        <span
          key={text}
          className={`text-sm md:text-base font-semibold px-3 py-1 ${gradient} bg-black/40 rounded-lg border border-white/10`}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

function CTAButton({
  href,
  label,
  icon,
  gradient = "from-blue-600 to-purple-600",
  srHint,
  ariaLabel,
  ...rest
}) {
  return (
    <a
      href={href}
      className={`${CTA_BASE_CLASS} bg-gradient-to-r ${gradient}`}
      // A11y için aria-label kullanımı
      aria-label={ariaLabel || (srHint ? `${label} ${srHint}` : label)} 
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span aria-hidden="true">{icon}</span> {label}
      </span>
      <div className={CTA_OVERLAY_CLASS} aria-hidden="true" />
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
      {CTA_BUTTONS.map(({ srHint, gradient, ariaLabel, ...cta }) => (
        <CTAButton
          key={cta.href}
          gradient={gradient}
          srHint={srHint}
          ariaLabel={ariaLabel}
          {...cta}
        />
      ))}
    </div>
  );
}

function HeroFeatureGrid() {
  return (
    <ul
      className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto list-none p-0 m-0"
      role="list"
    >
      {HERO_FEATURES.map((item, index) => (
        <li key={item.title} className="m-0 p-0">
          <ScrollReveal
            asChild
            delay={String(index * 0.5)}
            direction="scale"
          >
            <div className="group bg-slate-900/80 rounded-xl p-4 border border-white/10">
              <div
                className={`text-2xl mb-2 ${item.color}`}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div className="text-white font-bold text-base mb-1">
                {item.title}
              </div>
              <div className="text-gray-200 text-xs">
                {item.description}
              </div>
            </div>
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}

function ConsultationCard() {
  return (
    <div className="bg-gradient-to-r from-blue-700/90 to-purple-700/90 rounded-2xl p-6 md:p-8 border border-white/20 max-w-4xl mx-auto">
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
          <p className="text-white text-xl md:text-2xl font-bold mb-2">
            Ücretsiz Profesyonel Danışmanlık
          </p>
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

function HeroBackgroundImage({ alt = HERO_IMAGE_ALT, ariaHidden = false }) {
  return (
    <Image
      src={heroImg}
      alt={alt}
      fill
      sizes="100vw"
      priority
      fetchPriority="high"
      placeholder="empty"      // LCP için optimize edildi
      quality={50}             // LCP için optimize edildi
      loading="eager"          // LCP için optimize edildi
      decoding="sync"          // LCP için optimize edildi
      className="absolute inset-0 w-full h-full object-cover object-center"
      aria-hidden={ariaHidden}
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

      {/* HERO – Hız odaklı, animasyonlu */}
      <section
        className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-black"
        aria-labelledby="hero-title"
      >
        {/* LCP görseli */}
        <div className="absolute inset-0" aria-hidden="true">
          <HeroBackgroundImage ariaHidden />
          {/* Overlay katmanları (Animasyon eklendi) */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70"
            style={HERO_IMAGE_STYLE}
          />
          {/* Hafif parlama animasyonu */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse motion-reduce:animate-none"
            style={HERO_OVERLAY_ANIMATION_STYLE}
            aria-hidden="true"
          />
        </div>

        {/* İçerik */}
        <div className="relative z-10 container py-10">
          <div className="max-w-3xl mx-auto text-center">
            
            <ScrollReveal asChild> {/* 👈 SCROLL REVEAL BAŞLANGIÇ */}
              <div className="inline-flex items-center gap-3 bg-black/50 rounded-full px-4 py-2 border border-white/10 text-xs md:text-sm text-slate-100">
                <span className="w-2 h-2 bg-green-400 rounded-full" aria-hidden="true" />
                Türkiye Geneli Profesyonel Hizmet
              </div>
            </ScrollReveal>

            <ScrollReveal delay="1" asChild> {/* 👈 SCROLL REVEAL BAŞLIK */}
              <h1
                id="hero-title"
                className="mt-4 text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
              >
                Türkiye Geneli Profesyonel Sahne, Podyum ve LED Ekran Kiralama Çözümleri
              </h1>
            </ScrollReveal>

            <ScrollReveal delay="2"> {/* 👈 SCROLL REVEAL KEYWORDS ve Açıklama */}
              <>
                <KeywordPills />
                <p className="text-slate-100 text-sm md:text-lg mt-2 md:mt-4 max-w-3xl mx-auto leading-relaxed">
                  500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı kurulum ile etkinliğinizde yanınızdayız. Kurumsal etkinlikler, bayi toplantıları, konserler, festivaller ve açık hava organizasyonları için sahne kiralama, podyum kiralama, LED ekran kiralama, ses-ışık sistemleri ve yayın altyapısını tek merkezden sunuyoruz.
                </p>

                <p className="text-slate-100/90 text-xs md:text-base mt-3 max-w-3xl mx-auto leading-relaxed">
                  Etkinlik mekanına uygun modüler kurulum planları, enerji hesaplaması ve truss tasarımı yaparak görsel bütünlüğü koruyor, profesyonel teknik ekibimizle her şehirde güvenli ve ölçülebilir performans sağlıyoruz. Teknik ekipman listesinden lojistik planlamaya, içerik yönetiminden sahne önü güvenlik adımlarına kadar her aşamayı şeffaf biçimde raporluyor; olası risklere karşı yedek senaryolar hazır tutarak marka deneyiminizi güvence altına alıyoruz.
                </p>
              </>
            </ScrollReveal>

            <ScrollReveal delay="3"> {/* 👈 SCROLL REVEAL CTA */}
              <CTAGroup />
            </ScrollReveal>

          </div>
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

      {/* Hero altı: feature + danışmanlık (artık LCP dışında) */}
      <section className="py-10 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container space-y-8">
          <HeroFeatureGrid /> {/* Animasyon HeroFeatureGrid içinde yapıldı */}
          <ScrollReveal delay="1">
            <ConsultationCard />
          </ScrollReveal>
        </div>
      </section>

      {/* #teklif-al hedefi */}
      <div id="teklif-al" className="sr-only" />

      {/* Google review banner – deferred */}
      <ReviewBannerDeferred idleTimeout={2000} rootMargin="0px" />

      {/* Hizmetler */}
      <section
        className="relative py-12 bg-gradient-to-b from-white to-neutral-50/80"
        aria-labelledby="hizmetler-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at-center,transparent_20%,white)]"
          aria-hidden="true"
        />
        <div className="relative z-10 space-y-8">
          <div className="container">

            <ScrollReveal>
              <SectionHeader
                id="hizmetler-title"
                title="Profesyonel Ses-Işık Sistemleri ve "
                highlight="Hizmetlerimiz"
                description="Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu sağlıyoruz. Farklı şehirlerdeki ekibimizle ekran kiralama, sahne kiralama, podyum kiralama ve ses-ışık entegrasyonunu tek elden planlayarak kurumsal etkinliklerinizin akışını kesintisiz kılıyoruz. İster butik lansman ister geniş katılımlı festival olsun, teknik çizimler, güvenlik kontrolleri ve canlı yayın desteğiyle uçtan uca çözümler sunuyoruz."
              />
            </ScrollReveal>
            
          </div>

          <div className="-mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12">
            <ServicesTabsDeferred idleTimeout={2800} rootMargin="320px" />
          </div>
        </div>
      </section>

      {/* Projeler */}
      <section
        className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95"
        aria-labelledby="projeler-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container">
          
          <ScrollReveal>
            <SectionHeader
              id="projeler-title"
              title="Başarılı "
              highlight="Projelerimiz"
              description="500'den fazla kurumsal etkinlik, konser, fuar ve özel organizasyonda güvenilir çözüm ortağı"
              theme="dark"
            />
          </ScrollReveal>
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
          
          <ScrollReveal>
            <SectionHeader
              id="kurumsal-title"
              title="Kurumsal "
              highlight="Sahne, Podyum ve LED Ekran Kiralama Çözümlerimiz"
              description="Lansman, konferans, bayi toplantısı ve kurumsal etkinlikleriniz için sahne, podyum, LED ekran, ses–ışık ve teknik operasyonu tek çatı altında sunuyoruz."
            />
          </ScrollReveal>
          <CorporateIntro />
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
          
          <ScrollReveal>
            <SectionHeader
              id="neden-tercih-heading"
              title="Neden "
              highlight="Sahneva"
              afterText="'yı Tercih Etmelisiniz?"
              description="10 yılı aşkın deneyimimiz, uzman ekibimiz ve kaliteli ekipmanlarımızla fark yaratıyoruz"
            />
          </ScrollReveal>

          <ScrollRevealGroup> {/* 👈 Grup Animasyonu */}
            <ul
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0"
              role="list"
            >
              {WHY_SAHNEVA_FEATURES.map(
                ({ icon, title, desc, stat }, i) => (
                  <li key={i} className="m-0 p-0">
                    <ScrollReveal
                      asChild
                      delay={String(i % 3)}
                      direction="scale"
                    >
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
                        <p
                          id={`why-card-${i}-title`}
                          className="font-black text-lg mb-3 text-neutral-900 group-hover:text-blue-600 transition-colors"
                        >
                          {title}
                        </p>
                        <p className="text-neutral-700 leading-relaxed text-sm">
                          {desc}
                        </p>
                      </article>
                    </ScrollReveal>
                  </li>
                )
              )}
            </ul>
          </ScrollRevealGroup>
        </div>
      </section>

      {/* SEO metinleri */}
      <section
        className="py-12 bg-white"
        aria-labelledby="seo-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container">
          
          <ScrollReveal>
            <SectionHeader
              id="seo-title"
              title="Türkiye'nin "
              highlight="1 Numaralı"
              afterText=" Etkinlik Teknoloji Partneri"
              theme="light"
            />
          </ScrollReveal>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
            {/* Sol blok */}
            <ScrollReveal direction="left" asChild> {/* 👈 Soldan Giriş Animasyonu */}
              <article className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <h3 className="font-black text-xl mb-4 text-neutral-900 flex items-center gap-3">
                  <span
                    className="bg-blue-500 text-white p-2 rounded-lg"
                    aria-hidden="true"
                  >
                    🚀
                  </span>
                  Uçtan Uca Teknik Hizmet ve Profesyonel Çözümler
                </h3>
                <div className="prose max-w-none text-neutral-700">
                  <p className="text-base leading-relaxed">
                    <strong>Sahneva</strong> olarak Türkiye genelinde{" "}
                    {/* A11y ve performansı artırmak için <Link> kullanımı */}
                    <Link
                      href="/sahne-kiralama"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors"
                    >
                      sahne kiralama
                    </Link>
                    ,{" "}
                    <Link
                      href="/podyum-kiralama"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors"
                    >
                      podyum kurulumu
                    </Link>
                    ,{" "}
                    <Link
                      href="/led-ekran-kiralama"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors"
                    >
                      LED ekran kiralama
                    </Link>{" "}
                    ve{" "}
                    <Link
                      href="/ses-isik-sistemleri"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors"
                    >
                      ses ışık sistemi kurulumu
                    </Link>{" "}
                    hizmetlerinde komple çözümler sunuyoruz.
                  </p>
                  <ul className="mt-4 space-y-2 text-neutral-700" role="list">
                    {SEO_TECH_FEATURES.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>

            {/* Sağ blok */}
            <ScrollReveal direction="right" asChild> {/* 👈 Sağdan Giriş Animasyonu */}
              <article className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <h3 className="font-black text-xl mb-4 text-neutral-900 flex items-center gap-3">
                  <span
                    className="bg-purple-500 text-white p-2 rounded-lg"
                    aria-hidden="true"
                  >
                    🎤
                  </span>
                  Büyük Ölçekli Etkinlikler İçin Güçlü Altyapı
                </h3>
                <div className="prose max-w-none text-neutral-700">
                  <p className="text-base leading-relaxed">
                    Konser, miting, festival, fuar ve açık hava etkinlikleri
                    için yüksek kapasiteli ekipman altyapımızla hizmet
                    veriyoruz.
                    50.000+ kişilik organizasyonlarda aktif rol
                    alıyoruz.
                  </p>
                  <ul className="mt-4 space-y-2 text-neutral-700" role="list">
                    {SEO_INFRA_FEATURES.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                          aria-hidden="true"
                        />
                        {item}
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
        className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95"
        aria-labelledby="sss-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container">
          
          <ScrollReveal>
            <SectionHeader
              id="sss-title"
              title="Sıkça "
              highlight="Sorulan Sorular"
              description="Sahne, LED ekran, ses-ışık sistemleri ve kurulum süreçleri hakkında merak ettikleriniz"
              theme="dark"
            />
          </ScrollReveal>
          <FaqDeferred idleTimeout={3600} rootMargin="400px" />
        </div>
      </section>
    </div>
  );
}
