import { describe, it, expect } from "vitest";
import { displayResult } from "@/app/dashboard/consultation/_components/HMISAllNotes";
import {
  dedupeByNoteId,
  dedupeLabResults,
  type HMISLabResult,
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

describe("dedupeLabResults (repeated parameters within a lab report)", () => {
  const row = (
    parameterId: string,
    reportDate: string,
    extra: Partial<HMISLabResult> = {},
  ): HMISLabResult => ({
    parameterId,
    parameterName: `P${parameterId}`,
    resultValue: "",
    resultNumeric: 1,
    resultText: "",
    normal: "Y",
    rangeText: "1 - 2",
    reportDate,
    ...extra,
  });
  const T1 = "2026-11-17T10:00:00";
  const T2 = "2026-11-17T14:00:00";

  it("collapses exact copies to one row", () => {
    const r = row("1", T1);
    expect(dedupeLabResults([r, { ...r }, { ...r }])).toEqual([r]);
  });

  it("keeps the first non-empty range when copies differ only in rangeText", () => {
    const out = dedupeLabResults([
      row("1", T1, { rangeText: " " }),
      row("1", T1, { rangeText: "3 - 4" }),
      row("1", T1, { rangeText: "5 - 6" }),
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].rangeText).toBe("3 - 4");
  });

  it("keeps the abnormal flag if any copy is abnormal", () => {
    const out = dedupeLabResults([row("1", T1), row("1", T1, { normal: "N" })]);
    expect(out).toHaveLength(1);
    expect(out[0].normal).toBe("N");
  });

  it("keeps repeat measurements at different times, newest first, in the parameter's first position", () => {
    const out = dedupeLabResults([
      row("1", T1, { resultNumeric: 10 }),
      row("2", T1),
      row("1", T2, { resultNumeric: 12 }),
      row("1", T1, { resultNumeric: 10 }),
    ]);
    expect(out.map((r) => [r.parameterId, r.reportDate])).toEqual([
      ["1", T2],
      ["1", T1],
      ["2", T1],
    ]);
  });

  it("leaves single rows unchanged", () => {
    const rows = [row("1", T1), row("2", T1), row("3", T2)];
    expect(dedupeLabResults(rows)).toEqual(rows);
  });
});
