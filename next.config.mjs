/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 🚀 Modern JS only – polyfill / legacy JS tamamen kaldırıldı
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    optimizePackageImports: ["react", "react-dom"],
    turbo: {
      rules: { "*.css": {} },
    },
  },

  // ⚡ Build optimizasyonları
  swcMinify: true,
  poweredByHeader: false,
  compress: true,

  // 🔧 LCP için kritik
  productionBrowserSourceMaps: false,
  devIndicators: { buildActivity: true },

  // 📦 Static image optimization
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

  // 🔐 FULL SECURITY HEADERS (CSP dahil)
  async headers() {
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
          // 🛡 CSP → tam optimize edilmiş
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: blob: https://www.sahneva.com https://img.youtube.com https://i.ytimg.com;",
              "font-src 'self' data:;",
              "connect-src 'self' https://www.google-analytics.com;",
              "media-src 'self';",
              "frame-src https://www.youtube.com;",
              "object-src 'none';",
              "base-uri 'self';",
            ].join(" "),
          },
        ],
      },

      // 🖼 Görseller — 1 yıl immutable cache
      {
        source: "/:all*(png|jpg|jpeg|webp|avif|svg|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // JS/CSS bundler — immutable cache
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Font cache
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

  // 🧠 Webpack prod ayarları
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.devtool = false;

      // Bundle küçültme → gereksiz locale dosyalarını kaldır
      const { IgnorePlugin } = require("webpack");
      config.plugins.push(new IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }));
    }
    return config;
  },

  // 🧭 Routing stabilizasyonu
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,

  // 🚀 Output stabilization
  trailingSlash: false,
};

module.exports = nextConfig;
