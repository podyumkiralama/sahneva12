// app/podyum-kiralama/page.jsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

/* ================== AYARLAR & TEK DOĞRU VERİ KAYNAĞI ================== */
export const revalidate = 1800; // 30 Dakika
const ORIGIN = "https://www.sahneva.com";
const WHATSAPP_URL = `https://wa.me/905453048671?text=${encodeURIComponent("Merhaba, podyum kiralama teklifi almak istiyorum.")}`;

// 1. ADIM: Fiyatları buradan yönetiyoruz. Burayı değiştirince HER YER değişir.
const UNIT_PRICES = {
  platform_m2: 250,      // m² başına podyum fiyatı
  carpet_m2: 120,        // m² başına halı fiyatı
  skirt_ml: 90,          // Metretül başına etek/skört fiyatı
  setup_fee: 8000,       // Nakliye ve kurulum (İstanbul içi standart)
  currency: "TRY"
};

// Fiyat Hesaplama Motoru (Hem UI hem JSON-LD bunu kullanacak)
const calculatePackagePrice = (layout) => {
  const platformCost = layout.area * UNIT_PRICES.platform_m2;
  const carpetCost = layout.area * UNIT_PRICES.carpet_m2;
  const skirtCost = layout.perimeter * UNIT_PRICES.skirt_ml;
  
  return {
    base: platformCost,
    extras: carpetCost + skirtCost,
    total: platformCost + carpetCost + skirtCost + UNIT_PRICES.setup_fee
  };
};

// 2. ADIM: Paket Tanımları (Veri Tabanı Gibi Düşün)
const PACKAGES = [
  {
    id: "pkg-mini",
    name: "Mini Podyum Paketi",
    description: "12 m² (3x4m) ölçülerinde, 40cm yükseklikte, iç mekan etkinlikleri ve konuşmalar için ideal mini podyum.",
    layout: { width: 3, depth: 4, area: 12, perimeter: 14 },
    height: "40 cm",
    includes: ["6 adet 1x2m panel", "Siyah etek kaplama", "Kaymaz yüzey", "Kurulum ve Söküm"],
    image: "/img/podyum/mini-podyum.webp" // Gerçek resim yolu olmalı
  },
  {
    id: "pkg-midi",
    name: "Orta Boy Sahne Paketi",
    description: "24 m² (4x6m) ölçülerinde, 60cm yükseklikte, canlı müzik ve kurumsal sunumlar için standart sahne.",
    layout: { width: 4, depth: 6, area: 24, perimeter: 20 },
    height: "60 cm",
    includes: ["12 adet 1x2m panel", "Merdiven dahil", "Halı kaplama opsiyonu", "Profesyonel Kurulum"],
    image: "/img/podyum/orta-podyum.webp"
  },
  {
    id: "pkg-pro",
    name: "Profesyonel Konser Sahnesi",
    description: "48 m² (6x8m) büyük sahne. 100cm yükseklik, korkuluk ve rampa sistemleri dahil tam kapsamlı çözüm.",
    layout: { width: 6, depth: 8, area: 48, perimeter: 28 },
    height: "100 cm",
    includes: ["24 adet 1x2m panel", "Güvenlik korkulukları", "Rampa ve Merdiven", "Tam kapatma"],
    image: "/img/podyum/pro-podyum.webp"
  }
];

// Metinler ve SSS
const FAQ_ITEMS = [
  { q: "Podyum kiralama fiyatları ne kadar?", a: `Podyum kiralama fiyatlarımız m² başına ${UNIT_PRICES.platform_m2} TL'den başlamaktadır. İstanbul içi kurulum bedeli ortalama ${UNIT_PRICES.setup_fee} TL'dir.` },
  { q: "Kurulum süresi ne kadar?", a: "Etkinlik büyüklüğüne göre 2 ile 6 saat arasında değişmektedir." },
  { q: "Zemin bozuksa kurulum yapılır mı?", a: "Evet, teleskopik ayak sistemimiz sayesinde bozuk zeminlerde bile terazisinde kurulum yapıyoruz." }
];

/* ================== BİLEŞENLER ================== */
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => <div className="h-96 w-full bg-gray-100 animate-pulse rounded-3xl" />
});
const PriceEstimatorPodyum = dynamic(() => import("@/components/PriceEstimatorPodyum"), {
  loading: () => <div className="h-80 w-full bg-gray-50 animate-pulse rounded-3xl" />
});

export const metadata = {
  title: "Podyum Kiralama | Sahneva",
  description: "Modüler podyum ve sahne kiralama hizmetleri. Güncel fiyatlar, teknik özellikler ve paket seçenekleri.",
  alternates: { canonical: `${ORIGIN}/podyum-kiralama` },
};

