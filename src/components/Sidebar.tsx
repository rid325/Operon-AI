"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BrainCircuit,
  Home,
  Lightbulb,
  Share2,
  Map,
  Activity,
  Layers,
  Settings,
  Shield,
  Database,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import TranslateWidget from "./TranslateWidget";

function GlassMenuItem({ item, isActive }: { item: any; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-500 relative overflow-hidden group",
        isActive 
          ? "bg-white/[0.08] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] text-white"
          : "text-slate-400 border border-transparent hover:bg-white/[0.05] hover:backdrop-blur-sm hover:border-white/[0.05] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:text-white"
      )}
    >
      {/* The Moving iOS Glass Glare! */}
      <div className="absolute inset-0 -translate-x-[150%] group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
      
      {/* Orange/Amber active indicator line on the left edge */}
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-amber-400 blur-[1px] rounded-r-md z-10" />}
      
      <item.icon className={cn("size-4 transition-transform duration-500 group-hover:scale-110 relative z-10", isActive && "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]")} />
      <span className="text-[13px] tracking-wide font-medium relative z-10 drop-shadow-md">{item.label}</span>
      
      {/* Adding shimmer keyframes injected dynamically */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(150%) skewX(12deg); }
        }
      `}</style>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const commandItems = [
    { label: "Strategic Overview", href: "/", icon: Home },
    { label: "ROI Calculator", href: "/roi", icon: Lightbulb },
  ];

  const analysisItems = [
    { label: "Knowledge Graph", href: "/network", icon: Share2 },
    { label: "Geospatial Intel", href: "/geospatial", icon: Map },
    { label: "Digital Twin", href: "/twin", icon: Layers },
  ];

  const infrastructureItems = [
    { label: "Data Lake", href: "/data-lake", icon: Database },
    { label: "Control Panel", href: "/control-panel", icon: Settings },
    { label: "Security & Governance", href: "/security", icon: Shield },
  ];

  return (
    <div className="w-64 bg-[#010A05]/95 backdrop-blur-xl border-r border-emerald-900/30 flex flex-col h-screen fixed top-0 left-0 hidden md:flex z-50 transition-all duration-300">
      
      {/* Top Left Global Translate & Logo */}
      <div className="px-6 pt-5 pb-4 border-b border-emerald-900/30 flex flex-col space-y-4">
        
        {/* ARABIC TRANSLATION BUTTON (Top Left Corner) */}
        <div className="relative z-50">
           <TranslateWidget />
        </div>

        <div className="flex items-center space-x-3">
          <div className="size-8 rounded-lg bg-emerald-950 flex items-center justify-center border border-emerald-500/50 glow-success shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <BrainCircuit className="text-emerald-400 size-5" />
          </div>
          <div>
            <h1 className="text-emerald-50 font-bold tracking-wider text-sm">DustIQ <span className="text-amber-500 tracking-normal ml-0.5">AI</span></h1>
            <p className="text-[10px] text-emerald-500/70 tracking-widest uppercase mt-0.5">Autonomous Operator</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto no-scrollbar">
        {/* COMMAND */}
        <div>
          <h2 className="text-[10px] font-semibold text-emerald-900 tracking-widest uppercase mb-3 px-2">
            COMMAND
          </h2>
          <nav className="space-y-1">
            {commandItems.map((item) => (
              <GlassMenuItem key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </nav>
        </div>

        {/* ANALYSIS */}
        <div>
          <h2 className="text-[10px] font-semibold text-emerald-900 tracking-widest uppercase mb-3 px-2">
            ANALYSIS
          </h2>
          <nav className="space-y-1">
            {analysisItems.map((item) => (
              <GlassMenuItem key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </nav>
        </div>

        {/* INFRASTRUCTURE */}
        <div>
          <h2 className="text-[10px] font-semibold text-emerald-900 tracking-widest uppercase mb-3 px-2">
            INFRASTRUCTURE
          </h2>
          <nav className="space-y-1">
            {infrastructureItems.map((item) => (
              <GlassMenuItem key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-emerald-900/30 bg-emerald-950/10 backdrop-blur-sm transition-all duration-300 hover:bg-emerald-950/20">
        <div className="text-[10px] text-emerald-700 mb-2 tracking-widest uppercase">System Status</div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Data Ingestion</span>
                <div className="flex items-center space-x-2">
                   <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                   <span className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase">Online</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Knowledge Graph</span>
                <div className="flex items-center space-x-2">
                   <div className="size-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                   <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase">Sync</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
