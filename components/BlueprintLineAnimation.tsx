'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Compass, Maximize2, RefreshCw } from 'lucide-react';

export default function BlueprintLineAnimation() {
  const [activeLayer, setActiveLayer] = useState<'structural' | 'facade' | 'vector'>('structural');
  const [isDrawing, setIsDrawing] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1.0);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const triggerRedraw = () => {
    setIsDrawing(true);
    setTimeout(() => setIsDrawing(false), 1200);
  };

  useEffect(() => {
    triggerRedraw();
  }, [activeLayer]);

  return (
    <div className="relative w-full bg-[#0F172A] border-2 border-[#1A1A1A] p-6 text-[#F5F4F0] font-sans shadow-2xl rounded-sm">
      {/* Top Technical Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#4A6FA5]/30 mb-6 font-mono-tech text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#C1440E] font-bold">
            <Compass className="w-4 h-4 animate-spin-slow" />
            FORMA//BLUEPRINT_CANVAS_V4
          </span>
          <span className="text-[#4A6FA5] hidden sm:inline">| SCALE 1:100 @ A0</span>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveLayer('structural')}
            className={`px-3 py-1 text-[11px] border transition-all ${
              activeLayer === 'structural'
                ? 'bg-[#C1440E] text-white border-[#C1440E]'
                : 'bg-transparent text-[#94A3B8] border-[#334155] hover:border-[#4A6FA5]'
            }`}
          >
            01_Structural Grid
          </button>
          <button
            onClick={() => setActiveLayer('facade')}
            className={`px-3 py-1 text-[11px] border transition-all ${
              activeLayer === 'facade'
                ? 'bg-[#4A6FA5] text-white border-[#4A6FA5]'
                : 'bg-transparent text-[#94A3B8] border-[#334155] hover:border-[#4A6FA5]'
            }`}
          >
            02_Facade Enclosure
          </button>
          <button
            onClick={() => setActiveLayer('vector')}
            className={`px-3 py-1 text-[11px] border transition-all ${
              activeLayer === 'vector'
                ? 'bg-[#E2E8F0] text-[#0F172A] border-[#E2E8F0] font-bold'
                : 'bg-transparent text-[#94A3B8] border-[#334155] hover:border-[#4A6FA5]'
            }`}
          >
            03_Flow Vectors
          </button>
          <button
            onClick={triggerRedraw}
            className="p-1.5 text-[#94A3B8] hover:text-[#C1440E] border border-[#334155] hover:border-[#C1440E] transition-all ml-2"
            title="Redraw Blueprint Lines"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDrawing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full h-[360px] sm:h-[440px] bg-[#0A101D] border border-[#4A6FA5]/40 overflow-hidden flex items-center justify-center bg-blueprint-grid">
        {/* Background Radial Blueprint Light */}
        <div className="absolute inset-0 bg-radial from-[#4A6FA5]/15 via-transparent to-transparent pointer-events-none" />

        {/* SVG Architectural Blueprint Drawings */}
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full p-4 transition-transform duration-500 ease-out"
          style={{ transform: `scale(${scaleFactor})` }}
        >
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C1440E" />
              <stop offset="100%" stopColor="#4A6FA5" />
            </linearGradient>
          </defs>

          {/* Grid Pattern */}
          <rect width="800" height="500" fill="url(#grid-pattern)" />

          {/* Dimension Grid Lines & Axes */}
          <g stroke="#4A6FA5" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.6">
            <line x1="50" y1="50" x2="750" y2="50" />
            <line x1="50" y1="450" x2="750" y2="450" />
            <line x1="50" y1="50" x2="50" y2="450" />
            <line x1="750" y1="50" x2="750" y2="450" />

            <line x1="250" y1="50" x2="250" y2="450" />
            <line x1="450" y1="50" x2="450" y2="450" />
            <line x1="600" y1="50" x2="600" y2="450" />
          </g>

          {/* Axis Labels */}
          <g fill="#94A3B8" fontSize="10" fontFamily="monospace">
            <text x="50" y="35">GRID_A</text>
            <text x="250" y="35">GRID_B</text>
            <text x="450" y="35">GRID_C</text>
            <text x="600" y="35">GRID_D</text>
            <text x="750" y="35">GRID_E</text>

            <text x="25" y="55">01</text>
            <text x="25" y="200">02</text>
            <text x="25" y="350">03</text>
            <text x="25" y="455">04</text>
          </g>

          {/* LAYER 01: STRUCTURAL COLUMNS & FOUNDATION BEAMS */}
          {(activeLayer === 'structural' || activeLayer === 'vector') && (
            <g stroke="#C1440E" strokeWidth="2.5" fill="none">
              {/* Outer Perimeter Foundation Beam */}
              <rect
                x="100"
                y="80"
                width="600"
                height="340"
                strokeDasharray={isDrawing ? '1880' : '0'}
                strokeDashoffset={isDrawing ? '1880' : '0'}
                className="transition-all duration-1000 ease-in-out"
              />

              {/* Structural Columns (Pillars) */}
              {[
                { x: 100, y: 80, name: 'Col A1' },
                { x: 250, y: 80, name: 'Col B1' },
                { x: 450, y: 80, name: 'Col C1' },
                { x: 700, y: 80, name: 'Col D1' },

                { x: 100, y: 250, name: 'Col A2' },
                { x: 250, y: 250, name: 'Col B2' },
                { x: 450, y: 250, name: 'Col C2' },
                { x: 700, y: 250, name: 'Col D2' },

                { x: 100, y: 420, name: 'Col A3' },
                { x: 250, y: 420, name: 'Col B3' },
                { x: 450, y: 420, name: 'Col C3' },
                { x: 700, y: 420, name: 'Col D3' },
              ].map((col, idx) => (
                <g key={idx}>
                  <rect x={col.x - 8} y={col.y - 8} width="16" height="16" fill="#C1440E" stroke="#1A1A1A" strokeWidth="1" />
                  <line x1={col.x - 12} y1={col.y} x2={col.x + 12} y2={col.y} stroke="#FFFFFF" strokeWidth="0.8" />
                  <line x1={col.x} y1={col.y - 12} x2={col.x} y2={col.y + 12} stroke="#FFFFFF" strokeWidth="0.8" />
                </g>
              ))}

              {/* Cantilever Diagrid Bracing */}
              <line x1="100" y1="80" x2="250" y2="250" stroke="#C1440E" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="250" y1="80" x2="450" y2="250" stroke="#C1440E" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="450" y1="80" x2="700" y2="250" stroke="#C1440E" strokeWidth="1.5" strokeDasharray="3,3" />
            </g>
          )}

          {/* LAYER 02: FACADE ENCLOSURE & ROOM ZONING */}
          {(activeLayer === 'facade' || activeLayer === 'structural') && (
            <g stroke="#38BDF8" fill="none">
              {/* Studio Room 1: Computational Studio */}
              <rect
                x="110"
                y="90"
                width="230"
                height="150"
                fill={hoveredRoom === 'studio-1' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.03)'}
                stroke="#38BDF8"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredRoom('studio-1')}
                onMouseLeave={() => setHoveredRoom(null)}
              />
              <text x="125" y="120" fill="#38BDF8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                STUDIO_01: ALGORITHMIC MESH
              </text>
              <text x="125" y="140" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                AREA: 345 m² | CAP: 24 WORKSTATIONS
              </text>

              {/* Studio Room 2: Robotic Timber Workshop */}
              <rect
                x="360"
                y="90"
                width="330"
                height="150"
                fill={hoveredRoom === 'studio-2' ? 'rgba(193, 68, 14, 0.2)' : 'rgba(193, 68, 14, 0.04)'}
                stroke="#C1440E"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredRoom('studio-2')}
                onMouseLeave={() => setHoveredRoom(null)}
              />
              <text x="375" y="120" fill="#F97316" fontSize="12" fontFamily="monospace" fontWeight="bold">
                STUDIO_02: CNC TIMBER LAB
              </text>
              <text x="375" y="140" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                AREA: 495 m² | 6-AXIS KUKA ROBOTIC ARM
              </text>

              {/* Central Atrium & Exhibition Gallery */}
              <rect
                x="110"
                y="260"
                width="580"
                height="150"
                fill={hoveredRoom === 'atrium' ? 'rgba(74, 111, 165, 0.25)' : 'rgba(74, 111, 165, 0.05)'}
                stroke="#4A6FA5"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredRoom('atrium')}
                onMouseLeave={() => setHoveredRoom(null)}
              />
              <text x="130" y="290" fill="#60A5FA" fontSize="13" fontFamily="monospace" fontWeight="bold">
                CENTRAL CRITIQUE ATRIUM & JURY GALLERY
              </text>
              <text x="130" y="310" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                TRIPLE-HEIGHT LIGHTWELL | 1:1 PHYSICAL PROTOTYPE EXHIBITION FLOOR
              </text>

              {/* Circular Spiral Staircase Vector */}
              <circle cx="630" cy="335" r="45" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4,2" />
              <circle cx="630" cy="335" r="10" fill="#E2E8F0" />
              <line x1="630" y1="290" x2="630" y2="380" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="585" y1="335" x2="675" y2="335" stroke="#E2E8F0" strokeWidth="1" />
            </g>
          )}

          {/* LAYER 03: ENVIRONMENTAL FLOW VECTORS */}
          {activeLayer === 'vector' && (
            <g stroke="#E2E8F0" strokeWidth="1.5" fill="none">
              {/* Solar Vector Rays */}
              <path
                d="M 50 50 Q 200 150 400 200 T 750 350"
                stroke="url(#gradient-line)"
                strokeWidth="3"
                strokeDasharray="10,5"
                className="animate-pulse"
              />
              <path
                d="M 100 30 Q 300 180 500 220 T 750 420"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeDasharray="8,4"
              />

              {/* Prevailing Wind Arrows */}
              <g stroke="#38BDF8" strokeWidth="2" fill="#38BDF8">
                <line x1="70" y1="180" x2="230" y2="180" markerEnd="url(#arrow)" />
                <line x1="70" y1="220" x2="230" y2="220" markerEnd="url(#arrow)" />
                <text x="80" y="170" fill="#38BDF8" fontSize="10" fontFamily="monospace">
                  WIND_VECTOR 4.8 m/s NW
                </text>
              </g>

              {/* Microclimate Temperature Indicators */}
              <circle cx="200" cy="180" r="30" fill="rgba(56, 189, 248, 0.1)" stroke="#38BDF8" strokeWidth="1" />
              <text x="182" y="184" fill="#38BDF8" fontSize="10" fontFamily="monospace">21.4°C</text>

              <circle cx="500" cy="180" r="35" fill="rgba(193, 68, 14, 0.15)" stroke="#C1440E" strokeWidth="1" />
              <text x="482" y="184" fill="#F97316" fontSize="10" fontFamily="monospace">26.8°C</text>
            </g>
          )}

          {/* Interactive Dimension Callouts */}
          <g stroke="#E2E8F0" strokeWidth="1" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
            {/* Top Span */}
            <line x1="110" y1="65" x2="690" y2="65" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="110" y1="60" x2="110" y2="70" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="690" y1="60" x2="690" y2="70" stroke="#E2E8F0" strokeWidth="1" />
            <text x="360" y="60" fill="#E2E8F0" textAnchor="middle">SPAN: 58.00 m</text>

            {/* Right Height Span */}
            <line x1="720" y1="90" x2="720" y2="410" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="715" y1="90" x2="725" y2="90" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="715" y1="410" x2="725" y2="410" stroke="#E2E8F0" strokeWidth="1" />
            <text x="735" y="255" fill="#E2E8F0" writingMode="tb">HEIGHT: 32.00 m</text>
          </g>
        </svg>
      </div>

      {/* Bottom Information HUD Strip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[11px] text-[#94A3B8] border-t border-[#4A6FA5]/20 pt-3">
        <div className="flex items-center gap-4">
          <span className="text-[#F5F4F0]">
            ACTIVE ZONE: <strong className="text-[#C1440E]">{hoveredRoom ? hoveredRoom.toUpperCase() : 'BUILDING_ENVELOPE_OVERVIEW'}</strong>
          </span>
          <span>SOLAR IRRADIANCE: 840 W/m²</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setScaleFactor(prev => Math.min(prev + 0.1, 1.3))}
            className="px-2 py-0.5 border border-[#334155] hover:border-[#4A6FA5] text-[#F5F4F0]"
          >
            ZOOM IN +
          </button>
          <button
            onClick={() => setScaleFactor(prev => Math.max(prev - 0.1, 0.8))}
            className="px-2 py-0.5 border border-[#334155] hover:border-[#4A6FA5] text-[#F5F4F0]"
          >
            ZOOM OUT -
          </button>
          <button
            onClick={() => setScaleFactor(1.0)}
            className="px-2 py-0.5 border border-[#334155] hover:border-[#C1440E] text-[#C1440E]"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
