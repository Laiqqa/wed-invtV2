import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Navigation, Car, Heart, Sparkles, Accessibility, Coffee } from 'lucide-react';

interface RundownItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

const akadRundown: RundownItem[] = [
  {
    time: '07:30 WIB',
    title: 'Penyambutan Tamu & Registrasi',
    description: 'Pintu pendopo dibuka. Tamu undangan dipersilakan menempati kursi utama.',
    icon: 'door',
  },
  {
    time: '08:00 WIB',
    title: 'Prosesi Masuk & Pembacaan Doa',
    description: 'Kedatangan kedua mempelai diiringi lantunan musik tradisional bernuansa khidmat.',
    icon: 'prayer',
  },
  {
    time: '08:30 WIB',
    title: 'Pengucapan Janji Suci & Akad',
    description: 'Momen sakral penyatuan janji suci disaksikan oleh para saksi dan keluarga tercinta.',
    icon: 'ring',
  },
  {
    time: '09:15 WIB',
    title: 'Penyerahan Cincin & Tanda Cinta',
    description: 'Pemasangan cincin pernikahan dan penandatanganan buku nikah.',
    icon: 'heart',
  },
  {
    time: '09:45 WIB',
    title: 'Sungkeman & Doa Restu Orang Tua',
    description: 'Ungkapan rasa bakti dan permohonan restu kedua mempelai kepada orang tua.',
    icon: 'family',
  },
  {
    time: '10:15 WIB',
    title: 'Sesi Foto Keluarga & Jamuan Pagi',
    description: 'Foto bersama keluarga inti dilanjutkan jamuan sarapan pagi tradisional.',
    icon: 'camera',
  },
];

const resepsiRundown: RundownItem[] = [
  {
    time: '18:30 WIB',
    title: 'Pintu Dibuka & Welcoming Drinks',
    description: 'Tamu dipersilakan menikmati hidangan pembuka dan alunan musik jazz akustik.',
    icon: 'cocktail',
  },
  {
    time: '19:15 WIB',
    title: 'Grand Entrance Tom & Zendaya',
    description: 'Penyambutan megah kedua mempelai memasuki ballroom diiringi tepuk tangan hangat.',
    icon: 'entrance',
  },
  {
    time: '19:30 WIB',
    title: 'Sambutan Hangat & Toast Cinta',
    description: 'Ungkapan terima kasih keluarga dan toast perayaan lembaran baru.',
    icon: 'toast',
  },
  {
    time: '19:45 WIB',
    title: 'Jamuan Makan Malam & Live Music',
    description: 'Santap malam prasmanan lezat diiringi penampilan musik akustik romantis.',
    icon: 'dinner',
  },
  {
    time: '20:30 WIB',
    title: 'Lempar Buket Bunga & Mini Games',
    description: 'Momen seru lempar buket bunga untuk para sahabat yang belum menikah.',
    icon: 'flower',
  },
  {
    time: '21:00 WIB',
    title: 'Sesi Foto Bebas & Penutupan Hangat',
    description: 'Waktu santai berfoto bersama Tom & Zendaya hingga penghujung acara.',
    icon: 'sparkle',
  },
];

