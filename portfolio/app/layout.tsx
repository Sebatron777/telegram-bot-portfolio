import type { Metadata } from "next";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/lang";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Serhii Lysak — Telegram Bot Developer",
  description: "Multi-account automation systems, AI-powered bots, Telegram Mini Apps — Python, FastAPI & Pyrogram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
