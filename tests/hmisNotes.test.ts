import { describe, it, expect } from "vitest";
import { displayResult } from "@/app/dashboard/consultation/_components/HMISAllNotes";
import {
  dedupeByNoteId,
  type HMISPhysicianNote,
} from "@/app/dashboard/consultation/_components/HMISNotes";

const note = (
  noteId: string,
  extra: Partial<HMISPhysicianNote> & Record<string, unknown> = {},
) =>
  ({
    noteId,
    notesDate: "2026-11-17T10:00:00",
    writerUserName: "DR A",
    clinicDesc: "IBP NISAR AHMAD",
    noteType: "",
    notes: `note ${noteId}`,
    ...extra,
  }) as HMISPhysicianNote;

describe("dedupeByNoteId", () => {
  it("drops repeat copies of a note HMIS returns once per patient location", () => {
    const notes = [
      note("K1", { patientLocationDesc: "WARD A" }),
      note("K2"),
      note("K1", { patientLocationDesc: "WARD B" }),
    ];
    const result = dedupeByNoteId(notes);
    expect(result.map((n) => n.noteId)).toEqual(["K1", "K2"]);
    expect(result[0]).toBe(notes[0]); // keeps the first copy
  });

  it("keeps every note that has no noteId", () => {
    expect(dedupeByNoteId([note(""), note("")])).toHaveLength(2);
  });

  it("returns notes unchanged when there are no duplicates", () => {
    const notes = [note("K1"), note("K2"), note("K3")];
    expect(dedupeByNoteId(notes)).toEqual(notes);
  });
});

describe("displayResult (lab value shown in the Result column)", () => {
  const base = {
    parameterId: "p1",
    parameterName: "Hb",
    resultValue: "",
    resultNumeric: null,
    resultText: "",
    normal: "Y",
    rangeText: "",
    reportDate: "",
  };

  it("shows resultNumeric when resultValue is empty (most HMIS lab values)", () => {
    expect(displayResult({ ...base, resultNumeric: 11.4 })).toBe("11.4");
  });

  it("treats 0 as a real numeric result", () => {
    expect(displayResult({ ...base, resultNumeric: 0 })).toBe("0");
  });

  it("falls back to resultText for text results", () => {
    expect(displayResult({ ...base, resultText: "Negative" })).toBe("Negative");
  });

  it("prefers resultValue when present", () => {
    expect(
      displayResult({ ...base, resultValue: "5.2", resultNumeric: 5.2 }),
    ).toBe("5.2");
  });

  it("shows a dash when no value is reported", () => {
    expect(displayResult(base)).toBe("—");
  });
});
