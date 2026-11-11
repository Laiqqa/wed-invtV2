import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Scroll3DSectionProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  maxRotate?: number;
}

/**
 * Continuous 3D Motion Scroll Section
 * Reacts dynamically to scroll position in the viewport at all times (not just on initial load).
 * Tilts smoothly in 3D space as you scroll past it, from bottom to top.
 */
export const Scroll3DSection: React.FC<Scroll3DSectionProps> = ({
  children,
  className = '',
  depth = 36,
  maxRotate = 4.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth out scroll progress with spring physics for luxurious weighted momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Dynamic 3D transformations:
  // 0.0 = Top of element touches bottom of screen (entering)
  // 0.5 = Element is perfectly centered in viewport
  // 1.0 = Bottom of element touches top of screen (leaving)
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [`${maxRotate}deg`, '0deg', `-${maxRotate}deg`]);
  const translateZ = useTransform(smoothProgress, [0, 0.5, 1], [-depth, 0, -depth]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <div
      ref={containerRef}
      className={`w-full will-change-transform ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          translateZ,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
