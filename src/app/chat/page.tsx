import { ChatInterface } from "@/components/chat/chat-interface";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "এআই সহকারী — সরকারি সেবা সংক্রান্ত প্রশ্ন করুন",
  description:
    "বাংলাদেশ সরকারের বিভিন্ন সেবা সম্পর্কিত প্রশ্ন করুন এবং সরাসরি যাচাইকৃত তথ্যের আলোকে নির্ভরযোগ্য উত্তর ও সরকারি লিংক পান।",
};

export default function ChatPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <ChatInterface />
    </main>
  );
}
