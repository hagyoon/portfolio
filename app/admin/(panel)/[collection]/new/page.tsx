import { notFound } from "next/navigation";
import { getCollection } from "@/lib/cms-schema";
import EntryEditor from "@/components/admin/EntryEditor";

export default async function NewEntryPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const col = getCollection(collection);
  if (!col) notFound();

  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight mb-10">
        New {col.label.replace(/s$/, "").toLowerCase()}
      </h1>
      <EntryEditor collection={col} />
    </div>
  );
}
