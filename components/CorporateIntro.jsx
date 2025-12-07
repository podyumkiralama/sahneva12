// components/CorporateIntro.jsx
"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-emerald-400 flex-shrink-0 drop-shadow-[0_0_6px_rgba(52,211,153,0.35)]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function CorporateIntro() {
  return (
    <section
      aria-labelledby="corporate-intro-heading"
      // Dikey dolgular kaldırıldı (py-16 md:py-24)
      className="relative bg-slate-950 overflow-hidden border-t border-slate-900"
    >
      {/* ———————————————————————————
          ARKA PLAN (ServicesTabs ile uyumlu)
      ——————————————————————————— */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Grid deseni */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
        {/* Glow efektleri */}
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-40 -right-10 h-[420px] w-[420px] rounded-full bg-purple-600/16 blur-[120px] mix-blend-screen" />
      </div>

      {/* ———————————————————————————
          İÇERİK WRAPPER (max-w-7xl kaldırıldı, w-full yapıldı. İç padding'i korumak için max-w-7xl tekrar eklendi. Ana sayfada dikey boşluk olmadığı için iç padding önemlidir.)
      ——————————————————————————— */}
      <div className="relative z-10 w-full">
        {/* Kartı ortalamak için max-w-7xl ve px-4 tekrar eklendi,
            çünkü bu bileşen zaten ana sayfanın tam genişlikli bir DIV'i içinde.
            Bu kartın kendisini küçültmezsek, kart efektleri zorlanır. 
            Ancak ana sayfa yapısı gereği bu kartın kenar boşluğunu alması zorunlu. 
            Ana sayfa DIV'inde px-4 kaldırıldığı için bu kısma eklememiz gerekir.
            -> NOT: Ana sayfadaki kapsayıcı (w-full) zaten kenar boşluklarını kaldırdı. 
               Bu bileşen içinde iç boşlukları (p-6, px-4) koruyoruz.
        */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Kartın kendisi full width kalmalı */}
            <div className="relative overflow-hidden rounded-3xl bg-[#020617] border border-white/10 shadow-[0_18px_60px_rgba(15,23,42,0.9)]">
                {/* Kart içi grid */}
                <div className="grid gap-8 md:gap-10 p-6 md:p-8 lg:p-10 lg:grid-cols-[1.25fr_0.95fr] items-center">
                {/* ... (İçerik aynı kalır) */}
                {/* SOL BLOK */}
                <div className="flex flex-col gap-6">
                    {/* Badge + Başlık + Açıklama */}
                    <ScrollReveal direction="up" delay="0.05">
                    <div>
                        {/* Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-300 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                        </span>
                        Profesyonel Çözüm Ortağı
                        </div>

                        {/* Başlık */}
                        <h2
                        id="corporate-intro-heading"
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white"
                        >
                        Kurumsal{" "}
                        <span className="block sm:inline">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            Sahne &amp; Prodüksiyon
                            </span>{" "}
                            Yönetimi
                        </span>
                        </h2>

                        {/* Açıklama */}
                        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
                        Lansman, zirve ve bayi toplantılarınızda ihtiyaç duyduğunuz
                        <span className="text-slate-50 font-medium">
                            {" "}
                            sahne, LED ekran ve teknik altyapıyı{" "}
                        </span>
                        mühendislik hassasiyetiyle planlıyor, marka imajınızı
                        güçlendirirken kusursuz bir atmosfer yaratıyoruz.
                        </p>
                    </div>
                    </ScrollReveal>

                    {/* Hizmet mini kartları */}
                    <ScrollReveal direction="up" delay="0.15">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                        {
                            title: "Sahne Tasarımı",
                            desc: "Özel 3D modelleme ve dekor uygulamaları.",
                            border: "border-blue-500/30",
                        },
                        {
                            title: "Görüntü Sistemleri",
                            desc: "Yüksek çözünürlüklü LED & Watchout rejisi.",
                            border: "border-purple-500/30",
                        },
                        {
                            title: "Teknik Prodüksiyon",
                            desc: "Ses, ışık, truss ve reji yönetimi.",
                            border: "border-emerald-500/30",
                        },
                        ].map((item, idx) => (
                        <div
                            key={idx}
                            className={`rounded-xl border ${item.border} bg-white/5 p-3 backdrop-blur-md transition-transform hover:-translate-y-1 hover:bg-white/10`}
                        >
                            <strong className="mb-1 block text-xs sm:text-sm font-semibold text-white">
                            {item.title}
                            </strong>
                            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-300">
                            {item.desc}
                            </p>
                        </div>
                        ))}
                    </div>
                    </ScrollReveal>

                    {/* Teknik standart listesi */}
                    <ScrollReveal direction="up" delay="0.3">
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-white">
                        <span className="text-blue-400" aria-hidden="true">
                            ❖
                        </span>
                        Teknik Standartlarımız
                        </h3>
                        <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                        <ul className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                            {[
                            "Akustik ve enerji analizi",
                            "Teknik çizim & 3D planlama",
                            "Acil durum ve yedek sistem planları",
                            "Truss yük testleri ve statik hesap",
                            "Yedekli ses/görüntü altyapısı",
                            "Görüntü renk & parlaklık optimizasyonu",
                            ].map((text, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <CheckIcon />
                                <span className="text-xs sm:text-sm font-medium text-slate-200">
                                {text}
                                </span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    </ScrollReveal>
                </div>

                {/* SAĞ BLOK – GÖRSEL */}
                <ScrollReveal direction="left" delay="0.2">
                    <div className="relative w-full max-w-xl mx-auto aspect-[4/5] lg:aspect-[3/4]">
                        {/* Dış glow çerçeve */}
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-25 blur-md transition duration-700 group-hover:opacity-40" />

                        {/* Görsel kutusu */}
                        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
                            <Image
                                src="/img/kurumsal/kurumsal-sahne-led-ekran.webp"
                                alt="Kurumsal lansman sahnesi, LED ekran ve ışık sistemleriyle profesyonel prodüksiyon kurulumu."
                                fill
                                sizes="(max-width: 1024px) 100vw, 480px"
                                className="object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    if (e.currentTarget.parentNode) {
                                        e.currentTarget.parentNode.style.backgroundColor =
                                            "#020617";
                                    }
                                }}
                            />

                            {/* Üstten aşağı gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

                            {/* Alt bilgi & etiketler */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 backdrop-blur-md">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                                        Live System
                                    </span>
                                    <span className="inline-flex items-center rounded-md border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-slate-50 backdrop-blur-md">
                                        P3.9 LED Screen
                                    </span>
                                </div>

                                <div className="space-y-0.5">
                                    <h4 className="text-sm sm:text-base font-bold text-white">
                                        Kurumsal Lansman Sahnesi
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-slate-300">
                                        İstanbul • 2000+ katılımcı • Çok kameralı reji &amp;
                                        full teknik prodüksiyon
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
