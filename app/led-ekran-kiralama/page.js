// app/led-ekran-kiralama/page.jsx
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";

/* ================== Sabitler ================== */
export const revalidate = 1800;
const ORIGIN = "https://www.sahneva.com";
const PHONE = "+905453048671";
const WA_TEXT = "Merhaba%2C+LED+ekran+kiralama+icin+teklif+istiyorum.+Etkinlik+turu%3A+%5Bkonser%2Ffuar%2Flansman%5D%2C+Tarih%3A+%5Bgg.aa.yyyy%5D%2C+Ekran+boyutu%3A+%5Bxxx%5D.";
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
      url: `${ORIGIN}/img/hizmet-led-ekran.webp`, 
      width: 1200, 
      height: 630, 
      alt: "Sahneva LED Ekran Kiralama - Profesyonel Görsel Çözümler" 
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Ekran Kiralama | Profesyonel Çözümler | Sahneva",
    description: "P2-P6 piksel aralığı, 4K çözünürlük, yüksek parlaklık LED ekran kiralama. Konser, fuar ve kurumsal etkinlikler.",
    images: [`${ORIGIN}/img/hizmet-led-ekran.webp`],
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
  src: "/img/hizmet-led-ekran.webp",
  alt: "Profesyonel LED ekran kurulumu - Konser sahnesinde büyük LED wall ve görsel şov",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🖥️",
    title: "İç Mekan LED Ekranlar",
    description: "P2.5-P3.9 piksel aralığı ile yüksek çözünürlüklü iç mekan çözümleri",
    features: ["P2.5-P3.9 piksel", "800-1500 nit parlaklık", "4K çözünürlük", "Hızlı kurulum"],
  },
  {
    icon: "🌞",
    title: "Dış Mekan LED Ekranlar",
    description: "P4-P6 piksel aralığı ve yüksek parlaklık ile açık hava çözümleri",
    features: ["P4-P6 piksel", "5000-6500+ nit", "IP65 su geçirmez", "UV dayanıklı"],
  },
  {
    icon: "🎬",
    title: "Video Wall Sistemleri",
    description: "Modüler yapıda esnek video wall ve kreatif ekran çözümleri",
    features: ["Modüler tasarım", "Esnek konfigürasyon", "Yüksek yenileme hızı", "Profesyonel kontrol"],
  },
  {
    icon: "⚡",
    title: "Kontrol & Yayın Sistemleri",
    description: "Profesyonel video işleme, kontrol ve canlı yayın sistemleri",
    features: ["Novastar işlemciler", "4K scaler", "Medya sunucular", "Canlı yayın"],
  },
  {
    icon: "🔧",
    title: "Kurulum & Rigging",
    description: "Profesyonel kurulum, truss sistemleri ve güvenlik çözümleri",
    features: ["Ground stack", "Truss rigging", "Güvenlik sistemleri", "Hızlı montaj"],
  },
  {
    icon: "🎮",
    title: "Operatör & Teknik Destek",
    description: "Deneyimli operatörler ve 7/24 teknik destek hizmeti",
    features: ["Profesyonel operatör", "İçerik yönetimi", "7/24 teknik destek", "Acil müdahale"],
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
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">💬</span> 
            <span className="text-base">Hemen Teklif Al</span>
          </Link>

          <Link
            href="#hizmetler"
            title="Hizmetlerimiz hakkında daha fazla bilgi edinin"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white/95 bg-white/10 backdrop-blur-lg hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 shadow-lg"
            role="button"
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
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
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

/* ================== Galeri ================== */
const GALLERY_IMAGES = [
  { 
    src: "/img/galeri/led-ekran-kiralama-1.webp", 
    alt: "Konser sahnesinde kurulmuş büyük LED ekran, kalabalık önünde canlı performans gösterimi" 
  },
  { 
    src: "/img/galeri/led-ekran-kiralama-2.webp", 
    alt: "Kurumsal etkinlikte kullanılan LED ekran, sunum sırasında profesyonel aydınlatma ile aydınlatılmış" 
  },
  { 
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "Açık hava festivalinde yüksek parlaklıklı LED ekran, gün ışığında net görüntü" 
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
      category: "piksel",
      title: "Piksel Teknolojileri",
      description: "P2.5-P6 piksel aralığı ile her ihtiyaca uygun çözümler",
      features: ["P2.5: İç mekan premium", "P3.9: Hibrit kullanım", "P4: Dış mekan standart", "P6: Büyük açık alanlar"]
    },
    {
      category: "parlaklik",
      title: "Parlaklık & Görünürlük",
      description: "Ortam koşullarına göre optimize edilmiş parlaklık seviyeleri",
      features: ["İç mekan: 800-1500 nit", "Dış mekan: 3500-6500 nit", "Otomatik parlaklık", "Güneş altında netlik"]
    },
    {
      category: "koruma",
      title: "Koruma Sistemleri",
      description: "IP65 su geçirmez koruma ve dayanıklı yapı",
      features: ["IP65 ön koruma", "IP54 arka koruma", "UV dayanıklı malzeme", "Toz geçirmez yapı"]
    },
    {
      category: "kontrol",
      title: "Kontrol Sistemleri",
      description: "Profesyonel video işleme ve kontrol sistemleri",
      features: ["Novastar işlemciler", "4K video scaling", "Medya sunucular", "Uzaktan kontrol"]
    },
    {
      category: "kurulum",
      title: "Kurulum Sistemleri",
      description: "Hızlı ve güvenli kurulum için özel sistemler",
      features: ["Ground stack", "Truss rigging", "Motorlu asma sistem", "Hızlı kilit mekanizması"]
    },
    {
      category: "destek",
      title: "Teknik Destek",
      description: "7/24 teknik destek ve acil müdahale hizmetleri",
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
                  <span className="text-3xl" aria-hidden="true">
                    {item.category === "piksel" && "🔍"}
                    {item.category === "parlaklik" && "☀️"}
                    {item.category === "koruma" && "🛡️"}
                    {item.category === "kontrol" && "🎮"}
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
            Bilgi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Profesyonel Rehber</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            LED ekran teknolojileri hakkında uzman görüşleri ve teknik bilgiler
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
                  LED Ekran Kiralama: Etkinlik Başarınız İçin Görsel Mükemmellik
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  En son teknoloji LED ekranlar, profesyonel kurulum ve görsel prodüksiyon ile etkinliklerinizde mükemmel performans
                </p>
              </div>
            </header>

            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-600 prose-ul:mt-6 prose-ul:mb-6 prose-li:marker:text-blue-500">
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-600 rounded-2xl p-3" aria-hidden="true">🖥️</span>
                      LED Ekran Teknolojileri
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong>, Türkiye genelinde{" "}
                      <Link href="/led-ekran-kiralama" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        profesyonel LED ekran kiralama
                      </Link>{" "}
                      hizmetleriyle kurumsal standartta çözümler sunmaktadır.
                    </p>
                    <p>
                      Etkinliğiniz ister kapalı salon konseri, ister açık hava festivali olsun; detaylı teknik keşif, 
                      piksel aralığı optimizasyonu, profesyonel kurulum ve canlı operasyon dahil{" "}
                      <strong className="text-gray-900">anahtar teslim çözümler</strong> sunuyoruz.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-purple-100 text-purple-600 rounded-2xl p-3" aria-hidden="true">🌞</span>
                      Parlaklık ve Görünürlük
                    </h4>
                    <p>
                      İç mekan etkinliklerinde 800-1500 nit, dış mekan etkinliklerinde ise 3500-6500+ nit parlaklık 
                      değerleriyle her koşulda net ve canlı görüntü garantisi sunuyoruz.
                    </p>
                    <p>
                      P2.5-P6 piksel aralığı seçeneklerimizle, izleyici mesafesine göre optimize edilmiş çözümler 
                      sunarak hem yakın mesafede detay kaybı hem de uzak mesafede pikselli görüntü sorunlarını ortadan kaldırıyoruz.
                    </p>
                  </div>
                </div>

                {/* Önemli Bilgi Kutusu */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
                  <h5 className="font-black text-blue-700 text-xl mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">💡</span> 
                    Teknik Seçim Stratejisi
                  </h5>
                  <p className="text-gray-700 text-lg mb-0 leading-relaxed">
                    LED ekran seçiminde izleyici mesafesi en kritik faktördür. Yakın mesafe (3-10m) için P2.5-P3.9, 
                    orta mesafe (10-25m) için P4, uzak mesafe (25m+) için P6 piksel aralığı öneriyoruz. Açık hava 
                    etkinliklerinde ise parlaklık ve IP koruma sınıfı öncelikli değerlendirilmelidir.
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
                        title: "Doğru Piksel Seçimi", 
                        desc: "İzleyici mesafesine göre optimize edilmiş piksel aralığı" 
                      },
                      { 
                        icon: "📊", 
                        title: "Parlaklık Optimizasyonu", 
                        desc: "Ortam ışık koşullarına göre ayarlanmış parlaklık seviyeleri" 
                      },
                      { 
                        icon: "🔒", 
                        title: "Güvenlik Sistemleri", 
                        desc: "Rigging, güç dağıtım ve acil durum sistemleri" 
                      },
                      { 
                        icon: "🎭", 
                        title: "İçerik Optimizasyonu", 
                        desc: "Ekran çözünürlüğüne uygun içerik hazırlama ve yayınlama" 
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
                    <strong>5+ yıllık deneyim, 300+ başarılı proje ve 81 ilde hizmet</strong> ile 
                    LED ekran kiralama konusunda güvenilir çözüm ortağınız. En son teknoloji ekipman, 
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
                Teknik Kurulum ve Operasyon
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Profesyonel kurulum süreçleri ve canlı operasyon yönetimi
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  LED ekran kurulum sürecimiz detaylı site survey ile başlar. Mekanın fiziksel koşulları, 
                  güç altyapısı, izleyici perspektifi ve görsel açılar analiz edilir.
                </p>
                <p>
                  Profesyonel kurulum ekibimiz 2-6 saat içinde LED ekranınızı monte eder, 
                  kablolama ve güç sistemlerini kurar, test ve kalibrasyon işlemlerini tamamlar.
                </p>
                
                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">📋</span>
                    Kurulum Standartları
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Ground stack veya truss rigging sistemleri
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Profesyonel güç dağıtım ve UPS sistemleri
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Renk kalibrasyonu ve görüntü optimizasyonu
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Yedek modül ve acil müdahale planı
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
                Her etkinlik türüne özel LED ekran stratejileri ve teknik çözümler
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-600 rounded-xl p-2" aria-hidden="true">🎵</span>
                      Konser & Festival
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Yüksek parlaklık, geniş görüş açısı, canlı kamera entegrasyonu, multi-screen setup
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">💼</span>
                      Kurumsal Etkinlikler
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Yüksek çözünürlük, net metin okunabilirliği, profesyonel sunum desteği, marka renk doğruluğu
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-green-100 text-green-600 rounded-xl p-2" aria-hidden="true">🎪</span>
                      Fuar & Sergi
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Kompakt tasarım, hızlı kurulum, etkileşimli içerik, yüksek trafik dayanıklılığı
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
function FAQ() {
  const faqs = [
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
      a: "Evet, dış mekan LED ekranlarımız IP65 koruma sınıfına sahiptir ve yağmurlu havada güvenle kullanılabilir. IP65 koruma, ekranın toza karşı tam korumalı ve su jetlerine karşı korumalı olduğu anlamına gelir. Ancak şiddetli fırtına ve kasırga gibi ekstrem hava koşullarında güvenlik önlemi olarak kullanıma ara verilmesini öneriyoruz." 
    },
    { 
      q: "LED ekran için hangi piksel aralığını seçmeliyim?", 
      a: "Piksel aralığı seçimi izleyici mesafesine göre belirlenmelidir. 3-10m mesafe için P2.5-P3.9, 10-25m mesafe için P4, 25m+ mesafe için P6 piksel aralığı öneriyoruz. İç mekan etkinliklerinde P2.5-P3.9, dış mekan etkinliklerinde ise P4-P6 aralığı tercih edilmektedir." 
    },
  ];
  
  return (
    <section className="py-20 bg-white" aria-labelledby="sss-baslik">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 id="sss-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Sık Sorulan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sorular</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            LED ekran kiralama hakkında merak edilen sorular ve cevapları
          </p>
        </div>

        <div className="space-y-6" role="list" aria-label="Sık sorulan sorular listesi">
          {faqs.map((faq, index) => (
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
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
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

        <nav aria-label="Tamamlayıcı hizmetler">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-500 hover:scale-105 text-center focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white h-full flex flex-col"
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
            Bu bölümde LED ekran kurulumunuzu tamamlayacak diğer hizmetlerimiz bulunmaktadır. 
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
              Profesyonel LED Ekran Çözümlerine Hazır Mısınız?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Etkinliğiniz için en uygun LED ekran sistemlerini sunalım. Ücretsiz keşif, profesyonel danışmanlık ve 
              rekabetçi fiyat garantisi ile hizmetinizdeyiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/iletisim" 
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-white shadow-lg"
                role="button"
              >
                <span aria-hidden="true" className="text-xl mr-3">📞</span> 
                <span className="text-lg">Hemen Teklif Al</span>
              </Link>
              <a 
                href={WHATSAPP} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white bg-transparent hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white shadow-lg"
                role="button"
              >
                <span aria-hidden="true" className="text-xl mr-3">💬</span> 
                <span className="text-lg">WhatsApp'tan Yaz</span>
              </a>
            </div>
            <div className="mt-8 text-blue-200 text-lg" role="contentinfo">
              📍 81 ilde hizmet • ⏰ 7/24 teknik destek • ⭐ 5+ yıl deneyim
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== JSON-LD ================== */
function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { 
            "@type": "ListItem", 
            position: 1, 
            name: "Anasayfa", 
            item: `${ORIGIN}/` 
          },
          { 
            "@type": "ListItem", 
            position: 2, 
            name: "LED Ekran Kiralama", 
            item: `${ORIGIN}/led-ekran-kiralama` 
          },
        ],
      },
      {
        "@type": "Service",
        name: "LED Ekran Kiralama Hizmeti",
        description: "Profesyonel LED ekran kiralama hizmeti. P2-P6 piksel aralığı, iç/dış mekan LED ekranlar, video wall sistemleri ve profesyonel kurulum hizmetleri ile Türkiye genelinde hizmet.",
        provider: {
          "@type": "Organization",
          name: "Sahneva",
          telephone: "+905453048671",
          address: { 
            "@type": "PostalAddress", 
            addressLocality: "İstanbul", 
            addressCountry: "TR" 
          },
          url: ORIGIN,
          logo: `${ORIGIN}/logo.png`,
        },
        areaServed: "TR",
        serviceType: "EventProduction",
        offers: {
          "@type": "Offer",
          description: "Profesyonel LED ekran kiralama hizmeti"
        },
        url: `${ORIGIN}/led-ekran-kiralama`,
        aggregateRating: { 
          "@type": "AggregateRating", 
          ratingValue: "4.9", 
          reviewCount: "183", 
          bestRating: "5" 
        },
      },
      {
        "@type": "WebPage",
        name: "LED Ekran Kiralama | Profesyonel Çözümler | Sahneva",
        description: "P2-P6 piksel aralığı, 4K çözünürlük, yüksek parlaklık LED ekran kiralama. İç/dış mekan, konser, fuar ve kurumsal etkinlikler için profesyonel çözümler.",
        url: `${ORIGIN}/led-ekran-kiralama`,
        mainEntity: {
          "@type": "Service",
          name: "LED Ekran Kiralama"
        }
      }
    ],
  };

  return (
    <Script
      id="ld-json-led-ekran"
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
