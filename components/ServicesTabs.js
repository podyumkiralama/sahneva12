// components/ServicesTabs.js
"use client";

import { useRef, useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// İKONLAR
// —————————————————————————————————————————

// İkon rengi artık temaya uyacak şekilde ayarlanabilir.
const TechCheckIcon = () => (
  <svg
    className="w-4 h-4 text-cyan-400 shrink-0 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]"
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
// VERİLER (DEĞİŞMEDİ)
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
// YARDIMCI FONKSİYONLAR (DEĞİŞMEDİ)
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

  // A11Y: Klavye navigasyonu (DEĞİŞMEDİ)
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

  const headingId = ariaLabelledBy ?? regionLabelId;

  return (
    <section
      // Arka plan tamamen koyu olacak şekilde ayarlandı
      className="relative py-16 md:py-24 bg-slate-950 overflow-hidden" 
      aria-labelledby={headingId}
    >
      {/* Hafif grid efekti */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Koyu zemin üzerinde açık renkli ızgara */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* TAM GENİŞLİK İÇİN w-full kullanıldı, max-w kaldırıldı.
          px-4 ekledik ki içerik kenarlara yapışmasın. */}
      <div className="relative z-10 px-4 mx-auto w-full"> 
        {/* ——— BAŞLIK ALANI ——— */}
        {!ariaLabelledBy && (
          <ScrollReveal direction="up" delay="0.05">
            {/* Başlık alanı ortalanmış ve okunabilirlik için max-w sınırı korundu */}
            <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
              {/* Pill etiket - Koyu temaya uyumlu */}
              <div className="flex justify-center mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-md">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                    aria-hidden="true"
                  />
                  {dictionary.sectionPill}
                </span>
              </div>

              {/* Başlık - Koyu temaya uyumlu */}
              <h2
                id={regionLabelId}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight"
              >
                {dictionary.sectionTitlePrefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-600">
                  {dictionary.sectionTitleHighlight}
                </span>
              </h2>

              {/* Açıklama - Koyu temaya uyumlu */}
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                {dictionary.sectionDesc}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* ——— İÇERİK ——— */}
        <div className="w-full relative max-w-7xl mx-auto"> 
          {/* İçeriği (Sekmeler ve Panel) geniş ekranlarda bile ortalamak ve okunaklı tutmak için yeniden max-w-7xl ve mx-auto eklenmiştir. Tamamen kenara yapışması gerekiyorsa bu satırı kaldırın. */}

          {/* SEKMELER */}
          <ScrollReveal direction="down" delay="0.1">
            <div className="relative mb-6 z-20">
              <div
                ref={listRef}
                // Yatay kaydırma için -mx-4 ve px-4 sınıfları kaldırıldı.
                // Sekmelerin kapsayıcı div'ine yatay kaydırma eklendi.
                className="overflow-x-auto scrollbar-hide pb-3 md:pb-0 md:overflow-visible focus:outline-none"
                role="tablist"
                aria-label={dictionary.tablistLabel}
                aria-orientation="horizontal"
                onKeyDown={onKeyDownTabs}
              >
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
                          group relative flex flex-col md:flex-row lg:flex-col items-center justify-center gap-1.5 px-3 py-3 font-bold text-xs md:text-sm transition-all duration-200 rounded-lg
                          focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                          
                          ${
                            // Koyu tema buton stilleri
                            isActive
                              ? "text-white bg-slate-800 shadow-lg border border-cyan-500 scale-[1.02]"
                              : "text-slate-400 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400"
                          }
                        `}
                        style={{ minWidth: "148px" }}
                      >
                        {/* Aktif butonda gradient arka plan kalktı, tek renk arka plan kullanıldı. */}
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
            <div
              className="relative overflow-hidden bg-[#0B1120] border border-slate-800 shadow-2xl transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-600/50"
              role="tabpanel"
              id={`panel-${activeService?.id}`}
              aria-labelledby={`tab-${activeService?.id}`}
              tabIndex={0}
            >
              <div
                className="pointer-events-none absolute inset-0 z-0"
                aria-hidden="true"
              >
                {/* Işıltı efektleri (Daha koyu arka plan için renkler ayarlandı) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-600/20 blur-[100px] rounded-full mix-blend-screen opacity-40" />
                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-sky-600/10 blur-[80px] rounded-full mix-blend-screen opacity-40" />
              </div>

              {activeService && (
                <div className="relative z-10 grid lg:grid-cols-[1.08fr_0.92fr] gap-0 min-h-[460px]">
                  {/* SOL: METİN */}
                  <div className="p-7 md:p-10 flex flex-col justify-center order-2 lg:order-1">
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-3 drop-shadow-xl">
                        {activeService.title}
                      </h3>
                      {/* Açıklama - Renk güncellendi */}
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed border-l-2 border-cyan-500/70 pl-4">
                        {activeService.description}
                      </p>
                    </div>

                    <div className="mb-7">
                      {/* Başlık - Renk güncellendi */}
                      <h4 className="text-white/80 font-bold flex items-center gap-2 mb-3 text-xs uppercase tracking-wider">
                        <span
                          className="w-4 h-[2px] bg-cyan-500"
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

                    <div className="mt-auto pt-2">
                      <Link
                        href={activeService.href}
                        // CTA butonu stili koyu temaya uygun (Parlak renkler)
                        className="group inline-flex items-center gap-3 bg-cyan-400 text-slate-950 font-bold text-base px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] hover:translate-y-[-2px] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-slate-950"
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
                          className="w-6 h-6 rounded-full bg-cyan-500/80 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-cyan-400 transition-colors"
                          aria-hidden="true"
                        >
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* SAĞ: GÖRSEL (Aynı kaldı) */}
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

                    {/* Gradient ve overlay'ler */}
                    <div
                      className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0B1120]/30 to-[#0B1120] lg:bg-gradient-to-r lg:from-[#0B1120] lg:via-transparent lg:to-transparent"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent lg:hidden"
                      aria-hidden="true"
                    />

                    {/* Badge ve Başlık (Aynı kaldı) */}
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
