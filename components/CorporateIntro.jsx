// components/CorporateIntro.jsx
import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

// Modern, neon efektli check ikonu
const CheckIcon = () => (
  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-3.5 h-3.5 text-emerald-400"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);

export default function CorporateIntro() {
  return (
    <section
      aria-labelledby="corporate-intro-heading"
      className="relative overflow-hidden rounded-[2.5rem] bg-[#0B1120] border border-white/10 shadow-2xl"
    >
      {/* --- ARKA PLAN EFEKTLERİ (Hero ile uyumlu) --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Izgara Deseni */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glow Efektleri */}
        <div className="absolute -top-32 -left-24 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-40 -right-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] mix-blend-screen" />
        
        {/* Gürültü (Noise) Dokusu */}
        <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 grid gap-12 p-8 md:p-12 lg:p-16 lg:grid-cols-[1.2fr_0.8fr] items-center">

        {/* --- SOL BLOK (İÇERİK) --- */}
        <div className="flex flex-col gap-10">

          {/* 1. BAŞLIK ALANI */}
          <ScrollReveal direction="up" delay="0.05">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300 backdrop-blur-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Profesyonel Çözüm Ortağı
              </div>

              <h2
                id="corporate-intro-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              >
                Kurumsal <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Sahne & Prodüksiyon
                </span>{" "}
                Yönetimi
              </h2>

              <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
                Lansman, zirve ve bayi toplantılarınızda ihtiyaç duyduğunuz 
                <span className="text-slate-200 font-medium"> sahne, LED ekran ve teknik altyapıyı </span> 
                mühendislik hassasiyetiyle planlıyor, markanıza yakışan kusursuz bir atmosfer yaratıyoruz.
              </p>
            </div>
          </ScrollReveal>

          {/* 2. HİZMET KARTLARI (GRID) */}
          <ScrollReveal direction="up" delay="0.15">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Sahne Tasarımı", desc: "Markaya özel 3D modelleme ve dekor.", border: "border-blue-500/20" },
                { title: "Görüntü Sistemleri", desc: "Yüksek çözünürlüklü LED ekran ve Watchout.", border: "border-purple-500/20" },
                { title: "Teknik Prodüksiyon", desc: "Ses, Işık, Truss ve Reji yönetimi.", border: "border-emerald-500/20" }
              ].map((item, idx) => (
                <div key={idx} className={`rounded-2xl border ${item.border} bg-white/5 p-5 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-white/10`}>
                  <strong className="mb-2 block text-sm font-semibold text-white">
                    {item.title}
                  </strong>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 3. TEKNİK ANALİZ LISTESİ */}
          <ScrollReveal direction="up" delay="0.30">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-blue-500">❖</span> Teknik Standartlarımız
              </h3>
              
              <div className="rounded-2xl border border-white/5 bg-black/20 p-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "Akustik ve enerji hattı analizi",
                    "Teknik çizim & 3D yerleşim planı",
                    "Acil durum ve güvenlik entegrasyonu",
                    "Truss yük testleri ve sertifikasyon",
                    "Yedekli (Redundant) sistem altyapısı",
                    "Görüntü işlemci (Processor) optimizasyonu"
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm font-medium text-slate-300">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* --- SAĞ BLOK (GÖRSEL / EKRAN) --- */}
        <ScrollReveal direction="left" delay="0.20">
          <div className="relative group">
            {/* Dekoratif Çerçeve Efekti */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-lg group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-full min-h-[500px]">
              
              {/* Görsel */}
              <Image
                src="/img/kurumsal/kurumsal-sahne-led-ekran.webp"
                alt="Kurumsal lansman sahne ve LED ekran kurulumu"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Görsel Üzeri Overlay (Gradient) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/20 to-transparent" />

              {/* Görsel Üzeri "Head-Up Display" (HUD) Tarzı Bilgi */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-col gap-4">
                  {/* Etiketler */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live System
                    </span>
                    <span className="inline-flex items-center rounded-md bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      P3.9 LED Screen
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Kurumsal Lansman Sahnesi</h4>
                    <p className="text-sm text-slate-400">
                      İstanbul / 2000+ Katılımcı
                    </p>
                  </div>

                  {/* Dekoratif Tech Çizgisi */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/50 to-transparent mt-2" />
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
