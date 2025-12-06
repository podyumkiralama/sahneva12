// components/CorporateIntro.jsx
import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

// Basit inline check ikonu
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

export default function CorporateIntro() {
  return (
    <section
      aria-labelledby="corporate-intro-heading"
      className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white/70 backdrop-blur-sm shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
    >
      {/* Dekoratif BG */}
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <div className="absolute -top-32 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 grid gap-10 p-8 md:p-10 lg:p-12 
                      lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)]">

        {/* SOL BLOK */}
        <div className="flex flex-col gap-8">

          {/* BADGE + ANA BAŞLIK */}
          <ScrollReveal direction="up" delay="0.05">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
                Profesyonel Hizmet
              </div>

              <h2
                id="corporate-intro-heading"
                className="mt-4 text-2xl sm:text-3xl lg:text-[2.4rem] font-bold leading-tight text-slate-900"
              >
                Kurumsal{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500">
                  Sahne, Podyum ve LED Ekran
                </span>{" "}
                Kiralama Çözümlerimiz
              </h2>

              <p className="mt-4 max-w-2xl text-sm sm:text-base text-neutral-700 leading-relaxed">
                Lansman, konferans, bayi toplantısı ve kurumsal etkinlikleriniz için sahne,
                podyum, LED ekran, ses–ışık ve teknik operasyonu
                <strong className="font-semibold text-neutral-900"> tek çatı altında</strong> planlıyoruz.
              </p>
            </div>
          </ScrollReveal>

          {/* BÖLÜM 1 */}
          <ScrollReveal direction="up" delay="0.15">
            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3">
                Bütünleşik Etkinlik Yönetimi ve Tasarım
              </h3>
              <p className="mb-5 text-neutral-700 text-sm sm:text-base leading-relaxed">
                Kurumsal lansmanlardan geniş katılımlı konferanslara kadar Türkiye genelinde,
                planlamadan uygulamaya uzanan uçtan uca bir hizmet sunuyoruz.
              </p>

              <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-3">
                <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                  <strong className="mb-2 block text-sm font-semibold text-neutral-900">
                    Sahne ve Görüntü
                  </strong>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Modüler sahne, podyum ve LED ekran tasarımları.
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                  <strong className="mb-2 block text-sm font-semibold text-neutral-900">
                    Teknik Ekosistem
                  </strong>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Ses-ışık, kamera, yayın ve simultane çeviri entegrasyonu.
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                  <strong className="mb-2 block text-sm font-semibold text-neutral-900">
                    Akış & Branding
                  </strong>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    VIP akış, dekor yönetimi ve marka bütünlüğü.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* BÖLÜM 2 */}
          <ScrollReveal direction="up" delay="0.30">
            <section>
              <h3 className="mt-6 text-lg sm:text-xl font-semibold text-neutral-900 mb-3">
                Teknik Analiz ve Güvenlik Standartları
              </h3>
              <p className="mb-4 text-neutral-700 text-sm sm:text-base leading-relaxed">
                Her proje detaylı bir teknik analiz ile başlar. Kurulumdan söküme kadar
                sahada kalarak kesintisiz bir deneyim sunuyoruz.
              </p>

              <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm">
                <ul className="grid grid-cols-1 gap-y-3 gap-x-6 md:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700">
                      Akustik, zemin taşıma kapasitesi ve enerji hattı analizi.
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700">
                      Truss, LED ve ışık için teknik çizim & 3D planlama.
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700">
                      Acil durum tahliye entegrasyonları.
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700">
                      Yük testleri ve sertifika kontrolleri.
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700">
                      Yedek enerji ve jeneratör çözümleri.
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700">
                      Görüntü & ses optimizasyonu.
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </ScrollReveal>
        </div>

        {/* SAĞ BLOK – GÖRSEL */}
        <ScrollReveal direction="right" delay="0.20">
          <div className="flex items-stretch">
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/90 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none" />

              <Image
                src="/img/kurumsal/kurumsal-sahne-led-ekran.webp"
                alt="Kurumsal lansman sahne ve LED ekran kurulumu"
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover"
              />

              <div className="relative z-10 flex items-center justify-between px-4 pb-3 pt-24 sm:pt-28 text-xs text-slate-200">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  Kurumsal Lansman Sahnesi
                </span>
                <span className="hidden sm:inline text-[0.7rem] text-slate-400">
                  Sahne · LED · Ses & Işık
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
