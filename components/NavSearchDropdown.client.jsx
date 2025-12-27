"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

export default function NavSearchDropdown({
  detailsId = "nav-search-details",
  focusRingClass = "",
  resultsPath = "/arama",
  helpPath = "/yardim",
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

  function goSearch(val) {
    const query = val.trim();
    if (!query) return;
    // dropdown kapanmasını ServicesDropdownBehavior yapacak (link click değilse toggle kapatmak için)
    router.push(`${resultsPath}?q=${encodeURIComponent(query)}`);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        router.push(suggestions[activeIndex].href);
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
  }

  return (
    <details
      id={detailsId}
      className="relative group"
      data-nav-dropdown="true"
      onToggle={(e) => {
        // Açılınca input focus
        if (e.currentTarget.open) {
          requestAnimationFrame(() => inputRef.current?.focus());
        }
      }}
    >
      <summary
        className={cn(
          "list-none cursor-pointer select-none",
          "inline-flex items-center justify-center",
          "h-11 w-11 rounded-xl border border-neutral-200 bg-white",
          "text-neutral-700 hover:text-blue-700 hover:bg-neutral-50",
          "transition-all duration-200 shadow-sm hover:shadow-md",
          focusRingClass
        )}
        aria-label="Ara"
        title="Ara"
      >
        <IconSearch className="h-5 w-5" />
      </summary>

      <div
        id="nav-search-panel"
        data-dropdown-panel
        role="region"
        aria-label="Arama menüsü"
        className="absolute right-0 top-full mt-2 z-[80] w-[min(520px,92vw)]"
      >
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-2xl p-4">
          <div className="px-1">
            <div className="text-base font-extrabold text-neutral-900">
              Site içinde ara
            </div>
            <p className="mt-1 text-xs font-medium text-neutral-600">
              Hızlıca hizmete git veya yardım sayfasına geç.
            </p>
          </div>

          {/* input */}
          <div className="mt-3 flex items-center gap-3">
            <div className="relative flex-1">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                aria-hidden="true"
              >
                <IconSearch className="h-4 w-4" />
              </span>

              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={onKeyDown}
                placeholder="Sahne, LED ekran, podyum…"
                className={cn(
                  "w-full rounded-xl border border-neutral-200 bg-white",
                  "pl-10 pr-3 py-3 text-sm text-neutral-900 placeholder:text-neutral-400",
                  "outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
                )}
                role="searchbox"
                aria-label="Arama"
                autoComplete="off"
              />
            </div>

            <button
              type="button"
              onClick={() => goSearch(q)}
              className={cn(
                "inline-flex items-center justify-center",
                "h-11 w-11 rounded-xl border border-neutral-200 bg-white",
                "hover:bg-neutral-50 transition",
                "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
              )}
              aria-label="Ara"
              title="Ara"
            >
              <span aria-hidden="true" className="text-lg text-neutral-700">
                →
              </span>
            </button>
          </div>

          {/* quick links */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              href={helpPath}
              className={cn(
                "rounded-xl border border-neutral-200 p-3",
                "hover:bg-blue-50 hover:border-blue-200 transition",
                focusRingClass
              )}
            >
              <div className="font-extrabold text-neutral-900">Yardım / Keşfet</div>
              <div className="text-xs font-medium text-neutral-600 mt-1">
                Meta tarzı arama sayfası
              </div>
            </Link>

            <Link
              href="/iletisim"
              className={cn(
                "rounded-xl border border-neutral-200 p-3",
                "hover:bg-blue-50 hover:border-blue-200 transition",
                focusRingClass
              )}
            >
              <div className="font-extrabold text-neutral-900">İletişim</div>
              <div className="text-xs font-medium text-neutral-600 mt-1">
                Teklif / hızlı destek
              </div>
            </Link>
          </div>

          {/* suggestions */}
          {q.trim().length >= minChars && (
            <div className="mt-3 rounded-xl border border-neutral-200 overflow-hidden">
              {suggestions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-neutral-600">
                  Sonuç bulunamadı.
                </div>
              ) : (
                <ul role="listbox" aria-label="Öneriler">
                  {suggestions.map((s, idx) => {
                    const active = idx === activeIndex;
                    return (
                      <li key={s.href}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => router.push(s.href)}
                          className={cn(
                            "w-full text-left px-4 py-3 text-sm transition flex items-center justify-between gap-3",
                            active ? "bg-neutral-100" : "hover:bg-neutral-50"
                          )}
                          role="option"
                          aria-selected={active}
                        >
                          <span className="truncate font-semibold text-neutral-900">
                            {s.label}
                          </span>
                          <span className="text-xs text-neutral-400">↵</span>
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
    </details>
  );
}
