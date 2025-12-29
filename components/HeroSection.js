// components/HeroSection.js
import heroImg from "@/public/img/hero-bg.webp";

const HERO_KEYWORDS = [
  { text: "Sahne Kiralama", gradient: "text-blue-300" },
  { text: "LED Ekran Kiralama", gradient: "text-purple-300" },
  { text: "Ses Işık Sistemleri", gradient: "text-cyan-300" },
  { text: "Podyum Kurulumu", gradient: "text-green-300" },
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
    ariaLabel: "Hemen Ara — Sahneva'yı telefonla arayın",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer nofollow",
    ariaLabel:
      "WhatsApp Teklif — WhatsApp üzerinden teklif isteyin (bağlantı yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
  },
];

const CTA_BASE_CLASS =
  "w-full sm:w-auto min-w-[180px] min-h-[44px] text-center group relative text-white font-bold text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.03] border border-white/20 focus-ring";

const CTA_OVERLAY_CLASS =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200";

function KeywordPills({ id }) {
  return (
    <ul
      id={id}
      className="flex flex-wrap justify-center gap-2 mt-4 mb-4 max-w-4xl mx-auto"
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
  ariaLabel,
  ...rest
}) {
  return (
    <a
      href={href}
      className={`${CTA_BASE_CLASS} bg-gradient-to-r ${gradient}`}
      aria-label={ariaLabel || label}
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span aria-hidden="true">{icon}</span>
        <span>{label}</span>
      </span>
      <div className={CTA_OVERLAY_CLASS} aria-hidden="true" />
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
      {CTA_BUTTONS.map((cta) => (
        <CTAButton key={cta.href} {...cta} />
      ))}
    </div>
  );
}

function HeroBackgroundImage() {
  return (
    <picture>
      <source
        srcSet="/img/hero-bg-mobile.webp"
        media="(max-width: 768px)"
        type="image/webp"
      />
      <img
        src={heroImg.src}
        alt="ses ışık led ekranlı Sahne"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden="true"
      />
    </picture>
  );
}


export default function HeroSection() {
  return (
    <header
      className="relative min-h-[90vh] md:min-h-[70vh] 2xl:min-h-[75vh] pt-14 lg:pt-16 flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-keywords"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroBackgroundImage />
        {/* Daha dengeli overlay: “simsiyah” yapmadan kontrast sağlar */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 container py-8">
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center">
          {/* Badge */}
          <p className="inline-flex items-center gap-3 bg-black/45 rounded-full px-4 py-2 border border-white/10 text-xs md:text-sm text-slate-100">
            <span
              className="w-2 h-2 bg-green-400 rounded-full"
              aria-hidden="true"
            />
            Sahneva Organizasyon • Türkiye Geneli Organizasyon Firması
          </p>

          {/* Title */}
          <h1
            id="hero-title"
            className="mt-4 text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
          >
            Türkiye genelinde
            <span className="gradient-text gradient-text--safe-xl block">
              Sahne Kiralama ve LED Ekran Kiralama
            </span>
          </h1>

          {/* Keywords */}
          <KeywordPills id="hero-keywords" />

          {/* Description */}
          <p
            id="hero-description"
            className="text-slate-100 text-sm md:text-lg mt-2 md:mt-4 max-w-xl mx-auto"
          >
            500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli kurulum
            desteğiyle sahne kiralama, LED ekran kiralama ve etkinlik prodüksiyonu
            için yanınızdayız.
          </p>

          {/* CTAs */}
          <CTAGroup />
        </div>
      </div>

      {/* Scroll cue (desktop only) */}
      <div
        className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="animate-bounce motion-reduce:animate-none">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </header>
  );
}
