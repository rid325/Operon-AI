"use client";

import { ShieldAlert, Database, Users, Lock, AlertTriangle, CheckCircle, ShieldUser, ArrowRight } from "lucide-react";

function TopStat({ title, value, subtitle, icon: Icon, colorClass, borderClass }: any) {
    return (
        <div className={`bg-[#0A1120] border rounded-lg p-3 lg:p-4 flex flex-col justify-between h-24 ${borderClass}`}>
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest shadow-sm">
                <span>{title}</span>
                {Icon && <Icon className={`size-3 lg:size-4 ${colorClass}`} />}
            </div>
            <div className="flex items-end justify-between mt-2">
                <div className={`text-xl lg:text-3xl font-bold font-mono tracking-tighter ${colorClass}`}>{value}</div>
            </div>
            {subtitle && <div className="text-[9px] lg:text-[10px] text-slate-600 mt-1">{subtitle}</div>}
        </div>
    );
}

function ThreatCard({ id, level, title, desc, tag, status, statusColor, borderGlow }: any) {
    return (
        <div className={`bg-[#0A1120] border rounded-lg p-4 mb-4 relative overflow-hidden group hover:bg-[#0f172a] transition-colors ${borderGlow}`}>
             <div className="flex justify-between items-center mb-3">
                 <div className="flex items-center space-x-3">
                     <span className="text-[10px] font-mono text-slate-500">{id}</span>
                     <span className={`px-2 py-0.5 text-[10px] font-bold border rounded uppercase bg-slate-900 border-slate-800 ${level === 'CRITICAL' ? 'text-rose-500 border-rose-500/50 bg-rose-950/20' : level === 'HIGH' ? 'text-amber-500 border-amber-500/50 bg-amber-950/20' : 'text-blue-500 border-blue-500/50 bg-blue-950/20'}`}>
                         {level}
                     </span>
                 </div>
                 <span className={`text-[10px] font-bold tracking-widest uppercase ${statusColor}`}>{status}</span>
             </div>
             <h4 className="text-sm font-bold text-slate-200 mb-2 truncate">{title}</h4>
             <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-2">
                 <span>Source: <span className="text-slate-400">{desc}</span></span>
                 <span>•</span>
                 <span className="text-indigo-400">{tag}</span>
             </div>
        </div>
    );
}

