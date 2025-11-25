// app/podyum-kiralama/page.jsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { buildFaqSchema } from "@/lib/structuredData/faq";
// Eğer serviceProducts dosyan yoksa veya hata veriyorsa aşağıdaki importu kaldırabilirsin
// import { buildServiceProductSchema } from "@/lib/structuredData/serviceProducts"; 

/* ================== Sabitler ================== */
export const revalidate = 1800; // 30 Dakika ISR
const ORIGIN = "https://www.sahneva.com";
const WHATSAPP_URL = `https://wa.me/905453048671?text=${encodeURIComponent("Merhaba, podyum kiralama için teklif istiyorum.")}`;

// Base64 Placeholder
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ================== Dinamik Bileşenler ================== */

// DÜZELTME: Server Component içinde ssr: false kullanılamaz. 
// CaseGallery.jsx dosyasının en üstünde "use client"; yazdığından emin olun.
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => <div className="h-96 w-full bg-gray-100 animate-pulse rounded-3xl" />
});

const PriceEstimatorPodyum = dynamic(() => import("@/components/PriceEstimatorPodyum"), {
  loading: () => <div className="h-64 w-full bg-gray-50 animate-pulse rounded-3xl" />
});

/* ================== META DATA ================== */
export const metadata = {
  title: "Podyum Kiralama | Profesyonel Sahne Çözümleri | Sahneva",
  description: "Modüler podyum kiralama: 1x1 ve 2x1 paneller, kaymaz kaplama, halı ve skört opsiyonları. İstanbul geneli profesyonel kurulum ve uygun fiyatlar.",
  alternates: { canonical: `${ORIGIN}/podyum-kiralama` },
  openGraph: {
    title: "Podyum Kiralama | Sahneva",
    description: "Modüler podyum sistemleri, kaymaz kaplama ve profesyonel kurulum.",
    url: `${ORIGIN}/podyum-kiralama`,
    type: "website",
    locale: "tr_TR",
    images: [{
      url: `${ORIGIN}/img/podyum/hero.webp`,
      width: 1200,
      height: 630,
      alt: "Sahneva Podyum Kiralama",
    }],
  },
};

/* ================== Veri Objeleri ================== */
const UNIT_PRICES = {
  platform_m2_week: 250,
  carpet_m2_week: 120,
  skirt_ml_week: 90,
  istanbul_setup: 8000,
};

const SERVICES = [
  { icon: "🎭", title: "Modüler Podyum", desc: "1×1m ve 2×1m modüler paneller ile esnek çözümler", features: ["Hızlı kurulum", "Yüksek taşıma kapasitesi"] },
  { icon: "💍", title: "Düğün Podyumları", desc: "Özel günler için şık ve güvenli podyum çözümleri", features: ["Beyaz halı kaplama", "Dekoratif kenarlıklar"] },
  { icon: "🎤", title: "Konser Sahneleri", desc: "Profesyonel performanslar için dayanıklı sistemler", features: ["Ses izolasyonu", "Güvenlik korkulukları"] },
  { icon: "🏢", title: "Kurumsal Lansman", desc: "Marka etkinlikleri için prestijli çözümler", features: ["Marka giydirme", "Özel rampa sistemleri"] },
  { icon: "🎪", title: "Fuar & Sergi", desc: "Fuarlar için modüler ve taşınabilir zeminler", features: ["Hızlı söküm", "Esnek modülasyon"] },
  { icon: "🔧", title: "Teknik Kurulum", desc: "Profesyonel ekip ile güvenli montaj hizmeti", features: ["Sertifikalı ekip", "Sigortalı hizmet"] },
];

const PACKAGES = [
  {
    key: "mini",
    name: "Mini Podyum",
    size: "12 m²",
    layout: { width: 3, depth: 4, area: 12, perimeter: 14 },
    includes: ["6 × (1×2 m) panel", "40 cm Yükseklik", "Kaymaz kaplama", "Kurulum + söküm"],
    note: "İç mekân konuşma ve mini performanslar için ideal."
  },
  {
    key: "orta",
    name: "Orta Podyum",
    size: "24 m²",
    layout: { width: 4, depth: 6, area: 24, perimeter: 20 },
    includes: ["12 × (1×2 m) panel", "60 cm Yükseklik", "Merdiven dahil", "Kurulum + söküm"],
    note: "Kurumsal sahneler ve canlı performanslar için standart çözüm."
  },
  {
    key: "pro",
    name: "Pro Podyum",
    size: "48 m²",
    layout: { width: 6, depth: 8, area: 48, perimeter: 28 },
    includes: ["24 × (1×2 m) panel", "80-100 cm Yükseklik", "Rampa + Korkuluk", "Tam set kaplama"],
    note: "Büyük konser ve miting sahneleri için profesyonel çözüm."
  },
];

const FAQ_ITEMS = [
  { q: "Podyum kiralama fiyatları nasıl hesaplanır?", a: "Fiyatlar m² bazında hesaplanır. Ek olarak halı, skört kaplama ve nakliye/kurulum maliyetleri eklenir." },
  { q: "Kurulum ne kadar sürer?", a: "Ortalama 24-48 m² bir podyumun kurulumu 2-4 saat arasında tamamlanır." },
  { q: "Zemin bozuksa kurulum yapılabilir mi?", a: "Evet, podyum ayaklarımız ayarlanabilir (teleskopik) olduğu için bozuk zeminlerde bile terazisinde kurulum yapıyoruz." },
  { q: "Hangi illere hizmet veriyorsunuz?", a: "Merkezimiz İstanbul'dur ancak tüm Türkiye'ye hizmet vermekteyiz. Şehir dışı için nakliye farkı uygulanır." },
];

