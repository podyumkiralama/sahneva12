// components/ServicesTabs.js (Performans Optimizasyonları Uygulandı)
"use client";

import { useRef, useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

const DEFAULT_SERVICES = [
  {
    id: "sahne",
    title: "Sahne Kiralama",
    icon: "🎪",
// ... (Hizmet detayları aynı kalır)
    image: "/img/hizmet-sahne.webp",
    features: [/* ... */],
    href: "/sahne-kiralama",
  },
// ... Diğer servisler ...
];

const DEFAULT_DICTIONARY = { /* ... */ };
const IMAGE_STYLE = Object.freeze({ /* ... */ });

function formatTitleTemplate(template, title, fallback) { /* ... */ }
function mergeDictionary(base, override = {}) { /* ... */ }

function ServicesTabsComponent({
  servicesData = DEFAULT_SERVICES,
  dictionary: dictionaryOverride,
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

  const imageAltTemplate = useMemo(
    () => dictionary.imageAlt ?? DEFAULT_DICTIONARY.imageAlt,
    [dictionary]
  );
  const overlayButtonTitleTemplate = useMemo(
    () => dictionary.overlayButtonTitle ?? DEFAULT_DICTIONARY.overlayButtonTitle,
    [dictionary]
  );
  const overlayButtonAriaTemplate = useMemo(
    () => dictionary.overlayButtonAria ?? DEFAULT_DICTIONARY.overlayButtonAria,
    [dictionary]
  );

  const [activeTab, setActiveTab] = useState(() => services[0]?.id ?? "");
  const [imageErrors, setImageErrors] = useState({});
  const listRef = useRef(null);

  const activeService = useMemo(
    () => services.find((s) => s.id === activeTab) ?? services[0],
    [activeTab, services]
  );
  
  // Hız Optimizasyonu: Yalnızca ilk servisin ID'si
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
      imageErrors[service.id]
        ? "/img/placeholder-service.webp"
        : service.image,
    [imageErrors]
  );

  // Klavye ile sekmeler arasında gezinme (Aynı kalır, zaten iyi optimize edilmiş)
  const onKeyDownTabs = useCallback((e) => {
// ... (Aynı kalır)
  }, []);

  // Boş state’e karşı guard (teoride)
  if (!services.length) {
    return null;
  }

  return (
    <div className="w-full">
      {/* TAB BUTONLARI */}
      <ScrollReveal asChild>
        <div className="relative mb-12">
          <div
            ref={listRef}
            className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-4 px-4"
            role="tablist"
            aria-label={dictionary.tablistLabel}
            onKeyDown={onKeyDownTabs}
          >
            {services.map((service, index) => (
              <ScrollReveal 
                asChild 
                key={service.id} 
                delay={String(index)}
                // ARIA Hiyerarşi Düzeltmesi (Önceki sorundan)
                role="presentation" 
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === service.id}
                  aria-controls={`panel-${service.id}`}
                  id={`tab-${service.id}`}
                  // Hız Optimizasyonu: Inline handler kullanıldı
                  onClick={() => setActiveTab(service.id)}
                  className={`inline-flex items-center gap-2 px-4 py-3 min-h-11 rounded-xl font-semibold text-sm
                    transition-all duration-300 border-2 whitespace-nowrap flex-shrink-0 focus-ring
                    ${
                      activeTab === service.id
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
              </ScrollReveal>
            ))}
          </div>

          {/* Scroll gradient overlay */}
          <div
            className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </ScrollReveal>

      {/* TAB PANEL */}
      <ScrollReveal direction="up" asChild>
        <div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100"
          role="tabpanel"
          id={`panel-${activeService?.id}`}
          aria-labelledby={`tab-${activeService?.id}`}
          // A11Y/INP: tabIndex={0} korundu, ancak JS ile odaklanma idealdir.
          tabIndex={0}
        >
          {activeService && (
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* METİN KISMI (Aynı kalır) */}
              <ScrollReveal direction="left" asChild>
                {/* ... */}
                <div className="pt-4">
                  <Link
                    href={activeService.href}
                    className="group inline-flex items-center justify-center gap-3
                      bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                      text-white font-bold text-lg px-8 py-4 min-h-11 rounded-xl transition-all duration-300
                      hover:scale-105 shadow-lg w-full md:w-auto focus-ring"
                    title={formatTitleTemplate(
                      dictionary.ctaTitle,
                      activeService.title,
                      DEFAULT_DICTIONARY.ctaTitle
                    )}
                  >
                    <span>{dictionary.ctaLabel}</span>
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
                {/* ... */}
              </ScrollReveal>

              {/* GÖRSEL KISMI */}
              <ScrollReveal direction="right" asChild>
                <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2 group">
                  <Image
                    src={activeService ? getImageSrc(activeService) : ""}
                    alt={formatTitleTemplate(/* ... */)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 380px"
                    quality={70}
                    // PERFORMANS: Sadece ilk aktif görsel için yükleme önceliği verilir.
                    loading={activeService?.id === initialServiceId ? "eager" : "lazy"}
                    decoding="async"
                    placeholder="empty"
                    onError={activeService ? imageErrorHandlers[activeService.id] : undefined}
                    style={IMAGE_STYLE}
                  />

                    {/* ... (Overlay ve Link kısımları aynı kalır) */}
                </div>
              </ScrollReveal>
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
