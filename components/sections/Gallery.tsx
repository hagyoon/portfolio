/* ──────────────────────────────────────────────────────────────────────────
 * Gallery — visual atmosphere section.
 *
 * Reads from /content/gallery.ts.
 * Asymmetric editorial grid. Size and aspect set per image.
 *
 * Drop images into /public/images/<category>/ then reference them in
 * /content/gallery.ts. If gallery array is empty, the section is hidden.
 * ────────────────────────────────────────────────────────────────────────── */

import Reveal from "@/components/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import { gallery } from "@/content/gallery";

const sizeClasses: Record<string, string> = {
  small: "col-span-12 sm:col-span-6 md:col-span-3",
  medium: "col-span-12 md:col-span-6",
  large: "col-span-12 md:col-span-9",
};

const aspectClasses: Record<string, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

export default function Gallery() {
  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="container-edge pt-32 md:pt-48">

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Atmosphere</div>
            <div className="mt-3 text-stone-500 text-sm">
              ({String(gallery.length).padStart(2, "0")})
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="display-2 max-w-3xl">
              The <em className="text-clay">objects</em>,
              tools, and rooms<br className="hidden md:block" />
              the work happens inside.
            </h2>
          </Reveal>
        </div>
      </div>

      {/* ── Asymmetric grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {gallery.map((item, i) => (
          <Reveal
            key={i}
            delay={(i % 3) * 0.05}
            className={sizeClasses[item.size]}
          >
            <figure className="group">
              <div
                className={`relative w-full overflow-hidden ${aspectClasses[item.aspect]}`}
              >
                <SafeImage
                  src={item.src}
                  alt={item.alt}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]"
                />
              </div>
              {item.caption && (
                <figcaption className="mt-3 label text-stone-500 italic font-serif text-sm tracking-normal normal-case">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
