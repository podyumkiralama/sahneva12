import { BASE_SITE_URL, ORGANIZATION_ID } from "@/lib/seo/schemaIds";

const SITE_URL = BASE_SITE_URL;
const DEFAULT_PRICE_VALID_UNTIL = "2025-12-31";
const FALLBACK_IMAGE = `${SITE_URL}/img/og/sahneva-og.webp`;

const toAbsoluteUrl = (url) => {
  if (!url) {
    return FALLBACK_IMAGE;
  }
  if (url.startsWith("http")) {
    return url;
  }
  return `${SITE_URL}${url}`;
};

const offerComplianceExtras = (priceCurrency) => ({
  shippingDetails: {
    "@type": "OfferShippingDetails",
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "TR",
    },
    shippingRate: {
      "@type": "MonetaryAmount",
      value: 0,
      currency: priceCurrency,
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 2,
        unitCode: "d",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 2,
        unitCode: "d",
      },
    },
  },

  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "TR",
    returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
  },
});


export const serviceProducts = [
  {
    slug: "/sahne-kiralama",
    locale: "tr-TR",
    serviceName: "Sahne Kiralama Hizmeti",
    serviceDescription:
      "Profesyonel sahne kiralama. Modüler podyum panelleri, truss sistemleri ve ses-ışık entegrasyonu ile Türkiye genelinde kurulum.",
    productCategory: "EventService",
    serviceImage: "/img/hizmet-sahne.webp",
    priceCurrency: "TRY",
    products: [
      {
        sku: "sahne-standart",
        name: "Standart Sahne Paketi",
        description:
          "24 m² modüler sahne, U truss çatısı, ışık ve ses sistemi ile lansman ve konferanslara hazır kurulum.",
        highlights: [
          "12 × 2×1 m podyum panel",
          "U şeklinde 12 m truss",
          "Dijital mikser ve hoparlör",
          "Kurulum + söküm",
        ],
        image: "/img/sahne/2.webp",
        price: 45000,
      },
      {
        sku: "sahne-konser",
        name: "Konser Sahnesi Paketi",
        description:
          "8×6 m sahne, line-array ses, LED ekran ve profesyonel ışık sistemi ile konser düzeyi altyapı.",
        highlights: [
          "24 × 2×1 m panel",
          "Line-array PA",
          "Hareketli ışıklar",
          "Operasyon ekibi",
        ],
        image: "/img/sahne/6.webp",
        price: 95000,
      },
    ],
  },
  {
    slug: "/podyum-kiralama",
    locale: "tr-TR",
    serviceName: "Podyum Kiralama Hizmeti",
    serviceDescription:
      "Modüler podyum sistemleri, kaymaz kaplama ve merdiven aksesuarları ile etkinlik platformları.",
    productCategory: "EventService",
    serviceImage: "/img/hizmet-podyum.webp",
    priceCurrency: "TRY",
    baseOffers: [
      {
        name: "Podyum Kiralama (m²)",
        description: "Etkinlik podyumu kurulumunda m² başına başlangıç fiyatı.",
        price: 250,
        unitCode: "MTK",
      },
    ],
    products: [
      {
        sku: "podyum-orta",
        name: "Orta Podyum Paketi",
        description:
          "4×6 m podyum, kaymaz kaplama ve merdiven çözümü ile davet ve sahne kullanımına hazır.",
        highlights: [
          "12 × 1×2 m panel",
          "60 cm yükseklik",
          "Kaymaz kaplama",
          "Merdiven + korkuluk",
        ],
        image: "/img/podyum/1.webp",
        price: 18000,
      },
      {
        sku: "podyum-pro",
        name: "Pro Podyum Paketi",
        description:
          "6×8 m podyum, rampa ve brandalama seçenekleri ile büyük sahne kurulumları.",
        highlights: [
          "24 × 1×2 m panel",
          "Rampa + korkuluk",
          "Kaymaz yüzey",
          "Kurulum ve söküm",
        ],
        image: "/img/podyum/3.webp",
        price: 32000,
      },
    ],
  },
  {
    slug: "/masa-sandalye-kiralama",
    locale: "tr-TR",
    serviceName: "Masa Sandalye Kiralama Hizmeti",
    serviceDescription:
      "Davet ve toplantılar için masa, sandalye, kılıf ve planlama çözümleri.",
    productCategory: "EventService",
    serviceImage: "/img/hizmet-masa.webp",
    priceCurrency: "TRY",
    baseOffers: [
      {
        name: "Sandalye Kiralama (günlük)",
        description:
          "Standart etkinlik sandalyesi günlük kiralama başlangıç fiyatı.",
        price: 200,
        unitCode: "DAY",
      },
      {
        name: "Masa Kiralama (günlük)",
        description:
          "Yuvarlak veya dikdörtgen masa günlük kiralama başlangıç fiyatı.",
        price: 800,
        unitCode: "DAY",
      },
    ],
    products: [
      {
        sku: "masa-davet",
        name: "Davet Masa Sandalye Seti",
        description:
          "100 kişilik yuvarlak masa ve Napolyon sandalye paketi, tekstil ve yerleşim dahil.",
        highlights: [
          "10 × yuvarlak masa",
          "100 × Napolyon sandalye",
          "Keten örtü ve runner",
          "Teslimat + yerleşim",
        ],
        image: "/img/sandalye/sandalye-masa.webp",
        price: 9000,
      },
      {
        sku: "masa-konferans",
        name: "Konferans Seti",
        description:
          "Dikdörtgen masalar, konferans sandalyeleri ve numaralandırma desteği ile toplantı düzeni.",
        highlights: [
          "10 × konferans masası",
          "60 × konferans sandalyesi",
          "Oturma planı",
          "Kurulum ve toplama",
        ],
        image: "/img/sandalye/1.webp",
        price: 14500,
      },
    ],
  },
  {
    slug: "/led-ekran-kiralama",
    locale: "tr-TR",
    serviceName: "LED Ekran Kiralama Hizmeti",
    serviceDescription:
      "İç/dış mekan LED ekran, video wall ve kontrol sistemleri ile yüksek çözünürlüklü görüntü çözümleri.",
    productCategory: "EventService",
    serviceImage: "/img/hizmet-led-ekran.webp",
    priceCurrency: "TRY",
    baseOffers: [
      {
        name: "LED Ekran Kiralama (günlük)",
        description:
          "Günlük LED ekran kurulumu ve teknik destek başlangıç fiyatı.",
        price: 1700,
        unitCode: "DAY",
      },
    ],
    products: [
      {
        sku: "led-ic",
        name: "İç Mekan LED Ekran Paketi",
        description: "P2.6 iç mekan LED ekran, medya sunucusu ve operatör desteği.",
        highlights: [
          "P2.6 piksel",
          "800+ nit parlaklık",
          "Novastar kontrol",
          "Operatör dahil",
        ],
        image: "/img/led/1.webp",
        price: 28000,
      },
      {
        sku: "led-dis",
        name: "Dış Mekan LED Ekran Paketi",
        description:
          "P4 dış mekan LED ekran, IP65 koruma ve ground stack kurulum.",
        highlights: [
          "P4 piksel",
          "5000+ nit parlaklık",
          "IP65 koruma",
          "Ground stack kurulum",
        ],
        image: "/img/led/3.webp",
        price: 42000,
      },
    ],
  },
  {
    slug: "/ses-isik-sistemleri",
    locale: "tr-TR",
    serviceName: "Ses ve Işık Sistemleri Kiralama",
    serviceDescription:
      "Konser, konferans ve etkinlikler için ses, ışık ve kontrol ekipmanları.",
    productCategory: "EventService",
    serviceImage: "/img/hizmet-sesisik.webp",
    priceCurrency: "TRY",
    products: [
      {
        sku: "ses-konser",
        name: "Konser Ses Paketi",
        description:
          "Line-array hoparlörler, subwoofer ve dijital miksaj ile konser düzeyi ses.",
        highlights: ["Line-array PA", "Subwoofer seti", "Monitör miks", "Teknik ekip"],
        image: "/img/ses-isik/ses-sistemi.webp",
        price: 36000,
      },
      {
        sku: "isik-sahne",
        name: "Sahne Işık Paketi",
        description:
          "Hareketli başlıklar, wash ışıklar ve DMX kontrol ile sahne aydınlatması.",
        highlights: ["8 hareketli başlık", "LED wash", "DMX kontrol", "Kurulum + programlama"],
        image: "/img/ses-isik/isik-sistemi.webp",
        price: 54000,
      },
    ],
  },
  {
    slug: "/cadir-kiralama",
    locale: "tr-TR",
    serviceName: "Çadır Kiralama Hizmeti",
    serviceDescription:
      "Pagoda, şeffaf dome ve endüstriyel çadır çözümleri ile anahtar teslim kurulum.",
    productCategory: "EventService",
    serviceImage: "/img/hizmet-cadir.webp",
    priceCurrency: "TRY",
    baseOffers: [
      {
        name: "Çadır Kiralama (m²)",
        description:
          "Pagoda ve endüstriyel çadır kurulumlarında m² başına başlangıç fiyatı.",
        price: 300,
        unitCode: "MTK",
      },
    ],
    products: [
      {
        sku: "cadir-pagoda",
        name: "Pagoda Çadır Paketi",
        description:
          "5×5 m pagoda çadır, yan branda ve zemin kaplama opsiyonları ile davetlere uygun.",
        highlights: [
          "Alüminyum konstrüksiyon",
          "Yan branda seçenekleri",
          "Zemin kaplama",
          "Kurulum + söküm",
        ],
        image: "/img/cadir/pagoda.webp",
        price: 18500,
      },
      {
        sku: "cadir-dome",
        name: "Şeffaf Dome Çadır Paketi",
        description:
          "12 m şeffaf dome çadır, LED aydınlatma ve iklimlendirme entegrasyonu.",
        highlights: ["Şeffaf kubbe", "LED dekorasyon", "İklimlendirme", "Teknik operasyon"],
        image: "/img/cadir/seffaf.webp",
        price: 52000,
      },
    ],
  },
  {
    slug: "/kurumsal-organizasyon",
    locale: "tr-TR",
    serviceName: "Kurumsal Organizasyon Yönetimi",
    serviceDescription:
      "Lansman, bayi toplantısı ve gala geceleri için uçtan uca organizasyon yönetimi.",
    productCategory: "EventService",
    serviceImage: "/img/kurumsal/hero.webp",
    priceCurrency: "TRY",
    products: [
      {
        sku: "kurumsal-lansman",
        name: "Lansman Organizasyon Paketi",
        description:
          "Sahne, LED ekran ve içerik prodüksiyonu ile ürün lansmanı planlama ve uygulaması.",
        highlights: ["Konsept tasarım", "Sahne & truss", "Görsel içerik", "Operasyon ekibi"],
        image: "/img/kurumsal/lansman.webp",
        price: 82000,
      },
      {
        sku: "kurumsal-bayi",
        name: "Bayi Toplantısı Paketi",
        description:
          "Salon planlama, simultane çeviri ve kayıt altyapısı ile bayi buluşması.",
        highlights: [
          "Toplantı dekoru",
          "Simultane çeviri",
          "Kayıt & streaming",
          "Yeme-içme koordinasyonu",
        ],
        image: "/img/kurumsal/bayi-toplantisi.webp",
        price: 68000,
      },
    ],
  },
];

