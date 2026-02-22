import { NextResponse } from "next/server";
import { generateWithRetry } from "@/lib/generateWithRetry";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Rate limit exceeded. Try again after ${rate.retryAfter} seconds`,
      },
      {
        status: 429,
      },
    );
  }

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
