// app/(tr)/(site)/page.js
import Link from "next/link";
// A11Y için prose içindeki Link'ler

// Statik bileşenler
import CorporateEvents from "@/components/CorporateEvents";
import HeroSection from "@/components/HeroSection";
import PageSection from "@/components/PageSection";
import { HERO_FEATURES_TR } from "@/lib/heroFeatures";
import {
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";
// Animasyon bileşenleri (Hafif ve görünürlük alanına odaklı)
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";
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

function HeroFeatureGrid() {
  return (
    <ul
      className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto list-none p-0 m-0"
    >
      {HERO_FEATURES_TR.map((item, index) => (
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
// SAYFA
// —————————————————————————————————————————

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <StructuredData />

      <HeroSection />

      {/* Hero altı: feature + danışmanlık */}
      <section
        className="py-10 bg-gradient-to-b from-slate-950 to-slate-900"
        aria-labelledby="hero-supporting-features"
        role="region"
      >
        <div className="container space-y-8">
          <h2 id="hero-supporting-features" className="sr-only">
            Hızlı öne çıkan özellikler ve ücretsiz danışmanlık bağlantısı
          </h2>
          <HeroFeatureGrid />
          <ScrollReveal delay="1">
            <ConsultationCard />
          </ScrollReveal>
        </div>
      </section>

      {/* #teklif-al hedefi */}
      <div id="teklif-al" className="sr-only" />

      {/* Hizmetler */}
      <PageSection variant="lightGrid" aria-labelledby="hizmetler-title">
        <div
          className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at-center,transparent_20%,white)]"
          aria-hidden="true"
        />
        <div className="relative z-10 space-y-6">
          <h2 id="hizmetler-title" className="sr-only">
            Hizmetlerimiz
          </h2>
          <div className="-mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12">
            <ServicesTabsDeferred idleTimeout={2800} rootMargin="320px" />
          </div>
        </div>
      </PageSection>

      {/* Projeler */}
      <PageSection variant="dark">
        <div className="container">
          <h2 id="projeler-title" className="sr-only">
            Başarılı Projelerimiz
          </h2>
          <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="360px" />
        </div>
      </PageSection>

      {/* Kurumsal Organizasyon */}
      <PageSection variant="light" aria-labelledby="kurumsal-title">
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
      </PageSection>

      {/* Neden Sahneva? */}
      <PageSection variant="brand" aria-labelledby="neden-tercih-heading">
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
            <ul
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0"
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
                        <h3
                          id={`why-card-${i}-title`}
                          className="font-black text-lg mb-3 text-neutral-900 group-hover:text-blue-600 transition-colors"
                        >
                          {title}
                        </h3>
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
      </PageSection>

      {/* SEO metinleri */}
      <PageSection variant="light" aria-labelledby="seo-title">
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
            <ScrollReveal direction="left" asChild>
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
                  <ul className="mt-4 space-y-2 text-neutral-700">
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
            <ScrollReveal direction="right" asChild>
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
                    veriyoruz. 50.000+ kişilik organizasyonlarda aktif rol
                    alıyoruz.
                  </p>
                  <ul className="mt-4 space-y-2 text-neutral-700">
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
      </PageSection>

      {/* SSS */}
      <PageSection variant="dark" aria-labelledby="sss-title">
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
      </PageSection>
    </div>
  );
}
