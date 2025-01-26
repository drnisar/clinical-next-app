import { z } from "zod";

export const registrationSchema = z.object({
  first_name: z.string().min(1).max(20),
  last_name: z.string().min(1).max(20),
  gender: z.string().min(1).max(10),
  phone_number: z.string().min(10).max(15),
  mr_number: z.string().min(1).max(20),
});
