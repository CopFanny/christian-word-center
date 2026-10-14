/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        faith: {
          50: '#f4f1ff',
          100: '#ebdefd',
          200: '#ccb8fb',
          300: '#b08cf6',
          400: '#8d68eb',
          500: '#6e49d5',
          600: '#563ab7',
          700: '#472f93',
          800: '#392a73',
          900: '#2a2156'
        }
      },
      boxShadow: {
        soft: '0 22px 60px rgba(42, 33, 86, 0.12)',
      }
    },
  },
  plugins: [],
};
