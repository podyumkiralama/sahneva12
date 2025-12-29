// app/(tr)/bolgesel-kiralama/page.js
import RegionalRentalClient from "./RegionalRentalClient";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

const PAGE_PATH = "/bolgesel-kiralama";
const PAGE_URL = `${SITE}${PAGE_PATH}`;
const OG_IMAGE = `${SITE}/img/og/bolgesel-kiralama-og.webp`;

export const metadata = {
  title: "Bölgesel Kiralama",
  description:
    "Türkiye genelinde LED ekran, truss, sahne/podyum ve ses-ışık sistemleri kiralama. Şehrinizi seçin, hızlı teklif alın; kurulum, test ve söküm dahil.",
  alternates: {
    canonical: PAGE_URL,
    languages: { "tr-TR": PAGE_URL, "x-default": PAGE_URL },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Bölgesel Kiralama | Sahneva Organizasyon",
    description:
      "Türkiye genelinde etkinlik ekipmanı kiralama: LED ekran, truss, sahne/podyum, ses-ışık. Kurulum + operasyon + söküm dahil.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sahneva Bölgesel Kiralama" }],
    siteName: "Sahneva",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bölgesel Kiralama | Sahneva Organizasyon",
    description:
      "Türkiye genelinde etkinlik ekipmanı kiralama. Şehrinizi seçin, hızlı teklif alın.",
    images: [OG_IMAGE],
  },
};

function JsonLd({ services, faqs, steps }) {
  const orgId = `${SITE}/#org`;
  const webId = `${SITE}/#website`;
  const pageId = `${PAGE_URL}#webpage`;
  const breadcrumbId = `${PAGE_URL}#breadcrumb`;
  const catalogId = `${PAGE_URL}#offerCatalog`;
  const faqId = `${PAGE_URL}#faq`;
  const howtoId = `${PAGE_URL}#howto`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": webId,
        url: SITE,
        name: "Sahneva Organizasyon",
        publisher: { "@id": orgId },
        inLanguage: "tr-TR",
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: PAGE_URL,
        name: "Bölgesel Kiralama",
        description:
          "Türkiye genelinde etkinlik ekipmanı kiralama: LED ekran, truss, sahne/podyum, ses-ışık. Kurulum, test ve söküm dahil.",
        isPartOf: { "@id": webId },
        about: { "@id": orgId },
        inLanguage: "tr-TR",
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE },
          { "@type": "ListItem", position: 2, name: "Bölgesel Kiralama", item: PAGE_URL },
        ],
      },

      {
        "@type": "OfferCatalog",
        "@id": catalogId,
        name: "Bölgesel Kiralama Hizmetleri",
        itemListElement: services.map((s, idx) => ({
          "@type": "Offer",
          position: idx + 1,
          itemOffered: {
            "@type": "Service",
            name: s.title,
            url: `${SITE}${s.href}`,
            areaServed: { "@type": "Country", name: "Türkiye" },
          },
        })),
      },

      // Mini HowTo: sayfa içi adımlar
      {
        "@type": "HowTo",
        "@id": howtoId,
        name: "Bölgesel kiralama süreci nasıl ilerler?",
        description:
          "Brief, teklif, lojistik planlama, kurulum/test, etkinlik operasyonu ve söküm adımlarıyla uçtan uca süreç.",
        inLanguage: "tr-TR",
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.desc,
          url: `${PAGE_URL}#${s.id}`,
        })),
      },

      {
        "@type": "FAQPage",
        "@id": faqId,
        inLanguage: "tr-TR",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Page() {
  const regions = [
    { name: "İstanbul", slug: "istanbul", desc: "Kurumsal etkinlik, fuar, konser ve lansmanlar." },
    { name: "Ankara", slug: "ankara", desc: "Kongre, salon etkinliği, kamu & kurum organizasyonları." },
    { name: "İzmir", slug: "izmir", desc: "Açık hava sahne, festival ve sahil etkinlikleri." },
    { name: "Bursa", slug: "bursa", desc: "Fuar alanları, bayi toplantıları, sahne kurulumları." },
    { name: "Antalya", slug: "antalya", desc: "Otel etkinlikleri, gala, kongre & turizm organizasyonları." },
    { name: "Kocaeli", slug: "kocaeli", desc: "Fabrika etkinlikleri, lansman & kurumsal kurulumlar." },
    { name: "Sakarya", slug: "sakarya", desc: "Açık alan kurulumları, truss & sahne projeleri." },
    { name: "Tekirdağ", slug: "tekirdag", desc: "Festival, sahne, ses-ışık ve LED ekran kurulumları." },
  ];

  const services = [
    { title: "LED Ekran Kiralama", href: "/led-ekran-kiralama" },
    { title: "Truss Kiralama", href: "/truss-kiralama" },
    { title: "Sahne / Podyum Kiralama", href: "/podyum-kiralama" },
    { title: "Ses & Işık Sistemleri", href: "/ses-isik-sistemleri" },
    { title: "Çadır Kiralama", href: "/cadir-kiralama" },
    { title: "Masa & Sandalye Kiralama", href: "/masa-sandalye-kiralama" },
  ];

  // Sticky nav adımları (sayfa bölümleri)
  const steps = [
    { id: "hizmetler", title: "Hizmetler", desc: "Kiralama kalemlerini seçin ve paketleyin." },
    { id: "surec", title: "Süreç", desc: "Brief → teklif → lojistik → kurulum/test → operasyon → söküm." },
    { id: "bolgeler", title: "Bölgeler", desc: "Şehre göre planlama ve takvim netleşir." },
    { id: "planlama", title: "Planlama", desc: "Enerji, zemin, yükseklik, güvenlik ve erişim kontrol listesi." },
    { id: "sss", title: "FAQ", desc: "Bölgesel kiralama hakkında sık sorulanlar." },
  ];

  const faqs = [
    {
      q: "Bölgesel kiralama ne demek?",
      a: "Etkinlik ekipmanlarını (LED ekran, truss, sahne/podyum, ses-ışık) bulunduğunuz şehre göre planlayıp kurulum/söküm dahil uçtan uca hizmet vermemizdir.",
    },
    {
      q: "Türkiye genelinde hizmet veriyor musunuz?",
      a: "Evet. Operasyon planına göre Türkiye genelinde kurulum ve teknik ekip desteği sağlayabiliriz.",
    },
    {
      q: "Fiyatlar şehre göre değişiyor mu?",
      a: "Evet. Mesafe, kurulum süresi, ekip sayısı ve ekipman setine göre değişebilir. En doğru fiyat için brief yeterlidir.",
    },
    {
      q: "Aynı projede birden fazla hizmet alabilir miyim?",
      a: "Evet. LED ekran + truss + sahne/podyum + ses-ışık gibi kalemleri tek paket halinde planlayabiliriz.",
    },
    {
      q: "Kurulum ne zaman yapılır?",
      a: "Proje büyüklüğüne göre 24–48 saat önce kurulum ve test planlanır. Bazı küçük kurulumlar aynı gün tamamlanabilir.",
    },
    {
      q: "Güvenlik ve iş sağlığı süreçleri nasıl yönetiliyor?",
      a: "Kurulumda zemin/ankraj, yükseklik güvenliği, kablolama ve geçiş yolları kontrol edilir. Proje tipine göre ek önlemler planlanır.",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      <JsonLd services={services} faqs={faqs} steps={steps} />
      <RegionalRentalClient regions={regions} services={services} faqs={faqs} steps={steps} />
    </main>
  );
}
