import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> } // <-- note Promise<>
) {
  const { id } = await context.params; // <-- await here
  const numericId = Number(id);
  const { description } = await req.json();

  const updated = await prisma.missionVision.update({
    where: { id: numericId },
    data: { description },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // <-- Promise<>
) {
  const { id } = await context.params; // <-- await here
  const numericId = Number(id);

  await prisma.missionVision.delete({
    where: { id: numericId },
  });

  return NextResponse.json({ success: true });
}
