import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

// Statik image importları (public/img/blog/)
import heroImg from "@/public/img/blog/led-2026-hero.webp";
import stageWideImg from "@/public/img/blog/led-2026-sahne-genis.webp";
import cobMacroImg from "@/public/img/blog/cob-led-macro.webp";

// Yeni eklenen görseller (sen yükledin)
import pixelPitchComparison from "@/public/img/blog/pixel-pitch-karsilastirma.webp";
import cobSmdComparison from "@/public/img/blog/cob-smd-yapisal-fark.webp";

/* ================== YAPILANDIRMA & SABİTLER ================== */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(
  /\/$/,
  ""
);

const BLOG_PATH = "/blog/led-ekran-2026-teknoloji-trendleri";
const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;

const LED_SERVICE_PATH = "/led-ekran-kiralama";
const LED_SERVICE_URL = `${SITE_URL}${LED_SERVICE_PATH}`;

// ✅ Öne çıkan görsel (featured) = HERO (public path)
const FEATURED_IMAGE = "/img/blog/led-2026-hero.webp";

// ✅ Rich Results için timezone dahil ISO 8601
const PUBLISH_DATE = "2025-12-15T00:00:00+03:00";
const MODIFIED_DATE = "2025-12-15T00:00:00+03:00";

const AUTHOR_NAME = "Sahneva İçerik Ekibi";

// Lead magnet (404 olmasın diye WhatsApp)
const WHATSAPP_NUMBER = "905453048671";
const LEADMAGNET_MSG = encodeURIComponent(
  "Merhaba, LED Ekran Teknik Teklif Checklist PDF’ini almak istiyorum. Etkinlik tipi, salon ölçüsü ve izleme mesafesini de paylaşabilirim."
);
const LEADMAGNET_WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${LEADMAGNET_MSG}`;

/* ================== META DATA ================== */
export const metadata = {
  title:
    "2026 LED Ekran Teknolojisi Trendleri: COB, 2.0 Nesil Paneller ve Sahne Tasarımı | Sahneva",
  description:
    "2026’da LED ekran teknolojisinde COB paneller, ultra düşük piksel aralığı ve HDR sahne tasarımı etkinlikleri nasıl değiştirecek? Lansman, festival ve kurumsal etkinlikler için teknik rehber.",
  alternates: { canonical: BLOG_URL },

  // ✅ Blog kartlarında öne çıkan görselin gelmesi için
  image: FEATURED_IMAGE,

  openGraph: {
    title: "2026 LED Ekran Teknolojisi Trendleri ve Etkinlik Tasarımı | Sahneva Organizasyon",
    description:
      "COB LED paneller, 2.0 nesil sürücüler ve HDR içerik üretimi ile 2026’da etkinlik sahneleri nasıl dönüşüyor?",
    url: BLOG_URL,
    type: "article",
    locale: "tr_TR",
    siteName: "Sahneva Organizasyon",
    images: [
      {
        url: `${SITE_URL}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon blog görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 LED Ekran Teknolojisi Trendleri",
    description:
      "COB LED, ince piksel aralığı ve HDR içerik ile sahne tasarımında yeni dönem.",
    images: [`${SITE_URL}/img/og/sahneva-og.webp`],
  },
  keywords: [
    "LED ekran trendleri 2026",
    "COB LED panel",
    "fine pitch LED",
    "HDR LED ekran",
    "yenileme oranı 3840Hz",
    "etkinlik LED ekran kiralama",
    "sahne LED ekran tasarımı",
    "LED ekran kiralama fiyatları",
  ],
  authors: [{ name: AUTHOR_NAME }],
  publisher: "Sahneva",
  other: {
    "article:published_time": PUBLISH_DATE,
    "article:modified_time": MODIFIED_DATE,
    "article:author": AUTHOR_NAME,
    "article:section": "LED Ekran Kiralama",
  },
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
      "Kurumsal etkinlik, lansman ve TV prodüksiyonuna yakın işler için genellikle P1.9 – P2.6 aralığı tercih edilir. 6–20 metre izleme mesafelerinde hem kamera hem izleyici için keskin bir görüntü sunar.",
  },
  {
    question: "HDR destekli LED ekran gerçekten fark yaratıyor mu?",
    answer:
      "Evet. HDR destekli LED ekranlar, özellikle ürün lansmanlarında derin siyahlar ve canlı renk geçişlerinde daha gerçekçi bir algı oluşturur. Profesyonel içerik üretimi ve doğru kalibrasyonla etkisi belirginleşir.",
  },
  {
    question: "LED ekran teklifi alırken hangi teknik bilgileri mutlaka istemeliyim?",
    answer:
      "Piksel aralığı, yenileme oranı (3840Hz+ önerilir), panel tipi (COB/SMD), parlaklık (cd/m²), yedek panel stoğu, kurulum süresi ve içerik çözünürlük/FPS tavsiyesi net yazılmalı.",
  },
  {
    question: "Sahneva 2026 trendlerine uygun ne tür çözümler sunuyor?",
    answer:
      "Sahneva; fine-pitch iç mekan paneller, yüksek yenileme oranına sahip LED ekran sistemleri, renk kalibrasyonu, medya server entegrasyonları ve komple sahne–ses–ışık altyapısını anahtar teslim sunar.",
  },
];

