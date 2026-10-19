import { describe, it, expect } from "vitest";
import { RagEngine } from "./rag-engine";

describe("RagEngine", () => {
  it("generates grounded passport guidance with official citations", () => {
    const result = RagEngine.generateAnswer("ই-পাসপোর্ট আবেদনের জন্য ফি কত?");
    expect(result.confidence).toBe("high");
    expect(result.answer).toContain("৪,০২৫");
    expect(result.citations.length).toBeGreaterThan(0);
    expect(result.citations[0].url).toContain("epassport.gov.bd");
  });

  it("handles Banglish queries and responds in Bangla", () => {
    const result = RagEngine.generateAnswer("amar nid te name vul kivabe thik korbo");
    expect(result.confidence).toBe("high");
    expect(result.language).toBe("bn");
    expect(result.citations[0].url).toContain("services.nidw.gov.bd");
  });

  it("handles English questions and provides English guidance", () => {
    const result = RagEngine.generateAnswer("How to pay land tax online?");
    expect(result.language).toBe("en");
    expect(result.answer).toContain("ldtax.gov.bd");
    expect(result.citations[0].agency).toBe("ভূমি মন্ত্রণালয়");
  });
});
