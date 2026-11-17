import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("next-auth/jwt", () => ({ getToken: vi.fn() }));

import { getToken } from "next-auth/jwt";
import { middleware, config } from "@/middleware";

const req = (path: string) =>
  new NextRequest(new URL(path, "http://localhost:3000"));

const loggedOut = () => vi.mocked(getToken).mockResolvedValue(null);
const loggedIn = () =>
  vi.mocked(getToken).mockResolvedValue({ id: "u1", email: "doc@test.com" });

describe("middleware", () => {
  beforeEach(() => vi.mocked(getToken).mockReset());

  it("covers both dashboard pages and API routes", () => {
    expect(config.matcher).toEqual(["/dashboard/:path*", "/api/:path*"]);
  });

  describe("API routes", () => {
    const protectedApis = [
      "/api/registration",
      "/api/registration/abc123",
      "/api/registration/search/MR001",
      "/api/consultation",
      "/api/admission",
      "/api/appointment",
      "/api/ot",
      "/api/drugs",
      "/api/notes",
    ];

    it.each(protectedApis)("returns 401 JSON for %s when logged out", async (path) => {
      loggedOut();
      const res = await middleware(req(path));
      expect(res.status).toBe(401);
      expect(await res.json()).toEqual({ error: "Unauthorized" });
    });

    it.each(protectedApis)("lets %s through when logged in", async (path) => {
      loggedIn();
      const res = await middleware(req(path));
      expect(res.status).toBe(200);
      expect(res.headers.get("x-middleware-next")).toBe("1");
    });

    it.each(["/api/auth/session", "/api/auth/callback/google", "/api/auth/register"])(
      "keeps %s public without checking the session",
      async (path) => {
        const res = await middleware(req(path));
        expect(res.headers.get("x-middleware-next")).toBe("1");
        expect(getToken).not.toHaveBeenCalled();
      }
    );

    it("does not treat /api/authors (prefix lookalike) as public", async () => {
      loggedOut();
      const res = await middleware(req("/api/authors"));
      expect(res.status).toBe(401);
    });
  });

  describe("dashboard pages", () => {
    it("redirects to sign-in with a callbackUrl when logged out", async () => {
      loggedOut();
      const res = await middleware(req("/dashboard/registration"));
      expect(res.status).toBe(307);
      const location = new URL(res.headers.get("location")!);
      expect(location.pathname).toBe("/auth/signin");
      expect(location.searchParams.get("callbackUrl")).toBe(
        "http://localhost:3000/dashboard/registration"
      );
    });

    it("lets the page through when logged in", async () => {
      loggedIn();
      const res = await middleware(req("/dashboard"));
      expect(res.headers.get("x-middleware-next")).toBe("1");
    });
  });
});
