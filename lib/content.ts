import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

const ROOT = path.join(process.cwd(), "content");

export type GalleryImage = {
  src: string;
  caption?: string;
};

export type TimelineEntry = {
  period: string;
  title: string;
  detail?: string;
};

export type Site = {
  name: string;
  tagline: string;
  description: string;
  location: string;
  intro: string;
  about: string;
  manifesto: string[];
  marquee: string[];
  timeline: TimelineEntry[];
  gallery: GalleryImage[];
  contact: {
    email?: string;
    linkedin?: string;
    github?: string;
    telegram?: string;
    x?: string;
  };
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  domain: string;
  year: string;
  summary: string;
  cover?: string;
  status?: "selected" | "archive";
  role?: string;
  stack?: string[];
  links?: { label: string; href: string }[];
  // Case-study structure — all optional, rendered when present
  problem?: string;
  outcome?: string;
  metrics?: string[];
  testimonial?: { quote: string; by?: string };
  images?: string[];
  bodyHtml: string;
};

export type Essay = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag?: string;
  bodyHtml: string;
};

export type Interest = {
  slug: string;
  title: string;
  caption: string;
  bodyHtml: string;
  cover?: string;
};

async function readMd(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return { data, bodyHtml: processed.toString() };
}

async function listMd(dir: string) {
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

export async function getSite(): Promise<Site> {
  const { data } = await readMd(path.join(ROOT, "site.md"));
  return {
    name: data.name ?? "Hakyun Ryu",
    tagline: data.tagline ?? "Multidisciplinary Practitioner",
    description: data.description ?? "",
    location: data.location ?? "",
    intro: data.intro ?? "",
    about: data.about ?? "",
    manifesto: data.manifesto ?? [],
    marquee: data.marquee ?? [],
    timeline: (data.timeline ?? []).map((t: any) => ({
      period: String(t.period ?? ""),
      title: String(t.title ?? ""),
      detail: t.detail ? String(t.detail) : undefined,
    })),
    gallery: (data.gallery ?? []).map((g: any) =>
      typeof g === "string" ? { src: g } : { src: g.src, caption: g.caption }
    ),
    contact: data.contact ?? {},
  };
}

export async function getProjects(): Promise<Project[]> {
  const dir = path.join(ROOT, "projects");
  const files = await listMd(dir);
  const all = await Promise.all(
    files.map(async (f) => {
      const { data, bodyHtml } = await readMd(path.join(dir, f));
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title ?? "Untitled",
        client: data.client,
        domain: data.domain ?? "",
        year: String(data.year ?? ""),
        summary: data.summary ?? "",
        cover: data.cover,
        status: data.status ?? "selected",
        role: data.role,
        stack: data.stack ?? [],
        links: data.links ?? [],
        problem: data.problem,
        outcome: data.outcome,
        metrics: data.metrics ?? [],
        testimonial: data.testimonial_quote
          ? { quote: data.testimonial_quote, by: data.testimonial_by }
          : undefined,
        images: data.images ?? [],
        bodyHtml,
      } as Project;
    })
  );
  return all.sort((a, b) => (a.year > b.year ? -1 : 1));
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getEssays(): Promise<Essay[]> {
  const dir = path.join(ROOT, "writing");
  const files = await listMd(dir);
  const all = await Promise.all(
    files.map(async (f) => {
      const { data, bodyHtml } = await readMd(path.join(dir, f));
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title ?? "Untitled",
        date: data.date
          ? new Date(data.date).toISOString().slice(0, 10)
          : "",
        excerpt: data.excerpt ?? "",
        tag: data.tag,
        bodyHtml,
      } as Essay;
    })
  );
  return all.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getEssay(slug: string): Promise<Essay | null> {
  const essays = await getEssays();
  return essays.find((e) => e.slug === slug) ?? null;
}

export async function getInterests(): Promise<Interest[]> {
  const dir = path.join(ROOT, "interests");
  const files = await listMd(dir);
  const all = await Promise.all(
    files.map(async (f) => {
      const { data, bodyHtml } = await readMd(path.join(dir, f));
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title ?? "Untitled",
        caption: data.caption ?? "",
        cover: data.cover,
        bodyHtml,
      } as Interest;
    })
  );
  return all;
}
