import { NextRequest, NextResponse } from "next/server";
import { serviceQuerySchema } from "@/lib/validators";
import { SERVICES, CATEGORIES } from "@/lib/services/directory-data";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const parsed = serviceQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { q, category } = parsed.data;

    let results = SERVICES;

    if (category) {
      results = results.filter((s) => s.categorySlug === category);
    }

    if (q) {
      const queryLower = q.toLowerCase();
      results = results.filter(
        (s) =>
          s.nameBn.toLowerCase().includes(queryLower) ||
          s.nameEn.toLowerCase().includes(queryLower) ||
          s.descriptionBn.toLowerCase().includes(queryLower)
      );
    }

    return NextResponse.json({
      total: results.length,
      categories: CATEGORIES,
      services: results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error occurred" },
      { status: 500 }
    );
  }
}
