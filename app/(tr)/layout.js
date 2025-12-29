// app/(tr)/(site)/layout.jsx
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyVideoRailClient from "@/components/StickyVideoRail.client";

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
const LOGO_ID = `${BASE_SITE_URL}/#logo`;
const OG_IMAGE_URL = `${BASE_SITE_URL}/img/og/sahneva-og.webp`;
const LOGO_URL = `${BASE_SITE_URL}/img/logo.png`;

/* ================== JSON-LD: GLOBAL GRAPH ================== */
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* ---- Logo ImageObject ---- */
    {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
    },

    /* ---- Organization ---- */
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Sahneva Organizasyon",
      url: BASE_SITE_URL,
      logo: { "@id": LOGO_ID },
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

    /* ---- Editor Organization ---- */
    {
      "@type": "Organization",
      "@id": EDITOR_ORGANIZATION_ID,
      name: "Sahneva Editör",
      url: BASE_SITE_URL,
      parentOrganization: { "@id": ORGANIZATION_ID },
    },

    /* ---- LocalBusiness ---- */
    {
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: "Sahneva Organizasyon",
      url: BASE_SITE_URL,
      image: OG_IMAGE_URL,
      logo: { "@id": LOGO_ID },
      telephone: "+905453048671",
      priceRange: "₺₺₺",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.0961692,
        longitude: 28.9792127,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Anadolu Caddesi No:61A, Hamidiye Mahallesi",
        addressLocality: "İstanbul",
        addressRegion: "İstanbul",
        postalCode: "34400",
        addressCountry: "TR",
      },
      openingHours: "Mo-Su 00:00-23:59",
      areaServed: "TR",
      parentOrganization: { "@id": ORGANIZATION_ID },
      sameAs: [
        "https://www.instagram.com/sahnevaorganizasyon",
        "https://www.youtube.com/@sahneva",
      ],
    },

    /* ---- WebSite ---- */
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
        url: OG_IMAGE_URL,
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
    images: [OG_IMAGE_URL],
  },
  alternates: {
    canonical: buildCanonical("/"),
    languages: buildAlternateLanguages(),
  },
};

export default function TurkishLayout({ children }) {
  return (
    <>
      <Script
        id="global-ld-json"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: globalJsonLdSafe }}
      />
      <div className="min-h-screen bg-black text-slate-100 flex flex-col">
        <header
          id="_main_header"
          aria-label="Sahneva site başlığı ve ana gezinme"
          className="w-full relative z-50"
        >
          <Navbar />
        </header>

        <main
          id="_main_content"
          aria-label="Sahneva ana içerik"
          tabIndex={-1}
          className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
        >
          <div className="overflow-x-hidden">{children}</div>
        </main>

        <Footer
          id="_main_footer"
          ariaLabel="Sahneva site altbilgi"
          descriptionId="_main_footer_desc"
        />
        <StickyVideoRailClient />
      </div>
    </>
  );
}
