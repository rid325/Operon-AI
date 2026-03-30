"use client";

import { Settings, Sliders, Shield, AlertTriangle, Zap, Server } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="text-slate-300 font-sans p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 pb-12">
        <header className="flex flex-col mb-8 gap-2 border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-2">
                <Settings className="size-6 text-cyan-400" />
                <h1 className="text-2xl font-bold text-slate-100 tracking-tight">System Configuration</h1>
            </div>
            <p className="text-slate-500 text-sm">Tune the parameters of the Autonomous Decision Engine and localized environmental contexts.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* AI Threshold Settings */}
            <div className="border border-slate-800 bg-[#070D18] rounded-xl p-6 shadow-lg space-y-6">
                <h3 className="text-sm font-semibold text-slate-300 flex items-center space-x-2 uppercase tracking-wider border-b border-slate-800 pb-3">
                  <Sliders className="size-4 text-cyan-500" />
                  <span>AI Confidence Thresholds</span>
                </h3>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm text-slate-400">Auto-Dispatch Breakeven Override</label>
                            <span className="font-mono text-cyan-400">1.2x</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-2 leading-relaxed tracking-wide">
                           The multiplier at which the AI will override scheduled action and force dispatch. Wait until loss = 1.2x Dispatch Cost.
                        </p>
                        <input
                            type="range"
                            min="1.0"
                            max="3.0"
                            step="0.1"
                            defaultValue="1.2"
                            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm text-slate-400">Predictive Sandstorm Weight</label>
                            <span className="font-mono text-amber-500">85%</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-2 leading-relaxed tracking-wide">
                           How heavily the AI weights incoming meteorological data from local Saudi sensors (NCM) before preempting washes.
                        </p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="85"
                            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>
                </div>
            </div>

            {/* Simulated Fleet Settings */}
            <div className="border border-slate-800 bg-[#070D18] rounded-xl p-6 shadow-lg space-y-6">
                <h3 className="text-sm font-semibold text-slate-300 flex items-center space-x-2 uppercase tracking-wider border-b border-slate-800 pb-3">
                  <Server className="size-4 text-emerald-500" />
                  <span>Fleet Integration</span>
                </h3>

                <div className="space-y-5">
                    <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                           <Zap className="size-4 text-cyan-400" />
                           <div>
                              <div className="text-sm text-slate-200">Robotic Drone Fleet</div>
                              <div className="text-[10px] text-slate-500">Cost: SAR 150/dispatch. Fast recovery.</div>
                           </div>
                        </div>
                        <div className="h-5 w-9 rounded-full bg-cyan-900 flex items-center px-1 border border-cyan-500 cursor-pointer">
                            <div className="size-3 rounded-full bg-cyan-400 translate-x-4 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                           <AlertTriangle className="size-4 text-amber-500" />
                           <div>
                              <div className="text-sm text-slate-200">Heavy Tractor Wash</div>
                              <div className="text-[10px] text-slate-500">Cost: SAR 500/dispatch. Thorough clean.</div>
                           </div>
                        </div>
                        <div className="h-5 w-9 rounded-full bg-cyan-900 flex items-center px-1 border border-cyan-500 cursor-pointer">
                            <div className="size-3 rounded-full bg-cyan-400 translate-x-4 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Global Context */}
            <div className="lg:col-span-2 border border-slate-800 bg-[#070D18] rounded-xl p-6 shadow-lg mt-2">
                 <h3 className="text-sm font-semibold text-slate-300 flex items-center space-x-2 uppercase tracking-wider border-b border-slate-800 pb-3 mb-4">
                  <Shield className="size-4 text-slate-500" />
                  <span>Deployment Context</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-900 cursor-pointer transition-colors hover:bg-cyan-950/40 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500 opacity-5 blur-2xl rounded-full" />
                        <div className="text-sm font-bold text-cyan-400 mb-1 flex items-center justify-between">
                            NEOM Alpha Array
                            <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                        </div>
                        <div className="text-[10px] text-slate-500">Coastal desert simulation. High humidity & dust mixture.</div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 cursor-pointer transition-colors hover:bg-slate-800">
                        <div className="text-sm font-bold text-slate-300 mb-1">Sakaka Solar Project</div>
                        <div className="text-[10px] text-slate-500">Inland arid conditions. Extreme thermal saturation model.</div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 cursor-pointer transition-colors hover:bg-slate-800">
                        <div className="text-sm font-bold text-slate-300 mb-1">Sudair Solar PV</div>
                        <div className="text-[10px] text-slate-500">Mega-scale model. High capacity, micro-dust focus.</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}