export const EventRundown: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'akad' | 'resepsi'>('resepsi');
  const currentList = activeTab === 'akad' ? akadRundown : resepsiRundown;

  return (
    <section id="rundown" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-10 select-none">
      <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-linen-600">
          Day-of Schedule &amp; Logistics
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir-900 font-normal">
          Rundown Acara &amp; Panduan Parkir
        </h2>
        <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
        <p className="text-sm text-noir-700 leading-relaxed pt-2">
          Jadwal rinci setiap momen agar Anda tidak melewatkan prosesi penting, dilengkapi panduan transportasi dan fasilitas venue.
        </p>
      </div>

      {/* Tab Switcher: Side A vs Side B */}
      <div className="flex justify-center mb-10">
        <div className="bg-linen-100 p-1.5 rounded-full border border-linen-300 shadow-sm flex items-center gap-1">
          <button
            onClick={() => setActiveTab('akad')}
            className={`px-5 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === 'akad'
                ? 'bg-noir-900 text-linen-100 shadow-xs'
                : 'text-noir-700 hover:text-noir-900'
            }`}
          >
            Side A • Akad (Pagi)
          </button>
          <button
            onClick={() => setActiveTab('resepsi')}
            className={`px-5 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === 'resepsi'
                ? 'bg-noir-900 text-linen-100 shadow-xs'
                : 'text-noir-700 hover:text-noir-900'
            }`}
          >
            Side B • Resepsi (Malam)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Timeline List (7 cols) */}
        <div className="lg:col-span-7 bg-linen-100 border border-linen-300 rounded-3xl p-6 sm:p-8 shadow-paper-lg relative">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-linen-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h3 className="font-serif text-xl text-noir-900 font-medium">
                {activeTab === 'akad' ? 'Rangkaian Akad Nikah' : 'Rangkaian Resepsi Malam'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-primary font-semibold">
              {activeTab === 'akad' ? '08:00 - 10:30 WIB' : '18:30 - 21:30 WIB'}
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-linen-300">
            <AnimatePresence mode="wait">
              {currentList.map((item, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="relative group"
                >
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-paper border-2 border-primary group-hover:scale-125 transition-transform" />

                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {item.time}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-semibold text-noir-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-noir-700 leading-relaxed mt-1 font-light">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Venue Logistics & Transportation Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linen-100 border border-linen-300 rounded-3xl p-6 sm:p-7 shadow-paper-lg space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-linen-200">
              <Car className="w-4 h-4 text-primary" />
              <h3 className="font-serif text-xl text-noir-900 font-medium">
                Panduan Parkir &amp; Drop-Off
              </h3>
            </div>

            {/* Logistics highlights */}
            <div className="space-y-3.5 text-xs text-noir-800">
              <div className="p-3.5 bg-linen-50 rounded-2xl border border-linen-200">
                <span className="font-mono font-bold text-primary uppercase text-[10px] block mb-0.5">
                  Layanan Valet Gratis
                </span>
                <p className="leading-relaxed">
                  Tersedia fasilitas valet gratis di lobby utama bagi seluruh tamu undangan pernikahan. Cukup serahkan kendaraan kepada staf berseragam resmi.
                </p>
              </div>

              <div className="p-3.5 bg-linen-50 rounded-2xl border border-linen-200">
                <span className="font-mono font-bold text-primary uppercase text-[10px] block mb-0.5">
                  Titik Drop-Off Taksi Online
                </span>
                <p className="leading-relaxed">
                  Bagi pengguna Grab/Gojek, pilih titik drop-off <strong>"Lobby Barat The Glass House"</strong> untuk akses langsung tanpa tangga ke area resepsi.
                </p>
              </div>
            </div>

            {/* Direct Navigation Links */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-linen-600 block">
                Navigasi Cepat Satu Sentuhan
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://waze.com/ul?q=The+Glass+House+Kemang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-linen-50 hover:bg-linen-200 text-noir-800 border border-linen-300 text-xs font-mono font-medium transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  <span>Buka di Waze</span>
                </a>

                <a
                  href="https://maps.google.com/?q=The+Glass+House+Kemang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-linen-50 hover:bg-linen-200 text-noir-800 border border-linen-300 text-xs font-mono font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            {/* Venue Amenities */}
            <div className="pt-3 border-t border-linen-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-linen-600 block mb-2">
                Fasilitas Venue Tersedia
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-linen-700 font-mono">
                <div className="flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-primary" />
                  <span>Akses Kursi Roda</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-primary" />
                  <span>Musholla Ber-AC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Nursery / Ruang Bayi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-primary" />
                  <span>Toilet Tamu VIP</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

