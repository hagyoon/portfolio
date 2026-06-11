import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All colours resolve through CSS variables so light/dark themes
        // swap at runtime (see :root and html.dark in globals.css).
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        ivory: "rgb(var(--c-ivory) / <alpha-value>)",
        bone: "rgb(var(--c-bone) / <alpha-value>)",
        sand: "rgb(var(--c-sand) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        stone: {
          50: "rgb(var(--c-stone-50) / <alpha-value>)",
          100: "rgb(var(--c-stone-100) / <alpha-value>)",
          200: "rgb(var(--c-stone-200) / <alpha-value>)",
          300: "rgb(var(--c-stone-300) / <alpha-value>)",
          400: "rgb(var(--c-stone-400) / <alpha-value>)",
          500: "rgb(var(--c-stone-500) / <alpha-value>)",
          600: "rgb(var(--c-stone-600) / <alpha-value>)",
          700: "rgb(var(--c-stone-700) / <alpha-value>)",
          800: "rgb(var(--c-stone-800) / <alpha-value>)",
          900: "rgb(var(--c-stone-900) / <alpha-value>)",
        },
        butter: "rgb(var(--c-butter) / <alpha-value>)",
        sage: "rgb(var(--c-sage) / <alpha-value>)",
        mist: "rgb(var(--c-mist) / <alpha-value>)",
        blush: "rgb(var(--c-blush) / <alpha-value>)",
        lavender: "rgb(var(--c-lavender) / <alpha-value>)",
        forest: "rgb(var(--c-forest) / <alpha-value>)",
        terracotta: "rgb(var(--c-terracotta) / <alpha-value>)",
        clay: "rgb(var(--c-clay) / <alpha-value>)",
        moss: "rgb(var(--c-moss) / <alpha-value>)",
        ochre: "rgb(var(--c-ochre) / <alpha-value>)",
      },
      fontFamily: {
        // Mondwest leads the display stack; Cormorant holds until the file lands
        serif: ["Mondwest", "var(--font-serif)", "Cormorant Garamond", "serif"],
        // Body is typewriter mono, Hermes-style
        sans: ["var(--font-mono)", "Courier Prime", "ui-monospace", "monospace"],
        mono: ["var(--font-mono)", "Courier Prime", "ui-monospace", "monospace"],
        condensed: ["Collapse", "var(--font-serif)", "serif"],
        wide: ["Rules Expanded", "var(--font-mono)", "ui-monospace", "monospace"],
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
