import Image from "next/image";

import heroImg from "@/public/img/hero-bg.webp";
import CorporateEvents from "@/components/CorporateEvents";
import ServicesTabs from "@/components/ServicesTabs";
import ProjectsGallery from "@/components/ProjectsGallery";
import Faq from "@/components/Faq";

import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import { FAQ_ITEMS_EN } from "@/lib/faqData";

const { home } = LOCALE_CONTENT.en;

const HERO_IMAGE_ALT =
  "Stage with LED wall, truss roof and lighting setup by Sahneva event technology team";

const HERO_FEATURES = [
  {
    icon: "⭐",
    title: "4.9/5 Rating",
    description: "500+ Happy Clients",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: "⚡",
    title: "Same-Day Setups",
    description: "Rapid Deployment",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: "👑",
    title: "Premium Gear",
    description: "Guaranteed Quality",
    color: "from-purple-400 to-pink-400",
  },
];

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com"
).replace(/\/$/, "");
const ORGANIZATION_ID = `${SITE_URL}/#org`;

const WHY_SAHNEVA_FEATURES = [
  {
    icon: "⭐",
    title: "Outstanding Client Satisfaction",
    desc: "We consistently exceed 98% satisfaction thanks to transparent planning, dependable crews and on-site support across every event scale.",
    stat: "98% Satisfaction",
  },
  {
    icon: "⚡",
    title: "Rapid Deployment Nationwide",
    desc: "Professional stage, LED wall and AV installations completed within the same day anywhere in Türkiye.",
    stat: "2–6h Setup",
  },
  {
    icon: "🖥️",
    title: "Broadcast-Grade LED Technology",
    desc: "Indoor/outdoor LED cabinets with P2–P6 pixel pitch, HDR processing and rugged touring frames.",
    stat: "P2–P6",
  },
  {
    icon: "👷",
    title: "Expert Technical Crew",
    desc: "Seasoned engineers covering staging, sound, lighting, rigging and LED operation for seamless show control.",
    stat: "15+ Specialists",
  },
  {
    icon: "💰",
    title: "Optimised Budgets",
    desc: "Competitive pricing with transparent scopes, flexible packages and clear deliverables tailored to your brief.",
    stat: "30% Savings",
  },
  {
    icon: "🏙️",
    title: "Nationwide Coverage",
    desc: "Full logistics and installation capacity across 81 provinces including Istanbul, Ankara, Izmir and resort regions.",
    stat: "81 Cities",
  },
];

const SERVICES_EN = [
  {
    id: "stage",
    title: "Stage Engineering",
    icon: "🎪",
    description:
      "Modular stages, runways and risers tailored to load calculations, audience capacity and venue conditions.",
    image: "/img/hizmet-sahne.webp",
    features: [
      "Modular decks (1x1m, 1x2m, 2x2m) with adjustable heights",
      "Aluminium truss roofs, scaff towers and handrails",
      "Safety barriers, ramps and weather protection",
      "Professional crew for installation and dismantling",
      "Heavy-duty platforms for concerts and launches",
    ],
    href: "/en/stage-rental",
  },
  {
    id: "podium",
    title: "Podium & Catwalks",
    icon: "👑",
    description:
      "Elegant podiums, catwalks and presentation stages for award nights, brand launches and ceremonies.",
    image: "/img/hizmet-podyum.webp",
    features: [
      "Custom podium heights and shapes",
      "Protocol desks, lecterns and backdrop options",
      "Carpet, vinyl or wooden finishes",
      "Fast assembly with compact transport",
      "Wide range of colours and accessories",
    ],
    href: "/en/stage-rental",
  },
  {
    id: "led",
    title: "LED Wall Rentals",
    icon: "🖥️",
    description:
      "High-resolution indoor/outdoor LED walls with content playback, processors and rigging systems.",
    image: "/img/galeri/led-ekran-kiralama-1.webp",
    features: [
      "P2–P6 pixel pitch options",
      "IP65 weatherproof outdoor cabinets",
      "4500+ nit brightness for daylight visibility",
      "Novastar/Brompton processing and redundancy",
      "Complete installation and operator support",
    ],
    href: "/en/services#led",
  },
  {
    id: "av",
    title: "Sound, Lighting & Truss",
    icon: "🎭",
    description:
      "Concert-grade PA systems, lighting rigs and truss structures operated by certified engineers.",
    image: "/img/ses-isik/ses-sistemi.webp",
    features: [
      "Line-array systems with digital mixing consoles",
      "Wireless microphone and monitor packages",
      "Moving-head, wash and effect lighting",
      "DMX programming and show control",
      "Rigging, hoists and power distribution",
    ],
    href: "/en/sound-light-rental",
  },
  {
    id: "tents",
    title: "Event Tents",
    icon: "⛺",
    description:
      "Professional marquees and pagoda tents with flooring, climate control and décor options.",
    image: "/img/galeri/cadir-kiralama-1.webp",
    features: [
      "3x3m, 3x6m, 6x6m tent structures",
      "Waterproof and UV-resistant fabrics",
      "Sidewalls, glass panels and flooring",
      "Ambient lighting and branding elements",
      "Full logistics, installation and dismantle",
    ],
    href: "/en/tent-rental",
  },
  {
    id: "seating",
    title: "Seating & Furniture",
    icon: "🪑",
    description:
      "Banquet tables, conference seating and lounge setups with delivery, styling and collection included.",
    image: "/img/hizmet-masa.webp",
    features: [
      "Round, rectangular and cocktail tables",
      "Comfortable chairs, stools and VIP seating",
      "Wedding and gala décor packages",
      "Table linens, covers and accessories",
      "End-to-end logistics and on-site styling",
    ],
    href: "/en/table-chair-rental",
  },
];

