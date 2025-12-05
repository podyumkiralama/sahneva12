// app/(tr)/(site)/page.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";
// 2026: SPA hissi veren Link bileşeni
import Link from "next/link";

// İstemci tarafı etkileşim sınırları (Client Boundaries)
import { MotionWrapper } from "@/components/MotionPrimitives.client";
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

export const revalidate = 3600;

// --- PERFORMANS AYARLARI ---
// Ekran dışı içeriğin render maliyetini azaltır (Content Visibility)
const PERFORMANCE_SECTION_STYLE = {
  contentVisibility: "auto",
  containIntrinsicSize: "auto 800px", // Tahmini yükseklik (Scroll zıplamasını önler)
};

const HERO_FEATURES = [
  {
    icon: "⭐",
    title: "4.9/5 Puan",
    desc: "500+ Mutlu Müşteri",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
  {
    icon: "⚡",
    title: "Aynı Gün",
    desc: "Hızlı Kurulum",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
  },
  {
    icon: "👑",
    title: "Premium",
    desc: "Kalite Garantisi",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
  },
];

// Hero’daki SEO odaklı hızlı bağlantı pill’leri
const SEO_KEYWORDS = [
  { text: "Sahne Kiralama", href: "/sahne-kiralama" },
  { text: "Podyum Kiralama", href: "/podyum-kiralama" },
  { text: "LED Ekran Kiralama", href: "/led-ekran-kiralama" },
  { text: "Ses-Işık Sistemleri", href: "/ses-isik-sistemleri" },
  { text: "Çadır Kiralama", href: "/cadir-kiralama" },
];

// SEO metinlerindeki teknik özellik bullet’ları
const SEO_TECH_FEATURES = [
  "IP65 dış mekân LED paneller, 4500+ nit parlaklık",
  "Profesyonel line-array ses sistemleri ve dijital mikserler",
  "Modüler podyum ve sahne platformları, truss sistemleri",
  "DMX kontrollü ışık sistemleri ve ambiyans aydınlatma",
];

// --- SCHEMA.ORG (Düzeltilmiş) ---
function StructuredData() {
  const HOME_URL = SITE_URL;
  const ORGANIZATION_ID = `${SITE_URL}/#org`;
  const WEBSITE_ID = `${SITE_URL}/#website`;
  const WEBPAGE_ID = `${HOME_URL}#webpage`;
  const SERVICE_ID = `${HOME_URL}#primary-service`;
  const CATALOG_ID = `${HOME_URL}#catalog`;
  const FAQ_ID = `${HOME_URL}#faq`;
  const IMAGE_ID = `${HOME_URL}#og`;
  const VIDEO_ID = `${HOME_URL}#intro-video`;

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
            itemOffered: {
              "@type": "Service",
              name: "Ses-Işık Sistemleri",
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
        "@type": "ImageObject",
        "@id": IMAGE_ID,
        contentUrl: `${SITE_URL}/og/sahneva-home.jpg`,
        width: 1200,
        height: 630,
      },
      {
        "@type": "VideoObject",
        "@id": VIDEO_ID,
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

// --- ATOMİK BİLEŞENLER ---

// A11Y Uyumlu Buton
function CtaButton({
  href,
  label,
  icon,
  variant = "primary",
  isExternal = false,
}) {
  const baseClasses =
    "group relative inline-flex items-center justify-center min-w-[180px] min-h-[52px] px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2";

  // Renk kontrastları WCAG AA/AAA uyumlu seçilmiştir
  const variants = {
    primary:
      "bg-blue-700 text-white hover:bg-blue-800 shadow-lg shadow-blue-900/20 focus-visible:ring-blue-600",
    secondary:
      "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm focus-visible:ring-slate-400",
    whatsapp:
      "bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg shadow-emerald-900/20 focus-visible:ring-emerald-600",
  };

  const Component = isExternal ? "a" : Link;
  const props = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      href={href}
      className={`${baseClasses} ${variants[variant]}`}
      {...props}
    >
      <span className="mr-2 text-xl" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
      {isExternal && <span className="sr-only">(yeni sekmede açılır)</span>}
    </Component>
  );
}

// 2026 Tasarımı: Erişilebilir Glassmorphism Kartı (solid fallback ile)
function FeatureCard({ item }) {
  return (
    <div
      className={`
      relative h-full p-6 rounded-2xl border ${item.border} ${item.bg} 
      shadow-sm hover:shadow-md transition-shadow
    `}
    >
      <div className="text-3xl mb-3" aria-hidden="true">
        {item.icon}
      </div>
      <h3 className={`text-lg font-bold mb-1 ${item.text}`}>{item.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
    </div>
  );
}

// Yardımcı Bileşen (Tekrar kullanımı için)
function SectionHeader({ title, highlight, description, theme = "light" }) {
  const isDark = theme === "dark";
  return (
    <div className="mb-12">
      <h2
        className={`text-3xl md:text-4xl font-black mb-4 ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          {highlight}
        </span>
      </h2>
      {description && (
        <p
          className={`text-lg max-w-2xl ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// --- MAIN PAGE ---

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex flex-col gap-0 selection:bg-indigo-100 selection:text-indigo-900"
    >
      <StructuredData />

      {/* 1. HERO SECTION (LCP Hedefli) */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950"
        aria-labelledby="hero-heading"
      >
        {/* Arkaplan - LCP Optimized */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt="Sahneva büyük ölçekli konser sahnesi ve LED ekran kurulumu"
            fill
            sizes="100vw"
            priority={true}
            fetchPriority="high"
            quality={75} // Performans/Kalite dengesi
            placeholder="empty"
            className="object-cover opacity-30 mix-blend-overlay" // Metin okunabilirliği için opaklık azaltıldı
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-slate-950" />
        </div>

        <div className="relative z-10 container px-4 py-20 text-center">
          <MotionWrapper animation="fade-down" delay={100}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 backdrop-blur-sm mb-8 text-blue-100 text-xs font-bold uppercase tracking-wider shadow-lg">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                aria-hidden="true"
              />
              Türkiye Geneli Profesyonel Hizmet
            </div>
          </MotionWrapper>

          <MotionWrapper animation="fade-up" delay={200}>
            <h1
              id="hero-heading"
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6 drop-shadow-2xl"
            >
              Profesyonel{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Sahne
              </span>{" "}
              ve <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                LED Ekran
              </span>{" "}
              Çözümleri
            </h1>
          </MotionWrapper>

          <MotionWrapper animation="fade-up" delay={400}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 leading-relaxed mb-8 opacity-90">
              500+ başarılı proje ve %98 müşteri memnuniyeti ile kurumsal
              etkinlikler, konserler ve festivaller için uçtan uca teknik
              prodüksiyon ortağınız.
            </p>
          </MotionWrapper>

          {/* Anahtar Kelimeler */}
          <MotionWrapper animation="scale" delay={500}>
            <div
              className="flex flex-wrap justify-center gap-3 mb-10"
              aria-label="Hızlı Bağlantılar"
            >
              {SEO_KEYWORDS.map((k) => (
                <Link
                  key={k.text}
                  href={k.href}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {k.text}
                </Link>
              ))}
            </div>
          </MotionWrapper>

          <MotionWrapper animation="fade-up" delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CtaButton
                href="tel:+905453048671"
                label="Hemen Ara"
                icon="📞"
                variant="primary"
              />
              <CtaButton
                href="https://wa.me/905453048671"
                label="WhatsApp Teklif"
                icon="💬"
                variant="whatsapp"
                isExternal={true}
              />
            </div>
          </MotionWrapper>
        </div>

        {/* Scroll İpucu */}
        <MotionWrapper
          delay={1000}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="flex flex-col items-center gap-2" aria-hidden="true">
            <span className="text-xs uppercase tracking-widest">Keşfet</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          </div>
        </MotionWrapper>
      </section>

      {/* 2. FEATURES & TRUST */}
      <section className="relative z-20 py-16 bg-slate-50 -mt-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="container px-4">
          {/* Özellik Kartları */}
          <ul className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto -mt-24 mb-16">
            {HERO_FEATURES.map((item, idx) => (
              <li key={item.title}>
                <MotionWrapper
                  animation="fade-up"
                  delay={idx * 100}
                  as="article"
                  className="h-full"
                >
                  <FeatureCard item={item} />
                </MotionWrapper>
              </li>
            ))}
          </ul>

          {/* Danışmanlık Kartı */}
          <MotionWrapper animation="scale" delay={200}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 p-8 md:p-10 text-white shadow-2xl border border-white/10">
              <div
                className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
                <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm border border-white/10 shadow-inner">
                  🎯
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Ücretsiz Teknik Danışmanlık
                  </h2>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    Etkinlik alanınıza en uygun sahne ölçülerini
                    mühendislerimizle planlayın.
                    <span className="block mt-1 text-emerald-300 font-semibold">
                      2 saat içinde detaylı teklif garantisi.
                    </span>
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <CtaButton
                    href="#teklif-al"
                    label="Teklif İste"
                    icon="🚀"
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <div id="teklif-al" className="scroll-mt-32" />

      {/* 3. DEFERRED SECTIONS (Below the Fold Performance) */}
      <section style={PERFORMANCE_SECTION_STYLE} className="py-20 bg-white">
        <div className="container px-4">
          <ReviewBannerDeferred idleTimeout={2000} />
        </div>
      </section>

      <section
        style={PERFORMANCE_SECTION_STYLE}
        className="py-20 bg-slate-50 relative"
      >
        <div className="container px-4 relative z-10">
          <MotionWrapper animation="fade-up">
            <SectionHeader
              title="Profesyonel "
              highlight="Hizmetlerimiz"
              description="Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu sağlıyoruz."
            />
          </MotionWrapper>
          <ServicesTabsDeferred idleTimeout={2500} />
        </div>
      </section>

      <section
        style={PERFORMANCE_SECTION_STYLE}
        className="py-20 bg-slate-900 text-white"
      >
        <div className="container px-4">
          <MotionWrapper animation="fade-up">
            <SectionHeader
              title="Başarılı "
              highlight="Projelerimiz"
              theme="dark"
              description="500'den fazla kurumsal etkinlik, konser ve fuar tecrübesi."
            />
          </MotionWrapper>
          <ProjectsGalleryDeferred idleTimeout={3500} rootMargin="200px" />
        </div>
      </section>

      {/* 4. SEO & CONTENT */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sol: Metin */}
            <article className="prose prose-lg prose-slate max-w-none">
              <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span
                  className="bg-blue-100 text-blue-600 p-2 rounded-lg text-2xl"
                  aria-hidden="true"
                >
                  🚀
                </span>
                Uçtan Uca Teknik Hizmet
              </h3>
              <p>
                <strong>Sahneva</strong> olarak Türkiye genelinde;{" "}
                <Link
                  href="/sahne-kiralama"
                  className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors mx-1"
                >
                  sahne kiralama
                </Link>
                ,
                <Link
                  href="/led-ekran-kiralama"
                  className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors mx-1"
                >
                  LED ekran kiralama
                </Link>{" "}
                ve
                <Link
                  href="/ses-isik-sistemleri"
                  className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors mx-1"
                >
                  ses ışık sistemleri
                </Link>{" "}
                alanlarında komple çözümler sunuyoruz.
              </p>

              <ul className="mt-6 space-y-3 list-none pl-0">
                {SEO_TECH_FEATURES.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            {/* Sağ: Kurumsal İçerik */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-lg">
              <CorporateIntro />
            </div>
          </div>

          <div className="mt-16">
            <CorporateEvents />
          </div>
        </div>
      </section>

      {/* 5. FAQ (Deferred) */}
      <section
        style={PERFORMANCE_SECTION_STYLE}
        className="py-20 bg-slate-50 border-t border-slate-200"
      >
        <div className="container px-4 max-w-4xl mx-auto">
          <MotionWrapper animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
              Sıkça Sorulan Sorular
            </h2>
          </MotionWrapper>
          <FaqDeferred idleTimeout={4000} />
        </div>
      </section>
    </main>
  );
}
