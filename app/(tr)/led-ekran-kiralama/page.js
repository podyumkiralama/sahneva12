import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Accordion from "@/components/accordion";

export const revalidate = 1800;

/* ================== Sabitler ================== */
const ORIGIN = "https://www.sahneva.com";
const PHONE = "+905453048671";
const WHATSAPP_BASE_URL = `https://wa.me/${PHONE.replace("+", "")}`;
const DEFAULT_WA_MESSAGE =
  "Merhaba, LED ekran kiralama için teklif istiyorum. Etkinlik türü: [konser/fuar/lansman], Tarih: [gg.aa.yyyy], Ekran boyutu: [xxx].";
const OG_IMAGE = "/img/og.jpg";

const buildWhatsappLink = (message = DEFAULT_WA_MESSAGE) =>
  `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;

const WHATSAPP = buildWhatsappLink();

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
  title: "LED Ekran Kiralama | Profesyonel Çözümler | Sahneva",
  description:
    "İç/dış mekan etkinlikler için yüksek çözünürlüklü LED ekran kiralama. P2-P6 piksel, 4K parlaklık.",
  alternates: {
    canonical: `${ORIGIN}/led-ekran-kiralama`,
    languages: {
      "tr-TR": `${ORIGIN}/led-ekran-kiralama`,
      en: `${ORIGIN}/en/led-screen-rental`,
      ar: `${ORIGIN}/ar/led-screen-rental`,
    },
  },
  openGraph: {
    title: "LED Ekran Kiralama | Profesyonel Çözümler",
    description:
      "P2-P6 piksel aralığında iç ve dış mekan LED ekran kiralama. Yüksek parlaklık, IP65 koruma ve profesyonel kurulum.",
    url: `${ORIGIN}/led-ekran-kiralama`,
    type: "website",
    siteName: "Sahneva",
    locale: "tr_TR",
    images: [
      {
        url: `${ORIGIN}${OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "Sahneva LED Ekran Kiralama - Profesyonel Görsel Çözümler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Ekran Kiralama | Profesyonel Çözümler | Sahneva",
    description:
      "P2-P6 piksel aralığı, 4K çözünürlük, yüksek parlaklık LED ekran kiralama. Konser, fuar ve kurumsal etkinlikler.",
    images: [`${ORIGIN}${OG_IMAGE}`],
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

/* ================== Görsel sabitleri ve veri kümeleri ================== */
const HERO = {
  src: "/img/hizmet-led-ekran.webp",
  alt: "Profesyonel LED ekran kurulumu - Konser sahnesinde büyük LED wall ve görsel şov",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🖥️",
    title: "İç Mekan LED Ekranlar",
    description:
      "P2.5-P3.9 piksel aralığı ile yüksek çözünürlüklü iç mekan çözümleri",
    features: [
      "P2.5-P3.9 piksel",
      "800-1500 nit parlaklık",
      "4K çözünürlük",
      "Hızlı kurulum",
    ],
  },
  {
    icon: "🌞",
    title: "Dış Mekan LED Ekranlar",
    description:
      "P4-P6 piksel aralığı ve yüksek parlaklık ile açık hava çözümleri",
    features: [
      "P4-P6 piksel",
      "5000-6500+ nit",
      "IP65 su geçirmez",
      "UV dayanıklı",
    ],
  },
  {
    icon: "🎬",
    title: "Video Wall Sistemleri",
    description: "Modüler yapıda esnek video wall ve kreatif ekran çözümleri",
    features: [
      "Modüler tasarım",
      "Esnek konfigürasyon",
      "Yüksek yenileme hızı",
      "Profesyonel kontrol",
    ],
  },
  {
    icon: "⚡",
    title: "Kontrol & Yayın Sistemleri",
    description: "Profesyonel video işleme, kontrol ve canlı yayın sistemleri",
    features: [
      "Novastar işlemciler",
      "4K scaler",
      "Medya sunucular",
      "Canlı yayın",
    ],
  },
  {
    icon: "🔧",
    title: "Kurulum & Rigging",
    description: "Profesyonel kurulum, truss sistemleri ve güvenlik çözümleri",
    features: [
      "Ground stack",
      "Truss rigging",
      "Güvenlik sistemleri",
      "Hızlı montaj",
    ],
  },
  {
    icon: "🎮",
    title: "Operatör & Teknik Destek",
    description: "Deneyimli operatörler ve 7/24 teknik destek hizmeti",
    features: [
      "Profesyonel operatör",
      "İçerik yönetimi",
      "7/24 teknik destek",
      "Acil müdahale",
    ],
  },
];

