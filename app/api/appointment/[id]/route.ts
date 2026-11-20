import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isObjectId } from "@/lib/objectId";
import { revalidatePath } from "next/cache";
import { appointmentUpdateSchema } from "@/app/validationSchemas";

const notFound = () =>
  NextResponse.json({ message: "Appointment not found" }, { status: 404 });

const revalidateAppointmentPages = () => {
  revalidatePath("/dashboard/consultation/edit", "page");
  revalidatePath("/dashboard/registration/[id]", "page");
  revalidatePath("/dashboard/appointments");
  revalidatePath("/dashboard");
};

/**
 * Update an appointment's status, or reschedule it by giving a new date.
 * A new date without a status puts the appointment back to PENDING, since
 * whatever happened on the old date (no show, cancelled…) no longer applies.
 */
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  if (!isObjectId(id)) return notFound();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
  const validation = appointmentUpdateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Validation error", errors: validation.error.flatten() },
      { status: 400 }
    );
  }
  const { status, date_appointment, plan, notes } = validation.data;

  try {
    const existing = await prisma.appointment.findUnique({
      where: { appointment_id: id },
      select: { appointment_id: true },
    });
    if (!existing) return notFound();

    const appointment = await prisma.appointment.update({
      where: { appointment_id: id },
      data: {
        ...(date_appointment !== undefined && {
          date_appointment: new Date(date_appointment),
          status: "PENDING",
        }),
        ...(status !== undefined && { status }),
        ...(plan !== undefined && { plan }),
        ...(notes !== undefined && { notes }),
      },
    });
    revalidateAppointmentPages();
    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error updating appointment", error);
    return NextResponse.json(
      { message: "Error updating appointment" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  if (!isObjectId(id)) return notFound();

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { appointment_id: id },
      select: { appointment_id: true },
    });
    if (!appointment) return notFound();

    await prisma.appointment.delete({ where: { appointment_id: id } });
    revalidateAppointmentPages();
    return NextResponse.json({ message: "Appointment deleted" });
  } catch (error) {
    console.error("Error deleting appointment", error);
    return NextResponse.json(
      { message: "Error deleting appointment" },
      { status: 500 }
    );
  }
};
