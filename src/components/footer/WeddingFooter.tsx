import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Music,
  Disc,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Share2,
  Compass,
  ArrowUp,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { soundEngine } from '../../utils/audioEngine';
import { PerchedButterfly } from '../common/PerchedButterfly';

export const WeddingFooter: React.FC = () => {
  const [copiedHashtag, setCopiedHashtag] = useState(false);
  const [isPlaying, setIsPlaying] = useState(() => soundEngine.getIsPlaying());
  const [currentTrackId, setCurrentTrackId] = useState(() => soundEngine.getCurrentTrackId());
  const [volume, setVolume] = useState(() => soundEngine.getVolume());
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(({ isPlaying: enginePlaying, trackId, volume: engineVolume }) => {
      setIsPlaying(enginePlaying);
      setCurrentTrackId(trackId);
      setVolume(engineVolume);
      setIsMuted(engineVolume === 0);
    });
    return unsubscribe;
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyHashtag = () => {
    navigator.clipboard.writeText('#TomAndZendaya2026');
    setCopiedHashtag(true);
    setTimeout(() => setCopiedHashtag(false), 2500);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Undangan Pernikahan Tom Holland & Zendaya Coleman\nSabtu, 12 Desember 2026 • Pendopo Sasana Kriya, Jakarta\n\nBuka undangan digital resmi: ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const toggleMusic = () => {
    const track = weddingData.playlist.find((t) => t.id === currentTrackId) || weddingData.playlist[0];
    soundEngine.toggleMusic(track.src, track.id);
  };

  const switchTrack = () => {
    const currentIndex = weddingData.playlist.findIndex((t) => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % weddingData.playlist.length;
    const nextTrack = weddingData.playlist[nextIndex];
    soundEngine.stopMusic();
    soundEngine.playNeedleDrop();
    soundEngine.startMusic(nextTrack.src, nextTrack.id);
  };

  const toggleMute = () => {
    if (isMuted) {
      soundEngine.setVolume(0.75);
      setIsMuted(false);
    } else {
      soundEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const currentTrack =
    weddingData.playlist.find((t) => t.id === currentTrackId) || weddingData.playlist[0];

  return (
    <footer className="relative pt-24 pb-28 px-4 sm:px-6 bg-gradient-to-b from-noir-900 via-[#181615] to-[#0d0c0c] text-linen-100 overflow-hidden select-none border-t border-linen-800/40">
      {/* 1. Subtle Paper Grain & Warm Golden Radial Ambient Atmosphere */}
      <div className="absolute inset-0 bg-paper-grain opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Top Perimeter Resting Butterfly & Monogram Medallion */}
      <div className="relative max-w-4xl mx-auto flex flex-col items-center mb-16">
        <div className="relative group">
          <PerchedButterfly color="vintage-amber" size={32} rotation={15} className="-top-7 -right-6 z-20" />
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="w-16 h-16 rounded-full border-2 border-primary/40 bg-noir-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/40 ring-4 ring-primary/10"
          >
            <span className="font-serif italic text-2xl text-primary font-bold tracking-wider">
              T&amp;Z
            </span>
          </motion.div>
        </div>

        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-linen-400 mt-4">
          The Final Track • Side B Outro
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-linen-50 font-normal mt-2 tracking-wide text-center">
          {weddingData.couple.groom.nickname} &amp; {weddingData.couple.bride.nickname}
        </h2>
        <div className="flex items-center gap-3 my-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/60" />
          <Heart className="w-4 h-4 text-primary fill-primary/30" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/60" />
        </div>
      </div>

      {/* 3. Main Center Content: Benediction Letter + Concentric Vinyl Run-out Groove */}
      <div className="relative max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        {/* Left: Deep Heartfelt Closing Letter (7 cols) */}
        <div className="lg:col-span-7 bg-noir-800/60 border border-linen-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ungkapan Terima Kasih &amp; Doa Kasih</span>
            </div>

            <p className="font-serif text-linen-200 text-sm sm:text-base leading-relaxed italic">
              “Merupakan sebuah kehormatan dan kebahagiaan tak terhingga bagi kami atas kehadiran,
              untaian doa tulus, serta kehangatan yang Anda berikan untuk mengiringi langkah suci
              perjalanan cinta kami berdua. Semoga berkah dan kedamaian senantiasa menyertai kita semua.”
            </p>

            <div className="pt-4 border-t border-linen-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif text-base text-linen-100 font-medium">
                  {weddingData.couple.groom.fullName}
                </p>
                <p className="font-serif text-base text-linen-100 font-medium">
                  &amp; {weddingData.couple.bride.fullName}
                </p>
                <span className="text-[11px] font-mono text-linen-500">
                  Beserta segenap keluarga besar
                </span>
              </div>

              {/* Verified Atelier Seal Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir-900/90 border border-primary/30 text-[10px] font-mono text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>OFFICIAL ATELIER EDITION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Vinyl Run-out Groove Interactive Graphic (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#141414] via-[#222222] to-[#111111] border-4 border-[#333333] shadow-2xl flex items-center justify-center p-3 group">
            {/* Vinyl Concentric Grooves */}
            <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-14 rounded-full border border-white/5 pointer-events-none" />

            {/* Rotating Center Disc Label */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-700 via-primary to-amber-900 border-2 border-amber-300/40 flex flex-col items-center justify-center text-center p-2 shadow-inner"
            >
              <div className="w-4 h-4 rounded-full bg-noir-950 border border-amber-300/60 mb-1" />
              <span className="font-serif italic text-xs font-bold text-amber-100">
                T &amp; Z
              </span>
              <span className="text-[8px] font-mono tracking-widest text-amber-200/80 uppercase">
                33 ⅓ RPM
              </span>
              <span className="text-[7px] font-mono text-amber-300/70 mt-0.5">
                SIDE {currentTrack.side}
              </span>
            </motion.div>

            {/* Matrix Run-out Groove Etching */}
            <div className="absolute bottom-2 text-[8px] font-mono text-linen-600/60 tracking-wider">
              TZ-2026-1212-STEREO
            </div>
          </div>

          <span className="text-[11px] font-mono text-linen-500 mt-3 text-center">
            Piringan Hitam Master Atelier • Stereo Hi-Fi
          </span>
        </div>
      </div>

      {/* 4. Interactive Music Controller Bar in Footer */}
      <div className="relative max-w-4xl mx-auto mb-16 bg-noir-800/80 border border-linen-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-full bg-noir-900 border border-primary/40 flex items-center justify-center text-primary shrink-0">
            <Disc className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase">
                Side {currentTrack.side}
              </span>
              <h4 className="text-xs sm:text-sm font-sans font-medium text-linen-100 truncate">
                {currentTrack.title} — {currentTrack.artist}
              </h4>
            </div>
            <p className="text-[11px] font-mono text-linen-400 truncate mt-0.5">
              {currentTrack.album}
            </p>
          </div>
        </div>

        {/* Audio Visualizer Waves + Control Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* 5-bar dancing visualizer */}
          <div className="flex items-end gap-1 h-5 px-2">
            {[0.4, 0.8, 0.5, 0.9, 0.6].map((height, i) => (
              <motion.span
                key={i}
                animate={
                  isPlaying
                    ? { height: ['20%', `${height * 100}%`, '30%'] }
                    : { height: '20%' }
                }
                transition={{
                  repeat: Infinity,
                  duration: 0.8 + i * 0.15,
                  ease: 'easeInOut',
                }}
                className="w-1 rounded-full bg-primary"
              />
            ))}
          </div>

          {/* Toggle Music */}
          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
            className="px-3.5 py-1.5 rounded-full bg-primary text-linen-50 hover:opacity-90 transition-opacity text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Music className="w-3.5 h-3.5" />
            <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
          </button>

          {/* Switch Track */}
          <button
            onClick={switchTrack}
            className="px-3.5 py-1.5 rounded-full bg-noir-900 border border-linen-700 hover:border-linen-500 text-linen-200 transition-colors text-xs font-mono cursor-pointer"
          >
            Ganti Sisi
          </button>

          {/* Mute & Volume Control */}
          <div className="flex items-center gap-1.5 bg-noir-900 border border-linen-700 rounded-full px-2.5 py-1">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
              className="text-linen-400 hover:text-linen-100 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVol = parseFloat(e.target.value);
                soundEngine.setVolume(newVol);
                if (newVol > 0 && isMuted) {
                  setIsMuted(false);
                }
              }}
              aria-label="Volume Musik"
              className="w-14 sm:w-20 h-1.5 bg-linen-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>

      {/* 5. Interactive Keepsake & Social Hub: Hashtag, WhatsApp, Coordinates */}
      <div className="relative max-w-4xl mx-auto mb-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Hashtag Card */}
        <div className="bg-noir-800/40 border border-linen-800 rounded-2xl p-4 flex flex-col justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-linen-500 uppercase tracking-wider">
              Tagar Pernikahan
            </span>
            <p className="font-mono text-sm text-primary font-semibold mt-1">
              #TomAndZendaya2026
            </p>
          </div>
          <button
            onClick={copyHashtag}
            className="w-full py-2 px-3 rounded-xl bg-noir-900/90 border border-linen-700/80 hover:border-primary/50 text-xs font-mono text-linen-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedHashtag ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Tagar Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Tagar</span>
              </>
            )}
          </button>
        </div>

        {/* WhatsApp Share Card */}
        <div className="bg-noir-800/40 border border-linen-800 rounded-2xl p-4 flex flex-col justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-linen-500 uppercase tracking-wider">
              Bagikan Momen
            </span>
            <p className="font-serif text-sm text-linen-200 mt-1">
              Sebarkan kabar bahagia ini kepada kerabat
            </p>
          </div>
          <button
            onClick={shareViaWhatsApp}
            className="w-full py-2 px-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-xs font-mono text-emerald-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan via WhatsApp</span>
          </button>
        </div>

        {/* Venue Coordinates & Compass Card */}
        <div className="bg-noir-800/40 border border-linen-800 rounded-2xl p-4 flex flex-col justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-linen-500 uppercase tracking-wider flex items-center gap-1">
              <Compass className="w-3 h-3 text-primary animate-spin" style={{ animationDuration: '12s' }} />
              Koordinat Lokasi
            </span>
            <p className="font-mono text-xs text-linen-300 mt-1">
              6°18'08.6"S 106°53'42.7"E
            </p>
            <p className="text-[11px] font-serif text-linen-400">
              Pendopo Sasana Kriya, Jakarta
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Pendopo+Sasana+Kriya+TMII"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-noir-900/90 border border-linen-700/80 hover:border-primary/50 text-xs font-mono text-linen-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Buka Google Maps</span>
          </a>
        </div>
      </div>

      {/* 6. Liner Notes Colophon (Vintage Vinyl Credits) */}
      <div className="relative max-w-4xl mx-auto pt-8 border-t border-linen-800/70">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[11px] font-mono text-linen-500 mb-8">
          <div>
            <span className="text-linen-400 uppercase tracking-wider block mb-1">
              Mempelai Pria
            </span>
            <span className="text-linen-200">{weddingData.couple.groom.fullName}</span>
          </div>
          <div>
            <span className="text-linen-400 uppercase tracking-wider block mb-1">
              Mempelai Wanita
            </span>
            <span className="text-linen-200">{weddingData.couple.bride.fullName}</span>
          </div>
          <div>
            <span className="text-linen-400 uppercase tracking-wider block mb-1">
              Tanggal &amp; Tempat
            </span>
            <span className="text-linen-200">12 Des 2026 • TMII Jakarta</span>
          </div>
          <div>
            <span className="text-linen-400 uppercase tracking-wider block mb-1">
              Format Master
            </span>
            <span className="text-linen-200">Limited Bespoke Vinyl Edition</span>
          </div>
        </div>

        {/* 7. Bottom Bar with Smooth Kinetic Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-linen-500 font-mono gap-4 pt-4 border-t border-linen-800/40">
          <p>© 2026 Tom Holland &amp; Zendaya Maree Coleman. All rights reserved.</p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-noir-800 border border-primary/40 hover:border-primary text-linen-200 hover:text-primary transition-all cursor-pointer shadow-md"
          >
            <span>Kembali ke Awal</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
