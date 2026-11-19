// Pure helpers for the consultation edit page (no React, unit-tested).
import {
  noteForConsultation,
  noteHasContent,
  type LegacyConsultation,
} from "../clinicalNote/clinicalNote";

export const STEPS = [
  { key: "note", label: "Clinical Note" },
  { key: "medications", label: "Medications" },
  { key: "appointment", label: "Appointment" },
] as const;

export type StepKey = (typeof STEPS)[number]["key"];

export const isStepKey = (value: unknown): value is StepKey =>
  STEPS.some((s) => s.key === value);

/** The consultation fields the steps edit (dates may arrive as strings). */
export type StepData = LegacyConsultation & {
  clinical_note?: unknown;
  medications?: unknown[] | null;
};

const hasItems = (v?: unknown[] | null) => Array.isArray(v) && v.length > 0;

/** ✓ on a step. Clinical Note: the note (or, for older consultations, any of
 *  the old fields) has text. Medications: at least one. Appointment: the
 *  patient has an upcoming appointment. */
export const isStepFilled = (
  step: StepKey,
  c: StepData,
  hasUpcomingAppointment: boolean,
): boolean => {
  switch (step) {
    case "note":
      return noteHasContent(noteForConsultation(c));
    case "medications":
      return hasItems(c.medications);
    case "appointment":
      return hasUpcomingAppointment;
  }
};

/** First QUEUED patient other than the current one, in queue order. */
export const nextQueuedPatient = <
  T extends { consultation_id: string; status?: string | null },
>(
  queue: T[] | null | undefined,
  currentConsultationId: string,
): T | null =>
  (queue ?? []).find(
    (p) => p.status === "QUEUED" && p.consultation_id !== currentConsultationId,
  ) ?? null;

/** Medication details after name and dose: form · route · frequency · duration. */
export const formatMedicationDetails = (m: {
  drug_form?: string | null;
  route?: string | null;
  frequency?: string | null;
  duration?: number | null;
  interval?: string | null;
}) =>
  [
    m.drug_form,
    m.route?.toUpperCase(),
    m.frequency?.toUpperCase(),
    m.duration != null
      ? `${m.duration}${m.interval ? ` ${m.interval.toUpperCase()}` : ""}`
      : m.interval?.toUpperCase(),
  ]
    .filter(Boolean)
    .join(" · ");
