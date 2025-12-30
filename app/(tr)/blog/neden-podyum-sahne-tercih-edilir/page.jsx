import Image from "next/image";
import Link from "next/link";

/* ================== SABİTLER ================== */
const ORIGIN = "https://www.sahneva.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ORIGIN;

const SLUG = "neden-podyum-sahne-tercih-edilir";
const BLOG_URL = `${SITE_URL}/blog/${SLUG}`;
const FEATURED_IMAGE = `/img/blog/${SLUG}-hero.webp`;

/* ================== META ================== */
export const metadata = {
  title:
    "Neden Podyum Sahne Tercih Edilir? Etkinliklerde Sağladığı Avantajlar | Sahneva Blog",
  description:
    "Podyum sahne nedir, neden tercih edilir? Görünürlük, güvenlik, modüler yapı ve kurulum avantajlarıyla podyum sahnelerin etkinliklerde sağladığı faydaları detaylı şekilde inceleyin.",
  alternates: { canonical: BLOG_URL },

  // 🔴 Blog kartı burayı okur
  image: FEATURED_IMAGE,

  openGraph: {
    title: "Neden Podyum Sahne Tercih Edilir?",
    description:
      "Etkinliklerde podyum sahnelerin sağladığı teknik, estetik ve organizasyonel avantajlar.",
    url: BLOG_URL,
    type: "article",
    siteName: "Sahneva Organizasyon",
    locale: "tr_TR",
    images: [
      {
        url: `${SITE_URL}${FEATURED_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "Podyum sahne avantajları",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Neden Podyum Sahne Tercih Edilir?",
    description:
      "Görünürlükten güvenliğe podyum sahnenin etkinliklerde sunduğu avantajlar.",
    images: [`${SITE_URL}${FEATURED_IMAGE}`],
  },

  keywords: [
    "podyum sahne",
    "podyum sahne avantajları",
    "podyum sahne nedir",
    "etkinlik sahnesi",
    "sahne sistemleri",
    "podyum kiralama",
    "sahne kiralama",
  ],
};

/* ================== JSON-LD ================== */
function BlogPostingJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BLOG_URL}#blogposting`,
    mainEntityOfPage: { "@type": "WebPage", "@id": BLOG_URL },
    headline: metadata.title,
    description: metadata.description,
    image: [`${SITE_URL}${FEATURED_IMAGE}`],
    datePublished: "2025-01-01",
    dateModified: "2025-01-01",
    inLanguage: "tr-TR",
    author: {
      "@type": "Organization",
      name: "Sahneva Organizasyon",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Sahneva Organizasyon",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/logo.webp`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* ================== SAYFA ================== */
export default function BlogPostPage() {
  return (
    <main className="bg-white">
      <BlogPostingJsonLd />

      {/* HERO */}
      <header className="relative">
        <div className="relative h-[42vh] min-h-[320px] w-full">
          <Image
            src={FEATURED_IMAGE}
            alt="Neden podyum sahne tercih edilir?"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="max-w-3xl bg-white/95 backdrop-blur rounded-2xl border border-gray-200 shadow-xl p-6 md:p-8">
            <p className="text-xs font-bold text-blue-600 mb-2">Genel</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Neden Podyum Sahne Tercih Edilir? Etkinliklerde Sağladığı Avantajlar
            </h1>
            <p className="mt-4 text-gray-700">
              Podyum sahneler, modern etkinlik organizasyonlarında görünürlükten
              güvenliğe kadar birçok avantaj sunar. Bu yazıda podyum sahnenin neden
              bu kadar yaygın tercih edildiğini tüm yönleriyle ele alıyoruz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-600">
              <span>📅 1 Ocak 2025</span>
              <span>⏱️ 6 dk okuma</span>
              <span>✍️ Sahneva Editör</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT – TAM MAKALE */}
      <section className="container mx-auto px-4 py-16">
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h2>Podyum Sahne Nedir?</h2>
          <p>
            Podyum sahne; modüler yapıda, yerden yükseltilmiş, taşınabilir ve
            farklı ölçülerde kurulabilen sahne sistemleridir. Metal taşıyıcı ayaklar
            ve üzerine yerleştirilen özel kaplamalı platformlardan oluşur. Hem iç
            mekân hem de dış mekân etkinliklerinde güvenle kullanılabilir.
          </p>

          <h2>1️⃣ Görünürlük Avantajı</h2>
          <p>
            Podyum sahnelerin en temel avantajı, sahneyi seyirciden yükselterek
            görüş açısını netleştirmesidir. Kalabalık organizasyonlarda arka
            sıralardaki katılımcılar konuşmacıyı veya performansı daha rahat görür.
          </p>

          <h2>2️⃣ Modüler Yapı ve Esneklik</h2>
          <p>
            Podyum sahneler modülerdir. Etkinliğin yapılacağı alanın büyüklüğüne
            göre istenilen ölçüde kurulabilir, sahne yüksekliği ihtiyaca göre
            ayarlanabilir. Bu esneklik organizatörlere büyük avantaj sağlar.
          </p>

          <h2>3️⃣ Kurulum ve Söküm Kolaylığı</h2>
          <p>
            Zaman yönetimi organizasyonlarda kritiktir. Podyum sahneler hızlı
            kurulum ve söküm imkânı sunar. Bu özellik özellikle fuar, kongre ve
            geçici etkinlik alanlarında büyük kolaylık sağlar.
          </p>

          <h2>4️⃣ Güvenlik ve Stabilite</h2>
          <p>
            Kaliteli podyum sahne sistemleri yüksek taşıma kapasitesine, kaymaz
            yüzeylere ve dengeli ayak yapılarına sahiptir. Bu sayede sahne üzerinde
            güvenli bir kullanım sunar.
          </p>

          <h2>5️⃣ Profesyonel Algı ve Estetik</h2>
          <p>
            Yerden yükseltilmiş bir sahne, etkinliğe daha kurumsal ve profesyonel
            bir görünüm kazandırır. Katılımcıların algısında etkinliğin değeri
            artar.
          </p>

          <h2>Hangi Etkinliklerde Tercih Edilir?</h2>
          <ul>
            <li>Konferans ve seminerler</li>
            <li>Açılış ve lansman organizasyonları</li>
            <li>Konser ve sahne performansları</li>
            <li>Kurumsal etkinlikler ve ödül törenleri</li>
          </ul>

          <h2>Sonuç</h2>
          <p>
            Podyum sahne; görünürlük, güvenlik, estetik ve kullanım kolaylığı
            sağlayarak etkinliklerin kalitesini doğrudan yükseltir. Doğru planlanan
            bir podyum sahne, katılımcı deneyimini üst seviyeye taşır.
          </p>

          <hr />

          <p className="text-sm text-gray-600">
            Profesyonel çözümler için{" "}
            <Link href="/podyum-kiralama" className="text-blue-600 hover:underline">
              podyum kiralama
            </Link>{" "}
            ve{" "}
            <Link href="/sahne-kiralama" className="text-blue-600 hover:underline">
              sahne kiralama
            </Link>{" "}
            sayfalarımıza göz atabilirsiniz.
          </p>
        </article>
      </section>
    </main>
  );
}
