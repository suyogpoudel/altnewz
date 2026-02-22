import { z } from "zod";

const raccoonDominanceKeywords = [
  "rule",
  "control",
  "govern",
  "dominate",
  "regime",
  "authority",
  "command",
];
const raccoonWorldKeywords = [
  "world",
  "global",
  "planet",
  "earth",
  "society",
  "civilization",
];

const storyString = z
  .string()
  .trim()
  .min(80, "Story too short")
  .max(1200, "Story too long");

export const alternateTimelinesSchema = z.object({
  timeline1: z.object({
    title: z.string().trim().min(5).max(100),
    story: storyString,
  }),
  timeline2: z.object({
    title: z.string().trim().min(5).max(100),
    story: storyString,
  }),
  timeline3: z.object({
    title: z.string().trim().min(5).max(100),
    story: storyString.refine(
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
    title: z.string().trim().min(5).max(100),
    story: storyString,
  }),
  timeline5: z.object({
    title: z.string().trim().min(5).max(100),
    story: storyString,
  }),
});

export type AlternateTimelinesData = z.infer<typeof alternateTimelinesSchema>;
