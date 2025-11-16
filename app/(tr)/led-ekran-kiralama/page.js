// app/(tr)/led-ekran-kiralama/page.js

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const slugify = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const WHATSAPP_PHONE = "+905453048671";

const SERVICES = [
  {
    icon: "🖥️",
    title: "İç Mekan LED Ekranlar",
    description: "P2.5-P3.9 piksel aralığı ile yüksek çözünürlüklü iç mekan çözümleri",
    features: ["P2.5-P3.9 piksel", "800-1500 nit parlaklık", "4K çözünürlük", "Hızlı kurulum"],
    cta: { label: "Detaylı Bilgi", href: "https://wa.me/905453048671?text=Merhaba%2C%20%C4%B0%C3%A7%20Mekan%20LED%20Ekranlar%20hizmeti%20icin%20detayli%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum.%20Etkinlik%20tarihi%3A%20%5Bgg.aa.yyyy%5D%2C%20mekan%3A%20%5Bic%2Fdis%5D%2C%20tahmini%20ekran%20olcusu%3A%20%5Bxx%20m2%5D" },
  },
  {
    icon: "🌞",
    title: "Dış Mekan LED Ekranlar",
    description: "P4-P6 piksel aralığı ve yüksek parlaklık ile açık hava çözümleri",
    features: ["P4-P6 piksel", "5000-6500+ nit", "IP65 su geçirmez", "UV dayanıklı"],
    cta: { label: "Teklif Al", href: "https://wa.me/905453048671?text=Merhaba%2C%20D%C4%B1%C5%9F%20Mekan%20LED%20Ekranlar%20hizmeti%20icin%20detayli%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum.%20Etkinlik%20tarihi%3A%20%5Bgg.aa.yyyy%5D%2C%20mekan%3A%20%5Bic%2Fdis%5D%2C%20tahmini%20ekran%20olcusu%3A%20%5Bxx%20m2%5D" },
  },
  {
    icon: "🎬",
    title: "Video Wall Sistemleri",
    description: "Modüler yapıda esnek video wall ve kreatif ekran çözümleri",
    features: ["Modüler tasarım", "Esnek konfigürasyon", "Yüksek yenileme hızı", "Profesyonel kontrol"],
    cta: { label: "Kreatif Çözüm Planla", href: "https://wa.me/905453048671?text=Merhaba%2C%20Video%20Wall%20Sistemleri%20hizmeti%20icin%20detayli%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum.%20Etkinlik%20tarihi%3A%20%5Bgg.aa.yyyy%5D%2C%20mekan%3A%20%5Bic%2Fdis%5D%2C%20tahmini%20ekran%20olcusu%3A%20%5Bxx%20m2%5D" },
  },
  {
    icon: "⚡",
    title: "Kontrol & Yayın Sistemleri",
    description: "Profesyonel video işleme, kontrol ve canlı yayın sistemleri",
    features: ["Novastar işlemciler", "4K scaler", "Medya sunucular", "Canlı yayın"],
    cta: { label: "Yayın Desteği", href: "https://wa.me/905453048671?text=Merhaba%2C%20Kontrol%20%26%20Yay%C4%B1n%20Sistemleri%20hizmeti%20icin%20detayli%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum.%20Etkinlik%20tarihi%3A%20%5Bgg.aa.yyyy%5D%2C%20mekan%3A%20%5Bic%2Fdis%5D%2C%20tahmini%20ekran%20olcusu%3A%20%5Bxx%20m2%5D" },
  },
  {
    icon: "🔧",
    title: "Kurulum & Rigging",
    description: "Profesyonel kurulum, truss sistemleri ve güvenlik çözümleri",
    features: ["Ground stack", "Truss rigging", "Güvenlik sistemleri", "Hızlı montaj"],
    cta: { label: "Kurulum Planı", href: "https://wa.me/905453048671?text=Merhaba%2C%20Kurulum%20%26%20Rigging%20hizmeti%20icin%20detayli%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum.%20Etkinlik%20tarihi%3A%20%5Bgg.aa.yyyy%5D%2C%20mekan%3A%20%5Bic%2Fdis%5D%2C%20tahmini%20ekran%20olcusu%3A%20%5Bxx%20m2%5D" },
  },
  {
    icon: "🎮",
    title: "Operatör & Teknik Destek",
    description: "Deneyimli operatörler ve 7/24 teknik destek hizmeti",
    features: ["Profesyonel operatör", "İçerik yönetimi", "7/24 teknik destek", "Acil müdahale"],
    cta: { label: "Operatör Talep Et", href: "https://wa.me/905453048671?text=Merhaba%2C%20Operat%C3%B6r%20%26%20Teknik%20Destek%20hizmeti%20icin%20detayli%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum.%20Etkinlik%20tarihi%3A%20%5Bgg.aa.yyyy%5D%2C%20mekan%3A%20%5Bic%2Fdis%5D%2C%20tahmini%20ekran%20olcusu%3A%20%5Bxx%20m2%5D" },
  },
];

