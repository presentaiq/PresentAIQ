/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E0C06A',
          dark: '#9E7A2E',
        },
        surface: {
          DEFAULT: '#0E0E0E',
          1: '#141414',
          2: '#1A1A1A',
          3: '#222222',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
        display: ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.8rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        headline: ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      spacing: {
        scene: 'clamp(5rem, 10vh, 9rem)',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
