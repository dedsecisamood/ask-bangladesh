import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