const USE_CASES = [
  {
    icon: "🎵",
    text: "Konser, festival ve sahne performansları",
    desc: "Ana sahne LED ekranları ve yan ekran çözümleri"
  },
  {
    icon: "💼",
    text: "Kurumsal lansman ve toplantılar",
    desc: "Profesyonel sunum ve marka gösterimi"
  },
  {
    icon: "🎪",
    text: "Fuar, sergi ve ticari etkinlikler",
    desc: "Stand tasarımı ve etkileşimli ekranlar"
  },
  {
    icon: "🏟️",
    text: "Spor etkinlikleri ve stadyumlar",
    desc: "Dev ekranlar ve skorboard sistemleri"
  },
  {
    icon: "🛍️",
    text: "AVM ve perakende mekanları",
    desc: "Reklam ve bilgilendirme ekranları"
  },
  {
    icon: "💒",
    text: "Düğün ve özel davetler",
    desc: "Fotoğraf/video gösterimi ve canlı yayın"
  },
];

const FAQ_ITEMS = [
  {
    q: "LED ekran kiralama fiyatları ne kadar?",
    a: "LED ekran kiralama fiyatları piksel aralığına ve ekran boyutuna göre değişmektedir. P2.5 iç mekan LED ekran için m² fiyatı 2.800 TL, P4 dış mekan LED ekran için m² fiyatı 1.800 TL'dir. Profesyonel kurulum ve operatör hizmetleri paket fiyatlarına dahildir."
  },
  {
    q: "LED ekran kurulumu ne kadar sürer?",
    a: "Standart bir LED ekran kurulumu 2-6 saat arasında tamamlanır. 20m²'ye kadar küçük kurulumlar 2-3 saat, 20-50m² orta ölçekli kurulumlar 3-4 saat, 50m²+ büyük kurulumlar ise 4-6 saat sürmektedir. Kompleks rigging gerektiren projelerde bu süre 24 saate kadar çıkabilir."
  },
  {
    q: "Yağmurlu havada LED ekran kullanılabilir mi?",
    a: "Evet, dış mekan LED ekranlarımız IP65 koruma sınıfına sahiptir ve yağmurlu havada güvenle kullanılabilir. IP65 koruma, ekipmanın toz ve suya karşı dayanıklı olduğunu gösterir."
  },
  {
    q: "İçerik çözünürlüğü nasıl olmalı?",
    a: "En iyi görüntü kalitesi için LED ekranın piksel aralığına göre içerik hazırlanmalıdır. Örneğin P2.5 ekran için 1920x1080 veya 3840x2160 içerik, P4 ekran için 1280x720 veya 1920x1080 içerik idealdir."
  },
  {
    q: "Kurulum için ne kadar alan gerekiyor?",
    a: "Kurulum alanı, ekran boyutuna ve rigging yöntemine bağlıdır. Ground stack kurulumlarda ekran yüksekliği + 1.5m alan, truss rigging kurulumlarda ise truss ve güvenlik sistemi için ekstra 2-3m alan gereklidir."
  },
  {
    q: "Operatör desteği sağlıyor musunuz?",
    a: "Evet, tüm projelerimizde profesyonel operatör desteği sağlıyoruz. Operatörlerimiz içerik yönetimi, canlı yayın entegrasyonu ve teknik destek konularında uzmandır."
  },
];

