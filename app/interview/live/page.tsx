import Link from "next/link";
import { Camera, Mic, PhoneOff } from "lucide-react";
import { AIAvatarTile } from "@/components/ai-avatar-tile";
import { CandidateTopNav } from "@/components/candidate-top-nav";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { QuestionPanel } from "@/components/question-panel";
import { RecordingStatusBadge } from "@/components/recording-status-badge";
import { TranscriptPanel } from "@/components/transcript-panel";
import { VideoTile } from "@/components/video-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LiveInterviewPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <CandidateTopNav />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Interview role</p>
            <h1 className="text-xl font-semibold text-slate-950">DevOps Engineer</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-950">
              24:18
            </span>
            <RecordingStatusBadge />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <AIAvatarTile status="Speaking" />
              <VideoTile
                title="Candidate"
                subtitle="Krishna"
                badge={<RecordingStatusBadge />}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 rounded-lg border bg-white p-4">
              <Button variant="secondary" size="icon" aria-label="Toggle microphone">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" aria-label="Toggle camera">
                <Camera className="h-4 w-4" />
              </Button>
              <ConfirmDialog>
                <Button variant="destructive">
                  <PhoneOff className="h-4 w-4" />
                  End Interview
                </Button>
              </ConfirmDialog>
              <Button asChild variant="ghost">
                <Link href="/interview/processing">Skip to processing</Link>
              </Button>
            </div>
          </section>

          <Card>
            <CardContent className="p-5">
              <Tabs defaultValue="question">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="question">Question</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                </TabsList>
                <TabsContent value="question">
                  <QuestionPanel />
                </TabsContent>
                <TabsContent value="transcript">
                  <TranscriptPanel />
                </TabsContent>
                <TabsContent value="tips">
                  <div className="rounded-lg border bg-slate-50 p-5">
                    <p className="font-semibold text-slate-950">Tips are hidden by default</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Tips are hidden by default to keep the interview realistic.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
