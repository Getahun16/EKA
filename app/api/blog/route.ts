import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function GET() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !content || !imageFile) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const filename = `${Date.now()}-${imageFile.name}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);
  await writeFile(filepath, buffer);

  const blog = await prisma.blog.create({
    data: { title, content, image: `/uploads/${filename}` },
  });

  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get("id");
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;

  if (!id || !title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  let imagePath = undefined;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}-${imageFile.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filepath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  const blog = await prisma.blog.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      ...(imagePath && { image: imagePath }),
    },
  });

  return NextResponse.json(blog);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const id = body.id;

  const blog = await prisma.blog.findUnique({ where: { id } });
  if (blog?.image) {
    const filePath = path.join(process.cwd(), "public", blog.image);
    try {
      await unlink(filePath);
    } catch (e) {
      console.warn("Failed to delete image:", e);
    }
  }

  await prisma.blog.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
