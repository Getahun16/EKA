import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const members = await prisma.member.findMany();
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newMember = await prisma.member.create({ data });
  return NextResponse.json(newMember);
}
