import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const ALLOWED_EMAILS = [
  "drnisaar@gmail.com",
  "danishkhattak145@gmail.com",
  "drnisar@hotmail.com",
];

const registerSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  name: z.string().min(1, "Name is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return new Response(JSON.stringify({ error: validation.error.errors }), {
        status: 400,
      });
    }
    const { email, password, name } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }
    if (!ALLOWED_EMAILS.includes(email)) {
      return new Response(JSON.stringify({ error: "Email not allowed" }), {
        status: 403,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return new Response(JSON.stringify(userWithoutPassword), { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
