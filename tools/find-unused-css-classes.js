#!/usr/bin/env node
import fs from "fs";
import path from "path";

const rootDir = process.cwd();

/* ================= CONFIG ================= */
const ignoredDirectories = new Set([
  "node_modules",
  ".git",
  ".next",
  ".turbo",
  "dist",
  "build",
  ".vercel",
]);

const sourceExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".md",
  ".mdx",
]);

const sourceRoots = ["app", "components", "lib", "pages", "src"];
const cssExtensions = new Set([".css"]);

const safelistPath = path.join(rootDir, "tools", "css-safelist.txt");

/* ================= HELPERS ================= */
function walkDirectory(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    entry.isDirectory() ? walkDirectory(full, onFile) : onFile(full);
  }
}

const read = (fp) => {
  try {
    return fs.readFileSync(fp, "utf8");
  } catch {
    return "";
  }
};

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* ================= CSS ================= */
function collectCssFiles() {
  const out = [];
  walkDirectory(rootDir, (fp) => {
    if (!cssExtensions.has(path.extname(fp))) return;
    const rel = path.relative(rootDir, fp);
    if (rel.startsWith(`tools${path.sep}`)) return;

    if (
      rel.startsWith(`styles${path.sep}`) ||
      rel.startsWith(`public${path.sep}css${path.sep}`) ||
      rel.endsWith(".module.css")
    ) {
      out.push(rel);
    }
  });
  return out.sort();
}

function collectCssDefinitions(cssFiles) {
  const defs = new Map();
  const selectorRegex =
    /(^|[^a-zA-Z0-9_-])\.([A-Za-z_-][A-Za-z0-9_-]*)(?=[^A-Za-z0-9_-]|$)/g;

  for (const file of cssFiles) {
    const abs = path.join(rootDir, file);
    const lines = read(abs).split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      let m;
      while ((m = selectorRegex.exec(lines[i]))) {
        const name = m[2];
        const arr = defs.get(name) ?? [];
        arr.push({ file, line: i + 1 });
        defs.set(name, arr);
      }
      selectorRegex.lastIndex = 0;
    }
  }
  return defs;
}

/* ================= SOURCE ================= */
function collectSourceTexts() {
  const texts = [];
  for (const root of sourceRoots) {
    const dir = path.join(rootDir, root);
    if (!fs.existsSync(dir)) continue;

    walkDirectory(dir, (fp) => {
      if (sourceExtensions.has(path.extname(fp))) {
        texts.push(read(fp));
      }
    });
  }
  return texts;
}

/* ================= SAFELIST ================= */
function loadSafelist() {
  if (!fs.existsSync(safelistPath)) return new Set();
  return new Set(
    read(safelistPath)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
  );
}

/* ================= USAGE CHECK ================= */
function isUsed(className, sources) {
  const safe = escapeRegExp(className);

  const patterns = [
    new RegExp(`(^|[^A-Za-z0-9_-])${safe}([^A-Za-z0-9_-]|$)`),
    new RegExp(`\\bstyles\\.${safe}\\b`),
    new RegExp(`\\bstyles\\[(["'])${safe}\\1\\]`),
    new RegExp(`([,{]\\s*)(["'])?${safe}\\2\\s*:`),
    new RegExp(`${escapeRegExp(className.replace(/[-_]?\d+$/, ""))}[-_]?\\$\\{`),
  ];

  return sources.some((txt) => patterns.some((p) => p.test(txt)));
}

/* ================= SNIPPET ================= */
function extractSnippet(cssFile, line) {
  const abs = path.join(rootDir, cssFile);
  const lines = read(abs).split(/\r?\n/);

  const start = Math.max(0, line - 2);
  const end = Math.min(lines.length, line + 4);

  return lines.slice(start, end).join("\n");
}

/* ================= MAIN ================= */
function main() {
  const cssFiles = collectCssFiles();
  const defs = collectCssDefinitions(cssFiles);
  const sources = collectSourceTexts();
  const safelist = loadSafelist();

  const unused = [];

  for (const name of defs.keys()) {
    if (safelist.has(name)) continue;
    if (!isUsed(name, sources)) unused.push(name);
  }

  if (!unused.length) {
    console.log("All CSS classes are used (or safelisted).");
    return;
  }

  for (const name of unused) {
    console.log(`\nUNUSED: .${name}`);
    for (const loc of defs.get(name).slice(0, 3)) {
      console.log(`  File: ${loc.file}:${loc.line}`);
      console.log("  Snippet:");
      console.log(
        extractSnippet(loc.file, loc.line)
          .split("\n")
          .map((l) => `    ${l}`)
          .join("\n")
      );
    }
  }
}

main();
