// components/HeroSection.js
import Image from "next/image";
// NOT: Resim dosyasının yolunun projenizde doğru olduğundan emin olun.
import heroImg from "@/public/img/hero-bg.webp";

// —————————————————————————————————————————
// SABİT VERİLER (CONSTANTS)
// —————————————————————————————————————————

const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

const HERO_KEYWORDS = [
  { text: "Sahne Kiralama", gradient: "text-blue-300" },
  { text: "LED Ekran", gradient: "text-purple-300" },
  { text: "Ses-Işık Sistemleri", gradient: "text-cyan-300" },
];

const HERO_STATS = [
  {
    icon: "🚚",
    title: "Aynı Gün Kurulum",
    desc: "81 ilde hızlı lojistik ve ekip",
  },
  {
    icon: "🛡️",
    title: "%98 Memnuniyet",
    desc: "Yedekli altyapı, sigortalı teslim",
  },
  {
    icon: "🎛️",
    title: "Son Teknoloji Parkur",
    desc: "LED, ses, ışık ve truss stokta",
  },
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
    srHint: "",
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

const CTA_BASE_CLASS =
  "w-full sm:w-auto min-w-[180px] min-h-[44px] text-center group relative text-white font-bold text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105 border border-white/20 focus-ring";

const CTA_OVERLAY_CLASS =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200";

// —————————————————————————————————————————
// ALT PARÇALAR (HELPER COMPONENTS)
// —————————————————————————————————————————

function KeywordPills({ id }) {
  return (
    <ul
      id={id}
      className="flex flex-wrap justify-center gap-2 mt-4 mb-6 max-w-4xl mx-auto"
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
        {label}
        {srHint ? <span className="sr-only">{srHint}</span> : null}
      </span>
      <div className={CTA_OVERLAY_CLASS} aria-hidden="true" />
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
      {CTA_BUTTONS.map(({ srHint, gradient, ariaLabel, ...cta }) => (
        <CTAButton
          key={cta.href}
          gradient={gradient}
          srHint={srHint}
          ariaLabel={ariaLabel}
          {...cta}
        />
      ))}
    </div>
  );
}

function HeroStatGrid() {
  return (
    <div
      className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left"
      role="list"
      aria-label="Sahneva hizmet güvenilirlik istatistikleri"
    >
      {HERO_STATS.map((item) => (
        <article
          key={item.title}
          role="listitem"
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm shadow-lg hover:border-white/30 transition-colors duration-200"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/10 to-transparent transition-opacity duration-200" aria-hidden="true" />
          <div className="flex items-start gap-3">
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-slate-200/80 leading-snug">{item.desc}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function HeroBackgroundImage({ alt = HERO_IMAGE_ALT, ariaHidden = false }) {
  return (
    <Image
      src={heroImg}
      alt={ariaHidden ? "" : alt}
      fill
      priority={true}
      fetchPriority="high"
      decoding="sync"
      sizes="(min-width: 1600px) 1600px, 100vw"
      quality={45}
      placeholder="empty"
      className="absolute inset-0 h-full w-full object-cover object-center"
      aria-hidden={ariaHidden}
    />
  );
}

// —————————————————————————————————————————
// ANA HERO BİLEŞEN (MAIN EXPORT)
// —————————————————————————————————————————

export default function HeroSection() {
  return (
    <section
      className="home-hero home-section"
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-keywords"
    >
      {/* 1. KATMAN: Arka Plan Görseli ve örtüleri */}
      <div className="home-hero__backdrop" aria-hidden="true">
        <HeroBackgroundImage ariaHidden />
      </div>

      {/* 2. KATMAN: İçerik */}
      <div className="home-container">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 py-10">
          <div
            className="home-hero__frame"
            aria-hidden="true"
          />

          {/* Üst Rozet (Badge) */}
          <div className="flex justify-center mb-4">
            <p className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 text-xs md:text-sm text-slate-100 shadow-sm">
              <span
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                aria-hidden="true"
              />
              Sahneva Organizasyon • Türkiye Geneli Profesyonel Hizmet
            </p>
          </div>

          {/* Ana Başlık (H1) */}
          <h1
            id="hero-title"
            className="text-white text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-xl"
          >
            Türkiye genelinde
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 pb-2">
              Sahne &amp; LED Ekran Kiralama
            </span>
          </h1>

          {/* Anahtar Kelimeler (Pills) */}
          <KeywordPills id="hero-keywords" />

          {/* Alt Açıklama (Subtitle) */}
          <p
            id="hero-description"
            className="text-slate-100 text-base md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md text-opacity-90"
          >
            500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı
            kurulum ile etkinliğinizde yanınızdayız.
          </p>

          {/* Aksiyon Butonları (CTA) */}
          <CTAGroup />

          <HeroStatGrid />
        </div>
      </div>

      {/* 3. KATMAN: Scroll İkonu (Mobilde gizli) */}
      <div
        className="home-hero__scroll"
        aria-hidden="true"
      >
        <div className="animate-bounce motion-reduce:animate-none">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full mt-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