const animationDelayClasses = [
  "[animation-delay:0ms]",
  "[animation-delay:100ms]",
  "[animation-delay:200ms]",
  "[animation-delay:300ms]",
  "[animation-delay:400ms]",
  "[animation-delay:500ms]",
];

const USE_CASES = [
  {
    icon: "🎵",
    text: "Konser, festival ve sahne performansları",
    desc: "Ana sahne LED ekranları ve yan ekran çözümleri",
  },
  {
    icon: "💼",
    text: "Kurumsal lansman ve toplantılar",
    desc: "Profesyonel sunum ve marka gösterimi",
  },
  {
    icon: "🎪",
    text: "Fuar, sergi ve ticari etkinlikler",
    desc: "Stand tasarımı ve etkileşimli ekranlar",
  },
  {
    icon: "🏟️",
    text: "Spor etkinlikleri ve stadyumlar",
    desc: "Dev ekranlar ve skorboard sistemleri",
  },
  {
    icon: "🛍️",
    text: "AVM ve perakende mekanları",
    desc: "Reklam ve bilgilendirme ekranları",
  },
  {
    icon: "💒",
    text: "Düğün ve özel davetler",
    desc: "Fotoğraf/video gösterimi ve canlı yayın",
  },
];

const FAQ_ITEMS = [
  {
    q: "LED ekran kiralama süresi nedir?",
    a: "Etkinliğin süresine göre günlük, saatlik veya etkinlik bazlı kiralama yapılabilir.",
  },
  {
    q: "Kurulum ne kadar sürer?",
    a: "Standart sahne kurulumlarında LED ekran kurulumu genellikle 2–4 saat arasında tamamlanır.",
  },
  {
    q: "Dış mekanda kullanım için uygun mu?",
    a: "Yüksek parlaklık ve IP65 koruma sınıfına sahip kasalar sayesinde dış mekanda, gün ışığında bile net görüntü elde edilir.",
  },
  {
    q: "Teknik operatör sağlıyor musunuz?",
    a: "Tüm projelerde deneyimli LED ekran operatörü ve teknik ekip ile tam zamanlı destek sağlıyoruz.",
  },
  {
    q: "Kiralama fiyatları nasıl belirleniyor?",
    a: "Ekran boyutu, piksel aralığı, etkinlik süresi ve şehir bilgisine göre özel fiyatlandırma yapılır.",
  },
  {
    q: "İçerik hazırlığı konusunda destek veriyor musunuz?",
    a: "Mevcut içeriklerin uyarlanması ve temel içerik hazırlığı konusunda teknik yönlendirme ve destek sağlıyoruz.",
  },
];

const scrollMarginCSS = `
  [id] {
    scroll-margin-top: 6rem;
  }
`;

