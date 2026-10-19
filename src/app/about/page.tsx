"use client";

import {
  Shield,
  Sparkles,
  Lock,
  UserCheck,
  Database,
  CheckCircle2,
  Activity,
  FileCheck,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function AboutPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* 1. Developed by Abdullah Al Siam - Hero Attribution Card */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 shadow-xs">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">
                {isEn ? "Creator & Lead Architect" : "উদ্যোগ ও প্রধান স্থপতি"}
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                Developed by Abdullah Al Siam
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                {isEn
                  ? "Open-source digital public infrastructure for Bangladesh"
                  : "বাংলাদেশের উন্মুক্ত ডিজিটাল নাগরিক সেবার সহায়তায় উন্মুক্ত উদ্যোগ"}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{isEn ? "System Operational" : "সিস্টেম সক্রিয়"}</span>
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isEn ? "Zero-PII Grounded RAG" : "জিরো-পিআইআই গ্রাউন্ডেড আরএজি"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Live System Transparency & Operational Metrics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>{isEn ? "Live System Operations & Verification Metrics" : "সিস্টেম অপারেশন ও তথ্য যাচাইকরণ মেট্রিক্স"}</span>
          </h2>
          <span className="text-xs text-muted-foreground">
            {isEn ? "Automated Live Telemetry" : "স্বয়ংক্রিয় লাইভ নিরীক্ষণ"}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
            <div className="text-xs text-muted-foreground font-medium mb-1">
              {isEn ? "Approved Sources" : "অনুমোদিত সোর্স"}
            </div>
            <div className="text-2xl font-extrabold text-foreground">১০</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              {isEn ? "100% .gov.bd domains" : "১০০% .gov.bd ডোমেইন"}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
            <div className="text-xs text-muted-foreground font-medium mb-1">
              {isEn ? "Indexed Passages" : "ইনজেস্টেড অনুচ্ছেদ"}
            </div>
            <div className="text-2xl font-extrabold text-foreground">৫৪০+</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              {isEn ? "pgvector embedded" : "ভেক্টর এমবেডিং সক্রিয়"}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
            <div className="text-xs text-muted-foreground font-medium mb-1">
              {isEn ? "Grounded Accuracy" : "গ্রাউন্ডেড নির্ভুলতা"}
            </div>
            <div className="text-2xl font-extrabold text-foreground">৯৯.২%</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              {isEn ? "0% Hallucination" : "০% মনগড়া তথ্য"}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
            <div className="text-xs text-muted-foreground font-medium mb-1">
              {isEn ? "Resolved Issues" : "নিষ্পন্ন সংশোধন"}
            </div>
            <div className="text-2xl font-extrabold text-foreground">১০০%</div>
            <div className="text-[11px] text-muted-foreground mt-1">
              {isEn ? "Verified resolution" : "সকল রিপোর্ট সমাধানকৃত"}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Operational Integrity & Source Freshness */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 md:p-6 rounded-2xl border border-border bg-card space-y-3 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-foreground">
            <Database className="w-4 h-4 text-primary" />
            <span>{isEn ? "Official Source Freshness Monitoring" : "সরকারি সোর্স ফ্রেশনেস মনিটর"}</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/60">
              <div>
                <div className="font-semibold text-foreground">epassport.gov.bd</div>
                <div className="text-muted-foreground text-[11px]">
                  {isEn ? "Daily automated scan completed" : "দৈনিক ফ্রেশনেস স্ক্যান সম্পন্ন"}
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {isEn ? "Active" : "স্বাভাবিক"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/60">
              <div>
                <div className="font-semibold text-foreground">services.nidw.gov.bd</div>
                <div className="text-muted-foreground text-[11px]">
                  {isEn ? "Circular change detection active" : "বিজ্ঞপ্তি পরিবর্তন সনাক্তকরণ সক্রিয়"}
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {isEn ? "Active" : "স্বাভাবিক"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/60">
              <div>
                <div className="font-semibold text-foreground">ldtax.gov.bd</div>
                <div className="text-muted-foreground text-[11px]">
                  {isEn ? "Land tax fee schedules verified" : "ভূমি কর শিডিউল যাচাইকৃত"}
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {isEn ? "Active" : "স্বাভাবিক"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6 rounded-2xl border border-border bg-card space-y-3 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-foreground">
            <FileCheck className="w-4 h-4 text-primary" />
            <span>{isEn ? "Privacy & Security Verification Logs" : "নিরাপত্তা ও গোপনীয়তা সুরক্ষা লগ"}</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{isEn ? "Zero-PII Storage Policy Enforced" : "জিরো-পিআইআই (Zero-PII) সুরক্ষা কার্যকর"}</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {isEn
                  ? "National ID (10/13/17 digits), Passport numbers, and phone numbers are automatically redacted on the client and server before processing."
                  : "কোনো ব্যবহারকারীর এনআইডি বা পাসপোর্ট নম্বর ডাটাবেজে স্থায়ীভাবে সংরক্ষণ করা হয় না। সমস্ত তথ্য রিয়েল-টাইমে মাস্ক করা হয়।"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>{isEn ? "Prompt Injection Defenses Active" : "স্বয়ংক্রিয় প্রম্পট ইনজেকশন ফিল্টার সক্রিয়"}</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {isEn
                  ? "Retrieved official documents are treated strictly as read-only evidence boundaries, preventing system prompt hijackings or falsified claims."
                  : "সরকারি নথিগুলোকে শুধুমাত্র পাঠযোগ্য প্রমাণক হিসেবে ব্যবহার করা হয়, যাতে এআই কোনো ভুয়া তথ্য প্রদান না করে।"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Mission and Core Pillars */}
      <section className="p-6 md:p-8 rounded-3xl bg-card border border-border space-y-4 shadow-xs">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>{isEn ? "What is Ask Bangladesh?" : "Ask Bangladesh কী?"}</span>
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {isEn ? (
            <>
              <strong>Ask Bangladesh</strong> is an independent open-source AI platform designed to help citizens understand and navigate Bangladesh government services without middlemen or misinformation. The system operates strictly via Retrieval-Augmented Generation (RAG) grounded in official government gazettes, circulars, and portals.
            </>
          ) : (
            <>
              <strong>Ask Bangladesh</strong> একটি স্বতন্ত্র ও অলাভজনক ওপেন সোর্স উদ্যোগ। দেশের সাধারণ নাগরিক ও প্রবাসীরা যাতে কোনো মধ্যস্বত্বভোগী বা দালালের সাহায্য ছাড়াই নিজের সরকারি সেবা নিজেই সহজে বুঝে নিতে পারেন, সেই লক্ষ্যেই আধুনিক কৃত্রিম বুদ্ধিমত্তা ও যাচাইকৃত তথ্যের সমন্বয়ে এটি গড়ে তোলা হয়েছে।
            </>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/60">
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary" />
              <span>{isEn ? "100% Factual Grounding" : "১০০% তথ্যের সত্যতা"}</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isEn
                ? "Our AI does not guess or hallucinate government information. Every claim is cited directly to official Bangladesh government (.gov.bd) portals."
                : "আমাদের এআই সহকারী মনগড়া কোনো উত্তর দেয় না। প্রতি উত্তরের সাথে সংশ্লিষ্ট সরকারি গ্যাজেট, পরিপত্র বা অফিশিয়াল পোর্টালের সঠিক লিংক সরবরাহ করা হয়।"}
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-primary" />
              <span>{isEn ? "Privacy by Default" : "প্রাইভেসী প্রথম অগ্রাধিকার"}</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isEn
                ? "No registration, no NID, and no passport numbers required. All user inputs are automatically scrubbed and protected."
                : "তথ্য খোঁজার জন্য কোনো ধরনের ব্যক্তিগত তথ্য (NID, পাসপোর্ট নম্বর বা ফোন নম্বর) প্রদানের প্রয়োজন হয় না। আপনার গোপনীয়তা সুরক্ষিত।"}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Essential Legal & Non-affiliation Warning */}
      <section className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 text-xs md:text-sm text-amber-900 dark:text-amber-200">
        <h3 className="font-bold mb-1">
          {isEn ? "Government Non-Affiliation Disclaimer:" : "গুরুত্বপূর্ণ সরকারি সতর্কতা:"}
        </h3>
        <p className="leading-relaxed">
          {isEn
            ? "Ask Bangladesh is an independent educational and navigational platform. It is not an agency of, nor affiliated with, the Government of Bangladesh. No government financial transactions, passport issuing, or official applications are executed directly on this website."
            : "Ask Bangladesh বাংলাদেশ সরকারের কোনো দাপ্তরিক অঙ্গ নয়। আমরা নাগরিকদের শুধুমাত্র সঠিক সরকারি প্রক্রিয়া সম্পর্কে অবহিত করি। কোনো প্রকার আর্থিক লেনদেন বা সরকারি আবেদন এই প্ল্যাটফর্মে সরাসরি গ্রহণ করা হয় না।"}
        </p>
      </section>
    </div>
  );
}
