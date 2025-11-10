// app/(site)/hakkimizda/page.js
import Image from "next/image";
import Link from "next/link";

/* ───── META & ISR ───── */
export const metadata = {
  title: "Hakkımızda | Sahneva - Profesyonel Etkinlik Teknolojileri",
  description:
    "10+ yıllık deneyimle Türkiye genelinde sahne kiralama, LED ekran, ses-ışık sistemleri ve profesyonel etkinlik prodüksiyonu. 700+ başarılı proje.",
  alternates: { canonical: "https://www.sahneva.com/hakkimizda" },
  openGraph: {
    title: "Hakkımızda | Sahneva - Profesyonel Etkinlik Teknolojileri",
    description:
      "10+ yıllık deneyimle Türkiye genelinde profesyonel etkinlik çözümleri. 700+ başarılı proje, %98 müşteri memnuniyeti.",
    url: "https://www.sahneva.com/hakkimizda",
    images: [
      {
        url: "https://www.sahneva.com/img/og-hakkimizda.jpg",
        width: 1200,
        height: 630,
        alt: "Sahneva Ekibi - Profesyonel Etkinlik Teknolojileri",
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  robots: { index: true, follow: true },
  keywords:
    "sahne kiralama, led ekran kiralama, ses ışık sistemi, etkinlik prodüksiyonu, sahneva hakkında",
};

export const revalidate = 3600;

/* ───── STATIC STATS COMPONENT ───── */
function StaticStats() {
  const stats = [
    { number: "700+", label: "Başarılı Proje", color: "from-blue-400 to-cyan-400" },
    { number: "12+", label: "Yıl Deneyim", color: "from-purple-400 to-pink-400" },
    { number: "81", label: "İlde Hizmet", color: "from-blue-400 to-purple-400" },
  ];

  return (
    <div className="container -mt-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
            aria-label={`${stat.number} ${stat.label}`}
          >
            <div
              className={`text-4xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-2`}
            >
              {stat.number}
            </div>
            <div className="text-lg font-semibold text-neutral-700">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── STRUCTURED DATA ───── */
function AboutStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sahneva",
    description:
      "Profesyonel sahne kiralama, LED ekran, ses-ışık sistemleri ve etkinlik prodüksiyon hizmetleri",
    url: "https://sahneva.com",
    foundingDate: "2012",
    founders: [{ "@type": "Person", name: "Sahneva Ekibi" }],
    numberOfEmployees: "15-50",
    slogan: "Türkiye'nin 1 Numaralı Etkinlik Teknoloji Partneri",
    address: { "@type": "PostalAddress", addressCountry: "TR" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+905453048671",
      contactType: "customer service",
      availableLanguage: ["Turkish"],
    },
    sameAs: [
      "https://www.instagram.com/sahneva/",
      "https://www.facebook.com/sahneva/",
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "500" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ───── MAIN COMPONENT ───── */
export default function HakkimizdaPage() {
  const TIMELINE = [
    {
      year: "2012",
      title: "Kuruluş",
      description:
        "Profesyonel sahne ve ses teknolojileri alanında hizmet vermeye başladık. Müşteri memnuniyeti odaklı hizmet anlayışımızı bu yılda temellendirdik.",
      icon: "🚀",
    },
    {
      year: "2016",
      title: "Teknolojik Yatırım",
      description:
        "LED ekran ve görüntü sistemlerini portföyümüze ekleyerek görsel prodüksiyon yetkinliğimizi geliştirdik. İstanbul merkezli operasyonumuzu Anadolu'ya genişlettik.",
      icon: "🖥️",
    },
    {
      year: "2020",
      title: "Kurumsal Dönüşüm",
      description:
        "Türkiye geneli lojistik ağımızı tamamladık. Büyük ölçekli kurumsal etkinliklerde güvenilir çözüm ortağı olarak konumlandık.",
      icon: "🏢",
    },
    {
      year: "2024",
      title: "İnovasyon Liderliği",
      description:
        "Yeni nesil ekipman parkı, dijital entegrasyon ve canlı yayın çözümleriyle sektörde fark yarattık. 700+ proje deneyimine ulaştık.",
      icon: "⚡",
    },
  ];

  const VALUES = [
    {
      icon: "🛡️",
      title: "Kalite ve Güvenlik",
      description:
        "ISO standartlarında kalite kontrol, iş güvenliği protokolleri ve düzenli ekipman bakımları",
    },
    {
      icon: "⚡",
      title: "Hızlı Kurulum",
      description:
        "Aynı gün kurulum, 2-6 saat içinde profesyonel sahne ve teknik altyapı teslimi",
    },
    {
      icon: "💎",
      title: "Premium Ekipman",
      description:
        "Son teknoloji LED ekranlar, profesyonel ses sistemleri ve modüler sahne çözümleri",
    },
    {
      icon: "🌍",
      title: "Türkiye Geneli",
      description: "81 ilde teknik ekip ve lojistik altyapı ile kesintisiz hizmet",
    },
    {
      icon: "📞",
      title: "7/24 Destek",
      description: "Kurulum öncesi, anı ve sonrası profesyonel teknik danışmanlık",
    },
    {
      icon: "💰",
      title: "Şeffaf Fiyatlandırma",
      description: "Detaylı teklifleme, gizli maliyet olmadan bütçe dostu çözümler",
    },
  ];

  const CLIENTS = [
    "Kurumsal firmalar ve markalar",
    "Belediyeler ve kamu kurumları",
    "Organizasyon ve etkinlik ajansları",
    "Festival ve konser organizatörleri",
    "Düğün ve özel etkinlik planlayıcıları",
    "Fuarcılık ve sergi firmaları",
  ];

  const HERO_FEATURES = [
    { icon: "⭐", title: "4.9/5 Puan", description: "500+ Mutlu Müşteri", color: "from-yellow-400 to-orange-400" },
    { icon: "⚡", title: "Aynı Gün", description: "Hızlı Kurulum", color: "from-blue-400 to-cyan-400" },
    { icon: "👑", title: "Premium", description: "Kalite Garantisi", color: "from-purple-400 to-pink-400" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <AboutStructuredData />

      {/* Skip to Main Content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[9999] focus:top-3 focus:left-3 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-3 focus:rounded-lg focus:font-semibold focus:shadow-lg transition-all duration-200"
      >
        Ana içeriğe atla
      </a>

      {/* HERO - Anasayfa ile Birebir Aynı */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b0f1a] via-blue-950 to-purple-950 pt-16 lg:pt-20"
        aria-labelledby="hero-title"
      >
        {/* Arka plan görseli */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/img/hakkimizda-hero-corporate.webp"
            alt="Profesyonel sahne kurulumu, LED ekranlar ve ses-ışık sistemleri - Sahneva"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
            style={{
              filter: "brightness(0.7) contrast(1.1) saturate(1.05)",
            }}
          />
        </div>

        {/* Overlay katmanları */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/70 to-purple-900/75"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse motion-reduce:animate-none"
          style={{ animationDuration: "8s" }}
          aria-hidden="true"
        />

        {/* İçerik */}
        <div className="relative z-10 container py-12 md:py-16">
          <div className="max-w-6xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
              <span
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span className="text-white/90 text-sm font-medium">
                Türkiye Geneli Profesyonel Hizmet
              </span>
            </div>

            {/* Başlık */}
            <h1
              id="hero-title"
              className="text-white text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight"
              aria-label="Profesyonel Sahne Sistemleri"
            >
              <span className="block">Hakkımızda</span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-[length:300%_100%] animate-[gradient_8s_ease_infinite] motion-reduce:animate-none"
                aria-hidden="true"
              >
                Sahneva
              </span>
            </h1>

            {/* Anahtar kelimeler */}
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed font-medium max-w-4xl mx-auto">
              <span
                className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text font-bold"
                aria-hidden="true"
              >
                12+ Yıl Deneyim
              </span>
              ,{" "}
              <span
                className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text font-bold"
                aria-hidden="true"
              >
                700+ Proje
              </span>
              ,{" "}
              <span
                className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text font-bold"
                aria-hidden="true"
              >
                81 İl Kapsam
              </span>
              <span className="sr-only">12+ Yıl Deneyim, 700+ Proje, 81 İl Kapsam</span>
            </p>

            <p className="text-white/80 text-base md:text-lg mb-8 max-w-3xl mx-auto">
              2012'den bu yana Türkiye'nin dört bir yanında profesyonel etkinlik teknolojileri çözümleri sunuyoruz
            </p>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-12">
              <a
                href="tel:+905453048671"
                className="w-full sm:w-auto min-w-[180px] text-center group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span aria-hidden="true">📞</span> Hemen Ara
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </a>

              <a
                href="https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-w-[180px] text-center group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span aria-hidden="true">💬</span> WhatsApp Teklif
                </span>
                <span className="sr-only">(yeni sekmede açılır)</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </a>
            </div>

            {/* ÖNE ÇIKANLAR - Anasayfa ile Aynı */}
            <h2 className="sr-only">Öne çıkan özellikler</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 list-none p-0 m-0">
              {HERO_FEATURES.map((item, index) => (
                <li key={index} className="m-0 p-0">
                  <div className="group bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:bg-white/15">
                    <div className={`text-2xl mb-2 bg-gradient-to-r ${item.color} text-transparent bg-clip-text`} aria-hidden="true">
                      {item.icon}
                    </div>
                    <div className="text-white font-bold text-base mb-1">{item.title}</div>
                    <div className="text-white/70 text-xs">{item.description}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Danışmanlık kutusu */}
            <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl" aria-hidden="true">🎯</div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-white text-xl md:text-2xl font-bold mb-2">Ücretsiz Profesyonel Danışmanlık</h2>
                  <p className="text-white/90 text-base leading-relaxed">
                    Etkinliğiniz için <strong>en uygun sahne çözümleri</strong>, LED ekran seçenekleri ve ses-ışık sistemlerini ücretsiz teknik danışmanlık ile planlayalım.{" "}
                    <strong className="text-yellow-300">2 saat içinde detaylı teklif</strong> sunuyoruz.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#teklif-al"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60"
                  >
                    Hemen Teklif Al
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className="animate-bounce motion-reduce:animate-none">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS - Hero'dan hemen sonra */}
      <StaticStats />

      <main id="main" className="relative">
        {/* BİZ KİMİZ */}
        <section className="py-20 bg-gradient-to-b from-white to-neutral-50/80" aria-labelledby="biz-kimiz-title">
          <div
            className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"
            aria-hidden="true"
          />
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 id="biz-kimiz-title" className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Biz{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Kimiz?
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8" aria-hidden="true" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-neutral-700 leading-relaxed">
                  <strong className="text-blue-600">Sahneva</strong>, 2012'den bu yana etkinlik prodüksiyonu ve teknoloji çözümlerinde
                  <strong> Türkiye'nin öncü kuruluşudur</strong>. Sahne kiralama, LED ekran, ses-ışık sistemleri ve profesyonel kurulum hizmetlerinde
                  uzmanlaşmış ekibimizle, her etkinliği teknik mükemmellik ve yaratıcı vizyonla buluşturuyoruz.
                </p>

                <p className="text-lg text-neutral-700 leading-relaxed">
                  Misyonumuz; <strong>güvenilir, yenilikçi ve müşteri odaklı</strong> çözümler sunarak etkinliklerinizin
                  teknik altyapısını sorunsuz şekilde yönetmek, markanızın değerine değer katmaktır.
                </p>

                {/* İstatistikler burada da gösterilebilir */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { number: "700+", label: "Başarılı Proje" },
                    { number: "98%", label: "Memnuniyet Oranı" },
                    { number: "81", label: "İlde Hizmet" },
                    { number: "15+", label: "Uzman Ekip" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white rounded-xl shadow-lg border border-neutral-100"
                      aria-label={`${stat.number} ${stat.label}`}
                    >
                      <div className="text-2xl font-black text-blue-600">{stat.number}</div>
                      <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/img/ekip-calisma.webp"
                    alt="Sahneva profesyonel ekip çalışması - Sahne kurulumu ve teknik operasyon"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
                <div
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl -z-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl -z-10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        {/* DEĞERLERİMİZ */}
        <section className="py-20 bg-gradient-to-br from-blue-50/80 to-purple-50/60" aria-labelledby="degerlerimiz-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="degerlerimiz-title" className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Değerlerimiz ve{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  İlkelerimiz
                </span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Kalite, güven ve müşteri memnuniyeti odaklı hizmet anlayışımızın temel taşları
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8" aria-hidden="true" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VALUES.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-neutral-100 hover:border-blue-200 transition-all duration-500 hover:scale-105"
                >
                  <div className="text-4xl mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TARİHÇE */}
        <section id="tarihce" className="py-20 bg-white" aria-labelledby="tarihce-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="tarihce-title" className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                Yolculuğumuz ve{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Başarı Hikayemiz
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" aria-hidden="true" />
            </div>

            <div className="relative">
              <div
                className="absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full hidden lg:block"
                aria-hidden="true"
              />
              <div className="space-y-12 lg:space-y-0">
                {TIMELINE.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col lg:flex-row items-center ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"} mb-8 lg:mb-0`}>
                      <div className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-500 group">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-3xl" aria-hidden="true">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              {item.year}
                            </div>
                            <h3 className="text-2xl font-black text-neutral-900 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-neutral-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 lg:flex items-center justify-center hidden" aria-hidden="true">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg" />
                    </div>

                    <div className="lg:w-1/2 hidden lg:block" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MÜŞTERİ PORTFÖYÜ */}
        <section className="py-20 bg-gradient-to-br from-neutral-900 to-blue-900/95" aria-labelledby="musteri-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="musteri-title" className="text-4xl md:text-5xl font-black text-white mb-6">
                Güvenilen{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Çözüm Ortağı
                </span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                10+ yıldır kurumsal firmalar, kamu kuruluşları ve organizasyon ajanslarına profesyonel hizmet sunuyoruz
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8" aria-hidden="true" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {CLIENTS.map((client, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full motion-safe:animate-pulse" aria-hidden="true" />
                    <span className="text-white font-medium group-hover:text-blue-300 transition-colors">{client}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
                <h3 className="text-2xl font-black text-white mb-4">Neden Binlerce Müşteri Bizi Tercih Ediyor?</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Teknik uzmanlık, güvenilirlik ve müşteri odaklı yaklaşımımızla, her projede beklentilerin ötesinde değer sunuyoruz.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href="https://wa.me/905453048671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105"
                    aria-label="WhatsApp'tan yazın"
                  >
                    💬 WhatsApp'tan Yazın
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VİZYON & MİSYON */}
        <section className="py-20 bg-gradient-to-b from-white to-neutral-50/80" aria-labelledby="vizyon-title">
          <div
            className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"
            aria-hidden="true"
          />
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100">
                <div className="text-4xl mb-4" aria-hidden="true">🎯</div>
                <h3 className="text-3xl font-black text-neutral-900 mb-6">Misyonumuz</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  Etkinlik teknolojilerinde <strong>yenilikçi, güvenilir ve sürdürülebilir</strong> çözümler sunarak
                  müşterilerimizin marka değerini artırmak, teknik mükemmellik ve yaratıcı vizyonla Türkiye'nin etkinlik sektörüne liderlik etmek.
                </p>
                <ul className="space-y-3 text-neutral-700">
                  {[
                    "Teknik altyapıda sıfır hata hedefi",
                    "Müşteri memnuniyetinde %98+ başarı",
                    "Sürekli inovasyon ve ekipman yenileme",
                    "Çevreye duyarlı, sürdürülebilir çözümler",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-lg border border-purple-100">
                <div className="text-4xl mb-4" aria-hidden="true">🚀</div>
                <h3 className="text-3xl font-black text-neutral-900 mb-6">Vizyonumuz</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  2028'e kadar <strong>Türkiye'nin en büyük etkinlik teknolojileri şirketi</strong> olmak, Avrupa ve Orta Doğu'da global bir marka haline gelmek. Dijital dönüşüm ve yeşil teknolojilerle sektörde yeni standartlar belirlemek.
                </p>
                <ul className="space-y-3 text-neutral-700">
                  {[
                    "Türkiye'nin 81 ilinde %100 kapsama",
                    "Avrupa ve Orta Doğu'da genişleme",
                    "AR/VR entegrasyonlu etkinlik çözümleri",
                    "Karbon nötr operasyon hedefi",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600" aria-labelledby="cta-title">
          <div className="container max-w-4xl mx-auto px-4 text-center text-white">
            <h2 id="cta-title" className="text-4xl md:text-5xl font-black mb-6">
              Projenizde <span className="text-yellow-300">Birlikte Çalışalım</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              10+ yıllık deneyimimiz ve uzman ekibimizle etkinliğiniz için en ideal çözümleri sunmaya hazırız.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <a
                href="tel:+905453048671"
                className="group bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="Hemen ara - Profesyonel danışmanlık için"
              >
                <span className="flex items-center justify-center gap-2">📞 Hemen Ara</span>
              </a>

              <a
                href="https://wa.me/905453048671"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="WhatsApp'tan yaz - Hızlı teklif için"
              >
                <span className="flex items-center justify-center gap-2">💬 WhatsApp</span>
              </a>

              <Link
                href="/iletisim"
                className="group bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl border-2 border-white transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="İletişim formu ile ulaşın"
              >
                <span className="flex items-center justify-center gap-2">📧 E-posta</span>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
              <p className="text-white/90 text-sm">
                <strong>⏱️ 2 Saat İçinde Yanıt:</strong> Mesai saatleri içinde tüm taleplerinize 2 saat içinde detaylı teklif ve profesyonel danışmanlık sunuyoruz.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
