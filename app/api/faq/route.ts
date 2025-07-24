import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const faqs = await prisma.faq.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newFaq = await prisma.faq.create({
    data: {
      question: body.question,
      answer: body.answer,
    },
  });
  return NextResponse.json(newFaq);
}
