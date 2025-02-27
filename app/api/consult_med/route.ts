import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      visit_id,
      drug_name,
      quantity,
      drug_form,
      frequency,
      route,
      duration,
      interval,
      instructions,
    } = await req.json();
    const newMed = await prisma.consultationMedications.create({
      data: {
        visit_id,
        drug_name,
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
