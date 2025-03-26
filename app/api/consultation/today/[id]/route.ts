import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
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

  const todaysConsults = await prisma.clinic_Visit.findMany({
    where: {
      visit_date: {
        gte: startOfDay,
        lt: endOfDay,
      },
      registration_id: parseInt(id),
    },
  });
  return NextResponse.json(todaysConsults);
}
