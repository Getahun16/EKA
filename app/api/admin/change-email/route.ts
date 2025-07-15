import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email } = await req.json();

    // Basic validation for email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid or missing email" },
        { status: 400 }
      );
    }

    // Find the admin - you might want to authenticate admin here in real app
    const admin = await prisma.admin.findFirst();

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Update the admin email
    await prisma.admin.update({
      where: { id: admin.id },
      data: { email },
    });

    return NextResponse.json({ message: "Email updated successfully." });
  } catch (error) {
    console.error("Error in change-email API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
