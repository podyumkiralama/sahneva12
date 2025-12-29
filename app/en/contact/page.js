// app/en/contact/page.js
import Link from "next/link";

export const metadata = {
  title: "Contact | Sahneva - Professional Event Solutions",
  description:
    "Reach Sahneva for stage rentals, LED screens and turnkey technical production. Fast nationwide installation and dedicated consultants across Türkiye.",
  alternates: {
    canonical: "https://www.sahneva.com/en/contact",
    languages: {
      "tr-TR": "https://www.sahneva.com/iletisim",
    },
  },
  openGraph: {
    title: "Contact | Sahneva - Professional Event Solutions",
    description:
      "Request a proposal for stage, LED screen or sound-lighting systems. Nationwide coverage with rapid mobilisation and on-site experts.",
    url: "https://www.sahneva.com/en/contact",
    images: [
      {
        url: "/img/og-iletisim.jpg",
        width: 1200,
        height: 630,
        alt: "Sahneva Contact - Professional Event Solutions",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

const PHONE = "+905453048671";
const MAIL = "info@sahneva.com";
const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(
  "Hello, I'm reaching out from the Sahneva website. I'd like to request an event proposal."
)}`;

const GMB_PROFILE_URL = "https://g.page/r/CZhkMzkNOdgnEBI";
const GMB_REVIEW_URL = "https://g.page/r/CZhkMzkNOdgnEBI/review";
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com"
).replace(/\/$/, "");
const ORGANIZATION_ID = `${SITE_URL}/#org`;

/* ───── STRUCTURED DATA (Rich Snippet) ───── */
function ContactStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Sahneva Contact",
    description:
      "Professional stage rental, LED screen and sound-light systems contact information",
    url: "https://www.sahneva.com/en/contact",
    mainEntity: {
      "@id": ORGANIZATION_ID,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ContactStructuredData />

      {/* HERO */}
      <section
        className="relative min-h-[60vh] 2xl:min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-16 lg:pt-20"
        aria-labelledby="hero-title"
      >
        {/* Gradient accents */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse delay-500" />
        </div>

        {/* Background text */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-5 select-none"
          aria-hidden="true"
        >
          <span className="text-[100px] lg:text-[160px] font-black text-white tracking-wider">
            CONTACT
          </span>
        </div>

        <div className="relative z-10 container text-center text-white">
          
            <div className="max-w-4xl 2xl:max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">
                  24/7 Technical Support
                </span>
              </div>

              <h1
                id="hero-title"
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              >
                <span className="block">GET IN</span>
                <span className="gradient-text gradient-text--safe-xl">
                  Touch
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl 2xl:max-w-4xl mx-auto">
                Tell us about your event so we can deliver the
                {" "}
                <strong className="text-blue-300">best technical solution</strong>.
                <br />
                <strong className="text-purple-300">Detailed proposals</strong> are prepared within 2 hours.
              </p>
            </div>
          
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      <div id="main" className="relative pb-28 md:pb-0">
        {/* Quick contact cards */}
        <section className="py-20 bg-gradient-to-br from-white to-blue-50/50">
          <div className="container max-w-6xl mx-auto px-4">
            
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                  Quick
                  <span className="gradient-text gradient-text--safe-xl">
                    &nbsp;Contact
                  </span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Choose the channel that works for you and we will reply within two hours.
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8" />
              </div>
            

            
              <div
                className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                role="list"
                aria-label="Quick contact options"
              >
                
                  <ContactCard
                    icon="📞"
                    title="Call Us"
                    info="+90 545 304 86 71"
                    description="Speak immediately with our production specialists."
                    href={`tel:${PHONE}`}
                    color="from-blue-700 to-cyan-700"
                    buttonText="Call Now"
                  />
                

                
                  <ContactCard
                    icon="💬"
                    title="WhatsApp"
                    info="Instant Messaging"
                    description="Send us a message and get a rapid response."
                    href={WHATSAPP_URL}
                    color="from-green-700 to-emerald-700"
                    buttonText="Message on WhatsApp"
                  />
                

                
                  <ContactCard
                    icon="✉️"
                    title="Email"
                    info={MAIL}
                    description="Share technical drawings or detailed requirements."
                    href={`mailto:${MAIL}?subject=Sahneva Proposal Request&body=Hello, I'd like to receive a detailed quote for my event.`}
                    color="from-purple-700 to-pink-700"
                    buttonText="Send Email"
                  />
                
              </div>
            
          </div>
        </section>

        {/* Map + Form */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-blue-100/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Map and location */}
              <div className="space-y-8">
                
                  <div className="text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                      Our Location &
                      <span className="gradient-text gradient-text--safe-xl">
                        &nbsp;Contact
                      </span>
                    </h2>
                    <p className="text-xl text-neutral-600 mb-8">
                      We operate nationwide. Use the map to plan a visit to our Istanbul headquarters.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 lg:mx-0 mx-auto" />
                  </div>
                

                
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">
                    <iframe
                      title="Sahneva Location - Professional Event Equipment"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.7561988118778!2d28.97663777518891!3d41.09737131400938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7eef124ac6d%3A0x27d8390d39336498!2sSahneva%20Organizasyon!5e0!3m2!1str!2str!4v1691234567890!5m2!1str!2str"
                      width="100%"
                      height="300"
                      className="w-full nc-ContactPage-map-1"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                

                
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={GMB_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 hover:scale-105 shadow-lg"
                      aria-label="Open Sahneva on Google Maps (opens in a new tab)"
                    >
                      <span className="flex items-center justify-center gap-2">
                        📍 Open in Maps
                      </span>
                    </a>
                    <a
                      href={GMB_REVIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 hover:scale-105 shadow-lg"
                      aria-label="Leave a Google review for Sahneva (opens in a new tab)"
                    >
                      <span className="flex items-center justify-center gap-2">
                        ⭐ Leave a Google Review
                      </span>
                    </a>
                  </div>
                

                
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
                    <h3 className="text-2xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                      <span className="text-3xl">🏢</span>
                      Contact Details
                    </h3>
                    <div className="space-y-4" role="list" aria-label="Direct contact methods">
                      <InfoRow label="Phone" icon="📞">
                        <a
                          href={`tel:${PHONE}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {PHONE}
                        </a>
                      </InfoRow>
                      <InfoRow label="WhatsApp" icon="💬">
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 font-medium"
                          aria-label="Message us on WhatsApp (opens in a new tab)"
                        >
                          Message Now
                        </a>
                      </InfoRow>
                      <InfoRow label="Email" icon="✉️">
                        <a
                          href={`mailto:${MAIL}`}
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          {MAIL}
                        </a>
                      </InfoRow>
                    </div>
                  </div>
                
              </div>

              {/* Proposal form */}
              
                <div
                  className="bg-white rounded-2xl shadow-2xl border border-neutral-200 p-8"
                  id="proposal-form"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-neutral-900 mb-4">
                      Request a
                      <span className="gradient-text gradient-text--safe-xl">
                        &nbsp;Proposal
                      </span>
                    </h2>
                    <p className="text-neutral-600">
                      Share your event details and receive a tailored quotation within two hours.
                    </p>
                  </div>

                  <form
                    action="https://formspree.io/f/xanppven"
                    method="POST"
                    acceptCharset="UTF-8"
                    className="space-y-6"
                  >
                    <div
                      className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-900"
                      role="status"
                      aria-live="polite"
                    >
                      All fields marked with * are required. Please make sure your phone number includes the
                      country code and your email address is valid so we can reach you without delay.
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-neutral-700 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your name"
                          aria-describedby="name-help"
                          className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60"
                          required
                          autoComplete="name"
                          inputMode="text"
                          title="Please enter your full name so we can address your proposal."
                        />
                        <p id="name-help" className="mt-2 text-xs text-neutral-500">
                          Tell us who to contact for the proposal and follow-up questions.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-neutral-700 mb-2"
                        >
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="+90 ___ ___ __ __"
                          aria-describedby="phone-help"
                          className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60"
                          required
                          autoComplete="tel"
                          inputMode="tel"
                          title="Add your country code and a reachable number for confirmation calls."
                        />
                        <p id="phone-help" className="mt-2 text-xs text-neutral-500">
                          Include the country code so our team can call or message you back promptly.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-neutral-700 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@example.com"
                        aria-describedby="email-help"
                        className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60"
                        required
                        autoComplete="email"
                        inputMode="email"
                        title="Use a valid business email so we can send your quote and drawings."
                      />
                      <p id="email-help" className="mt-2 text-xs text-neutral-500">
                        We will share your proposal and any technical drawings at this address.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="eventType"
                        className="block text-sm font-semibold text-neutral-700 mb-2"
                      >
                        Event Type *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        aria-describedby="event-type-help"
                        className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60"
                        required
                        autoComplete="off"
                      >
                        <option value="">Select your event type</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Concert">Concert</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Festival">Festival</option>
                        <option value="Conference">Conference</option>
                        <option value="Exhibition">Exhibition</option>
                        <option value="Other">Other</option>
                      </select>
                      <p id="event-type-help" className="mt-2 text-xs text-neutral-500">
                        Choosing the closest match helps us suggest the right stage, screen and sound setup.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-neutral-700 mb-2"
                      >
                        Event Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Event date, location, estimated audience and equipment requirements..."
                        rows={5}
                        aria-describedby="message-help"
                        className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60 resize-none"
                        required
                        autoComplete="off"
                        title="Share timing, location, audience size and any technical requirements."
                      />
                      <p id="message-help" className="mt-2 text-xs text-neutral-500">
                        Include the date, venue, audience size and any specific equipment so we can tailor your quote.
                      </p>
                    </div>

                    {/* Formspree hidden fields */}
                    <input
                      type="hidden"
                      name="_subject"
                      value="Sahneva | New Proposal Request"
                    />
                    <input
                      type="hidden"
                      name="_redirect"
                      value="https://www.sahneva.com/tesekkurler"
                    />
                    <input
                      type="text"
                      name="_gotcha"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        🚀 Get My Proposal
                      </span>
                    </button>

                    <p className="text-xs text-neutral-500 text-center">
                      By submitting the form you accept our
                      <Link
                        href="/gizlilik-politikasi"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        &nbsp;privacy policy
                      </Link>
                      .
                    </p>
                  </form>
                </div>
              
            </div>
          </div>
        </section>

        {/* Emergency support */}
        <section className="py-20 bg-gradient-to-br from-neutral-900 to-blue-900/95">
          <div className="container max-w-4xl mx-auto px-4 text-center text-white">
            
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  Emergency
                  <span className="gradient-text gradient-text--safe-xl">
                    &nbsp;Technical Support
                  </span>
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Experiencing a technical issue during your event?
                  <br />
                  Call our emergency hotline for immediate assistance 24/7.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href={`tel:${PHONE}`}
                    className="group bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                    aria-label="Call the emergency technical support line"
                  >
                    <span className="flex items-center justify-center gap-2">
                      🚨 Emergency Hotline
                    </span>
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                    aria-label="Request emergency support on WhatsApp (opens in a new tab)"
                  >
                    <span className="flex items-center justify-center gap-2">
                      💬 WhatsApp Support
                    </span>
                  </a>
                </div>

                <div className="mt-8 p-4 bg-yellow-500/20 rounded-xl border border-yellow-400/30 max-w-2xl mx-auto">
                  <p className="text-yellow-200 text-sm">
                    <strong>⏰ 24/7 Service:</strong> We deploy technicians the same day to resolve issues at your ongoing events.
                  </p>
                </div>
              </div>
            
          </div>
        </section>

        {/* Extra space for mobile bottom bar */}
        <div className="h-28 md:hidden" aria-hidden="true" />
      </div>

      {/* Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t py-4 flex justify-around md:hidden z-50">
        <a
          href={`tel:${PHONE}`}
          className="flex flex-col items-center text-blue-600 font-bold text-sm"
          aria-label="Call Sahneva"
        >
          <span className="text-lg">📞</span>
          <span>Call</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-green-600 font-bold text-sm"
          aria-label="Message Sahneva on WhatsApp (opens in a new tab)"
        >
          <span className="text-lg">💬</span>
          <span>WhatsApp</span>
        </a>
        <a
          href="#proposal-form"
          className="flex flex-col items-center text-purple-600 font-bold text-sm"
          aria-label="Open the proposal form"
        >
          <span className="text-lg">📝</span>
          <span>Proposal</span>
        </a>
      </div>
    </div>
  );
}

/* ──── Helper Components ───── */
function ContactCard({ icon, title, info, description, href, color, buttonText }) {
  const headingId = `contact-card-${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`;
  const descriptionId = `${headingId}-description`;

  return (
    <article
      className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-neutral-100 hover:border-blue-200 transition-all duration-500 hover:scale-105 text-center"
      role="listitem"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
    >
      <div className="text-5xl mb-4 gradient-text gradient-text--safe-xl" aria-hidden="true">
        {icon}
      </div>
      <h3
        id={headingId}
        className="text-xl font-black text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors"
      >
        {title}
      </h3>
      <div className="text-2xl font-bold text-neutral-800 mb-2">{info}</div>
      <p id={descriptionId} className="text-neutral-600 mb-6 leading-relaxed">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={`${headingId} ${descriptionId}`}
        aria-label={`${title} – ${buttonText} (opens in a new tab)`}
        className={`inline-flex items-center justify-center bg-gradient-to-r ${color} hover:shadow-xl text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg`}
      >
        <span className="flex items-center gap-2">{buttonText}</span>
      </a>
    </article>
  );
}

function InfoRow({ label, icon, children }) {
  const labelId = `${label.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}-label`;

  return (
    <div className="flex items-center gap-4" role="listitem" aria-labelledby={labelId}>
      <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center" aria-hidden="true">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <div id={labelId} className="font-semibold text-neutral-900">
          {label}
        </div>
        <div className="text-neutral-800">{children}</div>
      </div>
    </div>
  );
}
