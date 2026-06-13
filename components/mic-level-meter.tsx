"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function MicLevelMeter({
  stream,
  onActivityChange,
}: {
  stream: MediaStream | null;
  onActivityChange?: (active: boolean) => void;
}) {
  const [level, setLevel] = useState(0);
  const activityRef = useRef(false);

  useEffect(() => {
    if (!stream) {
      setLevel(0);
      activityRef.current = false;
      onActivityChange?.(false);
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) {
      setLevel(0);
      onActivityChange?.(false);
      return;
    }

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) {
      setLevel(0);
      onActivityChange?.(false);
      return;
    }

    const audioContext = new AudioContextClass();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const source = audioContext.createMediaStreamSource(new MediaStream(audioTracks));
    source.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;

    const updateLevel = () => {
      analyser.getByteTimeDomainData(data);

      let total = 0;
      for (const value of data) {
        const centered = value - 128;
        total += centered * centered;
      }

      const rms = Math.sqrt(total / data.length);
      const normalizedLevel = Math.min(100, Math.round((rms / 36) * 100));
      const hasActivity = normalizedLevel > 8;

      setLevel(normalizedLevel);

      if (hasActivity !== activityRef.current) {
        activityRef.current = hasActivity;
        onActivityChange?.(hasActivity);
      }

      frame = window.requestAnimationFrame(updateLevel);
    };

    frame = window.requestAnimationFrame(updateLevel);

    return () => {
      window.cancelAnimationFrame(frame);
      source.disconnect();
      void audioContext.close();
      setLevel(0);
      activityRef.current = false;
      onActivityChange?.(false);
    };
  }, [onActivityChange, stream]);

  return (
    <div className="flex h-24 items-end gap-1">
      {Array.from({ length: 12 }, (_, index) => {
        const threshold = ((index + 1) / 12) * 100;
        const isActive = level >= threshold;

        return (
          <span
            key={threshold}
            className={cn(
              "w-full rounded-full transition-all duration-100",
              isActive ? "bg-cyan-500" : "bg-slate-200",
            )}
            style={{ height: `${18 + index * 5}px` }}
          />
        );
      })}
    </div>
  );
}
