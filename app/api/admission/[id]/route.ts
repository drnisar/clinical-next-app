import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Correct type annotation here
) {
  const {
    discharge_date,
    discharge_mode,
    status,
    bed_number,
    ward,
    diagnosis,
    discharge_summary,
    hospital_investigations,
    diagnostic_procedures,
    therapeutic_procedures,
    instructions,
    medical_leave,
    medications,
  } = await req.json();
  const { id } = await params; // Await the promise to get the actual id value
  try {
    // First, check if the admission exists
    const admission = await prisma.admission_Discharge.findUnique({
      where: { admission_id: id },
    });

    if (!admission) {
      return NextResponse.json(
        { message: "Admission not found" },
        { status: 404 }
      );
    }

    // If it exists, proceed with the update
    const updatedAdmission = await prisma.admission_Discharge.update({
      where: { admission_id: id },
      data: {
        discharge_date: discharge_date,
        discharge_mode: discharge_mode,
        status: status,
        bed_number: bed_number,
        ward: ward,
        diagnosis: diagnosis,
        discharge_summary: discharge_summary,
        hospital_investigations: hospital_investigations,
        diagnostic_procedures: diagnostic_procedures,
        therapeutic_procedures: therapeutic_procedures,
        instructions: instructions,
        medical_leave: medical_leave,
        medications: medications,
      },
    });
    revalidatePath("/dashboard/admissions");
    revalidatePath(`/dashboard/admission/${id}`);
    revalidatePath(`/dashboard/discharge/${id}`);
    return NextResponse.json(updatedAdmission, { status: 200 });
  } catch (error) {
    console.error("Error updating admission:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// // Also apply the fix to the GET handler if you uncomment it
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Correct type annotation here
) {
  const { id } = await params; // Await the promise to get the actual id value
  try {
    const admission = await prisma.admission_Discharge.findUnique({
      where: { admission_id: id },
    });

    if (!admission) {
      return NextResponse.json(
        { message: "Admission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(admission, { status: 200 });
  } catch (error) {
    console.error("Error fetching admission:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
