import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  const slides = await prisma.slide.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(slides);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file = formData.get("image") as File | null;

  let imagePath = "";

  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = Date.now() + "-" + file.name;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, fileName), buffer);
    imagePath = `/uploads/${fileName}`;
  }

  const newSlide = await prisma.slide.create({
    data: { title, description, image: imagePath },
  });

  return NextResponse.json(newSlide);
}

export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file = formData.get("image") as File | null;

  const existingSlide = await prisma.slide.findUnique({ where: { id } });
  if (!existingSlide)
    return NextResponse.json({ error: "Slide not found" }, { status: 404 });

  let imagePath = existingSlide.image;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = Date.now() + "-" + file.name;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, fileName), buffer);
    imagePath = `/uploads/${fileName}`;
  }

  const updatedSlide = await prisma.slide.update({
    where: { id },
    data: { title, description, image: imagePath },
  });

  return NextResponse.json(updatedSlide);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.slide.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
