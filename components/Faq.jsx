// components/Faq.jsx
"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { FAQ_ITEMS } from "../lib/faqData";

const FAQ_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, SSS bölümünden ulaşıyorum. Etkinlik ve ekipman kiralama için bilgi almak istiyorum."
);

/**
 * Daha belirgin, tutarlı odak halkası:
 * - offset koyu zeminde net görünür
 * - outline kapatılır, ring görünür
 */
const FOCUS_RING_CLASS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]";

const DEFAULT_DICTIONARY = {
  sectionPill: "Merak Edilenler",
  sectionTitlePrefix: "Kiralama Süreci ve",
  sectionTitleHighlight: "Sıkça Sorulanlar",
  sectionDesc:
    "Sahne, LED ekran, ses-ışık sistemleri ve teknik operasyon süreçleri hakkında aklınıza takılan tüm soruları yanıtlıyoruz.",

  supportTitle: "Cevabı bulamadınız mı?",
  supportDesc:
    "Projeniz özel bir çözüm gerektiriyor olabilir. Uzman teknik ekibimizle görüşün.",
  supportPhoneLabel: "Bizi Arayın",
  supportWhatsappLabel: "WhatsApp Destek",
  supportMailLabel: "E-posta Gönder",

  contactPhone: "+90 545 304 86 71",
  contactPhoneHref: "tel:+905453048671",
  contactWhatsappHref: `https://wa.me/905453048671?text=${FAQ_WHATSAPP_MESSAGE}`,
  contactMail: "info@sahneva.com",
  contactMailHref: "mailto:info@sahneva.com",

  regionTitleSr: "Sıkça sorulan sorular bölümü içeriği",
};

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

/* --------------------------------------------------
   TEKİL SORU (ACCORDION)
-------------------------------------------------- */
const FaqRow = React.memo(function FaqRow({
  question,
  answer,
  slug,
  isOpen,
  onToggle,
}) {
  const contentRef = useRef(null);
  const contentInnerRef = useRef(null);
  const measuredHeightRef = useRef(0);
  const rafIdRef = useRef(null);

  const scheduleHeightWrite = useCallback(
    (nextHeight) => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      rafIdRef.current = requestAnimationFrame(() => {
        const host = contentRef.current;
        if (!host) return;

        const heightValue = isOpen ? `${Math.ceil(nextHeight)}px` : "0px";
        if (host.style.height !== heightValue) host.style.height = heightValue;
      });
    },
    [isOpen]
  );

  useEffect(() => {
    const innerEl = contentInnerRef.current;
    if (!innerEl) return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      measuredHeightRef.current = entry.contentRect.height;
      scheduleHeightWrite(entry.contentRect.height);
    });

    observer.observe(innerEl);

    return () => observer.disconnect();
  }, [scheduleHeightWrite]);

  useEffect(() => {
    scheduleHeightWrite(measuredHeightRef.current);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isOpen, scheduleHeightWrite]);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "bg-white/10 border-sky-400/50 shadow-lg shadow-sky-900/20"
          : "bg-white/5 border-white/5 hover:border-white/12"
      }`}
    >
      {/* Kısmi glow efekti (accordion başına) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -top-20 -left-24 w-[240px] h-[240px] rounded-full bg-sky-500/10 blur-[80px] mix-blend-screen" />
          <div className="absolute -bottom-24 -right-20 w-[260px] h-[260px] rounded-full bg-indigo-500/10 blur-[90px] mix-blend-screen" />
        </div>

        {isOpen && (
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-28 w-[300px] h-[300px] rounded-full bg-sky-500/14 blur-[95px] mix-blend-screen" />
            <div className="absolute -bottom-28 -right-24 w-[320px] h-[320px] rounded-full bg-purple-500/10 blur-[105px] mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${slug}-content`}
        id={`${slug}-header`}
        className={`relative z-10 flex w-full items-center justify-between p-5 text-left ${FOCUS_RING_CLASS}`}
      >
        <span
          className={`text-sm md:text-base font-bold transition-colors duration-300 ${
            isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
          }`}
        >
          {question}
        </span>

        <span
          className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "bg-sky-600 border-sky-500 text-white rotate-180"
              : "bg-white/5 border-white/10 text-slate-300 group-hover:bg-white/10"
          }`}
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      <div
        id={`${slug}-content`}
        role="region"
        aria-labelledby={`${slug}-header`}
        ref={contentRef}
        style={{
          height: "0px",
          willChange: "height",
          contain: "layout paint",
        }}
        className="relative z-10 overflow-hidden transition-[height] duration-300 ease-in-out motion-reduce:transition-none"
      >
        <div ref={contentInnerRef} className="px-5 pb-5">
          <div className="pt-4 border-t border-white/10 text-slate-200 text-sm md:text-base leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
});

/* --------------------------------------------------
   DESTEK KARTI
-------------------------------------------------- */
function SupportCard({ dictionary }) {
  return (
    <div className="w-full bg-[#0F1623] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
        💬
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          {dictionary.supportTitle}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {dictionary.supportDesc}
        </p>
      </div>

      <div className="space-y-3">
        <a
          href={dictionary.contactPhoneHref}
          className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-sky-500/30 transition-all group ${FOCUS_RING_CLASS}`}
        >
          <span className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
            📞
          </span>
          <div className="min-w-0">
            <span className="block text-xs text-slate-400 font-medium">
              {dictionary.supportPhoneLabel}
            </span>
            <span className="block text-sm font-bold text-white group-hover:text-sky-300 transition-colors break-words">
              {dictionary.contactPhone}
            </span>
          </div>
        </a>

        <a
          href={dictionary.contactWhatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-500/30 transition-all group ${FOCUS_RING_CLASS}`}
          aria-label={`${dictionary.supportWhatsappLabel} – yeni sekmede açılır`}
        >
          <span className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
            📱
          </span>
          <div className="min-w-0">
            <span className="block text-xs text-slate-400 font-medium">
              {dictionary.supportWhatsappLabel}
            </span>
            <span className="block text-sm font-bold text-white group-hover:text-green-300 transition-colors">
              Hızlı Mesaj Gönder
            </span>
          </div>
        </a>

        <a
          href={dictionary.contactMailHref}
          className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group ${FOCUS_RING_CLASS}`}
        >
          <span className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            ✉️
          </span>
          <div className="min-w-0">
            <span className="block text-xs text-slate-400 font-medium">
              {dictionary.supportMailLabel}
            </span>
            <span className="block text-sm font-bold text-white group-hover:text-purple-300 transition-colors break-words">
              {dictionary.contactMail}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

