// components/HeroSection.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";

const FOCUS_RING_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white";
const MOTION_SAFE = "motion-reduce:transition-none motion-reduce:transform-none";

const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

const HERO_KEYWORDS = [
  { text: "Sahne Kiralama", gradient: "text-blue-300" },
  { text: "LED Ekran", gradient: "text-purple-300" },
  { text: "Ses-Işık Sistemleri", gradient: "text-cyan-300" },
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
    srHint: "",
    ariaLabel: "Hemen Ara — 0 545 304 86 71 numaralı telefonu arayın",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer nofollow",
    srHint: "(yeni sekmede açılır)",
    ariaLabel:
      "WhatsApp Teklif — WhatsApp üzerinden teklif isteyin (bağlantı yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
  },
];

// ✅ Mobil: transform/scale yok → sadece opacity + shadow
// ✅ Desktop: md:hover:scale-105 ile premium his
const CTA_BASE_CLASS = `
  w-full sm:w-auto min-w-[180px] min-h-[44px]
  text-center group relative text-white font-bold text-base px-6 py-3 rounded-xl
  border border-white/20
  shadow-md hover:shadow-lg
  transition-[opacity,box-shadow] duration-200
  hover:opacity-90
  md:hover:opacity-100 md:hover:scale-105 md:transition-transform
  ${FOCUS_RING_CLASS} ${MOTION_SAFE}
`;

const CTA_OVERLAY_CLASS = `
  absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent
  opacity-0 group-hover:opacity-100
  transition-opacity duration-200 ${MOTION_SAFE}
`;

function KeywordPills({ id }) {
  return (
    <ul
      id={id}
      className="flex flex-wrap justify-center gap-2 mt-4 mb-5 md:mb-6 max-w-4xl mx-auto"
      aria-label="Öne çıkan hizmet başlıkları"
    >
      {HERO_KEYWORDS.map(({ text, gradient }) => (
        <li key={text} className="list-none">
          <span
            className={`text-sm md:text-base font-semibold px-3 py-1 ${gradient} bg-white/15 rounded-lg border border-white/10`}
          >
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CTAButton({
  href,
  label,
  icon,
  gradient = "from-blue-600 to-purple-600",
  srHint,
  ariaLabel,
  ...rest
}) {
  return (
    <a
      href={href}
      className={`${CTA_BASE_CLASS} bg-gradient-to-r ${gradient}`}
      aria-label={ariaLabel || (srHint ? `${label} ${srHint}` : label)}
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span aria-hidden="true">{icon}</span>
        <span>{label}</span>
        {srHint ? <span className="sr-only">{srHint}</span> : null}
      </span>
      <span className={CTA_OVERLAY_CLASS} aria-hidden="true" />
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3">
      {CTA_BUTTONS.map((cta) => (
        <CTAButton key={cta.href} {...cta} />
      ))}
    </div>
  );
}

function HeroBackgroundImage({ ariaHidden = true }) {
  return (
    <picture aria-hidden={ariaHidden}>
      {/* Mobil kaynak (<= 768px) */}
      <source
        media="(max-width: 768px)"
        srcSet="/img/hero-bg-mobile.webp"
        type="image/webp"
      />

      {/* Desktop / default */}
      <source srcSet="/img/hero-bg.webp" type="image/webp" />

      {/* Fallback img */}
      <img
        src="/img/hero-bg.webp"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
  );
}


export default function HeroSection() {
  return (
    <section
      className={`
        relative
        pt-16 lg:pt-20
        flex items-center justify-center overflow-hidden bg-black
        min-h-[calc(100svh-64px)] lg:min-h-[calc(100svh-80px)]
      `}
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-keywords"
    >
      {/* Arka plan */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroBackgroundImage ariaHidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container py-10 sm:py-12">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-0">
          {/* Badge */}
          <p className="inline-flex items-center gap-3 bg-black/50 rounded-full px-4 py-2 border border-white/10 text-xs md:text-sm text-slate-100 md:backdrop-blur-sm">
            {/* ✅ animasyon mobilde yok */}
            <span
              className="w-2 h-2 bg-green-400 rounded-full md:animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            />
            Sahneva Organizasyon • Türkiye Geneli Profesyonel Hizmet
          </p>

          {/* Başlık */}
          <h1
            id="hero-title"
            className="
              mt-4 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-black leading-tight [text-wrap:balance]
            "
          >
            Türkiye genelinde
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 block pb-2">
              Sahne &amp; LED Ekran Kiralama
            </span>
          </h1>

          <KeywordPills id="hero-keywords" />

          {/* Açıklama */}
          <p
            id="hero-description"
            className="text-slate-100 text-sm sm:text-base md:text-lg mt-2 md:mt-4 max-w-xl mx-auto md:drop-shadow-md"
          >
            500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı
            kurulum ile etkinliğinizde yanınızdayız.
          </p>

          <CTAGroup />
        </div>
      </div>

      {/* Scroll cue (mobilde kapalı) */}
      <div
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="animate-bounce motion-reduce:animate-none">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
