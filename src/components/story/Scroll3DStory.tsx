import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { VintageButterfly } from '../common/VintageButterfly';

interface StoryScene {
  tag: string;
  actNumber: string;
  line1: string;
  line2: string;
  subtext: string;
  butterflyColor: 'antique-gold' | 'dusty-rose' | 'vintage-amber';
}

const scenes: StoryScene[] = [
  {
    actNumber: 'BABAK I',
    tag: 'Perjalanan Waktu',
    line1: 'Di antara miliaran kemungkinan di semesta,',
    line2: 'dua cerita memilih untuk saling menemukan.',
    subtext: 'Bukan karena kebetulan, melainkan takdir yang sabar menunggu dalam setiap detik waktu.',
    butterflyColor: 'antique-gold',
  },
  {
    actNumber: 'BABAK II',
    tag: 'Tentang Rumah',
    line1: 'Kami belajar bahwa rumah bukanlah sebuah tempat,',
    line2: 'melainkan keberadaan satu sama lain.',
    subtext: 'Di mana setiap tawa menjadi pelindung, dan setiap tatap menjadi sebuah kepulangan.',
    butterflyColor: 'dusty-rose',
  },
  {
    actNumber: 'BABAK III',
    tag: 'Satu Janji',
    line1: 'Karena seluruh diriku mencintai seluruh dirimu,',
    line2: 'kemarin, hari ini, dan untuk seribu tahun lagi.',
    subtext: 'Thomas Stanley Holland & Zendaya Maree Coleman • 12.12.2026',
    butterflyColor: 'vintage-amber',
  },
];

export const Scroll3DStory: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  // Auto-advance gently every 7 seconds if not manually interacted with recently
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIdx((prev) => (prev + 1) % scenes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? scenes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % scenes.length);
  };

  const current = scenes[activeIdx];

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      rotateX: dir > 0 ? 15 : -15,
      y: dir > 0 ? 30 : -30,
      scale: 0.94,
      z: -60,
    }),
    center: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      z: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      rotateX: dir > 0 ? -15 : 15,
      y: dir > 0 ? -30 : 30,
      scale: 0.94,
      z: -60,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section id="kisah-3d" className="py-8 sm:py-12 px-4 sm:px-6 max-w-4xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-2">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600 flex items-center justify-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          The Kinetic 3D Story
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-noir-900 font-normal">
          Narasi Tiga Babak Cinta
        </h2>
        <div className="w-12 h-0.5 bg-primary mx-auto mt-2" />
      </div>

      {/* Chapter Tab Selector (Babak I, II, III) */}
      <div className="flex justify-center gap-2 mb-6">
        {scenes.map((scene, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={scene.actNumber}
              onClick={() => handleSelect(idx)}
              className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-noir-900 text-linen-100 shadow-md font-medium scale-105'
                  : 'bg-linen-100 text-noir-700 hover:bg-linen-200 border border-linen-300'
              }`}
            >
              <span>{scene.actNumber}</span>
              <span className="hidden sm:inline opacity-70">• {scene.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Main 3D Card Stage with No Empty Gap */}
      <div
        className="relative w-full bg-linen-100/95 border border-linen-300/90 rounded-3xl p-6 sm:p-10 shadow-paper-lg overflow-hidden backdrop-blur-sm"
        style={{ perspective: 1000 }}
      >
        {/* Subtle radial aura & paper texture */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative min-h-[220px] sm:min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: 'preserve-3d' }}
              className="text-center max-w-2xl mx-auto space-y-4"
            >
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono tracking-[0.25em] text-primary uppercase">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>{current.actNumber} • {current.tag}</span>
              </div>

              {/* Title Lines */}
              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-textMain font-normal leading-snug">
                  {current.line1}
                </h3>
                <h3 className="font-serif italic text-xl sm:text-3xl md:text-4xl text-primary font-normal leading-snug">
                  {current.line2}
                </h3>
              </div>

              {/* Subtext */}
              <p className="font-sans text-xs sm:text-sm text-textMuted max-w-lg mx-auto font-light leading-relaxed">
                {current.subtext}
              </p>

              {/* Butterfly Icon & Monogram */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-primary/30" />
                <VintageButterfly color={current.butterflyColor} size={28} />
                <div className="w-8 h-px bg-primary/30" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls (Prev / Next Arrows + Indicators) */}
        <div className="mt-6 pt-4 border-t border-linen-200/80 flex items-center justify-between">
          <button
            onClick={handlePrev}
            aria-label="Babak Sebelumnya"
            className="p-2 rounded-full hover:bg-linen-200 text-noir-700 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {scenes.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                aria-label={`Ke babak ${i + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === activeIdx ? 'w-6 bg-primary' : 'w-1.5 bg-linen-400/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Babak Selanjutnya"
            className="p-2 rounded-full hover:bg-linen-200 text-noir-700 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
