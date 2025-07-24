import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const template = await request.json();
  const { template_name, meds } = template;
  if (!template_name || !meds) {
    return new Response("Template name and medications are required", {
      status: 400,
    });
  }
  const alreadyExists = await prisma.medsTemplate.findFirst({
    where: {
      template_name: template_name,
    },
  });
  if (alreadyExists) {
    return new Response("Template with this name already exists", {
      status: 409,
    });
  }
  try {
    const newTemplate = await prisma.medsTemplate.create({
      data: template,
    });

    revalidatePath("/dashboard/meds_templates");
    revalidatePath("/dashboard/discharge", "layout");
    if (!newTemplate) {
      return new Response("Failed to create template", { status: 500 });
    }
    return new Response(JSON.stringify(newTemplate), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating template:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
