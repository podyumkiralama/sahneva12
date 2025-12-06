// components/ServicesTabs.js
"use client";

import { useRef, useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// İKONLAR
// —————————————————————————————————————————

const TechCheckIcon = () => (
  <svg
    className="w-5 h-5 text-emerald-400 shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// —————————————————————————————————————————
// VERİLER (ORİJİNAL)
// —————————————————————————————————————————

const DEFAULT_SERVICES = [
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

const DEFAULT_DICTIONARY = {
  tablistLabel: "Hizmet sekmeleri",
  featuresHeading: "Hizmet Özellikleri",
  ctaLabel: "Detaylı Bilgi ve Fiyat Teklifi Al",
  ctaTitle: "Detayları gör ve fiyat teklifi al",
  imageBadgeLabel: "Profesyonel Çözüm",
  imageAlt: "{{title}} hizmeti - Sahneva profesyonel çözümü",
  overlayButtonTitle: "{{title}} detay sayfasına git",
  overlayButtonAria: "{{title}} hizmet detay sayfasını aç",
};

const TITLE_TEMPLATE_TOKEN = /\{\{\s*title\s*\}\}/g;

const IMAGE_STYLE = Object.freeze({
  objectFit: "cover",
  width: "100%",
  height: "100%",
});

// —————————————————————————————————————————
// YARDIMCI FONKSİYONLAR
// —————————————————————————————————————————

function formatTitleTemplate(template, title, fallback) {
  const source = template ?? fallback;
  if (typeof source === "function") return source(title);
  if (typeof source === "string") return source.replace(TITLE_TEMPLATE_TOKEN, title);
  return title;
}

function mergeDictionary(base, override = {}) {
  const result = { ...base };
  for (const [key, value] of Object.entries(override || {})) {
    if (value && typeof value === "object" && !Array.isArray(value) && typeof base[key] === "object") {
      result[key] = mergeDictionary(base[key], value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

function ServicesTabsComponent({
  servicesData = DEFAULT_SERVICES,
  dictionary: dictionaryOverride,
}) {
  const services = useMemo(
    () => (Array.isArray(servicesData) && servicesData.length ? servicesData : DEFAULT_SERVICES),
    [servicesData]
  );

  const dictionary = useMemo(
    () => mergeDictionary(DEFAULT_DICTIONARY, dictionaryOverride),
    [dictionaryOverride]
  );

  const imageAltTemplate = dictionary?.imageAlt ?? DEFAULT_DICTIONARY.imageAlt;
  const overlayButtonTitleTemplate = dictionary?.overlayButtonTitle ?? DEFAULT_DICTIONARY.overlayButtonTitle;
  const overlayButtonAriaTemplate = dictionary?.overlayButtonAria ?? DEFAULT_DICTIONARY.overlayButtonAria;

  const [activeTab, setActiveTab] = useState(() => services[0]?.id ?? "");
  const [imageErrors, setImageErrors] = useState({});
  const listRef = useRef(null);

  const activeService = useMemo(
    () => services.find((s) => s.id === activeTab) ?? services[0],
    [activeTab, services]
  );

  const initialServiceId = useMemo(() => services[0]?.id, [services]);

  const handleImageError = useCallback((serviceId) => {
    setImageErrors((prev) => ({ ...prev, [serviceId]: true }));
  }, []);

  const imageErrorHandlers = useMemo(
    () =>
      services.reduce((acc, service) => {
        acc[service.id] = () => handleImageError(service.id);
        return acc;
      }, {}),
    [handleImageError, services]
  );

  const getImageSrc = useCallback(
    (service) =>
      imageErrors[service.id] ? "/img/placeholder-service.webp" : service.image,
    [imageErrors]
  );

  // A11Y: Klavye Navigasyonu
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
      // Mobilde odaklanan sekmeyi görünür yap
      next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };
    if (e.key === "ArrowRight") move((currentIndex + 1) % buttons.length);
    if (e.key === "ArrowLeft") move((currentIndex - 1 + buttons.length) % buttons.length);
    if (e.key === "Home") move(0);
    if (e.key === "End") move(buttons.length - 1);
  }, []);

  if (!services.length) return null;

  return (
    <div className="w-full relative">
      
      {/* 1. SEKMELER (GRID LAYOUT - DÜZELTİLDİ) */}
      <ScrollReveal direction="down" delay="0.1">
        <div className="relative mb-8 z-20">
          <div
            ref={listRef}
            // DEĞİŞİKLİK BURADA: Mobilde yatay scroll, Masaüstünde (md+) taşma yok (visible)
            className="overflow-x-auto scrollbar-hide -mx-4 pb-4 md:pb-0 px-4 md:overflow-visible focus:outline-none"
            role="tablist"
            aria-label={dictionary.tablistLabel}
            onKeyDown={onKeyDownTabs}
          >
            {/* DEĞİŞİKLİK: 
              - Mobile: flex (yan yana)
              - Tablet (md): grid-cols-3 (3'lü 2 sıra)
              - Desktop (lg): grid-cols-6 (Hepsi tek satır)
              Bu sayede masaüstünde asla scroll bar çıkmaz.
            */}
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 min-w-max md:min-w-0">
              {services.map((service) => {
                const isActive = activeTab === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${service.id}`}
                    id={`tab-${service.id}`}
                    tabIndex={isActive ? 0 : -1} 
                    onClick={() => setActiveTab(service.id)}
                    className={`
                      group relative flex flex-col md:flex-row lg:flex-col items-center justify-center gap-2 px-3 py-4 rounded-xl font-bold text-sm transition-all duration-300
                      focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2
                      border
                      ${
                        isActive
                          ? "text-white shadow-xl scale-105 z-10 border-transparent"
                          : "text-slate-600 bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700"
                      }
                    `}
                    style={{ minWidth: '140px' }} // Mobilde butonlar çok küçülmesin
                  >
                    {/* Aktif Buton Arkaplanı */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 animate-gradient-x" />
                    )}

                    <span className="relative z-10 text-2xl filter drop-shadow-sm transition-transform group-hover:scale-110" aria-hidden="true">
                      {service.icon}
                    </span>
                    <span className="relative z-10 text-center leading-tight">
                      <span className="block sm:hidden lg:block">
                         {service.title.split(' ')[0]} {/* Mobilde sadece ilk kelime */}
                      </span>
                      <span className="hidden sm:block lg:hidden">
                         {service.title} {/* Tablette tam başlık */}
                      </span>
                      <span className="hidden lg:block text-xs mt-1 font-medium opacity-90">
                         {service.title.split(' ').slice(1).join(' ')}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. ANA PANEL (PREMIUM DARK CARD) */}
      <ScrollReveal direction="up" delay="0.2">
        <div
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0B1120] border border-white/10 shadow-2xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          role="tabpanel"
          id={`panel-${activeService?.id}`}
          aria-labelledby={`tab-${activeService?.id}`}
          tabIndex={0}
        >
          {/* --- Arka Plan Efektleri --- */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full mix-blend-screen opacity-50" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen opacity-50" />
          </div>

          {activeService && (
            <div className="relative z-10 grid lg:grid-cols-[1fr_1.1fr] gap-0">
              
              {/* SOL: İÇERİK */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
                
                {/* Başlık ve Açıklama */}
                <div className="mb-6">
                   <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" aria-hidden="true" />
                      <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">
                        Aktif Hizmet
                      </span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-xl">
                      {activeService.title}
                   </h2>
                   <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-indigo-500 pl-4">
                      {activeService.description}
                   </p>
                </div>

                {/* Özellikler Listesi */}
                <div className="mb-10">
                  <h3 className="text-white font-bold flex items-center gap-2 mb-5 text-sm uppercase tracking-wider opacity-80">
                     <span className="w-5 h-[2px] bg-indigo-500" aria-hidden="true" />
                     {dictionary.featuresHeading}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {activeService.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors"
                      >
                        <TechCheckIcon />
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buton */}
                <div>
                  <Link
                    href={activeService.href}
                    className="group inline-flex items-center gap-4 bg-white text-slate-950 font-bold text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900"
                    title={formatTitleTemplate(dictionary.ctaTitle, activeService.title, DEFAULT_DICTIONARY.ctaTitle)}
                  >
                    <span>{dictionary.ctaLabel}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* SAĞ: GÖRSEL */}
              <div className="relative order-1 lg:order-2 h-[300px] lg:h-auto min-h-full overflow-hidden group">
                 <Image
                    src={activeService ? getImageSrc(activeService) : ""}
                    alt={formatTitleTemplate(imageAltTemplate, activeService.title, DEFAULT_DICTIONARY.imageAlt)}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={85}
                    priority={activeService?.id === initialServiceId}
                    onError={activeService ? imageErrorHandlers[activeService.id] : undefined}
                    style={IMAGE_STYLE}
                 />
                 
                 {/* Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0B1120]/20 to-[#0B1120] lg:bg-gradient-to-r lg:from-[#0B1120] lg:via-transparent lg:to-transparent" aria-hidden="true" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent lg:hidden" aria-hidden="true" />

                 {/* Badge */}
                 <div className="absolute top-6 right-6 z-20">
                    <div className="bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg">
                       {dictionary.imageBadgeLabel}
                    </div>
                 </div>

                 {/* Mobil Başlık (Görsel Üzeri) */}
                 <div className="absolute bottom-6 left-6 z-20 lg:hidden">
                    <h3 className="text-2xl font-black text-white drop-shadow-lg">{activeService.title}</h3>
                 </div>
              </div>

            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}

const ServicesTabs = memo(ServicesTabsComponent);
ServicesTabs.displayName = "ServicesTabs";

export default ServicesTabs;
