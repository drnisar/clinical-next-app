import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newOTNotes = await prisma.oT.create({
    data: {
      admission_id: body.admission_id,
      surgery_date: new Date(),
      registration_id: body.registration_id,
    },
  });
  if (!newOTNotes) {
    return NextResponse.json(
      { message: "Error creating OT Notes" },
      { status: 500 }
    );
  }
  return NextResponse.json(newOTNotes, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const {
    ot_id,
    admission_id,
    surgery_date,
    surgeon,
    assistant_1,
    assistant_2,
    assistant_3,
    anaesthetist,
    anaesthesia,
    findings,
    operative_details,
    closure,
    postop_instructions,
    procedure_name,
    finalize,
  } = await request.json();

  try {
    const otNotes = await prisma.oT.update({
      where: {
        ot_id: ot_id,
      },
      data: {
        admission_id,
        surgery_date: new Date(surgery_date),
        surgeon,
        assistant_1,
        assistant_2,
        assistant_3,
        anaesthetist,
        anaesthesia,
        findings,
        operative_details,
        closure,
        postop_instructions,
        procedure_name,
        finalize,
      },
    });
    return NextResponse.json(otNotes);
  } catch (error) {
    return NextResponse.json(error);
  }
}
