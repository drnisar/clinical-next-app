import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const visit_id = parseInt(params.id);

    if (isNaN(visit_id)) {
      return NextResponse.json(
        { error: "Invalid visit ID format" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        visit_id: visit_id,
      },
    });

    if (!appointment) {
      // Return empty result but NEVER return null directly
      return NextResponse.json(
        { message: "No appointment found" },
        { status: 404 }
      );
    }

    // Return the appointment data
    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: visit_id } = await params;
  const appointmentForDeletion = await prisma.appointment.findFirst({
    where: { visit_id: parseInt(visit_id) },
  });
  if (!appointmentForDeletion) {
    return NextResponse.json(
      { message: "No appointment found" },
      { status: 404 }
    );
  }
  const deletedAppointment = await prisma.appointment.delete({
    where: { appointment_id: appointmentForDeletion.appointment_id },
  });
  return NextResponse.json(deletedAppointment);
}
