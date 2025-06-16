import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

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
