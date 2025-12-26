// app/(tr)/truss-kiralama/page.jsx

import Link from "next/link";
import dynamic from "next/dynamic";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== ISR ================== */
export const revalidate = 1800;

/* ================== Sabitler ================== */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(
  /\/$/,
  ""
);

const ORIGIN = SITE_URL;
const ORGANIZATION_ID = `${SITE_URL}/#org`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#local`;

const PAGE_PATH = "/truss-kiralama";
const PAGE_URL = `${ORIGIN}${PAGE_PATH}`;

const TITLE = "Truss Kiralama | Alüminyum Truss Sistemleri | Sahneva Organizasyon";
const DESCRIPTION =
  "Kare, üçgen, circle ve kemer (gate) dahil her türlü truss kiralama ve kurulumu. LED ekran, ışık-ses rigging ve sahne portalı için nakliye + montaj + teknik ekip desteği.";

const OG_IMAGE = `${ORIGIN}/img/og/sahneva-og.webp`;

/* ================== İletişim ================== */
/** !!! burayı ne yapalım: LED ekran sayfasındaki PHONE düzenine göre güncelledim. */
const PHONE = "+905453048671";

/** WhatsApp mesajını truss’a göre optimize ettim (dönüşüm + net brief) */
const WA_TEXT =
  "Merhaba%2C+truss+kiralama+icin+teklif+istiyorum.+Etkinlik%3A+%5Bkonser%2Ffuar%2Flansman%2Fdugun%5D%2C+Tarih%3A+%5Bgg.aa.yyyy%5D%2C+Sehir%3A+%5Bil%2Filce%5D%2C+Kurgu%3A+%5Bkare%2Fucgen%2Fkemer%2Fcircle%5D%2C+Olcu%3A+%5Ben-boy-yukseklik%5D%2C+Ek+Ihtiyac%3A+%5BLED%2FisIk%2Fsahne%5D.";

const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

const getServiceWhatsappLink = (title) => {
  const text = `Merhaba, ${title} hizmeti için bilgi ve fiyat teklifi almak istiyorum. Etkinlik tarihi: [gg.aa.yyyy], şehir: [il/ilçe], kurgu: [kare/üçgen/kemer/circle], ölçü: [en-boy-yükseklik], ek ihtiyaç: [LED/ışık/sahne].`;
  return `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(text)}`;
};

/* ================== Dinamik galeri (CaseGallery) ================== */
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => (
    <div className="flex justify-center items-center h-64" role="status" aria-label="Galeri yükleniyor">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-hidden="true" />
      <span className="sr-only">Galeri yükleniyor...</span>
    </div>
  ),
});

/* ================== Metadata ================== */
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Sahneva Organizasyon",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

