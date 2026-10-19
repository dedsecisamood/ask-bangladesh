import { Lock, ShieldCheck, EyeOff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি — Ask Bangladesh",
  description: "Ask Bangladesh প্ল্যাটফর্মের গোপনীয়তা নীতি ও নাগরিক তথ্যের সুরক্ষা প্রতিশ্রুতি।",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4">গোপনীয়তা নীতি (Privacy Policy)</h1>
      <p className="text-sm text-muted-foreground mb-8">সর্বশেষ আপডেট: অক্টোবর ২০২৬</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/90">
        <section className="p-5 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-primary" />
            <span>১. আমরা কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না</span>
          </h2>
          <p className="text-muted-foreground">
            Ask Bangladesh ব্যবহারে কোনো রেজিস্ট্রেশন, জাতীয় পরিচয়পত্র নম্বর, পাসপোর্ট নম্বর বা ব্যাংক অ্যাকাউন্টের তথ্যের প্রয়োজন নেই। সাধারণ প্রশ্নের ক্ষেত্রে কোনো ট্র্যাকিং বা পরিচয় সংরক্ষণ করা হয় না।
          </p>
        </section>

        <section className="p-5 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span>২. স্বয়ংক্রিয় সংবেদনশীল তথ্য গোপনকরণ (Redaction)</span>
          </h2>
          <p className="text-muted-foreground">
            ব্যবহারকারী ভুলে কোনো মেসেজে এনআইডি নম্বর বা মোবাইল নম্বর লিখে ফেললে আমাদের ক্লায়েন্ট ও সার্ভার সিস্টেম তা তাৎক্ষণিকভাবে মাস্ক বা মুছে ফেলে।
          </p>
        </section>
      </div>
    </div>
  );
}