const SERVICES_DICTIONARY_EN = {
  tablistLabel: "Service tabs",
  featuresHeading: "Service Highlights",
  ctaLabel: "View details & request pricing",
  ctaTitle: "Open the detailed service scope and request a tailored quote",
  imageBadgeLabel: "Professional Solution",
  imageAlt: "{{title}} service by Sahneva",
  overlayButtonTitle: "Open {{title}} details",
  overlayButtonAria: "Open the {{title}} service detail page",
};

const PROJECT_GALLERIES_EN = {
  "LED Wall Installations": {
    imagePattern: "/img/galeri/led-ekran-kiralama-{{index}}.webp",
    imageCount: 36,
    description: "Immersive LED surfaces for conferences, arenas and outdoor brand activations.",
    stats: "50+ Corporate Shows",
    icon: "🖥️",
  },
  "Event Tent Solutions": {
    imagePattern: "/img/galeri/cadir-kiralama-{{index}}.webp",
    imageCount: 19,
    description: "Weatherproof marquees, pagodas and hospitality structures for outdoor gatherings.",
    stats: "100+ Outdoor Events",
    icon: "⛺",
  },
  "Podium & Stage Builds": {
    imagePattern: "/img/galeri/podyum-kiralama-{{index}}.webp",
    imageCount: 36,
    description: "Custom podiums, risers and catwalks supporting product launches and ceremonies.",
    stats: "200+ Installations",
    icon: "👑",
  },
};

const PROJECTS_DICTIONARY_EN = {
  exploreAria: "Open gallery — {{title}} ({{count}} projects)",
  exploreHiddenLabel: "Open gallery — {{title}} ({{count}} projects)",
  hoverCta: "View gallery",
  cardAlt: "{{title}} by Sahneva",
  seeAllLabel: "View all",
  seeAllSr: " — {{title}} ({{count}} projects)",
  badgeLabel: "Reference",
  dialogAria: "{{title}} project gallery",
  closeLabel: "Close gallery",
  prevLabel: "‹ Previous",
  prevSr: "Previous project",
  nextLabel: "Next ›",
  nextSr: "Next project",
  mobilePrevLabel: "‹ Previous",
  mobileNextLabel: "Next ›",
  counterLabel: "{{index}} / {{total}}",
  liveMessage: "{{title}} gallery opened with {{count}} projects",
  lightboxAlt: "{{title}} — reference project {{index}}",
  regionTitleSr: "Project gallery listings and detailed content",
};

