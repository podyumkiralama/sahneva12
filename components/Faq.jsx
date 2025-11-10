// components/Faq.jsx
"use client";

import { useEffect, useState } from "react";
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
  return (
    <details
      id={slug}
      className="group rounded-xl border border-gray-200/60 bg-white/80 p-4 transition-all duration-200 hover:border-blue-200/80 hover:shadow-sm"
      itemScope
      itemType="https://schema.org/Question"
    >
      <summary
        className="flex cursor-pointer list-none items-center gap-3 text-left text-sm font-semibold leading-relaxed text-gray-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        itemProp="name"
      >
        <span className="flex-1 pr-2">{question}</span>
        <span
          className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-200 group-open:bg-blue-100"
          aria-hidden="true"
        >
          <svg
            className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-90"
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
      </summary>

      <div
        className="mt-3 border-t border-gray-100/60 pt-3 text-sm leading-relaxed text-gray-600"
        itemScope
        itemType="https://schema.org/Answer"
        itemProp="acceptedAnswer"
      >
        <p itemProp="text">{answer}</p>
      </div>
    </details>
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
      className="bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-4"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <h2 id="faq-heading" className="sr-only">
          Sıkça Sorulan Sorular
        </h2>

        <ul className="mx-auto grid max-w-3xl gap-3">
          {FAQ_ITEMS.map((item) => (
            <li key={item.slug} className="list-none">
              <FaqRow {...item} />
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-gradient-to-r from-blue-700 to-purple-700 p-8 text-center text-white shadow-xl">
            <h3 className="text-xl font-bold md:text-2xl">🌟 Cevabını Bulamadığınız Soru mu Var?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-blue-100">
              Uzman ekibimiz size en doğru çözümü sunmaktan mutluluk duyacaktır.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/sss"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md"
              >
                <span aria-hidden="true" className="text-lg">
                  📋
                </span>
                <span>Tüm Soruları Gör</span>
                <span className="sr-only"> – SSS sayfası</span>
              </a>
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-md"
              >
                <span aria-hidden="true" className="text-lg">
                  💬
                </span>
                <span>Canlı Destek</span>
                <span className="sr-only"> – İletişim sayfası</span>
              </a>
            </div>
          </article>

          <article className="rounded-2xl border border-gray-200/60 bg-white/80 p-6 text-center">
            <h4 className="text-lg font-bold text-gray-900">Hızlı İletişim Kanalları</h4>
            <nav aria-label="Hızlı iletişim seçenekleri" className="mt-4">
              <ul className="flex flex-wrap items-center justify-center gap-3">
                <li>
                  <a
                    href="tel:+905453048671"
                    className="inline-flex min-h-[48px] items-center gap-3 rounded-xl border border-blue-300 bg-blue-100 px-5 py-3 text-sm font-bold text-blue-900 transition-all duration-200 hover:scale-[1.02] hover:bg-blue-200 hover:shadow-md"
                  >
                    <span aria-hidden="true" className="text-xl">
                      📞
                    </span>
                    <span className="flex flex-col text-left">
                      <span>Telefon</span>
                      <span className="text-xs font-semibold text-blue-800">+90 545 304 8671</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/905453048671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-3 rounded-xl border border-green-300 bg-green-100 px-5 py-3 text-sm font-bold text-green-900 transition-all duration-200 hover:scale-[1.02] hover:bg-green-200 hover:shadow-md"
                  >
                    <span aria-hidden="true" className="text-xl">
                      💬
                    </span>
                    <span className="flex flex-col text-left">
                      <span>WhatsApp</span>
                      <span className="text-xs font-semibold text-green-800">Hızlı Mesaj</span>
                    </span>
                    <span className="sr-only"> (yeni sekmede açılır)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@sahneva.com"
                    className="inline-flex min-h-[48px] items-center gap-3 rounded-xl border border-purple-300 bg-purple-100 px-5 py-3 text-sm font-bold text-purple-900 transition-all duration-200 hover:scale-[1.02] hover:bg-purple-200 hover:shadow-md"
                  >
                    <span aria-hidden="true" className="text-xl">
                      ✉️
                    </span>
                    <span className="flex flex-col text-left">
                      <span>E-posta</span>
                      <span className="text-xs font-semibold text-purple-800">info@sahneva.com</span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-800">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-600" />
                <span className="font-semibold">7/24 Destek</span>
              </span>
              <span aria-hidden="true" className="inline-block h-4 w-px bg-gray-500" />
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-600" />
                <span className="font-semibold">5 Dakikada Yanıt</span>
              </span>
            </div>
          </article>
        </div>
      </div>

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
