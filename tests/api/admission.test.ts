import { describe, it, expect, vi } from "vitest";
import { prismaMock } from "../helpers/prisma";
import { jsonRequest } from "../helpers/request";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { POST } from "@/app/api/admission/route";

const body = {
  registration_id: "r1",
  ward: "Surgical A",
  bed_number: "12",
  admission_mode: "OPD",
  admission_plan: "Lap chole",
};

describe("POST /api/admission", () => {
  it("admits the patient and records their bed in one transaction", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: "r1" });
    prismaMock.admission_Discharge.findFirst.mockResolvedValue(null);
    prismaMock.admission_Discharge.create.mockImplementation(async ({ data }) => ({
      admission_id: "adm1",
      ...data,
    }));
    prismaMock.admitted_Location.create.mockImplementation(async ({ data }) => ({
      location_id: "loc1",
      ...data,
    }));

    const res = await POST(jsonRequest("/api/admission", "POST", body));
    expect(res.status).toBe(201);
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);

    const admission = prismaMock.admission_Discharge.create.mock.calls[0][0].data;
    expect(admission).toMatchObject({
      registration_id: "r1",
      status: "ADMITTED",
      ward: "Surgical A",
      bed_number: "12",
    });
    expect(prismaMock.admitted_Location.create).toHaveBeenCalledWith({
      data: { admission_id: "adm1", registration_id: "r1", ward: "Surgical A", bed_no: "12" },
    });
  });

  it("returns 400 without a registration_id", async () => {
    const res = await POST(jsonRequest("/api/admission", "POST", { ward: "A" }));
    expect(res.status).toBe(400);
    expect(prismaMock.registration.findUnique).not.toHaveBeenCalled();
  });

  it("returns 404 when the patient does not exist", async () => {
    prismaMock.registration.findUnique.mockResolvedValue(null);
    const res = await POST(jsonRequest("/api/admission", "POST", body));
    expect(res.status).toBe(404);
  });

  it("returns 409 when the patient is already admitted", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: "r1" });
    prismaMock.admission_Discharge.findFirst.mockResolvedValue({ admission_id: "old" });
    const res = await POST(jsonRequest("/api/admission", "POST", body));
    expect(res.status).toBe(409);
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(prismaMock.admission_Discharge.findFirst).toHaveBeenCalledWith({
      where: { registration_id: "r1", status: { not: "DISCHARGED" } },
    });
  });

  it("returns 500 when the transaction fails", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: "r1" });
    prismaMock.admission_Discharge.findFirst.mockResolvedValue(null);
    prismaMock.admission_Discharge.create.mockRejectedValue(new Error("write conflict"));
    const res = await POST(jsonRequest("/api/admission", "POST", body));
    expect(res.status).toBe(500);
  });
});
