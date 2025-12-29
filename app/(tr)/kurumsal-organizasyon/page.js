// app/kurumsal-organizasyon/page.jsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { buildFaqSchema } from "@/lib/structuredData/faq";
import { buildServiceProductSchema } from "@/lib/structuredData/serviceProducts";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== Sabitler ================== */
export const revalidate = 1800;
const ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";
const ORGANIZATION_ID = `${ORIGIN}/#org`;
const PHONE = "+905453048671";
const WA_TEXT =
  "Merhaba%2C+kurumsal+organizasyon+icin+teklif+istiyorum.+Etkinlik+turu%3A+%5Bkonferans%2Flansman%2Fgala%5D%2C+Tarih%3A+%5Bgg.aa.yyyy%5D%2C+Kisi+sayisi%3A+%5Bxxx%5D.";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

// Base64 blur placeholder
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
  title: "Kurumsal Organizasyon | Profesyonel Etkinlik Yönetimi | Sahneva",
  description:
    "Konferans, lansman, gala, miting ve roadshow organizasyonları. Sahne, ses, ışık, LED ekran ve profesyonel etkinlik yönetimi. Türkiye geneli hızlı hizmet.",
  alternates: { canonical: `${ORIGIN}/kurumsal-organizasyon` },
  openGraph: {
    title: "Kurumsal Organizasyon | Sahneva Organizasyon",
    description:
      "Konferans, lansman, gala ve kurumsal etkinlik çözümleri. Türkiye geneli profesyonel organizasyon ve tamamlayıcı hizmetler.",
    url: `${ORIGIN}/kurumsal-organizasyon`,
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
    title: "Kurumsal Organizasyon | Profesyonel Etkinlik Yönetimi | Sahneva",
    description:
      "Konferans, lansman, gala, miting organizasyonları. Sahne, ses, ışık, LED ekran ve profesyonel yönetim.",
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
  src: "/img/kurumsal/hero.webp",
  alt: "Profesyonel kurumsal organizasyon - Konferans sahnesi ve etkinlik düzenlemesi",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🎤",
    title: "Konferans & Seminer Organizasyonu",
    description:
      "Profesyonel ses sistemi, LED ekran ve aydınlatma çözümleri ile etkileyici konferanslar",
    features: [
      "Simultane çeviri sistemleri",
      "Kablosuz mikrofon sistemleri",
      "Kayıt ve canlı yayın",
      "Akustik optimizasyon",
    ],
  },
  {
    icon: "🚀",
    title: "Ürün Lansman Organizasyonu",
    description:
      "Etkileyici görsel şovlar ve interaktif deneyimler ile unutulmaz lansmanlar",
    features: [
      "3D mapping ve projeksiyon",
      "Özel sahne tasarımı",
      "Medya duvarları",
      "Interaktif ekranlar",
    ],
  },
  {
    icon: "🎭",
    title: "Gala & Ödül Töreni",
    description:
      "Şık ve profesyonel organizasyon çözümleri ile kurumsal galalar",
    features: [
      "Kırmızı halı kurulumu",
      "Özel aydınlatma tasarımı",
      "Sahne dekorasyonu",
      "VIP alanları",
    ],
  },
  {
    icon: "🏟️",
    title: "Miting & Açık Hava Organizasyonu",
    description:
      "Büyük kitlelere yönelik profesyonel açık hava etkinlik çözümleri",
    features: [
      "Yüksek parlaklıklı LED ekranlar",
      "Güçlü ses sistemleri",
      "Jeneratör ve altyapı",
      "Güvenlik önlemleri",
    ],
  },
  {
    icon: "🛣️",
    title: "Roadshow & Fuar Organizasyonu",
    description:
      "Mobil ve esnek organizasyon çözümleri ile marka deneyimi",
    features: [
      "Taşınabilir sahne sistemleri",
      "Hızlı kurulum çözümleri",
      "Marka entegrasyonu",
      "Interaktif standlar",
    ],
  },
  {
    icon: "💡",
    title: "Teknik Altyapı & Destek",
    description:
      "Profesyonel teknik altyapı ve 7/24 teknik destek hizmetleri",
    features: [
      "Jeneratör sistemleri",
      "UPS kesintisiz güç",
      "Acil durum planlaması",
      "7/24 teknik destek",
    ],
  },
];

