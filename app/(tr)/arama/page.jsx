import Link from "next/link";

import { SEARCH_ITEMS } from "@/lib/searchItems";

export const metadata = {
  title: "Arama | Sahneva",
  description: "Sahneva site içi arama sonuçları",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      nocache: true,
    },
  },
};

const MIN_CHARS = 2;

export default function SearchPage({ searchParams }) {
  const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";

  const hasMinChars = query.length >= MIN_CHARS;
  const results = hasMinChars
    ? SEARCH_ITEMS.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <section className="container py-10 lg:py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight text-neutral-900">
          Arama Sonuçları
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          "{query || "-"}" için sonuçlar
        </p>

        {!hasMinChars ? (
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
            Aramak için en az 2 karakter yaz
          </div>
        ) : results.length > 0 ? (
          <ul className="mt-8 grid gap-3">
            {results.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-900 transition hover:border-blue-200 hover:text-blue-700 hover:shadow"
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">›</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
            Sonuç bulunamadı
          </div>
        )}
      </div>
    </section>
  );
}
