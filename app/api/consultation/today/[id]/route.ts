import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const todaysConsults = await prisma.consultation.findMany({
    where: {
      visit_date: {
        gte: startOfDay,
        lt: endOfDay,
      },
      registration_id: id,
    },
  });
  return NextResponse.json(todaysConsults);
}