const USE_CASES = [
  {
    icon: "🎤",
    text: "Konferans ve Seminerler",
    desc: "Profesyonel bilgi paylaşım platformları",
  },
  {
    icon: "🚀",
    text: "Ürün Lansmanları",
    desc: "Yeni ürün ve hizmet tanıtım etkinlikleri",
  },
  {
    icon: "🎭",
    text: "Gala ve Ödül Törenleri",
    desc: "Kurumsal başarı kutlamaları",
  },
  {
    icon: "🏟️",
    text: "Kurumsal Mitingler",
    desc: "Açık hava kurumsal buluşmaları",
  },
  {
    icon: "🛣️",
    text: "Roadshow ve Fuarlar",
    desc: "Mobil tanıtım ve marka deneyimi",
  },
  {
    icon: "💍",
    text: "Kurumsal Sosyal Etkinlikler",
    desc: "Yılbaşı partileri ve kutlamalar",
  },
];

/* ================== HERO ================== */
function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-slate-900 pt-20 min-h-[80vh] 2xl:min-h-[85vh]"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          className="object-cover"
          sizes={HERO.sizes}
          quality={85}
         
          blurDataURL={BLUR_DATA_URL}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-blue-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-purple-900/60" />
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
          Kurumsal{" "}
          <span className="gradient-text gradient-text--safe-xl">
            Organizasyon
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
          Konferans • Lansman • Gala • Miting • Roadshow
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-6">
          Profesyonel ekip ve son teknoloji ekipmanlarla
          <span className="font-semibold text-white">
            {" "}
            anahtar teslim çözümler
          </span>
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
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white/50 text-white bg-slate-900/85 backdrop-blur-lg hover:bg-slate-900/95 hover:border-white/70 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
          >
            <span aria-hidden="true" className="text-xl mr-2">
              🎯
            </span>
            <span className="text-base">Hizmetlerimiz</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">
              ⭐
            </span>
            <div className="text-xl font-black text-white">4.9/5</div>
            <div className="text-white/80 text-sm">250+ Değerlendirme</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">
              🏆
            </span>
            <div className="text-xl font-black text-white">500+</div>
            <div className="text-white/80 text-sm">Kurumsal Etkinlik</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">
              🚀
            </span>
            <div className="text-xl font-black text-white">81 İl</div>
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
      className="py-20 bg-gradient-to-b from-white to-blue-50/50"
      aria-labelledby="hizmetler-baslik"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="hizmetler-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900"
          >
            Kurumsal{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kurumsal organizasyon hizmetlerimiz: planlama, teknik tasarım,
            kurulum, operasyon ve destek
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service) => {
            const id = `svc-${slugify(service.title)}`;
            return (
              <article
                key={id}
                className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 group hover:scale-105 transition-all duration-500 h-full flex flex-col"
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
    src: "/img/kurumsal/1.webp",
    alt: "Konferans organizasyonu - Profesyonel sahne ve LED ekran kurulumu",
  },
  {
    src: "/img/kurumsal/2.webp",
    alt: "Ürün lansmanı - Etkileyici görsel şov ve sahne tasarımı",
  },
  {
    src: "/img/kurumsal/3.webp",
    alt: "Gala organizasyonu - Şık dekorasyon ve aydınlatma",
  },
  {
    src: "/img/kurumsal/4.webp",
    alt: "Miting organizasyonu - Açık hava ses ve LED ekran sistemleri",
  },
  {
    src: "/img/kurumsal/5.webp",
    alt: "Roadshow organizasyonu - Mobil sahne ve marka standı",
  },
  {
    src: "/img/kurumsal/6.webp",
    alt: "Seminer organizasyonu - Profesyonel ses ve projeksiyon sistemi",
  },
  {
    src: "/img/kurumsal/7.webp",
    alt: "Kurumsal yemek organizasyonu - Özel masa düzeni ve aydınlatma",
  },
  {
    src: "/img/kurumsal/8.webp",
    alt: "Fuar organizasyonu - Interaktif stand ve marka deneyimi",
  },
  {
    src: "/img/kurumsal/9.webp",
    alt: "Ödül töreni - Kırmızı halı ve özel sahne düzeni",
  },
  {
    src: "/img/kurumsal/10.webp",
    alt: "Kurumsal etkinlik - Geniş katılımlı toplantı organizasyonu",
  },
];

