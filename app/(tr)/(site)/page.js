// app/(tr)/(site)/page.js
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

// Animasyon bileşenleri
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————
const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

const HERO_FEATURES = [
  { icon: "⭐", title: "4.9/5 Puan", description: "500+ Mutlu Müşteri", color: "from-yellow-400 to-orange-400" },
  { icon: "⚡", title: "Aynı Gün", description: "Hızlı Kurulum", color: "from-blue-400 to-cyan-400" },
  { icon: "👑", title: "Premium", description: "Kalite Garantisi", color: "from-purple-400 to-pink-400" },
];

const HERO_KEYWORDS = [
  { text: "Sahne Kiralama", gradient: "from-blue-400 to-purple-400" },
  { text: "LED Ekran", gradient: "from-purple-400 to-cyan-400" },
  { text: "Ses-Işık Sistemleri", gradient: "from-cyan-400 to-blue-400" },
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
    srHint: "",
  },
  {
    href:
      "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer",
    srHint: "(yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-600",
  },
];

const CTA_BASE_CLASS =
  "w-full sm:w-auto min-w-[180px] text-center group relative text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:brightness-110 border border-white/20 backdrop-blur-sm focus-ring";

const CTA_OVERLAY_CLASS =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300";

const SECTION_THEMES = {
  light: {
    title: "text-neutral-900",
    description: "text-neutral-600",
  },
  dark: {
    title: "text-white",
    description: "text-white/80",
  },
};

const HERO_IMAGE_STYLE = Object.freeze({
  filter: "brightness(0.7) contrast(1.1) saturate(1.05)",
});

const HERO_OVERLAY_ANIMATION_STYLE = Object.freeze({
  animationDuration: "8s",
});

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

// ISR
export const revalidate = 3600;

