// components/CorporateIntro.jsx
"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

const CheckIcon = () => (
  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/25">
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-3 w-3 text-emerald-400"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      />
    </svg>
  </div>
);

const TECH_ITEMS = [
  "Akustik ve enerji analizi",
  "Teknik çizim & 3D plan",
  "Acil durum planlaması",
  "Truss yük testleri",
  "Yedekli sistem altyapısı",
  "Görüntü optimizasyonu",
];

const SERVICE_TAGS = [
  {
    title: "Sahne Tasarımı",
    desc: "Özel 3D modelleme & dekor çözümleri.",
    border: "border-blue-500/25",
  },
  {
    title: "Görüntü Sistemleri",
    desc: "Yüksek çözünürlüklü LED & Watchout reji.",
    border: "border-purple-500/25",
  },
  {
    title: "Teknik Prodüksiyon",
    desc: "Ses, ışık, truss ve reji yönetimi.",
    border: "border-emerald-500/25",
  },
];

export default function CorporateIntro() {
  return (
    <section
      aria-labelledby="corporate-intro-heading"
      className="relative py-16 md:py-24 bg-[#020617] overflow-hidden"
    >
      {/* Arka plan glow + grid (sayfa geneli, diğer bölümlerle uyumlu) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0,_transparent_55%)] opacity-60" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Kart: grid & glow sadece bu bloğun içinde */}
        <article className="relative overflow-hidden rounded-3xl bg-[#020617] border border-white/8 shadow-[0_18px_60px_rgba(15,23,42,0.9)]">
          {/* Kart içi grid + glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="absolute -top-32 -left-16 h-[360px] w-[360px] rounded-full bg-blue-600/18 blur-[100px] mix-blend-screen" />
            <div className="absolute -bottom-40 -right-8 h-[360px] w-[360px] rounded-full bg-purple-600/18 blur-[110px] mix-blend-screen" />
          </div>

          <div className="relative z-10 grid items-center gap-8 p-6 md:p-8 lg:p-10 lg:grid-cols-[1.25fr_0.9fr]">
            {/* SOL BLOK */}
            <div className="flex flex-col gap-6">
              {/* Badge + başlık + intro */}
              <ScrollReveal direction="up" delay="0.05">
                <header aria-describedby="corporate-intro-description">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/35 bg-blue-500/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-blue-200 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Profesyonel Çözüm Ortağı
                  </div>

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

                  <p
                    id="corporate-intro-description"
                    className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300"
                  >
                    Lansman, zirve ve bayi toplantılarınızda ihtiyaç
                    duyduğunuz
                    <span className="font-semibold text-slate-50">
                      {" "}
                      sahne, LED ekran ve teknik altyapıyı{" "}
                    </span>
                    mühendislik hassasiyetiyle planlıyor; marka imajınızı
                    güçlendiren, kusursuz bir etkinlik atmosferi
                    oluşturuyoruz.
                  </p>
                </header>
              </ScrollReveal>

              {/* 3 mini hizmet kartı */}
              <ScrollReveal direction="up" delay="0.15">
                <div
                  className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                  aria-label="Kurumsal etkinliklerde öne çıkan teknik hizmetler"
                  role="list"
                >
                  {SERVICE_TAGS.map((item) => (
                    <div
                      key={item.title}
                      role="listitem"
                      className={`rounded-xl border ${item.border} bg-white/5 p-3 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:bg-white/10`}
                    >
                      <h3 className="mb-1 text-xs sm:text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs leading-relaxed text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Teknik standartlar listesi */}
              <ScrollReveal direction="up" delay="0.3">
                <section aria-label="Kurumsal etkinlik teknik standartlarımız">
                  <h3 className="mb-2 flex items-center gap-2 text-sm sm:text-base font-semibold text-white">
                    <span className="text-blue-400" aria-hidden="true">
                      ❖
                    </span>
                    Teknik Standartlarımız
                  </h3>
                  <div className="rounded-xl border border-white/8 bg-black/30 p-4">
                    <ul className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                      {TECH_ITEMS.map((text) => (
                        <li
                          key={text}
                          className="flex items-start gap-2"
                        >
                          <CheckIcon />
                          <span className="text-xs sm:text-sm font-medium text-slate-200">
                            {text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </ScrollReveal>
            </div>

            {/* SAĞ BLOK – GÖRSEL */}
            <ScrollReveal direction="left" delay="0.2">
              <div className="relative mx-auto aspect-[4/5] w-full max-h-[600px] lg:aspect-[3/4] xl:aspect-[4/5] group">
                {/* dış glow */}
                <div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-25 blur-md transition duration-700 group-hover:opacity-45"
                  aria-hidden="true"
                />

                <figure className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-slate-800/80 shadow-xl">
                  <Image
                    src="/img/kurumsal/kurumsal-sahne-led-ekran.webp"
                    alt="Kurumsal lansman için kurulmuş büyük sahne, LED ekran ve ışık sistemleri."
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.backgroundColor =
                          "#1e293b";
                      }
                    }}
                  />

                  {/* alt gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"
                    aria-hidden="true"
                  />

                  {/* caption */}
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 backdrop-blur">
                          <span
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
                            aria-hidden="true"
                          />
                          Live System
                        </span>
                        <span className="inline-flex items-center rounded-md border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-slate-50 backdrop-blur">
                          P3.9 LED Screen
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-sm sm:text-base font-semibold text-white">
                          Kurumsal Lansman Sahnesi
                        </p>
                        <p className="text-[11px] text-slate-300">
                          İstanbul • 2000+ katılımcı • Tam entegre ses,
                          ışık ve LED ekran yönetimi
                        </p>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </ScrollReveal>
          </div>
        </article>
      </div>
    </section>
  );
}
