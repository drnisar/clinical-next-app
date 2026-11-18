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
      investigations: data.investigations ?? [],
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