/* ================== JSON-LD (Service + FAQ + Gallery Images) ================== */
function TrussJsonLd() {
  const galleryImages = TRUSS_GALLERY_IMAGES.map((img, i) => ({
    "@type": "ImageObject",
    "@id": `${PAGE_URL}#image-${i + 1}`,
    url: `${ORIGIN}${img.src}`,
    contentUrl: `${ORIGIN}${img.src}`,
    caption: img.alt,
  }));

  const faqs = FAQ_ITEMS.map((f, i) => ({
    "@type": "Question",
    "@id": `${PAGE_URL}#faq-q-${i + 1}`,
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Sahneva Organizasyon",
        url: ORIGIN,
      },
      {
        "@type": "LocalBusiness",
        "@id": LOCAL_BUSINESS_ID,
        name: "Sahneva Organizasyon",
        url: ORIGIN,
        parentOrganization: { "@id": ORGANIZATION_ID },
        telephone: PHONE,
        areaServed: "TR",
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        primaryImageOfPage: { "@type": "ImageObject", "@id": `${PAGE_URL}#primaryimage`, url: OG_IMAGE },
        mainEntity: { "@id": `${PAGE_URL}#service` },
        hasPart: [
          { "@id": `${PAGE_URL}#faq` },
          { "@id": `${PAGE_URL}#gallery` },
        ],
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Truss Kiralama ve Kurulum",
        serviceType: "Truss kiralama",
        provider: { "@id": LOCAL_BUSINESS_ID },
        areaServed: "TR",
        url: PAGE_URL,
        description:
          "Kare truss, üçgen truss, circle/oval truss ve kemer (gate) truss dahil; etkinliğe özel truss kiralama ve profesyonel kurulum-söküm hizmeti.",
        offers: {
          "@type": "Offer",
          url: PAGE_URL,
          availability: "https://schema.org/InStock",
          priceCurrency: "TRY",
          // Not: fiyat proje bazlı; price eklemiyoruz. Rich results için Offer var ama fiyat yok.
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: faqs,
      },
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#gallery`,
        name: "Truss Kurulum Galerisi",
        url: `${PAGE_URL}#galeri`,
        hasPart: galleryImages,
      },
      ...galleryImages,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Galeri Görselleri ================== */
/** /public/img/truss altında olacak şekilde */
const TRUSS_GALLERY_IMAGES = [
  { src: "/img/truss/truss-1.webp", alt: "Konser sahnesinde kare truss kurulumu" },
  { src: "/img/truss/truss-2.webp", alt: "LED ekran askı için truss taşıyıcı sistem" },
  { src: "/img/truss/truss-3.webp", alt: "Açık alan gate truss giriş takı kurulumu" },
  { src: "/img/truss/truss-4.webp", alt: "Fuar stand üst konstrüksiyonunda truss sistemi" },
  { src: "/img/truss/truss-5.webp", alt: "Circle truss ile sahne üst konstrüksiyon" },
  { src: "/img/truss/truss-6.webp", alt: "Kurumsal etkinlik sahne portalı truss kurulumu" },
  { src: "/img/truss/truss-7.webp", alt: "Festival sahnesinde geniş açıklıklı truss kurulumu" },
  { src: "/img/truss/truss-8.webp", alt: "Açık alanda ışık ve ses rigging için truss sistemi" },
];

/* ================== FAQ ================== */
const FAQ_ITEMS = [
  {
    q: "Hangi truss çeşitlerini kurabiliyorsunuz?",
    a: "Kare truss, üçgen truss, circle/oval truss, kemer (gate) truss ve özel kurgu gerektiren kurulumlar dahil etkinliğe uygun her türlü truss sistemini kurabiliyoruz.",
  },
  {
    q: "LED ekran ve ışık sistemleri truss’a asılabilir mi?",
    a: "Evet. LED ekran, ışık ve ilgili ekipmanlar için kurgu; alan, yük dağılımı, yükseklik ve güvenlik gerekliliklerine göre planlanır. Gerekli durumlarda ek sabitleme ve destek çözümleri uygulanır.",
  },
  {
    q: "Kurulum ve söküm hizmeti veriyor musunuz?",
    a: "Evet. Nakliye, kurulum, söküm ve sahada teknik ekip desteği sağlayabiliyoruz. Etkinlik tarihine, lokasyona ve kurgu karmaşıklığına göre planlama yapılır.",
  },
  {
    q: "Truss kiralama fiyatları nasıl belirlenir?",
    a: "Fiyat; truss tipi, metraj, yükseklik, kurgu karmaşıklığı, ek ekipman (base/foot, bağlantılar, destek, motor vb.), nakliye ve etkinlik süresine göre proje bazlı belirlenir.",
  },
  {
    q: "İstanbul dışında hizmet veriyor musunuz?",
    a: "Evet. İstanbul başta olmak üzere Türkiye genelinde proje bazlı hizmet verebiliyoruz.",
  },
];

/* ================== Bölüm Bileşenleri ================== */
function Hero() {
  return (
    <header className="pt-16 pb-12 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl 2xl:max-w-7xl">
        <nav aria-label="Sayfa yolu" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link className="hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded" href="/">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-semibold">Truss Kiralama</li>
          </ol>
        </nav>

        <p className="text-sm font-semibold text-blue-700">
          Sahne • LED Ekran • Işık & Ses • Fuar & Organizasyon
        </p>

        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
          Truss Kiralama{" "}
          <span className="gradient-text gradient-text--safe-xl">
            ve Kurulum
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl 2xl:max-w-4xl">
          Kare, üçgen, circle ve kemer (gate) dahil <strong>her türlü truss</strong> sistemini
          etkinliğinize göre planlıyor; nakliye, kurulum-söküm ve sahada teknik ekip desteği sağlıyoruz.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
            aria-label="WhatsApp üzerinden truss kiralama teklifi al (yeni sekmede açılır)"
          >
            <span aria-hidden="true" className="text-xl mr-3">💬</span>
            <span>WhatsApp Teklif Al</span>
          </a>

          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            aria-label="Telefonla ara"
          >
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Hemen Ara</span>
          </a>

          <a
            href="#teklif"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-800 hover:bg-gray-900 hover:text-white transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300"
          >
            <span aria-hidden="true" className="text-xl mr-3">🧾</span>
            <span>Form ile Fiyat Al</span>
          </a>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 text-gray-700">
          {[
            { title: "Kurulum + Söküm", desc: "Profesyonel ekip ile sahada tam operasyon" },
            { title: "Nakliye Dahil", desc: "İstanbul ve proje bazlı Türkiye geneli" },
            { title: "Rigging Uyumlu", desc: "LED ekran ve ışık sistemleri için planlama" },
          ].map((x) => (
            <li key={x.title} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <p className="font-black text-gray-900 text-lg">{x.title}</p>
              <p className="mt-2 text-gray-600 leading-relaxed">{x.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Content() {
  return (
    <section className="py-20 bg-white" aria-labelledby="icerik-baslik">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-16">
          <h2 id="icerik-baslik" className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Truss Kiralama{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Nedir?
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Etkinliğinize uygun truss kurgusu: güvenlik, stabilite ve profesyonel görünüm için kritik bir yapı taşıdır.
          </p>
        </header>

        <article className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
          <p>
            Truss; modüler parçalardan oluşan, bağlantı elemanları ile sabitlenen ve yük taşıma amacıyla kullanılan
            alüminyum konstrüksiyon sistemidir. Sahne üstü kurulumlarda ışık, ses ve LED ekran ekipmanlarının güvenli
            şekilde taşınmasını ve doğru konumlandırılmasını sağlar.
          </p>

          <p>
            Sahneva Organizasyon olarak konser, festival, fuar, lansman ve kurumsal etkinliklerde;
            <strong> kare truss, üçgen truss, circle/oval truss ve kemer (gate) truss</strong> dahil her türlü kurguya
            uygun truss kiralama ve kurulum hizmeti sunuyoruz.
          </p>

          <h3>Hangi truss çeşitlerini kuruyoruz?</h3>
          <ul>
            <li><strong>Kare Truss:</strong> Yüksek taşıma kapasitesi ile LED ekran askıları ve rigging için idealdir.</li>
            <li><strong>Üçgen Truss:</strong> Orta ölçekli kurgu ve dekoratif uygulamalarda esneklik sağlar.</li>
            <li><strong>Circle / Oval Truss:</strong> Yaratıcı sahne tasarımları ve merkez sahne kurguları için uygundur.</li>
            <li><strong>Kemer (Gate) Truss:</strong> Giriş takı, portal ve fuar geçişlerinde sık kullanılır.</li>
            <li><strong>Özel Kurgu:</strong> Alan ölçüsüne, yükseklik ihtiyacına ve konsept tasarıma göre proje bazlı planlanır.</li>
          </ul>

          <h3>Truss nerelerde kullanılır?</h3>
          <ul>
            <li>LED ekran askı ve truss frame çözümleri</li>
            <li>Sahne üstü ışık rigging (moving head, wash, efekt sistemleri)</li>
            <li>Sahne portalı ve backdrop taşıyıcı sistemler</li>
            <li>Fuar stand üst konstrüksiyonları</li>
            <li>Açık alan konser/festival sahneleri (koşullara göre ek sabitleme ile)</li>
          </ul>

          <p className="not-prose mt-10 rounded-3xl bg-gray-50 border border-gray-100 p-8">
            <span className="font-black text-gray-900 block text-lg mb-2">Uyumlu Hizmetler</span>
            <span className="text-gray-700 leading-relaxed block">
              Truss sistemleri genellikle{" "}
              <Link className="font-bold text-blue-700 hover:text-blue-900" href="/led-ekran-kiralama">
                LED Ekran Kiralama
              </Link>
              ,{" "}
              <Link className="font-bold text-blue-700 hover:text-blue-900" href="/ses-isik-sistemleri">
                Ses & Işık Sistemleri
              </Link>{" "}
              ve{" "}
              <Link className="font-bold text-blue-700 hover:text-blue-900" href="/sahne-kiralama">
                Sahne Kiralama
              </Link>{" "}
              ile birlikte planlanır.
            </span>
          </p>
        </article>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="galeri" className="py-20 bg-white" aria-labelledby="galeri-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="galeri-baslik"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900"
          >
            Truss Kurulum{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Galerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Konser, festival, fuar ve kurumsal etkinliklerde gerçekleştirdiğimiz truss kurulumlarından örnekler
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery images={TRUSS_GALLERY_IMAGES} visibleCount={8} priorityCount={2} />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Daha fazla projemizi incelemek için projeler sayfamızı ziyaret edin
          </p>
          <Link
            href="/projeler"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            aria-label="Tüm projeleri görüntüle"
          >
            <span aria-hidden="true" className="text-xl mr-3">📸</span>
            <span>Tüm Projeleri Görüntüle</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Technical() {
  const items = [
    {
      title: "Güvenlik & Stabilite",
      icon: "🛡️",
      description:
        "Kurgu; taşınacak ekipman, yükseklik, açıklık (span) ve zemin koşullarına göre planlanır.",
      features: ["Yük dağılımı planı", "Doğru bağlantı noktaları", "Proje bazlı sabitleme çözümleri"],
    },
    {
      title: "Rigging Uyumlu Kurulum",
      icon: "🎛️",
      description:
        "LED ekran, ışık ve sahne ekipmanları için teknik planlama; operasyonun sorunsuz ilerlemesini sağlar.",
      features: ["LED askı kurguları", "Işık bar/rigging planı", "Sahne portalı çözümleri"],
    },
    {
      title: "Operasyon & Zamanlama",
      icon: "⏱️",
      description:
        "Nakliye, kurulum ve söküm; etkinlik akışını bölmeyecek şekilde planlanır ve sahada ekip desteği sağlanır.",
      features: ["Kurulum-söküm planı", "Saha koordinasyonu", "Proje bazlı keşif/planlama"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50" aria-labelledby="teknik-baslik">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 id="teknik-baslik" className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Teknik{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Planlama
            </span>{" "}
            & Güvenlik
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Truss kurulumunda en kritik konu güvenliktir. Planlama; ekipman türü, yükseklik ve ortam koşullarına göre yapılır.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.title}
              className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl" aria-hidden="true">{it.icon}</div>
              <h3 className="mt-4 text-2xl font-black text-gray-900">{it.title}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">{it.description}</p>
              <ul className="mt-6 space-y-2 text-gray-700">
                {it.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden="true">✅</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href={getServiceWhatsappLink(it.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                  aria-label={`${it.title} için WhatsApp üzerinden teklif iste (yeni sekmede açılır)`}
                >
                  <span aria-hidden="true" className="mr-2">➡️</span>
                  <span>Teklif Al</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          >
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Detaylı Teklif için İletişime Geçin</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="py-20 bg-white" aria-labelledby="sss-baslik">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 id="sss-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Sık Sorulan{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Sorular
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Truss kiralama ve kurulum hakkında merak edilen sorular ve cevapları
          </p>
        </div>

        <div className="space-y-4" role="list" aria-label="Sık sorulan sorular listesi">
          {FAQ_ITEMS.map((faq, index) => {
            const panelId = `faq-panel-${index}`;
            const headingId = `faq-heading-${index}`;

            return (
              <article key={faq.q} role="listitem">
                <details
                  className="group bg-gray-50 rounded-3xl border-2 border-transparent transition-all duration-500 hover:bg-gray-100 open:bg-gray-100 open:border-blue-100 [&_summary::-webkit-details-marker]:hidden"
                  id={panelId}
                  aria-labelledby={headingId}
                >
                  <summary
                    id={headingId}
                    className="cursor-pointer w-full list-none text-left flex items-center justify-between gap-4 px-8 py-6 text-xl font-bold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl"
                    role="button"
                    tabIndex={0}
                  >
                    <span className="pr-4 flex-1">{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className="ml-4 transition-transform duration-300 text-blue-600 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 group-open:rotate-180"
                    >
                      ⌄
                    </span>
                  </summary>

                  <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 px-8 pb-0">
                    <div className="overflow-hidden text-gray-700 leading-relaxed text-lg pt-0 group-open:pt-2 group-open:pb-6">
                      <p className="pl-4 border-l-4 border-blue-500">{faq.a}</p>
                    </div>
                  </div>
                </details>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Daha fazla sorunuz mu var? Uzman ekibimiz sizi arayıp bilgilendirsin.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
            aria-label="WhatsApp üzerinden iletişime geç (yeni sekmede açılır)"
          >
            <span aria-hidden="true" className="text-xl mr-3">💬</span>
            <span>WhatsApp’tan Yaz</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="teklif" className="py-20 bg-gradient-to-b from-white to-slate-50" aria-labelledby="teklif-baslik">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 id="teklif-baslik" className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Truss Kiralama{" "}
            <span className="gradient-text gradient-text--safe-xl">
              Teklifi Alın
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Net ve hızlı fiyatlandırma için aşağıdaki bilgileri paylaşmanız yeterli.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Şehir / İlçe",
            "Etkinlik tarihi",
            "Kurulum süresi (kaç gün)",
            "Kurgu türü (kare/üçgen/kemer/circle)",
            "Ölçü ihtiyacı (en-boy-yükseklik)",
            "Ek ihtiyaçlar (LED ekran / ışık / sahne)",
          ].map((x) => (
            <div key={x} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <p className="font-bold text-gray-900">{x}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] transform transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
            aria-label="WhatsApp üzerinden teklif al (yeni sekmede açılır)"
          >
            <span aria-hidden="true" className="text-xl mr-3">✅</span>
            <span>Hemen Teklif Al</span>
          </a>

          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            aria-label="Telefonla ara"
          >
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Telefonla Ara</span>
          </a>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>
            İlgili hizmetler:{" "}
            <Link className="font-bold text-blue-700 hover:text-blue-900" href="/led-ekran-kiralama">
              LED Ekran Kiralama
            </Link>{" "}
            •{" "}
            <Link className="font-bold text-blue-700 hover:text-blue-900" href="/ses-isik-sistemleri">
              Ses & Işık Sistemleri
            </Link>{" "}
            •{" "}
            <Link className="font-bold text-blue-700 hover:text-blue-900" href="/sahne-kiralama">
              Sahne Kiralama
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================== PAGE ================== */
export default function Page() {
  return (
    <main>
      {/* JSON-LD */}
      <TrussJsonLd />

      {/* Breadcrumb JSON-LD (sende hazır component var) */}
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: ORIGIN },
          { name: "Truss Kiralama", url: PAGE_URL },
        ]}
      />

      <Hero />
      <Content />
      <Gallery />
      <Technical />
      <FAQ />
      <Offer />
    </main>
  );
}
