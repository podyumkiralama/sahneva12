// components/HeroSection.js
import React from "react";
import Image from "next/image";

import { ScrollReveal } from "@/components/ScrollReveal";
import heroImg from "@/public/img/hero-bg.webp";

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
    srHint: "Hemen Ara",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer",
    srHint: "(yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
    ariaLabel: "WhatsApp Üzerinden Teklif Almak İçin Tıklayın",
  },
];

const CTA_BASE_CLASS =
  "w-full sm:w-auto min-w-[180px] min-h-[44px] text-center group relative text-white font-bold text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105 border border-white/20 focus-ring";

const CTA_OVERLAY_CLASS =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200";

const HERO_IMAGE_STYLE = Object.freeze({
  filter: "brightness(0.6) contrast(1.1) saturate(1.05)",
});

const HERO_OVERLAY_ANIMATION_STYLE = Object.freeze({
  animationDuration: "8s",
});

function KeywordPills() {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6 max-w-4xl mx-auto">
      {HERO_KEYWORDS.map(({ text, gradient }) => (
        <span
          key={text}
          className={`text-sm md:text-base font-semibold px-3 py-1 ${gradient} bg-black/40 rounded-lg border border-white/10`}
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
        <span aria-hidden="true">{icon}</span> {label}
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

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-title"
    >
      {/* LCP görseli */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <HeroBackgroundImage ariaHidden />
        {/* Overlay katmanları */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70"
          style={HERO_IMAGE_STYLE}
        />
        {/* Hafif parlama animasyonu */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse motion-reduce:animate-none"
          style={HERO_OVERLAY_ANIMATION_STYLE}
        />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container py-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal asChild>
            <div className="inline-flex items-center gap-3 bg-black/50 rounded-full px-4 py-2 border border-white/10 text-xs md:text-sm text-slate-100">
              <span className="w-2 h-2 bg-green-400 rounded-full" aria-hidden="true" />
              Türkiye Geneli Profesyonel Hizmet
            </div>
          </ScrollReveal>

          <ScrollReveal delay="1" asChild>
            <h1
              id="hero-title"
              className="mt-4 text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
            >
              Profesyonel{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">
                Sahne Sistemleri
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay="2">
            <>
              <KeywordPills />
              <p className="text-slate-100 text-sm md:text-lg mt-2 md:mt-4 max-w-xl mx-auto">
                500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı kurulum ile etkinliğinizde yanınızdayız.
              </p>
            </>
          </ScrollReveal>

          <ScrollReveal delay="3">
            <CTAGroup />
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div className="animate-bounce motion-reduce:animate-none">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
