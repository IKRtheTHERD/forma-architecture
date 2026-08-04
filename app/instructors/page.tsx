import React from 'react';
import { getInstructors } from '@/lib/db';
import InstructorCard from '@/components/InstructorCard';
import { Compass, Award, BookOpen, Layers } from 'lucide-react';

export const revalidate = 0;

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      {/* Page Header */}
      <div className="border-b-2 border-[#1A1A1A] pb-8">
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#C1440E] font-bold uppercase mb-2">
          <Compass className="w-4 h-4" />
          FORMA//FACULTY_INSTRUCTORS_ROSTER
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#1A1A1A]">
          FACULTY & PRITZKER FELLOWS
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-[#5A5A5A] mt-3 font-sans leading-relaxed">
          Our studio master instructors are practicing architects, Pritzker Prize laureates, and pioneering bio-synthetic researchers. Click "Blueprint Overlay" on any instructor card to inspect their structural research vector.
        </p>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {instructors.map(inst => (
          <InstructorCard key={inst.id} instructor={inst} />
        ))}
      </div>

      {/* Mentorship Philosophy Section */}
      <div className="bg-[#EBEBEB] border-2 border-[#1A1A1A] p-8 sm:p-12 space-y-6">
        <div className="border-l-4 border-[#C1440E] pl-4">
          <span className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase tracking-widest block">
            PEDAGOGICAL STRUCTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#1A1A1A] mt-1">
            HOW DESK CRITIQUES OPERATE AT FORMA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs text-[#5A5A5A] leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-mono-tech font-bold uppercase text-[#1A1A1A] text-sm">
              01. BI-WEEKLY 1-ON-1 DESK CRITS
            </h3>
            <p>
              Students meet individually with assigned Pritzker laureates for 45 minutes twice per week via high-definition screen sharing and live 3D Rhino viewport review.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono-tech font-bold uppercase text-[#1A1A1A] text-sm">
              02. GUEST JURY DEFENSES
            </h3>
            <p>
              Mid-term and final studio projects are defended before a panel of invited guest critics from Zaha Hadid Architects, Foster + Partners, and OMA.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono-tech font-bold uppercase text-[#1A1A1A] text-sm">
              03. PUBLICATION MONOGRAPH
            </h3>
            <p>
              Selected high-distinction student work is compiled and published annually in the physical Forma Architecture Press monograph distributed globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
