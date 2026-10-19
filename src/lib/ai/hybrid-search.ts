export interface SearchResult {
  passageId: string;
  serviceId?: string;
  title: string;
  agency: string;
  sourceUrl: string;
  snippet: string;
  score: number;
}

export interface RetrievalQuery {
  rawQuery: string;
  normalizedQuery: string;
  detectedLanguage: "bn" | "banglish" | "en";
  serviceCategory?: string;
}

export class HybridSearchEngine {
  static analyzeQuery(query: string): RetrievalQuery {
    const trimmed = query.trim();
    const hasBanglaChar = /[\u0980-\u09FF]/.test(trimmed);

    let detectedLang: "bn" | "banglish" | "en" = "en";
    if (hasBanglaChar) {
      detectedLang = "bn";
    } else {
      const banglishWords = ["kivabe", "korbo", "lagbe", "korte", "hobe", "amar", "nam", "vul", "ki", "koto", "ase"];
      const words = trimmed.toLowerCase().split(/\s+/);
      const isBanglish = words.some((w) => banglishWords.includes(w));
      detectedLang = isBanglish ? "banglish" : "en";
    }

    return {
      rawQuery: trimmed,
      normalizedQuery: trimmed.toLowerCase(),
      detectedLanguage: detectedLang,
    };
  }

  static search(query: string, limit: number = 5): SearchResult[] {
    const analysis = this.analyzeQuery(query);
    const qLower = analysis.normalizedQuery;

    const knowledgeBase: SearchResult[] = [
      {
        passageId: "p-passport-reissue",
        serviceId: "epassport-reissue",
        title: "ই-পাসপোর্ট রিইস্যু আবেদন নির্দেশিকা",
        agency: "ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর",
        sourceUrl: "https://www.epassport.gov.bd/instructions/instructions",
        snippet:
          "মেয়াদোত্তীর্ণ বা হারানো পাসপোর্ট রিইস্যুর জন্য অনলাইন আবেদন ফরম, পূর্ববর্তী মূল পাসপোর্ট, জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম সনদ আবশ্যক। ৪৮ পাতা ৫ বছর মেয়াদি ফি ৪,০২৫ টাকা।",
        score: 0.5,
      },
      {
        passageId: "p-nid-correction",
        serviceId: "nid-correction",
        title: "জাতীয় পরিচয়পত্র সংশোধন নির্দেশিকা ও ডকুমেন্টস তালিকা",
        agency: "জাতীয় পরিচয় নিবন্ধন অনুবিভাগ",
        sourceUrl: "https://services.nidw.gov.bd",
        snippet:
          "এনআইডি কার্ডে নিজের নাম সংশোধনের ক্ষেত্রে এসএসসি বা সমমান সনদপত্র, অনলাইন জন্ম সনদপত্র এবং পিতা-মাতার এনআইডি কার্ডের কপি জমা দিতে হবে। ফি মোবাইল ব্যাংকিংয়ের মাধ্যমে পরিশোধযোগ্য।",
        score: 0.5,
      },
      {
        passageId: "p-land-tax",
        serviceId: "land-tax-ldtax",
        title: "অনলাইন ভূমি উন্নয়ন কর (খাজনা) পরিশোধ পদ্ধতি",
        agency: "ভূমি মন্ত্রণালয়",
        sourceUrl: "https://ldtax.gov.bd",
        snippet:
          "ldtax.gov.bd পোর্টালে নাগরিক নিবন্ধন সম্পন্ন করে হোল্ডিং নম্বর ও খতিয়ান দিয়ে বকেয়া কর দেখে সরাসরি বিকাশ, নগদ বা ব্যাংকে অনলাইনে খাজনা পরিশোধ করে তাৎক্ষণিক দাখিলা প্রিন্ট নেওয়া যায়।",
        score: 0.5,
      },
      {
        passageId: "p-e-namjari",
        serviceId: "e-namjari",
        title: "ই-নামজারি (মিউটেশন) আবেদন ও নিষ্পত্তির সময়সীমা",
        agency: "ভূমি মন্ত্রণালয়",
        sourceUrl: "https://mutation.land.gov.bd",
        snippet:
          "ভূমি হস্তান্তরের পর রেকর্ড সংশোধনের জন্য ই-নামজারি আবেদন করতে হয়। মোট সরকারি ফি ১,১৭০ টাকা এবং নিষ্পত্তির নির্ধারিত সর্বোচ্চ সময়সীমা ২৮ কর্মদিবস।",
        score: 0.5,
      },
    ];

    const ranked = knowledgeBase
      .map((item) => {
        let matchScore = 0;
        const targetText = (item.title + " " + item.snippet).toLowerCase();
        
        // Exact term bonus
        const terms = qLower.split(/\s+/);
        terms.forEach((t) => {
          if (t.length > 2 && targetText.includes(t)) {
            matchScore += 0.2;
          }
        });

        // Intent matching
        if (
          (qLower.includes("passport") || qLower.includes("পাসপোর্ট")) &&
          item.serviceId?.includes("passport")
        ) {
          matchScore += 1.0;
        }
        if (
          (qLower.includes("nid") || qLower.includes("পরিচয়পত্র") || qLower.includes("ভোটার")) &&
          item.serviceId?.includes("nid")
        ) {
          matchScore += 1.0;
        }
        if (
          (qLower.includes("land") || qLower.includes("খাজনা") || qLower.includes("জমি") || qLower.includes("নামজারি")) &&
          (item.serviceId?.includes("land") || item.serviceId?.includes("namjari"))
        ) {
          matchScore += 1.0;
        }

        return { ...item, score: item.score + matchScore };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return ranked;
  }
}
