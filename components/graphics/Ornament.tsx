"use client";

/*
 * Ornament — a small set of geometric marks used to give sections a visual
 * anchor without adding noise. All strokes use currentColor, so a text
 * colour class tints the whole mark (e.g. `text-sage/50`).
 *
 * Variants:
 *   rings  — concentric circles, a quiet focal object
 *   arc    — nested quarter arcs, architectural
 *   grid   — dot lattice, technical
 *   hatch  — diagonal rule field
 *   bars   — stacked lines of varying length, editorial
 */

type Variant = "rings" | "arc" | "grid" | "hatch" | "bars";

export default function Ornament({
  variant = "rings",
  className,
  strokeWidth = 1,
}: {
  variant?: Variant;
  className?: string;
  strokeWidth?: number;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === "rings" &&
        [46, 34, 22, 10].map((r) => <circle key={r} cx="50" cy="50" r={r} {...common} />)}

      {variant === "arc" &&
        [46, 36, 26, 16].map((r) => (
          <path key={r} d={`M ${50 - r} 78 A ${r} ${r} 0 0 1 ${50 + r} 78`} {...common} />
        ))}

      {variant === "grid" &&
        Array.from({ length: 6 }).flatMap((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={12 + col * 15.2}
              cy={12 + row * 15.2}
              r={1.4}
              fill="currentColor"
              stroke="none"
            />
          ))
        )}

      {variant === "hatch" &&
        Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={-10 + i * 14} y1="100" x2={40 + i * 14} y2="0" {...common} />
        ))}

      {variant === "bars" &&
        [96, 72, 84, 48, 64, 30].map((w, i) => (
          <line key={i} x1="2" y1={10 + i * 16} x2={2 + w} y2={10 + i * 16} {...common} />
        ))}
    </svg>
  );
}

/*
 * HeroFigure — the large composition that occupies the hero's open field.
 * Concentric rings crossed by a horizon rule and a slow-drifting accent
 * ring, echoing an instrument dial. Purely decorative.
 */
export function HeroFigure({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="orn-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Concentric dial */}
      <g stroke="url(#orn-fade)" fill="none" strokeWidth="1">
        {[190, 156, 122, 88, 54].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} />
        ))}
      </g>

      {/* Horizon + vertical axis */}
      <g stroke="currentColor" strokeOpacity="0.18" strokeWidth="1">
        <line x1="0" y1="200" x2="400" y2="200" />
        <line x1="200" y1="10" x2="200" y2="390" />
      </g>

      {/* Tick marks around the outer ring */}
      <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="1">
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const r1 = i % 4 === 0 ? 176 : 184;
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          // Rounded to a fixed precision: raw floats serialise differently on
          // server and client, which trips React's hydration check.
          const p = (n: number) => n.toFixed(2);
          return (
            <line
              key={i}
              x1={p(200 + cos * r1)}
              y1={p(200 + sin * r1)}
              x2={p(200 + cos * 190)}
              y2={p(200 + sin * 190)}
            />
          );
        })}
      </g>

      {/* Accent orbit — the one warm note in the composition */}
      <g className="orbit-slow" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="122" fill="none" stroke="currentColor" strokeOpacity="0.12" />
        <circle cx="322" cy="200" r="4.5" className="fill-ochre" />
        <circle cx="78" cy="200" r="2.5" className="fill-sage" />
      </g>

      {/* Inner disc */}
      <circle cx="200" cy="200" r="22" className="fill-mist/10" stroke="currentColor" strokeOpacity="0.25" />
    </svg>
  );
}
