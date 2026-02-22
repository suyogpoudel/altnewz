import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { mainPrompt } from "./mainPrompt";
import { alternateTimelinesSchema, AlternateTimelinesData } from "./schema";

const model = google("gemini-2.5-flash");

interface GenerateResult {
  output: AlternateTimelinesData;
}

/**
 * Calls the AI and validates output against Zod schema.
 * Retries automatically if schema validation fails.
 *
 * @param prompt - The news headline to generate alternate timelines for
 * @param retries - Number of retries if AI output fails schema validation
 */

export const generateWithRetry = async (
  prompt: string,
  retries = 2,
): Promise<GenerateResult> => {
  try {
    // Call the AI
    const result = await generateText({
      model,
      system: mainPrompt,
      prompt,
      output: Output.object({
        schema: alternateTimelinesSchema,
      }),
    });

    // Validate with Zod (though the AI SDK already does this)
    const parsed = alternateTimelinesSchema.safeParse(result.output);
    if (!parsed.success) {
      throw new Error(
        "AI output failed schema validation: " +
          parsed.error.issues.map((i) => i.message).join(", "),
      );
    }

    return { output: parsed.data };
  } catch (err) {
    if (retries > 0) {
      console.warn(
        "generateWithRetry failed, retrying...",
        err instanceof Error ? err.message : err,
      );
      return generateWithRetry(prompt, retries - 1);
    }
    throw new Error(
      err instanceof Error
        ? `Failed after retries: ${err.message}`
        : "Failed after retries: unknown error",
    );
  }
};
