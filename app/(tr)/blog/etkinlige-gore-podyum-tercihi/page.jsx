import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== GÖRSELLER (public/img/galeri) ================== */
// 4 görsel: hero + 3 içerik görseli
import heroImg from "@/public/img/galeri/podyum-kiralama-1.webp";
import kurumsalImg from "@/public/img/galeri/podyum-kiralama-2.webp";
import dugunImg from "@/public/img/galeri/podyum-kiralama-3.webp";
import konserImg from "@/public/img/galeri/led-ekran-kiralama-1.webp";

/* ================== YAPILANDIRMA & SABİTLER ================== */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(
  /\/$/,
  ""
);

const BLOG_PATH = "/blog/etkinlige-gore-podyum-tercihi";
const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;

const PODIUM_SERVICE_PATH = "/podyum-kiralama";
const PODIUM_SERVICE_URL = `${SITE_URL}${PODIUM_SERVICE_PATH}`;

const STAGE_SERVICE_PATH = "/sahne-kiralama";
const STAGE_SERVICE_URL = `${SITE_URL}${STAGE_SERVICE_PATH}`;

const CORPORATE_SERVICE_PATH = "/kurumsal-organizasyon";
const CORPORATE_SERVICE_URL = `${SITE_URL}${CORPORATE_SERVICE_PATH}`;

const TENT_SERVICE_PATH = "/cadir-kiralama";
const TENT_SERVICE_URL = `${SITE_URL}${TENT_SERVICE_PATH}`;

const LED_SERVICE_PATH = "/led-ekran-kiralama";
const LED_SERVICE_URL = `${SITE_URL}${LED_SERVICE_PATH}`;

// ✅ Öne çıkan görsel (featured) public path
const FEATURED_IMAGE = "/img/galeri/podyum-kiralama-1.webp";

// ✅ Rich Results için timezone dahil ISO 8601
const PUBLISH_DATE = "2025-12-28T00:00:00+03:00";
const MODIFIED_DATE = "2025-12-28T00:00:00+03:00";

const AUTHOR_NAME = "Sahneva İçerik Ekibi";

