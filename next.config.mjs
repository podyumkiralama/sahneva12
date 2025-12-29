/** @type {import('next').NextConfig} */
const indexNowKey = process.env.INDEXNOW_KEY;

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (!indexNowKey) {
      return [];
    }

    return [
      {
        source: `/${indexNowKey}.txt`,
        destination: "/indexnow-key.txt",
      },
    ];
  },
};

export default nextConfig;
