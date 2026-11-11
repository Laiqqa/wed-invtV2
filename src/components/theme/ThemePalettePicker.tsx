import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

export type ThemeName = 'bordeaux' | 'emerald' | 'indigo' | 'terracotta';

interface ThemeOption {
  id: ThemeName;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
}

export const themeOptions: ThemeOption[] = [
  {
    id: 'bordeaux',
    name: 'Bordeaux Velvet',
    tagline: 'Anggur Merah Tua & Karamel Emas',
    primaryColor: '#85222B',
    accentColor: '#C48232',
  },
  {
    id: 'emerald',
    name: 'Midnight Emerald',
    tagline: 'Zamrud Hutan & Emas Antik',
    primaryColor: '#1C4D38',
    accentColor: '#C59728',
  },
  {
    id: 'indigo',
    name: 'Prussian Indigo',
    tagline: 'Biru Indigo & Sampanye Emas',
    primaryColor: '#1B355B',
    accentColor: '#CF9E38',
  },
  {
    id: 'terracotta',
    name: 'Terracotta Rust',
    tagline: 'Tanah Liat Siena & Sage Asap',
    primaryColor: '#A2422C',
    accentColor: '#596B4F',
  },
];

interface ThemePalettePickerProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

export const ThemePalettePicker: React.FC<ThemePalettePickerProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Apply theme class to document body
    document.documentElement.classList.remove(
      'theme-bordeaux',
      'theme-emerald',
      'theme-indigo',
      'theme-terracotta'
    );
    document.documentElement.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  return (
    <div className="fixed top-5 left-5 z-40 select-none">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Pilih palet tema warna"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-noir-900/85 hover:bg-noir-900 text-linen-100 backdrop-blur-md border border-linen-400/20 shadow-lg text-xs font-mono transition-all cursor-pointer"
        >
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Palet:</span>
          <span className="capitalize font-semibold text-amber-200">
            {currentTheme}
          </span>
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/30"
            style={{
              backgroundColor: themeOptions.find((t) => t.id === currentTheme)?.primaryColor,
            }}
          />
        </button>

        {isOpen && (
          <>
            {/* Backdrop close */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <div className="absolute top-12 left-0 z-20 w-72 bg-linen-100 border border-linen-300 rounded-2xl p-3 shadow-2xl space-y-1.5 backdrop-blur-lg">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-linen-600 border-b border-linen-200 mb-1">
                Pilih Nuansa Warna (Tidak Pucat)
              </div>

              {themeOptions.map((opt) => {
                const isSelected = currentTheme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onThemeChange(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-linen-200/90 border border-linen-400/60 shadow-xs'
                        : 'hover:bg-linen-200/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center -space-x-1">
                        <span
                          className="w-4 h-4 rounded-full border border-white/80 shadow-xs"
                          style={{ backgroundColor: opt.primaryColor }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-white/80 shadow-xs"
                          style={{ backgroundColor: opt.accentColor }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-serif font-semibold text-noir-900 leading-tight">
                          {opt.name}
                        </div>
                        <div className="text-[10px] text-linen-600 font-sans">
                          {opt.tagline}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-terracotta-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

