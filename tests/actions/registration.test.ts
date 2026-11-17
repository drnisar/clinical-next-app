import { describe, it, expect, vi } from "vitest";
import { prismaMock } from "../helpers/prisma";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));
// The real auth config connects to MongoDB on import; tests only need the session check.
vi.mock("@/lib/auth", () => ({ authOptions: {} }));
vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));

import { getServerSession } from "next-auth";
import { createRegistration, updateRegistration } from "@/app/actions/registration";

const form = (fields: Record<string, string>) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
};

const valid = {
  first_name: "Ali",
  last_name: "Khan",
  gender: "Male",
  phone_number: "3001234567",
  code: "+92",
  mr_number: "MR001",
};

const loggedIn = () =>
  vi.mocked(getServerSession).mockResolvedValue({ user: { email: "doc@test.com" }, expires: "" });

describe("createRegistration (server action)", () => {
  it("refuses to save when there is no session", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const r = await createRegistration(null, form(valid));
    expect(r).toMatchObject({ success: false, message: "Unauthorized" });
    expect(prismaMock.registration.create).not.toHaveBeenCalled();
  });

  it("saves a valid patient when logged in", async () => {
    loggedIn();
    prismaMock.registration.create.mockResolvedValue({ registration_id: "r1", ...valid });
    const r = await createRegistration(null, form(valid));
    expect(r.success).toBe(true);
    expect(prismaMock.registration.create).toHaveBeenCalledWith({ data: valid });
  });

  it("returns field errors for invalid input", async () => {
    loggedIn();
    const r = await createRegistration(null, form({ ...valid, first_name: "Al", phone_number: "123" }));
    expect(r.success).toBe(false);
    expect(r.message).toBe("Validation failed");
    expect(r.errors).toHaveProperty("first_name");
    expect(r.errors).toHaveProperty("phone_number");
    expect(prismaMock.registration.create).not.toHaveBeenCalled();
  });
});

describe("updateRegistration (server action)", () => {
  it("refuses to update when there is no session", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const r = await updateRegistration("r1", null, form(valid));
    expect(r).toMatchObject({ success: false, message: "Unauthorized" });
    expect(prismaMock.registration.update).not.toHaveBeenCalled();
  });

  it("updates the right patient when logged in", async () => {
    loggedIn();
    prismaMock.registration.update.mockResolvedValue({ registration_id: "r1" });
    const r = await updateRegistration("r1", null, form(valid));
    expect(r.success).toBe(true);
    expect(prismaMock.registration.update).toHaveBeenCalledWith({
      where: { registration_id: "r1" },
      data: valid,
    });
  });
});
