import fs from "fs";
import path from "path";
import { services, projects } from "@/lib/data";

const BLOG_DIR = path.join(process.cwd(), "app/(tr)/blog");

const STATIC_ROUTES = [
  { href: "/", label: "Anasayfa", keywords: ["home"] },
  { href: "/hizmetler", label: "Hizmetler", keywords: ["servis"] },
  { href: "/hakkimizda", label: "Hakkımızda", keywords: ["biz", "firma"] },
  { href: "/blog", label: "Blog", keywords: ["yazılar"] },
  { href: "/iletisim", label: "İletişim", keywords: ["telefon", "mail"] },
  { href: "/nasil-calisiyoruz", label: "Nasıl Çalışıyoruz", keywords: ["süreç"] },
  { href: "/bolgesel-kiralama", label: "Bölgesel Kiralama", keywords: ["lojistik"] },
  { href: "/sss", label: "SSS", keywords: ["sık sorulan"] },
];

const slugToTitle = (slug) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getBlogRoutes = () => {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const slug = entry.name;
      return {
        href: `/blog/${slug}`,
        label: slugToTitle(slug),
        keywords: slug.split("-"),
      };
    });
};

const getServiceRoutes = () =>
  (services ?? []).map((service) => ({
    href: `/${service.slug}`,
    label: service.title,
    keywords: service.keywords ?? [],
  }));

const getProjectRoutes = () =>
  (projects ?? []).map((project) => ({
    href: `/projeler/${project.slug}`,
    label: project.title,
    keywords: project.keywords ?? [],
  }));

const uniqByHref = (items) => {
  const map = new Map();
  items.forEach((item) => {
    if (!map.has(item.href)) {
      map.set(item.href, item);
    }
  });
  return Array.from(map.values());
};

export function getSearchIndex() {
  const combined = [
    ...STATIC_ROUTES,
    ...getServiceRoutes(),
    ...getProjectRoutes(),
    ...getBlogRoutes(),
  ];

  return uniqByHref(combined);
}
