import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(partners);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const name = form.get("name") as string;
  const logoFile = form.get("logo") as File;
  if (!name || !logoFile) {
    return NextResponse.json(
      { error: "Missing name or logo" },
      { status: 400 }
    );
  }

  // save file
  const buffer = Buffer.from(await logoFile.arrayBuffer());
  const filename = `${Date.now()}-${logoFile.name}`;
  const out = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(out, buffer);

  const partner = await prisma.partner.create({
    data: { name, logo: `/uploads/${filename}` },
  });

  return NextResponse.json(partner);
}
