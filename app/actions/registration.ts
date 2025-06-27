"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const registrationSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters"),
  gender: z.string().min(1, "Please select a gender"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
  code: z.string().min(1, "Please select a country code"),
  mr_number: z
    .string()
    .min(1, "MR number is required")
    .min(3, "MR number must be at least 3 characters"),
});

export async function createRegistration(
  prevState: unknown,
  formData: FormData
) {
  try {
    // Debug: Log the form data
    console.log("Form data received:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      gender: formData.get("gender") as string,
      phone_number: formData.get("phone_number") as string,
      code: formData.get("code") as string,
      mr_number: formData.get("mr_number") as string,
    };

    console.log("Raw data:", rawData);

    // Validate data
    const validatedData = registrationSchema.parse(rawData);
    console.log("Validated data:", validatedData);

    // Create registration
    const registration = await prisma.registration.create({
      data: validatedData,
    });

    revalidatePath("/dashboard/registration");

    return {
      success: true,
      message: "Registration created successfully",
      data: registration,
      errors: {},
    };
  } catch (error) {
    console.error("Registration creation error:", error);

    if (error instanceof z.ZodError) {
      console.log("Validation errors:", error.flatten().fieldErrors);
      return {
        success: false,
        message: "Validation failed",
        data: null,
        errors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create registration",
      data: null,
      errors: {},
    };
  }
}

export async function updateRegistration(
  registrationId: string,
  prevState: unknown,
  formData: FormData
) {
  try {
    // Debug: Log the form data
    console.log("Update form data received:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      gender: formData.get("gender") as string,
      phone_number: formData.get("phone_number") as string,
      code: formData.get("code") as string,
      mr_number: formData.get("mr_number") as string,
    };

    console.log("Raw data:", rawData);

    // Validate data
    const validatedData = registrationSchema.parse(rawData);

    // Update registration
    const registration = await prisma.registration.update({
      where: { registration_id: registrationId },
      data: validatedData,
    });

    revalidatePath("/dashboard/registration");
    revalidatePath(`/dashboard/registration/edit/${registrationId}`);

    return {
      success: true,
      message: "Registration updated successfully",
      data: registration,
      errors: {},
    };
  } catch (error) {
    console.error("Registration update error:", error);

    if (error instanceof z.ZodError) {
      console.log("Validation errors:", error.flatten().fieldErrors);
      return {
        success: false,
        message: "Validation failed",
        data: null,
        errors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update registration",
      data: null,
      errors: {},
    };
  }
}