const GALLERY_IMAGES = [
  {
    src: "/img/galeri/led-ekran-kiralama-1.webp",
    alt: "Konser sahnesinde dev LED ekran kurulumu, kalabalık izleyici kitlesi ve ışık şovları"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-2.webp",
    alt: "Kurumsal lansman etkinliğinde yüksek çözünürlüklü LED ekran"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "Festival sahnesinde kullanılan LED ekran ve ışık sistemleri"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-4.webp",
    alt: "Fuar standında kullanılan video wall sistemi, marka tanıtımı için optimize edilmiş"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-5.webp",
    alt: "Stadyumda dev LED ekran, spor etkinliği sırasında canlı skor ve görüntüler"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-6.webp",
    alt: "Düğün organizasyonunda LED ekran, canlı fotoğraf ve video gösterimi"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-7.webp",
    alt: "TV stüdyosunda kullanılan profesyonel LED ekran, canlı yayın için optimize edilmiş"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-8.webp",
    alt: "Alışveriş merkezinde reklam LED ekranı, yüksek trafikli alanda marka gösterimi"
  },
];

/* ================== Sabitler ================== */
export const revalidate = 1800;
const ORIGIN = "https://www.sahneva.com";
const WA_TEXT = "Merhaba%2C+LED+ekran+kiralama+icin+teklif+istiyorum.+Etkinlik+turu%3A+%5Bkonser%2Ffuar%2Flansman%5D%2C+Tarih%3A+%5Bgg.aa.yyyy%5D%2C+Ekran+boyutu%3A+%5Bxxx%5D.";
const WHATSAPP = `https://wa.me/${WHATSAPP_PHONE.replace("+", "")}?text=${WA_TEXT}`;

// Base64 blur placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAQF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ================== Dinamik galeri (CaseGallery) ================== */
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => (
    <div className="flex justify-center items-center h-64" role="status" aria-label="Galeri yükleniyor">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-hidden="true" />
      <span className="sr-only">Galeri yükleniyor...</span>
    </div>
  )
});

