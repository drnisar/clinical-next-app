// Pure helpers for the single "Clinical Note" (TipTap JSON). No React/DOM, so
// they run on the server (API route) and in unit tests.
//
// The note is the source of truth. On every save the server derives the old
// separate fields (history, examination, investigations, diagnosis, plan,
// instructions) from it, so the print report, registration page and history
// panel keep working unchanged.

export type NoteNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: NoteNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
};
export type NoteDoc = NoteNode & { type: "doc"; content: NoteNode[] };

export const NOTE_HEADINGS = [
  { key: "history", label: "History" },
  { key: "examination", label: "Examination" },
  { key: "investigations", label: "Investigations" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "plan", label: "Plan" },
  { key: "instructions", label: "Instructions" },
] as const;
export type NoteSectionKey = (typeof NOTE_HEADINGS)[number]["key"];

/** Heading level the toolbar inserts. Any level is recognised when parsing. */
export const NOTE_HEADING_LEVEL = 3;

// Heading text (lower-case, without trailing ":") → section.
const HEADING_ALIASES: Record<string, NoteSectionKey> = {
  history: "history",
  "presenting complaint": "history",
  examination: "examination",
  examinations: "examination",
  exam: "examination",
  investigation: "investigations",
  investigations: "investigations",
  diagnosis: "diagnosis",
  diagnoses: "diagnosis",
  plan: "plan",
  instruction: "instructions",
  instructions: "instructions",
};

export const isNoteDoc = (value: unknown): value is NoteDoc =>
  !!value &&
  typeof value === "object" &&
  (value as NoteNode).type === "doc" &&
  Array.isArray((value as NoteNode).content);

/** Plain text of a node; hard breaks become new lines. */
export const nodeText = (node: NoteNode): string => {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "hardBreak") return "\n";
  return (node.content ?? []).map(nodeText).join("");
};

/** The section a heading node starts, or null for other nodes/headings. */
export const headingSection = (node: NoteNode): NoteSectionKey | null => {
  if (node.type !== "heading") return null;
  const label = nodeText(node).trim().toLowerCase().replace(/:$/, "").trim();
  return HEADING_ALIASES[label] ?? null;
};

type Line = { text: string; listItem: boolean };

// Lines of a top-level block: paragraphs as lines, each list item as one line.
const blockLines = (node: NoteNode): Line[] => {
  switch (node.type) {
    case "bulletList":
    case "orderedList":
      return (node.content ?? []).map((item) => ({
        text: (item.content ?? [])
          .map(nodeText)
          .join(" ")
          .replace(/\s+\n/g, "\n")
          .trim(),
        listItem: true,
      }));
    case "blockquote":
      return (node.content ?? []).flatMap(blockLines);
    case "horizontalRule":
      return [];
    default:
      return nodeText(node)
        .split("\n")
        .map((text) => ({ text, listItem: false }));
  }
};

const linesToText = (lines: Line[]) =>
  lines
    .map((l) => (l.listItem ? `- ${l.text}` : l.text))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export interface LegacyFields {
  history: string | null;
  examination: { examination: string; findings: string | null }[];
  investigations: { investigation: string; result: string | null }[];
  diagnosis: string | null;
  plan: string | null;
  instructions: { instruction: string }[];
}

/**
 * Splits the note at known headings into the old separate fields. Text before
 * the first heading counts as history; unrecognised headings stay in the
 * current section.
 */
export const deriveLegacyFields = (doc: NoteDoc): LegacyFields => {
  const sections: Record<NoteSectionKey, Line[]> = {
    history: [],
    examination: [],
    investigations: [],
    diagnosis: [],
    plan: [],
    instructions: [],
  };
  let current: NoteSectionKey = "history";
  for (const node of doc.content ?? []) {
    const key = headingSection(node);
    if (key) {
      current = key;
      continue;
    }
    sections[current].push(...blockLines(node));
  }

  const text = (key: NoteSectionKey) => linesToText(sections[key]) || null;
  const examination = text("examination");
  const investigations = text("investigations");
  return {
    history: text("history"),
    examination: examination
      ? [{ examination: "Examination", findings: examination }]
      : [],
    investigations: investigations
      ? [{ investigation: investigations, result: null }]
      : [],
    diagnosis: text("diagnosis"),
    plan: text("plan"),
    instructions: sections.instructions
      .map((l) => l.text.trim())
      .filter(Boolean)
      .map((instruction) => ({ instruction })),
  };
};

// ---- Building a note from the old fields (consultations saved before the note)

const paragraph = (text: string): NoteNode =>
  text
    ? { type: "paragraph", content: [{ type: "text", text }] }
    : { type: "paragraph" };

const heading = (label: string): NoteNode => ({
  type: "heading",
  attrs: { level: NOTE_HEADING_LEVEL },
  content: [{ type: "text", text: label }],
});

const textParagraphs = (value?: string | null) =>
  (value ?? "")
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.trim())
    .map(paragraph);

export interface LegacyConsultation {
  history?: string | null;
  examination?:
    { examination?: string | null; findings?: string | null }[] | null;
  investigations?:
    { investigation?: string | null; result?: string | null }[] | null;
  diagnosis?: string | null;
  plan?: string | null;
  instructions?: { instruction?: string | null }[] | null;
}

const joinLabel = (label?: string | null, value?: string | null) =>
  [label?.trim(), value?.trim()].filter(Boolean).join(": ");

/** The old fields as a note, each non-empty field under its heading. */
export const legacyToNoteDoc = (c: LegacyConsultation): NoteDoc => {
  const content: NoteNode[] = [];
  const add = (label: string, nodes: NoteNode[]) => {
    if (nodes.length) content.push(heading(label), ...nodes);
  };

  add("History", textParagraphs(c.history));
  add(
    "Examination",
    (c.examination ?? []).flatMap((e) =>
      textParagraphs(
        // Notes saved from this editor store one entry labelled "Examination".
        e.examination?.trim().toLowerCase() === "examination"
          ? e.findings
          : joinLabel(e.examination, e.findings),
      ),
    ),
  );
  add(
    "Investigations",
    (c.investigations ?? []).flatMap((i) =>
      textParagraphs(joinLabel(i.investigation, i.result)),
    ),
  );
  add("Diagnosis", textParagraphs(c.diagnosis));
  add("Plan", textParagraphs(c.plan));
  const instructions = (c.instructions ?? [])
    .map((i) => i.instruction?.trim())
    .filter((i): i is string => !!i);
  if (instructions.length) {
    content.push(heading("Instructions"), {
      type: "bulletList",
      content: instructions.map((i) => ({
        type: "listItem",
        content: [paragraph(i)],
      })),
    });
  }

  return { type: "doc", content: content.length ? content : [paragraph("")] };
};

/** The note to show/edit: the stored note, else one built from the old fields. */
export const noteForConsultation = (
  c: LegacyConsultation & { clinical_note?: unknown },
): NoteDoc =>
  isNoteDoc(c.clinical_note) ? c.clinical_note : legacyToNoteDoc(c);

export const noteHasContent = (doc: NoteDoc) =>
  (doc.content ?? []).some((n) => nodeText(n).trim().length > 0);

/** The note without the given sections (heading and its content), e.g. for print. */
export const omitSections = (doc: NoteDoc, keys: NoteSectionKey[]): NoteDoc => {
  let skipping = false;
  const content = (doc.content ?? []).filter((node) => {
    const key = headingSection(node);
    if (key) skipping = keys.includes(key);
    return !skipping;
  });
  return { ...doc, content };
};
