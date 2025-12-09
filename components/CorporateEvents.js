// components/CorporateEvents.js
"use client";

import { useId } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// YAPILANDIRMA & VERİLER
// —————————————————————————————————————————

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

function escapeHtmlAttribute(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function OptimizedImage({ src, alt, className }) {
  const safeAlt = escapeHtmlAttribute(alt);
  const safeSrc = escapeHtmlAttribute(src);
  const safeClass = className ? ` ${escapeHtmlAttribute(className)}` : "";
  const html = `<img src="${safeSrc}" alt="${safeAlt}" class="absolute inset-0 h-full w-full object-cover${safeClass}" loading="lazy" decoding="async">`;

  return (
    <div role="img" aria-label={alt} className="absolute inset-0">
      <span className="sr-only">{alt}</span>
      <div aria-hidden dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

export default function CorporateEvents({
  cards = DEFAULT_CARDS,
  advantages = DEFAULT_ADVANTAGES,
  dictionary: dictionaryOverride,
  role,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
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
  const advantagesHeadingId = useId();
  const introId = useId();

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
    "yeni sekmede açılır",
  ]
    .filter(Boolean)
    .join(" — ");

  const phoneAriaDescribedBy = phoneDescription ? phoneHintId : undefined;
  const whatsappAriaDescribedBy = whatsappDescription ? whatsappHintId : undefined;
  const computedHeadingId = ariaLabelledby ?? "corporate-events-heading";
  const computedDescribedBy = ariaDescribedby ?? introId;
  const computedRole = role ?? (ariaLabel || computedHeadingId ? "region" : undefined);

  return (
    <section
      className="relative py-16 md:py-24 bg-[#0B1120] overflow-hidden"
      role={computedRole}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : computedHeadingId}
      aria-describedby={computedDescribedBy}
    >
      {/* Modern Arka Plan Efektleri (Dark Tech) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {!ariaLabel && !ariaLabelledby && (
          <h2 id={computedHeadingId} className="sr-only">
            {dictionary.sectionTitleSr}
          </h2>
        )}

        {/* ——— YENİ EKLENEN BAŞLIK ALANI (SEO & GİRİŞ) ——— */}
        <ScrollReveal direction="up" delay="0.05">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              İstanbul'da <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Kurumsal Etkinlik Yapan Firmalar</span> Arasında Çözüm Ortağınız
            </h2>
            <p
              id={introId}
              className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              Yaratıcı süreçlerden teknik prodüksiyona kadar tüm aşamaları tek merkezden yönetiyor, markanızın prestijini global standartlarda sahneliyoruz.
            </p>
          </div>
        </ScrollReveal>
        {/* ——— BAŞLIK ALANI SONU ——— */}

        {/* 1. KISIM: HİZMET KARTLARI (GLASS DARK) */}
        <ScrollReveal direction="up" delay="0.1">
          <div className="grid gap-6 lg:gap-8 md:grid-cols-3 mb-16 lg:mb-24">
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
                    className="relative flex-1 flex flex-col bg-white/5 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-500 overflow-hidden group-hover:-translate-y-2 group-hover:border-white/20"
                    aria-labelledby={`corp-card-${i}-title`}
                  >
                    {/* Görsel Alanı */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <OptimizedImage
                        src={card.img}
                        alt={card.alt}
                        className="transition-transform duration-700 group-hover:scale-110 will-change-transform"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />
                      
                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-lg">
                            {card.badge || dictionary.cardBadgeLabel}
                         </span>
                      </div>

                      {/* İkon */}
                      <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-xl shadow-lg">
                        {card.icon}
                      </div>
                    </div>

                    {/* İçerik */}
                    <div className="flex-1 p-6 flex flex-col">
                      <h3
                        id={`corp-card-${i}-title`}
                        className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors"
                      >
                        {card.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm mb-4 flex-1">
                        {card.text}
                      </p>

                      <div className="pt-4 border-t border-white/10 mt-auto">
                        <Link
                          href={dictionary.cardCtaHref}
                          className="inline-flex items-center gap-2 font-bold text-xs text-white hover:text-blue-400 transition-colors group/link"
                          aria-label={cardAccessibleLabel}
                        >
                          <span>{cardCtaLabel}</span>
                          <svg 
                            className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" 
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

        {/* 2. KISIM: AVANTAJLAR (NEON GRID - COMPACT) */}
        <ScrollReveal direction="up" delay="0.2">
          <section className="mb-16" aria-labelledby={advantagesHeadingId}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-blue-400 font-bold tracking-wider uppercase text-xs mb-1 block">
                {dictionary.highlightPill}
              </span>
              <h3
                id={advantagesHeadingId}
                className="text-2xl md:text-3xl font-bold text-white"
              >
                {dictionary.highlightTitlePrefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {dictionary.highlightTitleAccent}
                </span>
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((item, i) => {
                // HATA DÜZELTME: colorClass boş gelirse varsayılan boş string ata
                const safeColorClass = item.colorClass || "";
                const safeBorderClass = safeColorClass
                  .split(" ")
                  .filter(c => c.startsWith('border'))
                  .join(" ");

                return (
                  <div
                    key={i}
                    className={`group relative p-5 rounded-xl border transition-all duration-300 bg-white/5 hover:bg-white/10 ${safeBorderClass} border-white/5 hover:border-opacity-50`}
                  >
                    <div className="relative z-10">
                      <div 
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3 transition-all duration-300 border ${safeColorClass}`}
                      >
                         {item.icon === "yw" ? "👷" : item.icon}
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">
                        {item.label}
                      </h4>
                      <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* 3. KISIM: CTA BANNER (COMPACT & FIT) */}
        <ScrollReveal direction="up" delay="0.3">
          <div
            className="relative rounded-[2rem] bg-gradient-to-br from-blue-900 via-indigo-900 to-[#0B1120] p-6 md:p-10 text-center text-white overflow-hidden shadow-2xl border border-white/10"
            role="region"
            aria-labelledby={bannerTitleId}
            aria-describedby={bannerDescId}
          >
            {/* Arka Plan Efektleri */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
               <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-blue-500/20 rounded-full blur-[120px]" />
               <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-purple-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 id={bannerTitleId} className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                {dictionary.bannerTitlePrefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                  {dictionary.bannerTitleHighlight}
                </span>{" "}
                {dictionary.bannerTitleSuffix}
              </h3>
              
              <p
                id={bannerDescId}
                className="text-blue-100/80 text-sm md:text-lg mb-8 leading-relaxed"
              >
                {dictionary.bannerDescription}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
                <a
                  href={dictionary.phoneCtaHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white text-blue-950 font-bold px-6 text-sm md:text-base transition-all hover:bg-blue-50 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  aria-describedby={phoneAriaDescribedBy}
                >
                  <span className="text-lg">📞</span>
                  <span>{dictionary.phoneCtaLabel}</span>
                  {phoneDescription && (
                    <span id={phoneHintId} className="sr-only">{phoneDescription}</span>
                  )}
                </a>

                <a
                  href={dictionary.whatsappCtaHref}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white font-bold px-6 text-sm md:text-base transition-all hover:bg-white/20 hover:scale-105"
                  aria-describedby={whatsappAriaDescribedBy}
                  aria-label={whatsappAccessibleLabel}
                >
                  <span className="text-lg">💬</span>
                  <span>{dictionary.whatsappCtaLabel}</span>
                  {whatsappDescription && (
                    <span id={whatsappHintId} className="sr-only">{whatsappDescription}</span>
                  )}
                  <span className="sr-only">(yeni sekmede açılır)</span>
                </a>
              </div>

              {/* Alt Güven Rozetleri */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm font-medium text-blue-200/60">
                {supportStats.map((label, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
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
