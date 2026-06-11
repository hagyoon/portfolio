/*
 * Writing index — searchable, filterable archive of all essays, with an
 * RSS subscription link.
 */

import Reveal from "@/components/Reveal";
import WritingIndex from "@/components/WritingIndex";
import { getEssays } from "@/lib/content";

export const metadata = {
  title: "Writing",
  description:
    "Essays on AI systems, markets, horology, and building things that compound.",
};

export default async function WritingPage() {
  const essays = await getEssays();

  return (
    <div className="container-edge pt-40 md:pt-48 pb-24">
      <Reveal>
        <p className="eyebrow mb-4">Writing</p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="display-2 max-w-3xl">Thinking, slowly, in public.</h1>
          <a
            href="/feed.xml"
            className="link-inline font-mono text-sm text-stone-600 mb-2"
          >
            Subscribe via RSS ↗
          </a>
        </div>
      </Reveal>

      <div className="mt-14">
        <WritingIndex essays={essays} />
      </div>
    </div>
  );
}
