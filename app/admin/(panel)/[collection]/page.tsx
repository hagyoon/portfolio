import { notFound } from "next/navigation";
import Link from "next/link";
import { getCollection } from "@/lib/cms-schema";
import CollectionList from "@/components/admin/CollectionList";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const col = getCollection(collection);
  if (!col) notFound();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-4xl tracking-tight mb-2">{col.label}</h1>
          <p className="text-stone-500 text-sm">
            One markdown file per entry — click to edit.
          </p>
        </div>
        <Link
          href={`/admin/${col.key}/new`}
          className="bg-ink text-paper px-6 py-3 label hover:opacity-85 transition-opacity"
        >
          + New
        </Link>
      </div>
      <CollectionList collectionKey={col.key} />
    </div>
  );
}
