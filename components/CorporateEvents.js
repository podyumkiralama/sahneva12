// components/CorporateEvents.js
"use client";

import Image from "next/image";
import { Fragment, useId } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// YAPILANDIRMA & VERİLER
// —————————————————————————————————————————

const CARD_SIZES =
  "(max-width: 768px) 100vw, " +
  "(max-width: 1024px) calc((100vw - 4rem) / 2), " +
  "calc((1280px - 4rem) / 3)";

const DEFAULT_CARDS = [
  {
    slug: "lansman",
    title: "Ürün Lansmanları",
    img: "/img/kurumsal/lansman.webp",
    alt: "Marka lansmanı için profesyonel sahne ve LED ekran prodüksiyonu",
    text: "Marka prestijinizi zirveye taşıyan, hatasız teknik akış ve etkileyici görsel şovlarla kurgulanmış kusursuz lansmanlar.",
    icon: "🚀",
    badge: "Yüksek Prestij",
  },
  {
    slug: "konferans",
    title: "Kongre & Zirve",
    img: "/img/kurumsal/konferans.webp",
    alt: "Uluslararası kongre ve zirve teknik altyapı hizmetleri",
    text: "Global standartlarda ses netliği, kesintisiz görüntü aktarımı ve simultane altyapı ile mesajınız kitlelere ulaşsın.",
    icon: "🎤",
    badge: "Global Standart",
  },
  {
    slug: "bayi-toplantisi",
    title: "Bayi & Kurumsal Etkinlik",
    img: "/img/kurumsal/bayi-toplantisi.webp",
    alt: "Kurumsal bayi toplantısı sahne ve ışık sistemleri",
    text: "Kurum kültürünüzü yansıtan sahne tasarımları ve aidiyet duygusunu güçlendiren atmosferler yaratıyoruz.",
    icon: "🤝",
    badge: "Tam Çözüm",
  },
];

