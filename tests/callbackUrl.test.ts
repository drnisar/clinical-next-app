import { describe, it, expect } from "vitest";
import { dashboardCallbackUrl } from "@/lib/callbackUrl";

const origin = "https://clinical-next-app.vercel.app";

describe("dashboardCallbackUrl", () => {
  it.each([
    ["missing", null],
    ["empty", ""],
    ["the welcome page", "/"],
    ["the welcome page (absolute)", `${origin}/`],
    ["the sign-in page", "/auth/signin"],
    ["a lookalike path", "/dashboardX"],
    ["another site", "https://evil.com/dashboard"],
    ["a protocol-relative URL to another site", "//evil.com/dashboard"],
  ])("sends %s to /dashboard", (_label, raw) => {
    expect(dashboardCallbackUrl(raw, origin)).toBe("/dashboard");
  });

  it("keeps a dashboard page given as a path", () => {
    expect(dashboardCallbackUrl("/dashboard/registration/1", origin)).toBe(
      "/dashboard/registration/1",
    );
  });

  it("keeps a same-origin dashboard URL, returned as a path with its query", () => {
    expect(
      dashboardCallbackUrl(`${origin}/dashboard/hmis?mrn=123-456`, origin),
    ).toBe("/dashboard/hmis?mrn=123-456");
  });

  it("keeps /dashboard itself", () => {
    expect(dashboardCallbackUrl(`${origin}/dashboard`, origin)).toBe(
      "/dashboard",
    );
  });
});
