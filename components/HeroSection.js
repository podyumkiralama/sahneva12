// components/HeroSection.js
import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroImg from "@/public/img/hero-bg.webp";

const HERO_IMAGE_ALT =
  "Konser sahnesinde LED ekran ve sahne ışıkları ile kalabalık bir izleyici kitlesini gösteren Sahneva kurulumu.";

const HERO_KEYWORDS = [
  { text: "Sahne Kiralama", gradient: "from-blue-400 to-sky-300" },
  { text: "LED Ekran", gradient: "from-purple-400 to-fuchsia-300" },
  { text: "Ses-Işık Sistemleri", gradient: "from-cyan-400 to-teal-300" },
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
    srHint: "Telefon ile hemen arayın",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer",
    srHint: "WhatsApp üzerinden teklif isteyin, yeni sekmede açılır",
    gradient: "from-green-500 to-emerald-500",
    ariaLabel: "WhatsApp üzerinden teklif almak için tıklayın",
  },
];

const CTA_BASE_CLASS =
  "w-full sm:w-auto min-w-[180px] min-h-[46px] px-6 py-3 rounded-xl " +
  "group relative inline-flex items-center justify-center " +
  "bg-white/15 backdrop-blur-md text-white font-semibold text-base " +
  "border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.45)] " +
  "transition-all hover:bg-white/25 hover:shadow-[0_6px_26px_rgba(0,0,0,0.6)] " +
  "focus-ring overflow-hidden";

const CTA_OVERLAY_CLASS =
  "pointer-events-none absolute inset-0 rounded-xl " +
  "bg-gradient-to-r from-blue-500/0 via-white/18 to-purple-500/0 " +
  "opacity-0 group-hover:opacity-100 transition-opacity duration-500";

function HeroBackgroundImage({ alt = HERO_IMAGE_ALT, ariaHidden = false }) {
  return (
    <Image
      src={heroImg}
      alt={ariaHidden ? "" : alt}
      width={1920}
      height={1080}
      priority
      fetchPriority="high"
      sizes="100vw"
      className="w-full h-full object-cover object-center"
      aria-hidden={ariaHidden}
    />
  );
}

function KeywordPills() {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6 max-w-4xl mx-auto">
      {HERO_KEYWORDS.map(({ text, gradient }) => (
        <span
          key={text}
          className={`
            inline-flex items-center px-4 py-1.5 rounded-full text-xs md:text-sm
            font-semibold text-white/95 shadow-[0_3px_14px_rgba(0,0,0,0.55)]
            border border-white/15 bg-black/45 backdrop-blur-sm
            bg-gradient-to-r ${gradient}
          `}
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
  gradient = "from-blue-500 to-purple-500",
  srHint,
  ariaLabel,
  ...rest
}) {
  return (
    <a
      href={href}
      className={`${CTA_BASE_CLASS} bg-gradient-to-r ${gradient}`}
      aria-label={ariaLabel || (srHint ? `${label} – ${srHint}` : label)}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span aria-hidden="true" className="text-lg">
          {icon}
        </span>
        <span>{label}</span>
      </span>
      <div className={CTA_OVERLAY_CLASS} aria-hidden="true" />
    </a>
  );
}

function CTAGroup() {
  return (
    <div
      className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3"
      role="group"
      aria-label="İletişim ve teklif alma seçenekleri"
    >
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

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-black text-white"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Arka plan görseli – LCP */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <HeroBackgroundImage ariaHidden />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container py-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Üst rozet */}
          <ScrollReveal asChild>
            <div className="inline-flex items-center gap-3 bg-black/55 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.6)] text-xs md:text-sm text-slate-100">
              <span
                className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                aria-hidden="true"
              />
              <span>Türkiye Geneli Profesyonel Hizmet</span>
            </div>
          </ScrollReveal>

          {/* Başlık */}
          <ScrollReveal delay="0.15" asChild>
            <h1
              id="hero-title"
              className="mt-4 text-4xl md:text-6xl lg:text-[3.75rem] font-black leading-tight tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)]"
            >
              Profesyonel{" "}
              <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-sky-300">
                Sahne &amp; LED Ekran
              </span>
              <span className="block mt-1">Kiralama Hizmeti</span>
            </h1>
          </ScrollReveal>

          {/* Alt açıklama + keyword pill'ler */}
          <ScrollReveal delay="0.3">
            <>
              <KeywordPills />
              <p className="text-sm md:text-lg mt-1 md:mt-3 max-w-2xl mx-auto leading-relaxed text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli
                hızlı kurulum ile etkinliklerinizde{" "}
                <span className="font-semibold text-white">
                  profesyonel teknik çözüm ortağınız
                </span>{" "}
                olarak yanınızdayız.
              </p>
            </>
          </ScrollReveal>

          {/* CTA butonları */}
          <ScrollReveal delay="0.45">
            <CTAGroup />
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="animate-bounce motion-reduce:animate-none">
          <div className="w-7 h-11 border-2 border-white/70 rounded-full flex justify-center items-start pt-2 bg-black/20 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.7)]">
            <div className="w-1 h-3 rounded-full bg-white/85" />
          </div>
        </div>
      </div>
    </section>
  );
}
