// app/en/faq/page.js

/* ================== META ================== */
export const metadata = {
  title: "Frequently Asked Questions | Sahneva",
  description:
    "Detailed answers about stage, LED screen, sound-light and tent rentals, installation timelines, logistics, pricing and contracts.",
  alternates: { canonical: "https://www.sahneva.com/en/faq" },
};

/* ================== DATA ================== */
const FAQ_CATEGORIES = [
  {
    id: "general",
    icon: "🧭",
    title: "General & Coordination",
    items: [
      {
        q: "Do you have experience with corporate events?",
        a: "Yes. We have delivered hundreds of product launches, conferences, dealer meetings, rallies and concerts across Türkiye.",
      },
      {
        q: "Are your equipment and systems up to date? How do you handle maintenance?",
        a: "All equipment is serviced on a regular schedule. Before every project we run functional tests and prepare backup units for critical devices.",
      },
      {
        q: "How large is the technical crew on event day?",
        a: "It depends on scope. Compact events run with 2–3 technicians, while large productions include dedicated audio, lighting, video, stage and camera teams totalling 10+ specialists.",
      },
      {
        q: "Do you offer site surveys? Are they paid?",
        a: "We provide complimentary site surveys whenever needed. Venue measurements, electrical access and load-in conditions are reviewed on location.",
      },
      {
        q: "How do you determine pricing?",
        a: "Pricing is defined by the equipment list, total duration (build, event, dismantle), city and logistics planning, staffing requirements and accessories. We prepare alternative packages based on your brief.",
      },
      {
        q: "Do you provide nationwide service across Türkiye?",
        a: "Yes. Our Istanbul-based team travels to every province. For out-of-town events we share transport and accommodation details transparently during the proposal stage.",
      },
      {
        q: "What are the booking and cancellation terms?",
        a: "Reservations become final with a deposit payment. Cancellation policies are outlined in the contract — costs related to production and logistics are deducted based on how close the cancellation is to the event date.",
      },
      {
        q: "Who is responsible on the day of the event?",
        a: "Every project has an on-site production lead. Audio, lighting, video, stage/rigging and overall coordination are handled by dedicated crew leaders.",
      },
    ],
  },
  {
    id: "stage",
    icon: "🪜",
    title: "Stage & Podium Rental",
    items: [
      {
        q: "How long does it take to install a podium or modular stage?",
        a: "A standard 6×4 m modular podium is assembled in approximately 60–90 minutes. Timing varies with dimensions, ground conditions and venue access.",
      },
      {
        q: "Will the structure damage the venue floor?",
        a: "Non-slip deck surfaces and rubber feet protect the venue floor. The system is safe for indoor venues, gyms, hotels and outdoor terrain.",
      },
      {
        q: "What height and size options are available?",
        a: "Our modular system offers stepped heights between 20 and 100 cm. 1×1 m and 2×1 m decks allow us to build custom dimensions for any layout.",
      },
      {
        q: "What safety measures do you take for the stage?",
        a: "Handrails, ramps, stairs and load calculations are part of our standard safety protocol. Edge trims, anti-slip coverings and ballast anchoring are applied during installation.",
      },
      {
        q: "Can you build stages outdoors?",
        a: "Yes. We level the ground, plan wind and rain scenarios, and secure the stage with anchoring or ballast to ensure stability.",
      },
      {
        q: "Do you provide stage skirting, branding or custom finishes?",
        a: "A black stage skirt is standard. We can supply branded fascias, custom wraps and scenic facades to match your visual identity.",
      },
      {
        q: "What is the difference between a podium and a full stage?",
        a: "Podiums are ideal for speakers, award ceremonies and fashion shows with lighter loads. Full stages are engineered for truss, lighting and LED screen rigging or higher elevations. Explore our stage packages for detailed specifications.",
      },
      {
        q: "How can I request a stage or podium rental quote?",
        a: "Share your requirements via our stage rental page or contact form. After the survey we confirm measurements and provide a detailed quotation.",
      },
    ],
  },
  {
    id: "led",
    icon: "📺",
    title: "LED Screen",
    items: [
      {
        q: "Can LED walls be used outdoors?",
        a: "Yes. Our IP65-rated cabinets resist rain and dust. High-brightness settings keep visuals clear for daytime events.",
      },
      {
        q: "What pixel pitches do you offer?",
        a: "We supply indoor and outdoor panels from P2 to P5. The optimal pitch is recommended based on viewing distance and stage width.",
      },
      {
        q: "Who manages content playback during the event?",
        a: "Our video engineers handle live playback, switching and content transitions throughout your programme.",
      },
      {
        q: "How do you ensure visibility under direct sunlight?",
        a: "We combine high-nit LED panels with calibrated colour profiles and precise positioning to maintain contrast during daytime use.",
      },
      {
        q: "What are the power requirements? Do we need a generator?",
        a: "Power demand depends on screen size and brightness. For outdoor venues with limited mains power we recommend a silent generator and dedicated distribution.",
      },
      {
        q: "What aspect ratio and content format should we prepare?",
        a: "A 16:9 primary canvas works best. Supporting side screens or stage banners use separate layouts that we mix through the control room.",
      },
      {
        q: "Can we integrate live cameras or presentation feeds?",
        a: "Yes. SDI and HDMI sources connect to our video switchers so we can mix live cameras, presentations and videos simultaneously.",
      },
      {
        q: "How long does installation take and do you stay on site?",
        a: "Depending on size we complete installation within 60–180 minutes. A dedicated LED operator and control-room crew remain on site for the entire event.",
      },
      {
        q: "Which factors affect LED screen rental pricing?",
        a: "Pixel pitch, total square metres, indoor or outdoor setup, installation height, broadcast needs and event duration all influence the final price.",
      },
    ],
  },
  {
    id: "sound-light",
    icon: "🎤",
    title: "Sound & Lighting Systems",
    items: [
      {
        q: "Do you provide technical staff?",
        a: "Absolutely. Our engineers handle installation, testing and live operation — the full process is managed by our technical crew.",
      },
      {
        q: "Do you supply microphones and recording solutions?",
        a: "We stock wireless handheld, lavalier and headworn microphones alongside multichannel mixing and multi-track recording. Simultaneous interpretation systems can be added on request.",
      },
      {
        q: "Do you design lighting scenes?",
        a: "We create venue-specific lighting plots using LED PARs, spots, washes and effect fixtures programmed via DMX controllers.",
      },
      {
        q: "How many microphones are needed for a conference?",
        a: "We plan handheld, lavalier, lectern and ambient microphones according to the number of speakers and seating layout.",
      },
      {
        q: "How do you scale audio systems for different event sizes?",
        a: "We tailor line-array hangs, subwoofer distribution and delay speakers to audience size, venue geometry and acoustics.",
      },
      {
        q: "How do you ensure electrical safety and cable management?",
        a: "Cables are secured with ramps and tape. Power lines run through residual-current protection and are labelled for quick maintenance.",
      },
      {
        q: "Can lighting match our brand colours?",
        a: "Yes. Gobos, colour palettes and cue sequences are programmed to align with your brand guidelines.",
      },
      {
        q: "How do you coordinate with DJs or live bands?",
        a: "We schedule rehearsals and share cue lists so the control room, DJ and lighting operator follow the same show flow.",
      },
    ],
  },
  {
    id: "tent",
    icon: "🎪",
    title: "Tent Rental",
    items: [
      {
        q: "Is installation and dismantling included?",
        a: "Yes. Transport, installation and dismantling are handled by our crew and include structural anchoring and ballast.",
      },
      {
        q: "What sizes and ground conditions can you work with?",
        a: "We offer various span widths for different tent models. Floors can be concrete, asphalt or levelled soil — we balance the surface with screed or modular decking as required.",
      },
      {
        q: "Do you provide heating, cooling and lighting?",
        a: "Climate control units and general lighting can be added on demand. Emergency exits and safety requirements are built into the plan.",
      },
      {
        q: "Are tents safe in wind or rain?",
        a: "Proper anchoring, ballast weights, tensioning and sidewall systems keep the structure secure during windy and rainy weather.",
      },
      {
        q: "Can you add flooring or walkways?",
        a: "Yes. We supply modular platforms, carpet finishes and ramped access solutions.",
      },
      {
        q: "Can we extend the rental period?",
        a: "Extensions are possible subject to availability. Additional day rates and logistics are detailed in the contract.",
      },
    ],
  },
  {
    id: "contract",
    icon: "🧾",
    title: "Contract & Payment",
    items: [
      {
        q: "How do the discovery and pricing stages work?",
        a: "After we receive your brief we arrange a free site survey if needed, then share a precise timeline and budget.",
      },
      {
        q: "Which regions do you cover and how do you schedule deliveries?",
        a: "We work across Türkiye. Same-day installation is possible within Istanbul, while other cities follow a planned logistics schedule.",
      },
      {
        q: "How do invoicing and contracts work?",
        a: "Every project is managed with a formal contract and e-invoice. The process includes reservation forms, deposits and delivery reports.",
      },
      {
        q: "What payment methods and terms are available?",
        a: "We accept e-invoice payments via bank transfer/EFT and offer agreed payment terms for corporate contracts.",
      },
      {
        q: "What about insurance and responsibilities on site?",
        a: "Site safety and equipment operation follow Sahneva procedures. Responsibilities are defined in the contract and briefing documents.",
      },
    ],
  },
];

