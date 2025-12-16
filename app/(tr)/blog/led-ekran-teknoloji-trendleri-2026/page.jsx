// app/(tr)/blog/led-ekran-2026-teknoloji-trendleri/page.jsx
import Image from "next/image";
import Link from "next/link";

// Statik image import – INVALID_IMAGE_OPTIMIZE_REQUEST hatasını önler
import heroImg from "@/public/img/blog/led-2026-hero.webp";
import stageWideImg from "@/public/img/blog/led-2026-sahne-genis.webp";
import cobMacroImg from "@/public/img/blog/cob-led-macro.webp";

/* ================== YAPILANDIRMA & SABİTLER ================== */
const BLOG_URL =
  "https://www.sahneva.com/blog/led-ekran-2026-teknoloji-trendleri";
const PUBLISH_DATE = "2025-12-15";
const AUTHOR_NAME = "Sahneva İçerik Ekibi";

/* ================== META DATA ================== */
export const metadata = {
  title:
    "2026 LED Ekran Teknolojisi Trendleri: COB, 2.0 Nesil Paneller ve Sahne Tasarımı | Sahneva",
  description:
    "2026’da LED ekran teknolojisinde COB paneller, ultra düşük piksel aralığı ve HDR sahne tasarımı etkinlikleri nasıl değiştirecek? Lansman, festival ve kurumsal etkinlikler için teknik rehber.",
  alternates: {
    canonical: BLOG_URL,
  },
  image: "/img/blog/led-2026-hero.webp",
  openGraph: {
    title: "2026 LED Ekran Teknolojisi Trendleri ve Etkinlik Tasarımı",
    description:
      "COB LED paneller, 2.0 nesil sürücüler ve HDR içerik üretimi ile 2026’da etkinlik sahneleri nasıl dönüşüyor?",
    url: BLOG_URL,
    type: "article",
    locale: "tr_TR",
    siteName: "Sahneva",
    images: [
      {
        url: "https://www.sahneva.com/img/blog/led-2026-hero.webp",
        width: 1200,
        height: 630,
        alt: "Geniş sahnede 2026 LED ekran teknolojilerini temsil eden kurumsal etkinlik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 LED Ekran Teknolojisi Trendleri",
    description:
      "COB LED, ince piksel aralığı ve HDR içerik ile sahne tasarımında yeni dönem.",
    images: ["https://www.sahneva.com/img/blog/led-2026-hero.webp"],
  },
  keywords: [
    "LED ekran trendleri 2026",
    "COB LED panel",
    "2.0 nesil LED sürücü",
    "HDR LED ekran",
    "etkinlik LED ekran kiralama",
    "sahne LED ekran tasarımı",
    "fine pitch LED",
  ],
  authors: [{ name: AUTHOR_NAME }],
  publisher: "Sahneva",
  date: PUBLISH_DATE,
};

/* ================== FAQ VERİLERİ ================== */
const FAQ_ITEMS = [
  {
    question: "COB LED panel ile SMD LED panel arasındaki temel fark nedir?",
    answer:
      "COB (Chip on Board) LED panellerde LED çipleri tek bir yüzeyde bütünleşik halde bulunur ve bu yapı daha homojen ışık, daha yüksek kontrast ve daha dayanıklı bir ekran yüzeyi sağlar. SMD panellerde ise her piksel üç ayrı LED bileşeninden oluşur.",
  },
  {
    question: "2026’da iç mekan sahneler için ideal piksel aralığı nedir?",
    answer:
      "Kurumsal etkinlik, lansman ve TV prodüksiyonuna yakın işler için genellikle P1.9 – P2.6 aralığı tercih edilir. 6–20 metre izleme mesafelerinde hem kamera için hem izleyici gözü için oldukça keskin bir görüntü sunar.",
  },
  {
    question: "COB LED paneller dış mekan etkinliklerde kullanılabilir mi?",
    answer:
      "Teknik olarak mümkündür ancak COB paneller daha çok iç mekan, stüdyo ve broadcast işler için tasarlanır. Yüksek parlaklık gerektiren açık hava etkinliklerinde genellikle SMD tabanlı outdoor paneller tercih edilir.",
  },
  {
    question: "HDR destekli LED ekran gerçekten fark yaratıyor mu?",
    answer:
      "Evet. HDR destekli LED ekranlar, özellikle ürün lansmanlarında metalik yüzeyler, derin siyahlar ve canlı renk geçişlerinde çok daha gerçekçi bir algı oluşturur. Profesyonel içerik üretimiyle birleştiğinde sahne adeta TV stüdyosu kalitesine yükselir.",
  },
  {
    question: "Sahneva 2026 LED trendlerine uygun ne tür çözümler sunuyor?",
    answer:
      "Sahneva; COB ve fine-pitch iç mekan paneller, 2.0 nesil sürücülü yüksek yenileme oranına sahip LED ekran sistemleri, HDR renk kalibrasyonu, medya server entegrasyonları ve komple sahne–ses–ışık altyapısını anahtar teslim olarak sunar.",
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
          "2026 LED Ekran Teknolojisi Trendleri: COB Paneller ve Fine-Pitch Sahne Tasarımı",
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
            name: "2026 LED Ekran Teknolojisi Trendleri",
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
  <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
    <ol className="flex items-center space-x-2 flex-wrap">
      <li>
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Anasayfa
        </Link>
      </li>
      <li aria-hidden="true" className="text-gray-500">
        /
      </li>
      <li>
        <Link href="/blog" className="hover:text-blue-600 transition-colors">
          Blog
        </Link>
      </li>
      <li aria-hidden="true" className="text-gray-500">
        /
      </li>
      <li
        className="text-gray-900 font-medium truncate"
        aria-current="page"
      >
        2026 LED Ekran Teknolojisi Trendleri
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
        { id: "fine-pitch", label: "1. Fine-Pitch ve P1.x Dönemi" },
        { id: "cob-led", label: "2. COB LED 2.0 Nesli" },
        { id: "hdr", label: "3. HDR İçerik ve Renk Kalibrasyonu" },
        { id: "sahne-tasarim", label: "4. 2026 Sahne Tasarımı Örnekleri" },
        { id: "teknik-checklist", label: "Teknik Checklist" },
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
export default function LedTrends2026Page() {
  return (
    <>
      <ArticleSchema />

      {/* --- HERO SECTION --- */}
      <header className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-blue-900/40 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt="Geniş sahnede 2026 LED ekran teknolojilerini temsil eden kurumsal etkinlik"
            fill
            className="object-cover opacity-65"
            priority
            sizes="100vw"
            fetchPriority="high"
          />
        </div>
        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
            2026 LED Ekran Trend Raporu
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
            2026’da LED Ekran{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300">
              Sahne Tasarımını Nasıl Değiştiriyor?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light antialiased">
            COB paneller, 2.0 nesil sürücüler ve HDR içerik ile
            kurumsal etkinliklerde LED ekranlar artık sadece fon değil,
            başrol oyuncu. Peki teknik kararları 2026’da nasıl almalısınız?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200 mt-8 pt-8 border-t border-white/10">
            <time dateTime={PUBLISH_DATE} className="flex items-center gap-2">
              <span>📅</span> 15 Aralık 2025
            </time>
            <span className="flex items-center gap-2">
              <span>⏱️</span> 7 dk okuma
            </span>
            <span className="flex items-center gap-2">
              <span>✍️</span> {AUTHOR_NAME}
            </span>
          </div>

          {/* Kontrastı düzeltilmiş çağrı butonları */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/905453048671"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LED projeniz için WhatsApp üzerinden yazın — yeni sekmede açılır"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-7 py-3.5 shadow-lg shadow-emerald-900/40 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              <span>💬</span>
              <span>LED Projeniz İçin WhatsApp&apos;tan Yazın</span>
            </a>
            <Link
              href="/led-ekran-kiralama"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 border border-white/20 backdrop-blur-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
            >
              <span>🖥️</span>
              <span>LED Ekran Kiralama Sayfasını İncele</span>
            </Link>
          </div>
        </div>
      </header>

      {/* --- İSTATİSTİKLER --- */}
      <section
        className="relative -mt-10 z-30 px-4"
        aria-label="2026 LED Ekran İstatistikleri"
      >
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-gray-100">
              {[
                {
                  val: "P1.5",
                  label: "2026 iç mekan sahnelerde ortalama piksel aralığı",
                  color: "text-blue-700",
                },
                {
                  val: "3840Hz",
                  label: "Yeni nesil sürücülerde minimum yenileme oranı",
                  color: "text-indigo-700",
                },
                {
                  val: "↑ 60%",
                  label: "COB LED ile artan darbe ve çizilme dayanımı",
                  color: "text-emerald-700",
                },
                {
                  val: "HDR",
                  label: "Büyük markaların tercih ettiği yeni standart",
                  color: "text-amber-700",
                },
              ].map((stat, i) => (
                <div key={i} className="text-center group px-2">
                  <div
                    className={`text-3xl md:text-4xl font-black ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.val}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium leading-snug max-w-[160px] mx-auto">
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
            <div className="lg:w-2/3">
              <article className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-32 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl max-w-none">
                <div className="bg-blue-50/60 p-6 rounded-xl border-l-4 border-blue-500 mb-8 not-prose">
                  <p className="text-lg text-gray-700 font-medium italic m-0">
                    2018’de “LED ekran olsun yeter” dönemi bitti. 2026’da
                    markalar; piksel aralığı, sürücü teknolojisi, HDR desteği
                    ve kamera dostu flicker performansını aynı anda talep
                    ediyor.
                  </p>
                  <p className="text-sm text-gray-600 mt-3 mb-0">
                    Bu yazı, LED ekran kiralama kararı almadan önce teknik
                    bir checklist oluşturmanız için hazırlandı.
                  </p>
                </div>

                <p>
                  Büyük bir ürün lansmanı, global bayi toplantısı veya
                  hibrit bir konferans planlıyor olabilirsiniz. Ekranda
                  gördüğünüz görsel, salondaki herkes için markanızın
                  vitrini. Piksel aralığı doğru seçilmediğinde veya sürücü
                  kartları yetersiz olduğunda; özellikle kamera
                  çekimlerinde banding, flicker ve renk bozulmaları ortaya
                  çıkar.
                </p>

                <figure className="my-10 not-prose">
                  <Image
                    src={stageWideImg}
                    alt="Geniş LED ekranlı modern kurumsal sahne ve ışık tasarımı"
                    width={stageWideImg.width}
                    height={stageWideImg.height}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    2026 sahne tasarımlarında LED ekran; dekorun değil,
                    hikâyenin merkezinde konumlanıyor.
                  </figcaption>
                </figure>

                {/* Profesyonel ipucu – heading yerine bold text (başlık sırası uyarısını çözüyor) */}
                <div className="my-10 bg-gradient-to-r from-indigo-50 to-cyan-50 border border-blue-100 p-6 rounded-2xl shadow-sm not-prose">
                  <div className="flex items-start gap-4">
                    <span
                      className="text-3xl flex-shrink-0"
                      aria-hidden="true"
                    >
                      💡
                    </span>
                    <div>
                      <p className="text-blue-900 font-bold mt-0 mb-2 text-lg">
                        Profesyonel ipucu
                      </p>
                      <p className="mb-2 text-blue-800 text-base">
                        2026 planlamasında LED ekran tekliflerini
                        değerlendirirken sadece metrekaresine değil,
                        <strong> panel tipine, piksel aralığına ve sürücü
                        kartı nesline</strong> mutlaka bakın.
                      </p>
                      <ul className="text-blue-800 list-disc pl-5 space-y-1 text-sm m-0">
                        <li className="m-0">
                          Teklif dosyasında piksel aralığı (P1.9 / P2.6 vb.)
                          net yazmalı.
                        </li>
                        <li className="m-0">
                          Sürücü yenileme oranı en az 3840Hz ve üzeri
                          olmalı.
                        </li>
                        <li className="m-0">
                          Kullanılacak paneller için marka/model bilgisi
                          istenmeli.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 id="fine-pitch">1. Fine-Pitch ve P1.x Dönemi</h2>
                <p>
                  10–15 yıl önce P6 – P10 paneller konferans salonları
                  için standarttı. 2026’da ise iç mekan sahnelerde{" "}
                  <strong>P1.5 – P2.6</strong> aralığı yeni normal haline
                  geldi. Bunun anlamı: aynı sahne genişliğinde daha keskin
                  metinler, daha net grafikler ve kamera için TV
                  kalitesinde görüntü.
                </p>
                <p>
                  Özellikle <strong>CEO konuşmaları</strong> ve hissedar
                  toplantıları gibi hassas etkinliklerde, arkadaki LED
                  ekranın gözle görülen piksel çizgileri oluşturması marka
                  algısını ciddi biçimde zedeliyor. Bu yüzden izleme
                  mesafesini doğru analiz edip piksel aralığını bu mesafe
                  üzerinden seçmek kritik.
                </p>

                <div className="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm text-left bg-white min-w-[600px]">
                    <caption className="sr-only">
                      2026 iç mekan LED ekran piksel aralığı önerileri
                    </caption>
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-xs border-b">
                      <tr>
                        <th scope="col" className="p-4 font-bold">
                          Piksel Aralığı
                        </th>
                        <th scope="col" className="p-4 font-bold">
                          Önerilen İzleme Mesafesi
                        </th>
                        <th scope="col" className="p-4 font-bold">
                          Tipik Kullanım
                        </th>
                        <th scope="col" className="p-4 font-bold">
                          Not
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th
                          scope="row"
                          className="p-4 font-bold text-blue-600"
                        >
                          P1.5
                        </th>
                        <td className="p-4">2–12 m</td>
                        <td className="p-4">
                          Stüdyo, premium kurumsal sahne
                        </td>
                        <td className="p-4 text-gray-600">
                          Kamera çekimi yoğun çalışmalarda ideal
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th
                          scope="row"
                          className="p-4 font-bold text-blue-600"
                        >
                          P2.0
                        </th>
                        <td className="p-4">3–18 m</td>
                        <td className="p-4">
                          Lansman, konferans, kongre
                        </td>
                        <td className="p-4 text-gray-600">
                          Fiyat / performans dengesi en iyi seviye
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th
                          scope="row"
                          className="p-4 font-bold text-blue-600"
                        >
                          P2.6
                        </th>
                        <td className="p-4">4–25 m</td>
                        <td className="p-4">Büyük salon, fuar sahnesi</td>
                        <td className="p-4 text-gray-600">
                          Bütçe dostu ancak kamera için iyi kalibrasyon
                          ister
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="cob-led">2. COB LED 2.0 Nesli: Dayanıklılık ve Siyah Seviye</h2>
                <p>
                  SMD panellerde her pikselin üç ayrı LED bileşeni dış
                  ortamla temas halindedir. COB panel yüzeyinde ise tüm
                  çipler koruyucu bir tabaka ile kaplıdır. Bu sayede hem
                  darbelere hem toza karşı çok daha dayanıklı bir yapı
                  oluşur.
                </p>

                <figure className="my-10 not-prose">
                  <Image
                    src={cobMacroImg}
                    alt="COB LED panel yüzeyinin yakın plan görünümü"
                    width={cobMacroImg.width}
                    height={cobMacroImg.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    COB LED paneller, pürüzsüz yüzey yapısı sayesinde hem
                    daha koyu siyah seviyeleri hem de daha iyi yansıma
                    kontrolü sunar.
                  </figcaption>
                </figure>

                <p>
                  2026’da COB 2.0 olarak anılan yeni nesil paneller; düşük
                  mavi ışık, anti-glare yüzey ve gelişmiş kalibrasyon
                  algoritmaları ile özellikle uzun süreli konferanslarda
                  göz konforunu ciddi biçimde artırıyor.
                </p>

                <h2 id="hdr">3. HDR İçerik ve Renk Kalibrasyonu</h2>
                <p>
                  LED ekranınız HDR destekli olsa bile, içerikler SDR
                  üretilmişse gerçek potansiyeli göremezsiniz. 2026
                  trendlerinde markalar; lansman filmlerini doğrudan
                  LED’e özel LUT ve renk profilleriyle hazırlatmaya
                  başlıyor.
                </p>

                <div className="not-prose my-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl" aria-hidden="true">
                      🎨
                    </span>
                    HDR İçin 3 Adımlı Workflow
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>
                      LED ekran markası / modeline göre renk profilinin
                      teknik ekipten alınması.
                    </li>
                    <li>
                      İçerik ajansının bu profile göre LUT oluşturup tüm
                      video / görsellere uygulaması.
                    </li>
                    <li>
                      Kurulum sonrası sahnede canlı kalibrasyon ile kamera
                      ve insan gözü için ortak optimum noktanın
                      yakalanması.
                    </li>
                  </ol>
                </div>

                <h2 id="sahne-tasarim">
                  4. 2026 Sahne Tasarımında LED ile Neler Değişiyor?
                </h2>
                <p>
                  Artık LED ekran sadece arka fon değil, sahnenin tamamını
                  saran bir deneyim alanı. Side-screen yerine L şeklinde
                  ekranlar, data görselleştirme için dikey totemler ve
                  zemin LED uygulamaları kurumsal etkinliklere de inmeye
                  başladı.
                </p>

                {/* Teknik Checklist */}
                <h2 id="teknik-checklist">Teknik Checklist – Teklif Almadan Önce</h2>
                <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 space-y-4">
                  <p className="text-sm text-gray-700 font-medium mb-2">
                    Aşağıdaki maddeleri teklif dosyanızda net olarak
                    görmüyorsanız, mutlaka yazılı olarak isteyin:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>LED panel marka / model bilgisi</li>
                    <li>Piksel aralığı ve panel ölçüsü</li>
                    <li>İç / dış mekan sınıfı ve parlaklık değeri (cd/m²)</li>
                    <li>
                      Sürücü kart yenileme oranı (en az 3840Hz önerilir)
                    </li>
                    <li>
                      Kurulum süresi, teknik ekip sayısı ve yedek panel
                      stoğu
                    </li>
                    <li>
                      İçerik hazırlığı için tavsiye edilen çözünürlük /
                      FPS değerleri
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
                    LED ekran trendleri hakkında sıkça sorulan sorular
                  </h3>
                  {FAQ_ITEMS.map((item, index) => (
                    <details
                      key={index}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:ring-2 open:ring-blue-100 open:border-blue-300 transition-all duration-200"
                    >
                      <summary
                        className="flex items-center justify-between p-4 md:p-5 cursor-pointer font-semibold text-gray-800 select-none bg-gray-50/50 hover:bg-gray-50 transition-colors"
                        role="button"
                        tabIndex={0}
                      >
                        {item.question}
                        <span className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180 text-gray-600">
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
                    2026 LED Ekran Projenizi Birlikte Tasarlayalım
                  </h3>
                  <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10 text-lg">
                    Fine-pitch LED paneller, COB teknolojisi ve HDR içerik
                    üretimiyle sahnenizi bir üst seviyeye taşımak için
                    teknik ekibimizle hemen iletişime geçin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <a
                      href="https://wa.me/905453048671"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp üzerinden hızlı teklif alın — yeni sekmede açılır"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                    >
                      <span>💬</span> WhatsApp&apos;tan Yazın
                    </a>
                    <a
                      href="tel:+905453048671"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                    >
                      <span>📞</span> Hemen Arayın
                    </a>
                  </div>
                </div>
              </article>
            </div>

            {/* SAĞ KOLON (STICKY SIDEBAR) */}
            <aside className="lg:w-1/3 relative">
              <div className="sticky top-24 space-y-8">
                <TableOfContents />

                {/* TEKLİF KUTUSU */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    LED Projeniz İçin Hızlı Teklif
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Sahne ölçülerinizi ve etkinlik tarihini paylaşın, 2
                    saat içinde LED ekran senaryosu ve fiyatlandırmayı size
                    iletelim.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/905453048671"
                      className="flex items-center justify-center gap-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                    >
                      <span>📱</span> WhatsApp
                    </a>
                    <Link
                      href="/iletisim"
                      className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl transition-all border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                    >
                      <span>✉️</span> Form Doldur
                    </Link>
                  </div>
                </div>

                {/* HİZMETLER MENÜSÜ */}
                <nav
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                  aria-label="İlgili Hizmetler"
                >
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-gray-700">
                    Hizmetlerimiz
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