// —————————————————————————————————————————
// JSON-LD (Schema.org) – Sadece sayfaya özgü tipler
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
        name: "Sahne Sistemleri, LED Ekran, Ses-Işık | Türkiye Geneli | Sahneva",
        description:
          "Sahneva ile sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama çözümlerini keşfedin. İstanbul merkezli, Türkiye geneli hizmet.",
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
            itemOffered: {
              "@type": "Service",
              name: "Podyum Kiralama",
              description: "Podyum sahne kiralama hizmeti",
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
            itemOffered: {
              "@type": "Service",
              name: "Çadır Kiralama",
              description: "Etkinlik çadırı kiralama",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "300.00",
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
              name: "Sandalye Kiralama",
              description: "Etkinlik sandalyesi kiralama",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "200.00",
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
            itemOffered: {
              "@type": "Service",
              name: "Masa Kiralama",
              description: "Davet masası kiralama",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "800.00",
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
            itemOffered: {
              "@type": "Service",
              name: "Sahne Kiralama",
              description: "Konser ve etkinlik sahnesi kiralama",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ses-Işık Sistemleri",
              description: "Profesyonel ses ve ışık ekipmanı",
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
      },
      {
        "@type": "ImageObject",
        "@id": IMAGE_ID,
        contentUrl: `${SITE_URL}/og/sahneva-home.jpg`,
        width: 1200,
        height: 630,
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
              text:
                "Sahne ve podyum kiralama fiyatları; kullanılacak alanın m² büyüklüğüne, yüksekliğe, kurulacağı zemine, etkinlik süresine ve şehre göre hesaplanır. Standart paketlerimiz dışında, etkinliğinize özel keşif yaparak net fiyatlandırma sunuyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "LED ekran kiralama fiyatına neler dahil?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "LED ekran kiralama fiyatına; LED paneller, taşıyıcı konstrüksiyon, görüntü işlemci, gerekli kablolama, kurulum-söküm ve teknik operasyon desteği dahildir. Gerektiğinde jeneratör ve yayın ekipmanları opsiyonel olarak eklenebilir.",
            },
          },
          {
            "@type": "Question",
            name: "İstanbul dışındaki şehirlere de hizmet veriyor musunuz?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Evet. İstanbul merkezli olmamıza rağmen Türkiye genelinde 81 ile hizmet veriyoruz. Lojistik, konaklama ve yol maliyetleri etkinlik şehrine göre tekliflendirilir.",
            },
          },
          {
            "@type": "Question",
            name: "Kurulum ne kadar sürüyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Kurulum süresi sahne/LED ekran ve ses-ışık altyapısının büyüklüğüne göre değişmekle birlikte çoğu kurulumumuz 2–6 saat arasında tamamlanır. Büyük konser ve miting sahnelerinde bu süre 1 güne kadar uzayabilir.",
            },
          },
          {
            "@type": "Question",
            name: "Tek günlük veya kısa süreli etkinlikler için kiralama yapabilir miyim?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Evet, tek günlük, birkaç saatlik veya çok günlü etkinlikler için esnek kiralama seçenekleri sunuyoruz. Minimum kiralama süresi ve fiyatlandırma, kurulum yapılacak ekipmana göre değişir.",
            },
          },
          {
            "@type": "Question",
            name: "Teklif süreci nasıl işliyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Web sitemiz, telefon veya WhatsApp üzerinden bize ulaştıktan sonra etkinlik detaylarınızı alıyor, gerekirse keşif yapıyor ve maksimum 2 saat içinde size net, kalem kalem açıklanmış bir teklif iletiyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Ses-ışık sistemi için keşif yapıyor musunuz?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Büyük ölçekli etkinlikler, açık alan konserleri ve kurumsal lansmanlarda alanın akustiğini ve seyirci kapasitesini doğru hesaplamak için ücretsiz veya düşük maliyetli keşif hizmeti sunuyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Teknik ekip etkinlik boyunca sahada kalıyor mu?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Evet. LED ekran operatörü, ses mühendisi, ışıkçı ve sahne teknisyenlerinden oluşan ekibimiz, etkinlik boyunca sahada kalarak tüm teknik süreci yönetir ve olası problemlere anında müdahale eder.",
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
function SectionHeader({ id, title, highlight, description, afterText = "", align = "center", theme = "light" }) {
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
        <p className={`text-lg ${themeClasses.description} max-w-3xl mx-auto ${alignment === "left" ? "md:mx-0" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function KeywordPills() {
  return (
    <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed font-medium max-w-4xl mx-auto">
      {HERO_KEYWORDS.map(({ text, gradient }) => (
        <span
          key={text}
          className={`bg-gradient-to-r ${gradient} text-transparent bg-clip-text font-bold inline-block mr-1`}
          aria-hidden="true"
        >
          {text}
        </span>
      ))}
      <span className="sr-only">Sahne Kiralama, LED Ekran, Ses-Işık Sistemleri</span>
    </p>
  );
}

function CTAButton({ href, label, icon, gradient = "from-blue-600 to-purple-600", srHint, ...rest }) {
  return (
    <a
      href={href}
      className={`${CTA_BASE_CLASS} bg-gradient-to-r ${gradient}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span aria-hidden="true">{icon}</span> {label}
      </span>
      {srHint ? <span className="sr-only">{srHint}</span> : null}
      <div className={CTA_OVERLAY_CLASS} aria-hidden="true" />
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-12">
      {CTA_BUTTONS.map(({ srHint, gradient = "from-blue-600 to-purple-600", ...cta }) => (
        <CTAButton key={cta.href} gradient={gradient} srHint={srHint} {...cta} />
      ))}
    </div>
  );
}

function HeroFeatureGrid() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 list-none p-0 m-0">
      {HERO_FEATURES.map((item, index) => (
        <li key={item.title} className="m-0 p-0">
          <ScrollReveal delay={String(index + 1)} direction="scale">
            <div className="group bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:bg-white/15">
              <div
                className={`text-2xl mb-2 bg-gradient-to-r ${item.color} text-transparent bg-clip-text`}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div className="text-white font-bold text-base mb-1">{item.title}</div>
              <div className="text-white/70 text-xs">{item.description}</div>
            </div>
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}

function ConsultationCard() {
  return (
    <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl" aria-hidden="true">
            🎯
          </div>
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
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm focus-ring"
          >
            Hemen Teklif Al
          </a>
        </div>
      </div>
    </div>
  );
}

// —————————————————————————————————————————
// SAYFA
// —————————————————————————————————————————
function HeroBackgroundImage({ alt = HERO_IMAGE_ALT, ariaHidden = false }) {
  return (
    <Image
      alt={alt}
      src={heroImg}
      fill
      sizes="100vw"
      priority
      fetchPriority="high"
      loading="eager"
      placeholder="blur"
      quality={70}
      className="absolute inset-0 h-full w-full object-cover object-center"
      style={HERO_IMAGE_STYLE}
      aria-hidden={ariaHidden}
    />
  );
}

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
          <HeroBackgroundImage />
        </div>

        {/* Overlay katmanları */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/70 to-purple-900/75"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse motion-reduce:animate-none"
          style={HERO_OVERLAY_ANIMATION_STYLE}
          aria-hidden="true"
        />

        {/* İçerik */}
        <div className="relative z-10 container py-12 md:py-16">
          <div className="max-w-6xl mx-auto text-center mb-10">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
                <span
                  className="w-2 h-2 bg-green-400 rounded-full animate-pulse motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <span className="text-white/90 text-sm font-medium">
                  Türkiye Geneli Profesyonel Hizmet
                </span>
              </div>
            </ScrollReveal>

            {/* Başlık */}
            <ScrollReveal delay="1">
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
            </ScrollReveal>

            <ScrollReveal delay="2">
              {/* Anahtar kelimeler */}
              <KeywordPills />

              <p className="text-white/80 text-base md:text-lg mb-8 max-w-3xl mx-auto">
                500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı kurulum ile yanınızdayız
              </p>
            </ScrollReveal>

            {/* CTA Butonları */}
            <ScrollReveal delay="3">
              <CTAGroup />
            </ScrollReveal>

            {/* === ÖNE ÇIKANLAR === */}
            <ScrollReveal delay="4">
              <h2 className="sr-only">Öne çıkan özellikler</h2>
              <HeroFeatureGrid />
            </ScrollReveal>

            {/* Danışmanlık kutusu */}
            <ScrollReveal delay="5">
              <ConsultationCard />
            </ScrollReveal>
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

      {/* Ana içerik başlangıcı */}
      <div id="main" className="relative">
        {/* #teklif-al hedefi (Erişilebilir) */}
        <div id="teklif-al" className="sr-only" aria-hidden="true" />

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
            <ScrollReveal>
              <SectionHeader
                id="hizmetler-title"
                title="Profesyonel "
                highlight="Hizmetlerimiz"
                description="Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu"
              />
            </ScrollReveal>
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
                highlight="Organizasyon Çözümlerimiz"
                description="Lansman, konferans, bayi toplantısı ve kurumsal etkinlikleriniz için sahne, podyum, LED ekran, ses–ışık ve teknik operasyonu tek çatı altında sunuyoruz."
              />
            </ScrollReveal>
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

            <ScrollRevealGroup>
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
                {WHY_SAHNEVA_FEATURES.map(({ icon, title, desc, stat }, i) => (
                  <li key={i} className="m-0 p-0">
                    <ScrollReveal delay={String(i % 3)} direction="scale">
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
                    </ScrollReveal>
                  </li>
                ))}
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
              <ScrollReveal direction="left">
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
                      {SEO_TECH_FEATURES.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>

              {/* Sağ blok */}
              <ScrollReveal direction="right">
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
                      {SEO_INFRA_FEATURES.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
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
    </div>
  );
}
