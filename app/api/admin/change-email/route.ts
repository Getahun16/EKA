import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  // You should verify admin authentication in a real app
  const admin = await prisma.admin.findFirst();

  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { email },
  });

  return NextResponse.json({ message: "Email updated successfully." });
}
