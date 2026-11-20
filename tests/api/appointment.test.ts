import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { prismaMock } from "../helpers/prisma";
import { jsonRequest, params } from "../helpers/request";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { GET, POST } from "@/app/api/appointment/route";
import { DELETE, PATCH } from "@/app/api/appointment/[id]/route";
import { GET as getUpcoming } from "@/app/api/appointment/upcoming/route";

const REG_ID = "64b7f0c2a1b2c3d4e5f60718";
const APPT_ID = "64b7f0c2a1b2c3d4e5f60719";

const appt = {
  registration_id: REG_ID,
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
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: REG_ID });
    prismaMock.appointment.create.mockResolvedValue({ appointment_id: "a1" });

    const res = await POST(jsonRequest("/api/appointment", "POST", appt));
    expect(res.status).toBe(200);

    const data = prismaMock.appointment.create.mock.calls[0][0].data;
    expect(data).toEqual({
      registration_id: REG_ID,
      plan: appt.plan,
      notes: appt.notes,
      type: appt.type,
      date_appointment: new Date(appt.date_appointment),
    });
  });

  it("saves only the validated fields, ignoring extras like status", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: REG_ID });
    prismaMock.appointment.create.mockResolvedValue({ appointment_id: "a1" });

    await POST(
      jsonRequest("/api/appointment", "POST", { ...appt, status: "COMPLETED", appointment_id: APPT_ID }),
    );
    const data = prismaMock.appointment.create.mock.calls[0][0].data;
    expect(data).not.toHaveProperty("status");
    expect(data).not.toHaveProperty("appointment_id");
  });

  it("stores empty notes when notes are omitted", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: REG_ID });
    prismaMock.appointment.create.mockResolvedValue({ appointment_id: "a1" });

    const withoutNotes: Partial<typeof appt> = { ...appt };
    delete withoutNotes.notes;
    const res = await POST(jsonRequest("/api/appointment", "POST", withoutNotes));
    expect(res.status).toBe(200);
    expect(prismaMock.appointment.create.mock.calls[0][0].data.notes).toBe("");
  });

  it("returns 404 when the patient does not exist", async () => {
    prismaMock.registration.findUnique.mockResolvedValue(null);
    const res = await POST(jsonRequest("/api/appointment", "POST", appt));
    expect(res.status).toBe(404);
    expect(prismaMock.appointment.create).not.toHaveBeenCalled();
  });

  it("returns 404 without querying for a malformed registration_id", async () => {
    const res = await POST(
      jsonRequest("/api/appointment", "POST", { ...appt, registration_id: "r1" }),
    );
    expect(res.status).toBe(404);
    expect(prismaMock.registration.findUnique).not.toHaveBeenCalled();
  });

  it("returns 400 when the plan is missing", async () => {
    const res = await POST(jsonRequest("/api/appointment", "POST", { ...appt, plan: "" }));
    expect(res.status).toBe(400);
    expect(prismaMock.appointment.create).not.toHaveBeenCalled();
  });

  it("returns 400 for an invalid date", async () => {
    const res = await POST(
      jsonRequest("/api/appointment", "POST", { ...appt, date_appointment: "abc" }),
    );
    expect(res.status).toBe(400);
    expect(prismaMock.appointment.create).not.toHaveBeenCalled();
  });

  it("returns 400 for a body that isn't JSON", async () => {
    const req = new NextRequest(new URL("/api/appointment", "http://localhost:3000"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 500 without leaking the error when the database fails", async () => {
    prismaMock.registration.findUnique.mockResolvedValue({ registration_id: REG_ID });
    prismaMock.appointment.create.mockRejectedValue(new Error("secret db detail"));
    const res = await POST(jsonRequest("/api/appointment", "POST", appt));
    expect(res.status).toBe(500);
    expect(JSON.stringify(await res.json())).not.toContain("secret db detail");
  });
});

describe("DELETE /api/appointment/[id]", () => {
  const del = (id: string) =>
    DELETE(jsonRequest(`/api/appointment/${id}`, "DELETE"), params({ id }));

  it("deletes an existing appointment", async () => {
    prismaMock.appointment.findUnique.mockResolvedValue({ appointment_id: APPT_ID });
    prismaMock.appointment.delete.mockResolvedValue({ appointment_id: APPT_ID });

    const res = await del(APPT_ID);
    expect(res.status).toBe(200);
    expect(prismaMock.appointment.delete).toHaveBeenCalledWith({
      where: { appointment_id: APPT_ID },
    });
  });

  it("returns 404 when the appointment does not exist", async () => {
    prismaMock.appointment.findUnique.mockResolvedValue(null);
    const res = await del(APPT_ID);
    expect(res.status).toBe(404);
    expect(prismaMock.appointment.delete).not.toHaveBeenCalled();
  });

  it("returns 404 without querying for a malformed id", async () => {
    const res = await del("not-an-id");
    expect(res.status).toBe(404);
    expect(prismaMock.appointment.findUnique).not.toHaveBeenCalled();
  });

  it("returns 500 when the database fails", async () => {
    prismaMock.appointment.findUnique.mockRejectedValue(new Error("db down"));
    const res = await del(APPT_ID);
    expect(res.status).toBe(500);
  });
});

