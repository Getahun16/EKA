"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/reset-password") ||
    pathname === "/not-found" ||
    pathname === "/404";

  return (
    <html lang="en">
      <head>
        <title>Ethiopian Kidney Association (EKA)</title>
        <meta
          name="description"
          content="EKA is dedicated to raising awareness, prevention, and care for kidney health in Ethiopia."
        />
        <meta
          name="keywords"
          content="Ethiopian Kidney Association, Kidney Health Ethiopia, EKA, Hypertension, Nephrology Ethiopia, Kidney Awareness, Kidney Disease Ethiopia, የኢትዮጵያ ኩላሊት ማህበር, ኩላሊት ጤና, የኩላሊት በሽታ, ነፍሮሎጂ, የደም ግፊት, የኩላሊት ንቁ አዋጅ"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ethiopian Kidney Association (EKA)" />
        <meta
          property="og:title"
          content="Ethiopian Kidney Association (EKA)"
        />
        <meta
          property="og:description"
          content="Promoting kidney health, awareness, and saving lives in Ethiopia through the Ethiopian Kidney Association (EKA)."
        />
        <meta property="og:image" content="/images/img.png" />
        <meta
          property="og:url"
          content="https://ethiopiankidneyassociation.com"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ethiopian Kidney Association (EKA)"
        />
        <meta
          name="twitter:description"
          content="EKA is advancing kidney health and awareness in Ethiopia."
        />
        <meta name="twitter:image" content="/images/img.png" />
        <link rel="icon" href="/images/img.png" />
      </head>

      <body>
        {!hideLayout && <Navbar />}
        {children}
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
