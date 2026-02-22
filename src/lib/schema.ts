import { z } from "zod";

const raccoonDominanceKeywords = [
  "rule",
  "control",
  "govern",
  "dominate",
  "regime",
];
const raccoonWorldKeywords = ["world", "global", "planet", "earth"];

export const alternateTimelinesSchema = z.object({
  timeline1: z.object({
    title: z.string().min(5).max(100),
    story: z.string().min(100).max(1000),
  }),
  timeline2: z.object({
    title: z.string().min(5).max(100),
    story: z.string().min(100).max(1000),
  }),
  timeline3: z.object({
    title: z.string().min(5).max(100),
    story: z
      .string()
      .min(100)
      .max(1000)
      .refine(
        (text) => {
          const lower = text.toLowerCase();
          const hasRaccoon = lower.includes("raccoon");
          const hasWorld = raccoonWorldKeywords.some((w) => lower.includes(w));
          const hasDominance = raccoonDominanceKeywords.some((w) =>
            lower.includes(w),
          );
          return hasRaccoon && hasWorld && hasDominance;
        },
        {
          message:
            "Timeline 3 must clearly depict raccoons ruling the world with global dominance.",
        },
      ),
  }),
  timeline4: z.object({
    title: z.string().min(5).max(100),
    story: z.string().min(100).max(1000),
  }),
  timeline5: z.object({
    title: z.string().min(5).max(100),
    story: z.string().min(100).max(1000),
  }),
});
export type AlternateTimelinesData = z.infer<typeof alternateTimelinesSchema>;
