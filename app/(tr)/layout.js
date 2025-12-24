// app/(tr)/(site)/layout.jsx
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import {
  HOME_PAGE_TITLE,
  buildAlternateLanguages,
  buildCanonical,
} from "@/lib/seo/seoConfig";
import {
  BASE_SITE_URL,
  LOCAL_BUSINESS_ID,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/lib/seo/schemaIds";

const content = LOCALE_CONTENT.tr;

const EDITOR_ORGANIZATION_ID = `${BASE_SITE_URL}/#editor`;

/* ================== JSON-LD: GLOBAL GRAPH ================== */
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Sahneva Organizasyon",
      url: BASE_SITE_URL,
      logo: `${BASE_SITE_URL}/img/logo.png`,
      description:
        "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri sunan profesyonel etkinlik prodüksiyon markası.",
      sameAs: [
        "https://www.instagram.com/sahnevaorganizasyon",
        "https://www.youtube.com/@sahneva",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+905453048671",
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: ["tr", "en", "ar"],
      },
    },

    {
      "@type": "Organization",
      "@id": EDITOR_ORGANIZATION_ID,
      name: "Sahneva Editör",
      url: BASE_SITE_URL,
      parentOrganization: { "@id": ORGANIZATION_ID },
    },

    {
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: "Sahneva Organizasyon",
      url: BASE_SITE_URL,
      image: `${BASE_SITE_URL}/img/og/sahneva-og.webp`,
      logo: `${BASE_SITE_URL}/img/logo.png`,
      telephone: "+905453048671",
      priceRange: "₺₺₺",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Anadolu Caddesi No:61A, Hamidiye Mahallesi",
        addressLocality: "İstanbul",
        addressRegion: "İstanbul",
        postalCode: "34400",
        addressCountry: "TR",
      },
      areaServed: "TR",
      parentOrganization: { "@id": ORGANIZATION_ID },
      sameAs: [
        "https://www.instagram.com/sahnevaorganizasyon",
        "https://www.youtube.com/@sahneva",
      ],
    },

    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: BASE_SITE_URL,
      name: "Sahneva Organizasyon",
      description:
        "Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri için profesyonel etkinlik prodüksiyon çözümleri.",
      inLanguage: "tr-TR",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

const globalJsonLdSafe = JSON.stringify(globalJsonLd).replace(/</g, "\\u003c");

export const metadata = {
  title: {
    default: HOME_PAGE_TITLE,
    template: `%s | Sahneva`,
  },
  description: content.meta.description,
  openGraph: {
    title: HOME_PAGE_TITLE,
    description: content.meta.description,
    url: buildCanonical("/"),
    siteName: "Sahneva Organizasyon",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: `${BASE_SITE_URL}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_PAGE_TITLE,
    description: content.meta.description,
    images: [`${BASE_SITE_URL}/img/og/sahneva-og.webp`],
  },
  alternates: {
    canonical: buildCanonical("/"),
    languages: buildAlternateLanguages(),
  },
};

export default function TurkishLayout({ children }) {
  return (
    <>
      <script
        id="global-ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: globalJsonLdSafe }}
      />
      {children}
    </>
  );
}
