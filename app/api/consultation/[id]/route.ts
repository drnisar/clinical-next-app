import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const consultation = await prisma.consultation.findUnique({
    where: { consultation_id: id },
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
  const consultation = await prisma.consultation.findUnique({
    where: { consultation_id: id },
  });
  if (!consultation) {
    return NextResponse.json(
      { message: "Consultation not found" },
      { status: 404 }
    );
  }
  await prisma.consultation.delete({
    where: { consultation_id: id },
  });
  return NextResponse.json(
    { message: "Consultation deleted successfully" },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const {
    registration_id,
    history,
    examination,
    investigations,
    diagnosis,
    visit_date,
    instructions,
    plan,
    medications,
    status,
  } = await req.json();
  const { id } = await params;
  const consultation = await prisma.consultation.findUnique({
    where: { consultation_id: id },
  });
  if (!consultation) {
    return NextResponse.json(
      { message: "Consultation not found" },
      { status: 404 }
    );
  }

  try {
    const updatedConsultation = await prisma.consultation.update({
      where: { consultation_id: id },
      data: {
        registration_id,
        history,
        examination,
        investigations,
        diagnosis,
        instructions,
        visit_date,
        plan,
        medications,
        status,
      },
    });

    return NextResponse.json(updatedConsultation);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
