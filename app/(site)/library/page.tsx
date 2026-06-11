import Reveal from "@/components/Reveal";
import LibraryHub from "@/components/LibraryHub";
import { getNotes, getFieldNotes, getReading } from "@/lib/content";

export const metadata = {
  title: "Library",
  description:
    "Knowledge notes, working field notes, and a reading list — the raw material behind the essays.",
};

export default async function LibraryPage() {
  const [notes, fieldNotes, reading] = await Promise.all([
    getNotes(),
    getFieldNotes(),
    getReading(),
  ]);

  return (
    <div className="container-edge pt-40 md:pt-48 pb-24">
      <Reveal>
        <p className="eyebrow mb-4">Library</p>
        <h1 className="display-2 max-w-3xl">The raw material.</h1>
        <p className="mt-6 max-w-2xl text-stone-600 text-lg leading-relaxed">
          Three shelves: polished knowledge <strong>notes</strong>, rougher{" "}
          <strong>field notes</strong> and drafts, and a <strong>reading</strong>{" "}
          list of things worth your time. Search, filter by topic, or quick-preview
          any item.
        </p>
      </Reveal>
      <div className="mt-14">
        <LibraryHub notes={notes} fieldNotes={fieldNotes} reading={reading} />
      </div>
    </div>
  );
}
