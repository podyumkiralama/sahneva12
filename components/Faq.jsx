// components/Faq.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { FAQ_ITEMS } from "../lib/faqData";
import Script from "next/script";

/* Nonce'ı meta'dan okuyan küçük yardımcı */
function useCspNonce() {
  const [nonce, setNonce] = useState(undefined);
  useEffect(() => {
    try {
      const n =
        document
          .querySelector('meta[name="csp-nonce"]')
          ?.getAttribute("content") || undefined;
      setNonce(n);
    } catch {}
  }, []);
  return nonce;
}

function FaqRow({ question, answer, slug }) {
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef(null);
  const summaryId = `${slug}-summary`;
  const panelId = `${slug}-panel`;

  useEffect(() => {
    if (open && contentRef.current) {
      requestAnimationFrame(() => {
        setContentHeight(`${contentRef.current.scrollHeight}px`);
      });
    } else {
      setContentHeight("0px");
    }
  }, [open]);

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl p-4 mb-2 transition-all duration-200 hover:shadow-sm hover:border-blue-200/80"
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        id={summaryId}
        aria-controls={panelId}
        aria-expanded={open}
        className="cursor-pointer flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 min-h-[42px] w-full text-left"
        itemProp="name"
      >
        <span className="pr-3 text-sm leading-relaxed">{question}</span>

        {/* ❗️div yerine span (phrasing content) */}
        <span
          className={`flex-shrink-0 inline-flex w-6 h-6 rounded-full bg-blue-50 items-center justify-center transition-all duration-200 group-hover:bg-blue-100 ${
            open ? "bg-blue-100 rotate-90" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            className="w-3.5 h-3.5 text-blue-600 transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 5l8 7-8 7" />
          </svg>
        </span>
      </button>

      <div
        ref={contentRef}
        id={panelId}
        className="overflow-hidden transition-all duration-200 ease-in-out"
        style={{ maxHeight: contentHeight }}
        aria-hidden={!open}
        role="region"
        aria-labelledby={summaryId}
        itemScope
        itemType="https://schema.org/Answer"
        itemProp="acceptedAnswer"
      >
        <div className="mt-2 text-gray-700 border-t border-gray-100/60 pt-2">
          <div itemProp="text" className="leading-relaxed text-sm text-gray-600">
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Schema
const generateFaqSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

// ✅ TAM SÜRÜM — a11y + CSP uyumlu
export default function Faq({ compact = false }) {
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const nonce = useCspNonce(); // 👈 nonce burada

  return (
    <section
      className="relative pt-4 pb-0 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Dekor */}
      <div
        className="absolute inset-0 overflow-hidden transform-gpu pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-r from-purple-100/20 to-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-28 -left-28 w-72 h-72 bg-gradient-to-r from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 pb-0">
        <h2 id="faq-heading" className="sr-only">
          Sıkça Sorulan Sorular
        </h2>

        {/* Liste */}
        <div className="mx-auto max-w-3xl mt-0 pt-0">
          <ul className="grid gap-2">
            {FAQ_ITEMS.map((item) => (
              <li key={item.slug}>
                <FaqRow {...item} />
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 last:mb-0">
          <div className="relative bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto overflow-hidden transform-gpu">
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-white rounded-full" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white rounded-full" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                🌟 Cevabını Bulamadığınız Soru mu Var?
              </h3>
              <p className="text-blue-100 text-base mb-5 max-w-2xl mx-auto leading-relaxed">
                Uzman ekibimiz size en doğru çözümü sunmaktan mutluluk duyacaktır.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="/sss"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 min-h-[48px] text-sm"
                >
                  <span className="text-lg" aria-hidden="true">
                    📋
                  </span>
                  <span>Tüm Soruları Gör</span>
                  <span className="sr-only"> – SSS sayfası</span>
                </a>

                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 min-h-[48px] text-sm"
                >
                  <span className="text-lg" aria-hidden="true">
                    💬
                  </span>
                  <span>Canlı Destek</span>
                  <span className="sr-only"> – İletişim sayfası</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim kutusu */}
        <div className="mt-8 text-center last:mb-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-bold text-gray-900 mb-3">Hızlı İletişim Kanalları</h4>
            <nav aria-label="Hızlı iletişim seçenekleri">
              <ul className="flex flex-wrap gap-3 justify-center items-center">
                <li>
                  <a
                    href="tel:+905453048671"
                    className="inline-flex items-center gap-3 bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-900 font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 min-h-[48px] text-sm"
                  >
                    <span className="text-xl" aria-hidden="true">
                      📞
                    </span>
                    <div className="text-left">
                      <div className="font-bold">Telefon</div>
                      <div className="text-xs text-blue-800 font-semibold">
                        +90 545 304 8671
                      </div>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href="https://wa.me/905453048671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-100 hover:bg-green-200 border border-green-300 text-green-900 font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 min-h-[48px] text-sm"
                  >
                    <span className="text-xl" aria-hidden="true">
                      💬
                    </span>
                    <div className="text-left">
                      <div className="font-bold">WhatsApp</div>
                      <div className="text-xs text-green-800 font-semibold">Hızlı Mesaj</div>
                    </div>
                    <span className="sr-only"> (yeni sekmede açılır)</span>
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:info@sahneva.com"
                    className="inline-flex items-center gap-3 bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-900 font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 min-h-[48px] text-sm"
                  >
                    <span className="text-xl" aria-hidden="true">
                      ✉️
                    </span>
                    <div className="text-left">
                      <div className="font-bold">E-posta</div>
                      <div className="text-xs text-purple-800 font-semibold">
                        info@sahneva.com
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>

            <div className="mt-3 flex items-center justify-center gap-4 text-sm text-gray-800">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 bg-green-600 rounded-full animate-pulse inline-block"
                  aria-hidden="true"
                />
                <span className="font-semibold">7/24 Destek</span>
              </div>
              <span className="w-px h-4 bg-gray-500 inline-block" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 bg-green-600 rounded-full animate-pulse inline-block"
                  aria-hidden="true"
                />
                <span className="font-semibold">5 Dakikada Yanıt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer boşluğu */}
        <div className="h-0 p-0 m-0" />
      </div>

      {/* JSON-LD: Nonce gelmeden render etme */}
      {nonce && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          nonce={nonce}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </section>
  );
}
