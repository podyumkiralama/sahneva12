// app/en/about/page.js
import Image from "next/image";
import Link from "next/link";

/* ───── META & ISR ───── */
export const metadata = {
  title: "About Us | Sahneva - Professional Event Technologies",
  description:
    "Over 10 years of nationwide stage rentals, LED video walls, sound & lighting systems and full-scale event production. 700+ completed projects.",
  alternates: { canonical: "https://www.sahneva.com/en/about" },
  openGraph: {
    title: "About Us | Sahneva - Professional Event Technologies",
    description:
      "Professional event solutions across Türkiye with 10+ years of expertise. 700+ successful projects and 98% client satisfaction.",
    url: "https://www.sahneva.com/en/about",
    images: [
      {
        url: "https://www.sahneva.com/img/og-hakkimizda.jpg",
        width: 1200,
        height: 630,
        alt: "Sahneva Team - Professional Event Technologies",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(/\/$/, "");
const ORGANIZATION_ID = `${SITE_URL}/#org`;

/* ───── STRUCTURED DATA ───── */
function AboutStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/en/about#webpage`,
    url: `${SITE_URL}/en/about`,
    name: "About Us | Sahneva - Professional Event Technologies",
    description:
      "Professional stage rentals, LED screens, sound-light systems and event production services",
    mainEntity: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Base64 blur placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/* ───── MAIN COMPONENT ───── */
export default function AboutPage() {
  const PHONE = "+905453048671";
  const WA_TEXT = "Hello%2C+I'm+messaging+from+the+about+page.+I+would+like+to+get+more+information.";
  const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${WA_TEXT}`;

  const TIMELINE = [
    {
      year: "2012",
      title: "Foundation",
      description:
        "We started providing professional stage and audio technologies. This year we built the customer-first service approach that still guides us today.",
      icon: "🚀",
    },
    {
      year: "2016",
      title: "Technology Investment",
      description:
        "We expanded into LED screens and visual systems, strengthening our production capabilities. Our Istanbul-based operation grew across Anatolia.",
      icon: "🖥️",
    },
    {
      year: "2020",
      title: "Corporate Transformation",
      description:
        "We completed our nationwide logistics network and became a trusted partner for large-scale corporate events across Türkiye.",
      icon: "🏢",
    },
    {
      year: "2024",
      title: "Innovation Leadership",
      description:
        "With next-generation gear, digital integrations and live streaming solutions, we created new standards in the sector and surpassed 700 projects.",
      icon: "⚡",
    },
  ];

  const VALUES = [
    {
      icon: "🛡️",
      title: "Quality & Safety",
      description:
        "ISO-standard quality control, occupational safety protocols and scheduled equipment maintenance",
    },
    {
      icon: "⚡",
      title: "Rapid Installation",
      description:
        "Same-day deployment with professional stage and technical delivery within 2-6 hours",
    },
    {
      icon: "💎",
      title: "Premium Equipment",
      description:
        "Latest-generation LED walls, professional sound systems and modular stage solutions",
    },
    {
      icon: "🌍",
      title: "Nationwide Coverage",
      description: "Technical crews and logistics ready to serve all 81 provinces",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Professional technical consultancy before, during and after every installation",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description: "Detailed quotations with budget-friendly options and zero hidden fees",
    },
  ];

  const CLIENTS = [
    "Corporate brands and companies",
    "Municipalities and public institutions",
    "Event and production agencies",
    "Festival and concert organizers",
    "Wedding and private event planners",
    "Expo and trade show firms",
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <AboutStructuredData />

      {/* HERO */}
      <section className="relative flex items-center justify-center overflow-hidden bg-slate-900 pt-20 min-h-[80vh] 2xl:min-h-[85vh]" aria-labelledby="hero-title">
        <div className="absolute inset-0">
          <Image
            src="/img/hakkimizda-hero-corporate.webp"
            alt="Sahneva professional crew with more than a decade of event technology experience"
            fill
            priority
            className="object-cover"
            sizes="100vw"
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
            <span className="text-sm font-bold text-white">Trusted partner since 2012</span>
          </div>

          <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 drop-shadow-2xl">
            About <span className="gradient-text gradient-text--safe-xl">Sahneva</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-light mb-4">
            Event technologies • 10+ years of expertise • 700+ productions
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-normal mb-8">
            As Türkiye's <span className="font-semibold text-white">leading event technology partner</span>, we combine technical excellence with creative execution in every project.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us instantly on WhatsApp"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transform transition-all duration-300 hover:shadow-xl focus-ring shadow-lg"
              role="button"
            >
              <span aria-hidden="true" className="text-xl mr-2">💬</span>
              <span className="text-base">Chat on WhatsApp</span>
            </Link>

            <Link
            href="#timeline"
            aria-label="Discover our company timeline"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-2xl border-2 border-white/50 text-white bg-slate-900/85 backdrop-blur-lg hover:bg-slate-900/95 hover:border-white/70 hover:scale-105 transform transition-all duration-300 focus-ring shadow-lg"
              role="button"
            >
              <span aria-hidden="true" className="text-xl mr-2">📖</span>
              <span className="text-base">Our Story</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <span className="text-2xl mb-2" aria-hidden="true">🎬</span>
              <div className="text-xl font-black text-white">700+</div>
              <div className="text-white/80 text-sm">Completed projects</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <span className="text-2xl mb-2" aria-hidden="true">⭐</span>
              <div className="text-xl font-black text-white">12+</div>
              <div className="text-white/80 text-sm">Years of experience</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <span className="text-2xl mb-2" aria-hidden="true">🗺️</span>
              <div className="text-xl font-black text-white">81</div>
              <div className="text-white/80 text-sm">Cities served</div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        {/* WHO WE ARE */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/50" aria-labelledby="who-we-are-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="who-we-are-title" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
                Who
                <span className="gradient-text gradient-text--safe-xl"> We Are</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Your trusted event technology partner since 2012
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-blue-600">Sahneva</strong> has been one of Türkiye's
                  <strong> leading event production companies</strong> since 2012. With a team specialised in stage rentals, LED walls, sound-light systems and professional installation,
                  we bring every event to life through technical excellence and creative vision.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission is to deliver <strong>reliable, innovative and customer-focused</strong> solutions that handle your technical infrastructure seamlessly and amplify your brand value.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { number: "700+", label: "Completed projects" },
                    { number: "98%", label: "Satisfaction rate" },
                    { number: "81", label: "Cities covered" },
                    { number: "15+", label: "Expert crew" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100"
                      aria-label={`${stat.number} ${stat.label}`}
                    >
                      <div className="text-2xl font-black text-blue-600">{stat.number}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/img/ekip-calisma.webp"
                    alt="Sahneva professional crew preparing a stage and technical setup"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
                <div
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl -z-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl -z-10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-20 bg-gradient-to-br from-blue-50/80 to-purple-50/60" aria-labelledby="values-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="values-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                Our Values &
                <span className="gradient-text gradient-text--safe-xl"> Principles</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The pillars of our quality-driven, trustworthy and customer-centric mindset
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VALUES.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:scale-105"
                >
                  <div className="text-4xl mb-4 gradient-text gradient-text--safe-xl">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="py-20 bg-white" aria-labelledby="timeline-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="timeline-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                Our Journey &
                <span className="gradient-text gradient-text--safe-xl"> Success Story</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" aria-hidden="true" />
            </div>

            <div className="relative">
              <div
                className="absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full hidden lg:block"
                aria-hidden="true"
              />
              <div className="space-y-12 lg:space-y-0">
                {TIMELINE.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col lg:flex-row items-center ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"} mb-8 lg:mb-0`}>
                      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-3xl" aria-hidden="true">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              {item.year}
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 lg:flex items-center justify-center hidden" aria-hidden="true">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg" />
                    </div>

                    <div className="lg:w-1/2 hidden lg:block" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CLIENT PORTFOLIO */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900/95" aria-labelledby="clients-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="clients-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                Trusted
                <span className="gradient-text gradient-text--safe-xl"> Partners</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                For over a decade we have supported corporate brands, public institutions and creative agencies with turnkey production.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {CLIENTS.map((client, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full motion-safe:animate-pulse" aria-hidden="true" />
                    <span className="text-white font-medium group-hover:text-blue-300 transition-colors">{client}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
                <h3 className="text-2xl font-black text-white mb-4">Why thousands of clients choose us</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Technical mastery, reliability and a customer-first mindset allow us to deliver more value with every production.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105"
                    aria-label="Message us on WhatsApp"
                  >
                    💬 Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/30" aria-labelledby="vision-title">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100">
                <div className="text-4xl mb-4" aria-hidden="true">🎯</div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">Our Mission</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To provide <strong>innovative, reliable and sustainable</strong> event technology solutions that elevate our clients' brands, delivering technical excellence and creative vision across Türkiye.
                </p>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Zero-error targets in technical infrastructure",
                    "98%+ success in customer satisfaction",
                    "Continuous innovation and equipment upgrades",
                    "Environmentally conscious and sustainable operations",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-lg border border-purple-100">
                <div className="text-4xl mb-4" aria-hidden="true">🚀</div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">Our Vision</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To become <strong>Türkiye's largest event technology company</strong> by 2028 and grow into a global brand across Europe and the Middle East, setting new standards with digital transformation and green technologies.
                </p>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "100% coverage across all Turkish provinces",
                    "Expansion into Europe and the Middle East",
                    "Event solutions with AR/VR integrations",
                    "Carbon-neutral operations as a strategic goal",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600" aria-labelledby="cta-title">
          <div className="container max-w-4xl mx-auto px-4 text-center text-white">
            <h2 id="cta-title" className="text-4xl md:text-5xl font-black mb-6">
              Let's collaborate on your <span className="text-yellow-300">next production</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Our experienced crew is ready to deliver the most suitable solutions for your event with more than a decade of know-how.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <a
                href={`tel:${PHONE}`}
                className="group bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="Call now for professional consultation"
              >
                <span className="flex items-center justify-center gap-2">📞 Call now</span>
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="Reach us on WhatsApp for a quick quote"
              >
                <span className="flex items-center justify-center gap-2">💬 WhatsApp</span>
              </a>

              <Link
                href="/en/contact"
                className="group bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl border-2 border-white transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                aria-label="Contact us via email form"
              >
                <span className="flex items-center justify-center gap-2">📧 Email</span>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
              <p className="text-white/90 text-sm">
                <strong>⏱️ Response within 2 hours:</strong> During business hours we provide a detailed quotation and professional guidance within two hours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