const FAQ_DICTIONARY_EN = {
  sectionTitle: "Frequently Asked Questions",
  regionTitleSr: "Frequently asked questions content region",
  cta: {
    title: "🌟 Need a personalised answer?",
    description: "Our technical producers are ready to help you design the perfect event solution.",
    primary: {
      label: "Browse all FAQs",
      href: "/en/faq",
      srLabel: "FAQ page",
    },
    secondary: {
      label: "Contact our team",
      href: "/en/contact",
      srLabel: "Contact page",
    },
  },
  quickContact: {
    title: "Quick contact channels",
    navLabel: "Quick contact options",
    items: [
      {
        href: "tel:+905453048671",
        icon: "📞",
        label: "Phone",
        description: "+90 545 304 8671",
        className:
          "inline-flex items-center gap-3 bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-900 font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 min-h-[48px] text-sm",
      },
      {
        href: "https://wa.me/905453048671?text=Hello%2C+I'm+reaching+out+from+your+website.+Could+you+share+a+detailed+quote+for+event+technology+support%3F",
        icon: "💬",
        label: "WhatsApp",
        description: "Instant messaging",
        target: "_blank",
        rel: "noopener noreferrer",
        srHint: " (opens in a new tab)",
        className:
          "inline-flex items-center gap-3 bg-green-100 hover:bg-green-200 border border-green-300 text-green-900 font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 min-h-[48px] text-sm",
      },
      {
        href: "mailto:info@sahneva.com",
        icon: "✉️",
        label: "Email",
        description: "info@sahneva.com",
        className:
          "inline-flex items-center gap-3 bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-900 font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 min-h-[48px] text-sm",
      },
    ],
    stats: ["24/7 Support", "Replies within 5 minutes"],
  },
  newTabHint: " (opens in a new tab)",
};

const CORPORATE_EVENTS_CARDS_EN = [
  {
    slug: "launch",
    title: "Product Launches",
    img: "/img/kurumsal/lansman.webp",
    alt: "Stage, LED wall and lighting design for a corporate product launch by Sahneva",
    text: "LED wall storytelling, stage scenography, lighting design and live broadcast workflows for unforgettable reveals.",
    icon: "🚀",
    gradient: "from-purple-500/10 to-blue-500/10",
    color: "text-purple-700",
  },
  {
    slug: "conference",
    title: "Conferences & Summits",
    img: "/img/kurumsal/konferans.webp",
    alt: "Conference stage with projection, sound and lighting systems provided by Sahneva",
    text: "Multi-mic setups, interpretation booths, presentation management and recording services for flawless programs.",
    icon: "🎤",
    gradient: "from-green-500/10 to-emerald-500/10",
    color: "text-green-700",
  },
  {
    slug: "dealer",
    title: "Dealer & Internal Events",
    img: "/img/kurumsal/bayi-toplantisi.webp",
    alt: "Corporate dealer meeting with stage décor, LED visuals and audio support by Sahneva",
    text: "Brand-aligned stage décor, multi-screen playback, video & audio control and dedicated technical crews.",
    icon: "🤝",
    gradient: "from-orange-500/10 to-red-500/10",
    color: "text-orange-700",
  },
];

