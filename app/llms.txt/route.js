// app/llms.txt/route.js
import fs from "fs";
import path from "path";
import { services, projects } from "@/lib/data";
import { SEO_ARTICLES } from "@/lib/articlesData";

const SITE = "https://www.sahneva.com";
const NOW_ISO = new Date().toISOString();

const REJECT_PATTERNS = [/^\/_next\//, /^\/api\//, /^\/?[$&]$/, /^\/search/i];

/**
 * Basit bir keyword üretici:
 * - title'ı lower-case yapar
 * - özel karakterleri temizler
 * - kelimeleri virgülle birleştirir
 * - her durumda "sahneva" ekler
 */
function buildKeywordsFromTitle(title) {
  if (!title) return "sahneva";
  const normalized = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ\s]+/gi, " ");
  const parts = normalized
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 8); // çok uzamasın diye hafif kırpıyoruz

  const unique = Array.from(new Set([...parts, "sahneva"]));
  return unique.join(",");
}

/**
 * Çift tırnakları escape eden basit wrapper
 */
function quote(value) {
  if (value == null) return '""';
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

/**
 * URL temizleyici
 */
function clean(pathStr) {
  if (!pathStr) return null;
  let p = String(pathStr).trim();

  let parsedPath = p;
  try {
    const u = new URL(p, SITE);
    parsedPath = u.pathname;
  } catch {
    parsedPath = p;
  }

  p = parsedPath;

  if (!p.startsWith("/")) p = `/${p}`;

  if (p.includes("{") || p.includes("}")) return null;

  if (REJECT_PATTERNS.some((rx) => rx.test(p))) return null;

  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);

  return p;
}

/**
 * Statik sayfalar – biraz daha keyword ve summary zenginleştirilmiş
 */
const STATIC_ENTRIES = [
  {
    path: "/",
    title: "Ana Sayfa",
    summary:
      "Sahneva'nın İstanbul ve Türkiye genelinde sunduğu sahne, podyum, LED ekran, ses & ışık ve çadır kiralama hizmetlerine genel bakış.",
    priority: 1,
    category: "static",
    keywords:
      "sahneva,sahne kiralama,podyum kiralama,led ekran kiralama,ses ışık sistemleri,çadır kiralama,istanbul",
  },
  {
    path: "/hizmetler",
    title: "Hizmetler",
    summary:
      "Podyum, sahne, LED ekran, ses & ışık sistemleri, çadır ve etkinlik altyapısı dahil tüm teknik kiralama hizmetlerinin toplu listesi.",
    priority: 0.96,
    category: "static",
    keywords:
      "sahneva,hizmetler,sahne sistemleri,podyum,led ekran,ses sistemi,ışık sistemi,etkinlik prodüksiyon",
  },
  {
    path: "/projeler",
    title: "Projeler",
    summary:
      "Festival, konser, kurumsal lansman, protokol töreni ve üniversite mezuniyeti gibi tamamlanan Sahneva projelerinden seçilmiş örnekler.",
    priority: 0.92,
    category: "static",
    keywords:
      "sahneva,referans projeler,konser sahnesi,kurumsal organizasyon,festival kurulumu,mezuniyet töreni",
  },
  {
    path: "/hakkimizda",
    title: "Hakkımızda",
    summary:
      "Sahneva'nın hikayesi, ekip yapısı, teknik altyapısı ve sahne prodüksiyonunda kalite yaklaşımı.",
    priority: 0.9,
    category: "static",
    keywords:
      "sahneva,hakkımızda,sahne prodüksiyon,firma profili,etkinlik altyapısı,ekip",
  },
  {
    path: "/iletisim",
    title: "İletişim",
    summary:
      "Podyum, sahne, LED ekran, ses & ışık ve çadır kiralama talepleri için telefon, WhatsApp ve e-posta dahil tüm iletişim kanalları.",
    priority: 0.9,
    category: "static",
    keywords:
      "sahneva,iletişim,teklif al,whatsapp,telefon,etkinlik keşfi,sahne kiralama fiyat",
  },
  {
    path: "/sss",
    title: "SSS",
    summary:
      "Kurulum süresi, teknik gereksinimler, ödeme ve keşif süreçleriyle ilgili sahne ve ekipman kiralama hakkında sık sorulan sorular.",
    priority: 0.88,
    category: "static",
    keywords:
      "sahneva,sss,sık sorulan sorular,sahne kiralama süreci,podyum kurulumu,etkinlik hazırlığı",
  },
];

