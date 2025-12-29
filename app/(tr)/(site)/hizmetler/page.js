// app/hizmetler/page.js
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BASE_SITE_URL, ORGANIZATION_ID } from "@/lib/seo/schemaIds";

/* ───── META & ISR ───── */
export const metadata = {
  title: "Hizmetlerimiz | Sahneva - Profesyonel Etkinlik Ekipmanları Kiralama",
  description: "Profesyonel sahne kiralama, LED ekran, ses-ışık sistemleri, podyum, çadır kiralama ve etkinlik prodüksiyon hizmetleri. Türkiye geneli hızlı kurulum.",
  alternates: { canonical: `${BASE_SITE_URL}/hizmetler` },
  openGraph: {
    title: "Hizmetlerimiz | Sahneva Organizasyon - Profesyonel Etkinlik Çözümleri",
    description: "Sahne, LED ekran, ses-ışık, podyum, çadır kiralama ve komple etkinlik prodüksiyon hizmetleri. Türkiye genelinde profesyonel çözümler.",
    url: `${BASE_SITE_URL}/hizmetler`,
    images: [
      {
        url: `${BASE_SITE_URL}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli"
      }
    ],
    type: "website",
    locale: "tr_TR",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;
const SITE_URL = BASE_SITE_URL;

/* ───── STRUCTURED DATA ───── */
function ServicesStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Sahneva Hizmetler',
    'description': 'Profesyonel sahne kiralama, LED ekran, ses-ışık sistemleri, podyum, çadır kiralama ve etkinlik prodüksiyon hizmetleri',
    'image': `${SITE_URL}/img/og/sahneva-og.webp`,
    'provider': { '@id': ORGANIZATION_ID },
    'areaServed': 'TR',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Etkinlik Ekipmanları Kiralama Hizmetleri',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Sahne Kiralama',
            'description': 'Profesyonel sahne kurulumu ve kiralama hizmetleri'
          },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'priceCurrency': 'TRY',
            'minPrice': '10000.00',
            'maxPrice': '200000.00'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'LED Ekran Kiralama',
            'description': 'Yüksek çözünürlüklü LED ekran kiralama hizmetleri'
          },
          'priceSpecification': {
            '@type': 'UnitPriceSpecification',
            'price': '1700.00',
            'priceCurrency': 'TRY',
            'unitText': 'günlük'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Ses ve Işık Sistemleri',
            'description': 'Profesyonel ses ve ışık sistemi kiralama hizmetleri'
          },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'priceCurrency': 'TRY',
            'minPrice': '10000.00',
            'maxPrice': '300000.00'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Podyum Kiralama',
            'description': 'Modüler podyum sahne çözümleri'
          },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'priceCurrency': 'TRY',
            'minPrice': '250.00',
            'maxPrice': '100000.00'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': { '@type': 'Service', 'name': 'Çadır Kiralama' },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'priceCurrency': 'TRY',
            'minPrice': '6000.00',
            'maxPrice': '800000.00'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': { '@type': 'Service', 'name': 'Sandalye Kiralama' },
          'priceSpecification': {
            '@type': 'UnitPriceSpecification',
            'price': '200.00',
            'priceCurrency': 'TRY',
            'unitText': 'adet'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': { '@type': 'Service', 'name': 'Masa Kiralama' },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'priceCurrency': 'TRY',
            'minPrice': '1000.00',
            'maxPrice': '2000.00'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': { '@type': 'Service', 'name': 'İstanbul İçi Nakliye' },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'priceCurrency': 'TRY',
            'price': '7000.00'
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ───── SERVICES TABS FALLBACK ───── */
function ServicesTabsFallback() {
  const services = [
    {
      title: "Sahne Kiralama",
      description: "Profesyonel truss sistemleri, modüler sahne çözümleri",
      items: [
        "3x3m, 6x4m, 8x4m, 10x6m ölçülerinde sahne sistemleri",
        "Alüminyum truss sistemleri ve güvenlik ekipmanları",
        "Modüler sigma podyum sistemleri (1x1m, 2x1m)",
        "Sahne dekorasyonu ve brandalama hizmetleri"
      ]
    },
    {
      title: "LED Ekran Kiralama", 
      description: "Yüksek çözünürlüklü indoor ve outdoor LED ekran çözümleri",
      items: [
        "P2.5, P3, P4, P5, P6 pixel pitch seçenekleri",
        "İç mekan ve dış mekan (IP65) LED ekranlar",
        "Kurulum, teknik operatör ve içerik yönetimi",
        "HD video processor ve kontrol sistemleri"
      ]
    },
    {
      title: "Ses Sistemleri",
      description: "Profesyonel ses sistemi kiralama ve kurulum hizmetleri",
      items: [
        "Line array ses sistemleri ve dijital mikserler",
        "Kablosuz mikrofon sistemleri (handheld, lapel)",
        "Ses teknisyeni ve operatör hizmetleri",
        "Ses testi ve akustik optimizasyon"
      ]
    },
    {
      title: "Işık Sistemleri",
      description: "Profesyonel ışıklandırma ve efekt sistemleri",
      items: [
        "Moving head, spot ve wash ışıklar",
        "Lazer, haze ve özel efekt makineleri",
        "DMX kontrol sistemleri ve operatör",
        "Işık programlama ve senkronizasyon"
      ]
    },
    {
      title: "Çadır Kiralama",
      description: "Etkinlik çadırları ve geçici yapı çözümleri",
      items: [
        "Pagoda, şeffaf ve endüstriyel çadır sistemleri",
        "3x3m, 6x3m, 9x3m, 9x6m, 12x6m ölçülerinde çadırlar",
        "Çadır ısıtma-soğutma ve aydınlatma sistemleri",
        "Zemin kaplama ve dekorasyon hizmetleri"
      ]
    },
    {
      title: "Masa Sandalye Kiralama",
      description: "Profesyonel masa ve sandalye kiralama hizmetleri",
      items: [
        "Banket masaları (yuvarlak, dikdörtgen)",
        "Konferans ve kokteyl sandalyeleri",
        "Masa örtüsü ve dekorasyon ürünleri",
        "Kurulum ve toplama hizmetleri"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {services.map((service, index) => (
        <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
          <h3 className="text-2xl font-black text-neutral-900 mb-4">{service.title}</h3>
          <p className="text-neutral-700 mb-6 text-lg">{service.description}</p>
          <ul className="grid md:grid-cols-2 gap-3">
            {service.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-center gap-3 text-neutral-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ───── MAIN COMPONENT ───── */
export default function ServicesPage() {
  const baseUrl = SITE_URL;
  const canonical = `${baseUrl}/hizmetler`;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "Hizmetler", url: canonical },
  ];

  const QUICK_ACCESS = [
    {
      href: "/sahne-kiralama",
      title: "Sahne Kiralama", 
      description: "Truss sistemleri, modüler sahne, profesyonel kurulum",
      icon: "🎪",
      color: "from-blue-500 to-cyan-500"
    },
    {
      href: "/podyum-kiralama",
      title: "Podyum Kiralama",
      description: "1×1 ve 2×1 modüler paneller, güvenli tasarım",
      icon: "📐",
      color: "from-purple-500 to-pink-500"
    },
    {
      href: "/led-ekran-kiralama",
      title: "LED Ekran Kiralama",
      description: "P2–P6 pixel pitch, iç/dış mekân çözümleri",
      icon: "🖥️",
      color: "from-green-500 to-emerald-500"
    },
    {
      href: "/ses-isik-sistemleri",
      title: "Ses & Işık Sistemleri",
      description: "Line array ses, robot ışık, DMX kontrol",
      icon: "🎵",
      color: "from-orange-500 to-red-500"
    },
    {
      href: "/cadir-kiralama", 
      title: "Çadır Kiralama",
      description: "Pagoda, şeffaf, endüstriyel çadır sistemleri",
      icon: "⛺",
      color: "from-teal-500 to-blue-500"
    },
    {
      href: "/masa-sandalye-kiralama",
      title: "Masa & Sandalye",
      description: "Banket, konferans, bistro tipi mobilyalar",
      icon: "🪑",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const SERVICE_FEATURES = [
    {
      icon: "⚡",
      title: "Aynı Gün Kurulum",
      description: "2-6 saat içinde profesyonel kurulum ve teslimat"
    },
    {
      icon: "🛡️",
      title: "Güvenlik Garantisi",
      description: "ISO standartlarında iş güvenliği ve kalite kontrol"
    },
    {
      icon: "💎", 
      title: "Premium Ekipman",
      description: "Son teknoloji, bakımlı ve yüksek kaliteli ekipmanlar"
    },
    {
      icon: "🌍",
      title: "Türkiye Geneli",
      description: "81 ilde teknik ekip ve lojistik altyapı"
    },
    {
      icon: "📞",
      title: "7/24 Destek",
      description: "Kesintisiz teknik destek ve danışmanlık"
    },
    {
      icon: "💰", 
      title: "Şeffaf Fiyat",
      description: "Detaylı teklif, gizli maliyet olmadan hizmet"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <ServicesStructuredData />

      {/* Skip to Main Content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[9999] focus:top-3 focus:left-3 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-3 focus:rounded-lg focus:font-semibold focus:shadow-lg transition-all duration-200"
      >
        Ana içeriğe atla
      </a>

      {/* ✅ HERO SECTION - Premium Design */}
      <section 
        className="relative min-h-[70vh] 2xl:min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-16 lg:pt-20"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0">
          <Image
            src="/img/hizmetler-hero.webp"
            alt="Sahneva Hizmetler - Profesyonel Etkinlik Ekipmanları ve Teknoloji Çözümleri"
            fill
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover object-center nc-HizmetlerPage-hero-1"
          />
        </div>

        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-purple-900/70"
          aria-hidden="true"
        />

        {/* ✅ BÜYÜK ARKA PLAN YAZISI */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5" aria-hidden="true">
          <span className="text-[120px] lg:text-[180px] font-black text-white tracking-wider select-none">
            HİZMETLER
          </span>
        </div>
        
        <div className="relative z-10 container text-center text-white">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">Türkiye Geneli Profesyonel Hizmet</span>
            </div>

            <h1
              id="hero-title"
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            >
              <span className="block">PROFESYONEL</span>
              <span className="gradient-text gradient-text--safe-xl">
                Hizmetlerimiz
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl 2xl:max-w-4xl mx-auto">
              Sahne, LED ekran, ses-ışık sistemlerinden komple etkinlik prodüksiyonuna kadar<br />
              <strong className="text-blue-300">tek çatı altında premium çözümler</strong>
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#hizmet-listesi"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                aria-label="Hizmetlerimizi inceleyin"
              >
                <span className="flex items-center gap-2">
                  Hizmetleri Keşfet
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </a>
              
              <a
                href="tel:+905453048671"
                className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                aria-label="Hemen ara - Detaylı bilgi için"
              >
                📞 Hemen Ara
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      <div id="main" className="relative">
        {/* ✅ HIZLI ERİŞİM KARTLARI */}
        <section className="py-20 bg-gradient-to-br from-white to-blue-50/50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Tüm <span className="gradient-text gradient-text--safe-xl">Hizmetlerimiz</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Etkinliğiniz için ihtiyaç duyduğunuz tüm ekipman ve hizmetleri tek noktadan temin edin
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {QUICK_ACCESS.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-neutral-100 hover:border-blue-200 transition-all duration-500 hover:scale-105"
                  aria-label={`${service.title} sayfasına git`}
                >
                  <div className="text-4xl mb-4 gradient-text gradient-text--safe-xl">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    <span>Detayları Gör</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ HİZMET ÖZELLİKLERİ */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-blue-100/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Neden <span className="gradient-text gradient-text--safe-xl">Sahneva?</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                10+ yıllık deneyimimiz ve uzman ekibimizle fark yaratıyoruz
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICE_FEATURES.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-neutral-100 hover:border-blue-200 transition-all duration-500 hover:scale-105 text-center"
                >
                  <div className="text-4xl mb-4 gradient-text gradient-text--safe-xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ DETAYLI HİZMET LİSTESİ */}
        <section id="hizmet-listesi" className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Komple <span className="gradient-text gradient-text--safe-xl">Etkinlik Çözümleri</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Sahne kurulumundan organizasyon yönetimine kadar tüm süreci profesyonelce yönetiyoruz
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"></div>
            </div>

            <ServicesTabsFallback />
          </div>
        </section>

        {/* ✅ EK HİZMETLER */}
        <section className="py-20 bg-gradient-to-br from-neutral-900 to-blue-900/95">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ek <span className="gradient-text gradient-text--safe-xl">Hizmetlerimiz</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Etkinliğinizin kusursuz geçmesi için ihtiyaç duyabileceğiniz tüm destek hizmetleri
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    Organizasyon & Prodüksiyon
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Etkinlik planlama ve yönetimi",
                      "Teknik prodüksiyon koordinasyonu",
                      "Sanatçı ve konuşmacı koordinasyonu",
                      "Sahne arkası ve yeşil oda hizmetleri",
                      "Güvenlik ve crowd management"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚚</span>
                    Lojistik & Destek Hizmetleri
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Ekipman taşıma ve kurulum",
                      "Teknik personel temini",
                      "Ulaşım ve konaklama organizasyonu",
                      "Catering ve ikram hizmetleri",
                      "Temizlik ve geri dönüşüm"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📸</span>
                    Medya & Görüntüleme
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Profesyonel fotoğraf çekimi",
                      "Video prodüksiyon ve canlı yayın",
                      "Drone çekim hizmetleri",
                      "Sosyal medya yönetimi",
                      "Basın ve halkla ilişkiler"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎨</span>
                    Tasarım & Dekorasyon
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Mekan tasarımı ve dekorasyon",
                      "Aydınlatma tasarımı",
                      "Marka ve grafik tasarım",
                      "Özel ahşap dekorasyon",
                      "Çiçek düzenleme ve peyzaj"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ CTA SECTION */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="container max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Hemen <span className="text-yellow-300">Teklif Alın</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Etkinliğiniz için en uygun çözümleri sunalım. 2 saat içinde detaylı teklif hazırlıyoruz.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <a
                href="tel:+905453048671"
                className="group bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="Hemen ara - Detaylı teklif için"
              >
                <span className="flex items-center justify-center gap-2">
                  📞 Hemen Ara
                </span>
              </a>

              <a
                href="https://wa.me/905453048671"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="WhatsApp'tan yaz - Hızlı teklif için (yeni sekmede açılır)"
              >
                <span className="flex items-center justify-center gap-2">
                  💬 WhatsApp
                </span>
              </a>

              <Link
                href="/iletisim"
                className="group bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl border-2 border-white transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="İletişim formu ile ulaşın"
              >
                <span className="flex items-center justify-center gap-2">
                  📧 E-posta
                </span>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
              <p className="text-white/90 text-sm">
                <strong>⏱️ 2 Saat İçinde Yanıt:</strong> Mesai saatleri içinde tüm taleplerinize 
                2 saat içinde detaylı teklif ve profesyonel danışmanlık sunuyoruz.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
