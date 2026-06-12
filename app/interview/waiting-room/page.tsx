import Link from "next/link";
import { CheckCircle2, Mic, Video } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";
import { readinessItems, waitingTips } from "@/lib/mock-data";

export default function WaitingRoomPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
        <section className="space-y-6">
          <PageHeader
            eyebrow="Waiting room"
            title="Check your setup before joining"
            description="A calm pre-join screen for camera, microphone, and recording readiness."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex min-h-96 flex-col justify-between bg-slate-950 p-5 text-white">
                  <StatusBadge tone="green" className="w-fit bg-white/10 text-white ring-white/20">
                    Camera ready
                  </StatusBadge>
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white/10">
                    <Video className="h-10 w-10" />
                  </div>
                  <p className="text-sm text-white/65">Camera preview placeholder</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Camera device
                  <Select defaultValue="FaceTime HD Camera">
                    <option>FaceTime HD Camera</option>
                    <option>External USB Camera</option>
                  </Select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Microphone device
                  <Select defaultValue="Default microphone">
                    <option>Default microphone</option>
                    <option>USB microphone</option>
                  </Select>
                </label>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Mic className="h-4 w-4" />
                    Microphone level
                  </div>
                  <div className="flex gap-1">
                    {[45, 72, 60, 88, 54, 35, 66, 78].map((height) => (
                      <span
                        key={height}
                        className="w-full rounded-full bg-cyan-500"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Readiness checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {readinessItems.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-5 text-sm leading-6 text-amber-800">
              Your video and audio will be recorded for feedback and review.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Before you join</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {waitingTips.map((tip) => (
                <p key={tip} className="text-sm text-slate-600">{tip}</p>
              ))}
              <Button asChild className="w-full">
                <Link href="/interview/live">Join Interview</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
