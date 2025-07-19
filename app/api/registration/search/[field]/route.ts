import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ field: string }> }
) => {
  try {
    const { field } = await params;
    if (!field) {
      return NextResponse.json({ error: "MR Number field is required" });
    }
    const reg = await prisma.registration.findMany({
      where: { mr_number: field },
    });

    if (!reg) {
      return NextResponse.json({ error: "Registration not found" });
    }
    return NextResponse.json(reg);
  } catch (error) {
    return NextResponse.json(error);
  }
};
