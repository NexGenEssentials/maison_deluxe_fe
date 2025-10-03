import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt, JWTPayload } from "jose";

// extend JWTPayload with your custom claims
interface CustomJWTPayload extends JWTPayload {
  is_verified?: boolean;
}

export async function middleware(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = decodeJwt(token) as CustomJWTPayload;

    // type-safe checks
    if (!payload.exp || !payload.is_verified) {
      return NextResponse.redirect(loginUrl);
    }

    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("accessToken");
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT decode error:", error);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
