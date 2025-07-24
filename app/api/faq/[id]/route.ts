import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a single FAQ by ID (optional)
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  const faq = await prisma.faq.findUnique({ where: { id: numericId } });
  if (!faq) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(faq);
}

// PUT – update FAQ by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  const body = await req.json();
  const { question, answer } = body;

  if (!question || !answer) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const updated = await prisma.faq.update({
    where: { id: numericId },
    data: {
      question,
      answer,
    },
  });

  return NextResponse.json(updated);
}

// DELETE – remove FAQ by ID
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  await prisma.faq.delete({
    where: { id: numericId },
  });

  return NextResponse.json({ success: true });
}
