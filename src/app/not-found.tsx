"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto min-h-[50vh]">
      <h1 className="text-5xl font-black text-primary mb-2">৪০৪</h1>
      <h2 className="text-xl font-bold mb-3 text-foreground">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
      <p className="text-sm text-muted-foreground mb-6">
        আপনি যে লিংকটি খুঁজছেন তা স্থানান্তরিত বা পরিবর্তিত হয়ে থাকতে পারে।
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>নীড়পাতায় ফিরে যান</span>
      </Link>
    </div>
  );
}
