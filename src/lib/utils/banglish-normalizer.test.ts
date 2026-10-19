import { describe, it, expect } from "vitest";
import { BanglishNormalizer } from "./banglish-normalizer";

describe("BanglishNormalizer", () => {
  it("normalizes common Banglish queries into Bangla tokens", () => {
    const input = "passport kivabe renew korbo";
    const result = BanglishNormalizer.normalize(input);
    expect(result).toContain("কীভাবে");
    expect(result).toContain("করব");
  });

  it("handles spelling variants like kivhabe vs kivabe", () => {
    expect(BanglishNormalizer.normalize("kivhabe")).toBe("কীভাবে");
    expect(BanglishNormalizer.normalize("kivabe")).toBe("কীভাবে");
  });

  it("normalizes NID name correction phrases", () => {
    const input = "amar nam vul songshodhon kivabe hobe";
    const result = BanglishNormalizer.normalize(input);
    expect(result).toBe("আমার নাম ভুল সংশোধন কীভাবে হবে");
  });
});
