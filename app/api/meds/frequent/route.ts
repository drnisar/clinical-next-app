import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { summarizeMedications } from "@/app/dashboard/_components/medications/medicationHelpers";

// Drugs you prescribe most, with their usual dosing, from past consultations
// and discharges. Only the medications field is read (no patient data).
// Cached for an hour; requires login like every /api route (middleware).
const getFrequentMeds = unstable_cache(
  async () => {
    const [consultations, admissions] = await Promise.all([
      prisma.consultation.findMany({ select: { medications: true } }),
      prisma.admission_Discharge.findMany({ select: { medications: true } }),
    ]);
    const lines = [...consultations, ...admissions].flatMap(
      (r) => r.medications ?? [],
    );
    return summarizeMedications(lines);
  },
  ["meds-frequent"],
  { tags: ["meds-frequent"], revalidate: 3600 },
);

export async function GET() {
  try {
    return NextResponse.json(await getFrequentMeds());
  } catch (error) {
    console.error("Failed to load frequent medications:", error);
    return NextResponse.json(
      { message: "Failed to load medication suggestions" },
      { status: 500 },
    );
  }
}
