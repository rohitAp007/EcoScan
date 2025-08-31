"use client";
import type { GenerateEcoSummaryOutput } from "@/ai/flows/generate-eco-summary";
import { Separator } from "@/components/ui/separator";

interface EcoSummaryProps {
  summary?: GenerateEcoSummaryOutput;
}

export default function EcoSummary({ summary }: EcoSummaryProps) {
  if (!summary || (!summary.summary && !summary.recommendations)) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4 text-left">
      {summary.summary && (
        <>
         <Separator />
          <div>
            <h4 className="font-semibold text-destructive">Environmental Impact</h4>
            <p className="text-sm text-muted-foreground">{summary.summary}</p>
          </div>
        </>
      )}
      {summary.recommendations && (
         <>
         <Separator />
          <div>
            <h4 className="font-semibold text-primary">Eco-Friendly Alternatives</h4>
            <p className="text-sm text-muted-foreground">{summary.recommendations}</p>
          </div>
        </>
      )}
    </div>
  );
}
