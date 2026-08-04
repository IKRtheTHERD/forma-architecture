import React from 'react';
import { getStudentWork } from '@/lib/db';
import StudentWorkCard from '@/components/StudentWorkCard';
import { Compass, MessageSquareQuote, Award } from 'lucide-react';

export const revalidate = 0;

export default async function StudioPage() {
  const studentWork = await getStudentWork();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      {/* Page Header */}
      <div className="border-b-2 border-[#1A1A1A] pb-8">
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#C1440E] font-bold uppercase mb-2">
          <Compass className="w-4 h-4" />
          FORMA//STUDIO_CRITIQUE_WALL
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#1A1A1A]">
          STUDENT WORK & JURY REVIEWS
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-[#5A5A5A] mt-3 font-sans leading-relaxed">
          Exhibition gallery of recent student studio projects, structural code simulations, and verbatim critique transcripts from our Pritzker jury reviews.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {studentWork.map(work => (
          <StudentWorkCard key={work.id} work={work} />
        ))}
      </div>

      {/* Jury Guidelines */}
      <div className="bg-[#1A1A1A] text-[#F5F4F0] border-2 border-[#C1440E] p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C1440E] text-white flex items-center justify-center font-bold">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase tracking-widest block">
              CRITIQUE STANDARDS
            </span>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">
              VERBATIM JURY EVALUATION METRICS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono-tech text-xs text-gray-300">
          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[#C1440E] font-bold block mb-1">01_STRUCTURAL PHYSICS</span>
            <p className="text-[11px] text-gray-400">FEA finite element analysis of cantilevered loads and joint stress concentrations.</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[#C1440E] font-bold block mb-1">02_SOLAR IRRADIANCE</span>
            <p className="text-[11px] text-gray-400">Computational micro-climate simulation of facade daylighting and thermal envelope performance.</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[#C1440E] font-bold block mb-1">03_TECTONIC HONESTY</span>
            <p className="text-[11px] text-gray-400">Material expression of raw timber joinery, unadorned aggregate concrete, and capillary glass.</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[#C1440E] font-bold block mb-1">04_CIVIC MONUMENTALITY</span>
            <p className="text-[11px] text-gray-400">Architectural narrative and social spatial impact on urban public space assembly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
