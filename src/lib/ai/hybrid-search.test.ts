import { describe, it, expect } from "vitest";
import { HybridSearchEngine } from "./hybrid-search";

describe("HybridSearchEngine", () => {
  it("detects Bangla language correctly", () => {
    const analysis = HybridSearchEngine.analyzeQuery("আমার পাসপোর্ট কীভাবে রিইস্যু করব?");
    expect(analysis.detectedLanguage).toBe("bn");
  });

  it("detects Banglish language accurately", () => {
    const analysis = HybridSearchEngine.analyzeQuery("passport kivabe renew korbo");
    expect(analysis.detectedLanguage).toBe("banglish");
  });

  it("detects English language accurately", () => {
    const analysis = HybridSearchEngine.analyzeQuery("How to correct my national id card?");
    expect(analysis.detectedLanguage).toBe("en");
  });

  it("retrieves official passport sources when queried", () => {
    const results = HybridSearchEngine.search("ই-পাসপোর্ট রিইস্যু ফি কত?");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].agency).toBe("ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর");
    expect(results[0].sourceUrl).toContain("epassport.gov.bd");
  });

  it("retrieves official NID sources when queried in Banglish", () => {
    const results = HybridSearchEngine.search("nid name correction kivabe korbo");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].agency).toBe("জাতীয় পরিচয় নিবন্ধন অনুবিভাগ");
    expect(results[0].sourceUrl).toContain("services.nidw.gov.bd");
  });
});
