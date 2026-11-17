import { describe, it, expect, vi } from "vitest";
import { prismaMock } from "../helpers/prisma";
import { jsonRequest } from "../helpers/request";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { GET, POST } from "@/app/api/appointment/route";

const appt = {
  registration_id: "r1",
  date_appointment: "2026-12-01T09:00:00.000Z",
  plan: "Post-op review",
  notes: "Bring reports",
  type: "Follow-up",
};

describe("GET /api/appointment", () => {
  it("returns appointments", async () => {
    prismaMock.appointment.findMany.mockResolvedValue([{ appointment_id: "a1" }]);
    const res = await GET(jsonRequest("/api/appointment", "GET"));
    expect(await res.json()).toEqual([{ appointment_id: "a1" }]);
  });

  it("returns a message when there are none", async () => {
    prismaMock.appointment.findMany.mockResolvedValue([]);
    const res = await GET(jsonRequest("/api/appointment", "GET"));
    expect(await res.json()).toEqual({ message: "No appointments found" });
  });

  it("returns 500 when the database fails", async () => {
    prismaMock.appointment.findMany.mockRejectedValue(new Error("db down"));
    const res = await GET(jsonRequest("/api/appointment", "GET"));
    expect(res.status).toBe(500);
  });
});

describe("POST /api/appointment", () => {
  it("books an appointment for an existing patient", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: "r1" });
    prismaMock.appointment.create.mockResolvedValue({ appointment_id: "a1" });

    const res = await POST(jsonRequest("/api/appointment", "POST", appt));
    expect(res.status).toBe(200);

    const data = prismaMock.appointment.create.mock.calls[0][0].data;
    expect(data).toMatchObject({
      registration_id: "r1",
      plan: appt.plan,
      notes: appt.notes,
      type: appt.type,
    });
    expect(data.date_appointment).toEqual(new Date(appt.date_appointment));
  });

  it("returns 404 when the patient does not exist", async () => {
    prismaMock.registration.findUnique.mockResolvedValue(null);
    const res = await POST(jsonRequest("/api/appointment", "POST", appt));
    expect(res.status).toBe(404);
    expect(prismaMock.appointment.create).not.toHaveBeenCalled();
  });

  it("returns 400 when the plan is missing", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: "r1" });
    const res = await POST(jsonRequest("/api/appointment", "POST", { ...appt, plan: "" }));
    expect(res.status).toBe(400);
    expect(prismaMock.appointment.create).not.toHaveBeenCalled();
  });
});
