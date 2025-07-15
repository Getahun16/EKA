import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Make sure this is a singleton prisma instance

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const newContact = await prisma.contact.create({
      data: { name, email, message },
    });

    return NextResponse.json(newContact);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Create contact error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to create contact." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contacts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetch contacts error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
