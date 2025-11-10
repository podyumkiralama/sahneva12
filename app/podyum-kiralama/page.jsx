// app/podyum-kiralama/page.js
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getService } from "@/lib/data";
import PriceEstimator from "@/components/PriceEstimatorPodyum";

// ⏱️ Saatlik yeniden üretim (statik + ISR)
export const revalidate = 3600;

const svc = getService("podyum");

// Güncel birim fiyatlar
const UNIT_PRICES = {
  platform_m2_week: 250,  // TL/m²/hafta
  carpet_m2_week: 120,    // TL/m²/hafta
  skirt_ml_week: 90,      // TL/mtül/hafta
  istanbul_setup: 8000,   // TL İstanbul içi nakliye + kurulum + söküm
};

// Paket (varsayılan dizilimler)
const CONTENT = {
  gallery: ["/img/podyum/1.webp", "/img/podyum/2.webp", "/img/podyum/3.webp"],
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

// 🔎 Erişilebilirlik yardımcıları
function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:z-[9999] focus:top-4 focus:left-4 focus:bg-blue-600 focus:text-white focus:px-6 focus:py-4 focus:rounded-lg focus:font-bold focus:shadow-2xl focus:border-2 focus:border-white transition-all duration-200"
    >
      Ana içeriğe atla
    </a>
  );
}

// ⚠️ NOT: Görünür metin varsa aria-label vermiyoruz.
// Sadece SR-only metin olursa aria-label kullan.
function AccessibleCTA({
  href,
  children,
  variant = "primary",
  className = "",
  ariaLabel,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/70";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    secondary:
      "text-white bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30",
    white:
      "text-blue-700 bg-white hover:bg-gray-100 border border-white/0",
  };

  // aria-label sadece sağlanmışsa uygulanır
  const maybeAria = ariaLabel ? { "aria-label": ariaLabel } : {};

  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...maybeAria}
      {...props}
    >
      {children}
    </a>
  );
}

function FocusableCard({ children, className = "", ...props }) {
  return (
    <div
      className={`focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:scale-105 transition-all duration-200 ${className}`}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
}

function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  ...props
}) {
  return (
    <Image
      src={src}
      alt={alt}
      className={`transition-transform duration-300 ${className}`}
      placeholder="blur"
      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
      priority={priority}
      {...props}
    />
  );
}

