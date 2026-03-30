"use client";

import { Share2, AlertTriangle, Shield, ZoomIn, ZoomOut, Maximize, ScanFace } from "lucide-react";

// AR HUD Colors: Primarily Bright Emerald/Cyan with Gold/Amber targets
const HUD_STYLES = {
    standard: { stroke: "#10b981", core: "#059669", accent: "#34d399" }, // Emerald Hologram
    target: { stroke: "#fbbf24", core: "#d97706", accent: "#fde68a" },   // Gold Target
};

const NODES = [
  { id: "core", x: 48, y: 46, label: "SYS.CORE", size: 4, type: "standard" },
  
  // Highlighted path nodes
  { id: "source", x: 65, y: 55, label: "TRQ-7", size: 3, type: "target", isTarget: true },
  { id: "target", x: 30, y: 48, label: "RCV-DRN", size: 3, type: "target", isTarget: true },

  // Inner ring
  { id: "n1", x: 45, y: 32, label: "INV-A1", size: 2.5, type: "standard" },
  { id: "n2", x: 55, y: 34, label: "THM-C2", size: 2.5, type: "standard" },
  { id: "n3", x: 38, y: 40, label: "GRD-HK", size: 2.5, type: "standard" },
  { id: "n4", x: 58, y: 44, label: "BAT-B1", size: 2.8, type: "standard" },
  { id: "n5", x: 42, y: 55, label: "WXT-50", size: 2.5, type: "standard" },
  { id: "n6", x: 52, y: 58, label: "SAT-DL", size: 3, type: "standard" },

  // Outer ring
  { id: "o1", x: 32, y: 22, label: "SEC-1", size: 1.5, type: "standard" },
  { id: "o2", x: 62, y: 20, label: "SEC-2", size: 1.5, type: "standard" },
  { id: "o3", x: 75, y: 30, label: "SEC-3", size: 1.5, type: "standard" },
  { id: "o4", x: 80, y: 45, label: "ANE-W1", size: 1.5, type: "standard" },
  { id: "o5", x: 76, y: 65, label: "ANE-H2", size: 1.5, type: "standard" },
  { id: "o6", x: 60, y: 75, label: "ML-PRD", size: 2.2, type: "standard" },
  { id: "o7", x: 45, y: 78, label: "LOG-RT", size: 1.5, type: "standard" },
  { id: "o8", x: 28, y: 72, label: "MNT-01", size: 1.8, type: "standard" },
];

const EDGES = [
  // The highlighted edge
  { from: "source", to: "target", type: "highlight" },

  // Connections to core
  { from: "n1", to: "core" }, { from: "n2", to: "core" }, { from: "n3", to: "core" },
  { from: "n4", to: "core" }, { from: "n5", to: "core" }, { from: "n6", to: "core" },
  { from: "source", to: "core" }, { from: "core", to: "target" },
  
  // Outer connections
  { from: "o1", to: "n1" }, { from: "o2", to: "n2" }, { from: "o3", to: "n4" },
  { from: "o2", to: "n1" }, { from: "o4", to: "n4" }, { from: "o5", to: "n6" },
  { from: "o5", to: "source" }, { from: "o6", to: "n6" }, { from: "o7", to: "n5" },
  { from: "o8", to: "n5" },
  
  // Cross connections
  { from: "n1", to: "n3" }, { from: "n4", to: "source" }, { from: "n5", to: "n6" },
  { from: "o3", to: "n2" }, { from: "o4", to: "source" }, { from: "o6", to: "core" },
  { from: "o8", to: "target" },
];