function Gallery() {
  return (
    <section className="py-20 bg-white" aria-labelledby="galeri-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="galeri-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900"
          >
            Kurumsal{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Projelerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gerçekleştirdiğimiz başarılı kurumsal organizasyonlardan örnekler
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery images={GALLERY_IMAGES} visibleCount={8} />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Daha fazla kurumsal projemizi incelemek için galerimizi keşfedin
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
      category: "sahne",
      title: "Sahne Sistemleri",
      description:
        "Modüler sahne platformları ve profesyonel sahne tasarım çözümleri",
      features: [
        "Modüler sahne sistemleri",
        "30-200 m² kapasite",
        "Çelik konstrüksiyon",
        "Anti-slip yüzey",
      ],
    },
    {
      category: "led",
      title: "LED Ekran Sistemleri",
      description:
        "Yüksek çözünürlüklü LED ekranlar ve video wall çözümleri",
      features: [
        "P2.5-P6 piksel aralığı",
        "1500-6500 nit parlaklık",
        "4K çözünürlük",
        "Hızlı kurulum",
      ],
    },
    {
      category: "ses",
      title: "Ses Sistemleri",
      description:
        "Profesyonel ses sistemleri ve akustik optimizasyon çözümleri",
      features: [
        "Line-array ses sistemleri",
        "Kablosuz mikrofon",
        "Dijital mixing",
        "360° ses dağılımı",
      ],
    },
    {
      category: "isik",
      title: "Aydınlatma Sistemleri",
      description:
        "Profesyonel aydınlatma ve ışık koreografi çözümleri",
      features: [
        "LED wash ışıklar",
        "Hareketli kafalar",
        "DMX kontrol",
        "Işık koreografi",
      ],
    },
    {
      category: "guc",
      title: "Güç Altyapısı",
      description: "Kesintisiz güç sistemleri ve elektrik altyapı çözümleri",
      features: [
        "Jeneratör sistemleri",
        "UPS kesintisiz güç",
        "Güç dağıtım üniteleri",
        "Acil aydınlatma",
      ],
    },
    {
      category: "yayin",
      title: "Yayın Sistemleri",
      description: "Canlı yayın, kayıt ve streaming çözümleri",
      features: [
        "4K kamera sistemleri",
        "Canlı yayın entegrasyonu",
        "Çoklu kamera miksaj",
        "Ses kayıt sistemleri",
      ],
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
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
            kurumsal etkinliklerinizdeyiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technicalItems.map((item) => (
            <article
              key={item.category}
              className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl group hover:scale-105 transition-all duration-500 h-full"
            >
              <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {item.category === "sahne" && "🎭"}
                  {item.category === "led" && "🖥️"}
                  {item.category === "ses" && "🔊"}
                  {item.category === "isik" && "💡"}
                  {item.category === "guc" && "⚡"}
                  {item.category === "yayin" && "📹"}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== İstatistik Bant ================== */
function StatsBand() {
  const stats = [
    { value: "500+", label: "Kurumsal Etkinlik", icon: "🎪" },
    { value: "50+", label: "Kurumsal Müşteri", icon: "🏢" },
    { value: "81", label: "İlde Hizmet", icon: "🗺️" },
    { value: "10+", label: "Yıl Deneyim", icon: "⭐" },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white"
      aria-label="Başarı İstatistiklerimiz"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="text-center group"
              aria-labelledby={`kurum-stat-${index}-value`}
              aria-describedby={`kurum-stat-${index}-label`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-500 group-hover:scale-105">
                <div
                  className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {stat.icon}
                </div>
                <h3
                  id={`kurum-stat-${index}-value`}
                  className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg"
                >
                  {stat.value}
                </h3>
                <p
                  id={`kurum-stat-${index}-label`}
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
      className="py-20 bg-gradient-to-br from-gray-900 to-blue-900/95"
      aria-labelledby="kullanim-alanlari-baslik"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="kullanim-alanlari-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Organizasyon{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Türleri
            </span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Kurumsal organizasyon çözümlerimizin tercih edildiği başlıca
            etkinlik türleri ve özel çözümlerimiz
          </p>
          <div
            className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8 rounded-full"
            aria-hidden="true"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {USE_CASES.map((uc) => (
            <article
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
            </article>
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
      className="py-20 bg-gradient-to-b from-white to-gray-50/50"
      aria-labelledby="bilgi-rehber-baslik"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2
            id="bilgi-rehber-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            Kurumsal{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Rehber
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kurumsal organizasyon hakkında uzman görüşleri ve teknik bilgiler
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ana Makale */}
          <article className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <header className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white p-8 md:p-10 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-black/10"
                aria-hidden="true"
              ></div>
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
                  Profesyonel Kurumsal Organizasyon: Etkinlik Başarınız İçin Tam
                  Kapsamlı Çözümler
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  Kurumsal standartlar, detaylı planlama süreçleri ve
                  ölçülebilir kalite garantisi ile etkinliklerinizde mükemmel
                  performans
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
                        🎯
                      </span>
                      Kurumsal Organizasyon ve Strateji
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong>,
                      Türkiye genelinde{" "}
                      <Link
                        href="/kurumsal-organizasyon"
                        className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                      >
                        profesyonel kurumsal organizasyon
                      </Link>{" "}
                      hizmetleriyle kurumsal standartta çözümler sunmaktadır.
                    </p>
                    <p>
                      Etkinliğiniz ister konferans, ister lansman olsun; detaylı
                      planlama, teknik projelendirme, profesyonel operasyon ve
                      sonrası destek dahil{" "}
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
                        🚀
                      </span>
                      Özel Organizasyon Çözümleri
                    </h4>
                    <p>
                      Konferans organizasyonlarımız profesyonel ses ve görüntü
                      sistemleriyle etkileyici deneyimler sunarken, lansman
                      organizasyonları marka değerinizi artıracak görsel
                      şovlarla destekleniyor.
                    </p>
                    <p>
                      Gala ve ödül törenlerinde şık tasarımlar ve özel
                      aydınlatma çözümleri sunarken, miting organizasyonlarında
                      geniş kitlelere hitap eden teknik altyapı sağlıyoruz.
                    </p>
                  </div>
                </div>

                {/* Önemli Bilgi Kutusu */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
                  <h5 className="font-black text-blue-700 text-xl mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      💡
                    </span>
                    Profesyonel Organizasyon Stratejisi
                  </h5>
                  <p className="text-gray-700 text-lg mb-0 leading-relaxed">
                    Organizasyon stratejimiz kurumsal ihtiyaçlarınıza ve hedef
                    kitlenize göre şekillenir. Konferans organizasyonlarında
                    teknik mükemmellik ön planda tutulurken, lansman ve galalarda
                    marka deneyimi ve görsel etki önceliklendirilir.
                  </p>
                </div>

                {/* Başarı Faktörleri Grid */}
                <div className="mb-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                    <span
                      className="bg-green-100 text-green-600 rounded-2xl p-3"
                      aria-hidden="true"
                    >
                      🏆
                    </span>
                    Kritik Başarı Faktörleri
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: "📊",
                        title: "Detaylı Planlama ve Analiz",
                        desc: "İhtiyaç analizi, risk değerlendirmesi ve kapsamlı planlama",
                      },
                      {
                        icon: "🎨",
                        title: "Tasarım ve Yaratıcılık",
                        desc: "Özgün tema tasarımı, marka entegrasyonu ve görsel strateji",
                      },
                      {
                        icon: "🔧",
                        title: "Teknik Mükemmellik",
                        desc: "Son teknoloji ekipman, yedekli sistemler ve kalite kontrol",
                      },
                      {
                        icon: "⏱️",
                        title: "Zaman Yönetimi",
                        desc: "Kritik yol analizi, zaman planlaması ve proje yönetimi",
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
                      10+ yıllık deneyim, 500+ başarılı kurumsal etkinlik ve 81
                      ilde hizmet
                    </strong>{" "}
                    ile kurumsal organizasyon konusunda güvenilir çözüm
                    ortağınız. Profesyonel ekip, son teknoloji ekipman ve 7/24
                    operasyonel destek garantisi.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Yan Makaleler */}
          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Teknik Entegrasyon ve Operasyon Süreçleri
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Profesyonel kurulum, yedekli sistemler ve operasyonel
                mükemmellik
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  Kurumsal organizasyon sürecimiz detaylı planlama ve teknik
                  projelendirme ile başlar. Mekan analizi, teknik ihtiyaçlar ve
                  operasyonel gereksinimler titizlikle değerlendirilir.
                </p>
                <p>
                  Profesyonel operasyon ekibimiz etkinlik öncesi tüm sistemleri
                  kurar, test eder ve etkinlik süresince kesintisiz destek
                  sağlar.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span
                      className="bg-purple-100 text-purple-600 rounded-xl p-2"
                      aria-hidden="true"
                    >
                      📋
                    </span>
                    Operasyonel Standartlar
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      Yedekli teknik altyapı ve ekipman
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      Profesyonel operatör ve teknik ekip
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      7/24 teknik destek ve acil müdahale
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      Kalite kontrol ve test prosedürleri
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Etkinlik Türlerine Özel Stratejiler
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Her kurumsal etkinlik türüne özel organizasyon stratejileri ve
                çözümler
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
                        🎤
                      </span>
                      Konferans ve Seminerler
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Net ses iletimi, yüksek çözünürlüklü görüntü, interaktif
                      katılım sistemleri
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span
                        className="bg-purple-100 text-purple-600 rounded-xl p-2"
                        aria-hidden="true"
                      >
                        🚀
                      </span>
                      Ürün Lansmanları
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Etkileyici görsel şovlar, marka deneyimi, medya
                      ilişkileri, sosyal medya entegrasyonu
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span
                        className="bg-green-100 text-green-600 rounded-xl p-2"
                        aria-hidden="true"
                      >
                        🎭
                      </span>
                      Gala ve Ödül Törenleri
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Şık dekorasyon, özel aydınlatma, kırmızı halı, VIP
                      protokol, fotoğraf/video çekim
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
    q: "Kurumsal organizasyon fiyatları ne kadar?",
    a: "Kurumsal organizasyon fiyatları etkinlik türüne, katılımcı sayısına, teknik ihtiyaçlara ve süreye göre değişiklik gösterir. Temel bir konferans organizasyonu 15.000 TL'den başlarken, kapsamlı lansman organizasyonları 50.000 TL ve üzerine çıkabilir. Detaylı teklif için iletişime geçebilirsiniz.",
  },
  {
    q: "Organizasyon planlaması ne kadar sürer?",
    a: "Küçük ölçekli organizasyonlar için 2-4 hafta, orta ölçekli organizasyonlar için 4-8 hafta, büyük ölçekli organizasyonlar için 8-12 hafta planlama süresi öneriyoruz. Acil durumlarda express organizasyon hizmeti sunuyoruz.",
  },
  {
    q: "Hangi şehirlerde hizmet veriyorsunuz?",
    a: "Türkiye'nin 81 ilinde profesyonel kurumsal organizasyon hizmeti sunuyoruz. İstanbul, Ankara, İzmir gibi büyükşehirlerde daha kısa planlama süreleri sunarken, tüm illerde standart hizmet kalitemizi koruyoruz.",
  },
  {
    q: "Teknik ekipmanlarınız yedekli mi?",
    a: "Evet, tüm kritik teknik ekipmanlarımız yedeklidir. Ses sistemleri, mikserler, mikrofonlar, LED ekran modülleri, jeneratörler ve aydınlatma sistemleri yedekli olarak kurulur. Ayrıca teknik ekip üyelerimiz de yedekli olarak görev yapar.",
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
            Kurumsal organizasyon hakkında merak edilen sorular ve cevapları
          </p>
        </div>

        <div className="space-y-6">
          {FAQ_ITEMS.map((faq, index) => (
            <details
              key={index}
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 open:bg-blue-50 open:border-blue-200 border-2 border-transparent open:border"
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between text-xl font-bold text-gray-900"
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
      href: "/cadir-kiralama",
      title: "Çadır Kiralama",
      icon: "🏕️",
      desc: "Profesyonel çadır sistemleri ve kurulum hizmetleri",
    },
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
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-100/30"
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
            Kurumsal organizasyonunuzu tamamlayacak diğer profesyonel etkinlik
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
            Bu bölümde kurumsal organizasyonunuzu tamamlayacak diğer
            hizmetlerimiz bulunmaktadır. Her bir hizmet kartına tıklayarak
            ilgili sayfaya gidebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================== CTA ================== */
function CTA() {
  return (
    <section className="py-20 bg-white" aria-labelledby="cta-baslik">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 bg-black/10"
            aria-hidden="true"
          ></div>
          <div className="relative z-10">
            <h2
              id="cta-baslik"
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
            >
              Profesyonel Kurumsal Çözümlere Hazır Mısınız?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Kurumsal etkinliğiniz için en uygun organizasyon çözümlerini
              sunalım. Ücretsiz danışmanlık, detaylı planlama ve rekabetçi fiyat
              garantisi ile hizmetinizdeyiz.
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
              📍 81 ilde hizmet • ⏰ 7/24 operasyonel destek • ⭐ 10+ yıl deneyim
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== JSON-LD ================== */
/* Burada next/script yerine düz <script> kullanıyoruz.
   Böylece bu sayfa için ekstra client-side JS yükü oluşmuyor. */
function JsonLd() {
  const pageUrl = `${ORIGIN}/kurumsal-organizasyon`;
  const pageDescription = metadata.description;

  const provider = { "@id": ORGANIZATION_ID };

  const { service: serviceSchema, products } = buildServiceProductSchema({
    slug: "/kurumsal-organizasyon",
    locale: "tr-TR",
  });

  const baseService = {
    "@type": "Service",
    name: "Kurumsal Organizasyon",
    description: pageDescription,
    provider,
    areaServed: { "@type": "Country", name: "Türkiye" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "250",
      bestRating: "5",
    },
  };

  const serviceNode = serviceSchema
    ? { ...serviceSchema, ...baseService, provider, url: pageUrl }
    : { ...baseService, "@id": `${pageUrl}#service`, url: pageUrl };

  const serviceId = serviceNode["@id"] ?? `${pageUrl}#service`;
  serviceNode["@id"] = serviceId;

  const productNodes = products ?? [];
  const faqSchema = buildFaqSchema(FAQ_ITEMS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      serviceNode,
      {
        "@type": "WebPage",
        name: metadata.title,
        description: pageDescription,
        url: pageUrl,
        mainEntity: {
          "@type": "Service",
          name: "Kurumsal Organizasyon",
        },
      },
      ...productNodes,
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  return (
    <script
      id="ld-json-kurumsal"
      type="application/ld+json"
      // Burada JSON string'ini direkt gömüyoruz; ekstra JS çalışmıyor.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Sayfa Bileşeni ================== */
export default function Page() {
  const baseUrl = ORIGIN;
  const canonical = `${baseUrl}/kurumsal-organizasyon`;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "Hizmetler", url: `${baseUrl}/hizmetler` },
    { name: "Kurumsal Organizasyon", url: canonical },
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
