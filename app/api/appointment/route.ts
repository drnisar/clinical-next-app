import { appointmentSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

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
  const body = await req.json();

  const registration = await prisma.registration.findUnique({
    where: { registration_id: body.registration_id },
  });

  if (!registration) {
    return NextResponse.json(
      { message: "Registration not found" },
      { status: 404 }
    );
  }

  const validation = appointmentSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Validation error", errors: validation.error },
      { status: 400 }
    );
  }

  const appointment = await prisma.appointment.create({
    data: {
      registration_id: body.registration_id,
      date_appointment: new Date(body.date_appointment),
      plan: body.plan,
      notes: body.notes,
      type: body.type, // Add the missing 'type' property
    },
  });

  return NextResponse.json(appointment);
};
