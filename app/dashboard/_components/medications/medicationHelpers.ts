// Pure helpers for the medications form (no React/DOM; unit-tested).

/** A medication as stored (matches the Prisma `Medication` composite type). */
export interface MedicationLine {
  drug_name: string;
  drug_dose: string;
  amount: number;
  drug_form?: string | null;
  route?: string | null;
  frequency?: string | null;
  duration?: number | null;
  interval?: string | null;
  instructions?: string | null;
}

/** A row while editing: numbers may be NaN/empty, strings may be blank. */
export type MedicationRowValues = {
  [K in keyof MedicationLine]?: MedicationLine[K] | string | number | null;
};

/** The dosing that goes with a drug name (everything except the name). */
export type UsualDosing = Omit<MedicationLine, "drug_name">;

export interface FrequentDrug {
  drug_name: string;
  count: number;
  usual: UsualDosing;
}

const DOSING_FIELDS = [
  "drug_dose",
  "amount",
  "drug_form",
  "route",
  "frequency",
  "duration",
  "interval",
  "instructions",
] as const;

export const drugKey = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, " ");

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const optStr = (v: unknown) => str(v) || null;
const num = (v: unknown) => {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string" && v.trim()
        ? Number(v)
        : NaN;
  return Number.isFinite(n) ? n : NaN;
};

/**
 * Makes rows safe to save:
 * - rows without a drug name are dropped;
 * - text is trimmed; empty optional fields become null;
 * - amount is a whole number ≥ 1 (default 1; the database requires it);
 * - duration is a whole number ≥ 1, or null.
 */
export const cleanMedications = (
  rows: MedicationRowValues[],
): MedicationLine[] =>
  (rows ?? [])
    .filter((r) => str(r?.drug_name))
    .map((r) => {
      const amount = num(r.amount);
      const duration = num(r.duration);
      return {
        drug_name: str(r.drug_name),
        drug_dose: str(r.drug_dose),
        amount: amount >= 1 ? Math.round(amount) : 1,
        drug_form: optStr(r.drug_form),
        route: optStr(r.route),
        frequency: optStr(r.frequency),
        duration: duration >= 1 ? Math.round(duration) : null,
        interval: optStr(r.interval),
        instructions: optStr(r.instructions),
      };
    });

/**
 * Groups past prescription lines by drug (ignoring case/extra spaces). For each
 * drug: how often it was prescribed, its most common spelling, and the most
 * common complete dosing combination. Sorted by count, most used first.
 */
export const summarizeMedications = (
  lines: MedicationRowValues[],
  limit = 300,
): FrequentDrug[] => {
  const byDrug = new Map<
    string,
    {
      count: number;
      names: Map<string, number>;
      combos: Map<string, { n: number; usual: UsualDosing }>;
    }
  >();

  for (const line of cleanMedications(lines)) {
    const key = drugKey(line.drug_name);
    const entry = byDrug.get(key) ?? {
      count: 0,
      names: new Map(),
      combos: new Map(),
    };
    entry.count += 1;
    entry.names.set(line.drug_name, (entry.names.get(line.drug_name) ?? 0) + 1);
    const usual: UsualDosing = {
      drug_dose: line.drug_dose,
      amount: line.amount,
      drug_form: line.drug_form,
      route: line.route,
      frequency: line.frequency,
      duration: line.duration,
      interval: line.interval,
      instructions: line.instructions,
    };
    const comboKey = JSON.stringify(DOSING_FIELDS.map((f) => usual[f] ?? null));
    const combo = entry.combos.get(comboKey) ?? { n: 0, usual };
    combo.n += 1;
    entry.combos.set(comboKey, combo);
    byDrug.set(key, entry);
  }

  const top = <T>(m: Map<T, number>) =>
    [...m.entries()].sort((a, b) => b[1] - a[1])[0][0];

  return [...byDrug.values()]
    .map((e) => ({
      drug_name: top(e.names),
      count: e.count,
      usual: [...e.combos.values()].sort((a, b) => b.n - a.n)[0].usual,
    }))
    .sort((a, b) => b.count - a.count || a.drug_name.localeCompare(b.drug_name))
    .slice(0, limit);
};

const isEmptyValue = (field: keyof UsualDosing, v: unknown) => {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "";
  if (typeof v === "number") {
    if (!Number.isFinite(v)) return true;
    // Amount starts at the default 1 and duration at 0 in a new row.
    if (field === "amount") return v <= 1;
    if (field === "duration") return v <= 0;
  }
  return false;
};

/**
 * Fills a row's EMPTY dosing fields from a drug's usual dosing; never
 * overwrites anything already entered. Returns only the fields to set.
 */
export const applyUsual = (
  row: MedicationRowValues,
  usual: UsualDosing,
): Partial<UsualDosing> => {
  const updates: Partial<UsualDosing> = {};
  for (const f of DOSING_FIELDS) {
    const value = usual[f];
    if (value === null || value === undefined || value === "") continue;
    if (isEmptyValue(f, row[f])) {
      (updates as Record<string, unknown>)[f] = value;
    }
  }
  return updates;
};

/** Short hint for a suggestion, e.g. "1 tab · TABLET · ORAL · BD · 5 DAYS". */
export const formatUsual = (u: UsualDosing) =>
  [
    u.drug_dose,
    u.drug_form?.toUpperCase(),
    u.route?.toUpperCase(),
    u.frequency?.toUpperCase(),
    u.duration
      ? `${u.duration} ${u.interval?.toUpperCase() ?? ""}`.trim()
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

/** An empty row for "Add medication". */
export const emptyMedicationRow = (): MedicationRowValues => ({
  drug_name: "",
  drug_dose: "",
  amount: 1,
  drug_form: "",
  route: "",
  frequency: "",
  duration: null,
  interval: "",
  instructions: "",
});
