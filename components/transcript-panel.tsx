import { transcript } from "@/lib/mock-data";

export function TranscriptPanel() {
  return (
    <div className="space-y-4">
      {transcript.map((line) => (
        <div key={`${line.speaker}-${line.text}`} className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-950">{line.speaker}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{line.text}</p>
        </div>
      ))}
    </div>
  );
}
