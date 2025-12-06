// components/WhyChooseUs.js
"use client";

import React, { useMemo } from "react";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

const DEFAULT_FEATURES = [
  {
    icon: "⭐",
    title: "Yüksek Müşteri Memnuniyeti",
    desc: "Her organizasyonda %98'in üzerinde müşteri memnuniyeti. Referanslar ve Google yorumları bizim güvencemiz.",
    stat: "%98 Memnuniyet",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: "⚡",
    title: "Hızlı Kurulum ve Teslimat",
    desc: "Aynı gün profesyonel sahne, LED ekran ve ses-ışık kurulumları.",
    stat: "2–6 Saat",
    gradient: "from-cyan-400 to-blue-400",
  },
  {
    icon: "🖥️",
    title: "Premium LED Ekran Teknolojisi",
    desc: "P2–P6 pixel pitch ile yüksek çözünürlüklü indoor/outdoor LED ekran.",
    stat: "P2–P6",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: "👷",
    title: "Uzman Teknik Ekip",
    desc: "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanlarından kadro.",
    stat: "15+ Uzman",
    gradient: "from-emerald-400 to-green-400",
  },
  {
    icon: "💰",
    title: "Rekabetçi Fiyat Garantisi",
    desc: "Kaliteli hizmeti uygun fiyatla, bütçenize uygun çözümler.",
    stat: "%30 Tasarruf",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    icon: "🏙️",
    title: "Türkiye Geneli Hizmet",
    desc: "İstanbul, Ankara, İzmir başta 81 ilde profesyonel hizmet.",
    stat: "81 İl",
    gradient: "from-indigo-400 to-blue-400",
  },
];

const DEFAULT_DICTIONARY = {
  sectionPill: "Avantajlarımız",
  sectionTitlePrefix: "Neden",
  sectionTitleHighlight: "Sahneva",
  sectionTitleSuffix: "'yı Tercih Etmelisiniz?",
  sectionDesc: "10 yılı aşkın deneyimimiz, uzman ekibimiz ve kaliteli ekipmanlarımızla fark yaratıyoruz.",
};

export default function WhyChooseUs({ dictionary: dictionaryOverride }) {
  const dictionary = useMemo(() => ({ ...DEFAULT_DICTIONARY, ...dictionaryOverride }), [dictionaryOverride]);

  return (
    <section 
      // DARK MODE ZEMİN
      className="py-16 md:py-24 bg-gradient-to-b from-[#0B1120] to-slate-900 overflow-hidden"
      aria-labelledby="why-choose-title"
    >
      <div className="container px-4 mx-auto">
        
        {/* ——— BAŞLIK ALANI (Dark Mode Uyumlu) ——— */}
        <ScrollReveal direction="up" delay="0.05">
            <div className="text-center max-w-4xl mx-auto mb-16">
                 {/* Hap Etiket (Orange Accent) */}
                 <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                       <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" aria-hidden="true" />
                       {dictionary.sectionPill}
                    </span>
                </div>

                {/* Ana Başlık (White Text + Gradient) */}
                <h2 id="why-choose-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    {dictionary.sectionTitlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">{dictionary.sectionTitleHighlight}</span>{dictionary.sectionTitleSuffix}
                </h2>
                
                {/* Açıklama (Slate Text) */}
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    {dictionary.sectionDesc}
                </p>
            </div>
        </ScrollReveal>

        {/* ——— KARTLAR GRID ALANI (Dark Mode + Spot Işık) ——— */}
        <ScrollRevealGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {DEFAULT_FEATURES.map((feature, index) => (
              <ScrollReveal key={index} delay={String((index % 3) * 0.1)} direction="up" asChild>
                <article
                  role="listitem"
                  // KART STİLİ (DARK MODE)
                  className="group relative bg-white/5 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-blue-500/30 overflow-hidden hover:-translate-y-1"
                >
                  
                  {/* SPOT IŞIĞI (ALT KISIM) */}
                  <div 
                    className={`
                      absolute bottom-0 left-0 right-0 h-16 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-t from-purple-500/40 via-transparent to-transparent 
                      filter blur-xl pointer-events-none transform translate-y-full group-hover:translate-y-0
                    `}
                    aria-hidden="true"
                  />
                  
                  {/* Gradient Overlay (Hafif Glow Efekti) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                    aria-hidden="true"
                  />
                  
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                      <span role="img" aria-label="">{feature.icon}</span>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-3">
                      {/* STAT PILL (Dark Mode) */}
                      <span className="text-xs font-bold px-3 py-1 bg-white/10 text-slate-200 rounded-full group-hover:bg-blue-600/20 transition-colors">
                        {feature.stat}
                      </span>
                    </div>
                    {/* BAŞLIK VE AÇIKLAMA */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
