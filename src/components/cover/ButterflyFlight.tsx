import React from 'react';
import { motion } from 'framer-motion';
import { VintageButterfly } from '../common/VintageButterfly';
import type { VintageButterflyColor } from '../common/VintageButterfly';

interface ButterflyProps {
  delay: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: VintageButterflyColor;
}

const SingleBurstButterfly: React.FC<ButterflyProps> = ({
  delay,
  startX,
  startY,
  targetX,
  targetY,
  size,
  color,
}) => {
  return (
    <motion.div
      initial={{
        x: startX,
        y: startY,
        opacity: 0,
        scale: 0.3,
        rotate: 0,
      }}
      animate={{
        x: [startX, startX + (targetX - startX) * 0.45 + (Math.random() * 80 - 40), targetX],
        y: [startY, startY + (targetY - startY) * 0.5 - (Math.random() * 70 + 40), targetY],
        opacity: [0, 1, 0.95, 0],
        scale: [0.3, 1.05, 1.15, 0.75],
        rotate: [(targetX - startX) * 0.12, -18, 22, 0],
      }}
      transition={{
        duration: 2.3 + Math.random() * 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="absolute pointer-events-none z-50 select-none"
    >
      <VintageButterfly
        color={color}
        size={size}
        flapSpeed={0.22 + Math.random() * 0.08}
      />

      {/* Sparkling vintage golden dust trail */}
      <motion.div
        animate={{ opacity: [0, 0.85, 0], scale: [0.6, 1.4, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: Math.random() * 0.4 }}
        className="w-1.5 h-1.5 rounded-full bg-amber-300/80 blur-[0.6px] mx-auto mt-0.5"
      />
    </motion.div>
  );
};

interface ButterflyFlightProps {
  isActive: boolean;
}

export const ButterflyFlight: React.FC<ButterflyFlightProps> = ({ isActive }) => {
  if (!isActive) return null;

  // Vintage butterfly flock config: Antique Gold, Dusty Rose, Vintage Amber, Muted Sage, Bordeaux Velvet
  const vintageFlock: {
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    size: number;
    color: VintageButterflyColor;
    delay: number;
  }[] = [
      { startX: 0, startY: 0, targetX: -260, targetY: -340, size: 44, color: 'antique-gold', delay: 0.05 },
      { startX: -10, startY: -5, targetX: 250, targetY: -370, size: 48, color: 'vintage-amber', delay: 0.12 },
      { startX: 5, startY: 10, targetX: -340, targetY: -190, size: 38, color: 'dusty-rose', delay: 0.2 },
      { startX: -5, startY: -10, targetX: 310, targetY: -230, size: 42, color: 'muted-sage', delay: 0.25 },
      { startX: 0, startY: 0, targetX: -190, targetY: -440, size: 52, color: 'bordeaux-velvet', delay: 0.3 },
      { startX: 10, startY: -5, targetX: 170, targetY: -470, size: 46, color: 'antique-gold', delay: 0.35 },
      { startX: -15, startY: 5, targetX: -370, targetY: -70, size: 36, color: 'dusty-rose', delay: 0.4 },
      { startX: 12, startY: 8, targetX: 350, targetY: -130, size: 44, color: 'vintage-amber', delay: 0.45 },
      { startX: 0, startY: -12, targetX: -90, targetY: -510, size: 50, color: 'antique-gold', delay: 0.5 },
      { startX: -8, startY: -2, targetX: 100, targetY: -520, size: 40, color: 'muted-sage', delay: 0.55 },
      { startX: 4, startY: 4, targetX: -230, targetY: -280, size: 36, color: 'bordeaux-velvet', delay: 0.6 },
      { startX: -6, startY: 6, targetX: 210, targetY: -290, size: 42, color: 'dusty-rose', delay: 0.65 },
    ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
      {vintageFlock.map((b, idx) => (
        <SingleBurstButterfly
          key={idx}
          delay={b.delay}
          startX={b.startX}
          startY={b.startY}
          targetX={b.targetX}
          targetY={b.targetY}
          size={b.size}
          color={b.color}
        />
      ))}
    </div>
  );
};
