"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SEARCH_ITEMS } from "@/lib/searchItems";

const MIN_CHARS = 2;
const MAX_RESULTS = 8;

function SearchIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function ClearIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export default function NavbarSearch({ className = "" }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const trimmedQuery = query.trim();
  const listboxId = "navbar-search-listbox";

  const results = useMemo(() => {
    if (trimmedQuery.length < MIN_CHARS) {
      return [];
    }
    const lowered = trimmedQuery.toLowerCase();
    return SEARCH_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(lowered),
    ).slice(0, MAX_RESULTS);
  }, [trimmedQuery]);

  const isOpen = isFocused && trimmedQuery.length >= MIN_CHARS && results.length > 0;

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex >= results.length) {
      setActiveIndex(-1);
    }
  }, [activeIndex, results.length]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      if (results.length === 0) {
        return;
      }
      event.preventDefault();
      setActiveIndex((prev) => {
        const next = prev < 0 ? 0 : (prev + 1) % results.length;
        return next;
      });
      return;
    }

    if (event.key === "ArrowUp") {
      if (results.length === 0) {
        return;
      }
      event.preventDefault();
      setActiveIndex((prev) => {
        const next = prev <= 0 ? results.length - 1 : prev - 1;
        return next;
      });
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        router.push(results[activeIndex].href);
        return;
      }
      if (trimmedQuery.length >= MIN_CHARS) {
        router.push(`/arama?q=${encodeURIComponent(trimmedQuery)}`);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsFocused(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery("");
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative w-full lg:w-[32rem] lg:max-w-[60vw] ${className}`}>
      <div
        className="flex items-center gap-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 text-sm text-white transition-shadow focus-within:shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_0_30px_rgba(59,130,246,0.18)]"
      >
        <SearchIcon className="h-4 w-4 text-white/70" />
        <input
          ref={inputRef}
          type="text"
          role="searchbox"
          aria-label="Site içinde ara"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Sahne, LED ekran, podyum… ara"
          className="w-full bg-transparent text-white placeholder:text-white/60 focus:outline-none"
        />
        {query.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Aramayı temizle"
            className="inline-flex items-center justify-center text-white/60 hover:text-white transition"
          >
            <ClearIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {isOpen ? (
        <div
          role="listbox"
          id={listboxId}
          aria-label="Arama önerileri"
          className="absolute left-0 right-0 mt-3 rounded-2xl bg-[#0B1120]/95 border border-white/8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.65)] overflow-hidden z-50"
          onMouseDown={(event) => event.preventDefault()}
        >
          <ul className="py-2">
            {results.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    role="option"
                    aria-selected={isActive}
                    className={`block px-4 py-2 text-sm text-white/90 transition ${
                      isActive ? "bg-blue-500/12" : "hover:bg-white/6"
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
