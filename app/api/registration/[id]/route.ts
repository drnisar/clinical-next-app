import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Registration ID is required" });
    }
    const reg = await prisma.registration.findUnique({
      where: { registration_id: id },
    });

    if (!reg) {
      return NextResponse.json({ error: "Registration not found" });
    }
    return NextResponse.json(reg);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();

    // Check if registration exists
    const existingReg = await prisma.registration.findUnique({
      where: { registration_id: id },
    });

    if (!existingReg) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Remove age field as it's not stored in database
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { age, ...updateData } = body;

    // Convert date_of_birth to Date object if provided
    if (updateData.date_of_birth) {
      updateData.date_of_birth = new Date(updateData.date_of_birth);

      // Validate the date
      if (isNaN(updateData.date_of_birth.getTime())) {
        return NextResponse.json(
          {
            error: "Invalid date format for date_of_birth",
          },
          { status: 400 }
        );
      }
    }

    const updatedReg = await prisma.registration.update({
      where: { registration_id: id },
      data: updateData,
    });

    // Revalidate cache
    revalidateTag("registrations");
    revalidatePath("/dashboard/registration");

    return NextResponse.json(updatedReg);
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 }
    );
  }
};
