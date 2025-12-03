// app/(tr)/podyum-kiralama/page.jsx
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";

import { buildFaqSchema } from "@/lib/structuredData/faq";
import { buildServiceProductSchema } from "@/lib/structuredData/serviceProducts";

// ================== AYARLAR ==================
export const revalidate = 1800;

const ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

const PHONE_DISPLAY = "0 (545) 304 86 71";
const PHONE_TEL = "+905453048671";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, podyum kiralama için teklif almak istiyorum. Etkinlik türü, tarih ve kişi sayısını paylaşmak istiyorum."
);

const WHATSAPP_LINK = `https://wa.me/${PHONE_TEL.replace(
  "+",
  ""
)}?text=${WHATSAPP_MESSAGE}`;

// ✅ Fiyat hesaplayıcı için varsayılan birim fiyatlar
// (İstediğin rakamları burada değiştirebilirsin)
const DEFAULT_UNIT_PRICES = {
  platform_m2_week: 850, // TL / m²
  carpet_m2_week: 120,   // TL / m²
  skirt_ml_week: 90,     // TL / metre
};

// ================== METADATA ==================
export const metadata = {
  title: "Podyum Kiralama | Profesyonel Sahne ve Podyum Sistemleri - Sahneva",
  description:
    "Kurumsal etkinlikler, konserler, mitingler, AVM etkinlikleri ve organizasyonlar için profesyonel podyum kiralama hizmeti. Modüler sistemler, güvenli kurulum, hızlı teslimat.",
  alternates: {
    canonical: `${ORIGIN}/podyum-kiralama`,
  },
  openGraph: {
    title:
      "Podyum Kiralama | Profesyonel Sahne ve Podyum Sistemleri - Sahneva",
    description:
      "Türkiye genelinde podyum kiralama, sahne platformları, rampa ve tribün çözümleri. Güvenli, modüler ve estetik uygulamalar.",
    url: `${ORIGIN}/podyum-kiralama`,
    type: "website",
  },
};

