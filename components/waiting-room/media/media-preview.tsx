"use client";

import { useEffect, useRef } from "react";
import { Video } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export function MediaPreview({
  stream,
  isReady,
}: {
  stream: MediaStream | null;
  isReady: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative flex min-h-96 flex-col justify-between overflow-hidden bg-slate-950 p-5 text-white">
      <StatusBadge
        tone={isReady ? "green" : "slate"}
        className="relative z-10 w-fit bg-white/10 text-white ring-white/20"
      >
        {isReady ? "Camera ready" : "Camera preview"}
      </StatusBadge>

      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="relative z-10 mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white/10">
          <Video className="h-10 w-10" />
        </div>
      )}

      <p className="relative z-10 text-sm text-white/75">
        {stream ? "Live camera preview" : "Camera preview appears after permission"}
      </p>
    </div>
  );
}
