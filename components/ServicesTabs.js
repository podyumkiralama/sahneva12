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
    className="w-4 h-4 text-cyan-400 shrink-0 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]"
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
      "Konser, festival, miting ve kurumsal organizasyonlar için modüler sahne çözümleri. Truss yapılar, güvenlik bariyerleri ve profesyonel kurulum ekibi ile anahtar teslim sahne sistemleri.",
    image: "/img/hizmet-sahne.webp",
    features: [
      "1x1m, 1x2m, 2x2m modüler sahne panelleri",
      "Alüminyum truss çatı ve portal sistemleri",
      "Güvenlik bariyeri ve merdiven çözümleri",
      "Hızlı kurulum, gece söküm desteği",
    ],
    href: "/sahne-kiralama",
  },
  {
    id: "podyum",
    title: "Podyum Kiralama",
    icon: "👑",
    description:
      "Konferans, lansman, ödül töreni ve gala geceleri için şık podyum kurulumu. Protokol podyumları, konuşma kürsüleri ve basamaklı platform çözümleri.",
    image: "/img/hizmet-podyum.webp",
    features: [
      "30–90 cm ayarlanabilir yükseklik",
      "Protokol ve konuşmacı podyumları",
      "Halı, karo halı ve özel kaplama seçenekleri",
      "Kurumsal konsepte uygun tasarım",
    ],
    href: "/podyum-kiralama",
  },
  {
    id: "led",
    title: "LED Ekran Kiralama",
    icon: "🖥️",
    description:
      "Indoor ve outdoor etkinlikler için yüksek parlaklık ve çözünürlüklü LED ekran sistemleri. Konser, fuar, lansman ve canlı yayınlar için ideal görüntü çözümleri.",
    image: "/img/galeri/led-ekran-kiralama-1.webp",
    features: [
      "P2, P3, P4, P5, P6 pixel pitch seçenekleri",
      "IP65 outdoor hava şartlarına dayanıklı kabinler",
      "4500+ nit parlaklık ile gün ışığında görünürlük",
      "Profesyonel video işlemci ve operatör desteği",
    ],
    href: "/led-ekran-kiralama",
  },
  {
    id: "ses-isik",
    title: "Ses & Işık Sistemleri",
    icon: "🎭",
    description:
      "Konser, tiyatro, festival ve kurumsal etkinlikler için profesyonel ses ve ışık sistemleri kiralama. Teknik ekibimizle baştan sona sahne yönetimi.",
    image: "/img/ses-isik/ses-sistemi.webp",
    features: [
      "Line-array ve subwoofer ses sistemleri",
      "Kablosuz el, yaka ve kürsü mikrofonları",
      "Moving head, spot, wash ve efekt ışıklar",
      "DMX kontrol, ışık tasarımı ve operatör",
    ],
    href: "/ses-isik-sistemleri",
  },
  {
    id: "cadir",
    title: "Çadır Kiralama",
    icon: "⛺",
    description:
      "Fuar, festival, düğün ve açık hava organizasyonları için endüstriyel çadır sistemleri. Hava şartlarına dayanıklı, güvenli ve estetik çözümler.",
    image: "/img/galeri/cadir-kiralama-1.webp",
    features: [
      "3x3 m’den 10x10 m’ye modüler çadır sistemleri",
      "Su geçirmez, UV dayanımlı tente kumaşları",
      "Zemin kaplama, aydınlatma ve ısıtma çözümleri",
      "Profesyonel kurulum ve sabitleme",
    ],
    href: "/cadir-kiralama",
  },
  {
    id: "masa-sandalye",
    title: "Masa & Sandalye Kiralama",
    icon: "🪑",
    description:
      "Toplantı, davet, açılış ve düğün organizasyonları için masa, sandalye ve oturma düzeni çözümleri. Şık, konforlu ve kurumsal tarza uygun seçenekler.",
    image: "/img/hizmet-masa.webp",
    features: [
      "Banket masa, kokteyl masa ve toplantı masaları",
      "Katlanır, chiavari ve banket sandalyeleri",
      "Masa örtüsü, tül, runner ve dekorasyon",
      "Planlama desteği ile oturma düzeni tasarımı",
    ],
    href: "/masa-sandalye-kiralama",
  },
];

// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

