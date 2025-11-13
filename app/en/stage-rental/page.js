// app/en/stage-rental/page.jsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

/* ================== Constants ================== */
export const revalidate = 1800;
const ORIGIN = "https://www.sahneva.com";
const PHONE = "+905453048671";
const WHATSAPP = "https://wa.me/905453048671";

// Simple blur placeholder (1×1 px)
const BLUR_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

/* ================== Dynamic gallery ================== */
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => (
    <div
      className="flex justify-center items-center h-64"
      role="status"
      aria-label="Gallery is loading"
    >
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        aria-hidden="true"
      />
      <span className="sr-only">Gallery is loading…</span>
    </div>
  ),
  ssr: false,
});

/* ================== SEO / Metadata ================== */

export const metadata = {
  title: "Stage Rental | Professional Stage Systems & Truss – Sahneva",
  description:
    "Modular stages, truss structures, stairs, railings and complete technical setup for concerts, corporate events, fairs and launches. Safe and aesthetic stage rental across Turkey.",
  alternates: {
    canonical: `${ORIGIN}/en/stage-rental`,
    languages: {
      "tr-TR": `${ORIGIN}/sahne-kiralama`,
      "en-US": `${ORIGIN}/en/stage-rental`,
      "x-default": `${ORIGIN}/en/stage-rental`,
    },
  },
  openGraph: {
    title: "Stage Rental | Professional Stage Systems – Sahneva",
    description:
      "Turn-key stage rental services with modular platforms, truss, sound and lighting systems for your events across Turkey.",
    url: `${ORIGIN}/en/stage-rental`,
    type: "website",
    siteName: "Sahneva",
    locale: "en_US",
    images: [
      {
        url: `${ORIGIN}/img/hizmet-sahne.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Professional Stage Rental – Concert stage, truss and LED screen setup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stage Rental | Professional Stage Systems – Sahneva",
    description:
      "Safe, modular and visually impressive stages for concerts, launches and corporate events.",
  },
};

/* ================== Content data ================== */

const HERO = {
  src: "/img/hizmet-sahne.webp",
  alt: "Professional stage setup with truss, LED screen and lighting effects",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🎭",
    title: "Modular Stage Platforms",
    description:
      "1×1 m and 2×1 m podium panels for flexible and fast stage configurations.",
    features: [
      "1×1 & 2×1 m panels",
      "Modular structure",
      "Quick installation",
      "Flexible layout options",
    ],
  },
  {
    icon: "🏗️",
    title: "Truss & Rigging Systems",
    description:
      "Aluminium truss structures, professional rigging and safety equipment.",
    features: [
      "Aluminium truss grids",
      "Professional rigging",
      "Certified safety equipment",
      "Static calculations",
    ],
  },
  {
    icon: "🪜",
    title: "Stairs, Railings & Ramps",
    description:
      "Safe access with stairs, side railings and disabled access ramps.",
    features: [
      "Front & side stairs",
      "Perimeter railings",
      "Disabled access ramp options",
      "Non-slip surfaces",
    ],
  },
  {
    icon: "🎚️",
    title: "Integrated Sound & Light",
    description:
      "Stage design combined with sound and lighting for a complete experience.",
    features: [
      "Line-array sound systems",
      "Moving head & wash fixtures",
      "Show & effect lighting",
      "Front and back truss lighting",
    ],
  },
];

const PACKAGES = [
  {
    id: "mini-stage",
    name: "Mini Stage — 16 m²",
    badge: "Small Events",
    specs: {
      area: "16 m²",
      dimensions: "4×4 m",
      height: "40 cm",
      truss: "6 m front truss",
    },
    includes: [
      "8 × (2×1 m) podium – 16 m²",
      "Stage height 40 cm",
      "Front stairs",
      "Front truss (6 m)",
      "Basic sound & lighting (optional)",
      "Setup & dismantling",
    ],
    note: "Ideal for boutique events, speeches and indoor venues.",
  },
  {
    id: "standard-stage",
    name: "Standard Stage — 32 m²",
    badge: "Corporate & Medium Scale",
    specs: {
      area: "32 m²",
      dimensions: "8×4 m",
      height: "60 cm",
      truss: "8–10 m front truss",
    },
    includes: [
      "16 × (2×1 m) podium – 32 m²",
      "Stage height 60 cm",
      "Front stairs + side railings",
      "Front truss (8–10 m)",
      "Sound & light package according to venue",
      "Setup, tests and dismantling",
    ],
    note: "Perfect for launches, conferences, award ceremonies and gala nights.",
  },
  {
    id: "concert-stage",
    name: "Concert Stage — 48 m²+",
    badge: "Large Scale",
    highlight: "Most Preferred",
    specs: {
      area: "48 m²+",
      dimensions: "8×6 m (or custom)",
      height: "80–100 cm",
      truss: "Front + side tower truss",
    },
    includes: [
      "24 × (2×1 m) podium – 48 m²+",
      "Stage height 80–100 cm, ramp/railings",
      "12 m front truss + side tower truss",
      "Line-array PA, monitors, backline infrastructure",
      "LED screen (e.g. 5×3 m) + processor",
      "Moving heads, wash, blinders, haze",
      "Setup, soundcheck, show operation and dismantling",
    ],
    note: "For concerts, festivals and large open-air events.",
  },
];

const TECH_FEATURES = [
  {
    icon: "🧱",
    title: "Safe Load Capacity",
    desc: "High load-bearing stage panels and leg systems suitable for heavy backline, LED screens and large groups.",
  },
  {
    icon: "🛡️",
    title: "Static & Safety",
    desc: "Static calculations, anchoring solutions and rigging safety procedures for truss and stage structures.",
  },
  {
    icon: "🌧️",
    title: "Indoor / Outdoor Solutions",
    desc: "Stage and truss solutions suitable for indoor venues, fairgrounds and open-air areas.",
  },
  {
    icon: "⚡",
    title: "Quick Setup & Flexible Schedule",
    desc: "Teams experienced in working with tight event schedules and night setups.",
  },
];

const USE_CASES = [
  {
    icon: "🏆",
    title: "Corporate Events & Launches",
    desc: "Product launches, company meetings, awards, openings and gala nights.",
  },
  {
    icon: "🎵",
    title: "Concerts & Festivals",
    desc: "Open-air concerts, city festivals, university events and live performances.",
  },
  {
    icon: "🏬",
    title: "Shopping Mall Events",
    desc: "Brand promotions, stage shows and seasonal campaigns in shopping malls.",
  },
  {
    icon: "🎤",
    title: "Conferences & Panels",
    desc: "Conference, panel, seminar and talk stages with professional sound & light.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How are stage rental prices calculated?",
    a: "Stage rental prices depend on the total stage size (m²), height, installation surface, event duration, city and additional truss / sound / lighting needs. After you share your event details, we prepare a clear and itemised quote.",
  },
  {
    q: "Can you design a custom stage size?",
    a: "Yes. Thanks to our modular podium system, we can design stages in many different sizes such as 4×4, 6×4, 8×6 m and more. We also adjust the height according to the venue and visibility needs.",
  },
  {
    q: "Do you also provide sound and lighting with the stage?",
    a: "We can provide only the stage or a turn-key solution including sound system, lighting, truss structure and LED screens, depending on your needs.",
  },
  {
    q: "How long does installation take?",
    a: "Installation time varies depending on the stage size and technical infrastructure. For small and medium stages, installation is usually completed within 2–4 hours. For concert stages, this may extend up to one day.",
  },
];

/* ================== JSON-LD ================== */

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${ORIGIN}/en/stage-rental#service`,
    name: "Stage Rental",
    description:
      "Professional stage rental, truss systems and technical setup for concerts, corporate events and launches across Turkey.",
    provider: {
      "@type": "Organization",
      name: "Sahneva",
      url: ORIGIN,
    },
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Stage Rental Packages",
      itemListElement: PACKAGES.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name,
        description: pkg.note,
        areaServed: "TR",
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ================== HERO ================== */

function Hero() {
  return (
    <section
      className="relative flex items-center justify-center bg-slate-900 pt-20 min-h-[80vh]"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          className="object-cover"
          sizes={HERO.sizes}
          quality={85}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-800/70 to-blue-950/90"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-purple-900/60"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white py-12">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30 mb-6">
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
          </span>
          <span className="text-sm font-bold text-white">
            Professional Stage Rental Across Turkey
          </span>
        </div>

        <h1
          id="hero-title"
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl"
        >
          Professional{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300">
            Stage Systems
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-lg text-white/80 mb-6">
          Modular stages, truss structures, stairs, railings and complete technical
          infrastructure for concerts, corporate events, fairs and launches.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            <span aria-hidden="true" className="mr-2">
              📞
            </span>
            Call Now
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-semibold shadow-lg hover:bg-white/20 hover:scale-105 transition-all border border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
          >
            <span aria-hidden="true" className="mr-2">
              💬
            </span>
            WhatsApp Quote
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================== SERVICES ================== */

function Services() {
  return (
    <section
      className="py-16 bg-white"
      aria-labelledby="services-title"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2
            id="services-title"
            className="text-3xl md:text-4xl font-black text-slate-900 mb-3"
          >
            Stage Rental{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Services
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            From small corporate events to large concerts, we design the most
            suitable and safe stage infrastructure for your event.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <article
              key={service.title}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-blue-200"
            >
              <div className="flex items-start gap-4 p-6">
                <span
                  className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                  aria-hidden="true"
                >
                  {service.icon}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-3">{service.description}</p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-500"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== GALLERY ================== */

function Gallery() {
  return (
    <section
      className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      aria-labelledby="gallery-title"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2
            id="gallery-title"
            className="text-3xl md:text-4xl font-black text-white mb-3"
          >
            Stage{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              References
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            A selection of stage, truss and LED screen setups we have completed for
            concerts, corporate events and launches.
          </p>
        </header>

        <CaseGallery />
      </div>
    </section>
  );
}

/* ================== PACKAGES ================== */

function Packages() {
  return (
    <section
      className="py-16 bg-white"
      aria-labelledby="packages-title"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2
            id="packages-title"
            className="text-3xl md:text-4xl font-black text-slate-900 mb-3"
          >
            Stage Rental{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Packages
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            You can choose one of our frequently used stage sizes, or we can
            design a completely custom setup for your event.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative flex flex-col rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
                pkg.highlight
                  ? "border-blue-400/80 ring-2 ring-blue-100"
                  : "border-slate-100 hover:border-blue-200"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-semibold text-white shadow-lg">
                  {pkg.highlight}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {pkg.badge}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {pkg.name}
                </h3>

                <dl className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-4">
                  <div>
                    <dt className="font-semibold">Area</dt>
                    <dd>{pkg.specs.area}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Dimensions</dt>
                    <dd>{pkg.specs.dimensions}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Height</dt>
                    <dd>{pkg.specs.height}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Truss</dt>
                    <dd>{pkg.specs.truss}</dd>
                  </div>
                </dl>

                <ul className="space-y-1 text-sm text-slate-700 mb-4">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-blue-500"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-slate-500 mt-auto">{pkg.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== TECHNICAL ================== */

function Technical() {
  return (
    <section
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50"
      aria-labelledby="technical-title"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2
            id="technical-title"
            className="text-3xl md:text-4xl font-black text-slate-900 mb-3"
          >
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Infrastructure
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            We plan the entire technical infrastructure from stage height to truss
            systems and sound & light placement.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {TECH_FEATURES.map((item) => (
            <article
              key={item.title}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-700">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== USE CASES ================== */

function UseCases() {
  return (
    <section
      className="py-16 bg-slate-950"
      aria-labelledby="usecases-title"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2
            id="usecases-title"
            className="text-3xl md:text-4xl font-black text-white mb-3"
          >
            Where Can You{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Use Our Stages?
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            From corporate events to major concerts, our stage systems are suitable
            for many different types of events.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((item) => (
            <article
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white shadow-sm hover:bg-white/10 hover:border-blue-400/60 transition-all duration-300"
            >
              <div className="text-2xl mb-2" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-white/80">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== FAQ ================== */

function FAQ() {
  return (
    <section
      className="py-16 bg-white"
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2
            id="faq-title"
            className="text-3xl md:text-4xl font-black text-slate-900 mb-3"
          >
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Questions
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Answers to the most common questions about stage rental and technical
            setup.
          </p>
        </header>

        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-3 open:shadow-md open:border-blue-300 transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-semibold text-slate-900 text-sm md:text-base">
                  {item.q}
                </span>
                <span
                  className="ml-3 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-600 group-open:rotate-45 transition-transform"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== RELATED SERVICES ================== */

function RelatedServices() {
  const services = [
    {
      href: "/en/led-screen-rental",
      label: "LED Screen Rental",
      description: "Indoor / outdoor LED screens, processors and truss systems.",
    },
    {
      href: "/en/sound-light-systems",
      label: "Sound & Light Systems",
      description: "Line-array sound systems, lighting and show control.",
    },
    {
      href: "/en/canopy-tent-rental",
      label: "Canopy & Tent Rental",
      description: "Canopy, tent and complementary event infrastructure.",
    },
  ];

  return (
    <section
      className="py-16 bg-slate-950"
      aria-labelledby="related-title"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2
            id="related-title"
            className="text-2xl md:text-3xl font-black text-white mb-3"
          >
            Complementary{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Services
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            In addition to stage rental, you can also benefit from our LED screens,
            sound, lighting and tent solutions.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white hover:border-blue-400/70 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                {service.label}
              </h3>
              <p className="text-xs md:text-sm text-white/80 mb-3">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="inline-flex items-center text-xs md:text-sm font-semibold text-blue-300 hover:text-blue-200"
              >
                View service
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== CTA ================== */

function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 via-purple-700 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Let&apos;s Design the Right Stage for Your Event
          </h2>
          <p className="text-sm md:text-base text-white/80 mb-6">
            Share your event details, we&apos;ll recommend the most suitable stage size,
            truss structure and technical infrastructure and prepare a clear quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <span aria-hidden="true" className="mr-2">
                💬
              </span>
              Get WhatsApp Quote
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/70 text-white font-semibold hover:bg-white/10 hover:scale-105 transition-all"
            >
              <span aria-hidden="true" className="mr-2">
                📞
              </span>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== PAGE ================== */

export default function Page() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Services />
      <Gallery />
      <Packages />
      <Technical />
      <UseCases />
      <FAQ />
      <RelatedServices />
      <CTA />
    </>
  );
}
