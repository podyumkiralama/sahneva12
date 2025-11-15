// app/podyum-kiralama/page.jsx
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";

import { buildFaqSchema } from "@/lib/structuredData/faq";
import { buildServiceProductSchema } from "@/lib/structuredData/serviceProducts";

/* ================== Sabitler ================== */
export const revalidate = 1800;
const ORIGIN = "https://www.sahneva.com";
const PHONE = "+905453048671";
const WA_TEXT = "Merhaba%2C+podyum+kiralama+icin+teklif+istiyorum.+Etkinlik+turu%3A+%5Bdüğün%2Fkonser%2Flansman%5D%2C+Tarih%3A+%5Bgg.aa.yyyy%5D%2C+Alan%3A+%5Bxx+m²%5D.";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

// Base64 blur placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ================== Dinamik galeri (CaseGallery) ================== */
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => (
    <div className="flex justify-center items-center h-64" role="status" aria-label="Galeri yükleniyor">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-hidden="true" />
      <span className="sr-only">Galeri yükleniyor...</span>
    </div>
  )
});

/* ================== Dinamik fiyat hesaplayıcı ================== */
const PriceEstimatorPodyum = dynamic(() => import("@/components/PriceEstimatorPodyum"), {
  loading: () => (
    <div className="flex justify-center items-center h-64" role="status" aria-label="Fiyat hesaplayıcı yükleniyor">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-hidden="true" />
      <span className="sr-only">Fiyat hesaplayıcı yükleniyor...</span>
    </div>
  )
});