const GALLERY_IMAGES = [
  "/img/podyum/1.webp", "/img/podyum/2.webp", "/img/podyum/3.webp",
  "/img/galeri/podyum-kiralama-4.webp", "/img/galeri/podyum-kiralama-5.webp",
  "/img/galeri/podyum-kiralama-6.webp", "/img/galeri/podyum-kiralama-7.webp", "/img/galeri/podyum-kiralama-8.webp"
];

/* ================== Alt Bileşenler ================== */

function StructuredData() {
  const pageUrl = `${ORIGIN}/podyum-kiralama`;
  
  // Basit service schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Podyum Kiralama",
        description: metadata.description,
        provider: { "@id": `${ORIGIN}#org` },
        areaServed: { "@type": "State", name: "İstanbul" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Podyum Paketleri",
          itemListElement: PACKAGES.map(pkg => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: pkg.name },
            price: (pkg.layout.area * UNIT_PRICES.platform_m2_week) + UNIT_PRICES.istanbul_setup,
            priceCurrency: "TRY"
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Anasayfa", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Podyum Kiralama", item: pageUrl }
        ]
      },
      // FAQ Schema (buildFaqSchema fonksiyonunun çalıştığını varsayıyoruz)
      (buildFaqSchema ? buildFaqSchema(FAQ_ITEMS) : {})
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-[85vh] bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/podyum/hero.webp"
          alt="Sahneva Profesyonel Podyum ve Sahne Kurulumu"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center py-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-white">İstanbul Geneli Hizmet</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
          Profesyonel <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Podyum Kiralama
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
          Düğün, konser ve kurumsal etkinlikleriniz için güvenli, estetik ve modüler sahne çözümleri.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-green-900/20 flex items-center gap-3"
          >
            <span className="text-2xl">💬</span>
            <span>WhatsApp Teklif Al</span>
          </Link>
          <Link
            href="#paketler"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-2xl font-bold transition-all hover:-translate-y-1"
          >
            Paketleri İncele
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Hizmetlerimiz</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Her türlü etkinlik ihtiyacına uygun profesyonel çözümler sunuyoruz.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => (
            <div key={idx} className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition-all border border-slate-100 hover:border-blue-200 group">
              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{srv.icon}</span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
              <p className="text-slate-600 mb-4 text-sm">{srv.desc}</p>
              <ul className="space-y-2">
                {srv.features.map((ft, i) => (
                  <li key={i} className="text-slate-500 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {ft}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalculatorSection() {
  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-6">Bütçenizi Planlayın</h2>
            <p className="text-slate-300 text-lg mb-8">
              İhtiyacınız olan podyum ölçülerini girerek tahmini bir fiyat alın. 
              Net fiyatlandırma için keşif yapılması önerilir.
            </p>
            <ul className="space-y-4 text-slate-300 mb-8">
              <li className="flex items-center gap-3">
                <span className="bg-green-500/20 text-green-400 p-2 rounded-lg">✓</span>
                Şeffaf fiyatlandırma politikası
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-green-500/20 text-green-400 p-2 rounded-lg">✓</span>
                Gizli maliyet yok
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-green-500/20 text-green-400 p-2 rounded-lg">✓</span>
                Kurulum dahil fiyatlar
              </li>
            </ul>
          </div>
          <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
            <PriceEstimatorPodyum unitPrices={UNIT_PRICES} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  const formatPrice = (amount) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(amount);

  return (
    <section id="paketler" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Hazır Paketler</h2>
          <p className="text-slate-600">Sık tercih edilen ölçüler için oluşturduğumuz avantajlı paketler.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PACKAGES.map((pkg) => {
             const basePrice = pkg.layout.area * UNIT_PRICES.platform_m2_week;
             const totalPrice = basePrice + UNIT_PRICES.istanbul_setup;

             return (
              <div key={pkg.key} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white text-center">
                  <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                  <div className="text-blue-100 font-medium">{pkg.size}</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6 text-center">
                    <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Tahmini Fiyat</span>
                    <div className="text-3xl font-black text-slate-900 mt-2">{formatPrice(totalPrice)}</div>
                    <span className="text-xs text-slate-400">+KDV</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                        <span className="text-green-500 text-lg">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={WHATSAPP_URL}
                    className="w-full py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-colors text-center block"
                  >
                    Teklif İste
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-12">Referans İşlerimiz</h2>
        <CaseGallery 
          images={GALLERY_IMAGES.map(src => ({ src, alt: "Sahneva Podyum Referans" }))} 
          visibleCount={6}
        />
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12">Sıkça Sorulan Sorular</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <details key={idx} className="group bg-white rounded-2xl p-6 shadow-sm cursor-pointer [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-bold text-slate-900 list-none">
                {item.q}
                <span className="transition-transform group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-slate-600 leading-relaxed animate-fade-in">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('/img/pattern.png')] bg-repeat"></div>
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-black mb-6">Etkinliğinizi Riske Atmayın</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
          Sahneva güvencesiyle zamanında kurulum, profesyonel ekipman ve sorunsuz organizasyon garantisi.
        </p>
        <Link 
          href="/iletisim" 
          className="inline-block bg-white text-blue-900 font-bold px-10 py-4 rounded-2xl hover:scale-105 transition-transform shadow-2xl"
        >
          Hemen İletişime Geçin
        </Link>
      </div>
    </section>
  );
}

/* ================== PAGE COMPONENT ================== */
export default function PodyumKiralamaPage() {
  return (
    <>
      <StructuredData />
      <HeroSection />
      <ServicesSection />
      <CalculatorSection />
      <PackagesSection />
      <GallerySection />
      <FAQSection />
      <CTASection />
    </>
  );
}
