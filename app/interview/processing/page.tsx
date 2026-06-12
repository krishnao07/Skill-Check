import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { UploadProgress } from "@/components/upload-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProcessingPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeader
          eyebrow="Processing"
          title="Finalizing your interview"
          description="Your mock recording, transcript, and feedback report are being prepared with placeholder progress states."
        />
        <Card>
          <CardContent className="space-y-6 p-6">
            <UploadProgress />
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              Do not close this tab while your recording is being uploaded.
            </div>
            <Button asChild>
              <Link href="/interview/result">View report preview</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
