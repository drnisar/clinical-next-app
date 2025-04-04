import prisma from "@/prisma/client";
import { Admission_Discharge } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type discharge = Admission_Discharge;

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  //   const { id } = await params;
  const { discharge_date, discharge_mode, status } = await req.json();

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
