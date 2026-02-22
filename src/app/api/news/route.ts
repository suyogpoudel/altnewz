import { mainPrompt } from "@/lib/mainPrompt";
import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import { alternateTimelinesSchema } from "@/lib/schema";
import { generateWithRetry } from "@/lib/generateWithRetry";

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON body",
      },
      {
        status: 400,
      },
    );
  }

  const { prompt } = body;
  if (!prompt) {
    return NextResponse.json(
      {
        success: false,
        error: "Please provide an input",
      },
      {
        status: 400,
      },
    );
  }

  if (typeof prompt !== "string") {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid input provided",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const data = await generateWithRetry(prompt);

    return NextResponse.json(
      {
        success: true,
        data: data.output,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Error generating response",
      },
      { status: 500 },
    );
  }
}
