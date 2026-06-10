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
        // Base — warm noir, old film over ember (after Hermes #170d02)
        paper: "#15100a",       // noir ground
        ivory: "#1d1610",       // raised panel
        bone: "#251c12",        // card surface
        sand: "#38301f",        // dividers, secondary surfaces
        // Text — warm parchment, never pure white
        ink: "#ede4d2",
        // Stones — inverted warm ramp: same class = same hierarchy, now on dark
        stone: {
          50: "#1a140c",
          100: "#241c11",
          200: "#3a3022",
          300: "#5c5240",
          400: "#7e7560",
          500: "#a39a82",
          600: "#c2b9a0",
          700: "#d9d1bb",
          800: "#e8e1ce",
          900: "#f2ecdc",
        },
        // Noir sci-fi accents — amber phosphor leads, terminal green seconds
        butter: "#ffac02",      // hermes amber
        sage: "#5fb778",        // terminal green
        blush: "#e06a4e",       // warning ember
        mist: "#7d8fa3",        // steel
        lavender: "#9a8fb8",    // violet static
        forest: "#2f4636",      // kept for back-compat
        // Legacy accent names, re-tinted to match
        terracotta: "#d96a4a",
        clay: "#ffac02",
        moss: "#5fb778",
        ochre: "#cf9b3e",
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
