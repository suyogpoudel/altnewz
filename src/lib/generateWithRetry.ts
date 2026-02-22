import { generateText, Output } from "ai";
import { mainPrompt } from "./mainPrompt";
import { AlternateTimelinesData, alternateTimelinesSchema } from "./schema";
import { google } from "@ai-sdk/google";

const model = google("gemini-1.5-pro");

export const generateWithRetry = async (
  prompt: string,
  retries = 1,
): Promise<{ output: AlternateTimelinesData }> => {
  try {
    return await generateText({
      model,
      system: mainPrompt,
      prompt,
      output: Output.object({
        schema: alternateTimelinesSchema,
      }),
    });
  } catch (err) {
    if (retries > 0) {
      return generateWithRetry(prompt, retries - 1);
    }
    throw err;
  }
};
