// app/blog/kurumsal-etkinlik-yonetimi/page.jsx
import Image from "next/image";
import Link from "next/link";

/* ================== META DATA ================== */
export const metadata = {
  title: "Kurumsal Etkinlik Yönetimi ve Teknik Kiralama Rehberi | Sahneva",
  description: "Kurumsal organizasyonlarınızda kusursuz bir akış için sahne, podyum, LED ekran, ses-ışık ve çadır kiralama rehberi. Lansman, bayi toplantısı ve şirket etkinlikleri için profesyonel etkinlik yönetimi ipuçları.",
  openGraph: {
    title: "Kurumsal Etkinlik Yönetimi: Teknik Kiralama Rehberi",
    description: "Lansman, bayi toplantısı ve şirket etkinlikleri için sahne, LED ekran, ses-ışık ve çadır kiralama odaklı profesyonel teknik çözüm rehberi.",
    url: "https://www.sahneva.com/blog/kurumsal-etkinlik-yonetimi",
    type: "article",
    images: [
      {
        url: "https://www.sahneva.com/img/blog/kurumsal-etkinlik-hero.webp",
        width: 1200,
        height: 630,
        alt: "Kurumsal etkinlik sahne ve LED ekran kurulumu",
      },
    ],
  },
  keywords: "kurumsal etkinlik yönetimi, sahne kiralama, LED ekran kiralama, ses ışık sistemi, çadır kiralama, organizasyon",
  authors: [{ name: "Sahneva" }],
  publisher: "Sahneva",
};

/* ================== FAQ VERİLERİ ================== */
const FAQ_ITEMS = [
  {
    question: "Kurumsal bir etkinlik için teknik planlamaya ne kadar önce başlanmalı?",
    answer: "İdeal olarak en az 2–3 ay önce planlamaya başlanmalıdır. Mekan keşfi, sahne ve LED ekran ölçülerinin belirlenmesi, ses-ışık ihtiyacının hesaplanması ve yedek planların oluşturulması için yeterli zamana sahip olmak, hem bütçe sapmalarını azaltır hem de son dakika sorunlarını minimuma indirir.",
  },
  {
    question: "Kurumsal etkinliklerde minimum hangi teknik ekipmanlar olmalı?",
    answer: "Etkinliğin türüne göre değişmekle birlikte, temel ihtiyaçlar genellikle sahne veya podyum, ses sistemi (hoparlörler, mikrofonlar, mikser), görsel sunum için LED ekran veya projeksiyon, sahne aydınlatması ve gerektiğinde çadır ve iklimlendirme sistemleridir. Katılımcı sayısı ve mekan büyüklüğü arttıkça bu altyapı ölçeklenmelidir.",
  },
  {
    question: "LED ekran mı yoksa projeksiyon mu tercih etmeliyim?",
    answer: "Aydınlık salonlarda, büyük ölçekli ve prestij amaçlı kurumsal etkinliklerde çoğunlukla LED ekran tercih edilir çünkü yüksek parlaklık ve kontrast sunar. Küçük ölçekli, ışığı kontrol edilebilen salonlarda ve bütçe odaklı etkinliklerde projeksiyon hâlâ kullanılabilir. Ancak marka algısı ve görsel kalite ön plandaysa LED ekran güçlü bir avantaj sağlar.",
  },
  {
    question: "Dış mekanda yapılan kurumsal etkinliklerde çadır kullanmak şart mı?",
    answer: "Şart değildir ancak hava koşullarına bağlı riskleri düşürmek için şiddetle tavsiye edilir. Güneş, rüzgâr veya ani yağmur; misafir konforunu ve ekipmanın güvenliğini etkileyebilir. Profesyonel çadır sistemleri; zemin kaplama, aydınlatma ve ısıtma/soğutma ile birleştiğinde dış mekan etkinliklerini çok daha güvenli ve konforlu hale getirir.",
  },
  {
    question: "Sahneva kurumsal etkinlikler için hangi teknik hizmetleri tek elden sunuyor?",
    answer: "Sahneva; sahne ve podyum kurulumundan LED ekranlara, ses-ışık sistemlerinden truss ve rigging altyapısına, çadır ve zemin kaplamadan jeneratör ve teknik ekip desteğine kadar kurumsal etkinliklerin teknik ayağını anahtar teslim olarak üstlenir. Böylece siz içerik ve misafir deneyimine odaklanırken, tüm teknik süreç tek elden yönetilir.",
  },
];

