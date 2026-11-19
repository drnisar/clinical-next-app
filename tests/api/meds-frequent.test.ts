import { describe, it, expect, vi } from "vitest";
import { prismaMock } from "../helpers/prisma";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { GET } from "@/app/api/meds/frequent/route";

const med = (drug_name: string, frequency = "bd") => ({
  drug_name,
  drug_dose: "500 mg",
  amount: 10,
  drug_form: "tablet",
  route: "oral",
  frequency,
  duration: 5,
  interval: "days",
  instructions: null,
});

describe("GET /api/meds/frequent", () => {
  it("summarises consultations and discharges, most prescribed first, without patient data", async () => {
    prismaMock.consultation.findMany.mockResolvedValue([
      { medications: [med("Paracetamol"), med("Omeprazole", "od")] },
      { medications: [med("paracetamol")] },
    ]);
    prismaMock.admission_Discharge.findMany.mockResolvedValue([
      { medications: [med("Paracetamol")] },
      { medications: [] },
    ]);

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();

    expect(
      body.map((d: { drug_name: string; count: number }) => [
        d.drug_name,
        d.count,
      ]),
    ).toEqual([
      ["Paracetamol", 3],
      ["Omeprazole", 1],
    ]);
    expect(body[1].usual.frequency).toBe("od");

    // Only the medications field is requested from both collections.
    expect(prismaMock.consultation.findMany.mock.calls[0][0]).toEqual({
      select: { medications: true },
    });
    expect(prismaMock.admission_Discharge.findMany.mock.calls[0][0]).toEqual({
      select: { medications: true },
    });
    expect(JSON.stringify(body)).not.toMatch(
      /registration|mr_number|phone|first_name/,
    );
  });

  it("returns 500 when the database fails", async () => {
    prismaMock.consultation.findMany.mockRejectedValue(new Error("down"));
    prismaMock.admission_Discharge.findMany.mockResolvedValue([]);
    expect((await GET()).status).toBe(500);
  });
});
