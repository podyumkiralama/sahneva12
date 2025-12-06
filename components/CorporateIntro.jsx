// components/CorporateIntroStructured.jsx
import React from "react";
import Image from "next/image";

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

export default function CorporateIntroStructured() {
  return (
    <section
      aria-labelledby="kurumsal-intro-title"
      className="relative py-8 md:py-12"
    >
      <div className="max-w-6xl mx-auto px-4 space-y-14 text-neutral-800">

        {/* ===================================================== */}
        {/* ÜST GRID: BAŞLIK + GÖRSEL BLOK */}
        {/* ===================================================== */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center">
          {/* Sol taraf: Başlık + kısa özet */}
          <header className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-600 uppercase">
              Profesyonel Hizmet
            </p>

            <h2
              id="kurumsal-intro-title"
              className="text-3xl md:text-4xl lg:text-[2.55rem] font-bold text-neutral-900 leading-snug"
            >
              Kurumsal{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Sahne, Podyum ve LED Ekran
              </span>{" "}
              Çözümlerimiz
            </h2>

            <p className="text-neutral-700 text-base md:text-lg max-w-3xl">
              Lansman, konferans, bayi toplantısı ve kurumsal etkinlikleriniz için
              sahne, podyum, LED ekran, ses–ışık ve teknik operasyonu tek ekipten
              planlıyor; tasarımdan kuruluma kadar uçtan uca prodüksiyon desteği
              sunuyoruz.
            </p>

            {/* Küçük “pill” avantajlar */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Lansman • Kongre • Bayi Toplantısı",
                "Tek ekip, tek sorumlu",
                "81 ilde kurulum ağı",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  {label}
                </span>
              ))}
            </div>
          </header>

          {/* Sağ taraf: Görsel kart */}
          <figure className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.45)]">
              {/* Arka plan görseli */}
              <div className="relative aspect-[4/3] w-full">
                {/* public/img/kurumsal/kurumsal-intro.webp eklediğinden emin ol */}
                <Image
                  src="/img/kurumsal/kurumsal-intro.webp"
                  alt="Kurumsal sahne, podyum ve LED ekran kurulumu yapılan bir etkinlik"
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                  className="object-cover"
                />
                {/* Overlay’ler (dekoratif) */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-slate-900/20 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.55),transparent_55%),radial-gradient(circle_at_85%_85%,rgba(168,85,247,0.55),transparent_55%)] opacity-70 mix-blend-screen"
                  aria-hidden="true"
                />
              </div>

              {/* Üst label bar */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-100 border border-white/10">
                  Kurumsal Sahne & Altyapı Planlama
                </span>
              </div>

              {/* Alt mini istatistik barı */}
              <div className="absolute inset-x-5 bottom-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl bg-black/65 backdrop-blur-xl px-4 py-3 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 border border-emerald-300/60 text-emerald-300 text-sm font-semibold">
                      4.9
                    </div>
                    <div className="text-xs leading-tight text-slate-100">
                      <p className="font-semibold">500+ proje</p>
                      <p className="text-slate-300/80">
                        Lansman, kongre, miting ve bayi toplantıları
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-[11px] text-slate-200">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                      7/24 Teknik Süpervizör
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 border border-white/15">
                      Resmi sözleşmeli
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>

        {/* ===================================================== */}
        {/* BÖLÜM 1 — Yönetim & Tasarım (detay) */}
        {/* ===================================================== */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900">
            Bütünleşik Etkinlik Yönetimi ve Tasarım
          </h3>
          <p className="text-neutral-700">
            Kurumsal lansmanlardan geniş katılımlı konferanslara kadar, mekan
            keşfiyle başlayan süreci markanızın iletişim diline göre
            şekillendiriyoruz. Teknik ekosistemi tek merkezden yöneterek tüm
            akışın tutarlı, güvenli ve görünür olmasını sağlıyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200 shadow-sm">
              <strong className="block text-neutral-900 mb-2">
                Sahne ve Görüntü
              </strong>
              <p className="text-sm text-neutral-600">
                Modüler sahne, podyum ve markaya özel LED ekran yerleşim tasarımları.
              </p>
            </div>
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200 shadow-sm">
              <strong className="block text-neutral-900 mb-2">
                Teknik Ekosistem
              </strong>
              <p className="text-sm text-neutral-600">
                Ses–ışık, kamera, yayın ve simultane çeviri çözümlerinin entegrasyonu.
              </p>
            </div>
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200 shadow-sm">
              <strong className="block text-neutral-900 mb-2">
                Akış & Branding
              </strong>
              <p className="text-sm text-neutral-600">
                VIP akışları, dekor yönetimi ve sahne bütünlüğüne uygun branding.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* BÖLÜM 2 — Teknik Analiz & Güvenlik */}
        {/* ===================================================== */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900">
            Teknik Analiz ve Güvenlik Standartları
          </h3>
          <p className="text-neutral-700">
            Her proje, güvenlikten ödün vermeyen titiz bir teknik analiz süreciyle
            başlar. Profesyonel ekip etkinlik süresince sahada kalarak kesintisiz bir
            deneyim sağlar.
          </p>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-neutral-700 text-sm font-medium">
                  Akustik, zemin taşıma kapasitesi ve enerji altyapısı analizi
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-neutral-700 text-sm font-medium">
                  3D teknik yerleşim planları (truss, LED, ışık)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-neutral-700 text-sm font-medium">
                  Tahliye ve acil durum senaryolarının plana entegrasyonu
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-neutral-700 text-sm font-medium">
                  Montaj ekipmanları için yük testleri ve sertifika kontrolleri
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-neutral-700 text-sm font-medium">
                  Risk analizleri doğrultusunda yedek enerji çözümleri
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-neutral-700 text-sm font-medium">
                  Etkinlik süresince aktif görüntü ve ses optimizasyonu
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
