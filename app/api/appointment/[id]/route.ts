import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const appointment = await prisma.appointment.findUnique({
    where: { appointment_id: id },
  });
  if (!appointment) {
    return NextResponse.json(
      { message: "Appointment not found" },
      { status: 404 }
    );
  }
  await prisma.appointment.delete({
    where: { appointment_id: id },
  });
  return NextResponse.json({ message: "Appointment deleted" });
};
