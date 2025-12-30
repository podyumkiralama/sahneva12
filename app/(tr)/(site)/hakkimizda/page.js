// app/(site)/hakkimizda/page.js
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BASE_SITE_URL, ORGANIZATION_ID } from "@/lib/seo/schemaIds";

/* ───── META & ISR ───── */
export const metadata = {
  title: "Hakkımızda | Sahneva - Profesyonel Etkinlik Teknolojileri",
  description:
    "10+ yıllık deneyimle Türkiye genelinde sahne kiralama, LED ekran, ses-ışık sistemleri ve profesyonel etkinlik prodüksiyonu. 700+ başarılı proje.",
  alternates: { canonical: "https://www.sahneva.com/hakkimizda" },
  openGraph: {
    title: "Hakkımızda | Sahneva Organizasyon - Profesyonel Etkinlik Teknolojileri",
    description:
      "10+ yıllık deneyimle Türkiye genelinde profesyonel etkinlik çözümleri. 700+ başarılı proje, %98 müşteri memnuniyeti.",
    url: "https://www.sahneva.com/hakkimizda",
    images: [
      {
        url: "https://www.sahneva.com/img/og/sahneva-og.webp",
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli",
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;
const SITE_URL = BASE_SITE_URL;

/* ───── STRUCTURED DATA ───── */
function AboutStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/hakkimizda#webpage`,
    url: `${SITE_URL}/hakkimizda`,
    name: "Hakkımızda | Sahneva - Profesyonel Etkinlik Teknolojileri",
    description:
      "Profesyonel sahne kiralama, LED ekran, ses-ışık sistemleri ve etkinlik prodüksiyon hizmetleri",
    image: `${SITE_URL}/img/og/sahneva-og.webp`,
    mainEntity: { "@id": ORGANIZATION_ID },
    inLanguage: "tr-TR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Base64 blur placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ───── MAIN COMPONENT ───── */
export default function HakkimizdaPage() {
  const PHONE = "+905453048671";
  const WA_TEXT = "Merhaba%2C+hakkınızda+sayfasından+ulaşıyorum.+Daha+fazla+bilgi+almak+istiyorum.";
  const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;
  const baseUrl = SITE_URL;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "Hakkımızda", url: `${baseUrl}/hakkimizda` },
  ];

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
        "Türkiye geneli lojistik ağımızı tamamladık. Büyük ölçekli etkinliklerde güvenilir çözüm ortağı olarak konumlandık.",
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

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <AboutStructuredData />

      {/* HERO - LED Ekran Sayfası ile Birebir Aynı (İstatistikler Hero İçinde) */}
      <section className="relative flex items-center justify-center overflow-hidden bg-slate-900 pt-20 min-h-[80vh] 2xl:min-h-[85vh]" aria-labelledby="hero-title">
        <div className="absolute inset-0">
          <Image 
            src="/img/hakkimizda-hero-corporate.webp"
            alt="Sahneva Profesyonel Ekip - Etkinlik Teknolojilerinde 10+ Yıllık Deneyim"
            fill 
            priority 
            className="object-cover"
            sizes="100vw"
            quality={85}
           
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
            <span className="text-sm font-bold text-white">2012'den Bugüne Güvenilir Çözüm</span>
          </div>

          <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl">
            Hakkımızda <span className="gradient-text gradient-text--safe-xl">Sahneva</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
            Etkinlik Teknolojilerinde • 10+ Yıl Deneyim • 700+ Proje
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-8">
            Türkiye'nin <span className="font-semibold text-white">1 numaralı etkinlik teknoloji partneri</span> olarak
            her projede teknik mükemmellik ve yaratıcı vizyonu buluşturuyoruz
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp üzerinden hemen iletişime geçin – yeni sekmede açılır"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
              role="button"
            >
              <span aria-hidden="true" className="text-xl mr-2">💬</span> 
              <span className="text-base">Hemen İletişime Geç</span>
            </Link>

            <Link
            href="#tarihce"
            aria-label="Şirket tarihçemizi öğrenin"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white/50 text-white bg-slate-900/85 backdrop-blur-lg hover:bg-slate-900/95 hover:border-white/70 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
              role="button"
            >
              <span aria-hidden="true" className="text-xl mr-2">📖</span> 
              <span className="text-base">Tarihçemiz</span>
            </Link>
          </div>

          {/* 3'lü İstatistik Kartları - Hero İçinde */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <span className="text-2xl mb-2" aria-hidden="true">🎬</span>
              <div className="text-xl font-black text-white">700+</div>
              <div className="text-white/80 text-sm">Başarılı Proje</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <span className="text-2xl mb-2" aria-hidden="true">⭐</span>
              <div className="text-xl font-black text-white">12+</div>
              <div className="text-white/80 text-sm">Yıl Deneyim</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <span className="text-2xl mb-2" aria-hidden="true">🗺️</span>
              <div className="text-xl font-black text-white">81</div>
              <div className="text-white/80 text-sm">İlde Hizmet</div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        {/* BİZ KİMİZ */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/50" aria-labelledby="biz-kimiz-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="biz-kimiz-title" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
                Biz{" "}
                <span className="gradient-text gradient-text--safe-xl">
                  Kimiz?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                2012'den bu yana etkinlik teknolojilerinde güvenilir çözüm ortağınız
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-blue-600">Sahneva</strong>, 2012'den bu yana etkinlik prodüksiyonu ve teknoloji çözümlerinde
                  <strong> Türkiye'nin öncü kuruluşudur</strong>. Sahne kiralama, LED ekran, ses-ışık sistemleri ve profesyonel kurulum hizmetlerinde
                  uzmanlaşmış ekibimizle, her etkinliği teknik mükemmellik ve yaratıcı vizyonla buluşturuyoruz.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Misyonumuz; <strong>güvenilir, yenilikçi ve müşteri odaklı</strong> çözümler sunarak kurumsal etkinliklerinizin
                  teknik altyapısını sorunsuz şekilde yönetmek, markanızın değerine değer katmaktır.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { number: "700+", label: "Başarılı Proje" },
                    { number: "98%", label: "Memnuniyet Oranı" },
                    { number: "81", label: "İlde Hizmet" },
                    { number: "15+", label: "Uzman Ekip" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100"
                      aria-label={`${stat.number} ${stat.label}`}
                    >
                      <div className="text-2xl font-black text-blue-600">{stat.number}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
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
              <h2 id="degerlerimiz-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                Değerlerimiz ve{" "}
                <span className="gradient-text gradient-text--safe-xl">
                  İlkelerimiz
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Kalite, güven ve müşteri memnuniyeti odaklı hizmet anlayışımızın temel taşları
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VALUES.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:scale-105"
                >
                  <div className="text-4xl mb-4 gradient-text gradient-text--safe-xl">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TARİHÇE */}
        <section id="tarihce" className="py-20 bg-white" aria-labelledby="tarihce-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="tarihce-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                Yolculuğumuz ve{" "}
                <span className="gradient-text gradient-text--safe-xl">
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
                      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-3xl" aria-hidden="true">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              {item.year}
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
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
        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900/95" aria-labelledby="musteri-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="musteri-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                Güvenilen{" "}
                <span className="gradient-text gradient-text--safe-xl">
                  Çözüm Ortağı
                </span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                10+ yıldır kurumsal firmalar, kamu kuruluşları ve organizasyon ajanslarına profesyonel hizmet  verdik hala sunuyoruz
              </p>
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
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105"
                    aria-label="WhatsApp'tan yazın – yeni sekmede açılır"
                  >
                    💬 WhatsApp'tan Yazın
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VİZYON & MİSYON */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/30" aria-labelledby="vizyon-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100">
                <div className="text-4xl mb-4" aria-hidden="true">🎯</div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">Misyonumuz</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Etkinlik teknolojilerinde <strong>yenilikçi, güvenilir ve sürdürülebilir</strong> çözümler sunarak
                  müşterilerimizin marka değerini artırmak, teknik mükemmellik ve yaratıcı vizyonla Türkiye'nin etkinlik sektörüne liderlik etmek.
                </p>
                <ul className="space-y-3 text-gray-700">
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
                <h3 className="text-3xl font-black text-gray-900 mb-6">Vizyonumuz</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  2028'e kadar <strong>Türkiye'nin en büyük etkinlik teknolojileri şirketi</strong> olmak, Avrupa ve Orta Doğu'da global bir marka haline gelmek. Dijital dönüşüm ve yeşil teknolojilerle sektörde yeni standartlar belirlemek.
                </p>
                <ul className="space-y-3 text-gray-700">
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
                href={`tel:${PHONE}`}
                className="group bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="Hemen ara - Profesyonel danışmanlık için"
              >
                <span className="flex items-center justify-center gap-2">📞 Hemen Ara</span>
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="WhatsApp'tan yaz - Hızlı teklif için (yeni sekmede açılır)"
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
      </div>
    </div>
  );
}
