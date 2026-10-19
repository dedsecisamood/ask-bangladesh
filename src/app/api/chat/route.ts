import { NextRequest, NextResponse } from "next/server";
import { chatQuerySchema } from "@/lib/validators";
import { RagEngine } from "@/lib/ai/rag-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = chatQuerySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { query } = parsed.data;
    const response = RagEngine.generateAnswer(query);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process chat query" },
      { status: 500 }
    );
  }
}
