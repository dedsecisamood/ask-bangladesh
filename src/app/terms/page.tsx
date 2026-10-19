import { ShieldAlert, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ব্যবহারের শর্তাবলী — Ask Bangladesh",
  description: "Ask Bangladesh প্ল্যাটফর্ম ব্যবহারের সাধারণ শর্তাবলী ও আইনি নীতিমালা।",
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4">ব্যবহারের শর্তাবলী (Terms of Use)</h1>
      <p className="text-sm text-muted-foreground mb-8">সর্বশেষ আপডেট: অক্টোবর ২০২৬</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/90">
        <section className="p-5 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span>১. তথ্যের নির্ভরযোগ্যতা ও সীমাবদ্ধতা</span>
          </h2>
          <p className="text-muted-foreground">
            এই প্ল্যাটফর্মের সকল তথ্য সরকারের বিভিন্ন অফিশিয়াল পোর্টাল থেকে সংগৃহীত। তবে সরকারি নিয়মাবলি প্রতিনিয়ত পরিবর্তনশীল বিধায় যেকোনো চূড়ান্ত সিদ্ধান্তের ক্ষেত্রে সংশ্লিষ্ট মন্ত্রণালয়ের ওয়েবসাইট বা অফিসে যাচাই করার পরামর্শ দেওয়া হচ্ছে।
          </p>
        </section>

        <section className="p-5 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>২. অবাণিজ্যিক নাগরিক সেবা</span>
          </h2>
          <p className="text-muted-foreground">
            Ask Bangladesh সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য নাগরিক সেবা। এখানে কোনো প্রকার বাণিজ্যিক ফি ধার্য করা হয় না।
          </p>
        </section>
      </div>
    </div>
  );
}
