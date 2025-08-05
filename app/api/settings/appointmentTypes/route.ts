import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const newAppointment = await prisma.appointmentType.create({
    data: {
      name: body.name,
      value: body.value,
    },
  });

  if (!newAppointment) {
    return new Response("Failed to create appointment type", { status: 500 });
  }

  return NextResponse.json(newAppointment, {
    status: 201,
  });
};

// export const GET = async (req: NextRequest) => {
//   console.log("Fetching appointment types...", req.url);
//   const appointmentTypes = await prisma.appointmentType.findMany({
//     orderBy: {
//       name: "asc",
//     },
//   });

//   return NextResponse.json(appointmentTypes);
// };

export const GET = async (req: NextRequest) => {
  try {
    const appointmentTypes = await prisma.appointmentType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(appointmentTypes);
  } catch (error) {
    console.error("Error fetching appointment types:", error);
    console.log(req);
    return NextResponse.json(
      { error: "Failed to fetch appointment types" },
      { status: 500 }
    );
  }
};
