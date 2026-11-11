import React from 'react';
import { motion } from 'framer-motion';

interface Text3DMotionProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
}

export const Text3DMotion: React.FC<Text3DMotionProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightClass = 'text-primary italic',
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      rotateX: 65,
      y: 25,
      z: -60,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      z: 0,
      transition: {
        type: 'spring' as const,
        damping: 14,
        stiffness: 90,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`inline-flex flex-wrap justify-center gap-x-2 gap-y-1 ${className}`}
      style={{ perspective: 800 }}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        const isHighlight = highlightWords.some(
          (h) => h.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            style={{ transformStyle: 'preserve-3d' }}
            className={`inline-block ${isHighlight ? highlightClass : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
