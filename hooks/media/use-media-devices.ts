"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MediaPermissionStatus =
  | "idle"
  | "requesting"
  | "ready"
  | "denied"
  | "no-camera"
  | "no-microphone"
  | "unsupported"
  | "error";

type StartOptions = {
  cameraId?: string;
  microphoneId?: string;
};

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

function isPermissionDenied(error: unknown) {
  return (
    error instanceof DOMException &&
    (error.name === "NotAllowedError" || error.name === "SecurityError")
  );
}

function isMissingDevice(error: unknown) {
  return (
    error instanceof DOMException &&
    (error.name === "NotFoundError" || error.name === "DevicesNotFoundError")
  );
}

function selectedDeviceConstraint(deviceId?: string) {
  return deviceId ? { deviceId: { exact: deviceId } } : true;
}

export function useMediaDevices() {
  const [status, setStatus] = useState<MediaPermissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState("");

  const streamRef = useRef<MediaStream | null>(null);
  const selectedCameraRef = useRef("");
  const selectedMicrophoneRef = useRef("");

  const cleanup = useCallback(() => {
    stopStream(streamRef.current);
    streamRef.current = null;
    setStream(null);
  }, []);

  const refreshDevices = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const microphones = devices.filter((device) => device.kind === "audioinput");

    setVideoDevices(cameras);
    setAudioDevices(microphones);

    if (!selectedCameraRef.current && cameras[0]?.deviceId) {
      selectedCameraRef.current = cameras[0].deviceId;
      setSelectedCameraId(cameras[0].deviceId);
    }

    if (!selectedMicrophoneRef.current && microphones[0]?.deviceId) {
      selectedMicrophoneRef.current = microphones[0].deviceId;
      setSelectedMicrophoneId(microphones[0].deviceId);
    }

    return { cameras, microphones };
  }, []);

  const requestMedia = useCallback(
    async (options: StartOptions = {}) => {
      if (
        typeof navigator === "undefined" ||
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia ||
        !navigator.mediaDevices.enumerateDevices
      ) {
        setStatus("unsupported");
        setErrorMessage(
          "Your browser does not support camera and microphone access. Please use a modern browser such as Chrome, Edge, Firefox, or Safari.",
        );
        return;
      }

      const cameraId = options.cameraId ?? selectedCameraRef.current;
      const microphoneId = options.microphoneId ?? selectedMicrophoneRef.current;

      setStatus("requesting");
      setErrorMessage("");

      cleanup();

      let videoStream: MediaStream | null = null;
      let audioStream: MediaStream | null = null;

      try {
        try {
          videoStream = await navigator.mediaDevices.getUserMedia({
            video: selectedDeviceConstraint(cameraId),
            audio: false,
          });
        } catch (error) {
          if (isPermissionDenied(error)) {
            setStatus("denied");
            setErrorMessage(
              "Camera permission was denied. Please allow camera access in your browser settings and try again.",
            );
            return;
          }

          if (isMissingDevice(error)) {
            setStatus("no-camera");
            setErrorMessage("No camera was found. Connect a camera and try again.");
            return;
          }

          setStatus("error");
          setErrorMessage("Could not start the selected camera. Choose another camera or refresh the page.");
          return;
        }

        try {
          audioStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: selectedDeviceConstraint(microphoneId),
          });
        } catch (error) {
          stopStream(videoStream);

          if (isPermissionDenied(error)) {
            setStatus("denied");
            setErrorMessage(
              "Microphone permission was denied. Please allow microphone access in your browser settings and try again.",
            );
            return;
          }

          if (isMissingDevice(error)) {
            setStatus("no-microphone");
            setErrorMessage("No microphone was found. Connect a microphone and try again.");
            return;
          }

          setStatus("error");
          setErrorMessage("Could not start the selected microphone. Choose another microphone or refresh the page.");
          return;
        }

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);

        const { cameras, microphones } = await refreshDevices();

        if (cameras.length === 0) {
          stopStream(combinedStream);
          setStatus("no-camera");
          setErrorMessage("No camera was found. Connect a camera and try again.");
          return;
        }

        if (microphones.length === 0) {
          stopStream(combinedStream);
          setStatus("no-microphone");
          setErrorMessage("No microphone was found. Connect a microphone and try again.");
          return;
        }

        const activeCameraId = combinedStream.getVideoTracks()[0]?.getSettings().deviceId;
        const activeMicrophoneId = combinedStream.getAudioTracks()[0]?.getSettings().deviceId;

        if (activeCameraId) {
          selectedCameraRef.current = activeCameraId;
          setSelectedCameraId(activeCameraId);
        }

        if (activeMicrophoneId) {
          selectedMicrophoneRef.current = activeMicrophoneId;
          setSelectedMicrophoneId(activeMicrophoneId);
        }

        streamRef.current = combinedStream;
        setStream(combinedStream);
        setStatus("ready");
      } catch {
        stopStream(videoStream);
        stopStream(audioStream);
        setStatus("error");
        setErrorMessage("Could not start the selected device. Please refresh the page and try again.");
      }
    },
    [cleanup, refreshDevices],
  );

  const switchCamera = useCallback(
    async (cameraId: string) => {
      selectedCameraRef.current = cameraId;
      setSelectedCameraId(cameraId);
      await requestMedia({ cameraId, microphoneId: selectedMicrophoneRef.current });
    },
    [requestMedia],
  );

  const switchMicrophone = useCallback(
    async (microphoneId: string) => {
      selectedMicrophoneRef.current = microphoneId;
      setSelectedMicrophoneId(microphoneId);
      await requestMedia({ cameraId: selectedCameraRef.current, microphoneId });
    },
    [requestMedia],
  );

  useEffect(() => cleanup, [cleanup]);

  return {
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
  };
}
