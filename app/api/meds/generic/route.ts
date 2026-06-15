import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { generic_name } = await request.json();

  if (!generic_name) {
    throw new Error("Generic name is required");
  }

  const newGeneric = await prisma.genericName.create({
    data: { generic_name },
  });
  return NextResponse.json(newGeneric, { status: 201 });
}
