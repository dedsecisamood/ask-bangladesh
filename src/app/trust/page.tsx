import { ShieldCheck, FileCheck, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "স্বচ্ছতা কেন্দ্র — Ask Bangladesh",
  description: "Ask Bangladesh তথ্যের সত্যতা যাচাই প্রক্রিয়া ও সোর্স অডিট সংক্রান্ত তথ্যাদি।",
};

export default function TrustPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4">স্বচ্ছতা ও বিশ্বাস কেন্দ্র (Trust Center)</h1>
      <p className="text-sm text-muted-foreground mb-8">সরকারি তথ্যের সত্যতা কিভাবে নিশ্চিত করা হয়</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/90">
        <div className="p-5 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>১. তথ্যের উৎস ভেরিফিকেশন মানদণ্ড</span>
          </h2>
          <p className="text-muted-foreground">
            আমাদের সিস্টেম শুধুমাত্র বাংলাদেশ সরকারের অনুমোদিত .gov.bd ডোমেইনের অফিশিয়াল বিজ্ঞপ্তি, গ্যাজেট ও সেবা পোর্টাল থেকে তথ্য ইনজেস্ট করে।
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-primary" />
            <span>২. নিয়মিত তথ্য রিফ্রেশ ও ফ্রেশনেস ট্র্যাকিং</span>
          </h2>
          <p className="text-muted-foreground">
            সরকারি ওয়েবসাইটসমূহের সর্বশেষ পরিবর্তনসমূহ স্বয়ংক্রিয়ভাবে ট্র্যাক করা হয় যাতে নাগরিকগণ সর্বদা আপডেটেড ফি ও নিয়মাবলি জানতে পারেন।
          </p>
        </div>
      </div>
    </div>
  );
}
