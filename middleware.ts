import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // token exists, allow access
  if (token) return NextResponse.next();

  const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;

  // Otherwise redirect -> sign in page
  return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url));
};

// Paths that require authentication
export const config = {
  matcher: ["/my-bookings/:path*", "/dashboard/:path*", "/payment/:path*"],
};
