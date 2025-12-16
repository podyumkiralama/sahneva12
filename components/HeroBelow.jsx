// components/HeroBelow.jsx
import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HERO_FEATURES_TR } from "@/lib/heroFeatures";

function HeroFeatureGrid() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0 m-0">
      {HERO_FEATURES_TR.map((item, index) => (
        <li key={item.title} className="m-0 p-0">
          <ScrollReveal asChild delay={String(index * 0.5)} direction="scale">
            <div className="group bg-slate-900/80 rounded-xl p-4 border border-white/10">
              <div className={`text-2xl mb-2 ${item.color}`} aria-hidden="true">
                {item.icon}
              </div>
              <div className="text-white font-bold text-base mb-1">
                {item.title}
              </div>
              <div className="text-gray-200 text-xs">{item.description}</div>
            </div>
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}

function ConsultationCard() {
  return (
    <div className="bg-gradient-to-r from-blue-700/90 to-purple-700/90 rounded-2xl p-6 md:p-8 border border-white/20">
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
            Etkinliğiniz için <strong>en uygun sahne çözümleri</strong>, LED ekran
            seçenekleri ve ses-ışık sistemlerini ücretsiz teknik danışmanlık ile
            planlayalım.{" "}
            <strong className="text-yellow-200">2 saat içinde detaylı teklif</strong>{" "}
            sunuyoruz.
          </p>
        </div>

        <div className="flex-shrink-0">
          <a
            href="#teklif-al"
            className="bg-white text-blue-800 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg transition-colors text-sm focus-ring min-h-[44px] flex items-center justify-center"
            aria-label="Ücretsiz danışmanlık ve teklif almak için aşağı kaydır"
          >
            Hemen Teklif Al
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HeroBelow() {
  return (
    <section
      className="py-10 bg-gradient-to-b from-slate-950 to-slate-900"
      aria-labelledby="hero-supporting-features"
      role="region"
    >
      <h2 id="hero-supporting-features" className="sr-only">
        Hızlı öne çıkan özellikler ve ücretsiz danışmanlık bağlantısı
      </h2>

      <div className="space-y-8 px-4 sm:px-6 lg:px-8">
        <HeroFeatureGrid />
        <ScrollReveal delay="1">
          <ConsultationCard />
        </ScrollReveal>
      </div>
    </section>
  );
}
