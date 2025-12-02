/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    // Senin projede zaten kullandığımız ayar
    optimizePackageImports: ["lodash", "clsx"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 gün
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "www.googletagmanager.com",
      },
      {
        protocol: "https",
        hostname: "www.google-analytics.com",
      },
    ],
  },

  async headers() {
    // CSP'yi okunaklı yazıp sonra tek satıra indiriyoruz
    const cspParts = [
      "default-src 'self'",
      // GA, GTM, inline JSON-LD + GA init script için
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      // Tailwind inline class'lar ve kritik inline stiller için
      "style-src 'self' 'unsafe-inline'",
      // Görseller (site + YouTube thumbnail + GA piksel)
      "img-src 'self' data: blob: https://i.ytimg.com https://www.youtube.com https://www.googletagmanager.com https://www.google-analytics.com",
      "font-src 'self'",
      // GA istekleri
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      "media-src 'self'",
      // YouTube embed
      "frame-src https://www.youtube.com",
      // Sahneva başka sitede iframe içinde açılmasın istersen:
      "frame-ancestors 'self'",
    ];

    const csp = cspParts.join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
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
            key: "Permissions-Policy",
            // İhtiyaç oldukça daraltırız
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/tr",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
