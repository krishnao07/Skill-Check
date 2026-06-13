"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReadinessChecklist, type ReadinessItem } from "@/components/waiting-room/ui/readiness-checklist";
import { waitingTips } from "@/lib/mock-data";

export function WaitingRoomSidebar({
  readinessItems,
  canJoin,
  onJoinInterview,
}: {
  readinessItems: ReadinessItem[];
  canJoin: boolean;
  onJoinInterview: () => void;
}) {
  return (
    <aside className="space-y-4">
      <ReadinessChecklist items={readinessItems} />
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
            <p key={tip} className="text-sm text-slate-600">
              {tip}
            </p>
          ))}
          <Button className="w-full" disabled={!canJoin} onClick={onJoinInterview}>
            Join Interview
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
