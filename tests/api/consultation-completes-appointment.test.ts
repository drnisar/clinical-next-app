import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock } from "../helpers/prisma";
import { jsonRequest, params } from "../helpers/request";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { PATCH } from "@/app/api/consultation/[id]/route";
import { completeAppointmentsForVisit } from "@/lib/completeAppointments";

const REG_ID = "64b7f0c2a1b2c3d4e5f60718";
// 20 Nov 2026, 10:00 in Pakistan (05:00 UTC).
const VISIT = new Date("2026-11-20T05:00:00.000Z");

const patch = (body: unknown) =>
  PATCH(jsonRequest("/api/consultation/c1", "PATCH", body), params({ id: "c1" }));

describe("completeAppointmentsForVisit", () => {
  it("completes open appointments on the visit's Pakistan day", async () => {
    prismaMock.appointment.updateMany.mockResolvedValue({ count: 1 });

    expect(await completeAppointmentsForVisit(REG_ID, VISIT)).toBe(1);
    expect(prismaMock.appointment.updateMany).toHaveBeenCalledWith({
      where: {
        registration_id: REG_ID,
        // 20 Nov 00:00 to 21 Nov 00:00 Pakistan time, in UTC.
        date_appointment: {
          gte: new Date("2026-11-19T19:00:00.000Z"),
          lt: new Date("2026-11-20T19:00:00.000Z"),
        },
        status: { in: ["PENDING", "ARRIVED"] },
      },
      data: { status: "COMPLETED" },
    });
  });

  it("matches an appointment booked for that date (stored as UTC midnight)", async () => {
    prismaMock.appointment.updateMany.mockResolvedValue({ count: 1 });
    await completeAppointmentsForVisit(REG_ID, VISIT);
    const { gte, lt } =
      prismaMock.appointment.updateMany.mock.calls[0][0].where.date_appointment;
    const booked = new Date("2026-11-20"); // what the booking form saves
    expect(booked >= gte && booked < lt).toBe(true);
  });

  it("does nothing for an invalid visit date", async () => {
    expect(await completeAppointmentsForVisit(REG_ID, "nope")).toBe(0);
    expect(prismaMock.appointment.updateMany).not.toHaveBeenCalled();
  });
});

describe("PATCH /api/consultation/[id] completes the appointment", () => {
  beforeEach(() => {
    prismaMock.consultation.findUnique.mockResolvedValue({
      consultation_id: "c1",
      registration_id: REG_ID,
      visit_date: VISIT,
    });
    prismaMock.consultation.update.mockResolvedValue({
      consultation_id: "c1",
      registration_id: REG_ID,
      visit_date: VISIT,
    });
    prismaMock.appointment.updateMany.mockResolvedValue({ count: 1 });
  });

  it.each([
    ["notes are saved", { diagnosis: "Lipoma" }],
    ["medications are saved", { medications: [] }],
    ["the status is set to COMPLETED", { status: "COMPLETED" }],
  ])("when %s", async (_label, body) => {
    const res = await patch(body);
    expect(res.status).toBe(200);
    expect(prismaMock.appointment.updateMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.appointment.updateMany.mock.calls[0][0].where.registration_id).toBe(
      REG_ID,
    );
  });

  it.each(["QUEUED", "IN_PROGRESS"])(
    "not for a status change to %s alone",
    async (status) => {
      await patch({ status });
      expect(prismaMock.appointment.updateMany).not.toHaveBeenCalled();
    },
  );

  it("still saves the consultation if completing the appointment fails", async () => {
    prismaMock.appointment.updateMany.mockRejectedValue(new Error("db down"));
    const res = await patch({ diagnosis: "Lipoma" });
    expect(res.status).toBe(200);
  });
});