const CORPORATE_EVENTS_ADVANTAGES_EN = [
  {
    icon: "⚡",
    label: "Lightning-Fast Build",
    desc: "Same-day installation by experienced crews",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    icon: "🎛",
    label: "Modern Equipment",
    desc: "Latest-generation audio, lighting and LED inventory",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    icon: "👷",
    label: "Experienced Crew",
    desc: "Certified engineers overseeing every discipline",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    icon: "🛡",
    label: "Safety & Backup",
    desc: "Redundant power and contingency planning",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
];

const CORPORATE_EVENTS_DICTIONARY_EN = {
  sectionTitleSr: "Corporate event solutions showcase",
  highlightPill: "Why Sahneva?",
  highlightTitlePrefix: "Our edge in",
  highlightTitleAccent: "corporate production",
  advantagesAriaLabel: "Our advantages",
  cardCtaLabel: "Request quote",
  cardCtaHref: "/en/contact",
  cardCtaAria: "Request a quote for {{title}}",
  cardBadgeLabel: "Turnkey solution",
  bannerTitlePrefix: "Your corporate events deserve",
  bannerTitleHighlight: "turnkey production",
  bannerTitleSuffix: "support",
  bannerDescription:
    "Tell us about your goals and we will provide staging, LED visuals, sound-lighting and broadcast workflows ready for rehearsals the same day.",
  phoneCtaLabel: "Call our team",
  phoneCtaHref: "tel:+905453048671",
  phoneCtaAria: "Call Sahneva for immediate technical consultation: +90 545 304 86 71",
  whatsappCtaLabel: "Chat on WhatsApp",
  whatsappCtaHref:
    "https://wa.me/905453048671?text=Hello%2C+I'm+planning+a+corporate+event.+Can+we+discuss+staging+and+technical+production+options%3F",
  whatsappCtaAria: "Send a WhatsApp message",
  whatsappSrHint: "(opens in a new tab)",
  supportStats: ["24/7 technical standby", "Replies within 15 minutes"],
};

export const metadata = {
  title: "Stage, LED Wall, Sound & Lighting Rentals Across Türkiye",
  description:
    "Sahneva delivers stages, LED walls, sound and lighting systems with turnkey installation for corporate events, concerts and public activations across Türkiye.",
  alternates: {
    canonical: "https://www.sahneva.com/en",
    languages: {
      "tr-TR": "https://www.sahneva.com/",
      ar: "https://www.sahneva.com/ar",
      en: "https://www.sahneva.com/en",
      "x-default": "https://www.sahneva.com/",
    },
  },
};

function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.sahneva.com/en#webpage",
        url: "https://www.sahneva.com/en",
        name: "Stage, LED Wall, Sound & Lighting Rentals | Nationwide Türkiye | Sahneva",
        inLanguage: "en-US",
        about: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "OfferCatalog",
        "@id": "https://www.sahneva.com/en#catalog",
        name: "Event Technology Services",
        url: "https://www.sahneva.com/en",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Stage Rentals", description: "Stage and podium engineering services" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: 10000,
              maxPrice: 200000,
            },
            availability: "https://schema.org/InStock",
            areaServed: "TR",
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "LED Wall Rentals" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: 1700,
              priceCurrency: "TRY",
              unitText: "per day",
            },
            areaServed: "TR",
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sound & Lighting Systems" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: 10000,
              maxPrice: 300000,
            },
            areaServed: "TR",
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Podium Rentals" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: 250,
              maxPrice: 100000,
            },
            areaServed: "TR",
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Event Tents" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: 6000,
              maxPrice: 800000,
            },
            areaServed: "TR",
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Chair Rentals" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: 200,
              priceCurrency: "TRY",
              unitText: "per unit",
            },
            areaServed: "TR",
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Table Rentals" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: 1000,
              maxPrice: 2000,
            },
            areaServed: "TR",
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Istanbul Logistics" },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 7000,
              priceCurrency: "TRY",
            },
            areaServed: "TR",
            seller: { "@id": ORGANIZATION_ID },
          },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Event Production" }, areaServed: "TR", seller: { "@id": ORGANIZATION_ID } },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.sahneva.com/en#service",
        name: "Event Technology Rentals",
        description:
          "Turnkey stage, LED wall, sound, lighting and tent solutions with expert crew support across Türkiye.",
        url: "https://www.sahneva.com/en",
        areaServed: { "@type": "Country", name: "TR" },
        provider: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "ImageObject",
        "@id": "https://www.sahneva.com/en#og",
        contentUrl: "https://www.sahneva.com/og/sahneva-home.jpg",
        width: 1200,
        height: 630,
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.sahneva.com/en#faq",
        url: "https://www.sahneva.com/en",
        mainEntity: FAQ_ITEMS_EN.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function HeroBackgroundImage({ alt = HERO_IMAGE_ALT, ariaHidden = false }) {
  return (
    <Image
      src={heroImg}
      alt={ariaHidden ? "" : alt}
      fill
      priority
      fetchPriority="high"
      sizes="100vw"
      placeholder="blur"
      quality={70}
      className="absolute inset-0 h-full w-full object-cover object-center"
      style={{ filter: "brightness(0.7) contrast(1.1) saturate(1.05)" }}
      aria-hidden={ariaHidden}
    />
  );
}