export function buildServiceProductSchema({ slug, locale = "tr-TR" }) {
  const entry = serviceProducts.find(
    (service) => service.slug === slug && service.locale === locale,
  );

  if (!entry) {
    return { service: null, products: [] };
  }

  const pageUrl = `${SITE_URL}${entry.slug}`;
  const serviceId = `${pageUrl}#service`;

  const productNodes = entry.products.map((product, index) => {
    const productId = `${pageUrl}#${product.sku}`;
    const offerId = `${productId}-offer`;
    const priceCurrency = product.priceCurrency ?? entry.priceCurrency ?? "TRY";
    const position = index + 1;

    const node = {
      "@type": "Product",
      "@id": productId,
      name: product.name,
      description: product.description,
      sku: product.sku,
      category: entry.productCategory,
      image: toAbsoluteUrl(product.image ?? entry.serviceImage),
      url: pageUrl,

      // ✅ brand düzeltildi
      brand: {
        "@type": "Brand",
        name: "Sahneva",
      },

      offers: {
        "@type": "Offer",
        "@id": offerId,
        url: `${pageUrl}#teklif`,
        availability: "https://schema.org/InStock",
        price: Number(product.price ?? 0),
        priceCurrency,
        priceValidUntil:
          product.priceValidUntil ??
          entry.priceValidUntil ??
          DEFAULT_PRICE_VALID_UNTIL,
        businessFunction: "https://schema.org/ProvideService",
        eligibleRegion: { "@type": "Country", name: "Türkiye" },
        seller: { "@id": ORGANIZATION_ID },
        itemCondition: "https://schema.org/NewCondition",

        // ✅ shippingDetails + return policy eklendi
        ...offerComplianceExtras(priceCurrency),
      },

      additionalProperty: (product.highlights || []).map((item) => ({
        "@type": "PropertyValue",
        name: "Öne Çıkan Özellik",
        value: item,
      })),

      isRelatedTo: { "@id": serviceId },
    };

    return { node, position };
  });

  const prices = productNodes
    .map(({ node }) => Number(node.offers.price))
    .filter((value) => Number.isFinite(value));

  const aggregateOffer =
    prices.length > 0
      ? {
          "@type": "AggregateOffer",
          priceCurrency: entry.priceCurrency ?? "TRY",
          lowPrice: Math.min(...prices),
          highPrice: Math.max(...prices),
          offerCount: prices.length,
          availability: "https://schema.org/InStock",
          url: `${pageUrl}#teklif`,
        }
      : undefined;

  const baseOfferEntries = entry.baseOffers
    ? entry.baseOffers
    : entry.baseOffer
      ? [entry.baseOffer]
      : [];

  const baseOfferNodes = baseOfferEntries
    .map((offer, index) => {
      const priceCurrency = offer.priceCurrency ?? entry.priceCurrency ?? "TRY";
      const offerId = `${serviceId}-base-offer-${index + 1}`;
      const price = Number(offer.price ?? 0);
      const unitCode =
        offer.unitCode === "DAY" ? undefined : offer.unitCode;
      const unitText =
        offer.unitCode === "DAY" ? "DAY" : offer.unitText;
      const referenceQuantity =
        unitCode || unitText
          ? {
              "@type": "QuantitativeValue",
              value: 1,
              ...(unitCode ? { unitCode } : {}),
              ...(unitText ? { unitText } : {}),
            }
          : undefined;

      return {
        "@type": "Offer",
        "@id": offerId,
        name: offer.name,
        description: offer.description ?? entry.serviceDescription,
        url: `${pageUrl}#fiyatlar`,
        availability: "https://schema.org/InStock",
        price,
        priceCurrency,
        priceValidUntil:
          offer.priceValidUntil ??
          entry.priceValidUntil ??
          DEFAULT_PRICE_VALID_UNTIL,
        businessFunction: "https://schema.org/ProvideService",
        eligibleRegion: { "@type": "Country", name: "Türkiye" },
        seller: { "@id": ORGANIZATION_ID },
        itemCondition: "https://schema.org/NewCondition",

        // ✅ shippingDetails + return policy eklendi (tam temizlik için)
        ...offerComplianceExtras(priceCurrency),

        itemOffered: {
          "@type": "Service",
          "@id": serviceId,
          name: entry.serviceName,
        },
        ...(offer.unitCode || offer.unitText
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceCurrency,
                ...(unitCode ? { unitCode } : {}),
                ...(unitText ? { unitText } : {}),
                ...(referenceQuantity ? { referenceQuantity } : {}),
              },
            }
          : {}),
      };
    })
    .filter(Boolean);

  const serviceNode = {
    "@type": "Service",
    "@id": serviceId,
    name: entry.serviceName,
    description: entry.serviceDescription,
    url: pageUrl,
    serviceType: entry.productCategory,
    areaServed: { "@type": "Country", name: "Türkiye" },
    provider: { "@id": ORGANIZATION_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: entry.serviceName,
      itemListElement: productNodes.map(({ node, position }) => ({
        "@type": "ListItem",
        position,
        item: { "@id": node.offers?.["@id"] ?? node["@id"] },
      })),
    },
  };

  const offers = [];
  if (baseOfferNodes.length > 0) {
    offers.push(...baseOfferNodes);
  }
  if (aggregateOffer) {
    offers.push(aggregateOffer);
  }

  if (offers.length === 1) {
    serviceNode.offers = offers[0];
  } else if (offers.length > 1) {
    serviceNode.offers = offers;
  }

  return {
    service: serviceNode,
    products: productNodes.map(({ node }) => node),
  };
}
