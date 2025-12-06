// app/(tr)/(site)/page.js
import React from "react";
import Link from "next/link";

// BİLEŞENLER
import HeroSection from "@/components/HeroSection"; // Yeni bileşenimiz
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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

// —————————————————————————————————————————
// VERİLER (Diğer bölümlerin verileri burada kalabilir)
// —————————————————————————————————————————

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
// JSON-LD (Schema.org)
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
        name: "Sahne Sistemleri, LED Ekran, Ses-Işık Kiralama | Türkiye Geneli | Sahneva",
        description:
          "Sahneva ile profesyonel sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama çözümlerini keşfedin. İstanbul merkezli, Türkiye geneli hızlı kurulum.",
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        primaryImageOfPage: { "@id": IMAGE_ID },
      },
      // ... Diğer Schema verileri (Kısaltıldı)
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
// YARDIMCI BİLEŞENLER (Sadece burada kullanılanlar kaldı)
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
  const themeClasses = {
    light: { title: "text-neutral-900", description: "text-neutral-700" },
    dark: { title: "text-white", description: "text-slate-200" },
  }[theme];
  
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`${alignment} mb-10 md:mb-14 ${className}`}>
      <div className="inline-flex items-center gap-2 mb-3">
        <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" aria-hidden="true" />
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
        <p className={`text-base md:text-lg ${themeClasses.description} max-w-3xl mx-auto leading-relaxed ${align === "left" ? "md:mx-0" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}

// —————————————————————————————————————————
// ANA SAYFA
// —————————————————————————————————————————
export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-slate-50">
      <StructuredData />

      {/* 1. HERO BÖLÜMÜ (Yeni Component) */}
      <HeroSection />

      {/* 2. TEKLİF AL HEDEFİ */}
      <div id="teklif-al" className="scroll-mt-24" />

      {/* 3. GOOGLE YORUMLARI */}
      <section style={BELOW_THE_FOLD_VISIBILITY_STYLE} aria-labelledby="reviews-section">
        <h2 id="reviews-section" className="sr-only">Müşteri Yorumları</h2>
        <ReviewBannerDeferred idleTimeout={2000} rootMargin="100px" />
      </section>

      {/* 4. HİZMETLER TABS */}
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
              description="Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu sağlıyoruz."
            />
          </ScrollReveal>

          <div className="mt-12 -mx-2 sm:-mx-4 lg:-mx-6 xl:-mx-10 px-2 sm:px-4 lg:px-6 xl:px-10">
            <ServicesTabsDeferred idleTimeout={2800} rootMargin="200px" />
          </div>
        </div>
      </section>

      {/* 5. PROJELER GALERİSİ (TEMİZLENDİ) */}
      {/* Not: ariaLabelledBy özelliğini kaldırdık, böylece component kendi başlığını gösterecek. */}
      {/* Wrapper section kaldırıldı, doğrudan component render ediliyor. */}
      <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="250px" />

      {/* 6. KURUMSAL INTRO & KARTLAR */}
      <section
        className="py-16 md:py-20 bg-white"
        aria-labelledby="kurumsal-intro-title"
        style={BELOW_THE_FOLD_VISIBILITY_STYLE}
      >
        <div className="container px-4">
          <div className="space-y-16">
            <CorporateIntro />
            <CorporateEvents />
          </div>
        </div>
      </section>

      {/* 7. NEDEN SAHNEVA */}
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
                        <span role="img" aria-label={feature.iconLabel}>{feature.icon}</span>
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
                      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
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

      {/* 8. SEO METİNLERİ */}
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
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg" aria-hidden="true">
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Uçtan Uca Teknik Hizmet ve Profesyonel Çözümler</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-700">Sahneva</strong> olarak Türkiye genelinde sahne kiralama, podyum kurulumu, LED ekran kiralama ve ses ışık sistemi kurulumu hizmetlerinde komple çözümler sunuyoruz.
                  </p>
                  <ul className="space-y-3 mt-6" role="list">
                    {SEO_TECH_FEATURES.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
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
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg" aria-hidden="true">
                    🎤
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Büyük Ölçekli Etkinlikler İçin Güçlü Altyapı</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Konser, miting, festival, fuar ve açık hava etkinlikleri için yüksek kapasiteli ekipman altyapımızla hizmet veriyoruz. 50.000+ kişilik organizasyonlarda aktif rol alıyoruz.
                  </p>
                  <ul className="space-y-3 mt-6" role="list">
                    {SEO_INFRA_FEATURES.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
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

      {/* 9. SSS */}
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
