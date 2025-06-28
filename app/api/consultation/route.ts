import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { visit_date, registration_id, instructions } = body;
  try {
    const consultation = await prisma.consultation.create({
      data: {
        visit_date: new Date(visit_date),
        registration_id: registration_id,
        instructions: instructions,
      },
    });
    revalidatePath("/dashboard/consultation");
    return NextResponse.json(consultation);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
  const consultations = await prisma.consultation.findMany();
  if (consultations.length === 0) {
    return NextResponse.json(
      { message: "No consultations found" },
      { status: 404 }
    );
  }
  return NextResponse.json(consultations);
};
