"use client";

/*
 * Guilloche — engine-turned surface patterns, drawn rather than photographed.
 *
 * These are the decorative lathe patterns cut into watch dials: grain d'orge
 * (barleycorn), clous de Paris (hobnail), soleil (sunburst) and vagues
 * (waves). They fill image slots that have no photograph yet, so an empty
 * plate reads as a finished surface instead of a grey box.
 *
 * All strokes use currentColor, so a text colour class tints the whole field.
 */

import { useId } from "react";

export type GuillocheVariant = "barleycorn" | "clous" | "soleil" | "vagues" | "panier";

export const GUILLOCHE_VARIANTS: GuillocheVariant[] = [
  "barleycorn",
  "soleil",
  "clous",
  "vagues",
  "panier",
];

export default function Guilloche({
  variant = "barleycorn",
  className,
  opacity = 0.5,
  scale = 1,
}: {
  variant?: GuillocheVariant;
  className?: string;
  opacity?: number;
  scale?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const id = `g-${variant}-${uid}`;
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 0.3 };

  // Soleil is radial rather than tiled, so it renders without a <pattern>.
  if (variant === "soleil") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        style={{ opacity }}
      >
        <g transform={`translate(100 100) scale(${scale}) translate(-100 -100)`}>
          {Array.from({ length: 180 }).map((_, i) => {
            const a = (i / 180) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={100 + Math.cos(a) * 7}
                y1={100 + Math.sin(a) * 7}
                x2={100 + Math.cos(a) * 160}
                y2={100 + Math.sin(a) * 160}
                {...stroke}
                strokeWidth={0.35}
              />
            );
          })}
          {[7, 24, 52, 88].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} {...stroke} strokeWidth={0.4} />
          ))}
        </g>
      </svg>
    );
  }

  // Fine pitch: a real dial carries dozens of cuts across its width, not a few.
  const tile = 9 / scale;

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse">
          {variant === "barleycorn" && (
            <>
              {[0, 0.5].map((o) => (
                <path
                  key={`a${o}`}
                  d={`M 0 ${tile * (0.5 + o)} Q ${tile / 4} ${tile * (0.2 + o)} ${tile / 2} ${
                    tile * (0.5 + o)
                  } T ${tile} ${tile * (0.5 + o)}`}
                  {...stroke}
                />
              ))}
              {[0, 0.5].map((o) => (
                <path
                  key={`b${o}`}
                  d={`M ${tile * (0.5 + o)} 0 Q ${tile * (0.2 + o)} ${tile / 4} ${
                    tile * (0.5 + o)
                  } ${tile / 2} T ${tile * (0.5 + o)} ${tile}`}
                  {...stroke}
                />
              ))}
            </>
          )}

          {variant === "clous" && (
            <>
              <path d={`M 0 0 L ${tile} ${tile}`} {...stroke} />
              <path d={`M ${tile} 0 L 0 ${tile}`} {...stroke} />
              <path
                d={`M ${tile / 2} 0 L ${tile} ${tile / 2} L ${tile / 2} ${tile} L 0 ${
                  tile / 2
                } Z`}
                {...stroke}
              />
            </>
          )}

          {variant === "vagues" && (
            <>
              {[0.25, 0.5, 0.75, 1].map((o) => (
                <path
                  key={o}
                  d={`M 0 ${tile * o} Q ${tile / 4} ${tile * (o - 0.18)} ${tile / 2} ${
                    tile * o
                  } T ${tile} ${tile * o}`}
                  {...stroke}
                />
              ))}
            </>
          )}

          {variant === "panier" && (
            <>
              {[0.2, 0.4, 0.6, 0.8].map((o) => (
                <line key={`h${o}`} x1="0" y1={tile * o} x2={tile / 2} y2={tile * o} {...stroke} />
              ))}
              {[0.2, 0.4, 0.6, 0.8].map((o) => (
                <line
                  key={`v${o}`}
                  x1={tile * (0.5 + o / 2)}
                  y1={tile / 2}
                  x2={tile * (0.5 + o / 2)}
                  y2={tile}
                  {...stroke}
                />
              ))}
              <rect x="0" y="0" width={tile / 2} height={tile / 2} {...stroke} strokeWidth={0.4} />
              <rect
                x={tile / 2}
                y={tile / 2}
                width={tile / 2}
                height={tile / 2}
                {...stroke}
                strokeWidth={0.4}
              />
            </>
          )}
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  );
}

/*
 * GuillochePlate — a finished surface for an empty image slot. Engine-turned
 * field, a hairline chamfer echoing anglage, and an optional dial numeral.
 * Used by project covers, the About figure and Explorations.
 */
export function GuillochePlate({
  variant = "barleycorn",
  numeral,
  caption,
  className = "",
  scale = 1,
}: {
  variant?: GuillocheVariant;
  numeral?: string;
  caption?: string;
  className?: string;
  scale?: number;
}) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden bg-ivory ${className}`}>
      <Guilloche
        variant={variant}
        scale={scale}
        opacity={0.42}
        className="absolute inset-0 w-full h-full text-stone-200 dark:text-stone-300"
      />

      {/* Light rake across the surface, the way a dial catches a window */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgb(var(--c-stone-50)/0.55)_0%,transparent_38%,transparent_62%,rgb(var(--c-abyss)/0.35)_100%)]" />

      {/* Anglage — a polished bevel on the inner edge */}
      <div className="absolute inset-0 border border-ink/10" />
      <div className="absolute inset-[3px] border border-ruri/20" />

      {numeral && (
        <span className="absolute inset-0 grid place-items-center font-serif font-light italic text-[5rem] md:text-[6.5rem] leading-none text-ink/25 select-none tracking-[-0.03em]">
          {numeral}
        </span>
      )}

      {caption && (
        <span className="absolute bottom-3 left-4 label text-stone-400/80">{caption}</span>
      )}
    </div>
  );
}
