// components/Accordion.jsx
"use client";
import { useState, useCallback, useMemo } from "react";

/**
 * SEO Optimize Edilmiş Accordion Component
 * 
 * Kullanım:
 * <Accordion 
 *   items={[{ 
 *     q: "Soru?", 
 *     a: "Cevap.",
 *     id: "unique-id" // ✅ SEO için benzersiz ID
 *   }]} 
 * />
 * 
 * <Accordion variant="dark" items={[...]} />  // Koyu arka plan için
 */
export default function Accordion({ items = [], variant = "light" }) {
  const [open, setOpen] = useState(null);

  // ✅ İYİLEŞTİRİLDİ: useMemo ile style hesaplama optimizasyonu
  const styles = useMemo(() => {
    const isDark = variant === "dark";
    
    return {
      cardBase: `rounded-xl border transition-all duration-300 shadow-sm ${
        isDark ? "bg-white/5 border-white/15" : "bg-white border-neutral-200"
      }`,
      btnBase: `w-full px-5 py-4 text-left flex items-center justify-between gap-4 min-h-[60px] focus-ring ${
        isDark
          ? "text-white hover:bg-white/10"
          : "text-neutral-800 hover:bg-neutral-50"
      }`,
      questionClass: `font-semibold text-base md:text-lg ${
        isDark ? "text-white" : "text-gray-900"
      }`,
      answerClass: `px-5 pb-5 pt-2 leading-relaxed text-base ${
        isDark ? "text-white/90" : "text-gray-700"
      }`,
      iconClass: `inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 flex-shrink-0 ${
        isDark ? "text-white/90 bg-white/10" : "text-gray-600 bg-gray-100"
      }`
    };
  }, [variant]);

  // ✅ İYİLEŞTİRİLDİ: useCallback ile event handler optimizasyonu
  const handleToggle = useCallback((index) => {
    setOpen(current => current === index ? null : index);
  }, []);

  // ✅ İYİLEŞTİRİLDİ: Benzersiz ID generator
  const generateId = useCallback((index, type) => {
    return `accordion-${index}-${type}`;
  }, []);

  return (
    <div 
      className="space-y-4"
      itemScope 
      itemType="https://schema.org/FAQPage"
      role="region"
      aria-label="Sıkça Sorulan Sorular"
    >
      {items.map((item, index) => {
        const isOpen = open === index;
        const questionId = generateId(index, 'question');
        const answerId = generateId(index, 'answer');
        
        return (
          <article 
            key={item.id || index} 
            className={styles.cardBase}
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
            role="article"
          >
            {/* ✅ İYİLEŞTİRİLDİ: Soru butonu SEO optimizasyonu */}
            <button
              className={styles.btnBase}
              aria-expanded={isOpen}
              aria-controls={answerId}
              aria-describedby={isOpen ? answerId : undefined}
              onClick={() => handleToggle(index)}
              id={questionId}
              itemProp="name"
              title={`${item.q} - Detaylı bilgi için tıklayın`}
            >
              <span className={styles.questionClass} itemProp="name">
                {item.q}
              </span>

              {/* ✅ İYİLEŞTİRİLDİ: Erişilebilir icon */}
              <svg
                className={`${styles.iconClass} ${isOpen ? "rotate-90" : ""}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M8 5l8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* ✅ İYİLEŞTİRİLDİ: Cevap bölümü SEO optimizasyonu */}
            <div 
              id={answerId}
              className={`${styles.answerClass} transition-all duration-300 ${
                isOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"
              }`}
              aria-labelledby={questionId}
              role="region"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
              hidden={!isOpen}
            >
              <div itemProp="text" className="space-y-2">
                {typeof item.a === 'string' ? (
                  <p>{item.a}</p>
                ) : (
                  item.a
                )}
              </div>
              
              {/* ✅ YENİ: Ek bilgi linki (isteğe bağlı) */}
              {item.link && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <a 
                    href={item.link.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    title={item.link.title}
                    itemProp="url"
                  >
                    <span>{item.link.text}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
