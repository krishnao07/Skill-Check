import { Radio } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export function RecordingStatusBadge() {
  return (
    <StatusBadge tone="red" className="gap-1.5">
      <Radio className="h-3.5 w-3.5" />
      Recording
    </StatusBadge>
  );
}
