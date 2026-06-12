import { StatusBadge } from "@/components/status-badge";
import { recentInterviews } from "@/lib/mock-data";

export function DataTable() {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
          <tr>
            <th className="px-5 py-4">Role</th>
            <th className="px-5 py-4">Type</th>
            <th className="px-5 py-4">Date</th>
            <th className="px-5 py-4">Duration</th>
            <th className="px-5 py-4">Score</th>
            <th className="px-5 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {recentInterviews.map((row) => (
            <tr key={`${row.role}-${row.date}`} className="text-slate-700">
              <td className="px-5 py-4 font-medium text-slate-950">{row.role}</td>
              <td className="px-5 py-4">{row.type}</td>
              <td className="px-5 py-4">{row.date}</td>
              <td className="px-5 py-4">{row.duration}</td>
              <td className="px-5 py-4 font-semibold">{row.score}</td>
              <td className="px-5 py-4">
                <StatusBadge tone="green">{row.status}</StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
