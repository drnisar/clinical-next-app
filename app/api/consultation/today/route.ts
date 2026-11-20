import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { todayRangePKT } from "@/lib/dates";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // Today in Pakistan, not the server's (UTC on Vercel) day.
  const { start, end } = todayRangePKT();
  const consultations = await prisma.consultation.findMany({
    where: {
      visit_date: {
        gte: start,
        lt: end,
      },
    },
    orderBy: [{ status: "desc" }, { visit_date: "asc" }],
    include: {
      registration: true, // Include registration details
    },
  });
  // An empty queue is a normal answer, not an error.
  return NextResponse.json(consultations);
}
