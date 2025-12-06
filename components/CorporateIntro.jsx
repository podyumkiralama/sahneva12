import React from "react";

// Inline check icon – minimal & lightweight
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
    <div className="max-w-5xl mx-auto text-base text-neutral-800 leading-relaxed py-8 space-y-16">

      {/* ——————————————————————
          ANA BAŞLIK BLOĞU (H2)
      ——————————————————————— */}
      <header className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.22em] text-blue-600 uppercase">
          Profesyonel Hizmet
        </p>

        <h2
          id="kurumsal-intro-title"
          className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-neutral-900 leading-snug"
        >
          Kurumsal{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Sahne, Podyum ve LED Ekran
          </span>{" "}
          Çözümlerimiz
        </h2>

        <p className="text-neutral-700 text-lg max-w-3xl leading-relaxed">
          Lansman, konferans ve bayi toplantılarında sahne, podyum, LED ekran,
          ses–ışık ve tüm teknik operasyonu tek ekipten planlıyor; kurulumdan
          söküme kadar uçtan uca kurumsal prodüksiyon desteği sağlıyoruz.
        </p>
      </header>

      {/* ——————————————————————
          BÖLÜM 1 — TASARIM + YÖNETİM
      ——————————————————————— */}
      <section>
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">
          Bütünleşik Etkinlik Yönetimi ve Tasarım
        </h3>

        <p className="mb-6 text-neutral-700">
          Kurumsal lansmanlardan geniş katılımlı konferanslara kadar Türkiye genelinde,
          planlamadan uygulamaya uzanan uçtan uca bir hizmet sunuyoruz. Mekan keşfiyle
          başlayan süreci, markanızın iletişim diline özel tasarımlarla şekillendiriyoruz.
        </p>

        {/* 3'lü bilgi kutusu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 shadow-sm">
            <strong className="block text-neutral-900 mb-2">Sahne ve Görüntü</strong>
            <p className="text-sm text-neutral-600">
              Modüler sahne, podyum ve markaya özel LED ekran yerleşim tasarımları.
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 shadow-sm">
            <strong className="block text-neutral-900 mb-2">Teknik Ekosistem</strong>
            <p className="text-sm text-neutral-600">
              Ses-ışık, kamera, yayın ve simultane çeviri çözümlerinin entegrasyonu.
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 shadow-sm">
            <strong className="block text-neutral-900 mb-2">Akış ve Branding</strong>
            <p className="text-sm text-neutral-600">
              VIP akış senaryoları, dekor yönetimi ve sahne bütünlüğüne uygun branding.
            </p>
          </div>
        </div>
      </section>

      {/* ——————————————————————
          BÖLÜM 2 — TEKNİK SÜREÇ
      ——————————————————————— */}
      <section>
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">
          Teknik Analiz ve Güvenlik Standartları
        </h3>

        <p className="mb-6 text-neutral-700">
          Her proje, güvenlikten ödün vermeyen detaylı analizlerle başlar. Teknik
          ekiplerimiz kurulumdan söküme kadar sahada kalarak etkinliğin kesintisiz
          ve güvenli şekilde ilerlemesini sağlar.
        </p>

        {/* 6 maddelik teknik liste */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6" aria-label="Teknik analiz adımları">
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">
                Akustik, zemin yük kapasitesi ve enerji altyapısı analizi.
              </span>
            </li>

            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">
                Teknik çizim ve 3D yerleşim planlaması (Truss, LED, ışık).
              </span>
            </li>

            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">
                Acil durum & tahliye senaryolarının plana entegrasyonu.
              </span>
            </li>

            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">
                Montaj ekipmanları için yük testleri ve sertifika kontrolleri.
              </span>
            </li>

            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">
                Risk analizleri doğrultusunda yedek enerji çözümleri.
              </span>
            </li>

            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">
                Etkinlik süresince aktif görüntü ve ses optimizasyonu.
              </span>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