// Lead magnet (WhatsApp)
const WHATSAPP_NUMBER = "905453048671";
const LEADMAGNET_MSG = encodeURIComponent(
  "Merhaba, etkinliğime göre podyum/sahne ölçüsü için teknik checklist istiyorum. Etkinlik tipi ve alan ölçüsünü paylaşabilirim."
);
const LEADMAGNET_WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${LEADMAGNET_MSG}`;

/* ================== META DATA ================== */
export const metadata = {
  title:
    "Etkinliğe Göre Podyum ve Sahne Tercihi: Düğün, Kurumsal, Konser, Miting | Sahneva",
  description:
    "Etkinliğe göre doğru podyum/sahne seçimi: Kurumsal toplantı max 80 cm (önü komple merdiven olabilir), düğün 40–80 cm (önü komple merdiven olmalı), konser/miting 100–150 cm (150 cm sabitleme, max 2 merdiven). Açık alanda 10 cm zemin podyumu + halı standardı.",
  alternates: { canonical: BLOG_URL },

  image: FEATURED_IMAGE,

  openGraph: {
    title: "Etkinliğe Göre Podyum ve Sahne Tercihi (Teknik Rehber) | Sahneva",
    description:
      "Doğru yükseklik, merdiven kontrolü ve 150 cm sahnelerde sabitleme: düğün, kurumsal, konser ve miting için pratik karar rehberi.",
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
    title: "Etkinliğe Göre Podyum ve Sahne Tercihi",
    description:
      "Kurumsal, düğün, konser ve miting için doğru sahne ölçüleri + güvenlik kuralları.",
    images: [`${SITE_URL}/img/og/sahneva-og.webp`],
  },
  keywords: [
    "etkinliğe göre podyum",
    "podyum kiralama",
    "sahne yüksekliği",
    "kurumsal toplantı sahnesi 80 cm",
    "düğün sahnesi 40 80 cm",
    "konser sahnesi 150 cm sabitleme",
    "miting sahnesi merdiven sayısı",
    "zemin podyumu 10 cm halı",
  ],
  authors: [{ name: AUTHOR_NAME }],
  publisher: "Sahneva",
  other: {
    "article:published_time": PUBLISH_DATE,
    "article:modified_time": MODIFIED_DATE,
    "article:author": AUTHOR_NAME,
    "article:section": "Podyum Kiralama",
  },
};

/* ================== FAQ VERİLERİ ================== */
const FAQ_ITEMS = [
  {
    question: "Etkinliğe göre sahne yüksekliği nasıl seçilir?",
    answer:
      "Sahne yüksekliği; etkinlik tipi, oturma düzeni, beklenen kalabalık ve alan topografyasına göre seçilir. Kurumsalda max 80 cm, düğünde 40–80 cm, konser/mitingde 100–150 cm aralığı pratik standarttır.",
  },
  {
    question: "Kurumsal toplantılarda sahne neden 80 cm’yi geçmemeli?",
    answer:
      "Otel ve kurumsal toplantılarda oturma düzeni nedeniyle 80 cm görüş için yeterlidir. Daha yüksek sahneler gereksiz risk ve orantısız görünüm oluşturabilir.",
  },
  {
    question: "Düğün sahnesinde neden önü komple merdiven olmalı?",
    answer:
      "Düğünlerde sahne aktif kullanılır; misafirler sahneye çıkar iner. Önü komple merdiven, yığılmayı azaltır ve iniş-çıkışı kolaylaştırır; düşme riskini düşürür.",
  },
  {
    question: "Konser ve mitinglerde 150 cm sahne güvenli mi?",
    answer:
      "150 cm sahne yapılabilir; ancak sallanmayı önlemek için bağlantı aparatları ve sabitleme (çapraz bağlantılar, kilitli ayaklar vb.) zorunludur. Sabitleme olmadan 150 cm risklidir.",
  },
  {
    question: "Konser ve miting sahnesinde kaç merdiven olmalı?",
    answer:
      "Güvenlik ve kontrol için konser ve mitinglerde sahneye çıkış en fazla 2 merdivenle sınırlandırılmalıdır. Böylece sahne girişleri kontrol altında tutulur.",
  },
  {
    question: "Açık alanda/çadırda zemin podyumu şart mı?",
    answer:
      "Zemin eğimli, bozuk, toprak/çim ise 10 cm zemin podyumu üzerine halı serilmesi çoğu zaman standarda dönüşür. Masa-sandalye stabilitesi ve konfor için ciddi avantaj sağlar.",
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
        relatedLink: [
          PODIUM_SERVICE_URL,
          STAGE_SERVICE_URL,
          CORPORATE_SERVICE_URL,
          TENT_SERVICE_URL,
          LED_SERVICE_URL,
        ],
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
        Etkinliğe Göre Podyum Tercihi
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
        { id: "stats", label: "Hızlı Seçim Özeti" },
        { id: "kurumsal", label: "1. Kurumsal Toplantı / Otel İçi" },
        { id: "dugun", label: "2. Düğün" },
        { id: "konser", label: "3. Konser" },
        { id: "miting", label: "4. Miting" },
        { id: "altyapi", label: "5. Açık Alan Altyapısı (Zemin 10 cm + Halı)" },
        { id: "checklist", label: "Teknik Kontrol Listesi" },
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
          <p className="m-0 font-black text-base">{title || titleText}</p>
          <div className="mt-2 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

/* ================== ANA SAYFA ================== */
export default function EtkinligeGorePodyumTercihiPage() {
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "Etkinliğe Göre Podyum Tercihi", url: BLOG_URL },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={SITE_URL} />
      <ArticleSchema />

      {/* HERO */}
      <header className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-blue-900/40 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt="Etkinliğe göre podyum ve sahne seçimini temsil eden organizasyon kurulumu"
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
            Podyum & Sahne Seçim Rehberi
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
            Etkinliğe Göre{" "}
            <span className="gradient-text gradient-text--safe-xl">Podyum ve Sahne</span>{" "}
            Tercihi
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light antialiased">
            Kurumsal toplantı, düğün, konser ve miting için doğru ölçü ve güvenlik standardı:
            kurumsalda max 80 cm (önü komple merdiven olabilir), düğünde 40–80 cm (önü komple merdiven olmalı),
            konser/mitingde 100–150 cm (150 cm sabitleme + max 2 merdiven). Açık alanda zemin için 10 cm + halı.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200 mt-8 pt-8 border-t border-white/10">
            <time dateTime={PUBLISH_DATE} className="flex items-center gap-2">
              <span aria-hidden="true">📅</span> 28 Aralık 2025
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
              aria-label="Podyum ve sahne seçimi için WhatsApp üzerinden yazın — yeni sekmede açılır"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-7 py-3.5 shadow-lg shadow-emerald-900/40 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              <span aria-hidden="true">💬</span>
              <span>WhatsApp’tan Yazın</span>
            </a>

            <Link
              href={PODIUM_SERVICE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 border border-white/20 backdrop-blur-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
            >
              <span aria-hidden="true">🧱</span>
              <span>Podyum Kiralama</span>
            </Link>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section id="stats" aria-label="Hızlı Seçim Özeti" className="relative -mt-10 z-30 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
            <div className="flex items-start justify-between flex-col md:flex-row gap-6 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  Hızlı Seçim Özeti
                </h2>
                <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl">
                  Etkinlik tipine göre podyum/sahne seçimini en hızlı şekilde burada netleştirin.
                </p>
              </div>

              <Link
                href={PODIUM_SERVICE_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold px-5 py-3 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
              >
                <span aria-hidden="true">📌</span>
                Teklif Al
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard value="≤ 80 cm" label="Kurumsal toplantı / otel içi sahne üst sınırı" />
              <StatCard value="40–80 cm" label="Düğün sahnesi (önü komple merdiven olmalı)" />
              <StatCard value="100–150 cm" label="Konser & miting (150 cm’de sabitleme zorunlu)" />
              <StatCard value="2 adet" label="Konser & mitingde max merdiven (kontrol & güvenlik)" />
            </div>

            <div className="mt-8">
              <InfoBox icon="⚠️" title="Uyarı" variant="warn">
                150 cm sahneler <strong>bağlantı aparatlarıyla sabitlenmeden</strong> bırakılmamalı.
                Sallanma, düşme ve kontrolsüz erişim riski doğrudan artar.
              </InfoBox>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs />

          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* LEFT */}
            <div className="lg:w-2/3">
              <article className="prose prose-lg prose-headings:font-black prose-headings:text-gray-900 prose-headings:scroll-mt-32 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl max-w-none">
                <div className="bg-blue-50/60 p-6 rounded-xl border-l-4 border-blue-500 mb-8 not-prose">
                  <p className="text-lg text-gray-700 font-semibold italic m-0">
                    Aynı sahne, farklı etkinlikte aynı sonucu vermez. Kurumsalda erişilebilirlik; düğünde akış;
                    konser ve mitingde ise sabitleme + kontrol önceliklidir.
                  </p>
                  <p className="text-sm text-gray-600 mt-3 mb-0">
                    Bu rehber, <Link href={PODIUM_SERVICE_PATH}>podyum kiralama</Link> kararlarını “etkinlik tipi” üzerinden
                    netleştirmeniz için hazırlanmıştır.
                  </p>
                </div>

                {/* 1 - Kurumsal */}
                <h2 id="kurumsal">1. Kurumsal Toplantı / Otel İçi</h2>
                <p>
                  Otel salonlarında yapılan kurumsal toplantılar (bayi buluşması, lansman, seminer) için sahne;
                  yüksek görünmek için değil, <strong>rahat kullanılmak ve düzeni korumak</strong> için kurulur.
                </p>
                <ul>
                  <li><strong>Maksimum yükseklik:</strong> 80 cm</li>
                  <li><strong>Merdiven:</strong> Önü komple merdiven olabilir</li>
                  <li><strong>Neden:</strong> Oturma düzeninde görüş için yeterli + iniş-çıkış güvenli</li>
                </ul>

                <figure className="my-10 not-prose">
                  <Image
                    src={kurumsalImg}
                    alt="Otel içi kurumsal toplantı sahnesi ve podyum düzenini temsil eden görsel"
                    width={kurumsalImg.width}
                    height={kurumsalImg.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg border border-gray-100"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    Kurumsal etkinlikte hedef: mesajın net aktarımı ve sahneye güvenli erişim.
                  </figcaption>
                </figure>

                <InfoBox icon="💡" title="Pro Tip">
                  Kurumsal etkinlikte “yükseklik artırmak” yerine; sahne erişimini rahatlatmak (komple merdiven) çoğu zaman daha doğru tercihtir.
                </InfoBox>

                {/* 2 - Düğün */}
                <h2 id="dugun">2. Düğün</h2>
                <p>
                  Düğün sahnesi aktif kullanılır: misafir çıkar, iner, oynar, fotoğraf çeker. Bu yüzden düğünde sahne
                  seçimi “ölçü + akış” üzerinden yapılmalıdır.
                </p>
                <ul>
                  <li><strong>Yükseklik:</strong> 40–80 cm</li>
                  <li><strong>Kural:</strong> Önü komple merdiven olmalı</li>
                  <li><strong>Fayda:</strong> Yığılma azalır, iniş-çıkış kolaylaşır, risk düşer</li>
                </ul>

                <figure className="my-10 not-prose">
                  <Image
                    src={dugunImg}
                    alt="Düğün sahnesi ve misafir trafiğine uygun podyum kullanımını temsil eden görsel"
                    width={dugunImg.width}
                    height={dugunImg.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    Düğünde sahne, “izlenen” değil “kullanılan” alandır.
                  </figcaption>
                </figure>

                <InfoBox icon="💃" title="Düğün İçin Net Kural">
                  Tek merdiven düğünlerde yığılma yapar. Önü komple merdiven, sahneyi gerçek anlamda erişilebilir kılar.
                </InfoBox>

                {/* 3 - Konser */}
                <h2 id="konser">3. Konser</h2>
                <p>
                  Konser sahnelerinde yükseklik; topografya, görüş hattı ve beklenen kalabalığa göre belirlenir.
                  Konserde ölçü kadar önemli olan konu, yüksekliğin getirdiği <strong>sabitleme ihtiyacıdır</strong>.
                </p>
                <ul>
                  <li><strong>Yükseklik:</strong> 100–150 cm</li>
                  <li><strong>150 cm ise:</strong> bağlantı aparatlarıyla sabitleme zorunlu</li>
                  <li><strong>Merdiven:</strong> En fazla 2 adet (kontrol için)</li>
                </ul>

                <figure className="my-10 not-prose">
                  <Image
                    src={konserImg}
                    alt="Konser sahnesi, LED ekran ve podyum kurulumunu temsil eden görsel"
                    width={konserImg.width}
                    height={konserImg.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    Konserde sahne yüksekliği kadar sabitleme ve giriş kontrolü de kritiktir.
                  </figcaption>
                </figure>

                <InfoBox icon="⚠️" title="Burayı ne yapalım?" variant="warn">
                  150 cm sahne sabitlenmeden bırakılmamalı. <strong>Çapraz bağlantılar + kilitli ayaklar + bağlantı aparatları</strong> ile sallanma riski azaltılmalı.
                </InfoBox>

                {/* 4 - Miting */}
                <h2 id="miting">4. Miting</h2>
                <p>
                  Miting sahnelerinde amaç: kalabalıkta görünürlük ve güvenli akış. Bu tip etkinliklerde sahneye çıkışın kontrolü
                  güvenlik açısından kritik olduğu için “merdiven planı” doğrudan önem kazanır.
                </p>
                <ul>
                  <li><strong>Yükseklik:</strong> 100–150 cm (alana ve kalabalığa göre)</li>
                  <li><strong>150 cm ise:</strong> sabitleme zorunlu</li>
                  <li><strong>Merdiven:</strong> En fazla 2 adet (kontrollü giriş)</li>
                </ul>

                <InfoBox icon="🛡️" title="Güvenlik Notu">
                  Merdiven sayısı arttıkça sahneye kontrolsüz çıkış riski artar. Mitinglerde 2 merdiven kuralı,
                  güvenliğin sahada uygulanabilir kalmasını sağlar.
                </InfoBox>

                {/* 5 - Altyapı */}
                <h2 id="altyapi">5. Açık Alan Altyapısı (Zemin 10 cm + Halı)</h2>
                <p>
                  Etkinlik açık alanda veya çadır içinde ise, sahneden önce zemin planlanır. Zemin bozuk/toprak/çim olduğunda
                  en pratik standart:
                </p>
                <ul>
                  <li><strong>Zemin podyumu:</strong> 10 cm</li>
                  <li><strong>Kaplama:</strong> Halı</li>
                  <li><strong>Sonuç:</strong> Masa–sandalye stabilitesi + konfor + daha hızlı kurulum</li>
                </ul>

                <InfoBox icon="🎯" title="Operasyon Notu">
                  Zemin podyumu çoğu zaman “ekstra” değil, açık alanda etkinliğin sorunsuz ilerlemesi için temel adımdır.
                </InfoBox>

                {/* CHECKLIST */}
                <h2 id="checklist">Teknik Kontrol Listesi</h2>
                <div className="not-prose bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 my-8 space-y-4">
                  <p className="m-0 text-sm text-gray-800 font-semibold">
                    Teklif almadan önce şu maddeleri netleştirin:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>Etkinlik tipi (kurumsal / düğün / konser / miting)</li>
                    <li>Planlanan sahne yüksekliği (≤80 / 40–80 / 100–150)</li>
                    <li>150 cm sahnede sabitleme planı (bağlantı aparatları)</li>
                    <li>Merdiven planı (konser/miting max 2)</li>
                    <li>Alan topografyası (eğim/zemin bozukluğu) ve zemin podyumu ihtiyacı</li>
                    <li>Açık alan/çadır ise zemin (10 cm + halı) ihtiyacı</li>
                  </ul>

                  <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                    <a
                      href={LEADMAGNET_WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Podyum ve sahne teknik checklist iste — yeni sekmede açılır"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                    >
                      <span aria-hidden="true">📄</span>
                      Checklist’i WhatsApp’tan iste
                    </a>

                    <Link
                      href={PODIUM_SERVICE_PATH}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold px-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
                    >
                      <span aria-hidden="true">🧱</span>
                      Podyum Kiralama Teklifi Al
                    </Link>
                  </div>
                </div>

                {/* FAQ */}
                <h2 id="faq">Sık Sorulan Sorular</h2>
                <section aria-labelledby="faq-heading" className="not-prose space-y-3 mt-6">
                  <h3 id="faq-heading" className="sr-only">
                    Etkinliğe göre podyum ve sahne tercihi hakkında sıkça sorulan sorular
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
                    Etkinliğinize Uygun Podyum & Sahne Planını Netleştirelim
                  </h3>
                  <p className="text-blue-100 mb-6 max-w-xl mx-auto relative z-10 text-lg">
                    Doğru yükseklik, doğru merdiven ve doğru sabitleme ile güvenli ve profesyonel kurulum yapalım.
                  </p>

                  <p className="text-blue-100 max-w-xl mx-auto relative z-10 text-sm mb-6">
                    <Link
                      href={PODIUM_SERVICE_PATH}
                      className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
                    >
                      Podyum kiralama
                    </Link>{" "}
                    yanında, büyük sahneler için{" "}
                    <Link
                      href={STAGE_SERVICE_PATH}
                      className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
                    >
                      sahne kiralama
                    </Link>{" "}
                    ve açık alan projelerinde{" "}
                    <Link
                      href={TENT_SERVICE_PATH}
                      className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
                    >
                      çadır kiralama
                    </Link>{" "}
                    çözümlerimizi de inceleyebilirsiniz.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <a
                      href={LEADMAGNET_WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp üzerinden hızlıca yazın — yeni sekmede açılır"
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

            {/* RIGHT */}
            <aside className="lg:w-1/3 relative">
              <div className="sticky top-24 space-y-8">
                <TableOfContents />

                <nav className="bg-gray-50 rounded-2xl p-6 border border-gray-200" aria-label="İlgili Hizmetler">
                  <h4 className="font-black mb-4 text-sm uppercase tracking-wider text-gray-700">
                    İlgili Hizmetler
                  </h4>
                  <ul className="space-y-1">
                    {[
                      { href: PODIUM_SERVICE_PATH, icon: "🧱", label: "Podyum Kiralama" },
                      { href: STAGE_SERVICE_PATH, icon: "🎭", label: "Sahne Kiralama" },
                      { href: CORPORATE_SERVICE_PATH, icon: "🏢", label: "Kurumsal Organizasyon" },
                      { href: TENT_SERVICE_PATH, icon: "⛺", label: "Çadır Kiralama" },
                      { href: LED_SERVICE_PATH, icon: "🖥️", label: "LED Ekran Kiralama" },
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
                    Etkinliğinizi yazın, size uygun ölçü ve kurulum planını netleştirelim.
                  </p>
                  <a
                    href={LEADMAGNET_WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                  >
                    📄 Checklist iste
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
