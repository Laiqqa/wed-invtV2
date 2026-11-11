import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, QrCode, CreditCard, X } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import type { BankAccount } from '../../types/wedding';

export const WeddingGift: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrisModal, setActiveQrisModal] = useState<BankAccount | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section id="tanda-kasih" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-10">
      <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600">
          Wedding Gift & Registry
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir-900 font-normal">
          Tanda Kasih & Amplop Digital
        </h2>
        <div className="w-12 h-0.5 bg-terracotta-500 mx-auto mt-4" />
        <p className="text-sm text-noir-700 leading-relaxed pt-2">
          Doa restu Anda merupakan karunia yang paling berarti bagi kami. Namun apabila Anda ingin memberikan tanda kasih secara digital, kami menyediakannya melalui kanal di bawah ini.
        </p>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weddingData.accounts.map((acc) => {
          const isCopied = copiedId === acc.id;
          const isQris = acc.type === 'qris';

          return (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-linen-100 rounded-2xl border border-linen-300/80 shadow-paper flex flex-col justify-between relative group hover:border-terracotta-400 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-terracotta-700 font-medium">
                    {acc.type === 'qris' ? 'QRIS Digital' : 'Transfer Bank'}
                  </span>
                  {isQris ? (
                    <QrCode className="w-5 h-5 text-terracotta-600" />
                  ) : (
                    <CreditCard className="w-5 h-5 text-linen-600" />
                  )}
                </div>

                <div className="font-serif text-lg text-noir-900 font-medium mb-1">
                  {acc.bankName}
                </div>

                <div className="my-3 py-2 px-3 bg-linen-50 rounded-xl border border-linen-200">
                  <span className="text-[10px] uppercase font-mono text-linen-600 block">
                    {isQris ? 'Identitas QRIS' : 'Nomor Rekening'}
                  </span>
                  <div className="font-mono text-base font-semibold text-noir-900 tracking-wider">
                    {acc.accountNumber}
                  </div>
                </div>

                <div className="text-xs text-linen-700">
                  a.n. <span className="font-semibold text-noir-900">{acc.accountHolder}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-linen-200">
                {isQris ? (
                  <button
                    onClick={() => setActiveQrisModal(acc)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-noir-900 hover:bg-noir-800 text-linen-100 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Lihat QR Code</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleCopy(acc.id, acc.accountNumber)}
                    className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-green-700 text-white'
                        : 'bg-linen-50 hover:bg-linen-200 text-noir-900 border border-linen-300'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin ke Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Nomor Rekening</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* QRIS Modal Pop-up */}
      <AnimatePresence>
        {activeQrisModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-900/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-linen-100 rounded-3xl p-6 border border-linen-300 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setActiveQrisModal(null)}
                aria-label="Tutup jendela QRIS"
                className="absolute top-4 right-4 p-2 rounded-full bg-linen-200 hover:bg-linen-300 text-noir-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-full bg-terracotta-100 text-terracotta-700 mx-auto flex items-center justify-center mb-3">
                <QrCode className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-2xl text-noir-900 font-normal">
                QRIS Pembayaran
              </h3>
              <p className="text-xs text-linen-600 mt-1 mb-5">
                Scan menggunakan aplikasi m-Banking atau dompet digital (GoPay, OVO, ShopeePay, Dana).
              </p>

              {/* QR Image Box */}
              <div className="p-4 bg-white rounded-2xl border border-linen-300 shadow-inner inline-block mx-auto mb-4">
                {activeQrisModal.qrisUrl && (
                  <img
                    src={activeQrisModal.qrisUrl}
                    alt="QRIS Arya & Nayla"
                    className="w-52 h-52 object-contain mx-auto"
                    width={208}
                    height={208}
                  />
                )}
              </div>

              <div className="text-xs font-mono text-noir-800 font-semibold">
                {activeQrisModal.accountHolder}
              </div>
              <div className="text-[11px] font-mono text-linen-600">
                {activeQrisModal.accountNumber}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
