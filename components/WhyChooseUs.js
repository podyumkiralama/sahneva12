// components/WhyChooseUs.js
"use client";

import React, { useMemo } from "react";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// KURUMSAL SİMGELER (SVG)
// —————————————————————————————————————————

const ICON_CLASS = "w-8 h-8";

// 1. Yüksek Müşteri Memnuniyeti (⭐ -> Yüksek Performans/Onay)
const CheckStarIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 005.944 21.056A11.97 11.97 0 0012 22c2.894 0 5.618-.87 7.944-2.378l.001-.001z" />
    </svg>
);

// 2. Hızlı Kurulum ve Teslimat (⚡ -> Hız/Şimşek)
const BoltClockIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

// 3. Premium LED Ekran Teknolojisi (🖥️ -> Ekran/Monitör)
const DisplayIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l1-2h4l-1 2-1-3m-6.425-1h13.85a.75.75 0 00.75-.75V8.5a.75.75 0 00-.75-.75H3.325a.75.75 0 00-.75.75v7.25a.75.75 0 00.75.75z" />
    </svg>
);

// 4. Uzman Teknik Ekip (👷 -> Kullanıcı/Takım)
const UsersIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14h2M10 12h4m-2 2v-4m5 4v-4m0 0V8m0 4h2M8 12H6m0 4h2" />
    </svg>
);

// 5. Rekabetçi Fiyat Garantisi (💰 -> Para/Etiket)
const CurrencyIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2m0 0l-1.429 2.143M12 4v4m0 4v4m0-4h2c1.657 0 3-.895 3-2s-1.343-2-3-2h-2z" />
    </svg>
);

// 6. Türkiye Geneli Hizmet (🏙️ -> Dünya/Harita)
const GlobeMapIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-1.343 3-3s-1.343-3-3-3m0 6a3 3 0 100-6m0 6a3 3 0 110-6m-9-3h7.5" />
    </svg>
);


// —————————————————————————————————————————
// VERİLER
// —————————————————————————————————————————

const DEFAULT_FEATURES = [
  {
    icon: <CheckStarIcon className={ICON_CLASS} />,
    title: "Yüksek Müşteri Memnuniyeti",
    desc: "Her organizasyonda %98'in üzerinde müşteri memnuniyeti. Referanslar ve Google yorumları bizim güvencemiz.",
    stat: "%98 Memnuniyet",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: <BoltClockIcon className={ICON_CLASS} />,
    title: "Hızlı Kurulum ve Teslimat",
    desc: "Aynı gün profesyonel sahne, LED ekran ve ses-ışık kurulumları.",
    stat: "2–6 Saat",
    gradient: "from-cyan-400 to-blue-400",
  },
  {
    icon: <DisplayIcon className={ICON_CLASS} />,
    title: "Premium LED Ekran Teknolojisi",
    desc: "P2–P6 pixel pitch ile yüksek çözünürlüklü indoor/outdoor LED ekran.",
    stat: "P2–P6",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: <UsersIcon className={ICON_CLASS} />,
    title: "Uzman Teknik Ekip",
    desc: "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanlarından kadro.",
    stat: "15+ Uzman",
    gradient: "from-emerald-400 to-green-400",
  },
  {
    icon: <CurrencyIcon className={ICON_CLASS} />,
    title: "Rekabetçi Fiyat Garantisi",
    desc: "Kaliteli hizmeti uygun fiyatla, bütçenize uygun çözümler.",
    stat: "%30 Tasarruf",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    icon: <GlobeMapIcon className={ICON_CLASS} />,
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


// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

export default function WhyChooseUs({ dictionary: dictionaryOverride }) {
  const dictionary = useMemo(() => ({ ...DEFAULT_DICTIONARY, ...dictionaryOverride }), [dictionaryOverride]);

  return (
    <section 
      // DARK MODE ZEMİN - py sınıfları kaldırıldı, tam yapışık
      className="relative bg-gradient-to-b from-[#0B1120] to-slate-900 overflow-hidden"
      aria-labelledby="why-choose-title"
    >
      
      {/* ——— ORTAM HAREKETİ VE IZGARA ÇİZGİLERİ ——— */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
         {/* Izgara Çizgileri */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
         
         {/* Mor Yavaş Hareket Eden Blob (Çevresel Parlaklık) */}
         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-30 animate-pulse-slow motion-reduce:animate-none -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* DEĞİŞİKLİK: Yatay boşlukları korumak için max-w-7xl mx-auto ve px-4 sınıfları eklendi. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
        
        {/* ——— BAŞLIK ALANI ——— */}
        <ScrollReveal direction="up" delay="0.05">
            <div className="text-center max-w-4xl mx-auto mb-16">
                 {/* Hap Etiket */}
                 <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                       <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" aria-hidden="true" />
                       {dictionary.sectionPill}
                    </span>
                </div>

                {/* Ana Başlık */}
                <h2 id="why-choose-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    {dictionary.sectionTitlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">{dictionary.sectionTitleHighlight}</span>{dictionary.sectionTitleSuffix}
                </h2>
                
                {/* Açıklama */}
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    {dictionary.sectionDesc}
                </p>
            </div>
        </ScrollReveal>

        {/* ——— KARTLAR GRID ALANI (Spot Işık Swapper) ——— */}
        <ScrollRevealGroup>
          {/* DEĞİŞİKLİK: ARIA hatasını çözmek için <ul> etiketi kullanıldı. role="list" kaldırıldı. */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEFAULT_FEATURES.map((feature, index) => (
              <ScrollReveal key={index} delay={String((index % 3) * 0.1)} direction="up" asChild>
                {/* DEĞİŞİKLİK: article yerine <li> etiketi kullanıldı. role="listitem" kaldırıldı. */}
                <li
                  className="group relative bg-white/5 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-blue-500/30 overflow-hidden hover:-translate-y-1"
                >
                  
                  {/* ——— DİNAMİK SPOT IŞIĞI (MOR DEFAULT -> MAVİ HOVER) ——— */}
                  <div 
                    className={`
                      absolute bottom-0 left-0 right-0 h-24 w-full transition-all duration-300
                      filter blur-xl pointer-events-none transform translate-y-full group-hover:translate-y-0

                      /* DEFAULT (MOR) - Mor spot yanar */
                      opacity-50 bg-gradient-to-t from-purple-500/50 via-transparent to-transparent 

                      /* HOVER (MAVİ) - Parlament maviye döner */
                      group-hover:opacity-100 group-hover:from-blue-500/60 group-hover:to-transparent 
                    `}
                    aria-hidden="true"
                  />
                  
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                    aria-hidden="true"
                  />
                  
                  <div className="relative z-10 mb-6">
                    {/* SİMGELERİN KONTEYNERİ */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold px-3 py-1 bg-white/10 text-slate-200 rounded-full group-hover:bg-blue-600/20 transition-colors">
                        {feature.stat}
                      </span>
                    </div>
                    {/* BAŞLIK VE AÇIKLAMA */}
                    {/* li içerisine h3 kullanmak semantik olarak uygundur. */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
