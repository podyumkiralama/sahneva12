import Link from "next/link";
import { getSearchIndex } from "@/lib/searchIndex";

export const metadata = {
  title: "Site İçi Arama | Sahneva",
  description: "Sahneva sayfaları arasında anahtar kelime ile arama yapın.",
};

const filterRoutes = (routes, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return routes;

  return routes.filter((route) => {
    const labelMatch = route.label.toLowerCase().includes(q);
    const keywordMatch = route.keywords?.some((keyword) =>
      keyword.toLowerCase().includes(q),
    );
    return labelMatch || keywordMatch;
  });
};

export default function SearchPage({ searchParams }) {
  const query = typeof searchParams?.q === "string" ? searchParams.q : "";
  const routes = getSearchIndex();
  const results = filterRoutes(routes, query);

  return (
    <section className="container py-12 lg:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-blue-600">Site İçi Arama</p>
        <h1 className="mt-2 text-3xl font-black text-neutral-900 lg:text-4xl">
          Aradığınız sayfayı hızlıca bulun
        </h1>
        <p className="mt-3 text-neutral-600">
          Anahtar kelimenizi yazın, ilgili sayfaları hemen listeleyelim.
        </p>

        <form action="/search" method="get" className="mt-6">
          <label htmlFor="search-page-input" className="sr-only">
            Site içinde arama yapın
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              id="search-page-input"
              name="q"
              defaultValue={query}
              type="text"
              placeholder="Örn: truss kiralama, iletişim..."
              className="flex-1 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 focus-ring"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700"
            >
              Ara
            </button>
          </div>
        </form>

        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white shadow-lg">
          <div className="border-b border-neutral-100 px-5 py-4">
            <p className="text-sm font-semibold text-neutral-900">
              {query.trim()
                ? `"${query}" için ${results.length} sonuç`
                : `${results.length} sayfa listeleniyor`}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="px-5 py-10 text-sm text-neutral-500">
              Aradığınız anahtar kelimeyle eşleşen bir sayfa bulunamadı.
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {results.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="flex items-center gap-3 px-5 py-4 text-sm text-neutral-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    <span className="text-lg" aria-hidden="true">
                      {route.icon}
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {route.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
