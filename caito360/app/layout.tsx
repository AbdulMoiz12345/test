import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAITO360 — AI Business Intelligence",
  description: "Ask questions about your business data",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0F] text-[#F1F5F9]">{children}</body>
    </html>
  );
}