export default function SecurityGovernancePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#02050E] text-slate-300 font-sans p-4 md:p-6 lg:p-6 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Header echoing Ontora */}
        <header className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
           <span className="font-bold text-slate-300">DustIQ AI</span>
           <span>•</span>
           <span className="text-slate-400">Security & Governance</span>
           <span className="ml-auto flex items-center bg-[#070b14] px-3 py-1.5 rounded-md border border-slate-800 shadow-inner">
               <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse mr-2" />
               <span className="text-emerald-500 font-mono font-bold tracking-widest uppercase">Live</span>
           </span>
        </header>

        {/* Top Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
            <TopStat title="Total Audits" value="1,402" subtitle="All combined logs" icon={Database} colorClass="text-cyan-400" borderClass="border-slate-800" />
            <TopStat title="Login Events" value="10" subtitle="AUTH actions" icon={Users} colorClass="text-emerald-400" borderClass="border-slate-800" />
            <TopStat title="Denied Actions" value="15" subtitle="DENY status" icon={Lock} colorClass="text-rose-500" borderClass="border-rose-900/30" />
            <TopStat title="Violations (7d)" value="2" subtitle="Trend period" icon={AlertTriangle} colorClass="text-amber-500" borderClass="border-amber-900/40" />
            <TopStat title="Access Status" value="ALLOW" subtitle="Clearance sufficient" icon={CheckCircle} colorClass="text-emerald-400" borderClass="border-emerald-900/30 bg-emerald-950/10" />
            <TopStat title="Clearance" value="SECRET" subtitle="Admin privileges" icon={ShieldUser} colorClass="text-amber-500" borderClass="border-amber-600/50 shadow-[0_0_15px_rgba(245,158,11,0.15)] bg-amber-950/20" />
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-6 border-b border-slate-800 text-xs text-slate-400 px-2 mb-6">
            <button className="pb-3 hover:text-slate-200">Audit Log</button>
            <button className="pb-3 hover:text-slate-200">Auth Activity</button>
            <button className="pb-3 hover:text-slate-200">Violations Trend</button>
            <button className="pb-3 border-b-2 border-rose-500 text-rose-400 font-bold flex items-center shadow-[0_1px_4px_rgba(244,63,94,0.3)]">
                Threat Intel 
                <span className="ml-2 bg-rose-500 text-white rounded-full size-4 flex items-center justify-center text-[9px]">3</span>
            </button>
        </div>

        {/* Threat Panel Title */}
        <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center px-2">
            <ShieldAlert className="size-4 mr-2 text-rose-500" /> 
            Active Security Threats 
            <span className="ml-3 text-[10px] text-rose-500 border border-rose-500/50 px-2 py-0.5 rounded uppercase tracking-widest bg-rose-950/20">3 Active</span>
        </h3>

        {/* Threat Grid Column based layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column */}
            <div className="space-y-4">
                <ThreatCard 
                    id="TI-001" level="CRITICAL" title="Unidentified Drone – Suspicious Airspace Entry" 
                    desc="RADAR Array 7" tag="TTP: T1566.001" status="Active Intercept" statusColor="text-rose-500" 
                    borderGlow="border-rose-600/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]" 
                />
                <ThreatCard 
                    id="TI-003" level="HIGH" title="DDoS Attempt – Inverter API Gateway" 
                    desc="WAF (Modsec)" tag="TTP: T1190" status="Blocked" statusColor="text-blue-400" 
                    borderGlow="border-blue-900/50" 
                />
                <ThreatCard 
                    id="TI-005" level="CRITICAL" title="Overheating Manipulation – PLC Firmware Exploit" 
                    desc="OT Security Node" tag="TTP: T1203" status="Patch Pending" statusColor="text-rose-500" 
                    borderGlow="border-rose-600/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]" 
                />

                {/* Sub Card - CVE Feed equivalent */}
                <div className="mt-8">
                    <h4 className="text-[10px] text-slate-500 tracking-widest uppercase font-bold mb-3">OT Exploit Feed</h4>
                    <div className="bg-[#0A1120] border border-rose-900/40 rounded-lg p-4 flex">
                        <div className="bg-rose-950/40 border border-rose-500/50 rounded flex flex-col items-center justify-center p-2 mr-4 h-12 w-12 text-rose-500">
                            <span className="text-sm font-bold font-mono">9.8</span>
                            <span className="text-[8px] uppercase">CVSS</span>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="font-bold text-cyan-400 text-xs">CVE-2026-9902</span>
                                <span className="text-xs text-slate-300">Modbus PLC Gateway</span>
                            </div>
                            <p className="text-[10px] text-slate-500">Remote code execution via crafted multi-register payload causing array disconnection.</p>
                            <div className="text-[10px] text-rose-500 mt-2 font-bold uppercase tracking-wider">Unpatched</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
                 <ThreatCard 
                    id="TI-002" level="HIGH" title="Credential Stuffing – Operator Console Login" 
                    desc="Honeypot AD" tag="TTP: T1110.004" status="Mitigated" statusColor="text-emerald-500" 
                    borderGlow="border-emerald-900/30" 
                />
                <ThreatCard 
                    id="TI-004" level="HIGH" title="Insider Threat – Repeated Substation Manual Override" 
                    desc="Badge Scanner" tag="TTP: T1048" status="Investigating" statusColor="text-amber-500" 
                    borderGlow="border-amber-600/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                />
                <ThreatCard 
                    id="TI-006" level="HIGH" title="Ransomware IOC Match – Edge AI Node" 
                    desc="EDR Agent" tag="TTP: T1486" status="Quarantined" statusColor="text-purple-400" 
                    borderGlow="border-slate-800" 
                />

                {/* Sub Table - IOCs */}
                <div className="mt-8">
                    <h4 className="text-[10px] text-slate-500 tracking-widest uppercase font-bold mb-3">Indicators of Compromise (IOC)</h4>
                    <div className="bg-[#0A1120] border border-slate-800 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-xs bg-[#0A1120]">
                            <thead className="border-b border-slate-800 text-slate-500 bg-slate-900/30">
                                <tr>
                                    <th className="p-3 font-normal">IOC</th>
                                    <th className="p-3 font-normal">Type</th>
                                    <th className="p-3 font-normal">Threat</th>
                                    <th className="p-3 font-normal">Conf.</th>
                                    <th className="p-3 font-normal text-right">Last Seen</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50 text-[10px] font-mono">
                                <tr className="hover:bg-slate-800/30">
                                    <td className="p-3 text-slate-200">185.220.101.47</td>
                                    <td className="p-3"><span className="bg-blue-900/50 text-blue-400 border border-blue-500/30 px-1 rounded">IP</span></td>
                                    <td className="p-3 text-slate-400">C2 Server</td>
                                    <td className="p-3 font-bold text-rose-500"><div className="w-4 h-0.5 bg-rose-500 inline-block mr-1"/>98%</td>
                                    <td className="p-3 text-slate-500 text-right">2h ago</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30">
                                    <td className="p-3 text-slate-200">cmd /c powershell...</td>
                                    <td className="p-3"><span className="bg-amber-900/50 text-amber-500 border border-amber-500/30 px-1 rounded">Process</span></td>
                                    <td className="p-3 text-slate-400">Dropper</td>
                                    <td className="p-3 font-bold text-amber-500"><div className="w-4 h-0.5 bg-amber-500 inline-block mr-1"/>85%</td>
                                    <td className="p-3 text-slate-500 text-right">6h ago</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30">
                                    <td className="p-3 text-slate-200">admin-override.sh</td>
                                    <td className="p-3"><span className="bg-purple-900/50 text-purple-400 border border-purple-500/30 px-1 rounded">File</span></td>
                                    <td className="p-3 text-slate-400">Persist</td>
                                    <td className="p-3 font-bold text-amber-500"><div className="w-4 h-0.5 bg-amber-500 inline-block mr-1"/>72%</td>
                                    <td className="p-3 text-slate-500 text-right">12h ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

    </div>
  );
}
