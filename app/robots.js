// app/robots.js  (veya robots.ts)

export default function robots() {
  const host = "https://www.sahneva.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        disallow: [
          "/_next/",    // static build output
          "/api/",      // server functions
          ],
      },
    ],

    sitemap: [`${host}/sitemap.xml`],
  };
}
