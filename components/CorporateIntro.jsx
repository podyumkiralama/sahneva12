// components/CorporateIntro.jsx
import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

// Modern, neon efektli check ikonu (Daha küçük - compact)
const CheckIcon = () => (
  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-3 h-3 text-emerald-400"
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
      aria-describedby="corporate-intro-desc"
      role="region"
      className="relative overflow-hidden rounded-3xl bg-[#0B1120] border border-white/10 shadow-2xl"
    >
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {/* Izgara Deseni */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Glow Efektleri (Opaklık azaltıldı - daha sakin) */}
        <div className="absolute -top-32 -left-24 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px] mix-blend-screen" />
        <div className="absolute -bottom-40 -right-10 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[100px] mix-blend-screen" />
      </div>

      {/* Padding: p-16 yerine p-8/10 kullanıldı */}
      <div className="relative z-10 grid gap-8 p-6 md:p-8 lg:p-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
        
        {/* --- SOL BLOK (İÇERİK) --- */}
        <div className="flex flex-col gap-6">
          
          {/* 1. BAŞLIK ALANI */}
          <ScrollReveal direction="up" delay="0.05">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                Profesyonel Çözüm Ortağı
              </div>

              <h2
                id="corporate-intro-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white"
              >
                Kurumsal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Sahne &amp; Prodüksiyon
                </span>{" "}
                Yönetimi
              </h2>

              <p
                id="corporate-intro-desc"
                className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400"
              >
                Lansman, zirve ve bayi toplantılarınızda ihtiyaç duyduğunuz
                <span className="text-slate-200 font-medium"> sahne, LED ekran ve teknik altyapıyı </span>
                mühendislik hassasiyetiyle planlıyor, kusursuz bir atmosfer yaratıyoruz.
              </p>
            </div>
          </ScrollReveal>

          {/* 2. HİZMET KARTLARI (Daha ince kutular) */}
          <ScrollReveal direction="up" delay="0.15">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Sahne Tasarımı",
                  desc: "Özel 3D modelleme & dekor.",
                  border: "border-blue-500/20",
                },
                {
                  title: "Görüntü Sistemleri",
                  desc: "Yüksek çözünürlüklü LED & Watchout.",
                  border: "border-purple-500/20",
                },
                {
                  title: "Teknik Prodüksiyon",
                  desc: "Ses, ışık, truss ve reji yönetimi.",
                  border: "border-emerald-500/20",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border ${item.border} bg-white/5 p-3 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-white/10`}
                >
                  <strong className="mb-1 block text-xs sm:text-sm font-semibold text-white">
                    {item.title}
                  </strong>
                  <p className="text-[10px] sm:text-xs leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 3. TEKNİK ANALİZ LISTESİ (Compact Grid) */}
          <ScrollReveal direction="up" delay="0.3">
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-white">
                <span className="text-blue-500" aria-hidden="true">❖</span>
                Teknik Standartlarımız
              </h3>

              <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                <ul className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  {[
                    "Akustik ve enerji hattı analizi",
                    "Teknik çizim & 3D yerleşim",
                    "Acil durum ve güvenlik planı",
                    "Truss yük testleri ve sertifikasyon",
                    "Yedekli (redundant) sistem altyapısı",
                    "Görüntü işlemci optimizasyonu",
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckIcon />
                      <span className="text-xs sm:text-sm font-medium text-slate-300">
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
        {/* Yükseklik kısıtlaması (h-full yerine aspect ratio ve max-height ayarı) */}
        <ScrollReveal direction="left" delay="0.2">
          <div className="relative group h-full min-h-[300px] lg:min-h-[450px]">
            {/* Dekoratif Çerçeve Efekti */}
            <div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-md transition duration-1000 group-hover:opacity-40"
              aria-hidden="true"
            />

            <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-xl">
              <Image
                src="/img/kurumsal/kurumsal-sahne-led-ekran.webp"
                alt="Kurumsal lansman sahne ve LED ekran prodüksiyonu"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* HUD Bilgi Alanı */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 backdrop-blur-md">
                      <span
                        className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
                        aria-hidden="true"
                      />
                      Live System
                    </span>
                    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                      P3.9 LED Screen
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Kurumsal Lansman Sahnesi
                    </h4>
                    <p className="text-xs text-slate-400">
                      İstanbul &bull; 2000+ Katılımcı
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
