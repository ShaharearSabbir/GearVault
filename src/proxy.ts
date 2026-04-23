import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Cookie } from "./utils/cookie";
import * as jose from "jose";
import { env } from "./env";
import { Role } from "./generated/prisma/enums";

export async function proxy(request: NextRequest) {
  const accessToken = await Cookie.get("accessToken");
  const refreshToken = await Cookie.get("refreshToken");
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const pathname = request.nextUrl.pathname;

  if (!accessToken && !refreshToken) {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let payload: jose.AccessTokenPayload | null = null;
  try {
    if (accessToken) {
      const { payload: verifiedPayload } = (await jose.jwtVerify(
        accessToken,
        secret,
      )) as { payload: jose.AccessTokenPayload };
      payload = verifiedPayload;
    }
  } catch {
    const res = NextResponse.redirect(new URL("/login", request.url));
    return res;
  }

  if (payload) {
    if (pathname === "/login" || pathname === "/register") {
      const target =
        payload.role === Role.ADMIN ? "/admin-dashboard" : "/dashboard";
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (
      pathname.startsWith("/admin-dashboard") &&
      payload.role !== Role.ADMIN
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/dashboard") && payload.role === Role.ADMIN) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
  ],
};
