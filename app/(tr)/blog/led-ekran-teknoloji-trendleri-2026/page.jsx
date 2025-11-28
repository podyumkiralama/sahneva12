// app/(tr)/blog/led-ekran-teknoloji-trendleri-2026/page.jsx
import Image from "next/image";
import Link from "next/link";

/* ================== YAPILANDIRMA & SABİTLER ================== */
const SLUG = "led-ekran-teknoloji-trendleri-2026";
const BLOG_URL = `https://www.sahneva.com/blog/${SLUG}`;
const PUBLISH_DATE = "2025-12-28";
const AUTHOR_NAME = "Sahneva Teknik Ekibi";

/* ================== META DATA ================== */
export const metadata = {
  title:
    "2026 LED Ekran Teknolojileri: Kurumsal Etkinlikleri Şekillendirecek 7 Büyük Trend | Sahneva",
  description:
    "2026 yılında LED ekran teknolojisinde öne çıkacak yenilikler: P2.0 paneller, XR sahne sistemleri, COB yapı, transparan ve kavisli LED ekranlar, enerji verimli yeni nesil modüller.",
  alternates: {
    canonical: BLOG_URL,
  },
  image: "/img/blog/led-2026-hero.webp",
  openGraph: {
    title: "2026 LED Ekran Teknolojileri ve Trend Raporu",
    description:
      "Kurumsal etkinlikleri dönüştürecek LED ekran trendleri: P2.0 iç mekân panelleri, XR Ready LED duvarlar, COB teknolojisi, transparan LED ekranlar ve daha fazlası.",
    url: BLOG_URL,
    type: "article",
    locale: "tr_TR",
    siteName: "Sahneva",
    images: [
      {
        url: "https://www.sahneva.com/img/blog/led-2026-hero.webp",
        width: 1200,
        height: 630,
        alt: "2026 LED ekran teknolojisi trendlerini gösteren sahne ve LED ekran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 LED Ekran Teknolojisi Trendleri | Sahneva",
    description:
      "P2.0 LED paneller, XR Ready sahne sistemleri ve transparan ekranlarla 2026 etkinlik dünyası nasıl değişecek?",
    images: ["https://www.sahneva.com/img/blog/led-2026-hero.webp"],
  },
  keywords: [
    "2026 LED ekran",
    "P2.0 LED ekran",
    "XR LED wall",
    "COB LED teknolojisi",
    "transparan LED ekran",
    "kavisli LED ekran",
    "etkinlik teknolojileri",
    "LED ekran kiralama trendleri",
  ],
  authors: [{ name: AUTHOR_NAME }],
  publisher: "Sahneva",
  date: PUBLISH_DATE,
};

/* ================== FAQ VERİLERİ ================== */
const FAQ_ITEMS = [
  {
    question: "2026’da kurumsal etkinlikler için en çok hangi LED ekran tipi tercih edilecek?",
    answer:
      "İç mekân kurumsal etkinliklerde P2.0 ve P2.5 piksel aralığına sahip LED panellerin standart hâline gelmesi bekleniyor. Yakın izleme mesafesinde daha net görüntü ve güçlü marka algısı sunuyorlar.",
  },
  {
    question: "XR Ready LED ekran tam olarak ne anlama geliyor?",
    answer:
      "XR Ready paneller, kamera ile çekim yaparken titreşim ve çizgilenme oluşturmayan, yüksek yenileme hızına sahip LED ekranlardır. Özellikle canlı yayınlı lansmanlar ve CEO konuşmaları için ideal çözümdür.",
  },
  {
    question: "Transparan LED ekranlar hangi tür etkinliklerde kullanılmalı?",
    answer:
      "Transparan LED ekranlar en çok fuar standları, AVM etkinlikleri, showroom ve vitrin uygulamalarında tercih edilir. Hem mekânın görünürlüğünü korur hem de dikkat çekici bir dijital yüzey oluşturur.",
  },
  {
    question: "COB LED paneller kiralama sektöründe gerçekten fark yaratıyor mu?",
    answer:
      "Evet. COB teknolojisi, LED yüzeyini daha dayanıklı hâle getirir ve darbelere karşı korur. Sık kurulum–söküm yapılan etkinliklerde panel ömrünü artırır, bakım maliyetini düşürür.",
  },
  {
    question: "2026’da LED ekran kiralama bütçeleri artacak mı?",
    answer:
      "Yüksek teknoloji panellerin birim maliyeti daha yüksek olsa da enerji verimliliği ve kullanım süresi uzadığı için toplam sahip olma maliyeti düşer. Doğru planlama ile bütçede dramatik artış olmadan daha iyi görüntü kalitesi elde etmek mümkündür.",
  },
];

/* ================== SCHEMA (JSON-LD) ================== */
function ArticleSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${BLOG_URL}#article`,
        headline:
          "2026 LED Ekran Teknolojileri: Kurumsal Etkinlikleri Şekillendirecek 7 Büyük Trend",
        description: metadata.description,
        image: "https://www.sahneva.com/img/blog/led-2026-hero.webp",
        datePublished: PUBLISH_DATE,
        dateModified: new Date().toISOString().split("T")[0],
        author: {
          "@type": "Organization",
          name: AUTHOR_NAME,
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
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": BLOG_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Anasayfa",
            item: "https://www.sahneva.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://www.sahneva.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "2026 LED Ekran Teknolojileri",
            item: BLOG_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ================== BİLEŞENLER ================== */
const Breadcrumbs = () => (
  <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
    <ol className="flex items-center space-x-2 flex-wrap">
      <li>
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Anasayfa
        </Link>
      </li>
      <li aria-hidden="true" className="text-gray-300">
        /
      </li>
      <li>
        <Link href="/blog" className="hover:text-blue-600 transition-colors">
          Blog
        </Link>
      </li>
      <li aria-hidden="true" className="text-gray-300">
        /
      </li>
      <li
        className="text-gray-900 font-medium truncate"
        aria-current="page"
      >
        2026 LED Ekran Teknolojileri
      </li>
    </ol>
  </nav>
);

const TableOfContents = () => (
  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6 hidden lg:block">
    <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
      İçindekiler
    </h4>
    <ul className="space-y-2 text-sm">
      {[
        { id: "p20-standard", label: "1. P2.0: Yeni İç Mekân Standardı" },
        { id: "xr-ready", label: "2. XR Ready LED Duvarlar" },
        { id: "cob-tech", label: "3. COB LED Teknolojisi" },
        { id: "transparent-led", label: "4. Transparan LED Ekranlar" },
        { id: "curved-led", label: "5. Kavisli (Curved) LED Sahne Tasarımları" },
        { id: "outdoor-modules", label: "6. Yeni Nesil Dış Mekân Modülleri" },
        { id: "energy-budget", label: "7. Enerji Verimliliği ve Bütçe Planlaması" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ].map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all block"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/* ================== ANA SAYFA ================== */
export default function BlogPostLedTrends() {
  return (
    <>
      <ArticleSchema />

      {/* --- HERO SECTION --- */}
      <header className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-blue-900/40 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/blog/led-2026-hero.webp"
            alt="Geniş sahnede 2026 LED ekran teknolojilerini temsil eden kurumsal etkinlik"
            fill
            className="object-cover opacity-65"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
            2026 LED Ekran Trend Raporu
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
            2026 LED Ekran Teknolojileri <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              Kurumsal Etkinlikleri Şekillendirecek 7 Trend
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light antialiased">
            P2.0 paneller, XR Ready duvarlar, transparan ve kavisli LED ekranlar… 
            2026’da sahneler ve etkinlik deneyimi nasıl değişecek?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 mt-8 pt-8 border-t border-white/10">
            <time dateTime={PUBLISH_DATE} className="flex items-center gap-2">
              <span>📅</span> 28 Aralık 2025
            </time>
            <span className="flex items-center gap-2">
              <span>⏱️</span> 7 dk okuma
            </span>
            <span className="flex items-center gap-2">
              <span>✍️</span> {AUTHOR_NAME}
            </span>
          </div>
        </div>
      </header>

      {/* --- İSTATİSTİKLER (Responsive Grid) --- */}
      <section
        className="relative -mt-10 z-30 px-4"
        aria-label="LED ekran trendleri ile ilgili öne çıkan veriler"
      >
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-gray-100">
              {[
                {
                  val: "%65",
                  label: "2026’da P2.0 & P2.5 kullanım payı (iç mekân etkinliklerde tahmini)",
                  color: "text-blue-600",
                },
                {
                  val: "240Hz",
                  label: "XR Ready panellerde standart yenileme hızına geçiş",
                  color: "text-indigo-600",
                },
                {
                  val: "%30",
                  label: "Yeni nesil modüllerle sağlanan ortalama enerji tasarrufu",
                  color: "text-emerald-600",
                },
                {
                  val: "3x",
                  label: "COB panellerde darbe dayanımındaki artış (klasik SMD’ye göre)",
                  color: "text-purple-600",
                },
              ].map((stat, i) => (
                <div key={i} className="text-center group px-2">
                  <div
                    className={`text-3xl md:text-4xl font-black ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.val}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium leading-snug max-w-[170px] mx-auto">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs />

          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* SOL KOLON (MAKALE) */}
            <main className="lg:w-2/3">
              <article className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-32 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl max-w-none">
                {/* Intro highlight */}
                <div className="bg-blue-50/60 p-6 rounded-xl border-l-4 border-blue-500 mb-8 not-prose">
                  <p className="text-lg text-gray-700 font-medium italic m-0">
                    LED ekranlar artık sadece görüntü yüzeyi değil, kurumsal etkinliklerin{" "}
                    <strong>en kritik iletişim sahnesi</strong>. 2026’da sahne tasarımı,
                    marka deneyimi ve dijital içerik üretimi LED teknolojisindeki
                    yeniliklerle birlikte yeniden şekilleniyor.
                  </p>
                </div>

                <p>
                  Lansman, bayi toplantısı, kongre ya da festival fark etmiyor; sahnede
                  kullanılan LED ekranın kalitesi, etkinliğin algısını doğrudan etkiliyor.
                  Peki yaklaşan yılda hangi teknolojiler öne çıkacak, hangi yatırımlar
                  gerçekten gerekli ve hangi trendler sadece “moda”dan ibaret?
                </p>

                <figure className="my-10 not-prose">
                  <Image
                    src="/img/blog/led-2026-sahne-genel.webp"
                    alt="Geniş LED ekranlı modern kurumsal sahne ve ışık tasarımı"
                    width={1200}
                    height={675}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-500 text-center font-medium">
                    2026’da LED ekran; sahne dekorunun değil, deneyimin merkezinde yer alıyor.
                  </figcaption>
                </figure>

                {/* Pro Tip Box */}
                <div className="my-10 bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm not-prose">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0" aria-hidden="true">
                      💡
                    </span>
                    <div>
                      <h4 className="text-blue-900 font-bold mt-0 mb-2 text-lg">
                        Profesyonel İpucu
                      </h4>
                      <p className="mb-2 text-blue-800 text-base">
                        2026 planlamasında LED ekran tekliflerini değerlendirirken sadece{" "}
                        <strong>metrekare fiyatına</strong> değil, panel tipine, piksel
                        aralığına ve enerji tüketimine de mutlaka bakın:
                      </p>
                      <ul className="text-blue-800 list-disc pl-5 space-y-1 text-sm m-0">
                        <li className="m-0">
                          P2.0 ve üzeri panellerde sunumlar, canlı yayın ve sahne arka planı
                          çok daha net görünür.
                        </li>
                        <li className="m-0">
                          XR Ready paneller kamera kaydı yapacaksanız ciddi avantaj sağlar.
                        </li>
                        <li className="m-0">
                          Yeni nesil düşük tüketimli modüller, uzun süreli etkinliklerde
                          elektrik maliyetini hissedilir derecede düşürür.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 id="p20-standard">
                  1. P2.0: Kurumsal İç Mekânlarda Yeni Standart
                </h2>
                <p>
                  Birkaç yıl öncesine kadar P3.9 ve P4.8 paneller salon etkinliklerinin
                  vazgeçilmeziydi. Artık konfor alanı değişiyor. 2026 ile birlikte özellikle{" "}
                  <strong>kurumsal lansmanlar, ürün tanıtımları ve premium toplantılar</strong>{" "}
                  için P2.0 ve P2.5 paneller standart hâline geliyor.
                </p>
                <p>
                  2.0 mm piksel aralığı sayesinde, 3–7 metre izleme mesafesinde bile
                  metinler ve ince detaylar son derece net görünüyor. Bu da hem sahnedeki
                  sunumları hem de markanın görsel dünyasını çok daha güçlü kılıyor.
                </p>

                <div className="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm text-left bg-white min-w-[600px]">
                    <caption className="sr-only">
                      Farklı piksel aralıklarının karşılaştırma tablosu
                    </caption>
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-xs border-b">
                      <tr>
                        <th scope="col" className="p-4 font-bold">
                          Piksel Aralığı
                        </th>
                        <th scope="col" className="p-4 font-bold">
                          Önerilen Mesafe
                        </th>
                        <th scope="col" className="p-4 font-bold">
                          Tipik Kullanım
                        </th>
                        <th scope="col" className="p-4 font-bold">
                          Görsel Kalite
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="p-4 font-bold text-blue-600">
                          P2.0
                        </th>
                        <td className="p-4">3–7 m</td>
                        <td className="p-4">Lansman, premium konferans</td>
                        <td className="p-4 text-gray-700">Ultra yüksek netlik</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="p-4 font-bold text-blue-600">
                          P2.5
                        </th>
                        <td className="p-4">4–10 m</td>
                        <td className="p-4">Salon toplantıları</td>
                        <td className="p-4 text-gray-700">Yüksek çözünürlük</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="p-4 font-bold text-blue-600">
                          P3.9
                        </th>
                        <td className="p-4">6–18 m</td>
                        <td className="p-4">Büyük salon, fuar standı</td>
                        <td className="p-4 text-gray-700">Standart etkinlik seviyesi</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  Kurumsal imajı güçlü göstermek istediğiniz lansmanlar için{" "}
                  <Link href="/led-ekran-kiralama" title="LED Ekran Kiralama">
                    LED ekran kiralama
                  </Link>{" "}
                  teklifinde P2.0 seçeneğini özellikle sormanızı tavsiye ederiz.
                </p>

                <h2 id="xr-ready">2. XR Ready LED Duvarlar: Canlı Yayınlarda Yeni Çağ</h2>
                <p>
                  Kamera ile çekim yapılan etkinliklerde klasik panellerde oluşan{" "}
                  <strong>titreme ve tarama çizgileri</strong>, marka algısını zedeleyebiliyor.
                  2026’da XR Ready paneller bu sorunu tamamen ortadan kaldırmaya odaklanıyor.
                </p>
                <ul>
                  <li>240Hz ve üzeri yenileme hızı</li>
                  <li>Düşük gecikme (low latency) değerleri</li>
                  <li>Kamera ile senkronize çalışan görüntü kontrol sistemleri</li>
                </ul>
                <p>
                  Bu sayede hem salondaki katılımcılar hem de canlı yayını ekran başından
                  izleyenler, aynı kaliteyi deneyimleyebiliyor.
                </p>

                <h2 id="cob-tech">3. COB LED Teknolojisi: Dayanıklılık ve Homojen Görüntü</h2>
                <p>
                  COB (Chip-on-Board) LED paneller, özellikle kiralama sektöründe{" "}
                  <strong>dayanıklılık</strong> açısından ciddi fark yaratıyor. LED’ler
                  yüzeye gömülü olduğu için darbelere ve toza karşı daha korunaklı.
                </p>
                <p>
                  Bu da sık kurulum–söküm yapılan tur organizasyonları, roadshow ve uzun
                  süreli fuarlarda daha az arıza, daha az bakım ve daha stabil bir görüntü
                  anlamına geliyor.
                </p>

                <figure className="my-10 not-prose">
                  <Image
                    src="/img/blog/led-2026-cob-detay.webp"
                    alt="COB LED panel yüzey detayını gösteren yakın plan görüntü"
                    width={1200}
                    height={750}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </figure>

                <h2 id="transparent-led">
                  4. Transparan LED Ekranlar: Fuar ve Showroom’un Yeni Yıldızı
                </h2>
                <p>
                  Özellikle otomotiv, teknoloji ve moda sektöründe{" "}
                  <strong>transparan LED ekranlar</strong> ciddi yükselişte. Cam yüzeylere
                  uygulanabilen bu paneller, mekânın şeffaflığını bozmadan güçlü bir dijital
                  yüzey sunuyor.
                </p>
                <p>
                  Fuar standında, showroom vitrininde veya AVM etkinliklerinde marka
                  görünürlüğünü artırmak için transparan LED ekran, 2026’da ajans
                  sunumlarının vazgeçilmez kalemlerinden biri olacak.
                </p>

                <h2 id="curved-led">
                  5. Kavisli (Curved) LED Sahne Tasarımları ile 180° Etki
                </h2>
                <p>
                  Düz LED ekranlar artık klasikleşti. 2026’da özellikle büyük lansmanlar ve
                  yıl sonu toplantılarında <strong>kavisli LED sahne</strong> tasarımlarını
                  daha sık göreceğiz.
                </p>
                <ul>
                  <li>Katılımcıların sahneye farklı açılardan hâkim olmasını sağlar.</li>
                  <li>Sunum ve videolar 180° görünür hâle gelir.</li>
                  <li>Stage design fotoğraf ve video çekimlerinde daha etkileyici durur.</li>
                </ul>

                <h2 id="outdoor-modules">
                  6. Yeni Nesil Dış Mekân Modülleri: P5.1 – P6.2 ile Daha Parlak Sahne
                </h2>
                <p>
                  Konser, festival ve mitinglerde kullanılan dış mekân panelleri de boş
                  durmuyor. Yeni nesil P5.1 ve P6.2 modüller;{" "}
                  <strong>daha yüksek parlaklık</strong>,{" "}
                  <strong>daha düşük enerji tüketimi</strong> ve{" "}
                  <strong>daha hafif kabin yapısı</strong> ile geliyor.
                </p>
                <p>
                  Böylece hem kurulum süresi kısalıyor hem de vinç ve işçilik maliyetleri
                  azalıyor. Uzun süreli açık hava etkinliklerinde elektrik maliyeti de
                  hissedilir şekilde düşüyor.
                </p>

                <h2 id="energy-budget">
                  7. Enerji Verimliliği ve Bütçe Planlaması: Sadece m² Fiyatına Bakmayın
                </h2>
                <p>
                  LED ekran teklifleri karşılaştırılırken çoğu zaman sadece{" "}
                  <strong>metrekare fiyatına</strong> bakılıyor. Oysa 2026’da enerji
                  maliyetleri, toplam bütçenin önemli bir parçası hâline gelecek.
                </p>
                <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 space-y-5">
                  {[
                    {
                      label: "Panel Tipi (Piksel Aralığı)",
                      pct: 35,
                      w: "35%",
                      color: "bg-blue-600",
                    },
                    {
                      label: "Enerji Tüketimi",
                      pct: 25,
                      w: "25%",
                      color: "bg-emerald-600",
                    },
                    {
                      label: "Kabin Ağırlığı & Kurulum",
                      pct: 20,
                      w: "20%",
                      color: "bg-indigo-500",
                    },
                    {
                      label: "Kontrol Sistemi & İçerik",
                      pct: 20,
                      w: "20%",
                      color: "bg-gray-500",
                    },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1.5 text-sm font-bold text-gray-700">
                        <span>{item.label}</span>
                        <span>%{item.pct}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: item.w }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trend Box */}
                <div className="not-prose my-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🚀</span> 2026 İçin Stratejik LED Ekran
                    Önerileri
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>
                      Kurumsal lansmanlarda minimum P2.5, mümkünse P2.0 panel talep edin.
                    </li>
                    <li>
                      Canlı yayın veya kayıt varsa XR Ready panel ve uygun kontrol
                      sistemlerini özellikle belirtin.
                    </li>
                    <li>
                      Fuar & showroom projelerinde transparan LED ekran alternatifini mutlaka
                      değerlendirin.
                    </li>
                    <li>
                      Bütçe isterken sadece m² fiyatını değil, teknik özellikleri de
                      kıyaslayan teklifler talep edin.
                    </li>
                  </ul>
                </div>

                {/* FAQ SECTION */}
                <h2 id="faq">Sık Sorulan Sorular</h2>
                <section
                  aria-labelledby="faq-heading"
                  className="not-prose space-y-3 mt-6"
                >
                  <h3 id="faq-heading" className="sr-only">
                    Sıkça Sorulan Sorular
                  </h3>
                  {FAQ_ITEMS.map((item, index) => (
                    <details
                      key={index}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:ring-2 open:ring-blue-100 open:border-blue-300 transition-all duration-200"
                    >
                      <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer font-semibold text-gray-800 select-none bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        {item.question}
                        <span className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180 text-gray-400">
                          ▼
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </section>

                {/* BOTTOM CTA */}
                <div className="not-prose mt-16 bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <h3 className="text-2xl md:text-3xl font-black mb-4 relative z-10">
                    2026 Etkinliklerinizde LED Sahneyi Güçlendirelim
                  </h3>
                  <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10 text-lg">
                    P2.0 iç mekân panellerden dev açık hava LED ekranlarına kadar, etkinlik
                    konseptinize en uygun çözümü birlikte planlayalım. Ücretsiz keşif ve
                    projelendirme için hemen bize ulaşın.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <a
                      href="https://wa.me/905453048671"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg"
                    >
                      <span>💬</span> WhatsApp&apos;tan Yazın
                    </a>
                    <Link
                      href="/led-ekran-kiralama"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg"
                    >
                      <span>🖥️</span> LED Ekran Kiralama Sayfası
                    </Link>
                  </div>
                </div>
              </article>
            </main>

            {/* --- SAĞ KOLON (STICKY SIDEBAR) --- */}
            <aside className="lg:w-1/3 relative">
              <div className="sticky top-24 space-y-8">
                {/* İÇİNDEKİLER (Desktop Only) */}
                <TableOfContents />

                {/* TEKLİF KUTUSU */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    LED Ekran İçin Hızlı Teklif Alın
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    P2.0 iç mekân, transparan veya açık hava LED ekran seçenekleri için
                    etkinlik detaylarınızı paylaşın, 2 saat içinde projelendirilmiş teklif
                    gönderelim.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/905453048671"
                      className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-green-200"
                    >
                      <span>📱</span> WhatsApp
                    </a>
                    <Link
                      href="/iletisim"
                      className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl transition-all border border-gray-200"
                    >
                      <span>✉️</span> Form Doldur
                    </Link>
                  </div>
                </div>

                {/* CHECKLIST DOWNLOAD (LEAD MAGNET) */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200">
                    ÜCRETSİZ
                  </span>
                  <div className="text-4xl mb-2">📋</div>
                  <h4 className="font-bold text-indigo-900 mb-2">
                    LED Ekran Seçim Checklist&apos;i
                  </h4>
                  <p className="text-indigo-800/80 text-xs mb-4 leading-relaxed">
                    Piksel aralığı, parlaklık, modül tipi ve enerji tüketimi için kontrol
                    listesini PDF olarak indirin, teklif alırken hiçbir detayı atlamayın.
                  </p>
                  <button
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md cursor-not-allowed opacity-70"
                    disabled
                  >
                    Checklist&apos;i İndir (Yakında)
                  </button>
                </div>

                {/* HİZMETLER MENÜSÜ */}
                <nav
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                  aria-label="İlgili Hizmetler"
                >
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-gray-500">
                    İlgili Hizmetlerimiz
                  </h4>
                  <ul className="space-y-1">
                    {[
                      {
                        href: "/led-ekran-kiralama",
                        icon: "🖥️",
                        label: "LED Ekran Kiralama",
                      },
                      {
                        href: "/sahne-kiralama",
                        icon: "🎭",
                        label: "Sahne Kiralama",
                      },
                      {
                        href: "/ses-isik-sistemleri",
                        icon: "🎵",
                        label: "Ses & Işık Sistemleri",
                      },
                      {
                        href: "/kurumsal-organizasyon",
                        icon: "🏢",
                        label: "Kurumsal Organizasyon",
                      },
                      {
                        href: "/cadir-kiralama",
                        icon: "⛺",
                        label: "Çadır Kiralama",
                      },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-blue-600 group"
                        >
                          <span className="bg-white group-hover:bg-blue-50 text-lg w-8 h-8 flex items-center justify-center rounded-md border border-gray-100 shadow-sm transition-colors">
                            {link.icon}
                          </span>
                          <span className="font-medium text-sm">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
