// components/HeroSection.js
"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroImg from "@/public/img/hero-bg.webp";

/* ----------------------------------------------
   SABİT VERİLER
------------------------------------------------*/
const HERO_KEYWORDS = [
  { icon: "⚡", label: "Şimşek ikonu", text: "Aynı gün kurulum, 24/7 teknik destek" },
  { icon: "💰", label: "Para ikonu", text: "%30’a kadar daha uygun fiyat garantisi" },
  { icon: "🏆", label: "Kupa ikonu", text: "500+ başarılı proje, referanslı hizmet" },
];

const HERO_STATS = [
  { id: "stat-projects", value: "500+", label: "Tamamlanan Proje" },
  { id: "stat-time", value: "2–6 saat", label: "Kurulum Süresi" },
  { id: "stat-satisfaction", value: "%98", label: "Memnuniyet" },
  { id: "stat-coverage", value: "81 il", label: "Hizmet Ağı" },
];

/* ----------------------------------------------
   HERO SECTION (FINAL)
------------------------------------------------*/
export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* --- ARKAPLAN GÖRSELİ --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/40 to-transparent" />
      </div>

      {/* --- GRID & SPOTLIGHTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,transparent_20%,#020617_90%)]" />
      </div>

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/15 blur-[130px] rounded-full mix-blend-screen pointer-events-none"
        aria-hidden="true"
      />

      {/* --- ANA İÇERİK --- */}
      <div className="relative z-10 container px-4 py-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">

          {/* BADGE */}
          <ScrollReveal direction="down" delay="0.1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-emerald-100/90 tracking-wide">
                <span className="hidden sm:inline">Sahneva Organizasyon • </span>
                Türkiye Geneli Profesyonel Hizmet
              </span>
            </div>
          </ScrollReveal>

          {/* BAŞLIK */}
          <ScrollReveal delay="0.2">
            <h1
              id="hero-title"
              className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl"
            >
              Profesyonel{" "}
              <br className="hidden md:block" />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
                Sahne & LED Ekran
              </span>
              <span className="block mt-2 text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 font-extrabold pb-2">
                Kiralama Partneri
              </span>
            </h1>
          </ScrollReveal>

          {/* ALT AÇIKLAMA */}
          <ScrollReveal delay="0.3">
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Sahne, LED ekran ve ses-ışık sistemlerini{" "}
              <span className="text-white font-semibold">24 saat içinde kuruyoruz.</span>
              <br />
              Türkiye geneli profesyonel etkinlik çözümleri.
            </p>
          </ScrollReveal>

          {/* ANA AVANTAJLAR */}
          <ScrollReveal delay="0.35">
            <ul
              className="mt-4 grid gap-2 text-left max-w-2xl mx-auto"
              role="list"
              aria-label="Sahneva'nın temel avantajları"
            >
              {HERO_KEYWORDS.map(({ icon, label, text }) => (
                <li
                  key={text}
                  role="listitem"
                  className="flex items-start gap-3 rounded-2xl bg-black/20 border border-white/10 px-4 py-2 text-white/90 backdrop-blur-sm"
                >
                  <span className="text-lg" role="img" aria-label={label}>
                    {icon}
                  </span>
                  <span className="text-sm md:text-base font-medium leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* CTA BUTONLARI */}
          <ScrollReveal delay="0.4">
            <div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6"
              role="group"
              aria-label="Ana eylem düğmeleri"
            >
              <a
                href="#teklif-al"
                className="group relative inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium text-slate-950 hover:bg-slate-200 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg shadow-white/20"
                aria-label="Teklif formuna git ve ücretsiz teklif alın"
              >
                <span className="mr-2">Hemen Teklif Al</span>
                <span aria-hidden="true" className="inline-block text-sm">
                  ➜
                </span>
              </a>

              <a
                href="#projeler-title"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-slate-900/40 px-8 font-medium text-slate-200 backdrop-blur-md hover:bg-slate-900/60 hover:text-white hover:border-white/40 transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Başarılı projelerimizi görüntüle"
              >
                Projelerimizi İncele
              </a>
            </div>
          </ScrollReveal>

          {/* İSTATİSTİK BAR */}
          <ScrollReveal delay="0.6" direction="up">
            <div className="mt-12 p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
              <div
                className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-[20px] px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-10"
                role="group"
                aria-label="Sahneva istatistikleri"
              >
                {HERO_STATS.map((stat) => (
                  <div
                    key={stat.id}
                    className="flex flex-col items-center text-center"
                    aria-labelledby={`${stat.id}-value ${stat.id}-label`}
                  >
                    <span
                      id={`${stat.id}-value`}
                      className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg"
                    >
                      {stat.value}
                    </span>
                    <span
                      id={`${stat.id}-label`}
                      className="text-xs uppercase tracking-wider text-slate-400 font-semibold"
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-400/80 flex items-center justify-center gap-2 drop-shadow">
              <span className="inline-block text-yellow-500" aria-hidden="true">
                ★
              </span>
              <span>500+ Mutlu Müşteri Referansı ile Türkiye Geneli Hizmet</span>
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
