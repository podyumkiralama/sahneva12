#!/usr/bin/env node

import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const ignoredDirectories = new Set(["node_modules", ".git", ".next", ".turbo", "dist", "build"]);
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const sourceRoots = ["app", "components", "lib"];

function walkDirectory(dir, onFile) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDirectory(fullPath, onFile);
    } else {
      onFile(fullPath);
    }
  }
}

function collectCssFiles() {
  const cssFiles = new Set();
  walkDirectory(rootDir, (filePath) => {
    if (!filePath.endsWith(".css")) return;
    const relative = path.relative(rootDir, filePath);
    if (relative.startsWith(path.join("tools"))) return;
    const isStyles = relative.startsWith(`styles${path.sep}`);
    const isPublicCss = relative.startsWith(`public${path.sep}css${path.sep}`);
    const isModuleCss = relative.endsWith(".module.css");
    if (isStyles || isPublicCss || isModuleCss) {
      cssFiles.add(relative);
    }
  });
  return Array.from(cssFiles).sort();
}

function collectClassNames(cssFiles) {
  const classNameRegex = /\.([A-Za-z_-][A-Za-z0-9_-]*)/g;
  const classNames = new Set();

  for (const cssFile of cssFiles) {
    const content = fs.readFileSync(path.join(rootDir, cssFile), "utf8");
    let match;
    while ((match = classNameRegex.exec(content))) {
      classNames.add(match[1]);
    }
  }

  return Array.from(classNames);
}

function collectSourceFiles() {
  const sources = [];
  for (const root of sourceRoots) {
    const rootPath = path.join(rootDir, root);
    if (!fs.existsSync(rootPath)) continue;
    walkDirectory(rootPath, (filePath) => {
      const ext = path.extname(filePath);
      if (sourceExtensions.has(ext)) {
        sources.push(fs.readFileSync(filePath, "utf8"));
      }
    });
  }
  return sources;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findUnusedClasses(classNames, sources) {
  const unused = [];
  for (const className of classNames) {
    const pattern = new RegExp(`(^|[^A-Za-z0-9_-])${escapeRegExp(className)}([^A-Za-z0-9_-]|$)`);
    let isUsed = sources.some(
      (content) => pattern.test(content) || content.includes(className)
    );

    if (!isUsed && /\d+$/.test(className)) {
      const prefix = className.replace(/\d+$/, "");
      const dynamicPattern = new RegExp(`${escapeRegExp(prefix)}\\$\\{`);
      isUsed = sources.some((content) => dynamicPattern.test(content));
    }
    if (!isUsed) {
      unused.push(className);
    }
  }
  return unused;
}

function main() {
  const cssFiles = collectCssFiles();
  if (cssFiles.length === 0) {
    console.error("No CSS files found in expected directories.");
    process.exit(1);
  }

  const classNames = collectClassNames(cssFiles);
  const sources = collectSourceFiles();
  const unused = findUnusedClasses(classNames, sources);

  if (unused.length === 0) {
    console.log("All CSS classes are referenced in source files.");
    return;
  }

  unused.forEach((name) => {
    console.log(`UNUSED: .${name}`);
  });
}

main();
