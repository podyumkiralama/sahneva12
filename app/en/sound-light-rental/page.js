// app/en/sound-light-rental/page.js
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
  "Hello%2C+I'd+like+to+request+a+quote+for+sound+and+lighting+rental.+Event+type%3A+%5Bconcert%2Fcorporate%5D%2C+Date%3A+%5Bdd.mm.yyyy%5D%2C+Audience+size%3A+%5Bxxx%5D.";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

// Base64 blur placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

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
  title: "Sound & Lighting Rental | Concert-Grade Audio Visual Systems | Sahneva",
  description:
    "Line-array audio, digital mixing consoles, moving-head lighting and truss systems with nationwide crew support for concerts, festivals and corporate events across Türkiye.",
  alternates: { canonical: `${ORIGIN}/en/sound-light-rental` },
  openGraph: {
    title: "Sound & Lighting Rental | Professional Audio Visual Solutions",
    description:
      "Turnkey sound and lighting system rental with acoustic planning, rigging, digital mixing and on-site operation for any scale event.",
    url: `${ORIGIN}/en/sound-light-rental`,
    type: "website",
    siteName: "Sahneva",
    locale: "en_US",
    images: [{
      url: `${ORIGIN}/img/ses-isik/hero.webp`,
      width: 1200,
      height: 630,
      alt: "Sahneva professional sound and lighting system setup"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sound & Lighting Rental | Concert-Grade Audio Visual Systems | Sahneva",
    description:
      "Professional line-array audio, digital consoles, wireless microphones, moving-head lighting, truss and technical crew support across Türkiye.",
    images: [`${ORIGIN}/img/ses-isik/hero.webp`],
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
  src: "/img/ses-isik/hero.webp",
  alt: "Concert stage with line-array speakers, moving-head lighting and live audience",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🔊",
    title: "Line Array & PA Systems",
    description: "High-output audio with even coverage for large audiences",
    features: ["L/R clusters with sub arrays", "Stage monitoring (wedges/IEM)", "FOH mixing & acoustic tuning"],
  },
  {
    icon: "🎛️",
    title: "Digital Consoles & Stageboxes",
    description: "Flexible routing and rapid setup with next-gen mixing systems",
    features: ["32–64ch digital mixing", "Stagebox deployment", "Multitrack recording & playback"],
  },
  {
    icon: "🎤",
    title: "Wireless Microphone Systems",
    description: "Reliable RF management for conferences and live performances",
    features: ["Multi-receiver racks", "Battery & antenna management", "Conference & performance packages"],
  },
  {
    icon: "💡",
    title: "Lighting Design & Fixtures",
    description: "Immersive visuals with moving-head, wash and beam fixtures",
    features: ["RGBW spot, wash, beam", "DMX programming", "Haze and atmospheric effects"],
  },
  {
    icon: "🧱",
    title: "Truss & Rigging Systems",
    description: "Certified aluminium structures and safe rigging solutions",
    features: ["Aluminium truss grids", "Ground support systems", "Professional rigging hardware"],
  },
  {
    icon: "🎚️",
    title: "Live Operation & Technical Crew",
    description: "End-to-end technical direction from rehearsal to teardown",
    features: ["Soundcheck & rehearsals", "Rapid-response technicians", "Post-show dismantle"],
  },
];

const USE_CASES = [
  {
    icon: "🏢",
    text: "Corporate launches and conferences",
    desc: "Keynote audio, stage wash lighting and broadcast feeds",
  },
  {
    icon: "💍",
    text: "Weddings and private celebrations",
    desc: "Warm ambience lighting and crystal-clear speech",
  },
  {
    icon: "🎤",
    text: "Concerts, festivals and live shows",
    desc: "Concert PA systems with visual show lighting",
  },
  {
    icon: "🎓",
    text: "Graduation and school ceremonies",
    desc: "Podium audio, spotlighting and recording support",
  },
  {
    icon: "🏛️",
    text: "Municipality events and public gatherings",
    desc: "Outdoor coverage with delay towers and side fills",
  },
  {
    icon: "🛍️",
    text: "Shopping mall activations and trade fairs",
    desc: "Brand-focused lighting and PA for retail spaces",
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
          Professional <span className="gradient-text gradient-text--safe-xl">Sound & Lighting</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
          Concert • Festival • Launch • Conference
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-6">
          Line-array audio, digital consoles and moving-head fixtures with
          <span className="font-semibold text-white"> turnkey deployment</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Request a WhatsApp proposal now"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">💬</span>
            <span className="text-base">Get a quote</span>
          </Link>

          <Link
            href="#services"
            aria-label="Discover our services"
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
            <div className="text-xl font-black text-white">4.9/5</div>
            <div className="text-white/80 text-sm">250+ reviews</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🏆</span>
            <div className="text-xl font-black text-white">1200+</div>
            <div className="text-white/80 text-sm">Events delivered</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🚀</span>
            <div className="text-xl font-black text-white">81 provinces</div>
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
            Our professional <span className="gradient-text gradient-text--safe-xl">services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete sound and lighting rental including discovery, design, installation, live operation and dismantle
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
            <span>Contact our engineers</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Gallery ================== */
const GALLERY_IMAGES = [
  {
    src: "/img/ses-isik/isik-sistemi.webp",
    alt: "Moving-head lighting rig with stage wash and beam effects",
  },
  {
    src: "/img/ses-isik/ses-sistemi.webp",
    alt: "Line-array speaker system with FOH mixing console",
  },
  {
    src: "/img/ses-isik/3.webp",
    alt: "Aluminium truss and rigging setup for outdoor stage",
  },
  {
    src: "/img/ses-isik/4.webp",
    alt: "Front of house engineer mixing live concert audio",
  },
  {
    src: "/img/ses-isik/5.webp",
    alt: "Stage backdrop LED wall with beam lights and haze",
  },
  {
    src: "/img/ses-isik/6.webp",
    alt: "Lighting control desk with DMX programming interface",
  },
  {
    src: "/img/ses-isik/7.webp",
    alt: "Delay tower speaker arrays for large outdoor event",
  },
  {
    src: "/img/ses-isik/8.webp",
    alt: "Wireless microphone rack with in-ear monitoring setup",
  },
];

function Gallery() {
  return (
    <section className="py-20 bg-white" aria-labelledby="gallery-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="gallery-title" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Project <span className="gradient-text gradient-text--safe-xl">gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Highlights from recent sound and lighting installations delivered by our crew
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery images={GALLERY_IMAGES} visibleCount={8} priorityCount={2} />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Explore more turnkey productions completed for our clients
          </p>
          <Link
            href="/en/projects"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 focus-ring"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">📸</span>
            <span>See all projects</span>
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
      category: "pa",
      title: "Sound systems",
      description: "Line-array and top+sub configurations for clean, even coverage",
      features: ["Line-array deployments", "Subwoofer arrays", "Acoustic measurement & tuning"]
    },
    {
      category: "mixer",
      title: "Mixing & control",
      description: "32–64 channel digital consoles, stageboxes and playback",
      features: ["Digital consoles", "Stagebox systems", "Multitrack recording"]
    },
    {
      category: "wireless",
      title: "Wireless systems",
      description: "Professional RF coordination, antenna distribution and monitoring",
      features: ["Wireless microphones", "RF planning", "Antenna distribution"]
    },
    {
      category: "lighting",
      title: "Lighting systems",
      description: "RGBW wash/beam fixtures, moving-head spots and atmospheric effects",
      features: ["Moving-head fixtures", "LED lighting", "Effect machines"]
    },
    {
      category: "truss",
      title: "Truss & rigging",
      description: "Aluminium structures, ground support towers and certified rigging",
      features: ["Truss systems", "Rigging hardware", "Safety solutions"]
    },
    {
      category: "control",
      title: "Control & software",
      description: "DMX control networks, show programming and calibration software",
      features: ["Lighting consoles", "Programming software", "Measurement tools"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="technical-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="technical-title" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Our technical <span className="gradient-text gradient-text--safe-xl">infrastructure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge equipment inventory operated by experienced engineers and riggers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technicalItems.map((item) => (
            <div key={item.category} className="group">
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-500 h-full">
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {item.category === "pa" && "🔊"}
                    {item.category === "mixer" && "🎛️"}
                    {item.category === "wireless" && "🎤"}
                    {item.category === "lighting" && "💡"}
                    {item.category === "truss" && "🧱"}
                    {item.category === "control" && "🖥️"}
                  </span>
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                <ul className="space-y-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-white text-blue-700 hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">💬</span>
            <span>Plan a technical visit</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Statistics band ================== */
function StatsBand() {
  const stats = [
    { value: "1200+", label: "Events delivered", icon: "🎪" },
    { value: "50+", label: "Enterprise clients", icon: "🏢" },
    { value: "81", label: "Provinces served", icon: "🗺️" },
    { value: "10+", label: "Years of experience", icon: "⭐" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white" aria-label="Performance statistics">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="text-center group"
              role="group"
              aria-labelledby={`stat-${index}-value`}
              aria-describedby={`stat-${index}-label`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-500 group-hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {stat.icon}
                </div>
                <h3
                  id={`stat-${index}-value`}
                  className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg"
                >
                  {stat.value}
                </h3>
                <p
                  id={`stat-${index}-label`}
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
            Where we <span className="gradient-text gradient-text--safe-xl">excel</span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Customised sound and lighting solutions tailored to each event format and venue layout
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
            <span>Request a tailored setup</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Knowledge & guides ================== */
function Articles() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50" aria-labelledby="knowledge-title">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 id="knowledge-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Knowledge & <span className="gradient-text gradient-text--safe-xl">professional guidance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert insights on planning, designing and operating sound and lighting systems
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
                  Professional Sound & Lighting Systems: Complete Solutions for Event Success
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  Corporate-grade standards, rapid installation workflows and measurable quality assurance for flawless experiences
                </p>
              </div>
            </header>

            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-600 prose-ul:mt-6 prose-ul:mb-6 prose-li:marker:text-blue-500">

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-600 rounded-2xl p-3" aria-hidden="true">🔊</span>
                      Sound systems & technology
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong> delivers
                      <Link href="/en/sound-light-rental" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        professional sound system rentals
                      </Link>
                      and
                      <Link href="/en/sound-light-rental" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        lighting system rentals
                      </Link>
                      with corporate-level engineering across Türkiye.
                    </p>
                    <p>
                      Whether your event is an outdoor concert or an indoor summit, our turnkey model covers acoustic discovery, technical design, certified
                      <em className="text-gray-600">truss & rigging</em>
                      and live operation so every workflow is managed by one expert team.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-purple-100 text-purple-600 rounded-2xl p-3" aria-hidden="true">💡</span>
                      Lighting design & programming
                    </h4>
                    <p>
                      Carefully tuned <em className="text-gray-600">line-array</em> systems achieve uniform SPL distribution, while digital consoles and
                      <em className="text-gray-600">stageboxes</em> simplify patching, routing and redundancy.
                    </p>
                    <p>
                      RGBW spot, wash and beam fixtures are synchronised through DMX show files, delivering intelligible speech, dynamic musical performances and a visually rich audience experience.
                    </p>
                  </div>
                </div>

                {/* Success factors */}
                <div className="mb-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                    <span className="bg-green-100 text-green-600 rounded-2xl p-3" aria-hidden="true">🚀</span>
                    Critical success factors
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: "🎯",
                        title: "Detailed discovery",
                        desc: "Acoustic measurements, venue analysis and needs assessment"
                      },
                      {
                        icon: "📊",
                        title: "Line-array simulation",
                        desc: "Predictive coverage planning with professional software"
                      },
                      {
                        icon: "🔒",
                        title: "Safe rigging systems",
                        desc: "Certified equipment and experienced rigging crew"
                      },
                      {
                        icon: "🎭",
                        title: "Show programming",
                        desc: "Soundcheck workflows and cue-based lighting design"
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
                    <strong>10+ years of experience, 1200+ successful events and nationwide coverage</strong>
                    make us a trusted production partner. Premium equipment, specialised crews and 24/7 technical support are included with every project.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Secondary article */}
          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Technical integration & execution workflows
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Show-based lighting programming and professional FOH mixing solutions
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  We plan the optimum placement of audio and lighting based on acoustic coverage, delay and reflection parameters, ensuring every seat experiences the intended mix.
                </p>
                <p>
                  Outdoor events benefit from strategically placed <em className="text-gray-600">delay towers</em>, while indoor venues receive configurations that minimise echo and focus light angles precisely on stage action.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">📋</span>
                    Technical standards & highlights
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Robust DMX topology and secure cabling
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      FOH and monitor mix synchronisation
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      RF coordination for maximum reliability
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Haze, smoke and effect cue planning
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
                Tailored equipment packages for every audience profile and venue layout
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                  <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-blue-600 rounded-xl p-2" aria-hidden="true">🏟️</span>
                    Stadium & festival productions
                  </h4>
                  <p className="text-gray-700 text-base mb-0">
                    High SPL coverage, delay towers, IMAG screens and time-aligned audio for vast crowds
                  </p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                  <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                    <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">🏢</span>
                    Corporate & conference setups
                  </h4>
                  <p className="text-gray-700 text-base mb-0">
                    Premium speech intelligibility, discreet rigging and broadcast-ready audio routing
                  </p>
                </div>

                <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                  <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                    <span className="bg-green-100 text-green-600 rounded-xl p-2" aria-hidden="true">💍</span>
                    Private events & celebrations
                  </h4>
                  <p className="text-gray-700 text-base mb-0">
                    Intimate ambience, soft lighting, high-quality audio and curated special effects
                  </p>
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
      q: "Which sound and lighting package suits my event?",
      a: "We assess your venue size, audience capacity, event format and budget to recommend the optimal package. Our complimentary site survey allows us to analyse the space and tailor the configuration precisely.",
    },
    {
      q: "How long do installation and dismantle take?",
      a: "Indoor setups are typically completed within 4–6 hours, while outdoor productions take around 6–8 hours. Complex rigging projects begin the day before. Dismantle averages 2–4 hours depending on scope.",
    },
    {
      q: "Do you provide live operation and technical staff?",
      a: "Absolutely. Every project includes FOH sound engineers, monitor engineers and lighting operators who manage the show end-to-end. Our emergency technical response line is available 24/7.",
    },
    {
      q: "How is power distribution handled?",
      a: "Transport, installation and operation are on us. We gather generator or venue power details from you, then coordinate electrical requirements with our certified electricians and professional distribution systems.",
    },
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="faq-title">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 id="faq-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Frequently asked <span className="gradient-text gradient-text--safe-xl">questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Answers to the most common questions about sound and lighting rentals
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 open:bg-blue-50 open:border-blue-200 border-2 border-transparent open:border"
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between text-xl font-bold text-gray-900"
                tabIndex={0}
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
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Still have questions? Our specialists can call you back with detailed guidance.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
  aria-label="See all answers on the English contact page"
          >
            <span aria-hidden="true" className="text-xl mr-3">📚</span>
            <span className="text-lg">Talk to our team</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Complementary services ================== */
function RelatedServices() {
  const services = [
    {
      href: "/en/led-screen-rental",
      title: "LED screen rental",
      icon: "🖥️",
      desc: "High-resolution LED walls and creative video backdrops",
    },
    {
      href: "/en/stage-rental",
      title: "Stage rental",
      icon: "🛠️",
      desc: "Modular stage platforms, truss roofs and scenic builds",
    },
    {
      href: "/en/table-chair-rental",
      title: "Table & chair rentals",
      icon: "🪑",
      desc: "Banquet seating, conference setups and styling",
    },
    {
      href: "/en/tent-rental",
      title: "Event tents",
      icon: "🎪",
      desc: "Aluminium structure tents and weather-ready enclosures",
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
            Complementary
            <span className="gradient-text gradient-text--safe-xl">
              services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Additional event technology that enhances your sound and lighting experience
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
            This section contains complementary services that complete your sound and lighting setup.
            Activate any card to open the related English service detail page.
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
              Ready for professional sound & lighting?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Share your event details and we will design the ideal sound and lighting configuration. Enjoy free discovery, expert consultancy and competitive pricing.
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
              📍 Service across 81 provinces • ⏰ 24/7 technical support • ⭐ 10+ years of expertise
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
        name: "Sound & Lighting System Rental",
        description: "Professional sound and lighting rental services with line-array speakers, digital consoles, wireless microphones, moving-head lights, truss systems and live operation across Türkiye.",
          provider: { "@id": ORGANIZATION_ID },
        areaServed: "TR",
        serviceType: "EventProduction",
        offers: {
          "@type": "Offer",
          description: "Professional sound and lighting system rental service"
        },
        url: `${ORIGIN}/en/sound-light-rental`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "250",
          bestRating: "5"
        },
      },
      {
        "@type": "WebPage",
        name: "Sound & Lighting Rental | Concert-Grade Audio Visual Systems | Sahneva",
        description: "Line-array audio, digital mixing consoles, moving-head lighting and truss systems with nationwide crew support for concerts, festivals and corporate events across Türkiye.",
        url: `${ORIGIN}/en/sound-light-rental`,
        mainEntity: {
          "@type": "Service",
          name: "Sound & Lighting Rental"
        }
      }
    ],
  };

  return (
    <Script
      id="ld-json-sound-light"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Page component ================== */
export default function Page() {
  const baseUrl = ORIGIN;
  const canonical = `${baseUrl}/en/sound-light-rental`;
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/en` },
    { name: "Services", url: `${baseUrl}/en/services` },
    { name: "Sound & Light Rental", url: canonical },
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
