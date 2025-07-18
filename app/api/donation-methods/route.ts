import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const methods = await prisma.donationMethod.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(methods);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch donation methods" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { accountName, accountNumber, logoUrl } = await req.json();
    if (!logoUrl) {
      return NextResponse.json(
        { error: "Logo URL is required" },
        { status: 400 }
      );
    }
    const newMethod = await prisma.donationMethod.create({
      data: {
        accountName,
        accountNumber,
        logoUrl,
      },
    });
    return NextResponse.json(newMethod, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create donation method" },
      { status: 500 }
    );
  }
}

// For PUT and DELETE, we expect id in the query string
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { accountName, accountNumber, logoUrl } = await req.json();
    const updated = await prisma.donationMethod.update({
      where: { id: parseInt(id) },
      data: { accountName, accountNumber, logoUrl },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update donation method" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.donationMethod.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete donation method" },
      { status: 500 }
    );
  }
}
