import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/app/validationSchemas";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const regs = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
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

  return NextResponse.json(newRegistration, { status: 201 });
}
