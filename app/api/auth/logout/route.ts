import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Remove the cookie by setting it to empty and expiring it
  response.cookies.set("admin-token", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
