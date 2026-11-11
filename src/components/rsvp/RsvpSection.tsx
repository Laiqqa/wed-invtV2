import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';
import type { RsvpData } from '../../types/wedding';

interface RsvpSectionProps {
  initialGuestName: string;
  onNewRsvpAdded: (rsvp: RsvpData) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ initialGuestName, onNewRsvpAdded }) => {
  const [name, setName] = useState(initialGuestName);
  const [attendance, setAttendance] = useState<'attending' | 'not-attending' | 'undecided'>('attending');
  const [pax, setPax] = useState<number>(2);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Mohon tuliskan nama Anda');
      return;
    }
    setError(null);

    const newRsvp: RsvpData = {
      id: `rsvp-${Date.now()}`,
      name: name.trim(),
      attendance,
      pax: attendance === 'attending' ? pax : 0,
      message: message.trim() || 'Semoga cinta dan kebahagiaan selalu menyertai Arya & Nayla.',
      createdAt: 'Baru saja',
    };

    // Confetti celebration if attending!
    if (attendance === 'attending') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#C46851', '#AB9D7E', '#FAF8F5', '#8A3E2C'],
        });
      } catch {
        // Confetti fallback
      }
    }

    onNewRsvpAdded(newRsvp);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMessage('');
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 max-w-3xl mx-auto scroll-mt-10">
      <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600">
          RSVP & Confirmation
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir-900 font-normal">
          Konfirmasi Kehadiran
        </h2>
        <div className="w-12 h-0.5 bg-terracotta-500 mx-auto mt-4" />
        <p className="text-sm text-noir-700 leading-relaxed pt-2">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
      </div>

      <div className="bg-linen-100 rounded-3xl p-6 sm:p-10 border border-linen-300 shadow-paper-lg relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-noir-900 font-normal">
                Terima Kasih, {name}!
              </h3>
              <p className="text-sm text-noir-700 max-w-md mx-auto leading-relaxed">
                {attendance === 'attending'
                  ? `Konfirmasi kehadiran Anda (${pax} Orang) telah kami catat. Kami tidak sabar untuk menyambut Anda di hari bahagia kami.`
                  : 'Terima kasih atas doa dan konfirmasinya. Doa tulus Anda sangat berarti bagi kami.'}
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-terracotta-700 hover:text-terracotta-900 underline underline-offset-4 cursor-pointer"
                >
                  Kirim tanggapan lain atau perbarui RSVP
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="rsvp-name" className="block text-xs font-mono uppercase tracking-wider text-noir-800">
                  Nama Lengkap Tamu <span className="text-terracotta-600">*</span>
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-linen-50 border border-linen-300 text-noir-900 text-sm focus:border-terracotta-600 focus:bg-white transition-colors"
                />
              </div>

              {/* Attendance Options */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-noir-800 mb-2">
                  Konfirmasi Kehadiran <span className="text-terracotta-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-3 px-4 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      attendance === 'attending'
                        ? 'bg-noir-900 text-linen-100 border-noir-900 shadow-sm'
                        : 'bg-linen-50 text-noir-700 border-linen-300 hover:bg-linen-200'
                    }`}
                  >
                    Ya, Pasti Hadir
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('not-attending')}
                    className={`py-3 px-4 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      attendance === 'not-attending'
                        ? 'bg-noir-900 text-linen-100 border-noir-900 shadow-sm'
                        : 'bg-linen-50 text-noir-700 border-linen-300 hover:bg-linen-200'
                    }`}
                  >
                    Maaf, Berhalangan
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('undecided')}
                    className={`py-3 px-4 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      attendance === 'undecided'
                        ? 'bg-noir-900 text-linen-100 border-noir-900 shadow-sm'
                        : 'bg-linen-50 text-noir-700 border-linen-300 hover:bg-linen-200'
                    }`}
                  >
                    Masih Menyesuaikan
                  </button>
                </div>
              </div>

              {/* Number of Pax (Only shown if attending) */}
              {attendance === 'attending' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 pt-1"
                >
                  <label className="block text-xs font-mono uppercase tracking-wider text-noir-800">
                    Jumlah Tamu yang Hadir
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPax(num)}
                        className={`w-12 h-10 rounded-xl text-xs font-mono font-medium border flex items-center justify-center transition-all cursor-pointer ${
                          pax === num
                            ? 'bg-terracotta-600 text-white border-terracotta-700 shadow-sm'
                            : 'bg-linen-50 text-noir-800 border-linen-300 hover:bg-linen-200'
                        }`}
                      >
                        {num} Pax
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message / Wishes */}
              <div className="space-y-1.5">
                <label htmlFor="rsvp-message" className="block text-xs font-mono uppercase tracking-wider text-noir-800">
                  Ucapan & Doa Restu
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa hangat Anda untuk kedua mempelai..."
                  className="w-full px-4 py-3 rounded-xl bg-linen-50 border border-linen-300 text-noir-900 text-sm focus:border-terracotta-600 focus:bg-white transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-linen-100 font-medium text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Konfirmasi & Doa Restu</span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
