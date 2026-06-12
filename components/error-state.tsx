import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="flex gap-3 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
        <div>
          <p className="font-semibold text-red-900">{title}</p>
          <p className="mt-1 text-sm leading-6 text-red-700">{body}</p>
        </div>
      </CardContent>
    </Card>
  );
}
