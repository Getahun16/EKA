import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const mailOptions = {
    from: `"Kidney Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Kidney App - Password Reset",
    text: `Hello,

You requested a password reset.

Reset your password by clicking the link below:

${resetUrl}

If you did not request this, please ignore this email.
`,
    html: `
      <p>Hello,</p>
      <p>You requested a password reset for your <strong>Kidney</strong> account.</p>
      <p>Click the button below to reset your password:</p>
      <p><a href="${resetUrl}" style="background: #4caf50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent:", info.messageId);
}
