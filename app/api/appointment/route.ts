import { appointmentSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isObjectId } from "@/lib/objectId";
import { revalidatePath } from "next/cache";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        registration: {
          select: { registration_id: true },
        },
      },
    });
    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ message: "No appointments found" });
    }
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments", error);
    return NextResponse.json(
      {
        message: "Error fetching appointments",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const validation = appointmentSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Validation error", errors: validation.error.flatten() },
      { status: 400 }
    );
  }
  const { registration_id, date_appointment, plan, notes, type } =
    validation.data;

  if (!isObjectId(registration_id)) {
    return NextResponse.json(
      { message: "Registration not found" },
      { status: 404 }
    );
  }

  try {
    const registration = await prisma.registration.findUnique({
      where: { registration_id },
      select: { registration_id: true },
    });
    if (!registration) {
      return NextResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        registration_id,
        date_appointment: new Date(date_appointment),
        plan,
        notes: notes ?? "",
        type,
      },
    });

    revalidatePath("/dashboard/appointments");
    revalidatePath("/dashboard/consultation/edit", "page");

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error creating appointment", error);
    return NextResponse.json(
      { message: "Error creating appointment" },
      { status: 500 }
    );
  }
};
