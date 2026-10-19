import Link from "next/link";
import { CATEGORIES, SERVICES } from "@/lib/services/directory-data";
import { ExternalLink, Clock, Banknote, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সরকারি সেবা ডিরেক্টরি — সকল সরকারি সেবা এক নজরে",
  description:
    "পাসপোর্ট, এনআইডি, ভূমিসেবা, ট্যাক্সসহ বাংলাদেশ সরকারের বিভিন্ন ক্যাটাগরির সেবা এবং সরকারি ওয়েবসাইটের সরাসরি লিংক।",
};

export default function ServicesPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
          সরকারি সেবা ডিরেক্টরি
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          প্রয়োজনীয় সরকারি সেবাগুলো ক্যাটাগরি অনুযায়ী সাজানো হয়েছে। যেকোনো সেবার বিস্তারিত তথ্য ও অফিশিয়াল আবেদন লিংক সরাসরি দেখুন।
        </p>
      </div>

      {/* Categories Grid */}
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>সেবা ক্যাটাগরি সমূহ</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-base mb-1">{cat.nameBn}</h3>
                <p className="text-xs text-muted-foreground mb-3">{cat.descriptionBn}</p>
              </div>
              <div className="text-[11px] text-primary font-medium">
                {cat.serviceCount} টি গুরুত্বপূর্ণ সেবা
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>জনপ্রিয় ও আবশ্যকীয় সেবাসমূহ</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:shadow transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-foreground leading-snug">
                    {srv.nameBn}
                  </h3>
                  <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                    যাচাইকৃত
                  </span>
                </div>
                <p className="text-xs text-primary font-medium mb-2">
                  {srv.agencyBn}
                </p>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {srv.descriptionBn}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border/40 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>প্রদানের সময়:</span>
                  </span>
                  <span className="font-medium text-foreground">{srv.deliveryTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Banknote className="w-3.5 h-3.5 text-primary" />
                    <span>সরকারি ফি:</span>
                  </span>
                  <span className="font-medium text-foreground">{srv.fee}</span>
                </div>

                <div className="pt-2">
                  <a
                    href={srv.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-xs transition-colors"
                  >
                    <span>সরকারি পোর্টালে সরাসরি যান</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
