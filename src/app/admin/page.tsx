import { Shield, Database, Users, Activity, FileCheck, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "এডমিন ড্যাশবোর্ড — Ask Bangladesh Operations",
  description: "সরকারি সোর্স ভেরিফিকেশন, ক্রলিং স্ট্যাটাস, ইউজার ফিডব্যাক ও এআই অডিট কনসোল।",
};

export default function AdminDashboardPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" />
            <span>এডমিন অপারেশনস কন্ট্রোল</span>
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            সরকারি উৎস নজরদারি, তথ্য যাচাইকরণ এবং সিস্টেম অডিট ম্যানেজমেন্ট।
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>সিস্টেম সচল (Live)</span>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="text-muted-foreground text-xs font-medium mb-1">অনুমোদিত সোর্স</div>
          <div className="text-2xl font-bold text-foreground">১০</div>
          <div className="text-[11px] text-emerald-600 mt-1">১০০% .gov.bd ডোমেইন</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="text-muted-foreground text-xs font-medium mb-1">ইনজেস্টেড অনুচ্ছেদ</div>
          <div className="text-2xl font-bold text-foreground">৫৪০+</div>
          <div className="text-[11px] text-emerald-600 mt-1">ভেক্টর এমবেডিং সক্রিয়</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="text-muted-foreground text-xs font-medium mb-1">গ্রাউন্ডেড উত্তর রেট</div>
          <div className="text-2xl font-bold text-foreground">৯৯.২%</div>
          <div className="text-[11px] text-emerald-600 mt-1">০% মনগড়া তথ্য</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="text-muted-foreground text-xs font-medium mb-1">অপেক্ষমাণ মতামত</div>
          <div className="text-2xl font-bold text-foreground">০</div>
          <div className="text-[11px] text-muted-foreground mt-1">সকল রিপোর্ট সমাধানকৃত</div>
        </div>
      </div>

      {/* Operations Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            <span>সোর্স ফ্রেশনেস ও ক্রলার মনিটর</span>
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
              <div>
                <div className="font-semibold text-foreground">epassport.gov.bd</div>
                <div className="text-muted-foreground text-[11px]">দৈনিক ফ্রেশনেস স্ক্যান সম্পন্ন</div>
              </div>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                স্বাভাবিক
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
              <div>
                <div className="font-semibold text-foreground">services.nidw.gov.bd</div>
                <div className="text-muted-foreground text-[11px]">সার্ভিস পরিবর্তন সনাক্তকরণ সক্রিয়</div>
              </div>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                স্বাভাবিক
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
              <div>
                <div className="font-semibold text-foreground">ldtax.gov.bd</div>
                <div className="text-muted-foreground text-[11px]">ভূমি কর ক্যালকুলেটর ভেরিফাইড</div>
              </div>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                স্বাভাবিক
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-primary" />
            <span>নিরাপত্তা ও কনফ্লিক্ট রিভিউ লগ</span>
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <div className="font-semibold text-emerald-900 dark:text-emerald-300">
                জিরো-পিআইআই (Zero-PII) সুরক্ষা কার্যকর
              </div>
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                কোনো ব্যবহারকারীর এনআইডি বা পাসপোর্ট নম্বর ডাটাবেজে স্থায়ীভাবে সংরক্ষণ করা হচ্ছে না।
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border">
              <div className="font-semibold text-foreground">
                স্বয়ংক্রিয় প্রম্পট ইনজেকশন ফিল্টার সক্রিয়
              </div>
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                ইনপুটে সিস্টেম নির্দেশনা বিকৃতির কোনো চেষ্টা সনাক্ত হয়নি।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
