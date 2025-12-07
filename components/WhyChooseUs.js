// components/WhyChooseUs.js
"use client";

import React, { useMemo } from "react";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// YAPILANDIRMA & VERİLER
// —————————————————————————————————————————

const DEFAULT_DICTIONARY = {
  sectionPill: "Neden Sahneva?",
  sectionTitlePrefix: "Etkinliklerinizi",
  sectionTitleHighlight: "Güçlendiren",
  sectionTitleSuffix: " Teknik Partner",
  sectionDesc:
    "LED ekran, sahne, ışık ve ses sistemleriyle İstanbul'dan tüm Türkiye'ye uzanan anahtar teslim teknik prodüksiyon çözümleri.",
};

const DEFAULT_FEATURES = [
  {
    icon: "🚚",
    gradient: "from-amber-500/50 via-orange-500/30 to-rose-500/30",
    stat: "48 saat içinde kurulum",
    title: "Hızlı & Planlı Lojistik",
    desc: "Merkezi depodan sahaya kadar tüm sevkiyat ve kurulum süreçlerini zamanında tamamlıyoruz.",
  },
  {
    icon: "🛠️",
    gradient: "from-blue-500/50 via-indigo-500/30 to-sky-500/20",
    stat: "Bakımlı ekipman",
    title: "Güncel Ekipman Parkı",
    desc: "Periyodik bakımı yapılan ses, ışık ve LED envanteriyle kesintisiz yayın sağlıyoruz.",
  },
  {
    icon: "🧠",
    gradient: "from-emerald-500/50 via-teal-500/30 to-green-500/20",
    stat: "10+ yıl deneyim",
    title: "Uzman Teknik Kadro",
    desc: "Her etkinlikte sahada bulunan süpervizörlerimiz olası riskleri proaktif olarak yönetir.",
  },
  {
    icon: "🎥",
    gradient: "from-purple-500/50 via-fuchsia-500/30 to-violet-500/20",
    stat: "4K yayına hazır",
    title: "Görüntü & Yayın Kalitesi",
    desc: "Canlı yayın, kayıt ve geniş format LED çözümleriyle marka görünürlüğünü güçlendiriyoruz.",
  },
  {
    icon: "🤝",
    gradient: "from-cyan-500/50 via-sky-500/30 to-blue-500/20",
    stat: "Sözleşmeli süreç",
    title: "Şeffaf ve Güvenli İşleyiş",
    desc: "Teknik şartnameye dayalı teklif, resmi sözleşme ve sigortalı operasyon yönetiyoruz.",
  },
  {
    icon: "📞",
    gradient: "from-lime-500/50 via-emerald-500/30 to-green-500/20",
    stat: "7/24 destek",
    title: "Kesintisiz İletişim",
    desc: "Proje öncesi ve sonrası tüm sorularınız için tek noktadan erişilebilen destek ekibi.",
  },
];


// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

export default function WhyChooseUs({ dictionary: dictionaryOverride }) {
  const dictionary = useMemo(() => ({ ...DEFAULT_DICTIONARY, ...dictionaryOverride }), [dictionaryOverride]);

  return (
    <section 
      // Dikey dolgular kaldırıldı (py-16 md:py-24). Arkaplan rengi uyumlu hale getirildi.
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
      
      {/* İçerik kapsayıcısı: Tam genişlik yerine iç padding'i korumak için max-w-7xl ve px-4 tekrar eklendi. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {DEFAULT_FEATURES.map((feature, index) => (
              <ScrollReveal key={index} delay={String((index % 3) * 0.1)} direction="up" asChild>
                <article
                  role="listitem"
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