/**
 * Hizmet sayfaları
 */
function serviceEntries() {
  return (services ?? [])
    .map((service) => {
      const pathValue = clean(`/${service.slug}`);
      if (!pathValue) return null;

      return {
        path: pathValue,
        title: service.title,
        summary: service.excerpt,
        priority: 0.92,
        category: "service",
        keywords: buildKeywordsFromTitle(service.title),
      };
    })
    .filter(Boolean);
}

/**
 * Proje sayfaları
 */
function projectEntries() {
  return (projects ?? [])
    .map((project) => {
      const pathValue = clean(`/projeler/${project.slug}`);
      if (!pathValue) return null;

      return {
        path: pathValue,
        title: project.title,
        summary: project.excerpt,
        priority: project.priority ?? 0.82,
        updatedAt: project.updatedAt ?? NOW_ISO,
        category: "project",
        keywords: buildKeywordsFromTitle(project.title),
      };
    })
    .filter(Boolean);
}

/**
 * Blog / SEO makale sayfaları
 */
function articleEntries() {
  const blogRoot = path.join(process.cwd(), "app/(tr)/blog");
  const publishedArticles = (SEO_ARTICLES ?? []).filter(
    (article) => article.slug
  );

  const availableSlugs = new Set();
  if (fs.existsSync(blogRoot)) {
    const entries = fs.readdirSync(blogRoot, { withFileTypes: true });
    entries
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => availableSlugs.add(entry.name));
  }

  return publishedArticles
    .map((article) => {
      const pathValue = clean(`/blog/${article.slug}`);
      if (!pathValue) return null;

      const available = availableSlugs.has(article.slug);
      if (!available) return null;

      return {
        path: pathValue,
        title: article.title,
        summary: article.desc,
        priority: 0.86,
        date: article.datePublished,
        category: "blog",
        keywords: buildKeywordsFromTitle(article.title),
      };
    })
    .filter(Boolean);
}

/**
 * Her entry için tek satırlık llms.txt formatı
 */
function formatEntry({
  path,
  title,
  summary,
  priority,
  updatedAt,
  date,
  category,
  keywords,
}) {
  const fields = [
    `url=${SITE}${path}`,
    `title=${quote(title)}`,
    `priority=${Number(priority || 0).toFixed(2)}`,
  ];

  if (category) fields.push(`category=${category}`);
  if (updatedAt) fields.push(`lastmod=${updatedAt}`);
  if (date) fields.push(`published=${date}`);
  if (keywords) fields.push(`keywords=${quote(keywords)}`);
  if (summary) fields.push(`summary=${quote(summary)}`);

  return fields.join(" | ");
}

export async function GET() {
  const curated = [
    ...STATIC_ENTRIES,
    ...serviceEntries(),
    ...projectEntries(),
    ...articleEntries(),
  ];

  const unique = new Map();
  for (const item of curated) {
    if (!item?.path) continue;
    const key = item.path;
    if (!unique.has(key)) unique.set(key, item);
  }

  const sorted = [...unique.values()].sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  );

  const header = [
    "# llms.txt",
    "# Sahneva için LLM odaklı en iyi içerik ve referans sayfa listesi",
    "# Daha verimli tarama için öncelik sıralı bağlantılar",
    `generated=${NOW_ISO}`,
    `site=${SITE}`,
    "",
    "[pages]",
  ];

  const body = sorted.map(formatEntry);

  return new Response([...header, ...body].join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
