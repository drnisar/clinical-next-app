import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { templateName, medsArrayTemplate } = await request.json();

    if (!templateName || !Array.isArray(medsArrayTemplate)) {
      return NextResponse.json(
        { error: "Invalid template data" },
        { status: 400 }
      );
    }

    const newTemplate = await prisma.medsTemplates.create({
      data: {
        templateName,
        medsArrayTemplate: medsArrayTemplate, // Prisma automatically handles JSON conversion
      },
    });

    return NextResponse.json({ data: newTemplate }, { status: 201 });
  } catch (error) {
    console.error("Template creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const templates = await prisma.medsTemplates.findMany({
    orderBy: { templateName: "asc" },
  });
  return NextResponse.json(templates);
}
