import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIA Hub",
  description: "Your Way to Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
