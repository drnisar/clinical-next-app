import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { visit_date, registration_id, clinical_details, instructions } = body;
  try {
    const consultation = await prisma.clinic_Visit.create({
      data: {
        visit_date: new Date(visit_date),
        registration_id: parseInt(registration_id),
        instructions: instructions,
        clinical_details: clinical_details,
      },
    });
    return NextResponse.json(consultation);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
  const consultations = await prisma.clinic_Visit.findMany();
  if (consultations.length === 0) {
    return NextResponse.json(
      { message: "No consultations found" },
      { status: 404 }
    );
  }
  return NextResponse.json(consultations);
};
