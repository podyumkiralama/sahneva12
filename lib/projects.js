import fs from "node:fs";
import path from "node:path";

import { projects as projectMetadata } from "./data";

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const PROJECTS_ROOT = path.join(process.cwd(), "app", "projeler");

const COVER_BASENAMES = ["cover", "kapak", "1", "01"];
const IMAGE_EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"]; 

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function relativeToPublic(filePath) {
  const relative = path.relative(PUBLIC_ROOT, filePath);
  return relative ? `/${toPosixPath(relative)}` : null;
}

function directoryExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function findCoverPath(slug, meta = {}) {
  const candidateDirs = new Set();

  if (meta.assetDir) {
    candidateDirs.add(path.join(PUBLIC_ROOT, meta.assetDir));
  }

  candidateDirs.add(path.join(PUBLIC_ROOT, "projeler", slug));
  candidateDirs.add(path.join(PUBLIC_ROOT, "img", "projeler", slug));

  for (const dir of candidateDirs) {
    if (!directoryExists(dir)) continue;

    for (const base of COVER_BASENAMES) {
      for (const ext of IMAGE_EXTENSIONS) {
        const candidate = path.join(dir, `${base}.${ext}`);
        if (fileExists(candidate)) {
          return relativeToPublic(candidate);
        }
      }
    }

    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => {
        const ext = name.split(".").pop();
        return ext && IMAGE_EXTENSIONS.includes(ext.toLowerCase());
      })
      .sort();

    if (entries.length > 0) {
      return relativeToPublic(path.join(dir, entries[0]));
    }
  }

  return null;
}

function humanizeSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function getProjectDirectories() {
  try {
    return fs
      .readdirSync(PROJECTS_ROOT, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => !name.startsWith("_"));
  } catch {
    return [];
  }
}

export function getProjects() {
  const metaMap = new Map(projectMetadata.map((project) => [project.slug, project]));

  const slugs = getProjectDirectories();
  const results = slugs.map((slug) => {
    const meta = metaMap.get(slug) ?? {};
    const cover = findCoverPath(slug, meta);

    return {
      slug,
      title: meta.title ?? humanizeSlug(slug),
      excerpt: meta.excerpt ?? null,
      date: meta.date ?? meta.updatedAt ?? null,
      tags: meta.tags ?? [],
      cover,
    };
  });

  return results.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}

export function getProjectSummary(slug) {
  const meta = projectMetadata.find((project) => project.slug === slug);
  if (!meta) return null;

  return {
    ...meta,
    cover: findCoverPath(slug, meta),
  };
}
