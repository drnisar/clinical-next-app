import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  //   const { id } = await params;
  const {
    discharge_date,
    discharge_mode,
    status,
    discharge_summary,
    hospital_investigations,
    diagnostic_procedures,
    therapeutic_procedures,
    instructions,
    medical_leave,
  } = await req.json();

  try {
    const admission = await prisma.admission_Discharge.findUnique({
      where: { admission_id: parseInt(params.id) },
    });
    if (!admission) {
      return NextResponse.json(
        { message: "Admission not found" },
        { status: 404 }
      );
    }
    const updatedAdmission = await prisma.admission_Discharge.update({
      where: { admission_id: parseInt(params.id) },
      data: {
        discharge_date: discharge_date,
        discharge_mode: discharge_mode,
        status: status,
        discharge_summary: discharge_summary,
        hospital_investigations: hospital_investigations,
        diagnostic_procedures: diagnostic_procedures,
        therapeutic_procedures: therapeutic_procedures,
        instructions: instructions,
        medical_leave: medical_leave,
      },
    });

    if (updatedAdmission) {
      return NextResponse.json(updatedAdmission, { status: 200 });
    }

    return NextResponse.json(
      { message: "Admission not found" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const admission = await prisma.admission_Discharge.findUnique({
    where: { admission_id: parseInt(id) },
  });
  if (!admission) {
    return NextResponse.json(
      { message: "Admission not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(admission, { status: 200 });
};
