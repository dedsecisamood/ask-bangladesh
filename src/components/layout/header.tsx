"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, MessageSquare, Compass, FileText, Info } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Ask Bangladesh Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-base leading-tight tracking-tight text-foreground">
              Ask Bangladesh
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/chat"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.assistant}</span>
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>{t.services}</span>
          </Link>
          <Link
            href="/sources"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.sources}</span>
          </Link>
          <Link
            href="/guides"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>{t.guides}</span>
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>{t.about}</span>
          </Link>
        </nav>

        {/* Action Controls: Language Toggle, Theme Toggle, CTA */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="/chat"
            className="hidden sm:inline-flex items-center justify-center rounded-lg text-xs md:text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3.5 shadow-sm"
          >
            {t.askButton}
          </Link>
        </div>
      </div>
    </header>
  );
}
