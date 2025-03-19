import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(req: NextRequest, { params: { id } }: Props) {
  const consultation = await prisma.clinic_Visit.findUnique({
    where: { visit_id: parseInt(id) },
  });
  if (!consultation) {
    return NextResponse.json(
      { message: "Consultation not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(consultation);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const consultation = await prisma.clinic_Visit.findUnique({
    where: { visit_id: parseInt(id) },
  });
  if (!consultation) {
    return NextResponse.json(
      { message: "Consultation not found" },
      { status: 404 }
    );
  }
  await prisma.clinic_Visit.delete({
    where: { visit_id: parseInt(id) },
  });
  return NextResponse.json(
    { message: "Consultation deleted successfully" },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const {
    registration_id,
    clinical_details,
    history,
    examination,
    investigations,
    diagnosis,
    visit_date,
    instructions,
  } = await req.json();

  const consultation = await prisma.clinic_Visit.findUnique({
    where: { visit_id: parseInt(id) },
  });
  if (!consultation) {
    return NextResponse.json(
      { message: "Consultation not found" },
      { status: 404 }
    );
  }

  try {
    const updatedConsultation = await prisma.clinic_Visit.update({
      where: { visit_id: parseInt(id) },
      data: {
        registration_id: parseInt(registration_id),
        clinical_details,
        history,
        examination,
        investigations,
        diagnosis,
        instructions,
        visit_date,
      },
    });

    return NextResponse.json(updatedConsultation);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
