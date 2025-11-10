// app/sitemap.js
import { services, projects } from "@/lib/data";

const SITE = "https://www.sahneva.com";
const abs = (p) => (p?.startsWith("http") ? p : `${SITE}${p}`);
const NOW_ISO = new Date().toISOString();

const REJECT_PATTERNS = [
  /^\/_next\//,     // build assetleri
  /^\/api\//,       // API route'lar
  /^\/?[\$&]$/,     // /$ veya /& gibi hatalı path'ler
  /^\/search/i,     // arama şablonları
];

// path normalizasyonu + filtre
function clean(path) {
  if (!path) return null;
  let p = String(path).trim();

  // absolute URL gelirse sadece path'i al
  try {
    const u = new URL(p, SITE);
    p = u.pathname; // query + hash at
  } catch {
    // relative ise devam
  }

  if (!p.startsWith("/")) p = `/${p}`;

  // placeholder/braces varsa at
  if (p.includes("{") || p.includes("}")) return null;

  // istenmeyen kalıplar
  if (REJECT_PATTERNS.some((rx) => rx.test(p))) return null;

  // trailing slash standardize (ana sayfa hariç)
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);

  return p;
}

// ❶ Statik sayfalar
const STATIC_PAGES = [
  "/", "/hizmetler", "/podyum-kiralama", "/led-ekran-kiralama",
  "/ses-isik-sistemleri", "/cadir-kiralama", "/masa-sandalye-kiralama",
  "/sahne-kiralama", "/hakkimizda", "/iletisim", "/sss",
].map((p) => ({
  path: p,
  lastMod: NOW_ISO,
  change: ["hakkimizda","iletisim"].includes(p.replace("/",""))
    ? "yearly"
    : (p === "/sss" ? "monthly" : "weekly"),
  pr: p === "/" ? 1.0 : 0.9,
}));

// ❷ İsteğe bağlı sayfa görselleri
const IMAGE_MAP = {
  "/": ["/img/hero-bg.webp"],
  "/podyum-kiralama": [
    "/img/hizmet-podyum.webp",
    "/img/galeri/podyum-kiralama-1.webp",
  ],
  "/led-ekran-kiralama": [
    "/img/hizmet-led-ekran.webp",
    "/img/galeri/led-ekran-kiralama-1.webp",
  ],
  "/cadir-kiralama": [
    "/img/hizmet-cadir.webp",
    "/img/galeri/cadir-kiralama-1.webp",
  ],
  "/sahne-kiralama": ["/img/hizmet-sahne.webp"],
  "/ses-isik-sistemleri": ["/img/hizmet-sesisik.webp"],
  "/masa-sandalye-kiralama": ["/img/hizmet-masa.webp"],
  "/hizmetler": ["/img/hizmetler-ust.webp"],
  "/hakkimizda": ["/img/hakkimizda.webp"],
};

// ❸ services → dinamik
function dynamicFromServices() {
  const seen = new Set(STATIC_PAGES.map((s) => s.path));
  return (services ?? [])
    .map((s) => clean(`/${encodeURIComponent(s.slug ?? "")}`))
    .filter(Boolean)
    .filter((p) => !seen.has(p))
    .map((p) => ({
      path: p,
      lastMod: NOW_ISO,
      change: "weekly",
      pr: 0.9,
    }));
}

// ❹ projects → dinamik
function dynamicFromProjects() {
  return (projects ?? [])
    .map((p) => ({
      path: clean(`/projeler/${encodeURIComponent(p.slug ?? "")}`),
      lastMod: p?.updatedAt ?? NOW_ISO,
      change: p?.changeFrequency ?? "monthly",
      pr: p?.priority ?? 0.8,
      images: (p?.images ?? []).map(abs),
    }))
    .filter(({ path }) => Boolean(path));
}

// ❺ Next.js sitemap çıktısı
export default function sitemap() {
  const base = [...STATIC_PAGES, ...dynamicFromServices()];
  const proj = dynamicFromProjects();

  // duplicate temizliği
  const uniq = new Map();
  for (const item of base) {
    const path = clean(item.path);
    if (!path) continue;
    if (!uniq.has(path)) uniq.set(path, item);
  }

  const baseWithImages = [...uniq.values()].map(({ path, lastMod, change, pr }) => ({
    url: abs(path),
    lastModified: new Date(lastMod).toISOString(),
    changeFrequency: change,
    priority: pr,
    images: (IMAGE_MAP[path] ?? []).map(abs),
  }));

  const projectItems = proj.map(({ path, lastMod, change, pr, images }) => ({
    url: abs(path),
    lastModified: new Date(lastMod).toISOString(),
    changeFrequency: change,
    priority: pr,
    images,
  }));

  return [...baseWithImages, ...projectItems];
}
