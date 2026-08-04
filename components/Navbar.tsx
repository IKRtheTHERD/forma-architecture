'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, ArrowUpRight } from 'lucide-react';
import ApplicationModal from './ApplicationModal';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { href: '/', label: '01_HERO / MANIFESTO' },
    { href: '/programs', label: '02_STUDIO CATALOG' },
    { href: '/instructors', label: '03_FACULTY PROFILES' },
    { href: '/studio', label: '04_CRITIQUE WALL' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F5F4F0]/95 backdrop-blur-md border-b-2 border-[#1A1A1A]">
        {/* Top Technical Metadata Bar */}
        <div className="hidden md:flex items-center justify-between px-6 py-1 bg-[#1A1A1A] text-[#F5F4F0] font-mono-tech text-[10px] tracking-wider border-b border-[#C1440E]">
          <div className="flex items-center gap-4">
            <span className="text-[#C1440E] font-bold">LAT: 51.5074° N, LON: 0.1278° W</span>
            <span className="text-gray-400">| ADMISSIONS SESSION: 2026/2027</span>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <span>STUDIO STATUS: <strong className="text-emerald-400">OPEN FOR APPLICATIONS</strong></span>
            <span className="text-[#C1440E]">PRITZKER MENTORSHIP ACTIVE</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#F5F4F0] flex items-center justify-center border-2 border-[#C1440E] group-hover:bg-[#C1440E] transition-colors">
              <Compass className="w-6 h-6 text-[#C1440E] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tighter uppercase font-sans text-[#1A1A1A] group-hover:text-[#C1440E] transition-colors">
                FORMA<span className="text-[#C1440E]">//</span>ARCHITECTURE
              </span>
              <span className="text-[9px] font-mono-tech text-[#5A5A5A] uppercase tracking-widest">
                ADVANCED ONLINE STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-mono-tech text-xs tracking-wider">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-all ${
                    isActive
                      ? 'text-[#C1440E] font-bold'
                      : 'text-[#1A1A1A] hover:text-[#C1440E]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C1440E]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[#C1440E] text-white font-mono-tech text-xs uppercase font-bold tracking-wider hover:bg-[#1A1A1A] transition-all border border-[#C1440E] flex items-center gap-2 shadow-md"
            >
              <span>APPLY FOR STUDIO</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] border border-[#1A1A1A]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F5F4F0] border-t-2 border-[#1A1A1A] px-6 py-6 space-y-4 font-mono-tech text-sm">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 border-b border-[#1A1A1A]/10 ${
                  pathname === link.href ? 'text-[#C1440E] font-bold' : 'text-[#1A1A1A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full py-3 bg-[#C1440E] text-white uppercase font-bold text-xs tracking-wider flex items-center justify-center gap-2"
            >
              <span>APPLY FOR STUDIO</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Global Student Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
