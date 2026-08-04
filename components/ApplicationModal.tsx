'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Send, ArrowRight } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgramId?: string;
  selectedProgramTitle?: string;
}

export default function ApplicationModal({
  isOpen,
  onClose,
  selectedProgramId = 'prog-01',
  selectedProgramTitle = 'Parametric Urbanism & Algorithmic Zoned Densities'
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    program_id: selectedProgramId,
    applicant_name: '',
    email: '',
    portfolio_url: '',
    statement: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');

  useEffect(() => {
    if (selectedProgramId) {
      setFormData(prev => ({ ...prev, program_id: selectedProgramId }));
    }
  }, [selectedProgramId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setEnrollmentId(data.enrollment.id);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit application');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#F5F4F0] border-2 border-[#1A1A1A] shadow-2xl overflow-hidden rounded-sm font-sans text-[#1A1A1A]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1A1A1A] text-[#F5F4F0] border-b-2 border-[#C1440E]">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-wider text-[#C1440E]">
            <span className="w-2 h-2 bg-[#C1440E] rounded-full animate-ping" />
            FORMA//STUDIO_ENROLLMENT_APPLICATION
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#F5F4F0] hover:text-[#C1440E] transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-[#C1440E]/10 border-2 border-[#C1440E] flex items-center justify-center rounded-full text-[#C1440E]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-[#1A1A1A]">
                APPLICATION DOSSIER RECEIVED
              </h3>
              <p className="mt-2 text-sm text-[#5A5A5A]">
                Your application has been registered into the Admissions Jury Database.
              </p>
              <div className="mt-4 p-4 bg-[#EBEBEB] border border-[#1A1A1A]/20 font-mono-tech text-xs text-[#1A1A1A] space-y-1">
                <div>DOSSIER ID: <strong className="text-[#C1440E]">{enrollmentId}</strong></div>
                <div>APPLICANT: {formData.applicant_name}</div>
                <div>EMAIL: {formData.email}</div>
                <div>TIMESTAMP: {new Date().toLocaleString()}</div>
              </div>
            </div>
            <button
              onClick={() => {
                setStatus('idle');
                onClose();
              }}
              className="w-full py-3 bg-[#1A1A1A] text-[#F5F4F0] font-mono-tech text-xs uppercase tracking-widest hover:bg-[#C1440E] transition-all border border-[#1A1A1A]"
            >
              RETURN TO STUDIO CATALOG
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="border-b border-[#1A1A1A]/10 pb-3">
              <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A]">
                APPLY FOR STUDIO ADMISSION
              </h3>
              <p className="text-xs text-[#5A5A5A] mt-1 font-mono-tech">
                SELECTED PROGRAM: <span className="text-[#C1440E] font-bold">{selectedProgramTitle}</span>
              </p>
            </div>

            {status === 'error' && (
              <div className="p-3 bg-[#C1440E]/10 border border-[#C1440E] text-[#C1440E] text-xs font-mono-tech flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-bold text-[#1A1A1A] mb-1">
                  01. FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.applicant_name}
                  onChange={e => setFormData({ ...formData, applicant_name: e.target.value })}
                  placeholder="e.g. Architect Sarah Jenkins"
                  className="w-full p-3 bg-white border border-[#1A1A1A]/30 text-sm text-[#1A1A1A] focus:border-[#C1440E] focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase font-bold text-[#1A1A1A] mb-1">
                  02. EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="s.jenkins@studio-architecture.com"
                  className="w-full p-3 bg-white border border-[#1A1A1A]/30 text-sm text-[#1A1A1A] focus:border-[#C1440E] focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase font-bold text-[#1A1A1A] mb-1">
                  03. PORTFOLIO / WORK URL (OPTIONAL)
                </label>
                <input
                  type="url"
                  value={formData.portfolio_url}
                  onChange={e => setFormData({ ...formData, portfolio_url: e.target.value })}
                  placeholder="https://portfolio.architecture.design/work"
                  className="w-full p-3 bg-white border border-[#1A1A1A]/30 text-sm text-[#1A1A1A] focus:border-[#C1440E] focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase font-bold text-[#1A1A1A] mb-1">
                  04. STATEMENT OF INTENT / EXPERIMENTAL GOALS
                </label>
                <textarea
                  rows={3}
                  value={formData.statement}
                  onChange={e => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Describe your design focus, computational ambitions, or material thesis..."
                  className="w-full p-3 bg-white border border-[#1A1A1A]/30 text-sm text-[#1A1A1A] focus:border-[#C1440E] focus:outline-none rounded-none resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 border border-[#1A1A1A]/30 text-xs font-mono-tech uppercase text-[#5A5A5A] hover:bg-[#EBEBEB] transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex-1 py-3 bg-[#C1440E] text-white font-mono-tech text-xs uppercase font-bold tracking-wider hover:bg-[#1A1A1A] transition-all flex items-center justify-center gap-2 border border-[#C1440E]"
              >
                {status === 'submitting' ? (
                  <span>TRANSMITTING DOSSIER...</span>
                ) : (
                  <>
                    <span>SUBMIT DOSSIER TO JURY</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
