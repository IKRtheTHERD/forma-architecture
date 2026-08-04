'use client';

import React, { useState } from 'react';
import { Program } from '@/lib/db';
import ProgramCard from '@/components/ProgramCard';
import ApplicationModal from '@/components/ApplicationModal';

interface ProgramCardWrapperProps {
  initialPrograms: Program[];
}

export default function ProgramCardWrapper({ initialPrograms }: ProgramCardWrapperProps) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialPrograms.map(program => (
          <ProgramCard
            key={program.id}
            program={program}
            onApply={handleApply}
          />
        ))}
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProgramId={selectedProgram?.id}
        selectedProgramTitle={selectedProgram?.title}
      />
    </>
  );
}
