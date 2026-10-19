"use client";

import Link from "next/link";
import { Search, ShieldCheck, BookOpen, Compass } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function HomePage() {
  const { t, language } = useLanguage();

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 text-center max-w-4xl mx-auto">
      {/* Disclaimer Banner */}
      <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs md:text-sm border border-emerald-200 dark:border-emerald-800 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>{t.disclaimer}</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
        {t.heroTitle}
      </h1>
      
      <p className="text-base md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
        {t.heroSubtitle}
      </p>

      {/* Quick Search Action Bar */}
      <div className="w-full max-w-2xl bg-card border border-border shadow-sm rounded-2xl p-2 flex items-center gap-2 mb-8 focus-within:ring-2 focus-within:ring-primary transition-all">
        <Search className="w-5 h-5 text-muted-foreground ml-3 flex-shrink-0" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          className="flex-1 bg-transparent border-0 outline-none px-2 py-3 text-sm md:text-base placeholder:text-muted-foreground text-foreground"
          readOnly
        />
        <Link
          href="/chat"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap shadow-sm"
        >
          {t.askButton}
        </Link>
      </div>

      {/* Fast Navigation Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl text-left">
        <Link
          href="/services"
          className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col gap-1.5 shadow-xs"
        >
          <Compass className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm text-foreground">{t.services}</span>
          <span className="text-xs text-muted-foreground">
            {language === "bn" ? "১৬+ সরকারি ক্যাটাগরি" : "16+ Public Categories"}
          </span>
        </Link>

        <Link
          href="/sources"
          className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col gap-1.5 shadow-xs"
        >
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm text-foreground">{t.sources}</span>
          <span className="text-xs text-muted-foreground">
            {language === "bn" ? "অফিসিয়াল সরকারি লিংক" : "Official .gov.bd Links"}
          </span>
        </Link>

        <Link
          href="/guides"
          className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col gap-1.5 shadow-xs"
        >
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm text-foreground">{t.guides}</span>
          <span className="text-xs text-muted-foreground">
            {language === "bn" ? "সহজ আবেদন পদ্ধতি" : "Step-by-step Procedures"}
          </span>
        </Link>

        <Link
          href="/about"
          className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col gap-1.5 shadow-xs"
        >
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm text-foreground">{t.about}</span>
          <span className="text-xs text-muted-foreground">
            {language === "bn" ? "স্বচ্ছতা ও প্রাইভেসী" : "Trust & Zero-PII Policy"}
          </span>
        </Link>
      </div>
    </main>
  );
}
