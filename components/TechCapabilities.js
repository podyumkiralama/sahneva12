// components/TechCapabilities.js
"use client";

import React, { useMemo } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const SEO_TECH_FEATURES = [
  "IP65 dış mekân LED paneller, 4500+ nit parlaklık",
  "Profesyonel line-array ses sistemleri, dijital mikserler",
  "Modüler podyum ve sahne platformları, truss sistemleri",
  "DMX kontrollü ışık sistemleri ve ambiyans aydınlatma",
];

const SEO_INFRA_FEATURES = [
  "100m²+ LED ekran kurulumu (P3.9 outdoor)",
  "Line-array ses sistemleri (JBL, RCF, dB)",
  "Truss kule sistemleri ve roof sahne çözümleri",
  "Jeneratör, UPS ve yedekli enerji altyapısı",
];

const DEFAULT_DICTIONARY = {
  sectionPill: "Teknoloji & Kapasite",
  sectionTitlePrefix: "Türkiye'nin",
  sectionTitleHighlight: "1 Numaralı",
  sectionTitleSuffix: "Etkinlik Teknoloji Partneri",
  
  card1Title: "Uçtan Uca Teknik Hizmet ve Profesyonel Çözümler",
  card1Desc: "Türkiye genelinde sahne kiralama, podyum kurulumu, LED ekran kiralama ve ses ışık sistemi kurulumu hizmetlerinde komple çözümler sunuyoruz.",
  
  card2Title: "Büyük Ölçekli Etkinlikler İçin Güçlü Altyapı",
  card2Desc: "Konser, miting, festival, fuar ve açık hava etkinlikleri için yüksek kapasiteli ekipman altyapımızla hizmet veriyoruz. 50.000+ kişilik organizasyonlarda aktif rol alıyoruz.",
};

export default function TechCapabilities({ dictionary: dictionaryOverride }) {
  const dictionary = useMemo(() => ({ ...DEFAULT_DICTIONARY, ...dictionaryOverride }), [dictionaryOverride]);

  return (
    <section 
      className="py-16 md:py-24 bg-white overflow-hidden" 
      aria-labelledby="tech-capabilities-title"
    >
      <div className="container px-4 mx-auto">
        
        {/* ——— BAŞLIK ALANI (Pill + Gradient) ——— */}
        <ScrollReveal direction="up" delay="0.05">
            <div className="text-center max-w-4xl mx-auto mb-16">
                 {/* Hap Etiket */}
                 <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider shadow-sm">
                       <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
                       {dictionary.sectionPill}
                    </span>
                </div>

                {/* Ana Başlık */}
                <h2 id="tech-capabilities-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {dictionary.sectionTitlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">{dictionary.sectionTitleHighlight}</span> {dictionary.sectionTitleSuffix}
                </h2>
            </div>
        </ScrollReveal>

        {/* ——— KARTLAR SPLIT ALANI ——— */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* SOL KART: TEKNİK ÇÖZÜMLER */}
            <ScrollReveal direction="left" delay="0.1">
              <article className="h-full bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-10 shadow-lg border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg transform rotate-3" aria-hidden="true">
                    🚀
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    {dictionary.card1Title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    <strong className="text-blue-700 font-bold">Sahneva</strong> olarak {dictionary.card1Desc}
                  </p>
                  
                  <div className="w-full h-px bg-slate-200/60" />

                  <ul className="space-y-4">
                    {SEO_TECH_FEATURES.map((item, index) => (
                      <li key={index} className="flex items-start gap-3.5">
                        <div className="w-2.5 h-2.5 mt-2 bg-blue-500 rounded-full flex-shrink-0 ring-4 ring-blue-50" aria-hidden="true" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>

            {/* SAĞ KART: BÜYÜK KAPASİTE */}
            <ScrollReveal direction="right" delay="0.2">
              <article className="h-full bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-10 shadow-lg border border-slate-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg transform -rotate-3" aria-hidden="true">
                    🎤
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    {dictionary.card2Title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {dictionary.card2Desc}
                  </p>

                  <div className="w-full h-px bg-slate-200/60" />

                  <ul className="space-y-4">
                    {SEO_INFRA_FEATURES.map((item, index) => (
                      <li key={index} className="flex items-start gap-3.5">
                        <div className="w-2.5 h-2.5 mt-2 bg-purple-500 rounded-full flex-shrink-0 ring-4 ring-purple-50" aria-hidden="true" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
