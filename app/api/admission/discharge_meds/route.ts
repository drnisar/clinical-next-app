import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      admission_id,
      med_name,
      quantity,
      drug_form,
      frequency,
      route,
      duration,
      interval,
      instructions,
    } = await req.json();
    const newMed = await prisma.discharge_Medications.create({
      data: {
        admission_id,
        med_name,
        quantity,
        drug_form,
        frequency,
        route,
        duration,
        interval,
        instructions,
      },
    });
    return NextResponse.json(
      { message: "Medications added", newMed },
      { status: 201 }
    );
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
}

export const DELETE = async (req: NextRequest) => {
  const { dc_meds_id } = await req.json();
  try {
    // find the medication by id
    const med = await prisma.discharge_Medications.findUnique({
      where: { dc_meds_id: parseInt(dc_meds_id) },
    });
    if (!med) {
      return NextResponse.json(
        { message: "Medication not found" },
        { status: 404 }
      );
    }
    // delete the medication
    await prisma.discharge_Medications.delete({
      where: { dc_meds_id: parseInt(dc_meds_id) },
    });
    return NextResponse.json(
      { message: "Medication deleted" },
      { status: 200 }
    );
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
