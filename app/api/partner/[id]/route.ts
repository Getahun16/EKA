import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  const partner = await prisma.partner.findUnique({ where: { id: numericId } });
  if (!partner) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(partner);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  const form = await req.formData();
  const name = form.get("name") as string;
  const logoFile = form.get("logo") as File | null;
  const existingLogo = form.get("existingLogo") as string | null;

  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  let logoPath: string | undefined;
  if (logoFile && logoFile.size > 0) {
    const buf = Buffer.from(await logoFile.arrayBuffer());
    const filename = `${Date.now()}-${logoFile.name}`;
    const dest = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(dest, buf);
    logoPath = `/uploads/${filename}`;

    const old = existingLogo?.replace(/^\//, "");
    if (old) {
      try {
        await unlink(path.join(process.cwd(), "public", old));
      } catch {}
    }
  } else if (existingLogo) {
    logoPath = existingLogo;
  }

  const updated = await prisma.partner.update({
    where: { id: numericId },
    data: {
      name,
      ...(logoPath && { logo: logoPath }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  const existing = await prisma.partner.findUnique({ where: { id: numericId } });
  if (existing?.logo) {
    const file = existing.logo.replace(/^\//, "");
    try {
      await unlink(path.join(process.cwd(), "public", file));
    } catch {}
  }
  await prisma.partner.delete({ where: { id: numericId } });

  return NextResponse.json({ success: true });
}
