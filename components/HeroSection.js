// components/HeroSection.js
import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroImg from "@/public/img/hero-bg.webp";

/* ================== SABİTLER ================== */

const HERO_KEYWORDS = [
  "Sahne Kiralama",
  "LED Ekran",
  "Ses-Işık Sistemleri",
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
    ariaLabel: "Sahneva'yı telefonla hemen ara",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+ve+LED+ekran+kiralama+i%C3%A7in+teklif+almak+istiyorum.",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer",
    ariaLabel: "WhatsApp üzerinden teklif iste",
  },
];

/* ================== ALT BİLEŞENLER ================== */

function KeywordPills() {
  return (
    <ul
      id="hero-keywords"
      className="flex flex-wrap justify-center gap-2 mt-4 mb-6"
      role="list"
      aria-label="Öne çıkan hizmetler"
    >
      {HERO_KEYWORDS.map((text) => (
        <li key={text} className="m-0 p-0" role="listitem">
          <span className="text-sm md:text-base font-semibold px-3 py-1 bg-black/40 text-white rounded-lg">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CTAButton({ href, label, icon, ariaLabel, ...rest }) {
  return (
    <a
      href={href}
      className="w-full sm:w-auto min-w-[180px] min-h-[44px] text-center bg-white/92 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-white transition-colors duration-150 focus-ring"
      aria-label={ariaLabel ?? label}
      {...rest}
    >
      <span className="flex items-center justify-center gap-2">
        <span aria-hidden="true">{icon}</span>
        <span>{label}</span>
      </span>
    </a>
  );
}

function CTAGroup() {
  return (
    <div
      className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3"
      role="group"
      aria-label="Hızlı iletişim seçenekleri"
    >
      {CTA_BUTTONS.map((btn) => (
        <CTAButton key={btn.href} {...btn} />
      ))}
    </div>
  );
}

/* ================== ANA HERO BÖLÜMÜ ================== */

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      aria-describedby="hero-subtitle hero-keywords"
      role="banner"
    >
      {/* Dekoratif arka plan görseli – screen reader’a gizli */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={heroImg}
          alt=""              // dekoratif; metin zaten bilgiyi veriyor
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container px-4 py-10 text-center text-white drop-shadow-[0_0_18px_rgba(0,0,0,0.45)]">
        <ScrollReveal asChild>
          <p className="inline-flex items-center justify-center gap-2 rounded-full bg-black/45 px-4 py-1.5 text-xs sm:text-sm border border-white/15">
            <span
              className="inline-block w-2 h-2 rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            <span className="font-medium">
              Türkiye Geneli Profesyonel Hizmet
            </span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay="0.2" asChild>
          <h1
            id="hero-title"
            className="mt-4 text-4xl md:text-6xl lg:text-[3.75rem] font-black leading-tight tracking-tight"
          >
            Profesyonel{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
              Sahne &amp; LED Ekran
            </span>
            <br className="hidden sm:block" />
            <span className="sm:whitespace-nowrap">Kiralama Hizmeti</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay="0.3" asChild>
          <p
            id="hero-subtitle"
            className="mt-3 text-sm md:text-lg max-w-2xl mx-auto"
          >
            500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli
            hızlı kurulum ile etkinliğinizde yanınızdayız.
          </p>
        </ScrollReveal>

        <ScrollReveal delay="0.4">
          <KeywordPills />
        </ScrollReveal>

        <ScrollReveal delay="0.5">
          <CTAGroup />
        </ScrollReveal>

        {/* Scroll cue – sadece görsel, a11y için gizli */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="animate-bounce motion-reduce:animate-none">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2" />
            </div>
          </div>
        </div>

        {/* Erişilebilirlik için sadece screen-reader’a: */}
        <p className="sr-only">
          Aşağı kaydırarak hizmetler, projeler ve sıkça sorulan sorular
          bölümlerine ulaşabilirsiniz.
        </p>
      </div>
    </section>
  );
}
