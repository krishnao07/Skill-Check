import { Bot, Radio } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export function AIAvatarTile({
  status = "Speaking",
}: {
  status?: "Listening" | "Thinking" | "Speaking";
}) {
  return (
    <div className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-lg border bg-white p-5 shadow-soft">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-indigo-50 via-cyan-50 to-emerald-50" />
      <div className="relative z-10 flex items-center justify-between">
        <StatusBadge tone={status === "Speaking" ? "green" : "blue"}>{status}</StatusBadge>
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Radio className="h-3.5 w-3.5 text-red-500" />
          Live
        </span>
      </div>
      <div className="relative z-10 mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-white shadow-soft">
        <Bot className="h-12 w-12" />
        {status === "Speaking" ? (
          <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500 opacity-20" />
        ) : null}
      </div>
      <div className="relative z-10">
        <p className="text-lg font-semibold text-slate-950">Ananya</p>
        <p className="mt-1 text-sm text-slate-500">AI Technical Interviewer</p>
      </div>
    </div>
  );
}
