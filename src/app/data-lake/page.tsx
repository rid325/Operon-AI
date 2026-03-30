"use client";

import { Database, Folder, ShieldCheck, DollarSign, Activity, Maximize2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

function MiniCard({ icon: Icon, title, value, subtitle, highlightClass }: any) {
    return (
        <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-3 flex flex-col justify-between h-24 shadow-lg flex-1">
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">
                {Icon && <Icon className={`size-3 ${highlightClass}`} />}
                <span>{title}</span>
            </div>
            <div className={`text-2xl font-bold font-mono tracking-tighter leading-none ${highlightClass}`}>
                {value}
            </div>
            <div className="text-[10px] text-slate-600 mt-1">{subtitle}</div>
        </div>
    );
}

const COST_DATA = [
    { time: "0:00", cost: 0.0025 }, { time: "2:00", cost: 0.0080 },
    { time: "4:00", cost: 0.0060 }, { time: "6:00", cost: 0.0040 },
    { time: "8:00", cost: 0.0025 }, { time: "10:00", cost: 0.0050 },
    { time: "12:00", cost: 0.0020 }, { time: "14:00", cost: 0.0075 },
    { time: "16:00", cost: 0.0100 }, { time: "18:00", cost: 0.0030 },
    { time: "20:00", cost: 0.0060 }, { time: "22:00", cost: 0.0025 },
    { time: "24:00", cost: 0.0055 },
];

export default function DataLakePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#02050E] text-slate-300 font-sans p-4 md:p-6 lg:p-6 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Header echoing Ontora */}
        <header className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
           <span className="font-bold text-slate-300">DustIQ AI</span>
           <span>•</span>
           <span className="text-slate-400">Solar Telemetry Data Lake</span>
           <span className="ml-auto flex items-center bg-[#070b14] px-3 py-1.5 rounded-md border border-slate-800 shadow-inner">
               <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse mr-2" />
               <span className="text-emerald-500 font-mono font-bold tracking-widest uppercase">Live Sink</span>
           </span>
        </header>

        {/* Top Stats Row */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
            <MiniCard icon={Database} title="Total Size" value="842.4 GB" subtitle="18 arrays tracked" highlightClass="text-purple-400" />
            <MiniCard icon={Folder} title="Total Records" value="1.2B" subtitle="Indexed telemetry" highlightClass="text-cyan-400" />
            <MiniCard icon={ShieldCheck} title="Avg Quality" value="98.2%" subtitle="All datasets" highlightClass="text-emerald-400" />
            <MiniCard icon={DollarSign} title="Cost / 24h" value="SAR 45.00" subtitle="Ingestion units" highlightClass="text-amber-500 glow-warning" />
            <MiniCard icon={Activity} title="Queries (24h)" value="142" subtitle="Avg 1.2s u/q" highlightClass="text-blue-400" />
            <MiniCard icon={Maximize2} title="Views Active" value="12" subtitle="Materialized" highlightClass="text-pink-400" />
        </div>

        {/* Middle Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            
            {/* Format Distribution */}
            <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-5 flex">
                <div className="flex-1">
                    <h3 className="text-xs font-semibold text-slate-400 mb-6">Ingestion Protocols</h3>
                    <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
                        {/* Fake Donut Segments */}
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="220" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="220" strokeDashoffset="120" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="220" strokeDashoffset="170" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="220" strokeDashoffset="210" />
                    </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-3 text-[10px]">
                    <div className="flex justify-between font-mono"><span className="flex items-center text-slate-300"><div className="size-2 bg-purple-500 rounded-full mr-2"/>MQTT</span> <span className="text-purple-400 font-bold">45%</span></div>
                    <div className="flex justify-between font-mono"><span className="flex items-center text-slate-300"><div className="size-2 bg-blue-500 rounded-full mr-2"/>Modbus TCP</span> <span className="text-blue-400 font-bold">25%</span></div>
                    <div className="flex justify-between font-mono"><span className="flex items-center text-slate-300"><div className="size-2 bg-amber-500 rounded-full mr-2"/>REST API</span> <span className="text-amber-500 font-bold">20%</span></div>
                    <div className="flex justify-between font-mono"><span className="flex items-center text-slate-300"><div className="size-2 bg-emerald-500 rounded-full mr-2"/>CSV Uploads</span> <span className="text-emerald-500 font-bold">10%</span></div>
                </div>
            </div>

            {/* Tier Breakdown */}
            <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-5 flex">
                <div className="flex-1">
                    <h3 className="text-xs font-semibold text-slate-400 mb-6">Data ML Tiers</h3>
                    <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#fcd34d" strokeWidth="20" strokeDasharray="220" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#94a3b8" strokeWidth="20" strokeDasharray="220" strokeDashoffset="150" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#b45309" strokeWidth="20" strokeDasharray="220" strokeDashoffset="200" />
                    </svg>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-3 text-[10px]">
                    <div className="flex justify-between font-mono"><span className="flex items-center text-slate-300"><div className="size-2 bg-amber-300 rounded-full mr-2"/>Gold (Cleaned)</span> <span className="text-amber-400 font-bold">12 arrays</span></div>
                    <div className="flex justify-between font-mono"><span className="flex items-center text-slate-300"><div className="size-2 bg-slate-400 rounded-full mr-2"/>Silver (Raw)</span> <span className="text-slate-400 font-bold">6 arrays</span></div>
                    <div className="flex justify-between font-mono"><span className="flex items-center text-slate-300"><div className="size-2 bg-amber-700 rounded-full mr-2"/>Bronze (Archived)</span> <span className="text-amber-700 font-bold">2 arrays</span></div>
                </div>
            </div>

            {/* Quality Score */}
            <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-5">
                <h3 className="text-xs font-semibold text-slate-400 mb-6">Sensor Quality Score</h3>
                <div className="flex items-end justify-between h-20 gap-2">
                    <div className="bg-emerald-400 w-full rounded hover:bg-emerald-300 transition-colors" style={{ height: '98%' }} />
                    <div className="bg-emerald-400 w-full rounded hover:bg-emerald-300 transition-colors" style={{ height: '95%' }} />
                    <div className="bg-emerald-400 w-full rounded hover:bg-emerald-300 transition-colors" style={{ height: '90%' }} />
                    <div className="bg-amber-500 w-full rounded hover:bg-amber-400 transition-colors" style={{ height: '60%' }} />
                    <div className="bg-cyan-500 w-full rounded hover:bg-cyan-400 transition-colors" style={{ height: '85%' }} />
                    <div className="bg-emerald-400 w-full rounded hover:bg-emerald-300 transition-colors" style={{ height: '100%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-2">
                    <span>100</span>
                    <span>78</span>
                </div>
            </div>

        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-6 border-b border-slate-800 text-xs text-slate-400 px-2 mb-6">
            <button className="pb-3 hover:text-slate-200 flex items-center"><Database className="size-3 mr-2"/> Datasets</button>
            <button className="pb-3 hover:text-slate-200 flex items-center"><ShieldCheck className="size-3 mr-2"/> Data Quality</button>
            <button className="pb-3 hover:text-slate-200 flex items-center">Lineage</button>
            <button className="pb-3 border-b-2 border-cyan-500 text-cyan-400 flex items-center"><DollarSign className="size-3 mr-1"/> Cost Analysis</button>
            <button className="pb-3 hover:text-slate-200 flex items-center">Materialized Views</button>
        </div>

        {/* Bottom Panel */}
        <div className="flex-1 bg-transparent flex flex-col">
            
            {/* Cost Mini Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-3">
                    <div className="text-[10px] text-amber-500 font-semibold mb-2 flex items-center"><DollarSign className="size-3" /> Total Cost (24h)</div>
                    <div className="text-2xl font-bold font-mono text-amber-500">SAR 45.00</div>
                </div>
                <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-3">
                    <div className="text-[10px] text-cyan-400 font-semibold mb-2 flex items-center"><Activity className="size-3 mr-1" /> Avg / Query</div>
                    <div className="text-2xl font-bold font-mono text-cyan-400">SAR 0.45</div>
                </div>
                <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-3">
                    <div className="text-[10px] text-emerald-400 font-semibold mb-2 flex items-center">Rows Scanned</div>
                    <div className="text-2xl font-bold font-mono text-emerald-400">8.1M</div>
                </div>
                <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-3">
                    <div className="text-[10px] text-purple-400 font-semibold mb-2 flex items-center">Queries</div>
                    <div className="text-2xl font-bold font-mono text-purple-400">142</div>
                </div>
            </div>

            {/* Area Chart */}
            <div className="flex-1 bg-[#0A1120] border border-slate-800 rounded-lg p-4 pb-0 h-64">
                <h3 className="text-xs font-semibold text-slate-400 mb-6 border-b border-slate-800 pb-2">Hourly AI Engine Inference Cost (Last 24h)</h3>
                <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={COST_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#334155" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#334155" fontSize={10} tickLine={false} axisLine={false} />
                        <Area type="monotone" dataKey="cost" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
        </div>
    </div>
  );
}
