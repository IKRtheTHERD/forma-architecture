'use client';

import React, { useState, useEffect } from 'react';

export default function CrosshairCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Horizontal Axis Line */}
      <div 
        className="absolute w-full h-[0.5px] bg-[#C1440E]/40"
        style={{ top: `${pos.y}px` }}
      />
      {/* Vertical Axis Line */}
      <div 
        className="absolute h-full w-[0.5px] bg-[#C1440E]/40"
        style={{ left: `${pos.x}px` }}
      />
      {/* Center Crosshair Marker */}
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <div className="w-5 h-5 border border-[#C1440E] rounded-full flex items-center justify-center opacity-80">
          <div className="w-1 h-1 bg-[#C1440E] rounded-full" />
        </div>
        <div className="absolute top-3 left-3 bg-[#1A1A1A] text-[#F5F4F0] px-1.5 py-0.5 text-[9px] font-mono-tech tracking-wider border border-[#C1440E]/50 rounded shadow-md whitespace-nowrap">
          X:{Math.round(pos.x)} Y:{Math.round(pos.y)} | GRID 1:200
        </div>
      </div>
    </div>
  );
}
