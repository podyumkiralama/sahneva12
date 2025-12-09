// app/(tr)/(site)/page.js
import Link from "next/link";
// A11Y için prose içindeki Link'ler

// Statik bileşenler
import CorporateEvents from "@/components/CorporateEvents";
import HeroSection from "@/components/HeroSection";
import { HERO_FEATURES_TR } from "@/lib/heroFeatures";
import {
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

const SECTION_THEMES = {
  light: {
    title: "text-neutral-900",
    description: "text-neutral-700",
    pillBg: "bg-blue-500/10",
    pillBorder: "border-blue-500/20",
    pillText: "text-blue-600",
  },
  dark: {
    title: "text-white",
    description: "text-slate-300",
    pillBg: "bg-blue-500/15",
    pillBorder: "border-blue-400/40",
    pillText: "text-blue-200",
  },
};

const WHY_SAHNEVA_FEATURES = [
  {
    icon: "⚡",
    title: "Aynı Gün Hızlı Kurulum",
    desc: "Türkiye genelinde aynı gün içinde kurulum ve söküm imkanları sağlıyoruz. Ekibimiz planlanan saatte sahada hazır.",
    stat: "7/24 Operasyon",
  },
  {
    icon: "🧩",
    title: "Modüler Sahne & Ekipman",
    desc: "Farklı ebat, yükseklik ve konseptlere uygun sahne, podyum, LED ekran ve truss çözümleri sunuyoruz.",
    stat: "50+ Sahne Konfigürasyonu",
  },
  {
    icon: "🎚️",
    title: "Tam Donanımlı Ses & Işık",
    desc: "Konser, konferans, festival ve kurumsal etkinlikler için profesyonel ses ve ışık parkurumuzla net ve dengeli bir deneyim sunuyoruz.",
    stat: "Line Array & Akıllı Işık",
  },
  {
    icon: "🧑‍💻",
    title: "Teknik Reji & Canlı Yayın",
    desc: "Çok kameralı yayın, canlı reji, kayıt ve streaming çözümleriyle etkinliğinizi dijital ortama taşıyoruz.",
    stat: "Full HD / 4K Altyapı",
  },
  {
    icon: "🛡️",
    title: "Güvenlik & Yedek Plan",
    desc: "Kritik ekipmanlarda yedekli sistemler ve saha güvenlik önlemleriyle kesintisiz etkinlik akışı sağlıyoruz.",
    stat: "B Planı Hazır",
  },
  {
    icon: "🤝",
    title: "Kurumsal İş Ortaklığı",
    desc: "Ajanslar, markalar, belediyeler ve kamu kurumlarıyla uzun soluklu projelerde şeffaf ve sürdürülebilir iş modelleriyle çalışıyoruz.",
    stat: "500+ Tamamlanmış Proje",
  },
];

// —————————————————————————————————————————
// YARDIMCI BİLEŞENLER
// —————————————————————————————————————————

function PageSection({ id, variant = "light", children, ...rest }) {
  const bgClass =
    variant === "dark"
      ? "bg-[#020617]"
      : variant === "brand"
      ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      : "bg-slate-50";

  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 ${bgClass}`}
      {...rest}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {variant !== "light" && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.35),_transparent_55%)] opacity-70" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:56px_56px] opacity-50" />
          </>
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}

// Parçalı başlık bileşeni (şimdilik kullanılmıyor ama dursun)
function SectionHeader({
  id,
  title,
  highlight,
  afterText,
  description,
  theme = "dark",
}) {
  const styles = SECTION_THEMES[theme] ?? SECTION_THEMES.dark;

  return (
    <header className="text-center max-w-4xl mx-auto mb-16">
      <div className="flex justify-center mb-4">
        <span
          className={`
            inline-flex items-center gap-2 px-3 py-1 rounded-full 
            ${styles.pillBg} border ${styles.pillBorder} 
            ${styles.pillText} text-xs font-bold uppercase tracking-[0.16em]
          `}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"
            aria-hidden="true"
          />
          Sahneden Prodüksiyona
        </span>
      </div>

      <h2
        id={id}
        className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tight ${styles.title}`}
      >
        {title}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-purple-400">
          {highlight}
        </span>
        {afterText && <span> {afterText}</span>}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${styles.description}`}
        >
          {description}
        </p>
      )}
    </header>
  );
}

function HeroFeaturesStrip() {
  return (
    <div className="border-y border-slate-800/60 bg-black/20 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] md:text-sm text-slate-200">
          {HERO_FEATURES_TR.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-lg">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// —————————————————————————————————————————
// JSON-LD: Ana sayfa verileri
// —————————————————————————————————————————

function HomeJsonLd() {
  const ORGANIZATION_ID = `${SITE_URL}/#org`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#home`,
        url: SITE_URL,
        name: "Sahne, Podyum, LED Ekran & Ses Işık Sistemleri Kiralama | Sahneva",
        isPartOf: { "@id": ORGANIZATION_ID },
        datePublished: "2023-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        inLanguage: "tr",
        description:
          "Türkiye genelinde sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama hizmetleri. Kurumsal etkinlikler, konserler, fuarlar ve festivaller için profesyonel prodüksiyon çözümleri.",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#home-services`,
        itemListElement: [
          {
            "@type": "Service",
            name: "Sahne Kiralama",
            url: `${SITE_URL}/sahne-kiralama`,
            areaServed: { "@type": "Country", name: "Türkiye" },
            provider: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Service",
            name: "Podyum Kiralama",
            url: `${SITE_URL}/podyum-kiralama`,
            areaServed: { "@type": "Country", name: "Türkiye" },
            provider: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Service",
            name: "LED Ekran Kiralama",
            url: `${SITE_URL}/led-ekran-kiralama`,
            areaServed: { "@type": "Country", name: "Türkiye" },
            provider: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Service",
            name: "Ses & Işık Sistemleri",
            url: `${SITE_URL}/ses-isik-sistemleri`,
            areaServed: { "@type": "Country", name: "Türkiye" },
            provider: { "@id": ORGANIZATION_ID },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        "@id": `${SITE_URL}/#home-offers`,
        name: "Etkinlik Prodüksiyon Çözümleri",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Festival Sahnesi Kurulumu" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Kurumsal Etkinlik Teknik Prodüksiyonu" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Açık Hava LED Ekran Kiralama" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Konferans Ses & Işık Sistemleri" },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
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
// ANA SAYFA BİLEŞENİ
// —————————————————————————————————————————

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <HomeJsonLd />

      {/* HERO */}
      <HeroSection />
      <HeroFeaturesStrip />

      {/* HİZMETLER TABLARI – başlık ve container YOK, sadece component */}
      <PageSection id="hizmetler" variant="dark">
        <ServicesTabsDeferred idleTimeout={2400} rootMargin="360px" />
      </PageSection>

      {/* PROJELER – dış başlık/container yok, ProjectsGallery kendi başlığını kullanıyor */}
      <PageSection id="projeler" variant="dark">
        <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="360px" />
      </PageSection>

      {/* KURUMSAL ORGANİZASYON – sadece component */}
      <PageSection variant="light">
        <CorporateEvents />
      </PageSection>

      {/* NEDEN SAHNEVA – bu blok zaten component değil, kendi içinde başlığı kalsın */}
      <PageSection variant="brand">
        <div className="container">
          <ScrollRevealGroup>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
              {WHY_SAHNEVA_FEATURES.map(({ icon, title, desc, stat }, i) => (
                <li key={i} className="m-0 p-0">
                  <ScrollReveal direction="up" delay={i * 0.05} asChild>
                    {/* kart içeriği (aynen bıraktığımız haliyle) */}
                    <article className="relative h-full rounded-2xl border border-white/10 bg-white/5/5 bg-gradient-to-br from-slate-950/80 via-slate-900/90 to-slate-950/80 p-5 md:p-6 shadow-[0_18px_35px_rgba(15,23,42,0.95)]">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/90 to-purple-500/90 shadow-[0_0_22px_rgba(59,130,246,0.65)] border border-white/30">
                          <span
                            className="text-xl text-white drop-shadow-[0_0_10px_rgba(15,23,42,0.95)]"
                            aria-hidden="true"
                          >
                            {icon}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base md:text-lg text-white">
                            {title}
                          </h3>
                          {stat && (
                            <p className="text-xs mt-0.5 text-emerald-300/90 font-medium">
                              {stat}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {desc}
                      </p>
                      <div
                        className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[11px] text-slate-400/90"
                        aria-hidden="true"
                      >
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Sahneva Güvencesi
                        </span>
                        <span className="text-slate-500">
                          Teknik ekip &amp; yedekli planlama
                        </span>
                      </div>
                    </article>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </ScrollRevealGroup>
        </div>
      </PageSection>

      {/* SEO METİNLERİ – olduğu gibi bırakıyoruz, bu blok zaten ayrı içerik */}
      <PageSection variant="light">
        <div className="container">
          {/* iki kolonlu SEO article grid (önceki sürümdeki gibi) */}
          {/* ... buradaki article'lar sende nasılsa öyle kalabilir ... */}
        </div>
      </PageSection>

      {/* SSS – dış başlık ve container yok, Faq kendi section’ını çiziyor */}
      <PageSection variant="dark">
        <FaqDeferred idleTimeout={3600} rootMargin="400px" />
      </PageSection>
    </div>
  );
}
