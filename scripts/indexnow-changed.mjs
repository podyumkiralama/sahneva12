import { execSync } from "node:child_process";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.sahneva.com").replace(/\/$/, "");
const TOKEN = process.env.INDEXNOW_TOKEN;

if (!TOKEN) {
  console.log("[IndexNow] INDEXNOW_TOKEN missing. Skipping.");
  process.exit(0);
}

function sh(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString("utf8").trim();
}

// Vercel: git clone depth vs olabilir; iki commit varsa diff alır.
// Yoksa (ilk deploy) fallback ile sadece çık.
function getChangedFiles() {
  try {
    // HEAD~1 varsa
    const out = sh("git diff --name-only HEAD~1..HEAD");
    return out ? out.split("\n").map((s) => s.trim()).filter(Boolean) : [];
  } catch {
    console.log("[IndexNow] No git history for diff (first deploy?). Skipping changed-URLs submit.");
    return [];
  }
}

// Blog slug: app/(tr)/blog/<slug>/page.jsx gibi klasör adını slug kabul ediyoruz.
// Senin yapın farklıysa sadece bu map kısmını güncelleriz.
function fileToUrl(file) {
  // blog post page
  const blogMatch = file.match(/app\/\([^)]*\)\/blog\/([^/]+)\/page\.(js|jsx|ts|tsx)$/);
  if (blogMatch) return `${SITE_URL}/blog/${blogMatch[1]}`;

  // blog index
  if (file.match(/app\/\([^)]*\)\/blog\/page\.(js|jsx|ts|tsx)$/)) return `${SITE_URL}/blog`;

  // homepage
  if (file.match(/app\/\([^)]*\)\/\([^)]*\)\/page\.(js|jsx|ts|tsx)$/) || file.match(/app\/\([^)]*\)\/page\.(js|jsx|ts|tsx)$/)) {
    // bu kural projene göre geniş; istersen kaldırırız.
    return `${SITE_URL}/`;
  }

  return null;
}

async function postUrls(urls) {
  const endpoint = `${SITE_URL}/api/indexnow`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-indexnow-token": TOKEN,
    },
    body: JSON.stringify({ urls }),
  });

  const text = await res.text().catch(() => "");
  console.log(`[IndexNow] POST ${endpoint} → ${res.status}`);
  if (text) console.log(`[IndexNow] Response: ${text.slice(0, 400)}`);
}

async function main() {
  const files = getChangedFiles();
  if (files.length === 0) {
    console.log("[IndexNow] No changed files detected.");
    return;
  }

  const urls = Array.from(
    new Set(
      files
        .map(fileToUrl)
        .filter(Boolean)
    )
  );

  if (urls.length === 0) {
    console.log("[IndexNow] No URLs mapped from changed files.");
    return;
  }

  console.log(`[IndexNow] Submitting ${urls.length} changed URL(s):`);
  urls.forEach((u) => console.log(" -", u));

  await postUrls(urls);
}

main().catch((e) => {
  console.log("[IndexNow] Fatal:", String(e).slice(0, 400));
  process.exit(0);
});
