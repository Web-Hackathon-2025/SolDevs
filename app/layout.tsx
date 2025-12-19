import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Karigar - Find Local Service Providers",
  description:
    "Connect with trusted local service providers for plumbing, electrical, cleaning, tutoring, and more. Book services easily and manage your bookings efficiently.",
  keywords: [
    "local services",
    "service providers",
    "plumbing",
    "electrical",
    "cleaning",
    "tutoring",
    "home services",
    "karigar",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans antialiased", inter.variable)}>
        {children}
      </body>
    </html>
  );
}
