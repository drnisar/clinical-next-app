import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const meds = await prisma.consultationMedications.findMany({
      where: {
        visit_id: parseInt(id),
      },
    });

    return NextResponse.json(meds, { status: 200 });
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

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      throw new Error("Request must be an array");
    }

    body.map((med) => {
      prisma.consultationMedications.update({
        where: { consult_med_id: med.consult_med_id },
        data: med,
      });
    });
    return NextResponse.json(
      { message: "Medications updated" },
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
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const consult_med_id = url.searchParams.get("consult_med_id");
    if (!consult_med_id) {
      throw new Error("consult_med_id is required");
    }
    await prisma.consultationMedications.delete({
      where: { consult_med_id: parseInt(consult_med_id) },
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
}
