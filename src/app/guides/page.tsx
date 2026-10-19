import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সরকারি সেবা গাইড — ধাপে ধাপে নির্দেশিকা",
  description: "পাসপোর্ট, এনআইডি এবং ভূমি সংক্রান্ত জরুরি নাগরিক সেবাসমূহের বিস্তারিত ধাপে ধাপে গাইড।",
};

export default function GuidesPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center max-w-xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
          ধাপে ধাপে সরকারি সেবা গাইড
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          জটিল আবেদন প্রক্রিয়াকে নাগরিকের জন্য সহজ ও বোধগম্য করে প্রস্তুতকৃত নির্ভরযোগ্য নির্দেশিকা।
        </p>
      </div>

      <div className="space-y-6">
        {/* Guide 1: e-Passport */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-2">
            <BookOpen className="w-4 h-4" />
            <span>ই-পাসপোর্ট নির্দেশিকা</span>
          </div>
          <h2 className="text-xl font-bold mb-3 text-foreground">
            নতুন ই-পাসপোর্ট আবেদনের সম্পূর্ণ প্রক্রিয়া
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>ধাপ ১:</strong> epassport.gov.bd ওয়েবসাইটে গিয়ে অনলাইন রেজিস্ট্রেশন ও অ্যাকাউন্ট তৈরি করুন।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>ধাপ ২:</strong> ব্যক্তিগত তথ্য সঠিকভাবে NID/জন্মনিবন্ধন অনুযায়ী পূরণ করুন ও সাবমিট করুন।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>ধাপ ৩:</strong> এ-চালান অথবা নির্দিষ্ট ব্যাংকের মাধ্যমে সরকারি পাসপোর্ট ফি পরিশোধ করুন।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>ধাপ ৪:</strong> নির্দিষ্ট তারিখে আঞ্চলিক পাসপোর্ট অফিসে গিয়ে ছবি, ফিঙ্গারপ্রিন্ট ও আইরিশ প্রদান সম্পন্ন করুন।</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-end">
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <span>পাসপোর্ট নিয়ে এআই সহকারীর কাছে প্রশ্ন করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Guide 2: NID Correction */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-2">
            <BookOpen className="w-4 h-4" />
            <span>এনআইডি সংশোধন গাইড</span>
          </div>
          <h2 className="text-xl font-bold mb-3 text-foreground">
            জাতীয় পরিচয়পত্রের নাম ও জন্ম তারিখ সংশোধন
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>ধাপ ১:</strong> এনআইডি অনলাইন পোর্টাল (services.nidw.gov.bd)-এ ফেস ভেরিফিকেশন করে লগইন করুন।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>ধাপ ২:</strong> 'প্রোফাইল' অপশনে গিয়ে 'সম্পাদনা' বাটনে ক্লিক করে সঠিক তথ্যটি লিখুন।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>ধাপ ৩:</strong> দাবীকৃত সংশোধনের স্বপক্ষে প্রাতিষ্ঠানিক সনদ (এসএসসি/পাসপোর্ট/জন্মনিবন্ধন) পিডিএফ সংযুক্ত করুন।</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>ধাপ ৪:</strong> বিকাশ বা রকেটের মাধ্যমে সরকারি ফি পরিশোধ করে আবেদনটি চূড়ান্ত জমা দিন।</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-end">
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <span>এনআইডি নিয়ে এআই সহকারীর কাছে প্রশ্ন করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
