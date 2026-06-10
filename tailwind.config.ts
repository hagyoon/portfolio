import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base — aged parchment over concrete, manuscript-meets-workshop
        paper: "#e8e5dc",       // parchment
        ivory: "#dfdcd1",       // worn vellum
        bone: "#d8d4c7",        // card / panel surface
        sand: "#c7c2b1",        // section dividers, secondary surfaces
        // Text — near-black iron-gall ink
        ink: "#161613",
        // Stones — warm graphite scale
        stone: {
          50: "#e9e6dd",
          100: "#dad6ca",
          200: "#bdb9ab",
          300: "#9b9789",
          400: "#7b776a",
          500: "#5f5b50",
          600: "#47443b",
          700: "#34322b",
          800: "#23211c",
          900: "#15140f",
        },
        // Industrial / Hermes accents — patina, oxide, brass, steel
        mist: "#76838a",        // steel grey-blue
        blush: "#9a5e40",       // oxide rust
        sage: "#5e7a64",        // verdigris green
        lavender: "#6d6878",    // slate violet
        butter: "#97793f",      // tarnished brass
        forest: "#2f4636",      // deep Hermes green
        // Legacy accent names, re-tinted to match
        terracotta: "#8a4f33",
        clay: "#5e7a64",
        moss: "#5e7a64",
        ochre: "#97793f",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        wider: "0.08em",
        widest: "0.18em",
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 12vw, 12rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
