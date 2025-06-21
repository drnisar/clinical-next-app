import { registrationSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Registration ID is required" });
    }
    const reg = await prisma.registration.findUnique({
      where: { registration_id: id },
    });

    if (!reg) {
      return NextResponse.json({ error: "Registration not found" });
    }
    return NextResponse.json(reg);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const body = await req.json();

  const reg = await prisma.registration.findUnique({
    where: { registration_id: id },
  });

  if (!reg) {
    return NextResponse.json({ error: "Registration not found" });
  }

  const validation = registrationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors });
  }

  const updatedReg = await prisma.registration.update({
    where: { registration_id: id },
    data: body,
  });

  return NextResponse.json(updatedReg);
};
