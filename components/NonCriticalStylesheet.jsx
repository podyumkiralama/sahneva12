import { getCssManifestHrefs } from "@/lib/cssManifest";

const DEFAULT_DEFER_MAIN_CSS =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_DEFER_MAIN_CSS !== "false";

export default function NonCriticalStylesheet({ defer = DEFAULT_DEFER_MAIN_CSS }) {
  const hrefs = getCssManifestHrefs();

  if (!hrefs.length) return null;

  if (!defer) {
    return (
      <>
        {hrefs.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </>
    );
  }

  return (
    <>
      {hrefs.map((href) => (
        <link
          key={href}
          rel="stylesheet"
          href={href}
          media="print"
          onLoad="this.media='all'"
        />
      ))}
      <noscript>
        {hrefs.map((href) => (
          <link key={`${href}-noscript`} rel="stylesheet" href={href} />
        ))}
      </noscript>
    </>
  );
}
