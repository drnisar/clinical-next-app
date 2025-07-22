import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// GET all templates
export async function GET(request: NextRequest) {
  try {
    console.log(request);
    const templates = await prisma.oT_Templates.findMany();

    return new Response(JSON.stringify(templates), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching templates" }),
      { status: 500 }
    );
  }
}

// POST create new template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const registeredTemplate = await prisma.oT_Templates.findFirst({
      where: {
        template_name: body.template_name,
      },
    });

    if (registeredTemplate) {
      return new Response(
        JSON.stringify({ message: "Template already exists" }),
        { status: 400 }
      );
    }

    const newTemplate = await prisma.oT_Templates.create({
      data: {
        procedure: body.procedure,
        findings: body.findings,
        operative_details: body.operative_details,
        closure: body.closure,
        instructions: body.instructions,
        template_name: body.template_name,
      },
    });

    return new Response(JSON.stringify(newTemplate), { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);
    return new Response(
      JSON.stringify({ message: "Error creating OT Template" }),
      { status: 500 }
    );
  }
}
