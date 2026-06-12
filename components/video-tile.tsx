import type * as React from "react";
import { Camera, Mic, Signal } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";

export function VideoTile({
  title,
  subtitle,
  badge,
  className,
}: {
  title: string;
  subtitle: string;
  badge?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-72 flex-col justify-between overflow-hidden rounded-lg border bg-slate-950 p-4 text-white shadow-soft",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-cyan-950" />
      <div className="relative z-10 flex items-center justify-between">
        <StatusBadge tone="slate" className="bg-white/10 text-white ring-white/20">
          {title}
        </StatusBadge>
        {badge}
      </div>
      <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
        <Camera className="h-9 w-9 text-white/80" />
      </div>
      <div className="relative z-10 flex items-end justify-between gap-4">
        <div>
          <p className="font-semibold">{subtitle}</p>
          <p className="mt-1 text-sm text-white/65">Video placeholder</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-white/10 p-2">
            <Mic className="h-4 w-4" />
          </span>
          <span className="rounded-full bg-white/10 p-2">
            <Signal className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
