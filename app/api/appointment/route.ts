import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const appointments = await prisma.appointment.findMany({
    include: {
      Registration: {
        select: {},
      },
    },
  });
  if (!appointments || appointments.length === 0) {
    return NextResponse.json({ message: "No appointments found" });
  }
  return NextResponse.json(appointments);
};