/* ================== SCHEMA (JSON-LD) ================== */
function ArticleSchema() {
  const site = String(SITE_URL || "").replace(/\/$/, "");
  const orgId = `${site}/#org`;
  const editorId = `${site}/#editor`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${BLOG_URL}#blogposting`,
        headline: metadata?.title || "Blog Yazısı",
        description: metadata?.description,
        image: `${site}${FEATURED_IMAGE}`,
        datePublished: PUBLISH_DATE,
        dateModified: MODIFIED_DATE,
        inLanguage: "tr-TR",
        author: { "@id": editorId },
        publisher: { "@id": orgId },
        mainEntityOfPage: { "@type": "WebPage", "@id": BLOG_URL },
        isPartOf: { "@type": "Blog", "@id": `${site}/blog#blog` },
        relatedLink: [LED_SERVICE_URL],
      },
      {
        "@type": "FAQPage",
        "@id": `${BLOG_URL}#faq`,
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
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\u003c"),
      }}
    />
  );
}

/* ================== UI PARÇALARI ================== */
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
      <li className="text-gray-900 font-medium truncate" aria-current="page">
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
        { id: "stats", label: "2026 LED Ekran Gerçekleri (Hızlı Özet)" },
        { id: "fine-pitch", label: "1. Fine-Pitch ve P1.x Dönemi" },
        { id: "cob-led", label: "2. COB LED 2.0: Dayanıklılık ve Siyah Seviye" },
        { id: "hdr", label: "3. HDR İçerik ve Renk Kalibrasyonu" },
        { id: "case-study", label: "Vaka Analizi: Lansman Sahnesi" },
        { id: "comparison", label: "2026 Panel Karşılaştırma Tablosu" },
        { id: "mistakes", label: "5 Kritik Hata (2026)" },
        { id: "budget", label: "Bütçe Dağılımı (Pratik)" },
        { id: "teknik-checklist", label: "Teknik Checklist + PDF" },
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

const StatCard = ({ value, label }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-2xl md:text-3xl font-black text-gray-900">{value}</div>
    <p className="mt-2 text-sm text-gray-600 leading-snug">{label}</p>
  </div>
);

