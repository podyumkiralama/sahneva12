export function normalizeBaseUrl(url) {
  if (!url) return "";
  return url.replace(/\/$/, "");
}

export function buildBreadcrumbList({ baseUrl, items }) {
  const normalizedBase = normalizeBaseUrl(baseUrl);
  const normalizedItems = (items || []).map((item) => {
    const isAbsolute = /^https?:\/\//i.test(item.url);
    const normalizedUrl = isAbsolute
      ? item.url
      : `${normalizedBase}${item.url.startsWith("/") ? "" : "/"}${item.url.replace(/^\//, "")}`;

    return {
      ...item,
      url: normalizedUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: normalizedItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
