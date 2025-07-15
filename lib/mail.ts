import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const mailOptions = {
    from: `"Kidney Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset Request",
    text: `Hello,

You requested a password reset.

Reset your password by clicking the link below:

${resetUrl}

If you did not request this, please ignore this email.
`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent:", info.messageId);
}
