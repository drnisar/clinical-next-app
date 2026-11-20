import { APPOINTMENT_STATUSES } from "@/lib/appointmentStatus";
import { appointmentTypeOptions } from "../../_components/appConstants";

/**
 * Appointments-page filters kept in the URL (?type=&status=&date=), so they
 * survive refreshes and navigation and can be bookmarked. The search text is
 * deliberately not here: it is usually a patient's name or phone number,
 * which shouldn't end up in browser history or server logs.
 */
export interface AppointmentFilters {
  type: string | null;
  status: string | null;
  /** "today" (always the current day, for bookmarks) or "YYYY-MM-DD". */
  date: string | null;
}

export const NO_FILTERS: AppointmentFilters = {
  type: null,
  status: null,
  date: null,
};

const YMD = /^\d{4}-\d{2}-\d{2}$/;

/** Read filters from the URL, ignoring values that aren't valid. */
export const parseAppointmentFilters = (params: {
  get: (key: string) => string | null;
}): AppointmentFilters => {
  const type = params.get("type");
  const status = params.get("status");
  const date = params.get("date");
  return {
    type: appointmentTypeOptions.some((o) => o.value === type) ? type : null,
    status: (APPOINTMENT_STATUSES as readonly (string | null)[]).includes(status)
      ? status
      : null,
    date: date === "today" || (date && YMD.test(date)) ? date : null,
  };
};

/** The query string for a set of filters: "" when none, else "?a=b&…". */
export const appointmentFiltersQuery = (filters: AppointmentFilters) => {
  const params = new URLSearchParams();
  if (filters.type) params.set("type", filters.type);
  if (filters.status) params.set("status", filters.status);
  if (filters.date) params.set("date", filters.date);
  const query = params.toString();
  return query ? `?${query}` : "";
};

/** The date filter as a concrete "YYYY-MM-DD", or "" for all dates. */
export const resolveFilterDate = (date: string | null, today: string) =>
  date === "today" ? today : (date ?? "");
