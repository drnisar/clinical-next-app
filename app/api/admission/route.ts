import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // --- Validation ---
    if (!body.registration_id) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }
    const registrationId = body.registration_id;

    // --- Check if Registration Exists ---
    const registration = await prisma.registration.findUnique({
      where: { registration_id: registrationId },
    });
    if (!registration) {
      return NextResponse.json(
        { error: `Registration with ID ${registrationId} not found` },
        { status: 404 }
      );
    }

    // --- Check for Existing Active Admission ---
    const existingActiveAdmission = await prisma.admission_Discharge.findFirst({
      where: {
        registration_id: registrationId,
        status: { not: "DISCHARGED" },
      },
    });
    if (existingActiveAdmission) {
      return NextResponse.json(
        { error: "Patient is already admitted and not discharged" },
        { status: 409 }
      );
    }

    // Use transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (prisma) => {
      // Create admission first
      const newAdmission = await prisma.admission_Discharge.create({
        data: {
          registration_id: registrationId,
          status: "ADMITTED",
          admission_date: new Date(),
          ward: body.ward,
          bed_number: body.bed_number,
          admission_mode: body.admission_mode,
          admission_plan: body.admission_plan,
        },
      });

      // Create location using the admission_id from newAdmission
      const newLocation = await prisma.admitted_Location.create({
        data: {
          admission_id: newAdmission.admission_id,
          registration_id: newAdmission.registration_id,
          ward: body.ward,
          bed_no: body.bed_number,
        },
      });

      return {
        admission: newAdmission,
        location: newLocation,
      };
    });

    revalidatePath("/dashboard/admissions");

    return NextResponse.json(
      {
        message: "Admission created successfully",
        admission: result.admission,
        location: result.location,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admission:", error);
    return NextResponse.json(
      {
        error: "Failed to create admission",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
