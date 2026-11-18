"use client";
import React, { useEffect, useState } from "react";

interface Props {
  mr_number: string;
}

// Shapes returned by HMIS Patient-Clinical-History (via /api/notes).
// Dates are local-time ISO strings without a zone, e.g. "2026-11-17T10:30:00".
export type HMISPhysicianNote = {
  noteId: string;
  notesDate: string;
  writerUserName: string;
  clinicDesc: string;
  noteType: string;
  notes: string;
};

export type HMISLabResult = {
  parameterId: string;
  parameterName: string;
  resultValue: string;
  resultNumeric: number | null; // most numeric lab values arrive here only
  resultText: string;
  normal: string; // "Y" = within range, "N" = abnormal
  rangeText: string;
  reportDate: string;
};

export type HMISInvestigation = {
  ocptKey: string;
  orderNo: string;
  investigationName: string;
  departmentName: string;
  investigationType: string;
  trnDate: string;
  reportDate: string;
  reportAvailable: string;
  results: HMISLabResult[] | null;
};

export type HMISClinicalHistory = {
  physicianNotes: HMISPhysicianNote[];
  investigations: HMISInvestigation[];
};

const EMPTY_HISTORY: HMISClinicalHistory = {
  physicianNotes: [],
  investigations: [],
};

// HMIS repeats lab parameters within a report: exact copies, and copies that
// differ only in rangeText (it attaches every reference range it has). Within
// one parameter + reportDate the value is always the same, so keep one row per
// parameter per report time: first non-empty rangeText, and "N" (abnormal) if
// any copy is flagged. Genuine repeat measurements (different reportDate) stay
// as separate rows. Order: parameters as HMIS first lists them; a parameter's
// repeat measurements newest first.
export function dedupeLabResults(results: HMISLabResult[]): HMISLabResult[] {
  const byParam = new Map<string, Map<string, HMISLabResult>>();
  for (const r of results) {
    const times =
      byParam.get(r.parameterId) ?? new Map<string, HMISLabResult>();
    byParam.set(r.parameterId, times);
    const kept = times.get(r.reportDate);
    if (!kept) {
      times.set(r.reportDate, { ...r });
      continue;
    }
    if (!kept.rangeText?.trim() && r.rangeText?.trim()) {
      kept.rangeText = r.rangeText;
    }
    if (r.normal === "N") kept.normal = "N";
  }
  return [...byParam.values()].flatMap((times) =>
    [...times.values()].sort((a, b) =>
      (b.reportDate ?? "").localeCompare(a.reportDate ?? ""),
    ),
  );
}

// HMIS can return the same note once per patient location (identical noteId,
// text, author and date; only the location fields differ). Keep the first copy.
// Notes without a noteId are always kept.
export function dedupeByNoteId(notes: HMISPhysicianNote[]) {
  const seen = new Set<string>();
  return notes.filter((note) => {
    if (!note.noteId) return true;
    if (seen.has(note.noteId)) return false;
    seen.add(note.noteId);
    return true;
  });
}

export async function fetchPatientClinicalHistory(
  mrn: string,
): Promise<HMISClinicalHistory> {
  // HMIS MRNs have no dash: drop the 4th character (e.g. "123-456789" -> "123456789").
  const mrnPrefix = mrn.substring(0, 3);
  const mrnSuffix = mrn.substring(4, mrn.length);
  const newMRN = `${mrnPrefix}${mrnSuffix}`;

  try {
    const res = await fetch(`/api/notes?mrno=${encodeURIComponent(newMRN)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      physicianNotes: dedupeByNoteId(data.physicianNotes ?? []),
      investigations: ((data.investigations ?? []) as HMISInvestigation[]).map(
        (inv) => ({
          ...inv,
          results: inv.results ? dedupeLabResults(inv.results) : inv.results,
        }),
      ),
    };
  } catch (error) {
    console.error("Error fetching HMIS clinical history:", error);
    return EMPTY_HISTORY;
  }
}

const HMISNotes = ({ mr_number }: Props) => {
  const [physicianNotesFromHMIS, setPhysicianNotesFromHMIS] = useState<
    HMISPhysicianNote[]
  >([]);

  useEffect(() => {
    // Fetch physician notes when the component mounts
    fetchPatientClinicalHistory(mr_number).then(({ physicianNotes }) => {
      setPhysicianNotesFromHMIS(physicianNotes);
    });
  }, [mr_number]);

  const specificNoteFromIBPClinic = physicianNotesFromHMIS.find(
    (note) => note.clinicDesc === "IBP NISAR AHMAD",
  );

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      {specificNoteFromIBPClinic?.notes ??
        "No physician notes available from HMIS."}
    </div>
  );
};

export default HMISNotes;