/* ================== META ================== */
export const metadata = {
  title: "Podyum Kiralama | Profesyonel Sahne Çözümleri | Sahneva",
  description: "Modüler podyum kiralama: 1×1 ve 2×1 paneller, kaymaz kaplama, halı ve skört opsiyonları. İstanbul geneli profesyonel kurulum.",
  alternates: { canonical: `${ORIGIN}/podyum-kiralama` },
  openGraph: {
    title: "Podyum Kiralama | Profesyonel Sahne Çözümleri | Sahneva",
    description: "Modüler podyum sistemleri, kaymaz kaplama ve profesyonel kurulum. Konser, düğün, lansman etkinlikleri için ideal çözümler.",
    url: `${ORIGIN}/podyum-kiralama`,
    type: "website",
    siteName: "Sahneva",
    locale: "tr_TR",
    images: [{ 
      url: `${ORIGIN}/img/podyum/hero.webp`, 
      width: 1200, 
      height: 630, 
      alt: "Sahneva Podyum Kiralama - Profesyonel Sahne Çözümleri" 
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podyum Kiralama | Profesyonel Sahne Çözümleri | Sahneva",
    description: "Modüler podyum kiralama, kaymaz kaplama, halı ve skört opsiyonları. Profesyonel kurulum ve teknik destek.",
    images: [`${ORIGIN}/img/podyum/hero.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { 
      index: true, 
      follow: true, 
      "max-image-preview": "large", 
      "max-snippet": -1, 
      "max-video-preview": -1 
    },
  },
};

/* ================== Yardımcılar & Sabitler ================== */
const slugify = (s) =>
  s.toLowerCase()
    .replace(/&/g, " ve ")
    .replace(/[^a-z0-9çğıöşü\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const HERO = {
  src: "/img/podyum/hero.webp",
  alt: "Profesyonel podyum kurulumu - Modüler sahne sistemi ve etkinlik alanı düzenlemesi",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🎭",
    title: "Modüler Podyum Sistemleri",
    description: "1×1m ve 2×1m modüler paneller ile esnek ve güvenli sahne çözümleri",
    features: ["1×1m ve 2×1m paneller", "Kaymaz kaplama", "40-100cm yükseklik", "Hızlı kurulum"],
  },
  {
    icon: "💍",
    title: "Düğün & Özel Etkinlik Podyumları",
    description: "Özel günler için şık ve güvenli podyum çözümleri",
    features: ["Şık görünüm", "Güvenli yapı", "Halı kaplama", "Özel dekorasyon"],
  },
  {
    icon: "🎤",
    title: "Konser & Performans Podyumları",
    description: "Profesyonel sahne performansları için dayanıklı podyum sistemleri",
    features: ["Yüksek dayanıklılık", "Ses izolasyonu", "Kablo kanalları", "Güvenlik ekipmanları"],
  },
  {
    icon: "🏢",
    title: "Kurumsal Lansman Podyumları",
    description: "Şirket etkinlikleri için profesyonel ve fonksiyonel podyum çözümleri",
    features: ["Markalı kaplama", "Rampa ve merdiven", "LED entegrasyonu", "Profesyonel kurulum"],
  },
  {
    icon: "🎪",
    title: "Fuar & Sergi Podyumları",
    description: "Fuar ve sergi alanları için optimize edilmiş podyum sistemleri",
    features: ["Modüler tasarım", "Hızlı kurulum", "Marka entegrasyonu", "Taşınabilirlik"],
  },
  {
    icon: "🔧",
    title: "Teknik Destek & Kurulum",
    description: "Profesyonel kurulum, söküm ve 7/24 teknik destek hizmetleri",
    features: ["Profesyonel kurulum", "Söküm hizmeti", "7/24 destek", "Acil müdahale"],
  },
];

const USE_CASES = [
  { 
    icon: "💍", 
    text: "Düğün, nişan ve özel davetler",
    desc: "Özel günler için şık podyum çözümleri"
  },
  { 
    icon: "🎤", 
    text: "Konser, festival ve sahne performansları",
    desc: "Profesyonel performanslar için sahneler"
  },
  { 
    icon: "🏢", 
    text: "Kurumsal lansman ve toplantılar",
    desc: "Şirket etkinlikleri için profesyonel çözümler"
  },
  { 
    icon: "🎓", 
    text: "Mezuniyet törenleri ve okul etkinlikleri",
    desc: "Eğitim kurumları için podyumlar"
  },
  { 
    icon: "🏛️", 
    text: "Belediye organizasyonları ve törenler",
    desc: "Resmi törenler ve etkinlikler"
  },
  { 
    icon: "🛍️", 
    text: "AVM etkinlikleri ve fuar stantları",
    desc: "Ticari etkinlikler için çözümler"
  },
];

// Güncel birim fiyatlar
const UNIT_PRICES = {
  platform_m2_week: 250,
  carpet_m2_week: 120,
  skirt_ml_week: 90,
  istanbul_setup: 8000,
};

const CONTENT = {
  gallery: [
    "/img/podyum/1.webp", 
    "/img/podyum/2.webp", 
    "/img/podyum/3.webp",
    "/img/galeri/podyum-kiralama-4.webp",
    "/img/galeri/podyum-kiralama-5.webp",
    "/img/galeri/podyum-kiralama-6.webp",
    "/img/galeri/podyum-kiralama-7.webp",
    "/img/galeri/podyum-kiralama-8.webp",
  ],
  packages: [
    {
      key: "mini",
      name: "Mini Podyum — 12 m²",
      layout: { width: 3, depth: 4, area: 12, perimeter: 14 },
      includes: [
        "6 × (1×2 m) panel – toplam 12 m²",
        "Yükseklik: 40 cm",
        "Kaymaz kaplama",
        "Kurulum + söküm",
      ],
      note: "İç mekân konuşma/mini performanslar için ideal.",
    },
    {
      key: "orta",
      name: "Orta Podyum — 24 m²",
      layout: { width: 4, depth: 6, area: 24, perimeter: 20 },
      includes: [
        "12 × (1×2 m) panel – toplam 24 m²",
        "Yükseklik: 60 cm",
        "Kaymaz kaplama, merdiven",
        "Kurulum + söküm + yerinde dengeleme",
      ],
      note: "Kurumsal sahneler ve canlı performanslar için.",
    },
    {
      key: "pro",
      name: "Pro Podyum — 48 m²",
      layout: { width: 6, depth: 8, area: 48, perimeter: 28 },
      includes: [
        "24 × (1×2 m) panel – toplam 48 m²",
        "Yükseklik: 80–100 cm",
        "Kaymaz kaplama, merdiven, rampa, korkuluk",
        "Kurulum + söküm + çevre etek/brandalama",
      ],
      note: "Büyük konser/miting sahneleri için.",
    },
  ],
};

/* ================== HERO ================== */
function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-slate-900 pt-20 min-h-[80vh]" aria-labelledby="hero-title">
      <div className="absolute inset-0">
        <Image 
          src={HERO.src} 
          alt={HERO.alt} 
          fill 
          priority 
          className="object-cover"
          sizes={HERO.sizes}
          quality={85}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-blue-950/90" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-purple-900/60" aria-hidden="true" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white py-12">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30 mb-6">
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
          </span>
          <span className="text-sm font-bold text-white">İstanbul Geneli Profesyonel Hizmet</span>
        </div>

        <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl">
          Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Podyum Kiralama</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light mb-4">
          Düğün • Konser • Lansman • Festival • Kurumsal Etkinlikler
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-normal mb-6">
          Modüler podyum sistemleri, kaymaz kaplama ve 
          <span className="font-semibold text-white"> profesyonel kurulum</span> ile anahtar teslim çözümler
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp üzerinden hemen teklif alın"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">💬</span> 
            <span className="text-base">Hemen Teklif Al</span>
          </Link>

          <Link
            href="#hizmetler"
            title="Hizmetlerimiz hakkında daha fazla bilgi edinin"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white/95 bg-white/10 backdrop-blur-lg hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">🎯</span> 
            <span className="text-base">Hizmetlerimiz</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">⭐</span>
            <div className="text-xl font-black text-white">4.8/5</div>
            <div className="text-white/80 text-sm">200+ Değerlendirme</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🏆</span>
            <div className="text-xl font-black text-white">600+</div>
            <div className="text-white/80 text-sm">Etkinlik</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🚀</span>
            <div className="text-xl font-black text-white">2-6 Saat</div>
            <div className="text-white/80 text-sm">Kurulum Süresi</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== Hizmetler ================== */
function Services() {
  return (
    <section id="hizmetler" className="py-20 bg-gradient-to-b from-white to-blue-50/50" aria-labelledby="hizmetler-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="hizmetler-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Hizmetlerimiz</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Podyum kiralama hizmetlerimiz: keşif, projelendirme, kurulum, teknik destek ve söküm
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
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 id={id} className="text-2xl font-black mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-700">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
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
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Detaylı Teklif için İletişime Geçin</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Fiyat Hesaplayıcı ================== */
function PriceCalculator() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="fiyat-hesaplayici-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="fiyat-hesaplayici-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Hızlı <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Fiyat Hesaplama</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Podyum ölçülerinizi girerek anında fiyat teklifi alın
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl p-8">
            <PriceEstimatorPodyum unitPrices={UNIT_PRICES} />
            <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
              <p className="text-blue-800 text-lg">
                <strong>İstanbul içi nakliye, kurulum ve söküm: 8.000 TL</strong>
                <br />*200 m²'ye kadar geçerlidir. Şehir dışı projeler için özel teklif alın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== Paketler ================== */
function Packages() {
  const formatTRY = (n) => {
    try {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
      }).format(n);
    } catch {
      return `${n} TL`;
    }
  };

  const priceBase = (area) => area * UNIT_PRICES.platform_m2_week;
  const priceCarpet = (area) => area * UNIT_PRICES.carpet_m2_week;
  const priceSkirt = (perimeter) => perimeter * UNIT_PRICES.skirt_ml_week;

  const enrichedPkgs = CONTENT.packages.map((p) => {
    const base = priceBase(p.layout.area);
    const carpet = priceCarpet(p.layout.area);
    const skirt = priceSkirt(p.layout.perimeter);
    return {
      ...p,
      price: {
        base,
        withCarpetAndSkirt: base + carpet + skirt,
        carpet,
        skirt,
        totalWithSetup: base + carpet + skirt + UNIT_PRICES.istanbul_setup,
      },
    };
  });

  return (
    <section className="py-20 bg-white" aria-labelledby="paketler-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="paketler-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Podyum <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Paketlerimiz</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            İhtiyaçlarınıza uygun hazır paketler veya özel çözümler
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {enrichedPkgs.map((pkg, index) => (
            <div key={pkg.key} className="group">
              <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-500 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={CONTENT.gallery[index] || CONTENT.gallery[0]}
                    alt={`${pkg.name} - ${pkg.note}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-black text-white">{pkg.name}</h3>
                    <p className="text-white/90 text-sm">
                      {pkg.layout.width}×{pkg.layout.depth} m • {pkg.layout.area} m²
                    </p>
                  </div>
                </div>

                <div className="p-6 flex-grow">
                  <ul className="space-y-3 mb-6">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Platform:</span>
                        <span className="font-semibold">{formatTRY(pkg.price.base)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Halı + Skört:</span>
                        <span className="font-semibold">{formatTRY(pkg.price.withCarpetAndSkirt)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-300 pt-2">
                        <span className="font-bold">Toplam (İstanbul):</span>
                        <span className="font-bold text-blue-700">{formatTRY(pkg.price.totalWithSetup)}</span>
                      </div>
                    </div>
                  </div>

                  {pkg.note && (
                    <p className="text-sm text-gray-600 text-center mb-4">
                      {pkg.note}
                    </p>
                  )}
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center font-bold px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
                    role="button"
                  >
                    <span aria-hidden="true" className="text-lg mr-2">💬</span>
                    <span>Hemen Teklif Al</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg">
            *Fiyatlar haftalık kiralama içindir. Günlük kiralama için iletişime geçin.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================== Galeri ================== */
function Gallery() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/50" aria-labelledby="galeri-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="galeri-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Proje <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Galerimiz</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gerçekleştirdiğimiz başarılı podyum kurulumlarından örnekler
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery images={CONTENT.gallery.map(src => ({ src, alt: "Profesyonel podyum kurulum projesi - Sahneva" }))} visibleCount={8} priorityCount={3} />
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
            <span aria-hidden="true" className="text-xl mr-3">📸</span>
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
      description: "Alüminyum karkas, çelik bağlantı elemanları ve kaymaz kaplama",
      features: ["Alüminyum karkas sistem", "Çelik bağlantı elemanları", "Kaymaz kaplama", "UV dayanımlı yüzey"]
    },
    {
      category: "guvenlik",
      title: "Güvenlik Sistemleri",
      description: "TS EN standartlarına uygun güvenlik ve stabilite sistemleri",
      features: ["Kaymaz kaplama", "Korkuluk sistemleri", "Merdiven ve rampa", "Anti-tip önlemler"]
    },
    {
      category: "olcu",
      title: "Ölçü & Kombinasyonlar",
      description: "Modüler sistemler ile esnek ölçü ve birleşim seçenekleri",
      features: ["1×1m ve 2×1m paneller", "40-100cm yükseklik", "İsteğe özel ölçüler", "Karma panel sistemleri"]
    },
    {
      category: "tamamlayici",
      title: "Tamamlayıcı Hizmetler",
      description: "Podyum kurulumunu tamamlayan profesyonel hizmetler",
      features: ["Halı kaplama sistemleri", "Skört (etek) kaplama", "Markalama ve dekorasyon", "Aydınlatma entegrasyonu"]
    },
    {
      category: "kurulum",
      title: "Kurulum Süreçleri",
      description: "Hızlı ve profesyonel kurulum, söküm ve lojistik hizmetleri",
      features: ["2-6 saat kurulum", "Profesyonel ekip", "Lojistik desteği", "Söküm hizmeti"]
    },
    {
      category: "destek",
      title: "Teknik Destek",
      description: "7/24 teknik destek ve acil müdahale hizmetleri",
      features: ["7/24 teknik destek", "Acil müdahale ekibi", "Yedek parça stoğu", "Bakım hizmetleri"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="altyapi-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="altyapi-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Teknik <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Altyapımız</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En son teknoloji ekipmanlar ve profesyonel teknik altyapı ile hizmetinizdeyiz
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
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
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
    { value: "600+", label: "Başarılı Etkinlik", icon: "🎪" },
    { value: "50+", label: "Kurumsal Müşteri", icon: "🏢" },
    { value: "2-6", label: "Saat Kurulum", icon: "⏱️" },
    { value: "8+", label: "Yıl Deneyim", icon: "⭐" },
  ];
  
  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white" aria-label="Başarı İstatistiklerimiz">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group" role="group" aria-label={`${stat.label}: ${stat.value}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-500 group-hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="text-blue-100 text-lg font-semibold">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Kullanım Alanları ================== */
function UseCases() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900/95" aria-labelledby="kullanim-alanlari-baslik">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="kullanim-alanlari-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Kullanım <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Alanları</span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Podyum çözümlerimizin tercih edildiği başlıca etkinlik türleri ve özel çözümlerimiz
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8 rounded-full" aria-hidden="true" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" role="list">
          {USE_CASES.map((uc) => (
            <div
              key={uc.text}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 group hover:scale-105"
              role="listitem"
            >
              <div className="flex flex-col items-start gap-4">
                <div className="text-3xl bg-white/20 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
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
            <span aria-hidden="true" className="text-xl mr-3">💬</span>
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50" aria-labelledby="bilgi-rehber-baslik">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 id="bilgi-rehber-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Podyum <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Rehberi</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Podyum kiralama hakkında uzman görüşleri ve teknik bilgiler
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ana Makale */}
          <article className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <header className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">📚 Kapsamlı Rehber</span>
                  <span className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">⭐ Uzman Görüşü</span>
                  <span className="bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">🎯 Pratik Çözümler</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Profesyonel Podyum Kiralama: Etkinlik Başarınız İçin Tam Kapsamlı Çözümler
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  Modüler sistemler, güvenlik standartları ve ölçülebilir kalite garantisi ile etkinliklerinizde mükemmel performans
                </p>
              </div>
            </header>

            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-600 prose-ul:mt-6 prose-ul:mb-6 prose-li:marker:text-blue-500">
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-600 rounded-2xl p-3" aria-hidden="true">🎭</span>
                      Podyum Sistemleri ve Teknolojileri
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong>, İstanbul genelinde{" "}
                      <Link href="/podyum-kiralama" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        profesyonel podyum kiralama
                      </Link>{" "}
                      hizmetleriyle kurumsal standartta çözümler sunmaktadır.
                    </p>
                    <p>
                      Etkinliğiniz ister düğün, ister konser olsun; detaylı keşif, 
                      teknik projelendirme, güvenli kurulum ve söküm dahil{" "}
                      <strong className="text-gray-900">uçtan uca hizmet</strong> modelimizle tek ekipten kapsamlı yönetim sağlıyoruz.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-purple-100 text-purple-600 rounded-2xl p-3" aria-hidden="true">🔧</span>
                      Özel Podyum Sistemleri
                    </h4>
                    <p>
                      1×1m panellerimiz düzensiz zeminlerde esnek çözümler sunarken, 
                      2×1m paneller ana sahnelerde hızlı kurulum imkanı sağlıyor.
                    </p>
                    <p>
                      40cm'den 100cm'ye kadar yükseklik seçenekleri, kaymaz kaplama 
                      ve güvenlik ekipmanları ile her türlü etkinlik için ideal çözümler sunuyoruz.
                    </p>
                  </div>
                </div>

                {/* Önemli Bilgi Kutusu */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
                  <h5 className="font-black text-blue-700 text-xl mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">💡</span> 
                    Profesyonel Kurulum Stratejisi
                  </h5>
                  <p className="text-gray-700 text-lg mb-0 leading-relaxed">
                    Kurulum stratejimiz mekânın topoğrafik yapısına ve etkinlik ihtiyaçlarına göre şekillenir. 
                    Düğün etkinliklerinde estetik ve konfor ön planda tutulurken, konser ve performanslarda 
                    dayanıklılık ve güvenlik önceliklendirilir.
                  </p>
                </div>

                {/* Başarı Faktörleri Grid */}
                <div className="mb-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                    <span className="bg-green-100 text-green-600 rounded-2xl p-3" aria-hidden="true">🚀</span>
                    Kritik Başarı Faktörleri
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { 
                        icon: "🎯", 
                        title: "Detaylı Keşif ve Analiz", 
                        desc: "Mekan analizi, zemin değerlendirmesi ve risk analizi" 
                      },
                      { 
                        icon: "📊", 
                        title: "Teknik Projelendirme", 
                        desc: "Yük dağılımı hesapları, stabilite analizi ve güvenlik planlaması" 
                      },
                      { 
                        icon: "🔒", 
                        title: "Güvenlik Sistemleri", 
                        desc: "TS EN standartları, korkuluk sistemleri ve acil durum planları" 
                      },
                      { 
                        icon: "🎨", 
                        title: "Estetik Çözümler", 
                        desc: "Dekorasyon, halı kaplama ve markalama entegrasyonu" 
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0" aria-hidden="true">
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
                    <span className="text-xl" aria-hidden="true">💎</span>
                    Neden Sahneva?
                  </h5>
                  <p className="text-yellow-800 mb-0">
                    <strong>8+ yıllık deneyim, 600+ başarılı etkinlik ve İstanbul geneli hizmet</strong> ile 
                    podyum kiralama konusunda güvenilir çözüm ortağınız. Profesyonel ekipman, 
                    uzman ekip ve 7/24 teknik destek garantisi.
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
                Profesyonel kurulum, güvenlik sistemleri ve tamamlayıcı hizmetler
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  Podyum kurulum sürecimiz detaylı keşif ve teknik projelendirme ile başlar. 
                  Mekanın zemin yapısı, yük dağılımı ve etkinlik ihtiyaçları analiz edilir.
                </p>
                <p>
                  Profesyonel kurulum ekibimiz 2-6 saat içinde podyumunuzu montajlar, 
                  güvenlik sistemlerini kurar ve tamamlayıcı hizmetleri entegre eder.
                </p>
                
                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">📋</span>
                    Teknik Özellikler ve Standartlar
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Alüminyum karkas ve çelik bağlantı elemanları
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Kaymaz kaplama ve UV dayanımlı yüzey
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      40-100cm yükseklik seçenekleri
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Korkuluk, merdiven ve rampa sistemleri
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
                Her etkinlik türüne özel podyum stratejileri ve teknik çözümler
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-600 rounded-xl p-2" aria-hidden="true">💍</span>
                      Düğün ve Özel Davetler
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Şık tasarım, halı kaplama, dekoratif aydınlatma, konforlu alanlar
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">🎤</span>
                      Konser ve Performanslar
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Yüksek dayanıklılık, ses izolasyonu, kablo kanalları, güvenlik ekipmanları
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-green-100 text-green-600 rounded-xl p-2" aria-hidden="true">🏢</span>
                      Kurumsal Lansmanlar
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Markalı kaplama, rampa ve merdiven, LED entegrasyonu, profesyonel görünüm
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
      q: "Podyum kiralama fiyatları nasıl hesaplanır?", 
      a: "Podyum kiralama fiyatları alan (m²), yükseklik, aksesuarlar (korkuluk, rampa, skört, halı) ve nakliye esas alınarak hesaplanır. Platform: 250 TL/m², Halı: 120 TL/m², Skört: 90 TL/mtül, İstanbul kurulum: 8.000 TL. Detaylı teklif için iletişime geçebilirsiniz." 
    },
    { 
      q: "Kurulum ne kadar sürer?", 
      a: "Standart 24-48 m² podyumlar çoğu mekânda 2-6 saat içinde kurulur. Geniş alanlar ve özel gereksinimler ek süre gerektirebilir. Kurulum süresi podyum büyüklüğüne ve mekan koşullarına göre değişiklik gösterir." 
    },
    { 
      q: "Hangi panelleri kullanıyorsunuz?", 
      a: "1×1m ve 2×1m modüler paneller kullanıyoruz. Düzensiz zeminlerde 1×1m paneller esneklik sağlarken, ana sahnelerde 2×1m paneller hızlı kurulum imkanı sunar. Her iki panel de kaymaz kaplama ve güvenlik standartlarına uygundur." 
    },
    { 
      q: "Halı ve skört zorunlu mu?", 
      a: "Halı ve skört zorunlu değildir; görsel bütünlük ve güvenlik için önerilir. Halı kaymaz özelliktedir ve konfor sağlar, skört ise profesyonel görünüm kazandırır. Fiyatlar opsiyonel olarak ayrı hesaplanır." 
    },
  ];

function FAQ() {
  
  return (
    <section className="py-20 bg-white" aria-labelledby="sss-baslik">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 id="sss-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Sık Sorulan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sorular</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Podyum kiralama hakkında merak edilen sorular ve cevapları
          </p>
        </div>

        <div className="space-y-6" role="list" aria-label="Sık sorulan sorular listesi">
          {FAQ_ITEMS.map((faq, index) => (
            <details 
              key={index} 
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 open:bg-blue-50 open:border-blue-200 border-2 border-transparent open:border"
            >
              <summary 
                className="cursor-pointer list-none flex items-center justify-between text-xl font-bold text-gray-900"
                role="button"
                aria-expanded="false"
                tabIndex={0}
              >
                <span className="pr-4">{faq.q}</span>
                <span 
                  aria-hidden="true" 
                  className="ml-4 transition-transform duration-500 group-open:rotate-180 text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
                >
                  ⌄
                </span>
              </summary>
              <div className="mt-6 text-gray-700 leading-relaxed text-lg pl-4 border-l-4 border-blue-500" role="region">
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
            title="Sık Sorulan Sorular sayfasındaki tüm soruları görüntüle"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">📚</span> 
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
      desc: "Profesyonel çadır sistemleri ve kurulum hizmetleri" 
    },
    { 
      href: "/kurumsal-organizasyon", 
      title: "Kurumsal Organizasyon", 
      icon: "🏢", 
      desc: "Profesyonel etkinlik yönetimi ve organizasyon çözümleri" 
    },
    { 
      href: "/led-ekran-kiralama", 
      title: "LED Ekran Kiralama", 
      icon: "🖥️", 
      desc: "Yüksek çözünürlüklü LED ekran ve video wall çözümleri" 
    },
    { 
      href: "/ses-isik-sistemleri", 
      title: "Ses & Işık Sistemleri", 
      icon: "🎵", 
      desc: "Profesyonel ses ve ışık sistemleri kiralama" 
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Podyum kurulumunuzu tamamlayacak diğer profesyonel etkinlik çözümlerimiz
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
            Bu bölümde podyum kurulumunuzu tamamlayacak diğer hizmetlerimiz bulunmaktadır. 
            Her bir hizmet kartına tıklayarak veya klavye ile seçerek ilgili sayfaya gidebilirsiniz.
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
          <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
          <div className="relative z-10">
            <h2 id="cta-baslik" className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              Profesyonel Podyum Çözümlerine Hazır Mısınız?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Etkinliğiniz için en uygun podyum sistemlerini sunalım. Ücretsiz keşif, profesyonel danışmanlık ve 
              rekabetçi fiyat garantisi ile hizmetinizdeyiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/iletisim" 
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl focus-ring shadow-lg"
                role="button"
              >
                <span aria-hidden="true" className="text-xl mr-3">📞</span> 
                <span className="text-lg">Hemen Teklif Al</span>
              </Link>
              <a 
                href={WHATSAPP} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white bg-transparent hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
                role="button"
              >
                <span aria-hidden="true" className="text-xl mr-3">💬</span> 
                <span className="text-lg">WhatsApp'tan Yaz</span>
              </a>
            </div>
            <div className="mt-8 text-blue-200 text-lg">
              📍 İstanbul geneli hizmet • ⏰ 2-6 saat kurulum • ⭐ 8+ yıl deneyim
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== JSON-LD ================== */
function JsonLd() {
  const pageUrl = `${ORIGIN}/podyum-kiralama`;
  const pageName = metadata.title;
  const pageDescription = metadata.description;

  const provider = {
    "@type": "Organization",
    "@id": `${ORIGIN}#org`,
    name: "Sahneva",
    url: ORIGIN,
    telephone: "+905453048671",
    logo: `${ORIGIN}/img/logo.png`,
  };

  const { service: serviceSchema, products } = buildServiceProductSchema({
    slug: "/podyum-kiralama",
    locale: "tr-TR",
  });

  const baseService = {
    "@type": "Service",
    name: "Podyum Kiralama",
    description: pageDescription,
    provider,
    areaServed: { "@type": "Country", name: "Türkiye" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "200",
      bestRating: "5",
    },
  };

  const serviceNode = serviceSchema
    ? { ...serviceSchema, ...baseService, provider, url: pageUrl }
    : { ...baseService, "@id": `${pageUrl}#service`, url: pageUrl };

  const serviceId = serviceNode["@id"] ?? `${pageUrl}#service`;
  serviceNode["@id"] = serviceId;

  const productGraphNodes = (products ?? []).map((node) => ({ ...node }));

  const faqSchema = buildFaqSchema(FAQ_ITEMS);
  const faqNode = faqSchema
    ? { "@id": `${pageUrl}#faq`, url: pageUrl, ...faqSchema }
    : null;

  const graph = [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Anasayfa",
          item: `${ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Podyum Kiralama",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageName,
      description: pageDescription,
      inLanguage: "tr-TR",
      breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      mainEntity: { "@id": serviceId },
    },
    serviceNode,
    ...productGraphNodes,
  ];

  if (faqNode) {
    graph.push(faqNode);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <Script
      id="ld-json-podyum"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Sayfa Bileşeni ================== */
export default function Page() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Services />
      <PriceCalculator />
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
