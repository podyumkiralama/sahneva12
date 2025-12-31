/** @type {import('next').NextConfig} */

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const ONE_MONTH_IN_SECONDS = ONE_DAY_IN_SECONDS * 30;
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS * 365;

const isProd = process.env.NODE_ENV === "production";
const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

const siteUrl = process.env.SITE_URL ?? "https://www.sahneva.com";

/* -------------------- Security Headers (CSP) -------------------- */
const securityHeaders = (() => {
  const SCRIPT_SRC = [
    "'self'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://va.vercel-scripts.com",
    "https://vercel.live",
    "https://www.clarity.ms",
    "https://scripts.clarity.ms",
    "https://k.clarity.ms/collect",
    "static.cloudflareinsights.com",
    "z.clarity.ms",
    "https://l.clarity.ms",
  ].join(" ");

  const SCRIPT_SRC_ELEM = [
    "'self'",
    "'unsafe-inline'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://va.vercel-scripts.com",
    "https://vercel.live",
    "https://www.clarity.ms",
    "https://scripts.clarity.ms",
    "https://k.clarity.ms/collect",
    "static.cloudflareinsights.com",
    "z.clarity.ms",
    "https://l.clarity.ms",
  ].join(" ");

  const CONNECT_SRC = [
    "'self'",
    "https://vitals.vercel-insights.com",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://stats.g.doubleclick.net",
    "https://www.clarity.ms",
    "https://scripts.clarity.ms",
    "https://k.clarity.ms/collect",
    "static.cloudflareinsights.com",
    "z.clarity.ms",
    "https://*.clarity.ms",
    siteUrl,
  ].join(" ");

  const FRAME_SRC = [
    "'self'",
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.youtube-nocookie.com",
    "https://player.vimeo.com",
    "https://vercel.live",
    "https://*.vercel.live",
    "https://www.google.com/maps",
    "https://maps.google.com",
    "https://google.com/maps",
    "https://*.google.com",
  ].join(" ");

  const FRAME_ANCESTORS = isPreview
    ? "frame-ancestors 'self' https://vercel.live https://*.vercel.live;"
    : "frame-ancestors 'none';";

  const csp = `
    default-src 'self';
    ${FRAME_ANCESTORS}
    base-uri 'self';
    object-src 'none';
    upgrade-insecure-requests;
    img-src 'self' data: blob: https:;
    font-src 'self' data: https://fonts.gstatic.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    script-src ${SCRIPT_SRC};
    script-src-elem ${SCRIPT_SRC_ELEM};
    script-src-attr 'none';
    connect-src ${CONNECT_SRC};
    worker-src 'self' blob:;
    frame-src ${FRAME_SRC};
    form-action 'self' https://formspree.io https://wa.me;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const base = [
    { key: "Content-Security-Policy", value: csp },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), fullscreen=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "Origin-Agent-Cluster", value: "?1" },
  ];

  return isPreview ? base : [...base, { key: "X-Frame-Options", value: "DENY" }];
})();

const longTermCacheHeaders = [
  {
    key: "Cache-Control",
    value: `public, max-age=${ONE_YEAR_IN_SECONDS}, immutable`,
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  productionBrowserSourceMaps: false,
  trailingSlash: false,

  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },

  images: {
    // ✅ GÜNCELLEME: 1440px (Laptop) eklendi. LCP için önemli.
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: ONE_MONTH_IN_SECONDS,
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },

  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ["lucide-react", "@headlessui/react"],
  },

  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/icons/{{member}}",
    },
  },

  env: {
    SITE_URL: siteUrl,
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV ?? "development",
  },

  output: isProd ? "standalone" : undefined,
  staticPageGenerationTimeout: 300,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "sahneva.com" }],
        destination: "https://www.sahneva.com/:path*",
        permanent: true,
      },
      {
        source: "/search",
        has: [{ type: "query", key: "q", value: "(?<term>.*)" }],
        destination: "/?q=:term",
        permanent: true,
      },
      { source: "/search", destination: "/", permanent: true },
      {
        source: "/sahne-kurulumu",
        destination: "/sahne-kiralama",
        permanent: true,
      },
      { source: "/faq", destination: "/en/faq", permanent: true },
      { source: "/faq/", destination: "/en/faq", permanent: true },
    ];
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/_next/static/(.*)",
        headers: [
          ...longTermCacheHeaders,
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|webp|avif|svg|gif|woff2|css|js)",
        headers: longTermCacheHeaders,
      },
      {
        source: "/_next/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
