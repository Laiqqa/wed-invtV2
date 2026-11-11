import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { weddingData } from '../../data/weddingData';

interface HeroSectionProps {
  guestName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-12-12T08:00:00+07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between pt-12 pb-16 px-4 text-center overflow-hidden">
      {/* Background Subtle Gradient & Paper Texture */}
      <div className="absolute inset-0 bg-paper-grain opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-terracotta-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-2 z-10"
      >
        <span className="inline-block py-1 px-4 rounded-full bg-linen-200/80 border border-linen-300 text-xs font-mono tracking-[0.25em] text-linen-800 uppercase">
          The Wedding Celebration
        </span>
        <p className="text-xs text-linen-600 font-sans tracking-wider">
          Salam hangat untuk <span className="font-semibold text-terracotta-700">{guestName}</span>
        </p>
      </motion.div>

      {/* Main Couple Names Editorial Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="my-auto py-8 z-10 max-w-4xl"
      >
        <div className="font-script text-3xl sm:text-4xl text-terracotta-600 mb-1">
          Menyambut Hari Bahagia
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-noir-900 tracking-tight font-normal leading-[1.05]">
          {weddingData.couple.groom.nickname} <span className="font-script text-4xl sm:text-6xl text-primary">&amp;</span> {weddingData.couple.bride.nickname}
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-linen-700 mt-4 max-w-lg mx-auto font-light">
          “Dua jiwa, satu ritme, sebuah awal cerita yang abadi.”
        </p>

        {/* Date & Location Pill Badge */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-noir-800">
          <div className="flex items-center gap-2 bg-linen-100/90 border border-linen-300/80 px-4 py-2 rounded-full shadow-sm">
            <Calendar className="w-4 h-4 text-terracotta-600" />
            <span className="font-medium">Sabtu, 12 Desember 2026</span>
          </div>
          <div className="flex items-center gap-2 bg-linen-100/90 border border-linen-300/80 px-4 py-2 rounded-full shadow-sm">
            <MapPin className="w-4 h-4 text-terracotta-600" />
            <span className="font-medium">Jakarta, Indonesia</span>
          </div>
        </div>

        {/* Countdown Timer in Antique Editorial Style */}
        <div className="mt-10 p-5 max-w-md mx-auto bg-linen-100/80 backdrop-blur-sm rounded-2xl border border-linen-300/70 shadow-paper">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-linen-600 block mb-3">
            Menghitung Hari Menuju Janji Suci
          </span>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-linen-50 rounded-xl border border-linen-200">
              <span className="block font-serif text-2xl sm:text-3xl font-medium text-noir-900">
                {timeLeft.days}
              </span>
              <span className="text-[10px] font-mono uppercase text-linen-600">Hari</span>
            </div>
            <div className="p-2 bg-linen-50 rounded-xl border border-linen-200">
              <span className="block font-serif text-2xl sm:text-3xl font-medium text-noir-900">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] font-mono uppercase text-linen-600">Jam</span>
            </div>
            <div className="p-2 bg-linen-50 rounded-xl border border-linen-200">
              <span className="block font-serif text-2xl sm:text-3xl font-medium text-noir-900">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] font-mono uppercase text-linen-600">Menit</span>
            </div>
            <div className="p-2 bg-linen-50 rounded-xl border border-linen-200">
              <span className="block font-serif text-2xl sm:text-3xl font-medium text-terracotta-600 font-semibold">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] font-mono uppercase text-linen-600">Detik</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Editorial Navigation Quick Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-2xl z-10"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-linen-700">
          <a
            href="#tiket"
            className="px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors border border-amber-300 font-semibold shadow-xs"
          >
            VIP Pass
          </a>
          <a
            href="#mempelai"
            className="px-3.5 py-1.5 rounded-full bg-linen-100 hover:bg-linen-200 transition-colors border border-linen-300"
          >
            Mempelai
          </a>
          <a
            href="#acara"
            className="px-3.5 py-1.5 rounded-full bg-linen-100 hover:bg-linen-200 transition-colors border border-linen-300"
          >
            Lokasi
          </a>
          <a
            href="#rundown"
            className="px-3.5 py-1.5 rounded-full bg-linen-100 hover:bg-linen-200 transition-colors border border-linen-300"
          >
            Rundown Hari-H
          </a>
          <a
            href="#rsvp"
            className="px-3.5 py-1.5 rounded-full bg-primary text-linen-50 hover:opacity-90 transition-opacity shadow-sm font-semibold"
          >
            Konfirmasi RSVP
          </a>
          <a
            href="#tanda-kasih"
            className="px-3.5 py-1.5 rounded-full bg-linen-100 hover:bg-linen-200 transition-colors border border-linen-300"
          >
            Tanda Kasih
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#mempelai"
            aria-label="Gulir ke bawah ke profil mempelai"
            className="text-linen-500 hover:text-terracotta-600 animate-bounce transition-colors p-2"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
