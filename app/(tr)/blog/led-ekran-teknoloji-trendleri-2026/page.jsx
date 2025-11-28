// app/(tr)/blog/led-ekran-teknoloji-trendleri-2026/page.jsx
import Image from "next/image";
import Link from "next/link";

/* ================== SABİTLER ================== */
const SLUG = "led-ekran-teknoloji-trendleri-2026";
const BLOG_URL = `https://www.sahneva.com/blog/${SLUG}`;
const PUBLISH_DATE = "2025-12-28";
const AUTHOR_NAME = "Sahneva Teknik Ekibi";

/* ================== META ================== */
export const metadata = {
  title: "2026 LED Ekran Teknolojileri: Kurumsal Etkinlikleri Şekillendirecek 7 Büyük Trend | Sahneva",
  description:
    "2026 yılında LED ekran teknolojisinde öne çıkacak yenilikler: P2.0 paneller, XR sahne sistemleri, COB yapılar, transparan ekranlar, kavisli paneller ve enerji tasarruflu yeni nesil modüller.",
  alternates: { canonical: BLOG_URL },
  image: "/img/blog/led-2026-hero.webp",
  openGraph: {
    title: "2026 LED Ekran Teknolojilerindeki Yenilikler",
    description:
      "Yeni yılda etkinlikleri dönüştürecek LED ekran trendleri: P2.0, XR Ready paneller, COB, transparan ekranlar ve daha fazlası.",
    url: BLOG_URL,
    type: "article",
    images: [
      {
        url: "https://www.sahneva.com/img/blog/led-2026-hero.webp",
        width: 1200,
        height: 630,
        alt: "2026 LED ekran teknolojisi trendleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 LED Ekran Teknolojisi Trendleri",
    images: ["https://www.sahneva.com/img/blog/led-2026-hero.webp"],
  },
  keywords: [
    "LED ekran 2026",
    "P2.0 LED ekran",
    "XR LED wall",
    "transparan LED ekran",
    "COB LED teknolojisi",
    "etkinlik teknolojileri",
    "LED ekran kiralama",
  ],
  authors: [{ name: AUTHOR_NAME }],
  publisher: "Sahneva",
  date: PUBLISH_DATE,
};

/* ================== FAQ ================== */
const FAQ_ITEMS = [
  {
    question: "2026’da hangi LED ekran türü daha çok kullanılacak?",
    answer:
      "P2.0 iç mekân LED panelleri 2026'nın yeni standardı olarak görülüyor. Yakın mesafe etkinliklerde üstün netlik sunuyor.",
  },
  {
    question: "XR Ready LED paneller hangi etkinliklerde kullanılır?",
    answer:
      "CEO konuşmaları, lansmanlar, sahne gösterileri ve canlı yayınlı organizasyonlarda flicker-free görüntü sunmak için tercih edilir.",
  },
  {
    question: "Transparan LED ekranlar nerelerde kullanılır?",
    answer:
      "Fuar standları, otomobil lansmanları, AVM etkinlikleri ve showroom sunumlarında dekoratif ve dikkat çekici bir görünüm sağlar.",
  },
];

/* ================== JSON-LD ================== */
function ArticleSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${BLOG_URL}#article`,
        headline: "2026 LED Ekran Teknolojileri: Kurumsal Etkinlikleri Şekillendirecek 7 Büyük Trend",
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
        mainEntityOfPage: { "@type": "WebPage", "@id": BLOG_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://www.sahneva.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.sahneva.com/blog" },
          { "@type": "ListItem", position: 3, name: "LED Ekran Trendleri 2026", item: BLOG_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

/* ================== COMPONENTS ================== */
const Breadcrumbs = () => (
  <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
    <ol className="flex items-center space-x-2">
      <li>
        <Link href="/" className="hover:text-blue-600">
          Anasayfa
        </Link>
      </li>
      <li>/</li>
      <li>
        <Link href="/blog" className="hover:text-blue-600">
          Blog
        </Link>
      </li>
      <li>/</li>
      <li className="text-gray-900 font-medium" aria-current="page">
        LED Ekran Trendleri 2026
      </li>
    </ol>
  </nav>
);

/* ================== PAGE ================== */
export default function Page() {
  return (
    <>
      <ArticleSchema />

      {/* HERO */}
      <header className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-blue-800/40 z-10" />
        <Image
          src="/img/blog/led-2026-hero.webp"
          alt="2026 LED ekran teknolojileri"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
          <h1 className="font-black text-4xl md:text-6xl mb-4">
            2026 LED Ekran Teknolojileri
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Kurumsal etkinlikleri dönüştürecek 7 büyük trend
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <main className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs />

          <div className="prose prose-lg max-w-none prose-img:rounded-2xl">

            <p>
              2026 yılı, LED ekran teknolojilerinde hem teknik hem tasarımsal olarak çok büyük
              bir kırılım yılı olacak. Kurumsal etkinliklerden lansmanlara, fuar standlarından
              canlı yayınlara kadar her alanda markalar artık daha yüksek çözünürlük, daha düşük enerji tüketimi
              ve daha güçlü sahne etkisi bekliyor.
            </p>

            <h2>1. P2.0 İç Mekân Etkinliklerinde Yeni Standart Oluyor</h2>
            <p>
              Geçmişte P2.9 ve P3.9 paneller yaygınken, 2026’da iç mekân LED ekran taleplerinin çoğu
              <strong>P2.0</strong> üzerine yoğunlaşıyor. Yakın izleme mesafesi için ideal ve
              ultra netlik sunuyor.
            </p>

            <h2>2. XR Ready 240Hz LED Paneller Popülerleşiyor</h2>
            <p>
              XR (Extended Reality) altyapılı LED ekranlar, flicker-free kamera performansı sayesinde
              canlı yayın ve CEO konuşmalarında mükemmel sonuç veriyor.
            </p>

            <h2>3. COB (Chip-on-Board) Teknolojisi Dayanıklılığı Artırıyor</h2>
            <p>
              COB paneller 3 kat daha dayanıklı yapısıyla 2026’da kiralama sektörünün favorisi olacak.
              Panel yüzeyinde LED noktaları daha az zarar görüyor.
            </p>

            <h2>4. Transparan LED Ekranlar Fuar ve AVM Etkinliklerinin Yıldızı</h2>
            <p>
              %70’e varan şeffaflık oranı sayesinde hem dekoratif hem de dikkat çekici görünüyor.
            </p>

            <h2>5. Kavisli (Curved) LED Paneller Kurumsal Sahne Tasarımlarına Dönüş Katıyor</h2>
            <p>
              180° görünürlük ve modern sahne tasarımları için 2026’da daha fazla tercih edilecek.
            </p>

            <h2>6. Açık Hava İçin Yeni Nesil P5.1 – P6.2 Modüller Geliyor</h2>
            <p>
              Daha yüksek parlaklık ve düşük enerji tüketimi ile konserler ve mitinglerde yaygınlaşacak.
            </p>

            <h2>7. Ultra Hafif Kabinler = Daha Hızlı Kurulum</h2>
            <p>
              Yeni nesil kabinler %20 daha hafif. Bu da sahne kurulum hızını ciddi şekilde artırıyor.
            </p>

            {/* INTERNAL CTA */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm my-10">
              <h3 className="font-bold text-blue-900 text-xl mb-2">
                LED Ekran Kiralama mı Lazım?
              </h3>
              <p className="text-blue-800 mb-4">
                Etkinliğiniz için profesyonel P2.0 – P3.9 – P4.8 LED ekran çözümleri sunuyoruz.
              </p>
              <Link
                href="/led-ekran-kiralama"
                className="inline-block bg-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-700"
              >
                LED Ekran Kiralama Sayfasını İncele →
              </Link>
            </div>

            <h2>SSS — Sık Sorulan Sorular</h2>
            {FAQ_ITEMS.map((f, i) => (
              <details key={i} className="p-4 border rounded-lg mb-3">
                <summary className="font-semibold cursor-pointer">{f.question}</summary>
                <p className="mt-2">{f.answer}</p>
              </details>
            ))}

          </div>
        </div>
      </main>
    </>
  );
}
