/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Manrope', 'sans-serif'],
      },
      colors: {
        indigo: {
          500: '#607FF2'
        }
      }
    },
  },
  plugins: [],
};
