/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1e293b',
        darkhover: '#0f172a',
        light: '#f8fafc',
        lighthover: '#f1f5f9',
        primary: '#c2410c',
        secondary: '#f97316',
      },
    },
  },
  plugins: [],
};