describe("PATCH /api/appointment/[id]", () => {
  const patch = (id: string, body: unknown) =>
    PATCH(jsonRequest(`/api/appointment/${id}`, "PATCH", body), params({ id }));
  const exists = () =>
    prismaMock.appointment.findUnique.mockResolvedValue({ appointment_id: APPT_ID });

  it("updates the status", async () => {
    exists();
    prismaMock.appointment.update.mockResolvedValue({ appointment_id: APPT_ID });

    const res = await patch(APPT_ID, { status: "NO_SHOW" });
    expect(res.status).toBe(200);
    expect(prismaMock.appointment.update).toHaveBeenCalledWith({
      where: { appointment_id: APPT_ID },
      data: { status: "NO_SHOW" },
    });
  });

  it("reschedules to a new date and resets the status to PENDING", async () => {
    exists();
    prismaMock.appointment.update.mockResolvedValue({ appointment_id: APPT_ID });

    const res = await patch(APPT_ID, { date_appointment: "2026-12-15", plan: "Dressing" });
    expect(res.status).toBe(200);
    expect(prismaMock.appointment.update.mock.calls[0][0].data).toEqual({
      date_appointment: new Date("2026-12-15"),
      status: "PENDING",
      plan: "Dressing",
    });
  });

  it("keeps an explicit status given with a new date", async () => {
    exists();
    prismaMock.appointment.update.mockResolvedValue({ appointment_id: APPT_ID });

    await patch(APPT_ID, { date_appointment: "2026-12-15", status: "ARRIVED" });
    expect(prismaMock.appointment.update.mock.calls[0][0].data.status).toBe("ARRIVED");
  });

  it.each([
    ["an unknown status", { status: "DONE" }],
    ["an invalid date", { date_appointment: "abc" }],
    ["an empty plan", { plan: "" }],
    ["an empty body", {}],
    ["a field that can't be changed", { registration_id: REG_ID }],
  ])("returns 400 for %s", async (_label, body) => {
    const res = await patch(APPT_ID, body);
    expect(res.status).toBe(400);
    expect(prismaMock.appointment.update).not.toHaveBeenCalled();
  });

  it("returns 404 without querying for a malformed id", async () => {
    const res = await patch("not-an-id", { status: "ARRIVED" });
    expect(res.status).toBe(404);
    expect(prismaMock.appointment.findUnique).not.toHaveBeenCalled();
  });

  it("returns 404 when the appointment does not exist", async () => {
    prismaMock.appointment.findUnique.mockResolvedValue(null);
    const res = await patch(APPT_ID, { status: "ARRIVED" });
    expect(res.status).toBe(404);
    expect(prismaMock.appointment.update).not.toHaveBeenCalled();
  });

  it("returns 500 when the database fails", async () => {
    exists();
    prismaMock.appointment.update.mockRejectedValue(new Error("db down"));
    const res = await patch(APPT_ID, { status: "ARRIVED" });
    expect(res.status).toBe(500);
  });
});

describe("GET /api/appointment/upcoming", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // 02:30 on 19 Nov in Pakistan = 21:30 on 18 Nov UTC.
    vi.setSystemTime(new Date("2026-11-18T21:30:00Z"));
  });
  afterEach(() => vi.useRealTimers());

  it("returns non-cancelled appointments from the start of today in Pakistan, names only", async () => {
    prismaMock.appointment.findMany.mockResolvedValue([{ appointment_id: "a1" }]);
    const res = await getUpcoming();
    expect(await res.json()).toEqual([{ appointment_id: "a1" }]);

    const query = prismaMock.appointment.findMany.mock.calls[0][0];
    expect(query.where).toEqual({
      date_appointment: { gte: new Date("2026-11-18T19:00:00Z") },
      status: { not: "CANCELLED" },
    });
    expect(query.select.registration).toEqual({
      select: { first_name: true, last_name: true },
    });
  });

  it("returns 500 when the database fails", async () => {
    prismaMock.appointment.findMany.mockRejectedValue(new Error("db down"));
    expect((await getUpcoming()).status).toBe(500);
  });
});
