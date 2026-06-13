"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { MediaPreview } from "@/components/waiting-room/media/media-preview";
import { DeviceSettingsCard } from "@/components/waiting-room/ui/device-settings-card";
import { WaitingRoomSidebar } from "@/components/waiting-room/ui/waiting-room-sidebar";
import { useMediaDevices } from "@/hooks/media/use-media-devices";

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
            <DeviceSettingsCard
              status={status}
              errorMessage={errorMessage}
              stream={stream}
              hasCamera={hasCamera}
              hasMicrophone={hasMicrophone}
              videoDevices={videoDevices}
              audioDevices={audioDevices}
              selectedCameraId={selectedCameraId}
              selectedMicrophoneId={selectedMicrophoneId}
              onEnableMedia={() => void handleEnableMedia()}
              onCameraChange={(cameraId) => void handleCameraChange(cameraId)}
              onMicrophoneChange={(microphoneId) => void handleMicrophoneChange(microphoneId)}
              onAudioActivityChange={handleAudioActivityChange}
            />
          </div>
        </section>

        <WaitingRoomSidebar
          readinessItems={readinessItems}
          canJoin={canJoin}
          onJoinInterview={handleJoinInterview}
        />
      </div>
    </AppShell>
  );
}
