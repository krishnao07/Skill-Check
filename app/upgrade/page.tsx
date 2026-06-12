import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

const plans = [
  {
    name: "Free",
    price: "$0",
    badge: "Start here",
    features: ["15-minute interview", "Basic summary", "Limited feedback"],
  },
  {
    name: "Practice Pack",
    price: "$19",
    badge: "Popular",
    features: ["30-minute interviews", "Video recording", "Transcript", "Detailed feedback"],
  },
  {
    name: "Pro Candidate",
    price: "$49",
    badge: "Best for job search",
    features: [
      "60-minute interviews",
      "Full video review",
      "Question-wise feedback",
      "Downloadable reports",
      "Progress tracking",
    ],
  },
];

export default function UpgradePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <PageHeader
            eyebrow="Upgrade"
            title="Keep improving with deeper feedback"
            description="Choose a practice plan that matches your interview preparation pace."
          />
          <Button asChild size="lg">
            <Link href="/interview/setup">Upgrade and Continue Improving</Link>
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.name === "Practice Pack" ? "border-indigo-200 shadow-soft" : ""}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{plan.name}</CardTitle>
                  <StatusBadge tone={plan.name === "Practice Pack" ? "blue" : "slate"}>
                    {plan.badge}
                  </StatusBadge>
                </div>
                <p className="pt-4 text-4xl font-semibold text-slate-950">{plan.price}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    {feature}
                  </div>
                ))}
                <Button
                  asChild
                  className="w-full"
                  variant={plan.name === "Free" ? "secondary" : "default"}
                >
                  <Link href="/interview/setup">Choose {plan.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
