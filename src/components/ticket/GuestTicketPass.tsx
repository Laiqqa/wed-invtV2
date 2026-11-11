import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, QrCode, Check, Copy, Printer, Sparkles, MapPin, Calendar, Clock, UserCheck } from 'lucide-react';

interface GuestTicketPassProps {
  guestName: string;
  pax: number;
}

export const GuestTicketPass: React.FC<GuestTicketPassProps> = ({ guestName, pax }) => {
  const [copied, setCopied] = useState(false);
  const [showFullQr, setShowFullQr] = useState(false);

  // Generate a consistent pseudo-random ticket number based on guest name
  const ticketNumber = `TZ-2026-${Math.abs(
    guestName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1088)
  )
    .toString()
    .slice(-4)
    .padStart(4, '7')}`;

  const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=WEDDING-PASS-${ticketNumber}-${encodeURIComponent(
    guestName
  )}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="tiket" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-10 select-none">
      <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600">
          VIP Guest Entry Pass
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir-900 font-normal">
          Tiket Masuk &amp; Akses VIP
        </h2>
        <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
        <p className="text-sm text-noir-700 leading-relaxed pt-2">
          Gunakan kartu tiket digital ini untuk proses registrasi cepat dan *check-in* tanpa antre di meja penerima tamu hari H.
        </p>
      </div>

      {/* The Physical Vintage Boarding Pass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        className="relative bg-linen-100 border-2 border-linen-300 rounded-3xl shadow-paper-lg overflow-hidden"
      >
        {/* Top Header Vintage Ribbon */}
        <div className="bg-noir-900 text-linen-100 px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-linen-400">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-linen-200">
              Official Wedding Pass • Side A &amp; B
            </span>
          </div>
          <span className="font-mono text-[11px] text-amber-300 uppercase tracking-wider font-semibold">
            {pax > 1 ? `VIP ALL-ACCESS • ${pax} PAX` : 'VIP ALL-ACCESS • 1 PAX'}
          </span>
        </div>

        {/* Ticket Body: Two Sections (Left Details, Right Tear-Off Barcode Stub) */}
        <div className="grid grid-cols-1 md:grid-cols-12 relative">
          {/* Main Pass Information (Left 8 cols) */}
          <div className="md:col-span-8 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-linen-600 block">
                  Nama Tamu Terhormat
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-primary font-semibold tracking-wide">
                  {guestName}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-linen-600 block">
                  Nomor Registrasi
                </span>
                <span className="font-mono text-sm font-semibold text-noir-900">
                  {ticketNumber}
                </span>
              </div>
            </div>

            {/* Event Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 px-4 bg-linen-50 rounded-2xl border border-linen-200/90 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-noir-900">
                  <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Sabtu, 12 Desember 2026</span>
                </div>
                <div className="flex items-center gap-1.5 text-linen-700 pl-5">
                  <Clock className="w-3.5 h-3.5 text-primary shrink-0 -ml-5" />
                  <span>08:00 (Akad) • 18:30 (Resepsi)</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-noir-900">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="text-linen-600 pl-5 leading-tight text-[11px]">
                  Sasana Kriya &amp; The Glass House Atelier
                </div>
              </div>
            </div>

            {/* Check-in Perks / Status */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-linen-700 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linen-200 text-noir-800 font-mono text-[11px]">
                <UserCheck className="w-3.5 h-3.5 text-green-700" />
                <span>Terverifikasi Otomatis</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linen-200 text-noir-800 font-mono text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Akses Meja Khusus</span>
              </span>
            </div>
          </div>

          {/* Perforated Divider Line with Half-Circle Cutouts */}
          <div className="hidden md:block absolute left-[66.666%] top-0 bottom-0 w-px border-r-2 border-dashed border-linen-400 z-10 pointer-events-none">
            {/* Top Cutout Notch */}
            <div className="absolute -top-4 -left-3.5 w-7 h-7 rounded-full bg-paper border border-linen-300" />
            {/* Bottom Cutout Notch */}
            <div className="absolute -bottom-4 -left-3.5 w-7 h-7 rounded-full bg-paper border border-linen-300" />
          </div>

          {/* Right Ticket Stub (QR Code & Quick Scan) */}
          <div className="md:col-span-4 p-6 sm:p-8 bg-linen-200/50 flex flex-col items-center justify-between text-center border-t md:border-t-0 border-linen-300">
            <div className="w-full">
              <span className="text-[10px] font-mono uppercase tracking-widest text-linen-600 block mb-2">
                Pindai di Meja Registrasi
              </span>

              {/* QR Code Container */}
              <div
                onClick={() => setShowFullQr(true)}
                className="w-32 h-32 mx-auto bg-white p-2.5 rounded-2xl border border-linen-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                title="Klik untuk memperbesar QR Code"
              >
                <img
                  src={qrDataUrl}
                  alt={`QR Code Pass ${guestName}`}
                  className="w-full h-full object-contain"
                  width={112}
                  height={112}
                />
              </div>

              <span className="text-[10px] font-mono text-linen-600 block mt-2">
                Ketuk QR untuk memperbesar
              </span>
            </div>

            {/* Ticket Barcode Visual representation */}
            <div className="mt-4 pt-3 border-t border-linen-300/80 w-full flex flex-col items-center">
              <div className="flex gap-1 h-7 opacity-75">
                {[3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3].map((w, i) => (
                  <span
                    key={i}
                    className="h-full bg-noir-900 rounded-xs"
                    style={{ width: `${w}px` }}
                  />
                ))}
              </div>
              <span className="font-mono text-[9px] text-linen-500 tracking-widest mt-1">
                *{ticketNumber}*
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 bg-linen-50 border-t border-linen-300 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-linen-600">
            Tunjukkan layar ponsel atau cetak kartu ini kepada panitia meja tamu.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-linen-200 hover:bg-linen-300 text-noir-800 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-700" />
                  <span className="text-green-700">Kode Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin No. Tiket</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-noir-900 hover:bg-noir-800 text-linen-100 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Enlarged QR Modal */}
      <AnimatePresence>
        {showFullQr && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-noir-900/80 backdrop-blur-sm p-4"
            onClick={() => setShowFullQr(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-linen-100 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center border border-linen-300 shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl text-noir-900 font-semibold">
                VIP Pass QR Check-in
              </h4>
              <p className="text-xs text-linen-600 mt-1 mb-5">
                {guestName} • {ticketNumber}
              </p>

              <div className="bg-white p-4 rounded-2xl border border-linen-300 shadow-inner inline-block mx-auto mb-4">
                <img
                  src={qrDataUrl}
                  alt={`QR Code Pass ${guestName}`}
                  className="w-56 h-56 object-contain mx-auto"
                  width={224}
                  height={224}
                />
              </div>

              <button
                onClick={() => setShowFullQr(false)}
                className="w-full py-2.5 rounded-xl bg-noir-900 text-linen-100 text-xs font-mono font-medium hover:bg-noir-800 transition-colors"
              >
                Tutup Jendela
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
