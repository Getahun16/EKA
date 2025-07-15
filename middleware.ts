import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminPage =
    req.nextUrl.pathname.startsWith("/admin") &&
    !req.nextUrl.pathname.startsWith("/admin/login") &&
    !req.nextUrl.pathname.startsWith("/admin/register");

  const token = req.cookies.get("admin-token")?.value;

  // If trying to access admin page without token, redirect to login
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // 🔒 Protect all /admin routes
};
