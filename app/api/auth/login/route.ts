import { verifyPassword, signToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // 👈 Important for cookie support

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.admin.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ email: user.email, id: user.id });

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });

  return res;
}
