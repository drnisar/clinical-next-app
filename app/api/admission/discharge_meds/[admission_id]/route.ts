import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { admission_id: string } }
) => {
  const { admission_id } = await params;
  try {
    const dischargeMeds = await prisma.discharge_Medications.findMany({
      where: {
        admission_id: parseInt(admission_id),
      },
    });
    if (!dischargeMeds) {
      return NextResponse.json(
        { message: "No medications found" },
        { status: 404 }
      );
    }
    return NextResponse.json(dischargeMeds, { status: 200 });
  } catch (error) {
    console.error("Detailed error:", JSON.stringify(error, null, 2));

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
