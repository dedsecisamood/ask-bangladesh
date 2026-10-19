"use client";

import * as React from "react";

export type Language = "bn" | "en";

export interface Translations {
  tagline: string;
  disclaimer: string;
  assistant: string;
  services: string;
  sources: string;
  guides: string;
  about: string;
  askButton: string;
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  categories: string;
  servicesCount: string;
  verifiedBadge: string;
  footerDisclaimer: string;
  privacy: string;
  terms: string;
  trust: string;
  feedback: string;
  admin: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  bn: {
    tagline: "সরকারি সেবা সহজ নির্দেশিকা",
    disclaimer: "একটি স্বতন্ত্র উন্মুক্ত উদ্যোগ — বাংলাদেশ সরকারের অফিসিয়াল সেবা গাইড",
    assistant: "এআই সহকারী",
    services: "সেবা ডিরেক্টরি",
    sources: "যাচাইকৃত উৎস",
    guides: "গাইডসমূহ",
    about: "আমাদের সম্পর্কে",
    askButton: "জিজ্ঞাসা করুন",
    heroTitle: "সরকারি সেবা নিয়ে যে কোনো প্রশ্ন করুন",
    heroSubtitle:
      "বাংলা, Banglish বা ইংরেজিতে সরাসরি পাসপোর্ট, এনআইডি, জমির নামজারি বা যে কোনো সরকারি সেবা সম্পর্কে সঠিক ও যাচাইকৃত তথ্য জানুন।",
    searchPlaceholder: "যেমন: ই-পাসপোর্ট রিইস্যু ফি কত? বা NID সংশোধন নিয়ম...",
    categories: "সেবা ক্যাটাগরি সমূহ",
    servicesCount: "টি গুরুত্বপূর্ণ সেবা",
    verifiedBadge: "যাচাইকৃত",
    footerDisclaimer:
      "এটি একটি স্বাধীন ওপেন-সোর্স প্রজেক্ট। এটি বাংলাদেশ সরকারের কোনো দাপ্তরিক ওয়েবসাইট নয়। তথ্যের চূড়ান্ত সত্যতা যাচাইয়ে সংশ্লিষ্ট সরকারি পোর্টালে ভিজিট করুন।",
    privacy: "গোপনীয়তা নীতি",
    terms: "ব্যবহারের শর্তাবলী",
    trust: "স্বচ্ছতা কেন্দ্র",
    feedback: "মতামত ও সংশোধন",
    admin: "এডমিন কনসোল",
  },
  en: {
    tagline: "Simplified Citizen Services Guide",
    disclaimer: "Independent Open Initiative — Bangladesh Government Service Guide",
    assistant: "AI Assistant",
    services: "Service Directory",
    sources: "Verified Sources",
    guides: "Step-by-Step Guides",
    about: "About Us",
    askButton: "Ask Question",
    heroTitle: "Ask Anything About Bangladesh Public Services",
    heroSubtitle:
      "Get accurate, verified guidance on e-Passport, NID, Land records, Taxes, and more in Bangla, Banglish, or English.",
    searchPlaceholder: "e.g., How much is the e-passport reissue fee? or NID correction rules...",
    categories: "Service Categories",
    servicesCount: "vital services",
    verifiedBadge: "Verified",
    footerDisclaimer:
      "This is an independent open-source initiative and is not an official government portal. For official legal proceedings, verify with relevant ministries.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    trust: "Trust Center",
    feedback: "Feedback & Corrections",
    admin: "Admin Console",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>("bn");

  React.useEffect(() => {
    const saved = localStorage.getItem("preferred_lang") as Language | null;
    if (saved && (saved === "bn" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_lang", lang);
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
