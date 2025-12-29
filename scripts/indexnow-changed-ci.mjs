// scripts/indexnow-changed-ci.mjs
import { execSync } from "node:child_process";

function sh(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString("utf8");
}

function uniq(arr) {
  return [...new Set(arr)];
}

// Sahneva App Router dosya yollarını URL'e map eder (route groups dahil güvenli)
function mapFileToUrls(file, siteUrl) {
  const urls = [];

  // Sadece uygulama/ içerik değişikliklerini hedefle (istersen genişlet)
  const interesting =
    file.startsWith("app/") ||
    file.startsWith("components/") ||
    file.startsWith("styles/") ||
    file.startsWith("lib/") ||
    file === "next.config.mjs" ||
    file === "package.json";

  if (!interesting) return urls;

  // Blog: app/(tr)/blog/<slug>/page.*
  {
    const m = file.match(/^app\/\([^/]+\)\/blog\/([^/]+)\/page\.(js|jsx|ts|tsx)$/);
    if (m) {
      urls.push(`${siteUrl}/blog/${m[1]}`);
      urls.push(`${siteUrl}/blog`); // blog index de çoğu zaman etkilenir
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

  // TR ana site: app/(tr)/(site)/page.* veya app/(tr)/page.*
  {
    const m1 = file.match(/^app\/\([^/]+\)\/\([^/]+\)\/page\.(js|jsx|ts|tsx)$/);
    const m2 = file.match(/^app\/\([^/]+\)\/page\.(js|jsx|ts|tsx)$/);
    if (m1 || m2) {
      urls.push(`${siteUrl}/`);
      return urls;
    }
  }

  // TR statik sayfalar: app/(tr)/(site)/<route>/page.*
  // route group’ları temizle, sadece gerçek segmentleri al
  {
    const m = file.match(/^app\/\([^/]+\)\/\([^/]+\)\/(.+)\/page\.(js|jsx|ts|tsx)$/);
    if (m) {
      const routePath = m[1]
        .split("/")
        .filter((seg) => seg && !seg.startsWith("(") && !seg.endsWith(")") && !seg.startsWith("@")) // route group/parallel route temizliği
        .join("/");

      // Dinamik segmentleri (örn [slug]) burada istemiyoruz (IndexNow yanlış olur)
      if (routePath && !routePath.includes("[") && !routePath.includes("]")) {
        urls.push(`${siteUrl}/${routePath}`);
      }
      return urls;
    }
  }

  // EN sayfalar: app/(en)/...
  {
    const m = file.match(/^app\/\(en\)\/(.+)\/page\.(js|jsx|ts|tsx)$/);
    if (m) {
      const routePath = m[1]
        .split("/")
        .filter((seg) => seg && !seg.startsWith("(") && !seg.endsWith(")") && !seg.startsWith("@"))
        .join("/");
      if (!routePath.includes("[") && !routePath.includes("]")) {
        urls.push(`${siteUrl}/en/${routePath}`);
      }
      return urls;
    }
  }

  // AR sayfalar: app/(ar)/...
  {
    const m = file.match(/^app\/\(ar\)\/(.+)\/page\.(js|jsx|ts|tsx)$/);
    if (m) {
      const routePath = m[1]
        .split("/")
        .filter((seg) => seg && !seg.startsWith("(") && !seg.endsWith(")") && !seg.startsWith("@"))
        .join("/");
      if (!routePath.includes("[") && !routePath.includes("]")) {
        urls.push(`${siteUrl}/ar/${routePath}`);
      }
      return urls;
    }
  }

  // Global değişiklikler (components/styles/lib) → güvenli minimal ping:
  // Anasayfa + Hizmetler + Blog (istersen azalt/çoğalt)
  if (file.startsWith("components/") || file.startsWith("styles/") || file.startsWith("lib/")) {
    urls.push(`${siteUrl}/`);
    urls.push(`${siteUrl}/hizmetler`);
    urls.push(`${siteUrl}/blog`);
  }

  return urls;
}

function buildChangedFiles() {
  // push event için: HEAD~1..HEAD
  // (merge commitlerde de çalışır)
  let out = "";
  try {
    out = sh("git diff --name-only HEAD~1..HEAD");
  } catch {
    // ilk commit vb.
    out = sh("git ls-files");
  }
  return out
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function main() {
  const siteUrlRaw = process.env.SITE_URL;
  if (!siteUrlRaw) {
    console.error("[IndexNow CI] SITE_URL missing");
    process.exit(1);
  }
  const siteUrl = siteUrlRaw.replace(/\/$/, "");

  const changedFiles = buildChangedFiles();
  const urls = uniq(
    changedFiles.flatMap((f) => mapFileToUrls(f, siteUrl))
  ).filter(Boolean);

  // Eğer hiç URL çıkmadıysa gönderme
  if (urls.length === 0) {
    console.log("[IndexNow CI] No mapped URLs from changed files. Skipping.");
    console.log("OUTPUT_URLS_JSON=[]");
    return;
  }

  // Çok büyümesin diye limit (istersen 200 yap)
  const limited = urls.slice(0, 100);

  console.log("[IndexNow CI] Submitting URLs:");
  for (const u of limited) console.log(" -", u);

  // GitHub Actions output (stdout üzerinden yakalayacağız)
  const json = JSON.stringify(limited);
  console.log(`OUTPUT_URLS_JSON=${json}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
