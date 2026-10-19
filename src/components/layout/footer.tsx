import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-muted/30 py-8 px-4 mt-auto">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <span>Ask Bangladesh</span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              উন্মুক্ত উদ্যোগ
            </span>
          </div>
          <p className="max-w-md text-center md:text-left text-muted-foreground">
            এটি একটি স্বাধীন ওপেন-সোর্স প্রজেক্ট। এটি বাংলাদেশ সরকারের কোনো দাপ্তরিক ওয়েবসাইট নয়। তথ্যের চূড়ান্ত সত্যতা যাচাইয়ে সংশ্লিষ্ট সরকারি পোর্টালে ভিজিট করুন।
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-medium">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            গোপনীয়তা নীতি
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            ব্যবহারের শর্তাবলী
          </Link>
          <Link href="/trust" className="hover:text-foreground transition-colors">
            স্বচ্ছতা কেন্দ্র
          </Link>
          <Link href="/feedback" className="hover:text-foreground transition-colors">
            মতামত ও সংশোধন
          </Link>
        </div>
      </div>
    </footer>
  );
}
