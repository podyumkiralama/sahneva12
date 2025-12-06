import React from "react";

/* ————————————————————————————————
   Minimal & Accessible Inline Check Icon
——————————————————————————————— */
const CheckIcon = () => (
  <span className="inline-flex items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100 w-7 h-7 mt-0.5 shrink-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 text-blue-600"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

export default function CorporateIntroStructured() {
  return (
    <section
      aria-labelledby="corporate-intro-heading"
      className="relative max-w-5xl mx-auto px-4 sm:px-0 py-10"
    >
      {/* Arka plan + gradient şerit */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-1 top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500"
        aria-hidden="true"
      />

      {/* İç kart */}
      <div className="relative rounded-3xl border border-slate-100/80 shadow-[0_20px_60px_rgba(15,23,42,0.06)] bg-white/80 backdrop-blur-sm px-6 sm:px-10 py-8 sm:py-10 space-y-14">
        {/* Üst rozet satırı */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            Kurumsal Sahne & Altyapı Planlama
          </span>
          <span className="text-[11px] text-slate-400">
            Lansman • Kongre • Bayi Toplantısı
          </span>
        </div>

        {/* ————————————————————————————————————
            BÖLÜM 1 — Bütünleşik Etkinlik Yönetimi
        ———————————————————————————————————— */}
        <section>
          <h3
            id="corporate-intro-heading"
            className="text-2xl sm:text-[26px] font-bold text-slate-900 mb-5 tracking-tight"
          >
            Bütünleşik Etkinlik Yönetimi ve Tasarım
          </h3>

          <p className="mb-7 text-[15px] sm:text-base text-neutral-700 leading-relaxed">
            Kurumsal lansmanlardan geniş katılımlı konferanslara kadar Türkiye genelinde,
            planlamadan uygulamaya uzanan uçtan uca bir hizmet sunuyoruz. Mekan keşfiyle
            başlayan süreci, markanızın iletişim diline özel sahne, podyum ve LED ekran
            yerleşimleriyle bütünleştiriyor; görünürlük, akış ve marka algısını aynı anda
            yönetiyoruz.
          </p>

          {/* 3’lü kart yapı – premium görünüm */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 pt-1">
            {[
              {
                title: "Sahne & Görüntü Tasarımı",
                text: "Modüler sahne ve podyum kurgusu, marka kimliğine uygun LED ekran yerleşimleri."
              },
              {
                title: "Teknik Ekosistem",
                text: "Ses-ışık, kamera, kayıt ve simultane çeviri sistemlerinin tek ekosistemde entegrasyonu."
              },
              {
                title: "Akış & Branding",
                text: "VIP akış senaryoları, dekor yönetimi ve sahne bütünlüğünü bozmayan branding çözümleri."
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative h-full rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4.5 sm:px-5 sm:py-5 overflow-hidden transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-[0_14px_40px_rgba(15,23,42,0.07)]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative">
                  <p className="text-[13px] font-semibold text-slate-900 mb-1.5 tracking-tight">
                    {item.title}
                  </p>
                  <p className="text-[13px] text-neutral-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ————————————————————————————————————
            BÖLÜM 2 — Teknik Güvenlik & Analiz
        ———————————————————————————————————— */}
        <section>
          <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 mb-5 tracking-tight">
            Teknik Analiz ve Güvenlik Standartları
          </h3>

          <p className="mb-7 text-[15px] sm:text-base text-neutral-700 leading-relaxed">
            Her proje, güvenlikten ödün vermeyen detaylı bir teknik analizle başlar.
            Akustik yapıdan zemin taşıma kapasitesine, enerji hatlarından tahliye
            senaryolarına kadar tüm kritik noktaları projeye dahil ediyor; kurulumdan
            söküme kadar ekibimizle sahada kalarak kesintisiz bir deneyim sunuyoruz.
          </p>

          <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 sm:p-6">
            <ul
              className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-7"
              aria-label="Kurumsal etkinliklerde uygulanan teknik analiz adımları"
            >
              {[
                "Akustik, zemin taşıma kapasitesi ve enerji altyapısının detaylı analizi.",
                "Truss, LED ve ışık konumlarını içeren teknik çizim ve 3D yerleşim planlaması.",
                "Acil durum ve tahliye senaryolarının sahne kurgusuna entegrasyonu.",
                "Montaj ekipmanları için yük testleri ve sertifika kontrolleri.",
                "Risk analizlerine göre yedek enerji, jeneratör ve güç dağıtım çözümleri.",
                "Etkinlik boyunca canlı görüntü ve ses dengesinin sahada optimize edilmesi.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-[14px] sm:text-[15px] text-neutral-700 font-medium leading-snug">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