function HUDStatCard({ title, value, highlightClass, icon: Icon }: any) {
    return (
        <div className={`bg-[#010b06]/80 backdrop-blur-md border border-emerald-900/40 rounded p-4 flex flex-col justify-between h-20 shadow-lg relative overflow-hidden group`}>
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20" />
            <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/50 opacity-50 m-1`} />
            <div className="flex justify-between items-center w-full mb-1 pl-2">
                <span className="text-[10px] uppercase font-bold text-emerald-700 font-mono tracking-widest">{title}</span>
                {Icon && <Icon className={`size-3 ${highlightClass}`} />}
            </div>
            <div className="flex justify-between items-end w-full pl-2">
                <div className={`text-2xl font-bold font-mono tracking-tighter leading-none ${highlightClass}`}>{value}</div>
            </div>
        </div>
    );
}

export default function AugmentedGraphPage() {
  return (
    <div className="flex flex-col h-screen bg-black text-emerald-400 font-sans max-w-[1800px] mx-auto overflow-hidden relative">
        
        {/* AR Glitch Overlay (purely cosmetic subtle lines) */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiMxMGI5ODEiLz48L3N2Zz4=')] mix-blend-screen" />
        
        {/* Top Header HUD Style */}
        <header className="absolute top-4 left-4 z-20 flex items-center space-x-3 text-xs font-mono">
           <div className="flex items-center bg-[#010b06]/80 backdrop-blur-md px-4 py-2 rounded border border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
               <ScanFace className="size-4 text-emerald-400 mr-3 animate-pulse" />
               <span className="text-emerald-500 font-bold tracking-widest uppercase flex items-center">
                   OPTICAL LINK 
                   <span className="ml-3 px-1.5 py-0.5 bg-emerald-950/50 text-emerald-300 text-[9px] border border-emerald-800">ESTABLISHED</span>
               </span>
           </div>
        </header>

        {/* Stats overlay */}
        <div className="absolute top-20 left-4 z-20 w-64 space-y-3">
            <HUDStatCard title="Entities Tracked" value="0021" highlightClass="text-emerald-400" icon={Share2} />
            <HUDStatCard title="Active Vectors" value="0025" highlightClass="text-emerald-400" />
            <HUDStatCard title="Target Lock" value="TRQ-7" highlightClass="text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.2)]" icon={Maximize} />
        </div>

        {/* MAIN HUD CANVAS */}
        <div className="flex-1 w-full h-full relative group">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                <defs>
                   <style>
                       {`
                           @keyframes spinSlow { 100% { transform: rotate(360deg); } }
                           @keyframes spinSlowReverse { 100% { transform: rotate(-360deg); } }
                           .rotate-ring { animation: spinSlow 20s linear infinite; transform-origin: center; }
                           .rotate-ring-rev { animation: spinSlowReverse 15s linear infinite; transform-origin: center; }
                       `}
                   </style>
                   
                   <marker id="arrow-emerald" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" opacity="0.6" />
                   </marker>
                   <marker id="arrow-amber" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
                   </marker>

                   {/* Neon Glow Filters */}
                   <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="0.4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                   </filter>
                   <filter id="neon-glow-amber" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="0.6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                   </filter>
                </defs>

                {/* Radar sweep background grid circles */}
                <circle cx="50" cy="50" r="30" fill="none" stroke="#064e3b" strokeWidth="0.1" strokeDasharray="1 3" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#064e3b" strokeWidth="0.1" strokeDasharray="1 5" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="#064e3b" strokeWidth="0.05" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#064e3b" strokeWidth="0.05" />

                {/* Edges */}
                {EDGES.map((edge, i) => {
                    const fromNode = NODES.find(n => n.id === edge.from);
                    const toNode = NODES.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const isHighlight = edge.type === "highlight";
                    // For the highlighted line, we draw a thick glowing amber line
                    
                    return (
                        <g key={`edge-${i}`}>
                            {isHighlight && (
                                <line 
                                    x1={fromNode.x} y1={fromNode.y} 
                                    x2={toNode.x} y2={toNode.y} 
                                    stroke="#fbbf24" 
                                    strokeWidth="0.3"
                                    strokeOpacity="0.8"
                                    filter="url(#neon-glow-amber)"
                                />
                            )}
                            <line 
                                x1={fromNode.x} y1={fromNode.y} 
                                x2={toNode.x} y2={toNode.y} 
                                // Razor thin holographic dotted lines
                                stroke={isHighlight ? "#fbbf24" : "#10b981"} 
                                strokeWidth={isHighlight ? "0.2" : "0.08"}
                                strokeDasharray={isHighlight ? "none" : "1 1"}
                                opacity={isHighlight ? 1 : 0.4}
                                markerEnd={isHighlight ? "url(#arrow-amber)" : "url(#arrow-emerald)"}
                            />
                        </g>
                    )
                })}

                {/* Nodes - AR Vector Styling */}
                {NODES.map((node) => {
                    const style = HUD_STYLES[node.type as keyof typeof HUD_STYLES];
                    return (
                        <g key={node.id} className="cursor-crosshair transition-transform origin-center hover:scale-[1.2]" style={{ transformOrigin: `${node.x}px ${node.y}px` }}>

                            {/* Center Crosshair + */}
                            <path 
                                d={`M ${node.x - 0.8} ${node.y} L ${node.x + 0.8} ${node.y} M ${node.x} ${node.y - 0.8} L ${node.x} ${node.y + 0.8}`} 
                                stroke={style.stroke} 
                                strokeWidth={node.isTarget ? "0.3" : "0.15"} 
                                filter={node.isTarget ? "url(#neon-glow-amber)" : "none"}
                            />
                            
                            {/* Inner rotating dashed ring */}
                            <g style={{ transformOrigin: `${node.x}px ${node.y}px` }} className="rotate-ring">
                                <circle 
                                    cx={node.x} cy={node.y} 
                                    r={node.size * 0.6} 
                                    fill="transparent"
                                    stroke={style.stroke}
                                    strokeWidth={node.isTarget ? "0.2" : "0.1"}
                                    strokeDasharray="1.5 1.5"
                                    opacity="0.8"
                                />
                            </g>

                            {/* Outer geometric solid/dashed ring */}
                            <g style={{ transformOrigin: `${node.x}px ${node.y}px` }} className="rotate-ring-rev">
                                <circle 
                                    cx={node.x} cy={node.y} 
                                    r={node.size} 
                                    fill="transparent"
                                    stroke={style.accent}
                                    strokeWidth={node.isTarget ? "0.15" : "0.05"}
                                    strokeDasharray={node.isTarget ? "4 8" : "none"}
                                    opacity={node.isTarget ? "1" : "0.4"}
                                />
                            </g>

                            {/* Target Lock Brackets for Highlighted nodes */}
                            {node.isTarget && (
                                <g filter="url(#neon-glow-amber)">
                                    <path d={`M ${node.x - node.size - 1} ${node.y - node.size + 0.5} L ${node.x - node.size - 1} ${node.y - node.size - 1} L ${node.x - node.size + 0.5} ${node.y - node.size - 1}`} fill="none" stroke="#fbbf24" strokeWidth="0.3" />
                                    <path d={`M ${node.x + node.size + 1} ${node.y - node.size + 0.5} L ${node.x + node.size + 1} ${node.y - node.size - 1} L ${node.x + node.size - 0.5} ${node.y - node.size - 1}`} fill="none" stroke="#fbbf24" strokeWidth="0.3" />
                                    <path d={`M ${node.x - node.size - 1} ${node.y + node.size - 0.5} L ${node.x - node.size - 1} ${node.y + node.size + 1} L ${node.x - node.size + 0.5} ${node.y + node.size + 1}`} fill="none" stroke="#fbbf24" strokeWidth="0.3" />
                                    <path d={`M ${node.x + node.size + 1} ${node.y + node.size - 0.5} L ${node.x + node.size + 1} ${node.y + node.size + 1} L ${node.x + node.size - 0.5} ${node.y + node.size + 1}`} fill="none" stroke="#fbbf24" strokeWidth="0.3" />
                                </g>
                            )}

                            {/* Label - Monospace Terminal style */}
                            <text 
                                x={node.x + node.size + 1} 
                                y={node.y + 0.3} 
                                fontSize="0.9" 
                                fill={node.isTarget ? "#fbbf24" : "#34d399"} 
                                className="font-mono"
                                textAnchor="start"
                                opacity="0.9"
                            >
                                [{node.label}]
                            </text>
                            {/* Sub-label coordinates to look more advanced */}
                            <text 
                                x={node.x + node.size + 1.2} 
                                y={node.y + 1.2} 
                                fontSize="0.4" 
                                fill="#047857" 
                                className="font-mono tracking-widest"
                                textAnchor="start"
                            >
                                {node.x.toFixed(1)}x {node.y.toFixed(1)}y
                            </text>
                        </g>
                    )
                })}
            </svg>

            {/* Bottom Target Info Panel */}
            <div className="absolute bottom-6 right-6 z-20 w-80 bg-[#010b06]/90 backdrop-blur-xl border border-amber-500/40 p-4 rounded-lg shadow-[0_0_20px_rgba(251,191,36,0.1)]">
                <div className="flex justify-between items-start mb-2 border-b border-amber-900/50 pb-2">
                    <div>
                        <div className="text-[10px] text-amber-500 font-mono tracking-widest flex items-center mb-1">
                            <AlertTriangle className="size-3 mr-1" />
                            TARGET LOCK ACTIVE
                        </div>
                        <h3 className="text-sm text-emerald-100 font-mono">TRQ-7 <span className="text-slate-500">&rarr;</span> RCV-DRN</h3>
                    </div>
                </div>
                <div className="space-y-1 font-mono text-[9px]">
                    <div className="flex justify-between"><span className="text-slate-500">OP STATUS:</span> <span className="text-emerald-400">NOMINAL</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">INTERFERENCE:</span> <span className="text-rose-400">HIGH (91.2%)</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">EST. LATENCY:</span> <span className="text-amber-400">14ms</span></div>
                </div>
            </div>
            
        </div>
    </div>
  );
}
