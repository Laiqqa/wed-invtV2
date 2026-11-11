/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
        },
        paper: {
          DEFAULT: 'var(--color-paper)',
          warm: 'var(--color-paper-warm)',
          card: 'var(--color-paper-card)',
        },
        borderSubtle: 'var(--color-border)',
        textMain: 'var(--color-text-main)',
        textMuted: 'var(--color-text-muted)',
        linen: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EBE5D8',
          300: '#DDD4C0',
          400: '#C9BDA1',
          500: '#AB9D7E',
          600: '#8C7D5E',
          700: '#6C5F43',
          800: '#4D422C',
          900: '#2F2718',
        },
        noir: {
          900: '#141413',
          800: '#1C1B1A',
          700: '#2A2826',
        },
        terracotta: {
          50: '#FDF3F0',
          100: '#FAE4DF',
          500: '#C46851',
          600: '#A8513C',
          700: '#8A3E2C',
        },
        olive: {
          500: '#6E7358',
          600: '#555A41',
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
          600: '#997A15',
        }
      },
      animation: {
        'spin-slow': 'spin 16s linear infinite',
        'spin-slower': 'spin 24s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      boxShadow: {
        'vinyl': '0 20px 40px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        'paper': '0 4px 20px -2px rgba(44, 38, 28, 0.08), 0 1px 3px 0 rgba(44, 38, 28, 0.04)',
        'paper-lg': '0 12px 35px -5px rgba(44, 38, 28, 0.12), 0 4px 10px -2px rgba(44, 38, 28, 0.04)',
        'wax': '0 4px 12px rgba(138, 62, 44, 0.35), inset 0 2px 3px rgba(255, 255, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
