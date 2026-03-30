"use client";

import { AlertTriangle, ShieldAlert, ThermometerSun, Database, ArrowRight } from "lucide-react";

function TopCard({ title, value, subtitle, dotColor, borderClass }: any) {
  return (
    <div className={`bg-[#0A1120] border rounded-lg p-4 flex flex-col justify-between h-28 relative overflow-hidden flex-1 ${borderClass}`}>
       <div className="absolute top-4 right-4 size-2 rounded-full" style={{ backgroundColor: dotColor }} />
       <div>
         <div className="text-xs font-semibold text-slate-400 tracking-wider flex items-center space-x-2">
            <AlertTriangle className="size-3" style={{ color: dotColor }} />
            <span>{title}</span>
         </div>
         <div className="text-3xl font-bold font-mono tracking-tighter text-slate-100 mt-2" style={{ color: dotColor }}>
            {value}
         </div>
       </div>
       <div className="text-[10px] text-slate-500">{subtitle}</div>
    </div>
  );
}

function HorizBar({ label, value, max, color }: any) {
    const w = (value / max) * 100;
    return (
        <div className="flex items-center space-x-3 text-sm mb-3">
            <span className="w-24 text-slate-300 truncate">{label}</span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${w}%`, backgroundColor: color }} />
            </div>
            <span className="w-6 text-right font-mono text-cyan-500">{value}</span>
        </div>
    );
}

const TABLE_DATA = [
    { zone: "NEOM Sector 7", type: "Thermal", region: "Tabuk", severity: "CRITICAL", score: 99, coords: "28.08°, 34.95°" },
    { zone: "Sakaka Array 2", type: "Dust Storm", region: "Al Jawf", severity: "CRITICAL", score: 98, coords: "29.96°, 40.19°" },
    { zone: "Sudair PV Block A", type: "Component", region: "Riyadh", severity: "CRITICAL", score: 98, coords: "25.75°, 45.58°" },
    { zone: "Jeddah Port Roof", type: "Humidity", region: "Makkah", severity: "CRITICAL", score: 95, coords: "21.48°, 39.19°" },
    { zone: "NEOM Sector 4", type: "Thermal", region: "Tabuk", severity: "HIGH", score: 87, coords: "28.11°, 34.90°" },
];

export default function GeospatialIntelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#02050E] text-slate-300 font-sans p-4 md:p-6 lg:p-6 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Header echoing Ontora */}
        <header className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
           <span className="font-bold text-slate-300">DustIQ</span>
           <span>•</span>
           <span className="text-slate-400">Array Threat Hotspots</span>
           <span className="ml-auto flex items-center bg-[#070b14] px-3 py-1.5 rounded-md border border-slate-800 shadow-inner">
               <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse mr-2" />
               <span className="text-emerald-500 font-mono font-bold tracking-widest uppercase">Live Tracking</span>
           </span>
        </header>

        {/* Top Stats Row */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
            <TopCard title="Critical" value="16" subtitle="Immediate intervention" dotColor="#f43f5e" borderClass="border-rose-900/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]" />
            <TopCard title="High Severity" value="40" subtitle="Elevated loss threat" dotColor="#f59e0b" borderClass="border-amber-900/50" />
            <TopCard title="Array Alerts" value="85" subtitle="Sub-optimal regions" dotColor="#f97316" borderClass="border-orange-900/50" />
            <TopCard title="Incidents (7d)" value="154" subtitle="Recent dispatches" dotColor="#8b5cf6" borderClass="border-purple-900/50" />
            <TopCard title="Econ Regions" value="4" subtitle="Monitored arrays" dotColor="#10b981" borderClass="border-emerald-900/50" />
        </div>

        {/* Middle Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            
            {/* Severity Distribution */}
            <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-5">
                <h3 className="text-xs font-semibold text-slate-400 mb-6">Severity Distribution</h3>
                <div className="flex items-end justify-between h-32 px-4 gap-4">
                    {/* Bars */}
                    <div className="flex flex-col items-center flex-1 justify-end h-full">
                        <span className="text-rose-500 font-mono text-xs mb-2">16</span>
                        <div className="w-full bg-rose-500/20 border border-rose-500/50 rounded-t-sm" style={{ height: '30%' }} />
                        <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">Critical</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 justify-end h-full">
                        <span className="text-amber-500 font-mono text-xs mb-2">40</span>
                        <div className="w-full bg-amber-500/20 border border-amber-500/50 rounded-t-sm" style={{ height: '60%' }} />
                        <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">High</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 justify-end h-full">
                        <span className="text-blue-500 font-mono text-xs mb-2">159</span>
                        <div className="w-full bg-blue-500/20 border border-blue-500/50 rounded-t-sm" style={{ height: '100%' }} />
                        <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">Medium</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 justify-end h-full">
                        <span className="text-emerald-500 font-mono text-xs mb-2">0</span>
                        <div className="w-full bg-emerald-500/20 border border-emerald-500/50 rounded-t-sm" style={{ height: '5%' }} />
                        <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">Low</span>
                    </div>
                </div>
            </div>

            {/* Hotspots by Region */}
            <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-5 flex flex-col justify-center">
                <h3 className="text-xs font-semibold text-slate-400 mb-6">Hotspots by Region</h3>
                <div className="flex-1">
                    <HorizBar label="NEOM Area" value={48} max={60} color="#06b6d4" />
                    <HorizBar label="Riyadh Province" value={32} max={60} color="#06b6d4" />
                    <HorizBar label="Al Jawf" value={19} max={60} color="#0ea5e9" />
                    <HorizBar label="Makkah Region" value={16} max={60} color="#0ea5e9" />
                    <HorizBar label="Eastern Prov." value={15} max={60} color="#0ea5e9" />
                </div>
            </div>

            {/* Incident Types */}
            <div className="bg-[#0A1120] border border-slate-800 rounded-lg p-5">
                <h3 className="text-xs font-semibold text-slate-400 mb-4">Incident Types</h3>
                <div className="flex items-center space-x-6 h-full pb-4">
                    {/* Circular SVG simulating donut */}
                    <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#0f172a" strokeWidth="15" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f43f5e" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="25.12" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="240" />
                    </svg>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-[10px] items-center">
                            <span className="flex items-center"><div className="size-2 rounded-full bg-rose-500 mr-2"/> Dust Accumulation</span>
                            <span className="font-mono text-slate-400">203</span>
                        </div>
                        <div className="flex justify-between text-[10px] items-center">
                            <span className="flex items-center"><div className="size-2 rounded-full bg-amber-500 mr-2"/> Thermal Limit</span>
                            <span className="font-mono text-slate-400">3</span>
                        </div>
                        <div className="flex justify-between text-[10px] items-center">
                            <span className="flex items-center"><div className="size-2 rounded-full bg-blue-500 mr-2"/> Inverter Offline</span>
                            <span className="font-mono text-slate-400">2</span>
                        </div>
                        <div className="flex justify-between text-[10px] items-center">
                            <span className="flex items-center"><div className="size-2 rounded-full bg-purple-500 mr-2"/> Network Drop</span>
                            <span className="font-mono text-slate-400">2</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="text-slate-500 ml-2">Filter:</span>
            <div className="flex space-x-2 border border-slate-800 rounded-full p-1 bg-[#0A1120]">
                <button className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-400 font-semibold border border-cyan-500/50">All</button>
                <button className="px-3 py-1 rounded-full text-slate-400 hover:text-slate-200">Critical</button>
                <button className="px-3 py-1 rounded-full text-slate-400 hover:text-slate-200">High</button>
                <button className="px-3 py-1 rounded-full text-slate-400 hover:text-slate-200">Medium</button>
            </div>
            
            <div className="flex space-x-2 border border-slate-800 rounded-full p-1 bg-[#0A1120]">
                <button className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-400 font-semibold border border-cyan-500/50">all types</button>
                <button className="px-3 py-1 rounded-full text-slate-400 hover:text-slate-200">Dust</button>
                <button className="px-3 py-1 rounded-full text-slate-400 hover:text-slate-200">Thermal</button>
                <button className="px-3 py-1 rounded-full text-slate-400 hover:text-slate-200">Component</button>
                <button className="px-3 py-1 rounded-full text-slate-400 hover:text-slate-200">Network</button>
            </div>
        </div>

        {/* Table */}
        <div className="bg-[#0A1120] border border-slate-800 rounded-lg overflow-hidden flex-1 shadow-2xl">
            <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest p-4 border-b border-slate-800 bg-slate-900/50">
                <span>Array & Threat Hotspots</span>
                <span>215 zones</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-800/50 text-slate-500 text-xs text-center border-b">
                            <th className="p-4 font-normal text-left">Zone</th>
                            <th className="p-4 font-normal">Type</th>
                            <th className="p-4 font-normal">Region</th>
                            <th className="p-4 font-normal">Severity</th>
                            <th className="p-4 font-normal">Score</th>
                            <th className="p-4 font-normal">Coordinates</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/30">
                        {TABLE_DATA.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-800/20 text-center">
                                <td className="p-4 text-left">
                                    <div className="flex items-center space-x-2 font-bold text-slate-200">
                                        <div className="size-1.5 rounded-full bg-rose-500" />
                                        <span>{row.zone}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded text-xs bg-slate-800 border border-slate-700 text-slate-300">
                                        {row.type}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-400">{row.region}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 flex items-center justify-center mx-auto w-fit text-[10px] font-bold border rounded uppercase bg-transparent text-rose-500 border-rose-500/50`}>
                                        {row.severity}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center space-x-2 font-mono text-slate-400">
                                        <div className="w-6 h-1 bg-rose-500" />
                                        <span>{row.score}</span>
                                    </div>
                                </td>
                                <td className="p-4 font-mono text-slate-500 text-xs">{row.coords}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  );
}
