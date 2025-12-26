// app/sahne-kiralama/page.jsx
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
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? ORIGIN).replace(/\/$/, "");
const PHONE = "+905453048671";
const WA_TEXT =
  "Merhaba%2C+sahne+kiralama+icin+teklif+istiyorum.+Etkinlik+turu%3A+%5Bkonser%2Fkonferans%2Flansman%5D%2C+Tarih%3A+%5Bgg.aa.yyyy%5D%2C+Katilimci+sayisi%3A+%5Bxxx%5D%2C+Tahmini+sahne+olcusu%3A+%5Bm%C2%B2%5D.";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

// Base64 blur placeholder
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ================== Dinamik galeri ================== */
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
  title: "Sahne Kiralama | Profesyonel Sahne Çözümleri | Sahneva",
  description:
    "Konser, konferans, lansman, miting ve festival etkinlikleri için anahtar teslim sahne kiralama. Truss, podyum, LED ekran, ses ve ışık sistemleri. 81 ilde profesyonel hizmet.",
  alternates: { canonical: `${ORIGIN}/sahne-kiralama` },
  openGraph: {
    title: "Sahne Kiralama | Sahneva Organizasyon",
    description:
      "Konser, konferans, lansman ve festival etkinlikleri için truss, podyum, LED ekran, ses ve ışık sistemleri ile anahtar teslim sahne çözümleri.",
    url: `${ORIGIN}/sahne-kiralama`,
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
    title: "Sahne Kiralama | Profesyonel Sahne Çözümleri | Sahneva",
    description:
      "Konser, konferans, lansman ve festival etkinlikleri için profesyonel sahne çözümleri.",
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
  src: "/img/hizmet-sahne.webp",
  alt: "Profesyonel sahne kurulumu - Konser sahnesinde truss sistemleri, LED ekran ve ışık performansı",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🎭",
    title: "Modüler Sahne Sistemleri",
    description:
      "1×1 ve 2×1 podyum panelleri ile esnek ve hızlı kurulum çözümleri",
    features: [
      "1×1 & 2×1 paneller",
      "Modüler tasarım",
      "Hızlı kurulum",
      "Esnek konfigürasyon",
    ],
  },
  {
    icon: "🏗️",
    title: "Truss & Rigging Sistemleri",
    description:
      "Alüminyum truss sistemleri, profesyonel rigging ve güvenlik ekipmanları",
    features: [
      "Alüminyum truss",
      "Profesyonel rigging",
      "Güvenlik sistemleri",
      "Statik hesaplama",
    ],
  },
  {
    icon: "🖥️",
    title: "LED Ekran Entegrasyonu",
    description: "P2-P6 LED ekranlar, video wall sistemleri ve canlı yayın çözümleri",
    features: [
      "P2-P6 LED ekranlar",
      "Video wall sistemleri",
      "Canlı yayın",
      "4K çözünürlük",
    ],
  },
  {
    icon: "🎵",
    title: "Ses & Işık Sistemleri",
    description:
      "Profesyonel ses sistemleri, ışık tasarımı ve canlı performans çözümleri",
    features: [
      "Line array ses sistemleri",
      "Işık tasarımı",
      "DMX kontrol",
      "Canlı performans",
    ],
  },
  {
    icon: "⚡",
    title: "Teknik Altyapı",
    description:
      "Güç dağıtım, kablo yönetimi ve profesyonel teknik altyapı çözümleri",
    features: [
      "Güç dağıtım",
      "Kablo yönetimi",
      "Teknik altyapı",
      "Profesyonel ekip",
    ],
  },
  {
    icon: "🔧",
    title: "Anahtar Teslim Çözümler",
    description: "Kurulum, operasyon, canlı yönetim ve söküm dahil tam hizmet",
    features: ["Kurulum & söküm", "Canlı operasyon", "Teknik yönetim", "7/24 destek"],
  },
];

