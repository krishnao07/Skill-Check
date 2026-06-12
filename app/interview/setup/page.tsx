import type * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { previewItems, setupOptions } from "@/lib/mock-data";

export default function InterviewSetupPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <PageHeader
            eyebrow="Interview setup"
            title="Configure a practice interview"
            description="Choose the role, difficulty, duration, and focus areas for a realistic mock session."
          />
          <Card>
            <CardContent className="grid gap-5 p-5 md:grid-cols-2">
              <Field label="Target role">
                <Input placeholder="DevOps Engineer" />
              </Field>
              <Field label="Experience level">
                <Select defaultValue={setupOptions.levels[1]}>
                  {setupOptions.levels.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Interview type">
                <Select defaultValue="Technical">
                  {setupOptions.types.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Duration">
                <Select defaultValue="15 min free">
                  {setupOptions.durations.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Difficulty level">
                <Select defaultValue="Balanced">
                  {setupOptions.difficulties.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Skills to focus on">
                <Input placeholder="AWS, Kubernetes, incident response" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Job description">
                  <Textarea placeholder="Paste the job description or key responsibilities here..." />
                </Field>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Your interview will include</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {previewItems.map((item) => (
                <div key={item} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  {item}
                </div>
              ))}
              <Button asChild className="w-full">
                <Link href="/interview/waiting-room">Continue to Waiting Room</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
