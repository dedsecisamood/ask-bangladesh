"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-border/40 bg-muted/30 py-8 px-4 mt-auto">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Image
              src="/logo.png"
              alt="Ask Bangladesh"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Ask Bangladesh</span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Open Initiative
            </span>
          </div>
          <p className="max-w-md text-center md:text-left text-muted-foreground">
            {t.footerDisclaimer}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-medium">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            {t.privacy}
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            {t.terms}
          </Link>
          <Link href="/trust" className="hover:text-foreground transition-colors">
            {t.trust}
          </Link>
          <Link href="/feedback" className="hover:text-foreground transition-colors">
            {t.feedback}
          </Link>
        </div>
      </div>
    </footer>
  );
}
