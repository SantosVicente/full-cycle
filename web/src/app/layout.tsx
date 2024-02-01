import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { HeartIcon } from "lucide-react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Code Commerce",
  description: "Uma Full Cycle Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "dark min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="min-h-screen">
          <Navbar />
          <Separator orientation="horizontal" />
          <main>{children}</main>
        </div>
        <footer className="flex h-20 w-full flex-col items-center justify-center">
          <Separator orientation="horizontal" className="bg-zinc-600" />
          <p className="flex h-full items-center justify-center gap-1">
            Feito com{" "}
            <span className="text-red-500">
              <HeartIcon size={20} />
            </span>{" "}
            pela Full Cycle
          </p>
        </footer>
      </body>
    </html>
  );
}