const InfoBox = ({ icon, title, children, variant = "info" }) => {
  const styles =
    variant === "warn"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : "bg-blue-50 border-blue-200 text-blue-900";

  const titleText = variant === "warn" ? "Uyarı" : "Pro Tip";

  return (
    <div className={`not-prose border rounded-2xl p-6 ${styles}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none" aria-hidden="true">
          {icon}
        </span>
        <div>
          <p className="m-0 font-black text-base">
            {title || titleText}
          </p>
          <div className="mt-2 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

/* ================== ANA SAYFA ================== */
export default function LedTrends2026Page() {
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "2026 LED Ekran Teknolojisi Trendleri", url: BLOG_URL },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={SITE_URL} />
      <ArticleSchema />

      {/* HERO (öne çıkan = hero) */}
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
            <span className="gradient-text gradient-text--safe-xl">
              Sahne Tasarımını Nasıl Değiştiriyor?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light antialiased">
            COB paneller, 2.0 nesil sürücüler ve HDR içerik ile kurumsal etkinliklerde LED ekranlar artık sadece fon değil, başrol oyuncu.
            Teknik kararları 2026’da nasıl almalısınız?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200 mt-8 pt-8 border-t border-white/10">
            <time dateTime={PUBLISH_DATE} className="flex items-center gap-2">
              <span aria-hidden="true">📅</span> 15 Aralık 2025
            </time>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">⏱️</span> 7 dk okuma
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">✍️</span> {AUTHOR_NAME}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LED projeniz için WhatsApp üzerinden yazın — yeni sekmede açılır"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-7 py-3.5 shadow-lg shadow-emerald-900/40 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              <span aria-hidden="true">💬</span>
              <span>WhatsApp’tan Yazın</span>
            </a>

            <Link
              href={LED_SERVICE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 border border-white/20 backdrop-blur-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
            >
              <span aria-hidden="true">🖥️</span>
              <span>LED Ekran Kiralama</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO ALTİ PREMIUM BLOCK: STATS */}
      <section
        id="stats"
        aria-label="2026 LED Ekran Gerçekleri"
        className="relative -mt-10 z-30 px-4"
      >
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
            <div className="flex items-start justify-between flex-col md:flex-row gap-6 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  2026 LED Ekran Gerçekleri
                </h2>
                <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl">
                  Bu bölüm “hızlı karar” vermek içindir: doğru panel, doğru yenileme oranı ve doğru içerik üretimi sahnede farkı saniyeler içinde gösterir.
                </p>
              </div>

              <Link
                href={LED_SERVICE_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold px-5 py-3 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
              >
                <span aria-hidden="true">📌</span>
                Teklif Al
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                value="%68"
                label="Kurumsal etkinliklerde fine-pitch LED tercih oranı (2026 trend)"
              />
              <StatCard
                value="3840Hz+"
                label="Yeni nesil sürücülerde önerilen minimum yenileme oranı"
              />
              <StatCard
                value="%42"
                label="Yanlış piksel aralığı seçimi nedeniyle memnuniyetsizlik riski"
              />
              <StatCard
                value="15 dk"
                label="Yanlış kurulum/ayarın canlı yayında gecikmeye etkisi"
              />
            </div>

            <div className="mt-8">
              <InfoBox icon="💡" title="Pro Tip">
                Kamera varsa sadece “m²” konuşmayın: <strong>piksel aralığı + yenileme oranı + renk kalibrasyonu</strong> aynı pakette net yazılmalı.
              </InfoBox>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs />

          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* SOL */}
            <div className="lg:w-2/3">
              <article className="prose prose-lg prose-headings:font-black prose-headings:text-gray-900 prose-headings:scroll-mt-32 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl max-w-none">
                <div className="bg-blue-50/60 p-6 rounded-xl border-l-4 border-blue-500 mb-8 not-prose">
                  <p className="text-lg text-gray-700 font-semibold italic m-0">
                    “LED ekran olsun yeter” dönemi bitti. 2026’da markalar; piksel aralığı, sürücü teknolojisi, HDR desteği ve kamera dostu flicker performansını aynı anda istiyor.
                  </p>
                  <p className="text-sm text-gray-600 mt-3 mb-0">
                    Bu rehber, teklif almadan önce teknik checklist oluşturmanız ve{" "}
                    <Link href={LED_SERVICE_PATH}>LED ekran kiralama</Link>{" "}
                    sürecinde doğru kıyas yapmanız için hazırlandı.
                  </p>
                </div>

                <p>
                  Büyük bir lansman, global bayi toplantısı veya hibrit konferans planlıyor olabilirsiniz. Sahnenin en görünür öğesi LED ekrandır; bu yüzden seçim sürecinde sadece metrekare değil,
                  <strong> piksel aralığı, yenileme oranı ve içerik uyumu</strong> gibi teknik kriterleri doğru okumak gerekir.
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
                    2026 sahne tasarımlarında LED ekran, dekorun değil hikâyenin merkezinde.
                  </figcaption>
                </figure>

                <h2 id="fine-pitch">1. Fine-Pitch ve P1.x Dönemi</h2>
                <p>
                  İç mekan sahnelerde <strong>P1.5 – P2.6</strong> aralığı artık yeni normal. Daha düşük piksel aralığı, aynı sahne ölçüsünde daha keskin metin ve daha net grafik demektir.
                  Kamera çekimi olan işlerde bu fark daha da görünür hale gelir.
                </p>

                <InfoBox icon="⚠️" title="Uyarı" variant="warn">
                  HDR panel kiralayıp SDR içerik kullanmak, bütçeyi boşa harcar. HDR istiyorsanız içerik üretimi de HDR pipeline’a uygun yapılmalı.
                </InfoBox>

                <figure className="my-10 not-prose">
                  <Image
                    src={pixelPitchComparison}
                    alt="LED ekranlarda fine-pitch ve daha geniş piksel aralığını temsil eden genel karşılaştırma görseli"
                    width={pixelPitchComparison.width}
                    height={pixelPitchComparison.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg border border-gray-100"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    Piksel aralığı küçüldükçe metinler ve detaylar daha yakından bile net görünür.
                  </figcaption>
                </figure>

                <h2 id="cob-led">2. COB LED 2.0: Dayanıklılık ve Siyah Seviye</h2>
                <p>
                  COB (Chip on Board) panellerde LED çipleri koruyucu bir katman altında birleşik yapıda bulunur. Bu, hem daha homojen ışık hem de daha iyi dayanıklılık sağlar.
                  Özellikle iç mekan premium sahnelerde siyah seviyesi (kontrast) avantajı güçlüdür.
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
                    COB LED paneller pürüzsüz yüzey yapısıyla yansıma kontrolü ve siyah seviyesinde avantaj sağlar.
                  </figcaption>
                </figure>

                <figure className="my-10 not-prose">
                  <Image
                    src={cobSmdComparison}
                    alt="COB ve SMD LED yapılarını temsil eden karşılaştırma görseli"
                    width={cobSmdComparison.width}
                    height={cobSmdComparison.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg border border-gray-100"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    COB yüzey yapısı hasar riskini azaltır; SMD ise outdoor kullanımda daha yaygındır.
                  </figcaption>
                </figure>

                <h2 id="hdr">3. HDR İçerik ve Renk Kalibrasyonu</h2>
                <p>
                  HDR yalnızca “daha parlak” değildir: daha geniş dinamik aralık, daha doğru ton geçişleri ve daha derin siyahlar anlamına gelir.
                  Etkisi, sahnede <strong>kalibrasyon</strong> ve içerik üretimiyle birlikte maksimuma çıkar.
                </p>

                <div className="not-prose my-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl" aria-hidden="true">🎨</span>
                    HDR İçin 3 Adımlı Workflow
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Panel marka/model için teknik ekipten renk profili / öneri değerlerini alın.</li>
                    <li>İçerik ajansına LUT / profil hedefini verin (SDR içerik ile HDR paneli boşa harcamayın).</li>
                    <li>Kurulum sonrası sahnede canlı kalibrasyon yapın (kamera + göz için ortak optimum).</li>
                  </ol>
                </div>

                {/* CASE STUDY */}
                <h2 id="case-study">Vaka Analizi: 2025 Kurumsal Lansmanda LED Seçimi</h2>
                <div className="not-prose bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 my-8">
                  <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
                    <div className="max-w-2xl">
                      <p className="m-0 text-gray-900 font-black text-lg">
                        Senaryo: 600 kişilik salon + canlı yayın + ürün lansmanı
                      </p>
                      <p className="mt-2 mb-0 text-sm text-gray-700">
                        Amaç: Kamera banding/flicker riskini düşürmek, sahnede premium siyah seviyesi ve keskin tipografi elde etmek.
                      </p>
                      <ul className="mt-4 text-sm text-gray-700 list-disc pl-5 space-y-1">
                        <li>Öneri: Fine-pitch (P2.x) + 3840Hz+ sürücü</li>
                        <li>İçerik: HDR pipeline + sahnede kalibrasyon</li>
                        <li>Risk azaltma: Yedek panel + hızlı müdahale planı</li>
                      </ul>
                    </div>
                    <div className="w-full md:w-64">
                      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <p className="m-0 text-xs uppercase tracking-wide text-gray-500 font-bold">
                          Sonuç
                        </p>
                        <p className="mt-2 mb-0 text-sm text-gray-800">
                          Kamerada flicker riskinin düşmesi + daha net metinler + daha “premium” sahne algısı.
                        </p>
                        <Link
                          href={LED_SERVICE_PATH}
                          className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-gray-900 hover:bg-black text-white font-semibold px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
                        >
                          Benzer kurgu için teklif al
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COMPARISON TABLE */}
                <h2 id="comparison">2026 Panel Karşılaştırması</h2>
                <p>
                  Teklifleri “m²” üzerinden değil, aşağıdaki gibi kriterlerle kıyaslayın. Böylece aynı bütçede en doğru paneli seçersiniz.
                </p>

                <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm text-left bg-white min-w-[760px]">
                    <caption className="sr-only">2026 LED panel karşılaştırma tablosu</caption>
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-xs border-b">
                      <tr>
                        <th scope="col" className="p-4 font-black">Kriter</th>
                        <th scope="col" className="p-4 font-black">P1.5</th>
                        <th scope="col" className="p-4 font-black">P2.6</th>
                        <th scope="col" className="p-4 font-black">COB (iç mekan)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="p-4 font-bold text-gray-900">İzleme mesafesi</th>
                        <td className="p-4">Çok yakın</td>
                        <td className="p-4">Orta</td>
                        <td className="p-4">Yakın–orta</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="p-4 font-bold text-gray-900">Kamera uygunluğu</th>
                        <td className="p-4">⭐⭐⭐⭐⭐</td>
                        <td className="p-4">⭐⭐⭐⭐</td>
                        <td className="p-4">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="p-4 font-bold text-gray-900">Dayanıklılık</th>
                        <td className="p-4">⭐⭐⭐</td>
                        <td className="p-4">⭐⭐⭐</td>
                        <td className="p-4">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="p-4 font-bold text-gray-900">Yenileme Hızı</th>
                        <td className="p-4">3840Hz</td>
                        <td className="p-4">1920Hz</td>
                        <td className="p-4">3840Hz</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="p-4 font-bold text-gray-900">Kurumsal kullanım</th>
                        <td className="p-4">Premium</td>
                        <td className="p-4">F/P</td>
                        <td className="p-4">Premium+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* MISTAKES */}
                <h2 id="mistakes">2026’da LED Ekran Seçerken Yapılan 5 Kritik Hata</h2>
                <div className="not-prose bg-white border border-gray-200 rounded-2xl p-6 md:p-8 my-8 shadow-sm">
                  <ol className="list-decimal list-inside space-y-3 text-sm text-gray-800">
                    <li>
                      <strong>Sadece m² üzerinden teklif almak:</strong> Piksel aralığı / yenileme oranı yazmayan teklif kıyaslanamaz.
                    </li>
                    <li>
                      <strong>Kamera açısını hesaba katmamak:</strong> Canlı yayın varsa 3840Hz+ ve doğru kalibrasyon şart.
                    </li>
                    <li>
                      <strong>HDR panel + SDR içerik:</strong> İçerik üretimi HDR pipeline’a uygun değilse etki kaybolur.
                    </li>
                    <li>
                      <strong>Yedek panel ve müdahale planı sormamak:</strong> Risk yönetimi yapılmazsa küçük arıza büyük kayba dönüşür.
                    </li>
                    <li>
                      <strong>Kurulum süresini gerçekçi planlamamak:</strong> Sahne entegrasyonu (ses/ışık) ile birlikte düşünülmeli.
                    </li>
                  </ol>
                </div>

                {/* BUDGET */}
                <h2 id="budget">LED Ekran Bütçesi Nasıl Dağılır?</h2>
                <p>
                  “Fiyat neden böyle?” sorusunun cevabı genelde kalemlerin dağılımında saklıdır. 2026 projelerinde tipik dağılım:
                </p>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  {[
                    { k: "%45", v: "LED paneller (piksel aralığı + kalite)" },
                    { k: "%20", v: "Kurulum & teknik ekip" },
                    { k: "%15", v: "Medya server / içerik uyumu & sinyal zinciri" },
                    { k: "%10", v: "Yedek panel / risk payı" },
                    { k: "%10", v: "Sahne entegrasyonu (ses/ışık/rigging)" },
                  ].map((x) => (
                    <div key={x.k + x.v} className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                      <div className="text-2xl font-black text-gray-900">{x.k}</div>
                      <p className="mt-2 mb-0 text-sm text-gray-700">{x.v}</p>
                    </div>
                  ))}
                </div>

                <p>
                  Teklif alırken sadece fiyat sormak yerine, bu kalemlerin içinde nelerin dahil olduğunu netleştirmek gerekir. Hazır buradayken{" "}
                  <Link href={LED_SERVICE_PATH}>LED ekran kiralama</Link>{" "}
                  sayfamızdan kurulum, ekip ve teknik operasyon kapsamını da inceleyebilirsin.
                </p>

                {/* CHECKLIST + LEAD MAGNET */}
                <h2 id="teknik-checklist">Teknik Checklist + PDF</h2>
                <div className="not-prose bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 my-8 space-y-4">
                  <p className="m-0 text-sm text-gray-800 font-semibold">
                    Teklif dosyanızda aşağıdakiler net değilse, yazılı olarak isteyin:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>LED panel marka/model</li>
                    <li>Piksel aralığı (P1.5 / P1.9 / P2.6 vb.)</li>
                    <li>Yenileme oranı (3840Hz+ önerilir)</li>
                    <li>Parlaklık (cd/m²) + iç/dış mekan sınıfı</li>
                    <li>Yedek panel stoğu + arıza müdahale planı</li>
                    <li>İçerik çözünürlüğü / FPS tavsiyesi</li>
                  </ul>

                  <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                    <a
                      href={LEADMAGNET_WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LED ekran teknik teklif checklist PDF iste — yeni sekmede açılır"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                    >
                      <span aria-hidden="true">📄</span>
                      Checklist PDF’ini WhatsApp’tan iste
                    </a>

                    <Link
                      href={LED_SERVICE_PATH}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold px-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
                    >
                      <span aria-hidden="true">🖥️</span>
                      LED Ekran Kiralama Teklifi Al
                    </Link>
                  </div>

                  <InfoBox icon="💡" title="Pro Tip">
                    Teklifleri kıyaslarken “panel kalitesi”ni tek başına ölçemezsiniz: <strong>panel + sürücü + içerik + kalibrasyon</strong> birlikte değerlendirilmelidir.
                  </InfoBox>
                </div>

                {/* FAQ */}
                <h2 id="faq">Sık Sorulan Sorular</h2>
                <section aria-labelledby="faq-heading" className="not-prose space-y-3 mt-6">
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

                {/* FINAL CTA */}
                <div className="not-prose mt-16 bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <h3 className="text-2xl md:text-3xl font-black mb-4 relative z-10">
                    2026 LED Ekran Projenizi Birlikte Tasarlayalım
                  </h3>
                  <p className="text-blue-100 mb-6 max-w-xl mx-auto relative z-10 text-lg">
                    Fine-pitch LED, COB, yüksek yenileme oranı ve doğru içerik üretimiyle sahnenizi premium seviyeye taşıyalım.
                  </p>

                  <p className="text-blue-100 max-w-xl mx-auto relative z-10 text-sm mb-6">
                    <Link
                      href={LED_SERVICE_PATH}
                      className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
                    >
                      LED ekran kiralama çözümlerimizi
                    </Link>{" "}
                    inceleyip projenize göre doğru panel/kurulum planını netleştirebilirsiniz.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <a
                      href={LEADMAGNET_WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp üzerinden hızlı teklif alın — yeni sekmede açılır"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                    >
                      <span aria-hidden="true">💬</span> WhatsApp’tan Yazın
                    </a>
                    <a
                      href="tel:+905453048671"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                    >
                      <span aria-hidden="true">📞</span> Hemen Arayın
                    </a>
                  </div>
                </div>
              </article>
            </div>

            {/* SAĞ */}
            <aside className="lg:w-1/3 relative">
              <div className="sticky top-24 space-y-8">
                <TableOfContents />

                <nav className="bg-gray-50 rounded-2xl p-6 border border-gray-200" aria-label="İlgili Hizmetler">
                  <h4 className="font-black mb-4 text-sm uppercase tracking-wider text-gray-700">
                    Hizmetlerimiz
                  </h4>
                  <ul className="space-y-1">
                    {[
                      { href: LED_SERVICE_PATH, icon: "🖥️", label: "LED Ekran Kiralama" },
                      { href: "/sahne-kiralama", icon: "🎭", label: "Sahne Kiralama" },
                      { href: "/ses-isik-sistemleri", icon: "🎵", label: "Ses & Işık Sistemleri" },
                      { href: "/kurumsal-organizasyon", icon: "🏢", label: "Kurumsal Organizasyon" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-blue-600 group"
                        >
                          <span className="bg-white group-hover:bg-blue-50 text-lg w-8 h-8 flex items-center justify-center rounded-md border border-gray-100 shadow-sm transition-colors">
                            {link.icon}
                          </span>
                          <span className="font-semibold text-sm">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="m-0 text-xs uppercase tracking-wide text-gray-500 font-black">
                    Hızlı Aksiyon
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    Teknik teklif checklist PDF’ini alıp 2026 kriterlerine göre teklifleri hızlıca kıyaslayın.
                  </p>
                  <a
                    href={LEADMAGNET_WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                  >
                    📄 PDF iste
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
