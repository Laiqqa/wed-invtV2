import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Scene 1 Transforms (0.00 to 0.35)
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.1, 0.25, 0.34], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0.0, 0.15, 0.34], [0.8, 1, 1.15]);
  const rotateX1 = useTransform(scrollYProgress, [0.0, 0.15, 0.34], ['28deg', '0deg', '-24deg']);
  const z1 = useTransform(scrollYProgress, [0.0, 0.15, 0.34], [-200, 0, 120]);

  // Scene 2 Transforms (0.33 to 0.68)
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.44, 0.58, 0.68], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.33, 0.48, 0.68], [0.8, 1, 1.15]);
  const rotateX2 = useTransform(scrollYProgress, [0.33, 0.48, 0.68], ['28deg', '0deg', '-24deg']);
  const z2 = useTransform(scrollYProgress, [0.33, 0.48, 0.68], [-200, 0, 120]);

  // Scene 3 Transforms (0.67 to 1.00)
  const opacity3 = useTransform(scrollYProgress, [0.67, 0.78, 0.92, 1.0], [0, 1, 1, 1]);
  const scale3 = useTransform(scrollYProgress, [0.67, 0.82, 1.0], [0.8, 1, 1.05]);
  const rotateX3 = useTransform(scrollYProgress, [0.67, 0.82, 1.0], ['28deg', '0deg', '0deg']);
  const z3 = useTransform(scrollYProgress, [0.67, 0.82, 1.0], [-200, 0, 50]);

  // Progress bar indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative h-[280vh] w-full select-none">
      {/* Sticky 3D Viewport */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4"
        style={{ perspective: 1200 }}
      >
        {/* Subtle Background Glow Aura */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/8 blur-[160px] pointer-events-none" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-accent/7 blur-[140px] pointer-events-none" />

        {/* Ambient Floating Dust */}
        <div className="absolute inset-0 bg-paper-grain opacity-40 pointer-events-none" />

        {/* 3D Kinetic Text Container */}
        <div className="relative w-full max-w-4xl mx-auto text-center" style={{ transformStyle: 'preserve-3d' }}>
          {/* ================= SCENE 1 ================= */}
          <motion.div
            style={{
              opacity: opacity1,
              scale: scale1,
              rotateX: rotateX1,
              z: z1,
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono tracking-[0.28em] text-primary uppercase">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>{scenes[0].tag}</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-textMain font-normal leading-tight tracking-wide drop-shadow-sm">
                {scenes[0].line1}
              </h3>
              <h3 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-primary font-normal leading-tight drop-shadow-sm">
                {scenes[0].line2}
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-base text-textMuted max-w-lg mx-auto pt-2 font-light leading-relaxed">
              {scenes[0].subtext}
            </p>

            <div className="pt-3">
              <VintageButterfly color={scenes[0].butterflyColor} size={36} />
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
            className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-accent/15 border border-accent/25 text-[10px] font-mono tracking-[0.28em] text-accent uppercase">
              <Heart className="w-3 h-3 text-accent fill-accent/30" />
              <span>{scenes[1].tag}</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-textMain font-normal leading-tight tracking-wide drop-shadow-sm">
                {scenes[1].line1}
              </h3>
              <h3 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-accent font-normal leading-tight drop-shadow-sm">
                {scenes[1].line2}
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-base text-textMuted max-w-lg mx-auto pt-2 font-light leading-relaxed">
              {scenes[1].subtext}
            </p>

            <div className="pt-3">
              <VintageButterfly color={scenes[1].butterflyColor} size={38} />
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
            className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono tracking-[0.28em] text-primary uppercase">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>{scenes[2].tag}</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-textMain font-normal leading-tight tracking-wide drop-shadow-sm">
                {scenes[2].line1}
              </h3>
              <h3 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-primary font-normal leading-tight drop-shadow-sm">
                {scenes[2].line2}
              </h3>
            </div>

            <div className="pt-3 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center font-serif italic text-xl text-primary bg-paper shadow-sm">
                T&amp;Z
              </div>
              <span className="font-mono text-xs text-textMuted uppercase tracking-widest">
                {scenes[2].subtext}
              </span>
            </div>

            <div className="pt-2">
              <VintageButterfly color={scenes[2].butterflyColor} size={40} />
            </div>
          </motion.div>
        </div>

        {/* Bottom Scroll Progress Bar Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-1 bg-borderSubtle/60 rounded-full overflow-hidden">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-textMuted uppercase flex items-center gap-1.5 opacity-70">
          <span>Gulir perlahan untuk menelusuri kisah 3D</span>
        </div>
      </div>
    </section>
  );
};

