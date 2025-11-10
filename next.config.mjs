/** @type {import('next').NextConfig} */
const nextConfig = {
  // === TEMEL AYARLAR - Next.js 16 Uyumlu ===
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  // ❌ swcMinify kaldırıldı - Next.js 16'da varsayılan
  
  // === TURBOPACK KONFİGÜRASYONU ===
  // ✅ Turbopack için boş konfigürasyon
  turbopack: {},
  
  // === GÖRÜNTÜ OPTİMİZASYONU ===
  images: {
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: false,
  },

  // === DERLEYİCİ OPTİMİZASYONLARI ===
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-testid$'],
    } : false,
  },

  // === DENEYSEK ÖZELLİKLER - Next.js 16 Uyumlu ===
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: [
      'lucide-react',
      '@headlessui/react',
      'framer-motion',
      'react-icons'
    ],
    // ❌ optimizeCss kaldırıldı - stabil değil
  },

  // === GÜVENLİK BAŞLIKLARI - TÜM HATALAR DÜZELTİLDİ ===
  async headers() {
    const securityHeaders = [
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin'
      },
      {
        key: 'Cross-Origin-Resource-Policy',
        value: 'same-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      },
    ];

    // ✅ TÜM HATALAR İÇİN GÜNCELLENMİŞ CSP
    const contentSecurityPolicy = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com;
      script-src-elem 'self' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: blob: https: https://www.googletagmanager.com https://www.google-analytics.com;
      connect-src 'self' https://vitals.vercel-insights.com https://www.sahneva.com https://www.google-analytics.com https://region1.google-analytics.com;
      frame-src 'self' https://www.google.com;
      base-uri 'self';
      form-action 'self' https://formspree.io https://wa.me;
      object-src 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    securityHeaders.push({
      key: 'Content-Security-Policy',
      value: contentSecurityPolicy
    });

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|webp|avif|svg|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        source: '/(.*)\\.(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ];
  },

  // === ÇEVRE DEĞİŞKENLERİ ===
  env: {
    SITE_URL: process.env.SITE_URL || 'https://www.sahneva.com',
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV || 'development',
  },

  // === BUILD & PERFORMANS OPTİMİZASYONLARI ===
  trailingSlash: false,
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 300,
  
  // ✅ Output optimizasyonu
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // ✅ Webpack optimizasyonları KALDIRILDI - Turbopack ile uyumsuz
  // ❌ Webpack config kaldırıldı çünkü Turbopack ile çakışıyor
};

export default nextConfig;
