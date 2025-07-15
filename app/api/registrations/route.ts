import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body.fullName ||
      !body.dateOfBirth ||
      !body.email ||
      !body.mobileNumber ||
      !body.gender ||
      !body.occupation ||
      !body.idType ||
      !body.idNumber ||
      !body.issuedAuthority ||
      !body.issuedPlace ||
      !body.issuedDate ||
      !body.expiryDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newRegistration = await prisma.registration.create({
      data: {
        fullName: body.fullName,
        dateOfBirth: new Date(body.dateOfBirth),
        email: body.email,
        mobileNumber: body.mobileNumber,
        gender: body.gender,
        occupation: body.occupation,
        idType: body.idType,
        idNumber: body.idNumber,
        issuedAuthority: body.issuedAuthority,
        issuedPlace: body.issuedPlace,
        issuedDate: new Date(body.issuedDate),
        expiryDate: new Date(body.expiryDate),
      },
    });

    return NextResponse.json(newRegistration, { status: 201 });
  } catch (error) {
    console.error("Registration creation error:", error);
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 }
    );
  }
}
