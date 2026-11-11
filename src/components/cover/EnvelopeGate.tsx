import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audioEngine';
import { VintageWaxSeal } from './VintageWaxSeal';
import { ButterflyFlight } from './ButterflyFlight';

interface EnvelopeGateProps {
  guestName: string;
  pax: number;
  onOpen: () => void;
}

export const EnvelopeGate: React.FC<EnvelopeGateProps> = ({ guestName, pax, onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Motion Values for interactive perspective tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics spring for organic, weighted card movement
  const springConfig = { stiffness: 140, damping: 18 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations (Max 14deg tilt)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-14deg', '14deg']);

  // Dynamic light sheen position following mouse
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (touch.clientX - rect.left) / rect.width - 0.5;
    const yPct = (touch.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundEngine.playWaxSealSnap();
    // Timing allows the butterflies to soar across screen gracefully
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -70, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-noir-900/95 backdrop-blur-md px-4 py-8 overflow-y-auto"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background paper texture & warm ambient candlelight glow */}
      <div className="absolute inset-0 bg-paper-grain opacity-40 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/12 blur-[140px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      {/* Fluttering Butterflies Swarm (Active during opening transition) */}
      <ButterflyFlight isActive={isOpening} />

      {/* 3D Physical Tilt Wrapper */}
      <motion.div
        ref={containerRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ scale: 0.92, opacity: 0, y: 25 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-[#FAF7F0] border border-[#DDD5C3] rounded-3xl shadow-2xl p-6 sm:p-10 text-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {/* Dynamic Specular 3D Lighting Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl z-20"
          style={{
            background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.25), transparent 70%)`,
          }}
        />

        {/* Subtle vintage envelope inner lining & watermarks */}
        <div className="absolute inset-0 bg-paper-grain opacity-60 pointer-events-none" />

        {/* Vintage Top Postage Stamp & Postmark (Stempel Pos Klasik) */}
        <div
          className="absolute top-5 right-5 sm:top-6 sm:right-6 flex items-center gap-1.5 pointer-events-none opacity-80"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div className="w-11 h-14 bg-[#F2EDE2] border-2 border-dashed border-[#B89D78] p-1 flex flex-col items-center justify-between shadow-xs transform rotate-2">
            <span className="text-[7px] font-mono tracking-widest text-[#8A6A44] uppercase">ROYAL MAIL</span>
            <div className="font-serif italic text-xs text-primary font-semibold">12¢</div>
            <span className="text-[6px] font-mono text-[#8A6A44]">12.12.26</span>
          </div>
          {/* Postmark cancellation wavy lines */}
          <svg className="w-8 h-10 text-[#A88C64] opacity-70" viewBox="0 0 32 40" fill="none">
            <path d="M 0,10 Q 8,5 16,10 T 32,10" stroke="currentColor" strokeWidth="1.2" />
            <path d="M 0,20 Q 8,15 16,20 T 32,20" stroke="currentColor" strokeWidth="1.2" />
            <path d="M 0,30 Q 8,25 16,30 T 32,30" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Top Monogram Seal Crest */}
        <div
          className="mx-auto w-12 h-12 rounded-full border border-[#D5CBB5] flex items-center justify-center text-noir-800 font-serif italic text-xl mb-3 bg-[#FAF7F0] shadow-xs"
          style={{ transform: 'translateZ(20px)' }}
        >
          T&amp;Z
        </div>

        <p
          className="text-[11px] uppercase tracking-[0.32em] text-[#8C7A5D] font-medium mb-1"
          style={{ transform: 'translateZ(15px)' }}
        >
          Exclusive Formal Invitation • The Union
        </p>

        <h1
          className="font-serif text-3xl sm:text-4xl text-noir-900 font-normal tracking-wide mt-1 mb-1"
          style={{ transform: 'translateZ(30px)' }}
        >
          Tom <span className="font-script text-2xl sm:text-3xl text-primary">&amp;</span> Zendaya
        </h1>
        <p
          className="font-serif italic text-[#7C6C53] text-base sm:text-lg mb-5"
          style={{ transform: 'translateZ(20px)' }}
        >
          The Sacred Vow &amp; Celebration
        </p>

        {/* Guest Name Plaque */}
        <div
          className="my-5 py-5 px-4 bg-[#F4EFE6] rounded-2xl border border-[#D8CEBA] shadow-sm relative transition-transform"
          style={{ transform: 'translateZ(35px)' }}
        >
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#FAF7F0] px-3 py-0.5 rounded-full border border-[#D8CEBA] text-[10px] uppercase font-mono tracking-widest text-[#8C7A5D]">
            Kepada Yth. Tamu Terhormat
          </div>
          <div className="font-serif text-2xl sm:text-3xl text-primary font-semibold tracking-wide pt-1">
            {guestName}
          </div>
          {pax > 1 && (
            <span className="inline-block mt-2 text-xs text-[#7C6C53] bg-[#EAE2D2] px-3 py-0.5 rounded-full font-mono">
              Khusus {pax} Orang Tamu
            </span>
          )}
        </div>

        <p
          className="text-xs sm:text-sm text-noir-700 leading-relaxed max-w-sm mx-auto mb-6"
          style={{ transform: 'translateZ(18px)' }}
        >
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan berbagi kebahagiaan dalam perayaan janji suci kami.
        </p>

        {/* Realistic V-Flap Fold Lines & Wax Seal with Elevated 3D Elevation */}
        <div className="relative my-2" style={{ transform: 'translateZ(50px)' }}>
          <svg className="w-full h-8 opacity-40 pointer-events-none" viewBox="0 0 400 30" preserveAspectRatio="none">
            <path d="M 20,0 L 200,28 L 380,0" stroke="#C4B69B" strokeWidth="1.5" fill="none" />
          </svg>

          {/* Vintage Aesthetic Wax Seal */}
          <div className="-mt-8" style={{ transform: 'translateZ(65px)' }}>
            <VintageWaxSeal isBreaking={isOpening} onClick={handleOpenInvitation} />
          </div>
        </div>

        {/* Instruction note below seal */}
        <div
          className="mt-4 flex flex-col items-center justify-center"
          style={{ transform: 'translateZ(20px)' }}
        >
          <span className="text-xs text-[#7C6C53] font-medium tracking-wide flex items-center gap-1.5 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            Sentuh segel lilin untuk membuka
          </span>
          <span className="text-[10px] font-mono text-[#9C8B72] mt-0.5 tracking-wider uppercase">
            [ Wax Seal Stamped with T&amp;Z Crest ]
          </span>
        </div>

        {/* Bottom Vintage Stamp & Serial */}
        <div
          className="mt-7 pt-4 border-t border-[#E5DCB8]/60 flex items-center justify-between text-[11px] text-[#9C8B72] font-mono"
          style={{ transform: 'translateZ(15px)' }}
        >
          <span>NO. INV-2026-TZ</span>
          <span>LONDON &amp; JAKARTA, 12.12.2026</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
