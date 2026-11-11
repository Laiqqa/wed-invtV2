import type { Couple, EventDetail, StoryMilestone, BankAccount, RsvpData, AudioTrack } from '../types/wedding';

export const weddingData: {
  couple: Couple;
  quote: {
    text: string;
    source: string;
  };
  events: EventDetail[];
  story: StoryMilestone[];
  accounts: BankAccount[];
  initialWishes: RsvpData[];
  playlist: AudioTrack[];
} = {
  couple: {
    hashtag: '#TomAndZendaya',
    groom: {
      nickname: 'Tom',
      fullName: 'Thomas Stanley Holland',
      role: 'The Groom',
      parentNames: 'Putra dari Bpk. Dominic Holland & Ibu Nicola Elizabeth Frost',
      instagram: 'tomholland2013',
      bio: 'Aktor, penikmat kopi seduh manual, sinema vintage, dan kolektor piringan hitam.',
      photo: '/images/tom.jpg',
    },
    bride: {
      nickname: 'Zendaya',
      fullName: 'Zendaya Maree Coleman',
      role: 'The Bride',
      parentNames: 'Putri dari Bpk. Kazembe Ajamu Coleman & Ibu Claire Stoermer',
      instagram: 'zendaya',
      bio: 'Aktris, pemerhati seni mode haute-couture, penikmat puisi kontemporer, dan pencinta sastra.',
      photo: '/images/zendaya.jpg',
    },
  },
  quote: {
    text: 'Cause all of me loves all of you. I have loved you for a thousand years, and I will love you for a thousand more.',
    source: 'John Legend & Christina Perri',
  },
  events: [
    {
      id: 'akad',
      title: 'The Sacred Vow (Pemberkatan)',
      subtitle: 'Side A • The Sacred Vow',
      date: '2026-12-12',
      displayDate: 'Sabtu, 12 Desember 2026',
      time: '08:00 - 10:30 WIB',
      timezone: 'WIB',
      locationName: 'Pendopo Sasana Kriya',
      address: 'Jl. Taman Mini Indonesia Indah No. 1, Jakarta Timur',
      mapUrl: 'https://maps.google.com/?q=Pendopo+Sasana+Kriya+TMII',
      dressCode: {
        theme: 'Traditional Elegance & Earthy Tones',
        description: 'Pakaian bernuansa hangat, linen, atau batik tulis Nusantara klasik',
        colors: [
          { name: 'Warm Linen', hex: '#EBE5D8' },
          { name: 'Terracotta', hex: '#A8513C' },
          { name: 'Olive Green', hex: '#6E7358' },
          { name: 'Espresso', hex: '#2A2826' },
        ],
      },
      calendarEvent: {
        title: 'Wedding of Tom Holland & Zendaya (Vow Ceremony)',
        description: 'Upacara janji suci dan pemberkatan pernikahan Tom Holland & Zendaya',
        location: 'Pendopo Sasana Kriya, TMII Jakarta',
        startDate: '20261212T080000',
        endDate: '20261212T103000',
      },
    },
    {
      id: 'resepsi',
      title: 'Resepsi & Jamuan Kasih',
      subtitle: 'Side B • The Celebration',
      date: '2026-12-12',
      displayDate: 'Sabtu, 12 Desember 2026',
      time: '18:30 - 21:30 WIB',
      timezone: 'WIB',
      locationName: 'The Glass House Atelier',
      address: 'Jl. Kemang Raya No. 88, Bangka, Mampang Prapatan, Jakarta Selatan',
      mapUrl: 'https://maps.google.com/?q=The+Glass+House+Kemang',
      dressCode: {
        theme: 'Semi-Formal Chic / Cocktail Attire',
        description: 'Pakaian formal kontemporer dengan palet monokrom lembut atau earth-tone hangat',
        colors: [
          { name: 'Cream Ivory', hex: '#FAF8F5' },
          { name: 'Soft Charcoal', hex: '#3B3835' },
          { name: 'Dusty Rose', hex: '#B87D75' },
          { name: 'Antique Brass', hex: '#AB9D7E' },
        ],
      },
      calendarEvent: {
        title: 'Wedding Reception of Tom Holland & Zendaya',
        description: 'Malam perayaan cinta, musik, dan jamuan hangat bersama Tom Holland & Zendaya',
        location: 'The Glass House Atelier, Kemang Jakarta',
        startDate: '20261212T183000',
        endDate: '20261212T213000',
      },
    },
  ],
  story: [
    {
      year: '2016',
      chapter: 'Track 01',
      title: 'Pertemuan Pertama di Lokasi Syuting',
      description: 'Sebuah perjumpaan tak terlupakan saat pertama kali membaca naskah bersama di Atlanta. Sebuah persahabatan tulus yang perlahan mekar menjadi rasa cinta yang mendalam.',
      location: 'Atlanta, Georgia',
      photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80',
    },
    {
      year: '2021',
      chapter: 'Track 02',
      title: 'Menyusuri Sudut Tenang Kota London',
      description: 'Di tengah hiruk pikuk sorotan dunia, keduanya menemukan ketenangan sederhana: secangkir kopi pagi di Richmond Park dan tawa hangat di tengah gerimis senja.',
      location: 'London & Kingston upon Thames',
      photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80',
    },
    {
      year: '2025',
      chapter: 'Track 03',
      title: 'Sebuah Janji di Tepi Selat Cornwall',
      description: 'Di bawah langit tembaga dan debur ombak Samudra Atlantik, sebuah kotak kayu kecil dibuka. Jawaban "Yes" yang terucap dengan air mata bahagia menjadi awal lembaran baru.',
      location: 'Cornwall, United Kingdom',
      photo: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=700&q=80',
    },
    {
      year: '2026',
      chapter: 'Track 04',
      title: 'Penyatuan Dua Semesta',
      description: 'Hari di mana kami menyatukan dua jiwa, disaksikan oleh keluarga tercinta dan sahabat yang paling kami kasihi dari berbagai belahan dunia.',
      location: 'Jakarta & London',
      photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    },
  ],
  accounts: [
    {
      id: 'bca',
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '8410294819',
      accountHolder: 'Thomas Stanley Holland',
      type: 'bank',
    },
    {
      id: 'mandiri',
      bankName: 'Bank Mandiri',
      accountNumber: '1370019284711',
      accountHolder: 'Zendaya Maree Coleman',
      type: 'bank',
    },
    {
      id: 'qris',
      bankName: 'QRIS Pembayaran Digital',
      accountNumber: 'NMID: ID1020261212TZ',
      accountHolder: 'Tom & Zendaya Wedding Gift',
      type: 'qris',
      qrisUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=WEDDING-GIFT-TOM-ZENDAYA-2026',
    },
  ],
  initialWishes: [
    {
      id: 'w-1',
      name: 'Jacob Batalon & Family',
      attendance: 'attending',
      pax: 2,
      message: 'To my best brother Tom and the brilliant Zendaya! The wedding site looks like pure magic, love the vinyl aesthetic! Counting down the days! ✨',
      createdAt: 'Kemarin, 14:20 WIB',
    },
    {
      id: 'w-2',
      name: 'Law Roach',
      attendance: 'attending',
      pax: 1,
      message: 'Iconic duo of our time! Can not wait to witness this sacred union. You both look absolutely breathtaking! Congratulations my loves! 🥂',
      createdAt: 'Kemarin, 18:45 WIB',
    },
    {
      id: 'w-3',
      name: 'Timothée Chalamet',
      attendance: 'attending',
      pax: 2,
      message: 'So profoundly happy for you two! Wishing Tom & Z a lifetime of profound love, laughter, and timeless adventures.',
      createdAt: 'Hari ini, 09:15 WIB',
    },
  ],
  playlist: [
    {
      id: 'song-all-of-me',
      title: 'All of Me',
      artist: 'John Legend',
      side: 'A',
      album: 'Side A • The Sacred Vow (Acoustic Vinyl)',
      year: '2013 / 2026 Edition',
      duration: '4:29',
      src: '/audio/all-of-me.mp3',
    },
    {
      id: 'song-a-thousand-years',
      title: 'A Thousand Years',
      artist: 'Christina Perri',
      side: 'B',
      album: 'Side B • The Celebration (Cello & Piano)',
      year: '2011 / 2026 Live Session',
      duration: '4:45',
      src: '/audio/a-thousand-years.mp3',
    },
  ],
};
