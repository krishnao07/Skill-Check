import { FileX2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-8 text-center">
        <FileX2 className="h-10 w-10 text-slate-300" />
        <p className="mt-4 font-semibold text-slate-950">{title}</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{body}</p>
      </CardContent>
    </Card>
  );
}
