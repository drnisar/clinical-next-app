import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const ot = await prisma.oT.findUnique({
      where: {
        ot_id: id,
      },
    });
    if (!ot) {
      return NextResponse.json({ message: "OT not found" }, { status: 404 });
    }
    return NextResponse.json(ot);
  } catch (error) {
    console.error("Error fetching OT:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
