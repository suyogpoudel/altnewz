import { z } from "zod";

export const alternateTimelinesSchema = z.object({
  timeline1: z.object({
    title: z.string(),
    story: z.string().min(100),
  }),
  timeline2: z.object({
    title: z.string(),
    story: z.string().min(100),
  }),
  timeline3: z.object({
    title: z.string(),
    story: z
      .string()
      .min(100)
      .refine(
        (text) =>
          text.toLowerCase().includes("raccoon") &&
          (text.toLowerCase().includes("world") ||
            text.toLowerCase().includes("global") ||
            text.toLowerCase().includes("planet")),
        {
          message: "Timeline 3 must describe raccoons taking over the world.",
        },
      ),
  }),
  timeline4: z.object({
    title: z.string(),
    story: z.string().min(100),
  }),
  timeline5: z.object({
    title: z.string(),
    story: z.string().min(100),
  }),
});
