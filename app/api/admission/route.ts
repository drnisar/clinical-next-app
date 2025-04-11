import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    // Validate request body
    if (!body.registration_id) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    // Check if registration exists
    const registration = await prisma.registration.findUnique({
      where: { registration_id: body.registration_id },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }
    const newAdmission = await prisma.admission_Discharge.create({
      data: body,
    });
    if (newAdmission) {
      return {
        status: 201,
        body: newAdmission,
      };
    }
    return {
      status: 400,
      body: { message: "Unable to create new admission" },
    };
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { registration_id: string } }
) => {
  const { registration_id } = await params;
  try {
    const admissions = await prisma.admission_Discharge.findMany({
      where: { registration_id: parseInt(registration_id) },
    });
    if (!admissions) {
      return NextResponse.json({
        message: "No admissions found for this registration",
      });
    }
    return NextResponse.json(admissions);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
