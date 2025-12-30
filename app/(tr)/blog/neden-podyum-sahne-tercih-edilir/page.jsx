import Image from "next/image";

/* ================== SABİTLER ================== */
const ORIGIN = "https://www.sahneva.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ORIGIN;

const SLUG = "neden-podyum-sahne-tercih-edilir";
const BLOG_URL = `${SITE_URL}/blog/${SLUG}`;

const HERO_IMAGE = "/img/blog/podyum-sahne-avantajlari-hero.webp";
const IMG_GORUNURLUK = "/img/blog/podyum-sahne-gorunurluk.webp";
const IMG_MODULER = "/img/blog/podyum-sahne-moduler-yapi.webp";
const IMG_KURULUM = "/img/blog/podyum-sahne-kurulum.webp";
const IMG_PRO = "/img/blog/podyum-sahne-profesyonel-etkinlik.webp";

/* ================== META ================== */
export const metadata = {
  title: "Neden Podyum Sahne Tercih Edilir? Etkinliklerde Sağladığı Avantajlar",
  description:
    "Podyum sahne nedir, neden tercih edilir? Görünürlük, güvenlik, modüler yapı ve kurulum avantajlarıyla podyum sahnelerin etkinliklerde sağladığı faydaları keşfedin.",
  alternates: { canonical: BLOG_URL },

  // ✅ Blog kartı bunu okuyor
  image: HERO_IMAGE,

  openGraph: {
    title: "Neden Podyum Sahne Tercih Edilir? Etkinliklerde Sağladığı Avantajlar",
    description:
      "Podyum sahnenin görünürlük, modülerlik, kurulum kolaylığı, güvenlik ve profesyonel algı avantajları.",
    url: BLOG_URL,
    type: "article",
    siteName: "Sahneva Organizasyon",
    locale: "tr_TR",
    images: [
      {
        url: `${SITE_URL}${HERO_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "Podyum sahne avantajları",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Neden Podyum Sahne Tercih Edilir? Etkinliklerde Sağladığı Avantajlar",
    description:
      "Podyum sahne nedir, neden tercih edilir? Etkinliklerde sağladığı avantajları keşfedin.",
    images: [`${SITE_URL}${HERO_IMAGE}`],
  },
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
    image: [`${SITE_URL}${HERO_IMAGE}`],
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

function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: metadata.title, item: BLOG_URL },
    ],
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

function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Podyum sahne nedir?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Podyum sahne; modüler yapıda, yerden yükseltilmiş, taşınabilir ve farklı ölçülerde kurulabilen sahne sistemleridir. İç ve dış mekân etkinliklerinde yaygın olarak kullanılır.",
        },
      },
      {
        "@type": "Question",
        name: "Podyum sahne hangi etkinliklerde tercih edilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Podyum sahneler; konferanslar, seminerler, konserler, açılışlar, ödül törenleri, kurumsal lansmanlar ve açık hava etkinliklerinde sıkça tercih edilir.",
        },
      },
      {
        "@type": "Question",
        name: "Podyum sahne her etkinlik için uygun mudur?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Çok küçük ve samimi toplantılarda veya yerden yükselmenin gerekli olmadığı atölye çalışmalarında podyum sahne tercih edilmeyebilir. Bu durumlarda düz zemin çözümleri yeterli olabilir.",
        },
      },
    ],
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
      {/* ✅ Hepsi burada: BlogPosting + Breadcrumb + FAQ */}
      <BlogPostingJsonLd />
      <BreadcrumbJsonLd />
      <FaqJsonLd />

      {/* HERO */}
      <header className="relative">
        <div className="relative h-[44vh] min-h-[340px] w-full bg-gray-100">
          <Image
            src={HERO_IMAGE}
            alt="Podyum sahne avantajları"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        </div>
      </header>

      {/* CONTENT */}
      <section className="container mx-auto px-4 py-16">
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h1>Neden Podyum Sahne Tercih Edilir? Etkinliklerde Sağladığı Avantajlar</h1>

          <p>
            Etkinlik organizasyonlarında sahne seçimi, yalnızca estetik bir karar değildir.
            Görünürlük, güvenlik, kurulum süresi ve etkinliğin algılanan profesyonelliği
            doğrudan sahne tipiyle ilişkilidir. Bu noktada podyum sahneler, hem teknik hem
            de organizasyonel açıdan sunduğu avantajlar sayesinde günümüzde en çok tercih edilen
            sahne çözümlerinden biri hâline gelmiştir.
          </p>

          <p>
            Peki podyum sahne neden bu kadar yaygın kullanılıyor? Hangi etkinliklerde öne çıkıyor
            ve klasik sahnelere göre ne gibi farklar sunuyor?
          </p>

          <h2>Podyum Sahne Nedir?</h2>

          <p>
            Podyum sahne; modüler yapıda, yerden yükseltilmiş, taşınabilir ve farklı ölçülerde
            kurulabilen sahne sistemleridir. Genellikle metal taşıyıcı ayaklar ve üzerine yerleştirilen
            özel kaplamalı platformlardan oluşur. Bu sistemler hem iç mekân hem de dış mekân etkinliklerinde
            rahatlıkla kullanılabilir.
          </p>

          <p>
            Podyum sahneler; konferanslardan konserlere, açılışlardan ödül törenlerine kadar çok geniş bir kullanım alanına sahiptir.
          </p>

          <h2>1️⃣ Görünürlük Avantajı</h2>

          <p>Podyum sahnenin en temel avantajı yükseklik sağlar olmasıdır.</p>

          <ul>
            <li>Katılımcılar konuşmacıyı ya da performansı daha net görür</li>
            <li>Arka sıralardaki izleyiciler için görüş açısı kapanmaz</li>
            <li>Sahne–seyirci ilişkisi güçlenir</li>
          </ul>

          <div className="not-prose my-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={IMG_GORUNURLUK}
                alt="Kalabalık etkinlikte yükseltilmiş podyum sahne görünürlük avantajı"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>

          <p>
            Özellikle kalabalık organizasyonlarda, podyum sahne kullanılmadığında etkinliğin etkisi ciddi ölçüde azalabilir.
          </p>

          <h2>2️⃣ Modüler Yapı ve Esneklik</h2>

          <p>Podyum sahneler modüler sistem mantığıyla çalışır:</p>

          <ul>
            <li>İstenilen genişlik ve derinlikte kurulabilir</li>
            <li>Sahne yüksekliği etkinliğe göre ayarlanabilir</li>
            <li>Alanın fiziksel koşullarına göre şekillendirilebilir</li>
          </ul>

          <div className="not-prose my-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={IMG_MODULER}
                alt="Modüler podyum sahne parçaları ve esnek kurulum"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>

          <p>
            Bu esneklik sayesinde podyum sahneler, standart sahnelere kıyasla çok daha uyarlanabilir çözümler sunar.
          </p>

          <h2>3️⃣ Kurulum ve Söküm Kolaylığı</h2>

          <p>
            Organizasyon dünyasında zaman çok kritiktir. Podyum sahneler bu noktada büyük avantaj sağlar:
          </p>

          <ul>
            <li>Hızlı kurulum</li>
            <li>Parçalı yapı sayesinde kolay taşıma</li>
            <li>Söküm sonrası alanın kısa sürede eski hâline dönmesi</li>
          </ul>

          <div className="not-prose my-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={IMG_KURULUM}
                alt="Podyum sahne kurulum süreci"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>

          <p>
            Bu özellik özellikle otel balo salonları, fuar alanları ve geçici etkinlik mekânları için vazgeçilmezdir.
          </p>

          <h2>4️⃣ Güvenlik ve Stabilite</h2>

          <p>Kaliteli podyum sahne sistemleri:</p>

          <ul>
            <li>Yük taşıma kapasitesi yüksek</li>
            <li>Kaymaz yüzey kaplamasına sahip</li>
            <li>Dengeli ayak sistemleriyle sabitlenmiş</li>
          </ul>

          <p>
            Bu sayede konuşmacılar, sanatçılar ve ekip için güvenli bir çalışma alanı oluşturur. Aynı zamanda organizatör açısından da riskleri minimize eder.
          </p>

          <h2>5️⃣ Profesyonel Algı ve Estetik</h2>

          <p>Podyum sahneler sadece teknik değil, algısal bir avantaj da sağlar.</p>

          <ul>
            <li>Etkinlik daha düzenli ve kurumsal görünür</li>
            <li>Sahne ile seyirci arasındaki sınır netleşir</li>
            <li>Marka ve organizasyon imajı güçlenir</li>
          </ul>

          <div className="not-prose my-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={IMG_PRO}
                alt="Kurumsal etkinlikte podyum sahne"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>

          <p>
            Özellikle kurumsal lansmanlar ve resmi törenlerde bu etki çok belirgindir.
          </p>

          <h2>6️⃣ Farklı Etkinlik Türlerine Uygunluk</h2>

          <p>Podyum sahneler çok yönlüdür:</p>

          <ul>
            <li>🎤 Konferans &amp; seminerler</li>
            <li>🏆 Ödül törenleri</li>
            <li>🎶 Konser ve performanslar</li>
            <li>🏢 Kurumsal lansmanlar</li>
            <li>🎪 Açık hava etkinlikleri</li>
          </ul>

          <p>Aynı sistem, farklı organizasyon türlerinde yeniden kullanılabilir.</p>

          <h2>Ne Zaman Podyum Sahne Tercih Edilmez?</h2>

          <p>
            Her sahne çözümü her etkinlik için ideal olmayabilir. Podyum sahne;
          </p>

          <ul>
            <li>Çok küçük ve samimi toplantılarda</li>
            <li>Yerden yükselmenin gereksiz olduğu atölye çalışmalarında</li>
          </ul>

          <p>
            tercih edilmeyebilir. Bu durumlarda düz zemin çözümleri yeterli olabilir.
          </p>

          <h2>Doğru Podyum Sahne Seçimi Nasıl Yapılır?</h2>

          <p>Podyum sahne seçerken şu kriterler göz önünde bulundurulmalıdır:</p>

          <ul>
            <li>Etkinlik alanının ölçüleri</li>
            <li>Katılımcı sayısı</li>
            <li>İç / dış mekân koşulları</li>
            <li>Sahne üzerinde kullanılacak ekipmanlar</li>
          </ul>

          <p>
            Profesyonel sahne çözümleri, bu faktörlere göre planlandığında etkinliğin başarısını doğrudan etkiler.
          </p>

          <h2>Sonuç</h2>

          <p>
            Podyum sahne, görünürlükten güvenliğe, estetikten kurulum kolaylığına kadar pek çok avantaj sunar. Bu nedenle günümüzde profesyonel etkinliklerin büyük bir bölümünde tercih edilmektedir.
          </p>

          <p>
            Doğru planlanmış bir podyum sahne, etkinliğin sadece teknik altyapısını değil, katılımcı deneyimini de üst seviyeye taşır.
          </p>
        </article>
      </section>
    </main>
  );
}
