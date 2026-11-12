import { motion } from 'framer-motion';
import { MessageSquareHeart, Check } from 'lucide-react';
import type { RsvpData } from '../../types/wedding';

interface WishesWallProps {
  wishes: RsvpData[];
}

export const WishesWall: React.FC<WishesWallProps> = ({ wishes }) => {
  return (
    <section id="doa" className="py-6 sm:py-8 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-10">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600">
          Guestbook & Blessings
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir-900 font-normal">
          Dinding Doa & Ucapan
        </h2>
        <div className="w-12 h-0.5 bg-terracotta-500 mx-auto mt-4" />
        <p className="text-sm text-noir-700 leading-relaxed pt-2">
          Terima kasih atas segala cinta, doa, dan kata-kata penuh makna yang telah Anda tinggalkan untuk lembaran baru kami.
        </p>
      </div>

      {/* Wishes List Cards */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {wishes.length === 0 ? (
          <div className="p-8 text-center bg-linen-100 rounded-2xl border border-dashed border-linen-300 text-linen-600 text-sm">
            <MessageSquareHeart className="w-8 h-8 mx-auto mb-2 opacity-50 text-terracotta-500" />
            <p>Belum ada ucapan yang masuk. Jadilah yang pertama memberikan doa restu di atas!</p>
          </div>
        ) : (
          wishes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-5 bg-linen-100 rounded-2xl border border-linen-300/80 shadow-paper relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-linen-200 border border-linen-300 flex items-center justify-center font-serif text-noir-900 font-semibold text-xs">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-noir-900 leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-linen-600 font-mono">
                      {item.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.attendance === 'attending' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-green-700 bg-green-50 border border-green-200/80 px-2.5 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      Hadir {item.pax > 1 ? `(${item.pax} orang)` : ''}
                    </span>
                  ) : item.attendance === 'not-attending' ? (
                    <span className="text-[11px] font-mono text-linen-600 bg-linen-200/60 px-2.5 py-0.5 rounded-full">
                      Berhalangan
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-linen-600 bg-linen-200/60 px-2.5 py-0.5 rounded-full">
                      Menyesuaikan
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-noir-800 leading-relaxed font-light pl-10">
                "{item.message}"
              </p>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};
