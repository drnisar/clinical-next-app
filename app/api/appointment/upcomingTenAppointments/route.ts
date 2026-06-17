import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    console.log("Fetching upcoming appointments...", req.url);
    const appointments = await prisma.appointment.findMany({
      include: {
        registration: {
          select: { registration_id: true },
        },
      },
      where: {
        date_appointment: {
          gte: new Date(), // Fetch appointments from today onwards
        },
      },
      orderBy: {
        date_appointment: "asc", // Order by appointment date ascending
      },
      take: 10, // Limit to the next 10 appointments
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
      { status: 500 },
    );
  }
};
