// components/CorporateIntro.jsx
"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-emerald-400 flex-shrink-0"
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
      className="w-full py-10 md:py-16"  // artık lacivert background yok
    >
      {/* FULL WIDTH GRID — container yok */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 px-4 sm:px-6 lg:px-8">

        {/* SOL BLOK */}
        <div className="flex flex-col gap-6">

          {/* Badge + Başlık + Açıklama */}
          <ScrollReveal direction="up" delay="0.05">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full 
                border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold 
                uppercase tracking-widest text-blue-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>
                Profesyonel Çözüm Ortağı
              </div>

              <h2
                id="corporate-intro-heading"
                className="text-3xl lg:text-4xl font-bold leading-tight text-slate-900"
              >
                Kurumsal{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                  Sahne & Prodüksiyon
                </span>{" "}
                Yönetimi
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                Lansman, zirve ve bayi toplantılarınızda ihtiyaç duyduğunuz
                <span className="text-slate-900 font-semibold">
                  {" "}sahne, LED ekran ve teknik altyapıyı{" "}
                </span>
                mühendislik hassasiyetiyle planlıyor, marka imajınızı
                güçlendirirken kusursuz bir atmosfer yaratıyoruz.
              </p>
            </div>
          </ScrollReveal>

          {/* Mini Kartlar */}
          <ScrollReveal direction="up" delay="0.15">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Sahne Tasarımı", desc: "3D modelleme ve dekor uygulamaları." },
                { title: "Görüntü Sistemleri", desc: "LED ekran & Watchout rejisi." },
                { title: "Teknik Prodüksiyon", desc: "Ses, ışık, truss ve reji yönetimi." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <strong className="block text-slate-900 text-sm font-semibold mb-1">
                    {item.title}
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Teknik Standartlar */}
          <ScrollReveal direction="up" delay="0.3">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <span className="text-blue-500">❖</span>
                Teknik Standartlarımız
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {[
                  "Akustik ve enerji analizi",
                  "Teknik çizim & 3D planlama",
                  "Acil durum ve yedek sistem planları",
                  "Truss yük testleri ve statik hesap",
                  "Yedekli ses/görüntü altyapısı",
                  "Görüntü renk & parlaklık optimizasyonu",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* SAĞ BLOK – FULL WIDTH GÖRSEL */}
        <ScrollReveal direction="left" delay="0.2">
          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-xl shadow-xl">
            <Image
              src="/img/kurumsal/kurumsal-sahne-led-ekran.webp"
              alt="Kurumsal lansman sahnesi"
              fill
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <h4 className="text-white text-sm font-bold">Kurumsal Lansman Sahnesi</h4>
              <p className="text-slate-200 text-xs">
                İstanbul • 2000+ katılımcı • Çok kameralı reji & full prodüksiyon
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
