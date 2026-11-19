import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { todayRangePKT } from "@/lib/dates";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  // Today in Pakistan, not the server's (UTC on Vercel) day.
  const { start, end } = todayRangePKT();

  const todaysConsults = await prisma.consultation.findMany({
    where: {
      visit_date: {
        gte: start,
        lt: end,
      },
      registration_id: id,
    },
  });
  return NextResponse.json(todaysConsults);
}
