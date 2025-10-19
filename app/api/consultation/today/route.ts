import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  const consultations = await prisma.consultation.findMany({
    where: {
      visit_date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: [{ status: "desc" }, { visit_date: "asc" }],
    include: {
      registration: true, // Include registration details
    },
  });
  if (consultations.length === 0) {
    return NextResponse.json(
      { message: "No consultations found" },
      { status: 404 }
    );
  }
  return NextResponse.json(consultations);
}
