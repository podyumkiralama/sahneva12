"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavbarMobile({ serviceLinks }) {
  const [open, setOpen] = useState(false);

  // body scroll lock (mevcut davranış korunur)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button
        type="button"
        aria-label="Menüyü aç"
        className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[92vw] max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-lg font-bold">Menü</span>
          <button
            type="button"
            aria-label="Menüyü kapat"
            className="rounded-lg p-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <nav className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-64px)]">
          {/* HAKKIMIZDA */}
          <Link
            href="/hakkimizda"
            className="block px-4 py-3 rounded-xl font-semibold hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Hakkımızda
          </Link>

          {/* BLOG */}
          <Link
            href="/blog"
            className="block px-4 py-3 rounded-xl font-semibold hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>

          {/* HİZMETLER */}
          <details className="border rounded-xl">
            <summary className="cursor-pointer list-none px-4 py-3 font-semibold flex justify-between items-center">
              <span>Hizmetler</span>
              <span aria-hidden="true">▾</span>
            </summary>

            <div className="px-2 pb-2">
              {serviceLinks &&
                serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </details>

          {/* BİZİ ARAŞTIRIN – SADECE EKLENDİ */}
          <details className="border rounded-xl">
            <summary className="cursor-pointer list-none px-4 py-3 font-semibold flex justify-between items-center">
              <span>Bizi Araştırın</span>
              <span aria-hidden="true">▾</span>
            </summary>

            <div className="px-2 pb-2 space-y-1">
              <Link
                href="/iletisim"
                className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                İletişim
              </Link>

              <Link
                href="/nasil-calisiyoruz"
                className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Nasıl Çalışıyoruz
              </Link>

              <Link
                href="/bolgesel-kiralama"
                className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Bölgesel Kiralama
              </Link>

              <Link
                href="/sss"
                className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Sık Sorulan Sorular
              </Link>
            </div>
          </details>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/905453048671"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700"
            onClick={() => setOpen(false)}
          >
            💬 WhatsApp Destek
          </a>
        </nav>
      </aside>
    </>
  );
}