function ServicesTabsComponent({
  servicesData = DEFAULT_SERVICES,
  regionLabelId = "services-section-title",
}) {
  const services = servicesData?.length ? servicesData : DEFAULT_SERVICES;
  const [active, setActive] = useState(services[0].id);
  const listRef = useRef(null);

  const activeService = useMemo(
    () => services.find((s) => s.id === active) ?? services[0],
    [active, services]
  );

  const onKeyDownTabs = useCallback(
    (e) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;

      const tabs = listRef.current?.querySelectorAll("[role='tab']");
      if (!tabs || !tabs.length) return;

      const arr = Array.from(tabs);
      const currentIndex = arr.findIndex((el) => el.id === `tab-${active}`);

      let nextIndex = currentIndex;

      if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % arr.length;
      if (e.key === "ArrowLeft")
        nextIndex = (currentIndex - 1 + arr.length) % arr.length;
      if (e.key === "Home") nextIndex = 0;
      if (e.key === "End") nextIndex = arr.length - 1;

      const nextEl = arr[nextIndex];
      if (!nextEl) return;

      const nextId = nextEl.id.replace("tab-", "");
      setActive(nextId);
      nextEl.focus();
    },
    [active]
  );

  return (
    <section
      className="relative py-20 bg-slate-950 overflow-hidden"
      aria-labelledby={regionLabelId}
    >
      {/* ARKA PLAN IZGARA + GLOW */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/12 blur-[180px] rounded-full" />
      </div>

      {/* ANA CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* BAŞLIK */}
        <ScrollReveal direction="up" delay="0.05">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-md">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                  aria-hidden="true"
                />
                Profesyonel Hizmet
              </span>
            </div>

            <h2
              id={regionLabelId}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
            >
              Teknik Altyapı &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">
                Hizmetlerimiz
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Türkiye genelinde sahne, podyum, LED ekran, ses & ışık, çadır ve ekipman
              kiralama hizmetleriyle kurumsal ve bireysel etkinliklerinizde teknik
              çözüm ortağınız oluyoruz.
            </p>
          </div>
        </ScrollReveal>

        {/* SEKMELER */}
        <ScrollReveal direction="down" delay="0.1">
          <div className="mb-8">
            <div
              ref={listRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
              role="tablist"
              aria-orientation="horizontal"
              onKeyDown={onKeyDownTabs}
            >
              {services.map((service) => {
                const isActive = service.id === active;
                return (
                  <button
                    key={service.id}
                    id={`tab-${service.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(service.id)}
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg font-bold text-xs md:text-sm whitespace-nowrap
                      border transition-all duration-200
                      ${
                        isActive
                          ? "bg-cyan-400 text-slate-900 border-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.5)] scale-[1.02]"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-400/60 hover:text-cyan-300"
                      }
                    `}
                  >
                    <span className="text-lg md:text-xl" aria-hidden="true">
                      {service.icon}
                    </span>
                    <span>{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* PANEL */}
        <ScrollReveal direction="up" delay="0.15">
          <div className="relative bg-[#050816] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Arka plan efektleri */}
            <div
              className="pointer-events-none absolute inset-0 z-0"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute right-[-80px] top-[-80px] w-[320px] h-[320px] bg-cyan-500/25 blur-[110px] rounded-full" />
              <div className="absolute left-[-60px] bottom-[-60px] w-[260px] h-[260px] bg-sky-500/20 blur-[90px] rounded-full" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 min-h-[420px]">
              {/* SOL: METİN */}
              <div className="p-7 md:p-10 flex flex-col justify-center order-2 lg:order-1">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
                    {activeService.title}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed border-l-2 border-cyan-500/70 pl-4">
                    {activeService.description}
                  </p>
                </div>

                <div className="mb-7">
                  <h4 className="text-white/80 font-bold flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.16em]">
                    <span
                      className="w-4 h-[2px] bg-cyan-500"
                      aria-hidden="true"
                    />
                    Hizmet Özellikleri
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeService.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-colors"
                      >
                        <TechCheckIcon />
                        <span className="text-xs md:text-sm font-medium text-slate-200 group-hover:text-white">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <Link
                    href={activeService.href}
                    className="inline-flex items-center gap-3 bg-cyan-400 text-slate-950 font-bold text-sm md:text-base px-6 py-3 rounded-lg shadow-[0_0_22px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] hover:-translate-y-[2px] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/60 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    Detaylı Bilgi ve Teklif Al
                    <div
                      className="w-7 h-7 rounded-full bg-cyan-500/85 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-cyan-400 transition-colors"
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
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                  priority={activeService.id === services[0].id}
                />

                <div
                  className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050816]/40 to-[#050816] lg:bg-gradient-to-r lg:from-[#050816] lg:via-transparent lg:to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-black/50 backdrop-blur-md border border-white/25 text-white text-[10px] font-semibold px-3 py-1.5 rounded-md shadow-lg">
                    Profesyonel Çözüm
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 z-20 lg:hidden">
                  <h4 className="text-lg font-black text-white drop-shadow-lg">
                    {activeService.title}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const ServicesTabs = memo(ServicesTabsComponent);
ServicesTabs.displayName = "ServicesTabs";

export default ServicesTabs;
