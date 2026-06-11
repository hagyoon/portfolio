import type { MetadataRoute } from "next";
import { getProjects, getEssays, getNotes, getFieldNotes } from "@/lib/content";

const SITE_URL = "https://hkryu.space";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, essays, notes, fieldNotes] = await Promise.all([
    getProjects(),
    getEssays(),
    getNotes(),
    getFieldNotes(),
  ]);
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/writing`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/library`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/notes`, changeFrequency: "weekly", priority: 0.6 },
    ...notes.map((n) => ({
      url: `${SITE_URL}/notes/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...fieldNotes.map((n) => ({
      url: `${SITE_URL}/field-notes/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...essays.map((e) => ({
      url: `${SITE_URL}/writing/${e.slug}`,
      lastModified: e.date ? new Date(e.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
