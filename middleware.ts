import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

// API paths that must stay reachable without a session (NextAuth's own
// endpoints and sign-up). Everything else under /api requires login.
const PUBLIC_API_PREFIXES = ["/api/auth/"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_API_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signInUrl = new URL("/auth/signin", req.url);
  signInUrl.searchParams.set("callbackUrl", req.url);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
