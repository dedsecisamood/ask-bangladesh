import Link from "next/link";
import { Search, ShieldCheck, BookOpen, Compass } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 text-center max-w-4xl mx-auto">
      {/* Disclaimer Banner */}
      <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs md:text-sm border border-emerald-200 dark:border-emerald-800">
        <ShieldCheck className="w-4 h-4" />
        <span>একটি স্বতন্ত্র উন্মুক্ত উদ্যোগ — বাংলাদেশ সরকারের অফিসিয়াল সেবা গাইড</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
        সরকারি সেবা নিয়ে যে কোনো প্রশ্ন করুন
      </h1>
      
      <p className="text-base md:text-xl text-muted-foreground mb-8 max-w-2xl">
        বাংলা, Banglish বা ইংরেজিতে সরাসরি পাসপোর্ট, এনআইডি, জমির নামজারি বা যে কোনো সরকারি সেবা সম্পর্কে সঠিক ও যাচাইকৃত তথ্য জানুন।
      </p>

      {/* Quick Search Action Bar */}
      <div className="w-full max-w-2xl bg-card border border-border shadow-sm rounded-2xl p-2 flex items-center gap-2 mb-8 focus-within:ring-2 focus-within:ring-primary">
        <Search className="w-5 h-5 text-muted-foreground ml-3" />
        <input
          type="text"
          placeholder="যেমন: ই-পাসপোর্ট রিইস্যু ফি কত? বা NID সংশোধন নিয়ম..."
          className="flex-1 bg-transparent border-0 outline-none px-2 py-3 text-sm md:text-base placeholder:text-muted-foreground"
          readOnly
        />
        <Link
          href="/chat"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
        >
          জিজ্ঞাসা করুন
        </Link>
      </div>

      {/* Fast Navigation Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl text-left">
        <Link
          href="/services"
          className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col gap-1.5"
        >
          <Compass className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">সেবা ডিরেক্টরি</span>
          <span className="text-xs text-muted-foreground">১৬+ সরকারি ক্যাটাগরি</span>
        </Link>

        <Link
          href="/sources"
          className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col gap-1.5"
        >
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">যাচাইকৃত উৎস</span>
          <span className="text-xs text-muted-foreground">অফিসিয়াল সরকারি লিংক</span>
        </Link>

        <Link
          href="/guides"
          className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col gap-1.5"
        >
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">ধাপে ধাপে গাইড</span>
          <span className="text-xs text-muted-foreground">সহজ আবেদন পদ্ধতি</span>
        </Link>

        <Link
          href="/about"
          className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col gap-1.5"
        >
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">আমাদের লক্ষ্য</span>
          <span className="text-xs text-muted-foreground">স্বচ্ছতা ও প্রাইভেসী</span>
        </Link>
      </div>
    </main>
  );
}
