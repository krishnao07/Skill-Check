"use client";

import { Loader2, Mic } from "lucide-react";
import { MicLevelMeter } from "@/components/waiting-room/media/mic-level-meter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import type { MediaPermissionStatus } from "@/hooks/media/use-media-devices";

type DeviceSettingsCardProps = {
  status: MediaPermissionStatus;
  errorMessage: string;
  stream: MediaStream | null;
  hasCamera: boolean;
  hasMicrophone: boolean;
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  selectedCameraId: string;
  selectedMicrophoneId: string;
  onEnableMedia: () => void;
  onCameraChange: (cameraId: string) => void;
  onMicrophoneChange: (microphoneId: string) => void;
  onAudioActivityChange: (active: boolean) => void;
};

export function DeviceSettingsCard({
  status,
  errorMessage,
  stream,
  hasCamera,
  hasMicrophone,
  videoDevices,
  audioDevices,
  selectedCameraId,
  selectedMicrophoneId,
  onEnableMedia,
  onCameraChange,
  onMicrophoneChange,
  onAudioActivityChange,
}: DeviceSettingsCardProps) {
  const isRequesting = status === "requesting";
  const canRetry = status !== "idle" && status !== "requesting" && status !== "ready";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {status === "idle" ? (
          <Button className="w-full" onClick={onEnableMedia} disabled={isRequesting}>
            Enable Camera & Microphone
          </Button>
        ) : null}

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Camera device
          <Select
            value={selectedCameraId}
            disabled={!hasCamera || isRequesting}
            onChange={(event) => onCameraChange(event.target.value)}
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
            onChange={(event) => onMicrophoneChange(event.target.value)}
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
          <MicLevelMeter stream={stream} onActivityChange={onAudioActivityChange} />
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

        {canRetry ? (
          <Button variant="secondary" className="w-full" onClick={onEnableMedia}>
            Try again
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
