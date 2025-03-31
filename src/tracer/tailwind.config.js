/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        neonRed: '#FF4040',
        neonPurple: '#A940FF',
        neonOrange: '#FF8C40',
        neonPink: '#FF40A9',
        neonTeal: '#40FFD9',
      },
    },
  },
  plugins: [],
};