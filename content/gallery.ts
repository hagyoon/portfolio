/* ──────────────────────────────────────────────────────────────────────────
 * GALLERY — Visual atmosphere section on the homepage.
 *
 * Drop images into /public/images/<category>/ and reference them here.
 * The gallery uses an editorial asymmetric grid (not a uniform grid).
 *
 * • Drop image into /public/images/watches/, /workspace/, /portraits/, etc.
 * • Reference here as "/images/watches/your-file.jpg"
 * • size: "small" (1 col), "medium" (2 col), "large" (full width)
 * • aspect: "portrait" (4:5), "landscape" (16:9), "square" (1:1)
 * • Empty array = gallery section is hidden entirely.
 *
 * Recommended: 6–12 images for a good editorial rhythm.
 * ────────────────────────────────────────────────────────────────────────── */

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;       // Optional small italic caption under the image
  size: "small" | "medium" | "large";
  aspect: "portrait" | "landscape" | "square";
};

export const gallery: GalleryItem[] = [

  // ── Sample slots. Replace `src` values with your own images. ────────────
  // To hide an entry, comment it out or delete it.

  {
    src: "/images/watches/cartier-tank-must.jpg",
    alt: "Cartier Tank Must Black Lacquer",
    caption: "Cartier Tank Must, black lacquer",
    size: "medium",
    aspect: "portrait",
  },
  {
    src: "/images/workspace/desk-overview.jpg",
    alt: "Workspace overview",
    caption: "The desk, late afternoon",
    size: "large",
    aspect: "landscape",
  },
  {
    src: "/images/watches/baltic-aquascaphe.jpg",
    alt: "Baltic Aquascaphe blue gilt",
    caption: "Baltic Aquascaphe, blue gilt",
    size: "small",
    aspect: "square",
  },
  {
    src: "/images/workspace/obsidian-graph.jpg",
    alt: "Second brain graph view",
    caption: "Second brain · graph view",
    size: "medium",
    aspect: "landscape",
  },
  {
    src: "/images/watches/universal-geneve.jpg",
    alt: "Universal Genève White Shadow",
    caption: "Universal Genève, vintage",
    size: "small",
    aspect: "portrait",
  },
  {
    src: "/images/workspace/terminal.jpg",
    alt: "Terminal — OpenClaw running",
    caption: "OpenClaw · running",
    size: "medium",
    aspect: "landscape",
  },

];
