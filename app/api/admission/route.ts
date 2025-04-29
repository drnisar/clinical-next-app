import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client"; // Import Prisma namespace for error handling
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
    const registrationId = parseInt(body.registration_id);
    if (isNaN(registrationId)) {
      return NextResponse.json(
        { error: "Invalid Registration ID format" },
        { status: 400 }
      );
    }

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

    // --- Success Response ---
    // FIX: Use NextResponse.json here
    return NextResponse.json(newAdmission, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Error creating admission:", error);
    // Refined error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific errors if needed
      if (error.code === "P2002") {
        // Unique constraint violation
        return NextResponse.json(
          {
            error: "Unique constraint violation, possibly duplicate data.",
            details: error.message,
          },
          { status: 409 } // Conflict
        );
      }
    }
    // Generic Error Response
    return NextResponse.json(
      {
        error: "Failed to create admission",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Corrected GET handler for this non-dynamic route
// This will fetch ALL admissions, or you can filter by query params
export async function GET(request: NextRequest) {
  // No second 'params' argument here
  try {
    // Example: Check for a query parameter like /api/admission?registration_id=123
    const searchParams = request.nextUrl.searchParams;
    const registrationIdParam = searchParams.get("registration_id");

    let whereClause = {}; // Default: no filter

    if (registrationIdParam) {
      const registrationId = parseInt(registrationIdParam);
      if (!isNaN(registrationId)) {
        whereClause = { registration_id: registrationId };
      } else {
        // Optional: return error if param is present but invalid
        // return NextResponse.json({ error: "Invalid registration_id query parameter" }, { status: 400 });
      }
    }

    const admissions = await prisma.admission_Discharge.findMany({
      where: whereClause,
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
