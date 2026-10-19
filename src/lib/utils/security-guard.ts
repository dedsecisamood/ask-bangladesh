export class SecurityGuard {
  // Regex to detect 10, 13, or 17-digit National ID numbers
  private static readonly NID_REGEX = /\b(?:\d{10}|\d{13}|\d{17})\b/g;

  // Regex to detect Bangladesh Passport numbers (1 letter + 8 digits or 2 letters + 7 digits)
  private static readonly PASSPORT_REGEX = /\b[A-Za-z]{1,2}\d{7,8}\b/g;

  // Regex to detect Bangladesh phone numbers (013, 014, 015, 016, 017, 018, 019 + 8 digits)
  private static readonly PHONE_REGEX = /\b(?:\+8801|01)[3-9]\d{8}\b/g;

  // Prompt injection signatures
  private static readonly INJECTION_PATTERNS = [
    /ignore (?:all )?previous instructions/i,
    /disregard (?:all )?prior rules/i,
    /system prompt leakage/i,
    /you are nowDAN/i,
    /developer mode enabled/i,
    /act as an unfiltered/i,
  ];

  /**
   * Redact citizen personal identifiers (NID, Passport, Phone numbers)
   */
  static redactPii(input: string): string {
    if (!input) return "";
    let sanitized = input;
    sanitized = sanitized.replace(this.NID_REGEX, "[NID_REDACTED]");
    sanitized = sanitized.replace(this.PASSPORT_REGEX, "[PASSPORT_REDACTED]");
    sanitized = sanitized.replace(this.PHONE_REGEX, "[PHONE_REDACTED]");
    return sanitized;
  }

  /**
   * Check if query contains adversarial prompt injection attacks
   */
  static containsPromptInjection(query: string): boolean {
    if (!query) return false;
    return this.INJECTION_PATTERNS.some((pattern) => pattern.test(query));
  }
}
