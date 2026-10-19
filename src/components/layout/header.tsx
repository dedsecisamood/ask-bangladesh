import Link from "next/link";
import { ShieldCheck, MessageSquare, Compass, FileText, Info } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm group-hover:scale-105 transition-transform">
            <span>বিডি</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-base leading-tight tracking-tight text-foreground">
              Ask Bangladesh
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              সরকারি সেবা সহজ নির্দেশিকা
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
            <span>এআই সহকারী</span>
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>সেবা ডিরেক্টরি</span>
          </Link>
          <Link
            href="/sources"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>যাচাইকৃত উৎস</span>
          </Link>
          <Link
            href="/guides"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>গাইডসমূহ</span>
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>আমাদের সম্পর্কে</span>
          </Link>
        </nav>

        {/* Fast Action CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/chat"
            className="inline-flex items-center justify-center rounded-lg text-xs md:text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3.5 shadow-sm"
          >
            প্রশ্ন করুন
          </Link>
        </div>
      </div>
    </header>
  );
}
