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
    return NextResponse.json({
      message: "Invalid data",
      error: validation.error.errors,
    });
  }
  const { first_name, last_name, gender, code, phone_number, mr_number } = body;
  const newRegistration = await prisma.registration.create({
    data: {
      first_name,
      last_name,
      gender,
      code,
      phone_number,
      mr_number,
    },
  });
  revalidateTag("registrations");
  revalidateTag("registration");
  revalidatePath("https://clinical-next-app.vercel.app/dashboard/registration");

  return NextResponse.json(newRegistration, { status: 201 });
}
