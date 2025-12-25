// app/(tr)/nasil-calisiyoruz/page.js
import HowItWorksClient from "./HowItWorksClient";

/* ================== SEO METADATA ================== */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

const PAGE_PATH = "/nasil-calisiyoruz";
const PAGE_URL = `${SITE}${PAGE_PATH}`;
const OG_IMAGE = `${SITE}/img/og/how-it-works-og.webp`;

export const metadata = {
  title: "Nasıl Çalışıyoruz? | Sahneva Organizasyon",
  description:
    "Sahneva’da süreç; ihtiyaç analizi, teklif, teknik keşif, kurulum ve etkinlik sonrası söküm dahil uçtan uca planlanır.",
  alternates: {
    canonical: PAGE_URL,
    languages: { "tr-TR": PAGE_URL, "x-default": PAGE_URL },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Nasıl Çalışıyoruz? | Sahneva Organizasyon",
    description: "İhtiyaç → teklif → keşif → kurulum → etkinlik günü → söküm.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sahneva nasıl çalışır?" }],
    siteName: "Sahneva",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasıl Çalışıyoruz? | Sahneva Organizasyon",
    description: "Sahneva süreç yönetimi: teklif, keşif, kurulum, etkinlik günü, söküm.",
    images: [OG_IMAGE],
  },
};

/* ================== JSON-LD ================== */
function JsonLd({ stepsData, faqs }) {
  const orgId = `${SITE}/#org`;
  const webId = `${SITE}/#website`;
  const pageId = `${PAGE_URL}#webpage`;
  const breadcrumbId = `${PAGE_URL}#breadcrumb`;
  const howtoId = `${PAGE_URL}#howto`;
  const faqId = `${PAGE_URL}#faq`;

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
        name: "Nasıl Çalışıyoruz?",
        description:
          "Sahneva’da süreç; ihtiyaç analizi, teklif, teknik keşif, kurulum ve söküm dahil uçtan uca planlanır.",
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
          { "@type": "ListItem", position: 2, name: "Nasıl Çalışıyoruz", item: PAGE_URL },
        ],
      },
      {
        "@type": "HowTo",
        "@id": howtoId,
        name: "Sahneva ile Etkinlik Süreci Nasıl İlerler?",
        description:
          "İlk iletişimden kurulum ve söküme kadar Sahneva’nın uçtan uca etkinlik kurulum süreci.",
        inLanguage: "tr-TR",
        step: stepsData.map((s) => ({
          "@type": "HowToStep",
          position: s.stepNo,
          name: s.title,
          text: s.plainText,
          url: `${PAGE_URL}#adim-${s.stepNo}`,
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

export default function HowItWorksPage() {
  const IMG_DIR = "/img/nasil-calisiriz";

  const stepsData = [
    {
      stepNo: 1,
      label: "İlk temas",
      title: "İhtiyaç formu / ilk iletişim",
      plainText:
        "Etkinlik türü, tarih, lokasyon ve ihtiyaçlar paylaşılır. Danışman geri dönüş yapar ve süreç başlar.",
      imageSrc: `${IMG_DIR}/01-ilk-iletisim.webp`,
      imageAlt: "Sahneva ile ilk iletişim ve ihtiyaçların belirlenmesi",
    },
    {
      stepNo: 2,
      label: "Uzman görüşmesi",
      title: "Proje ihtiyaçları netleşir",
      plainText:
        "Bütçe, alan ölçüleri ve teknik gereksinimler netleştirilir; uygun çözüm taslağı hazırlanır.",
      imageSrc: `${IMG_DIR}/02-uzman-gorusmesi.webp`,
      imageAlt: "Danışmanla ihtiyaç analizi ve planlama",
    },
    {
      stepNo: 3,
      label: "48 saat sonra",
      title: "Teklif / öneri paketi",
      plainText:
        "Size özel teklif ve opsiyonlar sunulur, alternatif paketler ve revizyonlar yapılır.",
      imageSrc: `${IMG_DIR}/03-teklif.webp`,
      imageAlt: "Teklif ve opsiyonların hazırlanması",
    },
    {
      stepNo: 4,
      label: "Onay",
      title: "Rezervasyon ve planlama",
      plainText:
        "Onay sonrası ekipman ve ekip planlaması rezervasyona alınır; kurulum takvimi netleşir.",
      imageSrc: `${IMG_DIR}/04-onay-rezervasyon.webp`,
      imageAlt: "Onay sonrası rezervasyon ve ekip planlaması",
    },
    {
      stepNo: 5,
      label: "1 ay kala",
      title: "Keşif / teknik koordinasyon",
      plainText:
        "Saha erişimi, enerji ve zemin koşulları kontrol edilir; gerekiyorsa keşif yapılır.",
      imageSrc: `${IMG_DIR}/05-teknik-kesif.webp`,
      imageAlt: "Teknik keşif ve saha koordinasyonu",
    },
    {
      stepNo: 6,
      label: "24/48 saat önce",
      title: "Kurulum ve testler",
      plainText:
        "Etkinlikten 1-2 gün önce kurulum yapılır ve tüm sistemler test edilir.",
      imageSrc: `${IMG_DIR}/06-kurulum.webp`,
      imageAlt: "Sahada kurulum ve test süreci",
    },
    {
      stepNo: 7,
      label: "Büyük gün",
      title: "Etkinlik günü yönetimi",
      plainText:
        "Operasyon ekibi sahada süreci yönetir; yayın, görüntü ve ses akışı takip edilir.",
      imageSrc: `${IMG_DIR}/07-etkinlik-gunu.webp`,
      imageAlt: "Etkinlik günü operasyon ve teknik yönetim",
    },
    {
      stepNo: 8,
      label: "24/48 saat sonra",
      title: "Söküm ve temiz teslim",
      plainText:
        "Etkinlik sonrası söküm yapılır, ekipman toplanır ve alan düzenli şekilde teslim edilir.",
      imageSrc: `${IMG_DIR}/08-sokum.webp`,
      imageAlt: "Söküm ve ekipmanların güvenli şekilde toplanması",
    },
  ];

  const faqs = [
    {
      q: "Teklif ne kadar sürede hazırlanır?",
      a: "Genellikle aynı gün veya 24–48 saat içinde ihtiyaçlar netleştirildikten sonra teklif iletilir. Keşif gerektiren projelerde süre, saha planına göre değişebilir.",
    },
    {
      q: "Keşif yapmak zorunlu mu?",
      a: "Her işte zorunlu değildir. Ancak büyük truss kurulumları ve enerji altyapısı kritik projelerde keşif önerilir.",
    },
    {
      q: "Kurulum etkinlikten kaç saat önce yapılır?",
      a: "Proje büyüklüğüne göre 24–48 saat önce kurulum ve testler planlanır. Küçük kurulumlar aynı gün tamamlanabilir.",
    },
    {
      q: "Aynı anda birden fazla hizmet alabilir miyim?",
      a: "Evet. Sahne, truss, ses-ışık, çadır ve oturma düzeni gibi kalemleri tek projede paketleyebiliriz.",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      <JsonLd stepsData={stepsData} faqs={faqs} />
      <HowItWorksClient stepsData={stepsData} faqs={faqs} />
    </main>
  );
}
