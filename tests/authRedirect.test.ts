import { describe, it, expect } from "vitest";
import { authOptions } from "@/lib/auth";

const baseUrl = "https://clinical-next-app.vercel.app";
const redirect = (url: string) =>
  authOptions.callbacks!.redirect!({ url, baseUrl });

describe("NextAuth redirect callback", () => {
  it("sends the sign-in page to /dashboard", async () => {
    expect(await redirect("/auth/signin")).toBe(`${baseUrl}/dashboard`);
  });

  it("keeps a same-site relative dashboard path (deep link after sign-in)", async () => {
    expect(await redirect("/dashboard/registration/1")).toBe(
      `${baseUrl}/dashboard/registration/1`,
    );
  });

  it("keeps same-site absolute URLs", async () => {
    expect(await redirect(`${baseUrl}/dashboard/hmis?mrn=1`)).toBe(
      `${baseUrl}/dashboard/hmis?mrn=1`,
    );
  });

  it("sends other sites, including protocol-relative URLs, to /dashboard", async () => {
    expect(await redirect("https://evil.com/x")).toBe(`${baseUrl}/dashboard`);
    expect(await redirect("//evil.com/x")).toBe(`${baseUrl}/dashboard`);
  });
});
