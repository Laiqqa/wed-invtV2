import React from 'react';
import { motion } from 'framer-motion';
import { VintageButterfly } from './VintageButterfly';
import type { VintageButterflyColor } from './VintageButterfly';

interface PerchedButterflyProps {
  color?: VintageButterflyColor;
  size?: number;
  rotation?: number;
  className?: string;
}

export const PerchedButterfly: React.FC<PerchedButterflyProps> = ({
  color = 'antique-gold',
  size = 28,
  rotation = 15,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.15, rotate: rotation + 10 }}
      className={`absolute pointer-events-none z-20 cursor-pointer ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <VintageButterfly
        color={color}
        size={size}
        flapSpeed={0.45} // gentle slow breathing wing flex
      />
    </motion.div>
  );
};
