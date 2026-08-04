'use client';

import React, { useState, useEffect } from 'react';
import { Program } from '@/lib/db';
import ProgramCard from '@/components/ProgramCard';
import ApplicationModal from '@/components/ApplicationModal';
import { Search, Filter, RefreshCw, Compass } from 'lucide-react';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    'All',
    'Computational Design',
    'Sustainable Futures',
    'Architectural Theory'
  ];

  const statuses = ['All', 'open', 'waitlist'];

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedStatus !== 'All') params.append('status', selectedStatus);
      if (searchQuery.trim()) params.append('query', searchQuery.trim());

      const res = await fetch(`/api/programs?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setPrograms(data.programs);
      }
    } catch (err) {
      console.error('Failed to fetch programs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [selectedCategory, selectedStatus, searchQuery]);

  const handleApply = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      {/* Top Header */}
      <div className="border-b-2 border-[#1A1A1A] pb-8">
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#C1440E] font-bold uppercase mb-2">
          <Compass className="w-4 h-4" />
          FORMA//STUDIO_CURRICULUM_CATALOG
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#1A1A1A]">
          ADVANCED STUDIO CATALOG
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-[#5A5A5A] mt-3 font-sans leading-relaxed">
          Filter and query our active 2026/2027 studio programs. All courses query our local admissions database and feature 1-on-1 desk critiques from leading architectural theorists.
        </p>
      </div>

      {/* FILTER & SEARCH CONTROL PANEL */}
      <div className="bg-[#EBEBEB] border-2 border-[#1A1A1A] p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Bar Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or instructor..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#1A1A1A]/30 text-sm text-[#1A1A1A] focus:border-[#C1440E] focus:outline-none rounded-none font-sans"
            />
            <Search className="w-4 h-4 text-[#5A5A5A] absolute left-3.5 top-3.5" />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 font-mono-tech text-xs w-full md:w-auto overflow-x-auto">
            <span className="text-[#5A5A5A] font-bold uppercase mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#C1440E]" />
              STATUS:
            </span>
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-2 uppercase font-bold border transition-all ${
                  selectedStatus === st
                    ? 'bg-[#C1440E] text-white border-[#C1440E]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#C1440E]'
                }`}
              >
                {st === 'All' ? 'ALL STATUSES' : st.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs pt-4 border-t border-[#1A1A1A]/10">
          <span className="text-[#5A5A5A] font-bold uppercase mr-2">CATEGORY:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 uppercase font-bold border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1A1A1A] text-[#F5F4F0] border-[#1A1A1A]'
                  : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#C1440E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS COUNT & DATABASE STATUS */}
      <div className="flex items-center justify-between font-mono-tech text-xs text-[#5A5A5A] border-b border-[#1A1A1A]/10 pb-2">
        <div>
          QUERY RESULTS: <strong className="text-[#C1440E]">{programs.length} STUDIOS FOUND</strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span>DATABASE QUERY: ACTIVE</span>
        </div>
      </div>

      {/* PROGRAM CARDS GRID */}
      {loading ? (
        <div className="py-20 text-center font-mono-tech text-xs text-[#5A5A5A] flex items-center justify-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-[#C1440E]" />
          <span>QUERYING FORMA DATABASE...</span>
        </div>
      ) : programs.length === 0 ? (
        <div className="py-16 text-center bg-[#EBEBEB] border-2 border-dashed border-[#1A1A1A]/30 p-8 space-y-3">
          <p className="text-base font-bold text-[#1A1A1A] uppercase font-mono-tech">
            NO STUDIOS MATCH YOUR FILTER QUERY
          </p>
          <p className="text-xs text-[#5A5A5A]">
            Try resetting your search query or switching categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            className="px-4 py-2 bg-[#C1440E] text-white font-mono-tech text-xs uppercase font-bold"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map(program => (
            <ProgramCard
              key={program.id}
              program={program}
              onApply={handleApply}
            />
          ))}
        </div>
      )}

      {/* APPLICATION MODAL */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProgramId={selectedProgram?.id}
        selectedProgramTitle={selectedProgram?.title}
      />
    </div>
  );
}
