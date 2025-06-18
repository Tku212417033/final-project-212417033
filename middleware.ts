import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/denied", req.url));
    }
  },
  { callbacks: { authorized: ({ req, token }) => !!token } }
);

export const config = {
  matcher: ["/admin/:path*"],
};