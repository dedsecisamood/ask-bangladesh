"use client";

import * as React from "react";
import { MessageSquarePlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [category, setCategory] = React.useState("correction");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="container max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
          মতামত ও সংশোধন প্রস্তাব
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          কোনো তথ্যে অমিল বা নতুন সরকারি সেবার নিয়ম আপডেট থাকলে আমাদের জানান।
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h2 className="text-lg font-bold text-foreground">ধন্যবাদ! আপনার মতামত গৃহীত হয়েছে।</h2>
          <p className="text-xs text-muted-foreground">
            আমাদের এডমিন টিম বিষয়টি অফিশিয়াল পোর্টাল থেকে যাচাই করে দ্রুত সংশোধন করবেন।
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setComment("");
            }}
            className="mt-2 text-xs"
          >
            আরেকটি মতামত পাঠান
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
          <div>
            <label className="block text-xs font-semibold mb-1 text-foreground">
              মতামতের ধরন
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="correction">ভুল বা পুরোনো তথ্য সংশোধন</option>
              <option value="broken-link">ভাঙা বা অকার্যকর সরকারি লিংক</option>
              <option value="new-service">নতুন সেবা সংযুক্তির প্রস্তাব</option>
              <option value="other">অন্যান্য মতামত</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-foreground">
              বিস্তারিত বিবরণ
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="সঠিক তথ্যের লিংক বা আপনার মূল্যবান পরামর্শ লিখুন..."
              className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>

          <Button type="submit" className="w-full rounded-xl">
            মতামত জমা দিন
          </Button>
        </form>
      )}
    </div>
  );
}
