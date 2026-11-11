import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { VintageButterfly } from '../common/VintageButterfly';

interface StoryScene {
  tag: string;
  line1: string;
  line2: string;
  subtext: string;
  butterflyColor: 'antique-gold' | 'dusty-rose' | 'vintage-amber' | 'bordeaux-velvet';
}

const scenes: StoryScene[] = [
  {
    tag: 'BABAK I • PERJALANAN WAKTU',
    line1: 'Di antara miliaran kemungkinan di semesta,',
    line2: 'dua cerita memilih untuk saling menemukan.',
    subtext: 'Bukan karena kebetulan, melainkan takdir yang sabar menunggu.',
    butterflyColor: 'antique-gold',
  },
  {
    tag: 'BABAK II • TENTANG RUMAH',
    line1: 'Kami belajar bahwa rumah bukanlah sebuah tempat,',
    line2: 'melainkan keberadaan satu sama lain.',
    subtext: 'Di mana setiap tawa menjadi pelindung, dan setiap tatap menjadi kepulangan.',
    butterflyColor: 'dusty-rose',
  },
  {
    tag: 'BABAK III • SATU JANJI',
    line1: 'Karena seluruh diriku mencintai seluruh dirimu,',
    line2: 'kemarin, hari ini, dan untuk seribu tahun lagi.',
    subtext: 'Tom Holland & Zendaya • 12.12.2026',
    butterflyColor: 'vintage-amber',
  },
];

export const Scroll3DStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Scene 1: Already visible from the start so there's zero empty gap, fades out at ~0.35
  const opacity1 = useTransform(smoothProgress, [0.0, 0.28, 0.36], [1, 1, 0]);
  const scale1 = useTransform(smoothProgress, [0.0, 0.15, 0.36], [1, 1, 1.08]);
  const rotateX1 = useTransform(smoothProgress, [0.0, 0.15, 0.36], ['0deg', '0deg', '-16deg']);
  const z1 = useTransform(smoothProgress, [0.0, 0.15, 0.36], [0, 0, 80]);

  // Scene 2: Cross-fades seamlessly with Scene 1, stays centered, fades out at ~0.70
  const opacity2 = useTransform(smoothProgress, [0.30, 0.38, 0.62, 0.70], [0, 1, 1, 0]);
  const scale2 = useTransform(smoothProgress, [0.30, 0.48, 0.70], [0.92, 1, 1.08]);
  const rotateX2 = useTransform(smoothProgress, [0.30, 0.48, 0.70], ['16deg', '0deg', '-16deg']);
  const z2 = useTransform(smoothProgress, [0.30, 0.48, 0.70], [-80, 0, 80]);

  // Scene 3: Cross-fades seamlessly with Scene 2, stays until the end of the narrative act
  const opacity3 = useTransform(smoothProgress, [0.64, 0.72, 1.0], [0, 1, 1]);
  const scale3 = useTransform(smoothProgress, [0.64, 0.78, 1.0], [0.92, 1, 1]);
  const rotateX3 = useTransform(smoothProgress, [0.64, 0.78, 1.0], ['16deg', '0deg', '0deg']);
  const z3 = useTransform(smoothProgress, [0.64, 0.78, 1.0], [-80, 0, 0]);

  // Progress bar indicator
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative h-[165vh] w-full select-none my-2"
    >
      {/* Compact Sticky 3D Viewport without overly large vertical gaps */}
      <div
        className="sticky top-[10vh] min-h-[440px] max-h-[75vh] h-[65vh] w-full flex flex-col items-center justify-center overflow-hidden px-4"
        style={{ perspective: 1200 }}
      >
        {/* Subtle Background Glow Aura */}
        <div className="absolute w-[500px] h-[350px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-accent/7 blur-[100px] pointer-events-none" />

        {/* Ambient Paper Grain */}
        <div className="absolute inset-0 bg-paper-grain opacity-30 pointer-events-none" />

        {/* 3D Kinetic Text Container with tight, focused framing */}
        <div
          className="relative w-full max-w-3xl mx-auto text-center h-[280px] sm:h-[300px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ================= SCENE 1 ================= */}
          <motion.div
            style={{
              opacity: opacity1,
              scale: scale1,
              rotateX: rotateX1,
              z: z1,
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 px-4 pointer-events-none"
          >
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono tracking-[0.25em] text-primary uppercase">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>{scenes[0].tag}</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-textMain font-normal leading-tight tracking-wide">
                {scenes[0].line1}
              </h3>
              <h3 className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-primary font-normal leading-tight">
                {scenes[0].line2}
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-textMuted max-w-md mx-auto pt-1 font-light leading-relaxed">
              {scenes[0].subtext}
            </p>

            <div className="pt-2">
              <VintageButterfly color={scenes[0].butterflyColor} size={32} />
            </div>
          </motion.div>

          {/* ================= SCENE 2 ================= */}
          <motion.div
            style={{
              opacity: opacity2,
              scale: scale2,
              rotateX: rotateX2,
              z: z2,
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 px-4 pointer-events-none"
          >
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-accent/15 border border-accent/25 text-[10px] font-mono tracking-[0.25em] text-accent uppercase">
              <Heart className="w-3 h-3 text-accent fill-accent/30" />
              <span>{scenes[1].tag}</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-textMain font-normal leading-tight tracking-wide">
                {scenes[1].line1}
              </h3>
              <h3 className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-accent font-normal leading-tight">
                {scenes[1].line2}
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-textMuted max-w-md mx-auto pt-1 font-light leading-relaxed">
              {scenes[1].subtext}
            </p>

            <div className="pt-2">
              <VintageButterfly color={scenes[1].butterflyColor} size={34} />
            </div>
          </motion.div>

          {/* ================= SCENE 3 ================= */}
          <motion.div
            style={{
              opacity: opacity3,
              scale: scale3,
              rotateX: rotateX3,
              z: z3,
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 px-4 pointer-events-none"
          >
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono tracking-[0.25em] text-primary uppercase">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>{scenes[2].tag}</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-textMain font-normal leading-tight tracking-wide">
                {scenes[2].line1}
              </h3>
              <h3 className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-primary font-normal leading-tight">
                {scenes[2].line2}
              </h3>
            </div>

            <div className="pt-2 flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center font-serif italic text-base text-primary bg-paper shadow-sm">
                T&amp;Z
              </div>
              <span className="font-mono text-[11px] text-textMuted uppercase tracking-widest">
                {scenes[2].subtext}
              </span>
            </div>

            <div className="pt-1">
              <VintageButterfly color={scenes[2].butterflyColor} size={36} />
            </div>
          </motion.div>
        </div>

        {/* Compact Bottom Progress Bar & Instruction right under the stage */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="w-44 sm:w-56 h-1 bg-borderSubtle/60 rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-primary via-accent to-primary"
            />
          </div>

          <div className="text-[10px] font-mono tracking-widest text-textMuted uppercase flex items-center gap-1.5 opacity-75">
            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
            <span>Gulir perlahan untuk menelusuri kisah 3D</span>
          </div>
        </div>
      </div>
    </section>
  );
};
