import { ArrowUp } from 'lucide-react';
import { weddingData } from '../../data/weddingData';

export const WeddingFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-20 px-4 text-center bg-noir-900 text-linen-100 relative overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="w-12 h-12 rounded-full border border-linen-500/40 mx-auto flex items-center justify-center font-serif italic text-xl text-primary">
          T&amp;Z
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-linen-50">
          {weddingData.couple.groom.nickname} &amp; {weddingData.couple.bride.nickname}
        </h3>

        <p className="font-serif italic text-linen-400 text-sm max-w-md mx-auto leading-relaxed">
          “Merupakan sebuah kehormatan dan kebahagiaan tak terhingga bagi kami atas kehadiran dan untaian doa tulus yang Anda berikan.”
        </p>

        <div className="inline-block py-1.5 px-4 rounded-full bg-noir-800 border border-noir-700 text-xs font-mono text-terracotta-400">
          {weddingData.couple.hashtag}
        </div>

        <div className="pt-8 border-t border-noir-800 flex flex-col sm:flex-row items-center justify-between text-xs text-linen-500 font-mono gap-4">
          <span>Jakarta • 12 Desember 2026</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-linen-200 transition-colors cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
