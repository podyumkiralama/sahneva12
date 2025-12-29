// scripts/indexnow-changed-ci.mjs
import { execSync } from "node:child_process";

function sh(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString("utf8");
}
const uniq = (arr) => [...new Set(arr)];

function normalizeSiteUrl(raw) {
  const s = raw.trim().replace(/\/$/, "");
  // SITE_URL mutlaka https://... olmalı
  const u = new URL(s);
  return u.origin; // https://www.sahneva.com
}

// Yalnızca "page.*" değişikliklerinden URL üret (components/styles spam olmasın)
function mapPageFileToUrl(file, siteUrl) {
  // app/(tr)/blog/<slug>/page.*
  let m = file.match(/^app\/\([^/]+\)\/blog\/([^/]+)\/page\.(js|jsx|ts|tsx)$/);
  if (m) return [`${siteUrl}/blog/${m[1]}`, `${siteUrl}/blog`];

  // app/(tr)/blog/page.*
  m = file.match(/^app\/\([^/]+\)\/blog\/page\.(js|jsx|ts|tsx)$/);
  if (m) return [`${siteUrl}/blog`];

  // app/(tr)/(site)/page.*  OR app/(tr)/page.*  => /
  m =
    file.match(/^app\/\([^/]+\)\/\([^/]+\)\/page\.(js|jsx|ts|tsx)$/) ||
    file.match(/^app\/\([^/]+\)\/page\.(js|jsx|ts|tsx)$/);
  if (m) return [`${siteUrl}/`];

  // app/(tr)/(site)/<route...>/page.*
  m = file.match(/^app\/\([^/]+\)\/\([^/]+\)\/(.+)\/page\.(js|jsx|ts|tsx)$/);
  if (m) {
    const routePath = m[1]
      .split("/")
      .filter((seg) => seg && !seg.startsWith("(") && !seg.endsWith(")") && !seg.startsWith("@"))
      .join("/");

    // Dinamik segment yoksa gönder
    if (routePath && !routePath.includes("[") && !routePath.includes("]")) {
      return [`${siteUrl}/${routePath}`];
    }
    return [];
  }

  // app/(en)/<route...>/page.*
  m = file.match(/^app\/\(en\)\/(.+)\/page\.(js|jsx|ts|tsx)$/);
  if (m) {
    const routePath = m[1]
      .split("/")
      .filter((seg) => seg && !seg.startsWith("(") && !seg.endsWith(")") && !seg.startsWith("@"))
      .join("/");
    if (!routePath.includes("[") && !routePath.includes("]")) {
      return [`${siteUrl}/en/${routePath}`];
    }
    return [];
  }

  // app/(ar)/<route...>/page.*
  m = file.match(/^app\/\(ar\)\/(.+)\/page\.(js|jsx|ts|tsx)$/);
  if (m) {
    const routePath = m[1]
      .split("/")
      .filter((seg) => seg && !seg.startsWith("(") && !seg.endsWith(")") && !seg.startsWith("@"))
      .join("/");
    if (!routePath.includes("[") && !routePath.includes("]")) {
      return [`${siteUrl}/ar/${routePath}`];
    }
    return [];
  }

  return [];
}

function buildChangedFiles() {
  try {
    return sh("git diff --name-only HEAD~1..HEAD")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return sh("git ls-files")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

async function main() {
  const siteUrlRaw = process.env.SITE_URL;
  if (!siteUrlRaw) {
    console.error("[IndexNow CI] SITE_URL missing (must be like https://www.sahneva.com)");
    process.exit(1);
  }
  const siteUrl = normalizeSiteUrl(siteUrlRaw);

  const changedFiles = buildChangedFiles();

  // SADECE app/.../page.* dosyalarından URL üret
  const pageFiles = changedFiles.filter((f) =>
    /^app\/.*\/page\.(js|jsx|ts|tsx)$/.test(f)
  );

  const urls = uniq(pageFiles.flatMap((f) => mapPageFileToUrl(f, siteUrl))).filter(Boolean);

  if (urls.length === 0) {
    console.log("[IndexNow CI] No mapped URLs from changed page files. Skipping.");
    console.log("OUTPUT_URLS_JSON=[]");
    return;
  }

  const limited = urls.slice(0, 100);

  console.log("[IndexNow CI] Submitting URLs:");
  for (const u of limited) console.log(" -", u);

  console.log(`OUTPUT_URLS_JSON=${JSON.stringify(limited)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
