import { describe, it, expect } from "vitest";
import {
  deriveLegacyFields,
  headingSection,
  isNoteDoc,
  legacyToNoteDoc,
  noteForConsultation,
  noteHasContent,
  omitSections,
  type NoteDoc,
  type NoteNode,
} from "@/app/dashboard/consultation/_components/clinicalNote/clinicalNote";

const h = (text: string, level = 3): NoteNode => ({
  type: "heading",
  attrs: { level },
  content: [{ type: "text", text }],
});
const p = (text: string): NoteNode => ({
  type: "paragraph",
  content: [{ type: "text", text }],
});
const ul = (...items: string[]): NoteNode => ({
  type: "bulletList",
  content: items.map((i) => ({ type: "listItem", content: [p(i)] })),
});
const doc = (...content: NoteNode[]): NoteDoc => ({ type: "doc", content });

const legacy = {
  history: "Pain RIF 2 days\nVomiting x2",
  examination: [
    { examination: "Abdomen", findings: "Tender RIF" },
    { examination: "Chest", findings: "Clear" },
  ],
  investigations: [{ investigation: "CBC", result: "TLC 14" }],
  diagnosis: "Acute appendicitis",
  plan: "Lap appendicectomy",
  instructions: [{ instruction: "NPO" }, { instruction: "IV fluids" }],
};

describe("legacyToNoteDoc + deriveLegacyFields", () => {
  it("puts each old field under its heading", () => {
    const note = legacyToNoteDoc(legacy);
    const headings = note.content
      .filter((n) => n.type === "heading")
      .map((n) => n.content?.[0].text);
    expect(headings).toEqual([
      "History",
      "Examination",
      "Investigations",
      "Diagnosis",
      "Plan",
      "Instructions",
    ]);
  });

  it("round-trips history, diagnosis, plan and every instruction", () => {
    const d = deriveLegacyFields(legacyToNoteDoc(legacy));
    expect(d.history).toBe("Pain RIF 2 days\nVomiting x2");
    expect(d.diagnosis).toBe("Acute appendicitis");
    expect(d.plan).toBe("Lap appendicectomy");
    expect(d.instructions).toEqual([
      { instruction: "NPO" },
      { instruction: "IV fluids" },
    ]);
    expect(d.examination).toEqual([
      {
        examination: "Examination",
        findings: "Abdomen: Tender RIF\nChest: Clear",
      },
    ]);
    expect(d.investigations).toEqual([
      { investigation: "CBC: TLC 14", result: null },
    ]);
  });

  it("is stable when re-built from derived fields (no 'Examination: Examination')", () => {
    const once = deriveLegacyFields(legacyToNoteDoc(legacy));
    const twice = deriveLegacyFields(legacyToNoteDoc(once));
    expect(twice).toEqual(once);
  });

  it("gives an empty one-paragraph note when there is nothing", () => {
    const note = legacyToNoteDoc({});
    expect(note.content).toEqual([{ type: "paragraph" }]);
    expect(noteHasContent(note)).toBe(false);
  });
});

describe("deriveLegacyFields", () => {
  it("matches headings regardless of case, trailing colon and level", () => {
    const d = deriveLegacyFields(
      doc(h("DIAGNOSIS:", 2), p("Hernia"), h("plan", 1), p("Mesh repair")),
    );
    expect(d.diagnosis).toBe("Hernia");
    expect(d.plan).toBe("Mesh repair");
  });

  it("treats text before the first heading as history", () => {
    const d = deriveLegacyFields(
      doc(p("Walk-in, pain"), h("Plan"), p("Review")),
    );
    expect(d.history).toBe("Walk-in, pain");
    expect(d.plan).toBe("Review");
  });

  it("keeps text under unrecognised headings in the current section", () => {
    const d = deriveLegacyFields(
      doc(
        h("History"),
        p("Pain"),
        h("Past history"),
        p("DM"),
        h("Plan"),
        p("OPD"),
      ),
    );
    expect(d.history).toBe("Pain\nPast history\nDM");
  });

  it("takes one instruction per list item or line", () => {
    const d = deriveLegacyFields(
      doc(
        h("Instructions"),
        ul("Walk daily", "No lifting"),
        p("Review in 1 week"),
      ),
    );
    expect(d.instructions.map((i) => i.instruction)).toEqual([
      "Walk daily",
      "No lifting",
      "Review in 1 week",
    ]);
  });

  it("marks list items with '- ' inside text sections", () => {
    const d = deriveLegacyFields(doc(h("Plan"), ul("CT abdomen", "Surgery")));
    expect(d.plan).toBe("- CT abdomen\n- Surgery");
  });

  it("returns empty fields for an empty note", () => {
    expect(deriveLegacyFields(doc(p("")))).toEqual({
      history: null,
      examination: [],
      investigations: [],
      diagnosis: null,
      plan: null,
      instructions: [],
    });
  });
});

describe("omitSections", () => {
  it("removes only the Instructions heading and its content", () => {
    const note = doc(
      h("Diagnosis"),
      p("Hernia"),
      h("Instructions"),
      ul("Rest"),
      h("Plan"),
      p("Surgery"),
    );
    const out = omitSections(note, ["instructions"]);
    expect(
      out.content.map((n) =>
        n.type === "heading" ? n.content?.[0].text : n.type,
      ),
    ).toEqual(["Diagnosis", "paragraph", "Plan", "paragraph"]);
  });
});

describe("noteForConsultation / isNoteDoc / headingSection", () => {
  it("prefers the stored note, else builds one from the old fields", () => {
    const stored = doc(h("Plan"), p("X"));
    expect(noteForConsultation({ ...legacy, clinical_note: stored })).toBe(
      stored,
    );
    expect(
      noteForConsultation({ ...legacy, clinical_note: null }).content.length,
    ).toBeGreaterThan(0);
  });

  it("recognises TipTap docs only", () => {
    expect(isNoteDoc(doc())).toBe(true);
    expect(isNoteDoc({ type: "doc" })).toBe(false);
    expect(isNoteDoc("<p>hi</p>")).toBe(false);
    expect(isNoteDoc(null)).toBe(false);
  });

  it("only headings start sections", () => {
    expect(headingSection(p("Diagnosis"))).toBeNull();
    expect(headingSection(h("Investigation"))).toBe("investigations");
  });
});
