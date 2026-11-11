import React from 'react';
import { motion } from 'framer-motion';

export type VintageButterflyColor = 'antique-gold' | 'dusty-rose' | 'vintage-amber' | 'muted-sage' | 'bordeaux-velvet';

export interface VintageButterflyStyle {
  wingFill: string;
  wingStroke: string;
  veinStroke: string;
  bodyColor: string;
  accentDot: string;
}

export const vintageButterflyThemes: Record<VintageButterflyColor, VintageButterflyStyle> = {
  'antique-gold': {
    wingFill: 'rgba(238, 218, 162, 0.88)',
    wingStroke: '#8C682D',
    veinStroke: 'rgba(140, 104, 45, 0.65)',
    bodyColor: '#3A2A18',
    accentDot: '#FFF4D0',
  },
  'dusty-rose': {
    wingFill: 'rgba(229, 190, 190, 0.88)',
    wingStroke: '#7A3E40',
    veinStroke: 'rgba(122, 62, 64, 0.65)',
    bodyColor: '#2E1416',
    accentDot: '#F9E3E3',
  },
  'vintage-amber': {
    wingFill: 'rgba(240, 201, 135, 0.88)',
    wingStroke: '#885418',
    veinStroke: 'rgba(136, 84, 24, 0.65)',
    bodyColor: '#351F0A',
    accentDot: '#FFF0D4',
  },
  'muted-sage': {
    wingFill: 'rgba(202, 216, 190, 0.88)',
    wingStroke: '#4A5E3E',
    veinStroke: 'rgba(74, 94, 62, 0.65)',
    bodyColor: '#1E2818',
    accentDot: '#EBF3E3',
  },
  'bordeaux-velvet': {
    wingFill: 'rgba(196, 125, 133, 0.88)',
    wingStroke: '#5E1A22',
    veinStroke: 'rgba(94, 26, 34, 0.65)',
    bodyColor: '#26070B',
    accentDot: '#F1D0D4',
  },
};

interface VintageButterflyProps {
  color?: VintageButterflyColor;
  size?: number;
  flapSpeed?: number;
  className?: string;
}

export const VintageButterfly: React.FC<VintageButterflyProps> = ({
  color = 'antique-gold',
  size = 36,
  flapSpeed = 0.28,
  className = '',
}) => {
  const theme = vintageButterflyThemes[color];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 0.9, perspective: 400 }}
    >
      {/* Left Wing */}
      <motion.div
        animate={{
          rotateY: [0, 68, 0, 72, 0],
        }}
        transition={{
          duration: flapSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-1/2 h-full origin-right"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg viewBox="0 0 50 60" className="w-full h-full drop-shadow-sm">
          {/* Outer Wing Contour */}
          <path
            d="M 50,30 C 42,10 20,-2 4,6 C -4,14 0,36 32,38 C 12,42 4,58 16,60 C 32,62 46,44 50,30 Z"
            fill={theme.wingFill}
            stroke={theme.wingStroke}
            strokeWidth="1.2"
          />
          {/* Detailed Naturalist Veins */}
          <path d="M 50,30 C 34,18 16,14 6,10" stroke={theme.veinStroke} strokeWidth="0.8" fill="none" />
          <path d="M 40,24 C 28,14 18,12 10,18" stroke={theme.veinStroke} strokeWidth="0.6" fill="none" />
          <path d="M 50,30 C 30,32 16,42 14,52" stroke={theme.veinStroke} strokeWidth="0.8" fill="none" />
          <path d="M 36,36 C 26,42 20,48 18,56" stroke={theme.veinStroke} strokeWidth="0.6" fill="none" />
          {/* Vintage Wing Spot Accents */}
          <circle cx="14" cy="16" r="2.5" fill={theme.accentDot} stroke={theme.wingStroke} strokeWidth="0.5" />
          <circle cx="20" cy="50" r="1.8" fill={theme.accentDot} stroke={theme.wingStroke} strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Slender Vintage Butterfly Body & Antennae */}
      <div className="relative flex flex-col items-center z-10 -mx-0.5 pointer-events-none">
        {/* Antennae */}
        <div className="flex gap-1.5 -mb-1 opacity-70">
          <span className="w-0.5 h-2 border-l border-t rounded-tl-full" style={{ borderColor: theme.bodyColor }} />
          <span className="w-0.5 h-2 border-r border-t rounded-tr-full" style={{ borderColor: theme.bodyColor }} />
        </div>
        {/* Thorax and Abdomen */}
        <div className="w-1 h-6 rounded-full shadow-xs" style={{ backgroundColor: theme.bodyColor }} />
      </div>

      {/* Right Wing */}
      <motion.div
        animate={{
          rotateY: [0, -68, 0, -72, 0],
        }}
        transition={{
          duration: flapSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-1/2 h-full origin-left"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg viewBox="0 0 50 60" className="w-full h-full drop-shadow-sm">
          {/* Outer Wing Contour */}
          <path
            d="M 0,30 C 8,10 30,-2 46,6 C 54,14 50,36 18,38 C 38,42 46,58 34,60 C 18,62 4,44 0,30 Z"
            fill={theme.wingFill}
            stroke={theme.wingStroke}
            strokeWidth="1.2"
          />
          {/* Detailed Naturalist Veins */}
          <path d="M 0,30 C 16,18 34,14 44,10" stroke={theme.veinStroke} strokeWidth="0.8" fill="none" />
          <path d="M 10,24 C 22,14 32,12 40,18" stroke={theme.veinStroke} strokeWidth="0.6" fill="none" />
          <path d="M 0,30 C 20,32 34,42 36,52" stroke={theme.veinStroke} strokeWidth="0.8" fill="none" />
          <path d="M 14,36 C 24,42 30,48 32,56" stroke={theme.veinStroke} strokeWidth="0.6" fill="none" />
          {/* Vintage Wing Spot Accents */}
          <circle cx="36" cy="16" r="2.5" fill={theme.accentDot} stroke={theme.wingStroke} strokeWidth="0.5" />
          <circle cx="30" cy="50" r="1.8" fill={theme.accentDot} stroke={theme.wingStroke} strokeWidth="0.5" />
        </svg>
      </motion.div>
    </div>
  );
};

