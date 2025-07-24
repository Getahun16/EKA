import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.missionVision.findMany();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { type, description } = await req.json();
  const created = await prisma.missionVision.create({
    data: { type, description },
  });
  return NextResponse.json(created);
}
