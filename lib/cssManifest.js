import fs from "fs";
import path from "path";

const MANIFEST_FILES = [
  path.join(process.cwd(), ".next", "app-build-manifest.json"),
  path.join(process.cwd(), ".next", "build-manifest.json"),
];

const CSS_EXTENSION = /\.css$/i;

function normalizeCssHref(assetPath) {
  if (!assetPath) return null;
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }
  if (assetPath.startsWith("/_next/")) return assetPath;
  if (assetPath.startsWith("static/")) return `/_next/${assetPath}`;
  if (assetPath.startsWith("/static/")) return `/_next${assetPath}`;
  if (assetPath.startsWith("/")) return assetPath;
  return `/_next/${assetPath}`;
}

function collectCssAssets(value, cssAssets) {
  if (!value) return;

  if (Array.isArray(value)) {
    value.forEach((entry) => collectCssAssets(entry, cssAssets));
    return;
  }

  if (typeof value === "object") {
    Object.values(value).forEach((entry) => collectCssAssets(entry, cssAssets));
    return;
  }

  if (typeof value === "string" && CSS_EXTENSION.test(value)) {
    const href = normalizeCssHref(value);
    if (href) cssAssets.add(href);
  }
}

export function getCssManifestHrefs() {
  const cssAssets = new Set();

  MANIFEST_FILES.forEach((manifestPath) => {
    if (!fs.existsSync(manifestPath)) return;

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    collectCssAssets(manifest, cssAssets);
  });

  return Array.from(cssAssets);
}
