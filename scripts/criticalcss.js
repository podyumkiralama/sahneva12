import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

async function loadBeasties() {
  return import("beasties")
    .then((mod) => mod.default ?? mod)
    .catch(async () => {
      console.warn(
        "[criticalcss] beasties not available, falling back to critters (temporary).",
      );

      const mod = await import("critters");
      return mod.default ?? mod;
    });
}

async function findFirstExisting(paths) {
  for (const candidate of paths) {
    try {
      const info = await stat(candidate);
      if (info.isDirectory()) {
        return candidate;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectHtmlFiles(fullPath);
      }
      if (entry.isFile() && entry.name.endsWith(".html")) {
        return fullPath;
      }
      return [];
    }),
  );
  return files.flat();
}

let warnedAboutStrip = false;

function stripBlockingLinks(html) {
  if (process.env.CRITICAL_CSS_STRIP_HEAD !== "true") {
    return html;
  }

  if (!warnedAboutStrip) {
    console.warn(
      "[criticalcss] CRITICAL_CSS_STRIP_HEAD=true: ensure layout/global CSS is safe to remove from <head>.",
    );
    warnedAboutStrip = true;
  }

  const headMatch = html.match(/<head[^>]*>[\s\S]*?<\/head>/i);
  if (!headMatch) return html;

  const originalHead = headMatch[0];
  const cleanedHead = originalHead.replace(
    /<link\b[^>]*?(?:rel=("|')?stylesheet\1|as=("|')?style\2)[^>]*?>\s*/gi,
    "",
  );

  if (cleanedHead === originalHead) return html;
  return html.replace(originalHead, cleanedHead);
}

async function processHtmlFile(filePath, beasties) {
  const rawHtml = await readFile(filePath, "utf8");
  const processedHtml = await beasties.process(rawHtml);
  const cleanedHtml = stripBlockingLinks(processedHtml);

  if (cleanedHtml !== rawHtml) {
    await writeFile(filePath, cleanedHtml, "utf8");
    return true;
  }
  return false;
}

async function main() {
  const root = path.resolve(process.cwd());
  const preferredRoots = [
    process.env.CRITICAL_CSS_HTML_ROOT,
    path.join(root, ".next", "server", "app"),
    path.join(root, ".next", "server", "pages"),
    path.join(root, "out"),
    path.join(root, ".next"),
  ].filter(Boolean);

  const htmlRoot = await findFirstExisting(preferredRoots);
  if (!htmlRoot) {
    console.warn("[criticalcss] No HTML output directory found. Skipping.");
    return;
  }

  const beasties = await loadBeasties();
  const engine = new beasties({
    path: htmlRoot,
    pruneSource: false,
    logLevel: "info",
  });

  const htmlFiles = await collectHtmlFiles(htmlRoot);
  if (!htmlFiles.length) {
    console.warn(`[criticalcss] No HTML files found under ${htmlRoot}.`);
    return;
  }

  let updated = 0;
  for (const file of htmlFiles) {
    try {
      const changed = await processHtmlFile(file, engine);
      if (changed) updated += 1;
    } catch (error) {
      console.error(`[criticalcss] Failed to process ${file}:`, error);
    }
  }

  console.log(
    `[criticalcss] Processed ${htmlFiles.length} HTML files under ${htmlRoot}. Updated: ${updated}.`,
  );
}

main().catch((error) => {
  console.error("[criticalcss] Unhandled error:", error);
  process.exitCode = 1;
});
