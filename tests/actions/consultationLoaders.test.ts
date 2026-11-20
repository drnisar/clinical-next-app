import { describe, it, expect, vi, afterEach } from "vitest";
import { prismaMock } from "../helpers/prisma";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import {
  getAppointmentsForRegistration,
  getConsultationHistory,
  getUpcomingAppointmentsForBooking,
} from "@/app/actions/actions";

const args = (fn: { mock: { calls: unknown[][] } }) =>
  fn.mock.calls[0][0] as Record<string, unknown>;

describe("consultation page loaders", () => {
  afterEach(() => vi.useRealTimers());

  it("getAppointmentsForRegistration asks only for this patient's appointments", async () => {
    prismaMock.appointment.findMany.mockResolvedValue([]);
    await getAppointmentsForRegistration("r1");
    expect(args(prismaMock.appointment.findMany)).toMatchObject({
      where: { registration_id: "r1" },
      orderBy: { date_appointment: "desc" },
    });
  });

  it("getUpcomingAppointmentsForBooking selects only display fields, from today in Pakistan", async () => {
    // 2026-11-18 21:30 UTC is already 2026-11-19 02:30 in Pakistan.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-18T21:30:00Z"));
    prismaMock.appointment.findMany.mockResolvedValue([]);

    await getUpcomingAppointmentsForBooking();
    const a = args(prismaMock.appointment.findMany);

    // Pakistan midnight of 19 Nov = 18 Nov 19:00 UTC.
    expect(a.where).toEqual({
      date_appointment: { gte: new Date("2026-11-18T19:00:00Z") },
      status: { not: "CANCELLED" }, // cancelled bookings don't take a slot
    });
    expect(a.select).toEqual({
      appointment_id: true,
      date_appointment: true,
      type: true,
      status: true,
      plan: true,
      registration: { select: { first_name: true, last_name: true } },
    });
    expect(a).not.toHaveProperty("include"); // no full registration records
  });

  it("getConsultationHistory excludes the current consultation and caps at 10", async () => {
    prismaMock.consultation.findMany.mockResolvedValue([]);
    await getConsultationHistory("r1", "c-current");
    expect(args(prismaMock.consultation.findMany)).toMatchObject({
      where: {
        registration_id: "r1",
        NOT: { consultation_id: "c-current" },
      },
      orderBy: { visit_date: "desc" },
      take: 10,
    });
  });
});
