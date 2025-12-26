// app/en/led-screen-rental/page.js
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
  "Hello%2C+I'd+like+to+request+a+quote+for+LED+screen+rental.+Event+type%3A+%5Bconcert%2Fexpo%2Flaunch%5D%2C+Date%3A+%5Bdd.mm.yyyy%5D%2C+Screen+size%3A+%5Bxxx%5D.";
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
  title: "LED Screen Rental | Professional LED Wall Solutions | Sahneva",
  description:
    "P2–P6 pixel pitch, 4K processors and ultra-bright LED wall rentals. Indoor/outdoor, concert, expo and corporate event solutions across Turkey.",
  alternates: { canonical: `${ORIGIN}/en/led-screen-rental` },
  openGraph: {
    title: "LED Screen Rental | Professional Solutions",
    description:
      "Indoor and outdoor LED screen rental with P2–P6 pixel pitch, high brightness, IP65 protection and certified installation.",
    url: `${ORIGIN}/en/led-screen-rental`,
    type: "website",
    siteName: "Sahneva",
    locale: "en_US",
    images: [{
      url: `${ORIGIN}/img/hizmet-led-ekran.webp`,
      width: 1200,
      height: 630,
      alt: "Sahneva LED screen rental - professional visual solutions"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Screen Rental | Professional LED Wall Solutions | Sahneva",
    description:
      "LED screen rental with high brightness, 4K processors and nationwide certified crews for concerts, expos and corporate events.",
    images: [`${ORIGIN}/img/hizmet-led-ekran.webp`],
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

/* ================== Helpers & data ================== */
const slugify = (s) =>
  s.toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const HERO = {
  src: "/img/hizmet-led-ekran.webp",
  alt: "Professional LED screen installation – concert stage with a large LED wall and visual show",
  sizes: "(max-width: 768px) 100vw, 100vw",
};

const SERVICES = [
  {
    icon: "🖥️",
    title: "Indoor LED Screens",
    description: "High-resolution displays with P2.5–P3.9 pixel pitch for close viewing distances",
    features: ["P2.5–P3.9 pixel pitch", "800–1500 nit brightness", "4K-ready processors", "Rapid installation"],
  },
  {
    icon: "🌞",
    title: "Outdoor LED Screens",
    description: "Weather-proof LED walls with P4–P6 pixel pitch and ultra brightness",
    features: ["P4–P6 pixel pitch", "5000–6500+ nit", "IP65 weatherproof", "UV-resistant panels"],
  },
  {
    icon: "🎬",
    title: "Video Wall Systems",
    description: "Modular video wall configurations for creative layouts and scenic designs",
    features: ["Modular design", "Flexible configurations", "High refresh rates", "Professional controllers"],
  },
  {
    icon: "⚡",
    title: "Control & Broadcast Systems",
    description: "Professional video processing, routing and live broadcast solutions",
    features: ["Novastar processors", "4K scaling", "Media servers", "Live streaming support"],
  },
  {
    icon: "🔧",
    title: "Installation & Rigging",
    description: "Certified rigging teams, truss structures and full safety solutions",
    features: ["Ground stack setups", "Truss rigging", "Safety systems", "Fast assembly"],
  },
  {
    icon: "🎮",
    title: "Operator & Technical Support",
    description: "Experienced LED operators and 24/7 technical response",
    features: ["Professional operators", "Content management", "24/7 technical support", "Emergency response"],
  },
];

const USE_CASES = [
  {
    icon: "🎵",
    text: "Concerts, festivals and stage performances",
    desc: "Main stage LED walls with side screens and IMAG support"
  },
  {
    icon: "💼",
    text: "Corporate launches and conferences",
    desc: "Professional presentation backdrops and brand showcases"
  },
  {
    icon: "🎪",
    text: "Trade shows and exhibitions",
    desc: "Booth integrations and interactive digital displays"
  },
  {
    icon: "🏟️",
    text: "Sports events and stadiums",
    desc: "Giant screens, scoreboards and fan engagement content"
  },
  {
    icon: "🛍️",
    text: "Retail venues and shopping malls",
    desc: "Advertising loops and informational signage"
  },
  {
    icon: "💒",
    text: "Weddings and private celebrations",
    desc: "Live ceremony broadcasts and photo/video displays"
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
          Premium <span className="gradient-text gradient-text--safe-xl">LED Screen Rental</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
          Concerts • Trade shows • Launch events • Festivals • Corporate productions
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-6">
          P2–P6 pixel pitch, 4K processing and ultra brightness for
          <span className="font-semibold text-white"> immersive visual experiences</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Request an LED screen quote on WhatsApp (opens in a new tab)"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-2">💬</span>
            <span className="text-base">Get a fast quote</span>
            <span className="sr-only">(opens in a new tab)</span>
          </Link>

          <Link
            href="#services"
            aria-label="Explore our LED screen services"
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
            <div className="text-white/80 text-sm">183+ client reviews</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-2xl mb-2" aria-hidden="true">🏆</span>
            <div className="text-xl font-black text-white">300+</div>
            <div className="text-white/80 text-sm">Completed projects</div>
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
            Professional <span className="gradient-text gradient-text--safe-xl">services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            LED screen rental with technical consultancy, installation, operation and 24/7 support
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
            aria-label="Request a detailed proposal on WhatsApp (opens in a new tab)"
          >
            <span aria-hidden="true" className="text-xl mr-3">📞</span>
            <span>Request a detailed proposal</span>
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Gallery ================== */
const GALLERY_IMAGES = [
  {
    src: "/img/galeri/led-ekran-kiralama-1.webp",
    alt: "Large LED wall built on a concert stage during a live performance"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-2.webp",
    alt: "LED screen at a corporate event with presentation visuals and professional lighting"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "High-brightness LED wall at an outdoor festival delivering crisp daylight visuals"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-4.webp",
    alt: "Video wall inside a trade show booth showcasing branded content"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-5.webp",
    alt: "Giant LED screen inside a stadium displaying live scores and footage"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-6.webp",
    alt: "LED screen at a wedding streaming live photos and videos"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-7.webp",
    alt: "Professional LED backdrop inside a TV studio prepared for live broadcast"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-8.webp",
    alt: "Advertising LED screen inside a shopping mall for high-traffic promotion"
  },
];

function Gallery() {
  return (
    <section className="py-20 bg-white" aria-labelledby="galeri-baslik">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="galeri-baslik" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Project <span className="gradient-text gradient-text--safe-xl">gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Highlights from LED screen installations we delivered across Turkey
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <CaseGallery images={GALLERY_IMAGES} visibleCount={8} priorityCount={2} />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Discover more projects and creative LED wall configurations
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
      category: "pixel",
      title: "Pixel technologies",
      description: "P2.5–P6 pixel pitch options tailored to every audience distance",
      features: ["P2.5: Premium indoor detail", "P3.9: Hybrid use", "P4: Outdoor standard", "P6: Long-distance viewing"]
    },
    {
      category: "brightness",
      title: "Brightness & visibility",
      description: "Optimised luminance for indoor venues and open-air sunlight",
      features: ["Indoor: 800–1500 nit", "Outdoor: 3500–6500 nit", "Auto brightness control", "Daylight clarity"]
    },
    {
      category: "protection",
      title: "Protection systems",
      description: "Weather-resistant cabinets with IP-rated sealing and robust build",
      features: ["IP65 front protection", "IP54 rear sealing", "UV-resistant housing", "Dust-proof modules"]
    },
    {
      category: "control",
      title: "Control systems",
      description: "Professional video processing, switching and redundancy",
      features: ["Novastar processors", "4K video scaling", "Media servers", "Remote monitoring"]
    },
    {
      category: "rigging",
      title: "Rigging systems",
      description: "Engineered structures for rapid and safe installations",
      features: ["Ground stack platforms", "Truss rigging", "Motorised hoists", "Quick-lock mechanisms"]
    },
    {
      category: "support",
      title: "Technical support",
      description: "Round-the-clock engineers with backup inventory and diagnostics",
      features: ["24/7 technical hotline", "Spare module stock", "Rapid response crew", "Remote diagnostics"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="technical-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="technical-title" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Technical <span className="gradient-text gradient-text--safe-xl">infrastructure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We deploy the latest LED technology and certified infrastructure for every production
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technicalItems.map((item) => (
            <div key={item.category} className="group">
              <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-500 h-full">
                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {item.category === "pixel" && "🔍"}
                    {item.category === "brightness" && "☀️"}
                    {item.category === "protection" && "🛡️"}
                    {item.category === "control" && "🎮"}
                    {item.category === "rigging" && "⚡"}
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

/* ================== Performance stats ================== */
function StatsBand() {
  const stats = [
    { value: "300+", label: "Delivered productions", icon: "🎬" },
    { value: "50+", label: "Enterprise clients", icon: "🏢" },
    { value: "81", label: "Cities served", icon: "🗺️" },
    { value: "5+", label: "Years of experience", icon: "⭐" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white" aria-label="Our performance statistics">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="text-center group"
              role="group"
              aria-labelledby={`led-stat-${index}-value`}
              aria-describedby={`led-stat-${index}-label`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-500 group-hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {stat.icon}
                </div>
                <h3
                  id={`led-stat-${index}-value`}
                  className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-lg"
                >
                  {stat.value}
                </h3>
                <p
                  id={`led-stat-${index}-label`}
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
            Where our <span className="gradient-text gradient-text--safe-xl">LED walls shine</span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Key event types that benefit from our LED screen packages and specialist workflows
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
            aria-label="Request a tailored solution for your event on WhatsApp (opens in a new tab)"
          >
            <span aria-hidden="true" className="text-xl mr-3">💬</span>
            <span>Request a tailored solution for your event</span>
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================== Knowledge & guides ================== */
function Articles() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50" aria-labelledby="guides-title">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 id="guides-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Knowledge & <span className="gradient-text gradient-text--safe-xl">professional guidance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert insight and technical tips for choosing LED walls for any production
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ana Makale */}
          <article className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <header className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">📚 Comprehensive guide</span>
                  <span className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">⭐ Expert insight</span>
                  <span className="bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">🎯 Practical solutions</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  LED Screen Rental: Visual excellence for standout events
                </h3>
                <p className="text-blue-100 mt-4 text-lg md:text-xl leading-relaxed">
                  Deliver flawless performances with the latest LED walls, certified rigging and on-site visual production
                </p>
              </div>
            </header>

            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-em:text-gray-600 prose-ul:mt-6 prose-ul:mb-6 prose-li:marker:text-blue-500">
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-600 rounded-2xl p-3" aria-hidden="true">🖥️</span>
                      LED display technologies
                    </h4>
                    <p>
                      <strong className="text-gray-900">Sahneva</strong> delivers enterprise-grade
                      <Link href="/en/led-screen-rental" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        LED screen rental services
                      </Link>{" "}
                      with nationwide crews, engineering and logistics.
                    </p>
                    <p>
                      From indoor concerts to open-air festivals we manage technical surveys, pixel pitch optimisation,
                      professional assembly and live operation as a
                      <strong className="text-gray-900"> turnkey package</strong>.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                      <span className="bg-purple-100 text-purple-600 rounded-2xl p-3" aria-hidden="true">🌞</span>
                      Brightness and visibility
                    </h4>
                    <p>
                      Indoor deployments run at 800–1500 nit while outdoor walls reach 3500–6500+ nit, ensuring crisp visuals in any lighting.
                    </p>
                    <p>
                      With P2.5–P6 pixel pitches we tune solutions to the viewing distance, preventing both close-range pixelation and long-range detail loss.
                    </p>
                  </div>
                </div>

                {/* Highlight box */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
                  <h5 className="font-black text-blue-700 text-xl mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">💡</span>
                    Technical selection strategy
                  </h5>
                  <p className="text-gray-700 text-lg mb-0 leading-relaxed">
                    Viewing distance is the defining factor. Choose P2.5–P3.9 for 3–10 m, P4 for 10–25 m and P6 for 25 m+.
                    For outdoor stages prioritise brightness ratings and IP protection to withstand direct sun and weather.
                  </p>
                </div>

                {/* Success factors grid */}
                <div className="mb-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                    <span className="bg-green-100 text-green-600 rounded-2xl p-3" aria-hidden="true">🚀</span>
                    Critical success factors
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: "🎯",
                        title: "Accurate pixel selection",
                        desc: "Pixel pitch aligned with expected viewing distance"
                      },
                      {
                        icon: "📊",
                        title: "Brightness optimisation",
                        desc: "Luminance tuned to venue and ambient light"
                      },
                      {
                        icon: "🔒",
                        title: "Safety systems",
                        desc: "Rigging, power distribution and contingency planning"
                      },
                      {
                        icon: "🎭",
                        title: "Content optimisation",
                        desc: "Content authored for native resolution and aspect"
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
                    Why partner with Sahneva?
                  </h5>
                  <p className="text-yellow-800 mb-0">
                    <strong>5+ years of experience, 300+ successful shows and service across 81 cities</strong>
                    position us as your trusted LED screen partner, backed by cutting-edge equipment,
                    certified crews and 24/7 technical response.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Secondary articles */}
          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Technical installation & operation
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                Professional deployment workflows and live-show management
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <p>
                  Every LED wall build starts with a detailed site survey. We review structural conditions,
                  power distribution, audience sight-lines and available rigging points.
                </p>
                <p>
                  Our certified crew assembles the wall within 2–6 hours, manages cabling and power systems,
                  and completes full testing plus colour calibration before handover.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">📋</span>
                    Installation standards
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-base">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Ground stack platforms or flown truss rigging
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Professional power distribution and UPS systems
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Colour calibration and visual optimisation
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      Spare module strategy and rapid response plan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Tailored solutions by event type
              </h3>
              <p className="text-blue-100 mt-2 text-lg">
                LED wall strategies tuned for every show format
              </p>
            </header>

            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed">
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-600 rounded-xl p-2" aria-hidden="true">🎵</span>
                      Concert & festival staging
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      High brightness, wide viewing angles, live camera integration and multi-screen layouts
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-purple-100 text-purple-600 rounded-xl p-2" aria-hidden="true">💼</span>
                      Corporate experiences
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Ultra-sharp resolution, clear text readability, presentation switching and accurate brand colours
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3 mb-2">
                      <span className="bg-green-100 text-green-600 rounded-xl p-2" aria-hidden="true">🎪</span>
                      Trade shows & exhibits
                    </h4>
                    <p className="text-gray-700 text-base mb-0">
                      Compact footprints, fast deployment, interactive content and durability for heavy footfall
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
      q: "How much does LED screen rental cost?",
      a: "Pricing depends on pixel pitch and total surface area. Indoor P2.5 LED walls start from ₺2,800 per m² and outdoor P4 LED walls from ₺1,800 per m², including certified installation and operator support."
    },
    {
      q: "How long does installation take?",
      a: "Standard LED wall builds take 2–6 hours. Up to 20 m² typically completes within 2–3 hours, 20–50 m² within 3–4 hours and large-format 50 m²+ installs within 4–6 hours. Complex rigging or custom structures may extend to 24 hours."
    },
    {
      q: "Can LED screens operate in rain?",
      a: "Yes. Our outdoor cabinets feature IP65 front protection and can operate safely in rain. The rating ensures full dust protection and resistance to water jets. In extreme storms or high winds we recommend pausing operation for safety."
    },
    {
      q: "Which pixel pitch should I choose?",
      a: "Match the pixel pitch to viewing distance. Pick P2.5–P3.9 for 3–10 m audiences, P4 for 10–25 m and P6 for 25 m+. Indoor events usually select P2.5–P3.9 while outdoor concerts and rallies use P4–P6 for optimal clarity."
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
            Answers to the most common LED screen rental questions
          </p>
        </div>

        <ul className="space-y-6 list-none" aria-label="Frequently asked questions">
          {faqs.map((faq, index) => {
            return (
              <li key={index}>
                <details
                  className="group bg-gray-50 rounded-3xl p-8 hover:bg-gray-100 transition-all duration-500 open:bg-blue-50 open:border-blue-200 border-2 border-transparent open:border"
                >
                  <summary
                    className="cursor-pointer list-none flex items-center justify-between text-xl font-bold text-gray-900"
                    role="button"
                    tabIndex={0}
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
            );
          })}
        </ul>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            Need more details? Our engineers can call you back with tailored advice.
          </p>
          <Link
            href="/en/faq#led"
            className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring"
  aria-label="Explore all LED screen FAQs"
            role="button"
          >
            <span aria-hidden="true" className="text-xl mr-3">📚</span>
            <span className="text-lg">View LED screen FAQs</span>
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
      href: "/en/sound-light-rental",
      title: "Sound & lighting systems",
      icon: "🎵",
      desc: "Concert-grade audio, lighting design and truss solutions"
    },
    {
      href: "/en/stage-rental",
      title: "Stage rental",
      icon: "🛠️",
      desc: "Modular and portable stages engineered for any venue"
    },
    {
      href: "/en/table-chair-rental",
      title: "Table & chair rentals",
      icon: "🪑",
      desc: "Banquet seating, cocktail furniture and layout planning"
    },
    {
      href: "/en/tent-rental",
      title: "Event tents",
      icon: "🎪",
      desc: "Aluminium structure tents and weatherproof covered areas"
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-100/30"
      aria-labelledby="complementary-services-title"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="complementary-services-title"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            Complementary{" "}
            <span className="gradient-text gradient-text--safe-xl">
              services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Additional event technology that completes your LED wall experience
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
            This section lists complementary services that enhance your LED installation.
            Activate any service card to open the relevant English service detail page.
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
              Ready for immersive LED screen solutions?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Share your event plan and we will recommend the ideal LED configuration with free site survey,
              professional consultancy and transparent pricing guarantees.
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
                aria-label="Message us on WhatsApp (opens in a new tab)"
              >
                <span aria-hidden="true" className="text-xl mr-3">💬</span>
                <span className="text-lg">Message us on WhatsApp</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <div className="mt-8 text-blue-200 text-lg">
              📍 Service in 81 cities • ⏰ 24/7 technical support • ⭐ 5+ years of experience
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
        name: "LED Screen Rental Service",
        description: "Professional LED screen rental with P2–P6 pixel pitch, indoor/outdoor LED walls, video wall processors and nationwide certified installation teams.",
          provider: { "@id": ORGANIZATION_ID },
        areaServed: "TR",
        serviceType: "EventProduction",
        offers: {
          "@type": "Offer",
          description: "Comprehensive LED wall rental with installation and operators"
        },
        url: `${ORIGIN}/en/led-screen-rental`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "183",
          bestRating: "5"
        },
      },
      {
        "@type": "WebPage",
        name: "LED Screen Rental | Professional LED Wall Solutions | Sahneva",
        description: "P2–P6 pixel pitch, 4K processing and high-brightness LED wall rentals for indoor/outdoor concerts, trade shows and corporate events across Turkey.",
        url: `${ORIGIN}/en/led-screen-rental`,
        mainEntity: {
          "@type": "Service",
          name: "LED Screen Rental"
        }
      }
    ],
  };

  return (
    <Script
      id="ld-json-led-ekran"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== Page component ================== */
export default function Page() {
  const baseUrl = ORIGIN;
  const canonical = `${baseUrl}/en/led-screen-rental`;
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/en` },
    { name: "Services", url: `${baseUrl}/en/services` },
    { name: "LED Screen Rental", url: canonical },
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
