// app/blog/page.jsx
import Link from "next/link";
import Image from "next/image";
import { readdir } from "fs/promises"; // Promise tabanlı fs kullanımı
import { existsSync } from "fs";
import path from "path";

/* ================== RUNTIME & ISR ================== */
export const runtime = "nodejs";
export const revalidate = 1800; // 30 dakikada bir yenile

/* ================== SABİTLER ================== */
const ORIGIN = "https://www.sahneva.com";

/* ================== META DATA ================== */
export const metadata = {
  title: "Blog | Sahneva - Etkinlik Teknolojileri ve Organizasyon Rehberleri",
  description:
    "Kurumsal etkinlik yönetimi, sahne kiralama, LED ekran teknolojileri, ses-ışık sistemleri hakkında uzman rehberleri.",
  openGraph: {
    title: "Sahneva Blog | Etkinlik Teknolojileri Rehberi",
    description:
      "Sahneva ekibinden kurumsal organizasyon ve teknik ekipmanlar üzerine güncel blog yazıları.",
    url: `${ORIGIN}/blog`,
    type: "website",
    images: [
      {
        url: `${ORIGIN}/img/og-blog-default.jpg`, // Varsayılan bir OG görseli olması iyidir
        width: 1200,
        height: 630,
        alt: "Sahneva Blog",
      },
    ],
  },
};

/* ================== YARDIMCI FONKSİYONLAR ================== */
function safeDateString(date) {
  if (!date) return new Date().toISOString(); // Tarih yoksa bugünü ver
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

/**
 * Ham meta verilerini standart formata dönüştürür.
 */
function normalizePostMeta(slug, rawMeta = {}) {
  const fallbackTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()); // Title Case yap
  
  return {
    slug,
    title: rawMeta.title || fallbackTitle,
    description: rawMeta.description || "Bu makale için açıklama girilmemiş.",
    date: safeDateString(rawMeta.date),
    image: rawMeta.image || "/img/blog/default.webp", // metadata içindeki image key'i kullanıldı
    category: rawMeta.category || "Genel",
    readTime: rawMeta.readTime || "3 dk okuma",
    draft: rawMeta.draft === true,
    author: rawMeta.author || "Sahneva Editör", // Yazar bilgisi eklendi
  };
}

/* ================== BLOG YAZILARINI AL (ASYNC) ================== */
async function getBlogPosts() {
  try {
    // *** BURAYI DEĞİŞTİRDİK ***
    const blogDir = path.join(process.cwd(), "app", "(tr)", "blog");

    // Klasör kontrolü
    if (!existsSync(blogDir)) {
      console.warn(`[Blog] Klasör bulunamadı: ${blogDir}`);
      return [];
    }

    // Asenkron okuma
    const items = await readdir(blogDir, { withFileTypes: true });

    const postsPromise = items.map(async (item) => {
      // Sadece klasörleri işle
      if (!item.isDirectory()) return null;

      const postSlug = item.name;
      if (postSlug.startsWith(".")) return null;

      try {
        // Bu kısım aynı kalıyor, çünkü dosyaya göre relatıve import
        const postModule = await import(`./${postSlug}/page`);
        const postMetadata = postModule.metadata || {};

        return normalizePostMeta(postSlug, postMetadata);
      } catch (error) {
        console.warn(`[Blog] ${postSlug} okunurken hata veya meta eksik.`, error);
        return null;
      }
    });

    const allPosts = await Promise.all(postsPromise);

    const validPosts = allPosts
      .filter((post) => post !== null && !post.draft)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return validPosts;
  } catch (error) {
    console.error("[Blog] Kritik okuma hatası:", error);
    return [];
  }
}

/* ================== JSON-LD BİLEŞENİ ================== */
function BlogJsonLd({ posts }) {
  if (!posts?.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog", // ItemList yerine Blog tipi daha spesifik olabilir ama ItemList de uygundur.
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${ORIGIN}/blog`
    },
    "headline": metadata.title,
    "description": metadata.description,
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.image.startsWith("http") ? post.image : `${ORIGIN}${post.image}`,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "url": `${ORIGIN}/blog/${post.slug}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== BLOG KART BİLEŞENİ ================== */
function BlogCard({ post, isFeatured = false }) {
  // Tarih formatlayıcı
  const formattedDate = new Date(post.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full" aria-label={post.title}>
        {/* Resim Alanı */}
        <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isFeatured} // İlk eleman LCP için öncelikli
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          {/* Kategori Badge */}
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {post.category}
          </span>
        </div>

        {/* İçerik Alanı */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
            <time dateTime={post.date} className="flex items-center gap-1">
              📅 {formattedDate}
            </time>
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            <span className="flex items-center gap-1">⏱️ {post.readTime}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {post.description}
          </p>

          <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
            <span className="text-blue-600 text-sm font-semibold group-hover:underline">
              Devamını Oku
            </span>
            <span className="text-gray-600 text-lg transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ================== ANA SAYFA ================== */
export default async function BlogPage() {
  const posts = await getBlogPosts();
  const hasPosts = posts.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogJsonLd posts={posts} />

      {/* HERO SECTION */}
      <section className="relative bg-[#0f172a] text-white py-24 overflow-hidden">
        {/* Dekoratif Arkaplan Efektleri */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Sahneva <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Etkinlik teknolojileri dünyasındaki son trendler, teknik rehberler ve organizasyon ipuçları.
          </p>
        </div>
      </section>

      {/* İÇERİK ALANI */}
      <section className="container mx-auto px-4 -mt-12 relative z-20 pb-20">
        {/* İstatistik / Bilgi Barı */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-12 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12 border border-gray-100">
          <div className="text-center">
            <span className="block text-2xl font-bold text-blue-600">{posts.length}</span>
            <span className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Makale</span>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-200" />
          <div className="text-center">
            <span className="block text-2xl font-bold text-purple-600">
              {hasPosts ? "Aktif" : "-"}
            </span>
            <span className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Durum</span>
          </div>
        </div>

        {/* Blog Grid */}
        {hasPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} isFeatured={index === 0} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 text-center">
            <div className="text-6xl mb-4 opacity-50">📝</div>
            <h3 className="text-xl font-semibold text-gray-900">Henüz Yazı Yok</h3>
            <p className="text-gray-600 mt-2">Blog içerikleri hazırlanıyor, lütfen daha sonra tekrar ziyaret edin.</p>
            <Link href="/" className="mt-6 text-blue-600 hover:underline">Anasayfaya Dön</Link>
          </div>
        )}

        {/* Newsletter (Daha Sade) */}
        <div className="mt-24 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Bültenimize Katılın</h3>
                <p className="text-blue-100 mb-8">Yeni yazılarımızdan ve etkinlik sektörü haberlerinden ilk siz haberdar olun.</p>
                
                <form className="flex flex-col sm:flex-row gap-3">
                    <label htmlFor="newsletter-email" className="sr-only">
                        Bülten e-posta adresi
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        placeholder="E-posta adresiniz"
                        className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-400 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
                        Abone Ol
                    </button>
                </form>
                <p className="text-xs text-blue-300 mt-4 opacity-70">Spam yok, sadece değerli içerik.</p>
            </div>
        </div>
      </section>
    </div>
  );
}
