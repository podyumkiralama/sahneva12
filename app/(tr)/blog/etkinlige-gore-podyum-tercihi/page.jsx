import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== CONFIG ================== */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(
  /\/$/,
  ""
);

const BLOG_PATH = "/blog/etkinlige-gore-podyum-tercihi";
const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;

const PODIUM_SERVICE_PATH = "/podyum-kiralama";
const STAGE_SERVICE_PATH = "/sahne-kiralama";
const CORPORATE_SERVICE_PATH = "/kurumsal-organizasyon";
const TENT_SERVICE_PATH = "/cadir-kiralama";
const LED_SERVICE_PATH = "/led-ekran-kiralama";
const SOUND_LIGHT_PATH = "/ses-isik-sistemleri";

const FEATURED_IMAGE = "/img/galeri/podyum-kiralama-1.webp";

const PUBLISH_DATE = "2025-12-28T00:00:00+03:00";
const MODIFIED_DATE = "2025-12-28T00:00:00+03:00";
const AUTHOR_NAME = "Sahneva İçerik Ekibi";

const WHATSAPP_NUMBER = "905453048671";
const PHONE_E164 = "+905453048671";
const LEADMAGNET_MSG = encodeURIComponent(
  "Merhaba, etkinliğime göre podyum/sahne seçimi için ücretsiz danışmanlık istiyorum. Etkinlik tipi ve alan ölçüsünü paylaşabilirim."
);
const LEADMAGNET_WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${LEADMAGNET_MSG}`;

/* ================== SECTION IMAGES (FINAL) ================== */
const SECTION_IMAGES = {
  hero: {
    src: "/img/galeri/podyum-kiralama-1.webp",
    alt: "Sahneva - Etkinliğe göre podyum ve sahne kurulumu",
  },
  kurumsal: {
    src: "/img/galeri/podyum-kiralama-2.webp",
    alt: "Sahneva - Otel içi kurumsal toplantı sahnesi ve podyum kurulumu",
  },
  dugun: {
    src: "/img/galeri/podyum-kiralama-6.webp",
    alt: "Sahneva - Düğün ve nişan organizasyonu için alçak ve erişilebilir podyum",
  },
  konser: {
    src: "/img/galeri/led-ekran-kiralama-1.webp",
    alt: "Sahneva - Dış mekan konser sahnesi ve LED ekran kurulumu",
  },
  miting: {
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "Sahneva - Miting için kontrollü girişli yüksek sahne ve podyum sistemi",
  },
  altyapi: {
    src: "/img/galeri/cadir-kiralama-1.webp",
    alt: "Sahneva - Çadır içi 10 cm zemin podyumu ve halı kaplama uygulaması",
  },
};

/* ================== META ================== */
export const metadata = {
  title: "Etkinliğe Göre Podyum Tercihi | Sahneva Blog",
  description:
    "Doğru podyum seçimi nasıl yapılır? Düğün, kurumsal toplantı, konser ve mitingler için en uygun sahne çözümleri Sahneva’da. Profesyonel podyum kiralama rehberimizi inceleyin.",
  alternates: { canonical: BLOG_URL },
  image: FEATURED_IMAGE,
  openGraph: {
    title: "Etkinliğe Göre Podyum Tercihi | Sahneva Blog",
    description:
      "Düğün, kurumsal, konser ve miting için doğru podyum yüksekliği, yüzey tercihi, merdiven kontrolü ve 150 cm sahnelerde sabitleme rehberi.",
    url: BLOG_URL,
    type: "article",
    locale: "tr_TR",
    siteName: "Sahneva Organizasyon",
    images: [
      {
        url: `${SITE_URL}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etkinliğe Göre Podyum Tercihi | Sahneva Blog",
    description:
      "Etkinliğe göre podyum seçimi: yükseklik, yüzey, güvenlik ve kurulum ipuçları.",
    images: [`${SITE_URL}/img/og/sahneva-og.webp`],
  },
  keywords: [
    "podyum kiralama",
    "etkinliğe göre podyum",
    "modüler podyum sistemleri",
    "sahne kurulum hizmeti",
    "kiralık podyum fiyatları",
    "ışıklı podyum kiralama",
    "kurumsal toplantı sahnesi",
    "düğün sahnesi",
    "konser sahnesi",
    "miting sahnesi",
    "zemin podyumu 10 cm",
    "ses ışık sistemleri",
  ],
  authors: [{ name: AUTHOR_NAME }],
  publisher: "Sahneva Organizasyon",
  other: {
    "article:published_time": PUBLISH_DATE,
    "article:modified_time": MODIFIED_DATE,
    "article:author": AUTHOR_NAME,
    "article:section": "Podyum Kiralama",
  },
};

