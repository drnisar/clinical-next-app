import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const { id } = params;

    if (!body) {
      return NextResponse.json(
        { message: "ID and generic name are required" },
        { status: 400 }
      );
    }

    const updatedDrug = await prisma.genericName.update({
      where: { generic_id: id },
      data: {
        brandNames: body.brandNames,
      },
    });

    revalidateTag("drugs");
    revalidatePath("/dashboard/settings/drugsInventory");

    return NextResponse.json(updatedDrug, { status: 200 });
  } catch (error) {
    console.error("Error updating drug:", error);
    return NextResponse.json(
      { message: "Failed to update drug" },
      { status: 500 }
    );
  }
};
