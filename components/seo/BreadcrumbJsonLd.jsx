import { buildBreadcrumbList, normalizeBaseUrl } from "@/lib/seo/breadcrumbs";

export function BreadcrumbJsonLd({ items, baseUrl }) {
  if (!items || items.length === 0) return null;

  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const data = buildBreadcrumbList({ baseUrl: normalizedBaseUrl, items });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
