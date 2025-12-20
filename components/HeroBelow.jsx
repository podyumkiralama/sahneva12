"use client";

// components/HeroBelow.jsx
import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HERO_FEATURES_TR } from "@/lib/heroFeatures";

function HeroFeatureGrid() {
  return (
    <ul
      className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none p-0 m-0"
      aria-label="Öne çıkan hizmet avantajları"
    >
      {HERO_FEATURES_TR.map((item, index) => (
        <li key={item.title} className="flex h-full">
          {/* ✅ delay: number + daha güvenli stagger */}
          <ScrollReveal asChild delay={index * 0.1} direction="up">
            <article className="w-full flex flex-col items-start bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg hover:bg-slate-800/60 transition-colors duration-300">
              <div
                className={`text-3xl mb-4 p-3 rounded-lg bg-white/5 ${item.color}`}
                aria-hidden="true"
              >
                {item.icon}
              </div>

              <h3 className="text-white font-bold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </article>
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}

function ConsultationCard() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-1 border border-white/10 shadow-2xl">
      {/* Dekoratif glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-slate-950/30 rounded-xl p-6 md:p-8 backdrop-blur-sm h-full">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform rotate-3"
              aria-hidden="true"
            >
              🎯
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">
              Ücretsiz Profesyonel Danışmanlık
            </h2>

            <p className="text-slate-200 text-base leading-relaxed max-w-2xl">
              Etkinliğiniz için{" "}
              <span className="text-white font-semibold">
                en doğru sahne çözümlerini
              </span>{" "}
              ve bütçenize uygun LED ekran seçeneklerini ücretsiz planlayalım.
              <span className="block mt-1 text-yellow-300 font-medium">
                ⚡ 2 saat içinde detaylı teklif garantisi.
              </span>
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <a
              href="#teklif-al"
              className="group relative w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-white/20 hover:-translate-y-1 focus-ring min-h-[44px]"
              aria-label="Teklif formuna git"
            >
              <span>Hemen Teklif Al</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroBelow() {
  return (
    <section
      className="py-12 bg-slate-950 border-t border-white/5 relative z-20"
      aria-labelledby="hero-supporting-title"
    >
      <h2 id="hero-supporting-title" className="sr-only">
        Sahne Kiralama Hizmet Özellikleri ve Danışmanlık
      </h2>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <HeroFeatureGrid />

        <ScrollReveal delay={0.2} direction="up">
          <ConsultationCard />
        </ScrollReveal>
      </div>
    </section>
  );
}