/* --------------------------------------------------
   ANA BİLEŞEN
-------------------------------------------------- */
export default function Faq({
  items = FAQ_ITEMS,
  dictionary: dictionaryOverride,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaLabel,
  regionLabelId = "faq-section-title",
  descriptionId: ariaDescriptionId,
  role: roleOverride,
} = {}) {
  const dictionary = useMemo(
    () => mergeDictionary(DEFAULT_DICTIONARY, dictionaryOverride),
    [dictionaryOverride]
  );

  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }, []);

  const headingId = ariaLabelledBy ?? regionLabelId;
  const descriptionId =
    ariaDescriptionId ??
    (!ariaLabelledBy && headingId ? `${headingId}-description` : undefined);
  const describedBy = ariaDescribedBy ?? descriptionId;

  return (
    <section
      className="relative py-16 md:py-24 2xl:py-28 bg-[#0B1120]"
      {...(ariaLabel
        ? { "aria-label": ariaLabel }
        : headingId
        ? { "aria-labelledby": headingId }
        : {})}
      {...(describedBy ? { "aria-describedby": describedBy } : {})}
      role={roleOverride}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-purple-600/10 blur-[140px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!ariaLabelledBy && (
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider shadow-sm">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"
                  aria-hidden="true"
                />
                {dictionary.sectionPill}
              </span>
            </div>

            <h2
              id={headingId}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {dictionary.sectionTitlePrefix}{" "}
              <span className="gradient-text gradient-text--safe-xl">
                {dictionary.sectionTitleHighlight}
              </span>
            </h2>

            <p
              id={descriptionId}
              className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              {dictionary.sectionDesc}
            </p>
          </div>
        )}

        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div
              className="flex-1 space-y-4 min-w-0"
              aria-label={dictionary.regionTitleSr}
            >
              {items.map((item, index) => (
                <FaqRow
                  key={item.slug}
                  {...item}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>

            <div className="w-full lg:max-w-sm xl:max-w-md mt-6 lg:mt-0">
              <SupportCard dictionary={dictionary} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