/* ================== HERO ================== */
function Hero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollMarginCSS }} />
      <section
        className="relative flex items-center justify-center overflow-hidden bg-slate-900 pt-16 min-h-[80vh]"
        aria-labelledby="hero-title"
      >
        <link rel="preload" as="image" href={HERO.src} />

        <div className="absolute inset-0">
          <Image
            src={HERO.src}
            alt={HERO.alt}
            fill
            priority
            className="object-cover"
            sizes={HERO.sizes}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            loading="eager"
            fetchPriority="high"
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
          <div
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30 mb-6"
            role="status"
          >
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              LED Ekran Kiralama
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light mb-4">
            Konser • Fuar • Lansman • Festival • Kurumsal Etkinlikler
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-normal mb-6">
            P2-P6 piksel aralığı, 4K çözünürlük ve yüksek parlaklık ile
            <span className="font-semibold text-white"> profesyonel görsel çözümler</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Link
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp üzerinden hemen teklif alın"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-500/50 shadow-lg"
              role="button"
              aria-label="WhatsApp üzerinden hemen teklif alın"
            >
              <span aria-hidden="true" className="text-xl mr-2">
                💬
              </span>
              <span className="text-base">Hemen Teklif Al</span>
            </Link>

            <a
              href="#hizmetler"
              title="Hizmetlerimiz hakkında daha fazla bilgi edinin"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white/95 bg-white/10 backdrop-blur-lg hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg cursor-pointer"
              role="button"
              aria-label="Hizmetlerimizi görüntüle"
            >
              <span aria-hidden="true" className="text-xl mr-2">
                🎯
              </span>
              <span className="text-base">Hizmetlerimiz</span>
            </a>
          </div>

          <div
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto"
            role="group"
            aria-label="Başarı istatistikleri"
          >
            {[
              { value: "4.9/5", label: "183+ Değerlendirme", icon: "⭐" },
              { value: "300+", label: "Proje", icon: "🏆" },
              { value: "81 İl", label: "Hizmet", icon: "🚀" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
              >
                <span className="text-2xl mb-2" aria-hidden="true">
                  {stat.icon}
                </span>
                <div className="text-xl font-black text-white">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            LED ekran kiralama hizmetlerimiz: teknik danışmanlık, kurulum,
            operasyon ve 7/24 destek
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service, index) => {
            const id = `svc-${index + 1}`;
            const delayClass = animationDelayClasses[index % animationDelayClasses.length];
            const serviceWhatsappLink = buildWhatsappLink(
              `Merhaba, ${service.title} hakkında detaylı bilgi ve fiyat almak istiyorum. Etkinlik tarihi: [gg.aa.yyyy], Şehir: [şehir].`
            );

            return (
              <article
                key={id}
                className={`bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 hover:scale-105 transition-all duration-500 h-full flex flex-col group ${delayClass}`}
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
                <ul
                  className="space-y-3 mb-8"
                  aria-label={`${service.title} özellikleri`}
                >
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
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
                <Link
                  href={serviceWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-semibold px-5 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition"
                  aria-label={`${service.title} için detaylı bilgi alın`}
                >
                  <span aria-hidden="true" className="text-lg mr-2">
                    ➜
                  </span>
                  Detaylı Bilgi Al
                </Link>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            role="button"
            aria-label="Detaylı teklif için WhatsApp üzerinden iletişime geçin"
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

/* ================== Kullanım Alanları ================== */
function UseCases() {
  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="kullanim-alanlari-baslik"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2
            id="kullanim-alanlari-baslik"
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            Geniş Kullanım Alanları
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Farklı sektörler için LED ekran çözümlerimizi keşfedin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.text}
              className="bg-gradient-to-br from-slate-50 to-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              aria-label={useCase.text}
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {useCase.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {useCase.text}
              </h3>
              <p className="text-gray-600">{useCase.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Galeri ================== */
const GALLERY_IMAGES = [
  {
    src: "/img/galeri/led-ekran-kiralama-1.webp",
    alt: "Konser sahnesinde kurulmuş büyük LED ekran, kalabalık önünde canlı performans gösterimi",
    width: 800,
    height: 600,
    priority: true,
  },
  {
    src: "/img/galeri/led-ekran-kiralama-2.webp",
    alt: "Kurumsal etkinlikte kullanılan LED ekran, sunum sırasında profesyonel aydınlatma ile aydınlatılmış",
    width: 800,
    height: 600,
    priority: true,
  },
  {
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "Açık hava festivalinde yüksek parlaklıklı LED ekran, gün ışığında net görüntü",
    width: 800,
    height: 600,
  },
  {
    src: "/img/galeri/led-ekran-kiralama-4.webp",
    alt: "Fuar standında kullanılan video wall sistemi, marka tanıtımı için optimize edilmiş",
    width: 800,
    height: 600,
  },
  {
    src: "/img/galeri/led-ekran-kiralama-5.webp",
    alt: "Stadyumda dev LED ekran, spor etkinliği sırasında canlı skor ve görüntüler",
    width: 800,
    height: 600,
  },
  {
    src: "/img/galeri/led-ekran-kiralama-6.webp",
    alt: "Düğün organizasyonunda LED ekran, canlı fotoğraf ve video gösterimi",
    width: 800,
    height: 600,
  },
  {
    src: "/img/galeri/led-ekran-kiralama-7.webp",
    alt: "TV stüdyosunda kullanılan profesyonel LED ekran, canlı yayın için optimize edilmiş",
    width: 800,
    height: 600,
  },
  {
    src: "/img/galeri/led-ekran-kiralama-8.webp",
    alt: "Alışveriş merkezinde reklam LED ekranı, yüksek trafikli alanda marka gösterimi",
    width: 800,
    height: 600,
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Galerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gerçekleştirdiğimiz başarılı LED ekran kurulumlarından örnekler
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery images={GALLERY_IMAGES} visibleCount={8} priorityCount={2} />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Daha fazla projemizi incelemek için galerimizi keşfedin
          </p>
          <Link
            href="/projeler"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            role="button"
            aria-label="Tüm projeleri görüntüle"
            prefetch={false}
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

/* ================== FAQ ================== */
function FAQ() {
  const accordionItems = FAQ_ITEMS.map((item, index) => ({
    ...item,
    id: `led-ekran-faq-${index + 1}`,
  }));

  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-b from-blue-50/50 to-white"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-black mb-4 text-gray-900"
          >
            Sık Sorulan Sorular
          </h2>
          <p className="text-lg text-gray-600">
            LED ekran kiralama süreci, teknik detaylar ve operasyon ile ilgili merak edilenler
          </p>
        </div>

        <Accordion items={accordionItems} />
      </div>
    </section>
  );
}

/* ================== CTA ================== */
function CTASection() {
  return (
    <section className="py-20 bg-white" aria-labelledby="cta-baslik">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-12 rounded-3xl text-center text-white shadow-xl overflow-hidden">
          <h2 id="cta-baslik" className="text-3xl md:text-4xl font-black mb-6">
            Profesyonel LED Ekran Çözümleri İçin Hazır Mısınız?
          </h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
            Ücretsiz keşif, hızlı kurulum ve 7/24 teknik destek ile Türkiye genelinde yanınızdayız.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-2xl bg-white text-blue-700 hover:scale-105 transition shadow-lg"
            >
              📞 Hemen Teklif Al
            </Link>
            <Link
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-2xl border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition shadow-lg"
            >
              💬 WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== JSON-LD ================== */
function JsonLd() {
  const pageUrl = `${ORIGIN}/led-ekran-kiralama`;
  const pageDescription = metadata.description;

  const providerRef = {
    "@id": `${ORIGIN}#org`,
  };

  const localBusinessNode = {
    "@type": "LocalBusiness",
    "@id": `${ORIGIN}#localbiz`,
    name: "Sahneva",
    url: ORIGIN,
  };

  const ratingNodeId = `${pageUrl}#rating`;

  const ratingNode = {
    "@type": "AggregateRating",
    "@id": ratingNodeId,
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "183",
    itemReviewed: {
      "@id": `${ORIGIN}#localbiz`,
    },
  };

  const serviceNode = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "LED Ekran Kiralama",
    description: pageDescription,
    serviceType: "LED Ekran Kiralama Hizmeti",
    url: pageUrl,
    provider: providerRef,
    areaServed: {
      "@type": "State",
      name: "Türkiye",
      description:
        "Türkiye'nin 81 ilinde profesyonel LED ekran kiralama hizmeti",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "TRY",
      lowPrice: "1800",
      highPrice: "28000",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
    aggregateRating: {
      "@id": ratingNodeId,
    },
  };

  const productNode = {
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    name: "İç ve Dış Mekan LED Ekran Kiralama",
    description:
      "P2-P6 piksel aralığı, 4K çözünürlük ve yüksek parlaklık sunan iç/dış mekan LED ekran kiralama hizmeti. Konser, fuar, festival ve kurumsal etkinlikler için profesyonel çözümler.",
    category: "EventLedScreenRental",
    image: `${ORIGIN}${OG_IMAGE}`,
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
      lowPrice: "1800",
      highPrice: "28000",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
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
        name: "LED Ekran Kiralama",
        item: pageUrl,
      },
    ],
  };

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
      url: `${ORIGIN}${OG_IMAGE}`,
      width: 1200,
      height: 630,
      caption: "Sahneva — Profesyonel LED Ekran Kiralama Hizmetleri",
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: providerRef,
  };

  const eventServiceSchema = {
    "@type": "EventService",
    "@id": `${pageUrl}#eventservice`,
    name: "Etkinlik LED Ekran Kiralama Hizmeti",
    description:
      "Konser, festival, fuar, kurumsal lansman ve özel etkinlikler için LED ekran çözümleri.",
    serviceType: USE_CASES.map((uc) => uc.text),
    provider: providerRef,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Türkiye",
    },
  };

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
        "Lansman etkinliğimizde kullanılan LED ekranlar çok parlak ve netti. Kurulum ve yayın süreci sorunsuz ilerledi.",
      datePublished: "2024-02-10",
    },
    {
      "@type": "Review",
      "@id": `${pageUrl}#review-2`,
      itemReviewed: { "@id": `${pageUrl}#product` },
      author: { "@type": "Person", name: "Etkinlik Ajansı" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody:
        "Açık hava festivalinde gün ışığında bile LED ekran parlaklığı çok iyiydi. Teknik ekip hızlı ve profesyoneldi.",
      datePublished: "2024-03-05",
    },
  ];

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: FAQ_ITEMS.map((item, index) => ({
      "@type": "Question",
      "@id": `${pageUrl}#faq-q${index + 1}`,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessNode,
      webpageSchema,
      breadcrumbSchema,
      serviceNode,
      productNode,
      eventServiceSchema,
      ratingNode,
      ...reviews,
      faqSchema,
    ],
  };

  return (
    <script
      id="ld-json-led-ekran"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Sayfa Bileşeni ================== */
export default function Page() {
  return (
    <main id="main">
      <JsonLd />
      <Hero />
      <Services />
      <UseCases />
      <Gallery />
      <FAQ />
      <CTASection />
    </main>
  );
}
