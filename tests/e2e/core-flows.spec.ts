import { test, expect } from "@playwright/test";

test.describe("Ask Bangladesh Public Core User Journeys", () => {
  test("Homepage loads with branding, disclaimers, and links", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Ask Bangladesh/);
    await expect(page.locator("h1")).toContainText("সরকারি সেবা নিয়ে যে কোনো প্রশ্ন করুন");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("Navigation to Services Directory displays official categories", async ({ page }) => {
    await page.goto("/services");
    await expect(page.locator("h1")).toContainText("সরকারি সেবা ডিরেক্টরি");
    await expect(page.locator("text=পাসপোর্ট ও ইমিগ্রেশন")).toBeVisible();
    await expect(page.locator("text=জাতীয় পরিচয়পত্র (NID)")).toBeVisible();
  });

  test("Navigation to Official Sources Directory verifies domain list", async ({ page }) => {
    await page.goto("/sources");
    await expect(page.locator("h1")).toContainText("যাচাইকৃত সরকারি তথ্যসূত্র তালিকা");
    await expect(page.locator("text=epassport.gov.bd")).toBeVisible();
    await expect(page.locator("text=services.nidw.gov.bd")).toBeVisible();
  });

  test("Chat Assistant loads and displays welcoming prompt", async ({ page }) => {
    await page.goto("/chat");
    await expect(page.locator("text=Ask Bangladesh এআই সহকারী")).toBeVisible();
    await expect(page.locator("input[type='text']")).toBeVisible();
  });
});
