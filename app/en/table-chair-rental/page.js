// app/en/table-chair-rental/page.js
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== Constants ================== */
export const revalidate = 1800;
const ORIGIN = "https://www.sahneva.com";
const ORGANIZATION_ID = `${ORIGIN}/#org`;
const PHONE = "+905453048671";
const WA_TEXT =
  "Hello%2C+I'd+like+to+request+a+quote+for+table+and+chair+rental.+Event+type%3A+%5Bbanquet%2Fconference%2Fcocktail%5D%2C+Date%3A+%5Bdd.mm.yyyy%5D%2C+Guest+count%3A+%5Bxxx%5D.";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

// Base64 blur placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ================== Dynamic gallery ================== */
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => (
    <div className="flex justify-center items-center h-64" role="status" aria-label="Gallery loading">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-hidden="true" />
      <span className="sr-only">Loading gallery…</span>
    </div>
  )
});

/* ================== META ================== */
export const metadata = {
  title: "Table & Chair Rental | Banquet, Conference & Cocktail Setups | Sahneva",
  description:
    "Napoleon and conference chairs, banquet and cocktail tables, linen & cover styling with professional layout and rapid delivery across Türkiye.",
  alternates: {
    canonical: `${ORIGIN}/en/table-chair-rental`,
    languages: {
      "tr-TR": `${ORIGIN}/masa-sandalye-kiralama`,
    },
  },
  openGraph: {
    title: "Table & Chair Rental | Professional Seating Solutions | Sahneva",
    description:
      "Full-scale table and chair rental for banquets, conferences and cocktail events with styling, numbering and setup services.",
    url: `${ORIGIN}/en/table-chair-rental`,
    type: "website",
    siteName: "Sahneva",
    locale: "en_US",
    images: [{
      url: `${ORIGIN}/img/sandalye/3.webp`,
      width: 1200,
      height: 630,
      alt: "Sahneva table and chair rental - elegant banquet setup",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Table & Chair Rental | Banquet, Conference & Cocktail Setups | Sahneva",
    description:
      "Napoleon and conference chairs, banquet and cocktail tables, linen & cover styling with professional layout and rapid delivery across Türkiye.",
    images: [`${ORIGIN}/img/sandalye/3.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* ================== Helpers & constants ================== */
const slugify = (s) =>
  s.toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const HERO = {
  src: "/img/sandalye/3.webp",
  alt: "Professional banquet setup with elegant table and chair styling",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🪑",
    title: "Napoleon Chairs",
    description: "Classic and elegant seating, available in wooden and PP finishes",
    features: ["Wood & PP models", "White/ivory palette", "Stackable design", "Comfortable seating"],
  },
  {
    icon: "💼",
    title: "Conference Chairs",
    description: "Upholstered, professional look tailored for long sessions",
    features: ["Padded seating", "Professional appearance", "Foldable frames", "Lightweight transport"],
  },
  {
    icon: "🎪",
    title: "Banquet Tables",
    description: "Round and rectangular tables for every event format",
    features: ["Ø180 round", "180×75 rectangular", "Fast assembly", "Reinforced structure"],
  },
  {
    icon: "🥂",
    title: "Cocktail Tables",
    description: "Compact options for cocktail and networking zones",
    features: ["Ø60-80 cm", "Lightweight build", "Stretch cover ready", "Mobile friendly"],
  },
  {
    icon: "🧵",
    title: "Linen & Cover Styling",
    description: "Linen, taffeta and stretch fabrics with rich colour choices",
    features: ["Linen tablecloths", "Taffeta runners", "Stretch covers", "20+ colours"],
  },
  {
    icon: "🗺️",
    title: "Planning & Layout",
    description: "Seating charts, numbering and professional installation",
    features: ["Seating charts", "Table numbering", "Professional setup", "Directional signage"],
  },
];

const USE_CASES = [
  {
    icon: "💒",
    text: "Weddings and engagement receptions",
    desc: "Banquet tables, round layouts and elegant seating",
  },
  {
    icon: "🏢",
    text: "Corporate meetings and conferences",
    desc: "Conference chairs, rectangular tables and professional styling",
  },
  {
    icon: "🎓",
    text: "Seminars and training events",
    desc: "Classroom layouts, note tables and ergonomic seating",
  },
  {
    icon: "🥂",
    text: "Cocktail and launch parties",
    desc: "Cocktail tables, high-top options and mobile setups",
  },
  {
    icon: "🎭",
    text: "Festivals and outdoor gatherings",
    desc: "Durable chairs and practical table systems",
  },
  {
    icon: "🏆",
    text: "Award ceremonies and galas",
    desc: "Protocol seating and premium table arrangements",
  },
];

const PACKAGES = [
  {
    id: "banquet-100",
    name: "Banquet Package — 100 Guests",
    badge: "Popular",
    specs: {
      people: 100,
      tables: { type: "Round Ø180", count: 10 },
      chairs: { type: "Napoleon", count: 100 },
      linens: { tablecloth: 10, runner: 10 },
    },
    includes: [
      "10 × round banquet tables (Ø180 cm)",
      "100 × Napoleon chairs (white/ivory)",
      "Linen tablecloths + runners",
      "Delivery, installation and collection",
    ],
    note: "Perfect for weddings, galas and corporate dinners.",
  },
  {
    id: "conference-60",
    name: "Conference Package — 60 Guests",
    badge: "Corporate",
    specs: {
      people: 60,
      tables: { type: "Rectangular 180×75", count: 10 },
      chairs: { type: "Conference", count: 60 },
      linens: { tablecloth: 10 },
    },
    includes: [
      "10 × rectangular tables (180×75 cm)",
      "60 × conference chairs (padded)",
      "Numbering and seating plan layout",
      "Delivery + setup",
    ],
    note: "Ideal for seminars, trainings and panel discussions.",
  },
  {
    id: "cocktail-15",
    name: "Cocktail Package — 15 Units",
    badge: "Light Setup",
    specs: {
      people: 90,
      tables: { type: "Cocktail Ø60–80", count: 15 },
      chairs: { type: "—", count: 0 },
      linens: { stretchCover: 15 },
    },
    includes: [
      "15 × cocktail tables (Ø60–80 cm)",
      "Stretch covers (white/black/colour)",
      "Optional: taffeta sash or frill",
      "Delivery + collection",
    ],
    note: "Designed for launches, openings and networking lounges.",
  },
];

/* ================== HERO ================== */
function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-slate-900 pt-20 min-h-[80vh] 2xl:min-h-[85vh]" aria-labelledby="hero-title">
      <div className="absolute inset-0">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          className="object-cover"
          sizes={HERO.sizes}
          quality={85}
         
          blurDataURL={BLUR_DATA_URL}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-blue-950/90" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-purple-900/60" aria-hidden="true" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white py-12">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30 mb-6">
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
          </span>
          <span className="text-sm font-bold text-white">Rapid delivery across Istanbul</span>
        </div>

        <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl">
          Professional <span className="gradient-text gradient-text--safe-xl">Table & Chair Rental</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
          Weddings • Conferences • Cocktails • Corporate Events
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-6">
          Napoleon and conference chairs, banquet tables, linen & cover systems with
          <span className="font-semibold text-white"> professional event styling</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Request an instant quote on WhatsApp"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
            role="button">
            <span aria-hidden="true" className="text-xl mr-2">💬</span>
            <span className="text-base">Get a Quote Now</span>
          </Link>

          <Link
            href="#packages"
            aria-label="View ready-to-go packages"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white/50 text-white bg-slate-900/85 backdrop-blur-lg hover:bg-slate-900/95 hover:border-white/70 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
            role="button">
            <span aria-hidden="true" className="text-xl mr-2">🎯</span>
            <span className="text-base">See Packages</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">⭐</span>
            <div className="text-xl font-black text-white">4.9/5</div>
            <div className="text-white/80 text-sm">183+ Reviews</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🏆</span>
            <div className="text-xl font-black text-white">300+</div>
            <div className="text-white/80 text-sm">Projects Delivered</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🚀</span>
            <div className="text-xl font-black text-white">81 Provinces</div>
            <div className="text-white/80 text-sm">Nationwide Service</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== Services ================== */
function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-blue-50/50" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Our Professional <span className="gradient-text gradient-text--safe-xl">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive table and chair rental: large inventory, styling and expert installation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service) => {
            const id = `svc-${slugify(service.title)}`;
            return (
              <div key={id} className="group">
                <article
                  className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 group-hover:scale-105 transition-all duration-500 h-full flex flex-col"
                  aria-labelledby={id}>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 id={id} className="text-2xl font-black mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-700">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
            role="button">
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Request a tailored quote</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Packages ================== */
function Packages() {
  const formatTRY = (n) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(n);

  const packagePrices = {
    "banquet-100": 12500,
    "conference-60": 9800,
    "cocktail-15": 7200,
  };

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="packages-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="packages-heading" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Turnkey <span className="gradient-text gradient-text--safe-xl">Packages</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready-made seating solutions tailored to your guest count
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="group">
              <div
                className={`bg-white rounded-3xl border-2 shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 h-full flex flex-col ${
                  pkg.badge === "Popular"
                    ? "border-blue-500 ring-4 ring-blue-500/20 transform scale-105 group-hover:scale-110"
                    : "border-gray-100 group-hover:scale-105"
                }`}
                >
                <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-8 text-white relative overflow-hidden">
                  {pkg.badge && (
                    <div
                      className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold ${
                        pkg.badge === "Popular" ? "bg-orange-500" : pkg.badge === "Corporate" ? "bg-blue-600" : "bg-green-500"
                      }`}
                    >
                      {pkg.badge}
                    </div>
                  )}
                  <div className="text-4xl mb-4" aria-hidden="true">
                    {pkg.id === "banquet-100" && "💒"}
                    {pkg.id === "conference-60" && "🏢"}
                    {pkg.id === "cocktail-15" && "🥂"}
                  </div>
                  <h3 className="text-2xl font-black mb-2">{pkg.name}</h3>
                  <p className="text-blue-100 text-lg">{pkg.note}</p>
                </div>

                <div className="p-8 flex-grow">
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true" />
                      Package Contents
                    </h4>
                    <ul className="space-y-3">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span className="text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                    <div className="text-center mb-4">
                      <div className="text-sm text-gray-800 uppercase tracking-wider font-semibold">
                        Daily Rental (Istanbul)
                      </div>
                      <div className="text-3xl font-black text-gray-900 mt-2">
                        {formatTRY(packagePrices[pkg.id])}
                        <span className="text-sm text-gray-800 font-normal ml-2">+ VAT</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <Link
                    href={`${WHATSAPP}&package=${encodeURIComponent(pkg.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center font-bold px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
                    role="button">
                    <span aria-hidden="true" className="text-xl mr-2">💬</span>
                    <span>Request this package</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Gallery ================== */
const GALLERY_IMAGES = [
  {
    src: "/img/sandalye/1.webp",
    alt: "Round banquet tables with Napoleon chairs arranged for 100 guests",
  },
  {
    src: "/img/sandalye/2.webp",
    alt: "Conference layout with padded chairs and rectangular tables",
  },
  {
    src: "/img/sandalye/3.webp",
    alt: "Cocktail lounge with high tables dressed in stretch covers",
  },
  {
    src: "/img/sandalye/4.webp",
    alt: "Wedding reception with elegant table décor and seating",
  },
  {
    src: "/img/sandalye/5.webp",
    alt: "Corporate meeting featuring conference chairs and table layout",
  },
  {
    src: "/img/sandalye/6.webp",
    alt: "Outdoor event with durable table and chair installation",
  },
];

function Gallery() {
  return (
    <section className="py-20 bg-white" aria-labelledby="gallery-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="gallery-heading" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Project <span className="gradient-text gradient-text--safe-xl">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Highlights from recent table and chair installations we delivered
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery images={GALLERY_IMAGES} visibleCount={6} priorityCount={2} />
        </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-6">Explore more reference projects in our portfolio</p>
            <Link
              href="/en/projects"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 focus-ring"
            >
              <span aria-hidden="true" className="text-xl mr-3">📸</span>
              <span>View all projects</span>
            </Link>
          </div>
      </div>
    </section>
  );
}

/* ================== Technical Specs ================== */
const TECHNICAL_ITEMS = [
  {
    icon: "📦",
    title: "Extensive Inventory",
    items: [
      "500+ banquet tables (round & rectangular)",
      "2,500+ Napoleon, conference and cocktail chairs",
      "Lounge seating, bar stools and auxiliary furniture",
    ],
  },
  {
    icon: "🛠️",
    title: "Professional Installation",
    items: [
      "Crewed delivery and on-site assembly",
      "Protective padding and floor guards",
      "Night-time dismantle options",
    ],
  },
  {
    icon: "🎨",
    title: "Styling & Décor",
    items: [
      "Linen, taffeta and stretch fabrics",
      "Chair sashes, table runners and centrepieces",
      "Brand-colour coordination and signage",
    ],
  },
  {
    icon: "📐",
    title: "Planning Support",
    items: [
      "Detailed seating charts",
      "Guest numbering and signage",
      "Venue walk-through and measurements",
    ],
  },
  {
    icon: "🔌",
    title: "Complementary Services",
    items: [
      "Stage and podium integration",
      "Lighting ambience for tables",
      "Sound coverage for speeches",
    ],
  },
  {
    icon: "🛡️",
    title: "Quality Assurance",
    items: [
      "Sanitised and maintained inventory",
      "Fire-retardant fabrics",
      "Backup stock for last-minute changes",
    ],
  },
];

function Technical() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-slate-900" aria-labelledby="technical-heading">
      <div className="container mx-auto px-4 text-white">
        <div className="text-center mb-16">
          <h2 id="technical-heading" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Technical <span className="gradient-text gradient-text--safe-xl">Infrastructure</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Certified crews, detailed planning and premium equipment ensure a seamless seating experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TECHNICAL_ITEMS.map((item) => (
            <article
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl h-full flex flex-col"
              aria-labelledby={slugify(item.title)}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 id={slugify(item.title)} className="text-2xl font-black text-white">
                  {item.title}
                </h3>
              </div>
              <ul className="space-y-3 text-white/80 text-lg leading-relaxed">
                {item.items.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/en/contact"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring">
            <span aria-hidden="true" className="text-xl mr-3">📝</span>
            <span>Book an on-site inspection</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Stats Band ================== */
const STATS = [
  {
    value: "500+",
    label: "Banquet & corporate events",
  },
  {
    value: "2,500+",
    label: "Chairs prepared per month",
  },
  {
    value: "3h",
    label: "Average installation time",
  },
  {
    value: "98%",
    label: "Client satisfaction score",
  },
];

function StatsBand() {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700" aria-labelledby="stats-heading">
      <div className="container mx-auto px-4">
        <h2 id="stats-heading" className="sr-only">
          Performance metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white max-w-5xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl md:text-4xl font-black mb-2">{stat.value}</div>
              <div className="text-white/80 text-sm md:text-base leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Use Cases ================== */
function UseCases() {
  return (
    <section className="py-20 bg-white" aria-labelledby="usecases-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="usecases-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Where <span className="gradient-text gradient-text--safe-xl">We Add Value</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted seating and furniture solutions for every event format and audience profile
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.text}
              className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 transition-all duration-500 hover:scale-105"
              aria-label={useCase.text}>
              <div className="text-4xl mb-4" aria-hidden="true">
                {useCase.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">{useCase.text}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{useCase.desc}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
            role="button">
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Plan your seating layout</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Knowledge Hub ================== */
function Articles() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50" aria-labelledby="knowledge-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 id="knowledge-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Expert <span className="gradient-text gradient-text--safe-xl">Guidance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Technical insights for selecting the right seating, table formats and décor for your event
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <article className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <header className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">📚 In-depth Guide</span>
                  <span className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">⭐ Expert Tips</span>
                  <span className="bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">🎯 Practical Solutions</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Table & Chair Rental: Delivering Comfort and Style for Every Guest
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  Choose the right inventory, ensure professional layouts and unlock flawless hospitality for your attendees.
                </p>
              </div>
            </header>

            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-600 prose-ul:mt-6 prose-ul:mb-6 prose-li:marker:text-blue-500">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-600 rounded-2xl p-3" aria-hidden="true">🪑</span>
                      Seating Strategy
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong> provides
                      <Link href="/en/table-chair-rental" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        professional table and chair rental
                      </Link>{" "}
                      services nationwide with corporate-grade standards.
                    </p>
                    <p>
                      Whether you are planning a wedding or a corporate summit, we deliver
                      <strong className="text-gray-900">turnkey solutions</strong> including needs analysis, product optimisation, professional installation and live support.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-purple-100 text-purple-600 rounded-2xl p-3" aria-hidden="true">🎪</span>
                      Table Formats & Layouts
                    </h4>
                    <p>
                      Round banquet tables for celebrations, rectangular tables for conferences and cocktail tables for networking deliver the perfect format for each agenda.
                    </p>
                    <p>
                      With Ø180 round, 180×75 rectangular and Ø60–80 cocktail options, we optimise capacity for your venue while maintaining comfort and style.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
                  <h5 className="font-black text-blue-700 text-xl mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">💡</span>
                    Technical Selection Tips
                  </h5>
                  <p className="text-gray-700 text-lg mb-0 leading-relaxed">
                    Event duration and comfort needs are the most critical factors. Napoleon chairs work perfectly for short receptions, while conference chairs provide ergonomic support for long sessions. For outdoor venues, we prioritise durability and weather resistance.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                    <span className="bg-green-100 text-green-600 rounded-2xl p-3" aria-hidden="true">🚀</span>
                    Key Success Factors
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: "🎯",
                        title: "Optimised Product Mix",
                        desc: "Selecting the right items according to event format and duration",
                      },
                      {
                        icon: "📊",
                        title: "Space Efficiency",
                        desc: "Precise table layouts aligned with venue dimensions and circulation",
                      },
                      {
                        icon: "🔒",
                        title: "Comfort & Ergonomics",
                        desc: "Ergonomic chair choices for long meetings and conferences",
                      },
                      {
                        icon: "🎭",
                        title: "Aesthetic Detailing",
                        desc: "Coherent styling with linens, covers and décor elements",
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0" aria-hidden="true">
                            {item.icon}
                          </span>
                          <div>
                            <h5 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h5>
                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-2xl p-6 mt-8">
                  <h5 className="font-black text-yellow-700 text-lg mb-3 flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">💎</span>
                    Why Sahneva?
                  </h5>
                  <p className="text-yellow-800 mb-0">
                    <strong>5+ years of experience, 300+ successful projects and service across 81 provinces</strong> make us a trusted partner for seating and furniture rentals. Benefit from our large inventory, expert crews and 24/7 technical support commitment.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">Linen & Cover Systems</h3>
              <p className="text-blue-100 mt-2 text-lg">Select the right fabrics to elevate your presentation</p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  Tablecloth and cover choices have a direct impact on the ambiance. Linen delivers elegance and a natural feel, taffeta adds shine and luxury, while stretch covers ensure a modern, streamlined look.
                </p>
                <p>
                  With 20+ colour options, we match your brand identity or event theme and customise each table with runners and sashes.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">🎨</span>
                    Fabric & Colour Palette
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Linen: White, ivory, bone, beige
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Taffeta: Gold, silver, burgundy, navy
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Stretch: Black, white, red, blue
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Custom colours upon request
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">Planning & Layout Strategies</h3>
              <p className="text-blue-100 mt-2 text-lg">Professional seating charts and space optimisation tips</p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  A well-designed plan ensures comfortable circulation for guests and service staff. We balance main seating with auxiliary zones such as buffets, DJ booths or presentation stages.
                </p>
                <p>
                  Our team produces detailed layouts, numbering plans and directional signage to deliver a smooth attendee experience from arrival to farewell.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-600 rounded-xl p-2" aria-hidden="true">📐</span>
                    Planning Checklist
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Measure venue dimensions and ceiling heights
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Define guest flow and service corridors
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Map out stage, buffet and technical zones
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Create numbering and signage plans
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ================== FAQ ================== */
const FAQ_ITEMS = [
  {
    question: "Which chair models do you offer?",
    answer:
      "We stock Napoleon chairs in wooden and polypropylene finishes, padded conference chairs, Chiavari, cross-back, bar stools and lounge seating. Each item is inspected and sanitised before dispatch.",
  },
  {
    question: "Do you provide table linens and décor?",
    answer:
      "Yes. Linen, taffeta and stretch fabrics are available with matching runners, chair covers, bows and accessories. We coordinate colours with your brand or event theme.",
  },
  {
    question: "Can you plan the seating layout for us?",
    answer:
      "Our project team prepares seating charts, numbering plans and service corridors. We also support hybrid layouts that integrate stage, buffet and lounge zones.",
  },
  {
    question: "Do you handle delivery and setup?",
    answer:
      "All packages include transport, crewed installation and dismantle. Night-time operations and multi-day rentals are available on request.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "We deliver nationwide across 81 provinces. Istanbul, Ankara, Izmir and Antalya have dedicated crews for rapid response.",
  },
  {
    question: "How early should we confirm our booking?",
    answer:
      "For large banquets we recommend confirming two weeks prior. Smaller cocktail setups can be arranged within a few days depending on inventory.",
  },
];

function FAQ() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Frequently Asked <span className="gradient-text gradient-text--safe-xl">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Key details about our table and chair rental process, logistics and technical capabilities
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={item.question}
              className="group bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden"
              aria-labelledby={`faq-${index}`}>
              <summary
                className="flex items-center justify-between gap-4 p-6 cursor-pointer"
                role="button"
              >
                <h3 id={`faq-${index}`} className="text-lg md:text-xl font-bold text-gray-900">
                  {item.question}
                </h3>
                <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform duration-300" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed border-t border-gray-100">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/en/contact"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring">
            <span aria-hidden="true" className="text-xl mr-3">✉️</span>
            <span>Send us your questions</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Related Services ================== */
const RELATED_SERVICES = [
  {
    icon: "🖥️",
    title: "LED Screen Rentals",
    desc: "High-resolution LED walls with content playback and rigging",
    href: "/en/led-screen-rental",
  },
  {
    icon: "🎧",
    title: "Sound & Lighting",
    desc: "Concert-grade PA, lighting design and show control",
    href: "/en/sound-light-rental",
  },
  {
    icon: "⛺",
    title: "Event Tent Rentals",
    desc: "Pagoda, clear-span and dome tents with climate control",
    href: "/en/tent-rental",
  },
  {
    icon: "🎪",
    title: "Stage & Podium Systems",
    desc: "Modular stages, runways and truss roofs",
    href: "/en/stage-rental",
  },
];

function RelatedServices() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white" aria-labelledby="related-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="related-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
            Complementary <span className="gradient-text gradient-text--safe-xl">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete your seating setup with our comprehensive event production capabilities
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8 rounded-full" aria-hidden="true" />
        </div>

        <nav aria-label="Complementary services">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {RELATED_SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-500 hover:scale-105 text-center focus-ring h-full flex flex-col"
                aria-label={`${service.title} - ${service.desc}`}>
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors mb-4 flex-grow">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
                  {service.desc}
                </p>
              </Link>
            ))}
          </div>
        </nav>

        <div className="sr-only">
          <p>
            This section lists other services that complement your seating setup. Activate any card to open its detailed service page.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================== CTA ================== */
function CTA() {
  return (
    <section className="py-20 bg-white" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
          <div className="relative z-10">
            <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              Ready for Professional Seating Solutions?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Let us recommend the ideal table and chair configuration for your event. Enjoy complimentary site surveys, expert consultancy and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl focus-ring shadow-lg"
                role="button">
                <span aria-hidden="true" className="text-xl mr-3">📞</span>
                <span className="text-lg">Request a proposal</span>
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white bg-transparent hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
                role="button">
                <span aria-hidden="true" className="text-xl mr-3">💬</span>
                <span className="text-lg">Chat on WhatsApp</span>
              </a>
            </div>
            <div className="mt-8 text-blue-200 text-lg">
              📍 Nationwide coverage • ⏰ 24/7 technical support • ⭐ 5+ years of expertise
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== JSON-LD ================== */
function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Table and Chair Rental Service",
        description:
          "Professional table and chair rental with Napoleon and conference chairs, banquet and cocktail tables, linen styling and layout planning across Türkiye.",
          provider: { "@id": ORGANIZATION_ID },
        areaServed: "TR",
        serviceType: "EventProduction",
        offers: {
          "@type": "Offer",
          description: "Professional table and chair rental packages",
        },
        url: `${ORIGIN}/en/table-chair-rental`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "183",
          bestRating: "5",
        },
      },
      {
        "@type": "WebPage",
        name: "Table & Chair Rental | Banquet, Conference & Cocktail Setups | Sahneva",
        description:
          "Napoleon and conference chairs, banquet and cocktail tables, linen & cover styling with professional layout and rapid delivery across Türkiye.",
        url: `${ORIGIN}/en/table-chair-rental`,
        mainEntity: {
          "@type": "Service",
          name: "Table & Chair Rental",
        },
      },
    ],
  };

  return (
    <Script
      id="ld-json-table-chair"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Page Component ================== */
export default function Page() {
  const baseUrl = ORIGIN;
  const canonical = `${baseUrl}/en/table-chair-rental`;
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/en` },
    { name: "Services", url: `${baseUrl}/en/services` },
    { name: "Table & Chair Rental", url: canonical },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLd />
      <Hero />
      <Services />
      <Packages />
      <Gallery />
      <Technical />
      <StatsBand />
      <UseCases />
      <Articles />
      <FAQ />
      <RelatedServices />
      <CTA />
    </>
  );
}
