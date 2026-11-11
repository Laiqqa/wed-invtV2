import React from 'react';
import { motion } from 'framer-motion';
import { VintageButterfly } from './VintageButterfly';
import type { VintageButterflyColor } from './VintageButterfly';

interface ButterflyConfig {
  id: number;
  color: VintageButterflyColor;
  size: number;
  initialX: string;
  initialY: string;
  duration: number;
  delay: number;
  xMovement: number[];
  yMovement: number[];
  rotation: number[];
  scale: number[];
  opacity: number[];
}

const ambientList: ButterflyConfig[] = [
  {
    id: 1,
    color: 'antique-gold',
    size: 38,
    initialX: '8%',
    initialY: '25%',
    duration: 22,
    delay: 0,
    xMovement: [0, 45, -30, 60, -15, 0],
    yMovement: [0, -80, -160, -260, -380, -500],
    rotation: [15, -20, 25, -10, 15],
    scale: [0.8, 1, 0.9, 1.05, 0.85],
    opacity: [0, 0.85, 0.9, 0.7, 0],
  },
  {
    id: 2,
    color: 'dusty-rose',
    size: 32,
    initialX: '88%',
    initialY: '45%',
    duration: 26,
    delay: 4,
    xMovement: [0, -60, 20, -50, 10, 0],
    yMovement: [0, -90, -200, -320, -450, -580],
    rotation: [-20, 15, -25, 20, -15],
    scale: [0.75, 0.95, 0.85, 1, 0.7],
    opacity: [0, 0.8, 0.85, 0.6, 0],
  },
  {
    id: 3,
    color: 'vintage-amber',
    size: 42,
    initialX: '75%',
    initialY: '15%',
    duration: 24,
    delay: 8,
    xMovement: [0, -40, -90, -30, -70, 0],
    yMovement: [0, 70, 180, 290, 400, 520],
    rotation: [35, 10, -20, 25, 15],
    scale: [0.85, 1.05, 0.9, 1, 0.8],
    opacity: [0, 0.85, 0.9, 0.75, 0],
  },
  {
    id: 4,
    color: 'muted-sage',
    size: 30,
    initialX: '15%',
    initialY: '70%',
    duration: 28,
    delay: 12,
    xMovement: [0, 50, -20, 70, -10, 0],
    yMovement: [0, -100, -220, -350, -480, -620],
    rotation: [-15, 25, -15, 20, -10],
    scale: [0.7, 0.85, 0.8, 0.9, 0.65],
    opacity: [0, 0.75, 0.8, 0.5, 0],
  },
  {
    id: 5,
    color: 'bordeaux-velvet',
    size: 36,
    initialX: '45%',
    initialY: '85%',
    duration: 25,
    delay: 2,
    xMovement: [0, -50, 60, -40, 50, 0],
    yMovement: [0, -110, -240, -360, -500, -650],
    rotation: [20, -25, 15, -20, 10],
    scale: [0.8, 1, 0.9, 1.05, 0.75],
    opacity: [0, 0.85, 0.9, 0.65, 0],
  },
];

export const AmbientButterflies: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {ambientList.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            left: item.initialX,
            top: item.initialY,
            x: 0,
            y: 0,
            opacity: 0,
            scale: item.scale[0],
            rotate: item.rotation[0],
          }}
          animate={{
            x: item.xMovement,
            y: item.yMovement,
            opacity: item.opacity,
            scale: item.scale,
            rotate: item.rotation,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute"
        >
          <VintageButterfly
            color={item.color}
            size={item.size}
            flapSpeed={0.25 + (item.id % 3) * 0.05}
          />

          {/* Gentle stardust particle glow */}
          <motion.div
            animate={{ opacity: [0.2, 0.7, 0.1], scale: [0.8, 1.3, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-amber-200/50 blur-[0.6px] mx-auto mt-0.5"
          />
        </motion.div>
      ))}
    </div>
  );
};
