import ResultDisplay from "@/components/result-display";
import { redirect } from "next/navigation";

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
