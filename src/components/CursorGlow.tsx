"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  // To avoid hydration mismatch, only render after mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-400/50 pointer-events-none z-[100] transition-transform duration-100 ease-out mix-blend-screen"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
      <div 
        className="fixed top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none z-[0] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 192}px, ${position.y - 192}px)`,
        }}
      />
    </>
  );
}
