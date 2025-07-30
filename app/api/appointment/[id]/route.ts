import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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
  revalidatePath(`/dashboard/consultation/edit`, "page");
  revalidatePath("/dashboard/appointments");
  revalidatePath(`/appointment/${appointment.appointment_id}`);
  return NextResponse.json({ message: "Appointment deleted" });
};
