"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  Wind,
  AlertCircle,
  Target,
  Home,
  Cpu,
  Database,
  Eye,
  Settings,
  ArrowDownRight,
  TrendingDown,
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  Terminal,
  Zap
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { analyzeEnergy, EnergyData, AuthOperatorOutput } from "@/lib/analyzeEnergy";
import { cn } from "@/lib/utils";

// --- Top Card Component ---
function TopCard({ title, value, icon: Icon, colorClass, borderClass }: any) {
  return (
    <div className={cn("bg-[#010a05]/60 backdrop-blur-2xl px-5 py-6 rounded-2xl relative overflow-hidden transition-all duration-500 hover:bg-white/[0.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_30px_rgba(0,0,0,0.3)] group", borderClass)}>
      {/* Glossy top reflection */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors uppercase tracking-widest mb-1.5">
            {title}
          </h3>
          <div className="text-[28px] font-semibold text-white tracking-tight leading-none mt-2 drop-shadow-sm">{value}</div>
        </div>
        <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 transition-colors group-hover:bg-white/10 shadow-inner", colorClass)}>
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<EnergyData>({
    dust: 65,
    temp: 55,
    expected: 250, // Higher default kW for impact
    actual: 180,
    electricityRate: 0.18 // SAR
  });

  const [analysis, setAnalysis] = useState<AuthOperatorOutput>(analyzeEnergy(data));
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(analyzeEnergy(data));
      setIsAnalyzing(false);
    }, 800);
  };

  const chartData = useMemo(() => {
    const base = new Date().getHours() || 12;
    const points = [];
    for (let i = 0; i < 7; i++) {
        const timeStr = `${Math.max(0, base - 6 + i)}:00`;
        const variance = Math.random() * 8 - 4;
        points.push({
            time: timeStr,
            Expected: data.expected,
            Actual: i === 6 ? data.actual : Math.max(0, Math.min(data.expected, data.actual + variance + (6-i)*2.5)),
        });
    }
    return points;
  }, [data.expected, data.actual]);

  const efficiencyScore = data.expected > 0 ? ((data.actual / data.expected) * 100).toFixed(1) : "0";
  
  return (
    <div className="text-emerald-300 font-sans pb-12">

      <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        
        {/* === HEADER === */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-emerald-900/30 pb-4">
          <div>
             <div className="flex items-center space-x-2 mb-1">
                <BrainCircuit className="size-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <h1 className="text-2xl font-bold text-emerald-50 tracking-tight">AI Autonomous Energy Operator</h1>
             </div>
            <p className="text-emerald-600/80 text-sm tracking-wide font-medium">NEOM Industrial Solar Array — Sector 7 Operations</p>
          </div>
          <div className="flex items-center space-x-2 bg-[#010a05]/80 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-900/40 shadow-[0_0_15px_rgba(5,150,105,0.1)]">
             <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" />
             <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase">Operator Active</span>
          </div>
        </header>

        {/* === 1. TOP HEADER CARDS === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TopCard
            title="Module Efficiency"
            value={`${efficiencyScore}%`}
            icon={Target}
            colorClass="text-emerald-400"
            borderClass="border-emerald-900/40"
          />
          <TopCard
            title="System Issue"
            value={analysis.issue}
            icon={AlertCircle}
            colorClass={analysis.currentLossPercent > 10 ? "text-amber-400" : "text-emerald-400"}
            borderClass={analysis.currentLossPercent > 10 ? "border-amber-900/40 shadow-[0_0_15px_rgba(245,158,11,0.05)]" : "border-emerald-900/40"}
          />
          <TopCard
            title="Loss Trajectory (72h)"
            value={`SAR ${analysis.scenarios.noAction.moneyLost}`}
            icon={TrendingDown}
            colorClass="text-rose-400"
            borderClass="border-rose-900/20"
          />
          <TopCard
            title="Operator Status"
            value={analysis.automation.status.toUpperCase()}
            icon={Terminal}
            colorClass={
              analysis.automation.status === 'Dispatched' ? "text-rose-400" : 
              analysis.automation.status === 'Scheduled' ? "text-amber-400" : "text-emerald-400"
            }
            borderClass={
              analysis.automation.status === 'Dispatched' ? "border-rose-500/40 bg-rose-950/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]" : 
              analysis.automation.status === 'Scheduled' ? "border-amber-500/40 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]" : "border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            }
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
          
          {/* === 2. INPUT PANEL (LEFT) === */}
          <div className="xl:col-span-1 border border-emerald-900/40 bg-[#010a05]/70 backdrop-blur-2xl rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.3)] hover:border-white/[0.05]">
             <div>
                <h3 className="text-sm font-semibold text-emerald-300 flex items-center space-x-2 mb-6 uppercase tracking-widest border-b border-emerald-900/30 pb-3">
                  <Wind className="size-4 text-emerald-600" />
                  <span>Telemetry Simulator</span>
                </h3>

                <div className="space-y-6">
                  {/* Dust */}
                  <div className="group/slider space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="text-emerald-600/80 uppercase tracking-wider font-bold text-[10px]">Dust Level (%)</label>
                      <span className="font-mono text-emerald-400 font-bold">{data.dust}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full h-1.5 bg-[#011409] rounded-lg appearance-none cursor-ew-resize accent-amber-500 border border-emerald-900/50 shadow-inner group-hover/slider:border-amber-500/50 transition-colors"
                      value={data.dust}
                      onChange={(e) => setData({ ...data, dust: parseInt(e.target.value) })}
                    />
                  </div>

                  {/* Temp */}
                  <div className="group/slider space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="text-emerald-600/80 uppercase tracking-wider font-bold text-[10px]">Matrix Temperature (°C)</label>
                      <span className="font-mono text-emerald-400 font-bold">{data.temp}°C</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="80"
                      className="w-full h-1.5 bg-[#011409] rounded-lg appearance-none cursor-ew-resize accent-rose-500 border border-emerald-900/50 shadow-inner group-hover/slider:border-rose-500/50 transition-colors"
                      value={data.temp}
                      onChange={(e) => setData({ ...data, temp: parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-emerald-600/80 mb-2 block uppercase tracking-wider font-bold">Expected (kW)</label>
                      <input
                        type="number"
                        className="w-full bg-[#011409] border border-emerald-900/50 rounded-lg p-3 text-xl text-emerald-50 outline-none focus:border-emerald-500/50 focus:bg-[#02180b] font-mono transition-all shadow-inner"
                        value={data.expected}
                        onChange={(e) => setData({ ...data, expected: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-emerald-600/80 mb-2 block uppercase tracking-wider font-bold">Actual (kW)</label>
                      <input
                        type="number"
                        className="w-full bg-[#011409] border border-emerald-900/50 rounded-lg p-3 text-xl text-emerald-50 outline-none focus:border-amber-500/50 focus:bg-[#02180b] font-mono transition-all shadow-inner"
                        value={data.actual}
                        onChange={(e) => setData({ ...data, actual: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>
             </div>

             <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="mt-8 w-full py-4 rounded-lg font-bold tracking-widest uppercase text-sm flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-emerald-50 border border-emerald-500/50 hover:from-emerald-500 hover:to-emerald-700 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50"
              >
                {isAnalyzing ? "Processing Vectors..." : "Run AI Simulation"}
             </button>
          </div>

          {/* === 3. THREE-LAYER OUTPUT SYSTEM === */}
          <div className="xl:col-span-2 flex flex-col gap-6">
             
             {/* SECTION A & B IN ONE ROW */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* SECTION A - RAW DATA */}
                <div className="border border-emerald-900/40 bg-[#010a05]/70 backdrop-blur-2xl rounded-2xl p-5 relative shadow-xl transition-all duration-500 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.3)] hover:border-white/[0.05]">
                   <div className="absolute top-0 right-0 py-1.5 px-3 text-[9px] text-emerald-600/80 font-mono uppercase tracking-widest bg-[#010703] rounded-bl-lg border-b border-l border-emerald-900/40">
                     Phase 1 Tracking
                   </div>
                   <h3 className="text-sm font-semibold text-emerald-400 flex items-center space-x-2 mb-5">
                     <Database className="size-4" />
                     <span>Diagnostic Overlay</span>
                   </h3>
                   <div className="space-y-4 pt-2">
                     <div className="flex justify-between items-center border-b border-emerald-900/30 pb-3">
                       <span className="text-xs uppercase tracking-widest font-bold text-emerald-600/80">Dust Level</span>
                       <span className="font-mono text-emerald-200">{data.dust}%</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-emerald-900/30 pb-3">
                       <span className="text-xs uppercase tracking-widest font-bold text-emerald-600/80">Array Temp</span>
                       <span className="font-mono text-emerald-200">{data.temp}°C</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-emerald-900/30 pb-2">
                       <span className="text-xs uppercase tracking-widest font-bold text-emerald-600/80">Output Delta</span>
                       <span className="font-mono text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/50 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">-{Math.max(0, data.expected - data.actual)} kW</span>
                     </div>
                   </div>
                </div>

                {/* SECTION B - AI INSIGHTS (SCENARIOS) */}
                <div className="border border-amber-900/40 bg-amber-950/10 backdrop-blur-2xl rounded-2xl p-5 relative shadow-xl transition-all duration-500 hover:bg-amber-500/5 hover:shadow-[inset_0_1px_0_rgba(251,191,36,0.1),0_8px_30px_rgba(0,0,0,0.3)] hover:border-amber-500/30">
                   <div className="absolute top-0 right-0 py-1.5 px-3 text-[9px] text-amber-500/80 font-mono uppercase tracking-widest bg-[#010703] rounded-bl-lg border-b border-l border-amber-900/40">
                     Phase 2 Projection
                   </div>
                   <h3 className="text-sm font-semibold text-amber-500 flex items-center space-x-2 mb-5">
                     <Activity className="size-4" />
                     <span>Financial Simulation (72h)</span>
                   </h3>
                   <div className="space-y-3 pt-2">
                     <div className="flex justify-between items-center bg-[#010a05]/80 p-3 rounded-lg border border-red-900/30">
                       <span className="text-[11px] uppercase tracking-wider text-rose-500/80 font-bold">If No Action:</span>
                       <span className="font-mono text-rose-400 text-sm font-bold tracking-tight border-b border-rose-400/30">-SAR {analysis.scenarios.noAction.moneyLost}</span>
                     </div>
                     <div className="flex justify-between items-center bg-[#010a05]/80 p-3 rounded-lg border border-amber-900/30 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                       <span className="text-[11px] uppercase tracking-wider text-amber-500/80 font-bold">If Act Immediate:</span>
                       <span className="font-mono text-amber-400 text-sm font-bold tracking-tight drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">Saves SAR {analysis.scenarios.immediateAction.savings}</span>
                     </div>
                     <div className="flex justify-between items-center bg-[#010a05]/80 p-3 rounded-lg border border-emerald-900/30">
                        <span className="text-[11px] uppercase tracking-wider text-emerald-500/80 font-bold">If Act in 48h:</span>
                        <span className="font-mono text-emerald-400 text-sm font-bold tracking-tight">Saves SAR {analysis.scenarios.delayedAction.savings}</span>
                     </div>
                   </div>
                </div>

             </div>

             {/* SECTION C - DECISION ENGINE */}
             <div className="border border-emerald-500/40 bg-[#010a05]/80 backdrop-blur-3xl rounded-xl relative shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col justify-between flex-1 group">
                 {/* Sweep animation behind */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                 
                 <div className="p-7 relative z-10">
                   <div className="absolute top-0 right-0 py-1.5 px-3 text-[9px] text-emerald-300 font-mono uppercase tracking-widest bg-emerald-950/80 rounded-bl-lg border-b border-l border-emerald-500/40">
                       Phase 3 Command
                   </div>
                   <h3 className="text-base font-bold text-emerald-400 flex items-center space-x-2 mb-8 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                       <Cpu className="size-5" />
                       <span>Decision Engine</span>
                   </h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-2">
                      {/* Left decision block */}
                      <div className="space-y-6">
                         <div>
                           <div className="text-[10px] text-emerald-600/80 mb-2 uppercase tracking-widest font-bold">Recommended Vector</div>
                           <div className="text-2xl font-bold text-emerald-50 leading-tight">{analysis.decision.recommendedAction}</div>
                         </div>
                         
                         <div className="flex flex-col space-y-2">
                           <div className="text-[10px] text-emerald-600/80 uppercase tracking-widest font-bold">Execution Timetable</div>
                           <div className="font-bold text-amber-400 text-lg flex items-center">
                              <span className="size-2 rounded-full bg-amber-500 mr-2 animate-pulse" />
                              {analysis.decision.bestTime}
                           </div>
                         </div>
                         <p className="text-sm text-emerald-300/60 leading-relaxed italic border-l-2 border-emerald-900/50 pl-4 py-1">
                            "{analysis.decision.reason}"
                         </p>
                      </div>

                      {/* Right side Terminal Readout */}
                      <div className="flex flex-col justify-center">
                         <div className="bg-[#000502] border border-emerald-900/40 rounded-xl p-5 font-mono text-xs text-emerald-500 relative shadow-inner">
                            <div className="absolute top-2.5 left-3.5 flex space-x-1.5 opacity-60">
                               <div className="size-2.5 rounded-full bg-rose-500 border border-rose-900" />
                               <div className="size-2.5 rounded-full bg-amber-500 border border-amber-900" />
                               <div className="size-2.5 rounded-full bg-emerald-500 border border-emerald-900" />
                            </div>
                            <div className="pt-6 space-y-2.5 leading-relaxed opacity-90">
                               <p className="text-emerald-700">dustiq-os@neom:~# invoke dispatcher {"-v"}</p>
                               <p className="text-emerald-400">{'>'} Analyzing ROI matrices...</p>
                               <p className="text-emerald-400 flex"><span className="mr-2">{'>'}</span> <span>Committing scheduled task <br/> [{analysis.automation.status.toUpperCase()}]</span></p>
                               <p className="border-t border-emerald-900/50 pt-3 mt-3 text-emerald-300 font-bold tracking-tight">
                                  System: <span className="text-emerald-50/80 font-normal">{analysis.automation.message}</span>
                               </p>
                            </div>
                         </div>
                      </div>
                   </div>
                 </div>

             </div>
          </div>
        </div>

        {/* BOTTOM: CHART SECTION */}
        <div className="grid grid-cols-1">
          <div className="bg-[#010a05]/70 backdrop-blur-2xl border border-emerald-900/40 rounded-2xl p-6 h-80 relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.3)] hover:border-white/[0.05]">
            <h3 className="text-sm font-semibold text-emerald-300 flex items-center space-x-2 mb-6 uppercase tracking-widest border-b border-emerald-900/30 pb-3">
               <Activity className="size-4 text-emerald-500" />
               <span>Live Telemetry Grid (kW)</span>
            </h3>
            <ResponsiveContainer width="100%" height="80%" className="relative z-10">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="time" stroke="#047857" fontSize={11} tickLine={false} axisLine={false} dy={10} fontFamily="monospace" />
                <YAxis stroke="#047857" fontSize={11} tickLine={false} axisLine={false} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#010f08', borderColor: '#064e3b', borderRadius: '8px', borderWidth: '1px' }}
                  itemStyle={{ color: '#ecfdf5', fontSize: '13px', fontFamily: 'monospace' }}
                  labelStyle={{ color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="Expected" stroke="#34d399" strokeWidth={2} dot={false} strokeDasharray="4 4" isAnimationActive={false}/>
                <Line type="monotone" dataKey="Actual" stroke="#f43f5e" strokeWidth={3} dot={true} activeDot={{r: 6}} isAnimationActive={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </main>
    </div>
  );
}
