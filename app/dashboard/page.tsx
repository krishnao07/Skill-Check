import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { ImprovementChart } from "@/components/improvement-chart";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { dashboardMetrics } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <PageHeader
            eyebrow="Candidate dashboard"
            title="Welcome back, Krishna"
            description="Your practice hub for interviews, feedback, and progress."
          />
          <Button asChild size="lg">
            <Link href="/interview/setup">
              Start New Interview <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recommended next interview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-indigo-50 p-5">
                <ClipboardCheck className="h-6 w-6 text-indigo-600" />
                <h2 className="mt-4 text-xl font-semibold text-slate-950">
                  DevOps incident response round
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Practice explaining production issues with one incident, one
                  decision, and one measurable outcome.
                </p>
                <Button asChild className="mt-5">
                  <Link href="/interview/setup">Configure interview</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Improvement trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ImprovementChart />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent interview history</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
