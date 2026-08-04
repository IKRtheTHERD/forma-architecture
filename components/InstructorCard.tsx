'use client';

import React, { useState } from 'react';
import { Instructor } from '@/lib/db';
import { Award, BookOpen, Layers, X } from 'lucide-react';

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <div className="group relative bg-[#F5F4F0] border-2 border-[#1A1A1A] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C1440E] hover:shadow-xl">
        {/* Portrait with Blueprint Hover Overlay */}
        <div className="relative h-64 w-full bg-[#1A1A1A] overflow-hidden">
          <img
            src={instructor.portrait_url}
            alt={instructor.name}
            className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

          {/* Title Tag */}
          <div className="absolute bottom-3 left-3 right-3 text-[#F5F4F0]">
            <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-[#C1440E] transition-colors">
              {instructor.name}
            </h3>
            <p className="text-xs font-mono-tech text-[#C1440E] font-semibold mt-0.5">
              {instructor.title}
            </p>
          </div>

          <button
            onClick={() => setShowOverlay(true)}
            className="absolute top-3 right-3 px-2.5 py-1 bg-[#1A1A1A]/80 text-[#F5F4F0] hover:bg-[#C1440E] font-mono-tech text-[10px] uppercase border border-[#C1440E] flex items-center gap-1.5 backdrop-blur-sm"
          >
            <Layers className="w-3 h-3" />
            <span>BLUEPRINT OVERLAY</span>
          </button>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <p className="text-xs text-[#5A5A5A] leading-relaxed">
            {instructor.bio}
          </p>

          <div className="space-y-3 pt-3 border-t border-[#1A1A1A]/15 font-mono-tech text-xs">
            <div>
              <span className="text-[#C1440E] font-bold block mb-1 uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C1440E]" />
                HONORS & AWARDS:
              </span>
              <p className="text-[11px] text-[#1A1A1A]">{instructor.awards}</p>
            </div>

            <div>
              <span className="text-[#1A1A1A] font-bold block mb-1 uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C1440E]" />
                SPECIALIZATION:
              </span>
              <p className="text-[11px] text-[#5A5A5A]">{instructor.specialization}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint Overlay Lightbox */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-[#0F172A] border-2 border-[#C1440E] p-6 text-white font-mono-tech space-y-4 rounded-sm">
            <div className="flex items-center justify-between border-b border-[#4A6FA5]/40 pb-3">
              <span className="text-xs text-[#C1440E] font-bold">
                BLUEPRINT_FACULTY_DOSSIER // {instructor.name.toUpperCase()}
              </span>
              <button
                onClick={() => setShowOverlay(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-64 w-full bg-blueprint-grid border border-[#4A6FA5] overflow-hidden flex items-center justify-center">
              <img
                src={instructor.blueprint_overlay_url}
                alt="Blueprint Overlay"
                className="w-full h-full object-cover mix-blend-screen opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 bg-black/70 border border-[#C1440E] text-center max-w-md">
                  <p className="text-xs text-[#38BDF8] font-bold uppercase mb-1">
                    RESEARCH BLUEPRINT VECTOR
                  </p>
                  <p className="text-[11px] text-gray-300">
                    {instructor.specialization}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-[#C1440E] font-bold uppercase">SELECTED PUBLICATIONS:</p>
              <ul className="list-disc list-inside text-gray-300 text-[11px] space-y-1">
                {instructor.publications.map((pub, idx) => (
                  <li key={idx}>{pub}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowOverlay(false)}
              className="w-full py-2.5 bg-[#C1440E] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
            >
              CLOSE BLUEPRINT DOSSIER
            </button>
          </div>
        </div>
      )}
    </>
  );
}
