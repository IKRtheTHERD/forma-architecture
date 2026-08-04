'use client';

import React from 'react';
import Image from 'next/image';
import { Program } from '@/lib/db';
import { Clock, DollarSign, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProgramCardProps {
  program: Program;
  onApply: (program: Program) => void;
}

export default function ProgramCard({ program, onApply }: ProgramCardProps) {
  return (
    <div className="group relative bg-[#F5F4F0] border-2 border-[#1A1A1A] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C1440E] hover:shadow-xl">
      {/* Top Banner Image with Blueprint Hover Overlay */}
      <div className="relative h-48 w-full bg-[#1A1A1A] overflow-hidden">
        <img
          src={program.bg_image_url}
          alt={program.title}
          className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
        />
        {/* Category & Status Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 bg-[#1A1A1A] text-[#F5F4F0] font-mono-tech text-[10px] uppercase font-bold border border-[#C1440E]">
            {program.category}
          </span>
          <span
            className={`px-2.5 py-1 font-mono-tech text-[10px] uppercase font-bold border ${
              program.status === 'open'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                : 'bg-amber-950 text-amber-300 border-amber-500'
            }`}
          >
            {program.status === 'open' ? 'SEATS OPEN' : 'WAITLIST ONLY'}
          </span>
        </div>

        {/* Level Tag Overlay */}
        <div className="absolute bottom-3 left-3 font-mono-tech text-[10px] text-white bg-[#C1440E] px-2 py-0.5 font-bold">
          {program.level} ({program.credits} CPD CREDITS)
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#1A1A1A] uppercase tracking-tight group-hover:text-[#C1440E] transition-colors leading-snug">
            {program.title}
          </h3>
          <p className="mt-2 text-xs text-[#5A5A5A] leading-relaxed line-clamp-3">
            {program.description}
          </p>
        </div>

        {/* Specifications & Key Metrics */}
        <div className="pt-3 border-t border-[#1A1A1A]/15 font-mono-tech text-xs space-y-2">
          <div className="flex items-center justify-between text-[#1A1A1A]">
            <span className="text-[#5A5A5A]">INSTRUCTOR:</span>
            <span className="font-bold text-[#C1440E]">{program.instructor_name}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="flex items-center gap-1.5 text-[#1A1A1A]">
              <Clock className="w-3.5 h-3.5 text-[#C1440E]" />
              <span>{program.duration_weeks} WEEKS DURATION</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#1A1A1A] justify-end">
              <DollarSign className="w-3.5 h-3.5 text-[#C1440E]" />
              <span>${program.price_usd.toLocaleString()} TUITION</span>
            </div>
          </div>
        </div>

        {/* Feature List Preview */}
        <div className="space-y-1 text-[11px] text-[#5A5A5A] font-sans pt-1">
          {program.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C1440E] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onApply(program)}
          className="w-full mt-4 py-3 bg-[#1A1A1A] text-[#F5F4F0] font-mono-tech text-xs uppercase font-bold tracking-wider hover:bg-[#C1440E] transition-all flex items-center justify-center gap-2 border border-[#1A1A1A]"
        >
          <span>APPLY FOR THIS STUDIO</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
