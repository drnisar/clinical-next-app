import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Changed export syntax
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
        status: { not: "DISCHARGED" }, // Adjust if your final status differs
      },
    });
    if (existingActiveAdmission) {
      return NextResponse.json(
        { error: "Patient is already admitted and not discharged" },
        { status: 409 } // Conflict
      );
    }

    // --- Create New Admission ---
    // Be specific about the data you pass to create
    const newAdmission = await prisma.admission_Discharge.create({
      data: {
        registration_id: registrationId,
        status: "ADMITTED", // Set initial status explicitly
        admission_date: new Date(),
        ward: body.ward,
        bed_number: body.bed_number,
        admission_mode: body.admission_mode,
        admission_plan: body.admission_plan,
        // Only include fields from 'body' that are valid for creation
        // Example: admission_mode: body.admission_mode,
        // Avoid passing the whole 'body' if it contains extra fields
      },
    });
    revalidatePath("/dashboard/admissions");
    // --- Success Response ---
    // FIX: Use NextResponse.json here
    return NextResponse.json(newAdmission, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Error creating admission:", error);
  }
}

// Corrected GET handler for this non-dynamic route
// This will fetch ALL admissions, or you can filter by query params
export async function GET() {
  // No second 'params' argument here
  try {
    // Example: Check for a query parameter like /api/admission?registration_id=123

    const admissions = await prisma.admission_Discharge.findMany({
      orderBy: {
        // Optional: order results
        admission_date: "desc",
      },
    });

    // It's okay if findMany returns an empty array, not necessarily an error
    return NextResponse.json(admissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching admissions:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch admissions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
