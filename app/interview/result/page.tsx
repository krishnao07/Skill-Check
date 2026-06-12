import Link from "next/link";
import { Download, RotateCcw, Video } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ResultSection } from "@/components/result-section";
import { ScoreCard } from "@/components/score-card";
import { TranscriptPanel } from "@/components/transcript-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resultSections, scoreCards } from "@/lib/mock-data";

export default function ResultPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <PageHeader
            eyebrow="Interview report"
            title="DevOps Engineer practice results"
            description="A transcript-based feedback report with scores, strengths, and next steps."
          />
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link href="/interview/setup">
                <RotateCcw className="h-4 w-4" />
                Retake Interview
              </Link>
            </Button>
            <Button variant="secondary">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button asChild>
              <Link href="/upgrade">Upgrade for Full Analysis</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="grid gap-4 p-5 md:grid-cols-4">
            {[
              ["Overall Score", "78/100"],
              ["Interview Role", "DevOps Engineer"],
              ["Duration", "28 min"],
              ["Completed", "Today"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scoreCards.map((score) => (
            <ScoreCard key={score.label} {...score} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          <section className="space-y-4">
            {resultSections.map((section) => (
              <ResultSection key={section.title} {...section} />
            ))}
            <Card>
              <CardHeader>
                <CardTitle>Question-wise Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600">
                  Your incident-response answer had a clear investigation flow.
                  Add customer impact and post-incident prevention to make it
                  senior-level.
                </p>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recording Playback Placeholder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Video className="h-8 w-8" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <TranscriptPanel />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
