import { Shield, Sparkles, Lock, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে — Ask Bangladesh",
  description: "Ask Bangladesh প্রজেক্টের লক্ষ্য, উদ্দেশ্য এবং পরিচালনার নীতিসমূহ।",
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          আমাদের লক্ষ্য ও উদ্দেশ্য
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          বাংলাদেশের প্রতিটি নাগরিকের কাছে সরকারি সেবার তথ্যাবলি সহজে ও নিরাপদে পৌঁছে দেওয়া।
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">
        <section className="p-6 rounded-2xl bg-card border border-border">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Ask Bangladesh কী?</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            <strong>Ask Bangladesh</strong> একটি স্বতন্ত্র ও অলাভজনক ওপেন সোর্স উদ্যোগ। দেশের সাধারণ নাগরিক ও প্রবাসীরা যাতে কোনো মধ্যস্বত্বভোগী বা দালালের সাহায্য ছাড়াই নিজের সরকারি সেবা নিজেই সহজে বুঝে নিতে পারেন, সেই লক্ষ্যেই আধুনিক কৃত্রিম বুদ্ধিমত্তা ও যাচাইকৃত তথ্যের সমন্বয়ে এটি গড়ে তোলা হয়েছে।
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base mb-2">১০০% তথ্যের সত্যতা</h3>
            <p className="text-xs text-muted-foreground">
              আমাদের এআই সহকারী মনগড়া কোনো উত্তর দেয় না। প্রতি উত্তরের সাথে সংশ্লিষ্ট সরকারি গ্যাজেট, পরিপত্র বা অফিশিয়াল পোর্টালের সঠিক লিংক সরবরাহ করা হয়।
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base mb-2">প্রাইভেসী প্রথম অগ্রাধিকার</h3>
            <p className="text-xs text-muted-foreground">
              তথ্য খোঁজার জন্য কোনো ধরনের ব্যক্তিগত তথ্য (NID, পাসপোর্ট নম্বর বা ফোন নম্বর) প্রদানের প্রয়োজন হয় না। আপনার গোপনীয়তা সুরক্ষিত।
            </p>
          </div>
        </section>

        <section className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 text-xs md:text-sm text-amber-900 dark:text-amber-200">
          <h3 className="font-bold mb-1">গুরুত্বপূর্ণ সরকারি সতর্কতা:</h3>
          <p>
            Ask Bangladesh বাংলাদেশ সরকারের কোনো দাপ্তরিক অঙ্গ নয়। আমরা নাগরিকদের শুধুমাত্র সঠিক সরকারি প্রক্রিয়া সম্পর্কে অবহিত করি। কোনো প্রকার আর্থিক লেনদেন বা সরকারি আবেদন এই প্ল্যাটফর্মে সরাসরি গ্রহণ করা হয় না।
          </p>
        </section>
      </div>
    </div>
  );
}
