// components/CorporateIntro.jsx
"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-cyan-400 flex-shrink-0 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]"
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
      className="relative bg-slate-950 overflow-hidden border-t border-slate-900"
    >
      {/* ———————————————————————————
          ARKA PLAN – ServicesTabs ile aynı dil
      ——————————————————————————— */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Grid dokusu */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Cyan/Sky glow’lar */}
        <div className="absolute -top-40 right-[-60px] w-[320px] h-[320px] bg-cyan-500/18 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute -bottom-40 left-[-80px] w-[320px] h-[320px] bg-sky-500/14 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* ———————————————————————————
          İÇERİK WRAPPER (full-width section, içerik max-w)
      ——————————————————————————— */}
      <div className="relative z-10 w-full">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          {/* ÜST BAŞLIK BLOĞU */}
          <ScrollReveal direction="up" delay="0.05">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 border border-slate-700/80 shadow-[0_0_18px_rgba(8,47,73,0.8)]">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  aria-hidden="true"
                />
                Kurumsal Etkinlik Prodüksiyonu
              </div>

              <h2
                id="corporate-intro-heading"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-black leading-tight tracking-tight text-white"
              >
                Markanız için{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-300">
                  uçtan uca sahne ve prodüksiyon yönetimi
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base md:text-[15px] leading-relaxed text-slate-300 max-w-2xl">
                Lansman, bayi toplantısı, konferans ve fuarlarınızda;{" "}
                <span className="font-semibold text-slate-50">
                  sahne, LED ekran, ses-ışık ve truss yapıları
                </span>{" "}
                dahil tüm teknik altyapıyı tek ekipten yönetiyoruz. Teknik
                riskleri sizden alıp, kusursuz görünen bir etkinlik akışı
                tasarlıyoruz.
              </p>
            </div>
          </ScrollReveal>

          {/* ANA GRID */}
          <div className="grid gap-10 lg:grid-cols-[1.2fr_minmax(0,0.9fr)] items-stretch">
            {/* SOL BLOK – SÜREÇ & STANDARTLAR */}
            <ScrollReveal direction="up" delay="0.12">
              <div className="flex flex-col gap-7 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 sm:p-6 md:p-7 shadow-[0_18px_55px_rgba(15,23,42,0.9)]">
                {/* Süreç adımları */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300 mb-3 flex items-center gap-2">
                    <span
                      className="h-[1px] w-6 bg-cyan-400"
                      aria-hidden="true"
                    />
                    A’dan Z’ye teknik yönetim
                  </h3>

                  <ol className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        step: "1",
                        title: "Keşif & Brief",
                        text: "Mekan ve akış analizi ile ihtiyaçları netleştiriyoruz.",
                      },
                      {
                        step: "2",
                        title: "Teknik Tasarım",
                        text: "3D sahne planı, ses-ışık ve LED yerleşimini projelendiriyoruz.",
                      },
                      {
                        step: "3",
                        title: "Kurulum & Test",
                        text: "Tüm sahne, ses-ışık ve görüntü sistemlerini yedekli kuruyoruz.",
                      },
                      {
                        step: "4",
                        title: "Canlı Yönetim",
                        text: "Gün boyu reji, teknik takip ve kapanış sonrası söküm.",
                      },
                    ].map((item) => (
                      <li
                        key={item.step}
                        className="flex items-start gap-3 rounded-xl border border-slate-800/70 bg-slate-900/60 p-3.5 hover:border-cyan-500/60 hover:bg-slate-900/90 transition-colors"
                      >
                        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 border border-cyan-500/60 text-[11px] font-bold text-cyan-300 shadow-[0_0_14px_rgba(8,47,73,0.9)]">
                          {item.step}
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-slate-50">
                            {item.title}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-slate-300">
                            {item.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Teknik standart listesi */}
                <div className="border-t border-slate-800/80 pt-4 mt-1">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="text-cyan-400" aria-hidden="true">
                      ❖
                    </span>
                    Teknik standartlarımız
                  </h3>
                  <div className="rounded-xl border border-slate-800 bg-black/40 p-4">
                    <ul className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                      {[
                        "Akustik & enerji yük hesapları",
                        "3D sahne & LED yerleşim planı",
                        "Yedekli ses ve görüntü hatları",
                        "Truss statik ve taşıma kontrolleri",
                        "Renk kalibrasyonu & parlaklık ayarı",
                        "Acil durum senaryosu ve yedek sistem",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5"
                        >
                          <CheckIcon />
                          <span className="text-xs sm:text-sm font-medium text-slate-200">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* İstatistik bandı */}
                <div className="grid gap-3 pt-2 sm:grid-cols-3">
                  {[
                    {
                      value: "250+",
                      label: "Kurumsal etkinlik",
                    },
                    {
                      value: "15+",
                      label: "Yıllık saha deneyimi",
                    },
                    {
                      value: "7/24",
                      label: "Teknik destek",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-3 py-2.5 text-left"
                    >
                      <div className="text-lg font-bold text-cyan-300 leading-tight">
                        {stat.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* SAĞ BLOK – GÖRSEL & MINI INFO KARTLAR */}
            <ScrollReveal direction="left" delay="0.18">
              <div className="relative flex h-full flex-col gap-4">
                {/* Ana görsel kart */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-[0_22px_60px_rgba(15,23,42,1)] min-h-[260px] sm:min-h-[320px]">
                  {/* Glow çerçeve */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_120deg,rgba(34,211,238,0.28),transparent_40%,rgba(56,189,248,0.35),transparent_70%)] opacity-60 blur-xl"
                    aria-hidden="true"
                  />

                  {/* İçerik */}
                  <div className="relative z-10 h-full w-full">
                    <div className="relative h-56 w-full sm:h-64 md:h-72 overflow-hidden rounded-2xl">
                      <Image
                        src="/img/kurumsal/kurumsal-sahne-led-ekran.webp"
                        alt="Kurumsal lansman sahnesi – LED ekran, truss çatı ve profesyonel ışık sistemleri kurulu."
                        fill
                        sizes="(max-width: 1024px) 100vw, 460px"
                        className="object-cover transition-transform duration-[900ms] hover:scale-[1.04]"
                        priority={false}
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          if (e.currentTarget.parentNode) {
                            e.currentTarget.parentNode.style.backgroundColor =
                              "#020617";
                          }
                        }}
                      />

                      {/* Üst rozetler */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-100 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                          Canlı Reji
                        </span>
                        <span className="inline-flex items-center rounded-full border border-cyan-400/70 bg-cyan-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-100 backdrop-blur-md">
                          P3.9 LED Screen
                        </span>
                      </div>

                      {/* Alt açıklama */}
                      <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        <h3 className="text-sm sm:text-base font-semibold text-white">
                          Kurumsal lansman sahne kurulumu
                        </h3>
                        <p className="mt-1 text-[11px] sm:text-xs text-slate-200">
                          İstanbul • 2000+ katılımcı • Çok kameralı canlı yayın
                          &amp; tam teknik prodüksiyon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alt mini bilgi kartları */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 text-lg"
                        aria-hidden="true"
                      >
                        🎧
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Tek elden yönetim
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                      Sahne, LED ekran, ses-ışık, truss, generatör ve reji
                      ekiplerini aynı teknik ekip altında topluyoruz. Siz tek
                      bir muhatap ile tüm süreci yönetiyorsunuz.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-950 via-slate-950 to-sky-950/70 p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-slate-950 text-[13px] font-bold shadow-[0_0_18px_rgba(34,211,238,0.9)]"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                          Sahneva Organizasyon
                        </p>
                      </div>
                      <span className="text-[10px] font-semibold text-cyan-200/80">
                        Kurumsal çözüm ortağınız
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-sky-50/90">
                      Marka yaklaşımınızı anlayan, teknik dili sadeleştirerek
                      yöneten bir ekip ile çalışın. Brief’ten söküme kadar tüm
                      süreci sizin adınıza takip ediyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
