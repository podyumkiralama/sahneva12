// components/ServicesTabs.js
"use client";

import { useRef, useState, useCallback, useMemo, memo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// İKONLAR
// —————————————————————————————————————————

const TechCheckIcon = () => (
  <svg
    className="w-4 h-4 text-emerald-400 shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
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
// VERİLER
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
      "Modüler sahne (1x1m, 1x2m, 2x2m)",
      "Alüminyum truss sistemleri",
      "Güvenlik bariyerleri",
      "Yüksek kapasiteli platform",
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
      "Modüler podyum (30-90cm)",
      "Protokol masaları",
      "Halı ve yüzey kaplama",
      "Hızlı kurulum",
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
      "P2-P6 pixel pitch",
      "IP65 outdoor ekranlar",
      "4500+ nit parlaklık",
      "HD video işleme",
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
      "Line-array ses sistemleri",
      "Kablosuz mikrofonlar",
      "Moving head & Spot",
      "DMX ve lazer şovları",
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
      "3x3m - 6x6m sistemler",
      "Su geçirmez kumaş",
      "Zemin ve aydınlatma",
      "Profesyonel montaj",
    ],
    href: "/cadir-kiralama",
  },
  {
    id: "masa-sandalye",
    title: "Masa & Sandalye",
    icon: "🪑",
    description:
      "Toplantı, davet, düğün ve özel etkinlikler için profesyonel masa ve sandalye kiralama hizmeti. Şık ve konforlu çözümler.",
    image: "/img/hizmet-masa.webp",
    features: [
      "Toplantı masaları",
      "Konforlu sandalyeler",
      "Düğün konseptleri",
      "Örtü ve dekorasyon",
    ],
    href: "/masa-sandalye-kiralama",
  },
];

