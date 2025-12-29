// scripts/indexnow-changed-ci.mjs
import { execSync } from "node:child_process";

function sh(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString("utf8");
}

function uniq(arr) {
  return [...new Set(arr)];
}

const DEFAULT_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

function mapFileToUrls(file, siteUrl) {
  const urls = [];

  const interesting =
    file.startsWith("app/") ||
    file.startsWith("components/") ||
    file.startsWith("styles/") ||
    file.startsWith("lib/") ||
    file === "next.config.mjs" ||
    file === "package.json";

  if (!interesting) return urls;

  // Blog post: app/(tr)/blog/<slug>/page.(js|jsx|ts|tsx)
  {
    const m = file.match(
      /^app\/\([^/]+\)\/blog\/([^/]+)\/page\.(js|jsx|ts|tsx)$/
    );
    if (m) {
      urls.push(`${siteUrl}/blog/${m[1]}`);
      urls.push(`${siteUrl}/blog`);
      return urls;
    }
  }

  // Blog index: app/(tr)/blog/page.*
  {
    const m = file.match(/^app\/\([^/]+\)\/blog\/page\.(js|jsx|ts|tsx)$/);
    if (m) {
      urls.push(`${siteUrl}/blog`);
      return urls;
    }
  }

  // TR home: app/(tr)/(site)/page.* OR app/(tr)/page.*
  {
    const m1 = file.match(/^app\/\([^/]+\)\/\([^/]+\)\/page\.(js|jsx|ts|tsx)$/);
    const m2 = file.match(/^app\/\([^/]+\)\/page\.(js|jsx|ts|tsx)$/);
    if (m1 || m2) {
      urls.push(`${siteUrl}/`);
      return urls;
    }
  }

  // TR static pages: app/(tr)/(site)/<route>/page.*
  {
    const m = file.match(
      /^app\/\([^/]+\)\/\([^/]+\)\/(.+)\/page\.(js|jsx|ts|tsx)$/
    );
    if (m) {
      const routePath = m[1]
        .split("/")
        .filter(
          (seg) =>
            seg &&
            !seg.startsWith("(") &&
            !seg.endsWith(")") &&
            !seg.startsWith("@")
        )
        .join("/");

      if (
        routePath &&
        !routePath.includes("[") &&
        !routePath.includes("]")
      ) {
        urls.push(`${siteUrl}/${routePath}`);
      }
      return urls;
    }
  }

  // EN: app/(en)/<route>/page.*
  {
    const m = file.match(/^app\/\(en\)\/(.+)\/page\.(js|jsx|ts|tsx)$/);
    if (m) {
      const routePath = m[1]
        .split("/")
        .filter(
          (seg) =>
            seg &&
            !seg.startsWith("(") &&
            !seg.endsWith(")") &&
            !seg.startsWith("@")
        )
        .join("/");

      if (!routePath.includes("[") && !routePath.includes("]")) {
        urls.push(`${siteUrl}/en/${routePath}`);
      }
      return urls;
    }
  }

  // AR: app/(ar)/<route>/page.*
  {
    const m = file.match(/^app\/\(ar\)\/(.+)\/page\.(js|jsx|ts|tsx)$/);
    if (m) {
      const routePath = m[1]
        .split("/")
        .filter(
          (seg) =>
            seg &&
            !seg.startsWith("(") &&
            !seg.endsWith(")") &&
            !seg.startsWith("@")
        )
        .join("/");

      if (!routePath.includes("[") && !routePath.includes("]")) {
        urls.push(`${siteUrl}/ar/${routePath}`);
      }
      return urls;
    }
  }

  // Global changes → minimal safe ping
  if (
    file.startsWith("components/") ||
    file.startsWith("styles/") ||
    file.startsWith("lib/")
  ) {
    urls.push(`${siteUrl}/`);
    urls.push(`${siteUrl}/hizmetler`);
    urls.push(`${siteUrl}/blog`);
  }

  return urls;
}

function buildChangedFiles() {
  let out = "";
  try {
    out = sh("git diff --name-only HEAD~1..HEAD");
  } catch {
    out = sh("git ls-files");
  }
  return out
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function postJson(endpoint, payload) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  return { status: res.status, ok: res.ok, body: text };
}

async function main() {
  const siteUrlRaw = process.env.SITE_URL;
  const key = process.env.INDEXNOW_KEY; // sadece bunu kullan

  if (!siteUrlRaw) {
    console.error("[IndexNow CI] SITE_URL missing.");
    process.exit(1);
  }
  if (!key) {
    console.error("[IndexNow CI] INDEXNOW_KEY missing.");
    process.exit(1);
  }

  const siteUrl = siteUrlRaw.replace(/\/$/, "");
  const host = new URL(siteUrl).host;
  const keyLocation = `${siteUrl}/${key}.txt`;

  const changedFiles = buildChangedFiles();

  const urls = uniq(changedFiles.flatMap((f) => mapFileToUrls(f, siteUrl))).filter(
    Boolean
  );

  if (urls.length === 0) {
    console.log("[IndexNow CI] No mapped URLs from changed files. Skipping.");
    return;
  }

  const limited = urls.slice(0, 100);

  console.log("[IndexNow CI] Submitting URLs:");
  for (const u of limited) console.log(" -", u);

  const payload = {
    host,
    key,
    keyLocation,
    urlList: limited,
  };

  // Trim log (key gizli)
  console.log(
    "Payload (trimmed):",
    JSON.stringify({
      host,
      key: "***",
      keyLocation: "***",
      urlList: limited.map(() => "***"),
    })
  );

  const endpoints = (process.env.INDEXNOW_ENDPOINTS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const targets = endpoints.length ? endpoints : DEFAULT_ENDPOINTS;

  for (const ep of targets) {
    const r = await postJson(ep, payload);
    console.log(`\n[IndexNow CI] POST ${ep} → ${r.status}`);
    if (!r.ok) console.log(`[IndexNow CI] Response: ${r.body}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});