import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { generateResetToken } from "@/lib/auth";

export async function POST(req: Request) {
  console.log("🔍 [forgot-password] handler entered");

  try {
    const body = await req.json();
    console.log("🔍 [forgot-password] body:", body);

    const email =
      typeof body.email === "string" && body.email.trim().length
        ? body.email.trim()
        : null;
    if (!email) {
      throw new Error("Email was missing or invalid");
    }

    const user = await prisma.admin.findUnique({ where: { email } });
    console.log("🔍 [forgot-password] user:", user);
    if (!user) {
      throw new Error(`No user found for ${email}`);
    }

    const token = generateResetToken();
    const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiry
    await prisma.admin.update({
      where: { email },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });
    console.log("✅ token saved:", token);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER, // e.g. smtp.gmail.com
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP verified");

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;
    await transporter.sendMail({
      from: `"Kidney Association" <${process.env.EMAIL_FROM}>`, // Sender name added here
      to: email,
      subject: "Password Reset",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.5;
          color: #333;
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f9f9f9;
        ">
      
          <h2>Password Reset Request</h2>
          <p>Hi,</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" style="
              display: inline-block;
              background-color: #22c55e;
              color: white;
              padding: 12px 24px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: bold;
              font-size: 16px;
            ">Reset Password</a>
          </p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <hr />
          <p style="font-size: 12px; color: #777;">This link will expire in 1 hour.</p>
        </div>
      `,
    });
    console.log("✅ Email sent to", email);

    return NextResponse.json({ message: "Reset link sent." });
  } catch (err: unknown) {
    console.error("🔴 [forgot-password] error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
