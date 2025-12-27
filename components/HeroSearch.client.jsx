// components/HeroSearch.client.jsx
"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_ITEMS } from "@/lib/searchItems";

function cn(...a) {
  return a.filter(Boolean).join(" ");
}

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HeroSearch({
  title = "Merhaba Kasım, size nasıl yardımcı olabiliriz?",
  placeholder = "Sahne, LED ekran, podyum, organizasyon…",
  resultsPath = "/arama",
  minChars = 2,
}) {
  const router = useRouter();
  const inputRef = useRef(null);

  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < minChars) return [];
    return SEARCH_ITEMS.filter((x) => x.label.toLowerCase().includes(t)).slice(
      0,
      8
    );
  }, [q, minChars]);

  function goSearch(value) {
    const query = value.trim();
    if (!query) return;
    router.push(`${resultsPath}?q=${encodeURIComponent(query)}`);
  }

  function goHref(href) {
    router.push(href);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        goHref(suggestions[activeIndex].href);
      } else {
        goSearch(q);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!suggestions.length) return;
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!suggestions.length) return;
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Escape") {
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-8">
        <h1 className="text-[34px] leading-tight font-semibold text-slate-900">
          {title}
        </h1>

        <div className="mt-6 relative">
          {/* Meta-like underline input row */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500"
              >
                <IconSearch className="h-5 w-5" />
              </span>

              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                role="searchbox"
                aria-label="Site içinde ara"
                autoComplete="off"
                inputMode="search"
                className={cn(
                  "w-full bg-transparent",
                  "pl-8 pr-10 py-3",
                  "text-lg text-slate-900 placeholder:text-slate-500",
                  "outline-none",
                  "border-b border-slate-300 focus:border-slate-500"
                )}
              />
            </div>

            {/* Circle action */}
            <button
              type="button"
              onClick={() => goSearch(q)}
              className={cn(
                "h-12 w-12 rounded-full",
                "border border-slate-300 bg-white",
                "hover:bg-slate-50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60",
                "inline-flex items-center justify-center transition"
              )}
              aria-label="Ara"
            >
              <span aria-hidden="true" className="text-slate-700 text-xl">
                →
              </span>
            </button>
          </div>

          {/* Suggestions */}
          {q.trim().length >= minChars && (
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {suggestions.length === 0 ? (
                <div className="px-4 py-4 text-sm text-slate-600">
                  Sonuç bulunamadı.
                </div>
              ) : (
                <ul role="listbox" aria-label="Arama önerileri">
                  {suggestions.map((s, idx) => {
                    const active = idx === activeIndex;
                    return (
                      <li key={s.href}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => goHref(s.href)}
                          role="option"
                          aria-selected={active}
                          className={cn(
                            "w-full text-left px-4 py-3 text-sm transition",
                            active ? "bg-slate-100" : "hover:bg-slate-50",
                            "flex items-center justify-between gap-3"
                          )}
                        >
                          <span className="truncate text-slate-900">
                            {s.label}
                          </span>
                          <span className="text-xs text-slate-400">↵</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
