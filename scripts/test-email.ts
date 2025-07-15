import "dotenv/config"; // ✅ This loads the .env file

import { transporter } from "../lib/mail";

async function main() {
  console.log({
    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS ? "loaded" : "missing",
  });

  try {
    const info = await transporter.sendMail({
      from: `"Kidney App" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // you will receive it in your own Gmail
      subject: "Test Email from Kidney App",
      text: "This is a test email sent using Nodemailer.",
    });

    console.log("✅ Test Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending test email:", error);
  }
}

main();