const DEFAULT_DICTIONARY = {
  sectionPill: "Profesyonel Hizmet",
  sectionTitlePrefix: "Profesyonel Ses-Işık Sistemleri ve",
  sectionTitleHighlight: "Hizmetlerimiz",
  sectionDesc:
    "Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu sağlıyoruz. Farklı şehirlerdeki ekibimizle tüm teknik süreci tek elden planlıyoruz.",

  tablistLabel: "Hizmet sekmeleri",
  featuresHeading: "Hizmet Özellikleri",
  ctaLabel: "Detaylı Bilgi ve Teklif Al",
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
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof base[key] === "object"
    ) {
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
  ariaLabelledBy,
  regionLabelId = "services-section-title",
}) {
  const services = useMemo(
    () =>
      Array.isArray(servicesData) && servicesData.length
        ? servicesData
        : DEFAULT_SERVICES,
    [servicesData]
  );

  const dictionary = useMemo(
    () => mergeDictionary(DEFAULT_DICTIONARY, dictionaryOverride),
    [dictionaryOverride]
  );

  const imageAltTemplate = dictionary?.imageAlt ?? DEFAULT_DICTIONARY.imageAlt;

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
      next.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    };

    if (e.key === "ArrowRight") move((currentIndex + 1) % buttons.length);
    if (e.key === "ArrowLeft") move((currentIndex - 1 + buttons.length) % buttons.length);
    if (e.key === "Home") move(0);
    if (e.key === "End") move(buttons.length - 1);
  }, []);

  if (!services.length) return null;

  return (
    <section
      // Hero ile aradaki boşluğu kısaltmak için üst padding düşürüldü
      className="pt-10 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden"
      aria-labelledby={regionLabelId}
    >
       {/* DEĞİŞİKLİK BURADA: max-w-6xl lg:max-w-7xl kaldırıldı ve container sınıfı kaldırıldı. */}
      <div className="px-4 mx-auto w-full"> 
        {/* ——— BAŞLIK ALANI ——— */}
        {!ariaLabelledBy && (
          <ScrollReveal direction="up" delay="0.05">
            {/* BAŞLIK ALANI İÇİN MAX GENİŞLİK KORUNUYOR (Okunabilirlik için) */}
            <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12"> 
              {/* Pill etiket */}
              <div className="flex justify-center mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider shadow-sm">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
                    aria-hidden="true"
                  />
                  {dictionary.sectionPill}
                </span>
              </div>

              {/* Başlık */}
              <h2
                id={regionLabelId}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
              >
                {dictionary.sectionTitlePrefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {dictionary.sectionTitleHighlight}
                </span>
              </h2>

              {/* Açıklama */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                {dictionary.sectionDesc}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* ——— İÇERİK ——— */}
        <div className="w-full relative">
          {/* SEKMELER */}
          <ScrollReveal direction="down" delay="0.1">
            <div className="relative mb-5 z-20">
              <div
                ref={listRef}
                // Sekme listesi, artık tam genişliği kullanmak için yatay padding'i koruyor
                className="overflow-x-auto scrollbar-hide -mx-4 pb-2 md:pb-0 px-4 md:overflow-visible focus:outline-none" 
                role="tablist"
                aria-label={dictionary.tablistLabel}
                aria-orientation="horizontal"
                onKeyDown={onKeyDownTabs}
              >
                {/* Sekmeler 6'lı grid düzenini (lg:grid-cols-6) kullanarak yeni genişliğe yayılacak */}
                <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-2 min-w-max md:min-w-0"> 
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
                          group relative flex flex-col md:flex-row lg:flex-col items-center justify-center gap-1.5 px-3 py-3 rounded-lg font-bold text-xs md:text-sm transition-all duration-300
                          focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2
                          border
                          ${
                            isActive
                              ? "text-white shadow-xl scale-[1.02] z-10 border-transparent"
                              : "text-slate-600 bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700"
                          }
                        `}
                        style={{ minWidth: "140px" }} // bir tık daha geniş
                      >
                        {isActive && (
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 animate-gradient-x" />
                        )}

                        <span
                          className="relative z-10 text-xl md:text-2xl filter drop-shadow-sm transition-transform group-hover:scale-110"
                          aria-hidden="true"
                        >
                          {service.icon}
                        </span>
                        <span className="relative z-10 text-center leading-tight">
                          <span className="block sm:hidden lg:block">
                            {service.title.split(" ")[0]}
                          </span>
                          <span className="hidden sm:block lg:hidden">
                            {service.title}
                          </span>
                          <span className="hidden lg:block text-[10px] mt-0.5 font-medium opacity-90">
                            {service.title.split(" ").slice(1).join(" ")}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ANA PANEL */}
          <ScrollReveal direction="up" delay="0.2">
            {/* ANA PANEL İÇİN GENİŞLİK AYARI KORUNUYOR (Yatay boşlukları ayarlamak için) */}
            <div
              className="relative overflow-hidden rounded-3xl bg-[#0B1120] border border-white/10 shadow-2xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              role="tabpanel"
              id={`panel-${activeService?.id}`}
              aria-labelledby={`tab-${activeService?.id}`}
              tabIndex={0}
            >
              <div
                className="pointer-events-none absolute inset-0 z-0"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/20 blur-[100px] rounded-full mix-blend-screen opacity-40" />
                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-purple-600/10 blur-[80px] rounded-full mix-blend-screen opacity-40" />
              </div>

              {activeService && (
                <div className="relative z-10 grid lg:grid-cols-[1.05fr_1fr] gap-0">
                  {/* SOL: METİN */}
                  <div className="p-7 md:p-10 flex flex-col justify-center order-2 lg:order-1">
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-3 drop-shadow-xl">
                        {activeService.title}
                      </h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed border-l-2 border-blue-500 pl-4">
                        {activeService.description}
                      </p>
                    </div>

                    <div className="mb-7">
                      <h4 className="text-white/80 font-bold flex items-center gap-2 mb-3 text-xs uppercase tracking-wider">
                        <span
                          className="w-4 h-[2px] bg-blue-500"
                          aria-hidden="true"
                        />
                        {dictionary.featuresHeading}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activeService.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors"
                          >
                            <TechCheckIcon />
                            <span className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Link
                        href={activeService.href}
                        className="group inline-flex items-center gap-3 bg-white text-slate-950 font-bold text-base px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900"
                        title={formatTitleTemplate(
                          dictionary.ctaTitle,
                          activeService.title,
                          DEFAULT_DICTIONARY.ctaTitle
                        )}
                        aria-label={formatTitleTemplate(
                          dictionary.ctaTitle,
                          activeService.title,
                          DEFAULT_DICTIONARY.ctaTitle
                        )}
                      >
                        <span>{dictionary.ctaLabel}</span>
                        <div
                          className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"
                          aria-hidden="true"
                        >
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* SAĞ: GÖRSEL */}
                  <div className="relative order-1 lg:order-2 h-[260px] lg:h-auto min-h-full overflow-hidden group">
                    <Image
                      src={activeService ? getImageSrc(activeService) : ""}
                      alt={formatTitleTemplate(
                        imageAltTemplate,
                        activeService.title,
                        DEFAULT_DICTIONARY.imageAlt
                      )}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={80}
                      priority={activeService?.id === initialServiceId}
                      onError={
                        activeService
                          ? imageErrorHandlers[activeService.id]
                          : undefined
                      }
                      style={IMAGE_STYLE}
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0B1120]/30 to-[#0B1120] lg:bg-gradient-to-r lg:from-[#0B1120] lg:via-transparent lg:to-transparent"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent lg:hidden"
                      aria-hidden="true"
                    />

                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-lg">
                        {dictionary.imageBadgeLabel}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 z-20 lg:hidden">
                      <h4 className="text-xl font-black text-white drop-shadow-lg">
                        {activeService.title}
                      </h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

const ServicesTabs = memo(ServicesTabsComponent);
ServicesTabs.displayName = "ServicesTabs";

export default ServicesTabs;
