/**
 * Appointment statuses. Stored as these strings in `Appointment.status`;
 * PENDING is the schema default for a new booking.
 */
export const APPOINTMENT_STATUSES = [
  "PENDING",
  "ARRIVED",
  "COMPLETED",
  "NO_SHOW",
  "CANCELLED",
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  PENDING: "Pending",
  ARRIVED: "Arrived",
  COMPLETED: "Completed",
  NO_SHOW: "No show",
  CANCELLED: "Cancelled",
};

type BadgeColor = "gray" | "blue" | "green" | "red" | "orange";

const STATUS_COLORS: Record<AppointmentStatus, BadgeColor> = {
  PENDING: "gray",
  ARRIVED: "blue",
  COMPLETED: "green",
  NO_SHOW: "red",
  CANCELLED: "orange",
};

const isStatus = (s: string): s is AppointmentStatus =>
  (APPOINTMENT_STATUSES as readonly string[]).includes(s);

/** Display label; unknown legacy values are shown as stored. */
export const statusLabel = (s: string) =>
  isStatus(s) ? APPOINTMENT_STATUS_LABELS[s] : s;

export const statusColor = (s: string): BadgeColor =>
  isStatus(s) ? STATUS_COLORS[s] : "gray";
