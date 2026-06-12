import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const toneClasses: Record<string, string> = {
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  cyan: "bg-cyan-500",
  amber: "bg-amber-500",
};

export function ScoreCard({
  label,
  score,
  tone = "blue",
}: {
  label: string;
  score: number;
  tone?: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="text-xl font-semibold text-slate-950">{score}</p>
        </div>
        <div className="mt-4 h-2 rounded-full bg-slate-100">
          <div
            className={cn("h-2 rounded-full", toneClasses[tone] ?? toneClasses.blue)}
            style={{ width: `${score}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
