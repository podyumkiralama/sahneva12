// app/robots.js

export default function robots() {
  const host = "https://www.sahneva.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // API route'ları indexlenmesin
          "/private/",    // Varsa özel path'ler buraya eklenebilir
        ],
      },
    ],

    sitemap: [`${host}/sitemap.xml`],
  };
}
