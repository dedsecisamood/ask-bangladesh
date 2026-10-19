import { z } from "zod";

export const serviceQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  agency: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export const feedbackSchema = z.object({
  category: z.enum(["correction", "broken-link", "new-service", "other"]),
  comment: z.string().min(5, "Comment must be at least 5 characters").max(1000),
});

export const chatQuerySchema = z.object({
  query: z.string().min(2, "Query is too short").max(500, "Query is too long"),
  language: z.enum(["bn", "en", "banglish"]).optional(),
  sessionId: z.string().uuid().optional(),
});
