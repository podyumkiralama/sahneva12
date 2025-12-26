// components/CorporateIntro.jsx
"use client";

import Image from "next/image";

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-cyan-400 flex-shrink-0 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
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
      className="relative bg-[#0B1120] py-16 md:py-20 lg:py-24 2xl:py-28 overflow-hidden"
    >
      {/* Arka Plan Efektleri – Faq.jsx ile aynı tema */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* GRID (z-index güvence) */}
        <div className="absolute inset-0 grid-overlay" />
        {/* Mavi Glow */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* İÇERİK WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ÜST BAŞLIK BLOĞU */}
        <div className="max-w-3xl mb-10 md:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 border border-slate-700/80 shadow-[0_0_18px_rgba(8,47,73,0.8)]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.9)]"
              aria-hidden="true"
            />
            Kurumsal Organizasyon ve Etkinlik Prodüksiyonu
          </div>

          <h2
            id="corporate-intro-heading"
            className="text-2xl sm:text-3xl lg:text-[2.3rem] font-black leading-tight tracking-tight text-white"
          >
            Markanız için{" "}
            <span className="gradient-text gradient-text--safe-xl">
              uçtan uca sahne ve teknik yönetim
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-[15px] leading-relaxed text-slate-300 max-w-2xl">
            Lansman, bayi toplantısı, konferans ve fuarlarınızda;{" "}
            <span className="font-semibold text-slate-50">
              sahne, LED ekran kiralama, ses-ışık ve truss yapıları
            </span>{" "}
            dahil tüm teknik altyapıyı tek ekipten yönetiyoruz. Teknik riskleri sizden
            alıp, kusursuz görünen bir etkinlik akışı tasarlıyoruz.
          </p>
        </div>

        {/* ANA GRID – 2 KOLON */}
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-2 items-start">
          {/* SOL KOLON */}
          <div className="flex flex-col gap-7 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 sm:p-6 md:p-7 shadow-[0_18px_55px_rgba(15,23,42,0.9)]">
            {/* A'DAN Z'YE SÜREÇ */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300 mb-4 flex items-center gap-2">
                <span className="h-[1px] w-6 bg-cyan-400" aria-hidden="true" />
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
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 border border-cyan-500/70 text-[11px] font-bold text-cyan-300 shadow-[0_0_14px_rgba(8,47,73,0.9)]">
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

            {/* TEKNİK STANDARTLAR */}
            <div className="border-t border-slate-800/80 pt-5">
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
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-xs sm:text-sm font-medium text-slate-200">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* İSTATİSTİKLER */}
            <div className="grid gap-3 pt-1 sm:grid-cols-3">
              {[
                { value: "250+", label: "Kurumsal etkinlik" },
                { value: "15+", label: "Yıllık saha deneyimi" },
                { value: "7/24", label: "Teknik destek" },
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

          {/* SAĞ KOLON */}
          <div className="flex flex-col gap-4 h-full">
            {/* ANA GÖRSEL */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-[0_22px_60px_rgba(15,23,42,1)]">
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/9]">
                <Image
                  src="/img/kurumsal/kurumsal-sahne-led-ekran.webp"
                  alt="Kurumsal lansman sahne kurulumu, LED ekran kiralama ve profesyonel ışık sistemleri ile canlı etkinlik."
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover transition-transform duration-[900ms] hover:scale-[1.04]"
                  decoding="async"
                  loading="lazy"
                  placeholder="empty"
                  onError={(e) => {
                    // Next/Image hata durumunda element yine DOM’da kalabilir; en stabil çözüm:
                    // - görseli gizle
                    // - parent'a koyu arka plan ver
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) parent.style.backgroundColor = "#020617";
                  }}
                />

                {/* Üst rozetler */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-emerald-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-100 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Canlı Reji
                  </span>
                  <span className="inline-flex items-center rounded-full border border-cyan-400/70 bg-cyan-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-100 backdrop-blur-md">
                    P3.9 LED Screen
                  </span>
                </div>

                {/* Alt açıklama */}
                <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    Kurumsal lansman sahne kurulumu
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-200">
                    İstanbul • 2000+ katılımcı • Çok kameralı canlı yayın &amp; tam teknik prodüksiyon
                  </p>
                </div>
              </div>
            </div>

            {/* ALT İKİLİ KART */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 text-lg"
                    aria-hidden="true"
                  >
                    🎧
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Tek elden yönetim
                  </p>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                  Sahne, LED ekran, ses-ışık, truss, generatör ve reji ekiplerini aynı teknik ekip
                  altında topluyoruz. Siz tek bir muhatap ile tüm süreci yönetiyorsunuz.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/45 bg-gradient-to-br from-slate-950 via-slate-950 to-sky-950/70 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-slate-950 text-[13px] font-bold shadow-[0_0_18px_rgba(34,211,238,0.9)]"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                      Sahneva Organizasyon
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-cyan-200/80">
                    Kurumsal çözüm ortağınız
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-sky-50/90">
                  Marka yaklaşımınızı anlayan, teknik dili sadeleştirerek yöneten bir ekip ile çalışın.
                  Brief’ten söküme kadar tüm süreci sizin adınıza takip ediyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
