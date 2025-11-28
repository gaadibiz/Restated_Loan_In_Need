import type { Metadata } from "next";
import "../globals.css";
import { outfit } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Get low rate personal loans within minutes | LoanINNeed",
  description:
    "Get ₹5000 - ₹1L personal payday loans at a low rate of interest. Have a CIBIL less than 700, no issue we offer loans at CIBIL starting from 650+. Apply now!",
  keywords: [
    "low rate loan",
    "personal loan with low interest",
    "Insta personal loan",
    "payday loan with low interest",
  ],
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
      <body
        className={`${outfit.className} antialiased`}
      >
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        {children}
      </main>
      </body>
      </html>
    );
  }
  