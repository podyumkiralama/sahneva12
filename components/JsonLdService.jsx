// components/JsonLdService.tsx  (veya .jsx)
import { headers } from "next/headers";

const absUrl = (site, path = "") => {
  if (!path) return site.replace(/\/+$/,"");
  if (/^https?:\/\//i.test(path)) return path; // absolute ise dokunma
  const s = site.replace(/\/+$/,"");
  const p = String(path).replace(/^\/+/,"");
  return `${s}/${p}`;
};

const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) =>
      Array.isArray(value) ? value.length > 0 : value != null && value !== ""
    )
  );

export default function JsonLdService({
  site = "https://www.sahneva.com",
  service,
  images = [],
}) {
  if (!service) return null;

  const nonce = headers().get("x-nonce") || undefined;

  const slug = encodeURIComponent(String(service.slug || "").replace(/^\/+/, ""));
  const pageUrl = absUrl(site, slug);

  const imgListRaw = images.length
    ? images.slice(0, 8)
    : [service?.ogImage, service?.img].filter(Boolean);

  const image = Array.from(new Set(imgListRaw.map((p) => absUrl(site, p))));

  const organizationRef = { "@id": `${absUrl(site, "#org")}` };

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
    provider: organizationRef,
    hasOfferCatalog:
      Array.isArray(service.faqs) && service.faqs.length
        ? {
            "@type": "OfferCatalog",
            name: service.title,
            itemListElement: service.faqs.map(({ q, a }) => ({
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
