import { getEssays, getSite } from "@/lib/content";

const SITE_URL = "https://hkryu.space";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const [site, essays] = await Promise.all([getSite(), getEssays()]);

  const items = essays
    .map(
      (e) => `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${SITE_URL}/writing/${e.slug}</link>
      <guid>${SITE_URL}/writing/${e.slug}</guid>
      ${e.date ? `<pubDate>${new Date(e.date).toUTCString()}</pubDate>` : ""}
      <description>${escapeXml(e.excerpt)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)} — Writing</title>
    <link>${SITE_URL}/writing</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
