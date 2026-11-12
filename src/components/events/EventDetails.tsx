import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, Check, Sparkles } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { getGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import type { EventDetail } from '../../types/wedding';

export const EventDetails: React.FC = () => {
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const handleDownloadIcs = (event: EventDetail) => {
    downloadIcsFile(event);
    setDownloadSuccessId(event.id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);
  };

  return (
    <section id="acara" className="py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-10">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600">
          The Wedding Itinerary
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir-900 font-normal">
          Waktu & Tempat Perayaan
        </h2>
        <div className="w-12 h-0.5 bg-terracotta-500 mx-auto mt-4" />
        <p className="text-sm text-noir-700 leading-relaxed pt-2">
          Kehadiran dan doa restu Anda adalah anugerah terindah bagi kami di hari yang penuh berkah ini.
        </p>
      </div>

      {/* Events Grid: Side A & Side B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {weddingData.events.map((event, idx) => {
          const googleCalUrl = getGoogleCalendarUrl(event);
          const isAkad = event.id === 'akad';

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="bg-linen-100 rounded-3xl p-6 sm:p-8 border border-linen-300 shadow-paper-lg flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 ${isAkad ? 'bg-terracotta-600' : 'bg-olive-600'
                  }`}
              />

              <div>
                {/* Event Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-terracotta-700 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
                    {event.subtitle}
                  </span>
                  <span className="text-xs font-mono text-linen-600 font-medium">
                    {isAkad ? 'Pagi Hari' : 'Malam Hari'}
                  </span>
                </div>

                <h3 className="font-serif text-3xl text-noir-900 font-normal mb-2">
                  {event.title}
                </h3>

                {/* Date & Time Highlights */}
                <div className="space-y-2.5 my-6 py-4 px-4 bg-linen-50 rounded-2xl border border-linen-200">
                  <div className="flex items-center gap-3 text-sm text-noir-800">
                    <Calendar className="w-4 h-4 text-terracotta-600 shrink-0" />
                    <span className="font-medium">{event.displayDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-noir-800">
                    <Clock className="w-4 h-4 text-terracotta-600 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-noir-800">
                    <MapPin className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-noir-900">{event.locationName}</div>
                      <div className="text-xs text-linen-700 mt-0.5 leading-relaxed">
                        {event.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dresscode Palette */}
                {event.dressCode && (
                  <div className="mb-6 p-4 rounded-xl bg-linen-200/50 border border-linen-300/60">
                    <div className="text-xs font-mono uppercase tracking-wider text-linen-700 font-semibold mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
                      <span>Panduan Busana (Dresscode)</span>
                    </div>
                    <p className="text-xs text-noir-700 mb-3">
                      {event.dressCode.description}
                    </p>
                    <div className="flex items-center gap-2">
                      {event.dressCode.colors.map((color) => (
                        <div key={color.name} className="flex flex-col items-center">
                          <span
                            className="w-6 h-6 rounded-full border border-noir-900/10 shadow-sm"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                          <span className="text-[9px] font-mono text-linen-600 mt-1">
                            {color.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-linen-200">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-noir-900 hover:bg-noir-800 text-linen-100 text-xs font-medium transition-colors shadow-sm cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Buka Petunjuk Arah (Google Maps)</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-1" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-linen-50 hover:bg-linen-200 text-noir-800 border border-linen-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-terracotta-600" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    onClick={() => handleDownloadIcs(event)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-linen-50 hover:bg-linen-200 text-noir-800 border border-linen-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {downloadSuccessId === event.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700">Tersimpan</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3.5 h-3.5 text-terracotta-600" />
                        <span>Apple iCal (.ics)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
