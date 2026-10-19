/**
 * Banglish phonetic normalization dictionary for government terms
 */
export const BANGLISH_DICTIONARY: Record<string, string> = {
  kivabe: "কীভাবে",
  kivhabe: "কীভাবে",
  korbo: "করব",
  korte: "করতে",
  lage: "লাগে",
  lagbe: "লাগবে",
  hobe: "হবে",
  amar: "আমার",
  nam: "নাম",
  vul: "ভুল",
  thik: "ঠিক",
  jomi: "জমি",
  jomir: "জমির",
  khajna: "খাজনা",
  taka: "টাকা",
  koto: "কত",
  protidan: "প্রতিদান",
  sangsodhon: "সংশোধন",
  songshodhon: "সংশোধন",
  somoy: "সময়",
  dorkar: "দরকার",
  kaj: "কাজ",
  seba: "সেবা",
};

export class BanglishNormalizer {
  /**
   * Normalize romanized Bangla tokens into canonical terms for query routing
   */
  static normalize(text: string): string {
    const tokens = text.toLowerCase().split(/\s+/);
    const normalizedTokens = tokens.map((token) => {
      // Remove trailing punctuation
      const cleanToken = token.replace(/[.,?!;:()]/g, "");
      return BANGLISH_DICTIONARY[cleanToken] || cleanToken;
    });
    return normalizedTokens.join(" ");
  }
}
