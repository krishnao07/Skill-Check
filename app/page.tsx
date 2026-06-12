import Link from "next/link";
import { ArrowRight, CheckCircle2, PlayCircle, Star } from "lucide-react";
import { AIAvatarTile } from "@/components/ai-avatar-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateTopNav } from "@/components/candidate-top-nav";
import { TranscriptPanel } from "@/components/transcript-panel";
import { StatusBadge } from "@/components/status-badge";
import { featureCards, heroPreviewItems } from "@/lib/mock-data";

const sections = [
  {
    title: "How it works",
    items: ["Choose your target role", "Join a mock AI interview", "Get a scored feedback report"],
  },
  {
    title: "Why candidates use Skill-Check",
    items: ["Practice under realistic pressure", "Find weak answers before real interviews", "Build confidence through repetition"],
  },
  {
    title: "What you get after every interview",
    items: ["Transcript-based feedback", "Score breakdowns", "Recommended next practice"],
  },
];

const faqs = [
  "Is this a real interview?",
  "Can I practice technical and behavioral rounds?",
  "Will recording work on mobile?",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <CandidateTopNav />
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_0.92fr] md:items-center lg:px-8">
          <div className="space-y-8">
            <StatusBadge tone="blue">Private AI interview practice</StatusBadge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
                Practice interviews with an AI interviewer before the real one.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Get a realistic interview experience, recorded video,
                transcript, and instant feedback to improve your answers,
                confidence, and communication.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/login">
                  Start Free Interview <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/interview/live">
                  <PlayCircle className="h-4 w-4" />
                  View Demo
                </Link>
              </Button>
            </div>
            <div className="grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {heroPreviewItems.map((item) => (
                <div key={item.label} className="rounded-lg border bg-white p-3">
                  <item.icon className="h-4 w-4 text-indigo-600" />
                  <p className="mt-2 text-xs font-medium text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden shadow-soft">
            <CardContent className="space-y-4 p-4">
              <AIAvatarTile />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-slate-950 p-4 text-white">
                  <p className="text-xs text-white/60">Candidate video</p>
                  <div className="mt-10 rounded-lg bg-white/10 p-4 text-sm">Camera preview placeholder</div>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">Mini score preview</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950">78</p>
                  <p className="mt-2 text-sm text-emerald-600">Strong communication</p>
                </div>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm font-semibold text-slate-950">Current question</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Tell me about a production issue you solved and how you approached it.
                </p>
              </div>
              <TranscriptPanel />
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="h-5 w-5 text-indigo-600" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="bg-slate-950 text-white">
            <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-2 text-amber-300">
                  <Star className="h-4 w-4" />
                  Pricing preview
                </div>
                <h2 className="mt-3 text-2xl font-semibold">Start free, upgrade when practice becomes a habit.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Free includes one 15-minute interview with a basic summary.
                  Paid plans unlock longer rounds, detailed feedback, video
                  review, and progress tracking.
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link href="/upgrade">Compare plans</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <Card key={faq}>
                <CardContent className="p-5">
                  <p className="font-semibold text-slate-950">{faq}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Skill-Check uses mock UI states today and is designed for
                    real recording and AI evaluation in a future release.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
