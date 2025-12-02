/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    optimizePackageImports: ["react", "react-dom"],
    turbo: {
      rules: { "*.css": {} },
    },
  },

  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  devIndicators: { buildActivity: true },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24, // 24 saat
    dangerouslyAllowSVG: false,
    remotePatterns: [
      { protocol: "https", hostname: "www.sahneva.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },

  async headers() {
    // Not: Eğer yeni bir domain kullanırsan (örn. başka bir CDN),
    // ilgili direktife eklemen yeterli: script-src / img-src / connect-src / frame-src
    const csp = [
      "default-src 'self';",
      // GA, GTM, Next inline scriptler için:
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live;",
      // Tailwind inline style + olası font stylesheet’leri:
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
      // Görseller: kendi domainin + YouTube thumb + data/blob:
      "img-src 'self' data: blob: https://www.sahneva.com https://img.youtube.com https://i.ytimg.com;",
      // Fontlar local veya data:
      "font-src 'self' data: https://fonts.gstatic.com;",
      // XHR / fetch / analytics endpointleri:
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://vercel.live;",
      // Video / ses:
      "media-src 'self' blob:;",
      // YouTube embed:
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com;",
      // Güvenlik sıkılaştırma:
      "object-src 'none';",
      "base-uri 'self';",
      "form-action 'self';",
      "frame-ancestors 'none';"
    ].join(" ");

    return [
      // GLOBAL SECURITY
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },

      // Görseller – 1 yıl immutable cache
      {
        source: "/:all*(png|jpg|jpeg|webp|avif|svg|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Next static build çıktıları
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Fontlar
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  webpack: (config, { dev }) => {
    if (!dev) {
      config.devtool = false;

      const { IgnorePlugin } = require("webpack");
      config.plugins.push(
        new IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );
    }
    return config;
  },

  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  trailingSlash: false,
};

module.exports = nextConfig;
