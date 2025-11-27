import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import CorporateEvents from "@/components/CorporateEvents";
import ServicesTabs from "@/components/ServicesTabs";
import CriticalAssets from "@/components/CriticalAssets";
import ProjectsGallery from "@/components/ProjectsGallery";
import SeoArticles from "@/components/SeoArticles";
import ReviewBanner from "@/components/ReviewBanner";

/* NOT: Bu sayfa varsayılan olarak bir Server Component'tir.
  'use client' ifadesini bilerek kullanmıyoruz. 
  Böylece arama motorları içeriği JavaScript yüklenmeden de okuyabilir.
*/

export default function Home() {
  // Google için Yapısal Veri (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // Sektörünüze en uygun tip
    "name": "Sahneva",
    "image": "https://sahneva.com/img/logo.png",
    "description": "Profesyonel sahne, podyum, led ekran, ses ve ışık sistemleri kiralama hizmetleri. Kurumsal etkinlikleriniz için çözüm ortağınız.",
    "url": "https://sahneva.com",
    "telephone": "+905555555555", // Lütfen gerçek numaranızla güncelleyin
    "priceRange": "₺₺",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "İstanbul", // Tam adresinizi buraya yazabilirsiniz
      "addressLocality": "İstanbul",
      "addressRegion": "TR",
      "postalCode": "34000",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.0082, 
      "longitude": 28.9784
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/sahneva",
      "https://www.instagram.com/sahneva",
      "https://www.linkedin.com/company/sahneva"
    ],
    "areaServed": {
      "@type": "City",
      "name": "İstanbul"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Kiralama Hizmetleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Podyum Kiralama"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sahne Kiralama"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Led Ekran Kiralama"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ses ve Işık Sistemleri"
          }
        }
      ]
    }
  };

  return (
    <main>
      {/* JSON-LD Script'i:
        Bu script sunucu tarafında oluşturulur ve HTML kaynağına eklenir.
        Google botları sayfayı ziyaret ettiğinde bu veriyi %100 görür.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <StatsCounter />
      <CorporateEvents />
      <ServicesTabs />
      <CriticalAssets />
      <ProjectsGallery />
      <ReviewBanner />
      <SeoArticles />
    </main>
  );
}
