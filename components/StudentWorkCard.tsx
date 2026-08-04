'use client';

import React from 'react';
import { StudentWork } from '@/lib/db';
import { Award, Code, MapPin, MessageSquareQuote } from 'lucide-react';

interface StudentWorkCardProps {
  work: StudentWork;
}

export default function StudentWorkCard({ work }: StudentWorkCardProps) {
  return (
    <div className="bg-[#F5F4F0] border-2 border-[#1A1A1A] overflow-hidden flex flex-col justify-between hover:border-[#C1440E] transition-all duration-300 shadow-md">
      {/* Project Rendering Image */}
      <div className="relative h-56 w-full bg-[#1A1A1A] overflow-hidden group">
        <img
          src={work.image_url}
          alt={work.project_title}
          className="w-full h-full object-cover grayscale opacity-85 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#1A1A1A] text-[#F5F4F0] px-2.5 py-1 font-mono-tech text-[10px] uppercase font-bold border border-[#C1440E]">
          {work.grade}
        </div>
        <div className="absolute bottom-3 right-3 bg-[#C1440E] text-white px-2 py-0.5 font-mono-tech text-[10px] font-bold">
          {work.year}
        </div>
      </div>

      {/* Details & Critique */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#C1440E] uppercase mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{work.location}</span>
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-tight leading-snug">
            {work.project_title}
          </h3>
          <p className="text-xs font-mono-tech text-[#5A5A5A] mt-1">
            STUDENT: <strong className="text-[#1A1A1A]">{work.student_name}</strong>
          </p>
        </div>

        {/* Jury Critique Quote Box */}
        <div className="p-3.5 bg-[#EBEBEB] border-l-4 border-[#C1440E] space-y-1">
          <span className="text-[10px] font-mono-tech text-[#C1440E] font-bold uppercase flex items-center gap-1">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            Pritzker Jury Critique:
          </span>
          <p className="text-xs text-[#1A1A1A] italic leading-relaxed">
            "{work.critique_notes}"
          </p>
        </div>

        {/* Software Stack Tags */}
        <div className="pt-2 border-t border-[#1A1A1A]/10 flex flex-wrap items-center gap-1.5 font-mono-tech text-[10px]">
          <span className="text-[#5A5A5A] font-bold mr-1">STACK:</span>
          {work.software.map((sw, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-[#1A1A1A] text-[#F5F4F0] rounded-none border border-[#1A1A1A]"
            >
              {sw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