const USE_CASES = [
  {
    icon: "🎵",
    text: "Konser ve müzik festivalleri",
    desc: "Ana sahne, alt sahne ve akustik performanslar için profesyonel çözümler",
  },
  {
    icon: "💼",
    text: "Kurumsal konferans ve toplantılar",
    desc: "Şirket içi toplantılar, yıllık genel kurullar ve sektör konferansları",
  },
  {
    icon: "🚀",
    text: "Ürün lansmanı ve tanıtım etkinlikleri",
    desc: "Yeni ürün ve hizmetlerin tanıtıldığı etkileyici lansman etkinlikleri",
  },
  {
    icon: "🏆",
    text: "Ödül törenleri ve galalar",
    desc: "Şık ve görkemli ödül törenleri, yılbaşı partileri ve özel galalar",
  },
  {
    icon: "🎓",
    text: "Mezuniyet ve okul etkinlikleri",
    desc: "Mezuniyet törenleri, yılsonu gösterileri ve okul festivalleri",
  },
  {
    icon: "🛍️",
    text: "AVM ve perakende etkinlikleri",
    desc: "Alışveriş merkezlerinde düzenlenen promosyon ve marka etkinlikleri",
  },
];

// Paket verileri
const PACKAGES = [
  {
    id: "mini-sahne",
    name: "Mini Sahne — 16 m²",
    badge: "Küçük Etkinlik",
    specs: {
      area: "16 m²",
      dimensions: "4×4 m",
      height: "40 cm",
      truss: "6 m düz truss",
    },
    includes: [
      "8 × (2×1 m) podyum – 16 m²",
      "Yükseklik 40 cm, kaymaz kaplama",
      "6 m düz truss arka fon",
      "2 LED bar + 2 spot",
      "Kurulum, test ve söküm",
    ],
    note: "Toplantı, söyleşi ve butik iç mekân etkinlikleri için ideal.",
  },
  {
    id: "standart-sahne",
    name: "Standart Sahne — 24 m²",
    badge: "Popüler",
    specs: {
      area: "24 m²",
      dimensions: "6×4 m",
      height: "60 cm",
      truss: "12 m U truss",
    },
    includes: [
      "12 × (2×1 m) podyum – 24 m²",
      "Yükseklik 60 cm, ön etek kapama",
      "U şeklinde 12 m truss",
      "4 hareketli başlık + 6 wash",
      "2+1 hoparlör, dijital mikser, kablosuz mikrofon",
      "Kurulum, canlı teknik yönetim, söküm",
    ],
    note: "Kurumsal lansman, söyleşi+performans, AVM etkinlikleri için.",
  },
  {
    id: "konser-sahnesi",
    name: "Konser Sahnesi — 48 m²",
    badge: "Profesyonel",
    specs: {
      area: "48 m²",
      dimensions: "8×6 m",
      height: "80-100 cm",
      truss: "20 m truss sistemi",
    },
    includes: [
      "24 × (2×1 m) podyum – 48 m²",
      "Yükseklik 80–100 cm, rampa/korkuluk",
      "Ön kiriş 12 m + yan kule 8 m truss",
      "Line array PA, monitörler, backline altyapı",
      "LED ekran (örn. 5×3 m) + scaler",
      "Işık: hareketli başlıklar, wash, blinder, haze",
      "Kurulum, soundcheck, canlı yönetim, söküm",
    ],
    note: "Konser, festival, açık alan yüksek katılımlı etkinlikler için.",
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
          fetchPriority="high"
          className="object-cover"
          sizes={HERO.sizes}
          quality={85}
         
          blurDataURL={BLUR_DATA_URL}
          loading="eager"
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
            Türkiye Geneli Profesyonel Kurulum
          </span>
        </div>

        <h1
          id="hero-title"
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl"
        >
          Profesyonel{" "}
          <span className="gradient-text gradient-text--safe-xl">
            Sahne Kiralama
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
          Konser • Konferans • Lansman • Miting • Festival
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-6">
          Truss sistemleri, modüler podyum, LED ekranlar ile
          <span className="font-semibold text-white">
            {" "}
            anahtar teslim sahne çözümleri
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp üzerinden hemen teklif alın"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">
              💬
            </span>
            <span className="text-base">Hemen Teklif Al</span>
          </Link>

          <Link
            href="#paketler"
            aria-label="Paketlerimiz hakkında daha fazla bilgi edinin"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white/50 text-white bg-slate-900/85 backdrop-blur-lg hover:bg-slate-900/95 hover:border-white/70 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">
              🎯
            </span>
            <span className="text-base">Paketleri Gör</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">
              ⭐
            </span>
            <div className="text-xl font-black text-white">4.9/5</div>
            <div className="text-white/80 text-sm">183+ Değerlendirme</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">
              🏆
            </span>
            <div className="text-xl font-black text-white">300+</div>
            <div className="text-white/80 text-sm">Proje</div>
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
            Profesyonel{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sahne kiralama hizmetlerimiz: modüler sistemler, truss rigging, LED
            ekran entegrasyonu ve profesyonel kurulum
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
            role="button"
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

/* ================== Paketler ================== */
function Packages() {
  const formatTRY = (n) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(n);

  // Basit fiyatlandırma (gerçek projede API'den gelebilir)
  const packagePrices = {
    "mini-sahne": 15000,
    "standart-sahne": 25000,
    "konser-sahnesi": 50000,
  };

  return (
    <section
      id="paketler"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="paketler-baslik"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="paketler-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900"
          >
            Hazır{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Paketler
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            İhtiyacınıza uygun, anahtar teslim sahne çözümleri
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="group">
              <div
                className={`bg-white rounded-3xl border-2 shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 h-full flex flex-col ${
                  pkg.badge === "Popüler"
                    ? "border-blue-500 ring-4 ring-blue-500/20 transform scale-105 group-hover:scale-110"
                    : "border-gray-100 group-hover:scale-105"
                }`}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-8 text-white relative overflow-hidden">
                  {pkg.badge && (
                    <div
                      className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold ${
                        pkg.badge === "Popüler"
                          ? "bg-orange-500"
                          : pkg.badge === "Profesyonel"
                          ? "bg-blue-600"
                          : "bg-green-500"
                      }`}
                    >
                      {pkg.badge}
                    </div>
                  )}
                  <div className="text-4xl mb-4" aria-hidden="true">
                    {pkg.id === "mini-sahne" && "💼"}
                    {pkg.id === "standart-sahne" && "🏆"}
                    {pkg.id === "konser-sahnesi" && "🚀"}
                  </div>
                  <h3 className="text-2xl font-black mb-2">{pkg.name}</h3>
                  <div className="flex items-center gap-4 text-blue-100 text-sm">
                    <span>{pkg.specs.dimensions}</span>
                    <span>•</span>
                    <span>{pkg.specs.area}</span>
                    <span>•</span>
                    <span>{pkg.specs.height}</span>
                  </div>
                  <p className="text-blue-100 text-lg mt-2">{pkg.note}</p>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow">
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                      <span
                        className="w-2 h-2 bg-blue-600 rounded-full"
                        aria-hidden="true"
                      />
                      Paket İçeriği
                    </h4>
                    <ul className="space-y-3">
                      {pkg.includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <span
                            className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span className="text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fiyat */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                    <div className="text-center mb-4">
                      <div className="text-sm text-gray-800 uppercase tracking-wider font-semibold">
                        Günlük Kira (İstanbul)
                      </div>
                      <div className="text-3xl font-black text-gray-900 mt-2">
                        {formatTRY(packagePrices[pkg.id])}
                        <span className="text-sm text-gray-800 font-normal ml-2">
                          + KDV
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-8 pt-0">
                  <Link
                    href={`${WHATSAPP}&package=${encodeURIComponent(pkg.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center font-bold px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
                    role="button"
                  >
                    <span aria-hidden="true" className="text-xl mr-2">
                      💬
                    </span>
                    <span>Bu Paket için Teklif Al</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Galeri ================== */
const GALLERY_IMAGES = [
  {
    src: "/img/sahne/1.webp",
    alt: "Konser sahnesi ve profesyonel truss kurulumu - Büyük LED ekran ve ışık sistemi",
  },
  {
    src: "/img/sahne/2.webp",
    alt: "Konferans sahnesi ve LED ekran entegrasyonu - Modern tasarım ve profesyonel aydınlatma",
  },
  {
    src: "/img/sahne/3.webp",
    alt: "Açık hava festival sahnesi ve ışık sistemi - Geniş alan kurulumu",
  },
  {
    src: "/img/sahne/4.webp",
    alt: "Kurumsal lansman sahnesi ve özel tasarım - Marka entegrasyonlu sahne",
  },
  {
    src: "/img/sahne/5.webp",
    alt: "Düğün sahnesi ve dekoratif kurulum - Şık ve romantik tasarım",
  },
  {
    src: "/img/sahne/6.webp",
    alt: "Ödül töreni sahnesi ve protokol düzeni - Profesyonel ışıklandırma",
  },
  {
    src: "/img/sahne/7.webp",
    alt: "Türkiye genelinde sahne kiralama hizmeti - Profesyonel ekipmanlar",
  },
  {
    src: "/img/sahne/8.webp",
    alt: "Kaliteli sahne ekipmanları ve teknik altyapı - Sahneva",
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
            Proje{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Galerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gerçekleştirdiğimiz başarılı sahne kurulumlarından örnekler
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
            role="button"
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
      category: "podyum",
      title: "Podyum Sistemleri",
      description:
        "1×1 ve 2×1 modüler paneller ile esnek ve güvenli sahne çözümleri",
      features: [
        "1×1 & 2×1 paneller",
        "20-100 cm yükseklik",
        "Kaymaz kaplama",
        "Merdiven & rampa",
      ],
    },
    {
      category: "truss",
      title: "Truss & Rigging",
      description:
        "Alüminyum truss sistemleri, profesyonel rigging ve güvenlik ekipmanları",
      features: [
        "Alüminyum truss",
        "Profesyonel rigging",
        "Statik hesaplama",
        "Güvenlik sistemleri",
      ],
    },
    {
      category: "led",
      title: "LED Ekran Sistemleri",
      description:
        "P2-P6 LED ekranlar, video wall sistemleri ve canlı yayın çözümleri",
      features: [
        "P2-P6 LED ekranlar",
        "Video wall sistemleri",
        "4K çözünürlük",
        "Canlı yayın",
      ],
    },
    {
      category: "ses",
      title: "Ses Sistemleri",
      description:
        "Profesyonel ses sistemleri, mikserler ve kablosuz ekipmanlar",
      features: [
        "Line array sistemler",
        "Dijital mikserler",
        "Kablosuz mikrofonlar",
        "Monitör sistemleri",
      ],
    },
    {
      category: "isik",
      title: "Işık Sistemleri",
      description:
        "Hareketli ışık başlıkları, LED wash ve profesyonel ışık tasarımı",
      features: [
        "Hareketli başlıklar",
        "LED wash ışıklar",
        "DMX kontrol",
        "Işık tasarımı",
      ],
    },
    {
      category: "guvenlik",
      title: "Güvenlik Sistemleri",
      description:
        "Korkuluk, rampa, acil çıkış ve profesyonel güvenlik önlemleri",
      features: [
        "Kenar korkulukları",
        "Engelli rampaları",
        "Acil çıkış planlaması",
        "Güvenlik ekipmanları",
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
            En son teknoloji sahne sistemleri ve profesyonel teknik altyapı ile
            hizmetinizdeyiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technicalItems.map((item) => (
            <div key={item.category} className="group">
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-500 h-full">
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {item.category === "podyum" && "🎭"}
                    {item.category === "truss" && "🏗️"}
                    {item.category === "led" && "🖥️"}
                    {item.category === "ses" && "🎵"}
                    {item.category === "isik" && "💡"}
                    {item.category === "guvenlik" && "🛡️"}
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
    { value: "300+", label: "Sahne Kurulumu", icon: "🏆" },
    { value: "50+", label: "Konser Projesi", icon: "🎵" },
    { value: "81", label: "İlde Hizmet", icon: "🗺️" },
    { value: "8+", label: "Yıl Deneyim", icon: "⭐" },
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
              role="group"
              aria-labelledby={`sahne-stat-${index}-value`}
              aria-describedby={`sahne-stat-${index}-label`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-500 group-hover:scale-105">
                <div
                  className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {stat.icon}
                </div>
                <h3
                  id={`sahne-stat-${index}-value`}
                  className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg"
                >
                  {stat.value}
                </h3>
                <p
                  id={`sahne-stat-${index}-label`}
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
            Kullanım{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Alanları
            </span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Sahne çözümlerimizin tercih edildiği başlıca etkinlik türleri ve özel
            çözümlerimiz
          </p>
          <div
            className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8 rounded-full"
            aria-hidden="true"
          />
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          role="list"
        >
          {USE_CASES.map((uc) => (
            <div
              key={uc.text}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 group hover:scale-105"
              role="listitem"
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
            role="button"
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
            Bilgi &{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Profesyonel Rehber
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sahne kiralama ve etkinlik planlama hakkında uzman görüşleri ve
            teknik bilgiler
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
                  Profesyonel Sahne Kiralama: Etkinlik Başarınız İçin Anahtar
                  Teslim Çözümler
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  Modüler sahne sistemleri, truss rigging, LED ekran entegrasyonu
                  ve profesyonel ekip ile etkinliklerinizde mükemmel performans
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
                        🎭
                      </span>
                      Modüler Sahne Sistemleri
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong>, Türkiye
                      genelinde{" "}
                      <Link
                        href="/sahne-kiralama"
                        className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                      >
                        profesyonel sahne kiralama
                      </Link>{" "}
                      hizmetleriyle kurumsal standartta çözümler sunmaktadır.
                    </p>
                    <p>
                      Etkinliğiniz ister konser sahnesi, ister kurumsal konferans
                      olsun; detaylı teknik keşif, sahne optimizasyonu, profesyonel
                      kurulum ve canlı operasyon dahil{" "}
                      <strong className="text-gray-900">
                        anahtar teslim çözümler
                      </strong>{" "}
                      sunuyoruz.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span
                        className="bg-purple-100 text-purple-600 rounded-2xl p-3"
                        aria-hidden="true"
                      >
                        🏗️
                      </span>
                      Truss & Güvenlik Sistemleri
                    </h4>
                    <p>
                      Tüm truss sistemlerimiz alüminyum malzemeden üretilmiş olup,
                      statik hesaplamalar ve güvenlik testleri ile en yüksek
                      standartlara uygun olarak kurulmaktadır.
                    </p>
                    <p>
                      1×1 m ve 2×1 m modüler panel seçeneklerimizle, mekan
                      özelliklerine ve etkinlik türüne göre optimize edilmiş
                      çözümler sunarak hem güvenlik hem de fonksiyonellik
                      sorunlarını ortadan kaldırıyoruz.
                    </p>
                  </div>
                </div>

                {/* Önemli Bilgi Kutusu */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
                  <h5 className="font-black text-blue-700 text-xl mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      💡
                    </span>
                    Teknik Seçim Stratejisi
                  </h5>
                  <p className="text-gray-700 text-lg mb-0 leading-relaxed">
                    Sahne seçiminde etkinlik türü ve katılımcı sayısı en kritik
                    faktördür. Küçük etkinlikler (50-100 kişi) için 12-24 m², orta
                    ölçekli etkinlikler (100-300 kişi) için 24-48 m², büyük
                    etkinlikler (300+ kişi) için 48+ m² sahne alanı öneriyoruz.
                    Açık hava etkinliklerinde ise rüzgar yükü ve zemin stabilitesi
                    öncelikli değerlendirilmelidir.
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
                        title: "Doğru Boyut Seçimi",
                        desc: "Etkinlik türüne ve katılımcı sayısına göre optimize edilmiş sahne boyutları",
                      },
                      {
                        icon: "📊",
                        title: "Güvenlik Optimizasyonu",
                        desc: "Statik hesaplamalar, rigging güvenliği ve acil durum planlaması",
                      },
                      {
                        icon: "🔒",
                        title: "Teknik Entegrasyon",
                        desc: "Ses, ışık ve LED ekran sistemlerinin uyumlu entegrasyonu",
                      },
                      {
                        icon: "🎭",
                        title: "Profesyonel Ekip",
                        desc: "Deneyimli teknik ekip ve canlı operasyon yönetimi",
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
                      8+ yıllık deneyim, 300+ başarılı proje ve 81 ilde hizmet
                    </strong>{" "}
                    ile sahne kiralama konusunda güvenilir çözüm ortağınız. En
                    son teknoloji ekipman, uzman ekip ve 7/24 teknik destek
                    garantisi.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Yan Makaleler */}
          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Truss & Rigging Sistemleri
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Profesyonel sahne güvenliği için kritik unsurlar ve standartlar
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  Truss sistemleri sahne güvenliğinin temel taşlarıdır. Tüm
                  sistemlerimiz TS EN 13814 sahne güvenlik standartlarına uygun
                  olarak tasarlanmış ve kurulmuştur.
                </p>
                <p>
                  Alüminyum malzeme, yüksek güvenlik katsayıları, profesyonel
                  rigging ekipmanları ve deneyimli ekip ile her türlü etkinlik
                  için güvenli çözümler sunuyoruz.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span
                      className="bg-purple-100 text-purple-600 rounded-xl p-2"
                      aria-hidden="true"
                    >
                      🏗️
                    </span>
                    Truss Standartları
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      6061-T6 alüminyum malzeme
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      5:1 güvenlik katsayısı
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      Profesyonel rigging ekipmanları
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"
                        aria-hidden="true"
                      />
                      Statik ve dinamik yük testleri
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
                Her etkinlik türüne özel sahne stratejileri ve teknik çözümler
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
                        🎵
                      </span>
                      Konser & Festival
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Yüksek stabilite, geniş performans alanı, line array ses
                      sistemleri, profesyonel ışık/ses entegrasyonu
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span
                        className="bg-purple-100 text-purple-600 rounded-xl p-2"
                        aria-hidden="true"
                      >
                        💼
                      </span>
                      Kurumsal Etkinlikler
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Şık görünüm, markalama imkanı, konuşmacı dostu tasarım,
                      profesyonel sunum alanı
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span
                        className="bg-green-100 text-green-600 rounded-xl p-2"
                        aria-hidden="true"
                      >
                        💒
                      </span>
                      Düğün & Özel Davet
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Dekoratif kaplamalar, nikah sahnesi, dans platformu,
                      estetik detaylar
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
    q: "Sahne kiralama fiyatları ne kadar?",
    a: "Sahne kiralama fiyatları sahne büyüklüğüne ve ekipmanlara göre değişmektedir. Mini sahne (16 m²) 15.000 TL, standart sahne (24 m²) 25.000 TL, konser sahnesi (48 m²) 50.000 TL'den başlayan fiyatlarla. Profesyonel kurulum, ses-ışık sistemleri ve teknik ekip hizmetleri paket fiyatlarına dahildir.",
  },
  {
    q: "Sahne kurulumu ne kadar sürer?",
    a: "Standart bir sahne kurulumu 4-8 saat arasında tamamlanır. 16 m²'ye kadar küçük kurulumlar 4-6 saat, 16-48 m² orta ölçekli kurulumlar 6-8 saat, 48 m²+ büyük kurulumlar ise 8-12 saat sürmektedir. Kompleks truss ve rigging gerektiren projelerde bu süre 24 saate kadar çıkabilir.",
  },
  {
    q: "Açık hava etkinlikleri için uygun mu?",
    a: "Evet, tüm sahne sistemlerimiz açık hava kullanımına uygundur. Rüzgar yükü hesapları, zemin stabilite analizleri, su geçirmez ekipmanlar ve acil durum planlamaları ile açık hava etkinlikleri için güvenli çözümler sunuyoruz. Ancak şiddetli fırtına ve kasırga gibi ekstrem hava koşullarında güvenlik önlemi olarak kullanıma ara verilmesini öneriyoruz.",
  },
  {
    q: "Ses ve ışık sistemleri dahil mi?",
    a: "Evet, tüm paketlerimizde temel ses ve ışık sistemleri dahildir. Mini sahne paketinde 2 LED bar + 2 spot, standart sahne paketinde 4 hareketli başlık + 6 wash + 2+1 hoparlör sistemi, konser sahnesi paketinde ise line array PA sistemi, monitörler ve profesyonel ışık sistemi yer almaktadır. Özel ihtiyaçlarınız için ek ekipmanlar da temin edebiliriz.",
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
            Sahne kiralama hakkında merak edilen sorular ve cevapları
          </p>
        </div>

        <div
          className="space-y-6"
          role="list"
          aria-label="Sık sorulan sorular listesi"
        >
          {FAQ_ITEMS.map((faq, index) => (
            <details
              key={index}
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 open:bg-blue-50 open:border-blue-200 border-2 border-transparent open:border"
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between text-xl font-bold text-gray-900"
                tabIndex={0}
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
              <div
                className="mt-6 text-gray-700 leading-relaxed text-lg pl-4 border-l-4 border-blue-500"
                role="region"
              >
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
      href: "/ses-isik-sistemleri",
      title: "Ses & Işık Sistemleri",
      icon: "🎵",
      desc: "Profesyonel ses ve ışık sistemleri kiralama",
    },
    {
      href: "/podyum-kiralama",
      title: "Podyum Kiralama",
      icon: "🎭",
      desc: "Modüler podyum sistemleri kiralama",
    },
    {
      href: "/led-ekran-kiralama",
      title: "LED Ekran Kiralama",
      icon: "🖥️",
      desc: "Profesyonel LED ekran ve video wall sistemleri",
    },
    {
      href: "/truss-kiralama",
      title: "Truss Kiralama",
      icon: "🏗️",
      desc: "Alüminyum truss sistemleri kiralama",
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
            Sahne kurulumunuzu tamamlayacak diğer profesyonel etkinlik
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
            Bu bölümde sahne kurulumunuzu tamamlayacak diğer hizmetlerimiz
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
              Profesyonel Sahne Çözümlerine Hazır Mısınız?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Etkinliğiniz için en uygun sahne sistemlerini sunalım. Ücretsiz
              keşif, profesyonel danışmanlık ve rekabetçi fiyat garantisi ile
              hizmetinizdeyiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl focus-ring shadow-lg"
                role="button"
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
                role="button"
              >
                <span aria-hidden="true" className="text-xl mr-3">
                  💬
                </span>
                <span className="text-lg">WhatsApp&apos;tan Yaz</span>
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

/* ================== JSON-LD (FINAL / NO RATING) ================== */
/* Burada next/script yerine düz <script> kullanıyoruz. */
function JsonLd() {
  const pageUrl = `${ORIGIN}/sahne-kiralama`;
  const pageDescription = metadata?.description || "";
  const webPageId = `${pageUrl}#webpage`;

  const provider = { "@id": ORGANIZATION_ID };

  const { service: serviceSchema, products } = buildServiceProductSchema({
    slug: "/sahne-kiralama",
    locale: "tr-TR",
  });

  const baseService = {
    "@type": "Service",
    name: "Sahne Kiralama",
    description: pageDescription,
    provider,
    areaServed: { "@type": "Country", name: "Türkiye" },
    inLanguage: "tr-TR",
    // ❌ aggregateRating YOK (yorum yok dedin)
  };

  // ✅ Çakışmasız merge + WebPage bağlantısı
  const serviceNode = {
    ...(serviceSchema || {}),
    ...baseService,
    "@type": "Service",
    "@id": serviceSchema?.["@id"] || `${pageUrl}#service`,
    provider,
    url: pageUrl,
    mainEntityOfPage: { "@id": webPageId },
  };

  const serviceId = serviceNode["@id"];
  const productNodes = products ?? [];
  const faqSchema = buildFaqSchema(FAQ_ITEMS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      serviceNode,
      {
        "@type": "WebPage",
        "@id": webPageId,
        name: "Sahne Kiralama | Profesyonel Sahne Çözümleri | Sahneva",
        description: pageDescription,
        url: pageUrl,
        inLanguage: "tr-TR",
        mainEntity: { "@id": serviceId },
      },
      ...productNodes,
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  return (
    <script
      id="ld-json-sahne"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}


/* ================== Sayfa Bileşeni ================== */
export default function Page() {
  const baseUrl = SITE_URL;
  const canonical = `${baseUrl}/sahne-kiralama`;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "Hizmetler", url: `${baseUrl}/hizmetler` },
    { name: "Sahne Kiralama", url: canonical },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLd />
      <Hero />
      <Services />
      <Packages />
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
