import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const drugs = await prisma.genericName.findMany({
    include: {
      brandNames: true,
    },
  });
  if (!drugs) {
    return NextResponse.json({ message: "No drugs found" }, { status: 404 });
  }

  return NextResponse.json(drugs, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { generic_name } = await request.json();

    if (!generic_name) {
      return NextResponse.json(
        { message: "Generic name is required" },
        { status: 400 }
      );
    }

    const newDrug = await prisma.genericName.create({
      data: { generic_name: generic_name.toLowerCase().trim() },
    });

    revalidateTag("drugs");
    revalidatePath("/dashboard/settings/drugsInventory");

    return NextResponse.json(newDrug, { status: 201 });
  } catch (error) {
    console.error("Error creating drug:", error);
    return NextResponse.json(
      { message: "Failed to create drug" },
      { status: 500 }
    );
  }
}
