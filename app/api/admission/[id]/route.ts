// import prisma from "@/prisma/client";
// import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

// Remove the Props interface definition if it still exists

// Use the inline type annotation for the second argument
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } } // Correct type annotation here
) {
  const {
    discharge_date,
    discharge_mode,
    status,
    diagnosis,
    discharge_summary,
    hospital_investigations,
    diagnostic_procedures,
    therapeutic_procedures,
    instructions,
    medical_leave,
    medications,
  } = await req.json();

  try {
    // First, check if the admission exists
    const admission = await prisma.admission_Discharge.findUnique({
      where: { admission_id: params.id },
    });

    if (!admission) {
      return NextResponse.json(
        { message: "Admission not found" },
        { status: 404 }
      );
    }

    // If it exists, proceed with the update
    const updatedAdmission = await prisma.admission_Discharge.update({
      where: { admission_id: params.id },
      data: {
        discharge_date: discharge_date,
        discharge_mode: discharge_mode,
        status: status,
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

    // The update operation itself returns the updated record or throws an error
    // No need to check if updatedAdmission exists here unless update can return null
    return NextResponse.json(updatedAdmission, { status: 200 });
  } catch (error) {
    console.error("Error updating admission:", error);
    // Handle potential Prisma errors like record not found during update
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // Prisma code for record not found on update/delete
        return NextResponse.json(
          { message: "Admission not found during update" },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Also apply the fix to the GET handler if you uncomment it
export async function GET(
  req: NextRequest,
  context: { params: { id: string } } // Correct type annotation here
) {
  const { params } = context;
  const request = req;
  if (req) {
    console.log(request);
  }
  try {
    const admission = await prisma.admission_Discharge.findUnique({
      where: { admission_id: params.id },
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
