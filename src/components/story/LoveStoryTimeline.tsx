import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, MapPin, ArrowRight } from 'lucide-react';
import { weddingData } from '../../data/weddingData';

export const LoveStoryTimeline: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const storyList = weddingData.story;
  const current = storyList[selectedTrack];

  return (
    <section id="kisah" className="py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-10">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600">
          Our Journey & Milestones
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir-900 font-normal">
          Jejak Langkah Cerita Kami
        </h2>
        <div className="w-12 h-0.5 bg-terracotta-500 mx-auto mt-4" />
        <p className="text-sm text-noir-700 leading-relaxed pt-2">
          Setiap perjumpaan dan perjalanan yang menenun dua cerita menjadi satu harmoni yang indah.
        </p>
      </div>

      {/* Track Selector Bar (Like an Album Tracklist) */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {storyList.map((item, index) => {
          const isActive = index === selectedTrack;
          return (
            <button
              key={item.chapter}
              onClick={() => setSelectedTrack(index)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? 'bg-noir-900 text-linen-100 shadow-md scale-105'
                  : 'bg-linen-100 text-noir-700 hover:bg-linen-200 border border-linen-300'
              }`}
            >
              <Disc className={`w-3.5 h-3.5 ${isActive ? 'text-terracotta-400 animate-spin-slow' : 'text-linen-500'}`} />
              <span className="font-semibold">{item.year}</span>
              <span className="opacity-70 hidden sm:inline">• {item.chapter}</span>
            </button>
          );
        })}
      </div>

      {/* Active Story Featured Box */}
      <div className="bg-linen-100 border border-linen-300/80 rounded-3xl p-6 sm:p-10 shadow-paper-lg relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.chapter}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Story Image / Polaroid Framing */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-xs aspect-[4/5] bg-linen-50 p-3 rounded-2xl border border-linen-300 shadow-paper rotate-[-1.5deg]">
                {current.photo && (
                  <img
                    src={current.photo}
                    alt={current.title}
                    className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    width={320}
                    height={400}
                  />
                )}
                {/* Polaroid stamp note */}
                <div className="absolute bottom-4 left-4 right-4 bg-linen-100/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-linen-200 text-center">
                  <span className="font-serif italic text-xs text-noir-800">
                    {current.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Story Text Narrative */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-700 font-mono text-xs font-semibold">
                  {current.chapter} — {current.year}
                </span>
                <div className="flex items-center gap-1 text-xs text-linen-600 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>{current.location}</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-noir-900 font-normal leading-snug">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-noir-700 leading-relaxed font-light">
                {current.description}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-linen-200 text-xs font-mono text-linen-600">
                <span>Bab {selectedTrack + 1} dari {storyList.length}</span>
                {selectedTrack < storyList.length - 1 && (
                  <button
                    onClick={() => setSelectedTrack((prev) => prev + 1)}
                    className="flex items-center gap-1.5 text-terracotta-700 hover:text-terracotta-900 font-semibold cursor-pointer"
                  >
                    <span>Lanjut ke bab berikutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
