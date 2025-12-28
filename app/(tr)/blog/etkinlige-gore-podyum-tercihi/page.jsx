import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== GÖRSELLER (public/img/galeri) ================== */
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

// ✅ Kullanıcı istedi: ses ışık iç link
const SOUND_LIGHT_PATH = "/ses-isik-sistemleri";
const SOUND_LIGHT_URL = `${SITE_URL}${SOUND_LIGHT_PATH}`;

// ✅ Öne çıkan görsel (featured) public path
const FEATURED_IMAGE = "/img/galeri/podyum-kiralama-1.webp";

// ✅ Rich Results için timezone dahil ISO 8601
const PUBLISH_DATE = "2025-12-28T00:00:00+03:00";
const MODIFIED_DATE = "2025-12-28T00:00:00+03:00";

const AUTHOR_NAME = "Sahneva İçerik Ekibi";

// Lead magnet (WhatsApp)
const WHATSAPP_NUMBER = "905453048671";
const PHONE_E164 = "+905453048671";
const LEADMAGNET_MSG = encodeURIComponent(
  "Merhaba, etkinliğime göre podyum/sahne ölçüsü için ücretsiz danışmanlık almak istiyorum. Etkinlik tipi ve alan ölçüsünü paylaşabilirim."
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
    "modüler podyum sistemleri",
    "sahne kurulum hizmeti",
    "kiralık podyum fiyatları",
    "ışıklı podyum kiralama",
    "kurumsal toplantı sahnesi 80 cm",
    "düğün sahnesi 40 80 cm",
    "konser sahnesi 150 cm sabitleme",
    "miting sahnesi merdiven sayısı",
    "zemin podyumu 10 cm halı",
    "ses ışık sistemleri",
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

/* ================== FAQ VERİLERİ (SEO / RICH SNIPPETS) ================== */
const FAQ_ITEMS = [
  {
    question: "Podyumlar kaç kilogram yük taşır?",
    answer:
      "Standart modüler podyum sistemleri panel yapısına göre değişmekle birlikte, metrekare başına ortalama 500 kg ile 750 kg arası yük taşıma kapasitesine sahiptir. Proje tipine göre daha yüksek taşıma kapasitesi gereken kurulumlar ayrıca planlanır.",
  },
  {
    question: "Kurulum ne kadar sürer?",
    answer:
      "Etkinlik alanının büyüklüğüne göre değişir. Ortalama 50 m² bir podyum kurulumu, uzman ekibimiz tarafından genellikle 1–2 saat içinde tamamlanır. Zeminin durumu ve erişim koşulları süreyi etkileyebilir.",
  },
  {
    question: "Dış mekan etkinlikleri için uygun mu?",
    answer:
      "Evet. Sistemlerimiz dış mekan koşullarına uygun şekilde planlanır; kaymaz yüzey seçenekleri ve zemin dengeleme çözümleriyle güvenli kullanım hedeflenir. Açık alanda çoğu zaman 10 cm zemin podyumu üzerine halı uygulaması standart bir altyapıdır.",
  },
  {
    question: "Etkinliğe göre sahne yüksekliği nasıl seçilir?",
    answer:
      "Kurumsal toplantı ve konuşmalarda max 80 cm; düğünlerde 40–80 cm (önü komple merdiven); konser ve mitinglerde 100–150 cm aralığı pratik standarttır. 150 cm sahnelerde sabitleme bağlantı aparatları zorunludur.",
  },
  {
    question: "Konser ve miting sahnesinde kaç merdiven olmalı?",
    answer:
      "Güvenlik ve kontrol için konser ve mitinglerde sahneye çıkış en fazla 2 merdivenle sınırlandırılmalıdır. Böylece kontrolsüz çıkışlar engellenir ve sahne güvenliği korunur.",
  },
  {
    question: "Işıklı podyum kiralama yapıyor musunuz?",
    answer:
      "Etkinliğin konseptine göre ışıklı podyum kiralama seçenekleri planlanabilir. Uygulanabilirlik; zemin, elektrik altyapısı ve tasarım tercihine göre netleştirilir.",
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
          SOUND_LIGHT_URL,
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
        { id: "tablo", label: "Teknik Özellikler Tablosu" },
        { id: "kurumsal", label: "1. Kurumsal Toplantı / Otel İçi" },
        { id: "dugun", label: "2. Düğün / Nişan" },
        { id: "konser", label: "3. Konser / Festival" },
        { id: "miting", label: "4. Miting" },
        { id: "altyapi", label: "5. Açık Alan Altyapısı (Zemin 10 cm + Halı)" },
        { id: "checklist", label: "Teknik Kontrol Listesi" },
        { id: "cta", label: "Ücretsiz Danışmanlık / Teklif Al" },
        { id: "faq", label: "Sıkça Sorulan Sorular (SSS)" },
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

const SpecTable = () => {
  const rows = [
    {
      type: "Düğün / Nişan",
      height: "40–80 cm",
      surface: "Beyaz halı / Pleksi (opsiyon)",
      note: "Önü komple merdiven olmalı (akış + güvenlik)",
    },
    {
      type: "Kurumsal Sunum (Otel)",
      height: "≤ 80 cm",
      surface: "Protokol halısı / Halı kaplama",
      note: "Önü komple merdiven olabilir (erişilebilirlik)",
    },
    {
      type: "Konser / Festival",
      height: "100–150 cm",
      surface: "Kaymaz yüzey / Siyah kaplama",
      note: "150 cm’de sabitleme zorunlu + max 2 merdiven",
    },
    {
      type: "Miting",
      height: "100–150 cm",
      surface: "Kaymaz yüzey / Siyah kaplama",
      note: "Kontrollü çıkış: max 2 merdiven + sabitleme",
    },
  ];

  return (
    <div className="not-prose overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
        <p className="m-0 font-black text-gray-900">Teknik Özellikler Tablosu</p>
        <p className="m-0 mt-1 text-sm text-gray-600">
          Etkinlik türüne göre önerilen podyum yüksekliği ve yüzey tercihi (hızlı karar için).
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white">
            <tr className="border-b border-gray-200">
              <th className="px-5 py-3 font-bold text-gray-900">Etkinlik Türü</th>
              <th className="px-5 py-3 font-bold text-gray-900">Önerilen Yükseklik</th>
              <th className="px-5 py-3 font-bold text-gray-900">Yüzey Tercihi</th>
              <th className="px-5 py-3 font-bold text-gray-900">Not</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.type} className="border-b border-gray-100 last:border-0">
                <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  {r.type}
                </td>
                <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{r.height}</td>
                <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{r.surface}</td>
                <td className="px-5 py-4 text-gray-700">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
            alt="Sahneva - Etkinliğe göre podyum ve sahne kurulumu örneği"
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
            Modüler Podyum Sistemleri & Sahne Kurulum Hizmeti
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
            Etkinliğe Göre{" "}
            <span className="gradient-text gradient-text--safe-xl">Podyum ve Sahne</span>{" "}
            Tercihi
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light antialiased">
            Kurumsal toplantı, düğün, konser ve miting için doğru podyum yüksekliğini seçin.
            “Kiralık podyum fiyatları” araştırırken asıl farkı; doğru yükseklik, doğru yüzey ve güvenlik
            detayları belirler.
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
              href={LEADMAGNET_WA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Podyum ve sahne seçimi için WhatsApp üzerinden yazın — yeni sekmede açılır"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-7 py-3.5 shadow-lg shadow-emerald-900/40 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              <span aria-hidden="true">💬</span>
              <span>Ücretsiz Danışmanlık</span>
            </a>

            <Link
              href={PODIUM_SERVICE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 border border-white/20 backdrop-blur-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
            >
              <span aria-hidden="true">🧱</span>
              <span>Teklif Al</span>
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
                  Etkinlik tipine göre podyum/sahne seçimini saniyeler içinde netleştirin.
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
              <StatCard value="100–150 cm" label="Konser & miting (150 cm’de sabitleme)" />
              <StatCard value="2 adet" label="Konser & mitingde max merdiven (kontrol)" />
            </div>

            <div className="mt-8">
              <InfoBox icon="⚠️" title="Uyarı" variant="warn">
                150 cm sahneler <strong>bağlantı aparatlarıyla sabitlenmeden</strong> bırakılmamalı. Sallanma ve güvenlik riski artar.
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
                    netleştirmeniz için hazırlandı. Ayrıca ihtiyaç halinde{" "}
                    <Link href={STAGE_SERVICE_PATH}>sahne kurulum hizmeti</Link>{" "}
                    ve görsel güç için{" "}
                    <Link href={LED_SERVICE_PATH}>LED ekran kiralama</Link>{" "}
                    seçeneklerini birlikte planlayabilirsiniz.
                  </p>
                </div>

                {/* TABLO */}
                <h2 id="tablo">Teknik Özellikler Tablosu</h2>
                <p>
                  Aşağıdaki tablo, etkinlik türüne göre <strong>önerilen podyum yüksekliği</strong> ve <strong>yüzey tercihini</strong>
                  hızlıca görmeniz için hazırlanmıştır. Konseptte ışık vurgusu varsa <strong>ışıklı podyum kiralama</strong> opsiyonları da ayrıca planlanabilir.
                </p>
                <SpecTable />

                {/* 1 - Kurumsal */}
                <h2 id="kurumsal">1. Kurumsal Toplantı / Otel İçi</h2>
                <p>
                  Otel salonlarında yapılan kurumsal toplantılar (bayi buluşması, lansman, seminer) için sahne; yüksek görünmek için değil,
                  <strong>rahat kullanım ve düzen</strong> için kurulur.
                </p>
                <ul>
                  <li><strong>Maksimum yükseklik:</strong> 80 cm</li>
                  <li><strong>Merdiven:</strong> Önü komple merdiven olabilir</li>
                  <li><strong>Yüzey:</strong> Protokol halısı / halı kaplama</li>
                </ul>

                <figure className="my-10 not-prose">
                  <Image
                    src={kurumsalImg}
                    alt="Sahneva - Otel içi kurumsal toplantı sahnesi ve podyum kurulumu"
                    width={kurumsalImg.width}
                    height={kurumsalImg.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg border border-gray-100"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    Kurumsal etkinliklerde hedef: net anlatım + rahat erişim.
                  </figcaption>
                </figure>

                {/* 2 - Düğün */}
                <h2 id="dugun">2. Düğün / Nişan</h2>
                <p>
                  Düğün sahnesi aktif kullanılır: misafir çıkar, iner, oynar, fotoğraf çeker. Bu yüzden düğünde sahne seçimi
                  “ölçü + akış” üzerinden yapılmalıdır.
                </p>
                <ul>
                  <li><strong>Yükseklik:</strong> 40–80 cm</li>
                  <li><strong>Kural:</strong> Önü komple merdiven olmalı</li>
                  <li><strong>Yüzey:</strong> Beyaz halı / pleksi (opsiyon)</li>
                </ul>

                <figure className="my-10 not-prose">
                  <Image
                    src={dugunImg}
                    alt="Sahneva - Düğün organizasyonu için beyaz halı kaplı podyum"
                    width={dugunImg.width}
                    height={dugunImg.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    Düğünde sahne: erişilebilir olmalı (komple merdiven).
                  </figcaption>
                </figure>

                {/* 3 - Konser */}
                <h2 id="konser">3. Konser / Festival</h2>
                <p>
                  Konser sahnelerinde yükseklik; topografya, görüş hattı ve kalabalığa göre belirlenir.
                  Burada önemli olan, 150 cm gibi yüksekliklerde <strong>sabitleme</strong> ve <strong>kontrollü giriş</strong>tir.
                </p>
                <ul>
                  <li><strong>Yükseklik:</strong> 100–150 cm</li>
                  <li><strong>150 cm ise:</strong> bağlantı aparatlarıyla sabitleme zorunlu</li>
                  <li><strong>Merdiven:</strong> En fazla 2 adet</li>
                </ul>

                <figure className="my-10 not-prose">
                  <Image
                    src={konserImg}
                    alt="Sahneva - Dış mekan konser podyumu kurulumu ve LED ekran entegrasyonu"
                    width={konserImg.width}
                    height={konserImg.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    Kalabalık etkinliklerde sabitleme + kontrol kritik.
                  </figcaption>
                </figure>

                {/* 4 - Miting */}
                <h2 id="miting">4. Miting</h2>
                <p>
                  Miting sahnelerinde amaç: kalabalıkta görünürlük ve güvenli akış. Bu tip etkinliklerde merdiven sayısı ve
                  sahneye erişimin kontrolü güvenlik açısından kritik olur.
                </p>
                <ul>
                  <li><strong>Yükseklik:</strong> 100–150 cm (alana ve kalabalığa göre)</li>
                  <li><strong>150 cm ise:</strong> sabitleme zorunlu</li>
                  <li><strong>Merdiven:</strong> En fazla 2 adet (kontrollü giriş)</li>
                </ul>

                {/* 5 - Altyapı */}
                <h2 id="altyapi">5. Açık Alan Altyapısı (Zemin 10 cm + Halı)</h2>
                <p>
                  Açık alanda/çadırda zemin bozuk/toprak/çim ise, sahneden önce zemin planlanır.
                  En pratik standart: <strong>10 cm zemin podyumu</strong> + <strong>halı</strong>.
                </p>
                <ul>
                  <li><strong>Sonuç:</strong> masa–sandalye stabilitesi + konfor + daha hızlı kurulum</li>
                  <li>
                    Çadır projelerinde detaylar için{" "}
                    <Link href={TENT_SERVICE_PATH}>çadır kiralama</Link> sayfamıza göz atabilirsiniz.
                  </li>
                </ul>

                {/* İç link - ses ışık */}
                <InfoBox icon="🔊" title="İç Link (Tavsiye)">
                  Podyum kurulumunun yanı sıra, etkinliğinizin ambiyansını güçlendirecek{" "}
                  <Link href={SOUND_LIGHT_PATH}>Ses ve Işık Sistemleri</Link>{" "}
                  sayfamıza da göz atabilirsiniz.
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
                    <li>Açık alan/çadır ise zemin (10 cm + halı) ihtiyacı</li>
                    <li>Yüzey tercihi (halı, pleksi, cam vb.)</li>
                  </ul>
                </div>

                {/* CTA */}
                <h2 id="cta">💡 Etkinlik Planınıza Özel Çözüm Mü Arıyorsunuz?</h2>
                <div className="not-prose bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <p className="m-0 text-lg font-semibold relative z-10">
                    Podyum yüksekliği, yüzey kaplaması (halı, pleksi, cam) ve merdiven seçenekleri hakkında
                    <strong> ücretsiz danışmanlık</strong> almak için hemen teklif isteyin.
                  </p>

                  <p className="mt-3 mb-0 text-sm text-blue-100 relative z-10">
                    Not: “Kiralık podyum fiyatları” etkinliğe göre değişir; doğru ölçü + doğru kurulum kalemi
                    toplam maliyeti doğrudan etkiler.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10">
                    <Link
                      href={PODIUM_SERVICE_PATH}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold py-3.5 px-6 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                    >
                      <span aria-hidden="true">🧾</span> Teklif Al
                    </Link>

                    <a
                      href={LEADMAGNET_WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp ile ücretsiz danışmanlık alın — yeni sekmede açılır"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                    >
                      <span aria-hidden="true">💬</span> WhatsApp
                    </a>

                    <a
                      href={`tel:${PHONE_E164}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 border border-white/20 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30"
                    >
                      <span aria-hidden="true">📞</span> {PHONE_E164}
                    </a>
                  </div>
                </div>

                {/* FAQ */}
                <h2 id="faq">Podyum Kiralama Hakkında Sıkça Sorulan Sorular</h2>
                <section aria-labelledby="faq-heading" className="not-prose space-y-3 mt-6">
                  <h3 id="faq-heading" className="sr-only">
                    Podyum kiralama hakkında sıkça sorulan sorular
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
                      { href: SOUND_LIGHT_PATH, icon: "🔊", label: "Ses & Işık Sistemleri" },
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
                    💬 Ücretsiz danışmanlık al
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
