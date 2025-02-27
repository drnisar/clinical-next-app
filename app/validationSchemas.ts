import { z } from "zod";

export const registrationSchema = z.object({
  first_name: z.string().min(1).max(20),
  last_name: z.string().min(1).max(20),
  gender: z.string().min(1).max(10),
  phone_number: z.string().min(10).max(15),
  mr_number: z.string().min(1).max(20),
});

export const appointmentSchema = z.object({
  // date_appointment: z.date().min(new Date(), "Please select a valid date"),
  date_appointment: z.string().min(1, "Please select a valid date"),
  plan: z.string().min(1, "Please write plan for the appointment").max(255),
  registration_id: z.number().min(1),
  notes: z.string().optional(),
  type: z.string().min(1, "Please select a valid appointment type").max(255),
});

export const consultationSchema = z.object({
  history: z.string().optional(),
  examination: z.string().optional(),
  clinical_details: z.string().optional(),
  records_review: z.string().optional(),
  investigations: z.string().optional(),
  diagnosis: z.string().optional(),
  next_visit_plan: z.string().optional(),
  instructions: z.string().optional(),
  registration_id: z.number().optional(),
  visit_date: z.string().min(1),
});
