// components/JsonLdService.tsx  (veya .jsx)
import { headers } from "next/headers";

const absUrl = (site: string, path = "") => {
  if (!path) return site.replace(/\/+$/,"");
  if (/^https?:\/\//i.test(path)) return path; // absolute ise dokunma
  const s = site.replace(/\/+$/,"");
  const p = String(path).replace(/^\/+/,"");
  return `${s}/${p}`;
};

const compact = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) =>
      Array.isArray(v) ? v.length > 0 : v != null && v !== ""
    )
  );

export default function JsonLdService({
  site = "https://www.sahneva.com",
  service,
  images = [],
}: {
  site?: string;
  service: any;
  images?: string[];
}) {
  if (!service) return null;

  const nonce = headers().get("x-nonce") || undefined;

  const slug = encodeURIComponent(String(service.slug || "").replace(/^\/+/, ""));
  const pageUrl = absUrl(site, slug);

  const imgListRaw = images.length
    ? images.slice(0, 8)
    : [service?.ogImage, service?.img].filter(Boolean);

  const image = Array.from(new Set(imgListRaw.map((p) => absUrl(site, p))));

  const data = compact({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.title,
    description: service.desc,
    image,
    url: pageUrl,
    areaServed: { "@type": "Country", name: "TR" },
    serviceType: service.serviceType,
    keywords: Array.isArray(service.keywords)
      ? service.keywords.join(", ")
      : service.keywords,
    provider: {
      "@type": "Organization",
      name: "Sahneva",
      url: site,
      telephone: "+90 545 304 8671",
      logo: absUrl(site, "/img/logo.png"),
    },
    hasOfferCatalog:
      Array.isArray(service.faqs) && service.faqs.length
        ? {
            "@type": "OfferCatalog",
            name: service.title,
            itemListElement: service.faqs.map(({ q, a }: any) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: q, description: a },
            })),
          }
        : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  });

  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
