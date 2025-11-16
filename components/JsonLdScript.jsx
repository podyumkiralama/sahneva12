import Script from "next/script";

export default function JsonLdScript({
  id,
  data,
  nonce,
  strategy = "afterInteractive",
}) {
  if (!data) return null;

  return (
    <Script
      id={id}
      nonce={nonce}
      type="application/ld+json"
      strategy={strategy}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
