import Link from "next/link";

import { BASE_SITE_URL, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/seo/schemaIds";

const NOT_FOUND_URL = `${BASE_SITE_URL}/404`;
const NOT_FOUND_DESCRIPTION = "Aradığınız sayfa bulunamadı veya taşınmış olabilir.";

const buildNotFoundSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${NOT_FOUND_URL}#webpage`,
  url: NOT_FOUND_URL,
  name: "Sayfa Bulunamadı",
  description: NOT_FOUND_DESCRIPTION,
  isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID },
  about: { "@id": ORGANIZATION_ID },
  inLanguage: "tr-TR",
});

const NOT_FOUND_JSON_LD = JSON.stringify(buildNotFoundSchema());

export const metadata = {
  title: "Sayfa Bulunamadı | Sahneva",
  description: NOT_FOUND_DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: NOT_FOUND_URL },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <>
        <script
          id="ld-json-not-found"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: NOT_FOUND_JSON_LD }}
        />
        <section className="text-center px-6">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-3">404 — Sayfa Bulunamadı</h1>
          <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
            Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-lg transition-colors"
            >
              Anasayfaya Dön
            </Link>
            <Link
              href="/iletisim"
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold px-5 py-3 rounded-lg transition-colors"
            >
              İletişim
            </Link>
          </div>
        </section>
      </>
    </div>
  );
}
