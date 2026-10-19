import { describe, it, expect } from "vitest";
import { cn, toBanglaDigits, formatBanglaDate } from "./index";

describe("Utility functions", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      expect(cn("px-2 py-1", "bg-blue-500")).toBe("px-2 py-1 bg-blue-500");
    });

    it("resolves tailwind conflicts appropriately", () => {
      expect(cn("p-2", "p-4")).toBe("p-4");
    });
  });

  describe("toBanglaDigits", () => {
    it("converts english numerals to bangla numerals", () => {
      expect(toBanglaDigits(12345)).toBe("১২৩৪৫");
      expect(toBanglaDigits("2026")).toBe("২০২৬");
    });
  });

  describe("formatBanglaDate", () => {
    it("formats dates in bn-BD locale", () => {
      const d = new Date(2026, 0, 15);
      const formatted = formatBanglaDate(d);
      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe("string");
      expect(formatted.length).toBeGreaterThan(0);
    });
  });
});
