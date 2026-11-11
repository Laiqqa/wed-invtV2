import React from 'react';

interface VintageDividerProps {
  className?: string;
}

export const VintageDivider: React.FC<VintageDividerProps> = ({ className = 'my-12' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 max-w-sm mx-auto select-none pointer-events-none opacity-60 ${className}`}>
      {/* Left ornate line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-borderSubtle to-primary/40" />

      {/* Center filigree botanical flourish */}
      <svg className="w-8 h-5 text-primary" viewBox="0 0 32 20" fill="none" stroke="currentColor">
        <path d="M 2,10 C 8,5 12,5 16,10 C 20,5 24,5 30,10" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="16" cy="10" r="2" fill="currentColor" />
        <circle cx="10" cy="8" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="22" cy="8" r="1" fill="currentColor" opacity="0.6" />
        <path d="M 12,12 C 14,14 18,14 20,12" strokeWidth="0.9" />
      </svg>

      {/* Right ornate line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-borderSubtle to-primary/40" />
    </div>
  );
};

