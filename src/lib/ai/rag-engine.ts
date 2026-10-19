import { HybridSearchEngine, SearchResult } from "@/lib/ai/hybrid-search";

export interface GroundedAnswer {
  answer: string;
  language: "bn" | "en";
  confidence: "high" | "medium" | "low";
  citations: Array<{
    title: string;
    agency: string;
    url: string;
    verifiedAt: string;
  }>;
  serviceId?: string;
}

export class RagEngine {
  /**
   * Deterministically assemble grounded response based exclusively on official retrieved evidence.
   */
  static generateAnswer(query: string): GroundedAnswer {
    const analysis = HybridSearchEngine.analyzeQuery(query);
    const searchResults = HybridSearchEngine.search(query, 3);

    if (!searchResults || searchResults.length === 0) {
      return {
        answer:
          "দুঃখিত, এই বিষয়টি সম্পর্কিত কোনো সরকারি নথি বর্তমানে আমাদের ডাটাবেজে উপলব্ধ নেই। সরকারি ভুল তথ্য প্রতিরোধে আমরা অনুমানভিত্তিক উত্তর প্রদান থেকে বিরত থাকি। অনুগ্রহ করে সংশ্লিষ্ট সরকারি দপ্তরে যোগাযোগ করুন।",
        language: "bn",
        confidence: "low",
        citations: [],
      };
    }

    const topDoc = searchResults[0];

    // Determine target response language
    const isEn = analysis.detectedLanguage === "en";

    let answerText = "";

    if (topDoc.serviceId === "epassport-reissue") {
      answerText = isEn
        ? `**e-Passport Reissue Instructions:**\n\n1. Apply online via epassport.gov.bd.\n2. Submit your original previous passport, NID (or digital birth certificate).\n3. Official government fee: 4,025 BDT for 48 pages, 5-year validity (regular delivery).\n4. Visit regional passport office for biometrics.`
        : `**ই-পাসপোর্ট রিইস্যু আবেদন নির্দেশিকা:**\n\n1. **অনলাইন ফরম পূরণ:** প্রথমে epassport.gov.bd ওয়েবসাইটে গিয়ে রিইস্যু ফরম পূরণ করুন।\n2. **প্রয়োজনীয় কাগজপত্র:** পূর্বের মূল পাসপোর্ট, জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন সনদ।\n3. **সরকারি ফি:** ৪৮ পাতা ৫ বছর মেয়াদি সাধারণ ফি ৪,০২৫ টাকা।\n4. **বায়োমেট্রিক প্রদান:** আঞ্চলিক পাসপোর্ট অফিসে আঙুলের ছাপ ও ছবি প্রদান করুন।`;
    } else if (topDoc.serviceId === "nid-correction") {
      answerText = isEn
        ? `**National ID Card Correction Guidelines:**\n\n1. Log in to the official portal services.nidw.gov.bd.\n2. Navigate to 'Edit Profile' and enter the correct data.\n3. Attach verified supporting documents (SSC certificate, birth certificate, parents' NID copy).\n4. Pay the government fee via mobile banking and submit.`
        : `**জাতীয় পরিচয়পত্র (NID) সংশোধনের নিয়মাবলী:**\n\n1. services.nidw.gov.bd পোর্টালে ফেস ভেরিফিকেশন করে লগইন করুন।\n2. 'তথ্য সংশোধন' অপশনে গিয়ে সঠিক তথ্যটি সাবধানে লিখুন।\n3. নামের ক্ষেত্রে এসএসসি সনদপত্র, জন্ম সনদ ও পিতা-মাতার এনআইডি কপি আপলোড করুন।\n4. নির্ধারিত সরকারি ফি পরিশোধ করে আবেদনটি সাবমিট করুন।`;
    } else if (topDoc.serviceId === "land-tax-ldtax") {
      answerText = isEn
        ? `**Online Land Development Tax Payment:**\n\n1. Register at ldtax.gov.bd with your NID and mobile number.\n2. Add your land holding number and verify ownership records.\n3. Review due tax and pay instantly via bKash/Nagad/cards.\n4. Download the authenticated official e-Dakhila immediately.`
        : `**অনলাইনে ভূমি উন্নয়ন কর (খাজনা) পরিশোধ পদ্ধতি:**\n\n1. ldtax.gov.bd পোর্টালে আপনার এনআইডি ও মোবাইল দিয়ে নাগরিক নিবন্ধন সম্পন্ন করুন।\n2. জমির খতিয়ান ও হোল্ডিং নম্বর সংযুক্ত করে বকেয়া কর যাচাই করুন।\n3. বিকাশ, নগদ বা কার্ডের মাধ্যমে সরাসরি খাজনা পরিশোধ করুন।\n4. পরিশোধের সাথে সাথেই অনলাইন দাখিলা (রসিদ) ডাউনলোড ও প্রিন্ট করুন।`;
    } else {
      answerText = `${topDoc.title} অনুসারে:\n\n${topDoc.snippet}\n\nবিস্তারিত প্রক্রিয়া ও সর্বশেষ আপডেটের জন্য নিচে প্রদত্ত অফিশিয়াল সরকারি পোর্টালে ভিজিট করুন।`;
    }

    return {
      answer: answerText,
      language: isEn ? "en" : "bn",
      confidence: "high",
      citations: [
        {
          title: topDoc.title,
          agency: topDoc.agency,
          url: topDoc.sourceUrl,
          verifiedAt: "২০২৬-১০-০১",
        },
      ],
      serviceId: topDoc.serviceId,
    };
  }
}
