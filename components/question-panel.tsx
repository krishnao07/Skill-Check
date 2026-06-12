export function QuestionPanel() {
  return (
    <div className="rounded-lg border bg-white p-5">
      <p className="text-sm font-medium text-indigo-600">Current question</p>
      <p className="mt-3 text-lg font-semibold leading-8 text-slate-950">
        Tell me about a production issue you solved and how you approached it.
      </p>
      <p className="mt-4 text-sm leading-6 text-slate-500">
        Take a moment to structure your answer around context, action, tradeoff,
        and measurable outcome.
      </p>
    </div>
  );
}
