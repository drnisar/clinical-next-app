import { describe, it, expect, vi } from "vitest";
import { prismaMock } from "../helpers/prisma";
import { jsonRequest, params } from "../helpers/request";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { GET as list, POST as create } from "@/app/api/registration/route";
import { GET as getOne, PATCH as patch } from "@/app/api/registration/[id]/route";
import { GET as search } from "@/app/api/registration/search/[field]/route";

const patient = {
  first_name: "Ali",
  last_name: "Khan",
  gender: "Male",
  code: "+92",
  phone_number: "3001234567",
  mr_number: "MR001",
};

describe("GET /api/registration", () => {
  it("returns patients newest first with related records", async () => {
    prismaMock.registration.findMany.mockResolvedValue([{ registration_id: "r1" }]);
    const res = await list(jsonRequest("/api/registration", "GET"));
    expect(await res.json()).toEqual([{ registration_id: "r1" }]);
    expect(prismaMock.registration.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { created_at: "desc" } })
    );
  });
});

describe("POST /api/registration", () => {
  it("creates a patient and returns 201", async () => {
    prismaMock.registration.create.mockImplementation(async ({ data }) => ({
      registration_id: "r1",
      ...data,
    }));
    const res = await create(
      jsonRequest("/api/registration", "POST", { ...patient, date_of_birth: "1990-05-01" })
    );
    expect(res.status).toBe(201);
    const data = prismaMock.registration.create.mock.calls[0][0].data;
    expect(data).toMatchObject(patient);
    expect(data.date_of_birth).toBeInstanceOf(Date);
  });

  it("stores null when date_of_birth is missing", async () => {
    prismaMock.registration.create.mockResolvedValue({ registration_id: "r1" });
    await create(jsonRequest("/api/registration", "POST", patient));
    expect(prismaMock.registration.create.mock.calls[0][0].data.date_of_birth).toBeNull();
  });

  it("returns 400 and does not save when required fields are missing", async () => {
    const res = await create(jsonRequest("/api/registration", "POST", { first_name: "Ali" }));
    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe("Invalid data");
    expect(prismaMock.registration.create).not.toHaveBeenCalled();
  });

  it("returns 500 when the database write fails", async () => {
    prismaMock.registration.create.mockRejectedValue(new Error("db down"));
    const res = await create(jsonRequest("/api/registration", "POST", patient));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Failed to create registration" });
  });
});

describe("GET /api/registration/[id]", () => {
  it("returns the patient", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: "r1", ...patient });
    const res = await getOne(jsonRequest("/api/registration/r1", "GET"), params({ id: "r1" }));
    expect(await res.json()).toMatchObject({ registration_id: "r1" });
    expect(prismaMock.registration.findUnique).toHaveBeenCalledWith({
      where: { registration_id: "r1" },
    });
  });

  it("returns an error body when the patient does not exist", async () => {
    prismaMock.registration.findUnique.mockResolvedValue(null);
    const res = await getOne(jsonRequest("/api/registration/x", "GET"), params({ id: "x" }));
    expect(await res.json()).toEqual({ error: "Registration not found" });
    // Known issue: status is 200, not 404. See .claude/agents/api-security-tester.md.
  });
});

describe("PATCH /api/registration/[id]", () => {
  it("updates the patient, dropping the derived age field", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: "r1" });
    prismaMock.registration.update.mockResolvedValue({ registration_id: "r1" });

    const res = await patch(
      jsonRequest("/api/registration/r1", "PATCH", { first_name: "Ahmed", age: 40 }),
      params({ id: "r1" })
    );
    expect(res.status).toBe(200);
    expect(prismaMock.registration.update).toHaveBeenCalledWith({
      where: { registration_id: "r1" },
      data: { first_name: "Ahmed" },
    });
  });

  it("returns 404 for an unknown patient", async () => {
    prismaMock.registration.findUnique.mockResolvedValue(null);
    const res = await patch(
      jsonRequest("/api/registration/x", "PATCH", { first_name: "A" }),
      params({ id: "x" })
    );
    expect(res.status).toBe(404);
    expect(prismaMock.registration.update).not.toHaveBeenCalled();
  });

  it("returns 400 for an invalid date_of_birth", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: "r1" });
    const res = await patch(
      jsonRequest("/api/registration/r1", "PATCH", { date_of_birth: "31/31/2020" }),
      params({ id: "r1" })
    );
    expect(res.status).toBe(400);
    expect(prismaMock.registration.update).not.toHaveBeenCalled();
  });
});

describe("GET /api/registration/search/[field]", () => {
  it("searches by MR number", async () => {
    prismaMock.registration.findMany.mockResolvedValue([{ mr_number: "MR001" }]);
    const res = await search(
      jsonRequest("/api/registration/search/MR001", "GET"),
      params({ field: "MR001" })
    );
    expect(await res.json()).toEqual([{ mr_number: "MR001" }]);
    expect(prismaMock.registration.findMany).toHaveBeenCalledWith({
      where: { mr_number: "MR001" },
    });
  });
});