// ================== JSON-LD BİLEŞENİ ==================
function JsonLd() {
  const pageUrl = `${ORIGIN}/podyum-kiralama`;
  const pageDescription = metadata.description;

  const provider = {
    "@id": `${ORIGIN}/#org`,
  };

  const { service: serviceSchema, products } = buildServiceProductSchema({
    slug: "/podyum-kiralama",
    locale: "tr-TR",
  });

  const baseService = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Podyum Kiralama",
    description: pageDescription,
    provider,
    url: pageUrl,
    areaServed: {
      "@type": "State",
      name: "İstanbul",
      description:
        "İstanbul başta olmak üzere Marmara ve çevre illerde profesyonel podyum kiralama hizmeti",
    },
    serviceType: "Sahne ve Podyum Kiralama",
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      description:
        "Metrekare bazlı, etkinlik türü ve teknik ihtiyaca göre özelleştirilen podyum kiralama hizmeti.",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };

  const faqSchema = buildFaqSchema({
    page: "podyum-kiralama",
  });

  const graph = [
    {
      "@context": "https://schema.org",
      ...baseService,
    },
    ...(products || []),
    faqSchema,
    serviceSchema,
  ];

  return (
    <Script
      id="jsonld-podyum-kiralama"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

// ================== DİNAMİK BİLEŞENLER ==================
const FaqDeferred = dynamic(() => import("@/components/Faq"), {
  loading: () => (
    <section className="py-12 border-t border-neutral-200/70">
      <div className="container">
        <div className="h-6 w-40 bg-neutral-200 rounded animate-pulse mb-4" />
        <div className="space-y-3">
          <div className="h-10 bg-neutral-100 rounded-md animate-pulse" />
          <div className="h-10 bg-neutral-100 rounded-md animate-pulse" />
          <div className="h-10 bg-neutral-100 rounded-md animate-pulse" />
        </div>
      </div>
    </section>
  ),
});

const PriceEstimatorPodyum = dynamic(
  () => import("@/components/PriceEstimatorPodyum"),
  {
    loading: () => (
      <div className="border border-blue-100 rounded-2xl p-4 bg-blue-50/50 animate-pulse min-h-[180px]" />
    ),
  }
);

// ================== YARDIMCI BİLEŞENLER ==================
function SectionTitle({ eyebrow, title, description }) {
  return (
    <header className="mb-8 max-w-3xl">
      {eyebrow && (
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50/80 border border-blue-100 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}

// ================== SAYFA ==================
export default function PodyumKiralamaPage() {
  return (
    <>
      <JsonLd />

      <main
        id="main-content"
        className="min-h-[80vh] bg-gradient-to-b from-[#0b0f1a] via-[#121633]/55 to-[#0b1024]/85 text-slate-50"
      >
        {/* HERO */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20">
          {/* Glow arka plan */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
          >
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-transparent blur-3xl" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-500/20 via-blue-500/20 to-transparent blur-3xl" />
          </div>

          <div className="container relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Sol: metin */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sky-100 border border-white/20 backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Modüler, güvenli ve profesyonel podyum sistemleri
              </p>

              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight">
                Podyum Kiralama ile
                <span className="block bg-gradient-to-r from-blue-300 via-purple-400 to-emerald-300 bg-clip-text text-transparent">
                  sahnenizi bir üst seviyeye taşıyın
                </span>
              </h1>

              <p className="mt-4 text-sm md:text-base text-slate-200 leading-relaxed max-w-xl">
                Konferans, lansman, konser, miting, festival, AVM etkinlikleri ve
                kurumsal organizasyonlar için modüler podyum çözümleri. Yüksek
                taşıma kapasitesi, güvenli kurulum ve estetik görünüm tek pakette.
              </p>

              {/* Bullet’lar */}
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-100">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 text-xs">
                    ✓
                  </span>
                  <span>
                    Kurumsal etkinlikler, fuar, AVM ve lansmanlara özel podyum
                    çözümleri
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 text-xs">
                    ✓
                  </span>
                  <span>Farklı yükseklik ve ölçülerde modüler sistemler</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 text-xs">
                    ✓
                  </span>
                  <span>İç ve dış mekan için kaydırmaz, güvenli platformlar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 text-xs">
                    ✓
                  </span>
                  <span>Türkiye genelinde hızlı kurulum ve söküm</span>
                </li>
              </ul>

              {/* CTA’lar */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 hover:scale-105 hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  📞 Hemen Ara
                  <span className="hidden sm:inline-block font-normal text-white/80">
                    {PHONE_DISPLAY}
                  </span>
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/60 transition-colors"
                >
                  💬 WhatsApp’tan Teklif Al
                </a>

                <p className="w-full text-xs text-slate-300 mt-1">
                  Ortalama cevap süremiz{" "}
                  <span className="font-semibold text-emerald-300">
                    10–15 dakika
                  </span>{" "}
                  arasıdır.
                </p>
              </div>

              {/* Güven rozetleri */}
              <div className="mt-6 flex flex-wrap gap-3 text-[13px] text-slate-200/90">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-white/15 px-3 py-1">
                  <span className="text-yellow-300">★</span>
                  <span>Kurumsal etkinliklerde tercih edilen çözüm ortağı</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-white/15 px-3 py-1">
                  <span>🛠️</span>
                  <span>Profesyonel teknik ekip & güvenli kurulum</span>
                </div>
              </div>
            </div>

            {/* Sağ: görsel / layout */}
            <div className="relative">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl shadow-black/40">
                <Image
                  src="/img/podyum-hero.webp"
                  alt="LED ekran, ses sistemi ve ışıklarla kurulmuş Sahneva podyum sahne sistemi"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/60 border border-white/20 px-3 py-1 text-white/90 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Son 12 ayda{" "}
                    <span className="font-semibold text-white">
                      120+ podyum kurulumu
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/60 border border-white/20 px-3 py-1 text-white/80 backdrop-blur-sm">
                    <span>📍</span>
                    <span>İstanbul çıkışlı, Türkiye geneli hizmet</span>
                  </div>
                </div>
              </div>

              {/* Küçük istatistik kartı */}
              <div className="absolute -bottom-6 right-4 w-[220px] rounded-2xl border border-emerald-400/30 bg-slate-900/90 text-xs text-slate-100 px-4 py-3 shadow-lg shadow-emerald-900/40 backdrop-blur">
                <p className="font-semibold text-emerald-200">
                  Podyum + LED ekran + ses sistemi
                </p>
                <p className="mt-1 text-[13px] text-slate-200">
                  Tüm sahne ihtiyaçlarını tek noktadan planlayın. Paket fiyat
                  avantajı sunuyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NEDEN SAHNEVA */}
        <section className="relative bg-white text-neutral-900 py-16 md:py-20">
          <div className="container">
            <SectionTitle
              eyebrow="Neden Sahneva?"
              title="Podyum kiralama sürecini yönetmek artık çok daha kolay"
              description="Standart podyumların ötesinde, etkinliğinize özel ölçüler, yükselti seçenekleri, rampa ve merdiven çözümleri ile hem güvenli hem de şık sahneler kuruyoruz."
            />

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "🧩",
                  title: "Tam modüler sistem",
                  desc: "Farklı ölçülerde platformlar, yükselti ayarlı ayaklar ve modüler merdiven seçenekleri ile alana tam uyumlu podyumlar.",
                },
                {
                  icon: "🛡️",
                  title: "Güvenlik & taşıma kapasitesi",
                  desc: "Yüksek taşıma kapasiteli, kaydırmaz kaplamalı, yönetmeliklere uygun güvenli kurulum.",
                },
                {
                  icon: "⚡",
                  title: "Hızlı keşif ve kurulum",
                  desc: "Etkinlik öncesi keşif, ölçülendirme ve etkinlik günü hızlı kurulumla zaman kazandırıyoruz.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="relative rounded-2xl border border-neutral-200/80 bg-neutral-50/80 p-5 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-lg">
                    {item.icon}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ÖZELLİK / TEKNİK BİLGİLER */}
        <section className="bg-neutral-50 py-16 md:py-20 border-t border-neutral-200/80">
          <div className="container grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:items-start">
            <div>
              <SectionTitle
                eyebrow="Teknik özellikler"
                title="Podyum sistemlerimizin sunduğu standartlar"
                description="Etkinlik türüne göre podyum yükseklikleri, kaplama seçenekleri ve yan ekipmanlarla sahnenizi tam ihtiyacınıza göre tasarlıyoruz."
              />

              <dl className="grid gap-4 md:grid-cols-2 text-sm">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <dt className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                    Ölçü ve modül seçenekleri
                  </dt>
                  <dd className="mt-1.5 text-neutral-900">
                    1x1 m, 2x1 m, 2x2 m gibi farklı modüller; isteğe göre özel
                    kombinasyonlar.
                  </dd>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <dt className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                    Yükseklik aralığı
                  </dt>
                  <dd className="mt-1.5 text-neutral-900">
                    20 cm&apos;den 150 cm&apos;e kadar ayarlanabilir yükselti
                    seçenekleri.
                  </dd>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <dt className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                    Kaplama seçenekleri
                  </dt>
                  <dd className="mt-1.5 text-neutral-900">
                    Kaydırmaz kaplama, halı kaplama (kurumsal renkler), etek
                    branda ve logo uygulamaları.
                  </dd>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <dt className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                    Ek çözümler
                  </dt>
                  <dd className="mt-1.5 text-neutral-900">
                    Merdiven, rampa, yan korkuluk, engelli erişim rampası, sahne
                    arkası perdeleri.
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-xs text-neutral-600">
                * Teknik gereklilikler, etkinlik türü ve mekan şartlarına göre
                projelendirilir. Keşif sonrası net ölçüler ve fiyatlandırma
                paylaşılır.
              </p>
            </div>

            {/* Sağ: Fiyat hesaplayıcı (varsa) */}
            <aside className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-900">
                Podyum maliyetinizi hızlıca hesaplayın
              </h3>
              <p className="text-xs text-neutral-700">
                Etkinlik alanınızın ölçülerini, tahmini kişi sayısını ve podyum
                yüksekliğini girerek ortalama maliyeti görebilirsiniz. Detaylı
                teklif için formu bize iletin.
              </p>

              {/* ✅ Burada artık unitPrices props ile gidiyor */}
              <PriceEstimatorPodyum unitPrices={DEFAULT_UNIT_PRICES} />

              <p className="text-[13px] text-neutral-600">
                Hesaplanan tutar, ortalama fiyat aralığını gösterir. Nakliye,
                ek ekipman ve kurulum süresine göre net fiyat teklifi ayrıca
                paylaşılır.
              </p>
            </aside>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 md:py-20 border-t border-neutral-200">
          <div className="container">
            <SectionTitle
              eyebrow="Sık sorulan sorular"
              title="Podyum kiralama hakkında en çok merak edilenler"
              description="Kurulum süresi, taşıma kapasitesi, yağmurda kullanım ve AVM içi kurulum gibi sık sorulan konuları sizin için derledik."
            />
          </div>
          <div className="container">
            <FaqDeferred />
          </div>
        </section>

        {/* SON CTA */}
        <section className="bg-gradient-to-r from-blue-900 via-purple-800/70 to-slate-950 py-14 md:py-16 border-t border-purple-500/20">
          <div className="container flex flex-col lg:flex-row items-center gap-6 justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Etkinliğinizin sahnesini birlikte tasarlayalım
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
                Podyum, sahne, LED ekran, ses ve ışık sistemlerini tek merkezden
                planlayarak hem teknik karmaşayı azaltın hem de bütçenizi daha
                verimli kullanın. Kısa bir telefon görüşmesiyle ihtiyacınızı
                netleştirip aynı gün içerisinde fiyat teklifinizi
                hazırlayabiliriz.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-sm">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/60 hover:scale-105 hover:shadow-xl hover:from-emerald-600 hover:to-blue-600 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                💬 WhatsApp’tan Hızlı Teklif Al
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white hover:bg-white/15 hover:border-white/70 transition-colors"
              >
                📞 Telefonla Görüşelim – {PHONE_DISPLAY}
              </a>
              <p className="text-[11px] text-white/70">
                Çalışma saatlerimiz dışında bize mesaj bırakırsanız, ilk
                mesai saatinde geri dönüş sağlıyoruz.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
