"use client";

import { Database, Filter, ArrowUpRight, ArrowDownRight, CheckCircle2 } from "lucide-react";

const HISTORY_DATA = [
  {
    id: "OP-4921",
    date: "2026-03-29T14:32:00Z",
    sector: "Sector 7 (NEOM-Alpha)",
    trigger: "Severe Dust Accumulation (82%)",
    action: "Emergency Drone Wash",
    cost: "SAR 800",
    saved: "SAR 14,200",
    status: "Completed",
  },
  {
    id: "OP-4920",
    date: "2026-03-28T09:15:00Z",
    sector: "Sector 2 (Sakaka)",
    trigger: "Thermal Saturation (65°C)",
    action: "Cooling Protocol Beta",
    cost: "SAR 150",
    saved: "SAR 3,400",
    status: "Completed",
  },
  {
    id: "OP-4919",
    date: "2026-03-26T18:45:00Z",
    sector: "Sector 7 (NEOM-Alpha)",
    trigger: "Minor Inefficiency (8%)",
    action: "Rule: Maintain Idle State",
    cost: "SAR 0",
    saved: "SAR 0",
    status: "Logged",
  },
  {
    id: "OP-4918",
    date: "2026-03-22T06:00:00Z",
    sector: "Sector 4 (Riyadh East)",
    trigger: "Dust Storm Imminent (Predictive)",
    action: "Pre-emptive Tractor Wash",
    cost: "SAR 1,200",
    saved: "SAR 45,000",
    status: "Completed",
  },
  {
    id: "OP-4917",
    date: "2026-03-15T10:30:00Z",
    sector: "Sector 1 (Jeddah Port)",
    trigger: "Salt & Moisture Buildup",
    action: "Chemical Wash Dispatch",
    cost: "SAR 900",
    saved: "SAR 8,100",
    status: "Completed",
  }
];

export default function HistoryPage() {
  return (
    <div className="text-slate-300 font-sans p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 pb-12">
        <header className="flex flex-col mb-8 gap-2 border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-2">
                <Database className="size-6 text-cyan-400" />
                <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Autonomous Dispatch Logs</h1>
            </div>
            <p className="text-slate-500 text-sm">Historical record of all AI-initiated interventions and their financial recoveries.</p>
        </header>

        <div className="flex justify-between items-center bg-[#070D18] border border-slate-800 p-4 rounded-xl">
           <div className="flex items-center space-x-2 text-sm text-slate-400">
             <Filter className="size-4" />
             <span>Filter by: <strong>All Sectors</strong></span>
           </div>
           <div className="text-sm font-mono text-cyan-500">
             Total 30-Day Recovery: <span className="text-emerald-400 font-bold ml-1">SAR 70,700</span>
           </div>
        </div>

        <div className="bg-[#0B1221]/80 backdrop-blur-md border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/50 text-xs uppercase tracking-wider text-slate-500">
                            <th className="p-4 font-semibold">Operation ID</th>
                            <th className="p-4 font-semibold">Date / Sector</th>
                            <th className="p-4 font-semibold">Trigger Condition</th>
                            <th className="p-4 font-semibold">AI Action Taken</th>
                            <th className="p-4 font-semibold text-right">Dispatch Cost</th>
                            <th className="p-4 font-semibold text-right">Actual Saved</th>
                            <th className="p-4 font-semibold text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-sm">
                        {HISTORY_DATA.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="p-4 font-mono text-cyan-500">{row.id}</td>
                                <td className="p-4">
                                    <div className="text-slate-300">{new Date(row.date).toLocaleDateString()}</div>
                                    <div className="text-xs text-slate-500">{row.sector}</div>
                                </td>
                                <td className="p-4 text-rose-300">{row.trigger}</td>
                                <td className="p-4 text-slate-300 font-medium">{row.action}</td>
                                <td className="p-4 text-right font-mono text-amber-500/80">{row.cost}</td>
                                <td className="p-4 text-right font-mono text-emerald-400 font-bold tracking-tight">{row.saved}</td>
                                <td className="p-4 text-center">
                                    {row.status === "Completed" ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-widest bg-emerald-950/40 text-emerald-400 border border-emerald-900/50">
                                            <CheckCircle2 className="size-3 mr-1" />
                                            Done
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-widest bg-slate-900 text-slate-400 border border-slate-800">
                                            Logged
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