/* ================== META ================== */
export const metadata = {
  title: "LED Ekran Kiralama | Profesyonel Çözümler | Sahneva",
  description: "P2-P6 piksel aralığı, 4K çözünürlük, yüksek parlaklık LED ekran kiralama. İç/dış mekan, konser, fuar ve kurumsal etkinlikler için profesyonel çözümler.",
  keywords: "led ekran kiralama, p2.5 led ekran, p4 led ekran, dış mekan led ekran, led wall kiralama, video wall kiralama, konser led ekran",
  alternates: { canonical: `${ORIGIN}/led-ekran-kiralama` },
  openGraph: {
    title: "LED Ekran Kiralama | Profesyonel Çözümler",
    description: "P2-P6 piksel aralığında iç ve dış mekan LED ekran kiralama. Yüksek parlaklık, IP65 koruma ve profesyonel kurulum.",
    url: `${ORIGIN}/led-ekran-kiralama`,
    type: "website",
    siteName: "Sahneva",
    locale: "tr_TR",
    images: [{
      url: `${ORIGIN}/img/og.jpg`,
      width: 1200,
      height: 630,
      alt: "Sahneva LED Ekran Kiralama - Profesyonel Görsel Çözümler"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Ekran Kiralama | Profesyonel Çözümler | Sahneva",
    description: "P2-P6 piksel aralığı, 4K çözünürlük, yüksek parlaklık LED ekran kiralama. Konser, fuar ve kurumsal etkinlikler.",
    images: [`${ORIGIN}/img/og.jpg`],
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
const HERO = {
  src: "/img/hizmet-led-ekran.webp",
  alt: "Profesyonel LED ekran kurulumu - Konser sahnesinde büyük LED wall ve görsel şov",
  sizes: "(max-width: 768px) 100vw, 100vw",
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
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-black/40 to-purple-900/70" aria-hidden="true" />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white py-12">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30 mb-6">
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
          </span>
          <span className="text-sm font-bold text-white">Türkiye Geneli Profesyonel Hizmet</span>
        </div>

        <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl">
          Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">LED Ekran Kiralama</span>
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
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600 shadow-lg"
          >
            <span aria-hidden="true" className="text-xl mr-2">💬</span>
            <span className="text-base">Hemen Teklif Al</span>
          </Link>

          <Link
            href="#hizmetler"
            title="Hizmetlerimiz hakkında daha fazla bilgi edinin"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white/95 bg-white/10 backdrop-blur-lg hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 shadow-lg"
          >
            <span aria-hidden="true" className="text-xl mr-2">🎯</span>
            <span className="text-base">Hizmetlerimiz</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">⭐</span>
            <div className="text-xl font-black text-white">4.9/5</div>
            <div className="text-white/80 text-sm">183+ Değerlendirme</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🏆</span>
            <div className="text-xl font-black text-white">300+</div>
            <div className="text-white/80 text-sm">Proje</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🚀</span>
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
    <section id="hizmetler" className="py-20 bg-gradient-to-b from-white to-blue-50/50" aria-labelledby="hizmetler-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="hizmetler-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Hizmetlerimiz</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            LED ekran kiralama hizmetlerimiz: teknik danışmanlık, kurulum, operasyon ve 7/24 destek
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service, index) => {
            const id = `svc-${slugify(service.title)}`;
            const delayClass = `animation-delay-${index * 100}`;
            return (
              <div key={id} className="group">
                <article
                  className={`bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 group-hover:scale-105 transition-all duration-500 h-full flex flex-col animate-fade-up ${delayClass}`}
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
                  {service.cta && (
                    <div className="mt-8">
                      <Link
                        href={service.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >
                        <span aria-hidden="true" className="text-lg">➡️</span>
                        <span>{service.cta.label}</span>
                      </Link>
                    </div>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================== Galeri ================== */
function Gallery() {
  return (
    <section className="py-20 bg-white" aria-labelledby="galeri-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="galeri-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Proje <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Galerimiz</span>
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
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300"
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
      category: "piksel",
      title: "Piksel Teknolojileri",
      description: "P2.5-P6 piksel aralığı ile her ihtiyaca uygun çözümler",
      icon: "🔍",
      features: ["P2.5: İç mekan premium", "P3.9: Hibrit kullanım", "P4: Dış mekan standart", "P6: Büyük açık alanlar"]
    },
    {
      category: "parlaklik",
      title: "Parlaklık & Görünürlük",
      description: "Ortam koşullarına göre optimize edilmiş parlaklık seviyeleri",
      icon: "☀️",
      features: ["İç mekan: 800-1500 nit", "Dış mekan: 3500-6500 nit", "Otomatik parlaklık", "Güneş altında netlik"]
    },
    {
      category: "koruma",
      title: "Koruma Sistemleri",
      description: "IP65 su geçirmez koruma ve dayanıklı yapı",
      icon: "🛡️",
      features: ["IP65 ön koruma", "IP54 arka koruma", "UV dayanıklı malzeme", "Toz geçirmez yapı"]
    },
    {
      category: "kontrol",
      title: "Kontrol Sistemleri",
      description: "Profesyonel video işleme ve kontrol sistemleri",
      icon: "🎮",
      features: ["Novastar işlemciler", "4K video scaling", "Medya sunucular", "Uzaktan kontrol"]
    },
    {
      category: "kurulum",
      title: "Kurulum Sistemleri",
      description: "Hızlı ve güvenli kurulum için özel sistemler",
      icon: "⚡",
      features: ["Ground stack", "Truss rigging", "Motorlu asma sistem", "Hızlı kilit mekanizması"]
    },
    {
      category: "destek",
      title: "Teknik Destek",
      description: "7/24 teknik destek ve acil müdahale hizmetleri",
      icon: "📞",
      features: ["7/24 teknik destek", "Yedek modül stoğu", "Acil müdahale ekibi", "Uzaktan diagnostik"]
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
            En son teknoloji LED ekranlar ve profesyonel teknik altyapı ile hizmetinizdeyiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technicalItems.map((item) => (
            <div key={item.category} className="group">
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-500 h-full">
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">{item.icon}</span>
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
    { value: "300+", label: "Başarılı Proje", icon: "🎬" },
    { value: "50+", label: "Kurumsal Müşteri", icon: "🏢" },
    { value: "81", label: "İlde Hizmet", icon: "🗺️" },
    { value: "5+", label: "Yıl Deneyim", icon: "⭐" },
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
            LED ekran çözümlerimizin tercih edildiği başlıca etkinlik türleri ve özel çözümlerimiz
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
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
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
            Bilgi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Profesyonel Rehber</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            LED ekran kiralama ve etkinlik teknolojileri hakkında bilgilendirici içerikler
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <article className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
            <h3 className="text-2xl font-black text-gray-900 mb-4">Doğru Piksel Aralığını Seçmek</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Etkinlik türüne ve izleyici mesafesine göre P2.5, P3.9 veya P4 piksel aralıklarının avantajları.
            </p>
            <Link href="/blog/led-ekran-piksel-araligi-nasil-secilir" className="inline-flex items-center text-blue-600 font-bold hover:underline">
              <span>Detaylı Oku</span>
              <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </article>

          <article className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
            <h3 className="text-2xl font-black text-gray-900 mb-4">Işık Koşullarına Göre Parlaklık</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              İç ve dış mekan parlaklık gereksinimleri, nit değerleri ve otomatik parlaklık ayarları.
            </p>
            <Link href="/blog/led-ekran-parlaklik-degerleri" className="inline-flex items-center text-blue-600 font-bold hover:underline">
              <span>Detaylı Oku</span>
              <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </article>

          <article className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
            <h3 className="text-2xl font-black text-gray-900 mb-4">Kurulum ve Güvenlik İpuçları</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ground stack, truss rigging ve güvenlik ekipmanlarının doğru kullanımı hakkında pratik bilgiler.
            </p>
            <Link href="/blog/led-ekran-kurulum-guvenlik" className="inline-flex items-center text-blue-600 font-bold hover:underline">
              <span>Detaylı Oku</span>
              <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ================== SSS ================== */
function FAQ() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="sss-baslik">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 id="sss-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Sık Sorulan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sorular</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            LED ekran kiralama hakkında merak edilen sorular ve cevapları
          </p>
        </div>

          <div className="space-y-4" role="list" aria-label="Sık sorulan sorular listesi">
            {FAQ_ITEMS.map((faq, index) => {
              const panelId = `faq-panel-${index}`;
              const summaryId = `faq-summary-${index}`;

              return (
                <details
                  key={faq.q}
                  className="group bg-gray-50 rounded-3xl border-2 border-transparent transition-all duration-500 open:border-blue-200 open:bg-blue-50 open:shadow-lg hover:bg-gray-100"
                  role="listitem"
                >
                  <summary
                    id={summaryId}
                    aria-controls={panelId}
                    className="w-full list-none text-left flex items-center justify-between gap-4 px-8 py-6 text-xl font-bold text-gray-900 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                  >
                    <span className="pr-4 flex-1">{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className="ml-4 transition-transform duration-300 text-blue-600 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 group-open:rotate-180"
                    >
                      ⌄
                    </span>
                  </summary>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={summaryId}
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out grid-rows-[0fr] opacity-0 group-open:grid-rows-[1fr] group-open:opacity-100"
                  >
                    <div className="overflow-hidden text-gray-700 leading-relaxed text-lg px-8 pb-8 -mt-2">
                      <p className="pl-4 border-l-4 border-blue-500">{faq.a}</p>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Daha fazla sorunuz mu var? Uzman ekibimiz sizi arayıp bilgilendirsin.
          </p>
          <Link
            href="/sss"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
            title="Sık Sorulan Sorular sayfasındaki tüm soruları görüntüle"
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
      href: "/ses-isik-sistemleri",
      title: "Ses & Işık Sistemleri",
      icon: "🎵",
      desc: "Profesyonel ses ve ışık sistemleri kiralama"
    },
    {
      href: "/sahne-kiralama",
      title: "Sahne Kiralama",
      icon: "🛠️",
      desc: "Portatif ve modüler sahne sistemleri kiralama"
    },
    {
      href: "/podyum-kiralama",
      title: "Podyum Kiralama",
      icon: "📐",
      desc: "Profesyonel sahne platformları ve podyum sistemleri"
    },
    {
      href: "/cadir-kiralama",
      title: "Çadır Kiralama",
      icon: "🎪",
      desc: "Profesyonel etkinlik çadırları ve tenteli alan çözümleri"
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
            LED ekran kurulumunuzu tamamlayacak diğer profesyonel etkinlik çözümlerimiz
          </p>
          <div
            className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8 rounded-full"
            aria-hidden="true"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group block bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full"
            >
              <div className="flex flex-col gap-4 h-full">
                <div className="text-3xl w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Detaylı İncele</span>
                  <span aria-hidden="true" className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== CTA ================== */
function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-950 text-white relative overflow-hidden" aria-labelledby="cta-baslik">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-blue-900/80" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_30%)]" aria-hidden="true" />
      </div>

      <div className="relative container mx-auto px-4 max-w-6xl text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20 mb-6">
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
          </span>
          <span className="text-sm font-bold text-white">7/24 Teknik Destek</span>
        </div>

        <h2 id="cta-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          Etkinliğiniz İçin
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"> Profesyonel LED Ekran </span>
          Çözümleri
        </h2>

        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-10">
          Projenize en uygun LED ekran konfigürasyonunu birlikte planlayalım. Kurulum, operasyon ve teknik destek hizmetleri tek paket halinde.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
          >
            <span aria-hidden="true" className="text-xl mr-3">💬</span>
            <span>WhatsApp’tan Hızlı Teklif Al</span>
          </Link>

          <Link
            href="tel:+905453048671"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-blue-800 transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
          >
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Hemen Ara: 0545 304 86 71</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== JSON-LD ================== */
function JsonLd() {
  const pageUrl = `${ORIGIN}/led-ekran-kiralama`;

  /* ----------------------------------------
    LOCAL BUSINESS NODE
  ---------------------------------------- */
  const localBusinessNode = {
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbiz`,
    name: "Sahneva LED Ekran Kiralama",
    image: `${ORIGIN}/img/og.jpg`,
    url: pageUrl,
    telephone: WHATSAPP_PHONE,
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressLocality: "İstanbul",
      addressRegion: "Marmara",
      postalCode: "34000",
      streetAddress: "Profesyonel Etkinlik Çözümleri"
    },
    sameAs: [
      "https://www.instagram.com/sahnevaofficial",
      "https://www.facebook.com/sahnevaofficial",
      "https://www.youtube.com/@sahnevaofficial",
    ],
    priceRange: "₺₺₺"
  };

  /* ----------------------------------------
    WEBPAGE NODE
  ---------------------------------------- */
  const webpageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: metadata.title,
    description: metadata.description,
    inLanguage: "tr",
    isPartOf: {
      "@id": `${ORIGIN}#website`
    },
    primaryImageOfPage: {
      "@id": `${pageUrl}#primaryimage`
    }
  };

  /* ----------------------------------------
    BREADCRUMB LIST
  ---------------------------------------- */
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Anasayfa",
        item: ORIGIN
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "LED Ekran Kiralama",
        item: pageUrl
      }
    ]
  };

  /* ----------------------------------------
    SERVICE NODE
  ---------------------------------------- */
  const serviceNode = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "LED Ekran Kiralama Hizmeti",
    description: metadata.description,
    areaServed: {
      "@type": "Country",
      name: "Türkiye"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: WHATSAPP
    },
    provider: {
      "@id": `${pageUrl}#localbiz`
    }
  };

  /* ----------------------------------------
    PRODUCT NODE
  ---------------------------------------- */
  const productNode = {
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    name: "Profesyonel LED Ekran Kiralama",
    description: metadata.description,
    image: `${ORIGIN}/img/og.jpg`,
    brand: {
      "@type": "Brand",
      name: "Sahneva"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "183"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: WHATSAPP
    }
  };

  /* ----------------------------------------
    EVENT SERVICE NODE
  ---------------------------------------- */
  const eventServiceSchema = {
    "@type": "EventService",
    "@id": `${pageUrl}#eventservice`,
    name: "Etkinlik LED Ekran Kiralama",
    provider: {
      "@id": `${pageUrl}#localbiz`
    },
    areaServed: {
      "@type": "Place",
      name: "Türkiye",
      address: {
        "@type": "PostalAddress",
        addressCountry: "TR"
      }
    }
  };

  /* ----------------------------------------
    RATING NODE
  ---------------------------------------- */
  const ratingNode = {
    "@type": "AggregateRating",
    "@id": `${pageUrl}#rating`,
    ratingValue: "4.9",
    reviewCount: "183",
    bestRating: "5",
    worstRating: "1"
  };

  /* ----------------------------------------
    REVIEWS NODE
  ---------------------------------------- */
  const reviews = [
    {
      "@type": "Review",
      name: "Kurumsal Lansman Deneyimi",
      reviewBody: "Kurumsal lansman etkinliğimizde LED ekran kurulumunuz ve canlı yayın entegrasyonunuz kusursuzdu.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1"
      },
      author: {
        "@type": "Organization",
        name: "Kurumsal Müşteri"
      },
      itemReviewed: {
        "@id": `${pageUrl}#product`
      }
    },
    {
      "@type": "Review",
      name: "Festival Sahnesi",
      reviewBody: "Festival sahnesinde hem ana ekran hem yan ekranlar mükemmel çalıştı. Operatör desteğiyle içerikler akıcı şekilde yönetildi.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1"
      },
      author: {
        "@type": "Person",
        name: "Etkinlik Organizatörü"
      },
      itemReviewed: {
        "@id": `${pageUrl}#product`
      }
    },
    {
      "@type": "Review",
      name: "Açık Hava Konseri",
      reviewBody: "Dış mekan LED ekranların parlaklığı ve netliği mükemmeldi. Yağmurlu havaya rağmen sorunsuz çalıştı.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1"
      },
      author: {
        "@type": "Person",
        name: "Festival Koordinatörü"
      },
      itemReviewed: {
        "@id": `${pageUrl}#product`
      }
    }
  ];

  /* ----------------------------------------
    FAQ
  ---------------------------------------- */
  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  /* ----------------------------------------
    TOP GRAPH (çadır sayfasıyla aynı mantık)
  ---------------------------------------- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessNode,   // 1) LocalBusiness (#localbiz)
      webpageSchema,       // 2) WebPage
      breadcrumbSchema,    // 3) Breadcrumb
      serviceNode,         // 4) Service
      productNode,         // 5) Product
      eventServiceSchema,  // 6) EventService
      ratingNode,          // 7) Rating
      ...reviews,          // 8) Reviews
      faqSchema,           // 9) FAQ
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
    <>
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
