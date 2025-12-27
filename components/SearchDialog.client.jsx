"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

function CloseIcon({ className }) {
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

export default function SearchDialog() {
  const router = useRouter();
  const titleId = useId();
  const listboxId = useId();

  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const prevOverflow = useRef("");
  const wasOpen = useRef(false);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    if (trimmedQuery.length < MIN_CHARS) {
      return [];
    }
    const lowered = trimmedQuery.toLowerCase();
    return SEARCH_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(lowered),
    ).slice(0, MAX_RESULTS);
  }, [trimmedQuery]);

  const isListOpen = open && trimmedQuery.length >= MIN_CHARS && results.length > 0;

  const closeDialog = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (open) {
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (wasOpen.current) {
      requestAnimationFrame(() => buttonRef.current?.focus());
    }

    wasOpen.current = open;

    return () => {
      if (!open) return;
      document.body.style.overflow = prevOverflow.current;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!isListOpen) {
      setActiveIndex(-1);
    }
  }, [isListOpen]);

  const handleSubmit = () => {
    if (activeIndex >= 0 && results[activeIndex]) {
      router.push(results[activeIndex].href);
      closeDialog();
      return;
    }
    if (trimmedQuery.length >= MIN_CHARS) {
      router.push(`/arama?q=${encodeURIComponent(trimmedQuery)}`);
      closeDialog();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      if (results.length === 0) {
        return;
      }
      event.preventDefault();
      setActiveIndex((prev) => (prev < 0 ? 0 : (prev + 1) % results.length));
      return;
    }

    if (event.key === "ArrowUp") {
      if (results.length === 0) {
        return;
      }
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    setQuery("");
    setActiveIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Arama"
        className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 p-2.5 text-neutral-800 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Arama penceresini kapat"
            className="absolute inset-0 bg-black/50"
            onClick={closeDialog}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[81] flex w-full justify-center px-4 pt-24"
          >
            <div className="w-full max-w-[92vw] lg:w-[42rem]">
              <h2 id={titleId} className="sr-only">
                Sahneva’da ara
              </h2>
              <div className="mb-3 text-xs text-white/70">Sahneva’da ara</div>

              <div className="flex items-start gap-3">
                <div className="w-full">
                  <div className="flex items-center gap-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md px-4 py-3 text-sm text-white transition-shadow focus-within:shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_0_30px_rgba(59,130,246,0.18)]">
                    <SearchIcon className="h-4 w-4 text-white/70" />
                    <input
                      ref={inputRef}
                      type="text"
                      role="searchbox"
                      aria-label="Site içinde ara"
                      aria-controls={listboxId}
                      aria-expanded={isListOpen}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
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
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  {isListOpen ? (
                    <div
                      role="listbox"
                      id={listboxId}
                      aria-label="Arama önerileri"
                      className="mt-3 rounded-2xl bg-[#0B1120]/95 border border-white/8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.65)] overflow-hidden"
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
                                onClick={closeDialog}
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

                <button
                  type="button"
                  onClick={closeDialog}
                  aria-label="Arama penceresini kapat"
                  className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 p-2.5 text-white/80 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
