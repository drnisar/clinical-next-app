import { describe, it, expect } from "vitest";
import {
  applyUsual,
  cleanMedications,
  emptyMedicationRow,
  formatUsual,
  searchDrugs,
  summarizeMedications,
  summarizeRow,
} from "@/app/dashboard/_components/medications/medicationHelpers";

const line = (drug_name: string, extra: Record<string, unknown> = {}) => ({
  drug_name,
  drug_dose: "500 mg",
  amount: 10,
  drug_form: "tablet",
  route: "oral",
  frequency: "bd",
  duration: 5,
  interval: "days",
  instructions: null,
  ...extra,
});

describe("cleanMedications", () => {
  it("drops rows without a drug name", () => {
    expect(
      cleanMedications([line(""), line("   "), line("Paracetamol")]),
    ).toHaveLength(1);
  });

  it("turns empty/invalid amount into 1 and empty duration into null", () => {
    const [m] = cleanMedications([line("X", { amount: NaN, duration: NaN })]);
    expect(m.amount).toBe(1);
    expect(m.duration).toBeNull();
    const [n] = cleanMedications([line("X", { amount: "", duration: "0" })]);
    expect(n.amount).toBe(1);
    expect(n.duration).toBeNull();
  });

  it("rounds numbers and accepts numeric strings", () => {
    const [m] = cleanMedications([line("X", { amount: "14", duration: 7.4 })]);
    expect(m.amount).toBe(14);
    expect(m.duration).toBe(7);
  });

  it("trims text and makes empty optional fields null", () => {
    const [m] = cleanMedications([
      line("  Augmentin ", {
        drug_form: "",
        route: "  ",
        instructions: " after meals ",
      }),
    ]);
    expect(m).toMatchObject({
      drug_name: "Augmentin",
      drug_form: null,
      route: null,
      instructions: "after meals",
    });
  });
});

describe("summarizeMedications", () => {
  it("groups by name ignoring case and spaces, sorted by use", () => {
    const out = summarizeMedications([
      line("Paracetamol"),
      line("paracetamol "),
      line("PARACETAMOL"),
      line("Omeprazole", { drug_dose: "20 mg", frequency: "od" }),
    ]);
    expect(out.map((d) => [d.drug_name, d.count])).toEqual([
      ["Paracetamol", 3],
      ["Omeprazole", 1],
    ]);
  });

  it("uses the most common full dosing combination", () => {
    const out = summarizeMedications([
      line("Augmentin", { drug_dose: "625 mg", frequency: "bd" }),
      line("Augmentin", { drug_dose: "1 g", frequency: "bd" }),
      line("Augmentin", { drug_dose: "625 mg", frequency: "bd" }),
    ]);
    expect(out[0].usual).toMatchObject({
      drug_dose: "625 mg",
      frequency: "bd",
    });
  });

  it("ignores blank lines and respects the limit", () => {
    const out = summarizeMedications(
      [line(""), line("A"), line("B"), line("C")],
      2,
    );
    expect(out).toHaveLength(2);
  });
});

describe("applyUsual", () => {
  const usual = {
    drug_dose: "500 mg",
    amount: 10,
    drug_form: "tablet",
    route: "oral",
    frequency: "bd",
    duration: 5,
    interval: "days",
    instructions: "after meals",
  };

  it("fills every field of a fresh row", () => {
    expect(
      applyUsual({ ...emptyMedicationRow(), drug_name: "X" }, usual),
    ).toEqual(usual);
  });

  it("never overwrites what was typed", () => {
    const updates = applyUsual(
      {
        drug_name: "X",
        drug_dose: "1 g",
        amount: 20,
        frequency: "tds",
        duration: 3,
      },
      usual,
    );
    expect(updates).not.toHaveProperty("drug_dose");
    expect(updates).not.toHaveProperty("amount");
    expect(updates).not.toHaveProperty("frequency");
    expect(updates).not.toHaveProperty("duration");
    expect(updates).toMatchObject({ route: "oral", interval: "days" });
  });
});

describe("formatUsual", () => {
  it("summarises dosing for the suggestion hint", () => {
    expect(
      formatUsual({
        drug_dose: "500 mg",
        amount: 10,
        drug_form: "tablet",
        route: "oral",
        frequency: "bd",
        duration: 5,
        interval: "days",
      }),
    ).toBe("500 mg · TABLET · ORAL · BD · 5 DAYS");
  });
});

describe("searchDrugs", () => {
  const drugs = ["Nexum", "Voltral", "Diagesic P", "Augmentin", "Co-Nexum Plus"].map(
    (drug_name, i) => ({ drug_name, count: 10 - i, usual: { drug_dose: "", amount: 1 } }),
  );
  const names = (q: string) => searchDrugs(drugs, q).map((d) => d.drug_name);

  it("returns nothing for an empty query", () => {
    expect(names("  ")).toEqual([]);
  });

  it("ranks name start, then word start, then anywhere; ignores case", () => {
    expect(names("NEX")).toEqual(["Nexum", "Co-Nexum Plus"]);
    expect(names("p")).toEqual(["Diagesic P", "Co-Nexum Plus"]);
    expect(names("ment")).toEqual(["Augmentin"]);
  });

  it("limits the number of matches", () => {
    expect(searchDrugs(drugs, "a", 2)).toHaveLength(2);
  });
});

describe("summarizeRow", () => {
  it("joins dosing and instructions, skipping blanks", () => {
    expect(
      summarizeRow({ ...emptyMedicationRow(), drug_name: "Nexum", drug_dose: "40 mg", drug_form: "capsule", frequency: "od", duration: "14", interval: "days", instructions: "before breakfast" }),
    ).toBe("40 mg · CAPSULE · OD · 14 DAYS · before breakfast");
    expect(summarizeRow(emptyMedicationRow())).toBe("");
  });
});
