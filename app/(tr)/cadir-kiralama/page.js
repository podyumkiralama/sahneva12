// app/(tr)/cadir-kiralama/page.jsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== Sabitler ================== */
export const revalidate = 1800;
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com"
).replace(/\/$/, "");
const ORIGIN = SITE_URL;
const ORGANIZATION_ID = `${SITE_URL}/#org`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#local`;
const PHONE = "+905453048671";
const WA_TEXT =
  "Merhaba%2C+çadır+kiralama+icin+teklif+istiyorum.+Etkinlik+turu%3A+%5Bdüğün%2Ffuar%2Fkonser%5D%2C+Tarih%3A+%5Bgg.aa.yyyy%5D%2C+Kisi+sayisi%3A+%5Bxxx%5D.";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

// Base64 blur placeholder (LCP hero için)
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ================== Dinamik galeri (CaseGallery) ================== */
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => (
    <div
      className="flex justify-center items-center h-64"
      role="status"
      aria-label="Galeri yükleniyor"
    >
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        aria-hidden="true"
      />
      <span className="sr-only">Galeri yükleniyor...</span>
    </div>
  ),
});

/* ================== META ================== */
export const metadata = {
  title: "Çadır Kiralama | Profesyonel Etkinlik Çözümleri | Sahneva",
  description:
    "Pagoda, şeffaf dome, endüstriyel çadır kiralama. Zemin kaplama, aydınlatma ve profesyonel kurulum. Türkiye geneli hızlı hizmet.",
  alternates: { canonical: `${ORIGIN}/cadir-kiralama` },
  openGraph: {
    title: "Çadır Kiralama | Sahneva Organizasyon",
    description:
      "Pagoda, şeffaf ve endüstriyel çadır çözümleri. Türkiye geneli profesyonel kurulum ve tamamlayıcı hizmetler.",
    url: `${ORIGIN}/cadir-kiralama`,
    type: "website",
    siteName: "Sahneva Organizasyon",
    locale: "tr_TR",
    images: [
      {
        url: `${ORIGIN}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Çadır Kiralama | Profesyonel Etkinlik Çözümleri | Sahneva",
    description:
      "Pagoda, şeffaf dome, endüstriyel çadır kiralama. Zemin kaplama, aydınlatma ve profesyonel kurulum.",
    images: [`${ORIGIN}/img/og/sahneva-og.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* ================== Yardımcılar & Sabitler ================== */
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " ve ")
    .replace(/[^a-z0-9çğıöşü\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const HERO = {
  src: "/img/cadir/hero.webp",
  alt: "Profesyonel çadır kurulumu - Pagoda çadır ve etkinlik alanı düzenlemesi",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🏕️",
    title: "Pagoda Çadır Sistemleri",
    description:
      "5×5m ve 6×6m modüler sistemler ile estetik ve fonksiyonel çözümler",
    features: [
      "Yüksek tepe noktası",
      "Modüler birleşim",
      "Yan branda opsiyonu",
      "Hızlı kurulum",
    ],
  },
  {
    icon: "🔮",
    title: "Şeffaf Dome Çadırlar",
    description: "Gece aydınlatmasına uygun büyüleyici şeffaf çadır sistemleri",
    features: [
      "Weather-proof yapı",
      "LED aydınlatma",
      "Davet organizasyonları",
      "Özel etkinlikler",
    ],
  },
  {
    icon: "🏭",
    title: "Endüstriyel Çadırlar",
    description: "Geniş açıklıklı depolama ve üretim alanı çözümleri",
    features: [
      "Forklift girişi",
      "Geniş açıklık",
      "Uzun süreli kullanım",
      "Dayanıklı yapı",
    ],
  },
  {
    icon: "🎪",
    title: "Fuar & Sergi Çadırları",
    description:
      "Profesyonel fuar ve sergi alanları için optimize edilmiş sistemler",
    features: [
      "Hızlı kurulum",
      "Stand uyumu",
      "Profesyonel görünüm",
      "Markalama desteği",
    ],
  },
  {
    icon: "💡",
    title: "Aydınlatma & Elektrik",
    description:
      "Profesyonel aydınlatma sistemleri ve elektrik altyapı çözümleri",
    features: [
      "LED aydınlatma",
      "Güç dağıtım",
      "Acil aydınlatma",
      "Enerji çözümleri",
    ],
  },
  {
    icon: "🔧",
    title: "Kurulum & Teknik Destek",
    description:
      "Profesyonel kurulum, söküm ve 7/24 teknik destek hizmetleri",
    features: [
      "Profesyonel kurulum",
      "Söküm hizmeti",
      "7/24 destek",
      "Acil müdahale",
    ],
  },
];

const USE_CASES = [
  {
    icon: "💍",
    text: "Düğün, kına ve özel davetler",
    desc: "Özel günler için şık çadır çözümleri",
  },
  {
    icon: "🎪",
    text: "Fuar, sergi ve lansmanlar",
    desc: "Profesyonel fuar ve tanıtım alanları",
  },
  {
    icon: "🎤",
    text: "Konser, festival ve etkinlikler",
    desc: "Açık hava etkinlikleri için çözümler",
  },
  {
    icon: "🏛️",
    text: "Belediye ve kurumsal etkinlikler",
    desc: "Kurumsal organizasyonlar",
  },
  {
    icon: "🏭",
    text: "Endüstriyel ve depolama",
    desc: "Geçici depolama ve üretim alanları",
  },
  {
    icon: "🏫",
    text: "Okul ve eğitim etkinlikleri",
    desc: "Eğitim kurumları için çözümler",
  },
];

/* ================== HERO ================== */
function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-slate-900 pt-20 min-h-[80vh] 2xl:min-h-[85vh]"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          sizes={HERO.sizes}
          quality={85}
         
          blurDataURL={BLUR_DATA_URL}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-blue-950/90"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-purple-900/60"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white py-12">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30 mb-6">
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
          </span>
          <span className="text-sm font-bold text-white">
            Türkiye Geneli Profesyonel Hizmet
          </span>
        </div>

        <h1
          id="hero-title"
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl"
        >
          Profesyonel{" "}
          <span className="gradient-text gradient-text--safe-xl">
            Çadır Kiralama
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
          Düğün • Fuar • Festival • Lansman • Özel Etkinlikler
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-6">
          Pagoda çadırlar, şeffaf dome sistemleri ve endüstriyel çadırlar ile
          <span className="font-semibold text-white"> anahtar teslim çözümler</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp üzerinden hemen teklif alın"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
          >
            <span aria-hidden="true" className="text-xl mr-2">
              💬
            </span>
            <span className="text-base">Hemen Teklif Al</span>
          </Link>

          <Link
            href="#hizmetler"
            aria-label="Hizmetlerimiz hakkında daha fazla bilgi edinin"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white/95 bg-white/10 backdrop-blur-lg hover:bg_WHITE/20 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
          >
            <span aria-hidden="true" className="text-xl mr-2">
              🎯
            </span>
            <span className="text-base">Hizmetlerimiz</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border_WHITE/20">
            <span className="text-2xl mb-2" aria-hidden="true">
              ⭐
            </span>
            <div className="text-xl font-black text-white">4.8/5</div>
            <div className="text-white/80 text-sm">180+ Değerlendirme</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border_WHITE/20">
            <span className="text-2xl mb-2" aria-hidden="true">
              🏆
            </span>
            <div className="text-xl font-black text_WHITE">850+</div>
            <div className="text-white/80 text-sm">Etkinlik</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border_WHITE/20">
            <span className="text-2xl mb-2" aria-hidden="true">
              🚀
            </span>
            <div className="text-xl font-black text_WHITE">81 İl</div>
            <div className="text-white/80 text-sm">Hizmet</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== Hizmetler ================== */
function Services() {
  return (
        <section
          id="hizmetler"
          className="py-20 bg-gradient-to-b from-white to-blue-50/50 nc-CadirKiralamaPage-section-1"
          aria-labelledby="hizmetler-baslik"
        >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="hizmetler-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900"
          >
            Profesyonel{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Çadır kiralama hizmetlerimiz: keşif, projelendirme, kurulum, teknik
            destek ve söküm
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx_auto">
          {SERVICES.map((service) => {
            const id = `svc-${slugify(service.title)}`;
            return (
              <div key={id} className="group">
                <article
                  className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 group-hover:scale-105 transition-all duration-500 h-full flex flex-col"
                  aria-labelledby={id}
                >
                  <div
                    className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>
                  <h3
                    id={id}
                    className="text-2xl font-black mb-4 text-gray-900 group-hover:text-blue-600 transition-colors"
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <span
                          className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
          >
            <span aria-hidden="true" className="text-xl mr-3">
              📞
            </span>
            <span>Detaylı Teklif için İletişime Geçin</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Galeri ================== */
const GALLERY_IMAGES = [
  {
    src: "/img/cadir/1.webp",
    alt: "Pagoda çadır kurulumu - Düğün etkinliği için profesyonel çadır düzeni",
  },
  {
    src: "/img/cadir/2.webp",
    alt: "Şeffaf dome çadır - Özel davetler için büyüleyici atmosfer",
  },
  {
    src: "/img/cadir/3.webp",
    alt: "Endüstriyel çadır kurulumu - Depolama ve üretim alanı çözümü",
  },
  {
    src: "/img/cadir/4.webp",
    alt: "Fuar çadırı - Profesyonel sergi ve tanıtım alanı",
  },
  {
    src: "/img/cadir/5.webp",
    alt: "Aydınlatmalı çadır - Gece etkinlikleri için LED aydınlatma",
  },
  {
    src: "/img/cadir/6.webp",
    alt: "Konser çadırı - Açık hava etkinliği için çadır çözümü",
  },
  {
    src: "/img/cadir/7.webp",
    alt: "Kurulum ekibi - Profesyonel çadır kurulum süreci",
  },
  {
    src: "/img/cadir/8.webp",
    alt: "Markalı çadır - Kurumsal etkinlikler için özel tasarım",
  },
  {
    src: "/img/cadir/9.webp",
    alt: "Markalı çadır - Kurumsal etkinlikler için özel tasarım",
  },
  {
    src: "/img/cadir/10.webp",
    alt: "Markalı çadır - Kurumsal etkinlikler için özel tasarım",
  },
  {
    src: "/img/cadir/11.webp",
    alt: "Markalı çadır - Kurumsal etkinlikler için özel tasarım",
  },
  {
    src: "/img/cadir/12.webp",
    alt: "Markalı çadır - Kurumsal etkinlikler için özel tasarım",
  },
];

function Gallery() {
  return (
      <section
        className="py-20 bg-white nc-CadirKiralamaPage-section-2"
        aria-labelledby="galeri-baslik"
      >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="galeri-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900"
          >
            Proje{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Galerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gerçekleştirdiğimiz başarılı çadır kurulumlarından örnekler
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery
            images={GALLERY_IMAGES}
            visibleCount={8}
            priorityCount={2}
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Daha fazla projemizi incelemek için galerimizi keşfedin
          </p>
          <Link
            href="/projeler"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 focus-ring"
          >
            <span aria-hidden="true" className="text-xl mr-3">
              📸
            </span>
            <span>Tüm Projeleri Görüntüle</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Teknik Altyapı ================== */
function Technical() {
  const technicalItems = [
    {
      category: "malzeme",
      title: "Malzeme Kalitesi",
      description:
        "Alüminyum iskelet, çelik bağlantı elemanları ve UV dayanımlı branda",
      features: [
        "Alüminyum iskelet sistem",
        "650 gr/m² branda",
        "Alev yürütmez malzeme",
        "Çelik bağlantı elemanları",
      ],
    },
    {
      category: "guvenlik",
      title: "Güvenlik Sistemleri",
      description: "TS EN standartlarına uygun güvenlik ve stabilite sistemleri",
      features: [
        "90 km/s rüzgar dayanımı",
        "Profesyonel ankraj",
        "Ağırlıklandırma sistemi",
        "Yağmur oluğu",
      ],
    },
    {
      category: "olcu",
      title: "Ölçü & Kombinasyonlar",
      description: "Modüler sistemler ile esnek ölçü ve birleşim seçenekleri",
      features: [
        "5×5m / 6×6m pagoda",
        "Proje bazlı ölçülendirme",
        "10-20m geniş açıklık",
        "Yan yana birleştirme",
      ],
    },
    {
      category: "tamamlayici",
      title: "Tamamlayıcı Hizmetler",
      description: "Çadır kurulumunu tamamlayan profesyonel hizmetler",
      features: [
        "Zemin kaplama sistemleri",
        "Aydınlatma çözümleri",
        "Isıtma-soğutma sistemleri",
        "Markalama ve dekorasyon",
      ],
    },
    {
      category: "kurulum",
      title: "Kurulum Süreçleri",
      description:
        "Hızlı ve profesyonel kurulum, söküm ve lojistik hizmetleri",
      features: [
        "2-6 saat kurulum",
        "Profesyonel ekip",
        "Lojistik desteği",
        "Söküm hizmeti",
      ],
    },
    {
      category: "destek",
      title: "Teknik Destek",
      description: "7/24 teknik destek ve acil müdahale hizmetleri",
      features: [
        "7/24 teknik destek",
        "Acil müdahale ekibi",
        "Yedek parça stoğu",
        "Bakım hizmetleri",
      ],
    },
  ];

  return (
      <section
        className="py-20 bg-gradient-to-b from-gray-50 to-white nc-CadirKiralamaPage-section-3"
        aria-labelledby="altyapi-baslik"
      >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="altyapi-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900"
          >
            Teknik{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Altyapımız
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En son teknoloji ekipmanlar ve profesyonel teknik altyapı ile
            hizmetinizdeyiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technicalItems.map((item) => (
            <div key={item.category} className="group">
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-500 h-full">
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {item.category === "malzeme" && "🏗️"}
                    {item.category === "guvenlik" && "🛡️"}
                    {item.category === "olcu" && "📐"}
                    {item.category === "tamamlayici" && "🔧"}
                    {item.category === "kurulum" && "⚡"}
                    {item.category === "destek" && "📞"}
                  </span>
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {item.description}
                </p>
                <ul className="space-y-3">
                  {item.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <span
                        className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== İstatistik Bant ================== */
function StatsBand() {
  const stats = [
    { value: "850+", label: "Başarılı Etkinlik", icon: "🎪" },
    { value: "40+", label: "Kurumsal Müşteri", icon: "🏢" },
    { value: "81", label: "İlde Hizmet", icon: "🗺️" },
    { value: "8+", label: "Yıl Deneyim", icon: "⭐" },
  ];

  return (
      <section
        className="py-20 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white nc-CadirKiralamaPage-section-4"
        aria-label="Başarı İstatistiklerimiz"
      >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="text-center group"
              role="group"
              aria-labelledby={`cadir-stat-${index}-value`}
              aria-describedby={`cadir-stat-${index}-label`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-500 group-hover:scale-105">
                <div
                  className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {stat.icon}
                </div>
                <h3
                  id={`cadir-stat-${index}-value`}
                  className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg"
                >
                  {stat.value}
                </h3>
                <p
                  id={`cadir-stat-${index}-label`}
                  className="text-blue-100 text-lg font-semibold"
                >
                  {stat.label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Kullanım Alanları ================== */
function UseCases() {
  return (
      <section
        className="py-20 bg-gradient-to-br from-gray-900 to-blue-900/95 nc-CadirKiralamaPage-section-5"
        aria-labelledby="kullanim-alanlari-baslik"
      >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="kullanim-alanlari-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Kullanım{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Alanları
            </span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Çadır çözümlerimizin tercih edildiği başlıca etkinlik türleri ve özel
            çözümlerimiz
          </p>
          <div
            className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8 rounded-full"
            aria-hidden="true"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {USE_CASES.map((uc) => (
            <div
              key={uc.text}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 group hover:scale-105"
            >
              <div className="flex flex-col items-start gap-4">
                <div
                  className="text-3xl bg-white/20 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {uc.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-blue-300 transition-colors">
                    {uc.text}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
          >
            <span aria-hidden="true" className="text-xl mr-3">
              💬
            </span>
            <span>Etkinliğiniz için Özel Çözüm Alın</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Bilgi & Rehber ================== */
function Articles() {
  return (
      <section
        className="py-20 bg-gradient-to-b from-white to-gray-50/50 nc-CadirKiralamaPage-section-6"
        aria-labelledby="bilgi-rehber-baslik"
      >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2
            id="bilgi-rehber-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            Bilgi &{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Profesyonel Rehber
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Çadır kiralama hakkında uzman görüşleri ve teknik bilgiler
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ana Makale */}
          <article className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <header className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white p-8 md:p-10 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-black/10"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
                    📚 Kapsamlı Rehber
                  </span>
                  <span className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
                    ⭐ Uzman Görüşü
                  </span>
                  <span className="bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
                    🎯 Pratik Çözümler
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Profesyonel Çadır Kiralama: Etkinlik Başarınız İçin Tam
                  Kapsamlı Çözümler
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  Kurumsal standartlar, hızlı kurulum süreçleri ve ölçülebilir
                  kalite garantisi ile etkinliklerinizde mükemmel performans
                </p>
              </div>
            </header>

            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-600 prose-ul:mt-6 prose-ul:mb-6 prose-li:marker:text-blue-500">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span
                        className="bg-blue-100 text-blue-600 rounded-2xl p-3"
                        aria-hidden="true"
                      >
                        🏕️
                      </span>
                      Çadır Sistemleri ve Teknolojileri
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong>,
                      Türkiye genelinde{" "}
                      <Link
                        href="/cadir-kiralama"
                        className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                      >
                        profesyonel çadır kiralama
                      </Link>{" "}
                      hizmetleriyle kurumsal standartta çözümler sunmaktadır.
                    </p>
                    <p>
                      Etkinliğiniz ister açık hava düğünü, ister kurumsal fuar
                      olsun; detaylı keşif, teknik projelendirme, güvenli
                      kurulum ve söküm dahil{" "}
                      <strong className="text-gray-900">
                        uçtan uca hizmet
                      </strong>{" "}
                      modelimizle tek ekipten kapsamlı yönetim sağlıyoruz.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span
                        className="bg-purple-100 text-purple-600 rounded-2xl p-3"
                        aria-hidden="true"
                      >
                        🔮
                      </span>
                      Özel Çadır Sistemleri
                    </h4>
                    <p>
                      Pagoda çadırlarımız 5×5m ve 6×6m modüler sistemlerle esnek
                      alan çözümleri sunarken, şeffaf dome çadırlar gece
                      aydınlatmasıyla büyüleyici atmosferler yaratıyor.
                    </p>
                    <p>
                      Endüstriyel çadırlarımız 10–20m geniş açıklıklarla
                      depolama ve üretim alanları için ideal çözümler
                      sunarken, fuar çadırlarımız profesyonel sergi alanları
                      oluşturuyor.
                    </p>
                  </div>
                </div>

                {/* Önemli Bilgi Kutusu */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
                  <h5 className="font-black text-blue-700 text-xl mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      💡
                    </span>
                    Profesyonel Uygulama Stratejisi
                  </h5>
                  <p className="text-gray-700 text-lg mb-0 leading-relaxed">
                    Uygulama stratejimiz mekânın topoğrafik yapısına ve etkinlik
                    ihtiyaçlarına göre şekillenir. Düğün etkinliklerinde estetik
                    ve konfor ön planda tutulurken, fuar ve endüstriyel
                    uygulamalarda fonksiyonellik ve dayanıklılık
                    önceliklendirilir.
                  </p>
                </div>

                {/* Başarı Faktörleri Grid */}
                <div className="mb-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                    <span
                      className="bg-green-100 text-green-600 rounded-2xl p-3"
                      aria-hidden="true"
                    >
                      🚀
                    </span>
                    Kritik Başarı Faktörleri
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: "🎯",
                        title: "Detaylı Keşif ve Analiz",
                        desc: "Mekan analizi, ihtiyaç değerlendirmesi ve risk analizi",
                      },
                      {
                        icon: "📊",
                        title: "Teknik Projelendirme",
                        desc: "Rüzgar yükü hesapları, zemin analizi ve güvenlik planlaması",
                      },
                      {
                        icon: "🔒",
                        title: "Güvenlik Sistemleri",
                        desc: "TS EN standartları, ankraj sistemleri ve acil durum planları",
                      },
                      {
                        icon: "🎭",
                        title: "Estetik Çözümler",
                        desc: "Dekorasyon, aydınlatma ve markalama entegrasyonu",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group hover:border-blue-200"
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                          <div>
                            <h5 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h5>
                            <p className="text-gray-600 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-2xl p-6 mt-8">
                  <h5 className="font-black text-yellow-700 text-lg mb-3 flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">
                      💎
                    </span>
                    Neden Sahneva?
                  </h5>
                  <p className="text-yellow-800 mb-0">
                    <strong>
                      8+ yıllık deneyim, 850+ başarılı etkinlik ve 81 ilde
                      hizmet
                    </strong>{" "}
                    ile çadır kiralama konusunda güvenilir çözüm ortağınız.
                    Profesyonel ekipman, uzman ekip ve 7/24 teknik destek
                    garantisi sunuyoruz.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Yan Makaleler */}
          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Teknik Entegrasyon ve Kurulum Süreçleri
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Profesyonel kurulum, güvenlik sistemleri ve tamamlayıcı
                hizmetler
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  Çadır kurulum sürecimiz detaylı keşif ve teknik projelendirme
                  ile başlar. Mekanın topoğrafik yapısı, rüzgar koşulları ve
                  etkinlik ihtiyaçları analiz edilir.
                </p>
                <p>
                  Profesyonel kurulum ekibimiz 2–6 saat içinde çadırınızı
                  montajlar, güvenlik sistemlerini kurar ve tamamlayıcı
                  hizmetleri entegre eder.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span
                      className="bg-purple-100 text-purple-600 rounded-xl p-2"
                      aria-hidden="true"
                    >
                      📋
                    </span>
                    Teknik Özellikler ve Standartlar
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      Alüminyum iskelet ve çelik bağlantı elemanları
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      650 gr/m² UV dayanımlı branda
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      90 km/s rüzgar dayanımı
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      Profesyonel ankraj ve ağırlıklandırma
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Etkinlik Türlerine Özel Çözümler
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Her etkinlik türüne özel çadır stratejileri ve teknik çözümler
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span
                        className="bg-blue-100 text-blue-600 rounded-xl p-2"
                        aria-hidden="true"
                      >
                        💍
                      </span>
                      Düğün ve Özel Davetler
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Şık tasarım, romantik aydınlatma, konforlu alanlar, özel
                      dekorasyon çözümleri
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span
                        className="bg-purple-100 text-purple-600 rounded-xl p-2"
                        aria-hidden="true"
                      >
                        🎪
                      </span>
                      Fuar ve Sergiler
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Profesyonel görünüm, stand uyumu, kurumsal markalama,
                      fonksiyonel alan planlaması
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span
                        className="bg-green-100 text-green-600 rounded-xl p-2"
                        aria-hidden="true"
                      >
                        🏭
                      </span>
                      Endüstriyel Çözümler
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Dayanıklı yapı, geniş açıklık, forklift erişimi, uzun
                      ömürlü kullanım ve bakım desteği
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ================== SSS ================== */
const FAQ_ITEMS = [
  {
    q: "Çadır kiralama fiyatları ne kadar?",
    a: "5×5 metre pagoda çadır kiralama fiyatımız yaklaşık 7.000 TL'dir. Bu fiyata İstanbul içi nakliye, profesyonel kurulum, söküm işlemleri ve temel teknik destek dahildir. Metrekare başına standart çadırlar için fiyat 300 TL'den başlamaktadır. Özel tasarım ve premium çadırlarda fiyat değişiklik gösterebilir.",
  },
  {
    q: "Çadır kurulumu ne kadar sürer?",
    a: "5×5 metre çadır kurulumu genellikle 2-3 saat, 6×6 metre çadır kurulumu ise 3-4 saat sürmektedir. Büyük ölçekli projelerde kurulum 1 gün önceden tamamlanır. Acil durumlarda express kurulum hizmeti sunuyoruz.",
  },
  {
    q: "Çadırlar kötü hava koşullarına dayanıklı mı?",
    a: "Evet, çadırlarımız 90 km/s rüzgar hızına dayanıklıdır. TS EN 13782 standartlarına uygun üretilmiş alüminyum iskelet ve 650 gr/m² UV dayanımlı branda kullanıyoruz. Yağmur oluğu sistemi ile su tahliyesi sorunsuz şekilde sağlanır.",
  },
  {
    q: "Hangi şehirlerde hizmet veriyorsunuz?",
    a: "Türkiye'nin 81 ilinde profesyonel çadır kiralama hizmeti sunuyoruz. İstanbul, Ankara, İzmir gibi büyükşehirlerde daha hızlı kurulum süreleri sağlarken, tüm illerde standart hizmet kalitemizi koruyoruz.",
  },
];

function FAQ() {
  return (
    <section className="py-20 bg-white" aria-labelledby="sss-baslik">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2
            id="sss-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            Sık Sorulan{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Sorular
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Çadır kiralama hakkında merak edilen sorular ve cevapları
          </p>
        </div>

        <div className="space-y-6">
          {FAQ_ITEMS.map((faq, index) => (
            <details
              key={index}
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 open:bg-blue-50 open:border-blue-200 border-2 border-transparent open:border"
            >
              <summary
                className="cursor-pointer list-none flex items-center justify_between text-xl font-bold text-gray-900"
                role="button"
              >
                <span className="pr-4">{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="ml-4 transition-transform duration-500 group-open:rotate-180 text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
                >
                  ⌄
                </span>
              </summary>

              <div className="mt-6 text-gray-700 leading-relaxed text-lg pl-4 border-l-4 border-blue-500">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Daha fazla sorunuz mu var? Uzman ekibimiz sizi arayıp bilgilendirsin.
          </p>
          <Link
            href="/sss"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
            aria-label="Sık Sorulan Sorular sayfasındaki tüm soruları görüntüle"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">
              📚
            </span>
            <span className="text-lg">Tüm SSS'yi Görüntüle</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Tamamlayıcı Hizmetler ================== */
function RelatedServices() {
  const services = [
    {
      href: "/podyum-kiralama",
      title: "Podyum Kiralama",
      icon: "📐",
      desc: "Profesyonel sahne platformları ve podyum sistemleri",
    },
    {
      href: "/led-ekran-kiralama",
      title: "LED Ekran Kiralama",
      icon: "🖥️",
      desc: "Yüksek çözünürlüklü LED ekran ve video wall çözümleri",
    },
    {
      href: "/ses-isik-sistemleri",
      title: "Ses & Işık Sistemleri",
      icon: "🎵",
      desc: "Profesyonel ses ve ışık sistemleri kiralama",
    },
    {
      href: "/sahne-kiralama",
      title: "Sahne Kiralama",
      icon: "🛠️",
      desc: "Portatif ve modüler sahne sistemleri kiralama",
    },
  ];

  return (
      <section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-100/30 nc-CadirKiralamaPage-section-7"
        aria-labelledby="tamamlayici-hizmetler-baslik"
      >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="tamamlayici-hizmetler-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            Tamamlayıcı{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Çadır kurulumunuzu tamamlayacak diğer profesyonel etkinlik
            çözümlerimiz
          </p>
          <div
            className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8 rounded-full"
            aria-hidden="true"
          />
        </div>

        <nav aria-label="Tamamlayıcı hizmetler">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-500 hover:scale-105 text-center focus-ring h-full flex flex-col"
                aria-label={`${service.title} - ${service.desc}`}
              >
                <div
                  className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors mb-4 flex-grow">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
                  {service.desc}
                </p>
              </Link>
            ))}
          </div>
        </nav>

        <div className="sr-only">
          <p>
            Bu bölümde çadır kurulumunuzu tamamlayacak diğer hizmetlerimiz
            bulunmaktadır. Her bir hizmet kartına tıklayarak veya klavye ile
            seçerek ilgili sayfaya gidebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================== CTA ================== */
function CTA() {
  return (
      <section
        className="py-20 bg-white nc-CadirKiralamaPage-section-8"
        aria-labelledby="cta-baslik"
      >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 bg-black/10"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <h2
              id="cta-baslik"
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
            >
              Profesyonel Çadır Çözümlerine Hazır Mısınız?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Etkinliğiniz için en uygun çadır sistemlerini sunalım. Ücretsiz
              keşif, profesyonel danışmanlık ve rekabetçi fiyat garantisi ile
              hizmetinizdeyiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl focus-ring shadow-lg"
              >
                <span aria-hidden="true" className="text-xl mr-3">
                  📞
                </span>
                <span className="text-lg">Hemen Teklif Al</span>
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white bg-transparent hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
              >
                <span aria-hidden="true" className="text-xl mr-3">
                  💬
                </span>
                <span className="text-lg">WhatsApp'tan Yaz</span>
              </a>
            </div>
            <div className="mt-8 text-blue-200 text-lg">
              📍 81 ilde hizmet • ⏰ 7/24 teknik destek • ⭐ 8+ yıl deneyim
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== JSON-LD (Çadır Kiralama) — FINAL ================== */
function JsonLd() {
  const pageUrl = `${ORIGIN}/cadir-kiralama`;
  const pageDescription = metadata.description;

  const providerRef = {
    "@id": ORGANIZATION_ID,
  };

    /* ----------------------------------------
      LOCAL BUSINESS (layout'taki #local)
    ---------------------------------------- */
    const localBusinessRef = { "@id": LOCAL_BUSINESS_ID };

  /* ----------------------------------------
    RATING NODE (LocalBusiness'a bağlı)
  ---------------------------------------- */
  const ratingNodeId = `${pageUrl}#rating`;

  const ratingNode = {
    "@type": "AggregateRating",
    "@id": ratingNodeId,
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "180",
      itemReviewed: localBusinessRef,
  };

  /* ----------------------------------------
    SERVICE
  ---------------------------------------- */
  const serviceNode = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Çadır Kiralama",
    description: pageDescription,
    serviceType: "Çadır Kiralama Hizmeti",
    url: pageUrl,
    provider: providerRef,
    areaServed: {
      "@type": "State",
      name: "Türkiye",
      description: "Türkiye'nin 81 ilinde profesyonel çadır kiralama hizmeti",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "TRY",
      lowPrice: "300",
      highPrice: "7000",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
    aggregateRating: {
      "@id": ratingNodeId,
    },
  };

  /* ----------------------------------------
    PRODUCT (Review buraya bağlanacak)
  ---------------------------------------- */
  const productNode = {
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    name: "Pagoda, Şeffaf Dome ve Endüstriyel Çadır Kiralama",
    description:
      "Pagoda, şeffaf dome ve endüstriyel çadır sistemleri için profesyonel kiralama hizmeti.",
    category: "EventTentRental",
    image: `${ORIGIN}/img/cadir/hero.webp`,
    brand: providerRef,
    url: pageUrl,
    isRelatedTo: {
      "@id": `${pageUrl}#service`,
    },
    aggregateRating: {
      "@id": ratingNodeId,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "TRY",
      lowPrice: "300",
      highPrice: "7000",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };

  /* ----------------------------------------
    WEBPAGE
  ---------------------------------------- */
  const webpageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: metadata.title,
    description: pageDescription,
    url: pageUrl,
    inLanguage: "tr-TR",
    mainEntity: {
      "@id": `${pageUrl}#service`,
    },
    isPartOf: {
      "@id": `${ORIGIN}#website`,
    },
    about: {
      "@id": `${pageUrl}#service`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${ORIGIN}/img/cadir/hero.webp`,
      width: 1200,
      height: 630,
      caption: "Sahneva — Profesyonel Çadır Kiralama Hizmetleri",
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: providerRef,
  };

  /* ----------------------------------------
    EVENT SERVICE
  ---------------------------------------- */
  const eventServiceSchema = {
    "@type": "EventService",
    "@id": `${pageUrl}#eventservice`,
    name: "Etkinlik Çadır Kiralama Hizmeti",
    description:
      "Düğün, fuar, konser, festival ve kurumsal etkinlikler için çadır çözümleri",
    serviceType: USE_CASES.map((uc) => uc.text),
    provider: providerRef,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Türkiye",
    },
  };

  /* ----------------------------------------
    REVIEWS (Product'a bağlı — Google uyumlu)
  ---------------------------------------- */
  const reviews = [
    {
      "@type": "Review",
      "@id": `${pageUrl}#review-1`,
      itemReviewed: { "@id": `${pageUrl}#product` },
      author: { "@type": "Person", name: "Kurumsal Müşteri" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody:
        "Pagoda çadır kurulumu zamanında ve profesyonel şekilde yapıldı. Zemin kaplama ve aydınlatma ile alan tamamen hazırdı.",
      datePublished: "2024-01-20",
    },
    {
      "@type": "Review",
      "@id": `${pageUrl}#review-2`,
      itemReviewed: { "@id": `${pageUrl}#product` },
      author: { "@type": "Person", name: "Etkinlik Ajansı" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4.8",
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody:
        "Festival alanında endüstriyel çadırlar sorunsuz kuruldu. Hızlı kurulum ve 7/24 teknik destek bizim için kritik oldu.",
      datePublished: "2024-01-28",
    },
  ];

  /* ----------------------------------------
    FAQ
  ---------------------------------------- */
  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  /* ----------------------------------------
    TOP GRAPH (sıra senin istediğin gibi)
  ---------------------------------------- */
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        webpageSchema,       // 1) WebPage
        serviceNode,         // 2) Service
        productNode,         // 3) Product
        eventServiceSchema,  // 4) EventService
        ratingNode,          // 5) Rating
        ...reviews,          // 6) Reviews
        faqSchema            // 7) FAQ
      ],
    };

  return (
    <script
      id="ld-json-cadir"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Sayfa Bileşeni ================== */
export default function Page() {
  const baseUrl = SITE_URL;
  const canonical = `${baseUrl}/cadir-kiralama`;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "Hizmetler", url: `${baseUrl}/hizmetler` },
    { name: "Çadır Kiralama", url: canonical },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLd />
      <Hero />
      <Services />
      <Gallery />
      <Technical />
      <StatsBand />
      <UseCases />
      <Articles />
      <FAQ />
      <RelatedServices />
      <CTA />
    </>
  );
}
