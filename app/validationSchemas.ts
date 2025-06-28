import { z } from "zod";

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

export const appointmentSchema = z.object({
  // date_appointment: z.date().min(new Date(), "Please select a valid date"),
  date_appointment: z.string().min(1, "Please select a valid date"),
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