// Dark Mode uyumlu renk sınıfları güncellendi
const DEFAULT_ADVANTAGES = [
  {
    icon: "⚡",
    label: "Operasyonel Hız",
    desc: "Planlanan saatte, eksiksiz teslimat garantisi.",
    colorClass: "text-blue-300 bg-blue-500/10 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
  },
  {
    icon: "💎",
    label: "Premium Envanter",
    desc: "Sıfır hata payı için düzenli bakımı yapılan güncel ekipmanlar.",
    colorClass: "text-purple-300 bg-purple-500/10 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
  },
  {
    icon: "yw", // "👷"
    label: "Saha Deneyimi",
    desc: "Kriz anlarını yönetebilen, 10+ yıl deneyimli teknik kadro.",
    colorClass: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  },
  {
    icon: "🛡️",
    label: "Kurumsal Güvence",
    desc: "Sözleşmeli hizmet, faturalı süreç ve teknik süpervizör desteği.",
    colorClass: "text-amber-300 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  },
];

const WHATSAPP_CORPORATE_MESSAGE = encodeURIComponent(
  "Merhaba, kurumsal etkinlik çözümleri için Sahneva'dan teklif almak istiyorum."
);

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R";

const DEFAULT_DICTIONARY = {
  sectionTitleSr: "Kurumsal etkinlik çözümleri ve hizmet detayları",
  highlightPill: "Neden Biz?",
  highlightTitlePrefix: "Kurumsal Süreçlerde",
  highlightTitleAccent: "Güvenilir Çözüm Ortağınız",
  advantagesAriaLabel: "Sahneva kurumsal hizmet avantajları",
  cardCtaLabel: "Projeyi İncele",
  cardCtaLabels: {
    lansman: "Lansman Çözümleri",
    konferans: "Teknik Altyapı",
    "bayi-toplantisi": "Toplantı Çözümleri",
  },
  cardCtaHref: "/iletisim",
  cardCtaAria: "{{title}} için kurumsal teklif al",
  cardBadgeLabel: "Kurumsal",
  
  // BANNER ALANI
  bannerTitlePrefix: "Etkinliğinizi",
  bannerTitleHighlight: "Şansa Bırakmayın",
  bannerTitleSuffix: "",
  bannerDescription:
    "Sahne, ışık, LED ekran ve teknik prodüksiyon süreçlerinizi tek merkezden, profesyonel bir ekiple yönetin. Risksiz, stressiz ve kusursuz bir organizasyon deneyimi.",
  
  phoneCtaLabel: "Kurumsal Destek Hattı",
  phoneCtaHref: "tel:+905453048671",
  phoneCtaAria: "Kurumsal destek hattını ara: +90 545 304 86 71",
  whatsappCtaLabel: "Hızlı Teklif Al",
  whatsappCtaHref: `https://wa.me/905453048671?text=${WHATSAPP_CORPORATE_MESSAGE}&utm_source=homepage&utm_medium=corporate_whatsapp`,
  whatsappCtaAria: "WhatsApp üzerinden kurumsal fiyat teklifi isteyin",
  whatsappSrHint: "(yeni pencerede açılır)",
  
  supportStats: ["Resmi Sözleşmeli", "7/24 Teknik Süpervizör", "Anahtar Teslim"],
};

const TITLE_TEMPLATE_TOKEN = /\{\{\s*title\s*\}\}/g;

// —————————————————————————————————————————
// YARDIMCI FONKSİYONLAR
// —————————————————————————————————————————

function resolveTitleTemplate(template, title) {
  const source = template ?? DEFAULT_DICTIONARY.cardCtaAria;
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

function OptimizedImage({ src, alt, sizes, className }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      loading="lazy"
      decoding="async"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      quality={80}
    />
  );
}

// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

export default function CorporateEvents({
  cards = DEFAULT_CARDS,
  advantages = DEFAULT_ADVANTAGES,
  dictionary: dictionaryOverride,
} = {}) {
  const dictionary = mergeDictionary(DEFAULT_DICTIONARY, dictionaryOverride);
  const cardCtaAriaTemplate = dictionary.cardCtaAria;
  const supportStats = Array.isArray(dictionary.supportStats)
    ? dictionary.supportStats
    : DEFAULT_DICTIONARY.supportStats;

  const phoneHintId = useId();
  const whatsappHintId = useId();
  const bannerTitleId = useId();
  const bannerDescId = useId();

  const phoneDescription = dictionary.phoneCtaAria?.trim();
  const whatsappDescription = [
    dictionary.whatsappCtaAria?.trim(),
    dictionary.whatsappSrHint?.trim(),
  ]
    .filter(Boolean)
    .join(" — ");

  const whatsappAccessibleLabel = [
    dictionary.whatsappCtaLabel,
    dictionary.whatsappCtaAria,
  ]
    .filter(Boolean)
    .join(" — ");

  const phoneAriaDescribedBy = phoneDescription ? phoneHintId : undefined;
  const whatsappAriaDescribedBy = whatsappDescription ? whatsappHintId : undefined;

  return (
    <section
      className="relative py-20 md:py-24 bg-[#0B1120] overflow-hidden"
      aria-labelledby="corporate-events-title"
    >
      {/* Modern Arka Plan Efektleri (Dark Tech) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <h2 id="corporate-events-title" className="sr-only">
          {dictionary.sectionTitleSr}
        </h2>

        {/* 1. KISIM: HİZMET KARTLARI (GLASS DARK) */}
        <ScrollReveal direction="up" delay="0.1">
          <div className="grid gap-8 lg:gap-10 md:grid-cols-3 mb-20 lg:mb-24">
            {cards.map((card, i) => {
              const cardCtaLabel =
                dictionary.cardCtaLabels?.[card.slug] ?? dictionary.cardCtaLabel;
              const cardCtaAria = resolveTitleTemplate(cardCtaAriaTemplate, card.title);
              const cardAccessibleLabel = cardCtaAria
                ? `${cardCtaLabel} — ${cardCtaAria}`
                : cardCtaLabel;

              return (
                <div key={card.slug} className="group flex flex-col h-full">
                  <article
                    className="relative flex-1 flex flex-col bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-sm transition-all duration-500 overflow-hidden group-hover:-translate-y-2 group-hover:border-white/20"
                    aria-labelledby={`corp-card-${i}-title`}
                  >
                    {/* Görsel Alanı */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <OptimizedImage
                        src={card.img}
                        alt={card.alt}
                        sizes={CARD_SIZES}
                        className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />
                      
                      {/* Badge */}
                      <div className="absolute top-5 right-5">
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-lg">
                            {card.badge || dictionary.cardBadgeLabel}
                         </span>
                      </div>

                      {/* İkon */}
                      <div className="absolute bottom-5 left-5 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        {card.icon}
                      </div>
                    </div>

                    {/* İçerik */}
                    <div className="flex-1 p-8 flex flex-col">
                      <h3
                        id={`corp-card-${i}-title`}
                        className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors"
                      >
                        {card.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm mb-6 flex-1">
                        {card.text}
                      </p>

                      <div className="pt-6 border-t border-white/10 mt-auto">
                        <Link
                          href={dictionary.cardCtaHref}
                          className="inline-flex items-center gap-2 font-bold text-sm text-white hover:text-blue-400 transition-colors group/link"
                          aria-label={cardAccessibleLabel}
                        >
                          <span>{cardCtaLabel}</span>
                          <svg 
                            className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 2. KISIM: AVANTAJLAR (NEON GRID) */}
        <ScrollReveal direction="up" delay="0.2">
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-blue-400 font-bold tracking-wider uppercase text-xs mb-2 block">
                {dictionary.highlightPill}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                {dictionary.highlightTitlePrefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {dictionary.highlightTitleAccent}
                </span>
              </h3>
            </div>

            <div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              aria-label={dictionary.advantagesAriaLabel}
            >
              {advantages.map((item, i) => (
                <div
                  key={i}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 bg-white/5 hover:bg-white/10 ${item.colorClass.split(" ").filter(c => c.startsWith('border')).join(" ")} border-white/5 hover:border-opacity-50`}
                >
                  <div className="relative z-10">
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 border ${item.colorClass}`}
                    >
                       {item.icon === "yw" ? "👷" : item.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {item.label}
                    </h4>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 3. KISIM: CTA BANNER (GRADIENT STANDOUT) */}
        <ScrollReveal direction="up" delay="0.3">
          <div
            className="relative rounded-[2.5rem] bg-gradient-to-br from-blue-900 via-indigo-900 to-[#0B1120] p-8 md:p-16 text-center text-white overflow-hidden shadow-2xl border border-white/10"
            role="region"
            aria-labelledby={bannerTitleId}
            aria-describedby={bannerDescId}
          >
            {/* Arka Plan Efektleri */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
               <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-blue-500/20 rounded-full blur-[120px]" />
               <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-purple-500/20 rounded-full blur-[120px]" />
               <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-[0.05]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 id={bannerTitleId} className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {dictionary.bannerTitlePrefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                  {dictionary.bannerTitleHighlight}
                </span>{" "}
                {dictionary.bannerTitleSuffix}
              </h3>
              
              <p
                id={bannerDescId}
                className="text-blue-100/80 text-lg md:text-xl mb-10 leading-relaxed"
              >
                {dictionary.bannerDescription}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <a
                  href={dictionary.phoneCtaHref}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white text-blue-950 font-bold px-8 transition-all hover:bg-blue-50 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  aria-describedby={phoneAriaDescribedBy}
                >
                  <span className="text-xl">📞</span>
                  <span>{dictionary.phoneCtaLabel}</span>
                  {phoneDescription && (
                    <span id={phoneHintId} className="sr-only">{phoneDescription}</span>
                  )}
                </a>

                <a
                  href={dictionary.whatsappCtaHref}
                  target="_blank"
                  rel="nofollow noopener"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white font-bold px-8 transition-all hover:bg-white/20 hover:scale-105"
                  aria-describedby={whatsappAriaDescribedBy}
                  aria-label={whatsappAccessibleLabel}
                >
                  <span className="text-xl">💬</span>
                  <span>{dictionary.whatsappCtaLabel}</span>
                  {whatsappDescription && (
                    <span id={whatsappHintId} className="sr-only">{whatsappDescription}</span>
                  )}
                </a>
              </div>

              {/* Alt Güven Rozetleri */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-blue-200/60">
                {supportStats.map((label, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                     {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
