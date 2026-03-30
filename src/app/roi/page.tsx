"use client";

import { useState } from "react";
import { Lightbulb, Calculator, TrendingUp, Sparkles, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ROICalculator() {
  const [capacity, setCapacity] = useState(50); // MW
  const [rate, setRate] = useState(0.18); // SAR
  const [cleaningEvents, setCleaningEvents] = useState(12); // times per year manually

  const generateData = () => {
    // Basic projection: Auto lowers losses by dynamically cleaning vs manual fixed schedule
    const manualLossBase = 15; // % loss
    const autoLossBase = 5; // % loss
    
    // Yearly revenue theoretical (capacity * 1000 kW * 6 hours * 365 days)
    const theoreticalRev = capacity * 1000 * 6 * 365 * rate;

    const points = [];
    for (let i = 1; i <= 5; i++) {
        // Assume manual gets worse over years as panels age, Auto maintains better
        const manualRev = theoreticalRev * (1 - (manualLossBase + i) / 100);
        const autoRev = theoreticalRev * (1 - (autoLossBase + (i * 0.2)) / 100) - (cleaningEvents * 1.5 * 500); // 1.5x more cleanings but cheaper overall retention

        points.push({
            year: `Year ${i}`,
            "Manual Schedule": Math.floor(manualRev),
            "DustIQ Autonomous": Math.floor(autoRev),
            "Net Profit": Math.floor(autoRev - manualRev)
        });
    }
    return points;
  };

  const chartData = generateData();
  const year1Profit = chartData[0]["Net Profit"];

  return (
    <div className="text-slate-300 font-sans p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 pb-12 relative">
        <header className="flex flex-col mb-8 gap-2 border-b border-emerald-900/30 pb-6 relative z-10">
            <div className="flex items-center space-x-2">
                <Lightbulb className="size-6 text-amber-500" />
                <h1 className="text-2xl font-bold text-emerald-50 tracking-tight">Financial ROI Calculator</h1>
            </div>
            <p className="text-emerald-500/70 text-sm">Project the impact of Autonomous Dispatching across your entire solar array vs standard calendar-based cleaning schedules.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            
            {/* Input Panel */}
            <div className="border border-emerald-900/40 bg-[#010a05]/90 backdrop-blur-xl rounded-xl p-6 shadow-2xl h-fit space-y-6 group transition-all duration-300 hover:border-emerald-500/30">
                <h3 className="text-sm font-semibold text-emerald-300 flex items-center space-x-2 uppercase tracking-widest border-b border-emerald-900/30 pb-3">
                  <Calculator className="size-4 text-emerald-500" />
                  <span>Farm Parameters</span>
                </h3>

                <div className="space-y-6">
                  <div className="group/input transition-all">
                    <label className="text-xs text-emerald-600 mb-2 block tracking-widest uppercase font-bold">Solar Farm Capacity (MW)</label>
                    <div className="relative">
                        <input
                          type="number"
                          className="w-full bg-[#021308] border border-emerald-900/50 rounded-lg p-3 text-emerald-100 outline-none focus:border-amber-500/70 font-mono transition-colors shadow-inner"
                          value={capacity}
                          onChange={(e) => setCapacity(Number(e.target.value) || 0)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-700 font-mono text-xs">MW</div>
                    </div>
                  </div>
                  
                  <div className="group/input transition-all">
                    <label className="text-xs text-emerald-600 mb-2 block tracking-widest uppercase font-bold">Industrial Rate (SAR/kWh)</label>
                    <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          className="w-full bg-[#021308] border border-emerald-900/50 rounded-lg p-3 text-emerald-100 outline-none focus:border-amber-500/70 font-mono transition-colors shadow-inner"
                          value={rate}
                          onChange={(e) => setRate(Number(e.target.value) || 0)}
                        />
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-700 font-mono text-xs">SAR</div>
                    </div>
                  </div>
                  
                  <div className="group/input transition-all">
                    <label className="text-xs text-emerald-600 mb-2 block tracking-widest uppercase font-bold">Annual Manual Cleans</label>
                    <input
                      type="number"
                      className="w-full bg-[#021308] border border-emerald-900/50 rounded-lg p-3 text-emerald-100 outline-none focus:border-amber-500/70 font-mono transition-colors shadow-inner"
                      value={cleaningEvents}
                      onChange={(e) => setCleaningEvents(Number(e.target.value) || 0)}
                    />
                  </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                
                {/* Highlight Stats */}
                <div className="border border-amber-500/40 bg-amber-950/20 rounded-xl p-8 shadow-2xl relative overflow-hidden group hover:bg-amber-950/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500" />
                    
                    <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-2 flex items-center">
                        <Sparkles className="size-4 mr-2" />
                        Year 1 Projected Net Increase
                    </h3>
                    <div className="text-6xl font-black text-amber-400 font-mono tracking-tighter drop-shadow-md">
                        SAR {(year1Profit / 1000000).toFixed(2)}M
                    </div>
                    <p className="text-sm text-amber-600/80 mt-3 max-w-lg">By optimizing cleaning schedules dynamically rather than waiting for scheduled calendar dates while efficiency drops.</p>
                </div>

                {/* Chart */}
                <div className="border border-emerald-900/40 bg-[#010a05]/90 backdrop-blur-xl rounded-xl p-6 h-[400px] shadow-2xl transition-all duration-300 hover:border-emerald-500/30">
                    <h3 className="text-sm font-semibold text-emerald-300 flex items-center space-x-2 mb-6 border-b border-emerald-900/30 pb-3">
                        <TrendingUp className="size-4 text-emerald-500" />
                        <span>5-Year Revenue Projection (SAR)</span>
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" strokeOpacity={0.4} vertical={false} />
                            <XAxis dataKey="year" stroke="#059669" fontSize={12} tickLine={false} axisLine={false} dy={10} fontFamily="monospace" />
                            <YAxis stroke="#059669" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} fontFamily="monospace" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#020f08', borderColor: '#10b981', borderRadius: '8px', borderWidth: '1px' }}
                                itemStyle={{ fontSize: '13px', fontFamily: 'monospace' }}
                                labelStyle={{ color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}
                                formatter={(value: number) => `SAR ${(value / 1000000).toFixed(2)}M`}
                            />
                            {/* Manual Line in subtle red */}
                            <Line type="monotone" dataKey="Manual Schedule" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
                            {/* Auto Line in Bright Gold */}
                            <Line type="monotone" dataKey="DustIQ Autonomous" stroke="#fbbf24" strokeWidth={3} dot={{ r: 5, fill: '#fbbf24', strokeWidth: 2, stroke: '#010a05' }} activeDot={{ r: 8, fill: '#fbbf24' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
        </div>
    </div>
  );
}
