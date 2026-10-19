import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#006A4E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Ask Bangladesh — সরকারি সেবা সহজে জানুন",
    template: "%s | Ask Bangladesh",
  },
  description:
    "AI-powered platform to discover and navigate Bangladesh government services in Bangla, Banglish, and English with verified source grounding.",
  keywords: [
    "Bangladesh government services",
    "NID card",
    "e-passport",
    "land tax",
    "birth certificate",
    "Ask Bangladesh",
  ],
  authors: [{ name: "Ask Bangladesh Community" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