/* ================== FAQ (SEO) ================== */
const FAQ_ITEMS = [
  {
    question: "Podyumlar kaç kilogram yük taşır?",
    answer:
      "Standart modüler podyum sistemleri panel yapısına göre değişmekle birlikte, metrekare başına ortalama 500 kg ile 750 kg arası yük taşıma kapasitesine sahiptir.",
  },
  {
    question: "Kurulum ne kadar sürer?",
    answer:
      "Alan büyüklüğüne göre değişir. Ortalama 50 m² bir podyum kurulumu genellikle 1–2 saat içinde tamamlanır. Zemin durumu ve erişim koşulları süreyi etkileyebilir.",
  },
  {
    question: "Dış mekan etkinlikleri için uygun mu?",
    answer:
      "Evet. Dış mekan koşullarına uygun çözümler planlanır; kaymaz yüzey seçenekleri ve zemin dengeleme uygulamalarıyla güvenli kullanım hedeflenir.",
  },
  {
    question: "Konser ve mitingde 150 cm sahne güvenli mi?",
    answer:
      "150 cm sahne yapılabilir; ancak sallanmayı önlemek için bağlantı aparatlarıyla sabitleme zorunludur. Sabitleme olmadan 150 cm risklidir.",
  },
  {
    question: "Konser ve miting sahnesinde kaç merdiven olmalı?",
    answer:
      "Güvenlik ve kontrol için konser ve mitinglerde sahneye çıkış en fazla 2 merdivenle sınırlandırılmalıdır. Böylece kontrollü giriş sağlanır.",
  },
  {
    question: "Işıklı podyum kiralama yapıyor musunuz?",
    answer:
      "Etkinliğin konseptine göre ışıklı podyum kiralama seçenekleri planlanabilir. Uygulanabilirlik; zemin, elektrik altyapısı ve tasarım tercihine göre netleştirilir.",
  },
];

/* ================== JSON-LD ================== */
function ArticleSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${BLOG_URL}#blogposting`,
        headline: metadata?.title,
        description: metadata?.description,
        image: `${SITE_URL}${FEATURED_IMAGE}`,
        datePublished: PUBLISH_DATE,
        dateModified: MODIFIED_DATE,
        inLanguage: "tr-TR",
        author: { "@type": "Person", name: AUTHOR_NAME },
        publisher: {
          "@type": "Organization",
          name: "Sahneva Organizasyon",
          url: SITE_URL,
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": BLOG_URL },
        relatedLink: [
          `${SITE_URL}${PODIUM_SERVICE_PATH}`,
          `${SITE_URL}${STAGE_SERVICE_PATH}`,
          `${SITE_URL}${SOUND_LIGHT_PATH}`,
          `${SITE_URL}${LED_SERVICE_PATH}`,
          `${SITE_URL}${TENT_SERVICE_PATH}`,
          `${SITE_URL}${CORPORATE_SERVICE_PATH}`,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }}
    />
  );
}

