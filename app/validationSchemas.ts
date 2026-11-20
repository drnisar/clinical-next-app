import { z } from "zod";
import { APPOINTMENT_STATUSES } from "@/lib/appointmentStatus";

export const registrationSchema = z.object({
  first_name: z.string().min(1).max(20),
  last_name: z.string().min(1).max(20),
  gender: z.string().min(1).max(10),
  phone_number: z.string().optional(),
  mr_number: z.string().min(1).max(20),
  code: z.string().min(1).max(20),
  date_of_birth: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return null;
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date;
    })
    .nullable(),
});

const appointmentDate = z
  .string()
  .min(1, "Please select a valid date")
  .refine((s) => !isNaN(Date.parse(s)), "Please select a valid date");

/**
 * Changing an appointment: its status, or a new date (rescheduling), plus
 * optionally a new plan/notes. At least one field is required; unknown
 * fields such as registration_id are rejected.
 */
export const appointmentUpdateSchema = z
  .object({
    status: z.enum(APPOINTMENT_STATUSES).optional(),
    date_appointment: appointmentDate.optional(),
    plan: z.string().min(1, "Please write plan for the appointment").max(255).optional(),
    notes: z.string().max(1000).optional(),
  })
  .strict()
  .refine((d) => Object.values(d).some((v) => v !== undefined), {
    message: "Nothing to update",
  });

export const appointmentSchema = z.object({
  date_appointment: appointmentDate,
  plan: z.string().min(1, "Please write plan for the appointment").max(255),
  registration_id: z.string().min(1, "Please select a valid registration"),
  notes: z.string().optional(),
  type: z.string().min(1, "Please select a valid appointment type").max(255),
});

export const consultationSchema = z.object({
  clinical_details: z.string().optional(),
  instructions: z.string().optional(),
  registration_id: z.number().optional(),
  visit_date: z.string().min(1).optional(),
});
