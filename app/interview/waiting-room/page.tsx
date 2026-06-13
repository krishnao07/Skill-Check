"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, Loader2, Mic } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MediaPreview } from "@/components/media-preview";
import { MicLevelMeter } from "@/components/mic-level-meter";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { useMediaDevices } from "@/hooks/use-media-devices";
import { waitingTips } from "@/lib/mock-data";

export default function WaitingRoomPage() {
  const router = useRouter();
  const [audioActivityDetected, setAudioActivityDetected] = useState(false);
  const {
    status,
    errorMessage,
    stream,
    videoDevices,
    audioDevices,
    selectedCameraId,
    selectedMicrophoneId,
    requestMedia,
    switchCamera,
    switchMicrophone,
    cleanup,
  } = useMediaDevices();

  const isRequesting = status === "requesting";
  const hasCamera = Boolean(stream?.getVideoTracks().some((track) => track.readyState === "live"));
  const hasMicrophone = Boolean(
    stream?.getAudioTracks().some((track) => track.readyState === "live"),
  );
  const canJoin = hasCamera && hasMicrophone && status === "ready";

  const readinessItems = useMemo(
    () => [
      { label: "Camera ready", ready: hasCamera },
      { label: "Microphone ready", ready: hasMicrophone },
      { label: "Audio activity detected", ready: audioActivityDetected },
      { label: "Recording will be enabled in next step", ready: canJoin },
      { label: "AI interviewer ready placeholder", ready: true },
    ],
    [audioActivityDetected, canJoin, hasCamera, hasMicrophone],
  );

  const handleAudioActivityChange = useCallback((active: boolean) => {
    setAudioActivityDetected((previous) => previous || active);
  }, []);

  const handleEnableMedia = async () => {
    setAudioActivityDetected(false);
    await requestMedia();
  };

  const handleCameraChange = async (cameraId: string) => {
    setAudioActivityDetected(false);
    await switchCamera(cameraId);
  };

  const handleMicrophoneChange = async (microphoneId: string) => {
    setAudioActivityDetected(false);
    await switchMicrophone(microphoneId);
  };

  const handleJoinInterview = () => {
    if (!canJoin) {
      return;
    }

    cleanup();
    router.push("/interview/live");
  };

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
                <MediaPreview stream={stream} isReady={hasCamera} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {status === "idle" ? (
                  <Button
                    className="w-full"
                    onClick={handleEnableMedia}
                    disabled={isRequesting}
                  >
                    Enable Camera & Microphone
                  </Button>
                ) : null}

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Camera device
                  <Select
                    value={selectedCameraId}
                    disabled={!hasCamera || isRequesting}
                    onChange={(event) => void handleCameraChange(event.target.value)}
                  >
                    {videoDevices.length > 0 ? (
                      videoDevices.map((device, index) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label || `Camera ${index + 1}`}
                        </option>
                      ))
                    ) : (
                      <option value="">No camera available</option>
                    )}
                  </Select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Microphone device
                  <Select
                    value={selectedMicrophoneId}
                    disabled={!hasMicrophone || isRequesting}
                    onChange={(event) => void handleMicrophoneChange(event.target.value)}
                  >
                    {audioDevices.length > 0 ? (
                      audioDevices.map((device, index) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label || `Microphone ${index + 1}`}
                        </option>
                      ))
                    ) : (
                      <option value="">No microphone available</option>
                    )}
                  </Select>
                </label>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Mic className="h-4 w-4" />
                    Microphone level
                  </div>
                  <MicLevelMeter
                    stream={stream}
                    onActivityChange={handleAudioActivityChange}
                  />
                </div>

                {isRequesting ? (
                  <div className="flex items-center gap-2 rounded-lg border bg-slate-50 p-3 text-sm text-slate-600">
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                    Waiting for camera and microphone permission...
                  </div>
                ) : null}

                {errorMessage ? (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700">
                    {errorMessage}
                  </div>
                ) : null}

                {status !== "idle" && status !== "requesting" && status !== "ready" ? (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleEnableMedia}
                  >
                    Try again
                  </Button>
                ) : null}
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
                <div key={item.label} className="flex items-center gap-3 text-sm text-slate-700">
                  {item.ready ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-300" />
                  )}
                  {item.label}
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
                <p key={tip} className="text-sm text-slate-600">
                  {tip}
                </p>
              ))}
              <Button
                className="w-full"
                disabled={!canJoin}
                onClick={handleJoinInterview}
              >
                Join Interview
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
