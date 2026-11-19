import { describe, it, expect } from "vitest";
import {
  STEPS,
  isStepFilled,
  isStepKey,
  nextQueuedPatient,
} from "@/app/dashboard/consultation/_components/edit/stepHelpers";
import { startOfTodayPKT } from "@/lib/dates";

describe("isStepFilled", () => {
  const empty = {
    clinical_note: null,
    history: "",
    examination: [],
    investigations: [],
    diagnosis: null,
    plan: "   ",
    medications: [],
    instructions: [],
  };
  const note = (text: string) => ({
    type: "doc",
    content: [{ type: "paragraph", content: [{ type: "text", text }] }],
  });

  it("is false for every step of an empty consultation", () => {
    for (const s of STEPS)
      expect(isStepFilled(s.key, empty, false)).toBe(false);
  });

  it("note: true when the Clinical Note has text", () => {
    expect(
      isStepFilled("note", { clinical_note: note("Pain RIF") }, false),
    ).toBe(true);
    expect(isStepFilled("note", { clinical_note: note("   ") }, false)).toBe(
      false,
    );
  });

  it("note: older consultations count their old fields", () => {
    expect(isStepFilled("note", { diagnosis: "Appendicitis" }, false)).toBe(
      true,
    );
    expect(
      isStepFilled("note", { instructions: [{ instruction: "Rest" }] }, false),
    ).toBe(true);
  });

  it("medications need at least one", () => {
    expect(isStepFilled("medications", { medications: [{}] }, false)).toBe(
      true,
    );
  });

  it("appointment follows whether an upcoming appointment exists", () => {
    expect(isStepFilled("appointment", empty, true)).toBe(true);
    expect(isStepFilled("appointment", empty, false)).toBe(false);
  });
});

describe("isStepKey", () => {
  it("accepts step keys only", () => {
    expect(isStepKey("note")).toBe(true);
    expect(isStepKey("medications")).toBe(true);
    expect(isStepKey("history")).toBe(false); // old per-field step
    expect(isStepKey("past_consultations")).toBe(false);
    expect(isStepKey(undefined)).toBe(false);
  });
});

describe("nextQueuedPatient", () => {
  const q = [
    { consultation_id: "a", status: "IN_PROGRESS" },
    { consultation_id: "b", status: "QUEUED" },
    { consultation_id: "c", status: "QUEUED" },
    { consultation_id: "d", status: "COMPLETED" },
  ];

  it("returns the first queued patient in order", () => {
    expect(nextQueuedPatient(q, "a")?.consultation_id).toBe("b");
  });

  it("skips the current patient", () => {
    expect(nextQueuedPatient(q, "b")?.consultation_id).toBe("c");
  });

  it("returns null when nobody else is queued", () => {
    expect(nextQueuedPatient(q.slice(0, 2), "b")).toBeNull();
    expect(nextQueuedPatient([], "x")).toBeNull();
    expect(nextQueuedPatient(undefined, "x")).toBeNull();
  });
});

describe("startOfTodayPKT", () => {
  it("is Pakistan midnight expressed in UTC", () => {
    // 18 Nov 21:30 UTC = 19 Nov 02:30 PKT -> 19 Nov 00:00 PKT = 18 Nov 19:00 UTC
    expect(
      startOfTodayPKT(Date.parse("2026-11-18T21:30:00Z")).toISOString(),
    ).toBe("2026-11-18T19:00:00.000Z");
    // 18 Nov 10:00 UTC = 18 Nov 15:00 PKT -> 18 Nov 00:00 PKT = 17 Nov 19:00 UTC
    expect(
      startOfTodayPKT(Date.parse("2026-11-18T10:00:00Z")).toISOString(),
    ).toBe("2026-11-17T19:00:00.000Z");
  });
});
