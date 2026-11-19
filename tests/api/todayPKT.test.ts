import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { prismaMock } from "../helpers/prisma";
import { jsonRequest, params } from "../helpers/request";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { GET as getTodayQueue } from "@/app/api/consultation/today/route";
import { GET as getTodayForPatient } from "@/app/api/consultation/today/[id]/route";
import { GET as getUpcomingTen } from "@/app/api/appointment/upcomingTenAppointments/route";
import {
  getNextTenAppointments,
  getTodaysConsultations,
} from "@/app/actions/actions";
import { todayRangePKT } from "@/lib/dates";

// 02:30 on 19 Nov in Pakistan = 21:30 on 18 Nov UTC (a UTC server's "yesterday").
const NOW = "2026-11-18T21:30:00Z";
const PKT_DAY = {
  gte: new Date("2026-11-18T19:00:00Z"), // 19 Nov 00:00 PKT
  lt: new Date("2026-11-19T19:00:00Z"), // 20 Nov 00:00 PKT
};

const whereOf = (fn: { mock: { calls: unknown[][] } }) =>
  (fn.mock.calls[0][0] as { where: Record<string, unknown> }).where;

describe("'today' is the Pakistan day, whatever the server time zone", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => vi.useRealTimers());

  it("todayRangePKT spans Pakistan midnight to midnight", () => {
    const { start, end } = todayRangePKT();
    expect({ gte: start, lt: end }).toEqual(PKT_DAY);
  });

  it("GET /api/consultation/today queries the Pakistan day", async () => {
    prismaMock.consultation.findMany.mockResolvedValue([
      { consultation_id: "c1" },
    ]);
    await getTodayQueue(jsonRequest("/api/consultation/today", "GET"));
    expect(whereOf(prismaMock.consultation.findMany)).toEqual({
      visit_date: PKT_DAY,
    });
  });

  it("GET /api/consultation/today/[id] queries the Pakistan day for that patient", async () => {
    prismaMock.consultation.findMany.mockResolvedValue([]);
    await getTodayForPatient(
      jsonRequest("/api/consultation/today/r1", "GET"),
      params({ id: "r1" }),
    );
    expect(whereOf(prismaMock.consultation.findMany)).toEqual({
      visit_date: PKT_DAY,
      registration_id: "r1",
    });
  });

  it("getTodaysConsultations queries the Pakistan day", async () => {
    prismaMock.consultation.findMany.mockResolvedValue([]);
    await getTodaysConsultations();
    expect(whereOf(prismaMock.consultation.findMany)).toEqual({
      visit_date: PKT_DAY,
    });
  });

  it("upcoming-appointment lists start at Pakistan midnight (earlier today included)", async () => {
    prismaMock.appointment.findMany.mockResolvedValue([]);
    await getNextTenAppointments();
    await getUpcomingTen(
      jsonRequest("/api/appointment/upcomingTenAppointments", "GET"),
    );
    for (const call of prismaMock.appointment.findMany.mock.calls) {
      expect((call[0] as { where: unknown }).where).toEqual({
        date_appointment: { gte: PKT_DAY.gte },
      });
    }
  });
});