/* ================== GELİŞMİŞ JSON-LD OLUŞTURUCU ================== */
function StructuredData() {
  // 1. Organizasyon Şeması
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${ORIGIN}#org`,
    name: "Sahneva",
    url: ORIGIN,
    logo: { "@type": "ImageObject", url: `${ORIGIN}/img/logo.png` }
  };

  // 2. Breadcrumb Şeması
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Podyum Kiralama", item: `${ORIGIN}/podyum-kiralama` }
    ]
  };

  // 3. Ürün (Product) Şeması - OTOMATİK FİYAT GÜNCELLEMELİ
  // Her paketi ayrı bir "Ürün" olarak sunuyoruz. Google bunu sever.
  const productSchemas = PACKAGES.map(pkg => {
    const prices = calculatePackagePrice(pkg.layout);
    return {
      "@type": "Product",
      name: pkg.name,
      description: pkg.description,
      image: pkg.image ? `${ORIGIN}${pkg.image}` : [`${ORIGIN}/img/podyum/hero.webp`],
      sku: pkg.id,
      brand: { "@type": "Brand", name: "Sahneva" },
      offers: {
        "@type": "Offer",
        url: `${ORIGIN}/podyum-kiralama#${pkg.id}`,
        priceCurrency: UNIT_PRICES.currency,
        price: prices.total, // Hesaplanan güncel fiyat buraya otomatik gelir
        priceValidUntil: "2025-12-31",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition"
      }
    };
  });

  // 4. Makale (Article) Şeması
  // Sayfadaki uzun metinleri "TechArticle" veya "Article" olarak işaretleriz.
  const articleSchema = {
    "@type": "Article",
    headline: "Profesyonel Podyum Kiralama Rehberi ve Fiyatları",
    image: [`${ORIGIN}/img/podyum/hero.webp`],
    author: { "@type": "Organization", name: "Sahneva Teknik Ekibi" },
    publisher: { "@id": `${ORIGIN}#org` },
    datePublished: "2023-01-01",
    dateModified: new Date().toISOString().split('T')[0], // Her build'de güncel tarih
    description: metadata.description
  };

  // 5. FAQ Şeması
  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  const finalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      breadcrumbSchema,
      ...productSchemas, // Tüm ürünleri diziye yayıyoruz
      articleSchema,
      faqSchema
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
    />
  );
}

/* ================== SAYFA GÖVDE BİLEŞENLERİ ================== */

function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-[70vh] bg-slate-900 overflow-hidden">
      <Image src="/img/podyum/hero.webp" alt="Podyum Kiralama" fill className="object-cover opacity-50" priority />
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Podyum Kiralama & Kurulum</h1>
        <p className="text-xl max-w-2xl mx-auto">Güvenli, modüler ve profesyonel sahne sistemleri.</p>
      </div>
    </section>
  );
}

function PackagesSection() {
  const formatPrice = (p) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(p);

  return (
    <section id="paketler" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Güncel Paket Fiyatları</h2>
          <p className="text-slate-600">İhtiyacınıza en uygun hazır paket çözümlerimiz.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => {
            // Fiyatı burada hesaplıyoruz. JSON-LD ile aynı fonksiyonu kullanıyor.
            const prices = calculatePackagePrice(pkg.layout);

            return (
              <div key={pkg.id} id={pkg.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col hover:scale-105 transition-transform duration-300">
                <div className="bg-blue-600 p-4 text-white text-center">
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <div className="text-sm opacity-90">{pkg.layout.area} m² Alan • {pkg.height} Yükseklik</div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Tahmini Anahtar Teslim</span>
                    <div className="text-3xl font-black text-slate-800 my-2">{formatPrice(prices.total)}</div>
                    <div className="text-xs text-green-600 font-medium">Kurulum & Nakliye Dahil</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-blue-500">✓</span> {item}
                      </li>
                    ))}
                  </ul>

                  <Link href={WHATSAPP_URL} className="block w-full py-3 bg-slate-900 text-white text-center rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Hemen Kirala
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-sm text-gray-500">* Fiyatlarımıza KDV dahil değildir. İstanbul Avrupa yakası kurulumları baz alınmıştır.</p>
        </div>
      </div>
    </section>
  );
}

function ArticleContent() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl prose prose-lg prose-headings:font-black prose-a:text-blue-600">
        <h2>Profesyonel Podyum Kiralama Hizmetleri</h2>
        <p>
          Etkinlik sektöründe <strong>podyum güvenliği</strong> ve estetiği en önemli unsurdur. 
          Sahneva olarak kullandığımız modüler sistemler, TÜV sertifikalı ve uluslararası güvenlik standartlarına uygundur.
        </p>
        <h3>Kullandığımız Malzemeler ve Teknik Detaylar</h3>
        <p>
          Zemin panellerimiz <strong>suya dayanıklı (marine plywood)</strong> malzemeden üretilmiştir ve kaymaz yüzeye sahiptir.
          Alüminyum çerçeve sistemi sayesinde hem hafif hem de tonlarca yükü taşıyabilecek kapasitededir.
        </p>
        <ul>
          <li><strong>Yük Kapasitesi:</strong> 750kg/m²</li>
          <li><strong>Panel Ölçüleri:</strong> 1x1m ve 2x1m standart paneller</li>
          <li><strong>Yükseklik Ayarı:</strong> 20cm'den 150cm'ye kadar ayarlanabilir teleskopik ayaklar</li>
        </ul>
        <p>
          Daha fazla teknik detay ve özel projeleriniz için <Link href="/iletisim">bizimle iletişime geçebilirsiniz.</Link>
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-black text-center mb-10">Sıkça Sorulan Sorular</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="bg-white p-6 rounded-2xl shadow-sm cursor-pointer group">
              <summary className="font-bold list-none flex justify-between items-center">
                {item.q}
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== SAYFA ÇIKTISI ================== */
export default function Page() {
  return (
    <>
      <StructuredData /> {/* Tüm SEO zekası burada */}
      <HeroSection />
      <PackagesSection /> {/* Fiyatlar buradan yönetiliyor */}
      <div className="container mx-auto px-4 py-10">
        <PriceEstimatorPodyum unitPrices={UNIT_PRICES} /> {/* Hesaplayıcı da aynı veriyi kullanıyor */}
      </div>
      <CaseGallery images={["/img/podyum/1.webp", "/img/podyum/2.webp"]} visibleCount={4} />
      <ArticleContent />
      <FAQSection />
    </>
  );
}
