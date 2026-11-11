import React from 'react';

export const VintageBackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Seamless Vintage Botanical Damask & Filigree Pattern Tile */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045] transition-opacity duration-700"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="vintageDamask"
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="currentColor" strokeWidth="0.9">
              {/* Central Vintage Medallion */}
              <circle cx="70" cy="70" r="16" strokeDasharray="2 3" />
              <circle cx="70" cy="70" r="8" />
              <circle cx="70" cy="70" r="2.5" fill="currentColor" />

              {/* Four Botanical Acanthus Leaf Arches */}
              <path d="M 70,44 C 77,32 90,32 96,44 C 90,56 77,56 70,44 Z" />
              <path d="M 70,96 C 77,108 90,108 96,96 C 90,84 77,84 70,96 Z" />
              <path d="M 44,70 C 32,77 32,90 44,96 C 56,90 56,77 44,70 Z" />
              <path d="M 96,70 C 108,77 108,90 96,96 C 84,90 84,77 96,70 Z" />

              {/* Interlocking Vine Curves connecting adjacent tiles */}
              <path d="M 0,0 C 20,8 26,26 26,26" />
              <path d="M 140,0 C 120,8 114,26 114,26" />
              <path d="M 0,140 C 20,132 26,114 26,114" />
              <path d="M 140,140 C 120,132 114,114 114,114" />

              {/* Center Diamond Flourishes */}
              <path d="M 70,0 L 74,8 L 70,16 L 66,8 Z" fill="currentColor" opacity="0.4" />
              <path d="M 70,140 L 74,132 L 70,124 L 66,132 Z" fill="currentColor" opacity="0.4" />
              <path d="M 0,70 L 8,74 L 16,70 L 8,66 Z" fill="currentColor" opacity="0.4" />
              <path d="M 140,70 L 132,74 L 124,70 L 132,66 Z" fill="currentColor" opacity="0.4" />

              {/* Corner Star Accents */}
              <circle cx="0" cy="0" r="2" fill="currentColor" />
              <circle cx="140" cy="0" r="2" fill="currentColor" />
              <circle cx="0" cy="140" r="2" fill="currentColor" />
              <circle cx="140" cy="140" r="2" fill="currentColor" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vintageDamask)" />
      </svg>

      {/* 2. Soft Ambient Vignette / Glow Orbs at Key Areas */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/6 blur-[130px]" />
      <div className="absolute top-1/3 -right-32 w-[480px] h-[480px] rounded-full bg-accent/6 blur-[140px]" />
      <div className="absolute top-2/3 -left-32 w-[420px] h-[420px] rounded-full bg-primary/5 blur-[140px]" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[150px]" />

      {/* 3. Subtle Vintage Laid Paper Vertical Stripes (Vergé Paper Texture) */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, currentColor 0, currentColor 1px, transparent 1px, transparent 32px)',
        }}
      />
    </div>
  );
};

