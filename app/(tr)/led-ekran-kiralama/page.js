// app/led-ekran-kiralama/page.jsx (en üstte)
export const metadata = {
  title: "LED Ekran Kiralama | Profesyonel Çözümler | Sahneva",
  description:
    "P2-P6 piksel aralığı, 4K çözünürlük, yüksek parlaklık LED ekran kiralama. İç/dış mekan, konser, fuar ve kurumsal etkinlikler için profesyonel çözümler.",
  alternates: {
    canonical: "https://www.sahneva.com/led-ekran-kiralama",
  },
  openGraph: {
    title: "LED Ekran Kiralama | Profesyonel Çözümler",
    description:
      "P2-P6 piksel aralığında iç ve dış mekan LED ekran kiralama. Yüksek parlaklık, IP65 koruma ve profesyonel kurulum.",
    url: "https://www.sahneva.com/led-ekran-kiralama",
    type: "website",
    siteName: "Sahneva",
    locale: "tr_TR",
    images: [
      {
        url: "https://www.sahneva.com/img/hizmet-led-ekran.webp",
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
    images: ["https://www.sahneva.com/img/hizmet-led-ekran.webp"],
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
// Sayfa sonunda (örneğin <main> dışına)
function JsonLd() {
  const ORIGIN = "https://www.sahneva.com";
  const pageUrl = `${ORIGIN}/led-ekran-kiralama`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Anasayfa", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "LED Ekran Kiralama", item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "LED Ekran Kiralama",
        description: metadata.description,
        provider: { "@id": `${ORIGIN}#org` },
        areaServed: { "@type": "State", name: "İstanbul" },
        serviceType: "LED Ekran Kiralama",
        offers: {
          "@type": "Offer",
          priceCurrency: "TRY",
          description: "Profesyonel LED ekran kiralama hizmeti",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          ratingCount: "183",
          itemReviewed: { "@id": `${ORIGIN}#localbiz` },
        },
      },
      {
        "@type": "WebPage",
        "@id": pageUrl,
        name: metadata.title,
        description: metadata.description,
        url: pageUrl,
        mainEntity: { "@id": `${pageUrl}#service` },
        isPartOf: { "@id": `${ORIGIN}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: metadata.openGraph.images[0].url,
          width: 1200,
          height: 630,
        },
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        author: { "@id": `${ORIGIN}#org` },
      },
    ],
  };

  return (
    <script
      id="ld-json-led"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-slate-900 pt-20 min-h-[80vh]"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0">
        <Image
          src="/img/hizmet-led-ekran.webp"
          alt="Konser sahnesinde LED ekran kurulumu"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,..."
          loading="eager"
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
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30 mb-6">
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
          <span className="font-semibold text-white">
            {" "}
            profesyonel görsel çözümler
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href="https://wa.me/905453048671?text=Merhaba%2C+LED+ekran+kiralama+icin+teklif+istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp üzerinden hemen teklif alın"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">
              💬
            </span>
            <span className="text-base">Hemen Teklif Al</span>
          </Link>

          <Link
            href="#hizmetler"
            title="Hizmetlerimiz hakkında daha fazla bilgi edinin"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white/95 bg-white/10 backdrop-blur-lg hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">
              🎯
            </span>
            <span className="text-base">Hizmetlerimiz</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
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
              <article key={id} className="group bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 transition-all duration-500 h-full flex flex-col" aria-labelledby={id}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 id={id} className="text-2xl font-black mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-3 list-none">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Technical() {
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
            <article key={item.category} className="group bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full" aria-labelledby={`tech-${item.category}`}>
              <h3 id={`tech-${item.category}`} className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">{getIcon(item.category)}</span>
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{item.description}</p>
              <ul className="space-y-3 list-none">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto list-none">
          {USE_CASES.map((uc) => (
            <li key={uc.text}>
              <article className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 group hover:scale-105 h-full" aria-labelledby={`uc-${slugify(uc.text)}`}>
                <div className="flex flex-col items-start gap-4">
                  <div className="text-3xl bg-white/20 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {uc.icon}
                  </div>
                  <div>
                    <h3 id={`uc-${slugify(uc.text)}`} className="text-white font-bold text-xl mb-2 group-hover:text-blue-300 transition-colors">
                      {uc.text}
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
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
          <CaseGallery
            images={GALLERY_IMAGES}
            visibleCount={8}
            priorityCount={2}
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Daha fazla projemizi incelemek için galerimizi keşfedin
          </p>
          <Link
            href="/projeler"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 focus-ring"
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

        <article className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
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

          <div className="p-8 md:p-10 prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-600 prose-ul:mt-6 prose-ul:mb-6 prose-li:marker:text-blue-500">
            <h4>LED ekran seçiminde izleyici mesafesi en kritik faktördür.</h4>
            <p>
              Yakın mesafede P2.5-P3.9 piksel aralığı, açık hava için P4-P6 aralığı idealdir. Parlaklık değerleri 800–6500 nit arasında değişir.
            </p>
            <p>
              Sahneva, Türkiye genelinde konser, fuar, lansman ve kurumsal etkinlikler için profesyonel LED ekran çözümleri sunar.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
export default function LedEkranPage() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Technical />
      <StatsBand />
      <UseCases />
      <Articles />
      <JsonLd />
    </>
  );
}
