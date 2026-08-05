'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#F5F4F0] border-t-4 border-[#C1440E] pt-12 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#F5F4F0]/15">
          {/* Col 1: Brand & Manifesto */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C1440E] text-white flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-mono-tech">
                FORMA<span className="text-[#C1440E]">//</span>ACADEMY
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-mono-tech">
              Architecture is an argument. Make yours. Advanced computational studio coursework, Pritzker laureate critiques, and structural synthesis for practicing architects.
            </p>
            <div className="text-[10px] font-mono-tech text-[#C1440E]">
              LAT: 51.5074Â° N, LON: 0.1278Â° W
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 font-mono-tech text-xs">
            <h4 className="text-[#C1440E] uppercase font-bold tracking-wider mb-2">
              01_STUDIO NAV
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#C1440E] transition-colors flex items-center gap-1">
                  <span>Home / Manifesto</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C1440E]" />
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-[#C1440E] transition-colors flex items-center gap-1">
                  <span>Studio Course Catalog</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C1440E]" />
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-[#C1440E] transition-colors flex items-center gap-1">
                  <span>Faculty Instructors</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C1440E]" />
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-[#C1440E] transition-colors flex items-center gap-1">
                  <span>Student Critique Wall</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C1440E]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Categories */}
          <div className="space-y-3 font-mono-tech text-xs">
            <h4 className="text-[#C1440E] uppercase font-bold tracking-wider mb-2">
              02_CURRICULUM LABS
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>Computational & Parametric Urbanism</li>
              <li>Mass Timber Tectonics & CLT</li>
              <li>Bio-Integrated Envelope Systems</li>
              <li>Monolithic Concrete & Monumentality</li>
              <li>Structural Physics & FEM Simulations</li>
            </ul>
          </div>

          {/* Col 4: Admissions & Accreditation */}
          <div className="space-y-3 font-mono-tech text-xs">
            <h4 className="text-[#C1440E] uppercase font-bold tracking-wider mb-2">
              03_ACCREDITATION
            </h4>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Forma Architecture is an independent international architectural research institute. Continuing Professional Development (CPD) credits awarded upon jury defense.
            </p>
            <div className="p-3 bg-black/50 border border-[#C1440E]/40 text-emerald-400 text-[10px]">
              STATUS: ADMISSIONS OPEN FOR 2026 COHORT
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-400 font-mono-tech text-[10px] gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span>Â© 2025 SimaVision x Ibrahim. All rights reserved.</span>
            <span className="hidden sm:inline text-[#C1440E]">//</span>
            <span>Sulaymaniyah, Kurdistan</span>
            <span className="hidden sm:inline text-[#C1440E]">//</span>
            <a href="mailto:IBR.KR@outlook.com" className="hover:text-[#C1440E] transition-colors">
              IBR.KR@outlook.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span>BRUTALIST DRAFTING AESTHETIC V4</span>
            <span className="text-[#C1440E]">MADE BY IBRAHIM K.R</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


