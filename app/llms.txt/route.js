import fs from "fs";
import path from "path";
import { services, projects } from "@/lib/data";
import { SEO_ARTICLES } from "@/lib/articlesData";

const SITE = "https://www.sahneva.com";
const NOW_ISO = new Date().toISOString();

const STATIC_ENTRIES = [
  {
    path: "/",
    title: "Ana Sayfa",
    summary: "Sahneva'nın tüm hizmetlerine hızlı bakış ve öne çıkan referanslar.",
    priority: 1,
  },
  {
    path: "/hizmetler",
    title: "Hizmetler",
    summary: "Tüm teknik kiralama hizmetlerinin toplu listesi.",
    priority: 0.96,
  },
  {
    path: "/projeler",
    title: "Projeler",
    summary: "Tamamlanan kurulum ve etkinlik çalışmalarından örnekler.",
    priority: 0.92,
  },
  {
    path: "/hakkimizda",
    title: "Hakkımızda",
    summary: "Şirket özeti, ekip ve kalite yaklaşımı.",
    priority: 0.9,
  },
  {
    path: "/iletisim",
    title: "İletişim",
    summary: "Teklif ve keşif talepleri için iletişim kanalları.",
    priority: 0.9,
  },
  {
    path: "/sss",
    title: "SSS",
    summary: "Sık sorulan sorular ve hızlı yanıtlar.",
    priority: 0.88,
  },
];

const REJECT_PATTERNS = [/^\/_next\//, /^\/api\//, /^\/?[$&]$/, /^\/search/i];

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

function serviceEntries() {
  return (services ?? [])
    .map((service) => ({
      path: clean(`/${service.slug}`),
      title: service.title,
      summary: service.excerpt,
      priority: 0.92,
    }))
    .filter((item) => Boolean(item.path));
}

function projectEntries() {
  return (projects ?? [])
    .map((project) => ({
      path: clean(`/projeler/${project.slug}`),
      title: project.title,
      summary: project.excerpt,
      priority: project.priority ?? 0.82,
      updatedAt: project.updatedAt ?? NOW_ISO,
    }))
    .filter((item) => Boolean(item.path));
}

function articleEntries() {
  const blogRoot = path.join(process.cwd(), "app/(tr)/blog");
  const publishedArticles = (SEO_ARTICLES ?? []).filter((article) => article.slug);

  const availableSlugs = new Set();
  if (fs.existsSync(blogRoot)) {
    const entries = fs.readdirSync(blogRoot, { withFileTypes: true });
    entries
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => availableSlugs.add(entry.name));
  }

  return publishedArticles
    .map((article) => ({
      path: clean(`/blog/${article.slug}`),
      title: article.title,
      summary: article.desc,
      priority: 0.86,
      available: availableSlugs.has(article.slug),
      date: article.datePublished,
    }))
    .filter((item) => Boolean(item.path) && item.available);
}

function formatEntry({ path, title, summary, priority, updatedAt, date }) {
  const fields = [
    `url=${SITE}${path}`,
    `title="${title}"`,
    `priority=${priority.toFixed(2)}`,
  ];

  if (updatedAt) fields.push(`lastmod=${updatedAt}`);
  if (date) fields.push(`published=${date}`);

  if (summary) fields.push(`summary="${summary}"`);

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
    if (!item.path) continue;
    const key = item.path;
    if (!unique.has(key)) unique.set(key, item);
  }

  const sorted = [...unique.values()].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

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