// 💸 Yardımcılar
function priceBase(area) {
  return area * UNIT_PRICES.platform_m2_week;
}
function priceCarpet(area) {
  return area * UNIT_PRICES.carpet_m2_week;
}
function priceSkirt(perimeter) {
  return perimeter * UNIT_PRICES.skirt_ml_week;
}
function formatTRY(n) {
  try {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${n} TL`;
  }
}

export const metadata = {
  title:
    "Podyum Kiralama | Sahneva - Profesyonel Sahne ve Podyum Çözümleri",
  description:
    "Modüler podyum kiralama: 1×1 ve 2×1 paneller, kaymaz kaplama, halı ve skört opsiyonları. İstanbul geneli profesyonel kurulum.",
  alternates: { canonical: "https://www.sahneva.com/podyum-kiralama" },
  keywords: [
    "podyum kiralama",
    "podyum sahne kiralama",
    "modüler podyum",
    "sahne podyum platform",
    "podyum fiyatları",
    "İstanbul podyum kiralama",
    "podyum kurulumu",
    "etkinlik podyumu",
  ],
  openGraph: {
    title: "Podyum Kiralama | Sahneva - Profesyonel Sahne Çözümleri",
    description:
      "Konser, lansman ve düğünler için podyum sahne kiralama. Modüler 1×1 & 2×1 paneller, kaymaz kaplama.",
    url: "https://www.sahneva.com/podyum-kiralama",
    type: "website",
    images: [
      {
        url: "/img/podyum/og-podyum.jpg",
        width: 1200,
        height: 630,
        alt: "Sahneva Podyum Kiralama - Profesyonel Sahne Çözümleri",
      },
    ],
    locale: "tr_TR",
  },
  robots: { index: true, follow: true },
};
export default function Page() {
  const title = "Profesyonel Podyum Kiralama";
  const desc =
    "Modüler podyum sistemleri ile her türlü etkinlik için profesyonel sahne çözümleri. 1×1 ve 2×1 paneller, kaymaz kaplama, güvenlik ekipmanları ve uzman kurulum ekibi.";
  const heroSrc = "/img/hizmet-podyum.webp";

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
        totalWithSetup:
          base + carpet + skirt + UNIT_PRICES.istanbul_setup,
      },
    };
  });

  const TECHNICAL_SPECS = [
    {
      category: "Teknik Özellikler",
      items: [
        "1×1 m ve 2×1 m modüler paneller",
        "Kaymaz kaplama standart",
        "40-100 cm yükseklik seçenekleri",
        "Alüminyum karkas, çelik bağlantı elemanları",
      ],
    },
    {
      category: "Güvenlik & Erişilebilirlik",
      items: [
        "Kenar korkuluk opsiyonu",
        "Engelli erişimi için rampa",
        "Kablo kanalı ve işaretleme",
        "Merdiven ve güvenlik ekipmanları",
      ],
    },
    {
      category: "Tamamlayıcı Hizmetler",
      items: [
        "Halı kaplama opsiyonu",
        "Skört (etek) kaplama",
        "Profesyonel kurulum ve söküm",
        "Markalama ve özel tasarım",
      ],
    },
  ];

  const USE_CASES = [
    { icon: "🏢", text: "Kurumsal lansman ve toplantılar" },
    { icon: "💍", text: "Düğün, nişan ve özel davetler" },
    { icon: "🎤", text: "Konser, festival ve sahne performansları" },
    { icon: "🎓", text: "Mezuniyet törenleri ve okul etkinlikleri" },
    { icon: "🏛️", text: "Belediye organizasyonları ve törenler" },
    { icon: "🛍️", text: "AVM etkinlikleri ve fuar stantları" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <SkipToMain />

      {/* HERO */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-16 lg:pt-20"
        aria-labelledby="hero-title"
        role="banner"
      >
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroSrc}
            alt="Profesyonel podyum kiralama hizmeti - Modüler sahne sistemleri ve kurulum çözümleri"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-center"
            style={{
              transform: "scale(1.02)",
              filter: "brightness(0.6) contrast(1.1) saturate(1.1)",
            }}
          />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-purple-900/70"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-center justify-center opacity-5"
          aria-hidden="true"
        >
          <h1 className="text-[100px] lg:text-[160px] font-black text-white tracking-wider select-none">
            PODYUM
          </h1>
        </div>

        <div className="relative z-10 container text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 mb-6">
              <span
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                aria-hidden="true"
              />
              <span className="text-white/95 text-sm font-medium">
                İstanbul Geneli Kurulum
              </span>
            </div>

            <h1
              id="hero-title"
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            >
              <span className="block">PROFESYONEL</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300">
                Podyum Çözümleri
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed max-w-3xl mx-auto">
              1×1 ve 2×1 modüler paneller, kaymaz kaplama{" "}
              <br />
              <strong className="text-blue-200">
                Halı, skört ve profesyonel kurulum dahil
              </strong>
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <AccessibleCTA href="#paketler" variant="primary">
                <span className="flex items-center gap-2">
                  Podyum Paketlerimiz
                  <span
                    className="translate-x-0 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </AccessibleCTA>

              {/* Kontrast uyumu: bg-white/20 + border */}
              <AccessibleCTA
                href="tel:+905453048671"
                variant="secondary"
                title="Podyum kiralama için telefon"
              >
                <span className="flex items-center gap-2">
                  <span role="img" aria-label="Telefon">
                    📞
                  </span>
                  Hemen Ara
                </span>
              </AccessibleCTA>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      <main id="main-content" tabIndex={-1} className="relative">
        {/* GİRİŞ */}
        <section className="py-20 bg-gradient-to-br from-white to-blue-50/50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Profesyonel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Podyum Çözümleri
                </span>
              </h2>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"
                aria-hidden="true"
              />
            </div>

            <div className="prose prose-lg max-w-none text-center">
              <p className="text-xl text-neutral-700 leading-relaxed mb-8">
                Konser, düğün, lansman veya kurumsal etkinlikleriniz için
                modern, güvenli ve şık podyum çözümleri sunuyoruz.{" "}
                <strong className="text-blue-700">Sahneva</strong>, modüler
                podyum sistemleriyle her ölçekte etkinlik için ideal sahne
                alanları oluşturur.
              </p>

              <p className="text-xl text-neutral-700 leading-relaxed">
                1×1 ve 2×1 panellerle esnek kurulum, kaymaz kaplama ve
                güvenlik ekipmanlarıyla profesyonel sahne deneyimi. Keşiften
                planlamaya, kurulumdan söküme kadar tüm süreç Sahneva ekibi
                tarafından yönetilir.
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8" role="list">
              {[
                { icon: "⚡", title: "Hızlı Kurulum", desc: "2–6 saat" },
                {
                  icon: "🛡️",
                  title: "Güvenlik Garantisi",
                  desc: "Kaymaz kaplama & ekipman",
                },
                {
                  icon: "🏗️",
                  title: "Modüler Sistem",
                  desc: "1×1 ve 2×1 paneller",
                },
              ].map((f, i) => (
                <FocusableCard
                  key={i}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg border border-neutral-100 hover:shadow-xl"
                  role="listitem"
                >
                  <div className="text-4xl mb-4" role="img" aria-label={f.title}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-neutral-700">{f.desc}</p>
                </FocusableCard>
              ))}
            </div>
          </div>
        </section>
        {/* HIZLI HESAP */}
        <section
          id="hizli-hesap"
          className="py-20 bg-gradient-to-br from-neutral-50 to-blue-100/30"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Hızlı{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Fiyat Hesaplama
                </span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Podyum ölçülerinizi girerek anında fiyat teklifi alın
              </p>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"
                aria-hidden="true"
              />
            </div>

            <FocusableCard className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
              <PriceEstimator unitPrices={UNIT_PRICES} />
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>
                    İstanbul içi nakliye, kurulum ve söküm:{" "}
                    {formatTRY(UNIT_PRICES.istanbul_setup)}
                  </strong>
                  <br />*200 m²'ye kadar geçerlidir. Şehir dışı projeler için
                  özel teklif alın.
                </p>
              </div>
            </FocusableCard>
          </div>
        </section>

        {/* PAKETLER */}
        <section id="paketler" className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Podyum{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Paketlerimiz
                </span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                İhtiyaçlarınıza uygun hazır paketler veya özel çözümler
              </p>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"
                aria-hidden="true"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8" role="list">
              {enrichedPkgs.map((pkg, index) => (
                <FocusableCard
                  key={pkg.key}
                  className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-neutral-100 hover:border-blue-200 transition-all duration-500 overflow-hidden"
                  role="listitem"
                >
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={CONTENT.gallery[index] || CONTENT.gallery[0]}
                      alt={`${pkg.name} - ${pkg.note}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-black text-white">
                        {pkg.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {pkg.layout.width}×{pkg.layout.depth} m •{" "}
                        {pkg.layout.area} m²
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6" role="list">
                      {pkg.includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-neutral-700"
                        >
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Platform:</span>
                          <span className="font-semibold">
                            {formatTRY(pkg.price.base)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Halı + Skört:</span>
                          <span className="font-semibold">
                            {formatTRY(pkg.price.withCarpetAndSkirt)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-neutral-300 pt-2">
                          <span className="font-bold">Toplam (İstanbul):</span>
                          <span className="font-bold text-blue-700">
                            {formatTRY(pkg.price.totalWithSetup)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {pkg.note && (
                      <p className="mt-4 text-sm text-neutral-600 text-center">
                        {pkg.note}
                      </p>
                    )}

                    <div className="mt-6">
                      {/* Görünür metin = erişilebilir ad */}
                      <AccessibleCTA
                        href="tel:+905453048671"
                        variant="primary"
                        className="w-full text-center justify-center"
                        title="Podyum kiralama için telefon"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span role="img" aria-label="Telefon">
                            📞
                          </span>
                          Hemen Teklif Al
                        </span>
                      </AccessibleCTA>
                    </div>
                  </div>
                </FocusableCard>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-600">
                *Fiyatlar haftalık kiralama içindir. Günlük kiralama için
                iletişime geçin.
              </p>
            </div>
          </div>
        </section>

        {/* TEKNİK ÖZELLİKLER */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-blue-100/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Teknik{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Özellikler
                </span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Yüksek kalite malzemeler ve profesyonel standartlar
              </p>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"
                aria-hidden="true"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8" role="list">
              {TECHNICAL_SPECS.map((spec, index) => (
                <FocusableCard
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl"
                  role="listitem"
                >
                  <h3 className="text-2xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={spec.category}>
                      🔧
                    </span>
                    {spec.category}
                  </h3>
                  <ul className="space-y-4" role="list">
                    {spec.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-neutral-700"
                      >
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FocusableCard>
              ))}
            </div>
          </div>
        </section>

        {/* KULLANIM ALANLARI */}
        <section className="py-20 bg-gradient-to-br from-neutral-900 to-blue-900/95">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Kullanım{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Alanları
                </span>
              </h2>
              <p className="text-xl text-white/85 max-w-3xl mx-auto">
                Podyum çözümlerimizin tercih edildiği başlıca etkinlik türleri
              </p>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8"
                aria-hidden="true"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto" role="list">
              {USE_CASES.map((useCase, index) => (
                <FocusableCard
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300 group"
                  role="listitem"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl" role="img" aria-label={useCase.text}>
                      {useCase.icon}
                    </div>
                    <span className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      {useCase.text}
                    </span>
                  </div>
                </FocusableCard>
              ))}
            </div>
          </div>
        </section>
        {/* POPÜLER ÖLÇÜLER */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Popüler{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Ölçüler
                </span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Sık talep edilen ölçüler için hazır fiyatlar
              </p>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"
                aria-hidden="true"
              />
            </div>

            <PriceMatrix unitPrices={UNIT_PRICES} />
          </div>
        </section>

        {/* GALERİ */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-blue-100/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Proje{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Galerimiz
                </span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Gerçekleştirdiğimiz başarılı podyum kurulum projelerinden örnekler
              </p>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"
                aria-hidden="true"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4" role="list">
              {CONTENT.gallery.map((src, index) => (
                <FocusableCard
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square"
                  role="listitem"
                >
                  <OptimizedImage
                    src={src}
                    alt={`Podyum kurulum projesi ${index + 1} - Profesyonel sahne çalışmamız`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"
                    aria-hidden="true"
                  />
                </FocusableCard>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-20 bg-white">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Sıkça Sorulan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Sorular
                </span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Podyum kiralama sürecinde en çok merak edilen sorular ve detaylı cevapları
              </p>
              <div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "Podyum kiralama fiyatları nasıl hesaplanır?",
                  answer:
                    "Alan (m²), yükseklik, aksesuarlar (korkuluk, rampa, skört, halı) ve nakliye esas alınır. Halı m², skört çevre metre üzerinden hesaplanır. Platform: 250 TL/m², Halı: 120 TL/m², Skört: 90 TL/mtül, İstanbul kurulum: 8.000 TL",
                },
                {
                  question: "Hangi panelleri kullanıyorsunuz?",
                  answer:
                    "1×1 m ve 2×1 m modüler paneller. Düzensiz zeminde 1×1, ana sahnede 2×1 paneller önerilir. Her iki panel de kaymaz kaplama ve güvenlik standartlarına uygundur.",
                },
                {
                  question: "Kurulum ne kadar sürer?",
                  answer:
                    "Standart 24–48 m² podyumlar çoğu mekânda aynı gün kurulur. Geniş alanlar ve gece mesaisi ek süre gerektirebilir. Ortalama kurulum süresi 2–6 saat arasındadır.",
                },
                {
                  question: "Halı ve skört zorunlu mu?",
                  answer:
                    "Zorunlu değildir; görsel bütünlük ve güvenlik için önerilir. Fiyatlar opsiyon olarak ayrı hesaplanır. Halı kaymaz özelliktedir, skört ise profesyonel görünüm sağlar.",
                },
              ].map((faq, i) => (
                <FocusableCard
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 hover:shadow-xl"
                >
                  <h3 className="text-2xl font-black text-neutral-900 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">{faq.answer}</p>
                </FocusableCard>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-black mb-4">Başka Sorunuz Mu Var?</h3>
                <p className="text-white/95 mb-6">
                  7/24 canlı destek ekibimiz sorularınızı yanıtlamak için hazır
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <AccessibleCTA
                    href="tel:+905453048671"
                    variant="white"
                    title="Telefon ile podyum kiralama danışmanlığı"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span role="img" aria-label="Telefon">📞</span>
                      Hemen Ara
                    </span>
                  </AccessibleCTA>

                  <AccessibleCTA
                    href="https://wa.me/905453048671"
                    variant="primary"
                    title="WhatsApp üzerinden podyum kiralama teklifi"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span role="img" aria-label="WhatsApp">💬</span>
                      WhatsApp
                    </span>
                  </AccessibleCTA>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA (kontrast düzeltilmiş) */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="container max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Hemen <span className="text-yellow-300">Podyum Kirala</span>
            </h2>
            <p className="text-xl text-white/95 mb-8 leading-relaxed max-w-2xl mx-auto">
              Etkinliğiniz için en uygun podyum çözümünü sunalım. 2 saat içinde detaylı teklif hazırlıyoruz.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <AccessibleCTA
                href="tel:+905453048671"
                variant="white"
                className="min-w-[200px] text-center"
                title="Podyum kiralama için telefon"
              >
                <span className="flex items-center justify-center gap-2">
                  <span role="img" aria-label="Telefon">📞</span>
                  Hemen Ara
                </span>
              </AccessibleCTA>

              <AccessibleCTA
                href="https://wa.me/905453048671"
                variant="primary"
                className="min-w-[200px] text-center"
                title="WhatsApp'tan podyum kiralama teklifi"
              >
                <span className="flex items-center justify-center gap-2">
                  <span role="img" aria-label="WhatsApp">💬</span>
                  WhatsApp
                </span>
              </AccessibleCTA>

              {/* Kontrast fix: bg-transparent yerine bg-white/20 + border */}
              <a
                href="/iletisim"
                className="group text-white font-bold px-8 py-4 rounded-xl border-2 border-white bg-white/20 hover:bg-white/30 transition-all duration-300 min-w-[200px] text-center focus:outline-none focus:ring-4 focus:ring-white/70"
                title="İletişim formu"
              >
                <span className="flex items-center justify-center gap-2">
                  <span role="img" aria-label="E-posta">📧</span>
                  E-posta
                </span>
              </a>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 max-w-2xl mx-auto">
              <p className="text-white/95 text-sm">
                <strong>⏱️ 2 Saat İçinde Yanıt:</strong> Mesai saatleri içinde tüm podyum kiralama taleplerinize 2 saat içinde detaylı teklif ve profesyonel danışmanlık sunuyoruz.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SchemaBlocks packages={CONTENT.packages} unitPrices={UNIT_PRICES} />
    </div>
  );
}

/* ---------- Alt Bileşenler (Server) ---------- */
function PriceMatrix({ unitPrices }) {
  const PRESETS = [
    { w: 2, d: 5 },  // 10 m²
    { w: 3, d: 5 },  // 15 m²
    { w: 4, d: 5 },  // 20 m²
    { w: 4, d: 6 },  // 24 m²
    { w: 5, d: 6 },  // 30 m²
    { w: 5, d: 8 },  // 40 m²
    { w: 6, d: 10 }, // 60 m²
    { w: 8, d: 10 }, // 80 m²
  ];

  const rows = PRESETS.map(({ w, d }) => {
    const area = w * d;
    const perimeter = 2 * (w + d);
    const base = area * unitPrices.platform_m2_week;
    const carpet = area * unitPrices.carpet_m2_week;
    const skirt = perimeter * unitPrices.skirt_ml_week;
    const setup = unitPrices.istanbul_setup;
    return {
      w, d, area, perimeter, base,
      carpet, skirt, setup,
      total: base + carpet + skirt + setup,
    };
  });

  return (
    <FocusableCard className="overflow-x-auto rounded-2xl border bg-white shadow-lg">
      <table className="w-full text-sm" aria-label="Popüler podyum ölçüleri ve fiyatları">
        <caption className="sr-only">Popüler podyum ölçüleri ve haftalık kiralama fiyatları</caption>
        <thead>
          <tr className="text-left text-neutral-500 [&>th]:p-4 bg-gray-50">
            <th scope="col">Ölçü</th>
            <th scope="col">Alan</th>
            <th scope="col">Platform</th>
            <th scope="col">Halı</th>
            <th scope="col">Skört</th>
            <th scope="col">Kurulum</th>
            <th scope="col">Toplam</th>
          </tr>
        </thead>
        <tbody className="[&>tr>*]:p-4 [&>tr]:border-t">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="font-medium">{r.w}×{r.d} m</td>
              <td>{r.area} m²</td>
              <td>{formatTRY(r.base)}</td>
              <td>{formatTRY(r.carpet)}</td>
              <td>{formatTRY(r.skirt)}</td>
              <td>{formatTRY(r.setup)}</td>
              <td className="font-semibold text-blue-700">{formatTRY(r.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
        <p className="text-xs text-neutral-500">
          *Fiyatlar haftalıktır ve İstanbul içi nakliye, kurulum, söküm dahildir. Halı ve skört opsiyoneldir.
        </p>
      </div>
    </FocusableCard>
  );
}

/* ---------- SchemaBlocks ---------- */
function SchemaBlocks({ packages: pkgs, unitPrices }) {
  const SITE = "https://www.sahneva.com";
  const PAGE = `${SITE}/podyum-kiralama`;
  const LB_ID = `${SITE}/#localbusiness`;
  const SERVICE_ID = `${PAGE}#service`;
  const FAQ_ID = `${PAGE}#faq`;
  const BREAD_ID = `${PAGE}#breadcrumbs`;

  const offers = (pkgs || []).map((p) => {
    const area = p.layout.area;
    const perimeter = p.layout.perimeter;
    const priceNumber =
      area * unitPrices.platform_m2_week +
      area * unitPrices.carpet_m2_week +
      perimeter * unitPrices.skirt_ml_week +
      unitPrices.istanbul_setup;

    return {
      "@type": "Offer",
      name: p.name,
      description: `${p.layout.width}×${p.layout.depth} m (${p.layout.area} m²), çevre ${p.layout.perimeter} m. İstanbul içi nakliye, kurulum ve söküm dahil.`,
      priceCurrency: "TRY",
      price: String(priceNumber),
      availability: "https://schema.org/InStock",
      url: PAGE,
    };
  });

  const faq = [
    {
      q: "Podyum kiralama fiyatları nasıl hesaplanır?",
      a: "Alan (m²), yükseklik, aksesuarlar (korkuluk, rampa, skört, halı) ve nakliye temel alınır. Halı m², skört çevre metre üzerinden hesaplanır.",
    },
    {
      q: "Hangi panelleri kullanıyorsunuz?",
      a: "1×1 m ve 2×1 m modüler paneller. Düzensiz zeminde 1×1, ana sahnede 2×1 paneller önerilir.",
    },
    {
      q: "Kurulum ne kadar sürer?",
      a: "Standart 24–48 m² podyumlar çoğu mekânda aynı gün kurulur. Geniş alanlar ve gece mesaisi ek süre gerektirebilir.",
    },
  ];

  const ldService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    serviceType: "Podyum Kiralama",
    name: "Profesyonel Podyum Kiralama",
    description:
      "Modüler 1×1 ve 2×1 panellerle podyum kiralama; kaymaz kaplama, rampa/korkuluk ve profesyonel kurulum. İstanbul geneli hizmet.",
    url: PAGE,
    areaServed: [
      { "@type": "Country", name: "TR" },
      { "@type": "City", name: "İstanbul" },
    ],
    provider: { "@id": LB_ID },
    offers: offers,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Podyum Paketleri (Haftalık)",
      itemListElement: offers,
    },
  };

  const ldFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": FAQ_ID,
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const ldBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREAD_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE },
      { "@type": "ListItem", position: 2, name: "Podyum Kiralama", item: PAGE },
    ],
  };

  return (
    <>
      <Script
        id="ld-service"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFAQ) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
    </>
  );
}
