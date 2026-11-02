/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        caviar: '#060608',
        obsidian: '#0B0B0E',
        noir: {
          900: '#070709',
          800: '#0D0D12',
          700: '#13131A',
          600: '#1A1A24',
          500: '#222230',
          border: 'rgba(212, 175, 55, 0.16)',
          borderLight: 'rgba(212, 175, 55, 0.32)',
        },
        gold: {
          50: '#FDFCF7',
          100: '#FAF6EB',
          200: '#F4E9CD',
          300: '#EBD69F',
          400: '#DFBE6E',
          500: '#D4AF37', // Signature Metallic Gold
          600: '#B89225',
          700: '#91711A',
          800: '#6E5414',
          champagne: '#F5E6CA',
          light: '#FBF5E8',
          pale: '#FAF3E0',
          muted: '#C4A86A',
          dark: '#8B6A1B',
        },
        luxury: {
          black: '#070709',
          dark: '#0D0D12',
          card: '#13131A',
          hover: '#1B1B25',
          subtle: '#222230',
          border: 'rgba(212, 175, 55, 0.18)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        italiana: ['"Italiana"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cinzelDec: ['"Cinzel Decorative"', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FBF5E8 0%, #D4AF37 50%, #9B7826 100%)',
        'gold-metallic': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'gold-sheen': 'linear-gradient(90deg, #D4AF37 0%, #FFF5DC 50%, #B89225 100%)',
        'dark-vignette': 'radial-gradient(ellipse at center, rgba(13,13,18,0.7) 0%, rgba(7,7,9,0.98) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.22)',
        'gold-subtle': '0 4px 20px rgba(212, 175, 55, 0.12)',
        'luxury-elevation': '0 20px 40px -15px rgba(0, 0, 0, 0.8)',
      },
      letterSpacing: {
        'widest-xl': '0.35em',
        'widest-2xl': '0.45em',
      },
    },
  },
  plugins: [],
};
