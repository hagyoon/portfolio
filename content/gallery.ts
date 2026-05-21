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

// Empty — gallery section is hidden until the media reel is ready.
// To restore: add GalleryItem entries here and the section reappears automatically.
export const gallery: GalleryItem[] = [];
