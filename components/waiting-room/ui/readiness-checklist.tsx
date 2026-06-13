import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ReadinessItem = {
  label: string;
  ready: boolean;
};

export function ReadinessChecklist({ items }: { items: ReadinessItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Readiness checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-sm text-slate-700">
            {item.ready ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ) : (
              <Circle className="h-5 w-5 text-slate-300" />
            )}
            {item.label}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
