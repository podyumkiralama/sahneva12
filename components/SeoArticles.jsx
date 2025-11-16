// components/SeoArticles.jsx

import Image from "next/image";
import Link from "next/link";
import { SEO_ARTICLES } from "@/lib/articlesData";

const SITE = "https://www.sahneva.com";
const abs = (p) =>
  /^https?:\/\//i.test(p || "") ? p : `${SITE}/${String(p || "").replace(/^\/+/, "")}`;

const CARD_SIZES =
  "(max-width: 640px) calc(100vw - 2rem)," +
  "(max-width: 1024px) calc((100vw - 3rem) / 2)," +
  "calc((100vw - 4rem) / 3)";

const BLUR =
  "data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAABwAQCdASoEAAQAAP7/AAcAAABAAAAAAAAAAAAAAAAAAAAAAAA=";

/* JSON-LD (ilk 6 madde, absolute URL ve image’lar normalleştirilmiş) */
function ArticlesJsonLd({ items = [] }) {
  const list = items.slice(0, 6).map((a, i) => {
    const url = abs(a.href || a.slug || "");
    const image = a.image ? [abs(a.image)] : undefined;
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": a.schemaType || "BlogPosting",
        headline: a.title,
        description: a.desc,
        url,
        image,
        datePublished: a.datePublished || undefined,
        dateModified: a.dateModified || a.datePublished || undefined,
        author: { "@type": "Organization", name: a.author || "Sahneva" },
        publisher: { "@type": "Organization", name: "Sahneva" },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list,
  };

  return (
    <script
      id="home-articles-jsonld"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function SeoArticles({
  compact = false,
  title = "Teknik Bilgi & SEO Makaleleri",
}) {
  const items = (SEO_ARTICLES || []).filter(Boolean);
  if (!items.length) return null;

  return (
    <section
      className={`${compact ? "py-10" : "py-12"} bg-gradient-to-br from-white via-neutral-50 to-blue-50/30`}
      aria-labelledby="articles-title"
    >
      <div className="container">
        <div className="text-center mb-8">
          <h2 id="articles-title" className="text-2xl md:text-3xl font-black text-neutral-900">
            {title}
          </h2>
          <p className="text-neutral-600 mt-2 max-w-2xl mx-auto text-sm md:text-base">
            Sahne, podyum, LED ekran ve ses-ışık sistemleri hakkında pratik ipuçları ve satın alma/kiralama rehberleri.
          </p>
        </div>

          {/* role=list semantiği kartların liste olarak algılanmasını sağlar */}
        <ul className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 list-none">
          {items.slice(0, 6).map((a, idx) => {
            const url = abs(a.href || a.slug || "");
            const titleId = `article-card-${idx}-title`;
            return (
              <li key={a.slug || a.href || idx} className="h-full">
                <article
                  className="group bg-white rounded-2xl border border-neutral-200 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full"
                  aria-labelledby={titleId}
                >
                  {/* Kapak */}
                  <div className="relative aspect-[16/10]">
                    <Link
                      href={url}
                      className="absolute inset-0 block rounded-t-2xl focus-ring"
                    >
                      <span className="sr-only">{a.title}</span>
                    </Link>

                    {a.image ? (
                      <Image
                        src={a.image}
                        alt={a.alt || a.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes={CARD_SIZES}
                        quality={80}
                        loading={idx < 2 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL={BLUR}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300"
                        aria-hidden="true"
                      />
                    )}

                    {a.badge && (
                      <span className="absolute top-2 left-2 text-[11px] font-semibold text-white bg-blue-600/90 rounded-full px-2 py-1">
                        {a.badge}
                      </span>
                    )}
                  </div>

                  {/* İçerik */}
                  <div className="p-5">
                    <h3 id={titleId} className="text-base md:text-lg font-bold text-neutral-900 line-clamp-2">
                      <Link
                        href={url}
                        className="hover:text-blue-700 transition-colors duration-200 focus-ring rounded-md"
                      >
                        {a.title}
                      </Link>
                    </h3>

                    {a.desc && (
                      <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{a.desc}</p>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      {a.tag ? (
                        <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                          <span className="text-base" aria-hidden="true">
                            🏷️
                          </span>
                          {a.tag}
                        </span>
                      ) : (
                        <span className="text-xs uppercase tracking-wide text-neutral-500">Blog</span>
                      )}

                      <Link
                        href={url}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-2"
                      >
                        Oku
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <ArticlesJsonLd items={items} />
      </div>
    </section>
  );
}
