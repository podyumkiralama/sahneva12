// components/HeroSection.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";

// Animasyon bileşenlerini içe aktarın (ScrollReveal'ın kullanılabilmesi için gereklidir)
import { ScrollReveal } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// SABİT VERİLER (CONSTANTS)
// —————————————————————————————————————————
const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

const HERO_FEATURES = [
  {
    icon: "⭐",
    title: "4.9/5 Puan",
    description: "500+ Mutlu Müşteri",
    color: "text-yellow-400",
  },
  {
    icon: "⚡",
    title: "Aynı Gün",
    description: "Hızlı Kurulum",
    color: "text-cyan-400",
  },
  {
    icon: "👑",
    title: "Premium",
    description: "Kalite Garantisi",
    color: "text-purple-400",
  },
];

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
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer",
    srHint: "(yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
  },
];

const CTA_BASE_CLASS =
  "w-full sm:w-auto min-w-[180px] text-center group relative text-white font-bold text-base px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:brightness-110 border border-white/20 backdrop-blur-sm focus-ring";

const CTA_OVERLAY_CLASS =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300";

const HERO_IMAGE_STYLE = Object.freeze({
  // Filtreler görsele gömüldü; tarayıcı tarafında ek GPU yükü oluşturmamak için burada kaldırıldı.
});

const HERO_OVERLAY_ANIMATION_STYLE = Object.freeze({
  animationDuration: "8s",
});

// —————————————————————————————————————————
// PARÇALI BİLEŞENLER (SUB-COMPONENTS)
// —————————————————————————————————————————

function KeywordPills() {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto">
      {HERO_KEYWORDS.map(({ text, gradient }) => (
        <span
          key={text}
          className={`text-lg md:text-xl font-bold px-3 py-1 ${gradient} bg-white/10 rounded-lg backdrop-blur-sm border border-white/5`}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

function CTAButton({
  href,
  label,
  icon,
  gradient = "from-blue-600 to-purple-600",
  srHint,
  ...rest
}) {
  return (
    <a
      href={href}
      className={`${CTA_BASE_CLASS} bg-gradient-to-r ${gradient}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span aria-hidden="true">{icon}</span> {label}
      </span>
      {srHint ? <span className="sr-only">{srHint}</span> : null}
      <div className={CTA_OVERLAY_CLASS} aria-hidden="true" />
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-12">
      {CTA_BUTTONS.map(
        ({ srHint, gradient = "from-blue-600 to-purple-600", ...cta }) => (
          <CTAButton
            key={cta.href}
            gradient={gradient}
            srHint={srHint}
            {...cta}
          />
        )
      )}
    </div>
  );
}

function HeroFeatureGrid() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 list-none p-0 m-0">
      {HERO_FEATURES.map((item, index) => (
        <ScrollReveal
          asChild
          key={item.title}
          delay={String(index + 1)}
          direction="scale"
        >
          <li className="m-0 p-0">
            <div className="group bg-slate-900/60 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105">
              <div
                className={`text-2xl mb-2 ${item.color}`}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div className="text-white font-bold text-base mb-1">
                {item.title}
              </div>
              <div className="text-gray-200 text-xs">
                {item.description}
              </div>
            </div>
          </li>
        </ScrollReveal>
      ))}
    </ul>
  );
}

function ConsultationCard() {
  return (
    <div className="bg-gradient-to-r from-blue-700/90 to-purple-700/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div
            className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl"
            aria-hidden="true"
          >
            🎯
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
            Ücretsiz Profesyonel Danışmanlık
          </h2>
          <p className="text-slate-100 text-base leading-relaxed">
            Etkinliğiniz için <strong>en uygun sahne çözümleri</strong>, LED
            ekran seçenekleri ve ses-ışık sistemlerini ücretsiz teknik
            danışmanlık ile planlayalım.{" "}
            <strong className="text-yellow-200">
              2 saat içinde detaylı teklif
            </strong>{" "}
            sunuyoruz.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="#teklif-al"
            className="bg-white text-blue-800 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm focus-ring"
          >
            Hemen Teklif Al
          </a>
        </div>
      </div>
    </div>
  );
}

// —————————————————————————————————————————
// HERO BACKGROUND IMAGE (SUB-COMPONENT)
// —————————————————————————————————————————
function HeroBackgroundImage({
  alt = HERO_IMAGE_ALT,
  ariaHidden = false,
}) {
  return (
    <Image
      alt={ariaHidden ? "" : alt}
      src={heroImg}
      fill
      sizes="100vw"
      priority
      fetchPriority="high"
      placeholder="blur"
      quality={70}
      className="absolute inset-0 h-full w-full object-cover object-center"
      style={HERO_IMAGE_STYLE}
      aria-hidden={ariaHidden}
    />
  );
}

// —————————————————————————————————————————
// ANA BİLEŞEN: HeroSection
// —————————————————————————————————————————
export default function HeroSection() {
  return (
    <section
      className="relative pt-16 lg:pt-20 min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b0f1a] via-blue-950 to-purple-950"
      aria-labelledby="hero-title"
    >
      {/* Arka plan görseli (dekoratif) */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroBackgroundImage ariaHidden />
      </div>

      {/* Overlay katmanları */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-blue-950/80 to-purple-950/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse motion-reduce:animate-none"
        style={HERO_OVERLAY_ANIMATION_STYLE}
        aria-hidden="true"
      />

      {/* İçerik */}
      <div className="relative z-10 container py-12 md:py-16">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <ScrollReveal asChild>
            <div className="inline-flex items-center gap-3 bg-slate-900/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
              <span
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span className="text-white text-sm font-medium">
                Türkiye Geneli Profesyonel Hizmet
              </span>
            </div>
          </ScrollReveal>

          {/* Başlık */}
          <ScrollReveal delay="1" asChild>
            <h1
              id="hero-title"
              className="text-white text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-md"
            >
              <span className="block mb-2">Profesyonel</span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-600 bg-[length:300%_100%] animate-[gradient_8s_ease_infinite] motion-reduce:animate-none"
                aria-hidden="true"
              >
                Sahne Sistemleri
              </span>
              <span className="sr-only">Sahne Sistemleri</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay="2">
            <>
              <KeywordPills />
              <p className="text-slate-100 text-base md:text-lg mb-8 max-w-3xl mx-auto drop-shadow-sm font-medium">
                500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli
                hızlı kurulum ile yanınızdayız
              </p>
            </>
          </ScrollReveal>

          {/* CTA Butonları */}
          <ScrollReveal delay="3">
            <CTAGroup />
          </ScrollReveal>

          {/* Öne çıkanlar */}
          <ScrollReveal delay="4">
            <section aria-labelledby="hero-features-heading">
              <h2 id="hero-features-heading" className="sr-only">
                Öne çıkan özellikler
              </h2>
              <HeroFeatureGrid />
            </section>
          </ScrollReveal>

          {/* Danışmanlık kutusu */}
          <ScrollReveal delay="5">
            <ConsultationCard />
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
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
