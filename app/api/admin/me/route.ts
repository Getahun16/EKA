import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.match(/admin-token=([^;]+)/)?.[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    interface AdminTokenPayload {
      id: string;
      // add other properties if needed
    }
    const payload = verifyToken(token);
    if (typeof payload !== "object" || payload === null || !("id" in payload)) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const admin = await prisma.admin.findUnique({
      where: { id: Number((payload as AdminTokenPayload).id) },
    });

    if (!admin)
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });

    return NextResponse.json({ email: admin.email });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
