import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { message: "ID and generic name are required" },
        { status: 400 }
      );
    }

    const updatedDrug = await prisma.genericName.update({
      where: { generic_id: body.generic_id },
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
}
