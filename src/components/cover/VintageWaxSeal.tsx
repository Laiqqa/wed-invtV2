import React from 'react';
import { motion } from 'framer-motion';

interface VintageWaxSealProps {
  isBreaking: boolean;
  onClick: () => void;
}

export const VintageWaxSeal: React.FC<VintageWaxSealProps> = ({ isBreaking, onClick }) => {
  return (
    <div className="relative flex items-center justify-center my-2 select-none">
      {/* 1. Vintage Cotton Twine / Silk Ribbon crossing underneath the seal */}
      <div className="absolute w-44 sm:w-56 h-3 bg-gradient-to-r from-transparent via-[#C2A379] to-transparent opacity-75 shadow-sm transform -rotate-1 pointer-events-none">
        <div className="w-full h-full border-t border-b border-[#9C7A4F]/40" />
      </div>
      <div className="absolute w-40 sm:w-48 h-2.5 bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent transform rotate-3 pointer-events-none" />

      {/* Ribbon tails hanging down with frayed ends */}
      <div className="absolute -bottom-7 -left-2 w-4 h-10 bg-[#C2A379]/85 rotate-[-18deg] shadow-sm pointer-events-none origin-top rounded-b-sm border-r border-[#9C7A4F]/40" />
      <div className="absolute -bottom-8 left-3 w-4 h-12 bg-[#B89668]/85 rotate-[12deg] shadow-sm pointer-events-none origin-top rounded-b-sm border-l border-[#9C7A4F]/40" />

      {/* 2. Main Interactive Wax Seal Button */}
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.06, rotate: [-0.5, 0.5, 0] }}
        whileTap={{ scale: 0.94 }}
        disabled={isBreaking}
        aria-label="Pecahkan segel lilin vintage dan buka undangan"
        className="group relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center cursor-pointer focus:outline-none transition-transform z-10"
      >
        {/* Deep cast shadow onto the envelope */}
        <div className="absolute inset-1.5 rounded-full bg-noir-900/40 blur-md transform translate-y-2 pointer-events-none" />

        {/* Realistic Melted Wax SVG with Organic Lobes & Antique Gilded Stamp */}
        <svg
          viewBox="0 0 140 140"
          className={`w-full h-full drop-shadow-xl transition-all duration-700 ${isBreaking ? 'scale-110 filter brightness-125' : ''
            }`}
        >
          <defs>
            {/* Dynamic Rich Wax Gradient adapting to active theme */}
            <radialGradient id="waxBase" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="var(--wax-color-1, #C9443B)" />
              <stop offset="65%" stopColor="var(--wax-color-2, #6E120D)" />
              <stop offset="100%" stopColor="#1A0201" />
            </radialGradient>

            {/* Raised Outer Melted Rim Gradient */}
            <linearGradient id="rimShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--wax-color-1, #E05B52)" />
              <stop offset="50%" stopColor="var(--wax-color-2, #630F0B)" />
              <stop offset="100%" stopColor="#120101" />
            </linearGradient>

            {/* Antique Metallic Gold Leaf Powder Accent */}
            <linearGradient id="goldLeaf" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="25%" stopColor="#ECC45B" />
              <stop offset="55%" stopColor="#D4A437" />
              <stop offset="85%" stopColor="#996E14" />
              <stop offset="100%" stopColor="#F5DF8E" />
            </linearGradient>

            {/* Bevel Highlight Overlay */}
            <radialGradient id="specularGlint" cx="30%" cy="25%" r="45%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Inner Stamp Recess Shadow */}
            <radialGradient id="innerRecess" cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="#2A0503" stopOpacity="0.15" />
              <stop offset="92%" stopColor="#180201" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0B0101" stopOpacity="0.85" />
            </radialGradient>
          </defs>

          {/* 1. Organic Melted Wax Outer Contour (Irregular Molten Droplets) */}
          <path
            d="M 70,8
               C 85,7 98,13 109,24
               C 120,34 133,48 132,64
               C 131,80 123,94 114,107
               C 104,120 89,132 72,132
               C 55,132 40,126 28,116
               C 15,105 8,92 7,76
               C 6,60 14,44 26,31
               C 38,18 53,9 70,8 Z"
            fill="url(#waxBase)"
            stroke="url(#rimShine)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Secondary Organic Droplet Puddles for Natural Irregularity */}
          <ellipse cx="44" cy="18" rx="14" ry="10" fill="var(--wax-color-1, #9C2018)" opacity="0.6" transform="rotate(-15 44 18)" />
          <ellipse cx="112" cy="42" rx="12" ry="16" fill="var(--wax-color-2, #881B14)" opacity="0.7" transform="rotate(25 112 42)" />
          <ellipse cx="106" cy="102" rx="15" ry="12" fill="var(--wax-color-2, #6E120D)" opacity="0.7" transform="rotate(-20 106 102)" />
          <ellipse cx="32" cy="98" rx="14" ry="12" fill="var(--wax-color-1, #7E1812)" opacity="0.7" transform="rotate(18 32 98)" />

          {/* 2. Raised Brass Stamp Ring Rim */}
          <circle
            cx="70"
            cy="70"
            r="44"
            fill="none"
            stroke="url(#rimShine)"
            strokeWidth="4"
            opacity="0.95"
          />
          <circle
            cx="70"
            cy="70"
            r="42"
            fill="none"
            stroke="#1A0201"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* 3. Deep Debossed Center Field */}
          <circle
            cx="70"
            cy="70"
            r="40"
            fill="url(#innerRecess)"
          />

          {/* 4. Engraved Beaded / Milled Vintage Guilloché Ring */}
          <circle
            cx="70"
            cy="70"
            r="36"
            fill="none"
            stroke="url(#goldLeaf)"
            strokeWidth="1.2"
            strokeDasharray="2.5 3"
            opacity="0.85"
          />

          {/* 5. Ornate Vintage Laurel / Olive Wreath Embossing */}
          <g stroke="url(#goldLeaf)" fill="none" opacity="0.85" strokeWidth="1.2" strokeLinecap="round">
            {/* Left Laurel Branch */}
            <path d="M 46,74 C 44,60 48,46 58,38" />
            <path d="M 45,64 C 40,61 38,56 42,52 C 45,55 46,59 46,64 Z" fill="url(#goldLeaf)" />
            <path d="M 47,52 C 43,47 44,42 49,40 C 51,44 50,49 47,52 Z" fill="url(#goldLeaf)" />
            <path d="M 54,43 C 51,37 54,32 59,32 C 60,37 57,41 54,43 Z" fill="url(#goldLeaf)" />

            {/* Right Laurel Branch */}
            <path d="M 94,74 C 96,60 92,46 82,38" />
            <path d="M 95,64 C 100,61 102,56 98,52 C 95,55 94,59 94,64 Z" fill="url(#goldLeaf)" />
            <path d="M 93,52 C 97,47 96,42 91,40 C 89,44 90,49 93,52 Z" fill="url(#goldLeaf)" />
            <path d="M 86,43 C 89,37 86,32 81,32 C 80,37 83,41 86,43 Z" fill="url(#goldLeaf)" />

            {/* Bottom Tie Bow */}
            <path d="M 64,88 C 67,86 73,86 76,88" strokeWidth="1.4" />
            <circle cx="70" cy="87" r="1.5" fill="url(#goldLeaf)" />
          </g>

          {/* 6. Central Ornate Monogram: Tom & Zendaya ("T & Z") */}
          <text
            x="70.5"
            y="67"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="26"
            fontStyle="italic"
            fontWeight="600"
            textAnchor="middle"
            fill="#120201"
            opacity="0.9"
          >
            T&amp;Z
          </text>
          <text
            x="69.5"
            y="65.5"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="26"
            fontStyle="italic"
            fontWeight="600"
            textAnchor="middle"
            fill="url(#goldLeaf)"
            style={{
              filter: 'drop-shadow(0px 1px 1px rgba(255,245,180,0.45))',
            }}
          >
            T&amp;Z
          </text>

          {/* Subtitle / Stamped Date */}
          <text
            x="70.5"
            y="81"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="7"
            fontWeight="600"
            letterSpacing="2.5"
            textAnchor="middle"
            fill="#120201"
            opacity="0.8"
          >
            12 · 12 · 26
          </text>
          <text
            x="70"
            y="80.2"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="7"
            fontWeight="600"
            letterSpacing="2.5"
            textAnchor="middle"
            fill="url(#goldLeaf)"
            opacity="0.9"
          >
            12 · 12 · 26
          </text>

          {/* 7. Top Surface Light Sheen Glint */}
          <ellipse
            cx="52"
            cy="40"
            rx="28"
            ry="18"
            fill="url(#specularGlint)"
            transform="rotate(-25 52 40)"
            pointerEvents="none"
          />

          {/* 8. Fracture / Crack lines if clicked (Breaking animation) */}
          {isBreaking && (
            <g stroke="#FFF0BD" strokeWidth="1.4" opacity="0.95" strokeLinecap="round">
              <path d="M 70,12 L 67,42 L 73,65 L 68,90 L 71,128" />
              <path d="M 67,42 L 52,50 L 40,46" />
              <path d="M 73,65 L 88,72 L 102,70" />
              <path d="M 68,90 L 56,102" />
            </g>
          )}
        </svg>

        {/* Tactile interaction shimmer on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-amber-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.button>
    </div>
  );
};
