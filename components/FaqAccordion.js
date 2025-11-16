"use client";

import { useId, useState } from "react";

export default function FaqAccordion({ items }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="space-y-4" role="list" aria-label="Sık sorulan sorular listesi">
      {items.map((faq, index) => {
        const headingId = `${baseId}-faq-heading-${index}`;
        const panelId = `${baseId}-faq-panel-${index}`;
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.q}
            className="group bg-gray-50 rounded-3xl border-2 border-transparent transition-all duration-500 open:border-blue-200 open:bg-blue-50 open:shadow-lg hover:bg-gray-100"
            role="listitem"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full text-left flex items-center justify-between gap-4 px-8 py-6 text-xl font-bold text-gray-900 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={headingId}
            >
              <span className="pr-4 flex-1">{faq.q}</span>
              <span
                aria-hidden="true"
                className="ml-4 transition-transform duration-300 text-blue-600 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0"
                data-state={isOpen ? "open" : "closed"}
              >
                <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>⌄</span>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden text-gray-700 leading-relaxed text-lg px-8 pb-8 -mt-2">
                <p className="pl-4 border-l-4 border-blue-500">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
