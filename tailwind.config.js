/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        ibm: ['IBM', 'sans-serif']
      },
      colors: {
        grey: '#565656;',
        blueStrong: '#2E3E5C;',
        shadeBlue: '#607FF2;',
        shadeBlueHover: '#4965cc;',
        redButton: '#F26060',
        secondaryGrey: '#EFF2F9',
        textGrey: '#6F7482',
        yellow: '#EACA78'
      },
      backgroundImage: {
        'background-vector': "url('/carousel/background-vector.svg')",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      })
    }),
  ],
}
