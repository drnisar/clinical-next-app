import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
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
