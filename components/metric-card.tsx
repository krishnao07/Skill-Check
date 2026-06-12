import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <p className="text-3xl font-semibold text-slate-950">{value}</p>
          <p className="text-xs font-medium text-indigo-600">{change}</p>
        </div>
      </CardContent>
    </Card>
  );
}
