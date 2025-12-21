import fs from "node:fs";
import path from "node:path";

const MANIFEST_FILES = [
  path.join(process.cwd(), ".next", "build-manifest.json"),
  path.join(process.cwd(), ".next", "server", "app-build-manifest.json"),
  path.join(process.cwd(), "public", "css-manifest.json"),
];

function collectCssEntries(value, results) {
  if (!value) return;

  if (typeof value === "string") {
    if (value.endsWith(".css")) {
      const normalized = value.startsWith("/") ? value : `/${value}`;
      results.add(normalized);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectCssEntries(item, results));
    return;
  }

  if (typeof value === "object") {
    Object.values(value).forEach((entry) => collectCssEntries(entry, results));
  }
}

export function getCssAssetHrefs() {
  const cssEntries = new Set();

  for (const manifestPath of MANIFEST_FILES) {
    if (!fs.existsSync(manifestPath)) continue;

    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      collectCssEntries(manifest, cssEntries);
    } catch {
      // Fail silently; if manifest cannot be read we fall back to DOM discovery in the client.
    }
  }

  return Array.from(cssEntries).filter((href) => href.includes("/_next/static/css/"));
}
