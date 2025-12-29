/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const key = process.env.INDEXNOW_KEY;

    if (!key) {
      return [];
    }

    return [
      {
        source: `/${key}.txt`,
        destination: '/indexnow',
      },
    ];
  },
};

export default nextConfig;
