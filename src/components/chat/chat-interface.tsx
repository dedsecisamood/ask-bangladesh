"use client";

import * as React from "react";
import { Send, Sparkles, AlertCircle, ExternalLink, ThumbsUp, ThumbsDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Citation {
  title: string;
  agency: string;
  url: string;
  verifiedAt: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "ই-পাসপোর্ট রিইস্যু করতে কি কি কাগজ লাগে?",
  "জাতীয় পরিচয়পত্রে নামের বানান ভুল হলে সংশোধনের নিয়ম কী?",
  "অনলাইনে জমির খাজনা (ভূমি উন্নয়ন কর) কীভাবে দেব?",
  "জন্ম নিবন্ধন অনলাইনে যাচাই করব কীভাবে?",
];

export function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "স্বাগতম! আমি Ask Bangladesh এআই সহকারী। বাংলাদেশ সরকারের পাসপোর্ট, জাতীয় পরিচয়পত্র (NID), ভূমিসেবা, জন্মনিবন্ধনসহ বিভিন্ন সেবা সম্পর্কিত যেকোনো প্রশ্ন করুন। আমি নির্ভরযোগ্য সরকারি তথ্যের ভিত্তিতে উত্তর দেব।",
      timestamp: "এখন",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: "এখন",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Demonstration simulated RAG response with accurate official grounding citations
    setTimeout(() => {
      let reply: Message;

      if (userText.toLowerCase().includes("passport") || userText.includes("পাসপোর্ট")) {
        reply = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            "**ই-পাসপোর্ট আবেদনের প্রয়োজনীয় নির্দেশনাবলী:**\n\n1. **অনলাইন আবেদন:** প্রথমে epassport.gov.bd ওয়েবসাইটে গিয়ে অনলাইন ফরম পূরণ করুন।\n2. **প্রয়োজনীয় কাগজপত্র:**\n   - মূল জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন সনদ (১৮ বছরের নিচে)।\n   - পূর্বের পাসপোর্টের মূল কপি (যদি রিইস্যু হয়)।\n   - পেশাগত সনদপত্র (প্রযোজ্য ক্ষেত্রে)।\n3. **ফি প্রদান:** নির্ধারিত ব্যাংক বা চালানের মাধ্যমে সরকারি ফি জমা দিন (৪৮ পাতা ৫ বছর মেয়াদি ফি: ৪,০২৫ টাকা সাধারণ)।\n4. **বায়োমেট্রিক প্রদান:** আঞ্চলিক পাসপোর্ট অফিসে ছবি ও আঙুলের ছাপ প্রদান করুন।",
          citations: [
            {
              title: "ই-পাসপোর্ট আবেদন নির্দেশিকা ও ফি বিবরণী",
              agency: "ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর",
              url: "https://www.epassport.gov.bd/instructions/instructions",
              verifiedAt: "২০২৬-১০-০১",
            },
          ],
          timestamp: "এইমাত্র",
        };
      } else if (userText.toLowerCase().includes("nid") || userText.includes("পরিচয়পত্র")) {
        reply = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            "**জাতীয় পরিচয়পত্র (NID) সংশোধনের নিয়মাবলী:**\n\n1. services.nidw.gov.bd পোর্টালে লগইন বা রেজিস্ট্রেশন করুন।\n2. 'তথ্য পরিবর্তন' অপশনে গিয়ে ভুল তথ্যটি সঠিকভাবে লিখুন।\n3. প্রয়োজনীয় প্রমাণক সংযুক্তি:\n   - নিজের নামের জন্য: এসএসসি/সমমান সনদপত্র, জন্ম সনদ, পাসপোর্ট ইত্যাদি।\n   - পিতা/মাতার নামের জন্য: পিতা/মাতার এনআইডি কপি ও ওয়ারিশ সনদ।\n4. নির্ধারিত সংশোধন সরকারি ফি মোবাইল ব্যাংকিংয়ের মাধ্যমে পরিশোধ করে আবেদন সাবমিট করুন।",
          citations: [
            {
              title: "জাতীয় পরিচয়পত্র সংশোধন নির্দেশিকা",
              agency: "জাতীয় পরিচয় নিবন্ধন অনুবিভাগ (নির্বাচন কমিশন)",
              url: "https://services.nidw.gov.bd",
              verifiedAt: "২০২৬-১০-০৫",
            },
          ],
          timestamp: "এইমাত্র",
        };
      } else {
        reply = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: `আপনার প্রশ্নটির উত্তর সরকারি ডাটাবেজ থেকে যাচাই করা হচ্ছে: "${userText}"।\n\nসরকারি সেবার সঠিক নিয়মের জন্য অনুগ্রহ করে সংশ্লিষ্ট ক্যাটাগরি ব্রাউজ করুন অথবা সরাসরি সার্চ বক্সে সুনির্দিষ্ট প্রশ্ন লিখুন। এই প্ল্যাটফর্মে প্রদানকৃত সমস্ত তথ্য শুধুমাত্র বাংলাদেশ সরকারের সরকারি পোর্টালসমূহ থেকে গৃহীত।`,
          citations: [
            {
              title: "বাংলাদেশ জাতীয় তথ্য বাতায়ন",
              agency: "তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ",
              url: "https://bangladesh.gov.bd",
              verifiedAt: "২০২৬-১০-১৫",
            },
          ],
          timestamp: "এইমাত্র",
        };
      }

      setMessages((prev) => [...prev, reply]);
      setIsLoading(false);
    }, 750);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] max-w-4xl w-full mx-auto p-4">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-xs"
                  : "bg-card border border-border text-foreground rounded-bl-xs"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>

              {/* Citations Box for AI answers */}
              {m.citations && m.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>যাচাইকৃত সরকারি তথ্যসূত্র:</span>
                  </div>
                  <div className="space-y-1">
                    {m.citations.map((c, idx) => (
                      <a
                        key={idx}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline font-medium block"
                      >
                        <span>{c.agency} — {c.title}</span>
                        <ExternalLink className="w-3 h-3 inline" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Micro timestamp & feedback for bot */}
            {m.role === "assistant" && m.id !== "welcome-msg" && (
              <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-muted-foreground">
                <span>{m.timestamp}</span>
                <span className="opacity-40">•</span>
                <button
                  type="button"
                  className="hover:text-foreground inline-flex items-center gap-0.5"
                  title="উপকারী"
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  className="hover:text-foreground inline-flex items-center gap-0.5"
                  title="সঠিক নয়"
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/40 rounded-2xl max-w-[200px]">
            <Sparkles className="w-4 h-4 animate-spin text-primary" />
            <span>সরকারি তথ্য খোঁজা হচ্ছে...</span>
          </div>
        )}
      </div>

      {/* Quick Suggestions Chips */}
      {messages.length === 1 && (
        <div className="py-2 flex flex-wrap gap-2">
          {INITIAL_SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInput(s);
              }}
              className="text-xs bg-muted/60 hover:bg-muted text-foreground px-3 py-1.5 rounded-full border border-border transition-colors text-left"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="আপনার প্রশ্নটি এখানে লিখুন (বাংলা, Banglish বা English)..."
          className="flex-1 bg-card border border-border shadow-sm rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-xl px-4 py-3 h-auto"
        >
          <Send className="w-4 h-4" />
          <span className="sr-only">পাঠান</span>
        </Button>
      </form>
    </div>
  );
}
