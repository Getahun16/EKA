import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existing = await prisma.admin.findUnique({ where: { email } });

  if (existing) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const admin = await prisma.admin.create({
    data: { email, password },
  });

  return NextResponse.json({ success: true, admin });
}
