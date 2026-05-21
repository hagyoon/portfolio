/* ──────────────────────────────────────────────────────────────────────────
 * EXPLORATIONS — The "Currently Exploring" section on the homepage.
 *
 * These are works-in-progress, open questions, areas of active study.
 * Different from projects (which are shippable artefacts) — these are
 * threads of thinking.
 *
 * • To ADD: copy any block, change the fields.
 * • To REORDER: drag blocks.
 * • Keep titles short. Keep descriptions to 2 sentences.
 * ────────────────────────────────────────────────────────────────────────── */

export type Exploration = {
  title: string;
  description: string;
};

export const explorations: Exploration[] = [

  {
    title: "Autonomous agent memory systems",
    description: "What does it take for an agent to remember meaningfully across sessions? Working on persistent memory architectures that compound rather than truncate.",
  },

  {
    title: "Personal knowledge graphs",
    description: "Beyond chat. Building structured second brains where ideas link to each other automatically, and the graph itself becomes the thinking surface.",
  },

  {
    title: "Human-first AI workflows",
    description: "Quiet infrastructure that amplifies thinking rather than replacing it. The opposite of the chat-everywhere paradigm.",
  },

  {
    title: "Independent watchmaking",
    description: "Studying the makers working at the edges of mechanical horology. What survives when finishing matters more than scale.",
  },

  {
    title: "AI-native SME tooling",
    description: "Live data pipelines and AI tooling built specifically for non-technical small business owners. The underserved middle of the AI market.",
  },

  {
    title: "Second-brain systems",
    description: "Karpathy's LLM wiki pattern, applied. An evolving knowledge architecture that gets more useful the longer it runs.",
  },

];
