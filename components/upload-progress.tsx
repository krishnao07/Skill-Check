import { CheckCircle2, Loader2 } from "lucide-react";
import { processingSteps } from "@/lib/mock-data";

export function UploadProgress() {
  return (
    <div className="space-y-5">
      <div className="h-3 rounded-full bg-slate-100">
        <div className="h-3 w-[68%] rounded-full bg-indigo-600" />
      </div>
      <div className="space-y-3">
        {processingSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-lg border bg-white p-4">
            {index < 2 ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ) : index === 2 ? (
              <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
            ) : (
              <span className="h-5 w-5 rounded-full border border-slate-300" />
            )}
            <span className="text-sm font-medium text-slate-700">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
