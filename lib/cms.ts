/*
 * CMS storage layer.
 *
 * Two modes:
 *  - "local"  (default in dev): reads/writes the working tree directly —
 *    content/ for markdown, public/uploads/ for media.
 *  - "github" (default when GITHUB_TOKEN is set in production): every save
 *    commits to BOTH repos via the GitHub Contents API —
 *      1. the Obsidian vault (CONTENT_REPO, path Portfolio/content/…) —
 *         the source of truth, which also flows back into Obsidian;
 *      2. the portfolio repo (SITE_REPO, path content/…) — which triggers
 *         an immediate Vercel deploy.
 *    Media uploads commit to SITE_REPO public/uploads/ only.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { IMAGE_EXTENSIONS } from "./cms-schema";

const CONTENT_REPO = process.env.CONTENT_REPO ?? "hagyoon/obsidian-secondbrain";
const SITE_REPO = process.env.SITE_REPO ?? "hagyoon/portfolio";
const VAULT_PREFIX = "Portfolio/content";
const UPLOADS_DIR = "public/uploads";

export function cmsMode(): "local" | "github" {
  if (process.env.CMS_MODE === "local") return "local";
  if (process.env.CMS_MODE === "github") return "github";
  return process.env.GITHUB_TOKEN && process.env.NODE_ENV === "production"
    ? "github"
    : "local";
}

function assertSafeRelPath(rel: string) {
  if (rel.includes("..") || rel.startsWith("/") || rel.includes("\\")) {
    throw new Error(`Unsafe path: ${rel}`);
  }
}

/* ── GitHub Contents API helpers ─────────────────────────────────────── */

async function gh(
  repo: string,
  apiPath: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return fetch(`https://api.github.com/repos/${repo}/${apiPath}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
    cache: "no-store",
  });
}

async function ghGetSha(repo: string, filePath: string): Promise<string | null> {
  const res = await gh(repo, `contents/${encodeURI(filePath)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}) for ${repo}/${filePath}`);
  const json = await res.json();
  return json.sha ?? null;
}

async function ghPut(
  repo: string,
  filePath: string,
  contentBase64: string,
  message: string
): Promise<void> {
  const sha = await ghGetSha(repo, filePath);
  const res = await gh(repo, `contents/${encodeURI(filePath)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: contentBase64,
      ...(sha ? { sha } : {}),
      committer: { name: "Portfolio CMS", email: "cms@hakyun.com" },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub write failed (${res.status}) for ${repo}/${filePath}: ${body.slice(0, 300)}`);
  }
}

async function ghDelete(repo: string, filePath: string, message: string): Promise<void> {
  const sha = await ghGetSha(repo, filePath);
  if (!sha) return;
  const res = await gh(repo, `contents/${encodeURI(filePath)}`, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      sha,
      committer: { name: "Portfolio CMS", email: "cms@hakyun.com" },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub delete failed (${res.status}) for ${repo}/${filePath}: ${body.slice(0, 300)}`);
  }
}

async function ghRead(repo: string, filePath: string): Promise<string | null> {
  const res = await gh(repo, `contents/${encodeURI(filePath)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}) for ${repo}/${filePath}`);
  const json = await res.json();
  return Buffer.from(json.content, "base64").toString("utf8");
}

async function ghList(
  repo: string,
  dirPath: string
): Promise<{ name: string; size: number }[]> {
  const res = await gh(repo, `contents/${encodeURI(dirPath)}`);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub list failed (${res.status}) for ${repo}/${dirPath}`);
  const json = await res.json();
  if (!Array.isArray(json)) return [];
  return json
    .filter((e: any) => e.type === "file")
    .map((e: any) => ({ name: e.name, size: e.size }));
}

/* ── Content files (markdown under content/) ─────────────────────────── */

export async function listContentFiles(dir: string): Promise<string[]> {
  assertSafeRelPath(dir);
  if (cmsMode() === "github") {
    const entries = await ghList(SITE_REPO, `content/${dir}`);
    return entries.map((e) => e.name).filter((n) => n.endsWith(".md"));
  }
  try {
    const files = await fs.readdir(path.join(process.cwd(), "content", dir));
    return files.filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

export async function readContentFile(rel: string): Promise<string | null> {
  assertSafeRelPath(rel);
  if (cmsMode() === "github") {
    return ghRead(SITE_REPO, `content/${rel}`);
  }
  try {
    return await fs.readFile(path.join(process.cwd(), "content", rel), "utf8");
  } catch {
    return null;
  }
}

export async function writeContentFile(rel: string, raw: string): Promise<void> {
  assertSafeRelPath(rel);
  const message = `cms: update ${rel}`;
  if (cmsMode() === "github") {
    const b64 = Buffer.from(raw, "utf8").toString("base64");
    // Vault first — it is the source of truth. The site repo write makes
    // the change deploy immediately; if it fails, the vault push still
    // triggers the sync workflow, so nothing is lost.
    await ghPut(CONTENT_REPO, `${VAULT_PREFIX}/${rel}`, b64, message);
    await ghPut(SITE_REPO, `content/${rel}`, b64, message);
    return;
  }
  const abs = path.join(process.cwd(), "content", rel);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, raw, "utf8");
}

export async function deleteContentFile(rel: string): Promise<void> {
  assertSafeRelPath(rel);
  const message = `cms: delete ${rel}`;
  if (cmsMode() === "github") {
    await ghDelete(CONTENT_REPO, `${VAULT_PREFIX}/${rel}`, message);
    await ghDelete(SITE_REPO, `content/${rel}`, message);
    return;
  }
  await fs.rm(path.join(process.cwd(), "content", rel), { force: true });
}

/* ── Media (binary files under public/uploads/) ──────────────────────── */

export type MediaItem = { name: string; path: string; size: number };

export function isAllowedImageName(name: string): boolean {
  const ext = path.extname(name).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

export async function listMedia(): Promise<MediaItem[]> {
  if (cmsMode() === "github") {
    const entries = await ghList(SITE_REPO, UPLOADS_DIR);
    return entries
      .filter((e) => isAllowedImageName(e.name))
      .map((e) => ({ name: e.name, path: `/uploads/${e.name}`, size: e.size }));
  }
  try {
    const dir = path.join(process.cwd(), UPLOADS_DIR);
    const files = await fs.readdir(dir);
    const items = await Promise.all(
      files.filter(isAllowedImageName).map(async (name) => {
        const stat = await fs.stat(path.join(dir, name));
        return { name, path: `/uploads/${name}`, size: stat.size };
      })
    );
    return items;
  } catch {
    return [];
  }
}

export async function saveMedia(name: string, data: Buffer): Promise<MediaItem> {
  assertSafeRelPath(name);
  if (!isAllowedImageName(name)) {
    throw new Error(`Unsupported file type: ${name}`);
  }
  const safe = name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  if (cmsMode() === "github") {
    await ghPut(SITE_REPO, `${UPLOADS_DIR}/${safe}`, data.toString("base64"), `cms: upload ${safe}`);
  } else {
    const dir = path.join(process.cwd(), UPLOADS_DIR);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, safe), data);
  }
  return { name: safe, path: `/uploads/${safe}`, size: data.length };
}

export async function deleteMedia(name: string): Promise<void> {
  assertSafeRelPath(name);
  if (cmsMode() === "github") {
    await ghDelete(SITE_REPO, `${UPLOADS_DIR}/${name}`, `cms: delete ${name}`);
    return;
  }
  await fs.rm(path.join(process.cwd(), UPLOADS_DIR, name), { force: true });
}
