import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const medications = await prisma.drugs_list.findMany();

  return NextResponse.json(medications);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    console.log(body);
    const medication = await prisma.drugs_list.create({
      data: body,
    });
    return NextResponse.json(medication);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
