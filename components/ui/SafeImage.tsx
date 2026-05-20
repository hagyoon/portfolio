/* ──────────────────────────────────────────────────────────────────────────
 * SafeImage — Wrapper around next/image that renders a typographic
 * placeholder when the image path doesn't exist yet.
 *
 * Why this exists:
 * Gallery and project layouts reference image paths under /public/images/.
 * Until you drop your own files in, those paths 404. This component shows
 * a clean placeholder instead of broken images.
 *
 * You don't need to touch this file unless you want to change the
 * placeholder styling.
 * ────────────────────────────────────────────────────────────────────────── */

"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function SafeImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className = "",
  priority = false,
  sizes,
}: Props) {
  const [error, setError] = useState(false);

  if (error) {
    // Typographic placeholder when the image is missing
    return (
      <div
        className={`relative bg-ivory border border-stone-200 flex items-center justify-center overflow-hidden ${className}`}
        style={!fill ? { width, height } : undefined}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 gap-2">
          <span className="label text-stone-400">Image</span>
          <span className="font-serif italic text-stone-500 text-sm md:text-base px-4 leading-snug">
            {alt}
          </span>
          <span className="label text-stone-300 mt-2 text-[9px] break-all">
            {src}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
      className={`object-cover ${className}`}
    />
  );
}
