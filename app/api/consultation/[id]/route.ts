import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  deriveLegacyFields,
  isNoteDoc,
} from "@/app/dashboard/consultation/_components/clinicalNote/clinicalNote";
interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const consultation = await prisma.consultation.findUnique({
    where: { consultation_id: id },
    include: { registration: true },
  });
  if (!consultation) {
    return NextResponse.json(
      { message: "Consultation not found" },
      { status: 404 },
    );
  }
  // Revalidate paths and tags
  revalidatePath("/dashboard/consultation");
  revalidatePath(`/dashboard/consultation/${id}`);
  revalidatePath(`/dashboard/consultation/today`);
  revalidateTag("consultation");

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
      { status: 404 },
    );
  }
  await prisma.consultation.delete({
    where: { consultation_id: id },
  });
  return NextResponse.json(
    { message: "Consultation deleted successfully" },
    { status: 200 },
  );
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const body = await req.json();
  const { registration_id, visit_date, medications, status, clinical_note } =
    body;
  let { history, examination, investigations, diagnosis, instructions, plan } =
    body;

  // The Clinical Note is the source of truth: when it is sent, store it and
  // overwrite the old separate fields from it, so everything that reads them
  // (print report, registration page, history panel) stays consistent.
  if (clinical_note !== undefined) {
    if (!isNoteDoc(clinical_note)) {
      return NextResponse.json(
        { message: "clinical_note must be a TipTap document" },
        { status: 400 },
      );
    }
    ({ history, examination, investigations, diagnosis, instructions, plan } =
      deriveLegacyFields(clinical_note));
  }
  const { id } = await params;
  const consultation = await prisma.consultation.findUnique({
    where: { consultation_id: id },
  });
  if (!consultation) {
    return NextResponse.json(
      { message: "Consultation not found" },
      { status: 404 },
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
        ...(clinical_note !== undefined && { clinical_note }),
      },
    });

    revalidatePath("/dashboard/consultation");
    revalidatePath(`/dashboard/consultation/${id}`);
    revalidatePath(`/dashboard/consultation/edit/${id}`);
    revalidatePath(`/dashboard/consultation/today`);
    revalidateTag("consultation");
    revalidateTag("consultation-" + id);

    return NextResponse.json(updatedConsultation);
  } catch (error) {
    console.error("Error updating consultation:", error);
    return NextResponse.json(
      {
        message: "Failed to update consultation",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
