import Reveal from "@/components/Reveal";
import NotesIndex from "@/components/NotesIndex";
import { getNotes } from "@/lib/content";

export const metadata = {
  title: "Notes",
  description:
    "A working knowledge base — notes on AI, markets, philosophy, and the things I'm figuring out.",
};

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div className="container-edge pt-40 md:pt-48 pb-24">
      <Reveal>
        <p className="eyebrow mb-4">Notes</p>
        <h1 className="display-2 max-w-3xl">A working knowledge base.</h1>
        <p className="mt-6 max-w-2xl text-stone-600 text-lg leading-relaxed">
          Living notes maintained alongside my second brain — quick previews below,
          full notes a click away. Less polished than the essays, more useful as a map.
        </p>
      </Reveal>
      <div className="mt-14">
        <NotesIndex notes={notes} />
      </div>
    </div>
  );
}
