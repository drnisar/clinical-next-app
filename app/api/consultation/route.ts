import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // const validation = await consultationSchema.safeParse(body);

  // if (!validation.success) {
  //   return NextResponse.json(validation.error, { status: 403 });
  // }

  const {
    visit_date,
    registration_id,
    history,
    examination,
    investigations,
    diagnosis,
    instructions,
    clinical_details,
    next_visit_plan,
  } = body;
  try {
    const consultation = await prisma.clinic_Visit.create({
      data: {
        visit_date: new Date(visit_date),
        registration_id: parseInt(registration_id),
        history,
        examination,
        investigations,
        diagnosis,
        instructions,
        clinical_details,
        next_visit_plan,
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
