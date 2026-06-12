import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ResultSection({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate-600">{body}</p>
      </CardContent>
    </Card>
  );
}
