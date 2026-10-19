import { ShieldCheck, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "যাচাইকৃত সরকারি উৎস ডিরেক্টরি — অফিশিয়াল ডোমেইন তালিকা",
  description: "Ask Bangladesh দ্বারা ব্যবহৃত সকল অনুমোদিত সরকারি ওয়েবসাইট ও তথ্যসূত্রের পূর্ণাঙ্গ তালিকা।",
};

const APPROVED_SOURCES = [
  {
    domain: "bangladesh.gov.bd",
    title: "বাংলাদেশ জাতীয় তথ্য বাতায়ন",
    agency: "তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ",
    type: "কেন্দ্রীয় পোর্টাল",
    status: "অনুমোদিত ও নিয়মিত স্ক্যানকৃত",
    url: "https://bangladesh.gov.bd",
  },
  {
    domain: "epassport.gov.bd",
    title: "ই-পাসপোর্ট অনলাইন আবেদন পোর্টাল",
    agency: "ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর",
    type: "সেবা পোর্টাল",
    status: "অনুমোদিত ও সক্রিয়",
    url: "https://www.epassport.gov.bd",
  },
  {
    domain: "services.nidw.gov.bd",
    title: "জাতীয় পরিচয়পত্র সিটিজেন সার্ভিস",
    agency: "জাতীয় পরিচয় নিবন্ধন অনুবিভাগ (ইসি)",
    type: "নাগরিক সেবা পোর্টাল",
    status: "অনুমোদিত ও সক্রিয়",
    url: "https://services.nidw.gov.bd",
  },
  {
    domain: "ldtax.gov.bd",
    title: "ভূমি উন্নয়ন কর পোর্টাল",
    agency: "ভূমি মন্ত্রণালয়",
    type: "কর আদায় পোর্টাল",
    status: "অনুমোদিত ও সক্রিয়",
    url: "https://ldtax.gov.bd",
  },
  {
    domain: "mutation.land.gov.bd",
    title: "ই-নামজারি সিস্টেম",
    agency: "ভূমি মন্ত্রণালয়",
    type: "সেবা পোর্টাল",
    status: "অনুমোদিত ও সক্রিয়",
    url: "https://mutation.land.gov.bd",
  },
  {
    domain: "bdris.gov.bd",
    title: "জন্ম ও মৃত্যু নিবন্ধন পোর্টাল",
    agency: "রেজিস্ট্রার জেনারেলের কার্যালয় (জন্ম ও মৃত্যু নিবন্ধন)",
    type: "নাগরিক পোর্টাল",
    status: "অনুমোদিত ও সক্রিয়",
    url: "https://bdris.gov.bd",
  },
];

export default function SourcesPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium mb-3 border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>কঠোরভাবে যাচাইকৃত সরকারি ডোমেইন</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
          যাচাইকৃত সরকারি তথ্যসূত্র তালিকা
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Ask Bangladesh শুধুমাত্র সরকারি (.gov.bd) অনুমোদিত অফিসিয়াল ডোমেইন থেকেই তথ্য সংগ্রহ ও উপস্থাপন করে। কোনো অনুমোদনহীন থার্ড-পার্টি বা ব্লগের তথ্য এখানে স্থান পায় না।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {APPROVED_SOURCES.map((source, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {source.domain}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">
                  যাচাইকৃত
                </span>
              </div>
              <h3 className="font-bold text-base text-foreground mb-1">
                {source.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                মন্ত্রণালয়/দপ্তর: {source.agency}
              </p>
            </div>

            <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{source.type}</span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
              >
                <span>ওয়েবসাইট দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