export default function EnglishHomePage() {
  return (
    <div className="overflow-x-hidden">
      <StructuredData />

      <section
        className="relative min-h-[80vh] 2xl:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b0f1a] via-blue-950 to-purple-950 pt-16 lg:pt-20"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <HeroBackgroundImage />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/70 to-purple-900/75"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse motion-reduce:animate-none nc-HomePage-aurora-1"
          aria-hidden="true"
        />

        <div className="relative z-10 container py-12 md:py-16">
          <div className="max-w-6xl 2xl:max-w-7xl mx-auto text-center mb-10">
            
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
                <span
                  className="w-2 h-2 bg-green-400 rounded-full animate-pulse motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <span className="text-white/90 text-sm font-medium">Nationwide technical production partner</span>
              </div>
            

            
              <h1
                id="hero-title"
                className="text-white text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight"
              >
                <span className="block">Turnkey event technology</span>
                <span className="gradient-text gradient-text--safe-xl" aria-hidden="true">
                  anywhere in Türkiye
                </span>
              </h1>
            

            
              <p className="text-white/80 text-base md:text-lg mb-8 max-w-3xl 2xl:max-w-4xl mx-auto">
                {home.hero.subtitle}
              </p>
            

            
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-12">
                <a
                  href="tel:+905453048671"
                  className="w-full sm:w-auto min-w-[180px] text-center group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm focus-ring"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span aria-hidden="true">📞</span> Call our team
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </a>

                <a
                  href="https://wa.me/905453048671?text=Hello%2C+I'm+reaching+out+from+your+website.+Could+you+share+a+detailed+quote+for+event+technology+support%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-w-[180px] text-center group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm focus-ring"
                  aria-label="WhatsApp quote (opens in a new tab)"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span aria-hidden="true">💬</span> WhatsApp quote
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </a>
              </div>
            

            
              <h2 className="sr-only">Key highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 list-none p-0 m-0">
                {HERO_FEATURES.map((item) => (
                  <li key={item.title} className="m-0 p-0">
                    
                      <div className="group bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:bg-white/15">
                        <div className="text-2xl mb-2 gradient-text gradient-text--safe-xl" aria-hidden="true">
                          {item.icon}
                        </div>
                        <div className="text-white font-bold text-base mb-1">{item.title}</div>
                        <div className="text-white/70 text-xs">{item.description}</div>
                      </div>
                    
                  </li>
                ))}
              </ul>
            

            
              <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl" aria-hidden="true">
                      🎯
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-white text-xl md:text-2xl font-bold mb-2">Free technical consultation</p>
                    <p className="text-white/90 text-base leading-relaxed">
                      Let's plan the ideal stage, LED wall and AV package for your event with detailed drawings, equipment lists and logistics.<strong className="text-yellow-300"> Same-day proposals guaranteed.</strong>
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href="#get-a-quote"
                      className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm focus-ring"
                    >
                      Get a quote
                    </a>
                  </div>
                </div>
              </div>
            
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className="animate-bounce motion-reduce:animate-none">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      <div id="main" className="relative">
        <div id="get-a-quote" className="sr-only" aria-hidden="true" />

        <div aria-hidden="true" className="h-12 lg:h-16" />

        <section
          className="relative py-12 bg-gradient-to-b from-white to-neutral-50/80"
          aria-labelledby="services-title"
        >
          <div
            className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-8">
            <div className="container">
              
                <div className="text-center mb-12">
                  <h2 id="services-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                    Professional <span className="gradient-text gradient-text--safe-xl">event services</span>
                  </h2>
                  <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                    Turnkey stage, LED wall, sound, lighting and tent solutions available across Türkiye
                  </p>
                </div>
              
            </div>

            <div className="-mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12">
              <ServicesTabs
                servicesData={SERVICES_EN}
                dictionary={SERVICES_DICTIONARY_EN}
              />
            </div>
          </div>
        </section>

        <section
          className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95"
          aria-labelledby="projects-title"
        >
          <div className="container">
            
              <div className="text-center mb-12">
                <h2 id="projects-title" className="text-3xl md:text-4xl font-black text-white mb-4">
                  Recent <span className="gradient-text gradient-text--safe-xl">projects</span>
                </h2>
                <p className="text-lg text-white/80 max-w-3xl mx-auto">
                  Corporate launches, open-air concerts, government events and branded experiences delivered turnkey by Sahneva
                </p>
              </div>
            
            <ProjectsGallery
              galleries={PROJECT_GALLERIES_EN}
              dictionary={PROJECTS_DICTIONARY_EN}
            />
          </div>
        </section>

        <section
          className="py-12 bg-white"
          aria-labelledby="corporate-title"
        >
          <div className="container">
            
              <div className="text-center mb-12">
                <h2 id="corporate-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                  Corporate <span className="gradient-text gradient-text--safe-xl">event solutions</span>
                </h2>
                <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                  From executive summits to dealer conventions, we coordinate stage design, media production and technical crews end-to-end
                </p>
              </div>
            
            <CorporateEvents
              cards={CORPORATE_EVENTS_CARDS_EN}
              advantages={CORPORATE_EVENTS_ADVANTAGES_EN}
              dictionary={CORPORATE_EVENTS_DICTIONARY_EN}
            />
          </div>
        </section>

        <section
          className="py-12 bg-gradient-to-br from-blue-50/80 to-purple-50/60"
          aria-labelledby="why-heading"
        >
          <div className="container">
            
              <div className="text-center mb-12">
                <h2 id="why-heading" className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">
                  Why choose <span className="gradient-text gradient-text--safe-xl">Sahneva</span>
                </h2>
                <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                  Over a decade of experience, premium equipment and detail-obsessed technical teams at your service
                </p>
              </div>
            

            
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
                {WHY_SAHNEVA_FEATURES.map(({ icon, title, desc, stat }, i) => (
                  <li key={title} className="m-0 p-0">
                    
                      <article
                        className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-neutral-100 hover:border-blue-200/70 hover:scale-105"
                        aria-labelledby={`why-card-${i}-title`}
                      >
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {stat}
                        </div>
                        <div className="text-3xl mb-4 gradient-text gradient-text--safe-xl" aria-hidden="true">
                          {icon}
                        </div>
                        <p id={`why-card-${i}-title`} className="font-black text-lg mb-3 text-neutral-900 group-hover:text-blue-600 transition-colors">
                          {title}
                        </p>
                        <p className="text-neutral-700 leading-relaxed text-sm">{desc}</p>
                      </article>
                    
                  </li>
                ))}
              </ul>
            
          </div>
        </section>

        <section
          className="py-12 bg-white"
          aria-labelledby="seo-title"
        >
          <div className="container">
            
              <h2 id="seo-title" className="text-3xl md:text-4xl font-black text-center mb-12 text-neutral-900">
                Türkiye's <span className="gradient-text gradient-text--safe-xl">leading</span> event technology partner
              </h2>
            

            <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
              
                <article className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <p className="font-black text-xl mb-4 text-neutral-900 flex items-center gap-3">
                    <span className="bg-blue-500 text-white p-2 rounded-lg" aria-hidden="true">🚀</span>
                    End-to-end technical production & logistics
                  </p>
                  <div className="prose max-w-none text-neutral-700">
                    <p className="text-base leading-relaxed">
                      <strong>Sahneva</strong> designs, delivers and operates{' '}
                      <a
                        href="/en/stage-rental"
                        className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors"
                      >
                        modular stages
                      </a>
                      ,{' '}
                      <a
                        href="/en/services#led"
                        className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors"
                      >
                        LED walls
                      </a>
                      {' '}and{' '}
                      <a
                        href="/en/sound-light-rental"
                        className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 inline-block px-2 py-1 rounded-md underline-offset-4 transition-colors"
                      >
                        sound-light systems
                      </a>{' '}
                      for launches, festivals, summits and government productions.
                    </p>
                    <ul className="mt-4 space-y-2 text-neutral-700">
                      {[
                        "Outdoor LED cabinets with IP65 protection and 4500+ nit brightness",
                        "Line-array PA systems, digital mixing desks and monitoring",
                        "Heavy-duty truss roofs, scaffolding and stage accessories",
                        "DMX-controlled lighting, ambience fixtures and special effects",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              

              
                <article className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 shadow-lg border border-purple-100">
                  <p className="font-black text-xl mb-4 text-neutral-900 flex items-center gap-3">
                    <span className="bg-purple-500 text-white p-2 rounded-lg" aria-hidden="true">🎤</span>
                    Infrastructure for large-scale audiences
                  </p>
                  <div className="prose max-w-none text-neutral-700">
                    <p className="text-base leading-relaxed">
                      Festivals, political rallies, sporting events and national celebrations benefit from our high-capacity equipment inventory and redundancy planning.
                    </p>
                    <ul className="mt-4 space-y-2 text-neutral-700">
                      {[
                        "LED walls over 100 m² with outdoor P3.9 cabinets",
                        "Line-array audio from JBL, RCF, dB Technologies",
                        "Truss towers, roof systems and custom scenic elements",
                        "Backup generators, UPS and power distribution",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              
            </div>
          </div>
        </section>

        <section
          className="py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95"
          aria-labelledby="faq-title"
        >
          <div className="container">
            
              <div className="text-center mb-12">
                <h2 id="faq-title" className="text-3xl md:text-4xl font-black text-white mb-4">
                  Frequently <span className="gradient-text gradient-text--safe-xl">asked questions</span>
                </h2>
                <p className="text-lg text-white/80 max-w-3xl mx-auto">
                  Answers about pricing, logistics, installation times and crew support for stage, LED and AV services
                </p>
              </div>
            
            <Faq
              items={FAQ_ITEMS_EN}
              dictionary={FAQ_DICTIONARY_EN}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
