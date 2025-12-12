import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // token exists, allow access
  if (!token) {
    const callbackUrl = pathname + req.nextUrl.search;
    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url)
    );
  }

  // block user -> admin pages
  if (pathname.startsWith("/dashboard/admin")) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  // block admin -> user pages
  if (
    pathname.startsWith("/dashboard/user") ||
    pathname.startsWith("/payment")
  ) {
    if (token.role !== "user") {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  return NextResponse.next();
};

// Paths that require authentication
export const config = {
  matcher: ["/my-bookings/:path*", "/dashboard/:path*", "/payment/:path*"],
};
