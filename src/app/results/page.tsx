import ResultDisplay from "@/components/result-display";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Result | ALTNEWZ",
  description:
    "Enter a real-world headline and generate 5 wild news stories from alternate timelines. Perfect for creative writing, worldbuilding, and pure entertainment.",
};

const Results = async ({
  searchParams,
}: {
  searchParams: Promise<{ headline?: string }>;
}) => {
  const { headline } = await searchParams;

  if (!headline) {
    redirect("/");
  }

  return <ResultDisplay headline={headline} />;
};

export default Results;
