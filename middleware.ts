import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Kept in sync with SESSION_COOKIE in lib/auth.ts — not imported, because
// that module pulls in node:crypto which the edge runtime can't bundle.
const SESSION_COOKIE = "portfolio_admin";

// Edge-safe session check — only JWT verification happens here; password
// hashing stays in the Node-runtime login route.
async function hasValidSession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const s = process.env.SESSION_SECRET ?? "dev-only-insecure-secret-change-me";
  try {
    await jwtVerify(token, new TextEncoder().encode(s));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/auth/login";
  if (isLoginApi) return NextResponse.next();

  const authed = await hasValidSession(req);

  if (isLoginPage) {
    if (authed) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const login = new URL("/admin/login", req.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/admin/:path*"],
};
