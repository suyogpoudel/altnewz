"use client";

import { AlternateTimelinesData } from "@/lib/schema";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading-screen";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

interface ResultDisplayProps {
  headline: string;
}

const ResultDisplay = ({ headline }: ResultDisplayProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AlternateTimelinesData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const minLoadTime = new Promise((resolve) => setTimeout(resolve, 3000));

        const fetchResult = fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: headline }),
        }).then((res) => res.json());

        const [json] = await Promise.all([fetchResult, minLoadTime]);

        if (!json.success) {
          setError(json.error);
          return;
        }

        setResult(json.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown Error");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [headline]);

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-center text-destructive text-lg">{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-10 gap-10">
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 font-mono">
        {Object.entries(result!).map(([key, timeline]) => (
          <Card
            key={key}
            className="last:col-span-full last:max-w-[50%] last:mx-auto"
          >
            <CardHeader className="text-primary text-xl font-mono font-semibold tracking-wider">
              {timeline.title}
            </CardHeader>
            <CardContent className="text-lg">{timeline.story}</CardContent>
          </Card>
        ))}
      </div>

      <Button
        asChild
        size="lg"
        variant="secondary"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          Try Another Headline
          <RefreshCw />
        </Link>
      </Button>
    </div>
  );
};

export default ResultDisplay;
