import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/app/validationSchemas";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const regs = await prisma.registration.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      Appointment: true,
      Consultation: true,
      Admission_Discharge: true,
      OT: true,
    },
  });
  if (!regs) {
    return NextResponse.json({ message: "No registration found" });
  }
  return NextResponse.json(regs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = registrationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Invalid data",
        error: validation.error.errors,
      },
      { status: 400 }
    );
  }

  const {
    first_name,
    last_name,
    gender,
    code,
    phone_number,
    mr_number,
    date_of_birth,
  } = body;

  // Helper function to convert date string to Date object
  const parseDate = (dateString: string | null | undefined): Date | null => {
    if (!dateString) return null;

    try {
      // If it's already a valid date string like "1979-09-30"
      const date = new Date(dateString);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      return date;
    } catch (error) {
      console.error("Date parsing error:", error);
      return null;
    }
  };

  try {
    const parsedDateOfBirth = parseDate(date_of_birth);

    const newRegistration = await prisma.registration.create({
      data: {
        first_name,
        last_name,
        gender,
        code,
        phone_number,
        mr_number,
        date_of_birth: parsedDateOfBirth,
      },
    });

    revalidateTag("registrations");
    revalidateTag("registration");
    revalidatePath("/dashboard/registration");

    return NextResponse.json(newRegistration, { status: 201 });
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 }
    );
  }
}