/* ================== HELPERS ================== */
const KEYWORD_LINKS = [
  { key: "stage packages", href: "/en/stage-rental#packages" },
  { key: "stage rental page", href: "/en/stage-rental" },
  { key: "stage rental", href: "/en/stage-rental" },
  { key: "podium", href: "/en/stage-rental" },
  { key: "LED screen", href: "/en/led-screen-rental" },
  { key: "LED walls", href: "/en/led-screen-rental" },
  { key: "sound and lighting", href: "/en/sound-light-rental" },
  { key: "sound system", href: "/en/sound-light-rental" },
  { key: "lighting design", href: "/en/sound-light-rental" },
  { key: "tent rental", href: "/en/tent-rental" },
  { key: "event tent", href: "/en/tent-rental" },
  { key: "quote", href: "/en/contact" },
  { key: "contact form", href: "/en/contact" },
  { key: "contact", href: "/en/contact" },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripTags(value = "") {
  return value.replace(/<[^>]+>/g, "");
}

function injectLinks(text) {
  let html = text;
  for (const { key, href } of KEYWORD_LINKS) {
    const pattern = new RegExp(`(${escapeRegex(key)})`, "gi");
    html = html.replace(
      pattern,
      `<a href="${href}" class="underline hover:no-underline font-medium">$1</a>`
    );
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ================== COMPONENTS ================== */
function CategoryChips() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
      {FAQ_CATEGORIES.map((category) => (
        <a key={category.id} href={`#${category.id}`} className="faq-chip px-3 py-2 rounded-full text-sm">
          <span className="mr-1">{category.icon}</span>
          {category.title}
        </a>
      ))}
    </div>
  );
}

function FaqSection({ id, icon, title, items }) {
  return (
    <section id={id} className="scroll-mt-28 mb-8 rounded-2xl faq-glass p-5 md:p-7">
      
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold mb-5">
          <span className="text-lg md:text-xl">{icon}</span>
          {title}
        </h2>
      

      
        <div className="space-y-3">
          {items.map((item) => (

              <details key={item.q} className="faq-card group rounded-xl bg-white p-4">
                <summary
                  className="cursor-pointer select-none list-none font-semibold leading-7 flex items-center justify-between"
                  role="button"
                >
                  <span className="pr-3">{item.q}</span>
                  <svg
                    className="ml-2 h-5 w-5 text-slate-500 transition-transform group-open:rotate-90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M8 4l8 8-8 8" />
                  </svg>
                </summary>
                <div className="faq-anim mt-3 text-neutral/90 leading-relaxed">
                  {injectLinks(item.a)}
                </div>
              </details>
            
          ))}
        </div>
      
    </section>
  );
}

/* ================== PAGE ================== */
export default function FaqPage() {
  const mainEntity = [];
  for (const category of FAQ_CATEGORIES) {
    for (const item of category.items) {
      mainEntity.push({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: stripTags(item.a) },
      });
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.sahneva.com/en/faq#faq",
    inLanguage: "en-US",
    mainEntity,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container py-10 md:py-14">
        
          <h1 className="text-3xl md:text-[34px] font-extrabold tracking-tight text-center mb-6">
            Frequently Asked Questions
          </h1>
        

        
          <CategoryChips />
        

        <div className="space-y-6">
          {FAQ_CATEGORIES.map((category) => (
            <FaqSection key={category.id} {...category} />
          ))}
        </div>

        
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+905453048671"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:opacity-95"
            >
              📞 Call Sahneva
            </a>
            <a
              href="https://wa.me/905453048671?text=Hello%2C+I%27d+like+to+request+an+event+production+quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold hover:bg-neutral-50"
              aria-label="Chat on WhatsApp (opens in a new tab)"
            >
              💬 Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        
      </div>
    </>
  );
}
