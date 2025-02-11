import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const appointment = await prisma.appointment.findUnique({
    where: { appointment_id: parseInt(id) },
  });
  if (!appointment) {
    return NextResponse.json(
      { message: "Appointment not found" },
      { status: 404 }
    );
  }
  await prisma.appointment.delete({
    where: { appointment_id: parseInt(id as string) },
  });
  return NextResponse.json({ message: "Appointment deleted" });
};
