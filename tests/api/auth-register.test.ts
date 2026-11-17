import { describe, it, expect, vi } from "vitest";
import bcrypt from "bcryptjs";
import { prismaMock } from "../helpers/prisma";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { POST } from "@/app/api/auth/register/route";

const call = (body: unknown) =>
  POST(
    new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );

const allowed = { email: "drnisaar@gmail.com", password: "secret123", name: "Dr Nisar" };

describe("POST /api/auth/register", () => {
  it("creates an allowed user, hashes the password and never returns it", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockImplementation(async ({ data }) => ({ id: "u1", ...data }));

    const res = await call(allowed);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body).toMatchObject({ id: "u1", email: allowed.email, name: allowed.name });
    expect(body).not.toHaveProperty("password");

    const saved = prismaMock.user.create.mock.calls[0][0].data;
    expect(saved.password).not.toBe(allowed.password);
    expect(await bcrypt.compare(allowed.password, saved.password)).toBe(true);
  });

  it("rejects an email that is not on the allow-list with 403", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const res = await call({ ...allowed, email: "stranger@example.com" });
    expect(res.status).toBe(403);
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });

  it("rejects an existing user with 400", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: "u1", email: allowed.email });
    const res = await call(allowed);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "User already exists" });
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });

  it.each([
    ["bad email", { ...allowed, email: "not-an-email" }],
    ["short password", { ...allowed, password: "1234" }],
    ["missing name", { ...allowed, name: "" }],
  ])("returns 400 for %s", async (_label, body) => {
    const res = await call(body);
    expect(res.status).toBe(400);
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
  });

  it("returns 500 without leaking details when the database fails", async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error("connection refused"));
    const res = await call(allowed);
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Internal server error" });
  });
});
