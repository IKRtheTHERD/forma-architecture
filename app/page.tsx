import React from 'react';
import Link from 'next/link';
import { getPrograms, getInstructors, getStudentWork } from '@/lib/db';
import BlueprintLineAnimation from '@/components/BlueprintLineAnimation';
import ProgramCardWrapper from './ProgramCardWrapper';
import InstructorCard from '@/components/InstructorCard';
import StudentWorkCard from '@/components/StudentWorkCard';
import { ArrowRight, Compass, CheckCircle2, Award, BookOpen, Layers } from 'lucide-react';

export const revalidate = 0; // Dynamic rendering

export default async function HomePage() {
  const programs = await getPrograms();
  const instructors = await getInstructors();
  const studentWork = await getStudentWork();

  return (
    <div className="space-y-20 pb-20 font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-2 border-[#1A1A1A]">
        {/* Top Technical Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-[#C1440E] mb-6">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 bg-[#C1440E] animate-pulse" />
            FORMA//INTERNATIONAL_ACADEMY_OF_ARCHITECTURE
          </div>
          <div className="text-[#5A5A5A] text-[11px]">
            LAT: 51.5074° N, LON: 0.1278° W | ADMISSIONS 2026/2027
          </div>
        </div>

        {/* Large Brutalist Typography Header */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-[#1A1A1A] leading-none">
            ARCHITECTURE IS AN ARGUMENT.<br />
            <span className="text-[#C1440E] underline decoration-4 underline-offset-8">
              MAKE YOURS.
            </span>
          </h1>
          <p className="max-w-3xl text-lg sm:text-xl text-[#5A5A5A] leading-relaxed font-sans pt-2">
            An advanced online architectural institute engineered for practicing architects and scholars. Intensive computational studios, robotic timber fabrication labs, and 1-on-1 mentorship from Pritzker laureates.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4 font-mono-tech text-xs">
          <Link
            href="/programs"
            className="px-6 py-4 bg-[#C1440E] text-white uppercase font-bold tracking-wider hover:bg-[#1A1A1A] transition-all border-2 border-[#1A1A1A] flex items-center gap-2 shadow-lg"
          >
            <span>EXPLORE STUDIO PROGRAMS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/instructors"
            className="px-6 py-4 bg-[#F5F4F0] text-[#1A1A1A] uppercase font-bold tracking-wider hover:bg-[#EBEBEB] transition-all border-2 border-[#1A1A1A] flex items-center gap-2"
          >
            <span>VIEW FACULTY PROFILES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive SVG Blueprint Line Drawing */}
        <div className="mt-12">
          <div className="mb-3 flex items-center justify-between font-mono-tech text-xs text-[#1A1A1A]">
            <span className="font-bold text-[#C1440E] uppercase flex items-center gap-2">
              <Layers className="w-4 h-4" />
              INTERACTIVE BLUEPRINT STRUCTURAL CANVAS (TOGGLE LAYERS BELOW)
            </span>
            <span className="text-[#5A5A5A]">LIVE VECTOR SIMULATION</span>
          </div>
          <BlueprintLineAnimation />
        </div>
      </section>

      {/* ARCHITECTURAL MANIFESTO / PROCESS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border-l-4 border-[#C1440E] pl-6 mb-12">
          <span className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase tracking-widest block">
            01_INSTITUTE MANIFESTO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] uppercase tracking-tight mt-1">
            THE THREE TECTONIC PILLARS OF FORMA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 01 */}
          <div className="bg-[#EBEBEB] border-2 border-[#1A1A1A] p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <span className="absolute -top-6 -right-4 text-8xl font-extrabold font-mono-tech text-[#C1440E]/15 group-hover:text-[#C1440E]/30 transition-colors select-none">
              01
            </span>
            <div>
              <div className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase mb-2">
                SYNTHETIC RIGOR
              </div>
              <h3 className="text-xl font-bold uppercase text-[#1A1A1A]">
                Algorithmic Mesh & Spatial Code
              </h3>
              <p className="mt-3 text-xs text-[#5A5A5A] leading-relaxed">
                We move beyond static CAD geometry. Students write bespoke Python and Grasshopper scripts to generate micro-climate resilient skyscraper envelopes and structural multi-agent fields.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1A1A1A]/10 font-mono-tech text-[11px] text-[#1A1A1A] font-bold">
              LAB 01: COMPUTATIONAL MESHING
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="bg-[#EBEBEB] border-2 border-[#1A1A1A] p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <span className="absolute -top-6 -right-4 text-8xl font-extrabold font-mono-tech text-[#C1440E]/15 group-hover:text-[#C1440E]/30 transition-colors select-none">
              02
            </span>
            <div>
              <div className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase mb-2">
                MATERIAL TRUTH
              </div>
              <h3 className="text-xl font-bold uppercase text-[#1A1A1A]">
                Mass Timber & Bio-Synthetics
              </h3>
              <p className="mt-3 text-xs text-[#5A5A5A] leading-relaxed">
                Concrete and steel alone cannot solve ecological degradation. We research carbon-negative Cross-Laminated Timber (CLT) joinery and living algae capilliary facades.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1A1A1A]/10 font-mono-tech text-[11px] text-[#1A1A1A] font-bold">
              LAB 02: TECTONIC TIMBER & BIO
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="bg-[#EBEBEB] border-2 border-[#1A1A1A] p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <span className="absolute -top-6 -right-4 text-8xl font-extrabold font-mono-tech text-[#C1440E]/15 group-hover:text-[#C1440E]/30 transition-colors select-none">
              03
            </span>
            <div>
              <div className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase mb-2">
                CIVIC MONUMENTALITY
              </div>
              <h3 className="text-xl font-bold uppercase text-[#1A1A1A]">
                Pritzker Laureate Desk Critiques
              </h3>
              <p className="mt-3 text-xs text-[#5A5A5A] leading-relaxed">
                Direct 1-on-1 critique sessions twice weekly with Pritzker Prize laureates and international design partners from Herzog & de Meuron, OMA, and Zaha Hadid Architects.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1A1A1A]/10 font-mono-tech text-[11px] text-[#1A1A1A] font-bold">
              LAB 03: JURY DEFENSE & MONOGRAPH
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED STUDIO PROGRAMS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b-2 border-[#1A1A1A] pb-4">
          <div>
            <span className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase tracking-widest block">
              02_STUDIO CURRICULUM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] uppercase tracking-tight mt-1">
              FEATURED ADVANCED STUDIOS
            </h2>
          </div>
          <Link
            href="/programs"
            className="px-4 py-2 bg-[#1A1A1A] text-[#F5F4F0] font-mono-tech text-xs uppercase font-bold hover:bg-[#C1440E] transition-colors border border-[#1A1A1A]"
          >
            VIEW ALL STUDIOS & FILTERS →
          </Link>
        </div>

        {/* Programs Grid */}
        <ProgramCardWrapper initialPrograms={programs} />
      </section>

      {/* FACULTY INSTRUCTORS PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b-2 border-[#1A1A1A] pb-4">
          <div>
            <span className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase tracking-widest block">
              03_FACULTY MENTORS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] uppercase tracking-tight mt-1">
              WORLD-RENOWNED INSTRUCTORS
            </h2>
          </div>
          <Link
            href="/instructors"
            className="px-4 py-2 bg-[#1A1A1A] text-[#F5F4F0] font-mono-tech text-xs uppercase font-bold hover:bg-[#C1440E] transition-colors border border-[#1A1A1A]"
          >
            VIEW ALL FACULTY PROFILES →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map(inst => (
            <InstructorCard key={inst.id} instructor={inst} />
          ))}
        </div>
      </section>

      {/* STUDENT CRITIQUE WALL PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b-2 border-[#1A1A1A] pb-4">
          <div>
            <span className="text-xs font-mono-tech text-[#C1440E] font-bold uppercase tracking-widest block">
              04_STUDIO OUTPUT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] uppercase tracking-tight mt-1">
              STUDENT CRITIQUE WALL
            </h2>
          </div>
          <Link
            href="/studio"
            className="px-4 py-2 bg-[#1A1A1A] text-[#F5F4F0] font-mono-tech text-xs uppercase font-bold hover:bg-[#C1440E] transition-colors border border-[#1A1A1A]"
          >
            VIEW FULL GALLERY & CRITIQUES →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studentWork.map(work => (
            <StudentWorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      {/* FINAL ADMISSIONS BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#1A1A1A] text-[#F5F4F0] border-4 border-[#C1440E] p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 bg-[#C1440E] text-white font-mono-tech text-xs uppercase font-bold">
              ADMISSIONS OPEN FOR 2026/2027 COHORT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              READY TO DEFEND YOUR ARCHITECTURAL THESIS?
            </h2>
            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              Submit your project dossier and statement of intent for review by the Forma International Jury Board. Limited seats available per studio cohort.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/programs"
              className="block text-center px-8 py-5 bg-[#C1440E] text-white font-mono-tech text-sm uppercase font-bold tracking-widest hover:bg-white hover:text-[#1A1A1A] transition-all border-2 border-[#C1440E] shadow-2xl"
            >
              SELECT A STUDIO & APPLY NOW
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
