// components/ServicesTabs.jsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "sahne",
    title: "Sahne Kiralama",
    icon: "🎪",
    description:
      "Profesyonel modüler sahne sistemleri, truss yapılar ve güvenlik ekipmanları. Konser, festival, fuar ve özel etkinlikler için özel tasarım sahne çözümleri.",
    image: "/img/hizmet-sahne.webp",
    features: [
      "Modüler sahne sistemleri (1x1m, 1x2m, 2x2m)",
      "Alüminyum truss ve scaffolding sistemleri",
      "Güvenlik bariyerleri ve crowd control",
      "Profesyonel kurulum ve söküm hizmeti",
      "Yüksek kapasiteli sahne platformları",
    ],
    href: "/sahne-kiralama",
  },
  {
    id: "podyum",
    title: "Podyum Kiralama",
    icon: "👑",
    description:
      "Modüler podyum sistemleri, özel tasarım podyumlar ve protokol masaları. Toplantı, lansman ve ödül törenleri için profesyonel çözümler.",
    image: "/img/hizmet-podyum.webp",
    features: [
      "Modüler podyum sistemleri (30cm, 60cm, 90cm)",
      "Protokol masaları ve arkalık sistemleri",
      "Halı kaplama ve özel yüzey seçenekleri",
      "Hızlı kurulum ve taşınabilirlik",
      "Çeşitli renk ve boyut seçenekleri",
    ],
    href: "/podyum-kiralama",
  },
  {
    id: "led",
    title: "LED Ekran Kiralama",
    icon: "🖥️",
    description:
      "Yüksek çözünürlüklü indoor/outdoor LED ekran çözümleri. P2, P3, P4, P5, P6 pixel pitch seçenekleri ile her türlü etkinlik için ideal.",
    image: "/img/galeri/led-ekran-kiralama-1.webp",
    features: [
      "P2-P6 pixel pitch seçenekleri",
      "IP65 su geçirmez outdoor ekranlar",
      "4500+ nit yüksek parlaklık",
      "HD video işleme ve kontrol sistemleri",
      "Kurulum ve teknik destek",
    ],
    href: "/led-ekran-kiralama",
  },
  {
    id: "ses-isik",
    title: "Ses & Işık Sistemleri",
    icon: "🎭",
    description:
      "Profesyonel ses ve ışık sistemleri kiralama hizmeti. Konser, tiyatro, konferans ve özel etkinlikleriniz için komple ses ve ışık çözümleri.",
    image: "/img/ses-isik/ses-sistemi.webp",
    features: [
      "Line-array ses sistemleri ve dijital mikserler",
      "Kablosuz mikrofon ve monitor sistemleri",
      "Moving head, spot ve LED ışık sistemleri",
      "DMX kontrol ve ışık programlama",
      "Lazer, smoke machine ve özel efektler",
      "Ses ve ışık operatörlüğü hizmeti",
      "Alan akustiğine özel ses optimizasyonu",
    ],
    href: "/ses-isik-sistemleri",
  },
  {
    id: "cadir",
    title: "Çadır Kiralama",
    icon: "⛺",
    description:
      "Açık hava etkinlikleri için profesyonel çadır kurulumları. Su geçirmez, rüzgar dayanıklı çadır sistemleri ve aksesuarları.",
    image: "/img/galeri/cadir-kiralama-1.webp",
    features: [
      "3x3m, 3x6m, 6x6m çadır sistemleri",
      "Su geçirmez ve UV dayanıklı kumaş",
      "Yan duvar ve zemin sistemleri",
      "Aydınlatma ve dekorasyon",
      "Profesyonel montaj ve demontaj",
    ],
    href: "/cadir-kiralama",
  },
  {
    id: "masa-sandalye",
    title: "Masa & Sandalye Kiralama",
    icon: "🪑",
    description:
      "Toplantı, davet, düğün ve özel etkinlikler için profesyonel masa ve sandalye kiralama hizmeti. Şık ve konforlu çözümler.",
    image: "/img/hizmet-masa.webp",
    features: [
      "Toplantı masaları (yuvarlak, dikdörtgen)",
      "Konforlu sandalye ve oturma grupları",
      "Süslü düğün sandalyeleri",
      "Masa örtüsü ve dekorasyon",
      "Teslimat, kurulum ve toplama hizmeti",
    ],
    href: "/masa-sandalye-kiralama",
  },
];

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState("sahne");
  const [imageErrors, setImageErrors] = useState({});
  const listRef = useRef(null);

  const activeService = services.find((s) => s.id === activeTab);

  const handleImageError = (serviceId) => {
    setImageErrors((prev) => ({ ...prev, [serviceId]: true }));
  };

  const getImageSrc = (service) =>
    imageErrors[service.id] ? "/img/placeholder-service.webp" : service.image;

  // Klavye ile sekmeler arasında gezinme (ArrowLeft/Right, Home/End)
  const onKeyDownTabs = useCallback((e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();

    const buttons = listRef.current?.querySelectorAll('[role="tab"]');
    if (!buttons?.length) return;

    const currentIndex = Array.from(buttons).findIndex(
      (b) => b.getAttribute("aria-selected") === "true"
    );

    const move = (index) => {
      const next = buttons[index];
      if (!next) return;
      const id = next.id.replace("tab-", "");
      setActiveTab(id);
      next.focus();
    };

    if (e.key === "ArrowRight") move((currentIndex + 1) % buttons.length);
    if (e.key === "ArrowLeft") move((currentIndex - 1 + buttons.length) % buttons.length);
    if (e.key === "Home") move(0);
    if (e.key === "End") move(buttons.length - 1);
  }, []);

  return (
    <div className="w-full">
      {/* Tab Butonları */}
      <div className="relative mb-12">
        <div
          ref={listRef}
          className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-4 px-4"
          role="tablist"
          aria-label="Hizmet sekmeleri"
          onKeyDown={onKeyDownTabs}
        >
          {services.map((service) => (
            <button
              key={service.id}
              role="tab"
              aria-selected={activeTab === service.id}
              aria-controls={`panel-${service.id}`}
              id={`tab-${service.id}`}
              onClick={() => setActiveTab(service.id)}
              className={`inline-flex items-center gap-2 px-4 py-3 min-h-11 rounded-xl font-semibold text-sm
                          transition-all duration-300 border-2 whitespace-nowrap flex-shrink-0
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70
                          ${activeTab === service.id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg scale-105"
                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                          }`}
            >
              <span className="text-lg" aria-hidden="true">
                {service.icon}
              </span>
              <span className="hidden sm:inline">{service.title}</span>
              <span className="sm:hidden">
                {service.title.includes("&")
                  ? service.title.split("&")[0].trim()
                  : service.title.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Scroll gradient overlay */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Tab Panel */}
      <div
        className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100"
        role="tabpanel"
        id={`panel-${activeService?.id}`}
        aria-labelledby={`tab-${activeService?.id}`}
        tabIndex={0}
      >
        {activeService && (
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Metin Kısmı */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">
                  {activeService.icon}
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-gray-900">
                  {activeService.title}
                </h3>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                {activeService.description}
              </p>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Hizmet Özellikleri
                </h4>

                {/* UL/LI semantik */}
                <ul className="space-y-3">
                  {activeService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <span
                        className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detay CTA */}
              <div className="pt-4">
                <Link
                  href={activeService.href}
                  className="group inline-flex items-center justify-center gap-3
                             bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                             text-white font-bold text-lg px-8 py-4 min-h-11 rounded-xl transition-all duration-300
                             hover:scale-105 shadow-lg w-full md:w-auto focus:outline-none
                             focus-visible:ring-2 focus-visible:ring-purple-500/70"
                  title="Detayları gör ve fiyat teklifi al"
                >
                  <span>Detaylı Bilgi ve Fiyat Teklifi Al</span>
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Görsel Kısmı */}
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2 group">
              <Image
                src={getImageSrc(activeService)}
                alt={`${activeService.title} hizmeti - Sahneva profesyonel çözümü`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 560px"
                quality={75}
                loading="lazy"
                decoding="async"
                placeholder="empty"
                onError={() => handleImageError(activeService.id)}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {activeService.title}
                  </h4>
                  <p className="text-gray-600 text-sm">Profesyonel Çözüm</p>
                </div>
              </div>

              {/* İkon buton — görünür metin yok → aria-label gerekli */}
              <Link
                href={activeService.href}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-lg
                           transition-all duration-300 hover:scale-110 focus:outline-none
                           focus-visible:ring-2 focus-visible:ring-white/70 min-w-11 min-h-11 flex items-center justify-center"
                title={`${activeService.title} detay sayfasına git`}
                aria-label={`${activeService.title} hizmet detay sayfasını aç`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
