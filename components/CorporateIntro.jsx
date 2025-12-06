import React from 'react';

// Basit, inline SVG ikonlar (Harici kütüphane gerektirmez)
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600 mt-0.5 shrink-0">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

export default function CorporateIntroStructured() {
  return (
    // Ana wrapper orijinal genişlik kısıtlamasını koruyor, ancak iç boşluk eklendi.
    <div className="max-w-4xl mx-auto text-base text-neutral-800 leading-relaxed py-4 space-y-10">

      {/* BÖLÜM 1: İlk paragrafın yapılandırılmış hali */}
      <section>
        {/* Hiyerarşiyi bozmayan, bölüm içi alt başlık (H3 seviyesi görünümünde) */}
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">
          Bütünleşik Etkinlik Yönetimi ve Tasarım
        </h3>
        <p className="mb-6 text-neutral-700">
          Kurumsal lansmanlardan geniş katılımlı konferanslara kadar Türkiye genelinde, planlamadan uygulamaya uzanan uçtan uca bir hizmet sunuyoruz. Mekan keşfiyle başlayan süreci, markanızın iletişim diline özel tasarımlarla şekillendiriyoruz.
        </p>
        
        {/* Hizmetleri vurgulayan 3 sütunlu yapı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
            <strong className="block text-neutral-900 mb-2">Sahne ve Görüntü</strong>
            <p className="text-sm text-neutral-600">Modüler sahne, podyum ve markaya özel LED ekran yerleşim tasarımları.</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
            <strong className="block text-neutral-900 mb-2">Teknik Ekosistem</strong>
            <p className="text-sm text-neutral-600">Ses-ışık, kamera, yayın ve simultane çeviri çözümlerinin entegrasyonu.</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
            <strong className="block text-neutral-900 mb-2">Akış ve Branding</strong>
            <p className="text-sm text-neutral-600">VIP akış senaryoları, dekor yönetimi ve sahne bütünlüğüne uygun branding.</p>
          </div>
        </div>
      </section>

      {/* BÖLÜM 2: İkinci paragrafın yapılandırılmış hali (Teknik detaylar) */}
      <section>
         {/* Hiyerarşiyi bozmayan ikinci alt başlık */}
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">
          Teknik Analiz ve Güvenlik Standartları
        </h3>
        <p className="mb-6 text-neutral-700">
          Her proje, güvenlikten ödün vermeyen titiz bir analiz süreciyle başlar. Profesyonel teknik ekibimizle kurulumdan söküme kadar sahada kalarak kesintisiz bir deneyim sağlıyoruz.
        </p>

        {/* Teknik süreci anlatan iki sütunlu liste yapısı */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">Akustik, zemin yük kapasitesi ve enerji altyapısı analizi.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">Teknik çizim ve 3D yerleşim planlaması (Truss, LED, Işık).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">Acil durum tahliye senaryolarının plana entegrasyonu.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">Montaj ekipmanları için yük testleri ve sertifika kontrolleri.</span>
            </li>
             <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">Risk analizleri doğrultusunda yedek enerji çözümleri.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-neutral-700 text-sm font-medium">Etkinlik süresince sahada aktif görüntü ve ses optimizasyonu.</span>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
