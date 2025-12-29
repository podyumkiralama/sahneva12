import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== CONFIG ================== */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(/\/$/, "");

const BLOG_PATH = "/blog/sahne-neden-hep-yuksektir-2500-yillik-bir-sir";
const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;

const PODIUM_SERVICE_PATH = "/podyum-kiralama";
const STAGE_SERVICE_PATH = "/sahne-kiralama";
const CORPORATE_SERVICE_PATH = "/kurumsal-organizasyon";
const TENT_SERVICE_PATH = "/cadir-kiralama";
const LED_SERVICE_PATH = "/led-ekran-kiralama";
const SOUND_LIGHT_PATH = "/ses-isik-sistemleri";

const FEATURED_IMAGE = "/img/galeri/led-ekran-kiralama-3.webp";

const PUBLISH_DATE = "2025-12-29T00:00:00+03:00";
const MODIFIED_DATE = "2025-12-29T00:00:00+03:00";
const AUTHOR_NAME = "Sahneva İçerik Ekibi";

const WHATSAPP_NUMBER = "905453048671";
const PHONE_E164 = "+905453048671";
const WA_MSG = encodeURIComponent(
  "Merhaba, etkinliğim için sahne/podyum planlamak istiyorum. Alan ölçüsü ve etkinlik türünü paylaşabilirim."
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`;

/* ================== IMAGES ================== */
const SECTION_IMAGES = {
  hero: {
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "Sahneva - Modern sahne ve LED ekran kurulumu",
  },

  // ✅ Tek görsel (blend geçiş) — bunu public'e ekle:
  // public/img/blog/antik-modern-gecis.webp
  blend: {
    src: "/img/blog/antik-modern-gecis.webp",
    alt: "Antik tiyatro sahnesinden modern konser sahnesine geçiş",
  },

  // In-article
  konser: {
    src: "/img/galeri/led-ekran-kiralama-1.webp",
    alt: "Sahneva - Dış mekan konser sahnesi ve LED ekran kurulumu",
  },
  miting: {
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "Sahneva - Miting için kontrollü girişli sahne kurulumu",
  },
  kurumsal: {
    src: "/img/galeri/podyum-kiralama-2.webp",
    alt: "Sahneva - Otel içi kurumsal toplantı sahnesi ve podyum kurulumu",
  },
  dugun: {
    src: "/img/galeri/podyum-kiralama-6.webp",
    alt: "Sahneva - Düğün ve nişan organizasyonu için alçak podyum",
  },
  altyapi: {
    src: "/img/galeri/cadir-kiralama-1.webp",
    alt: "Sahneva - Çadır içi 10 cm zemin podyumu ve halı kaplama uygulaması",
  },

  // Case study (istersen değiştir)
  case: {
    src: "/img/blog/case-study-1.webp",
    alt: "Sahneva - örnek kurulum projesi",
  },
};

/* ================== META ================== */
export const metadata = {
  title: "Sahne Neden Hep Yüksektir? 2500 Yıllık Bir Sır | Sahneva Blog",
  description:
    "Antik tiyatrolardan modern konser ve miting sahnelerine… Sahne yüksekliği neden önemlidir? Güvenlik, görüş açısı, merdiven kontrolü ve rüzgar dayanımı gibi kritik detaylarla sahnenin evrimini keşfedin.",
  alternates: { canonical: BLOG_URL },
  openGraph: {
    title: "Sahne Neden Hep Yüksektir? 2500 Yıllık Bir Sır",
    description:
      "Tarihten bugüne sahnelerin gelişimi: Antik platformlardan modern truss sistemlerine. Güvenlik ve mühendislik detaylarıyla.",
    url: BLOG_URL,
    type: "article",
    locale: "tr_TR",
    siteName: "Sahneva Organizasyon",
    images: [{ url: `${SITE_URL}${FEATURED_IMAGE}`, width: 1200, height: 630, alt: "Sahneva blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahne Neden Hep Yüksektir? 2500 Yıllık Bir Sır",
    description:
      "Sahnenin evrimi: Antik tiyatrodan modern konser/miting sahnesine. Güvenlik ve mühendislik ipuçlarıyla.",
    images: [`${SITE_URL}${FEATURED_IMAGE}`],
  },
  keywords: [
    "sahne kiralama",
    "podyum kiralama",
    "modüler podyum sistemleri",
    "konser sahnesi",
    "miting sahnesi",
    "kurumsal etkinlik sahnesi",
    "düğün sahnesi",
    "rüzgar dayanımı",
    "truss sahne",
    "ses ışık sistemleri",
    "led ekran kiralama",
    "çadır içi zemin podyumu",
  ],
};

/* ================== FAQ (SEO) ================== */
const FAQ_ITEMS = [
  {
    q: "Sahne yüksekliği neden önemlidir?",
    a: "Görüş açısı, güvenlik ve ses/ışık yerleşimi doğrudan sahne yüksekliğine bağlıdır. Kalabalık arttıkça doğru yükseklik daha kritik hâle gelir.",
  },
  {
    q: "Konser ve miting sahnesi kaç cm olmalı?",
    a: "Genelde 100–150 cm arası tercih edilir; alanın topografyası ve beklenen kalabalığa göre değişir. 150 cm sahnelerde sabitleme kritik bir güvenlik şartıdır.",
  },
  {
    q: "Düğün ve kurumsal toplantıda sahne yüksekliği kaç olmalı?",
    a: "Genelde maksimum 80 cm tercih edilir. Düğünlerde ön yüzün komple merdiven yapılması, sahneye çıkış-iniş akışını kolaylaştırır.",
  },
  {
    q: "Konser/miting sahnesinde merdiven kaç tane olmalı?",
    a: "Güvenlik ve kontrol için en fazla 2 merdiven önerilir. Böylece kontrolsüz çıkışlar azaltılır.",
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
        headline: metadata.title,
        description: metadata.description,
        image: `${SITE_URL}${FEATURED_IMAGE}`,
        datePublished: PUBLISH_DATE,
        dateModified: MODIFIED_DATE,
        inLanguage: "tr-TR",
        author: { "@type": "Person", name: AUTHOR_NAME },
        publisher: { "@type": "Organization", name: "Sahneva Organizasyon", url: SITE_URL },
        mainEntityOfPage: { "@type": "WebPage", "@id": BLOG_URL },
        relatedLink: [
          `${SITE_URL}${STAGE_SERVICE_PATH}`,
          `${SITE_URL}${PODIUM_SERVICE_PATH}`,
          `${SITE_URL}${LED_SERVICE_PATH}`,
          `${SITE_URL}${SOUND_LIGHT_PATH}`,
          `${SITE_URL}${TENT_SERVICE_PATH}`,
          `${SITE_URL}${CORPORATE_SERVICE_PATH}`,
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${BLOG_URL}#faq`,
        mainEntity: FAQ_ITEMS.map((x) => ({
          "@type": "Question",
          name: x.q,
          acceptedAnswer: { "@type": "Answer", text: x.a },
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

/* ================== UI ================== */
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
        Sahne Neden Hep Yüksektir?
      </li>
    </ol>
  </nav>
);

function WatermarkedFigure({ src, alt, caption }) {
  return (
    <figure className="my-10 not-prose">
      <div className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-100">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="(max-width: 768px) 100vw, 900px"
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

const InfoBox = ({ icon, title, children, variant = "info" }) => {
  const cls =
    variant === "warn"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : variant === "tech"
      ? "bg-slate-900 border-slate-700 text-slate-100"
      : "bg-blue-50 border-blue-200 text-blue-900";

  return (
    <div className={`not-prose border rounded-2xl p-6 ${cls}`}>
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

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-white">
    {children}
  </span>
);

/* ================== PAGE ================== */
export default function Page() {
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "Sahne Neden Hep Yüksektir? 2500 Yıllık Bir Sır", url: BLOG_URL },
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
          <div className="absolute bottom-6 right-6 z-20 bg-black/55 text-white text-xs font-extrabold px-3 py-1.5 rounded-full backdrop-blur">
            Sahneva Uygulaması
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-7">
            <Pill>Antik → Modern</Pill>
            <Pill>Güvenlik & Mühendislik</Pill>
            <Pill>Konser • Miting • Düğün • Otel</Pill>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 tracking-tight">
            Sahne Neden Hep Yüksektir?{" "}
            <span className="gradient-text gradient-text--safe-xl">2500 Yıllık Bir Sır</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light antialiased">
            Antik tiyatrolardan modern truss sistemlerine… Sahne yüksekliği, erişim ve güvenlik neden hâlâ aynı
            prensiplerle planlanıyor? Tarih ile bugünü bağlayan bir sahne rehberi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200 mt-8 pt-8 border-t border-white/10">
            <time dateTime={PUBLISH_DATE} className="flex items-center gap-2">
              <span aria-hidden="true">📅</span> 29 Aralık 2025
            </time>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">⏱️</span> 8–10 dk okuma
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">✍️</span> {AUTHOR_NAME}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={STAGE_SERVICE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold py-3.5 px-7 transition-transform hover:-translate-y-0.5"
            >
              🎭 Sahne Kiralama
            </Link>

            <Link
              href={PODIUM_SERVICE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold py-3.5 px-7 border border-white/20 transition-transform hover:-translate-y-0.5"
            >
              🧱 Modüler Podyum
            </Link>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ile ücretsiz danışmanlık — yeni sekmede açılır"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-7 transition-transform hover:-translate-y-0.5"
            >
              💬 Ücretsiz Danışmanlık
            </a>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs />

          <article className="prose prose-lg max-w-none prose-headings:font-black prose-headings:scroll-mt-32 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            {/* Özet */}
            <InfoBox icon="🧠" title="Özet (1 Dakikada)" variant="info">
              Sahne yüksekliği; sadece “görünürlük” değil, aynı zamanda <strong>güvenlik</strong>,{" "}
              <strong>erişim kontrolü</strong> ve <strong>taşıma kapasitesi</strong> demektir. Antik çağdan bugüne
              değişmeyen şey: Kalabalık büyüdükçe, sahne planının “mühendislik işi” hâline gelmesi.
            </InfoBox>

            {/* ✅ Tek görsel (blend) */}
            <WatermarkedFigure
              src={SECTION_IMAGES.blend.src}
              alt={SECTION_IMAGES.blend.alt}
              caption="Antik tiyatrolardan modern sahne mühendisliğine uzanan yolculuk."
            />

            <InfoBox icon="💡" title="Biliyor muydunuz?" variant="tech">
              Antik dünyada sahne çoğunlukla “görünürlük” için yükselirdi. Bugünse aynı yükselti; görüş açısının
              yanında <strong>rüzgar dayanımı</strong>, <strong>merdiven kontrolü</strong> ve{" "}
              <strong>sabitleme</strong> gibi güvenlik hesaplarını da zorunlu kılar.
            </InfoBox>

            <h2 id="antik">1) Antik Dönem: Sözün Yükseldiği Yer</h2>
            <p>
              Sahne fikri önce “performans” için değil, kalabalığa seslenmek için ortaya çıktı. Yerden yükselmek; hem
              görünürlüğü artırır hem de konuşana otorite kazandırır.
            </p>

            <h2 id="tiyatro">2) Antik Tiyatrolar: Seyir İçin Tasarım</h2>
            <p>
              Antik tiyatrolar; oturma düzeni, görüş açısı ve akustik mantığıyla sahnenin “izleyiciyle ilişkisini”
              kurdu. Bugün konserlerde sahne yüksekliği ve görüş hattı planı hâlâ aynı mantığa dayanır.
            </p>

            <h2 id="kapali">3) Sahne Kapalı Mekâna Girince: Kontrol Başladı</h2>
            <p>
              Orta Çağ ve Rönesans ile sahne kapalı alanlara taşındı. Bu geçiş, yükseklik ve giriş-çıkış düzenini daha
              önemli hâle getirdi. Günümüzde{" "}
              <Link href={CORPORATE_SERVICE_PATH}>otel içi kurumsal etkinlik</Link> sahnelerinde bu yüzden genelde{" "}
              <strong>maksimum 80 cm</strong> tercih edilir.
            </p>

            <WatermarkedFigure
              src={SECTION_IMAGES.kurumsal.src}
              alt={SECTION_IMAGES.kurumsal.alt}
              caption="Otel içi / kurumsal sahnelerde hedef: düzen + erişilebilirlik + net görüş."
            />

            <InfoBox icon="🧩" title="Teknik Not" variant="tech">
              Kurumsal ve düğün tipi etkinliklerde sahne çoğu zaman “kullanılan alan”dır. Bu yüzden erişim (komple
              merdiven) konforu ciddi şekilde artırır.
            </InfoBox>

            <h2 id="modern">4) Modern Çağ: Truss, Rüzgar, Sabitleme</h2>
            <p>
              Modern sahneler modülerdir. Hızlı kurulur. Ancak bu hız, güvenlik hesabı yapılmadan riskli hâle gelir.
              Özellikle açık alanda <strong>rüzgar dayanımı</strong> ve <strong>sabitleme</strong> kritik konudur.
            </p>

            <InfoBox icon="⚠️" title="Hayati Teknik Uyarı" variant="warn">
              Modern bir konser sahnesinin rüzgar dayanımı hesabı ve sabitlemesi yapılmadan kurulması{" "}
              <strong>hayati risk</strong> taşır. 150 cm sahnelerde sabitleme bağlantıları “opsiyon” değil şarttır.
            </InfoBox>

            <h3 id="konser">Konser Sahnesi</h3>
            <ul>
              <li>
                <strong>Önerilen yükseklik:</strong> 100–150 cm (topografyaya ve kalabalığa göre)
              </li>
              <li>
                <strong>150 cm ise:</strong> sabitleme bağlantı aparatları zorunlu
              </li>
              <li>
                <strong>İç link:</strong> <Link href={STAGE_SERVICE_PATH}>sahne kiralama</Link> +{" "}
                <Link href={LED_SERVICE_PATH}>LED ekran</Link> +{" "}
                <Link href={SOUND_LIGHT_PATH}>ses & ışık</Link>
              </li>
            </ul>

            <WatermarkedFigure
              src={SECTION_IMAGES.konser.src}
              alt={SECTION_IMAGES.konser.alt}
              caption="Konserlerde sahne planı; görüş, güvenlik ve ekipman yerleşiminin birleşimidir."
            />

            <h3 id="miting">Miting Sahnesi</h3>
            <ul>
              <li>
                <strong>Önerilen yükseklik:</strong> 100–150 cm
              </li>
              <li>
                <strong>Merdiven:</strong> en fazla 2 adet (kontrollü erişim)
              </li>
              <li>
                <strong>İç link:</strong> <Link href={STAGE_SERVICE_PATH}>sahne çözümleri</Link>
              </li>
            </ul>

            <WatermarkedFigure
              src={SECTION_IMAGES.miting.src}
              alt={SECTION_IMAGES.miting.alt}
              caption="Mitinglerde kontrollü merdiven sayısı, güvenliği doğrudan etkiler."
            />

            <h2 id="insan">5) Düğün ve Kurumsal Etkinlikler: Sahne İnsan İçindir</h2>
            <p>
              Düğün ve kurumsal organizasyonlarda sahne yalnızca izlenen alan değildir. İnsanlar sahneye çıkar, iner,
              fotoğraf çeker, hareket eder. Bu yüzden yükseklik ve erişim planı çok önemlidir.
            </p>

            <h3 id="dugun">Düğün / Nişan Sahnesi</h3>
            <ul>
              <li>
                <strong>Önerilen yükseklik:</strong> 40–80 cm
              </li>
              <li>
                <strong>Kural:</strong> ön yüz komple merdiven (akış için)
              </li>
              <li>
                <strong>İç link:</strong> <Link href={PODIUM_SERVICE_PATH}>modüler podyum sistemleri</Link>
              </li>
            </ul>

            <WatermarkedFigure
              src={SECTION_IMAGES.dugun.src}
              alt={SECTION_IMAGES.dugun.alt}
              caption="Düğünlerde komple merdiven, sahneyi erişilebilir kılar ve akışı rahatlatır."
            />

            <h2 id="zemin">6) Zemin ve Altyapı: 10 cm + Halı (Çadır / Açık Alan)</h2>
            <p>
              Açık alan veya çadır uygulamalarında zemin podyumu (10 cm) üzerine halı serilmesi; hem masa-sandalye
              düzenini stabilize eder hem de konfor sağlar.
            </p>

            <WatermarkedFigure
              src={SECTION_IMAGES.altyapi.src}
              alt={SECTION_IMAGES.altyapi.alt}
              caption="10 cm zemin podyumu + halı, çadır ve açık alanda stabilite sağlar."
            />

            <p>
              İlgili hizmet: <Link href={TENT_SERVICE_PATH}>çadır kiralama</Link> (zemin + kurulum planı birlikte).
            </p>

            <h2 id="case">Tarihi Mirastan İlham Aldık: Projemiz</h2>
            <p>
              Tarih bize şunu söylüyor: sahne; kalabalıkla kurulan ilişkinin merkezidir. Biz de her projede aynı soruyu
              sorarız: “Bu sahne, bu kalabalık için doğru mu?”
            </p>

            <InfoBox icon="🏗️" title="Case Study Şablonu (Sen Doldur)" variant="info">
              <ul className="m-0 pl-5">
                <li>
                  <strong>Proje Adı:</strong> [Buraya proje adı]
                </li>
                <li>
                  <strong>Etkinlik Türü:</strong> Konser / Miting / Kurumsal / Düğün
                </li>
                <li>
                  <strong>Çözüm:</strong> Sahne + podyum + LED + ses/ışık + güvenlik planı
                </li>
                <li>
                  <strong>Öne çıkan:</strong> Sabitleme, merdiven kontrolü, zemin çözümü
                </li>
              </ul>
            </InfoBox>

            <WatermarkedFigure
              src={SECTION_IMAGES.case.src}
              alt={SECTION_IMAGES.case.alt}
              caption="Bu görseli, en güçlü referans kurulum fotoğrafınla değiştir: /public/img/blog/case-study-1.webp"
            />

            <h2 id="cta">💡 Etkinlik Planınıza Özel Sahne Çözümü</h2>
            <div className="not-prose bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <p className="m-0 text-lg font-semibold relative z-10">
                Sahne yüksekliği, podyum yüzeyi (halı/pleksi/cam), merdiven planı ve sabitleme detayları için{" "}
                <strong>ücretsiz danışmanlık</strong> alın.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10">
                <Link
                  href={STAGE_SERVICE_PATH}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold py-3.5 px-6 transition-transform hover:-translate-y-0.5"
                >
                  🎭 Sahne Kiralama
                </Link>

                <Link
                  href={PODIUM_SERVICE_PATH}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 border border-white/20 transition-transform hover:-translate-y-0.5"
                >
                  🧱 Podyum Sistemleri
                </Link>

                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 transition-transform hover:-translate-y-0.5"
                >
                  💬 WhatsApp
                </a>

                <a
                  href={`tel:${PHONE_E164}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 border border-white/20 transition-transform hover:-translate-y-0.5"
                >
                  📞 {PHONE_E164}
                </a>
              </div>

              <p className="mt-4 mb-0 text-sm text-blue-100 relative z-10">
                İlgili hizmetler:{" "}
                <Link className="underline text-white" href={LED_SERVICE_PATH}>
                  LED ekran
                </Link>{" "}
                •{" "}
                <Link className="underline text-white" href={SOUND_LIGHT_PATH}>
                  Ses & Işık
                </Link>{" "}
                •{" "}
                <Link className="underline text-white" href={TENT_SERVICE_PATH}>
                  Çadır
                </Link>{" "}
                •{" "}
                <Link className="underline text-white" href={CORPORATE_SERVICE_PATH}>
                  Kurumsal
                </Link>
              </p>
            </div>

            <h2 id="faq">Sıkça Sorulan Sorular</h2>
            <section className="not-prose space-y-3 mt-6">
              {FAQ_ITEMS.map((item, idx) => (
                <details
                  key={idx}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:ring-2 open:ring-blue-100 open:border-blue-300 transition-all duration-200"
                >
                  <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer font-semibold text-gray-800 select-none bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    {item.q}
                    <span className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180 text-gray-600">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 pb-5 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    {item.a}
                  </div>
                </details>
              ))}
            </section>

            <h2 id="yorum">Sizce Sahnenin En Önemli Özelliği Nedir?</h2>
            <p>
              Yorumlarda merak ediyorum: Sizin için sahnede en önemli şey <strong>görsellik</strong> mi,{" "}
              <strong>güvenlik</strong> mi? (İkisi birlikte diyorsan, en çok hangi detay seni ikna ediyor?)
            </p>
          </article>
        </div>
      </main>
    </>
  );
}
