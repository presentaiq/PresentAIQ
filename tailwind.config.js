/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#7B9FCC',
          light: '#9AB8D8',
          dark: '#4A6899',
        },
        navy: {
          950: '#060C18',
          900: '#080F1C',
          800: '#0D1829',
          700: '#132038',
          600: '#1A2B4A',
          500: '#22386A',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'Inter', '"Helvetica Neue"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        apple: '-0.022em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
        apple: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
};
