"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto min-h-[50vh]">
      <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold mb-2 text-foreground">সাময়িক সমস্যা দেখা দিয়েছে</h2>
      <p className="text-xs text-muted-foreground mb-6">
        পৃষ্ঠাটি লোড হতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
      </p>
      <Button onClick={() => reset()} className="rounded-xl text-xs">
        পুনরায় চেষ্টা করুন
      </Button>
    </div>
  );
}
