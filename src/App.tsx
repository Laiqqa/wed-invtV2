import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EnvelopeGate } from './components/cover/EnvelopeGate';
import { HeroSection } from './components/hero/HeroSection';
import { VinylTurntable } from './components/audio/VinylTurntable';
import { CoupleProfile } from './components/couple/CoupleProfile';
import { LoveStoryTimeline } from './components/story/LoveStoryTimeline';
import { EventDetails } from './components/events/EventDetails';
import { RsvpSection } from './components/rsvp/RsvpSection';
import { WishesWall } from './components/wishes/WishesWall';
import { WeddingGift } from './components/gift/WeddingGift';
import { WeddingFooter } from './components/footer/WeddingFooter';
import { ThemePalettePicker } from './components/theme/ThemePalettePicker';
import type { ThemeName } from './components/theme/ThemePalettePicker';
import { VintageBackgroundPattern } from './components/common/VintageBackgroundPattern';
import { VintageDivider } from './components/common/VintageDivider';
import { AmbientButterflies } from './components/common/AmbientButterflies';
import { Scroll3DStory } from './components/story/Scroll3DStory';
import { Scroll3DSection } from './components/common/Scroll3DSection';
import { GuestTicketPass } from './components/ticket/GuestTicketPass';
import { EventRundown } from './components/itinerary/EventRundown';
import { weddingData } from './data/weddingData';
import type { RsvpData } from './types/wedding';

export function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Terhormat');
  const [pax, setPax] = useState(2);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('bordeaux');
  const [wishes, setWishes] = useState<RsvpData[]>(() => {
    try {
      const saved = localStorage.getItem('arya_nayla_wishes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return weddingData.initialWishes;
  });

  // Parse URL search params (?to=Nama+Tamu&pax=2&theme=bordeaux)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    const paxParam = params.get('pax');
    const themeParam = params.get('theme') as ThemeName | null;

    if (toParam && toParam.trim()) {
      setGuestName(toParam.trim());
    }

    if (paxParam) {
      const parsedPax = parseInt(paxParam, 10);
      if (!isNaN(parsedPax) && parsedPax > 0) {
        setPax(parsedPax);
      }
    }

    if (themeParam && ['bordeaux', 'emerald', 'indigo', 'terracotta'].includes(themeParam)) {
      setCurrentTheme(themeParam);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  const handleNewRsvp = (newRsvp: RsvpData) => {
    const updated = [newRsvp, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('arya_nayla_wishes', JSON.stringify(updated));
    } catch {
      // Storage full or unavailable
    }
  };

  return (
    <div className="relative min-h-screen bg-paper text-textMain transition-colors duration-500 overflow-x-hidden">
      {/* 1. Seamless Vintage Botanical Damask Watermark Background */}
      <VintageBackgroundPattern />

      {/* 2. Floating Ambient Vintage Butterflies throughout the entire invitation */}
      <AmbientButterflies />

      {/* 3. Real-time Theme Palette Switcher */}
      <ThemePalettePicker
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      {/* 3. Tactile Wax-Sealed Opening Gate with 3D Motion */}
      <AnimatePresence>
        {!isOpened && (
          <EnvelopeGate
            guestName={guestName}
            pax={pax}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* 4. Main Wedding Website Experience */}
      <main className="relative z-10 transition-opacity duration-1000">
        {/* Hero Section */}
        <HeroSection guestName={guestName} />

        {/* Vintage Divider */}
        <VintageDivider className="my-8" />

        {/* VIP Guest Ticket Pass / E-Ticket */}
        <Scroll3DSection depth={36} maxRotate={4}>
          <GuestTicketPass guestName={guestName} pax={pax} />
        </Scroll3DSection>

        {/* Vintage Divider */}
        <VintageDivider className="my-8" />

        {/* Analog Turntable Music Player */}
        <Scroll3DSection depth={32} maxRotate={3.5}>
          <section className="px-4">
            <VinylTurntable autoPlayTrigger={isOpened} />
          </section>
        </Scroll3DSection>

        {/* Vintage Divider with reduced tight gap */}
        <VintageDivider className="my-3" />

        {/* Cinematic 3D Scroll Narrative Section */}
        <Scroll3DStory />

        {/* Vintage Divider with reduced tight gap */}
        <VintageDivider className="my-3" />

        {/* Couple Profile */}
        <Scroll3DSection depth={40} maxRotate={4}>
          <CoupleProfile />
        </Scroll3DSection>

        {/* Vintage Divider */}
        <VintageDivider className="my-8" />

        {/* Narrative Tracklist / Love Story */}
        <Scroll3DSection depth={36} maxRotate={4}>
          <LoveStoryTimeline />
        </Scroll3DSection>

        {/* Vintage Divider */}
        <VintageDivider className="my-8" />

        {/* Event Schedule (Akad & Resepsi) */}
        <Scroll3DSection depth={40} maxRotate={4}>
          <EventDetails />
        </Scroll3DSection>

        {/* Vintage Divider */}
        <VintageDivider className="my-8" />

        {/* Day-of Event Rundown & Logistics / Parking Guide */}
        <Scroll3DSection depth={40} maxRotate={4}>
          <EventRundown />
        </Scroll3DSection>

        {/* Vintage Divider */}
        <VintageDivider className="my-8" />

        {/* Interactive RSVP */}
        <Scroll3DSection depth={36} maxRotate={4}>
          <RsvpSection
            initialGuestName={guestName === 'Tamu Terhormat' ? '' : guestName}
            onNewRsvpAdded={handleNewRsvp}
          />
        </Scroll3DSection>

        {/* Vintage Divider */}
        <VintageDivider className="my-8" />

        {/* Dinding Doa & Ucapan */}
        <Scroll3DSection depth={32} maxRotate={3.5}>
          <WishesWall wishes={wishes} />
        </Scroll3DSection>

        {/* Vintage Divider */}
        <VintageDivider className="my-8" />

        {/* Amplop Digital & QRIS */}
        <Scroll3DSection depth={36} maxRotate={4}>
          <WeddingGift />
        </Scroll3DSection>

        {/* Footer */}
        <Scroll3DSection depth={28} maxRotate={3}>
          <WeddingFooter />
        </Scroll3DSection>
      </main>
    </div>
  );
}

export default App;
