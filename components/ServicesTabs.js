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
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————

const DEFAULT_SERVICES = [
  {
    id: "sahne",
    title: "Sahne Kiralama",
    icon: "🎪",
    description:
      "Modüler sahne sistemleri, truss yapılar ve güvenlik ekipmanları. Konser, festival ve özel etkinlikler için profesyonel çözümler.",
    image: "/img/hizmet-sahne.webp",
    features: [
      "Modüler sahne sistemleri",
      "Alüminyum truss yapılar",
      "Güvenlik bariyerleri",
      "Hızlı kurulum"
    ],
    href: "/sahne-kiralama",
  },
  {
    id: "podyum",
    title: "Podyum Kiralama",
    icon: "👑",
    description:
      "Konferans, lansman ve ödül törenleri için profesyonel podyum sistemleri.",
    image: "/img/hizmet-podyum.webp",
    features: ["Modüler yükseklik", "Protokol alanları", "Halı kaplama", "Hızlı kurulum"],
    href: "/podyum-kiralama",
  },
  {
    id: "led",
    title: "LED Ekran Kiralama",
    icon: "🖥️",
    description:
      "Indoor & outdoor yüksek çözünürlüklü LED ekran çözümleri.",
    image: "/img/galeri/led-ekran-kiralama-1.webp",
    features: ["P2-P6 pixel pitch", "IP65 outdoor", "4500+ nit parlaklık", "HD video işlemci"],
    href: "/led-ekran-kiralama",
  },
  {
    id: "ses",
    title: "Ses & Işık Sistemleri",
    icon: "🎭",
    description:
      "Konser, tiyatro ve lansmanlar için profesyonel ses ve ışık çözümleri.",
    image: "/img/ses-isik/ses-sistemi.webp",
    features: ["Line-array", "Kablosuz mikrofon", "Moving head", "DMX kontrol"],
    href: "/ses-isik-sistemleri",
  },
];

// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

function ServicesTabsComponent({
  servicesData = DEFAULT_SERVICES,
  dictionary = {},
  regionLabelId = "services-section-title",
}) {
  const services = servicesData.length ? servicesData : DEFAULT_SERVICES;
  const [active, setActive] = useState(services[0].id);
  const listRef = useRef(null);

  const activeService = useMemo(
    () => services.find((x) => x.id === active),
    [active, services]
  );

  // Klavye navigasyonu
  const onKeyDown = useCallback((e) => {
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;

    const tabs = listRef.current?.querySelectorAll("[role='tab']");
    const arr = Array.from(tabs);
    const index = arr.findIndex((x) => x.id === `tab-${active}`);

    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % arr.length;
    if (e.key === "ArrowLeft") next = (index - 1 + arr.length) % arr.length;

    const nextId = arr[next].id.replace("tab-", "");
    setActive(nextId);
    arr[next].focus();
  }, [active]);

  return (
    <section className="relative py-20 bg-slate-950" aria-labelledby={regionLabelId}>
      
      {/* ARKA PLAN GRID + GLOW */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="absolute top-0 left-1/2 w-[700px] h-[700px] -translate-x-1/2 bg-cyan-500/10 blur-[160px] rounded-full" />
      </div>

      {/* ===================== ANA CONTAINER ===================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">

        {/* ——— BAŞLIK ——— */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider rounded-full bg-slate-800 border border-slate-700 text-cyan-400 mb-3">
              Profesyonel Hizmet
            </span>

            <h2
              id={regionLabelId}
              className="text-4xl md:text-5xl font-black text-white mb-4"
            >
              Teknik Altyapı & <span className="text-cyan-400">Hizmetlerimiz</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed">
              Türkiye geneli sahne, podyum, LED ekran, ses & ışık sistemleri kurulumunda uzman ekip.
            </p>
          </div>
        </ScrollReveal>

        {/* ——— SEKMELER ——— */}
        <div className="mb-10">
          <ScrollReveal direction="down">
            <div
              ref={listRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
              role="tablist"
              aria-orientation="horizontal"
              onKeyDown={onKeyDown}
            >
              {services.map((service) => {
                const isActive = service.id === active;
                return (
                  <button
                    id={`tab-${service.id}`}
                    key={service.id}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    onClick={() => setActive(service.id)}
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg font-bold text-sm whitespace-nowrap
                      border transition-all duration-200
                      ${isActive
                        ? "bg-cyan-500 text-slate-900 border-cyan-400 shadow-lg"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-cyan-400/40 hover:text-cyan-300"}
                    `}
                  >
                    <span className="text-lg">{service.icon}</span>
                    {service.title}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* ——— PANEL ——— */}
        <ScrollReveal direction="up">
          <div className="relative bg-[#0B1120] border border-slate-800 shadow-2xl rounded-xl overflow-hidden">

            {/* Glow + Grid */}
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-cyan-600/20 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-0">

              {/* SOL METİN */}
              <div className="p-10 flex flex-col justify-center">
                <h3 className="text-3xl font-black text-white mb-4">
                  {activeService.title}
                </h3>

                <p className="text-slate-300 leading-relaxed mb-8 border-l-2 border-cyan-500/60 pl-4">
                  {activeService.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {activeService.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-md px-3 py-2">
                      <TechCheckIcon />
                      <span className="text-sm text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={activeService.href}
                  className="inline-flex items-center gap-3 bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] hover:-translate-y-1"
                >
                  Detaylı Bilgi ve Teklif Al
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              {/* SAĞ GÖRSEL */}
              <div className="relative h-[280px] lg:h-full overflow-hidden">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] hover:scale-[1.06]"
                />

                <div className="absolute top-4 right-4 px-3 py-1 text-[11px] bg-black/50 border border-white/20 text-white rounded-md">
                  Profesyonel Çözüm
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
