import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { soundEngine } from '../../utils/audioEngine';
import { weddingData } from '../../data/weddingData';
import { PerchedButterfly } from '../common/PerchedButterfly';

interface VinylTurntableProps {
  autoPlayTrigger?: boolean;
}

export const VinylTurntable: React.FC<VinylTurntableProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(() => soundEngine.getIsPlaying());
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
  const turntableRef = useRef<HTMLDivElement>(null);

  // Sync state seamlessly with soundEngine
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(({ isPlaying: enginePlaying, trackId }) => {
      setIsPlaying(enginePlaying);
      const idx = weddingData.playlist.findIndex((t) => t.id === trackId);
      if (idx !== -1) {
        setCurrentTrackIndex(idx);
      }
    });
    return unsubscribe;
  }, []);

  // 3D Motion values for turntable
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 16 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 16 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-8deg', '8deg']);

  const currentTrack = weddingData.playlist[currentTrackIndex];

  useEffect(() => {
    if (autoPlayTrigger && !soundEngine.getIsPlaying()) {
      soundEngine.startMusic(currentTrack.src, currentTrack.id);
    }
  }, [autoPlayTrigger, currentTrack]);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating player when user scrolls past 550px
      if (window.scrollY > 550) {
        setIsFloatingVisible(true);
      } else {
        setIsFloatingVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!turntableRef.current) return;
    const rect = turntableRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const togglePlayback = () => {
    const nextState = soundEngine.toggleMusic(currentTrack.src, currentTrack.id);
    setIsPlaying(nextState);
  };

  const switchSide = () => {
    const nextIndex = (currentTrackIndex + 1) % weddingData.playlist.length;
    setCurrentTrackIndex(nextIndex);
    const nextTrack = weddingData.playlist[nextIndex];
    soundEngine.stopMusic();
    soundEngine.playNeedleDrop();
    soundEngine.startMusic(nextTrack.src, nextTrack.id);
    setIsPlaying(true);
  };

  return (
    <>
      {/* Main Feature Turntable Box with 3D Perspective */}
      <div
        className="w-full max-w-xl mx-auto my-3 sm:my-5 select-none"
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={turntableRef}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="p-6 sm:p-8 bg-linen-100 rounded-3xl border border-linen-300/80 shadow-paper-lg relative overflow-hidden transition-shadow hover:shadow-2xl"
        >
          {/* Resting Vintage Butterfly on Turntable rim */}
          <PerchedButterfly color="vintage-amber" size={30} rotation={22} className="-top-3 right-10" />

          {/* Subtle wood / atelier texture background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta-500/5 rounded-full blur-2xl pointer-events-none" />

          <div
            className="flex items-center justify-between mb-4 pb-3 border-b border-linen-200"
            style={{ transform: 'translateZ(15px)' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta-600 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-linen-700">
                Analog Turntable Player • 3D Motion
              </span>
            </div>
            <button
              onClick={switchSide}
              className="text-xs font-mono text-terracotta-700 hover:text-terracotta-900 bg-linen-200/80 hover:bg-linen-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
            >
              Ganti Sisi: {currentTrack.side === 'A' ? 'Ke Side B' : 'Ke Side A'}
            </button>
          </div>

          {/* Physical Turntable Surface */}
          <div
            className="relative bg-noir-800 rounded-2xl p-6 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-6 border border-noir-700"
            style={{ transform: 'translateZ(25px)' }}
          >
            {/* Vinyl Disc Container */}
            <div className="relative flex items-center justify-center">
              {/* The Vinyl Disc */}
              <div
                className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full vinyl-grooves shadow-vinyl relative flex items-center justify-center transition-all ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
                style={{ transform: 'translateZ(20px)' }}
              >
                {/* Sheen effect reflection */}
                <div className="absolute inset-0 rounded-full vinyl-sheen pointer-events-none opacity-40" />

                {/* Vinyl center paper label */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linen-100 border-2 border-terracotta-700 flex flex-col items-center justify-center p-2 text-center shadow-md">
                  <span className="text-[10px] font-mono uppercase text-terracotta-700 font-bold leading-none">
                    SIDE {currentTrack.side}
                  </span>
                  <span className="font-serif italic font-semibold text-xs text-noir-900 mt-0.5 leading-tight">
                    {weddingData.couple.groom.nickname} &amp; {weddingData.couple.bride.nickname}
                  </span>
                  <span className="text-[8px] font-mono text-linen-600 mt-0.5">
                    12.12.26
                  </span>
                  {/* Spindle hole */}
                  <div className="w-2.5 h-2.5 rounded-full bg-noir-900 border border-linen-300 mt-1" />
                </div>
              </div>

              {/* Turntable Tonearm (Needle) */}
              <div
                className="absolute -top-2 -right-4 sm:-right-2 pointer-events-none transition-transform duration-700 origin-top-right z-10"
                style={{
                  transform: isPlaying ? 'rotate(26deg) translateZ(40px)' : 'rotate(0deg) translateZ(40px)',
                }}
              >
                {/* Arm Pivot Base */}
                <div className="w-6 h-6 rounded-full bg-linen-400 border-2 border-noir-700 shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-noir-900" />
                </div>
                {/* Silver Tonearm rod */}
                <div className="w-1.5 h-24 sm:h-28 bg-gradient-to-b from-linen-300 via-linen-400 to-linen-500 rounded-full mx-auto shadow-sm -mt-1" />
                {/* Cartridge headshell & needle */}
                <div className="w-4 h-6 bg-terracotta-700 rounded-sm -mt-1 -ml-1 border border-terracotta-900 shadow-sm" />
              </div>
            </div>

            {/* Player Details & Controls */}
            <div className="flex-1 text-center sm:text-left text-linen-100" style={{ transform: 'translateZ(15px)' }}>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-terracotta-700/40 text-terracotta-400 border border-terracotta-600/30 text-[11px] font-mono uppercase tracking-wider mb-2">
                {currentTrack.album}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-linen-50 tracking-wide">
                {currentTrack.title}
              </h2>
              <p className="text-sm text-linen-400 font-sans mt-0.5">
                {currentTrack.artist}
              </p>

              {/* Visualizer bars */}
              <div className="flex items-center justify-center sm:justify-start gap-1 h-6 my-4">
                {[40, 75, 100, 50, 85, 30, 90, 60, 45, 80].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-terracotta-500 transition-all duration-300 ${
                      isPlaying ? 'opacity-90' : 'opacity-25'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(15, (h * ((i % 3) + 1)) % 100)}%` : '20%',
                    }}
                  />
                ))}
              </div>

              {/* Play/Pause Button */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                <button
                  onClick={togglePlayback}
                  aria-label={isPlaying ? 'Hentikan musik' : 'Putar musik piringan hitam'}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-linen-100 font-medium text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Jeda Musik</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>Letakkan Jarum &amp; Putar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Ambient note */}
          <p className="text-center text-xs text-linen-600 mt-4 italic font-serif" style={{ transform: 'translateZ(10px)' }}>
            *Suara analog synthesizer generatif yang lembut. Tidak ada musik otomatis yang mengagetkan.
          </p>
        </motion.div>
      </div>

      {/* Floating Mini Vinyl Control Widget (Appears when scrolling) */}
      <AnimatePresence>
        {isFloatingVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
              className="group flex items-center gap-3 bg-noir-900/90 hover:bg-noir-900 text-linen-100 backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border border-linen-400/20 transition-all cursor-pointer"
            >
              <div
                className={`w-7 h-7 rounded-full vinyl-grooves border border-linen-500/30 flex items-center justify-center ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-terracotta-600" />
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-xs font-serif text-linen-100 leading-tight">
                  {currentTrack.title}
                </div>
                <div className="text-[10px] text-linen-400 font-mono">
                  {isPlaying ? 'Memutar...' : 'Dijeda'}
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-terracotta-600/80 group-hover:bg-terracotta-600 flex items-center justify-center text-white">
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