/* ================== UI HELPERS ================== */
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
        { id: "kurumsal", label: "Kurumsal Etkinlikler / Otel İçi" },
        { id: "dugun", label: "Düğün / Nişan" },
        { id: "konser", label: "Konser / Festival" },
        { id: "miting", label: "Miting" },
        { id: "altyapi", label: "Açık Alan / Çadır Altyapısı (10 cm + Halı)" },
        { id: "checklist", label: "Teknik Kontrol Listesi" },
        { id: "cta", label: "Ücretsiz Danışmanlık / Teklif Al" },
        { id: "faq", label: "SSS (Rich Snippet)" },
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

  return (
    <div className={`not-prose border rounded-2xl p-6 ${styles}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none" aria-hidden="true">
          {icon}
        </span>
        <div>
          <p className="m-0 font-black text-base">{title}</p>
          <div className="mt-2 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

function WatermarkedFigure({ src, alt, caption }) {
  return (
    <figure className="my-10 not-prose">
      <div className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-100">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="(max-width: 768px) 100vw, 800px"
          className="w-full h-auto"
          loading="lazy"
        />
        <div className="absolute bottom-3 right-3 bg-black/55 text-white text-xs font-extrabold px-3 py-1.5 rounded-full backdrop-blur">
          Sahneva Uygulaması
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

const SpecTable = () => (
  <div className="not-prose overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
      <p className="m-0 font-black text-gray-900">Teknik Özellikler Tablosu</p>
      <p className="m-0 mt-1 text-sm text-gray-600">
        Etkinlik türüne göre önerilen yükseklik ve yüzey tercihi (hızlı tarama için).
      </p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-5 py-3 font-bold text-gray-900">Etkinlik Türü</th>
            <th className="px-5 py-3 font-bold text-gray-900">Önerilen Yükseklik</th>
            <th className="px-5 py-3 font-bold text-gray-900">Yüzey Tercihi</th>
            <th className="px-5 py-3 font-bold text-gray-900">Not</th>
          </tr>
        </thead>
        <tbody>
          {[
            [
              "Düğün / Nişan",
              "40–80 cm",
              "Beyaz halı / Pleksi (opsiyon)",
              "Önü komple merdiven (akış + güvenlik)",
            ],
            [
              "Kurumsal Sunum (Otel)",
              "≤ 80 cm",
              "Protokol halısı / Halı kaplama",
              "Komple merdiven olabilir (erişilebilirlik)",
            ],
            [
              "Konser / Festival",
              "100–150 cm",
              "Kaymaz yüzey / Siyah kaplama",
              "150 cm’de sabitleme + max 2 merdiven",
            ],
            [
              "Miting",
              "100–150 cm",
              "Kaymaz yüzey / Siyah kaplama",
              "Kontrollü çıkış: max 2 merdiven + sabitleme",
            ],
          ].map((r) => (
            <tr key={r[0]} className="border-b border-gray-100 last:border-0">
              <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">
                {r[0]}
              </td>
              <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{r[1]}</td>
              <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{r[2]}</td>
              <td className="px-5 py-4 text-gray-700">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ================== PAGE ================== */
export default function Page() {
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
            src={SECTION_IMAGES.hero.src}
            alt={SECTION_IMAGES.hero.alt}
            fill
            className="object-cover opacity-65"
            priority
            sizes="100vw"
            fetchPriority="high"
          />
          {/* watermark on hero */}
          <div className="absolute bottom-6 right-6 z-20 bg-black/55 text-white text-xs font-extrabold px-3 py-1.5 rounded-full backdrop-blur">
            Sahneva Uygulaması
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
            <strong>Modüler podyum sistemleri</strong> • <strong>Hızlı kurulum</strong> •{" "}
            <strong>Güvenlik</strong>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
            Etkinliğe Göre{" "}
            <span className="gradient-text gradient-text--safe-xl">Podyum ve Sahne</span>{" "}
            Tercihi
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light antialiased">
            Düğün, kurumsal toplantı, konser ve miting için doğru podyum yüksekliği, yüzey tercihi ve
            güvenlik kuralları. “<strong>Kiralık podyum fiyatları</strong>” araştırırken asıl farkı;
            doğru ölçü + doğru kurulum belirler.
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
            <Link
              href={PODIUM_SERVICE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold py-3.5 px-7 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
            >
              🧾 Hemen Teklif Al
            </Link>

            <a
              href={LEADMAGNET_WA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ile ücretsiz danışmanlık alın — yeni sekmede açılır"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-7 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              💬 Ücretsiz Danışmanlık
            </a>
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
                  İnsanlar blog yazılarını okumaz, tarar. Bu bölüm tek bakışta karar içindir.
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
              <StatCard value="Max 2" label="Konser & mitingde merdiven sayısı (kontrol)" />
            </div>

            <div className="mt-8">
              <InfoBox icon="⚠️" title="Uyarı (Güvenlik)" variant="warn">
                150 cm sahne kurulumunda <strong>sabitleme bağlantı aparatları</strong> zorunludur.
                Aksi halde sallanma ve güvenlik riski artar.
              </InfoBox>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs />

          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* LEFT */}
            <div className="lg:w-2/3">
              <article className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-headings:scroll-mt-32 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                {/* SOCIAL PROOF (numbersiz, güvenli) */}
                <div className="not-prose mb-10">
                  <InfoBox icon="✅" title="Sosyal Kanıt">
                    Bu rehber, farklı ölçeklerde gerçekleştirilen kurulumlarda edindiğimiz saha pratiğine dayanır.
                    Planlama aşamasında ölçüleri doğru seçmek hem <strong>hızlı kurulum</strong> sağlar hem de{" "}
                    <strong>güvenlik</strong> riskini düşürür.
                  </InfoBox>
                </div>

                {/* TABLE */}
                <h2 id="tablo">Teknik Özellikler Tablosu</h2>
                <p>
                  Etkinlik türüne göre önerilen podyum yüksekliği ve yüzey tercihini aşağıdaki tabloda hızlıca
                  görebilirsiniz. Konseptte görsel şov hedefleniyorsa{" "}
                  <strong>ışıklı podyum kiralama</strong> opsiyonları ayrıca planlanabilir.
                </p>
                <SpecTable />

                {/* Kurumsal */}
                <h2 id="kurumsal">Kurumsal Etkinlikler / Otel İçi Toplantılar</h2>
                <ul>
                  <li>
                    <strong>Önerilen yükseklik:</strong> ≤ 80 cm
                  </li>
                  <li>
                    <strong>Merdiven:</strong> Önü komple merdiven olabilir (erişilebilirlik)
                  </li>
                  <li>
                    <strong>Yüzey:</strong> Protokol halısı / halı kaplama
                  </li>
                  <li>
                    <strong>İç link:</strong> <Link href={CORPORATE_SERVICE_PATH}>Kurumsal organizasyon</Link>
                  </li>
                </ul>
                <WatermarkedFigure
                  src={SECTION_IMAGES.kurumsal.src}
                  alt={SECTION_IMAGES.kurumsal.alt}
                  caption="Kurumsal etkinliklerde hedef: erişilebilirlik + düzen + temiz görünüm."
                />

                <InfoBox icon="💡" title="Pro Tip">
                  Kurumsal etkinlikte “yükseklik artırmak” yerine, sahne erişimini rahatlatmak (komple merdiven)
                  çoğu zaman daha doğru tercihtir.
                </InfoBox>

                {/* Düğün */}
                <h2 id="dugun">Düğün / Nişan</h2>
                <ul>
                  <li>
                    <strong>Önerilen yükseklik:</strong> 40–80 cm
                  </li>
                  <li>
                    <strong>Kritik kural:</strong> Önü komple merdiven olmalı (sahneye çıkıp inme kolaylığı)
                  </li>
                  <li>
                    <strong>Yüzey:</strong> Beyaz halı / pleksi (opsiyon)
                  </li>
                  <li>
                    <strong>Not:</strong> Düğünde sahne “izlenen” değil “kullanılan” alandır.
                  </li>
                </ul>
                <WatermarkedFigure
                  src={SECTION_IMAGES.dugun.src}
                  alt={SECTION_IMAGES.dugun.alt}
                  caption="Düğünlerde komple merdiven, sahneyi gerçekten erişilebilir kılar."
                />

                {/* Konser */}
                <h2 id="konser">Konser / Festival</h2>
                <ul>
                  <li>
                    <strong>Önerilen yükseklik:</strong> 100–150 cm (topografyaya ve kalabalığa göre)
                  </li>
                  <li>
                    <strong>150 cm ise:</strong> bağlantı aparatlarıyla sabitleme zorunlu
                  </li>
                  <li>
                    <strong>Merdiven:</strong> En fazla 2 adet (kontrollü giriş)
                  </li>
                  <li>
                    <strong>İç link:</strong> <Link href={LED_SERVICE_PATH}>LED ekran kiralama</Link>
                  </li>
                </ul>
                <WatermarkedFigure
                  src={SECTION_IMAGES.konser.src}
                  alt={SECTION_IMAGES.konser.alt}
                  caption="Kalabalık etkinliklerde sabitleme + kontrollü giriş şarttır."
                />

                {/* Miting */}
                <h2 id="miting">Miting</h2>
                <ul>
                  <li>
                    <strong>Önerilen yükseklik:</strong> 100–150 cm (alana ve kalabalığa göre)
                  </li>
                  <li>
                    <strong>150 cm ise:</strong> sabitleme zorunlu (sallanmayı önlemek için)
                  </li>
                  <li>
                    <strong>Merdiven:</strong> En fazla 2 adet (kontrol altında erişim)
                  </li>
                  <li>
                    <strong>Güvenlik:</strong> Sahneye kontrolsüz çıkışlar engellenmeli
                  </li>
                </ul>
                <WatermarkedFigure
                  src={SECTION_IMAGES.miting.src}
                  alt={SECTION_IMAGES.miting.alt}
                  caption="Mitinglerde max 2 merdiven ile kontrollü giriş güvenliği artırır."
                />

                {/* Altyapı */}
                <h2 id="altyapi">Açık Alan / Çadır Altyapısı (10 cm + Halı)</h2>
                <ul>
                  <li>
                    <strong>Zemin:</strong> 10 cm zemin podyumu + halı
                  </li>
                  <li>
                    <strong>Fayda:</strong> Masa-sandalye stabilitesi + konfor + hızlı kurulum
                  </li>
                  <li>
                    <strong>İç link:</strong> <Link href={TENT_SERVICE_PATH}>Çadır kiralama</Link>
                  </li>
                </ul>
                <WatermarkedFigure
                  src={SECTION_IMAGES.altyapi.src}
                  alt={SECTION_IMAGES.altyapi.alt}
                  caption="Zemin podyumu (10 cm) + halı, açık alanda konfor ve stabilite sağlar."
                />

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
                    Podyum yüksekliği, yüzey kaplaması (halı, pleksi, cam) ve merdiven seçenekleri hakkında{" "}
                    <strong>ücretsiz danışmanlık</strong> almak için hemen{" "}
                    <Link className="underline underline-offset-4 text-white" href={PODIUM_SERVICE_PATH}>
                      Teklif Al
                    </Link>{" "}
                    butonuna tıklayın veya {PHONE_E164} üzerinden bize ulaşın.
                  </p>

                  <p className="mt-3 mb-0 text-sm text-blue-100 relative z-10">
                    Not: “<strong>Kiralık podyum fiyatları</strong>” etkinliğe göre değişir; doğru ölçü + doğru kurulum
                    kalemleri toplam maliyeti belirler. İhtiyaca göre{" "}
                    <Link className="underline underline-offset-4 text-white" href={STAGE_SERVICE_PATH}>
                      sahne kurulum hizmeti
                    </Link>{" "}
                    de birlikte planlanabilir.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10">
                    <Link
                      href={PODIUM_SERVICE_PATH}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold py-3.5 px-6 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                    >
                      🧾 Hemen Teklif Al
                    </Link>

                    <a
                      href={LEADMAGNET_WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                    >
                      💬 WhatsApp
                    </a>

                    <a
                      href={`tel:${PHONE_E164}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 border border-white/20 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30"
                    >
                      📞 {PHONE_E164}
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
                      <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer font-semibold text-gray-800 select-none bg-gray-50/50 hover:bg-gray-50 transition-colors">
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

                <p>
                  Etkinliğiniz için doğru ölçüyü netleştirmek ve teknik detayları tek noktadan planlamak için{" "}
                  <Link href={PODIUM_SERVICE_PATH}>
                    <strong>podyum kiralama</strong>
                  </Link>{" "}
                  sayfamızdan teklif isteyebilirsiniz.
                </p>
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
                  <Link
                    href={PODIUM_SERVICE_PATH}
                    className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-gray-900 hover:bg-black text-white font-semibold px-4 py-3"
                  >
                    🧾 Teklif Al
                  </Link>
                  <a
                    href={LEADMAGNET_WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-3"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
