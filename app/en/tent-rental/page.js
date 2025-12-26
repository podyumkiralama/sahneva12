// app/en/tent-rental/page.js
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
  "Hello%2C+I'd+like+to+request+a+quote+for+tent+rental.+Event+type%3A+%5Bwedding%2Ffair%2Fconcert%5D%2C+Date%3A+%5Bdd.mm.yyyy%5D%2C+Guest+count%3A+%5Bxxx%5D.";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

// Base64 blur placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ================== Dynamic gallery (CaseGallery) ================== */
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
  title: "Tent Rental | Pagoda, Clear Span & Dome Structures | Sahneva",
  description:
    "Pagoda, clear-span and dome tent rentals with flooring, climate control, lighting and nationwide installation for events across Türkiye.",
  alternates: {
    canonical: `${ORIGIN}/en/tent-rental`,
    languages: {
      "tr-TR": `${ORIGIN}/cadir-kiralama`,
    },
  },
  openGraph: {
    title: "Tent Rental | Professional Event Structures | Sahneva",
    description:
      "Pagoda, transparent dome and industrial tent solutions with nationwide installation, flooring, lighting and support.",
    url: `${ORIGIN}/en/tent-rental`,
    type: "website",
    siteName: "Sahneva",
    locale: "en_US",
    images: [{
      url: `${ORIGIN}/img/cadir/hero.webp`,
      width: 1200,
      height: 630,
      alt: "Sahneva tent rental - professional event structures"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tent Rental | Pagoda, Clear Span & Dome Structures | Sahneva",
    description:
      "Pagoda, transparent dome and industrial tent rentals with turnkey installation, flooring, lighting and climate control.",
    images: [`${ORIGIN}/img/cadir/hero.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
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
  src: "/img/cadir/hero.webp",
  alt: "Professional tent installation with pagoda structure and event setup",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🏕️",
    title: "Pagoda Tent Systems",
    description: "Elegant 5×5m and 6×6m modular pagoda tents for premium events",
    features: ["High peak silhouette", "Modular connection options", "Sidewall and window panels", "Rapid installation"],
  },
  {
    icon: "🔮",
    title: "Transparent Dome Tents",
    description: "Immersive clear dome structures designed for night lighting",
    features: ["Weather-resistant frame", "Integrated LED lighting", "Ideal for gala dinners", "Memorable experiential events"],
  },
  {
    icon: "🏭",
    title: "Industrial Tents",
    description: "Large-span storage and production tents with reinforced frames",
    features: ["Forklift friendly access", "Wide clear-span layout", "Long-term deployment", "Durable PVC membrane"],
  },
  {
    icon: "🎪",
    title: "Fair & Exhibition Tents",
    description: "Optimised tent solutions for fairs, exhibitions and showrooms",
    features: ["Fast build-out", "Compatible with booth layouts", "Professional look & branding", "Custom fascia and signage"],
  },
  {
    icon: "💡",
    title: "Lighting & Power",
    description: "Professional lighting fixtures and electrical infrastructure",
    features: ["LED ambiance lighting", "Power distribution panels", "Emergency lighting circuits", "Energy management solutions"],
  },
  {
    icon: "🔧",
    title: "Installation & Technical Support",
    description: "Expert crew for installation, dismantling and 24/7 assistance",
    features: ["Certified installation", "Dismantle service", "24/7 technical support", "Emergency response team"],
  },
];

const USE_CASES = [
  {
    icon: "💍",
    text: "Weddings, engagement and private galas",
    desc: "Elegant tent setups with décor and climate control",
  },
  {
    icon: "🎪",
    text: "Fairs, exhibitions and product launches",
    desc: "Custom-branded spaces for trade and marketing events",
  },
  {
    icon: "🎤",
    text: "Concerts, festivals and outdoor shows",
    desc: "Weather-safe audience and backstage tents",
  },
  {
    icon: "🏛️",
    text: "Municipal and corporate events",
    desc: "Reliable infrastructure for public and corporate gatherings",
  },
  {
    icon: "🏭",
    text: "Industrial storage and logistics",
    desc: "Temporary warehousing with secure access and lighting",
  },
  {
    icon: "🏫",
    text: "Schools and educational events",
    desc: "Graduations, sports days and campus activations",
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
          <span className="text-sm font-bold text-white">Nationwide professional service</span>
        </div>

        <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl">
          Professional <span className="gradient-text gradient-text--safe-xl">Tent Rental</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
          Weddings • Fairs • Festivals • Launches • Special Events
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-6">
          Pagoda tents, transparent domes and industrial structures with
          <span className="font-semibold text-white"> turnkey delivery</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Request a quote instantly over WhatsApp"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">💬</span>
            <span className="text-base">Get a quote now</span>
          </Link>

          <Link
            href="#services"
            aria-label="Discover our tent rental services"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white/50 text-white bg-slate-900/85 backdrop-blur-lg hover:bg-slate-900/95 hover:border-white/70 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">🎯</span>
            <span className="text-base">Our services</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">⭐</span>
            <div className="text-xl font-black text-white">4.8/5</div>
            <div className="text-white/80 text-sm">180+ client reviews</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🏆</span>
            <div className="text-xl font-black text-white">850+</div>
            <div className="text-white/80 text-sm">Completed events</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🚀</span>
            <div className="text-xl font-black text-white">81 cities</div>
            <div className="text-white/80 text-sm">Nationwide coverage</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== Services ================== */
function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-blue-50/50" aria-labelledby="services-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="services-title" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Professional <span className="gradient-text gradient-text--safe-xl">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tent rental lifecycle covering site survey, structural design, installation, on-site support and dismantle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service) => {
            const id = `svc-${slugify(service.title)}`;
            return (
              <div key={id} className="group">
                <article 
                  className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 group-hover:scale-105 transition-all duration-500 h-full flex flex-col"
                  aria-labelledby={id}
                >
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
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Request a detailed proposal</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Gallery ================== */
const GALLERY_IMAGES = [
  {
    src: "/img/cadir/1.webp",
    alt: "Pagoda tent installation for a wedding reception",
  },
  {
    src: "/img/cadir/2.webp",
    alt: "Transparent dome tent creating an immersive atmosphere",
  },
  {
    src: "/img/cadir/3.webp",
    alt: "Industrial tent setup providing storage and production space",
  },
  {
    src: "/img/cadir/4.webp",
    alt: "Exhibition tent prepared for professional fair presentations",
  },
  {
    src: "/img/cadir/5.webp",
    alt: "LED-lit tent ambience for evening events",
  },
  {
    src: "/img/cadir/6.webp",
    alt: "Concert tent solution for outdoor events",
  },
  {
    src: "/img/cadir/7.webp",
    alt: "Installation crew assembling a tent structure",
  },
  {
    src: "/img/cadir/8.webp",
    alt: "Branded tent design for corporate events",
  },
  {
    src: "/img/cadir/9.webp",
    alt: "Corporate tent exterior with custom graphics",
  },
  {
    src: "/img/cadir/10.webp",
    alt: "Interior decor created inside a pagoda tent",
  },
  {
    src: "/img/cadir/11.webp",
    alt: "Event guests enjoying a climate-controlled tent",
  },
  {
    src: "/img/cadir/12.webp",
    alt: "Exterior facade of a large-scale event tent",
  },
];

function Gallery() {
  return (
    <section className="py-20 bg-white" aria-labelledby="gallery-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="gallery-title" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Project <span className="gradient-text gradient-text--safe-xl">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Highlights from recent tent structures we delivered across Türkiye
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery images={GALLERY_IMAGES} visibleCount={8} priorityCount={2} />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Discover more tent transformations inside our projects archive
          </p>
          <Link
            href="/en/projects"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 focus-ring"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">📸</span>
            <span>View all projects</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Technical infrastructure ================== */
function Technical() {
  const technicalItems = [
    {
      category: "materials",
      title: "Material Quality",
      description: "Aluminium frames, steel connections and UV-resistant PVC membranes",
      features: ["Aluminium frame system", "650 gr/m² PVC membranes", "Flame-retardant material", "Galvanised steel joints"],
    },
    {
      category: "safety",
      title: "Safety Systems",
      description: "Stability engineering that complies with TS EN wind and load standards",
      features: ["90 km/h wind resistance", "Professional anchoring", "Ballast weighting", "Integrated rain gutters"],
    },
    {
      category: "dimensions",
      title: "Sizes & Combinations",
      description: "Modular structures with flexible dimensions and connection layouts",
      features: ["5×5m / 6×6m pagoda options", "Project-specific sizing", "10–20m clear-span halls", "Side-by-side expansion"],
    },
    {
      category: "complements",
      title: "Complementary Services",
      description: "Supporting services that complete the tent experience",
      features: ["Flooring and decking systems", "Lighting design", "Heating and cooling units", "Branding & decoration"],
    },
    {
      category: "installation",
      title: "Installation Process",
      description: "Rapid mobilisation with experienced crew, logistics and dismantle",
      features: ["2–6 hour setup", "Certified crew", "Dedicated logistics", "Post-event dismantle"],
    },
    {
      category: "support",
      title: "Technical Support",
      description: "24/7 service desk, emergency response and preventive maintenance",
      features: ["24/7 technical hotline", "Emergency response team", "Spare part inventory", "Scheduled maintenance"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="altyapi-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="altyapi-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Technical <span className="gradient-text gradient-text--safe-xl">Infrastructure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Delivered with premium-grade equipment, safety engineering and experienced supervisors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technicalItems.map((item) => (
            <div key={item.category} className="group">
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-500 h-full">
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {item.category === "materials" && "🏗️"}
                    {item.category === "safety" && "🛡️"}
                    {item.category === "dimensions" && "📐"}
                    {item.category === "complements" && "🔧"}
                    {item.category === "installation" && "⚡"}
                    {item.category === "support" && "📞"}
                  </span>
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {item.description}
                </p>
                <ul className="space-y-3">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Stats band ================== */
function StatsBand() {
  const stats = [
    { value: "850+", label: "Successful events", icon: "🎪" },
    { value: "40+", label: "Enterprise clients", icon: "🏢" },
    { value: "81", label: "Cities served", icon: "🗺️" },
    { value: "8+", label: "Years of expertise", icon: "⭐" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white" aria-label="Key performance statistics">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="text-center group"
              role="group"
              aria-labelledby={`tent-stat-${index}-value`}
              aria-describedby={`tent-stat-${index}-label`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-500 group-hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {stat.icon}
                </div>
                <h3
                  id={`tent-stat-${index}-value`}
                  className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg"
                >
                  {stat.value}
                </h3>
                <p
                  id={`tent-stat-${index}-label`}
                  className="text-blue-100 text-lg font-semibold"
                >
                  {stat.label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== Use cases ================== */
function UseCases() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900/95" aria-labelledby="use-cases-title">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="use-cases-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Where our <span className="gradient-text gradient-text--safe-xl">tents shine</span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Primary event scenarios and bespoke solutions we deliver with tent infrastructure
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8 rounded-full" aria-hidden="true" />
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto list-none">
          {USE_CASES.map((uc) => (
            <li key={uc.text} className="h-full">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 group hover:scale-105 h-full">
                <div className="flex flex-col items-start gap-4">
                  <div className="text-3xl bg-white/20 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {uc.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2 group-hover:text-blue-300 transition-colors">
                      {uc.text}
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">💬</span>
            <span>Get a tailored event solution</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Bilgi & Rehber ================== */
function Articles() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50" aria-labelledby="knowledge-title">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 id="knowledge-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Knowledge & <span className="gradient-text gradient-text--safe-xl">professional guidance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert insights on planning, designing and operating event tents and temporary structures
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main article */}
          <article className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <header className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">📚 In-depth guide</span>
                  <span className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">⭐ Expert insight</span>
                  <span className="bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">🎯 Practical tips</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Professional Tent Rental: Comprehensive Solutions for Event Success
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  Corporate-grade standards, rapid installation workflows and measurable quality assurance for flawless guest experiences
                </p>
              </div>
            </header>

            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-600 prose-ul:mt-6 prose-ul:mb-6 prose-li:marker:text-blue-500">

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-600 rounded-2xl p-3" aria-hidden="true">🏕️</span>
                      Tent systems & technologies
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong> delivers
                      <Link href="/en/tent-rental" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        professional tent rental
                      </Link>
                      solutions with corporate-level engineering across Türkiye.
                    </p>
                    <p>
                      Whether your event is an outdoor wedding or a corporate fair, our turnkey model covers detailed site surveys,
                      structural calculations, safe installation and dismantle so every stage is coordinated by one expert team.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-purple-100 text-purple-600 rounded-2xl p-3" aria-hidden="true">🔮</span>
                      Specialised tent models
                    </h4>
                    <p>
                      Pagoda tents in 5×5m and 6×6m footprints create elegant reception spaces, while transparent domes deliver immersive atmospheres that benefit from creative lighting.
                    </p>
                    <p>
                      Industrial clear-span tents provide 10–20m widths for logistics and warehousing, and exhibition tents integrate branding panels and modular booth layouts.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
                  <h5 className="font-black text-blue-700 text-xl mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">💡</span>
                    Professional deployment strategy
                  </h5>
                  <p className="text-gray-700 text-lg mb-0 leading-relaxed">
                    Our deployment strategy adapts to venue topography, guest density and compliance requirements. Weddings prioritise aesthetics and comfort, while fairs and industrial projects focus on durability, logistics access and weather resilience.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                    <span className="bg-green-100 text-green-600 rounded-2xl p-3" aria-hidden="true">🚀</span>
                    Critical success factors
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: "🎯", title: "Detailed survey & analysis", desc: "Topography reviews, guest flow planning and risk assessment" },
                      { icon: "📊", title: "Engineering & load design", desc: "Wind load calculations, ballast planning and structural compliance" },
                      { icon: "🔒", title: "Safety systems", desc: "Certified anchoring, emergency plans and monitored access" },
                      { icon: "🎭", title: "Aesthetic integration", desc: "Decor, lighting concepts and branding coordination" },
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
                            <p className="text-gray-600 leading-relaxed">
                              {item.desc}
                            </p>
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
                    <strong>8+ years of experience, 850+ successful events and nationwide coverage</strong> make us a trusted production partner. Premium materials, specialist crews and 24/7 technical support come standard with every project.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Secondary article */}
          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Technical integration & installation workflows
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Professional rigging, safety procedures and complementary services
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  Our installation journey starts with site inspections and engineering drawings. Terrain conditions, prevailing winds and emergency access routes are reviewed in detail.
                </p>
                <p>
                  The experienced crew assembles each tent within 2–6 hours, deploys ballast or anchoring, integrates flooring, lighting, HVAC and ensures final inspections before handover.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">📋</span>
                    Technical standards & highlights
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Aluminium frames with galvanised steel connectors
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      650 gr/m² UV-resistant PVC membranes
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      90 km/h wind resistance with certified anchoring
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Integrated rain gutters and drainage planning
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Event-specific solutions
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Tailored tent strategies for every audience profile and venue layout
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-600 rounded-xl p-2" aria-hidden="true">💍</span>
                      Weddings & private celebrations
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Elegant décor, romantic lighting, climate-controlled comfort and seamless guest circulation
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">🎪</span>
                      Fairs & exhibitions
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Professional appearance, modular booth integration, branding surfaces and service corridors
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-green-100 text-green-600 rounded-xl p-2" aria-hidden="true">🏭</span>
                      Industrial & logistics
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Durable structures, wide clear-span layouts, forklift access and long-term resilience
                    </p>
                  </div>
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
function FAQ() {
  const faqs = [
    {
      q: "How much does tent rental cost?",
      a: "Our 5×5 metre pagoda tent rental is ₺7,000 including Istanbul transport, professional installation, dismantle and essential technical support. Standard tents are priced at ₺300 per square metre. Bespoke designs and premium models are quoted after a project briefing.",
    },
    {
      q: "How long does tent installation take?",
      a: "A 5×5 metre pagoda installs in roughly 2–3 hours, while a 6×6 metre unit takes 3–4 hours. Large-scale projects are assembled one day in advance. Express installation is available for time-critical events.",
    },
    {
      q: "Are the tents resistant to bad weather?",
      a: "Yes. All tents are engineered for 90 km/h wind loads with TS EN 13782 compliant aluminium frames and 650 gr/m² UV-resistant PVC membranes. Integrated rain gutters ensure safe water drainage during heavy showers.",
    },
    {
      q: "Which cities do you serve?",
      a: "We provide professional tent rentals across all 81 Turkish provinces. Metropolitan cities such as Istanbul, Ankara and Izmir benefit from even faster logistics, while our quality and documentation remain consistent nationwide.",
    },
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="faq-title">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 id="faq-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Frequently Asked <span className="gradient-text gradient-text--safe-xl">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Answers to the most common questions about tent rentals and logistics
          </p>
        </div>

        <ul className="space-y-6 list-none" aria-label="Frequently asked questions list">
          {faqs.map((faq, index) => (
            <li key={index}>
              <details
                className="group bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 open:bg-blue-50 open:border-blue-200 border-2 border-transparent open:border"
              >
                <summary
                  className="cursor-pointer list-none flex items-center justify-between text-xl font-bold text-gray-900"
                  role="button"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="ml-4 transition-transform duration-500 group-open:rotate-180 text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
                  >
                    ⌄
                  </span>
                </summary>
                <div className="mt-6 text-gray-700 leading-relaxed text-lg pl-4 border-l-4 border-blue-500" role="region">
                  {faq.a}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Still have questions? Share your requirements and our consultants will respond within the hour.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
            aria-label="Contact Sahneva for tent rental support"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">📚</span>
            <span className="text-lg">Contact our team</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Related services ================== */
function RelatedServices() {
  const services = [
    {
      href: "/en/stage-rental",
      title: "Stage & Podium Rentals",
      icon: "📐",
      desc: "Modular stage platforms, risers and catwalk configurations",
    },
    {
      href: "/en/led-screen-rental",
      title: "LED Screen Rental",
      icon: "🖥️",
      desc: "High-resolution LED walls with processors and rigging",
    },
    {
      href: "/en/sound-light-rental",
      title: "Sound & Lighting",
      icon: "🎵",
      desc: "Concert-grade sound, lighting and truss solutions",
    },
    {
      href: "/en/table-chair-rental",
      title: "Table & Chair Rentals",
      icon: "🪑",
      desc: "Banquet seating, tables and decorative event furniture",
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-100/30"
      aria-labelledby="related-services-title"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="related-services-title"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            Complementary{" "}
            <span className="gradient-text gradient-text--safe-xl">
              services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Extend your tent installation with additional event production services
          </p>
          <div
            className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8 rounded-full"
            aria-hidden="true"
          />
        </div>

        <nav aria-label="Complementary services">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-500 hover:scale-105 text-center focus-ring h-full flex flex-col"
                aria-label={`${service.title} - ${service.desc}`}
              >
                <div
                  className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
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
            This section lists additional services that complement your tent installation.
            Activate any service card to visit the relevant English detail page.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================== CTA ================== */
function CTA() {
  return (
    <section className="py-20 bg-white" aria-labelledby="cta-title">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
          <div className="relative z-10">
            <h2 id="cta-title" className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              Ready for professional tent solutions?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Tell us about your event and we will prepare the ideal tent system with free site survey, professional consulting and competitive pricing guarantees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl focus-ring shadow-lg"
                role="button"
              >
                <span aria-hidden="true" className="text-xl mr-3">📞</span>
                <span className="text-lg">Request a proposal</span>
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white text-white bg-transparent hover:bg-white/20 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
                role="button"
              >
                <span aria-hidden="true" className="text-xl mr-3">💬</span>
                <span className="text-lg">Chat on WhatsApp</span>
              </a>
            </div>
            <div className="mt-8 text-blue-200 text-lg">
              📍 Service across 81 cities • ⏰ 24/7 technical support • ⭐ 8+ years of experience
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
        name: "Tent Rental Service",
        description: "Professional tent rental covering pagoda, transparent dome and industrial structures with nationwide installation and support.",
          provider: { "@id": ORGANIZATION_ID },
        areaServed: "TR",
        serviceType: "EventProduction",
        offers: {
          "@type": "Offer",
          description: "Professional tent rental packages"
        },
        url: `${ORIGIN}/en/tent-rental`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "180",
          bestRating: "5"
        },
      },
      {
        "@type": "WebPage",
        name: "Tent Rental | Professional Event Structures | Sahneva",
        description: "Pagoda, transparent dome and industrial tent rental with flooring, lighting, climate control and nationwide installation.",
        url: `${ORIGIN}/en/tent-rental`,
        mainEntity: {
          "@type": "Service",
          name: "Tent Rental"
        }
      }
    ],
  };

  return (
    <Script
      id="ld-json-tent"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Page component ================== */
export default function Page() {
  const baseUrl = ORIGIN;
  const canonical = `${baseUrl}/en/tent-rental`;
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/en` },
    { name: "Services", url: `${baseUrl}/en/services` },
    { name: "Tent Rental", url: canonical },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLd />
      <Hero />
      <Services />
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
