// Shared between the admin UI and the content API. Describes which
// collections exist and which frontmatter fields the editor renders.

export type FieldType = "text" | "textarea" | "select" | "image" | "list" | "date";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[]; // for select
  hint?: string;
};

export type Collection = {
  key: string;
  label: string;
  dir: string; // relative to content/
  fields: Field[];
  hasBody: boolean;
};

export const COLLECTIONS: Collection[] = [
  {
    key: "projects",
    label: "Projects",
    dir: "projects",
    hasBody: true,
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "client", label: "Client", type: "text", hint: "Optional" },
      { key: "domain", label: "Domain", type: "text", hint: "e.g. Data · Strategy" },
      { key: "year", label: "Year", type: "text" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["selected", "archive"],
        hint: "archive hides it from the homepage",
      },
      { key: "role", label: "Role", type: "text" },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "cover", label: "Cover image", type: "image" },
      { key: "stack", label: "Stack", type: "list", hint: "One per line" },
    ],
  },
  {
    key: "writing",
    label: "Writing",
    dir: "writing",
    hasBody: true,
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "date", label: "Date", type: "date" },
      { key: "tag", label: "Tag", type: "text", hint: "e.g. Essay" },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
    ],
  },
  {
    key: "interests",
    label: "Interests",
    dir: "interests",
    hasBody: true,
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "caption", label: "Caption", type: "textarea" },
      { key: "cover", label: "Cover image", type: "image" },
    ],
  },
];

export function getCollection(key: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.key === key);
}

export const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
];
