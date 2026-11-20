import { describe, it, expect } from "vitest";
import {
  NO_FILTERS,
  appointmentFiltersQuery,
  parseAppointmentFilters,
  resolveFilterDate,
} from "@/app/dashboard/appointments/_components/appointmentFilters";

const parse = (query: string) =>
  parseAppointmentFilters(new URLSearchParams(query));

describe("appointment filters in the URL", () => {
  it("reads valid type, status and date", () => {
    expect(parse("type=OPD&status=NO_SHOW&date=2026-11-27")).toEqual({
      type: "OPD",
      status: "NO_SHOW",
      date: "2026-11-27",
    });
  });

  it("accepts date=today for bookmarks", () => {
    expect(parse("date=today").date).toBe("today");
  });

  it("ignores unknown or malformed values", () => {
    expect(parse("type=XRAY&status=DONE&date=27/11/2026")).toEqual(NO_FILTERS);
  });

  it("ignores anything else, including a search term", () => {
    expect(parse("q=khan&foo=bar")).toEqual(NO_FILTERS);
  });

  it("builds an empty query when nothing is filtered (Clear all)", () => {
    expect(appointmentFiltersQuery(NO_FILTERS)).toBe("");
  });

  it("builds a query that parses back to the same filters", () => {
    const filters = { type: "IBP", status: "ARRIVED", date: "today" };
    const query = appointmentFiltersQuery(filters);
    expect(query).toBe("?type=IBP&status=ARRIVED&date=today");
    expect(parse(query.slice(1))).toEqual(filters);
  });

  it("resolves the date filter", () => {
    expect(resolveFilterDate("today", "2026-11-20")).toBe("2026-11-20");
    expect(resolveFilterDate("2026-12-01", "2026-11-20")).toBe("2026-12-01");
    expect(resolveFilterDate(null, "2026-11-20")).toBe("");
  });
});