/* ================== BREADCRUMB SCHEMA ================== */
function BreadcrumbSchema() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://www.sahneva.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.sahneva.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Kurumsal Etkinlik Yönetimi",
        "item": "https://www.sahneva.com/blog/kurumsal-etkinlik-yonetimi"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

/* ================== JSON-LD ================== */
function ArticleSchema() {
  const article = {
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.sahneva.com/blog/kurumsal-etkinlik-yonetimi",
    },
    headline: "Kurumsal Etkinlik Yönetimi: Kusursuz Organizasyon İçin Teknik Rehber",
    image: "https://www.sahneva.com/img/blog/kurumsal-etkinlik-hero.webp",
    author: {
      "@type": "Organization",
      "@id": "https://www.sahneva.com/#org",
      name: "Sahneva",
      url: "https://www.sahneva.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Sahneva",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sahneva.com/img/logo.png",
      },
    },
    datePublished: "2024-05-20",
    dateModified: new Date().toISOString().split("T")[0],
    articleSection: "Kurumsal Etkinlik Yönetimi",
    keywords: [
      "kurumsal etkinlik yönetimi",
      "kurumsal organizasyon",
      "sahne kiralama",
      "podyum kiralama",
      "LED ekran kiralama",
      "ses ışık sistemi kiralama",
      "çadır kiralama",
    ],
    description: metadata.description,
  };

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [article, faqSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ================== INTERACTIVE BUTTONS COMPONENT ================== */
'use client';

function InteractiveButtons({ location = "blog" }) {
  const handleClick = (action, type) => {
    // Analytics tracking - bu kısım client tarafında çalışacak
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: type,
        event_label: `${location}_${action}`,
        value: 1
      });
    }
    console.log(`Tracked: ${type} - ${action} from ${location}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href="https://wa.me/905453048671"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick('whatsapp', 'conversion')}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <span>📱</span>
        WhatsApp
      </a>
      <a
        href="tel:+905453048671"
        onClick={() => handleClick('phone', 'conversion')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all border border-blue-700 flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <span>📞</span>
        Hemen Ara
      </a>
      <Link
        href="/kurumsal-organizasyon"
        onClick={() => handleClick('solutions', 'navigation')}
        className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-6 rounded-xl transition-all border border-blue-200 flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <span>🎯</span>
        Çözümlerimiz
      </Link>
    </div>
  );
}

/* ================== SIDEBAR CTA COMPONENT ================== */
'use client';

function SidebarCTA() {
  const handleClick = (action) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'sidebar_cta',
        event_label: action,
        value: 1
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-6 text-white shadow-xl text-center">
        <h3 className="text-xl font-bold mb-3">
          Etkinliğinizi Birlikte Planlayalım
        </h3>
        <p className="text-blue-100 mb-4 text-sm">
          Kurumsal organizasyonlarınız için ücretsiz keşif ve projelendirme.
        </p>
        <a
          href="https://wa.me/905453048671"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick('whatsapp')}
          className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 mb-2 text-sm"
        >
          WhatsApp'tan Yazın
        </a>
        <Link
          href="/iletisim"
          onClick={() => handleClick('contact')}
          className="block w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all border border-white/20 text-sm"
        >
          Hemen Teklif Alın
        </Link>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
        <h4 className="font-bold text-orange-900 mb-2 text-sm">
          📥 Ücretsiz İndirin
        </h4>
        <p className="text-orange-800 text-xs mb-3">
          "Kurumsal Etkinlik Teknik Planlama Checklist" PDF
        </p>
        <button 
          onClick={() => handleClick('download_checklist')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl transition-all text-sm"
        >
          Checklist'i İndir
        </button>
      </div>
    </div>
  );
}

/* ================== BREADCRUMB COMPONENT ================== */
function Breadcrumb() {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-4" aria-label="Breadcrumb">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              Ana Sayfa
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/blog" className="text-gray-500 hover:text-blue-600 transition-colors">
              Blog
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium" aria-current="page">
            Kurumsal Etkinlik Yönetimi
          </li>
        </ol>
      </div>
    </nav>
  );
}

/* ================== SAYFA BİLEŞENİ ================== */
export default function BlogPostCorporate() {
  return (
    <>
      <ArticleSchema />
      <BreadcrumbSchema />

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/blog/kurumsal-etkinlik-hero.webp"
            alt="Kurumsal etkinlik sahnesi ve LED ekran kurulumu"
            fill
            className="object-cover opacity-40"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400 text-blue-300 text-sm font-semibold mb-4">
            Kurumsal Rehber
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6">
            Kurumsal Etkinlik <span className="block md:inline">Yönetimi:</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300 text-2xl md:text-5xl lg:text-6xl">
              Teknik Kiralama Rehberi
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-4 md:mb-6">
            Lansman, bayi toplantısı, gala ve şirket içi etkinliklerde; markanızın
            prestijini yansıtacak sahne, görüntü ve ses sistemleri kurgusunu nasıl
            planlamalısınız?
          </p>
          
          {/* Okuma süresi göstergesi */}
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-300">
            <span className="flex items-center gap-1 md:gap-2">
              <span>⏱️</span>
              <span>8 dakika okuma</span>
            </span>
            <span className="flex items-center gap-1 md:gap-2">
              <span>📅</span>
              <span>20 Mayıs 2024</span>
            </span>
          </div>
        </div>
      </section>

      {/* İstatistikler Bölümü */}
      <section className="bg-white py-8 md:py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-blue-600">92%</div>
              <div className="text-xs md:text-sm text-gray-600">Teknik sorun yaşayan etkinlikler</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-blue-600">3x</div>
              <div className="text-xs md:text-sm text-gray-600">ROI artışı</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-blue-600">40%</div>
              <div className="text-xs md:text-sm text-gray-600">Maliyet fazlası</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-blue-600">15dk</div>
              <div className="text-xs md:text-sm text-gray-600">Ortalama aksama</div>
            </div>
          </div>
        </div>
      </section>

      {/* İçerik Gövdesi */}
      <div className="bg-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
            {/* Sol Kolon: Makale */}
            <article className="lg:w-2/3 prose prose-sm md:prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-p:text-gray-700 prose-li:text-gray-700">
              
              <p className="lead text-lg md:text-xl text-gray-600 font-medium">
                Kurumsal etkinlikler, bir şirketin vizyonunu, profesyonelliğini ve
                kalitesini misafirlerine, iş ortaklarına ve çalışanlarına aynı anda
                gösterdiği en güçlü sahnelerdir.
              </p>

              <div className="my-6 md:my-8 bg-blue-50 border-l-4 border-blue-600 p-4 md:p-6 rounded-r-xl">
                <h4 className="text-blue-900 mt-0 text-base md:text-lg">Profesyonel İpucu</h4>
                <p className="mb-2 text-blue-800 text-sm md:text-base">
                  Etkinlik planlamasına ideal olarak <strong>en az 2–3 ay
                  önceden</strong> başlamak:
                </p>
                <ul className="text-blue-800 list-disc pl-4 md:pl-5 space-y-1 text-sm md:text-base">
                  <li>Bütçe sapmalarını %20 azaltır</li>
                  <li>Sürpriz problemlerin önüne geçer</li>
                  <li>Yedek plan oluşturmanıza imkan tanır</li>
                </ul>
              </div>

              {/* 1. Bölüm: Sahne ve Podyum */}
              <h2 className="text-xl md:text-2xl">1. Odak Noktasını Tasarlamak: Sahne ve Podyum Kurulumu</h2>
              <p>
                Her etkinliğin bir kalbi vardır ve bu kalp sahnedir. Konuşmacıların,
                protokolün veya sanatçıların yer aldığı alan; salonun her noktasından
                görülebilir, güvenli ve estetik olmalıdır.
              </p>

              {/* 2. Bölüm: Görüntü Teknolojileri */}
              <h2 className="text-xl md:text-2xl">2. Etkiyi Büyütmek: LED Ekran ve Görsel Sunum Teknolojileri</h2>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 my-4 md:my-6">
                <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">📊 LED Ekran Teknik Karşılaştırması</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 md:p-3">Piksel Aralığı</th>
                        <th className="p-2 md:p-3">İzleme Mesafesi</th>
                        <th className="p-2 md:p-3">Mekan</th>
                        <th className="p-2 md:p-3">Maliyet</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 md:p-3 font-medium">P2.9</td>
                        <td className="p-2 md:p-3">3m+</td>
                        <td className="p-2 md:p-3">İç Mekan</td>
                        <td className="p-2 md:p-3">$$$</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 md:p-3 font-medium">P3.9</td>
                        <td className="p-2 md:p-3">4m+</td>
                        <td className="p-2 md:p-3">İç Mekan</td>
                        <td className="p-2 md:p-3">$$</td>
                      </tr>
                      <tr>
                        <td className="p-2 md:p-3 font-medium">P4.8</td>
                        <td className="p-2 md:p-3">5m+</td>
                        <td className="p-2 md:p-3">Her İkisi</td>
                        <td className="p-2 md:p-3">$</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vaka Çalışması */}
              <h3 className="text-lg md:text-xl">Gerçek Bir Vaka: XYZ Şirketi Ürün Lansmanı</h3>

              <div className="bg-gray-50 rounded-xl p-4 md:p-6 my-4 md:my-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3">🎯 Senaryo</h4>
                    <ul className="space-y-1 md:space-y-2 text-gray-700 text-sm md:text-base">
                      <li>• 500 kişilik lansman etkinliği</li>
                      <li>• 4K video gösterimi ve canlı demo</li>
                      <li>• Dış mekan + kapalı alan kombinasyonu</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3">⚡ Çözümümüz</h4>
                    <ul className="space-y-1 md:space-y-2 text-gray-700 text-sm md:text-base">
                      <li>• 24m² P2.9 LED ekran + yedek sistem</li>
                      <li>• 8x12m sahne + 16 kanallı ses sistemi</li>
                      <li>• 2 adet 10x15m çadır + iklimlendirme</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 md:mt-4 p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-1 md:mb-2 text-sm md:text-base">📈 Sonuç</h5>
                  <p className="text-green-700 text-sm md:text-base">
                    "Sıfır teknik aksama ile 4 saatlik kusursuz program. 
                    Basında 15+ organik haber ve %34 daha yüksek katılımcı memnuniyeti."
                  </p>
                </div>
              </div>

              {/* Müşteri Yorumları */}
              <h2 className="text-xl md:text-2xl">Kurumsal Etkinlik Yöneticileri Ne Diyor?</h2>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6 my-6 md:my-8">
                <div className="bg-white border border-blue-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                      <span className="text-blue-600 font-bold text-sm md:text-base">AŞ</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm md:text-base">Ahmet Şen</div>
                      <div className="text-xs md:text-sm text-gray-500">Kurumsal İletişim Müdürü</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm md:text-base">
                    "500 kişilik lansmanımızda Sahneva'nın teknik ekibi sayesinde hiç stres yaşamadık."
                  </p>
                </div>

                <div className="bg-white border border-purple-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                      <span className="text-purple-600 font-bold text-sm md:text-base">EY</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm md:text-base">Elif Yılmaz</div>
                      <div className="text-xs md:text-sm text-gray-500">Etkinlik Koordinatörü</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm md:text-base">
                    "LED ekran kalitesi ve ses sistemi misafirlerimizden tam not aldı."
                  </p>
                </div>
              </div>

              {/* Bütçe Planlama */}
              <h2 className="text-xl md:text-2xl">6. Gerçekçi Bütçe Planlaması için Kılavuz</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6 my-4 md:my-6">
                <h4 className="font-bold text-yellow-800 mb-3 text-base md:text-lg">💰 Bütçe Dağılımı (Ortalama)</h4>
                <div className="space-y-3">
                  {[
                    { label: "Ses ve Işık Sistemleri", percent: "38%", width: "38%" },
                    { label: "Görsel Ekipman (LED Ekran vb.)", percent: "28%", width: "28%" },
                    { label: "Sahne ve Altyapı", percent: "23%", width: "23%" },
                    { label: "Yedek Sistemler & Personel", percent: "13%", width: "13%" }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{item.label}</span>
                        <span className="font-semibold">{item.percent}</span>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: item.width }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teknoloji Trendleri */}
              <h2 className="text-xl md:text-2xl">Yükselen Trendler: 2024 Kurumsal Etkinlik Teknolojileri</h2>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6 my-6 md:my-8">
                <div className="bg-white border border-green-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xl md:text-2xl mr-3">🤖</span>
                    <h4 className="font-bold text-base md:text-lg">AR (Artırılmış Gerçeklik)</h4>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Ürün lansmanlarında fiziksel mekan sınırlarını aşmak için AR destekli 
                    LED ekran çözümleri.
                  </p>
                </div>

                <div className="bg-white border border-blue-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xl md:text-2xl mr-3">🌐</span>
                    <h4 className="font-bold text-base md:text-lg">Hibrit Etkinlik Sistemleri</h4>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Hem fiziksel hem online katılım için entegre ses/ışık/görüntü sistemleri.
                  </p>
                </div>
              </div>

              {/* FAQ BÖLÜMÜ */}
              <h2 className="text-xl md:text-2xl">Sık Sorulan Sorular</h2>
              <div className="not-prose space-y-3 md:space-y-4 mt-4">
                {FAQ_ITEMS.map((item, index) => (
                  <details
                    key={item.question}
                    className="group border border-gray-200 rounded-xl p-3 md:p-4 hover:border-blue-500 transition-colors"
                    role="region"
                    aria-labelledby={`faq-heading-${index}`}
                  >
                    <summary 
                      id={`faq-heading-${index}`}
                      className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between gap-2 text-sm md:text-base"
                    >
                      <span className="text-left">{item.question}</span>
                      <span className="text-sm text-gray-400 group-open:hidden flex-shrink-0 ml-2">
                        +
                      </span>
                      <span className="text-sm text-gray-400 hidden group-open:inline flex-shrink-0 ml-2">
                        −
                      </span>
                    </summary>
                    <p className="mt-2 md:mt-3 text-gray-700 text-sm md:text-base">{item.answer}</p>
                  </details>
                ))}
              </div>

              {/* Güçlü Sonuç CTA */}
              <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl md:rounded-2xl p-6 md:p-8 my-8 md:my-12 border border-blue-100">
                <div className="text-center">
                  <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                    Etkinliğiniz İçin Harekete Geçin
                  </h3>
                  <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-lg max-w-2xl mx-auto">
                    Profesyonel kurumsal etkinlik çözümlerimizle markanızı en iyi şekilde temsil edelim.
                  </p>
                  <InteractiveButtons location="blog_content_end" />
                </div>
              </section>

              <h3 className="text-lg md:text-xl">Sonuç: Bütünleşik Çözüm Ortağı ile Çalışmanın Gücü</h3>
              <p>
                Başarılı bir kurumsal etkinlik, tüm bu parçaların (sahne, podyum,
                LED ekran, ses, ışık, çadır ve altyapı) bir orkestra gibi uyum içinde
                çalışmasıyla mümkündür.
              </p>
            </article>

            {/* Sağ Kolon: Sticky Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                <SidebarCTA />

                {/* Hızlı Hizmet Menüsü */}
                <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">
                    İlgili Hizmetler
                  </h4>
                  <ul className="space-y-2 md:space-y-3">
                    {[
                      { href: "/kurumsal-organizasyon", icon: "🏢", label: "Kurumsal Organizasyon", color: "blue" },
                      { href: "/led-ekran-kiralama", icon: "🖥️", label: "LED Ekran Kiralama", color: "purple" },
                      { href: "/ses-isik-sistemleri", icon: "🎵", label: "Ses & Işık Sistemleri", color: "yellow" },
                      { href: "/cadir-kiralama", icon: "⛺", label: "Çadır Kiralama", color: "emerald" }
                    ].map((service, index) => (
                      <li key={index}>
                        <Link
                          href={service.href}
                          className="flex items-center gap-2 md:gap-3 text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-white rounded-lg group text-sm md:text-base"
                        >
                          <span className={`bg-${service.color}-100 text-${service.color}-600 p-1 md:p-2 rounded-lg group-hover:bg-${service.color}-600 group-hover:text-white transition-all text-xs md:text-base`}>
                            {service.icon}
                          </span>
                          <span className="font-medium">{service.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
