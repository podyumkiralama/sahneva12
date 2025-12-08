// components/HeroSection.js
import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroImg from "@/public/img/hero-bg.webp";

const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

const HERO_KEYWORDS = [
  { text: "Sahne Kiralama" },
  { text: "LED Ekran" },
  { text: "Ses-Işık Sistemleri" },
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba,+web+sitenizden+ulaşıyorum.",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

function KeywordPills() {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
      {HERO_KEYWORDS.map(({ text }) => (
        <span
          key={text}
          className="text-sm md:text-base font-semibold px-3 py-1 bg-black/40 text-white rounded-lg"
        >
          {text}
        </span>
      ))}
    </div>
  );
}

function CTAButton({ href, label, icon, ...rest }) {
  return (
    <a
      href={href}
      className="w-full sm:w-auto min-w-[180px] min-h-[44px] text-center bg-white/90 text-black font-bold px-6 py-3 rounded-xl shadow hover:bg-white transition"
      {...rest}
    >
      <span className="flex items-center justify-center gap-2">
        {icon} {label}
      </span>
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
      {CTA_BUTTONS.map((btn) => (
        <CTAButton key={btn.href} {...btn} />
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* 🔥 SADECE FOTOĞRAF – hiçbir bg, filter, gradient yok */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg}
          alt={HERO_IMAGE_ALT}
          fill              // tüm alanı kaplasın
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container py-10 text-center text-white drop-shadow-lg">
        <ScrollReveal>
          <h1
            id="hero-title"
            className="text-4xl md:text-6xl font-black leading-tight"
          >
            Profesyonel{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Sahne &amp; LED Ekran
            </span>
            <br />
            Kiralama Hizmeti
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p className="text-lg md:text-xl mt-3 max-w-2xl mx-auto">
            Türkiye genelinde hızlı kurulum — 500+ başarılı etkinlik.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <KeywordPills />
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <CTAGroup />
        </ScrollReveal>
      </div>
    </section>
  );
}
