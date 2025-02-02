import prisma from "@/prisma/client";
import { registrationSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = await params.id;

  const reg = await prisma.registration.findUnique({
    where: { registration_id: parseInt(id) },
  });

  if (!reg) {
    return NextResponse.json({ error: "Registration not found" });
  }
  return NextResponse.json(reg);
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = await params.id;

  const body = await req.json();

  const reg = await prisma.registration.findUnique({
    where: { registration_id: parseInt(id) },
  });

  if (!reg) {
    return NextResponse.json({ error: "Registration not found" });
  }

  const validation = registrationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors });
  }

  const updatedReg = await prisma.registration.update({
    where: { registration_id: parseInt(id) },
    data: body,
  });

  return NextResponse.json(updatedReg);
};
